// The entry file of your WebAssembly module.
import { logString } from "./env";

export function _start(a: i32, b: i32): String {
  logString("test")
  return "Hello, World!!!";
}

