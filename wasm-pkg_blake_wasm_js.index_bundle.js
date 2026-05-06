"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkclient_rendering_no_cra"] = self["webpackChunkclient_rendering_no_cra"] || []).push([["wasm-pkg_blake_wasm_js"],{

/***/ "./wasm-pkg/blake_wasm.js"
/*!********************************!*\
  !*** ./wasm-pkg/blake_wasm.js ***!
  \********************************/
(__webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   command_names: () => (/* reexport safe */ _blake_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__.command_names),\n/* harmony export */   run: () => (/* reexport safe */ _blake_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__.run)\n/* harmony export */ });\n/* harmony import */ var _blake_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blake_wasm_bg.wasm */ \"./wasm-pkg/blake_wasm_bg.wasm\");\n/* harmony import */ var _blake_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blake_wasm_bg.js */ \"./wasm-pkg/blake_wasm_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_blake_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);\nvar __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n_blake_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];\n/* @ts-self-types=\"./blake_wasm.d.ts\" */\n\n\n(0,_blake_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_set_wasm)(_blake_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);\n_blake_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_start();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://client-rendering-no-cra/./wasm-pkg/blake_wasm.js?\n}");

/***/ },

/***/ "./wasm-pkg/blake_wasm_bg.js"
/*!***********************************!*\
  !*** ./wasm-pkg/blake_wasm_bg.js ***!
  \***********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __wbg_log_911db2ac394e960d: () => (/* binding */ __wbg_log_911db2ac394e960d),\n/* harmony export */   __wbg_set_wasm: () => (/* binding */ __wbg_set_wasm),\n/* harmony export */   __wbindgen_init_externref_table: () => (/* binding */ __wbindgen_init_externref_table),\n/* harmony export */   command_names: () => (/* binding */ command_names),\n/* harmony export */   run: () => (/* binding */ run)\n/* harmony export */ });\n/**\n * Return the list of available command names (for tab completion).\n * @returns {string}\n */\nfunction command_names() {\n  let deferred1_0;\n  let deferred1_1;\n  try {\n    const ret = wasm.command_names();\n    deferred1_0 = ret[0];\n    deferred1_1 = ret[1];\n    return getStringFromWasm0(ret[0], ret[1]);\n  } finally {\n    wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);\n  }\n}\n\n/**\n * Run a blake command and return its output as a string.\n *\n * The browser always passes --json so React can render structured output.\n * Clear-screen is signaled by returning the sentinel string \"__CLEAR__\".\n * @param {string} input\n * @returns {string}\n */\nfunction run(input) {\n  let deferred2_0;\n  let deferred2_1;\n  try {\n    const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len0 = WASM_VECTOR_LEN;\n    const ret = wasm.run(ptr0, len0);\n    deferred2_0 = ret[0];\n    deferred2_1 = ret[1];\n    return getStringFromWasm0(ret[0], ret[1]);\n  } finally {\n    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);\n  }\n}\nfunction __wbg_log_911db2ac394e960d(arg0, arg1) {\n  console.log(getStringFromWasm0(arg0, arg1));\n}\nfunction __wbindgen_init_externref_table() {\n  const table = wasm.__wbindgen_externrefs;\n  const offset = table.grow(4);\n  table.set(0, undefined);\n  table.set(offset + 0, undefined);\n  table.set(offset + 1, null);\n  table.set(offset + 2, true);\n  table.set(offset + 3, false);\n}\nfunction getStringFromWasm0(ptr, len) {\n  ptr = ptr >>> 0;\n  return decodeText(ptr, len);\n}\nlet cachedUint8ArrayMemory0 = null;\nfunction getUint8ArrayMemory0() {\n  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {\n    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);\n  }\n  return cachedUint8ArrayMemory0;\n}\nfunction passStringToWasm0(arg, malloc, realloc) {\n  if (realloc === undefined) {\n    const buf = cachedTextEncoder.encode(arg);\n    const ptr = malloc(buf.length, 1) >>> 0;\n    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);\n    WASM_VECTOR_LEN = buf.length;\n    return ptr;\n  }\n  let len = arg.length;\n  let ptr = malloc(len, 1) >>> 0;\n  const mem = getUint8ArrayMemory0();\n  let offset = 0;\n  for (; offset < len; offset++) {\n    const code = arg.charCodeAt(offset);\n    if (code > 0x7F) break;\n    mem[ptr + offset] = code;\n  }\n  if (offset !== len) {\n    if (offset !== 0) {\n      arg = arg.slice(offset);\n    }\n    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);\n    const ret = cachedTextEncoder.encodeInto(arg, view);\n    offset += ret.written;\n    ptr = realloc(ptr, len, offset, 1) >>> 0;\n  }\n  WASM_VECTOR_LEN = offset;\n  return ptr;\n}\nlet cachedTextDecoder = new TextDecoder('utf-8', {\n  ignoreBOM: true,\n  fatal: true\n});\ncachedTextDecoder.decode();\nconst MAX_SAFARI_DECODE_BYTES = 2146435072;\nlet numBytesDecoded = 0;\nfunction decodeText(ptr, len) {\n  numBytesDecoded += len;\n  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {\n    cachedTextDecoder = new TextDecoder('utf-8', {\n      ignoreBOM: true,\n      fatal: true\n    });\n    cachedTextDecoder.decode();\n    numBytesDecoded = len;\n  }\n  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));\n}\nconst cachedTextEncoder = new TextEncoder();\nif (!('encodeInto' in cachedTextEncoder)) {\n  cachedTextEncoder.encodeInto = function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n      read: arg.length,\n      written: buf.length\n    };\n  };\n}\nlet WASM_VECTOR_LEN = 0;\nlet wasm;\nfunction __wbg_set_wasm(val) {\n  wasm = val;\n}\n\n//# sourceURL=webpack://client-rendering-no-cra/./wasm-pkg/blake_wasm_bg.js?\n}");

/***/ },

/***/ "./wasm-pkg/blake_wasm_bg.wasm"
/*!*************************************!*\
  !*** ./wasm-pkg/blake_wasm_bg.wasm ***!
  \*************************************/
(module, exports, __webpack_require__) {

eval("{/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./blake_wasm_bg.js */ \"./wasm-pkg/blake_wasm_bg.js\");\nmodule.exports = __webpack_require__.v(exports, module.id, \"656800ac0fbf6709e7c5\", {\n\t\"./blake_wasm_bg.js\": {\n\t\t\"__wbg_log_911db2ac394e960d\": WEBPACK_IMPORTED_MODULE_0.__wbg_log_911db2ac394e960d,\n\t\t\"__wbindgen_init_externref_table\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_init_externref_table\n\t}\n});\n\n//# sourceURL=webpack://client-rendering-no-cra/./wasm-pkg/blake_wasm_bg.wasm?\n}");

/***/ }

}]);