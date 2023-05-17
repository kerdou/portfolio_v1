<?php

namespace Kerdou\Portfolio\Controller\msgSend;

/** Controleur Post d'envoie de message */
class MsgPostController
{
    private array $cleanedUpGet = array();
    private array $cleanedUpInputData = array();
    private array $fieldsStatusArray = array();
    private array $mailAndDbStatusArray = array();


    public function __construct()
    {
        require_once "emailTgt.php";

        $this->fieldsStatusArray = [
            'lastName' => 'untested',
            'firstName' => 'untested',
            'comp' => 'untested',
            'tel' => 'untested',
            'mail' => 'untested',
            'msg' => 'untested'
        ];

        $this->mailAndDbStatusArray = [
            'fieldsValidity' => 'untested',
            'mail' => 'idle',
            'db' => 'idle'
        ];
    }


    public function __destruct()
    {
    }

    /** Recoit les GET['action'] pour determiner l'action à suivre et utilise les données de POST
     * @param array $cleanedUpGet       Données nettoyées du GET
     * @param array $cleanedUpInputData Données nettoyées du php://input
     */
    public function actionReceiver(array $cleanedUpGet, array $cleanedUpInputData)
    {
        $this->cleanedUpGet = $cleanedUpGet;
        $this->cleanedUpInputData = $cleanedUpInputData;

        if (isset($cleanedUpGet['action'])) {
            switch ($cleanedUpGet['action']) {
                case 'sendMsg':
                    $this->fieldsChecker();
                    $this->dbAndMailFollowUp();
                    $feedbackToFront = [
                        'fieldsStatus' => $this->fieldsStatusArray,
                        'mailAndDbStatus' => $this->mailAndDbStatusArray
                    ];
                    echo json_encode($feedbackToFront);
                    break;

                default: // si GET['action'] ne correspond à aucun cas de figure, on repart à la liste de tous les docteurs
                    echo "<script>window.location = 'index.php';</script>";
            }
        } else { // si GET['action'] n'est pas défini, on recharge la page
            echo "<script>window.location = 'index.php';</script>";
        }
    }


    /** Vérification des champs selon 2 critéres
     * * Longueur du contenu
     * * Conformité aux regex
     */
    private function fieldsChecker()
    {
        $this->fieldsLengthCheckMngmnt();
        $this->fieldsRegexMngmnt();
    }


    /** Gestion de la vérif de longueur des champs
     */
    private function fieldsLengthCheckMngmnt()
    {
        // Longueur min et max pour chaque champ
        $fieldsLengthRulesStore = [
            'lastName' => [
                'min' => 3,
                'max' => 30
            ],
            'firstName' => [
                'min' => 3,
                'max' => 30
            ],
            'comp' => [
                'min' => 3,
                'max' => 30
            ],
            'tel' => [
                'min' => 10,
                'max' => 17
            ],
            'mail' => [
                'min' => 6,
                'max' => 30
            ],
            'msg' => [
                'min' => 30,
                'max' => 1500
            ]
        ];

        // Vérif de la longueur pour chaque champ
        foreach ($this->fieldsStatusArray as $key => $value) {
            $this->fieldsStatusArray[$key] = $this->fieldLengthChecker(
                $this->cleanedUpInputData[$key],
                $fieldsLengthRulesStore[$key]['min'],
                $fieldsLengthRulesStore[$key]['max']
            );
        }
    }


    /** Vérifie si le string est trop long ou trop court
     * Renvoie un statut correctLength / tooShort / tooLong suivant le cas de figure
     * @param   string  $fieldContent   Le string a tester
     * @param   int     $minLength      Longueur minimum à respecter
     * @param   int     $maxLength      Longueur maximum à respecter
     * @return  string                  Statut renvoyé selon la longueur
     */
    private function fieldLengthChecker(string $fieldContent, int $minLength, int $maxLength): string
    {
        $lengthStatusStore = [
            'tooShort' => 'untested',
            'tooLong' => 'untested'
        ];

        $lengthStatusStore['tooShort'] = (strlen($fieldContent) < $minLength) ? 'wrong' : 'correct';
        $lengthStatusStore['tooLong'] = (strlen($fieldContent) > $maxLength) ? 'wrong' : 'correct';
        $whatsWrong = array_search('wrong', $lengthStatusStore);
        return ($whatsWrong == false) ? 'correctLength' : $whatsWrong;
    }


    /** Vérification des champs à travers des regex, se déclenche uniquement si la longueur est correcte
     */
    private function fieldsRegexMngmnt()
    {
        foreach ($this->fieldsStatusArray as $key => $value) {
            if ($value == 'correctLength') {
                switch ($key) {
                    case 'lastName':
                    case 'firstName':
                        $this->fieldsStatusArray[$key] = $this->nameRegex($this->cleanedUpInputData[$key]);
                        break;

                    case 'comp':
                        $this->fieldsStatusArray[$key] = $this->compNameRegex($this->cleanedUpInputData[$key]);
                        break;

                    case 'tel':
                        $this->fieldsStatusArray[$key] = $this->telRegex($this->cleanedUpInputData[$key]);
                        break;

                    case 'mail':
                        $this->fieldsStatusArray[$key] = $this->mailRegex($this->cleanedUpInputData[$key]);
                        break;

                    case 'msg':
                        $this->fieldsStatusArray[$key] = 'valid';
                        break;
                }
            }
        }
    }


    /** Regex des noms et prénoms
     * @param   string  $stringToCheck  String à vérifier
     * @return  string                  Statut de la string
     */
    private function nameRegex(string $stringToCheck): string
    {
        $nameChecker = new \Kerdou\Portfolio\Services\regexStore\NameRegex();
        $result = $nameChecker->nameRegex($stringToCheck);
        return ($result == true) ? 'valid' : 'regexFailed';
    }


    /** Regex des noms d'entreprise, un peu moins strict que la regex des noms et prénoms
     * @param   string  $stringToCheck  String à vérifier
     * @return  string                  Statut de la string
     */
    private function compNameRegex(string $stringToCheck): string
    {
        $nameChecker = new \Kerdou\Portfolio\Services\regexStore\NameRegex();
        $result = $nameChecker->companyNameRegex($stringToCheck);
        return ($result == true) ? 'valid' : 'regexFailed';
    }


    /** Regex des numéros de téléphone
     * @param   string  $stringToCheck  String à vérifier
     * @return  string                  Statut de la string
     */
    private function telRegex(string $stringToCheck): string
    {
        $telChecker = new \Kerdou\Portfolio\Services\regexStore\TelRegex();
        $result = $telChecker->telRegex($stringToCheck);
        return ($result == true) ? 'valid' : 'regexFailed';
    }


    /** Regex des adresses mail
     * @param   string  $stringToCheck  String à vérifier
     * @return  string                  Statut de la string
     */
    private function mailRegex(string $stringToCheck): string
    {
        $mailChecker = new \Kerdou\Portfolio\Services\regexStore\MailRegex();
        $result = $mailChecker->mailRegex($stringToCheck);
        return ($result == true) ? 'valid' : 'regexFailed';
    }


    /** Vérififation du statut des 6 champs
     * * Si tout est OK on fait l'envoi du mail et à la DB, avec mise à jour de $mailAndDbStatusArray
     * * Sinon on renvoie le statut failed des champs dans $mailAndDbStatusArray
     */
    private function dbAndMailFollowUp()
    {
        $checksResult = array_count_values($this->fieldsStatusArray);
        $howManyValidFields = (isset($checksResult['valid'])) ? $checksResult['valid'] : 0;

        if ($howManyValidFields == 6) {
            $this->mailAndDbStatusArray['fieldsValidity'] = 'valid';

            $this->prefixSplit();
            $feedbackFromMail = $this->sendMail();
            $this->mailAndDbStatusArray['mail'] = ($feedbackFromMail) ? 'sent' : 'failed';
            $this->cleanedUpInputData['mailSent'] = $feedbackFromMail;

            $feedbackFromDB = $this->insertToDb();
            $this->mailAndDbStatusArray['db'] = (strlen($feedbackFromDB) == 0) ? 'sent' : 'failed';
        } else {
            $this->mailAndDbStatusArray['fieldsValidity'] = 'failed';
        }
    }


    /** Sépare le préfixe du reste du numéro de tel
     * Cette fonction est principalement pensée pour les numéros à 10 chiffres avec des préfixes à 2 chiffres,
     * il n'y a presque aucune chance pour qu'un contact étranger laisse son numéro, donc ça passe.
     * Dans un cas réel il faudrait surement faire appel à une libraire connaissant tous les formats de numéros
     */
    private function prefixSplit()
    {
        $this->cleanedUpInputData['tel'] = str_replace(".", "", $this->cleanedUpInputData['tel']);
        $charCount = strlen($this->cleanedUpInputData['tel']);

        switch ($charCount) {
            case 10: // 0123456789
                $this->cleanedUpInputData['telPref'] = '33';
                break;

            case 12: // +33123456789
                $this->cleanedUpInputData['telPref'] = substr($this->cleanedUpInputData['tel'], 1, 2);
                $this->cleanedUpInputData['tel'] = '0' . substr($this->cleanedUpInputData['tel'], 3, 9);
                break;

            case 13: // 0033123456789
                $this->cleanedUpInputData['telPref'] = substr($this->cleanedUpInputData['tel'], 2, 2);
                $this->cleanedUpInputData['tel'] = '0' . substr($this->cleanedUpInputData['tel'], 4, 9);
                break;
        }
    }


    /** Envoie du mail
     * @return  bool    TRUE si mail envoyé, sinon FALSE
     */
    private function sendMail(): bool
    {
        $displayedTel = $this->cleanedUpInputData['tel'];
        $displayedTel = chunk_split($displayedTel, 2, ".");
        $displayedTel = substr($displayedTel, 0, 14);

        // Always set content-type when sending HTML email
        $headers[] = 'From: <contact-portfolio@kerdapp.ddns.net>';
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=UTF-8';

        $to = EMAILTGT;
        $subject = 'CONTACT PORTFOLIO - ' . $this->cleanedUpInputData['comp'] . ' - ' . $this->cleanedUpInputData['firstName'] . ' ' . $this->cleanedUpInputData['lastName'];

        $message = '
            <html>
                <head>
                    <title>CONTACT PORTFOLIO - ' . $this->cleanedUpInputData['comp'] . ' - ' . $this->cleanedUpInputData['firstName'] . ' ' . $this->cleanedUpInputData['lastName'] . '</title>
                </head>
                <body>
                    <h2>Un message de contact vient d\'être envoyé!</h2>

                    <p>
                    Société: ' . $this->cleanedUpInputData['comp'] . '<br>
                    Prénom: ' . $this->cleanedUpInputData['firstName'] . '<br>
                    Nom: ' . $this->cleanedUpInputData['lastName'] . '<br>
                    Tel: (' . $this->cleanedUpInputData['telPref'] . ') ' . $displayedTel . '<br>
                    Mail: ' . $this->cleanedUpInputData['mail'] . '</p>

                    <p>Message:<br>
                    ' . $this->cleanedUpInputData['msg'] . '</br>
                </body>
            </html>
            ';

        return mail($to, $subject, $message, implode("\r\n", $headers));
    }


    /** Envoie du message à la DB
     * @return  string  Message d'erreur en provenance de la DB, s'il y en a un
     */
    private function insertToDb(): string
    {
        $msgIntoDbModel = new \Kerdou\Portfolio\Model\msgIntoDb\MsgIntoDb();
        $feedbackFromDB = $msgIntoDbModel->insertMsgIntoDb($this->cleanedUpInputData);
        return $feedbackFromDB;
    }
}
