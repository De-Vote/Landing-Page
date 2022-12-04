import authhelper from "../../lib/auth"
import signmessage from "../../lib/signRequest"
import createQRCode from "../../lib/qrcode";
import { createXslx } from "../../lib/excel";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // console.log(req)
        const vote_id = JSON.parse(req.body).vote_id
        // console.log(vote_id)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization
            },
        };
        let result = await fetch(process.env.API_URL + `/api/v1/voter/${vote_id}`, requestOptions)
        let response = await result.json();
        let codes = response.data;
    
        let accounts = []
        codes.map(async (code, i) => {
            let res = await authhelper.invitation_query(vote_id, code);
            accounts.push(res)
        })
        // remove promise all
        // let accounts = await Promise.all(requestArr)
        // console.log(accounts)
        let qrcodeArr = []
        accounts.map((account)=>{
            let qrcode = createQRCode(account.data[0],account.data[1]);
            qrcodeArr.push(qrcode)
        })
        let alldata = await Promise.all(qrcodeArr)
        let csvFile = await createXslx(alldata)
        res.status(200);
        // res.setHeader("Content-Type", "text/csv")
        res.setHeader("Content-Type","application/vnd.ms-excel;charset=utf-8;")
        res.setHeader("Content-Disposition", `attachment; filename=${"accounts"}`)
        res.send(csvFile);
        // res.json({data: csvFile})
    }
    else{
        res.status(404)
    }
  }


  function genCsv(data) {
    let rows = ["account, password, qrcode"]
    let content = data.map((account) => {
      return account.join(',')
    })
    rows = rows.concat(content)
    let csvContent = rows.map(e => e).join("\n");
    console.log(csvContent)
    return csvContent
    // var encodedUri = encodeURI(csvContent);
    // var link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "voter_list.csv");
    // document.body.appendChild(link); // Required for FF
    // link.click(); // This will download the data file named "my_data.csv".
    // toast.info("成功產生帳號，請小心收藏!")
  }