import './../css/client.css';
import { isFormValid, getExcursionDetails, clientLiElement, clientLiOrder } from './helpers';

import ExcursionsAPI from './ExcursionsAPI';
const api = new ExcursionsAPI();

const clientInputs = [
  {
    name: "adults",
    isReq: true,
    type: "number",
    pattern: '^[1-9]',
  },
  {
    name: "children",
    isReq: true,
    type: "number",
    pattern: '^[0-9]',
  },
  {
    name: "name",
    isReq: true,
    pattern: '\\D{3,}',
  },
  {
    name: "email",
    isReq: true,
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
  },
];

document.addEventListener('DOMContentLoaded', init);

function init() {
    getDataApi();
    getUserExcursion();
    removeExcursion();
    submitOrder();
};
function getDataApi() {
    const excursion = document.querySelector('.excursions');
    api.getDataApi().then(data => {
        data.forEach(el => {
            const { excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice, id } = el;
            clientLiElement(excursion,id, excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice);
        });
    });
};

function getUserExcursion(){
    const form = document.querySelector('.excursions');
    const summaryPanel = document.querySelector('.summary');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formTarget = e.target;
            if (isFormValid(formTarget, clientInputs)) {
                const { adultprice, childprice, title } = formTarget.closest('li').dataset;
                clientLiOrder(summaryPanel, title, +formTarget.elements.adults.value, +adultprice, +formTarget.elements.children.value, +childprice );
            };
            updateTotalPrice();
            formTarget.reset();
        });
    };
};

function updateTotalPrice() {
    const totalPriceValue = document.querySelector('.order__total-price-value');
    const arr = [...document.querySelectorAll('.summary__total-price')];
    const totalPrice = arr.map((element) => {
       return +element.textContent.slice(0,-3)
    }).reduce((a, b) => { return a + b },0);
    totalPriceValue.textContent = `${totalPrice}PLN`;
    arr.length = 0;
};

function removeExcursion() {
    const removeBtn = document.querySelector('.summary');
    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('summary__btn-remove')) {
                e.target.closest('li').remove();
                updateTotalPrice();
            };
        });
    };
};

function submitOrder(){
    const form = document.querySelector('.order');
    const basket = document.querySelector('.summary');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const summaryItem = [...document.querySelectorAll('.summary__item')];
        if (isFormValid(form, clientInputs)) {
            const data = {
                name: form.elements.name.value,
                email: form.elements.email.value,
                totalPrice: form.children[0].children[0].textContent,
                excursions: getExcursionDetails(summaryItem),
            };
            api.addClientOrderApi(data, alert('Order complete, Thank you!'));
            basket.innerHTML = '';
            form.reset();
        };
    });
};
