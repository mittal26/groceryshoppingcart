import http from "./httpService";


export function getCategory() {
    //console.log("dfdfsfdfdsf")
    return http.get("categorys");
}