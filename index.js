const worker = new Worker("worker.js", { type: "module" });

const avgTimeSpan = document.getElementById("avgTime");
const assemblyAvgTimeSpan = document.getElementById("assemblyAvgTime");
const btn = document.getElementById("btn");
const dataTextArea = document.getElementById("dataTextArea");
const testCaseTextArea = document.getElementById("testCaseTextArea");
btn.addEventListener("click", () => {
  avgTimeSpan.textContent = "Benchmarking...";
  assemblyAvgTimeSpan.textContent = "Benchmarking...";
  worker.postMessage({
    arguments: [dataTextArea.value, testCaseTextArea.value],
  });
});

worker.onmessage = (e) => {
  const res = e.data;
  avgTimeSpan.textContent =
    typeof res == "number" ? res.avgTime + " ms" : res.avgTime;
  assemblyAvgTimeSpan.textContent =
    typeof res == "number" ? res.assemblyAvgTime + " ms" : res.assemblyAvgTime;
};
