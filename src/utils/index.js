/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

//判断当前对象是否在数组有个一样的，而且数组中的对象属性可以包含item中所有属性
export function isCurrentDataInList(item, list) {
  let isInList = false;
  if (!item || !list || list?.length === 0) {
    return isInList;
  }
  const findItem = list.find(
    (x) => item.source === x.target && item.target === x.source
  );
  findItem && (isInList = true);

  return isInList;
}

export function buildUUID() {
  const hexList = [];
  for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16);
  }
  let uuid = "";
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += "-";
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid.replace(/-/g, "");
}

export function buildShortUUID(prefix = "") {
  let unique = 0;

  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
  const result = prefix + "_" + random + unique + String(time);
}

//找出最小的返回
export function findMindex(arr) {
  return arr.reduce((acc, cur, index) => (cur < arr[acc] ? index : acc), 0);
}

export function formatNumberToChinese(num) {
  const arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const arr2 = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
  ]; //可继续追加更高位转换值

  if (!num || isNaN(num)) {
    return "零";
  }

  const english = num.toString().split("");

  let result = "";

  for (let i = 0; i < english.length; i++) {
    const des_i = english.length - 1 - i; //倒序排列设值

    result = arr2[i] + result;

    const arr1_index = english[des_i];

    result = arr1[arr1_index] + result;
  } //将【零千、零百】换成【零】 【十零】换成【十】

  result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十"); //合并中间多个零为一个零

  result = result.replace(/零+/g, "零"); //将【零亿】换成【亿】【零万】换成【万】

  result = result.replace(/零亿/g, "亿").replace(/零万/g, "万"); //将【亿万】换成【亿】

  result = result.replace(/亿万/g, "亿"); //移除末尾的零

  result = result.replace(/零+$/, ""); //将【零一十】换成【零十】 //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十 //将【一十】换成【十】

  result = result.replace(/^一十/g, "十");

  return result;
}
