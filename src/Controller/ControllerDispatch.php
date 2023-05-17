<?php

namespace Kerdou\Portfolio\Controller;

/** Classe de dispatch qui lance tout le reste
 * * Récupération et analyse du contenu de $_GET['controller'] et $_GET['action']
 */
class ControllerDispatch extends GetAndPostCleaner
{
    private array $cleanedUpGet; // Recoit les données du $_GET une fois nettoyées
    private array $cleanedUpPost; // Recoit les données du $_POST une fois nettoyées
    private string $selectedController; // Recoit le nom du controleur qui est forcément inclut dans $_GET['controller']

    /** Nettoyage des $_GET et $_POST avant envoi pour la suite
     */
    public function __construct()
    {
        $this->generalSetter();
        $this->cleanedUpGet = (isset($_GET)) ? $this->inputCleaner($_GET) : array();
        $this->cleanedUpPost = (isset($_POST)) ? $this->inputCleaner($_POST) : array();
        $this->selectedController = (isset($this->cleanedUpGet['controller'])) ? $this->cleanedUpGet['controller'] : 'default';
        $this->unloggedDispatcher();
    }

    public function __destruct()
    {
    }

    /** Lancement de fonctions et options pouvant être utilisées sur toute l'appli
     */
    private function generalSetter(): void
    {
        session_start();
        setlocale(LC_TIME, 'fr_FR', 'fra');
        date_default_timezone_set('Europe/Paris');
        \Kerdou\Portfolio\Services\common\DateAndTimeManagement::envDateSetter();
        $_ENV['APPROOTPATH'] = __DIR__ . '/' . '../../'; // pour avoir le chemin de la racine du projet accessible depuis n'importe quel fichier
    }
    /** Oriente vers la page de login ou de création de compte si $_SESSION est vide
     */
    private function unloggedDispatcher(): void
    {
        switch ($this->selectedController) {
            case 'sendMsg':
                // Récupération des données du form envoyées par fetch()
                // Puis conversion en tableau associatif et nettoyage des données
                $receivedJsonFile = file_get_contents('php://input');
                $receivedInputData = json_decode($receivedJsonFile, true);
                $cleanedUpInputData = $this->inputCleaner($receivedInputData);

                $controllerObj = new \Kerdou\Portfolio\Controller\msgSend\MsgPostController();
                $controllerObj->actionReceiver($this->cleanedUpGet, $cleanedUpInputData);
                break;

            default: // Renvoi vers la page de login si rien n'est précisé
                $controllerObj = new \Kerdou\Portfolio\Controller\home\HomeGetController();
                $controllerObj->displayHomePage();
        }
    }
}
