const baseURL = process.env.REACT_APP_API_URL;

export const noTokenFetch = (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export const tokenFetch = (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}

export const formDataFetch = (endpoint, data, method = 'POST') => {
    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'POST') {
        return fetch(url, {
            method: 'POST',
            headers: {
                'x-token': token
            },
            body: data
        }); 
    }   
    if (method === 'PUT') {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'x-token': token
            },
            body: data
        }); 
    }   
}