import { throttle } from './../services/functionTiming';
import getElemAbsoluteCoords from '../services/getElemAbsoluteCoords';
export default function sideLinksManagement() {
    var sideLinksLeft = document.getElementById('sideLinksLeft');
    var sideLinksRight = document.getElementById('sideLinksRight');
    var mainContainer = document.getElementById('mainContainer');
    window.addEventListener('load', repositWithResize);
    window.addEventListener('resize', throttle(repositWithResize, 150));
    /** Calcul la postion Left et Right du sideLinks au resize et au load
     */
    function repositWithResize() {
        var mainContainerLeftAbsCoord = getElemAbsoluteCoords(mainContainer, 'left');
        var mainContainerRightAbsCoord = getElemAbsoluteCoords(mainContainer, 'right');
        var leftCalc = mainContainerLeftAbsCoord - 100;
        var rightCalc = window.innerWidth - mainContainerRightAbsCoord - 100;
        sideLinksLeft.style.left = leftCalc.toString() + 'px';
        sideLinksRight.style.right = rightCalc.toString() + 'px';
    }
}
