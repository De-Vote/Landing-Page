const ExcelJS = require('exceljs')


export async function createXslx(data){


const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("accounts");

worksheet.columns = [
    { header: 'account', key: 'account', width: 10 },
    { header: 'password', key: 'password', width: 20 },
    { header: 'qrcode', key: 'qrcode', width: 50 },
  ];

 data.map((row, i)=>{
    // console.log('===========================')
    // console.log(row)
    let account = (row[0])? row[0]: ""
    worksheet.addRow({ account, password: row[1] });
    let imageID = workbook.addImage({
        base64: row[2],
        extension: 'png',
        // tl: { col: 2, row: i+1 },
        // br: { col: 3, row: i+2 }
    });
    worksheet.addImage(imageID, {
        tl: { col: 2, row: i+1 },
        ext: { width: 150, height: 150 } // currently I'm using fixed width and height.
      });
    worksheet.getRow(i+2).height = 170
 })

 let result = await workbook.xlsx.writeBuffer({base64: true})
//  result = result.toString('base64')
return result
}