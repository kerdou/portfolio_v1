<?php

namespace Kerdou\Portfolio\View\home;

/** Assemblage de la homepage avant affichage
 * Elle n'affiche que les futurs rendez-vous
 */
class HomePageBuilder extends \Kerdou\Portfolio\View\common\ViewInChief
{
    private array $pageSettingsList = array();
    private array $contentSettingsList = array();


    public function __construct()
    {
        parent::__construct();
        $this->pageElementsSettingsList();
        $this->pageElementsStringReplace(); // configuration de la page

        $this->mainContainerSettingsList();
        $this->mainContainerStringReplace();
    }

    public function __destruct()
    {
    }

    /** Insertion des grands ensembles de la page en dehors du contenu du Main Container
     */
    private function pageElementsSettingsList(): void
    {
        $this->pageSettingsList = array(
            'headContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/declarations/head.html'),
            'topMenuContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/header/topMenu.html'),
            'mainContainerContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/mainContainer.html'),
            'footerContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/footer/footer.html'),
            'sideMenuContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/header/topMenu.html'),
            'sideLinksLeftContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/common/sideLinksLeft.html'),
            'sideLinksRightContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/common/sideLinksRight.html'),
            'bottomLinksContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/common/sideLinksLeft.html'),
            'stackModalContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/popAndModals/stackModal.html'),
            'wwwAcaModalContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/popAndModals/wwwAcaModal.html'),
            'scrollUpButtonContent' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/common/scrollUpArrow.html'),
            'bodyBottomDeclarations' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/declarations/bodyBottomDeclarations.html')
        );

        // le lien du footer n'ont pas besoin de faire un slide up au hover, donc on modifie les classes avant la copie dans le footer
        $this->pageSettingsList['bottomLinksContent'] = str_replace('iconLinkEffectSlide', 'iconLinkEffectNoSlide', $this->pageSettingsList['bottomLinksContent']);
    }

    /** Application de tous les paramétres listés dans $pageSettingsList
     */
    private function pageElementsStringReplace(): void
    {
        $this->pageContent = str_replace('{headContent}', $this->pageSettingsList['headContent'], $this->pageContent);
        $this->pageContent = str_replace('{topMenuContent}', $this->pageSettingsList['topMenuContent'], $this->pageContent);
        $this->pageContent = str_replace('{mainContainerContent}', $this->pageSettingsList['mainContainerContent'], $this->pageContent);
        $this->pageContent = str_replace('{footerContent}', $this->pageSettingsList['footerContent'], $this->pageContent);
        $this->pageContent = str_replace('{sideMenuContent}', $this->pageSettingsList['sideMenuContent'], $this->pageContent);
        $this->pageContent = str_replace('{sideLinksLeftContent}', $this->pageSettingsList['sideLinksLeftContent'], $this->pageContent);
        $this->pageContent = str_replace('{sideLinksRightContent}', $this->pageSettingsList['sideLinksRightContent'], $this->pageContent);
        $this->pageContent = str_replace('{bottomLinksContent}', $this->pageSettingsList['bottomLinksContent'], $this->pageContent);
        $this->pageContent = str_replace('{stackModalContent}', $this->pageSettingsList['stackModalContent'], $this->pageContent);
        $this->pageContent = str_replace('{wwwAcaModalContent}', $this->pageSettingsList['wwwAcaModalContent'], $this->pageContent);
        $this->pageContent = str_replace('{scrollUpButtonContent}', $this->pageSettingsList['scrollUpButtonContent'], $this->pageContent);
        $this->pageContent = str_replace('{bodyBottomDeclarations}', $this->pageSettingsList['bodyBottomDeclarations'], $this->pageContent);
    }

    /** Insertion des contenus présents dans Main Container
     */
    private function mainContainerSettingsList(): void
    {
        $this->contentSettingsList = array(
            'hook' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/hook.html'),
            'bio' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/bio.html'),
            'toolbox' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/toolbox.html'),
            'stack' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/stack.html'),
            'projects' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/projects.html'),
            'contactForm' => file_get_contents($_ENV['APPROOTPATH'] . 'templates/sections/mainSection/contactForm.html')
        );
    }

    /** Application de tous les paramétres listés dans $contentSettingsList
     */
    private function mainContainerStringReplace(): void
    {
        $this->pageContent = str_replace('{hook}', $this->contentSettingsList['hook'], $this->pageContent);
        $this->pageContent = str_replace('{bio}', $this->contentSettingsList['bio'], $this->pageContent);
        $this->pageContent = str_replace('{toolbox}', $this->contentSettingsList['toolbox'], $this->pageContent);
        $this->pageContent = str_replace('{stack}', $this->contentSettingsList['stack'], $this->pageContent);
        $this->pageContent = str_replace('{projects}', $this->contentSettingsList['projects'], $this->pageContent);
        $this->pageContent = str_replace('{contactForm}', $this->contentSettingsList['contactForm'], $this->pageContent);
    }

    /** Recoit les données des futurs rendez-vous puis lance la construction du HTML de ce contenu
     */
    public function buildOrder(): void
    {
        $this->pageDisplay();
    }
}
