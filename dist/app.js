require("./runtime");
require("./common");
require("./vendors");
require("./taro");

(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["app"],{

/***/ "./node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib/index.js!./src/app.tsx":
/*!**************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib!./src/app.tsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobxreact.esm.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./src/store/index.ts");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.scss */ "./src/app.scss");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_app_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






var store = {
  storesContext: _store__WEBPACK_IMPORTED_MODULE_3__[/* storesContext */ "a"]
};
var App = function App(props) {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    // 检测新版本
    if (_tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default.a.getUpdateManager) {
      var updateManager = _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default.a.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调.
        res.hasUpdate && console.warn("新版本提示");
      });
      updateManager.onUpdateReady(function () {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default.a.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function success(res) {
            if (res.confirm) {
              updateManager.applyUpdate(); // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            }
          }
        });
      });
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default.a.showModal({
          title: "已经有新版本了哟~",
          content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
        });
      });
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default.a.showModal({
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  }, []);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__["jsx"])(mobx_react__WEBPACK_IMPORTED_MODULE_1__[/* Provider */ "a"], {
    store: store,
    children: props.children
  });
};
/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tarojs_plugin_platform_weapp_dist_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/plugin-platform-weapp/dist/runtime */ "./node_modules/@tarojs/plugin-platform-weapp/dist/runtime.js");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_tarojs_mini_runner_node_modules_babel_loader_lib_index_js_app_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib!./app.tsx */ "./node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib/index.js!./src/app.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ "./node_modules/@tarojs/react/dist/react.esm.js");









var config = {"pages":["pages/index/index","pages/repost/index","pages/user/index","pages/details/index","pages/login/index"],"window":{"backgroundTextStyle":"light","navigationBarBackgroundColor":"#fff","navigationBarTitleText":"WeChat","navigationBarTextStyle":"black","navigationStyle":"custom"},"style":"v2","tabBar":{"custom":true,"list":[{"pagePath":"pages/index/index","text":"主页"},{"pagePath":"pages/repost/index","text":"发布"},{"pagePath":"pages/user/index","text":"我"}]}};
_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__["window"].__taroAppConfig = config
var inst = App(Object(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__["createReactApp"])(_node_modules_tarojs_mini_runner_node_modules_babel_loader_lib_index_js_app_tsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], react__WEBPACK_IMPORTED_MODULE_4__, react_dom__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], config))

Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__["initPxTransform"])({
  designWidth: 750,
  deviceRatio: {"640":1.17,"750":1,"828":0.905}
})


/***/ })

},[["./src/app.tsx","runtime","taro","vendors","common"]]]);;
//# sourceMappingURL=app.js.map