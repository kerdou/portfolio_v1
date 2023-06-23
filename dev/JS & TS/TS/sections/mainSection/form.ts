import { debounce } from '../../services/functionTiming';
import { nameRegex } from '../../services/regexStore/nameRegex';
import { compNameRegex } from '../../services/regexStore/compNameRegex';
import { telRegex } from '../../services/regexStore/telRegex';
import { mailRegex } from '../../services/regexStore/mailRegex';
import fetchDataSend from '../../services/fetch';

export default function formManagement() {
    interface resultInterf {
        fieldsStatus?: {[key: string]: string;};
        mailAndDbStatus?: {[key: string]: string;};
    }

    interface formObjInt {
        form: HTMLFormElement,
        inputs: {
            [index: string]: {
                status?: string,
                container: HTMLSpanElement,
                field?: HTMLInputElement | HTMLTextAreaElement,
                errorMessage?: HTMLSpanElement,
                warningSign?: HTMLSpanElement,
                underline?: HTMLSpanElement
            }
        },
        globalStatus: {
            [index: string]: string
        }
    }

    const formObj: formObjInt = {
        form: document.getElementById('contactForm') as HTMLFormElement,
        inputs: {
            lastName: {container: document.getElementById('lastNameContainer') as HTMLSpanElement},
            firstName: {container: document.getElementById('firstNameContainer') as HTMLSpanElement},
            comp: {container: document.getElementById('compContainer') as HTMLSpanElement},
            tel: {container: document.getElementById('telContainer') as HTMLSpanElement},
            mail: {container: document.getElementById('mailContainer') as HTMLSpanElement},
            msg: {container: document.getElementById('msgContainer') as HTMLSpanElement}
        },
        globalStatus: {
            fieldsValidity: 'untested' as string,
            mail: 'idle' as string,
            db: 'idle' as string
        }
    };

    Object.entries(formObj['inputs']).forEach(([key, value]) => {
        const container = formObj.inputs[key].container;
        formObj.inputs[key].status = 'untested' as string;
        formObj.inputs[key].field = container.querySelector('[class*="formField"]') as HTMLInputElement | HTMLTextAreaElement;
        formObj.inputs[key].errorMessage = container.querySelector('[class*="errorMessage"]') as HTMLSpanElement;
        formObj.inputs[key].warningSign = container.querySelector('[class*="warningSign"]') as HTMLSpanElement;
        formObj.inputs[key].underline = container.querySelector('[class*="underline"]') as HTMLSpanElement;

        formObj.inputs[key].container.addEventListener('mouseenter', containerMouseEnter);
        formObj.inputs[key].container.addEventListener('mouseleave', containerMouseLeave);

        formObj.inputs[key].field?.addEventListener('focus', fieldFocus);
        formObj.inputs[key].field?.addEventListener('blur', fieldBlur);

        formObj.inputs[key].field?.addEventListener('keydown', fieldKeyDown);
        formObj.inputs[key].field?.addEventListener('click', fieldKeyDown);

        formObj.inputs[key].field?.addEventListener('input', debounce(fieldNameExtractor, 500));

        formObj.inputs[key].errorMessage?.addEventListener('click', giveFocusToField);
        formObj.inputs[key].warningSign?.addEventListener('click', giveFocusToField);
    });


    /** Réaction des containers de champ quand la souris entre en hover
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {MouseEvent}  event
     */
    function containerMouseEnter(event: MouseEvent) {
        const contId = (event.target as HTMLSpanElement).id;
        const shortenName = contId.replace('Container', '');
        const wrnSignDisplay = window.getComputedStyle((formObj.inputs[shortenName].warningSign as HTMLSpanElement), null).display;

        if (wrnSignDisplay == 'block') {
            formObj.inputs[shortenName].errorMessage?.classList.add('errorMessageDisplayed');
            window.setTimeout(() => {formObj.inputs[shortenName].errorMessage?.classList.remove('errorMessageDisplayed');}, 3000);
        }
    }


    /** Réaction des containers de champ quand la souris sort du hover
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {MouseEvent}  event
     */
    function containerMouseLeave(event: MouseEvent) {
        const contId = (event.target as HTMLSpanElement).id;
        const shortenName = contId.replace('Container', '');
        const wrnSignDisplay = window.getComputedStyle((formObj.inputs[shortenName].warningSign as HTMLSpanElement), null).display;

        if (wrnSignDisplay == 'block') {
            (formObj.inputs[shortenName].errorMessage as HTMLSpanElement).classList.remove('errorMessageDisplayed');
        }
    }


    /** Réaction des champs quand ils prennent le focus
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {FocusEvent}  evt
     */
    function fieldFocus(evt: Event) {
        const event = evt as FocusEvent;
        const fieldId = (event.target as HTMLInputElement | HTMLTextAreaElement).id;
        const shortenName = fieldId.replace('Field', '');
        const wrnSignDisplay = window.getComputedStyle((formObj.inputs[shortenName].warningSign as HTMLInputElement | HTMLTextAreaElement), null).display;

        /** Les <input type="text"> sont suivis d'un <span class="underline">
         * Le <textarea> n'est pas suivi de cet underline
         * C'est ce qui permet de les différencier pour avoir la bonne réaction au focus
         */
        if ((formObj.inputs[shortenName].underline as HTMLSpanElement) != null) {
            (formObj.inputs[shortenName].underline as HTMLSpanElement).classList.add('underlineWide');
        } else {
            (formObj.inputs[shortenName].field as HTMLInputElement | HTMLTextAreaElement).classList.add('focusedTextArea');
        }

        if (wrnSignDisplay == 'block') {
            (formObj.inputs[shortenName].errorMessage as HTMLSpanElement).classList.add('errorMessageDisplayed');
            window.setTimeout(() => {(formObj.inputs[shortenName].errorMessage as HTMLSpanElement).classList.remove('errorMessageDisplayed');}, 3000);
        }
    }


    /** Réaction des champs quand ils perdent le focus
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {FocusEvent}  evt
     */
    function fieldBlur(evt: Event) {
        const event = evt as FocusEvent;
        const fieldId = (event.target as HTMLInputElement | HTMLTextAreaElement).id;
        const shortenName = fieldId.replace('Field', '');
        const wrnSignDisplay = window.getComputedStyle((formObj.inputs[shortenName].warningSign as HTMLSpanElement), null).display;

        /** Les <input type="text"> sont suivis d'un <span class="underline">
         * Le <textarea> n'est pas suivi de cet underline
         * C'est ce qui permet de les différencier pour avoir la bonne réaction au focus
         */
        if ((formObj.inputs[shortenName].underline as HTMLSpanElement) != null) {
            (formObj.inputs[shortenName].underline as HTMLSpanElement).classList.remove('underlineWide');
        } else {
            (formObj.inputs[shortenName].field as HTMLInputElement | HTMLTextAreaElement).classList.remove('focusedTextArea');
        }

        if (wrnSignDisplay == 'block') {
            (formObj.inputs[shortenName].errorMessage as HTMLSpanElement).classList.remove('errorMessageDisplayed');
        }
    }


    /** Réaction des champs quand il y a un appui de touche
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {KeyboardEvent}  evt
     */
    function fieldKeyDown(evt: Event) {
        const event = evt as KeyboardEvent;
        const fieldId = (event.target as HTMLInputElement | HTMLTextAreaElement).id;
        const shortenName = fieldId.replace('Field', '');
        const wrnSignDisplay = window.getComputedStyle(formObj.inputs[shortenName].warningSign as HTMLSpanElement, null).display;

        if (wrnSignDisplay == 'block') {
            (formObj.inputs[shortenName].errorMessage as HTMLSpanElement).classList.remove('errorMessageDisplayed');
        }
    }


    (formObj.inputs.tel.field as HTMLInputElement).addEventListener('keydown', telKeyCheck, { passive: false });

    /** Empeche d'entrer autre chose que des chiffres mais permet l'appui de quelques autres touches dans le champ du téléphone
     * @param {KeyboardEvent} evt Contient les données par rapport à la touche appuyée
     */
    function telKeyCheck(evt: Event) {
        const event = evt as KeyboardEvent;
        const checksOverall: { [index: string]: boolean } = {};

        // Vérifier si l'input est un chiffre
        const numberPattern = new RegExp(/[0-9]/);
        checksOverall.isNumber = numberPattern.test(event.key);

        // Si ce n'est pas un chiffre, on vérifie si c'est une touche acceptable
        if (checksOverall.isNumber == false) {
            checksOverall.isDot = event.key == '.' ? true : false;
            checksOverall.isNumpadDecimal = event.code == 'NumpadDecimal' ? true : false;
            checksOverall.isPlus = event.key == '+' ? true : false;
            checksOverall.isNumpadAdd = event.code == 'NumpadAdd' ? true : false;
            checksOverall.isBackspace = event.code == 'Backspace' ? true : false;
            checksOverall.isDelete = event.code == 'Delete' ? true : false;
            checksOverall.isArrowLeft = event.code == 'ArrowLeft' ? true : false;
            checksOverall.isArrowRight = event.code == 'ArrowRight' ? true : false;
            checksOverall.isTab = event.code == 'Tab' ? true : false;
            checksOverall.isEnter = event.code == 'Enter' ? true : false;
            checksOverall.isNumEnter = event.code == 'NumpadEnter' ? true : false;
        }

        // Vérifier si au moins un des cas de figure est acceptable
        const isAcceptable = Object.values(checksOverall).some((value) => {
            return value == true;
        });

        // Si l'input n'est pas acceptable, on empéche l'input
        if (isAcceptable == false) {
            event.preventDefault();
        }
    }


    /** Le clic sur les messages d'erreurs du champ met le focus sur le champ lui-même
     * @param {PointerEvent} evt Input de clic
     */
    function giveFocusToField(evt: Event) {
        const event = evt as PointerEvent;
        const parentElementId = ((event.target as HTMLSpanElement).parentElement as HTMLElement).id;
        const parentElemShortName = parentElementId.replace('Container', '');
        (formObj.inputs[parentElemShortName].field as HTMLInputElement | HTMLTextAreaElement).focus();
    }


    /** Recupération du nom du champ à chaque debounce des inputs au clavier avant le début des checks
     * @param {KeyboardEvent} evt   Input clavier après debounce
     */
    function fieldNameExtractor(evt: Event) {
        const event = evt as KeyboardEvent;
        const fieldName = (event.target as HTMLInputElement).id;
        const shortenName = fieldName.replace('Field', '');

        fieldChecksManager(shortenName); // vérification du champ qui recoit l'input
        fieldWarningDisplayMngmnt(shortenName); // Mise à jour des classes et contenus des messages d'erreur selon le statut
        globalStatusUpdater('fieldInput'); // mise à jour de l'état global si les conditions sont réunies

        // suppression du grisage du bouton d'envoi si tous les champs sont OK
        if (formObj.globalStatus.fieldsValidity == 'valid') {
            sendBtn.classList.remove('greySendBtn');
        }
    }


    /** Vérification de la longeur du contenu d'un champ et de sa conformité au regex
     * @param {string}  shortenName     Nom du champ à tester
     */
    function fieldChecksManager(shortenName: string) {
        const value = (formObj.inputs[shortenName].field as HTMLInputElement | HTMLTextAreaElement).value;

        // vérification de la longueur du champ
        const lengthStatus = fieldLengthChecker(shortenName, value);

        // mise à jour du statut du champ, la regex se lance seulement si la longueur est correcte
        if (lengthStatus == 'correctLength') {
            formObj.inputs[shortenName].status = fieldRegexCheck(shortenName, value);
        } else {
            formObj.inputs[shortenName].status = lengthStatus;
        }
    }


    /** Vérifie le nombre de caractères dans le champ et renvoie le statut correspondant
     * @param   {string} fieldName        Nom du champ à tester
     * @param   {string} fieldContent     Contenu du champ
     * @returns {string}                  Statut du champ après test
     */
    function fieldLengthChecker(fieldName: string, fieldContent: string): string {
        const testParams = {
            min: 0,
            max: 0
        };

        // liste des longueurs min/max des champs et leurs patterns pour la regex
        switch(fieldName) {
            case 'lastName':
            case 'firstName':
            case 'comp':
                testParams.min = 3;
                testParams.max = 30;
                break;

            case 'tel':
                testParams.min = 10;
                testParams.max = 17;
                break;

            case 'mail':
                testParams.min = 6;
                testParams.max = 256;
                break;

            case 'msg':
                testParams.min = 30;
                testParams.max = 1500;
                break;
        }

        const lengthStatusStore = {
            tooShort: 'untested',
            tooLong: 'untested'
        };

        lengthStatusStore.tooShort = (fieldContent.length < testParams.min) ? 'wrong' : 'correct';
        lengthStatusStore.tooLong = (fieldContent.length > testParams.max) ? 'wrong' : 'correct';

        let whatsWrong = '';
        Object.entries(lengthStatusStore).every(([key, status]) => {
            if (status == 'correct') {
                return true;
            } else {
                whatsWrong = key;
                return false;
            }
        });

        return (whatsWrong.length == 0) ? 'correctLength' : whatsWrong;
    }


    /** Regex du contenu du champ
     * @param   {string} fieldName      Nom du champ à tester
     * @param   {string} fieldContent   Contenu du champ à tester
     * @returns {string}                Statut du champ suite au regex
     */
    function fieldRegexCheck(fieldName: string, fieldContent:string): string {
        let regexResult = false;

        switch(fieldName) {
            case 'lastName':
            case 'firstName':
                regexResult = nameRegex(fieldContent);
                break;

            case 'comp':
                regexResult = compNameRegex(fieldContent);
                break;

            case 'tel':
                regexResult = telRegex(fieldContent);
                break;

            case 'mail':
                regexResult = mailRegex(fieldContent);
                break;

            case 'msg':
                regexResult = true;
                break;
        }

        return (regexResult == true) ? 'valid' : 'regexFailed';
    }


    /** Mise à jour des classes et contenus des messages d'erreur selon le statut
     * @param {string} shortenName  Nom du champ concerné
     */
    function fieldWarningDisplayMngmnt(shortenName: string) {
        if (formObj.inputs[shortenName].status == 'valid') {
            removeWarningsFromField(shortenName);
        } else {
            addWarningsToField(shortenName, (formObj.inputs[shortenName].status as string ));
        }
    }


    document.addEventListener('keydown', keyboardEnterPress);

    /** Un appui sur Enter ou NumpadEnter équivaut à cliquer sur le bouton "Envoyer" dans le formulaire
     * si tous les champs sont corrects et qu'aucun d'entre eux n'a le focus
     * @param { KeyboardEvent } evt Appui de touche à analyser
     */
    function keyboardEnterPress(evt: Event) {
        const event = evt as KeyboardEvent;
        const enterKeyChecksOverall: {[key: string]: boolean} = {};
        enterKeyChecksOverall.isEnter = event.code == 'Enter' ? true : false;
        enterKeyChecksOverall.isNumEnter = event.code == 'NumpadEnter' ? true : false;

        // Vérifier si au moins un des cas de figure est acceptable
        const isAnEnterKey = Object.values(enterKeyChecksOverall).some((value) => {
            return value == true;
        });

        const focusChecksOverall: {[key: string]: boolean} = {
            lastName: false,
            firstName: false,
            comp: false,
            tel: false,
            mail: false,
            msg: false
        };

        // récupére l'état du focus sur chacun des champs
        Object.entries(formObj.inputs).forEach(([fieldKey, fieldValue]) => {
            focusChecksOverall[fieldKey] = ((formObj.inputs[fieldKey].container as HTMLElement).id.replace('Container', '')  == (document.activeElement as HTMLElement).id.replace('Field', '')) ? true : false;
        });

        // si au moins un des champs à le focus, oneFieldHasFocus sera true
        const oneFieldHasFocus = Object.values(focusChecksOverall).some((value) => {
            return value == true;
        });


        // l'autofill des champs ne déclenche pas de check des champ et laisse formObj.globalStatus.fieldsValidity en 'untested'
        // si formObj.globalStatus.fieldsValidity != 'valid' on lance une série de tests sur les champs
        if (isAnEnterKey == true &&
            oneFieldHasFocus == false &&
            formObj.globalStatus.fieldsValidity == 'valid') {
            formSendBtnReaction();
        } else {
            globalStatusUpdater('enterKey');

            if (isAnEnterKey == true &&
                oneFieldHasFocus == false &&
                formObj.globalStatus.fieldsValidity == 'valid') {
                formSendBtnReaction();
            }
        }
    }


    const sendBtn = document.getElementById('formSendBtn') as HTMLInputElement;
    sendBtn.addEventListener('click', formSendBtnReaction);

    /** Comportement au clic du bouton d'envoi du formulaire
     * * Vérification de tous les champs
     * * Si tout est bon on déclenche le fetch() et l'envoie de toutes les données
     * * Si au moins un des champs n'est pas bon on grise le bouton d'envoi et on en reste là
     */
    function formSendBtnReaction() {
        globalStatusUpdater('clickedButton');

        if (formObj.globalStatus.fieldsValidity == 'valid') {
            sendBtn.classList.remove('greySendBtn');
            fetchMngmt();
        } else {
            sendBtn.classList.add('greySendBtn');
        }
    }

    /** Mise à jour de formObj.globalStatus.fieldsValidity
     * après avoir vérifié le statut de tous les champs
     * @param {string} origin   Identifie l'origine de la demande de refresh
     */
    function globalStatusUpdater(origin: string) {
        const fieldsStatusArr: string[] = [];

        Object.entries(formObj.inputs).forEach(([shortenName, value]) => {
            fieldChecksManager(shortenName);

            if (origin == 'clickedButton') {
                fieldWarningDisplayMngmnt(shortenName);
            }

            fieldsStatusArr.push(value.status as string);
        });

        const formValidityCheck = fieldsStatusArr.every((value) => {
            if (value == 'valid') {
                return true;
            } else {
                return false;
            }
        });

        switch(origin) {
            case 'clickedButton':
            case 'enterKey':
                formObj.globalStatus.fieldsValidity = (formValidityCheck == true) ? 'valid' : 'failed';
                break;

            case 'fieldInput':
                // une input peut modifier l'état global du form seulement si le clic sur Envoyer a déjà vu des erreurs
                if (formObj.globalStatus.fieldsValidity == 'failed') {
                    formObj.globalStatus.fieldsValidity = (formValidityCheck == true) ? 'valid' : 'failed';
                }
                break;
        }
    }


    /** Une fois les champs validés en contact le backend via l'API fetch()
     * Puis retour des données et traitement en cas de succés et d'échec
     *
     * IOS rajoute un problème avec les apostrophes:
     * Quand on appuie sur ' sur le clavier virtuel, cela génére en réalité un ‘ ou un ’
     * D'où le .replace("‘’", "'") pour les champs concernés
     */
    async function fetchMngmt() {
        const formValues: { [index: string]: string } = {};
        formValues.lastName = (formObj.inputs.lastName.field as HTMLInputElement).value.replace("‘’", "'");
        formValues.firstName = (formObj.inputs.firstName.field as HTMLInputElement).value.replace("‘’", "'");
        formValues.comp = (formObj.inputs.comp.field as HTMLInputElement).value.replace("‘’", "'");
        formValues.tel = (formObj.inputs.tel.field as HTMLInputElement).value;
        formValues.mail = (formObj.inputs.mail.field as HTMLInputElement).value.replace("‘’", "'");
        formValues.msg = (formObj.inputs.msg.field as HTMLTextAreaElement).value;

        const result: resultInterf = await fetchDataSend(formValues, 'index.php?controller=sendMsg&action=sendMsg');

        Object.entries(result.fieldsStatus as { [key: string]: string }).forEach(([key, status]) => {
            formObj.inputs[key].status = status;
        });

        formObj.globalStatus.fieldsValidity = (result.mailAndDbStatus as { [key: string]: string }).fieldsValidity;
        formObj.globalStatus.mail = (result.mailAndDbStatus as { [key: string]: string }).mail;
        formObj.globalStatus.db = (result.mailAndDbStatus as { [key: string]: string }).db;

        if (formObj.globalStatus.fieldsValidity == 'valid') {
            formIsValid();
        } else {
            formIsNotValid();
        }
    }

    /** Si le form est valide:
     * * Opacity qui descend à zero pour fadeOut le formulaire
     * * La height du form diminue de beaucoup
     * * Message faisant apparaitre que le message a été envoyé apparait en fadeIn
     */
    function formIsValid() {
        const contactFormContainer = document.getElementById('contactFormContainer') as HTMLDivElement;
        const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
        const successContainer = document.getElementById('successContainer') as HTMLDivElement;

        contactFormContainer.classList.add('formVanishing');
        formTitle.classList.add('titleVanishing');
        successContainer.classList.add('successAppearing');
    }


    /** Comportement si le formulaire est invalide
     * * Vérification du statut de champ
     * * Renommage de chaque champ pour correspondre à leur ID
     * * On enléve le point d'exclamation et le message d'erreur dans tous les champs valides
     * * On fait apparaitre un point d'exclamation et un message d'erreur dans tous les champs invalides
     */
    function formIsNotValid() {
        Object.entries(formObj.inputs).forEach(([key, value]) => {
            if (value.status == 'valid') {
                removeWarningsFromField(key);
            } else {
                addWarningsToField(key, value.status as string);
            }
        });
    }


    /** Ajout et suppression des classes pour suppression des points suivants:
     * * Point d'exclamation d'un champ
     * * Message d'erreur d'un champ
     * Egalement:
     * * Suppression du contenu du message d'erreur
     * @param {string} fieldName - ID du champ concerné
     */
    function removeWarningsFromField(fieldName: string) {
        (formObj.inputs[fieldName].errorMessage as HTMLSpanElement).textContent = '';
        (formObj.inputs[fieldName].errorMessage as HTMLSpanElement).classList.remove('errorMessageDisplayed');
        (formObj.inputs[fieldName].warningSign as HTMLSpanElement).classList.remove('warningSignDisplayed');
    }


    /** Ajout et suppression des classes pour l'affichage l'apparition des points suivants:
     * * Point d'exclamation d'un champ
     * * Message d'erreur d'un champ
     * Egalement:
     * * Suppression du contenu du message d'erreur suivant le cas de figure
     * @param {string} fieldName - ID du champ concerné
     * @param {string} status - Statut du champ concerné
     */
    function addWarningsToField(fieldName: string, status:string) {
        switch (status) {
            case 'tooShort':
                (formObj.inputs[fieldName].errorMessage as HTMLSpanElement).textContent = 'Nombre insuffisant de caractères';
                break;

            case 'tooLong':
                (formObj.inputs[fieldName].errorMessage as HTMLSpanElement).textContent = 'Nombre trop important de caractères';
                break;

            case 'regexFailed':
                (formObj.inputs[fieldName].errorMessage as HTMLSpanElement).textContent = 'Détection de caractère(s) non conforme(s)';
                break;
        }

        (formObj.inputs[fieldName].warningSign as HTMLSpanElement).classList.add('warningSignDisplayed');

        (formObj.inputs[fieldName].errorMessage as HTMLSpanElement).classList.add('errorMessageDisplayed');
        window.setTimeout(() => {(formObj.inputs[fieldName].errorMessage as HTMLSpanElement).classList.remove('errorMessageDisplayed');}, 3000);
    }
}