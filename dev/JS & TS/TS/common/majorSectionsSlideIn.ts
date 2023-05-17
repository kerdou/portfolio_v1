export default function majorSectionsSlideIn() {
    function obsCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('slideMeIn')) {
                    entry.target.classList.add('iSlidedIn');
                } else {
                    entry.target.classList.add('iWasRevealed');
                }

                observer.unobserve(entry.target);
            }
        });
    }

    const obsOptions = {

    };

    const observer = new IntersectionObserver(obsCallback, obsOptions);

    const majorSectionsList = document.querySelectorAll(".slideMeIn, .revealMe");
    majorSectionsList.forEach((el) => {observer.observe(el);});
}