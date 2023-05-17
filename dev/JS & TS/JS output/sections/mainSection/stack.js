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
import getElemAbsoluteCoords from '../../services/getElemAbsoluteCoords';
export default function stackManagement() {
    var stackObj = {
        html: {
            element: document.getElementById('html'),
            title: 'HTML',
            description: 'Le HyperText Markup Language, généralement abrégé HTML ou, dans sa dernière version, HTML5, est le langage de balisage conçu pour représenter les pages web.',
            link: 'https://developer.mozilla.org/fr/docs/Web/HTML'
        },
        css: {
            element: document.getElementById('css'),
            title: 'CSS',
            description: 'Les feuilles de style en cascade, généralement appelées CSS de l\'anglais Cascading Style Sheets, forment un langage informatique qui décrit la présentation des documents HTML et XML.',
            link: 'https://developer.mozilla.org/fr/docs/Web/CSS'
        },
        sass: {
            element: document.getElementById('sass'),
            title: 'SaSS',
            description: 'Sass est un langage de script de préprocesseur qui est interprété ou compilé dans des feuilles de style en cascade.',
            link: 'https://sass-lang.com/'
        },
        bootstrap: {
            element: document.getElementById('bootstrap'),
            title: 'Bootstrap',
            description: 'Bootstrap est une collection d\'outils utiles à la création du design de sites et d\'applications web. C\'est un ensemble qui contient des codes HTML et CSS, des formulaires, boutons, outils de navigation et autres éléments interactifs, ainsi que des extensions JavaScript en option.',
            link: 'https://getbootstrap.com/'
        },
        javascript: {
            element: document.getElementById('javascript'),
            title: 'JavaScript',
            description: 'JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives et à ce titre est une partie essentielle des applications web. Avec les langages HTML et CSS, JavaScript est au cœur des langages utilisés par les développeurs web.',
            link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript'
        },
        typescript: {
            element: document.getElementById('typescript'),
            title: 'TypeScript',
            description: 'TypeScript est un langage de programmation libre et open source développé par Microsoft qui a pour but d\'améliorer et de sécuriser la production de code JavaScript. Il s\'agit d\'un sur-ensemble syntaxique strict de JavaScript.',
            link: 'https://www.typescriptlang.org/'
        },
        lodash: {
            element: document.getElementById('lodash'),
            title: 'Lodash',
            description: 'Lodash est une bibliothèque JavaScript qui fournit des fonctions utilitaires pour les tâches de programmation courantes en utilisant le paradigme de la programmation fonctionnelle.',
            link: 'https://lodash.com/'
        },
        php: {
            element: document.getElementById('php'),
            title: 'PHP',
            description: 'PHP: Hypertext Preprocessor, plus connu sous son sigle PHP, est un langage de programmation libre, principalement utilisé pour produire des pages Web dynamiques via un serveur web.',
            link: 'https://www.php.net/'
        },
        mysql: {
            element: document.getElementById('mysql'),
            title: 'MySQL',
            description: 'MySQL est un système de gestion de bases de données relationnelles. Il est distribué sous une double licence GPL et propriétaire.',
            link: 'https://www.mysql.com/'
        },
        wordpress: {
            element: document.getElementById('wordpress'),
            title: 'WordPress',
            description: 'WordPress est un système de gestion de contenu gratuit, libre et open-source. Ce logiciel écrit en PHP repose sur une base de données MySQL et est distribué par la fondation WordPress.org.',
            link: 'https://wordpress.com/fr/'
        },
        angular: {
            element: document.getElementById('angular'),
            title: 'Angular',
            description: 'Angular est un framework pour clients, open source, basé sur TypeScript et codirigé par l\'équipe du projet « Angular » chez Google ainsi que par une communauté de particuliers et de sociétés.',
            link: 'https://angular.io/'
        },
        windows: {
            element: document.getElementById('windows'),
            title: 'Windows',
            description: 'Windows est au départ une interface graphique unifiée produite par Microsoft, qui est devenue ensuite une gamme de systèmes d’exploitation à part entière, principalement destinés aux ordinateurs compatibles PC.',
            link: 'https://www.microsoft.com/fr-fr/windows?r=1'
        },
        linux: {
            element: document.getElementById('linux'),
            title: 'Linux / Ubuntu',
            description: 'Ubuntu est un système d’exploitation GNU/Linux fondé sur Debian. Il est développé, commercialisé et maintenu pour les ordinateurs individuels, les serveurs et les objets connectés par la société Canonical.',
            link: 'https://ubuntu.com/'
        },
        vscode: {
            element: document.getElementById('vscode'),
            title: 'VS Code',
            description: 'Visual Studio Code est un éditeur de code extensible développé par Microsoft pour Windows, Linux et macOS. Les fonctionnalités incluent la prise en charge du débogage, la mise en évidence de la syntaxe, la complétion intelligente du code, les snippets, la refactorisation du code et Git intégré.',
            link: 'https://code.visualstudio.com/'
        },
        apache: {
            element: document.getElementById('apache'),
            title: 'Apache',
            description: 'Le logiciel libre Apache HTTP Server est un serveur HTTP créé et maintenu au sein de la fondation Apache. Jusqu\'en avril 2019, ce fut le serveur HTTP le plus populaire du World Wide Web.',
            link: 'https://httpd.apache.org/'
        },
        phpmyadmin: {
            element: document.getElementById('phpmyadmin'),
            title: 'phpMyAdmin',
            description: 'phpMyAdmin est une application Web de gestion pour les systèmes de gestion de base de données MySQL et MariaDB, réalisée principalement en PHP.',
            link: 'https://www.phpmyadmin.net/'
        },
        asana: {
            element: document.getElementById('asana'),
            title: 'Asana',
            description: 'Asana est un gestionnaire de communication d\'équipe. Le produit prend en charge de nombreuses fonctionnalités, notamment les espaces de travail, des projets, des tâches, des étiquettes, des notes, des commentaires et une boîte de réception qui organise les mises à jour des informations en temps réel.',
            link: 'https://asana.com/fr?noredirect'
        },
        jmerise: {
            element: document.getElementById('jmerise'),
            title: 'JMerise',
            description: 'JMerise est un logiciel dédié à la modélisation des modèles conceptuels de donnée pour Merise. JMerise permet les relations réflexives, la généralisation et la spécialisation des entités. Il génère le MLD et le script Mysql.',
            link: 'http://www.jfreesoft.com/JMerise/index.html'
        },
        plantuml: {
            element: document.getElementById('plantuml'),
            title: 'PlantUML',
            description: 'PlantUML est un outil open-source permettant aux utilisateurs de créer des diagrammes à partir d\'un langage de texte brut. Outre divers diagrammes UML, PlantUML prend en charge divers autres formats liés au développement de logiciels, ainsi que la visualisation de fichiers JSON et YAML.',
            link: 'https://plantuml.com/fr/'
        },
        github: {
            element: document.getElementById('github'),
            title: 'GitHub',
            description: 'Le nom GitHub est composé du mot « git » faisant référence à un système de contrôle de version open-source et le mot « hub » faisant référence au réseau social bâti autour du système Git, mais aussi à une plate-forme de correspondance qui est appelée en anglais un « hub ».',
            link: 'https://github.com/'
        },
        npm: {
            element: document.getElementById('npm'),
            title: 'npm',
            description: 'npm est le gestionnaire de paquets par défaut pour l\'environnement d\'exécution JavaScript Node.js. npm se compose d\'un client en ligne de commande, également appelé npm, et d\'une base de données en ligne de paquets publics et privés payants, appelée le registre npm.',
            link: 'https://www.npmjs.com/'
        },
        composer: {
            element: document.getElementById('composer'),
            title: 'Composer',
            description: 'Composer est un logiciel gestionnaire de dépendances libre écrit en PHP. Il permet à ses utilisateurs de déclarer et d\'installer les bibliothèques dont le projet principal a besoin.',
            link: 'https://getcomposer.org/'
        },
        webpack: {
            element: document.getElementById('webpack'),
            title: 'Webpack',
            description: 'Webpack est un outil logiciel open-source de type « module bundler », conçu pour faciliter le développement et la gestion de sites et d\'applications web modernes.',
            link: 'https://webpack.js.org/'
        },
        gulp: {
            element: document.getElementById('gulp'),
            title: 'Gulp',
            description: 'Gulp.js est un toolkit JavaScript open-source créé par Fractal Innovations, et la communauté open source sur GitHub, utilisé dans le développement web front-end. C\'est un exécuteur de tâches construit sur Node.js et npm, utilisé pour l\'automatisation des tâches répétitives dans le développement web, comme la minification, concaténation, tests unitaires, optimisation, etc.',
            link: 'https://gulpjs.com/'
        },
        prettier: {
            element: document.getElementById('prettier'),
            title: 'Prettier',
            description: 'Prettier est ce que l\'on appelle un code formatter, son travail est de rendre votre code plus propre en le remettant aux standards. Ce qui est intéressent avec ce genre d\'outil c\'est qu\'il nous permet de rendre plus lisible et plus maintenable notre code.',
            link: 'https://prettier.io/'
        },
        eslint: {
            element: document.getElementById('eslint'),
            title: 'ESLint',
            description: 'ESLint est un outil d\'analyse de code statique permettant d\'identifier des erreurs dans du code JavaScript. Les règles dans ESLint sont configurables et ESLint couvre à la fois la qualité du code et les problèmes de style de codage.',
            link: 'https://eslint.org/'
        },
        phpcs: {
            element: document.getElementById('phpcs'),
            title: 'PHP Code Sniffer',
            description: 'PHP Code Sniffer (PHPCS) est un package pour la vérification de syntaxe. Il permet de vérifier la syntaxe des fichiers, et aller plus loin pour examiner la façon dont les règles sont créées et les normes définies.',
            link: 'https://github.com/squizlabs/PHP_CodeSniffer/wiki'
        }
    };
    var positionStore = {
        window: {
            width: 0
        },
        viewport: {
            previousClick: {
                yOffset: -10
            },
            currentClick: {
                yOffset: 0
            }
        },
        stackPodsContainer: {
            dimensions: {
                width: 0
            },
            beforeRelatCoords: {
                left: 0
            }
        },
        parentStackPod: {
            dimensions: {
                width: 0
            },
            absoluteCoords: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        },
        previousIcon: {
            id: ''
        },
        currentIcon: {
            dimensions: {
                width: 0
            },
            absoluteCoords: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        },
        arrow: {
            dimensions: {
                width: 25.6,
                height: 25.6
            },
            absoluteCoords: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        },
        modal: {
            dimensions: {
                availableIdealWidth: 0,
                width: 0
            },
            absoluteCoords: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
    };
    var stackModalArrow = document.getElementById('stackModalArrow');
    var stackModalBox = document.getElementById('stackModal');
    var stackModalContent = document.getElementById('stackModalContent');
    var stackModalTitle = document.getElementById('stackModalTitle');
    var stackModalDescr = document.getElementById('stackModalDescr');
    var stackModalLink = document.getElementById('stackModalLink');
    stackModalTitle.addEventListener('click', stackModalVanishing);
    stackModalDescr.addEventListener('click', stackModalVanishing);
    // ajout de l'eventListener sur chaque icone
    Object.entries(stackObj).forEach(function (_a, index) {
        var _b = __read(_a, 2), id = _b[0], value = _b[1];
        var element = document.getElementById(id);
        element.addEventListener('click', stackModalAppearing);
    });
    /** Gestion de toutes les actions au clic sur une icone d'une techno
     * @param {Event} evt       Event de clic sur l'icone
     */
    function stackModalAppearing(evt) {
        var stackIconElem = evt.currentTarget;
        var parentStackPod = stackIconElem.parentElement.parentElement;
        var techID = stackIconElem.id;
        // Le clic sur la  même icône provoque la disparition de la modale
        if (positionStore.previousIcon.id == techID &&
            window.getComputedStyle(stackModalBox).display == 'block') {
            stackModalVanishing();
        }
        else {
            iconClickDebouce(techID);
            positionStore.previousIcon.id = techID;
            viewportAndScrollManagement(stackIconElem);
            stackPodsContainerExtraction();
            iconDataExtraction(stackIconElem);
            var stackPodPosition = parentStackPodDataExtraction(parentStackPod);
            arrowManagement();
            modalManagement(techID, stackPodPosition);
            positionStore.viewport.previousClick.yOffset = positionStore.viewport.currentClick.yOffset;
        }
    }
    /** Récupération de la largeur de stackPodsContainer et de la position de la barre de timeline
     */
    function stackPodsContainerExtraction() {
        var stackPodsContainer = document.getElementById('stackPodsContainer');
        positionStore.stackPodsContainer.dimensions.width = +window.getComputedStyle(stackPodsContainer).width.replace('px', '');
        positionStore.stackPodsContainer.beforeRelatCoords.left = +window.getComputedStyle(stackPodsContainer, 'before').left.replace('px', '');
    }
    /** Récupération de coordonnées et de la largeur de l'icone de stack
     * @param { HTMLSpanElement } stackIconElem     Icone à examiner
     */
    function iconDataExtraction(stackIconElem) {
        positionStore.currentIcon.dimensions.width = +window.getComputedStyle(stackIconElem).width.replace('px', '');
        positionStore.currentIcon.absoluteCoords.top = getElemAbsoluteCoords(stackIconElem, 'top');
        positionStore.currentIcon.absoluteCoords.bottom = getElemAbsoluteCoords(stackIconElem, 'bottom');
        positionStore.currentIcon.absoluteCoords.left = getElemAbsoluteCoords(stackIconElem, 'left');
        positionStore.currentIcon.absoluteCoords.right = getElemAbsoluteCoords(stackIconElem, 'right');
    }
    /** Gestion du déplacement du viewport pour avoir l'icone au bon endroit sur l'écran
     * @param { HTMLSpanElement } stackIconElem    Icone qui vient d'être cliquée
     */
    function viewportAndScrollManagement(stackIconElem) {
        positionStore.viewport.currentClick.yOffset = stackIconElem.getBoundingClientRect().top;
        var newViewportYPosit = positionStore.viewport.currentClick.yOffset - 80;
        window.scrollBy(0, newViewportYPosit);
    }
    /** Récupération de coordonnées et de la largeur du podStack
     * @param { HTMLDivElement } parentStackPod     Pod stack à examiner
     * @returns {string}    Renvoi la position gauche ou droite du pod quand on passera en 2 colonnes
     */
    function parentStackPodDataExtraction(parentStackPod) {
        positionStore.parentStackPod.dimensions.width = +window.getComputedStyle(parentStackPod).width.replace('px', '');
        positionStore.parentStackPod.absoluteCoords.left = getElemAbsoluteCoords(parentStackPod, 'left');
        positionStore.parentStackPod.absoluteCoords.right = getElemAbsoluteCoords(parentStackPod, 'right');
        return (parentStackPod.classList.contains('leftPodContent')) ? 'left' : 'right';
    }
    /** Positionnement de la fléche de la modale, ajout de son contenu et gestion de son apparition
     */
    function arrowManagement() {
        var verticalOffset = -2;
        positionStore.arrow.absoluteCoords.top = positionStore.currentIcon.absoluteCoords.bottom + verticalOffset;
        positionStore.arrow.absoluteCoords.bottom = positionStore.arrow.absoluteCoords.top + positionStore.arrow.dimensions.height + verticalOffset;
        var widthMidDiff = (positionStore.arrow.dimensions.width - positionStore.currentIcon.dimensions.width) / 2;
        positionStore.arrow.absoluteCoords.left = positionStore.currentIcon.absoluteCoords.left - widthMidDiff;
        positionStore.arrow.absoluteCoords.right = positionStore.currentIcon.absoluteCoords.right + widthMidDiff;
        stackModalArrow.style.top = positionStore.arrow.absoluteCoords.top.toString() + 'px';
        stackModalArrow.style.left = positionStore.arrow.absoluteCoords.left.toString() + 'px';
        stackModalArrow.style.display = 'block';
    }
    /** Positionnement de la modale, ajout de son contenu et gestion de son apparition
     * @param { string } techID     Nom de la tech pour qui il faut récupérer les données dans stackObj
     * @param { string } stackPodPosition   Position gauche ou droite du pod quand on passe en 2 colonnes
     */
    function modalManagement(techID, stackPodPosition) {
        stackModalTitle.textContent = stackObj[techID].title;
        stackModalDescr.textContent = stackObj[techID].description;
        stackModalLink.href = stackObj[techID].link;
        var verticalOffset = 2;
        positionStore.modal.absoluteCoords.top = positionStore.arrow.absoluteCoords.bottom - verticalOffset;
        var columnsQty = (positionStore.stackPodsContainer.beforeRelatCoords.left < 100) ? 1 : 2;
        switch (columnsQty) {
            case 1:
                singleColManagement();
                break;
            case 2:
                dualColManagement(stackPodPosition);
                break;
        }
    }
    /** La classe stackModalTransition n'est pas toujours bien supprimée de stackModalContent,
     * donc on la supprime d'office pour s'assurer que tout se passe bien
     * On ajoute aussi des timeouts pour garantir que tout ait le temps de se faire correctement
     */
    function singleColManagement() {
        stackModalContent.classList.remove('stackModalTransition');
        window.setTimeout(function () {
            singleColModalDisplaySetup();
            stackModalContent.classList.add('stackModalTransition');
        }, 250);
    }
    /** Configuration et apparition de la modale en colonne unique
     */
    function singleColModalDisplaySetup() {
        positionStore.modal.dimensions.width = positionStore.parentStackPod.dimensions.width;
        positionStore.modal.absoluteCoords.left = positionStore.parentStackPod.absoluteCoords.left;
        stackModalBox.style.width = (positionStore.modal.dimensions.width - 10).toString() + 'px';
        stackModalBox.style.top = positionStore.modal.absoluteCoords.top.toString() + 'px';
        stackModalBox.style.left = (positionStore.modal.absoluteCoords.left + 5).toString() + 'px';
        stackModalBox.style.display = 'block';
    }
    /** Configuration et apparition de la modale en double colonne
     *  @param { string } stackPodPosition   Position gauche ou droite du pod quand on passe en 2 colonnes
     */
    function dualColManagement(stackPodPosition) {
        stackModalContent.classList.remove('stackModalTransition');
        window.setTimeout(function () {
            switch (stackPodPosition) {
                case 'left':
                    dualColLeftModalDisplaySetup();
                    break;
                case 'right':
                    dualColRightModalDisplaySetup();
                    break;
            }
            stackModalContent.classList.add('stackModalTransition');
        }, 250);
    }
    /** Configuration et affichage de la modale quand elle est placée dans la colonne de gauche
     */
    function dualColLeftModalDisplaySetup() {
        positionStore.modal.dimensions.width = positionStore.stackPodsContainer.dimensions.width * 0.75;
        positionStore.modal.absoluteCoords.left = positionStore.parentStackPod.absoluteCoords.left;
        stackModalBox.style.width = positionStore.modal.dimensions.width.toString() + 'px';
        stackModalBox.style.top = positionStore.modal.absoluteCoords.top.toString() + 'px';
        stackModalBox.style.left = (positionStore.modal.absoluteCoords.left + 5).toString() + 'px';
        stackModalBox.style.display = 'block';
    }
    /** Configuration et affichage de la modale quand elle est placée dans la colonne de droite
     */
    function dualColRightModalDisplaySetup() {
        positionStore.modal.dimensions.width = positionStore.stackPodsContainer.dimensions.width * 0.75;
        positionStore.modal.absoluteCoords.left = positionStore.parentStackPod.absoluteCoords.right - positionStore.modal.dimensions.width;
        stackModalBox.style.width = positionStore.modal.dimensions.width.toString() + 'px';
        stackModalBox.style.top = positionStore.modal.absoluteCoords.top.toString() + 'px';
        stackModalBox.style.left = (positionStore.modal.absoluteCoords.left - 5).toString() + 'px';
        stackModalBox.style.display = 'block';
    }
    /** Debounce des clics de souris sur les icones
     * @param { string } techID ID de l'icone qui vient d'être cliquée
     */
    function iconClickDebouce(techID) {
        document.getElementById(techID).removeEventListener('click', stackModalAppearing);
        window.setTimeout(function () { return document.getElementById(techID).addEventListener('click', stackModalAppearing); }, 250);
    }
    window.addEventListener('resize', stackModalVanishing);
    /** Disparition de la fléche de la modale, de son contenu et de sa fléche
     */
    function stackModalVanishing() {
        stackModalArrow.removeAttribute('style');
        stackModalBox.removeAttribute('style');
        stackModalContent.classList.remove('stackModalTransition');
        stackModalTitle.textContent = '';
        stackModalDescr.textContent = '';
        stackModalLink.href = '';
    }
    /** Provoque la disparition de la modale si la section "Techno & environnement" sort du viewport
     * @param { IntersectionObserverEntry[] } entries   Element à surveiller, dans le cas présent c'est la section#stack
     * @param { IntersectionObserver } observer         La variable contenant l'observer
     */
    function obsCallback(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting == false) {
                stackModalVanishing();
            }
        });
    }
    var observer = new IntersectionObserver(obsCallback);
    observer.observe(document.getElementById('stack'));
}
