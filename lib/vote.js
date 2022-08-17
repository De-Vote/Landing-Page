
async function getOwnedVote(api_key){
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        };
        let result = await fetch(process.env.API_URL + '/api/v1/votes', requestOptions)
        let response = await result.json();
        return {
            ok: (result.status == 200)?true:false,
            data: response.data
        }
    } catch (e) {
        return {
            ok: false,
            data: e.message
        }
    }
}

async function getOneVote(api_key, vote_id){
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        };
        let result = await fetch(`${process.env.API_URL}/api/v1/votes/${vote_id}`, requestOptions)
        let response = await result.json();
        return {
            ok: (result.status == 200)?true:false,
            data: response.data
        }
    } catch (e) {
        return {
            ok: false,
            data: e.message
        }
    }
}

async function getVoteQuestion(api_key, vote_id){
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        };
        let result = await fetch(process.env.API_URL + `/api/v1/votes/${vote_id}/questions`, requestOptions)
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

async function SetVoteQuestion(api_key, vote_id, data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify(data),
        };
        let result = await fetch(process.env.API_URL + `/api/v1/votes/${vote_id}/questions`, requestOptions)
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

async function SetOwnedVotes(api_key, data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify(data),
        };
        let result = await fetch(process.env.API_URL + '/api/v1/votes', requestOptions)
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

async function UpdateVoteTitle(api_key, title, vote_id) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({title: title}),
        };
        let result = await fetch(process.env.API_URL + '/api/v1/votes/'+vote_id, requestOptions)
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
    getOwnedVote,
    getOneVote,
    SetOwnedVotes,
    getVoteQuestion,
    SetVoteQuestion,
    UpdateVoteTitle
}