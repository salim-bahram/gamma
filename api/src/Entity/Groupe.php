<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GroupeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table(name: 'groupes')]
#[ORM\Entity(repositoryClass: GroupeRepository::class)]
#[ORM\UniqueConstraint(
    name: 'groupe_ak_key_1',
    columns: ['nom']
)]
#[ApiResource]
class Groupe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nom = null;

    #[ORM\Column(length: 50)]
    private ?string $origine = null;

    #[ORM\Column(length: 50)]
    private ?string $ville = null;

    #[ORM\Column]
    private ?int $anneeDebut = null;

    #[ORM\Column(nullable: true)]
    private ?int $anneeSeparation = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fondateurs = null;

    #[ORM\Column(nullable: true)]
    private ?int $membres = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $courantMusical = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $presentation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getOrigine(): ?string
    {
        return $this->origine;
    }

    public function setOrigine(string $origine): static
    {
        $this->origine = $origine;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function getAnneeDebut(): ?int
    {
        return $this->anneeDebut;
    }

    public function setAnneeDebut(int $anneeDebut): static
    {
        $this->anneeDebut = $anneeDebut;

        return $this;
    }

    public function getAnneeSeparation(): ?int
    {
        return $this->anneeSeparation;
    }

    public function setAnneeSeparation(?int $anneeSeparation): static
    {
        $this->anneeSeparation = $anneeSeparation;

        return $this;
    }

    public function getFondateurs(): ?string
    {
        return $this->fondateurs;
    }

    public function setFondateurs(?string $fondateurs): static
    {
        $this->fondateurs = $fondateurs;

        return $this;
    }

    public function getMembres(): ?int
    {
        return $this->membres;
    }

    public function setMembres(?int $membres): static
    {
        $this->membres = $membres;

        return $this;
    }

    public function getCourantMusical(): ?string
    {
        return $this->courantMusical;
    }

    public function setCourantMusical(?string $courantMusical): static
    {
        $this->courantMusical = $courantMusical;

        return $this;
    }

    public function getPresentation(): ?string
    {
        return $this->presentation;
    }

    public function setPresentation(?string $presentation): static
    {
        $this->presentation = $presentation;

        return $this;
    }
}
