import { throttle } from './../../services/functionTiming';

export default function bioManagement() {
    const globalContainer = document.getElementById('globalContainer') as HTMLDivElement;
    const sideMenuFiller = document.getElementById('sideMenuFiller') as HTMLDivElement;

    const wwwModalShowTrigger = document.getElementById('wwwModalShowTrigger') as HTMLSpanElement;
    const wwwAcaModal = document.getElementById('wwwAcaModal') as HTMLDialogElement;
    wwwModalShowTrigger.addEventListener('click', modalAppears);

    // le scroll ou le resize du viewport fait disparaitre la modale
    window.addEventListener('scroll', throttle(modalVanishes));
    window.addEventListener('resize', throttle(modalVanishes));

    // un clic à l'intérieur de la modale la fait disparaitre
    const closersWithinModal = document.querySelectorAll('dialog#wwwAcaModal *');
    Object.entries(closersWithinModal).forEach(([key, element]) => {
        element.addEventListener('click', modalVanishes);
    });

    // un clic en dehors de la modale la fait disparaitre
    wwwAcaModal.addEventListener('click',
        ((event) => {
            const dialogBoxCoords = (event.target as HTMLDialogElement).getBoundingClientRect();

            const mousePosChecks = {
                outsideByLeft: (dialogBoxCoords.left > event.clientX) ? true : false,
                outsideByRight: (dialogBoxCoords.right < event.clientX) ? true : false,
                outsideByTop: (dialogBoxCoords.top > event.clientY) ? true : false,
                outsideByBottom: (dialogBoxCoords.bottom < event.clientY) ? true : false
            };

            if (Object.entries(mousePosChecks).some((([key, value]) => {return value == false;}))) {
                modalVanishes();
            }
        })
    );


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