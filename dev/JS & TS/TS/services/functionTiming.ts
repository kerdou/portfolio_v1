/** Debounce des inputs pour limiter les regex
 * @param   {Function}  tgtFunction   Fonction déclenchée une fois le délai passé
 * @param   {number}    delay         Durée du délai en ms
 * @returns                           C'est un closure donc pas de return a proprement parler, mais la fonction cible est lancée
 */
export function debounce(tgtFunction: any , delay = 400) {
    let timerID: NodeJS.Timeout | number;

    return function (this: any, ...args: any[]) {
        clearTimeout(timerID);

        timerID = setTimeout(() => {
            tgtFunction.apply(this, args);
        }, delay);
    };
}


/** Lance la tgtFunction une fois le délai écoulé
 * @param { Funtion }   tgtFunction     Fonction cible
 * @param { number }    interval        Intervale entre chaque activation de la fonction cible
 * @returns                             La fonction cible lancée
 */
export function throttle(tgtFunction: any, interval = 300) {
    let previousDate: number;
    let timerID: NodeJS.Timeout | number;

    return function (this: any) {
        const now = +new Date();
        const nextLaunchDate = previousDate + interval;

        if (previousDate && now < nextLaunchDate) {
            clearTimeout(timerID);

            timerID = setTimeout(() => {
                previousDate = now;
                tgtFunction.apply(this);
            }, interval);
        } else {
            previousDate = now;
            tgtFunction.apply(this);
        }
    };
}
