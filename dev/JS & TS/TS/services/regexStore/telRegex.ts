export function telRegex(telValue: string): boolean {
    /** ^(([0]{1})|((\+){1}|(00))(\d){2})                                               Commence par le préfixe qui peut être 0 ou +XX ou 00XX
     *                                   ([1-9]{1}[. ]?)                                Suivi d'un chiffre allant de 1 à 9 suivi d'un . ou pas
     *                                                  ([0-9]{2}[. ]?){3}              Suivi de 3 pairs de chiffres allant de 0 à 9 suivis chacun d'un . ou pas
     *                                                                    ([0-9]{2})$   Se termine par 2 chiffres allant de 0 à 9
     * */
    const tel = "^(([0]{1})|((\\+){1}|(00))(\\d){2})([1-9]{1}[. ]?)([0-9]{2}[. ]?){3}([0-9]{2})$";
    const telRegex = new RegExp(tel); // création du regex
    return telRegex.test(telValue.trim());
}