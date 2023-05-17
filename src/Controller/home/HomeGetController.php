<?php

namespace Kerdou\Portfolio\Controller\home;

/** Controleur Get de la page d'accueil */
class HomeGetController
{
    private object $homeView; // Affichage des tableaux de la section accueil

    public function __destruct()
    {
    }

    /** Affichage de la page d'accueil:
    */
    public function displayHomePage(): void
    {
        $this->homeView = new \Kerdou\Portfolio\View\home\HomePageBuilder();
        $this->homeView->buildOrder();
    }
}
