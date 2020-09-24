import * as XLSX from 'xlsx';
import axios from "axios";
import utf8 from 'utf8'

//export const urlXlsxGoogle = "https://docs.google.com/spreadsheets/d/1Oikpp2P8Tp4I8s4gIJEjK4rnR4WRIoG8SMyawtCifSs/export?format=xlsx";
export const urlXlsxGoogle = "https://docs.google.com/spreadsheets/d/1Oikpp2P8Tp4I8s4gIJEjK4rnR4WRIoG8SMyawtCifSs/gviz/tq?tqx=out:csv";


export const getXLS = () => {
    return axios.request({
        url: urlXlsxGoogle,
        method: 'get',
        responseType: 'arraybuffer',
        headers: {
            Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
    }).then((response) => {
        console.log(response)
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, {type: "array"});
        const typesWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        const productsWorksheet = workbook.Sheets[workbook.SheetNames[1]];
        const types = XLSX.utils.sheet_to_json(typesWorksheet);
        const products = XLSX.utils.sheet_to_json(productsWorksheet);
console.log(types);

const convertTypes = JSON.parse(utf8.decode(JSON.stringify(types)))
const convertProducts = JSON.parse(utf8.decode(JSON.stringify(products)))
        console.log(convertTypes)
        return {types: convertTypes, products: convertProducts}
    });
}

// export const logXlsx = ()=> {
//     const wopts = {bookType: 'xlsx', bookSST: false, type: 'base64'};
//
//     axios.request({
//         url: urlXlsxGoogleWrite,
//         method: 'post',
//         // headers: {
//         //     Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         // })
//         data: JSON.stringify({
//             "range": 'A1',
//             "values": wopts
//
//         })
//     }).then((response) => {
//
//     }).catch(err=>{
//
//     })
// }
