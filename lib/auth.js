
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

async function emailInvitationCode(code, vote_url, email) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code, vote_url: vote_url, email: email}),
        };
        let result = await fetch(process.env.API_URL + '/api/v1/email/send', requestOptions)
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
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
async function invitation_query(vote_id,invitationCode) {
    try {
      let password = genRanHex(6)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code:invitationCode,
            password
        }),
      };
      let result = await fetch(`${process.env.API_URL}/api/v1/invitation/${vote_id}`, requestOptions)
      let response = await result.json();
        return {
            ok: (result.status == 201)?true:false,
            data: [
                response?.data?.data.attributes?.username,
                password
            ]
        }
    } catch (e) {
        console.log(e.message)
        return {
            ok: (result.status == 201)?true:false,
            data: response
        }
    }
  }

module.exports = {
    login,
    createAccount,
    createVoterAccount,
    emailInvitationCode,
    invitation_query
}