import './../css/admin.css';
import { isFormValid , excursionLiElement } from './helpers';

import ExcursionsAPI from './ExcursionsAPI';
const api = new ExcursionsAPI();

const adminInputs = [{
    name: 'name',
    isReq: true,
    pattern: '\\D{3,}',
    type:'text'
}, {
    name: 'description',
    isReq: true,
    }, {
    name: 'adult',
    isReq: true,
    pattern: `^(\\d{1,3})|((\\.|,)\\d{0,2}$)`,
    type:'number'
}, {
    name: 'child',
    isReq: true,
    pattern: '^(\\d{1,3})|((\\.|,)\\d{0,2}$)',
    type:'number'
}]

document.addEventListener('DOMContentLoaded', init);

function init() {
    addExcursion();
    deleteExcursion();
    updateExcursion();
    displayExcursion();
};

function addExcursion() {
    const form = document.querySelector('.form');
    const excursionName = document.querySelector('.form__field');
    const excursionDescription = document.querySelector('.form__field-longtext');
    const excursionAdultPrice = document.querySelector('.form__field-adult');
    const excursionChildPrice = document.querySelector('.form__field-child');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (isFormValid(form, adminInputs)) {
                const data = {
                    excursionName: excursionName.value,
                    excursionDescription: excursionDescription.value,
                    excursionAdultPrice: excursionAdultPrice.value,
                    excursionChildPrice: excursionChildPrice.value
                };
                api.addDataApi(data,displayExcursion);
            };
            form.reset();
        });
    };
};

function deleteExcursion() {
    const excursionPanel = document.querySelector('.panel__excursions');
    if (excursionPanel) {
        excursionPanel.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.value === 'usuń') {
                const id = e.target.closest('li').dataset.id;
                api.removeDataApi(id, displayExcursion);
            };
        });
    };
};

function updateExcursion() {
    const excursionPanel = document.querySelector('.panel__excursions');
    if (excursionPanel) {
        excursionPanel.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('excursions__field-input--update')) {
                const parentElement = e.target.closest('li');
                const spanArray = [...parentElement.querySelectorAll('span')];
                const isEditable = spanArray.every(el => el.isContentEditable);
                if (isEditable) {
                    const id = e.target.closest('li').dataset.id;
                    const data = {
                        excursionName: spanArray[0].innerText,
                        excursionDescription: spanArray[1].innerText,
                        excursionAdultPrice: spanArray[2].innerText,
                        excursionChildPrice: spanArray[3].innerText
                    };
                    api.updateApi(id, data, displayExcursion);
                } else {
                    e.target.value = 'zapisz';
                    spanArray.forEach(el => el.contentEditable = true);
                };
            };
        });
    };
};

function displayExcursion() {
    const excursionPanel = document.querySelector('.panel__excursions');
    excursionPanel.innerHTML = '';

    api.getDataApi().then(data => {
        data.forEach(el => {
            const { excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice, id } = el;
            excursionLiElement(excursionPanel,id, excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice);
        });
    });
};
