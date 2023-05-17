<?php

namespace Kerdou\Portfolio\Services\regexStore;

class NameRegex
{
    public function __destruct()
    {
    }

    /** IOS rajoute un problème avec les apostrophes:
     * Quand on appuie sur ' sur le clavier virtuel, cela génére en réalité un ‘ ou un ’
     *
     * Par conséquent, la regex a du être modifiée en remplaçant ( |') par ( |['‘’])
     */

    /** Cette version interdit l'emploi de chiffres
     */
    public function nameRegex(string $stringToCheck): bool
    {
        $stringToCheck = html_entity_decode($stringToCheck);

        //$pregListForName = "/^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/i";
        $nameBeginning = "^([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+";
        // ^                                                                          Doit être situé au début de la phrase
        //  (                                                                  )+     Doit inclure au moins 1 des caractères situés dans la liste suivante
        //   [a-zàáâäçèéêëìíîïñòóôöùúûü]+(                                   )*       Doit commencer par au moins 1 des caractères de la liste, la suite n'est pas obligatoire
        //                                ( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü]+         Doit commencer par un espace ou un ' et suivi d'au moins 1 caractère de la liste

        $nameEnd = "([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$";
        //                                                                            $   Doit être situé à la fin de la phrase
        // (                                                                        )*    Doit comporter 0 ou plusieurs éléments de la liste suivante
        //  [-](                                                                  )+      Doit comporter au moins 1 tiret suivi de la liste suivante
        //      [a-zàáâäçèéêëìíîïñòóôöùúûü]+(                                   )*        Doit comporter au moins 1 des caractères listés suivi de 0 ou plusieurs caractéres de la liste suivante
        //                                   ( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü]+          Doit commencer par un espace ou un ' suivi d'au moins 1 caractère de la liste suivante

        $pregListForName = "/" . $nameBeginning . $nameEnd . "/i";
        $regexResult = (preg_match($pregListForName, $stringToCheck) ? true : false); // test de conformité du nom de famille, s'il est bon $lastnameChecks devient true

        return $regexResult;
    }

    /** Cette version autorise l'emploie de chiffres à partir du 2éme caractére
     */
    public function companyNameRegex(string $stringToCheck): bool
    {
        $stringToCheck = html_entity_decode($stringToCheck);

        //$pregListForName = "/^([a-zàáâäçèéêëìíîïñòóôöùúûü]+[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]?(( |'‘’)[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |'‘’)[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/i";
        $nameBeginning = "^([a-zàáâäçèéêëìíîïñòóôöùúûü]+[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]?(( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü0-9]+)*)+";
        // ^                                                                                                         Doit être situé au début de la phrase
        //  (                                                                                                    )+  Doit inclure au moins 1 des caractères situés dans la liste suivante
        //   [a-zàáâäçèéêëìíîïñòóôöùúûü]+[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]?(                                      )*    Doit commencer par au moins 1 des caractères de la liste, la suite n'est pas obligatoire
        //                                                               ( |'‘’)[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+      Doit commencer par un espace ou un ' et suivi d'au moins 1 caractère de la liste

        $nameEnd = "([-]([a-zàáâäçèéêëìíîïñòóôöùúûü0-9]+(( |'‘’)[a-zàáâäçèéêëìíîïñòóôöùúûü0-9]+)*)+)*$";
        //                                                                                  $   Doit être situé à la fin de la phrase
        // (                                                                              )*    Doit comporter 0 ou plusieurs éléments de la liste suivante
        //  [-](                                                                        )+      Doit comporter au moins 1 tiret suivi de la liste suivante
        //      [0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+(                                      )*        Doit comporter au moins 1 des caractères listés suivi de 0 ou plusieurs caractéres de la liste suivante
        //                                      ( |'‘’)[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+          Doit commencer par un espace ou un ' suivi d'au moins 1 caractère de la liste suivante

        $pregListForName = "/" . $nameBeginning . $nameEnd . "/i";
        $regexResult = (preg_match($pregListForName, $stringToCheck) ? true : false); // test de conformité du nom de famille, s'il est bon $lastnameChecks devient true

        return $regexResult;
    }
}
