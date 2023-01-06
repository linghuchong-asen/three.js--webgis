/**
 * @@description: 将传入的arr切割成num长度的多个小数组。
 * @param {chunkArrayParam} params
 */
interface chunkArrayParam {
  arr: any[];
  num: number;
}
const chunkArray = (params: chunkArrayParam) => {
  let newArr!: any[];
  params.arr.map((item, index) => {
    const newArrIndex = index % params.num;
    if (newArrIndex === 0) {
      newArr.push([]);
    }
    newArr[newArr.length - 1].push(item);
  });
  return newArr;
};
export { chunkArray };
