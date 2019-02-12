export const isFunction = x => {
  return typeof x === 'function';
};

export const isObject = x => {
  return typeof x === 'object';
};

export const isString = x => {
  return typeof x === 'string';
};

export const compareItems = (item1, item2) => {
  if (isFunction(item1)) {
    return item1 === item2;
  }

  if (isObject(item1)) {
    return JSON.stringify(item1) === JSON.stringify(item2);
  }

  return item1 === item2;
};

export const compareArrays = (array1, array2) => {
  const safeArray1 = [].concat(array1);
  const safeArray2 = [].concat(array2);

  return (
    safeArray1.length === safeArray2.length &&
    safeArray1.every((item1, index) => {
      const item2 = safeArray2[index];
      return compareItems(item1, item2);
    })
  );
};
