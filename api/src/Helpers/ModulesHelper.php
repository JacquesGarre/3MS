<?php

namespace App\Helpers;

final class ModulesHelper
{

    public static function getEntityName($slug): string
    {
        $entityName = '';
        if (strpos($slug, '-') === FALSE) {
            $entityName = ucfirst(strtolower($slug));
        } else {
            $words = explode('-', $slug);
            foreach ($words as $word) {
                $entityName .= ucfirst(strtolower($word));
            }
        }
        return $entityName;
    }

}