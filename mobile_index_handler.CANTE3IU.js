var handler = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/mobile/index/handler.js
  var require_handler = __commonJS({
    "src/mobile/index/handler.js"(exports, module) {
      module.exports = async (ctx) => {
        let json = [
          ["SmallBanner3:小banner3", "KVProxy", "getStructuredFragment", "260138"],
          ["Stars:中外明星", "KVProxy", "getStructuredFragment", "260139"],
          ["SmallBanner4:小banner4", "KVProxy", "getStructuredFragment", "260140"],
          ["PlaceList:奥运场馆", "KVProxy", "getStructuredFragment", "260141"]
        ];
        let allData = await transferV3(ctx, json);
        return { allData, adKeys: [] };
      };
    }
  });
  return require_handler();
})();
