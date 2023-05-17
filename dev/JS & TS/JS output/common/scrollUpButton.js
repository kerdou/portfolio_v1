var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { throttle } from './../services/functionTiming';
import getElemAbsoluteCoords from '../services/getElemAbsoluteCoords';
export default function scrollUpButton() {
    var scrollUpButton = document.getElementById('scrollUpButton');
    scrollUpButton.addEventListener('click', scrollToTop);
    /** Remonte l'écran quand la fonction est activée
     */
    function scrollToTop() {
        var scrollUpButton = document.getElementById('scrollUpButton');
        if (scrollUpButton.style.opacity === '1') {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }
    window.addEventListener('scroll', throttle(scrollUpButtonDisplayBehaviour, 250));
    /** Fait apparaitre ou disparaitre le scrollUp button si l'écran est scroll à plus ou moins de 20px du haut de page
      */
    function scrollUpButtonDisplayBehaviour() {
        var scrollUpButton = document.getElementById('scrollUpButton');
        if (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20) {
            scrollUpButton.style.visibility = 'visible';
            scrollUpButton.style.opacity = '1';
            scrollUpButton.style.cursor = 'pointer';
        }
        else {
            scrollUpButton.style.opacity = '0';
            setTimeout(function () {
                if (scrollUpButton.style.opacity === '0') { // le if évite d'avoir des changements intempestifs d'état
                    scrollUpButton.style.visibility = 'hidden';
                    scrollUpButton.style.cursor = 'none';
                }
            }, 250);
        }
    }
    var mainContainer = document.getElementById('mainContainer');
    window.addEventListener('load', repositWithResize);
    window.addEventListener('resize', throttle(repositWithResize, 150));
    /** Calcul la postion Right du bouton au resize et au load
     * A l'origine il y avait 3 cas de figures possible, d'où la création de l'objet widthChecks
     * et le switch case offsetSwitch()
     * C'est plus compliqué que ça n'a besoin de l'être mais ça pourrait resservir, donc je garde en l'état
     */
    function repositWithResize() {
        var mainContainerRightAbsCoord = getElemAbsoluteCoords(mainContainer, 'right');
        var rightCalc = window.innerWidth - mainContainerRightAbsCoord;
        var widthChecks = {};
        widthChecks.above750 = (window.innerWidth >= 750) ? true : false;
        widthChecks.below750 = (window.innerWidth < 750) ? true : false;
        Object.entries(widthChecks).every(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (value == true) {
                var offsetValue = offsetSwitch(key);
                scrollUpButton.style.right = (rightCalc + offsetValue).toString() + 'px';
                return false;
            }
            else {
                return true;
            }
        });
    }
    /** Renvoie l'offset selon le cas de figure
     * @param {string} widthCase
     * @returns {number}
     */
    function offsetSwitch(widthCase) {
        var offsetValue = 0;
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
