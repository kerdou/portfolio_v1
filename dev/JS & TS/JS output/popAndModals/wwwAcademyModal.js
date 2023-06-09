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
import { throttle } from "../services/functionTiming";
export default function wwwAcademyModalManagement() {
    var globalContainer = document.getElementById('globalContainer');
    var sideMenuFiller = document.getElementById('sideMenuFiller');
    var wwwModalShowTriggerHook = document.getElementById('wwwModalShowTriggerHook');
    var wwwModalShowTriggerBio = document.getElementById('wwwModalShowTriggerBio');
    wwwModalShowTriggerHook.addEventListener('click', modalAppears);
    wwwModalShowTriggerBio.addEventListener('click', modalAppears);
    var wwwAcaModal = document.getElementById('wwwAcaModal');
    // le scroll ou le resize du viewport fait disparaitre la modale
    window.addEventListener('scroll', throttle(modalVanishes));
    window.addEventListener('resize', throttle(modalVanishes));
    // un clic à l'intérieur de la modale la fait disparaitre
    var closersWithinModal = document.querySelectorAll('dialog#wwwAcaModal *');
    Object.entries(closersWithinModal).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], element = _b[1];
        element.addEventListener('click', modalVanishes);
    });
    // un clic en dehors de la modale la fait disparaitre
    wwwAcaModal.addEventListener('click', (function (event) {
        var dialogBoxCoords = event.target.getBoundingClientRect();
        var mousePosChecks = {
            outsideByLeft: (dialogBoxCoords.left > event.clientX) ? true : false,
            outsideByRight: (dialogBoxCoords.right < event.clientX) ? true : false,
            outsideByTop: (dialogBoxCoords.top > event.clientY) ? true : false,
            outsideByBottom: (dialogBoxCoords.bottom < event.clientY) ? true : false
        };
        if (Object.entries(mousePosChecks).some((function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return value == false;
        }))) {
            modalVanishes();
        }
    }));
    function modalAppears() {
        globalContainer.style.opacity = '40%';
        sideMenuFiller.style.display = 'block';
        wwwAcaModal.showModal();
    }
    function modalVanishes() {
        globalContainer.removeAttribute('style');
        sideMenuFiller.removeAttribute('style');
        wwwAcaModal.close();
    }
}
