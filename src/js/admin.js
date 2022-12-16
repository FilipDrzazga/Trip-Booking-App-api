import './../css/admin.css';
import { isFormValid, excursionLiElement } from './helpers';
import { adminInputs } from './inputValidation';

import ExcursionsAPI from './ExcursionsAPI';
const api = new ExcursionsAPI();


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
                api.addApi(data,displayExcursion);
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
            console.dir(e.target);
            if (e.target.tagName === 'INPUT') {
                const id = e.target.closest('li').dataset.id;
                api.removeApi(id, displayExcursion);
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
                    e.target.value = 'save';
                    spanArray.forEach(el => el.contentEditable = true);
                };
            };
        });
    };
};

function displayExcursion() {
    const excursionPanel = document.querySelector('.panel__excursions');
    excursionPanel.innerHTML = '';

    api.getApi().then(data => {
        data.forEach(el => {
            const { excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice, id } = el;
            excursionLiElement(excursionPanel,id, excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice);
        });
    });
};
