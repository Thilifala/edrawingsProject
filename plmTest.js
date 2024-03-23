// define("plmTestPlugin", ["require", "exports", "eDwCommandMgr", "eDwSetHierNodeAttribsCmd", "eDwShowOnlyCmd", "eDwUIUtils", "eDwEventMgr", "eDwUIShortcutMenu", "eDwKeyMgr", "eDwEvents", "eDwUIBasePlugin", "utils", "jqutils"], (function (require, exports, eDwCommandMgr, eDwSetHierNodeAttribsCmd, eDwShowOnlyCmd, eDwUIUtils, eDwEventMgr, eDwUIShortcutMenu_4, eDwKeyMgr_4, eDwEvents_7, eDwUIBasePlugin_1, utils, jqutils) {
//     "use strict";
//     console.log(`plm test plmTestPlugin`)

//     var plmTestPlugin = function(_super){
//         __extends(plmTestPlugin, _super);
//         function plmTestPlugin(iViewer,iViewerFeatOpts){
//             console.log(`plmTestPlugin construct`)
//             var _this = _super.call(this, "plmTest", iViewer, 0, iViewerFeatOpts) || this;

//             /*todo:
//             1、找到插件加载入口
//             2、plm插件继承基类，并加到插件列表运行
//             3、模仿 plm test:HideOthers 写业务
//             */
//              $('#btnPLMHideOthers').on('click',(e) => {
//                 var selMgr = iViewer.SelectionMgr;
//                 var selectNode = selMgr.getSelHierarchyNodes();
//                 var showOnlyCmd = new eDwShowOnlyCmd(iViewer, selectNode);
//                 return [4, eDwCommandMgr.get().run(showOnlyCmd, "commit")];
//             })
//             $('#btnPLMSelectFirst').on('click',(e) => {
                
//             })
//         }
//         plmTestPlugin.prototype.init = function () {
//             console.log(`plmTestPlugin init`)
//         };
//         return plmTestPlugin;
//     }(eDwUIBasePlugin_1.eDwUIBasePlugin);

//     return plmTestPlugin;
// }));