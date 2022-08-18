
async function Tally(api_key, vote_id) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        };
        let result = await fetch(process.env.API_URL + `/api/v1/tally/${vote_id}`, requestOptions)
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

async function getTallyResult(api_key, vote_id) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
        };
        let result = await fetch(process.env.API_URL + `/api/v1/tally/${vote_id}`, requestOptions)
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

module.exports = {
    Tally,
    getTallyResult
}