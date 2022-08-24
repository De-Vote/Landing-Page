const util = require("tweetnacl-util")
const ed = require('@noble/ed25519')
async function signmessage(msg, key){
    const privateKey = util.decodeBase64(key)
    const message = util.decodeUTF8(msg);
    const signature = await ed.sign(message, privateKey);
    return util.encodeBase64(signature)
}
export default signmessage