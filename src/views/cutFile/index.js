import SparkMD5 from "spark-md5";

const CHUNK_SIZE = 1024 * 1024 * 5; //分割5M
const THREAD_NUM = navigator.hardwareConcurrency || 4; //开启的线程数量，获取cpu核数

export function cutFile(file) {
  return new Promise((resolve, reject) => {
    const chunkNum = Math.ceil(file.size / CHUNK_SIZE); //分片数量
    const chunkNumPerThread = Math.ceil(chunkNum / THREAD_NUM); //计算每个线程处理多少个分片
    const results = []; //线程处理的结果
    let finishThreadNum = 0; //已完成的线程数量
    for (let i = 0; i < THREAD_NUM; i++) {
      // 给每个线程分配任务
      // 使用 URL 构造函数确保正确的路径解析
      const workerScriptUrl = new URL("./worker.js", import.meta.url);
      const worker = new Worker(workerScriptUrl, {
        type: "module",
      });
      worker.postMessage({
        file,
        start: i * chunkNumPerThread, //起始的分片下标
        end: Math.min((i + 1) * chunkNumPerThread, chunkNum), //结束的分片下标
        chunkSize: CHUNK_SIZE,
      });

      worker.onmessage = (e) => {
        worker.terminate(); //终止当前线程
        results[i] = e.data;
        finishThreadNum++;
        if (finishThreadNum === THREAD_NUM) {
          resolve(results.flat());
        }
      };
    }
  });
}

export async function createChunk(file, index, size) {
  return new Promise((resolve, reject) => {
    const start = index * size;
    const end = Math.min(file.size, start + size);
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      resolve({
        blob,
        hash: spark.end(),
        start,
        end,
        index,
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
