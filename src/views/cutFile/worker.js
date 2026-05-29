import { createChunk } from "./index";

onmessage = async (e) => {
  const {
    file,
    start, //起始的分片下标
    end, //结束的分片下标
    chunkSize,
  } = e.data;
  const results = [];
  for (let i = start; i < end; i++) {
    const p = createChunk(file, i, chunkSize);
    results.push(p);
  }
  const chunks = await Promise.all(results);
  postMessage(chunks);
};
