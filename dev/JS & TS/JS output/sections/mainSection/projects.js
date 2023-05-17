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
export default function projectsManagement() {
    var projContainer = document.getElementById('projContainer');
    var projects = projContainer.children;
    Object.entries(projects).forEach(function (_a) {
        var _b = __read(_a, 2), indexNbr = _b[0], elem = _b[1];
        var element = elem;
        var elementID = element.id;
        var bgDiv = element.querySelector('div[class="projBG"]');
        var path = '';
        switch (elementID) {
            case 'healthkerdProj':
                path = './img/jpg/healthkerd.jpg';
                bgDiv.addEventListener('click', function () {
                    window.open('https://kerdapp.ddns.net/healthkerd/', '_blank');
                });
                break;
            case 'portfolioProj':
                path = './img/jpg/portfolio.jpg';
                bgDiv.addEventListener('click', function () {
                    window.open('https://kerdapp.ddns.net/', '_blank');
                });
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
        var projContainer = document.getElementById('projContainer');
        var projects = projContainer.children;
        Object.entries(projects).forEach(function (_a) {
            var _b = __read(_a, 2), indexNbr = _b[0], elem = _b[1];
            var element = elem;
            var elementID = element.id;
            var bgDiv = element.querySelector('div[class="projBG"]');
            switch (elementID) {
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
