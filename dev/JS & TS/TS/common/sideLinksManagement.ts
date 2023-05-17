import { throttle } from './../services/functionTiming';
import  getElemAbsoluteCoords from '../services/getElemAbsoluteCoords';

export default function sideLinksManagement() {
    const sideLinksLeft = document.getElementById('sideLinksLeft') as HTMLElement;
    const sideLinksRight = document.getElementById('sideLinksRight') as HTMLElement;

    const mainContainer = document.getElementById('mainContainer') as HTMLElement;
    window.addEventListener('load', repositWithResize);
    window.addEventListener('resize', throttle(repositWithResize, 150));


    /** Calcul la postion Left et Right du sideLinks au resize et au load
     */
    function repositWithResize() {
        const mainContainerLeftAbsCoord = getElemAbsoluteCoords(mainContainer, 'left');
        const mainContainerRightAbsCoord = getElemAbsoluteCoords(mainContainer, 'right');

        const leftCalc = mainContainerLeftAbsCoord - 100;
        const rightCalc = window.innerWidth - mainContainerRightAbsCoord - 100;

        sideLinksLeft.style.left = leftCalc.toString() + 'px';
        sideLinksRight.style.right = rightCalc.toString() + 'px';
    }
}