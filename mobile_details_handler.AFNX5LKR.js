var handler = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/mobile/details/handler.js
  var require_handler = __commonJS({
    "src/mobile/details/handler.js"(exports, module) {
      module.exports = async (ctx) => {
        var _a;
        let id = ctx.params.id;
        let query = ctx.query;
        let jsonV3 = [
          [
            "dramaSeries:剧集",
            "KVProxy",
            "getDocument",
            id
          ]
        ];
        let allDataV3 = await transferV3(ctx, jsonV3);
        let jsonV4 = [
          [
            "account",
            "KVProxy",
            "getWemediaAccountDetail",
            allDataV3.dramaSeries.wemediaEAccountId,
            { nodename: ".data", afterjson: true }
          ]
        ];
        let allDataV4 = await transferV4(ctx, jsonV4);
        const positiveUcmsIdList = allDataV3.dramaSeries.content.dataList;
        let positiveFetchList = [];
        for (let i = 0; i < positiveUcmsIdList.length; i++) {
          positiveFetchList.push([`${i}`, "KVProxy", "getFeedflowListByUcmsIds", `${positiveUcmsIdList[i].ucmsId}`, {}]);
        }
        let positive = await transferV4(ctx, positiveFetchList);
        function iterator2(arr) {
          let newarr = [];
          for (let key in arr) {
            if (arr[key] instanceof Array) {
              newarr = newarr.concat(iterator2(arr[key]));
            } else {
              newarr.push(arr[key]);
            }
          }
          return newarr;
        }
        positive = iterator2(positive);
        const relatedIdsList = allDataV3.dramaSeries.content.relatedIds;
        const relatedList = new Tars.List(Tars.String);
        let related = [];
        if (relatedIdsList) {
          for (let i = 0; i < relatedIdsList.length; i++) {
            relatedList.push(relatedIdsList[i]);
          }
          related = await KVProxy.getFeedflowListByUcmsIds(ctx, relatedList);
          if (related == null ? void 0 : related.response) {
            related = related.response.return.toObject();
          }
        }
        let crowdIdFetchList = [];
        for (let i = 0; i < positive.length; i++) {
          crowdIdFetchList.push([
            `${i}`,
            "KVProxy",
            "getCrowdMainDocListByPage",
            `${positive[i].extentData.crowdVideoSeriesId},0,50`,
            {}
          ]);
        }
        let crowd = await transferV4(ctx, crowdIdFetchList);
        let gags = [];
        for (const key in crowd) {
          gags.push((_a = crowd[key]) == null ? void 0 : _a.data);
        }
        return {
          allData: {
            ...allDataV3,
            ...allDataV4,
            positive,
            related,
            crowd,
            gags,
            query
          },
          adKeys: []
        };
      };
    }
  });
  return require_handler();
})();
