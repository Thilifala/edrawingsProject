var testData = [
    {
        cameraHC: {
            "_position": { "x": -0.01411583307297489, "y": -0.03465556234925549, "z": -0.275444015259687 },
            "_target": { "x": -0.03250801488302456, "y": -0.01879923961967077, "z": 0.006605229477571949 },
            "_up": { "x": -0.27013356300722665, "y": 0.9601573930895815, "z": -0.0715935655798729 },
            "_width": 0.10817175781250002,
            "_height": 0.13422226562500004,
            "_projection": 0,
            "_nearLimit": 0.01,
            "_cameraFlags": 0
        },
        position: { x: 891, y: 424, client: { width: 1872, height: 964 } },
        content: 'testCCC'
    }
]

//获取真实位置，TODO:
let getRealPos = function (pos) {
    if (!pos.client) {
        return pos;
    }

    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    return {
        x: pos.x - (pos.client.width - dw) / 2,
        y: pos.y - (pos.client.height - dh) / 2
    }
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


define("dzqTestPlugin", ["require", "exports", "eDwTypes", "eDwCommandMgr", "eDwSetHierNodeAttribsCmd", "eDwShowOnlyCmd", "eDwUIUtils",
    "eDwEventMgr", "eDwUIShortcutMenu", "eDwKeyMgr", "eDwEvents", "eDwUIBasePlugin", "utils", "jqutils", "eDwMeasureEntities", "eDwMeasureMgr", "eDwUILocalize", "dzqTestOperator"],
    (function (require, exports, eDwTypes_14, eDwCommandMgr, eDwSetHierNodeAttribsCmd, eDwShowOnlyCmd, eDwUIUtils,
        eDwEventMgr, eDwUIShortcutMenu_4, eDwKeyMgr_4, eDwEvents_7, eDwUIBasePlugin_1, utils, jqutils, eDwMeasureEntities, eDwMeasureMgr, eDwUILocalize_1, dzqTestOperator) {
        "use strict";
        console.log(`dzq Log：dzqTestPlugin`)

        function l_binder(iKey) {
            return eDwUILocalize_1.eDwUILocalize.getString.bind(null, iKey)
        }

       

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
                    var testCameraHC = testData[0].cameraHC;
                    dzqSetCamera(iViewer, testCameraHC, 400);
                })
                $('#btnRemovePoint').on('click', (e) => {
                    let testPosition = testData[0].position;
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
                            if (_a.label < testData.length) {
                                var idx = _a.label;
                                return [4, this.dzqTestOperator.drawRemark(_this, iViewer, testData[idx])];
                            }
                            else {
                                _a.sent();
                                return [2];
                            }
                        }))
                    }))
                })

                $('#btnSetLine').on('click', (e) => {
                    dzqSetLine(extSelObj, mMeasureMrg);
                })
                $('#remarkInput').on('change', (e) => {
                    var newVal = e.target.value;
                    $('#edrawings-canvas-svg text tspan').eq(1).html(newVal)
                })
            }
            dzqTestPlugin.prototype.init = function () {
                return __awaiter(this, void 0, void 0, (function () {
                    return __generator(this, (function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.dzqTestOperator = new dzqTestOperator(this.mViewer, this);
                                this.mViewer.OperatorMgr.registerCustomOperator(this.dzqTestOperator, true);
                                return [2]
                        }
                    }))
                }))
            };
            return dzqTestPlugin;
        }(eDwUIBasePlugin_1.eDwUIBasePlugin);
        return dzqTestPlugin;
    }));

define("dzqTestOperator", ["require", "exports", "eDwSelObj", "eDwBaseSelOperator", "eDwMeasureEntities", "eDwMeasureMgr", "eDwTypes", "hcutils", "utils"],
    (function (require, exports, eDwSelObj, eDwBaseSelOperator, eDwMeasureEntities, eDwMeasureMgr, eDwTypes_2, hcutils_2, utils) {
        "use strict";
        var dzqTestOperator = function (_super) {
            __extends(dzqTestOperator, _super);

            function dzqTestOperator(iViewer) {
                var _this = _super.call(this, iViewer, iViewer.SelectionMgr) || this;
                _this.mTempHighlightItem = null;
                _this.mOperatingLabel = false;
                _this.mSelObjs = [];
                _this.mMarkupMgrHC = _this.Viewer.getHCMarkupManager();
                _this.mHighlightColor = new eDwTypes_2.HC.Color(72, 219, 251);
                _this.mMeasureEntities = new eDwMeasureEntities(_this.Viewer);
                _this.mMeasureMode = eDwTypes_2.EntityMode.ALL;
                return _this
            }


            dzqTestOperator.prototype.onMouseMove = function(ioEvent){

            };
            dzqTestOperator.prototype.onMouseUp = function (ioEvent) {
                let setPointCK = $('#setPointCK').prop('checked');
                if(!setPointCK){
                    return;
                }
                return __awaiter(this, void 0, void 0, (function () {
                    return __generator(this, (function (_a) {
                        switch (_a.label) {
                            case 0:
                                let pos = ioEvent.getPosition();
                                let remarkInfo = {
                                    cameraHC: this.Viewer.getHCView().getCamera(),
                                    position: pos,
                                    content: '空'
                                }

                                return [4, this.drawRemark(this, this.Viewer, remarkInfo)];
                            case 1:
                                ioEvent.setHandled(true);
                                _super.prototype.onMouseUp.call(this, ioEvent);
                                return [2]
                        }
                    }))
                }))
            };

            dzqTestOperator.prototype.drawRemark = function (_this, iViewer, remarkInfo) {

                var testCameraHC = remarkInfo.cameraHC;
                var testPosition = getRealPos(remarkInfo.position);
                var rmkContent = remarkInfo.content;
                var mMeasureMrg = new eDwMeasureMgr(iViewer);

                __awaiter(_this, void 0, void 0, (function () {
                    return __generator(this, (function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4, dzqSetCamera(iViewer, testCameraHC)];
                            case 1:
                                return [4, dzqSetPoint(_this, mMeasureMrg, eDwMeasureEntities, iViewer, utils, testPosition)];
                            case 2:
                                var pointObj = _a.sent();
                                return [4, dzqSetLine(pointObj, mMeasureMrg, rmkContent)];
                            case 3:
                                return [2];
                        }
                    }))
                }))
            }

            //还原摄像机坐标
            function dzqSetCamera(iViewer, rmkCameraHC, iDuration) {
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
                Object.assign(cameraHC._position, rmkCameraHC._position);
                Object.assign(cameraHC._target, rmkCameraHC._target);
                Object.assign(cameraHC._up, rmkCameraHC._up);
                cameraHC._width = rmkCameraHC._width;
                cameraHC._height = rmkCameraHC._height;
                cameraHC._projection = rmkCameraHC._projection;
                cameraHC._nearLimit = rmkCameraHC._nearLimit;
                cameraHC._cameraFlags = rmkCameraHC._cameraFlags;

                iDuration = iDuration ?? 0;//动画延时
                // viewHC.fitWorld(iDuration, cameraHC);
                viewHC.setCamera(cameraHC, iDuration);
            }

            //还原点的位置
            function dzqSetPoint(_this, mMeasureMrg, eDwMeasureEntities, iViewer, utils, rmkPosition) {
                var pointObj; //todo:如何返回到上层
                return __awaiter(_this, void 0, void 0, (function () {
                    var idx, isAdded;
                    //一个mMeasureMrg只能画一个点
                    var mMeasureOp = mMeasureMrg.mMeasureOp;
                    return __generator(this, (function (_a) {
                        switch (_a.label) {
                            case 0:
                                mMeasureOp.resetTempHighlight();
                                return [4, iViewer.ViewMgr.pickFromPoint(rmkPosition, mMeasureOp.getPickConfig())];
                            case 1:
                                pointObj = _a.sent();//点对象
                                idx = mMeasureOp.mMeasureEntities.isItemSelected(pointObj);//点对象序号
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
                                return [4, mMeasureOp.mMeasureEntities.addEntity(pointObj)];
                            case 4:
                                isAdded = _a.sent();
                                if (isAdded) {
                                    //高亮整个零件(注释了只高亮面，效果更好)
                                    // mMeasureOp.highlightMeasuringItem(pointObj)
                                } else {
                                    mMeasureOp.dehighlightMeasuringItems()
                                }
                                return [2, pointObj]//返回点对象
                        }
                    }))
                }))


                //方案2：
                // setPoint2(eDwUIUtils, iViewer);
            }

            //画线+框
            function dzqSetLine(extSelObj, mMeasureMrg, rmkContent) {
                // var iColor = { r: 255, g: 50, b: 50 };
                var mWCEndPtHC0 = extSelObj.getPosition();
                // var mWCEndPntHC1 = { "x": -0.019599480563904592, "y": -0.016210202843822685, "z": 0.023380988009255255 };

                var mMeasureOp = mMeasureMrg.mMeasureOp;
                var MeasureAuxGeo = mMeasureOp.mMeasureEntities.mAuxGeoSelected;
                var result = new DzqResultString('标注', rmkContent);
                MeasureAuxGeo.addMessage(result, mWCEndPtHC0, eDwTypes_2.HC.Color.red());
                MeasureAuxGeo.updateResultLabels();

                // setLine2(iViewer, eDwTypes_2, iColor, mWCEndPtHC0, mWCEndPntHC1);

                // document.addEventListener("mousemove", function () {
                //     setLine2(iViewer, eDwTypes_2, iColor, mWCEndPtHC0, mWCEndPntHC1);
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
                // ioAuxGeo.addMessage(result, selObjPosition, eDwTypes_2.HC.Color.red());
                // ioAuxGeo.updateResultLabels();
            }

            return dzqTestOperator
        }(eDwBaseSelOperator);

        function l_isAllowedSelection(iSelObj, iMeasureMode) {
            if (iSelObj && iSelObj.getSelectionType() === eDwTypes_2.HC.SelectionType.None) {
                return true
            }
            var subEntityInfo = eDwSelObj.getSubEntityInfo(iSelObj);
            if (subEntityInfo && subEntityInfo.SubEntity && subEntityInfo.IsSelectable && (iSelObj.getPointEntity() && iMeasureMode & eDwTypes_2.EntityMode.VERTEX) || iSelObj.getLineEntity() && iMeasureMode & eDwTypes_2.EntityMode.EDGE || iSelObj.getFaceEntity() && iMeasureMode & eDwTypes_2.EntityMode.FACE) {
                return true
            }
            return false
        }

        return dzqTestOperator
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