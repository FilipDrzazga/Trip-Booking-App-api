export function isFormValid(form, checkInputs) {
    let isValid = false;
    checkInputs.forEach(el => {
        const { name, isReq, pattern,type } = el;
        const value = form.elements[name].value;
        if (isReq) {
            if (value === '') {
                return alert(`This field ${name} can not be empty`);
            };
            if (type === 'number') {
                const reg = new RegExp(pattern);
                if (!reg.test(+value)) {
                    return alert(`Please make sure if the value is a number`)
                }
            } else {
                const reg = new RegExp(pattern);
                if (!reg.test(value)) {
                    return alert(`Please check if field ${name} contains correctly value base it of name`);
                };
            };
        }
        isValid = true;
    });
    return isValid;
};

export function createLiElement(insertToElement,id,excursionName,excursionDescription,excursionAdultPrice,excursionChildPrice) {
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