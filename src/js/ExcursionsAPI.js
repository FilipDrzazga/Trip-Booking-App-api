class ExcursionsAPI {

    constructor() {
        this.excursions = 'http://localhost:3000/excursions';
        this.orders = 'http://localhost:3000/orders';
    };

    addDataApi(data,callback) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`${this.excursions}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Can not send data to server`);
                };
            }).catch(error => alert(`${error}`))
            .finally(callback)
    };

    removeDataApi(id,callback) {
        const options = {
            method: 'DELETE',
        };
        fetch(`${this.excursions}/${id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Can not delete file from server, try again later');
                };
            }).catch(error => alert(`${error}`))
            .finally(callback);
    };

    updateApi(id, data, callback) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`${this.excursions}/${id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Can not update content')
                }
            }).catch(error => alert(`${error}`))
            .finally(callback);
    }

    getDataApi() {
        return fetch(`${this.excursions}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Can not get data from server, try again later');
                };
                return response.json();
            })
            .catch(error => alert(`${error}`));
    };
};

export default ExcursionsAPI;