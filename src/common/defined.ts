/**
 * @@description: 用于判断一个值是否等于undefined或null
 * @param {*} T
 * @example: if (defined(value)){
 *                ....
 *           }else {....}
 */
export const defined = <T>(value: T): boolean => {
  return value !== undefined && value !== null;
};
