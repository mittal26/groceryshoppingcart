import _ from "lodash";

export function paginate(items, itemsPerPage, page) {
    let startIndex = (page - 1) * itemsPerPage;

    return _(items).slice(startIndex).take(itemsPerPage).value();
}