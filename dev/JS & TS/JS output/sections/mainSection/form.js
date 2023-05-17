var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { debounce } from '../../services/functionTiming';
import { nameRegex } from '../../services/regexStore/nameRegex';
import { compNameRegex } from '../../services/regexStore/compNameRegex';
import { telRegex } from '../../services/regexStore/telRegex';
import { mailRegex } from '../../services/regexStore/mailRegex';
import fetchDataSend from '../../services/fetch';
export default function formManagement() {
    var formObj = {
        form: document.getElementById('contactForm'),
        inputs: {
            lastName: { container: document.getElementById('lastNameContainer') },
            firstName: { container: document.getElementById('firstNameContainer') },
            comp: { container: document.getElementById('compContainer') },
            tel: { container: document.getElementById('telContainer') },
            mail: { container: document.getElementById('mailContainer') },
            msg: { container: document.getElementById('msgContainer') }
        },
        globalStatus: {
            fieldsValidity: 'untested',
            mail: 'idle',
            db: 'idle'
        }
    };
    Object.entries(formObj['inputs']).forEach(function (_a) {
        var _b, _c, _d, _e, _f, _g, _h;
        var _j = __read(_a, 2), key = _j[0], value = _j[1];
        var container = formObj.inputs[key].container;
        formObj.inputs[key].status = 'untested';
        formObj.inputs[key].field = container.querySelector('[class*="formField"]');
        formObj.inputs[key].errorMessage = container.querySelector('[class*="errorMessage"]');
        formObj.inputs[key].warningSign = container.querySelector('[class*="warningSign"]');
        formObj.inputs[key].underline = container.querySelector('[class*="underline"]');
        formObj.inputs[key].container.addEventListener('mouseenter', containerMouseEnter);
        formObj.inputs[key].container.addEventListener('mouseleave', containerMouseLeave);
        (_b = formObj.inputs[key].field) === null || _b === void 0 ? void 0 : _b.addEventListener('focus', fieldFocus);
        (_c = formObj.inputs[key].field) === null || _c === void 0 ? void 0 : _c.addEventListener('blur', fieldBlur);
        (_d = formObj.inputs[key].field) === null || _d === void 0 ? void 0 : _d.addEventListener('keydown', fieldKeyDown);
        (_e = formObj.inputs[key].field) === null || _e === void 0 ? void 0 : _e.addEventListener('click', fieldKeyDown);
        (_f = formObj.inputs[key].field) === null || _f === void 0 ? void 0 : _f.addEventListener('input', debounce(fieldNameExtractor, 500));
        (_g = formObj.inputs[key].errorMessage) === null || _g === void 0 ? void 0 : _g.addEventListener('click', giveFocusToField);
        (_h = formObj.inputs[key].warningSign) === null || _h === void 0 ? void 0 : _h.addEventListener('click', giveFocusToField);
    });
    /** Réaction des containers de champ quand la souris entre en hover
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {MouseEvent}  event
     */
    function containerMouseEnter(event) {
        var _a;
        var contId = event.target.id;
        var shortenName = contId.replace('Container', '');
        var wrnSignDisplay = window.getComputedStyle(formObj.inputs[shortenName].warningSign, null).display;
        if (wrnSignDisplay == 'block') {
            (_a = formObj.inputs[shortenName].errorMessage) === null || _a === void 0 ? void 0 : _a.classList.add('errorMessageDisplayed');
            window.setTimeout(function () { var _a; (_a = formObj.inputs[shortenName].errorMessage) === null || _a === void 0 ? void 0 : _a.classList.remove('errorMessageDisplayed'); }, 3000);
        }
    }
    /** Réaction des containers de champ quand la souris sort du hover
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {MouseEvent}  event
     */
    function containerMouseLeave(event) {
        var contId = event.target.id;
        var shortenName = contId.replace('Container', '');
        var wrnSignDisplay = window.getComputedStyle(formObj.inputs[shortenName].warningSign, null).display;
        if (wrnSignDisplay == 'block') {
            formObj.inputs[shortenName].errorMessage.classList.remove('errorMessageDisplayed');
        }
    }
    /** Réaction des champs quand ils prennent le focus
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {FocusEvent}  evt
     */
    function fieldFocus(evt) {
        var event = evt;
        var fieldId = event.target.id;
        var shortenName = fieldId.replace('Field', '');
        var wrnSignDisplay = window.getComputedStyle(formObj.inputs[shortenName].warningSign, null).display;
        /** Les <input type="text"> sont suivis d'un <span class="underline">
         * Le <textarea> n'est pas suivi de cet underline
         * C'est ce qui permet de les différencier pour avoir la bonne réaction au focus
         */
        if (formObj.inputs[shortenName].underline != null) {
            formObj.inputs[shortenName].underline.classList.add('underlineWide');
        }
        else {
            formObj.inputs[shortenName].field.classList.add('focusedTextArea');
        }
        if (wrnSignDisplay == 'block') {
            formObj.inputs[shortenName].errorMessage.classList.add('errorMessageDisplayed');
            window.setTimeout(function () { formObj.inputs[shortenName].errorMessage.classList.remove('errorMessageDisplayed'); }, 3000);
        }
    }
    /** Réaction des champs quand ils perdent le focus
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {FocusEvent}  evt
     */
    function fieldBlur(evt) {
        var event = evt;
        var fieldId = event.target.id;
        var shortenName = fieldId.replace('Field', '');
        var wrnSignDisplay = window.getComputedStyle(formObj.inputs[shortenName].warningSign, null).display;
        /** Les <input type="text"> sont suivis d'un <span class="underline">
         * Le <textarea> n'est pas suivi de cet underline
         * C'est ce qui permet de les différencier pour avoir la bonne réaction au focus
         */
        if (formObj.inputs[shortenName].underline != null) {
            formObj.inputs[shortenName].underline.classList.remove('underlineWide');
        }
        else {
            formObj.inputs[shortenName].field.classList.remove('focusedTextArea');
        }
        if (wrnSignDisplay == 'block') {
            formObj.inputs[shortenName].errorMessage.classList.remove('errorMessageDisplayed');
        }
    }
    /** Réaction des champs quand il y a un appui de touche
     * Impact l'apparition du message d'erreur selon 2 critéres:
     * * Si le warning est affiché
     * * Si on est sur mobile
     * @param {KeyboardEvent}  evt
     */
    function fieldKeyDown(evt) {
        var event = evt;
        var fieldId = event.target.id;
        var shortenName = fieldId.replace('Field', '');
        var wrnSignDisplay = window.getComputedStyle(formObj.inputs[shortenName].warningSign, null).display;
        if (wrnSignDisplay == 'block') {
            formObj.inputs[shortenName].errorMessage.classList.remove('errorMessageDisplayed');
        }
    }
    formObj.inputs.tel.field.addEventListener('keydown', telKeyCheck, { passive: false });
    /** Empeche d'entrer autre chose que des chiffres mais permet l'appui de quelques autres touches dans le champ du téléphone
     * @param {KeyboardEvent} evt Contient les données par rapport à la touche appuyée
     */
    function telKeyCheck(evt) {
        var event = evt;
        var checksOverall = {};
        // Vérifier si l'input est un chiffre
        var numberPattern = new RegExp(/[0-9]/);
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
        var isAcceptable = Object.values(checksOverall).some(function (value) {
            return value == true;
        });
        // Si l'input n'est pas acceptable, on empéche l'input
        if (isAcceptable == false) {
            event.preventDefault();
        }
    }
    /**
     *
     * @param evt
     */
    function giveFocusToField(evt) {
        var event = evt;
        var parentElementId = event.target.parentElement.id;
        var parentElemShortName = parentElementId.replace('Container', '');
        formObj.inputs[parentElemShortName].field.focus();
    }
    /** Recupération du nom du champ à chaque debounce des inputs au clavier avant le début des checks
     * @param {KeyboardEvent} evt   Input clavier après debounce
     */
    function fieldNameExtractor(evt) {
        var event = evt;
        var fieldName = event.target.id;
        var shortenName = fieldName.replace('Field', '');
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
    function fieldChecksManager(shortenName) {
        var value = formObj.inputs[shortenName].field.value;
        // vérification de la longueur du champ
        var lengthStatus = fieldLengthChecker(shortenName, value);
        // mise à jour du statut du champ, la regex se lance seulement si la longueur est correcte
        if (lengthStatus == 'correctLength') {
            formObj.inputs[shortenName].status = fieldRegexCheck(shortenName, value);
        }
        else {
            formObj.inputs[shortenName].status = lengthStatus;
        }
    }
    /** Vérifie le nombre de caractères dans le champ et renvoie le statut correspondant
     * @param   {string} fieldName        Nom du champ à tester
     * @param   {string} fieldContent     Contenu du champ
     * @returns {string}                  Statut du champ après test
     */
    function fieldLengthChecker(fieldName, fieldContent) {
        var testParams = {
            min: 0,
            max: 0
        };
        // liste des longueurs min/max des champs et leurs patterns pour la regex
        switch (fieldName) {
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
                testParams.max = 30;
                break;
            case 'msg':
                testParams.min = 30;
                testParams.max = 1500;
                break;
        }
        var lengthStatusStore = {
            tooShort: 'untested',
            tooLong: 'untested'
        };
        lengthStatusStore.tooShort = (fieldContent.length < testParams.min) ? 'wrong' : 'correct';
        lengthStatusStore.tooLong = (fieldContent.length > testParams.max) ? 'wrong' : 'correct';
        var whatsWrong = '';
        Object.entries(lengthStatusStore).every(function (_a) {
            var _b = __read(_a, 2), key = _b[0], status = _b[1];
            if (status == 'correct') {
                return true;
            }
            else {
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
    function fieldRegexCheck(fieldName, fieldContent) {
        var regexResult = false;
        switch (fieldName) {
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
    function fieldWarningDisplayMngmnt(shortenName) {
        if (formObj.inputs[shortenName].status == 'valid') {
            removeWarningsFromField(shortenName);
        }
        else {
            addWarningsToField(shortenName, formObj.inputs[shortenName].status);
        }
    }
    formObj.form.addEventListener('keydown', keyboardEnterPress);
    /** Un appui sur Enter ou NumpadEnter équivaut à cliquer sur le bouton "Envoyer" dans le formulaire
     * @param { KeyboardEvent } evt Appui de touche à analyser
     */
    function keyboardEnterPress(evt) {
        var event = evt;
        var checksOverall = {};
        checksOverall.isEnter = event.code == 'Enter' ? true : false;
        checksOverall.isNumEnter = event.code == 'NumpadEnter' ? true : false;
        // Vérifier si au moins un des cas de figure est acceptable
        var isAcceptable = Object.values(checksOverall).some(function (value) {
            return value == true;
        });
        if (isAcceptable == true) {
            formSendBtnReaction();
        }
    }
    var sendBtn = document.getElementById('formSendBtn');
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
        }
        else {
            sendBtn.classList.add('greySendBtn');
        }
    }
    /** Mise à jour de formObj.globalStatus.fieldsValidity
     * après avoir vérifié le statut de tous les champs
     * @param {string} origin   Identifie l'origine de la demande de refresh
     */
    function globalStatusUpdater(origin) {
        var fieldsStatusArr = [];
        Object.entries(formObj.inputs).forEach(function (_a) {
            var _b = __read(_a, 2), shortenName = _b[0], value = _b[1];
            fieldChecksManager(shortenName);
            if (origin == 'clickedButton') {
                fieldWarningDisplayMngmnt(shortenName);
            }
            fieldsStatusArr.push(value.status);
        });
        var formValidityCheck = fieldsStatusArr.every(function (value) {
            if (value == 'valid') {
                return true;
            }
            else {
                return false;
            }
        });
        switch (origin) {
            case 'clickedButton':
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
    function fetchMngmt() {
        return __awaiter(this, void 0, void 0, function () {
            var formValues, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formValues = {};
                        formValues.lastName = formObj.inputs.lastName.field.value.replace("‘’", "'");
                        formValues.firstName = formObj.inputs.firstName.field.value.replace("‘’", "'");
                        formValues.comp = formObj.inputs.comp.field.value.replace("‘’", "'");
                        formValues.tel = formObj.inputs.tel.field.value;
                        formValues.mail = formObj.inputs.mail.field.value.replace("‘’", "'");
                        formValues.msg = formObj.inputs.msg.field.value;
                        return [4 /*yield*/, fetchDataSend(formValues, 'index.php?controller=sendMsg&action=sendMsg')];
                    case 1:
                        result = _a.sent();
                        Object.entries(result.fieldsStatus).forEach(function (_a) {
                            var _b = __read(_a, 2), key = _b[0], status = _b[1];
                            formObj.inputs[key].status = status;
                        });
                        formObj.globalStatus.fieldsValidity = result.mailAndDbStatus.fieldsValidity;
                        formObj.globalStatus.mail = result.mailAndDbStatus.mail;
                        formObj.globalStatus.db = result.mailAndDbStatus.db;
                        if (formObj.globalStatus.fieldsValidity == 'valid') {
                            formIsValid();
                        }
                        else {
                            formIsNotValid();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    /** Si le form est valide:
     * * Opacity qui descend à zero pour fadeOut le formulaire
     * * La height du form diminue de beaucoup
     * * Message faisant apparaitre que le message a été envoyé apparait en fadeIn
     */
    function formIsValid() {
        var contactFormContainer = document.getElementById('contactFormContainer');
        var formTitle = document.getElementById('formTitle');
        var successContainer = document.getElementById('successContainer');
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
        Object.entries(formObj.inputs).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (value.status == 'valid') {
                removeWarningsFromField(key);
            }
            else {
                addWarningsToField(key, value.status);
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
    function removeWarningsFromField(fieldName) {
        formObj.inputs[fieldName].errorMessage.textContent = '';
        formObj.inputs[fieldName].errorMessage.classList.remove('errorMessageDisplayed');
        formObj.inputs[fieldName].warningSign.classList.remove('warningSignDisplayed');
    }
    /** Ajout et suppression des classes pour l'affichage l'apparition des points suivants:
     * * Point d'exclamation d'un champ
     * * Message d'erreur d'un champ
     * Egalement:
     * * Suppression du contenu du message d'erreur suivant le cas de figure
     * @param {string} fieldName - ID du champ concerné
     * @param {string} status - Statut du champ concerné
     */
    function addWarningsToField(fieldName, status) {
        switch (status) {
            case 'tooShort':
                formObj.inputs[fieldName].errorMessage.textContent = 'Nombre insuffisant de caractères';
                break;
            case 'tooLong':
                formObj.inputs[fieldName].errorMessage.textContent = 'Nombre trop important de caractères';
                break;
            case 'regexFailed':
                formObj.inputs[fieldName].errorMessage.textContent = 'Détection de caractère(s) non conforme(s)';
                break;
        }
        formObj.inputs[fieldName].warningSign.classList.add('warningSignDisplayed');
        formObj.inputs[fieldName].errorMessage.classList.add('errorMessageDisplayed');
        window.setTimeout(function () { formObj.inputs[fieldName].errorMessage.classList.remove('errorMessageDisplayed'); }, 3000);
    }
}
