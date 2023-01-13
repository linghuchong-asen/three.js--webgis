export const isObject = (param: any): boolean => {
  if (typeof param !== 'object' || param === null) {
    return false;
  } else {
    return true;
  }
};
