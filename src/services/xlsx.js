import * as XLSX from 'xlsx';
import axios from "axios";
import utf8 from 'utf8'

//export const urlXlsxGoogle = "https://docs.google.com/spreadsheets/d/1Oikpp2P8Tp4I8s4gIJEjK4rnR4WRIoG8SMyawtCifSs/export?format=xlsx";
export const urlXlsxGoogle = "https://docs.google.com/spreadsheets/d/1Oikpp2P8Tp4I8s4gIJEjK4rnR4WRIoG8SMyawtCifSs/gviz/tq?tqx=out:csv";
export const urlXlsxGoogleBD = "https://docs.google.com/spreadsheets/d/1Oikpp2P8Tp4I8s4gIJEjK4rnR4WRIoG8SMyawtCifSs/gviz/tq?tqx=out:csv&sheet=BD";


export const getXLS = async () => {
    return axios.request({
        url: urlXlsxGoogle,
        method: 'get',
        responseType: 'arraybuffer',
        headers: {
            Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
    }).then((response) => {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, {type: "array"});
        const typesWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        const types = XLSX.utils.sheet_to_json(typesWorksheet);
         return JSON.parse(utf8.decode(JSON.stringify(types)))
    }).then(types => {
        // console.log(types)
        return axios.request({
            url: urlXlsxGoogleBD,
            method: 'get',
            responseType: 'arraybuffer',
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        }).then((response) => {
            const data = new Uint8Array(response.data);
            const workbook = XLSX.read(data, {type: "array"});
            const productsWorksheet = workbook.Sheets[workbook.SheetNames[0]];
            const products = XLSX.utils.sheet_to_json(productsWorksheet);
            const convertProducts = JSON.parse(utf8.decode(JSON.stringify(products)))
            // console.log({types, products: convertProducts})
            return {types, products: convertProducts}
        })
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
