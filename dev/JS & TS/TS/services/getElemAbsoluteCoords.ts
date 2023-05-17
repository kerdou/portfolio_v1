/** Calcul des coordonnées absolues d'un élément dans une page
 * Addition de:
 * * Position de la viewport par rapport à la page
 * * Position de l'élément par rapport au viewport
 * @param   { HTMLSpanElement }     element     Elément à analyser
 * @param   { string }              positCase   Case de figure
 * @returns { number }                          Coordonnée calculée
 */
export default function getElemAbsoluteCoords(element: HTMLSpanElement, positCase: string) {
    const viewportCoord = element.getBoundingClientRect();
    let absoluteCoord = 0;

    switch(positCase) {
        case 'top':
            absoluteCoord = window.scrollY + viewportCoord.top;
            break;

        case 'bottom':
            absoluteCoord = window.scrollY + viewportCoord.bottom;
            break;

        case 'left':
            absoluteCoord = window.scrollX + viewportCoord.left;
            break;

        case 'right':
            absoluteCoord = window.scrollX + viewportCoord.right;
            break;
    }

    return absoluteCoord;
}