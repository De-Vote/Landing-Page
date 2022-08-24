
async function login(account, password) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: account, password: password }),
        };
        let result = await fetch(process.env.API_URL + '/api/v1/auth/authenticate', requestOptions)
        let response = await result.json();
        return {
            ok: (result.status == 200)?true:false,
            data: response
        }
    } catch (e) {
        return {
            ok: false,
            data: e.message
        }
    }
}

async function createAccount(data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
        let result = await fetch(process.env.API_URL + '/api/v1/accounts', requestOptions)
        let response = await result.json();
        return {
            ok: (result.status == 201)?true:false,
            data: response
        }
    } catch (e) {
        return {
            ok: false,
            data: e.message
        }
    }
}

async function createVoterAccount(api_key, number) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        };
        let result = await fetch(process.env.API_URL + `/api/v1/voter/${number}`, requestOptions)
        let response = await result.json();
        return {
            ok: (result.status == 201)?true:false,
            data: response
        }
    } catch (e) {
        return {
            ok: false,
            data: e.message
        }
    }
}

module.exports = {
    login,
    createAccount,
    createVoterAccount
}