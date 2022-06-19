class ExcursionsAPI {

    constructor() {
        this.url = 'http://localhost:3000';
    };

    addApi(data,callback) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`${this.url}/excursions`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Can not send data to server`);
                };
            }).catch(error => alert(`${error}`))
            .finally(callback)
    };

    removeApi(id,callback) {
        const options = {
            method: 'DELETE',
        };
        fetch(`${this.url}/excursions/${id}`, options)
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
        fetch(`${this.url}/excursions/${id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Can not update content')
                }
            }).catch(error => alert(`${error}`))
            .finally(callback);
    };

    getApi() {
        return fetch(`${this.url}/excursions`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Can not get data from server, try again later');
                };
                return response.json();
            })
            .catch(error => alert(`${error}`));
    };

    addClientOrderApi(data,callback) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`${this.url}/orders`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Can not send data to server`);
                };
            }).catch(error => alert(`${error}`))
            .finally(callback)
    };
};

export default ExcursionsAPI;