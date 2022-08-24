import authhelper from "../../lib/auth"
import signmessage from "../../lib/signRequest"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        let sig = await signmessage(JSON.stringify(req.body), process.env.signkey)
        let data = {
            data: req.body,
            signature: sig
        }
        // console.log(data)
        let result = await authhelper.createAccount(data)
        if(result.ok){
            res.status(201).json({ result: true, message:result.data })
        }
        else{
            res.status(500).json({ result: true, message:result.data })
        }
    }
    else{
        res.status(404)
    }
  }