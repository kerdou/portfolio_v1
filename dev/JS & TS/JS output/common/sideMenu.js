import { throttle } from '../services/functionTiming';
export default function sideMenuManagement() {
    var globalContainer = document.getElementById('globalContainer');
    var sideMenu = document.getElementById('sideMenu');
    var sideMenuFiller = document.getElementById('sideMenuFiller');
    var sideMenuButtons = document.querySelectorAll('#sideMenu a');
    vanishingTriggers();
    /** Déclencheurs de rétractation du sideMenu
     */
    function vanishingTriggers() {
        window.addEventListener('scroll', throttle(menuVanishing));
        window.addEventListener('resize', throttle(windowResizeChecker));
        sideMenuFiller.addEventListener('click', menuVanishing);
        sideMenuButtons.forEach(function (element) {
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
