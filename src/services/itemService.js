import http from "./httpService";


export function getItems() {
    return http.get("items");
}

export function getItem(itemId) {
    return http.get("items/" + itemId);
}

export function saveItem(item) {
    if (item._id) {
        const body = { ...item };
        delete body._id;
        return http.put("items/" + item._id, body)
    }
    return http.post('items/', item)

}

export function deleteItems(itemId) {
    return http.delete("items/" + itemId);
}
