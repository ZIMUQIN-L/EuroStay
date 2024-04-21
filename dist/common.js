(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/store/GlobalStore/index.ts":
/*!****************************************!*\
  !*** ./src/store/GlobalStore/index.ts ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_francesx_Documents_GitHub_EuroStay_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_francesx_Documents_GitHub_EuroStay_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/dist/mobx.esm.js");



var GlobalStore = /*#__PURE__*/Object(_Users_francesx_Documents_GitHub_EuroStay_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function GlobalStore() {
  Object(_Users_francesx_Documents_GitHub_EuroStay_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, GlobalStore);
  Object(mobx__WEBPACK_IMPORTED_MODULE_2__[/* makeAutoObservable */ "l"])(this, {}, {
    autoBind: true
  });
});
/* harmony default export */ __webpack_exports__["a"] = (new GlobalStore());

/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! exports provided: storesContext */
/*! exports used: storesContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storesContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalStore */ "./src/store/GlobalStore/index.ts");


var storesContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  GlobalStore: _GlobalStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
});

/***/ })

}]);
//# sourceMappingURL=common.js.map