import { throttle } from '../../services/functionTiming';
export default function topMenuManagement() {
    var globalContainer = document.getElementById('globalContainer');
    var topMenu = document.getElementById('topMenu');
    var burgerButton = document.querySelector('#topMenu > button');
    var sideMenu = document.getElementById('sideMenu');
    var sideMenuFiller = document.getElementById('sideMenuFiller');
    topMenuOnScroll();
    /** Gére l'apparition ou la disparition du topMenu suivant le scroll de la fenêtre
     */
    function topMenuOnScroll() {
        window.addEventListener('scroll', throttle(yOffsetManager, 250));
        var previousYOffest = 0;
        /** Est-ce qu'on est en haut de la page?
         * * Si c'est le cas on fait descendre le topMenu pour qu'il apparaisse en haut du viewport
         * * Sinon on lance le comparateur d'offset vertical du viewport
         */
        function yOffsetManager() {
            window.pageYOffset == 0 ? (topMenu.style.top = '0') : yOffsetComparator();
        }
        /** Est-ce qu'on est plus bas dans la page qu'au cycle précédent?
         * * Si c'est le cas on cache le topMenu au dessus du viewport
         * * Sinon on le fait apparaitre en haut du viewport
         */
        function yOffsetComparator() {
            window.pageYOffset > previousYOffest ? (topMenu.style.top = '-51px') : (topMenu.style.top = '0');
            previousYOffest = window.pageYOffset;
        }
    }
    burgerButton.addEventListener('click', sideMenuAppears);
    /** Apparition du sideMenu et de son Filler au clic sur le burgerMenu
     */
    function sideMenuAppears() {
        globalContainer.style.opacity = '40%';
        sideMenuFiller.style.display = 'block';
        sideMenu.style.right = '0px';
    }
}
