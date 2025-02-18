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
        position3D: { x: -0.026779620355917855, y: -0.01108756765699237, z: -0.023411558941003108 },
        content: 'testCCC',
        id: 6666
    },
    {
        cameraHC: {
            "_position": { "x": 0.6816282541660722, "y": 0.3537322449423354, "z": -1.0733480868543144 },
            "_target": { "x": -0.006859464309613223, "y": 0.006562212976345454, "z": 0.024573252204699249 },
            "_up": { "x": 0.7594967898327307, "y": -0.581017712610704, "z": 0.29254579789564996 },
            "_width": 0.1619331133752787,
            "_height": 0.1619331133752787,
            "_projection": 0,
            "_nearLimit": 0.01,
            "_cameraFlags": 0
        },
        position: { x: 1006, y: 327, client: { width: 1872, height: 964 } },
        position3D: { x: 0.028554702177643776, y: 0.006263932213187218, z: 0.021588442847132683 },
        content: 'testBBB',
        id: 56789,
    },
    {
        cameraHC: {
            "_position": { "x": -0.6971035009729019, "y": -0.27993582455732227, "z": 0.13081788353557617 },
            "_target": { "x": -0.02585618920984823, "y": -0.005416413588042603, "z": 0.026275125840290467 },
            "_up": { "x": -0.12892038551177074, "y": 0.6122920104908322, "z": 0.7800500164018915 },
            "_width": 0.08843707098468556,
            "_height": 0.08843707098468556,
            "_projection": 0,
            "_nearLimit": 0.01,
            "_cameraFlags": 0
        },
        position: { x: 606, y: 357, client: { width: 1193, height: 732 } },
        position3D: { x: -0.08144529722630978, y: -0.028736067935824394, z: 0.036588442511856556 },
        content: 'testBBB',
        id: 56789,
    }
]
let rmkHide = false;//隐藏
var loadedRemark = {}

//获取真实位置
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

let getRealPosFrom3D = function (iViewer, eDwTypes_1, pos3D) {
    var viewHC = iViewer.getHCView()
    return eDwTypes_1.HC.Point2.fromPoint3(viewHC.projectPoint(pos3D))
}

var DzqResultString = function () {
    function DzqResultString(iLocalizableName, iLocalizeableValue, remarkInfoId) {
        this.mLocalizableName = iLocalizableName;
        this.mLocalizeableValue = iLocalizeableValue;
        this.remarkInfoId = remarkInfoId;
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
    Object.defineProperty(DzqResultString.prototype, "RemarkInfoId", {
        get: function () {
            return this.remarkInfoId;
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

        // function l_binder(iKey) {
        //     return eDwUILocalize_1.eDwUILocalize.getString.bind(null, iKey)
        // }

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
                    this.dzqTestOperator.dzqSetCamera(iViewer, testCameraHC, 400);
                })
                $('#btnRemovePoint').on('click', (e) => {
                    // let testPosition = testData[0].position;
                    let testId = Object.keys(loadedRemark)[0];
                    let extSelObj = loadedRemark[testId].pointObj;
                    let mMeasureMrg = loadedRemark[testId].mMeasureMrg;

                    return __awaiter(_this, void 0, void 0, (function () {
                        // var extSelObj, idx, isAdded;
                        var mMeasureOp = mMeasureMrg.mMeasureOp;

                        return __generator(this, (function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // mMeasureOp.resetTempHighlight();
                                    // return [4, iViewer.ViewMgr.pickFromPoint(testPosition, mMeasureOp.getPickConfig())];
                                    return [3, 1]
                                case 1:
                                    // extSelObj = _a.sent();
                                    var idx = mMeasureOp.mMeasureEntities.isItemSelected(extSelObj);
                                    return [4, mMeasureOp.mMeasureEntities.removeEntityAtIndex(idx)];
                                case 2:
                                    _a.sent();
                                    //移除悬浮标注框
                                    let selector = `div[data-remarkinfoid="${testId}"]`
                                    $(selector).remove();
                                    //移除缓存
                                    delete loadedRemark[testId];
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
                            this.dzqTestOperator.drawRemark(iViewer, testData)
                            return [2];
                        }))
                    }))

                    // return __awaiter(_this, void 0, void 0, (function () {
                    //     return __generator(this, (function (_a) {
                    //         if (_a.label < testData.length) {//自动循环
                    //             var idx = _a.label;
                    //             return [4, this.dzqTestOperator.drawRemark(iViewer, testData[idx])];
                    //         }
                    //         else {
                    //             _a.sent();
                    //             return [2];
                    //         }
                    //     }))
                    // }))
                })
                $('#btnSetLine').on('click', (e) => {
                    dzqDrawRmkBox(extSelObj, mMeasureMrg);
                })
                $('#btnUpdateRemark').on('click', (e) => {
                    let markupManager = iViewer.getHCMarkupManager();
                    markupManager._update();
                })

                $('#remarkInput').on('change', (e) => {
                    var newVal = e.target.value;
                    let markupManager = iViewer.getHCMarkupManager();
                    let _markupItems = markupManager._itemManager._markupItems;
                    _markupItems.forEach(function (a) {
                        if (a.constructor.name === 'LabelItem') {
                            a.mLabel.mItems[0].mResult.mLocalizeableValue = newVal;
                            a.mLabel.mItems[0].mValueTextBox._textStr = newVal;
                        }
                    });
                    markupManager._update();
                })
            }
            dzqTestPlugin.prototype.init = function () {
                return __awaiter(this, void 0, void 0, (function () {
                    return __generator(this, (function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.dzqTestOperator = new dzqTestOperator(this.mViewer, this);
                                // this.dzqTestOperator.setNewPointMode(true);
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
                _this.newPointMode = true//$('#setPointCK').prop('checked');//加点模式
                return _this
            }


            dzqTestOperator.prototype.onMouseMove = function (ioEvent) {

            };
            dzqTestOperator.prototype.onMouseUp = function (ioEvent) {
                if (!this.newPointMode) {
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
                                    content: '空',
                                    id: Communicator.UUID.create()
                                }

                                return [4, this.drawBy2D(this.Viewer, remarkInfo.position, remarkInfo)];
                            case 1:
                                ioEvent.setHandled(true);
                                _super.prototype.onMouseUp.call(this, ioEvent);
                                return [2]
                        }
                    }))
                }))
            };

            dzqTestOperator.prototype.drawBy2D = function (iViewer, pos2D, remarkInfo) {
                var rmkContent = remarkInfo.content;
                var mMeasureMrg = new eDwMeasureMgr(iViewer);
                return __awaiter(this, void 0, void 0, (function () {
                    return __generator(this, (function (_a) {
                        switch (_a.label) {
                            case 0:
                                eDwMeasureEntities.dzqDraw = true;
                                return [4, dzqDrawPoint(this, mMeasureMrg, eDwMeasureEntities, iViewer, utils, pos2D, remarkInfo.id)];
                            case 1:
                                var pointObj = _a.sent();
                                if (!pointObj) {
                                    return [2];
                                }

                                //记录已经加载的点
                                loadedRemark[remarkInfo.id] = {
                                    "pointObj": pointObj,
                                    "mMeasureMrg": mMeasureMrg,
                                    "rmkHide": remarkInfo.rmkHide
                                }
                                if (remarkInfo.rmkHide) {
                                    return [2]
                                }
                                return [4, dzqDrawRmkBox(pointObj, mMeasureMrg, rmkContent, remarkInfo.id)];
                            case 2:
                                eDwMeasureEntities.dzqDraw = false;
                                return [2];
                        }
                    }))
                }))
            }

            dzqTestOperator.prototype.drawRemark = function (iViewer, remarkInfoArr) {
                var _this = this;
                var idx = 0;
                var currCameraHC = iViewer.getHCView().getCamera();

                drawOne(remarkInfoArr[idx])
                //递归
                function drawOne(remarkInfo) {
                    var cameraHC = remarkInfo.cameraHC;
                    _this.dzqSetCamera(iViewer, cameraHC)//里面有requestAnimationFrame，所以后面计算坐标得在setCarema这一帧结束后执行
                    requestAnimationFrame(function () {
                        let pos2D = getRealPosFrom3D(iViewer, eDwTypes_2, remarkInfo.position3D);
                        _this.drawBy2D(iViewer, pos2D, remarkInfo);

                        if (++idx < remarkInfoArr.length) {
                            drawOne(remarkInfoArr[idx]);
                        }
                        else {
                            _this.dzqSetCamera(iViewer, currCameraHC)
                        }
                    });
                }

            }
            dzqTestOperator.prototype.setNewPointMode = function (isModeOpen) {
                this.newPointMode = isModeOpen
            }

            //还原摄像机坐标
            dzqTestOperator.prototype.dzqSetCamera = function (iViewer, rmkCameraHC, iDuration) {
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

                cameraHC.setPosition(rmkCameraHC._position);
                cameraHC.setTarget(rmkCameraHC._target);
                cameraHC.setUp(rmkCameraHC._up);
                cameraHC._width = rmkCameraHC._width;
                cameraHC._height = rmkCameraHC._height;
                cameraHC._projection = rmkCameraHC._projection;
                cameraHC._nearLimit = rmkCameraHC._nearLimit;
                cameraHC._cameraFlags = rmkCameraHC._cameraFlags;

                iDuration = iDuration ?? 0;//动画延时
                // viewHC.fitWorld(iDuration, cameraHC);

                iViewer.ViewMgr.setCamera(cameraHC, iDuration)
            }

            //还原点的位置
            function dzqDrawPoint(_this, mMeasureMrg, eDwMeasureEntities, iViewer, utils, rmkPosition, remarkInfoId) {
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
                                pointObj.remarkInfoId = remarkInfoId;
                                return [4, mMeasureOp.mMeasureEntities.addEntity(pointObj)];
                            case 4:
                                isAdded = _a.sent();
                                if (isAdded) {
                                    //高亮整个零件(注释了只高亮面，效果更好)
                                    // mMeasureOp.highlightMeasuringItem(pointObj)
                                } else {
                                    mMeasureOp.dehighlightMeasuringItems()
                                    return [2]
                                }
                                return [2, pointObj]//返回点对象
                        }
                    }))
                }))


                //方案2：
                // setPoint2(eDwUIUtils, iViewer);
            }

            //画线+框
            function dzqDrawRmkBox(extSelObj, mMeasureMrg, rmkContent, remarkInfoId) {
                // var iColor = { r: 255, g: 50, b: 50 };
                var mWCEndPtHC0 = extSelObj.getPosition();
                // var mWCEndPntHC1 = { "x": -0.019599480563904592, "y": -0.016210202843822685, "z": 0.023380988009255255 };

                var mMeasureOp = mMeasureMrg.mMeasureOp;
                var MeasureAuxGeo = mMeasureOp.mMeasureEntities.mAuxGeoSelected;
                var result = new DzqResultString('标注', rmkContent, remarkInfoId);
                var color = '';//new eDwTypes_2.HC.Color(255,255,255);
                MeasureAuxGeo.addMessage(result, mWCEndPtHC0, color);
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





// function setLine2(iViewer, eDwTypes_14, iColor, mWCEndPtHC0, mWCEndPntHC1) {
//     var mLine = new eDwTypes_14.HC.Markup.Shape.Line;
//     mLine.setStrokeColor(iColor);
//     mLine.setEndEndcapColor(iColor);
//     mLine.setStartEndcapColor(iColor);

//     var viewHC = iViewer.getHCView();
//     mLine.setP1(eDwTypes_14.HC.Point2.fromPoint3(viewHC.projectPoint(mWCEndPtHC0)));
//     mLine.setP2(eDwTypes_14.HC.Point2.fromPoint3(viewHC.projectPoint(mWCEndPntHC1)));

//     var renderer = iViewer.getHCMarkupManager().getRenderer();//为啥这里是redline-svg?
//     renderer._clear();

//     var dzqSVG = viewHC._markupManager._domElements.getDzqSvgElement();//强制转图层，不影响其它图层
//     var markUpSvg = viewHC._markupManager._domElements.getMarkupSvgElement();
//     renderer._setCanvas(markUpSvg);

//     renderer.drawLine(mLine);
//     renderer._finalize();
// }

// //画线方案2：
// //1、重置视图
// //2、显示标签容器
// //3、用canvas画线
// function setPoint2(eDwUIUtils, iViewer) {

//     eDwUIUtils.resetToHomeView(iViewer);

//     const markUpContent = $('#dzqMarkUpContent')
//     markUpContent.show();
//     const width = markUpContent.width();
//     const height = markUpContent.height();

//     const markUpPoint = $('#dzqMarkUpPoint')
//     markUpPoint.show();
//     // const markUpPoint = document.getElementById("dzqMarkUpPoint");
//     // const { x2, y2, width2, height2 } = markUpPoint.getBoundingClientRect();

//     const canvas = document.getElementById("myCanvas");
//     const ctx = canvas.getContext("2d");

//     ctx.beginPath();
//     ctx.moveTo(width / 2, height);
//     ctx.lineTo(54, 100);
//     // ctx.lineWidth = 10;
//     ctx.strokeStyle = "red";
//     ctx.stroke();
// }


window.dzqTestPlugin = {
    utils: {
        onDrawCircle: function (viewer, pntData) {
            let circle = pntData.Circle;
            let selObj = pntData.SelObj;
            if (!selObj.remarkInfoId) {
                return;
            }
            let pos = circle.getCenter();
            let posX = pos.x;
            let posY = pos.y;


            if (!rmkHide) {
                posX = posX - 6;
                posY = posY - 6;
            }
            else {
                posY = posY - 30;
            }

            let dzqEle = $('.dzqPoint');
            if (dzqEle.length == 0) {
                //创建标注点
                var temp = $('#dzqPointTemp').prop('content');
                var $temp = $(temp).find('.dzqPoint').clone();

                var ele = $temp.css({
                    top: posY + "px",
                    left: posX + "px"
                })
                if (rmkHide) {
                    ele.addClass('hide')
                }
                ele.attr('data-remarkInfoId', selObj.remarkInfoId);
                $('#edrawings-canvas').append(ele);

                var positiondata = {
                    cameraHC: viewer.getHCView().getCamera(),
                    position: circle.getCenter(),
                    client: { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight },
                    position3D: selObj.getPosition(),
                    partId: selObj.getNodeId()
                }
                console.log(JSON.stringify(positiondata))
            }
            else {
                //修改标注点定位
                dzqEle.css({
                    top: posY + "px",
                    left: posX + "px"
                })
            }
            return true;
        },
        onDrawEdwLabel: function (measureLabel) {
            if (measureLabel.mItems.length !== 1) {
                return false;
            }
            var labelItem = measureLabel.mItems[0];
            var edwNameBox = labelItem.mNameBox;

            if (labelItem.mResult.constructor.name != 'DzqResultString') {
                return false;
            }
            let pos = edwNameBox.getPosition();
            let posX = pos.x - 5;
            let posY = pos.y - 5;

            let dzqEle = $('.dzqRemark');
            if (dzqEle.length == 0) {
                //创建标注框
                var temp = $('#dzqRemarkTemp').prop('content');
                var $temp = $(temp).find('.dzqRemark').clone()
                var ele = $temp.css({
                    top: posY + "px",
                    left: posX + "px"
                })
                ele.attr('data-remarkInfoId', labelItem.mResult.RemarkInfoId);
                $('#edrawings-canvas').append(ele);
            }
            else {
                //修改标注框定位
                dzqEle.css({
                    top: posY + "px",
                    left: posX + "px"
                })
            }
            return false;
        },
        // onDrawLine: function (mLine) {
        //     var p1 = mLine.getP1()
        //     var p2 = mLine.getP2()
        //     return false
        // }
        onAddIfPlane: function (iFaceOrigHC, iFaceSelObj,eDwTypes_1) {
            var dzqRemark = iFaceSelObj.remarkInfoId && !(iFaceOrigHC instanceof eDwTypes_1.HC.SubentityProperties.CylinderElement);
            return dzqRemark
        }
    },
    exposes: {

    }
}

$(document).ready(function () {
    var ele = $(' <div id="edrawings-button-dzq" class="edrawings-hud-button edrawings-hud-icon" title="Fullscreen" data-i18n-title="Strings.Fullscreen"></div>')
    $('.edrawings-hud-bar-content').append(ele)


    $('.edrawings-tool-button').on('click', function () {
        var btnId = $(this).prop('id');
        console.log(btnId)
        if (btnId != 'edrawings-button-component-tree') {
            //dosomething
        }
    })
})