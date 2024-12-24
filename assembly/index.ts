// The entry file of your WebAssembly module.

export function find99(arr: Int32Array): i32 {
  return arr.findIndex((value) => value === 99);
}
