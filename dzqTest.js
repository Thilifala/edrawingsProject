
define("dzqTestPlugin", ["require", "exports", "eDwTypes", "eDwCommandMgr", "eDwSetHierNodeAttribsCmd", "eDwShowOnlyCmd", "eDwUIUtils",
    "eDwEventMgr", "eDwUIShortcutMenu", "eDwKeyMgr", "eDwEvents", "eDwUIBasePlugin", "utils", "jqutils", "eDwMeasureEntities", "eDwMeasureMgr", "eDwUILocalize"],
    (function (require, exports, eDwTypes_14, eDwCommandMgr, eDwSetHierNodeAttribsCmd, eDwShowOnlyCmd, eDwUIUtils,
        eDwEventMgr, eDwUIShortcutMenu_4, eDwKeyMgr_4, eDwEvents_7, eDwUIBasePlugin_1, utils, jqutils, eDwMeasureEntities, eDwMeasureMgr, eDwUILocalize_1) {
        "use strict";
        console.log(`dzq Log：dzqTestPlugin`)

        function l_binder(iKey) {
            return eDwUILocalize_1.eDwUILocalize.getString.bind(null, iKey)
        }

        var DzqResultString = function () {
            function DzqResultString(iLocalizableName, iLocalizeableValue) {
                this.mLocalizableName = iLocalizableName;
                this.mLocalizeableValue = iLocalizeableValue;
                return this
            }

            Object.defineProperty(DzqResultString.prototype, "Name", {
                get: function () {
                    return this.mLocalizableName;
                }, enumerable: false, configurable: true
            });
            Object.defineProperty(DzqResultString.prototype, "Value", {
                get: function () {
                    return this.mLocalizeableValue;
                }, enumerable: false, configurable: true
            });

            return DzqResultString
        }();

        var extSelObj;//点对象
        var testCameraHC = {
            "_position": { "x": -0.36782525120971576, "y": 0.031138495089523446, "z": 0.8226964153474813 },
            "_target": { "x": -0.06658873274444943, "y": 0.009220431872186685, "z": -0.008505636931538163 },
            "_up": { "x": -0.5862569573367369, "y": -0.7871149551127813, "z": -0.1917102694486548 },
            "_width": 0.10674301907061828,
            "_height": 0.10674301907061828,
            "_projection": 0,
            "_nearLimit": 0.01,
            "_cameraFlags": 0
        }
        var testPosition = { x: 787, y: 399 };

        var dzqTestPlugin = function (_super) {
            __extends(dzqTestPlugin, _super);


            function dzqTestPlugin(iViewer, iViewerFeatOpts) {
                var _this = _super.call(this, "dzqTest", iViewer, 0, iViewerFeatOpts) || this;

                /*todo:
                1、找到插件加载入口
                2、dzq插件继承基类，并加到插件列表运行
                3、模仿 dzq test:HideOthers 写业务
                */
                var selMgr = iViewer.SelectionMgr;
                // this.mMeasureOp = new eDwMeasureOperator(iViewer, this);
                var mMeasureEntities = new eDwMeasureEntities(iViewer);
                var mMeasureMrg = new eDwMeasureMgr(iViewer);


                $('#btnDzqHideOthers').on('click', (e) => {
                    var selectNode = selMgr.getSelHierarchyNodes();
                    var showOnlyCmd = new eDwShowOnlyCmd(iViewer, selectNode);
                    return [4, eDwCommandMgr.get().run(showOnlyCmd, "commit")];
                })
                $('#btnDzqSelectFirst').on('click', (e) => {
                    let fileName = 'ksd171005a-01-04-84<1>';
                    let selector = `div.edrawings-submenu-list-item:contains("${fileName}")`;
                    let jqTarget = $(selector);
                    let id = eDwUIUtils.getIDHC(jqTarget)
                    selMgr.selectByID(id)
                })
                $('#btnDzqShowAll').on('click', (e) => {
                    var showAllCmd = new eDwShowOnlyCmd(iViewer);
                    return [4, eDwCommandMgr.get().run(showAllCmd, "commit")];
                })
                $('#btnDzqHideShow').on('click', (e) => {
                    var selHierNodes = selMgr.getSelHierarchyNodes();
                    if (selHierNodes && selHierNodes.length) {
                        (function () {
                            return __awaiter(_this, void 0, void 0, (function () {
                                var attribs, selHideShowCmd;
                                return __generator(this, (function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            attribs = selHierNodes[0].getAttribs().copy();
                                            attribs.Visible = !attribs.Visible;
                                            selHideShowCmd = new eDwSetHierNodeAttribsCmd(iViewer, selHierNodes, attribs);
                                            return [4, eDwCommandMgr.get().run(selHideShowCmd, "commit")];
                                        case 1:
                                            _a.sent();
                                            return [2]
                                    }
                                }))
                            }))
                        })()
                    }
                })
                $('#btnDzqExplosion').on('click', (e) => {
                    var currLevel = iViewer.getExplosionLevel();
                    iViewer.setExplosionLevel(currLevel + 1);
                })
                $('#btnSetViewOrientation').on('click', (e) => {
                    // iViewer.HCViewer.setViewOrientation(eDwTypes_14.HC.ViewOrientation.Bottom)//顶层方法
                    dzqSetCamera(iViewer, testCameraHC, 400);
                })
                $('#btnSetPoint').on('click', (e) => {
                    /*todo:
                    1、done-找到canvas点击事件原理(弄清楚执行机制，__awaiter，__generator)
                    2、done-找到点击事件如何触发的画点
                    3、done-记录点的位置+视图状态
                    3、done-模仿 画点 复原点的位置
                    ----画线方案1----
                    1、-找画线的原理
                    2、-线连自定义框
                    ----画线方案2----
                    1、旋转+滚动后，找出点的二维坐标
                    2、canvas画框
                    */
                    return __awaiter(_this, void 0, void 0, (function () {
                        return __generator(this, (function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4, dzqSetCamera(iViewer, testCameraHC)];
                                case 1:
                                    return [4, dzqSetPoint(_this, mMeasureMrg, eDwMeasureEntities, iViewer, utils, testPosition)];
                                case 2:
                                    dzqSetLine(extSelObj, mMeasureMrg)
                                    return [2];
                            }
                        }))
                    }))

                })
                $('#btnRemovePoint').on('click', (e) => {
                    return __awaiter(_this, void 0, void 0, (function () {
                        var extSelObj, idx, isAdded;
                        var mMeasureOp = mMeasureMrg.mMeasureOp;
                        return __generator(this, (function (_a) {
                            switch (_a.label) {
                                case 0:
                                    mMeasureOp.resetTempHighlight();
                                    return [4, iViewer.ViewMgr.pickFromPoint(testPosition, mMeasureOp.getPickConfig())];
                                case 1:
                                    extSelObj = _a.sent();
                                    idx = mMeasureOp.mMeasureEntities.isItemSelected(extSelObj);
                                    return [4, mMeasureOp.mMeasureEntities.removeEntityAtIndex(0)];
                                case 2:
                                    _a.sent();
                                    return [2];
                            }
                        }))
                    }))
                })
                $('#btnSetLine').on('click', (e) => {
                    dzqSetLine(extSelObj, mMeasureMrg);
                })
                $('#remarkInput').on('change',(e) => {
                    var newVal = e.target.value;
                    $('#edrawings-canvas-svg text tspan').eq(1).html(newVal)
                })
            }
            dzqTestPlugin.prototype.init = function () {
                // console.log(`dzqTestPlugin init`)
            };
            return dzqTestPlugin;
        }(eDwUIBasePlugin_1.eDwUIBasePlugin);


        //还原摄像机坐标
        function dzqSetCamera(iViewer, testCameraHC, iDuration) {
            // var centerHC = iViewer.getModel().getBoundingBox().center();
            var viewHC = iViewer.getHCView();
            var cameraHC = viewHC.getCamera().copy();
            // var upVecHC = cameraHC.getUp();
            // var eyeVecHC = cameraHC.getTarget().subtract(cameraHC.getPosition());
            // var dist = eyeVecHC.length();

            // eyeVecHC.set(0, 0, 1).scale(dist);
            // upVecHC.set(0, 1, 0);

            // eyeVecHC.set(1, 1, 1).normalize().scale(dist);

            // iViewer.ViewMgr.adjustOrientation(eyeVecHC, upVecHC);
            // cameraHC.setPosition(eyeVecHC.add(centerHC));
            // cameraHC.setUp(upVecHC);

            /*todo:
            根据JSON还原指定的比例+坐标：
            done1、找出坐标数据对象
            done2、找出比例数据
            done3、还原坐标
            done4、还原比例
            */
            Object.assign(cameraHC._position, testCameraHC._position);
            Object.assign(cameraHC._target, testCameraHC._target);
            Object.assign(cameraHC._up, testCameraHC._up);
            cameraHC._width = testCameraHC._width;
            cameraHC._height = testCameraHC._height;
            cameraHC._projection = testCameraHC._projection;
            cameraHC._nearLimit = testCameraHC._nearLimit;
            cameraHC._cameraFlags = testCameraHC._cameraFlags;

            iDuration = iDuration ?? 0;//动画延时
            // viewHC.fitWorld(iDuration, cameraHC);
            viewHC.setCamera(cameraHC, iDuration);
        }

        //还原点的位置
        function dzqSetPoint(_this, mMeasureMrg, eDwMeasureEntities, iViewer, utils, testPosition) {
            return __awaiter(_this, void 0, void 0, (function () {
                var idx, isAdded;
                //一个mMeasureMrg只能画一个点
                var mMeasureOp = mMeasureMrg.mMeasureOp;
                return __generator(this, (function (_a) {
                    switch (_a.label) {
                        case 0:
                            mMeasureOp.resetTempHighlight();
                            return [4, iViewer.ViewMgr.pickFromPoint(testPosition, mMeasureOp.getPickConfig())];
                        case 1:
                            extSelObj = _a.sent();//点对象
                            idx = mMeasureOp.mMeasureEntities.isItemSelected(extSelObj);//点对象序号
                            if (eDwMeasureEntities.PointToPoint || !utils.isNumber(idx)) {
                                return [3, 3];
                            }
                            //移除点
                            return [4, mMeasureOp.mMeasureEntities.removeEntityAtIndex(idx)];
                        case 2:
                            _a.sent();
                            return [2];
                        case 3:
                            //点对象附加
                            return [4, mMeasureOp.mMeasureEntities.addEntity(extSelObj)];
                        case 4:
                            isAdded = _a.sent();
                            if (isAdded) {
                                //高亮整个零件(注释了只高亮面，效果更好)
                                // mMeasureOp.highlightMeasuringItem(extSelObj)
                            } else {
                                mMeasureOp.dehighlightMeasuringItems()
                            }
                            return [2]
                    }
                }))
            }))


            //方案2：
            // setPoint2(eDwUIUtils, iViewer);
        }

        //画线+框
        function dzqSetLine(extSelObj, mMeasureMrg) {
            // var iColor = { r: 255, g: 50, b: 50 };
            var mWCEndPtHC0 = extSelObj.getPosition();
            // var mWCEndPntHC1 = { "x": -0.019599480563904592, "y": -0.016210202843822685, "z": 0.023380988009255255 };

            var mMeasureOp = mMeasureMrg.mMeasureOp;
            var MeasureAuxGeo = mMeasureOp.mMeasureEntities.mAuxGeoSelected;
            var result = new DzqResultString('dzqTestA', 'dzqTestB');
            MeasureAuxGeo.addMessage(result, mWCEndPtHC0, eDwTypes_14.HC.Color.red());
            MeasureAuxGeo.updateResultLabels();

            // setLine2(iViewer, eDwTypes_14, iColor, mWCEndPtHC0, mWCEndPntHC1);

            // document.addEventListener("mousemove", function () {
            //     setLine2(iViewer, eDwTypes_14, iColor, mWCEndPtHC0, mWCEndPntHC1);
            // })

            /*-、
            有多个图层
            div，edrawings-canvas-canvas-container，3D图
            svg，edrawings-canvas-svg，点+线+标签
            svg, edrawings-canvas-redline-svg，？？
            问题：
            -、done如何操作对应svg
            -、方法1：鼠标拖动+滚轮对应的点事件_dragStarted，在事件上触发线重绘
               -1.1:dzq插件如何绑定滚动+拖动事件
            -、方法2：svg点线如何随转动+滚动更新，调用方法重绘线
            -、方法3：阻止线的清除，弄清楚为啥鼠标移动线就被移除了？(renderMarkup时，非_markupItems里的会被清掉)
               -、研究更新点线坐标原理
            */

            //以下test 画线（顶层调用）
            //var mMeasureOp = mMeasureMrg.mMeasureOp;
            // var ioAuxGeo = mMeasureOp.mMeasureEntities.mAuxGeoImmediate;
            // var cLocalizedInvalidCombo = l_binder("Strings.InvalidCombination");
            // var cLocalizedInfo = l_binder("Strings.Info");
            // var result =   MeasureResultString(cLocalizedInfo, cLocalizedInvalidCombo);
            // var selObjPosition = extSelObj.getPosition();//{x,y,z}
            // ioAuxGeo.addMessage(result, selObjPosition, eDwTypes_14.HC.Color.red());
            // ioAuxGeo.updateResultLabels();
        }

        return dzqTestPlugin;
    }));





function setLine2(iViewer, eDwTypes_14, iColor, mWCEndPtHC0, mWCEndPntHC1) {
    var mLine = new eDwTypes_14.HC.Markup.Shape.Line;
    mLine.setStrokeColor(iColor);
    mLine.setEndEndcapColor(iColor);
    mLine.setStartEndcapColor(iColor);

    var viewHC = iViewer.getHCView();
    mLine.setP1(eDwTypes_14.HC.Point2.fromPoint3(viewHC.projectPoint(mWCEndPtHC0)));
    mLine.setP2(eDwTypes_14.HC.Point2.fromPoint3(viewHC.projectPoint(mWCEndPntHC1)));

    var renderer = iViewer.getHCMarkupManager().getRenderer();//为啥这里是redline-svg?
    renderer._clear();

    var dzqSVG = viewHC._markupManager._domElements.getDzqSvgElement();//强制转图层，不影响其它图层
    var markUpSvg = viewHC._markupManager._domElements.getMarkupSvgElement();
    renderer._setCanvas(markUpSvg);

    renderer.drawLine(mLine);
    renderer._finalize();
}

//画线方案2：
//1、重置视图
//2、显示标签容器
//3、用canvas画线
function setPoint2(eDwUIUtils, iViewer) {

    eDwUIUtils.resetToHomeView(iViewer);

    const markUpContent = $('#dzqMarkUpContent')
    markUpContent.show();
    const width = markUpContent.width();
    const height = markUpContent.height();

    const markUpPoint = $('#dzqMarkUpPoint')
    markUpPoint.show();
    // const markUpPoint = document.getElementById("dzqMarkUpPoint");
    // const { x2, y2, width2, height2 } = markUpPoint.getBoundingClientRect();

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(width / 2, height);
    ctx.lineTo(54, 100);
    // ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.stroke();
}