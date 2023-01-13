/*
 * @Description: 监听器公共函数
 * @Author: yangsen
 * @Date: 2023-01-10 15:27:37
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-10 15:56:13
 */
const monitor = (obj: object | any[]) => {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('监听器传入参数类型不正确');
  }

  const proxyObj = new Proxy(obj, {
    get: (target: any, propKey: any, receiver: any) => {
      return Reflect.get(target, propKey, receiver);
    },
    set: (target: any, propKey: any, value: any, receiver: any) => {
      return Reflect.set(target, propKey, value, receiver);
    },
  });
  return proxyObj;
};
export { monitor };
