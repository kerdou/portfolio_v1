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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export default function hookManagement() {
    var iamObj = {
        iAmFullStack: 'DÉVELOPPEUR FULLSTACK',
        iAmRig: 'RIGOUREUX',
        iAmCur: 'CURIEUX',
        iAmInt: 'INTÈGRE',
        iAmPedag: 'PÉDAGOGUE',
        iAmMethod: 'MÉTHODIQUE',
        iAmImpl: 'IMPLIQUÉ'
    };
    var iAmCompleteList = Object.keys(iamObj); // liste complête des classes CSS
    var previousIAmArr = ['iAmFullStack']; // liste des classes CSS déjà utilisés
    var iAmText = document.getElementById('iAmText');
    iAmText.addEventListener('animationend', iAmAnimSwap);
    /**
     * A la fin d'une animation:
     * * Supprimer l'animation précédente
     * * Remplacer le texte
     * * Lancer l'animation suivante
     * * Lancer également sans transition à venir
     * * Supprimer la transition précédente avec un delai de 2 secondes
     *
     * Transition:
     * * La transition est un fondu jouant sur l'opacity
     * * Elle sert à masquer momentanément div#iAmText le temps qu'elle
     *   se redimensionne en passant d'un texte à l'autre
     * * La transition doit avoir un délai = à 2x l'animation - 450ms
     * * Elle doit avoir une durée de 900ms
     * * Elle est lancée en même temps que son animation typewriter grace à une classe à part
     * * Chaque animation typewriter à sa transition dediée pour avoir les bons timings
     */
    /** Boucle gérant le changement du texte de 'iAmText' et des classes lançant les animations
     */
    function iAmAnimSwap() {
        var iAmWIPList = __spreadArray([], __read(iAmCompleteList), false); // copie de toutes les classes possibles
        // on spprime de iAmWIPList toutes les classes présentes dans previousIAmArr
        previousIAmArr.forEach(function (value) {
            var iAmWIPListIndex = iAmWIPList.indexOf(value);
            iAmWIPList.splice(iAmWIPListIndex, 1);
        });
        // si previousIAmArr contient déjà 4 classes, on supprime la plus ancienne
        if (previousIAmArr.length == 4) {
            previousIAmArr.shift();
        }
        var nextIndex = Math.floor(Math.random() * (iAmWIPList.length - 0)); // selection randomisée de la nouvelle classe
        previousIAmArr.push(iAmWIPList[nextIndex]); // ajout de la nouvelle classe à la fin de previousIAmArr
        iAmText.classList.remove(previousIAmArr[previousIAmArr.length - 2]); // suppression de la classe précédente de la DIV
        iAmText.classList.add(iAmWIPList[nextIndex]); // ajout de la nouvelle classe dans la DIV
        iAmText.classList.add(iAmWIPList[nextIndex] + 'Reset'); // ajout de la nouvelle classe de transition
        iAmText.innerText = iamObj[iAmWIPList[nextIndex]]; // remplacement par le nouveau texte correspondant
        window.setTimeout(function () { return iAmText.classList.remove(previousIAmArr[previousIAmArr.length - 2] + 'Reset'); }, 1000); // suppression de la transition précédente
    }
}
