/* eslint-disable @typescript-eslint/no-explicit-any */

export const pick = (object: any, keys: string[]) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as any);
};
