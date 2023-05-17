import { throttle } from '../services/functionTiming';

export default function sideMenuManagement() {
    const globalContainer = document.getElementById('globalContainer') as HTMLDivElement;
    const sideMenu = document.getElementById('sideMenu') as HTMLDivElement;
    const sideMenuFiller = document.getElementById('sideMenuFiller') as HTMLDivElement;
    const sideMenuButtons = document.querySelectorAll('#sideMenu a') as NodeListOf<HTMLAnchorElement>;

    vanishingTriggers();

    /** Déclencheurs de rétractation du sideMenu
     */
    function vanishingTriggers() {
        window.addEventListener('scroll', throttle(menuVanishing));
        window.addEventListener('resize', throttle(windowResizeChecker));
        sideMenuFiller.addEventListener('click', menuVanishing);
        sideMenuButtons.forEach((element: HTMLAnchorElement) => {
            element.addEventListener('click', menuVanishing);
        });
    }

    /** Vérification de la largeur de la fenêtre, au delà de 750px le sideMenu de rétracte
     */
    function windowResizeChecker() {
        if (window.innerWidth >= 750) {
            menuVanishing();
        }
    }

    /** Rétractation du sideMenu
     */
    function menuVanishing() {
        globalContainer.removeAttribute('style');
        sideMenuFiller.removeAttribute('style');
        sideMenu.removeAttribute('style');
    }
}
