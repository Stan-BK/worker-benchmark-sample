import { find99 } from "./build/release.js";

onmessage = function test(e) {
  try {
    const [data, testCase] = e.data.arguments;
    console.log("Benchmark...");

    const d = eval(data);
    const func = eval(testCase);
    globalThis.Data = d;

    if (func === undefined || typeof func !== "function") {
      postMessage("Invalid test case");
      return;
    }

    let warmupTime = 500;
    let warmupTimes = 0;
    let warmupStart = Date.now();
    let avgTime = 0;
    while (Date.now() - warmupStart < warmupTime) {
      func(data);
      warmupTimes++;
    }

    avgTime = (Date.now() - warmupStart) / warmupTimes;

    warmupStart = Date.now();
    warmupTimes = 0;
    while (Date.now() - warmupStart < 1000) {
      find99(data);
      warmupTimes++;
    }

    let assemblyAvgTime = (Date.now() - warmupStart) / warmupTimes;
    postMessage({
      avgTime,
      assemblyAvgTime,
    });
  } catch (e) {
    postMessage(e);
    return;
  }
};
