/** Debounce des inputs pour limiter les regex
 * @param   {Function}  tgtFunction   Fonction déclenchée une fois le délai passé
 * @param   {number}    delay         Durée du délai en ms
 * @returns                           C'est un closure donc pas de return a proprement parler, mais la fonction cible est lancée
 */
export function debounce(tgtFunction, delay) {
    if (delay === void 0) { delay = 400; }
    var timerID;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timerID);
        timerID = setTimeout(function () {
            tgtFunction.apply(_this, args);
        }, delay);
    };
}
/** Lance la tgtFunction une fois le délai écoulé
 * @param { Funtion }   tgtFunction     Fonction cible
 * @param { number }    interval        Intervale entre chaque activation de la fonction cible
 * @returns                             La fonction cible lancée
 */
export function throttle(tgtFunction, interval) {
    if (interval === void 0) { interval = 300; }
    var previousDate;
    var timerID;
    return function () {
        var _this = this;
        var now = +new Date();
        var nextLaunchDate = previousDate + interval;
        if (previousDate && now < nextLaunchDate) {
            clearTimeout(timerID);
            timerID = setTimeout(function () {
                previousDate = now;
                tgtFunction.apply(_this);
            }, interval);
        }
        else {
            previousDate = now;
            tgtFunction.apply(this);
        }
    };
}
