export const isFunction = (x) => {
    return typeof x  === "function";
}

export const isObject = (x) => {
    return typeof x  === "object";
}

export const compareItems = (item1, item2) => {
    if(isFunction(item1)) {
            return item1 === item2;
    }

    if(isObject(item1)) {
        return JSON.stringify(item1) === JSON.stringify(item2);
    }

    return item1 === item2;
} 

export const compareArrays = (array1, array2) => {
    array1 = [].concat(array1);
    array2 = [].concat(array2);

    return array1.length === array2.length && array1.every((item1, index) => {
        const item2 = array2[index];
        return compareItems(item1, item2);
    });
}