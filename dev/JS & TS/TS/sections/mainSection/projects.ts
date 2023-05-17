export default function projectsManagement() {
    const projContainer = document.getElementById('projContainer') as HTMLDivElement;
    const projects = projContainer.children;

    Object.entries(projects).forEach(([indexNbr, elem]) => {
        const element = elem as HTMLDivElement;
        const elementID = element.id;
        const bgDiv = element.querySelector('div[class="projBG"]') as HTMLDivElement;
        let path = '';

        switch(elementID) {
            case 'healthkerdProj':
                path = './img/jpg/healthkerd.jpg';
                bgDiv.addEventListener(
                    'click',
                    () => {
                        window.open('https://kerdapp.ddns.net/healthkerd/', '_blank');
                    }
                );
                break;

            case 'portfolioProj':
                path = './img/jpg/portfolio.jpg';
                bgDiv.addEventListener(
                    'click',
                    () => {
                        window.open('https://kerdapp.ddns.net/', '_blank');
                    }
                );
                break;

            case 'responsiveProj':
                path = './img/png/responsive.png';
                break;

            case 'arcadeProj':
                path = './img/png/anim.png';
                break;

            case 'formProj':
                path = './img/png/form.png';
                break;

            case 'crmProj':
                path = './img/png/MVC.png';
                break;
        }

        bgDiv.style.backgroundImage = 'url(' + path + ')';
    });


    /**
     *
     */
    function addEvents() {
        console.log('addEvents');
        const projContainer = document.getElementById('projContainer') as HTMLDivElement;
        const projects = projContainer.children;

        Object.entries(projects).forEach(([indexNbr, elem]) => {
            const element = elem as HTMLDivElement;
            const elementID = element.id;
            const bgDiv = element.querySelector('div[class="projBG"]') as HTMLDivElement;

            switch(elementID) {
                case 'healthkerdProj':
                    console.log('add healthkerdProj');

                    break;

                case 'portfolioProj':
                    console.log('add portfolioProj');

                    break;
            }
        });
    }
}