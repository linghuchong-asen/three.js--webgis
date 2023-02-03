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

/* 获取jpg图片地址 */
const getJpgUrl = (url: string) => {
  const { href } = new URL(`../src/assets/${url}.jpg`, import.meta.url);
  return href;
};

/* 将数组分成相邻两个一对的二维数组 */

export { getJpgUrl, chunkArray };
