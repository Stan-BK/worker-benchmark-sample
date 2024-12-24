import { find99 } from './build/release.js'

function test(e) {
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
      const warmupStart = Date.now();
      let avgTime = 0;
      while (Date.now() - warmupStart < warmupTime) {
        func(data);
        find99(data);
        warmupTimes++;
      }

      avgTime = (Date.now() - warmupStart) / warmupTimes;
      postMessage(avgTime);
    } catch (e) {
      postMessage(e);
      return;
    }
  }

//   import { find99 } from './build/release.js';
const blobUrl = `import * as find99 from './build/release.js'; console.log(find99); onmessage = ${test}`;
const blob = new Blob([blobUrl], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob), { type: "module" });

const avgTimeSpan = document.getElementById("avgTime");
const btn = document.getElementById("btn");
const dataTextArea = document.getElementById("dataTextArea");
const testCaseTextArea = document.getElementById("testCaseTextArea");
btn.addEventListener("click", () => {
  avgTimeSpan.textContent = "Benchmarking...";
  worker.postMessage({
    arguments: [dataTextArea.value, testCaseTextArea.value]
  });
});

worker.onmessage = (e) => {
  const res = e.data;
  avgTimeSpan.textContent = typeof res == "number" ? res + " ms" : res;
};