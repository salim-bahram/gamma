<?php

namespace App\Controller;

use App\Entity\Groupe;
use App\Service\ParametreService;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class GroupeController extends AbstractController
{
    const MIMETYPES = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    const COLONNES = [
        'nom'             => 0,
        'origine'         => 1,
        'ville'           => 2,
        'anneeDebut'      => 3,
        'anneeSeparation' => 4,
        'fondateurs'      => 5,
        'membres'         => 6,
        'courant'         => 7,
        'presentation'    => 8,
    ];

    public function __construct(
        private EntityManagerInterface $em
    ) {
    }

    #[Route('/groupes/import', name: 'app_import_groupes')]
    public function importGroupes(Request $request): JsonResponse
    {
        $file = $request->files->get('file');
        if (!$file) {
            throw new Exception('Aucun fichier n\'a été fourni');
        } elseif (!in_array($file->getMimeType(), self::MIMETYPES)) {
            throw new Exception('Ce type de fichier n\'est pas pris en compte');
        }

        $reader = IOFactory::createReader('Xlsx');
        $filePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . $file->getFilename();
        $spreadsheet = $reader->load($filePath);

        $sheet = $spreadsheet->getActiveSheet();

        $rows = $sheet->toArray();
        foreach ($rows as $key => $row) {
            // On saute la première ligne
            if ($key == 0) continue;

            // On récupère les informations du groupe
            $nom = $row[self::COLONNES['nom']];

            $champsObligatoires = ['nom', 'origine', 'ville', 'anneeDebut'];
            $data = [
                'nom'             => $row[self::COLONNES['nom']],
                'origine'         => $row[self::COLONNES['origine']],
                'ville'           => $row[self::COLONNES['ville']],
                'anneeDebut'      => $row[self::COLONNES['anneeDebut']],
                'anneeSeparation' => $row[self::COLONNES['anneeSeparation']],
                'fondateurs'      => $row[self::COLONNES['fondateurs']],
                'membres'         => $row[self::COLONNES['membres']],
                'courant'         => $row[self::COLONNES['courant']],
                'presentation'    => $row[self::COLONNES['presentation']],
            ];
            ParametreService::verificationParametresObligatoires($champsObligatoires, $data);

            // On vérifie si un groupe avec ce nom existe
            $groupe = $this->em->getRepository(Groupe::class)->findOneBy(['nom' => $nom]);
            // Si aucun groupe n'existe avec ce nom
            if (!$groupe) {
                $groupe = new Groupe();
            }

            $groupe->setNom($data['nom']);
            $groupe->setOrigine($data['origine']);
            $groupe->setVille($data['ville']);
            $groupe->setAnneeDebut($data['anneeDebut']);
            $groupe->setAnneeSeparation($data['anneeSeparation']);
            $groupe->setFondateurs($data['fondateurs']);
            $groupe->setMembres($data['membres']);
            $groupe->setCourantMusical($data['courant']);
            $groupe->setPresentation($data['presentation']);
            // On enregistre le groupe dans la base de données
            $this->em->persist($groupe);
            $this->em->flush();
        }

        return $this->json('Fichier importé avec succés');
    }
}
