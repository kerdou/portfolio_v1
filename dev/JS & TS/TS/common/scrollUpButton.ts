import { throttle } from './../services/functionTiming';
import  getElemAbsoluteCoords from '../services/getElemAbsoluteCoords';

export default function scrollUpButton() {
    const scrollUpButton = document.getElementById('scrollUpButton') as HTMLButtonElement;
    scrollUpButton.addEventListener('click', scrollToTop);

    /** Remonte l'écran quand la fonction est activée
     */
    function scrollToTop(): void {
        const scrollUpButton = document.getElementById('scrollUpButton') as HTMLButtonElement;

        if (scrollUpButton.style.opacity === '1') {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }


    window.addEventListener('scroll', throttle(scrollUpButtonDisplayBehaviour, 250));

    /** Fait apparaitre ou disparaitre le scrollUp button si l'écran est scroll à plus ou moins de 20px du haut de page
      */
    function scrollUpButtonDisplayBehaviour(): void {
        const scrollUpButton = document.getElementById('scrollUpButton') as HTMLButtonElement;

        if (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            scrollUpButton.style.visibility = 'visible';
            scrollUpButton.style.opacity = '1';
            scrollUpButton.style.cursor = 'pointer';
        } else {
            scrollUpButton.style.opacity = '0';

            setTimeout(function () { // retard de visibility=hidden et pointer=none pour garantir une disparition fluide du scrollUpButton
                if (scrollUpButton.style.opacity === '0') { // le if évite d'avoir des changements intempestifs d'état
                    scrollUpButton.style.visibility = 'hidden';
                    scrollUpButton.style.cursor = 'none';
                }
            }, 250);
        }
    }

    const mainContainer = document.getElementById('mainContainer') as HTMLElement;
    window.addEventListener('load', repositWithResize);
    window.addEventListener('resize', throttle(repositWithResize, 150));

    /** Calcul la postion Right du bouton au resize et au load
     * A l'origine il y avait 3 cas de figures possible, d'où la création de l'objet widthChecks
     * et le switch case offsetSwitch()
     * C'est plus compliqué que ça n'a besoin de l'être mais ça pourrait resservir, donc je garde en l'état
     */
    function repositWithResize() {
        const mainContainerRightAbsCoord = getElemAbsoluteCoords(mainContainer, 'right');
        const rightCalc = window.innerWidth - mainContainerRightAbsCoord;

        const widthChecks: {[index: string]: boolean} = {};
        widthChecks.above750 = (window.innerWidth >= 750) ? true : false;
        widthChecks.below750 = (window.innerWidth < 750) ? true : false;

        Object.entries(widthChecks).every(([key, value]) => {
            if (value == true) {
                const offsetValue = offsetSwitch(key);
                scrollUpButton.style.right = (rightCalc + offsetValue).toString() + 'px';
                return false;
            } else {
                return true;
            }
        });
    }

    /** Renvoie l'offset selon le cas de figure
     * @param {string} widthCase
     * @returns {number}
     */
    function offsetSwitch(widthCase: string): number {
        let offsetValue = 0;

        switch (widthCase) {
            case 'above750':
                offsetValue = 5;
                break;

            case 'below750':
                offsetValue = 0;
                break;
        }

        return offsetValue;
    }
}
