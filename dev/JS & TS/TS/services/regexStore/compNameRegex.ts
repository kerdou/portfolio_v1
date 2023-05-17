export function compNameRegex(nameValue: string): boolean {
    //$pregListForName = "/^([a-zàáâäçèéêëìíîïñòóôöùúûü]+[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]?(( |['‘’])[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |['‘’])[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/i";

    /** IOS rajoute un problème avec les apostrophes:
     * Quand on appuie sur ' sur le clavier virtuel, cela génére en réalité un ‘ ou un ’
     *
     * Par conséquent, la regex a du être modifiée en remplaçant ( |') par ( |['‘’])
     */


    const nameBeginning = "^([a-zàáâäçèéêëìíîïñòóôöùúûü]+[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]?(( |['‘’])[a-zàáâäçèéêëìíîïñòóôöùúûü0-9]+)*)+";
    // ^                                                                                                           Doit être situé au début de la phrase
    //  (                                                                                                      )+  Doit inclure au moins 1 des caractères situés dans la liste suivante
    //   [a-zàáâäçèéêëìíîïñòóôöùúûü]+[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]?(                                        )*    Doit commencer par au moins 1 des caractères de la liste, la suite n'est pas obligatoire
    //                                                               ( |['‘’])[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+      Doit commencer par un espace ou un ' et suivi d'au moins 1 caractère de la liste

    const nameEnding = "([-]([a-zàáâäçèéêëìíîïñòóôöùúûü0-9]+(( |['‘’])[a-zàáâäçèéêëìíîïñòóôöùúûü0-9]+)*)+)*$";
    //                                                                                    $   Doit être situé à la fin de la phrase
    // (                                                                                )*    Doit comporter 0 ou plusieurs éléments de la liste suivante
    //  [-](                                                                          )+      Doit comporter au moins 1 tiret suivi de la liste suivante
    //      [0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+(                                        )*        Doit comporter au moins 1 des caractères listés suivi de 0 ou plusieurs caractéres de la liste suivante
    //                                      ( |['‘’])[0-9a-zàáâäçèéêëìíîïñòóôöùúûü]+          Doit commencer par un espace ou un ' suivi d'au moins 1 caractère de la liste suivante

    const nameConcat = nameBeginning + nameEnding; // Etape nécessaire avant de transformer la string en expression régulière.
    const nameModifier = 'i'; // insensible à la casse
    const nameRegex = new RegExp(nameConcat, nameModifier); // création du regex
    return nameRegex.test(nameValue.trim());
}