export function isFormValid(form, checkInputs) {
    let isValid = true;
    checkInputs.forEach(el => {
        const { name, isReq, pattern,type } = el;
        const input = form.elements[name];
        if (input) {
            const value = form.elements[name].value;
            if (isReq) {
                if (value === '') {
                    alert(`This field [${name}] can not be empty`);
                    return isValid = false;
                };
                if (type === 'number') {
                    const reg = new RegExp(pattern);
                    if (!reg.test(+value)) {
                        alert(`Please make sure if the value is a number`);
                        return isValid = false;
                    }
                };
                if (pattern) {
                    const reg = new RegExp(pattern);
                    if (!reg.test(value)) {
                        alert(`Please check if field [${name}] contains correctly value base it of name`);
                        return isValid = false;
                    };
                };
            };
        }
    });
    return isValid;
};

export function getExcursionDetails(getDetailsFromList) {
    const allExcursions = getDetailsFromList.map(element => {
        const excursions = {
            excursionName: element.children[0].firstElementChild.textContent,
            excursionInfo: element.children[1].innerText
        };
        return excursions;
    });
    return allExcursions;
 };

export function excursionLiElement(insertToElement,id,excursionName,excursionDescription,excursionAdultPrice,excursionChildPrice) {
    const elementHtml = `
        <li data-id=${id} class="excursions__item">
            <header class="excursions__header">
                <h2 class="excursions__title"><span>${excursionName}</span></h2>
                <p class="excursions__description"><span>${excursionDescription}</span></p>
            </header>
            <form class="excursions__form">
                <div class="excursions__field">
                    <label class="excursions__field-name">
                        Dorosły: <strong><span>${excursionAdultPrice}</span></strong>PLN
                    </label>
                </div>
                <div class="excursions__field">
                    <label class="excursions__field-name">
                        Dziecko: <strong><span>${excursionChildPrice}</span></strong>PLN
                    </label>
                </div>
                <div class="excursions__field excursions__field--submit">
                    <input class="excursions__field-input excursions__field-input--update" value="edytuj"
                        type="submit" />
                    <input class="excursions__field-input excursions__field-input--remove" value="usuń"
                    type="submit"/>
                </div>
            </form>
        </li>`

    return insertToElement.insertAdjacentHTML('beforeend', elementHtml);
};

export function clientLiElement(insertToElement, id, excursionName, excursionDescription, excursionAdultPrice, excursionChildPrice) {
    const elementHtml = `
    <li class="excursions__item" data-id=${id} data-adultPrice=${excursionAdultPrice} data-childPrice=${excursionChildPrice} data-title=${excursionName}>
        <header class="excursions__header">
            <h2 class="excursions__title">${excursionName}</h2>
            <p class="excursions__description">${excursionDescription}</p>
        </header>
        <form class="excursions__form">
            <div class="excursions__field">
                <label class="excursions__field-name">
                    Dorosły: ${excursionAdultPrice} <input class="excursions__field-input" name="adults" />
                </label>
            </div>
            <div class="excursions__field">
                <label class="excursions__field-name">
                    Dziecko: ${excursionChildPrice} <input class="excursions__field-input" name="children" />
                </label>
            </div>
            <div class="excursions__field excursions__field--submit">
                <input
                    class="excursions__field-inpuexcursions__field-input--submit"
                    value="dodaj do zamówinia"
                    type="submit"
                />
            </div>
        </form>
    </li>`
    return insertToElement.insertAdjacentHTML('beforeend', elementHtml);
};

export function clientLiOrder(insertToElement, excursionName, excursionAdultNumber=0, excursionAdultPrice, excursionChildNumber=0, excursionChildPrice )
{
    const totalPrice = excursionAdultNumber * excursionAdultPrice + excursionChildNumber * excursionChildPrice;
    const elementHtml = `
        <li class="summary__item">
            <h3 class="summary__title">
                <span class="summary__name">${excursionName}</span>
                <strong class="summary__total-price">${totalPrice}PLN</strong>
                <a href="" class="summary__btn-remove" title="usuń">X</a>
            </h3>
            <p class="summary__prices">dorośli: ${excursionAdultNumber} x ${excursionAdultPrice}PLN, dzieci: ${excursionChildNumber} x ${excursionChildPrice}PLN</p>
        </li>`
    return insertToElement.insertAdjacentHTML('beforeend', elementHtml);
};