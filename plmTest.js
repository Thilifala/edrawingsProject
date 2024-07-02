
define("plmTestPlugin", ["require", "exports", "eDwTypes", "eDwCommandMgr", "eDwSetHierNodeAttribsCmd", "eDwShowOnlyCmd", "eDwUIUtils",
    "eDwEventMgr", "eDwUIShortcutMenu", "eDwKeyMgr", "eDwEvents", "eDwUIBasePlugin", "utils", "jqutils", "eDwMeasureEntities", "eDwMeasureMgr"],
    (function (require, exports, eDwTypes_14, eDwCommandMgr, eDwSetHierNodeAttribsCmd, eDwShowOnlyCmd, eDwUIUtils,
        eDwEventMgr, eDwUIShortcutMenu_4, eDwKeyMgr_4, eDwEvents_7, eDwUIBasePlugin_1, utils, jqutils, eDwMeasureEntities, eDwMeasureMgr) {
        "use strict";
        console.log(`PLM Log：plmTestPlugin`)
        var plmTestPlugin = function (_super) {
            __extends(plmTestPlugin, _super);
            function plmTestPlugin(iViewer, iViewerFeatOpts) {
                var _this = _super.call(this, "plmTest", iViewer, 0, iViewerFeatOpts) || this;

                /*todo:
                1、找到插件加载入口
                2、plm插件继承基类，并加到插件列表运行
                3、模仿 plm test:HideOthers 写业务
                */
                var selMgr = iViewer.SelectionMgr;
                // this.mMeasureOp = new eDwMeasureOperator(iViewer, this);
                var mMeasureEntities = new eDwMeasureEntities(iViewer);


                $('#btnPLMHideOthers').on('click', (e) => {
                    var selectNode = selMgr.getSelHierarchyNodes();
                    var showOnlyCmd = new eDwShowOnlyCmd(iViewer, selectNode);
                    return [4, eDwCommandMgr.get().run(showOnlyCmd, "commit")];
                })
                $('#btnPLMSelectFirst').on('click', (e) => {
                    let fileName = 'ksd171005a-01-04-84<1>';
                    let selector = `div.edrawings-submenu-list-item:contains("${fileName}")`;
                    let jqTarget = $(selector);
                    let id = eDwUIUtils.getIDHC(jqTarget)
                    selMgr.selectByID(id)
                })
                $('#btnPLMShowAll').on('click', (e) => {
                    var showAllCmd = new eDwShowOnlyCmd(iViewer);
                    return [4, eDwCommandMgr.get().run(showAllCmd, "commit")];
                })
                $('#btnPLMHideShow').on('click', (e) => {
                    var selHierNodes = selMgr.getSelHierarchyNodes();
                    var attribs = selHierNodes[0].getAttribs().copy();
                    attribs.Visible = !attribs.Visible;
                    var selHideShowCmd = new eDwSetHierNodeAttribsCmd(iViewer, selHierNodes, attribs);
                    return [4, eDwCommandMgr.get().run(selHideShowCmd, "commit")];
                })
                $('#btnPLMExplosion').on('click', (e) => {
                    var currLevel = iViewer.getExplosionLevel();
                    iViewer.setExplosionLevel(currLevel + 1);
                })
                $('#btnSetViewOrientation').on('click', (e) => {
                    iViewer.HCViewer.setViewOrientation(eDwTypes_14.HC.ViewOrientation.Bottom)
                })
                $('#btnSetPoint').on('click', (e) => {
                    /*todo:
                    1、找到canvas点击事件原理
                    2、找到点击事件如何触发的画点
                    3、模仿 画点
                    */
                    // var mMeasureMrg = new eDwMeasureMgr(iViewer);
                    // let extSelObj = extSelObj_g;
                    // mMeasureEntities.addEntity(extSelObj);
                    // mDistLine_g.draw();

                    //方案2：
                    eDwUIUtils.resetToHomeView(iViewer);

                    const markUpContent = $('#plmMarkUpContent')
                    markUpContent.show();
                    const width = markUpContent.width();
                    const height = markUpContent.height();

                    const markUpPoint = $('#plmMarkUpPoint')
                    markUpPoint.show();
                    // const markUpPoint = document.getElementById("plmMarkUpPoint");
                    // const { x2, y2, width2, height2 } = markUpPoint.getBoundingClientRect();

                    const canvas = document.getElementById("myCanvas");
                    const ctx = canvas.getContext("2d");
                    
                    ctx.beginPath();
                    ctx.moveTo(width/2,height);
                    ctx.lineTo(54,100);
                    // ctx.lineWidth = 10;
                    ctx.strokeStyle = "red";
                    ctx.stroke();

                })
            }
            plmTestPlugin.prototype.init = function () {
                // console.log(`plmTestPlugin init`)
            };
            return plmTestPlugin;
        }(eDwUIBasePlugin_1.eDwUIBasePlugin);

        return plmTestPlugin;
    }));