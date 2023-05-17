export default function majorSectionsSlideIn() {
    function obsCallback(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('slideMeIn')) {
                    entry.target.classList.add('iSlidedIn');
                }
                else {
                    entry.target.classList.add('iWasRevealed');
                }
                observer.unobserve(entry.target);
            }
        });
    }
    var obsOptions = {};
    var observer = new IntersectionObserver(obsCallback, obsOptions);
    var majorSectionsList = document.querySelectorAll(".slideMeIn, .revealMe");
    majorSectionsList.forEach(function (el) { observer.observe(el); });
}
