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

export function findMindex(arr) {
  return arr.reduce((acc, cur, index) => (cur < arr[acc] ? index : acc), 0);
}
