<?php

namespace Kerdou\Portfolio\Model\common;

/** Classe maître d'accés à la database MySQL via un PDO
 */
abstract class ModelInChief
{
    protected object $pdo; // PDO d'accès à la BDD
    protected object $query; // Contient la requete à envoyer à la base, renvoi une exception en cas de problème


    /** Construction du PDO
    */
    public function __construct()
    {
        require_once "dbSettings.php"; // fichier de configuration de la connexion à la DB
        $hostmode = 'dev';

        // utilise les identifiants de cnx au serveur SQL suivant le mode choisi
        switch ($hostmode) {
            case 'dev':
                $host = DEVHOST;
                $base = DEVBASE;
                $user = DEVUSER;
                $password = DEVPWD;
                break;
            case 'prod':
                $host = PRODHOST;
                $base = PRODBASE;
                $user = PRODUSER;
                $password = PRODPWD;
        }

        $this->pdoInit($host, $base, $user, $password);
    }

    /** Construction du PDO
     * @param string $host          Adresse de l'hôte
     * @param string $base          Nom de la DB
     * @param string $user          Login de cnx au serveur SQL
     * @param string $password      Mot de passe
     * @throws string               Message d'erreur
     */
    protected function pdoInit(string $host, string $base, string $user, string $password)
    {
        try {
            $this->pdo = new \PDO(
                "mysql:host=" . $host . ";" .
                "dbname=" . $base,
                $user,
                $password
            );
        } catch (\Exception $e) {
            echo 'Error : ' . $e->getMessage();
            throw $e; // permet d'arrêter le script et d'ajouter l'erreur dans les logs Apache (merci Reno!)
        }

        $this->pdo->setAttribute(\PDO::ATTR_STRINGIFY_FETCHES, true); // WAMPServer sur Windows renvoie tous les int en string, cette ligne permet de répliquer ce comportement sur un serveur Linux pour éviter des bugs de typage strict sur speMedicDocOfficeForm.ts. Un .includes() qui ne reconnait pas une valeur à cause d'un souci de typage par exemple.
        $this->pdo->exec("SET CHARACTER SET utf8");
    }


    /** Envoi de la requete à la BDD puis fermeture de la connexion après qu'elle ait réussi
     * Ne doit être utilisé que pour les INSERT, UPDATE et DELETE préparés
    */
    protected function pdoPreparedInsertUpdateDeleteExecute()
    {
        $errorMessage = '';

        try {
            $this->query->execute();
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();
            echo 'Error : ' . $e->getMessage();
            throw $e; // permet d'arrêter le script et d'ajouter l'erreur dans les logs Apache (merci Reno!)
        }

        $this->query->closeCursor();
        return $errorMessage;
    }
}
