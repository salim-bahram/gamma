<?php

declare(strict_types=1);

namespace App\Service;

use Exception;

class ParametreService
{
    static public function verificationParametresObligatoires(
        array $obligatoires,
        array $data
    ) {
        foreach ($obligatoires as $obligatoire) {
            if (!isset($data[$obligatoire])) {
                throw new Exception("Paramètre '$obligatoire' manquant");
            }
        }
    }
}