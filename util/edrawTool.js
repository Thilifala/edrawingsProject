
(function (m, r, R, S, E, L) {
    function Ka(a, b, c, d, e) {
        return ha(a, a, c, d, b, a.defaultView.pageXOffset, a.defaultView.pageYOffset).then(function (f) {
            q("Document cloned");
            var g = "data-html2canvas-node" + e,
            h = "[" + g + "='" + e + "']";
            a.querySelector(h).removeAttribute(g);
            var g = f.contentWindow,
            k = g.document.querySelector(h);
            return ("function" === typeof b.onclone ? Promise.resolve(b.onclone(g.document)) : Promise.resolve(!0)).then(function () {
                return ia(k, f, b, c, d)
            })
        })
    }
    function ia(a, b, c, d, e) {
        var f = b.contentWindow,
        g = new T(f.document),
        h = new u(c, g),
        k = U(a);
        d = "view" === c.type ? d : La(f.document);
        e = "view" === c.type ? e : Ma(f.document);
        var F = new c.renderer(d, e, h, c, r);
        return (new n(a, F, g, h, c)).ready.then(function () {
            q("Finished rendering");
            var d;
            d = "view" === c.type ? ja(F.canvas, {
                width: F.canvas.width,
                height: F.canvas.height,
                top: 0,
                left: 0,
                x: 0,
                y: 0
            }) : a === f.document.body || a === f.document.documentElement || null != c.canvas ? F.canvas : ja(F.canvas, {
                width: null != c.width ? c.width : k.width,
                height: null != c.height ? c.height : k.height,
                top: k.top,
                left: k.left,
                x: f.pageXOffset,
                y: f.pageYOffset
            });
            c.removeContainer && (b.parentNode.removeChild(b), q("Cleaned up container"));
            return d
        })
    }
    function ja(a, b) {
        var c = r.createElement("canvas"),
        d = Math.min(a.width - 1, Math.max(0, b.left)),
        e = Math.min(a.width, Math.max(1, b.left + b.width)),
        f = Math.min(a.height - 1, Math.max(0, b.top)),
        g = Math.min(a.height, Math.max(1, b.top + b.height));
        c.width = b.width;
        c.height = b.height;
        q("Cropping canvas at:", "left:", b.left, "top:", b.top, "width:", e - d, "height:", g - f);
        q("Resulting crop with width", b.width, "and height", b.height,
            " with x", d, "and y", f);
        c.getContext("2d").drawImage(a, d, f, e - d, g - f, b.x, b.y, e - d, g - f);
        return c
    }
    function La(a) {
        return Math.max(Math.max(a.body.scrollWidth, a.documentElement.scrollWidth), Math.max(a.body.offsetWidth, a.documentElement.offsetWidth), Math.max(a.body.clientWidth, a.documentElement.clientWidth))
    }
    function Ma(a) {
        return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
    }
    function ka() {
        return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    }
    function la(a, b) {
        for (var c = 3 === a.nodeType ? r.createTextNode(a.nodeValue) : a.cloneNode(!1), d = a.firstChild; d; )
            !0 !== b && 1 === d.nodeType && "SCRIPT" === d.nodeName || c.appendChild(la(d, b)), d = d.nextSibling;
        return c
    }
    function ha(a, b, c, d, e, f, g) {
        Na(a);
        var h = r.documentMode && 9 >= r.documentMode ? la(a.documentElement, e.javascriptEnabled) : a.documentElement.cloneNode(!0),
        k = b.createElement("iframe");
        k.className = "html2canvas-container";
        k.style.visibility = "hidden";
        k.style.position = "fixed";
        k.style.left = "-10000px";
        k.style.top = "0px";
        k.style.border = "0";
        k.width = c;
        k.height = d;
        k.scrolling = "no";
        b.body.appendChild(k);
        return new Promise(function (b) {
            var c = k.contentWindow.document;
            ma(a.documentElement, h, "textarea");
            ma(a.documentElement, h, "select");
            k.contentWindow.onload = k.onload = function () {
                var d = setInterval(function () {
                    0 < c.body.childNodes.length && (Oa(a, c), clearInterval(d), "view" === e.type && k.contentWindow.scrollTo(f, g), b(k))
                }, 50)
            };
            c.open();
            c.write("<!DOCTYPE html><html></html>");
            !a.defaultView || f === a.defaultView.pageXOffset && g === a.defaultView.pageYOffset || a.defaultView.scrollTo(f, g);
            c.replaceChild(!0 === e.javascriptEnabled ? c.adoptNode(h) : na(c.adoptNode(h)), c.documentElement);
            c.close()
        })
    }
    function ma(a, b, c) {
        a = a.getElementsByTagName(c);
        b = b.getElementsByTagName(c);
        c = a.length;
        for (var d = 0; d < c; d++)
            b[d].value = a[d].value
    }
    function oa(a, b, c, d, e, f) {
        return (new Pa(a, b, m.document)).then(Qa(a)).then(function (a) {
            return ha(a, c, d, e, f, 0, 0)
        })
    }
    function Qa(a) {
        return function (b) {
            var c = new DOMParser,
            d;
            try {
                d = c.parseFromString(b, "text/html")
            } catch (e) {
                q("DOMParser not supported, falling back to createHTMLDocument");
                d = r.implementation.createHTMLDocument("");
                try {
                    d.open(),
                    d.write(b),
                    d.close()
                } catch (f) {
                    q("createHTMLDocument write not supported, falling back to document.body.innerHTML"),
                    d.body.innerHTML = b
                }
            }
            b = d.querySelector("base");
            b && b.href.host || (b = d.createElement("base"), b.href = a, d.head.insertBefore(b, d.head.firstChild));
            return d
        }
    }
    function Na(a) {
        [].slice.call(a.querySelectorAll("canvas"), 0).forEach(function (a) {
            a.setAttribute("data-html2canvas-canvas-clone",
                "canvas-" + Ra++)
        })
    }
    function Oa(a, b) {
        [].slice.call(a.querySelectorAll("[data-html2canvas-canvas-clone]"), 0).forEach(function (a) {
            try {
                var d = b.querySelector('[data-html2canvas-canvas-clone="' + a.getAttribute("data-html2canvas-canvas-clone") + '"]');
                d && (d.width = a.width, d.height = a.height, d.getContext("2d").putImageData(a.getContext("2d").getImageData(0, 0, a.width, a.height), 0, 0))
            } catch (e) {
                q("Unable to copy canvas content from", a, e)
            }
            a.removeAttribute("data-html2canvas-canvas-clone")
        })
    }
    function na(a) {
        [].slice.call(a.childNodes,
            0).filter(Sa).forEach(function (b) {
            "SCRIPT" === b.tagName ? a.removeChild(b) : na(b)
        });
        return a
    }
    function Sa(a) {
        return a.nodeType === Node.ELEMENT_NODE
    }
    function Ta(a) {
        var b = r.createElement("a");
        b.href = a;
        b.href = b.href;
        return b
    }
    function t(a) {
        this.b = this.g = this.r = 0;
        this.a = null;
        this.fromArray(a) || this.namedColor(a) || this.rgb(a) || this.rgba(a) || this.hex6(a) || this.hex3(a)
    }
    function M(a) {
        this.src = a;
        q("DummyImageContainer for", a);
        if (!this.promise || !this.image) {
            q("Initiating DummyImageContainer");
            M.prototype.image = new Image;
            var b = this.image;
            M.prototype.promise = new Promise(function (a, d) {
                b.onload = a;
                b.onerror = d;
                b.src = ka();
                !0 === b.complete && a(b)
            })
        }
    }
    function Ua(a, b) {
        var c = r.createElement("div"),
        d = r.createElement("img"),
        e = r.createElement("span"),
        f;
        c.style.visibility = "hidden";
        c.style.fontFamily = a;
        c.style.fontSize = b;
        c.style.margin = 0;
        c.style.padding = 0;
        r.body.appendChild(c);
        d.src = ka();
        d.width = 1;
        d.height = 1;
        d.style.margin = 0;
        d.style.padding = 0;
        d.style.verticalAlign = "baseline";
        e.style.fontFamily = a;
        e.style.fontSize = b;
        e.style.margin =
            0;
        e.style.padding = 0;
        e.appendChild(r.createTextNode("Hidden Text"));
        c.appendChild(e);
        c.appendChild(d);
        f = d.offsetTop - e.offsetTop + 1;
        c.removeChild(e);
        c.appendChild(r.createTextNode("Hidden Text"));
        c.style.lineHeight = "normal";
        d.style.verticalAlign = "super";
        d = d.offsetTop - c.offsetTop + 1;
        r.body.removeChild(c);
        this.baseline = f;
        this.lineWidth = 1;
        this.middle = d
    }
    function pa() {
        this.data = {}
    }
    function qa(a, b, c) {
        this.image = null;
        this.src = a;
        var d = this,
        e = U(a);
        this.promise = (b ? new Promise(function (b) {
                "about:blank" === a.contentWindow.document.URL ||
                null == a.contentWindow.document.documentElement ? a.contentWindow.onload = a.onload = function () {
                    b(a)
                }
                 : b(a)
            }) : this.proxyLoad(c.proxy, e, c)).then(function (a) {
            return html2canvas(a.contentWindow.document.documentElement, {
                type: "view",
                width: a.width,
                height: a.height,
                proxy: c.proxy,
                javascriptEnabled: c.javascriptEnabled,
                removeContainer: c.removeContainer,
                allowTaint: c.allowTaint,
                imageTimeout: c.imageTimeout / 2
            })
        }).then(function (a) {
            return d.image = a
        })
    }
    function N(a) {
        this.src = a.value;
        this.colorStops = [];
        this.type = null;
        this.y1 =
            this.x1 = this.y0 = this.x0 = .5;
        this.promise = Promise.resolve(!0)
    }
    function ba(a, b) {
        this.src = a;
        this.image = new Image;
        var c = this;
        this.tainted = null;
        this.promise = new Promise(function (d, e) {
            c.image.onload = d;
            c.image.onerror = e;
            b && (c.image.crossOrigin = "anonymous");
            c.image.src = a;
            !0 === c.image.complete && d(c.image)
        })
    }
    function u(a, b) {
        this.link = null;
        this.options = a;
        this.support = b;
        this.origin = this.getOrigin(m.location.href)
    }
    function V(a) {
        N.apply(this, arguments);
        this.type = this.TYPES.LINEAR;
        var b = null === a.args[0].match(this.stepRegExp);
        b ? a.args[0].split(" ").reverse().forEach(function (a) {
            switch (a) {
            case "left":
                this.x0 = 0;
                this.x1 = 1;
                break;
            case "top":
                this.y0 = 0;
                this.y1 = 1;
                break;
            case "right":
                this.x0 = 1;
                this.x1 = 0;
                break;
            case "bottom":
                this.y0 = 1;
                this.y1 = 0;
                break;
            case "to":
                a = this.y0;
                var b = this.x0;
                this.y0 = this.y1;
                this.x0 = this.x1;
                this.x1 = b;
                this.y1 = a
            }
        }, this) : (this.y0 = 0, this.y1 = 1);
        this.colorStops = a.args.slice(b ? 1 : 0).map(function (a) {
            a = a.match(this.stepRegExp);
            return {
                color: new t(a[1]),
                stop: "%" === a[3] ? a[2] / 100 : null
            }
        }, this);
        null === this.colorStops[0].stop &&
        (this.colorStops[0].stop = 0);
        null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1);
        this.colorStops.forEach(function (a, b) {
            null === a.stop && this.colorStops.slice(b).some(function (e, f) {
                return null !== e.stop ? (a.stop = (e.stop - this.colorStops[b - 1].stop) / (f + 1) + this.colorStops[b - 1].stop, !0) : !1
            }, this)
        }, this)
    }
    function q() {
        m.html2canvas.logging && m.console && m.console.log && Function.prototype.bind.call(m.console.log, m.console).apply(m.console, [Date.now() - m.html2canvas.start +
                "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
    }
    function l(a, b) {
        this.node = a;
        this.parent = b;
        this.borders = this.bounds = this.stack = null;
        this.clip = [];
        this.backgroundClip = [];
        this.computedStyles = this.visible = this.offsetBounds = null;
        this.colors = {};
        this.styles = {};
        this.transformMatrix = this.transformData = this.backgroundImages = null;
        this.isPseudoElement = !1;
        this.opacity = null
    }
    function Va(a) {
        if (a && "matrix" === a[1])
            return a[2].split(",").map(function (a) {
                return parseFloat(a.trim())
            })
    }
    function W(a) {
        return -1 !==
        a.toString().indexOf("%")
    }
    function ra(a) {
        var b,
        c,
        d,
        e,
        f,
        g = [],
        h = 0,
        k = 0,
        l,
        m,
        q = function () {
            b && ('"' === c.substr(0, 1) && (c = c.substr(1, c.length - 2)), c && m.push(c), "-" === b.substr(0, 1) && 0 < (e = b.indexOf("-", 1) + 1) && (d = b.substr(0, e), b = b.substr(e)), g.push({
                    prefix: d,
                    method: b.toLowerCase(),
                    value: f,
                    args: m,
                    image: null
                }));
            m = [];
            b = d = c = f = ""
        };
        m = [];
        b = d = c = f = "";
        a.split("").forEach(function (a) {
            if (!(0 === h && -1 < " \r\n\t".indexOf(a))) {
                switch (a) {
                case '"':
                    l ? l === a && (l = null) : l = a;
                    break;
                case "(":
                    if (!l) {
                        if (0 === h) {
                            h = 1;
                            f += a;
                            return
                        }
                        k++
                    }
                    break;
                case ")":
                    if (!l &&
                        1 === h) {
                        if (0 === k) {
                            h = 0;
                            f += a;
                            q();
                            return
                        }
                        k--
                    }
                    break;
                case ",":
                    if (!l) {
                        if (0 === h) {
                            q();
                            return
                        }
                        if (1 === h && 0 === k && !b.match(/^url$/i)) {
                            m.push(c);
                            c = "";
                            f += a;
                            return
                        }
                    }
                }
                f += a;
                0 === h ? b += a : c += a
            }
        });
        q();
        return g
    }
    function Wa(a) {
        return a.replace("px", "")
    }
    function Xa(a) {
        return parseFloat(a)
    }
    function U(a) {
        if (a.getBoundingClientRect) {
            var b = a.getBoundingClientRect(),
            c = null == a.offsetWidth ? b.width : a.offsetWidth;
            return {
                top: b.top,
                bottom: b.bottom || b.top + b.height,
                right: b.left + c,
                left: b.left,
                width: c,
                height: null == a.offsetHeight ? b.height :
                a.offsetHeight
            }
        }
        return {}
    }
    function ca(a) {
        var b = a.offsetParent ? ca(a.offsetParent) : {
            top: 0,
            left: 0
        };
        return {
            top: a.offsetTop + b.top,
            bottom: a.offsetTop + a.offsetHeight + b.top,
            right: a.offsetLeft + b.left + a.offsetWidth,
            left: a.offsetLeft + b.left,
            width: a.offsetWidth,
            height: a.offsetHeight
        }
    }
    function n(a, b, c, d, e) {
        q("Starting NodeParser");
        this.renderer = b;
        this.options = e;
        this.range = null;
        this.support = c;
        this.renderQueue = [];
        this.stack = new G(!0, 1, a.ownerDocument, null);
        c = new l(a, null);
        e.background && b.rectangle(0, 0, b.width, b.height,
            new t(e.background));
        if (a === a.ownerDocument.documentElement) {
            var f = new l(c.color("backgroundColor").isTransparent() ? a.ownerDocument.body : a.ownerDocument.documentElement, null);
            b.rectangle(0, 0, b.width, b.height, f.color("backgroundColor"))
        }
        c.visibile = c.isElementVisible();
        this.createPseudoHideStyles(a.ownerDocument);
        this.disableAnimations(a.ownerDocument);
        this.nodes = [].concat.apply([], [c].concat(this.getChildren(c)).filter(function (a) {
                return a.visible = a.isElementVisible()
            }).map(this.getPseudoElements,
                this));
        this.fontMetrics = new pa;
        q("Fetched nodes, total:", this.nodes.length);
        q("Calculate overflow clips");
        this.calculateOverflowClips();
        q("Start fetching images");
        this.images = d.fetch(this.nodes.filter(O));
        this.ready = this.images.ready.then(X(function () {
                    q("Images loaded, starting parsing");
                    q("Creating stacking contexts");
                    this.createStackingContexts();
                    q("Sorting stacking contexts");
                    this.sortStackingContexts(this.stack);
                    this.parse(this.stack);
                    q("Render queue created with " + this.renderQueue.length + " items");
                    return new Promise(X(function (a) {
                            e.async ? "function" === typeof e.async ? e.async.call(this, this.renderQueue, a) : 0 < this.renderQueue.length ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, a)) : a() : (this.renderQueue.forEach(this.paint, this), a())
                        }, this))
                }, this))
    }
    function Ya(a) {
        return a.replace(/(\-[a-z])/g, function (a) {
            return a.toUpperCase().replace("-", "")
        })
    }
    function sa() {}
    function ta(a, b, c, d) {
        return a.map(function (e, f) {
            if (0 < e.width) {
                var g = b.left,
                h = b.top,
                k = b.width,
                l = b.height - a[2].width;
                switch (f) {
                case 0:
                    l =
                        a[0].width;
                    e.args = Y({
                        c1: [g, h],
                        c2: [g + k, h],
                        c3: [g + k - a[1].width, h + l],
                        c4: [g + a[3].width, h + l]
                    }, d[0], d[1], c.topLeftOuter, c.topLeftInner, c.topRightOuter, c.topRightInner);
                    break;
                case 1:
                    g = b.left + b.width - a[1].width;
                    k = a[1].width;
                    e.args = Y({
                        c1: [g + k, h],
                        c2: [g + k, h + l + a[2].width],
                        c3: [g, h + l],
                        c4: [g, h + a[0].width]
                    }, d[1], d[2], c.topRightOuter, c.topRightInner, c.bottomRightOuter, c.bottomRightInner);
                    break;
                case 2:
                    h = h + b.height - a[2].width;
                    l = a[2].width;
                    e.args = Y({
                        c1: [g + k, h + l],
                        c2: [g, h + l],
                        c3: [g + a[3].width, h],
                        c4: [g + k - a[3].width, h]
                    }, d[2],
                            d[3], c.bottomRightOuter, c.bottomRightInner, c.bottomLeftOuter, c.bottomLeftInner);
                    break;
                case 3:
                    k = a[3].width,
                    e.args = Y({
                        c1: [g, h + l + a[2].width],
                        c2: [g, h],
                        c3: [g + k, h + a[0].width],
                        c4: [g + k, h + l]
                    }, d[3], d[0], c.bottomLeftOuter, c.bottomLeftInner, c.topLeftOuter, c.topLeftInner)
                }
            }
            return e
        })
    }
    function C(a, b, c, d) {
        var e = (Math.sqrt(2) - 1) / 3 * 4,
        f = c * e,
        e = d * e;
        c = a + c;
        d = b + d;
        return {
            topLeft: H({
                x: a,
                y: d
            }, {
                x: a,
                y: d - e
            }, {
                x: c - f,
                y: b
            }, {
                x: c,
                y: b
            }),
            topRight: H({
                x: a,
                y: b
            }, {
                x: a + f,
                y: b
            }, {
                x: c,
                y: d - e
            }, {
                x: c,
                y: d
            }),
            bottomRight: H({
                x: c,
                y: b
            }, {
                x: c,
                y: b + e
            }, {
                x: a +
                f,
                y: d
            }, {
                x: a,
                y: d
            }),
            bottomLeft: H({
                x: c,
                y: d
            }, {
                x: c - f,
                y: d
            }, {
                x: a,
                y: b + e
            }, {
                x: a,
                y: b
            })
        }
    }
    function ua(a, b, c) {
        var d = a.left,
        e = a.top,
        f = a.width;
        a = a.height;
        var g = b[0][0],
        h = b[0][1],
        k = b[1][0],
        l = b[1][1],
        m = b[2][0],
        q = b[2][1],
        r = b[3][0];
        b = b[3][1];
        var n = f - k,
        t = a - q,
        p = f - m,
        u = a - b;
        return {
            topLeftOuter: C(d, e, g, h).topLeft.subdivide(.5),
            topLeftInner: C(d + c[3].width, e + c[0].width, Math.max(0, g - c[3].width), Math.max(0, h - c[0].width)).topLeft.subdivide(.5),
            topRightOuter: C(d + n, e, k, l).topRight.subdivide(.5),
            topRightInner: C(d + Math.min(n, f + c[3].width),
                e + c[0].width, n > f + c[3].width ? 0 : k - c[3].width, l - c[0].width).topRight.subdivide(.5),
            bottomRightOuter: C(d + p, e + t, m, q).bottomRight.subdivide(.5),
            bottomRightInner: C(d + Math.min(p, f - c[3].width), e + Math.min(t, a + c[0].width), Math.max(0, m - c[1].width), q - c[2].width).bottomRight.subdivide(.5),
            bottomLeftOuter: C(d, e + u, r, b).bottomLeft.subdivide(.5),
            bottomLeftInner: C(d + c[3].width, e + u, Math.max(0, r - c[3].width), b - c[2].width).bottomLeft.subdivide(.5)
        }
    }
    function H(a, b, c, d) {
        var e = function (a, b, c) {
            return {
                x: a.x + (b.x - a.x) * c,
                y: a.y +
                (b.y - a.y) * c
            }
        };
        return {
            start: a,
            startControl: b,
            endControl: c,
            end: d,
            subdivide: function (f) {
                var g = e(a, b, f),
                h = e(b, c, f),
                k = e(c, d, f),
                l = e(g, h, f),
                h = e(h, k, f);
                f = e(l, h, f);
                return [H(a, g, l, f), H(f, h, k, d)]
            },
            curveTo: function (a) {
                a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y])
            },
            curveToReversed: function (d) {
                d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y])
            }
        }
    }
    function Y(a, b, c, d, e, f, g) {
        var h = [];
        0 < b[0] || 0 < b[1] ? (h.push(["line", d[1].start.x, d[1].start.y]), d[1].curveTo(h)) : h.push(["line", a.c1[0], a.c1[1]]);
        0 < c[0] || 0 < c[1] ? (h.push(["line",
                    f[0].start.x, f[0].start.y]), f[0].curveTo(h), h.push(["line", g[0].end.x, g[0].end.y]), g[0].curveToReversed(h)) : (h.push(["line", a.c2[0], a.c2[1]]), h.push(["line", a.c3[0], a.c3[1]]));
        0 < b[0] || 0 < b[1] ? (h.push(["line", e[1].end.x, e[1].end.y]), e[1].curveToReversed(h)) : h.push(["line", a.c4[0], a.c4[1]]);
        return h
    }
    function D(a, b, c, d, e, f, g) {
        0 < b[0] || 0 < b[1] ? (a.push(["line", d[0].start.x, d[0].start.y]), d[0].curveTo(a), d[1].curveTo(a)) : a.push(["line", f, g]);
        (0 < c[0] || 0 < c[1]) && a.push(["line", e[0].start.x, e[0].start.y])
    }
    function Za(a) {
        return 0 >
        a.cssInt("zIndex")
    }
    function $a(a) {
        return 0 < a.cssInt("zIndex")
    }
    function va(a) {
        return 0 === a.cssInt("zIndex")
    }
    function wa(a) {
        return -1 !== ["inline", "inline-block", "inline-table"].indexOf(a.css("display"))
    }
    function ab(a) {
        return 0 < a.node.data.trim().length
    }
    function bb(a) {
        return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (b) {
            b = a.css("border" + b + "Radius").split(" ");
            1 >= b.length && (b[1] = b[0]);
            return b.map(cb)
        })
    }
    function db(a) {
        return a.nodeType === Node.TEXT_NODE || a.nodeType === Node.ELEMENT_NODE
    }
    function P(a) {
        return "static" !== a.css("position")
    }
    function da(a) {
        return "none" !== a.css("float")
    }
    function Q(a) {
        var b = this;
        return function () {
            return !a.apply(b, arguments)
        }
    }
    function O(a) {
        return a.node.nodeType === Node.ELEMENT_NODE
    }
    function ea(a) {
        return a.node.nodeType === Node.TEXT_NODE
    }
    function eb(a) {
        return function (b, c) {
            return b.cssInt("zIndex") + a.indexOf(b) / a.length - (c.cssInt("zIndex") + a.indexOf(c) / a.length)
        }
    }
    function X(a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }
    function cb(a) {
        return parseInt(a,
            10)
    }
    function fb(a) {
        return a.width
    }
    function gb(a) {
        return a.node.nodeType !== Node.ELEMENT_NODE || -1 === "SCRIPT HEAD TITLE OBJECT BR OPTION".split(" ").indexOf(a.node.nodeName)
    }
    function hb(a) {
        for (var b = [], c = 0, d = !1, e; a.length; )
             - 1 !== [32, 13, 10, 9, 45].indexOf(a[c]) === d ? (e = a.splice(0, c), e.length && b.push(m.html2canvas.punycode.ucs2.encode(e)), d = !d, c = 0) : c++, c >= a.length && (e = a.splice(0, c), e.length && b.push(m.html2canvas.punycode.ucs2.encode(e)));
        return b
    }
    function Pa(a, b, c) {
        if (!b)
            return Promise.reject("No proxy configured");
        var d = xa(ya);
        a = za(b, a, d);
        return ya ? Aa(a) : Ba(c, a, d).then(function (a) {
            return Ca(a.content)
        })
    }
    function ib(a, b, c) {
        var d = xa(Da);
        a = za(b, a, d);
        return Da ? Promise.resolve(a) : Ba(c, a, d).then(function (a) {
            return "data:" + a.type + ";base64," + a.content
        })
    }
    function Ba(a, b, c) {
        return new Promise(function (d, e) {
            var f = a.createElement("script"),
            g = function () {
                delete m.html2canvas.proxy[c];
                a.body.removeChild(f)
            };
            m.html2canvas.proxy[c] = function (a) {
                g();
                d(a)
            };
            f.src = b;
            f.onerror = function (a) {
                g();
                e(a)
            };
            a.body.appendChild(f)
        })
    }
    function xa(a) {
        var val = new Uint32Array(1);
        (window.crypto || window.msCrypto).getRandomValues(val);
        return a ?
        "" : "html2canvas_" + Date.now() + "_" + ++jb + "_" + Math.round(1E5 * (val[0] / 0xFFFFFFFF))
    }
    function za(a, b, c) {
        return a + "?url=" + encodeURIComponent(b) + (c.length ? "&callback=html2canvas.proxy." + c : "")
    }
    function kb(a, b) {
        r.createElement("script");
        var c = r.createElement("a");
        c.href = a;
        this.src = a = c.href;
        this.image = new Image;
        var d = this;
        this.promise = new Promise(function (c, f) {
            d.image.crossOrigin = "Anonymous";
            d.image.onload = c;
            d.image.onerror = f;
            (new ib(a, b, r)).then(function (a) {
                d.image.src = a
            })["catch"](f)
        })
    }
    function v(a, b, c) {
        l.call(this,
            a, b);
        this.isPseudoElement = !0;
        this.before = ":before" === c
    }
    function x(a, b, c, d, e) {
        this.width = a;
        this.height = b;
        this.images = c;
        this.options = d;
        this.document = e
    }
    function G(a, b, c, d) {
        l.call(this, c, d);
        this.ownStacking = a;
        this.contexts = [];
        this.children = [];
        this.opacity = (this.parent ? this.parent.stack.opacity : 1) * b
    }
    function T(a) {
        this.rangeBounds = this.testRangeBounds(a);
        this.cors = this.testCORS();
        this.svg = this.testSVG()
    }
    function A(a) {
        this.src = a;
        this.image = null;
        var b = this;
        this.promise = this.hasFabric().then(function () {
            return b.isInline(a) ?
            Promise.resolve(b.inlineFormatting(a)) : Aa(a)
        }).then(function (a) {
            return new Promise(function (d) {
                html2canvas.fabric.loadSVGFromString(a, b.createCanvas.call(b, d))
            })
        })
    }
    function Ca(a) {
        var b = a.length,
        c,
        d,
        e,
        f,
        g,
        h,
        k = "";
        for (c = 0; c < b; c += 4)
            d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c]), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c + 1]), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c + 2]), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[c +
                        3]), d = d << 2 | e >> 4, e = (e & 15) << 4 | f >> 2, h = (f & 3) << 6 | g, k = 64 === f ? k + String.fromCharCode(d) : 64 === g || -1 === g ? k + String.fromCharCode(d, e) : k + String.fromCharCode(d, e, h);
        return k
    }
    function Ea(a, b) {
        this.src = a;
        this.image = null;
        var c = this;
        this.promise = b ? new Promise(function (b, e) {
            c.image = new Image;
            c.image.onload = b;
            c.image.onerror = e;
            c.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(a);
            !0 === c.image.complete && b(c.image)
        }) : this.hasFabric().then(function () {
            return new Promise(function (b) {
                html2canvas.fabric.parseSVGDocument(a,
                    c.createCanvas.call(c, b))
            })
        })
    }
    function I(a, b) {
        l.call(this, a, b)
    }
    function lb(a, b, c) {
        if (0 < a.length)
            return b + c.toUpperCase()
    }
    function Fa(a) {
        N.apply(this, arguments);
        this.type = "linear" === a.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL
    }
    function Aa(a) {
        return new Promise(function (b, c) {
            var d = new XMLHttpRequest;
            d.open("GET", a);
            d.onload = function () {
                200 === d.status ? b(d.responseText) : c(Error(d.statusText))
            };
            d.onerror = function () {
                c(Error("Network Error"))
            };
            d.send()
        })
    }
    function p(a, b) {
        x.apply(this, arguments);
        this.canvas =
            this.options.canvas || this.document.createElement("canvas");
        this.options.canvas || (this.canvas.width = a, this.canvas.height = b);
        this.ctx = this.canvas.getContext("2d");
        this.taintCtx = this.document.createElement("canvas").getContext("2d");
        this.ctx.textBaseline = "bottom";
        this.variables = {};
        q("Initialized CanvasRenderer with size", a, "x", b)
    }
    function mb(a) {
        return 0 < a.length
    }
    (function () {
        function a(a, b) {
            J[K] = a;
            J[K + 1] = b;
            K += 2;
            2 === K && Ga()
        }
        function b(a) {
            return "function" === typeof a
        }
        function c() {
            return function () {
                process.nextTick(g)
            }
        }
        function d() {
            var a = 0,
            b = new Ha(g),
            c = r.createTextNode("");
            b.observe(c, {
                characterData: !0
            });
            return function () {
                c.data = a = ++a % 2
            }
        }
        function e() {
            var a = new MessageChannel;
            a.port1.onmessage = g;
            return function () {
                a.port2.postMessage(0)
            }
        }
        function f() {
            return function () {
                setTimeout(g, 1)
            }
        }
        function g() {
            for (var a = 0; a < K; a += 2)
                (0, J[a])(J[a + 1]), J[a] = void 0, J[a + 1] = void 0;
            K = 0
        }
        function h() {}
        function k(a, b, c, d) {
            try {
                a.call(b, c, d)
            } catch (e) {
                return e
            }
        }
        function l(b, c, d) {
            a(function (a) {
                var b = !1,
                e = k(d, c, function (d) {
                    b || (b = !0, c !== d ? n(a,
                            d) : p(a, d))
                }, function (c) {
                    b || (b = !0, w(a, c))
                });
                !b && e && (b = !0, w(a, e))
            }, b)
        }
        function q(a, b) {
            1 === b.a ? p(a, b.b) : 2 === a.a ? w(a, b.b) : u(b, void 0, function (b) {
                n(a, b)
            }, function (b) {
                w(a, b)
            })
        }
        function n(a, c) {
            if (a === c)
                w(a, new TypeError("You cannot resolve a promise with itself"));
            else if ("function" === typeof c || "object" === typeof c && null !== c)
                if (c.constructor === a.constructor)
                    q(a, c);
                else {
                    var d;
                    try {
                        d = c.then
                    } catch (e) {
                        Z.error = e,
                        d = Z
                    }
                    d === Z ? w(a, Z.error) : void 0 === d ? p(a, c) : b(d) ? l(a, c, d) : p(a, c)
                }
            else
                p(a, c)
        }
        function t(a) {
            a.f && a.f(a.b);
            v(a)
        }
        function p(b, c) {
            void 0 === b.a && (b.b = c, b.a = 1, 0 !== b.e.length && a(v, b))
        }
        function w(b, c) {
            void 0 === b.a && (b.a = 2, b.b = c, a(t, b))
        }
        function u(b, c, d, e) {
            var f = b.e,
            g = f.length;
            b.f = null;
            f[g] = c;
            f[g + 1] = d;
            f[g + 2] = e;
            0 === g && b.a && a(v, b)
        }
        function v(a) {
            var b = a.e,
            c = a.a;
            if (0 !== b.length) {
                for (var d, e, f = a.b, g = 0; g < b.length; g += 3)
                    d = b[g], e = b[g + c], d ? z(c, d, e, f) : e(f);
                a.e.length = 0
            }
        }
        function x() {
            this.error = null
        }
        function z(a, c, d, e) {
            var f = b(d),
            g,
            h,
            k,
            l;
            if (f) {
                try {
                    g = d(e)
                } catch (B) {
                    fa.error = B,
                    g = fa
                }
                g === fa ? (l = !0, h = g.error, g = null) : k = !0;
                if (c ===
                    g) {
                    w(c, new TypeError("A promises callback cannot return that same promise."));
                    return
                }
            } else
                g = e, k = !0;
            void 0 === c.a && (f && k ? n(c, g) : l ? w(c, h) : 1 === a ? p(c, g) : 2 === a && w(c, g))
        }
        function A(a, b) {
            try {
                b(function (b) {
                    n(a, b)
                }, function (b) {
                    w(a, b)
                })
            } catch (c) {
                w(a, c)
            }
        }
        function y(a, b, c, d) {
            this.n = a;
            this.c = new a(h, d);
            this.i = c;
            this.o(b) ? (this.m = b, this.d = this.length = b.length, this.l(), 0 === this.length ? p(this.c, this.b) : (this.length = this.length || 0, this.k(), 0 === this.d && p(this.c, this.b))) : w(this.c, this.p())
        }
        function B(a) {
            nb++;
            this.b =
                this.a = void 0;
            this.e = [];
            if (h !== a) {
                if (!b(a))
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                if (!(this instanceof B))
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                A(this, a)
            }
        }
        var Ia = Array.isArray ? Array.isArray : function (a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        },
        K = 0,
        aa = "undefined" !== typeof m ? m : {},
        Ha = aa.MutationObserver || aa.WebKitMutationObserver,
        aa = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel,
        J = Array(1E3),
        Ga;
        Ga = "undefined" !== typeof process && "[object process]" === {}
        .toString.call(process) ? c() : Ha ? d() : aa ? e() : f();
        var Z = new x,
        fa = new x;
        y.prototype.o = function (a) {
            return Ia(a)
        };
        y.prototype.p = function () {
            return Error("Array Methods must be provided an Array")
        };
        y.prototype.l = function () {
            this.b = Array(this.length)
        };
        y.prototype.k = function () {
            for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 ===
                b.a && d < a; d++)
                this.j(c[d], d)
        };
        y.prototype.j = function (a, b) {
            var c = this.n;
            "object" === typeof a && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a))
        };
        y.prototype.g = function (a, b, c) {
            var d = this.c;
            void 0 === d.a && (this.d--, this.i && 2 === a ? w(d, c) : this.b[b] = this.h(c));
            0 === this.d && p(d, this.b)
        };
        y.prototype.h = function (a) {
            return a
        };
        y.prototype.q = function (a, b) {
            var c = this;
            u(a, void 0, function (a) {
                c.g(1, b, a)
            }, function (a) {
                c.g(2, b, a)
            })
        };
        var nb = 0;
        B.all =
        function (a, b) {
            return (new y(this, a, !0, b)).c
        };
        B.race = function (a, b) {
            function c(a) {
                n(e, a)
            }
            function d(a) {
                w(e, a)
            }
            var e = new this(h, b);
            if (!Ia(a))
                return w(e, new TypeError("You must pass an array to race.")), e;
            for (var f = a.length, g = 0; void 0 === e.a && g < f; g++)
                u(this.resolve(a[g]), void 0, c, d);
            return e
        };
        B.resolve = function (a, b) {
            if (a && "object" === typeof a && a.constructor === this)
                return a;
            var c = new this(h, b);
            n(c, a);
            return c
        };
        B.reject = function (a, b) {
            var c = new this(h, b);
            w(c, a);
            return c
        };
        B.prototype = {
            constructor: B,
            then: function (b,
                c) {
                var d = this.a;
                if (1 === d && !b || 2 === d && !c)
                    return this;
                var e = new this.constructor(h),
                f = this.b;
                if (d) {
                    var g = arguments[d - 1];
                    a(function () {
                        z(d, e, g, f)
                    })
                } else
                    u(this, e, b, c);
                return e
            },
            "catch": function (a) {
                return this.then(null, a)
            }
        };
        var ga = {
            Promise: B,
            polyfill: function () {
                var a;
                a = "undefined" !== typeof S ? S : "undefined" !== typeof m && m.document ? m : self;
                "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function () {
                    var c;
                    new a.Promise(function (a) {
                        c = a
                    });
                    return b(c)
                }
                () || (a.Promise =
                        B)
            }
        };
        "function" === typeof E && E.amd ? E(function () {
            return ga
        }) : "undefined" !== typeof module && module.exports ? module.exports = ga : "undefined" !== typeof this && (this.ES6Promise = ga)
    }).call(m);
    m && m.ES6Promise.polyfill();
    if ("undefined" === typeof r || "function" !== typeof Object.create || "function" !== typeof r.createElement("canvas").getContext)
        (m || module.exports).html2canvas = function () {
            return Promise.reject("No canvas support")
        };
    else {
        (function (a) {
            function b(a) {
                throw RangeError(v[a]);
            }
            function c(a, b) {
                for (var c = a.length,
                    d = []; c--; )
                    d[c] = b(a[c]);
                return d
            }
            function d(a, b) {
                var d = a.split("@"),
                e = "";
                1 < d.length && (e = d[0] + "@", a = d[1]);
                d = a.split(u);
                d = c(d, b).join(".");
                return e + d
            }
            function e(a) {
                for (var b = [], c = 0, d = a.length, e, f; c < d; )
                    e = a.charCodeAt(c++), 55296 <= e && 56319 >= e && c < d ? (f = a.charCodeAt(c++), 56320 == (f & 64512) ? b.push(((e & 1023) << 10) + (f & 1023) + 65536) : (b.push(e), c--)) : b.push(e);
                return b
            }
            function f(a) {
                return c(a, function (a) {
                    var b = "";
                    65535 < a && (a -= 65536, b += x(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023);
                    return b += x(a)
                }).join("")
            }
            function g(a, b) {
                return a +
                22 + 75 * (26 > a) - ((0 != b) << 5)
            }
            function h(a, b, c) {
                var d = 0;
                a = c ? z(a / 700) : a >> 1;
                for (a += z(a / b); 455 < a; d += 36)
                    a = z(a / 35);
                return z(d + 36 * a / (a + 38))
            }
            function k(a) {
                var c = [],
                d = a.length,
                e,
                g = 0,
                k = 128,
                l = 72,
                m,
                n,
                q,
                p,
                r;
                m = a.lastIndexOf("-");
                0 > m && (m = 0);
                for (n = 0; n < m; ++n)
                    128 <= a.charCodeAt(n) && b("not-basic"), c.push(a.charCodeAt(n));
                for (m = 0 < m ? m + 1 : 0; m < d; ) {
                    n = g;
                    e = 1;
                    for (q = 36; ; q += 36) {
                        m >= d && b("invalid-input");
                        p = a.charCodeAt(m++);
                        p = 10 > p - 48 ? p - 22 : 26 > p - 65 ? p - 65 : 26 > p - 97 ? p - 97 : 36;
                        (36 <= p || p > z((2147483647 - g) / e)) && b("overflow");
                        g += p * e;
                        r = q <= l ? 1 : q >= l +
                            26 ? 26 : q - l;
                        if (p < r)
                            break;
                        p = 36 - r;
                        e > z(2147483647 / p) && b("overflow");
                        e *= p
                    }
                    e = c.length + 1;
                    l = h(g - n, e, 0 == n);
                    z(g / e) > 2147483647 - k && b("overflow");
                    k += z(g / e);
                    g %= e;
                    c.splice(g++, 0, k)
                }
                return f(c)
            }
            function l(a) {
                var c,
                d,
                f,
                k,
                p,
                m,
                n,
                q,
                r,
                t = [],
                u,
                v,
                w;
                a = e(a);
                u = a.length;
                c = 128;
                d = 0;
                p = 72;
                for (m = 0; m < u; ++m)
                    r = a[m], 128 > r && t.push(x(r));
                for ((f = k = t.length) && t.push("-"); f < u; ) {
                    n = 2147483647;
                    for (m = 0; m < u; ++m)
                        r = a[m], r >= c && r < n && (n = r);
                    v = f + 1;
                    n - c > z((2147483647 - d) / v) && b("overflow");
                    d += (n - c) * v;
                    c = n;
                    for (m = 0; m < u; ++m)
                        if (r = a[m], r < c && 2147483647 < ++d && b("overflow"),
                            r == c) {
                            q = d;
                            for (n = 36; ; n += 36) {
                                r = n <= p ? 1 : n >= p + 26 ? 26 : n - p;
                                if (q < r)
                                    break;
                                w = q - r;
                                q = 36 - r;
                                t.push(x(g(r + w % q, 0)));
                                q = z(w / q)
                            }
                            t.push(x(g(q, 0)));
                            p = h(d, v, f == k);
                            d = 0;
                            ++f
                        }
                    ++d;
                    ++c
                }
                return t.join("")
            }
            var m = "object" == typeof R && R && !R.nodeType && R,
            q = "object" == typeof module && module && !module.nodeType && module,
            n = "object" == typeof S && S;
            if (n.global === n || n.window === n || n.self === n)
                a = n;
            var p,
            r = /^xn--/,
            t = /[^\x20-\x7E]/,
            u = /[\x2E\u3002\uFF0E\uFF61]/g,
            v = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            },
            z = Math.floor,
            x = String.fromCharCode,
            y;
            p = {
                version: "1.3.1",
                ucs2: {
                    decode: e,
                    encode: f
                },
                decode: k,
                encode: l,
                toASCII: function (a) {
                    return d(a, function (a) {
                        return t.test(a) ? "xn--" + l(a) : a
                    })
                },
                toUnicode: function (a) {
                    return d(a, function (a) {
                        return r.test(a) ? k(a.slice(4).toLowerCase()) : a
                    })
                }
            };
            if ("function" == typeof E && "object" == typeof E.amd && E.amd)
                E("punycode", function () {
                    return p
                });
            else if (m && q)
                if (module.exports == m)
                    q.exports = p;
                else
                    for (y in p)
                        p.hasOwnProperty(y) && (m[y] = p[y]);
            else
                a.punycode =
                    p
        })(this);
        var Ra = 0,
        ob = 0;
        m.html2canvas = function (a, b) {
            var c = ob++;
            b = b || {};
            b.logging && (m.html2canvas.logging = !0, m.html2canvas.start = Date.now());
            b.async = "undefined" === typeof b.async ? !0 : b.async;
            b.allowTaint = "undefined" === typeof b.allowTaint ? !1 : b.allowTaint;
            b.removeContainer = "undefined" === typeof b.removeContainer ? !0 : b.removeContainer;
            b.javascriptEnabled = "undefined" === typeof b.javascriptEnabled ? !1 : b.javascriptEnabled;
            b.imageTimeout = "undefined" === typeof b.imageTimeout ? 1E4 : b.imageTimeout;
            b.renderer = "function" ===
                typeof b.renderer ? b.renderer : p;
            b.strict = !!b.strict;
            if ("string" === typeof a) {
                if ("string" !== typeof b.proxy)
                    return Promise.reject("Proxy must be used when rendering url");
                var d = null != b.width ? b.width : m.innerWidth,
                e = null != b.height ? b.height : m.innerHeight;
                return oa(Ta(a), b.proxy, r, d, e, b).then(function (a) {
                    return ia(a.contentWindow.document.documentElement, a, b, d, e)
                })
            }
            var f = (a === L ? [r.documentElement] : a.length ? a : [a])[0];
            f.setAttribute("data-html2canvas-node" + c, c);
            return Ka(f.ownerDocument, b, f.ownerDocument.defaultView.innerWidth,
                f.ownerDocument.defaultView.innerHeight, c).then(function (a) {
                "function" === typeof b.onrendered && (q("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), b.onrendered(a));
                return a
            })
        };
        m.html2canvas.punycode = this.punycode;
        m.html2canvas.proxy = {};
        t.prototype.darken = function (a) {
            a = 1 - a;
            return new t([Math.round(this.r * a), Math.round(this.g * a), Math.round(this.b * a), this.a])
        };
        t.prototype.isTransparent = function () {
            return 0 === this.a
        };
        t.prototype.isBlack = function () {
            return 0 === this.r &&
            0 === this.g && 0 === this.b
        };
        t.prototype.fromArray = function (a) {
            Array.isArray(a) && (this.r = Math.min(a[0], 255), this.g = Math.min(a[1], 255), this.b = Math.min(a[2], 255), 3 < a.length && (this.a = a[3]));
            return Array.isArray(a)
        };
        var pb = /^#([a-f0-9]{3})$/i;
        t.prototype.hex3 = function (a) {
            null !== (a = a.match(pb)) && (this.r = parseInt(a[1][0] + a[1][0], 16), this.g = parseInt(a[1][1] + a[1][1], 16), this.b = parseInt(a[1][2] + a[1][2], 16));
            return null !== a
        };
        var qb = /^#([a-f0-9]{6})$/i;
        t.prototype.hex6 = function (a) {
            null !== (a = a.match(qb)) && (this.r =
                    parseInt(a[1].substring(0, 2), 16), this.g = parseInt(a[1].substring(2, 4), 16), this.b = parseInt(a[1].substring(4, 6), 16));
            return null !== a
        };
        var rb = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
        t.prototype.rgb = function (a) {
            null !== (a = a.match(rb)) && (this.r = Number(a[1]), this.g = Number(a[2]), this.b = Number(a[3]));
            return null !== a
        };
        var sb = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
        t.prototype.rgba = function (a) {
            null !== (a = a.match(sb)) && (this.r = Number(a[1]), this.g = Number(a[2]), this.b = Number(a[3]),
                this.a = Number(a[4]));
            return null !== a
        };
        t.prototype.toString = function () {
            return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join() + ")" : "rgb(" + [this.r, this.g, this.b].join() + ")"
        };
        t.prototype.namedColor = function (a) {
            var b = tb[a.toLowerCase()];
            if (b)
                this.r = b[0], this.g = b[1], this.b = b[2];
            else if ("transparent" === a.toLowerCase())
                return this.r = this.g = this.b = this.a = 0, !0;
            return !!b
        };
        t.prototype.isColor = !0;
        var tb = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127,
                255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250,
                250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60,
                179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255,
                239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0,
                255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        };
        pa.prototype.getMetrics = function (a, b) {
            this.data[a + "-" + b] === L && (this.data[a + "-" + b] = new Ua(a, b));
            return this.data[a + "-" + b]
        };
        qa.prototype.proxyLoad = function (a, b, c) {
            var d = this.src;
            return oa(d.src, a, d.ownerDocument, b.width, b.height, c)
        };
        N.prototype.TYPES = {
            LINEAR: 1,
            RADIAL: 2
        };
        u.prototype.findImages = function (a) {
            var b = [];
            a.reduce(function (a, b) {
                switch (b.node.nodeName) {
                case "IMG":
                    return a.concat([{
                                args: [b.node.src],
                                method: "url"
                            }
                        ]);
                case "svg":
                case "IFRAME":
                    return a.concat([{
                                args: [b.node],
                                method: b.node.nodeName
                            }
                        ])
                }
                return a
            }, []).forEach(this.addImage(b, this.loadImage), this);
            return b
        };
        u.prototype.findBackgroundImage = function (a, b) {
            b.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(a, this.loadImage), this);
            return a
        };
        u.prototype.addImage =
        function (a, b) {
            return function (c) {
                c.args.forEach(function (d) {
                    this.imageExists(a, d) || (a.splice(0, 0, b.call(this, c)), q("Added image #" + a.length, "string" === typeof d ? d.substring(0, 100) : d))
                }, this)
            }
        };
        u.prototype.hasImageBackground = function (a) {
            return "none" !== a.method
        };
        u.prototype.loadImage = function (a) {
            return "url" === a.method ? (a = a.args[0], !this.isSVG(a) || this.support.svg || this.options.allowTaint ? a.match(/data:image\/.*;base64,/i) ? new ba(a.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ""), !1) : this.isSameOrigin(a) || !0 ===
                this.options.allowTaint || this.isSVG(a) ? new ba(a, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new ba(a, !0) : this.options.proxy ? new kb(a, this.options.proxy) : new M(a) : new A(a)) : "linear-gradient" === a.method ? new V(a) : "gradient" === a.method ? new Fa(a) : "svg" === a.method ? new Ea(a.args[0], this.support.svg) : "IFRAME" === a.method ? new qa(a.args[0], this.isSameOrigin(a.args[0].src), this.options) : new M(a)
        };
        u.prototype.isSVG = function (a) {
            return "svg" === a.substring(a.length - 3).toLowerCase() || A.prototype.isInline(a)
        };
        u.prototype.imageExists = function (a, b) {
            return a.some(function (a) {
                return a.src === b
            })
        };
        u.prototype.isSameOrigin = function (a) {
            return this.getOrigin(a) === this.origin
        };
        u.prototype.getOrigin = function (a) {
            var b = this.link || (this.link = r.createElement("a"));
            b.href = a;
            b.href = b.href;
            return b.protocol + b.hostname + b.port
        };
        u.prototype.getPromise = function (a) {
            return this.timeout(a, this.options.imageTimeout)["catch"](function () {
                return (new M(a.src)).promise.then(function (b) {
                    a.image = b
                })
            })
        };
        u.prototype.get = function (a) {
            var b =
                null;
            return this.images.some(function (c) {
                return (b = c).src === a
            }) ? b : null
        };
        u.prototype.fetch = function (a) {
            this.images = a.reduce(X(this.findBackgroundImage, this), this.findImages(a));
            this.images.forEach(function (a, c) {
                a.promise.then(function () {
                    q("Succesfully loaded image #" + (c + 1), a)
                }, function (d) {
                    q("Failed loading image #" + (c + 1), a, d)
                })
            });
            this.ready = Promise.all(this.images.map(this.getPromise, this));
            q("Finished searching images");
            return this
        };
        u.prototype.timeout = function (a, b) {
            var c,
            d = Promise.race([a.promise,
                        new Promise(function (d, f) {
                            c = setTimeout(function () {
                                q("Timed out loading image", a);
                                f(a)
                            }, b)
                        })]).then(function (a) {
                    clearTimeout(c);
                    return a
                });
            d["catch"](function () {
                clearTimeout(c)
            });
            return d
        };
        V.prototype = Object.create(N.prototype);
        V.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/;
        l.prototype.cloneTo = function (a) {
            a.visible = this.visible;
            a.borders = this.borders;
            a.bounds = this.bounds;
            a.clip = this.clip;
            a.backgroundClip = this.backgroundClip;
            a.computedStyles =
                this.computedStyles;
            a.styles = this.styles;
            a.backgroundImages = this.backgroundImages;
            a.opacity = this.opacity
        };
        l.prototype.getOpacity = function () {
            return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
        };
        l.prototype.assignStack = function (a) {
            this.stack = a;
            a.children.push(this)
        };
        l.prototype.isElementVisible = function () {
            return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") &&
            ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
        };
        l.prototype.css = function (a) {
            this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null));
            return this.styles[a] || (this.styles[a] = this.computedStyles[a])
        };
        l.prototype.prefixedCss = function (a) {
            var b = ["webkit", "moz", "ms", "o"],
            c = this.css(a);
            c === L && b.some(function (b) {
                c = this.css(b + a.substr(0, 1).toUpperCase() + a.substr(1));
                return c !== L
            }, this);
            return c ===
            L ? null : c
        };
        l.prototype.computedStyle = function (a) {
            return this.node.ownerDocument.defaultView.getComputedStyle(this.node, a)
        };
        l.prototype.cssInt = function (a) {
            a = parseInt(this.css(a), 10);
            return isNaN(a) ? 0 : a
        };
        l.prototype.color = function (a) {
            return this.colors[a] || (this.colors[a] = new t(this.css(a)))
        };
        l.prototype.cssFloat = function (a) {
            a = parseFloat(this.css(a));
            return isNaN(a) ? 0 : a
        };
        l.prototype.fontWeight = function () {
            var a = this.css("fontWeight");
            switch (parseInt(a, 10)) {
            case 401:
                a = "bold";
                break;
            case 400:
                a = "normal"
            }
            return a
        };
        l.prototype.parseClip = function () {
            var a = this.css("clip").match(this.CLIP);
            return a ? {
                top: parseInt(a[1], 10),
                right: parseInt(a[2], 10),
                bottom: parseInt(a[3], 10),
                left: parseInt(a[4], 10)
            }
             : null
        };
        l.prototype.parseBackgroundImages = function () {
            return this.backgroundImages || (this.backgroundImages = ra(this.css("backgroundImage")))
        };
        l.prototype.cssList = function (a, b) {
            var c = (this.css(a) || "").split(","),
            c = c[b || 0] || c[0] || "auto",
            c = c.trim().split(" ");
            1 === c.length && (c = [c[0], c[0]]);
            return c
        };
        l.prototype.parseBackgroundSize =
        function (a, b, c) {
            c = this.cssList("backgroundSize", c);
            var d;
            if (W(c[0]))
                d = a.width * parseFloat(c[0]) / 100;
            else {
                if (/contain|cover/.test(c[0]))
                    return b = b.width / b.height, a.width / a.height < b ^ "contain" === c[0] ? {
                        width: a.height * b,
                        height: a.height
                    }
                 : {
                    width: a.width,
                    height: a.width / b
                };
                d = parseInt(c[0], 10)
            }
            a = "auto" === c[0] && "auto" === c[1] ? b.height : "auto" === c[1] ? d / b.width * b.height : W(c[1]) ? a.height * parseFloat(c[1]) / 100 : parseInt(c[1], 10);
            "auto" === c[0] && (d = a / b.height * b.width);
            return {
                width: d,
                height: a
            }
        };
        l.prototype.parseBackgroundPosition =
        function (a, b, c, d) {
            c = this.cssList("backgroundPosition", c);
            var e;
            e = W(c[0]) ? (a.width - (d || b).width) * (parseFloat(c[0]) / 100) : parseInt(c[0], 10);
            a = "auto" === c[1] ? e / b.width * b.height : W(c[1]) ? (a.height - (d || b).height) * parseFloat(c[1]) / 100 : parseInt(c[1], 10);
            "auto" === c[0] && (e = a / b.height * b.width);
            return {
                left: e,
                top: a
            }
        };
        l.prototype.parseBackgroundRepeat = function (a) {
            return this.cssList("backgroundRepeat", a)[0]
        };
        l.prototype.parseTextShadows = function () {
            var a = this.css("textShadow"),
            b = [];
            if (a && "none" !== a)
                for (var a = a.match(this.TEXT_SHADOW_PROPERTY),
                    c = 0; a && c < a.length; c++) {
                    var d = a[c].match(this.TEXT_SHADOW_VALUES);
                    b.push({
                        color: new t(d[0]),
                        offsetX: d[1] ? parseFloat(d[1].replace("px", "")) : 0,
                        offsetY: d[2] ? parseFloat(d[2].replace("px", "")) : 0,
                        blur: d[3] ? d[3].replace("px", "") : 0
                    })
                }
            return b
        };
        l.prototype.parseTransform = function () {
            if (!this.transformData)
                if (this.hasTransform()) {
                    var a = this.parseBounds(),
                    b = this.prefixedCss("transformOrigin").split(" ").map(Wa).map(Xa);
                    b[0] += a.left;
                    b[1] += a.top;
                    this.transformData = {
                        origin: b,
                        matrix: this.parseTransformMatrix()
                    }
                } else
                    this.transformData = {
                        origin: [0, 0],
                        matrix: [1, 0, 0, 1, 0, 0]
                    };
            return this.transformData
        };
        l.prototype.parseTransformMatrix = function () {
            if (!this.transformMatrix) {
                var a = this.prefixedCss("transform");
                this.transformMatrix = (a = a ? Va(a.match(this.MATRIX_PROPERTY)) : null) ? a : [1, 0, 0, 1, 0, 0]
            }
            return this.transformMatrix
        };
        l.prototype.parseBounds = function () {
            return this.bounds || (this.bounds = this.hasTransform() ? ca(this.node) : U(this.node))
        };
        l.prototype.hasTransform = function () {
            return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent &&
            this.parent.hasTransform()
        };
        l.prototype.getValue = function () {
            var a = this.node.value || "";
            "SELECT" === this.node.tagName ? (a = this.node, a = (a = a.options[a.selectedIndex || 0]) ? a.text || "" : "") : "password" === this.node.type && (a = Array(a.length + 1).join("\u2022"));
            return 0 === a.length ? this.node.placeholder || "" : a
        };
        l.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/;
        l.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
        l.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
        l.prototype.CLIP =
            /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;
        n.prototype.calculateOverflowClips = function () {
            this.nodes.forEach(function (a) {
                if (O(a)) {
                    !0 === a.isPseudoElement && a.appendToDOM();
                    a.borders = this.parseBorders(a);
                    var b = "hidden" === a.css("overflow") ? [a.borders.clip] : [],
                    c = a.parseClip();
                    c && -1 !== ["absolute", "fixed"].indexOf(a.css("position")) && b.push([["rect", a.bounds.left + c.left, a.bounds.top + c.top, c.right - c.left, c.bottom - c.top]]);
                    a.clip = a.parent && a.parent.clip.length ? a.parent.clip.concat(b) : b;
                    a.backgroundClip =
                        "hidden" !== a.css("overflow") ? a.clip.concat([a.borders.clip]) : a.clip;
                    !0 === a.isPseudoElement && a.cleanDOM()
                } else
                    ea(a) && (a.clip = a.parent && a.parent.clip.length ? a.parent.clip : []);
                !0 !== a.isPseudoElement && (a.bounds = null)
            }, this)
        };
        n.prototype.asyncRenderer = function (a, b, c) {
            c = c || Date.now();
            this.paint(a[this.renderIndex++]);
            a.length === this.renderIndex ? b() : c + 20 > Date.now() ? this.asyncRenderer(a, b, c) : setTimeout(X(function () {
                    this.asyncRenderer(a, b)
                }, this), 0)
        };
        n.prototype.createPseudoHideStyles = function (a) {
            this.createStyles(a,
                "." + v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
        };
        n.prototype.disableAnimations = function (a) {
            this.createStyles(a, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
        };
        n.prototype.createStyles = function (a, b) {
            var c = a.createElement("style");
            c.innerHTML = b;
            a.body.appendChild(c)
        };
        n.prototype.getPseudoElements = function (a) {
            var b = [[a]];
            if (a.node.nodeType === Node.ELEMENT_NODE) {
                var c = this.getPseudoElement(a, ":before");
                a = this.getPseudoElement(a, ":after");
                c && b.push(c);
                a && b.push(a)
            }
            return [].concat.apply([], b)
        };
        n.prototype.getPseudoElement = function (a, b) {
            var c = a.computedStyle(b);
            if (!c || !c.content || "none" === c.content || "-moz-alt-content" === c.content || "none" === c.display)
                return null;
            var d,
            e = c.content,
            f = e.substr(0, 1);
            d = f === e.substr(e.length - 1) && f.match(/'|"/) ? e.substr(1, e.length - 2) : e;
            for (var g = "url" === d.substr(0, 3), e = r.createElement(g ? "img" : "html2canvaspseudoelement"), f = new v(e, a, b), h = c.length - 1; 0 <= h; h--) {
                var k = Ya(c.item(h));
                e.style[k] = c[k]
            }
            e.className = v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
            if (g)
                return e.src = ra(d)[0].args[0], [f];
            c = r.createTextNode(d);
            e.appendChild(c);
            return [f, new I(c, f)]
        };
        n.prototype.getChildren = function (a) {
            return [].concat.apply([],
                [].filter.call(a.node.childNodes, db).map(function (b) {
                    var c = [b.nodeType === Node.TEXT_NODE ? new I(b, a) : new l(b, a)].filter(gb);
                    return b.nodeType === Node.ELEMENT_NODE && c.length && "TEXTAREA" !== b.tagName ? c[0].isElementVisible() ? c.concat(this.getChildren(c[0])) : [] : c
                }, this))
        };
        n.prototype.newStackingContext = function (a, b) {
            var c = new G(b, a.getOpacity(), a.node, a.parent);
            a.cloneTo(c);
            (b ? c.getParentStack(this) : c.parent.stack).contexts.push(c);
            a.stack = c
        };
        n.prototype.createStackingContexts = function () {
            this.nodes.forEach(function (a) {
                var b;
                if (b = O(a))
                    (b = this.isRootElement(a) || 1 > a.getOpacity()) || (b = a.css("position"), b = "auto" !== (-1 !== ["absolute", "relative", "fixed"].indexOf(b) ? a.css("zIndex") : "auto")), b = b || this.isBodyWithTransparentRoot(a) || a.hasTransform();
                b ? this.newStackingContext(a, !0) : O(a) && (P(a) && va(a) || -1 !== ["inline-block", "inline-table"].indexOf(a.css("display")) || da(a)) ? this.newStackingContext(a, !1) : a.assignStack(a.parent.stack)
            }, this)
        };
        n.prototype.isBodyWithTransparentRoot = function (a) {
            return "BODY" === a.node.nodeName && a.parent.color("backgroundColor").isTransparent()
        };
        n.prototype.isRootElement = function (a) {
            return null === a.parent
        };
        n.prototype.sortStackingContexts = function (a) {
            a.contexts.sort(eb(a.contexts.slice(0)));
            a.contexts.forEach(this.sortStackingContexts, this)
        };
        n.prototype.parseTextBounds = function (a) {
            return function (b, c, d) {
                if ("none" !== a.parent.css("textDecoration").substr(0, 4) || 0 !== b.trim().length) {
                    if (this.support.rangeBounds && !a.parent.hasTransform())
                        return c = d.slice(0, c).join("").length, this.getRangeBounds(a.node, c, b.length);
                    if (a.node && "string" === typeof a.node.data)
                        return b =
                            a.node.splitText(b.length), c = this.getWrapperBounds(a.node, a.parent.hasTransform()), a.node = b, c
                } else if (!this.support.rangeBounds || a.parent.hasTransform())
                    a.node = a.node.splitText(b.length);
                return {}
            }
        };
        n.prototype.getWrapperBounds = function (a, b) {
            var c = a.ownerDocument.createElement("html2canvaswrapper"),
            d = a.parentNode,
            e = a.cloneNode(!0);
            c.appendChild(a.cloneNode(!0));
            d.replaceChild(c, a);
            var f = b ? ca(c) : U(c);
            d.replaceChild(e, c);
            return f
        };
        n.prototype.getRangeBounds = function (a, b, c) {
            var d = this.range || (this.range =
                        a.ownerDocument.createRange());
            d.setStart(a, b);
            d.setEnd(a, b + c);
            return d.getBoundingClientRect()
        };
        n.prototype.parse = function (a) {
            var b = a.contexts.filter(Za),
            c = a.children.filter(O),
            d = c.filter(Q(da)),
            e = d.filter(Q(P)).filter(Q(wa)),
            c = c.filter(Q(P)).filter(da),
            f = d.filter(Q(P)).filter(wa),
            d = a.contexts.concat(d.filter(P)).filter(va),
            g = a.children.filter(ea).filter(ab);
            a = a.contexts.filter($a);
            b.concat(e).concat(c).concat(f).concat(d).concat(g).concat(a).forEach(function (a) {
                this.renderQueue.push(a);
                a instanceof
                G && (this.parse(a), this.renderQueue.push(new sa))
            }, this)
        };
        n.prototype.paint = function (a) {
            try {
                a instanceof sa ? this.renderer.ctx.restore() : ea(a) ? (!0 === a.parent.isPseudoElement && a.parent.appendToDOM(), this.paintText(a), !0 === a.parent.isPseudoElement && a.parent.cleanDOM()) : this.paintNode(a)
            } catch (b) {
                if (q(b), this.options.strict)
                    throw b;
            }
        };
        n.prototype.paintNode = function (a) {
            a instanceof G && (this.renderer.setOpacity(a.opacity), this.renderer.ctx.save(), a.hasTransform() && this.renderer.setTransform(a.parseTransform()));
            "INPUT" === a.node.nodeName && "checkbox" === a.node.type ? this.paintCheckbox(a) : "INPUT" === a.node.nodeName && "radio" === a.node.type ? this.paintRadio(a) : this.paintElement(a)
        };
        n.prototype.paintElement = function (a) {
            var b = a.parseBounds();
            this.renderer.clip(a.backgroundClip, function () {
                this.renderer.renderBackground(a, b, a.borders.borders.map(fb))
            }, this);
            this.renderer.clip(a.clip, function () {
                this.renderer.renderBorders(a.borders.borders)
            }, this);
            this.renderer.clip(a.backgroundClip, function () {
                switch (a.node.nodeName) {
                case "svg":
                case "IFRAME":
                    var c =
                        this.images.get(a.node);
                    c ? this.renderer.renderImage(a, b, a.borders, c) : q("Error loading <" + a.node.nodeName + ">", a.node);
                    break;
                case "IMG":
                    (c = this.images.get(a.node.src)) ? this.renderer.renderImage(a, b, a.borders, c) : q("Error loading <img>", a.node.src);
                    break;
                case "CANVAS":
                    this.renderer.renderImage(a, b, a.borders, {
                        image: a.node
                    });
                    break;
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                    this.paintFormValue(a)
                }
            }, this)
        };
        n.prototype.paintCheckbox = function (a) {
            var b = a.parseBounds(),
            c = Math.min(b.width, b.height),
            d = {
                width: c -
                1,
                height: c - 1,
                top: b.top,
                left: b.left
            },
            b = [3, 3],
            e = [b, b, b, b],
            f = [1, 1, 1, 1].map(function (a) {
                return {
                    color: new t("#A5A5A5"),
                    width: a
                }
            }),
            g = ua(d, e, f);
            this.renderer.clip(a.backgroundClip, function () {
                this.renderer.rectangle(d.left + 1, d.top + 1, d.width - 2, d.height - 2, new t("#DEDEDE"));
                this.renderer.renderBorders(ta(f, d, g, e));
                a.node.checked && (this.renderer.font(new t("#424242"), "normal", "normal", "bold", c - 3 + "px", "arial"), this.renderer.text("\u2714", d.left + c / 6, d.top + c - 1))
            }, this)
        };
        n.prototype.paintRadio = function (a) {
            var b =
                a.parseBounds(),
            c = Math.min(b.width, b.height) - 2;
            this.renderer.clip(a.backgroundClip, function () {
                this.renderer.circleStroke(b.left + 1, b.top + 1, c, new t("#DEDEDE"), 1, new t("#A5A5A5"));
                a.node.checked && this.renderer.circle(Math.ceil(b.left + c / 4) + 1, Math.ceil(b.top + c / 4) + 1, Math.floor(c / 2), new t("#424242"))
            }, this)
        };
        n.prototype.paintFormValue = function (a) {
            var b = a.getValue();
            if (0 < b.length) {
                var c = a.node.ownerDocument,
                d = c.createElement("html2canvaswrapper");
                "lineHeight textAlign fontFamily fontWeight fontSize color paddingLeft paddingTop paddingRight paddingBottom width height borderLeftStyle borderTopStyle borderLeftWidth borderTopWidth boxSizing whiteSpace wordWrap".split(" ").forEach(function (b) {
                    try {
                        d.style[b] =
                            a.css(b)
                    } catch (c) {
                        q("html2canvas: Parse: Exception caught in renderFormValue: " + c.message)
                    }
                });
                var e = a.parseBounds();
                d.style.position = "fixed";
                d.style.left = e.left + "px";
                d.style.top = e.top + "px";
                d.textContent = b;
                c.body.appendChild(d);
                this.paintText(new I(d.firstChild, a));
                c.body.removeChild(d)
            }
        };
        n.prototype.paintText = function (a) {
            a.applyTextTransform();
            var b = m.html2canvas.punycode.ucs2.decode(a.node.data),
            c = this.options.letterRendering && !/^(normal|none|0px)$/.test(a.parent.css("letterSpacing")) || /[^\u0000-\u00ff]/.test(a.node.data) ?
                b.map(function (a) {
                    return m.html2canvas.punycode.ucs2.encode([a])
                }) : hb(b),
            b = a.parent.fontWeight(),
            d = a.parent.css("fontSize"),
            e = a.parent.css("fontFamily"),
            f = a.parent.parseTextShadows();
            this.renderer.font(a.parent.color("color"), a.parent.css("fontStyle"), a.parent.css("fontVariant"), b, d, e);
            f.length ? this.renderer.fontShadow(f[0].color, f[0].offsetX, f[0].offsetY, f[0].blur) : this.renderer.clearShadow();
            this.renderer.clip(a.parent.clip, function () {
                c.map(this.parseTextBounds(a), this).forEach(function (b, f) {
                    b &&
                    (this.renderer.text(c[f], b.left, b.bottom), this.renderTextDecoration(a.parent, b, this.fontMetrics.getMetrics(e, d)))
                }, this)
            }, this)
        };
        n.prototype.renderTextDecoration = function (a, b, c) {
            switch (a.css("textDecoration").split(" ")[0]) {
            case "underline":
                this.renderer.rectangle(b.left, Math.round(b.top + c.baseline + c.lineWidth), b.width, 1, a.color("color"));
                break;
            case "overline":
                this.renderer.rectangle(b.left, Math.round(b.top), b.width, 1, a.color("color"));
                break;
            case "line-through":
                this.renderer.rectangle(b.left, Math.ceil(b.top +
                        c.middle + c.lineWidth), b.width, 1, a.color("color"))
            }
        };
        var Ja = {
            inset: [["darken", .6], ["darken", .1], ["darken", .1], ["darken", .6]]
        };
        n.prototype.parseBorders = function (a) {
            var b = a.parseBounds(),
            c = bb(a),
            d = ["Top", "Right", "Bottom", "Left"].map(function (b, c) {
                var d = a.css("border" + b + "Style"),
                e = a.color("border" + b + "Color");
                "inset" === d && e.isBlack() && (e = new t([255, 255, 255, e.a]));
                d = Ja[d] ? Ja[d][c] : null;
                return {
                    width: a.cssInt("border" + b + "Width"),
                    color: d ? e[d[0]](d[1]) : e,
                    args: null
                }
            }),
            e = ua(b, c, d);
            return {
                clip: this.parseBackgroundClip(a,
                    e, d, c, b),
                borders: ta(d, b, e, c)
            }
        };
        n.prototype.parseBackgroundClip = function (a, b, c, d, e) {
            var f = [];
            switch (a.css("backgroundClip")) {
            case "content-box":
            case "padding-box":
                D(f, d[0], d[1], b.topLeftInner, b.topRightInner, e.left + c[3].width, e.top + c[0].width);
                D(f, d[1], d[2], b.topRightInner, b.bottomRightInner, e.left + e.width - c[1].width, e.top + c[0].width);
                D(f, d[2], d[3], b.bottomRightInner, b.bottomLeftInner, e.left + e.width - c[1].width, e.top + e.height - c[2].width);
                D(f, d[3], d[0], b.bottomLeftInner, b.topLeftInner, e.left + c[3].width,
                    e.top + e.height - c[2].width);
                break;
            default:
                D(f, d[0], d[1], b.topLeftOuter, b.topRightOuter, e.left, e.top),
                D(f, d[1], d[2], b.topRightOuter, b.bottomRightOuter, e.left + e.width, e.top),
                D(f, d[2], d[3], b.bottomRightOuter, b.bottomLeftOuter, e.left + e.width, e.top + e.height),
                D(f, d[3], d[0], b.bottomLeftOuter, b.topLeftOuter, e.left, e.top + e.height)
            }
            return f
        };
        var jb = 0,
        ya = "withCredentials" in new XMLHttpRequest,
        Da = "crossOrigin" in new Image;
        v.prototype.cloneTo = function (a) {
            v.prototype.cloneTo.call(this, a);
            a.isPseudoElement = !0;
            a.before =
                this.before
        };
        v.prototype = Object.create(l.prototype);
        v.prototype.appendToDOM = function () {
            this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node);
            this.parent.node.className += " " + this.getHideClass()
        };
        v.prototype.cleanDOM = function () {
            this.node.parentNode.removeChild(this.node);
            this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
        };
        v.prototype.getHideClass = function () {
            return this["PSEUDO_HIDE_ELEMENT_CLASS_" +
                (this.before ? "BEFORE" : "AFTER")]
        };
        v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
        v.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";
        x.prototype.renderImage = function (a, b, c, d) {
            var e = a.cssInt("paddingLeft"),
            f = a.cssInt("paddingTop"),
            g = a.cssInt("paddingRight");
            a = a.cssInt("paddingBottom");
            c = c.borders;
            g = b.width - (c[1].width + c[3].width + e + g);
            a = b.height - (c[0].width + c[2].width + f + a);
            this.drawImage(d, 0, 0, d.image.width || g, d.image.height || a, b.left +
                e + c[3].width, b.top + f + c[0].width, g, a)
        };
        x.prototype.renderBackground = function (a, b, c) {
            0 < b.height && 0 < b.width && (this.renderBackgroundColor(a, b), this.renderBackgroundImage(a, b, c))
        };
        x.prototype.renderBackgroundColor = function (a, b) {
            var c = a.color("backgroundColor");
            c.isTransparent() || this.rectangle(b.left, b.top, b.width, b.height, c)
        };
        x.prototype.renderBorders = function (a) {
            a.forEach(this.renderBorder, this)
        };
        x.prototype.renderBorder = function (a) {
            a.color.isTransparent() || null === a.args || this.drawShape(a.args, a.color)
        };
        x.prototype.renderBackgroundImage = function (a, b, c) {
            a.parseBackgroundImages().reverse().forEach(function (d, e, f) {
                switch (d.method) {
                case "url":
                    var g = this.images.get(d.args[0]);
                    g ? this.renderBackgroundRepeating(a, b, g, f.length - (e + 1), c) : q("Error loading background-image", d.args[0]);
                    break;
                case "linear-gradient":
                case "gradient":
                    (e = this.images.get(d.value)) ? this.renderBackgroundGradient(e, b, c) : q("Error loading background-image", d.args[0]);
                    break;
                case "none":
                    break;
                default:
                    q("Unknown background-image type", d.args[0])
                }
            },
                this)
        };
        x.prototype.renderBackgroundRepeating = function (a, b, c, d, e) {
            var f = a.parseBackgroundSize(b, c.image, d),
            g = a.parseBackgroundPosition(b, c.image, d, f);
            switch (a.parseBackgroundRepeat(d)) {
            case "repeat-x":
            case "repeat no-repeat":
                this.backgroundRepeatShape(c, g, f, b, b.left + e[3], b.top + g.top + e[0], 99999, f.height, e);
                break;
            case "repeat-y":
            case "no-repeat repeat":
                this.backgroundRepeatShape(c, g, f, b, b.left + g.left + e[3], b.top + e[0], f.width, 99999, e);
                break;
            case "no-repeat":
                this.backgroundRepeatShape(c, g, f, b, b.left + g.left +
                    e[3], b.top + g.top + e[0], f.width, f.height, e);
                break;
            default:
                this.renderBackgroundRepeat(c, g, f, {
                    top: b.top,
                    left: b.left
                }, e[3], e[0])
            }
        };
        G.prototype = Object.create(l.prototype);
        G.prototype.getParentStack = function (a) {
            var b = this.parent ? this.parent.stack : null;
            return b ? b.ownStacking ? b : b.getParentStack(a) : a.stack
        };
        T.prototype.testRangeBounds = function (a) {
            var b,
            c,
            d = !1;
            a.createRange && (b = a.createRange(), b.getBoundingClientRect && (c = a.createElement("boundtest"), c.style.height = "123px", c.style.display = "block", a.body.appendChild(c),
                    b.selectNode(c), b = b.getBoundingClientRect(), b = b.height, 123 === b && (d = !0), a.body.removeChild(c)));
            return d
        };
        T.prototype.testCORS = function () {
            return "undefined" !== typeof(new Image).crossOrigin
        };
        T.prototype.testSVG = function () {
            var a = new Image,
            b = r.createElement("canvas"),
            c = b.getContext("2d");
            a.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
            try {
                c.drawImage(a, 0, 0),
                b.toDataURL()
            } catch (d) {
                return !1
            }
            return !0
        };
        A.prototype.hasFabric = function () {
            return html2canvas.fabric ? Promise.resolve() : Promise.reject(Error("html2canvas.svg.js is not loaded, cannot render svg"))
        };
        A.prototype.inlineFormatting = function (a) {
            return /^data:image\/svg\+xml;base64,/.test(a) ? this.decode64(this.removeContentType(a)) : this.removeContentType(a)
        };
        A.prototype.removeContentType = function (a) {
            return a.replace(/^data:image\/svg\+xml(;base64)?,/, "")
        };
        A.prototype.isInline = function (a) {
            return /^data:image\/svg\+xml/i.test(a)
        };
        A.prototype.createCanvas = function (a) {
            var b = this;
            return function (c, d) {
                var e = new html2canvas.fabric.StaticCanvas("c");
                b.image = e.lowerCanvasEl;
                e.setWidth(d.width).setHeight(d.height).add(html2canvas.fabric.util.groupSVGElements(c,
                        d)).renderAll();
                a(e.lowerCanvasEl)
            }
        };
        A.prototype.decode64 = function (a) {
            return "function" === typeof m.atob ? m.atob(a) : Ca(a)
        };
        Ea.prototype = Object.create(A.prototype);
        I.prototype = Object.create(l.prototype);
        I.prototype.applyTextTransform = function () {
            this.node.data = this.transform(this.parent.css("textTransform"))
        };
        I.prototype.transform = function (a) {
            var b = this.node.data;
            switch (a) {
            case "lowercase":
                return b.toLowerCase();
            case "capitalize":
                return b.replace(/(^|\s|:|-|\(|\))([a-z])/g, lb);
            case "uppercase":
                return b.toUpperCase();
            default:
                return b
            }
        };
        Fa.prototype = Object.create(N.prototype);
        p.prototype = Object.create(x.prototype);
        p.prototype.setFillStyle = function (a) {
            this.ctx.fillStyle = "object" === typeof a && a.isColor ? a.toString() : a;
            return this.ctx
        };
        p.prototype.rectangle = function (a, b, c, d, e) {
            this.setFillStyle(e).fillRect(a, b, c, d)
        };
        p.prototype.circle = function (a, b, c, d) {
            this.setFillStyle(d);
            this.ctx.beginPath();
            this.ctx.arc(a + c / 2, b + c / 2, c / 2, 0, 2 * Math.PI, !0);
            this.ctx.closePath();
            this.ctx.fill()
        };
        p.prototype.circleStroke = function (a, b, c,
            d, e, f) {
            this.circle(a, b, c, d);
            this.ctx.strokeStyle = f.toString();
            this.ctx.stroke()
        };
        p.prototype.drawShape = function (a, b) {
            this.shape(a);
            this.setFillStyle(b).fill()
        };
        p.prototype.taints = function (a) {
            if (null === a.tainted) {
                this.taintCtx.drawImage(a.image, 0, 0);
                try {
                    this.taintCtx.getImageData(0, 0, 1, 1),
                    a.tainted = !1
                } catch (b) {
                    this.taintCtx = r.createElement("canvas").getContext("2d"),
                    a.tainted = !0
                }
            }
            return a.tainted
        };
        p.prototype.drawImage = function (a, b, c, d, e, f, g, h, k) {
            this.taints(a) && !this.options.allowTaint || this.ctx.drawImage(a.image,
                b, c, d, e, f, g, h, k)
        };
        p.prototype.clip = function (a, b, c) {
            this.ctx.save();
            a.filter(mb).forEach(function (a) {
                this.shape(a).clip()
            }, this);
            b.call(c);
            this.ctx.restore()
        };
        p.prototype.shape = function (a) {
            this.ctx.beginPath();
            a.forEach(function (a, c) {
                "rect" === a[0] ? this.ctx.rect.apply(this.ctx, a.slice(1)) : this.ctx[0 === c ? "moveTo" : a[0] + "To"].apply(this.ctx, a.slice(1))
            }, this);
            this.ctx.closePath();
            return this.ctx
        };
        p.prototype.font = function (a, b, c, d, e, f) {
            this.setFillStyle(a).font = [b, c, d, e, f].join(" ").split(",")[0]
        };
        p.prototype.fontShadow =
        function (a, b, c, d) {
            this.setVariable("shadowColor", a.toString()).setVariable("shadowOffsetY", b).setVariable("shadowOffsetX", c).setVariable("shadowBlur", d)
        };
        p.prototype.clearShadow = function () {
            this.setVariable("shadowColor", "rgba(0,0,0,0)")
        };
        p.prototype.setOpacity = function (a) {
            this.ctx.globalAlpha = a
        };
        p.prototype.setTransform = function (a) {
            this.ctx.translate(a.origin[0], a.origin[1]);
            this.ctx.transform.apply(this.ctx, a.matrix);
            this.ctx.translate(-a.origin[0], -a.origin[1])
        };
        p.prototype.setVariable = function (a,
            b) {
            this.variables[a] !== b && (this.variables[a] = this.ctx[a] = b);
            return this
        };
        p.prototype.text = function (a, b, c) {
            this.ctx.fillText(a, b, c)
        };
        p.prototype.backgroundRepeatShape = function (a, b, c, d, e, f, g, h, k) {
            this.clip([[["line", Math.round(e), Math.round(f)], ["line", Math.round(e + g), Math.round(f)], ["line", Math.round(e + g), Math.round(h + f)], ["line", Math.round(e), Math.round(h + f)]]], function () {
                this.renderBackgroundRepeat(a, b, c, d, k[3], k[0])
            }, this)
        };
        p.prototype.renderBackgroundRepeat = function (a, b, c, d, e, f) {
            e = Math.round(d.left +
                    b.left + e);
            b = Math.round(d.top + b.top + f);
            this.setFillStyle(this.ctx.createPattern(this.resizeImage(a, c), "repeat"));
            this.ctx.translate(e, b);
            this.ctx.fill();
            this.ctx.translate(-e, -b)
        };
        p.prototype.renderBackgroundGradient = function (a, b) {
            if (a instanceof V) {
                var c = this.ctx.createLinearGradient(b.left + b.width * a.x0, b.top + b.height * a.y0, b.left + b.width * a.x1, b.top + b.height * a.y1);
                a.colorStops.forEach(function (a) {
                    c.addColorStop(a.stop, a.color.toString())
                });
                this.rectangle(b.left, b.top, b.width, b.height, c)
            }
        };
        p.prototype.resizeImage =
        function (a, b) {
            var c = a.image;
            if (c.width === b.width && c.height === b.height)
                return c;
            var d = r.createElement("canvas");
            d.width = b.width;
            d.height = b.height;
            d.getContext("2d").drawImage(c, 0, 0, c.width, c.height, 0, 0, b.width, b.height);
            return d
        }
    }
}).call({}, "undefined" !== typeof window ? window : void 0, "undefined" !== typeof document ? document : void 0);

/*
Use it if you like it
 */
(function (A) {
    function E(K) {
        this.ok = !1;
        "#" == K.charAt(0) && (K = K.substr(1, 6));
        K = K.replace(/ /g, "");
        K = K.toLowerCase();
        var A = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "00ffff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000000",
            blanchedalmond: "ffebcd",
            blue: "0000ff",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "00ffff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dodgerblue: "1e90ff",
            feldspar: "d19275",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "ff00ff",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgrey: "d3d3d3",
            lightgreen: "90ee90",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslateblue: "8470ff",
            lightslategray: "778899",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "00ff00",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "ff00ff",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370d8",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "d87093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "ff0000",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            violetred: "d02090",
            wheat: "f5deb3",
            white: "ffffff",
            whitesmoke: "f5f5f5",
            yellow: "ffff00",
            yellowgreen: "9acd32"
        },
        O;
        for (O in A)
            K == O && (K = A[O]);
        var L = [{
                re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
                process: function (u) {
                    return [parseInt(u[1]), parseInt(u[2]), parseInt(u[3])]
                }
            }, {
                re: /^(\w{2})(\w{2})(\w{2})$/,
                example: ["#00ff00", "336699"],
                process: function (u) {
                    return [parseInt(u[1], 16), parseInt(u[2], 16), parseInt(u[3], 16)]
                }
            }, {
                re: /^(\w{1})(\w{1})(\w{1})$/,
                example: ["#fb0", "f0f"],
                process: function (u) {
                    return [parseInt(u[1] + u[1], 16), parseInt(u[2] + u[2], 16), parseInt(u[3] + u[3], 16)]
                }
            }
        ];
        for (O = 0; O < L.length; O++) {
            var W = L[O].process,
            M = L[O].re.exec(K);
            M && (channels = W(M), this.r = channels[0], this.g = channels[1], this.b = channels[2], this.ok = !0)
        }
        this.r = 0 > this.r || isNaN(this.r) ? 0 : 255 < this.r ? 255 : this.r;
        this.g = 0 > this.g || isNaN(this.g) ? 0 :
            255 < this.g ? 255 : this.g;
        this.b = 0 > this.b || isNaN(this.b) ? 0 : 255 < this.b ? 255 : this.b;
        this.toRGB = function () {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
        };
        this.toHex = function () {
            var u = this.r.toString(16),
            B = this.g.toString(16),
            p = this.b.toString(16);
            1 == u.length && (u = "0" + u);
            1 == B.length && (B = "0" + B);
            1 == p.length && (p = "0" + p);
            return "#" + u + B + p
        };
        this.getHelpXML = function () {
            for (var u = [], B = 0; B < L.length; B++)
                for (var p = L[B].example, C = 0; C < p.length; C++)
                    u[u.length] = p[C];
            for (var w in A)
                u[u.length] = w;
            p = document.createElement("ul");
            p.setAttribute("id", "rgbcolor-examples");
            for (B = 0; B < u.length; B++)
                try {
                    var h = document.createElement("li"),
                    a = new E(u[B]),
                    l = document.createElement("div");
                    l.style.cssText = "margin: 3px; border: 1px solid black; background:" + a.toHex() + "; color:" + a.toHex();
                    l.appendChild(document.createTextNode("test"));
                    var c = document.createTextNode(" " + u[B] + " -> " + a.toRGB() + " -> " + a.toHex());
                    h.appendChild(l);
                    h.appendChild(c);
                    p.appendChild(h)
                } catch (b) {}
            return p
        }
    }
    "undefined" !== typeof define && define.amd ? define(function () {
        return E
    }) :
    "undefined" !== typeof module && module.exports && (module.exports = E);
    A.RGBColor = E
})("undefined" !== typeof window ? window : this);
(function (A) {
    function E(M, u, B, p, C, w) {
        if (!(isNaN(w) || 1 > w)) {
            w |= 0;
            M = document.getElementById(M).getContext("2d");
            var h;
            try {
                try {
                    h = M.getImageData(u, B, p, C)
                } catch (A) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),
                        h = M.getImageData(u, B, p, C)
                    } catch (K) {
                        throw alert("Cannot access local image"),
                        Error("unable to access local image data: " + K);
                    }
                }
            } catch (A) {
                throw alert("Cannot access image"),
                Error("unable to access image data: " + A);
            }
            for (var a = h.data, l = h.width * h.height * 4, c = 0; c < l; c += 4) {
                var b =
                    a[c + 3] / 255;
                a[c] *= b;
                a[c + 1] *= b;
                a[c + 2] *= b
            }
            var a = h.data,
            e,
            d,
            k,
            f,
            g,
            n,
            m,
            v,
            z,
            H,
            q,
            F,
            r,
            G,
            D,
            N,
            P,
            S,
            y,
            I,
            J,
            t,
            E;
            e = w + w + 1;
            var R = p - 1,
            l = C - 1,
            c = w + 1,
            b = c * (c + 1) / 2,
            Q = new X,
            x = Q;
            for (k = 1; k < e; k++)
                if (x = x.next = new X, k == c)
                    var T = x;
            x.next = Q;
            n = g = 0;
            var U = O[w],
            V = L[w];
            for (d = 0; d < C; d++) {
                D = N = P = S = m = v = z = H = 0;
                q = c * (y = a[g]);
                F = c * (I = a[g + 1]);
                r = c * (J = a[g + 2]);
                G = c * (t = a[g + 3]);
                m += b * y;
                v += b * I;
                z += b * J;
                H += b * t;
                x = Q;
                for (k = 0; k < c; k++)
                    x.r = y, x.g = I, x.b = J, x.a = t, x = x.next;
                for (k = 1; k < c; k++)
                    f = g + ((R < k ? R : k) << 2), m += (x.r = y = a[f]) * (E = c - k), v += (x.g = I = a[f + 1]) * E, z += (x.b = J = a[f + 2]) *
                    E, H += (x.a = t = a[f + 3]) * E, D += y, N += I, P += J, S += t, x = x.next;
                k = Q;
                x = T;
                for (e = 0; e < p; e++)
                    a[g] = m * U >> V, a[g + 1] = v * U >> V, a[g + 2] = z * U >> V, a[g + 3] = H * U >> V, m -= q, v -= F, z -= r, H -= G, q -= k.r, F -= k.g, r -= k.b, G -= k.a, f = n + ((f = e + w + 1) < R ? f : R) << 2, D += k.r = a[f], N += k.g = a[f + 1], P += k.b = a[f + 2], S += k.a = a[f + 3], m += D, v += N, z += P, H += S, k = k.next, q += y = x.r, F += I = x.g, r += J = x.b, G += t = x.a, D -= y, N -= I, P -= J, S -= t, x = x.next, g += 4;
                n += p
            }
            for (e = 0; e < p; e++) {
                N = P = S = D = v = z = H = m = 0;
                g = e << 2;
                q = c * (y = a[g]);
                F = c * (I = a[g + 1]);
                r = c * (J = a[g + 2]);
                G = c * (t = a[g + 3]);
                m += b * y;
                v += b * I;
                z += b * J;
                H += b * t;
                x = Q;
                for (k = 0; k <
                    c; k++)
                    x.r = y, x.g = I, x.b = J, x.a = t, x = x.next;
                f = p;
                for (k = 1; k <= w; k++)
                    g = f + e << 2, m += (x.r = y = a[g]) * (E = c - k), v += (x.g = I = a[g + 1]) * E, z += (x.b = J = a[g + 2]) * E, H += (x.a = t = a[g + 3]) * E, D += y, N += I, P += J, S += t, x = x.next, k < l && (f += p);
                g = e;
                k = Q;
                x = T;
                for (d = 0; d < C; d++)
                    f = g << 2, a[f] = m * U >> V, a[f + 1] = v * U >> V, a[f + 2] = z * U >> V, a[f + 3] = H * U >> V, m -= q, v -= F, z -= r, H -= G, q -= k.r, F -= k.g, r -= k.b, G -= k.a, f = e + ((f = d + c) < l ? f : l) * p << 2, m += D += k.r = a[f], v += N += k.g = a[f + 1], z += P += k.b = a[f + 2], H += S += k.a = a[f + 3], k = k.next, q += y = x.r, F += I = x.g, r += J = x.b, G += t = x.a, D -= y, N -= I, P -= J, S -= t, x = x.next, g += p
            }
            p =
                h.data;
            C = h.width * h.height * 4;
            for (w = 0; w < C; w += 4)
                T = p[w + 3], 0 != T && (T = 255 / T, p[w] *= T, p[w + 1] *= T, p[w + 2] *= T);
            M.putImageData(h, u, B)
        }
    }
    function K(M, u, B, p, C, w) {
        if (!(isNaN(w) || 1 > w)) {
            w |= 0;
            M = document.getElementById(M).getContext("2d");
            var h;
            try {
                try {
                    h = M.getImageData(u, B, p, C)
                } catch (x) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),
                        h = M.getImageData(u, B, p, C)
                    } catch (E) {
                        throw alert("Cannot access local image"),
                        Error("unable to access local image data: " + E);
                    }
                }
            } catch (x) {
                throw alert("Cannot access image"),
                Error("unable to access image data: " + x);
            }
            var a = h.data,
            l,
            c,
            b,
            e,
            d,
            k,
            f,
            g,
            n,
            m,
            v,
            z,
            H,
            q,
            F,
            r,
            G,
            D,
            N;
            l = w + w + 1;
            var P = p - 1,
            A = C - 1,
            y = w + 1,
            I = y * (y + 1) / 2,
            J = new X,
            t = J;
            for (b = 1; b < l; b++)
                if (t = t.next = new X, b == y)
                    var K = t;
            t.next = J;
            k = d = 0;
            var R = O[w],
            Q = L[w];
            for (c = 0; c < C; c++) {
                H = q = F = f = g = n = 0;
                m = y * (r = a[d]);
                v = y * (G = a[d + 1]);
                z = y * (D = a[d + 2]);
                f += I * r;
                g += I * G;
                n += I * D;
                t = J;
                for (b = 0; b < y; b++)
                    t.r = r, t.g = G, t.b = D, t = t.next;
                for (b = 1; b < y; b++)
                    e = d + ((P < b ? P : b) << 2), f += (t.r = r = a[e]) * (N = y - b), g += (t.g = G = a[e + 1]) * N, n += (t.b = D = a[e + 2]) * N, H += r, q += G, F += D, t = t.next;
                b = J;
                t = K;
                for (l =
                        0; l < p; l++)
                    a[d] = f * R >> Q, a[d + 1] = g * R >> Q, a[d + 2] = n * R >> Q, f -= m, g -= v, n -= z, m -= b.r, v -= b.g, z -= b.b, e = k + ((e = l + w + 1) < P ? e : P) << 2, H += b.r = a[e], q += b.g = a[e + 1], F += b.b = a[e + 2], f += H, g += q, n += F, b = b.next, m += r = t.r, v += G = t.g, z += D = t.b, H -= r, q -= G, F -= D, t = t.next, d += 4;
                k += p
            }
            for (l = 0; l < p; l++) {
                q = F = H = g = n = f = 0;
                d = l << 2;
                m = y * (r = a[d]);
                v = y * (G = a[d + 1]);
                z = y * (D = a[d + 2]);
                f += I * r;
                g += I * G;
                n += I * D;
                t = J;
                for (b = 0; b < y; b++)
                    t.r = r, t.g = G, t.b = D, t = t.next;
                e = p;
                for (b = 1; b <= w; b++)
                    d = e + l << 2, f += (t.r = r = a[d]) * (N = y - b), g += (t.g = G = a[d + 1]) * N, n += (t.b = D = a[d + 2]) * N, H += r, q += G, F += D, t = t.next,
                    b < A && (e += p);
                d = l;
                b = J;
                t = K;
                for (c = 0; c < C; c++)
                    e = d << 2, a[e] = f * R >> Q, a[e + 1] = g * R >> Q, a[e + 2] = n * R >> Q, f -= m, g -= v, n -= z, m -= b.r, v -= b.g, z -= b.b, e = l + ((e = c + y) < A ? e : A) * p << 2, f += H += b.r = a[e], g += q += b.g = a[e + 1], n += F += b.b = a[e + 2], b = b.next, m += r = t.r, v += G = t.g, z += D = t.b, H -= r, q -= G, F -= D, t = t.next, d += p
            }
            M.putImageData(h, u, B)
        }
    }
    function X() {
        this.a = this.b = this.g = this.r = 0;
        this.next = null
    }
    var O = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364,
        345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312,
        309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
    L = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
    W = {
        image: function (A, u, B, p) {
            A = document.getElementById(A);
            var C = A.naturalWidth,
            w = A.naturalHeight,
            h = document.getElementById(u);
            h.style.width = C + "px";
            h.style.height = w + "px";
            h.width = C;
            h.height = w;
            h = h.getContext("2d");
            h.clearRect(0, 0, C, w);
            h.drawImage(A, 0, 0);
            isNaN(B) || 1 > B || (p ? E(u, 0, 0, C, w, B) : K(u, 0, 0, C, w, B))
        },
        canvasRGBA: E,
        canvasRGB: K
    };
    "undefined" !== typeof define && define.amd ? define(function () {
        return W
    }) :
    "undefined" !== typeof module && module.exports && (module.exports = W);
    A.stackBlur = W
})("undefined" !== typeof window ? window : this);
(function (A, E) {
    A.canvg = E(A.RGBColor, A.stackBlur)
})("undefined" !== typeof window ? window : this, function (A, E) {
    function K(h) {
        var a = [0, 0, 0],
        l = function (c, b) {
            var e = h.match(c);
            null != e && (a[b] += e.length, h = h.replace(c, " "))
        };
        h = h.replace(/:not\(([^\)]*)\)/g, "     $1 ");
        h = h.replace(/{[\s\S]*/gm, " ");
        l(W, 1);
        l(M, 0);
        l(u, 1);
        l(B, 2);
        l(p, 1);
        l(C, 1);
        h = h.replace(/[\*\s\+>~]/g, " ");
        h = h.replace(/[#\.]/g, " ");
        l(w, 2);
        return a.join("")
    }
    function X(h) {
        var a = {
            opts: h,
            FRAMERATE: 30,
            MAX_VIRTUAL_PIXELS: 3E4,
            log: function (a) {}
        };
        1 == a.opts.log &&
        "undefined" != typeof console && (a.log = function (a) {
            console.log(a)
        });
        a.init = function (c) {
            var b = 0;
            a.UniqueId = function () {
                b++;
                return "canvg" + b
            };
            a.Definitions = {};
            a.Styles = {};
            a.StylesSpecificity = {};
            a.Animations = [];
            a.Images = [];
            a.ctx = c;
            a.ViewPort = new function () {
                this.viewPorts = [];
                this.Clear = function () {
                    this.viewPorts = []
                };
                this.SetCurrent = function (a, b) {
                    this.viewPorts.push({
                        width: a,
                        height: b
                    })
                };
                this.RemoveCurrent = function () {
                    this.viewPorts.pop()
                };
                this.Current = function () {
                    return this.viewPorts[this.viewPorts.length - 1]
                };
                this.width = function () {
                    return this.Current().width
                };
                this.height = function () {
                    return this.Current().height
                };
                this.ComputeSize = function (a) {
                    return null != a && "number" == typeof a ? a : "x" == a ? this.width() : "y" == a ? this.height() : Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2)
                }
            }
        };
        a.init();
        a.ImagesLoaded = function () {
            for (var c = 0; c < a.Images.length; c++)
                if (!a.Images[c].loaded)
                    return !1;
            return !0
        };
        a.trim = function (a) {
            return a.replace(/^\s+|\s+$/g, "")
        };
        a.compressSpaces = function (a) {
            return a.replace(/[\s\r\t\n]+/gm,
                " ")
        };
        a.ajax = function (a) {
            var b;
            b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
            b.open("GET", a, !1);
            b.send(null);
            return b.responseText
        };
        a.parseXml = function (a) {
            if ("undefined" != typeof Windows && "undefined" != typeof Windows.Data && "undefined" != typeof Windows.Data.Xml) {
                var b = new Windows.Data.Xml.Dom.XmlDocument,
                e = new Windows.Data.Xml.Dom.XmlLoadSettings;
                e.prohibitDtd = !1;
                b.loadXml(a, e);
                return b
            }
            if (window.DOMParser)
                return (new DOMParser).parseFromString(a, "text/xml");
            a = a.replace(/<!DOCTYPE svg[^>]*>/,
                    "");
            b = new ActiveXObject("Microsoft.XMLDOM");
            b.async = "false";
            b.loadXML(a);
            return b
        };
        a.Property = function (a, b) {
            this.name = a;
            this.value = b
        };
        a.Property.prototype.getValue = function () {
            return this.value
        };
        a.Property.prototype.hasValue = function () {
            return null != this.value && "" !== this.value
        };
        a.Property.prototype.numValue = function () {
            if (!this.hasValue())
                return 0;
            var a = parseFloat(this.value);
            (this.value + "").match(/%$/) && (a /= 100);
            return a
        };
        a.Property.prototype.valueOrDefault = function (a) {
            return this.hasValue() ? this.value :
            a
        };
        a.Property.prototype.numValueOrDefault = function (a) {
            return this.hasValue() ? this.numValue() : a
        };
        a.Property.prototype.addOpacity = function (c) {
            var b = this.value;
            if (null != c.value && "" != c.value && "string" == typeof this.value) {
                var e = new A(this.value);
                e.ok && (b = "rgba(" + e.r + ", " + e.g + ", " + e.b + ", " + c.numValue() + ")")
            }
            return new a.Property(this.name, b)
        };
        a.Property.prototype.getDefinition = function () {
            var c = this.value.match(/#([^\)'"]+)/);
            c && (c = c[1]);
            c || (c = this.value);
            return a.Definitions[c]
        };
        a.Property.prototype.isUrlDefinition =
        function () {
            return 0 == this.value.indexOf("url(")
        };
        a.Property.prototype.getFillStyleDefinition = function (c, b) {
            var e = this.getDefinition();
            if (null != e && e.createGradient)
                return e.createGradient(a.ctx, c, b);
            if (null != e && e.createPattern) {
                if (e.getHrefAttribute().hasValue()) {
                    var d = e.attribute("patternTransform"),
                    e = e.getHrefAttribute().getDefinition();
                    d.hasValue() && (e.attribute("patternTransform", !0).value = d.value)
                }
                return e.createPattern(a.ctx, c)
            }
            return null
        };
        a.Property.prototype.getDPI = function (a) {
            return 96
        };
        a.Property.prototype.getEM = function (c) {
            var b = 12,
            e = new a.Property("fontSize", a.Font.Parse(a.ctx.font).fontSize);
            e.hasValue() && (b = e.toPixels(c));
            return b
        };
        a.Property.prototype.getUnits = function () {
            return (this.value + "").replace(/[0-9\.\-]/g, "")
        };
        a.Property.prototype.toPixels = function (c, b) {
            if (!this.hasValue())
                return 0;
            var e = this.value + "";
            if (e.match(/em$/))
                return this.numValue() * this.getEM(c);
            if (e.match(/ex$/))
                return this.numValue() * this.getEM(c) / 2;
            if (e.match(/px$/))
                return this.numValue();
            if (e.match(/pt$/))
                return this.numValue() *
                this.getDPI(c) * (1 / 72);
            if (e.match(/pc$/))
                return 15 * this.numValue();
            if (e.match(/cm$/))
                return this.numValue() * this.getDPI(c) / 2.54;
            if (e.match(/mm$/))
                return this.numValue() * this.getDPI(c) / 25.4;
            if (e.match(/in$/))
                return this.numValue() * this.getDPI(c);
            if (e.match(/%$/))
                return this.numValue() * a.ViewPort.ComputeSize(c);
            e = this.numValue();
            return b && 1 > e ? e * a.ViewPort.ComputeSize(c) : e
        };
        a.Property.prototype.toMilliseconds = function () {
            if (!this.hasValue())
                return 0;
            var a = this.value + "";
            if (a.match(/s$/))
                return 1E3 * this.numValue();
            a.match(/ms$/);
            return this.numValue()
        };
        a.Property.prototype.toRadians = function () {
            if (!this.hasValue())
                return 0;
            var a = this.value + "";
            return a.match(/deg$/) ? this.numValue() * (Math.PI / 180) : a.match(/grad$/) ? this.numValue() * (Math.PI / 200) : a.match(/rad$/) ? this.numValue() : this.numValue() * (Math.PI / 180)
        };
        var l = {
            baseline: "alphabetic",
            "before-edge": "top",
            "text-before-edge": "top",
            middle: "middle",
            central: "middle",
            "after-edge": "bottom",
            "text-after-edge": "bottom",
            ideographic: "ideographic",
            alphabetic: "alphabetic",
            hanging: "hanging",
            mathematical: "alphabetic"
        };
        a.Property.prototype.toTextBaseline = function () {
            return this.hasValue() ? l[this.value] : null
        };
        a.Font = new function () {
            this.Styles = "normal|italic|oblique|inherit";
            this.Variants = "normal|small-caps|inherit";
            this.Weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
            this.CreateFont = function (b, e, d, c, f, g) {
                g = null != g ? this.Parse(g) : this.CreateFont("", "", "", "", "", a.ctx.font);
                return {
                    fontFamily: f || g.fontFamily,
                    fontSize: c || g.fontSize,
                    fontStyle: b || g.fontStyle,
                    fontWeight: d ||
                    g.fontWeight,
                    fontVariant: e || g.fontVariant,
                    toString: function () {
                        return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(" ")
                    }
                }
            };
            var c = this;
            this.Parse = function (b) {
                var e = {};
                b = a.trim(a.compressSpaces(b || "")).split(" ");
                for (var d = !1, k = !1, f = !1, g = !1, n = "", m = 0; m < b.length; m++)
                    k || -1 == c.Styles.indexOf(b[m]) ? g || -1 == c.Variants.indexOf(b[m]) ? f || -1 == c.Weights.indexOf(b[m]) ? d ? "inherit" != b[m] && (n += b[m]) : ("inherit" != b[m] && (e.fontSize = b[m].split("/")[0]), k = g = f = d = !0) : ("inherit" != b[m] &&
                        (e.fontWeight = b[m]), k = g = f = !0) : ("inherit" != b[m] && (e.fontVariant = b[m]), k = g = !0) : ("inherit" != b[m] && (e.fontStyle = b[m]), k = !0);
                "" != n && (e.fontFamily = n);
                return e
            }
        };
        a.ToNumberArray = function (c) {
            c = a.trim(a.compressSpaces((c || "").replace(/,/g, " "))).split(" ");
            for (var b = 0; b < c.length; b++)
                c[b] = parseFloat(c[b]);
            return c
        };
        a.Point = function (a, b) {
            this.x = a;
            this.y = b
        };
        a.Point.prototype.angleTo = function (a) {
            return Math.atan2(a.y - this.y, a.x - this.x)
        };
        a.Point.prototype.applyTransform = function (a) {
            var b = this.x * a[1] + this.y * a[3] +
                a[5];
            this.x = this.x * a[0] + this.y * a[2] + a[4];
            this.y = b
        };
        a.CreatePoint = function (c) {
            c = a.ToNumberArray(c);
            return new a.Point(c[0], c[1])
        };
        a.CreatePath = function (c) {
            c = a.ToNumberArray(c);
            for (var b = [], e = 0; e < c.length; e += 2)
                b.push(new a.Point(c[e], c[e + 1]));
            return b
        };
        a.BoundingBox = function (a, b, e, d) {
            this.y2 = this.x2 = this.y1 = this.x1 = Number.NaN;
            this.x = function () {
                return this.x1
            };
            this.y = function () {
                return this.y1
            };
            this.width = function () {
                return this.x2 - this.x1
            };
            this.height = function () {
                return this.y2 - this.y1
            };
            this.addPoint =
            function (a, b) {
                if (null != a) {
                    if (isNaN(this.x1) || isNaN(this.x2))
                        this.x2 = this.x1 = a;
                    a < this.x1 && (this.x1 = a);
                    a > this.x2 && (this.x2 = a)
                }
                if (null != b) {
                    if (isNaN(this.y1) || isNaN(this.y2))
                        this.y2 = this.y1 = b;
                    b < this.y1 && (this.y1 = b);
                    b > this.y2 && (this.y2 = b)
                }
            };
            this.addX = function (a) {
                this.addPoint(a, null)
            };
            this.addY = function (a) {
                this.addPoint(null, a)
            };
            this.addBoundingBox = function (a) {
                this.addPoint(a.x1, a.y1);
                this.addPoint(a.x2, a.y2)
            };
            this.addQuadraticCurve = function (a, b, e, d, c, v) {
                e = a + 2 / 3 * (e - a);
                d = b + 2 / 3 * (d - b);
                this.addBezierCurve(a,
                    b, e, e + 1 / 3 * (c - a), d, d + 1 / 3 * (v - b), c, v)
            };
            this.addBezierCurve = function (a, b, e, d, c, v, z, h) {
                var q = [a, b],
                F = [e, d],
                r = [c, v],
                l = [z, h];
                this.addPoint(q[0], q[1]);
                this.addPoint(l[0], l[1]);
                for (i = 0; 1 >= i; i++)
                    a = function (a) {
                        return Math.pow(1 - a, 3) * q[i] + 3 * Math.pow(1 - a, 2) * a * F[i] + 3 * (1 - a) * Math.pow(a, 2) * r[i] + Math.pow(a, 3) * l[i]
                    },
                b = 6 * q[i] - 12 * F[i] + 6 * r[i],
                e = -3 * q[i] + 9 * F[i] - 9 * r[i] + 3 * l[i],
                d = 3 * F[i] - 3 * q[i],
                0 == e ? 0 != b && (b = -d / b, 0 < b && 1 > b && (0 == i && this.addX(a(b)), 1 == i && this.addY(a(b)))) : (d = Math.pow(b, 2) - 4 * d * e, 0 > d || (c = (-b + Math.sqrt(d)) / (2 * e),
                        0 < c && 1 > c && (0 == i && this.addX(a(c)), 1 == i && this.addY(a(c))), b = (-b - Math.sqrt(d)) / (2 * e), 0 < b && 1 > b && (0 == i && this.addX(a(b)), 1 == i && this.addY(a(b)))))
            };
            this.isPointInBox = function (a, b) {
                return this.x1 <= a && a <= this.x2 && this.y1 <= b && b <= this.y2
            };
            this.addPoint(a, b);
            this.addPoint(e, d)
        };
        a.Transform = function (c) {
            var b = this;
            this.Type = {};
            this.Type.translate = function (b) {
                this.p = a.CreatePoint(b);
                this.apply = function (a) {
                    a.translate(this.p.x || 0, this.p.y || 0)
                };
                this.unapply = function (a) {
                    a.translate(-1 * this.p.x || 0, -1 * this.p.y || 0)
                };
                this.applyToPoint = function (a) {
                    a.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0])
                }
            };
            this.Type.rotate = function (b) {
                b = a.ToNumberArray(b);
                this.angle = new a.Property("angle", b[0]);
                this.cx = b[1] || 0;
                this.cy = b[2] || 0;
                this.apply = function (a) {
                    a.translate(this.cx, this.cy);
                    a.rotate(this.angle.toRadians());
                    a.translate(-this.cx, -this.cy)
                };
                this.unapply = function (a) {
                    a.translate(this.cx, this.cy);
                    a.rotate(-1 * this.angle.toRadians());
                    a.translate(-this.cx, -this.cy)
                };
                this.applyToPoint = function (a) {
                    var b = this.angle.toRadians();
                    a.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0]);
                    a.applyTransform([Math.cos(b), Math.sin(b), -Math.sin(b), Math.cos(b), 0, 0]);
                    a.applyTransform([1, 0, 0, 1, -this.p.x || 0, -this.p.y || 0])
                }
            };
            this.Type.scale = function (b) {
                this.p = a.CreatePoint(b);
                this.apply = function (a) {
                    a.scale(this.p.x || 1, this.p.y || this.p.x || 1)
                };
                this.unapply = function (a) {
                    a.scale(1 / this.p.x || 1, 1 / this.p.y || this.p.x || 1)
                };
                this.applyToPoint = function (a) {
                    a.applyTransform([this.p.x || 0, 0, 0, this.p.y || 0, 0, 0])
                }
            };
            this.Type.matrix = function (b) {
                this.m = a.ToNumberArray(b);
                this.apply = function (a) {
                    a.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5])
                };
                this.unapply = function (a) {
                    var b = this.m[0],
                    e = this.m[2],
                    d = this.m[4],
                    c = this.m[1],
                    f = this.m[3],
                    g = this.m[5],
                    k = 1 / (b * (1 * f - 0 * g) - e * (1 * c - 0 * g) + d * (0 * c - 0 * f));
                    a.transform(k * (1 * f - 0 * g), k * (0 * g - 1 * c), k * (0 * d - 1 * e), k * (1 * b - 0 * d), k * (e * g - d * f), k * (d * c - b * g))
                };
                this.applyToPoint = function (a) {
                    a.applyTransform(this.m)
                }
            };
            this.Type.SkewBase = function (e) {
                this.base = b.Type.matrix;
                this.base(e);
                this.angle = new a.Property("angle", e)
            };
            this.Type.SkewBase.prototype =
                new this.Type.matrix;
            this.Type.skewX = function (a) {
                this.base = b.Type.SkewBase;
                this.base(a);
                this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0]
            };
            this.Type.skewX.prototype = new this.Type.SkewBase;
            this.Type.skewY = function (a) {
                this.base = b.Type.SkewBase;
                this.base(a);
                this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0]
            };
            this.Type.skewY.prototype = new this.Type.SkewBase;
            this.transforms = [];
            this.apply = function (a) {
                for (var b = 0; b < this.transforms.length; b++)
                    this.transforms[b].apply(a)
            };
            this.unapply = function (a) {
                for (var b =
                        this.transforms.length - 1; 0 <= b; b--)
                    this.transforms[b].unapply(a)
            };
            this.applyToPoint = function (a) {
                for (var b = 0; b < this.transforms.length; b++)
                    this.transforms[b].applyToPoint(a)
            };
            c = a.trim(a.compressSpaces(c)).replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/);
            for (var e = 0; e < c.length; e++) {
                var d = a.trim(c[e].split("(")[0]),
                k = c[e].split("(")[1].replace(")", ""),
                f = this.Type[d];
                "undefined" != typeof f && (k = new f(k), k.type = d, this.transforms.push(k))
            }
        };
        a.AspectRatio = function (c, b, e, d, k,
            f, g, n, m, v) {
            b = a.compressSpaces(b);
            b = b.replace(/^defer\s/, "");
            var z = b.split(" ")[0] || "xMidYMid";
            b = b.split(" ")[1] || "meet";
            var h = e / d,
            q = k / f,
            l = Math.min(h, q),
            r = Math.max(h, q);
            "meet" == b && (d *= l, f *= l);
            "slice" == b && (d *= r, f *= r);
            m = new a.Property("refX", m);
            v = new a.Property("refY", v);
            m.hasValue() && v.hasValue() ? c.translate(-l * m.toPixels("x"), -l * v.toPixels("y")) : (z.match(/^xMid/) && ("meet" == b && l == q || "slice" == b && r == q) && c.translate(e / 2 - d / 2, 0), z.match(/YMid$/) && ("meet" == b && l == h || "slice" == b && r == h) && c.translate(0, k / 2 - f /
                    2), z.match(/^xMax/) && ("meet" == b && l == q || "slice" == b && r == q) && c.translate(e - d, 0), z.match(/YMax$/) && ("meet" == b && l == h || "slice" == b && r == h) && c.translate(0, k - f));
            "none" == z ? c.scale(h, q) : "meet" == b ? c.scale(l, l) : "slice" == b && c.scale(r, r);
            c.translate(null == g ? 0 : -g, null == n ? 0 : -n)
        };
        a.Element = {};
        a.EmptyProperty = new a.Property("EMPTY", "");
        a.Element.ElementBase = function (c) {
            this.attributes = {};
            this.styles = {};
            this.stylesSpecificity = {};
            this.children = [];
            this.attribute = function (b, e) {
                var d = this.attributes[b];
                if (null != d)
                    return d;
                1 == e && (d = new a.Property(b, ""), this.attributes[b] = d);
                return d || a.EmptyProperty
            };
            this.getHrefAttribute = function () {
                for (var b in this.attributes)
                    if ("href" == b || b.match(/:href$/))
                        return this.attributes[b];
                return a.EmptyProperty
            };
            this.style = function (b, e, d) {
                var c = this.styles[b];
                if (null != c)
                    return c;
                var f = this.attribute(b);
                if (null != f && f.hasValue())
                    return this.styles[b] = f;
                if (1 != d && (d = this.parent, null != d && (d = d.style(b), null != d && d.hasValue())))
                    return d;
                1 == e && (c = new a.Property(b, ""), this.styles[b] = c);
                return c ||
                a.EmptyProperty
            };
            this.render = function (a) {
                if ("none" != this.style("display").value && "hidden" != this.style("visibility").value) {
                    a.save();
                    if (this.style("mask").hasValue()) {
                        var b = this.style("mask").getDefinition();
                        null != b && b.apply(a, this)
                    } else
                        this.style("filter").hasValue() ? (b = this.style("filter").getDefinition(), null != b && b.apply(a, this)) : (this.setContext(a), this.renderChildren(a), this.clearContext(a));
                    a.restore()
                }
            };
            this.setContext = function (a) {};
            this.clearContext = function (a) {};
            this.renderChildren = function (a) {
                for (var b =
                        0; b < this.children.length; b++)
                    this.children[b].render(a)
            };
            this.addChild = function (b, e) {
                var d = b;
                e && (d = a.CreateElement(b));
                d.parent = this;
                "title" != d.type && this.children.push(d)
            };
            this.addStylesFromStyleDefinition = function () {
                for (var b in a.Styles)
                    if ("@" != b[0] && L(c, b)) {
                        var e = a.Styles[b],
                        d = a.StylesSpecificity[b];
                        if (null != e)
                            for (var f in e) {
                                var k = this.stylesSpecificity[f];
                                "undefined" == typeof k && (k = "000");
                                d > k && (this.styles[f] = e[f], this.stylesSpecificity[f] = d)
                            }
                    }
            };
            var b = /^[A-Z-]+$/,
            e = function (a) {
                return b.test(a) ?
                a.toLowerCase() : a
            };
            if (null != c && 1 == c.nodeType) {
                for (var d = 0; d < c.attributes.length; d++) {
                    var k = c.attributes[d],
                    f = e(k.nodeName);
                    this.attributes[f] = new a.Property(f, k.value)
                }
                this.addStylesFromStyleDefinition();
                if (this.attribute("style").hasValue())
                    for (e = this.attribute("style").value.split(";"), d = 0; d < e.length; d++)
                        "" != a.trim(e[d]) && (f = e[d].split(":"), k = a.trim(f[0]), f = a.trim(f[1]), this.styles[k] = new a.Property(k, f));
                this.attribute("id").hasValue() && null == a.Definitions[this.attribute("id").value] && (a.Definitions[this.attribute("id").value] =
                        this);
                for (d = 0; d < c.childNodes.length; d++)
                    e = c.childNodes[d], 1 == e.nodeType && this.addChild(e, !0), !this.captureTextNodes || 3 != e.nodeType && 4 != e.nodeType || "" != a.compressSpaces(e.value || e.text || e.textContent || "") && this.addChild(new a.Element.tspan(e), !1)
            }
        };
        a.Element.RenderedElementBase = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.setContext = function (b) {
                if (this.style("fill").isUrlDefinition()) {
                    var e = this.style("fill").getFillStyleDefinition(this, this.style("fill-opacity"));
                    null != e && (b.fillStyle =
                            e)
                } else
                    this.style("fill").hasValue() && (e = this.style("fill"), "currentColor" == e.value && (e.value = this.style("color").value), "inherit" != e.value && (b.fillStyle = "none" == e.value ? "rgba(0,0,0,0)" : e.value));
                this.style("fill-opacity").hasValue() && (e = new a.Property("fill", b.fillStyle), e = e.addOpacity(this.style("fill-opacity")), b.fillStyle = e.value);
                this.style("stroke").isUrlDefinition() ? (e = this.style("stroke").getFillStyleDefinition(this, this.style("stroke-opacity")), null != e && (b.strokeStyle = e)) : this.style("stroke").hasValue() &&
                (e = this.style("stroke"), "currentColor" == e.value && (e.value = this.style("color").value), "inherit" != e.value && (b.strokeStyle = "none" == e.value ? "rgba(0,0,0,0)" : e.value));
                this.style("stroke-opacity").hasValue() && (e = new a.Property("stroke", b.strokeStyle), e = e.addOpacity(this.style("stroke-opacity")), b.strokeStyle = e.value);
                this.style("stroke-width").hasValue() && (e = this.style("stroke-width").toPixels(), b.lineWidth = 0 == e ? .001 : e);
                this.style("stroke-linecap").hasValue() && (b.lineCap = this.style("stroke-linecap").value);
                this.style("stroke-linejoin").hasValue() && (b.lineJoin = this.style("stroke-linejoin").value);
                this.style("stroke-miterlimit").hasValue() && (b.miterLimit = this.style("stroke-miterlimit").value);
                this.style("stroke-dasharray").hasValue() && "none" != this.style("stroke-dasharray").value && (e = a.ToNumberArray(this.style("stroke-dasharray").value), "undefined" != typeof b.setLineDash ? b.setLineDash(e) : "undefined" != typeof b.webkitLineDash ? b.webkitLineDash = e : "undefined" == typeof b.mozDash || 1 == e.length && 0 == e[0] || (b.mozDash =
                                e), e = this.style("stroke-dashoffset").numValueOrDefault(1), "undefined" != typeof b.lineDashOffset ? b.lineDashOffset = e : "undefined" != typeof b.webkitLineDashOffset ? b.webkitLineDashOffset = e : "undefined" != typeof b.mozDashOffset && (b.mozDashOffset = e));
                "undefined" != typeof b.font && (b.font = a.Font.CreateFont(this.style("font-style").value, this.style("font-variant").value, this.style("font-weight").value, this.style("font-size").hasValue() ? this.style("font-size").toPixels() + "px" : "", this.style("font-family").value).toString());
                this.style("transform", !1, !0).hasValue() && (new a.Transform(this.style("transform", !1, !0).value)).apply(b);
                this.style("clip-path", !1, !0).hasValue() && (e = this.style("clip-path", !1, !0).getDefinition(), null != e && e.apply(b));
                this.style("opacity").hasValue() && (b.globalAlpha = this.style("opacity").numValue())
            }
        };
        a.Element.RenderedElementBase.prototype = new a.Element.ElementBase;
        a.Element.PathElementBase = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.path = function (b) {
                null != b && b.beginPath();
                return new a.BoundingBox
            };
            this.renderChildren = function (b) {
                this.path(b);
                a.Mouse.checkPath(this, b);
                "" != b.fillStyle && ("inherit" != this.style("fill-rule").valueOrDefault("inherit") ? b.fill(this.style("fill-rule").value) : b.fill());
                "" != b.strokeStyle && b.stroke();
                var e = this.getMarkers();
                if (null != e) {
                    if (this.style("marker-start").isUrlDefinition()) {
                        var d = this.style("marker-start").getDefinition();
                        d.render(b, e[0][0], e[0][1])
                    }
                    if (this.style("marker-mid").isUrlDefinition())
                        for (var d = this.style("marker-mid").getDefinition(),
                            c = 1; c < e.length - 1; c++)
                            d.render(b, e[c][0], e[c][1]);
                    this.style("marker-end").isUrlDefinition() && (d = this.style("marker-end").getDefinition(), d.render(b, e[e.length - 1][0], e[e.length - 1][1]))
                }
            };
            this.getBoundingBox = function () {
                return this.path()
            };
            this.getMarkers = function () {
                return null
            }
        };
        a.Element.PathElementBase.prototype = new a.Element.RenderedElementBase;
        a.Element.svg = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.baseClearContext = this.clearContext;
            this.clearContext = function (b) {
                this.baseClearContext(b);
                a.ViewPort.RemoveCurrent()
            };
            this.baseSetContext = this.setContext;
            this.setContext = function (b) {
                b.strokeStyle = "rgba(0,0,0,0)";
                b.lineCap = "butt";
                b.lineJoin = "miter";
                b.miterLimit = 4;
                "undefined" != typeof b.font && "undefined" != typeof window.getComputedStyle && (b.font = window.getComputedStyle(b.canvas).getPropertyValue("font"));
                this.baseSetContext(b);
                this.attribute("x").hasValue() || (this.attribute("x", !0).value = 0);
                this.attribute("y").hasValue() || (this.attribute("y", !0).value = 0);
                b.translate(this.attribute("x").toPixels("x"),
                    this.attribute("y").toPixels("y"));
                var e = a.ViewPort.width(),
                d = a.ViewPort.height();
                this.attribute("width").hasValue() || (this.attribute("width", !0).value = "100%");
                this.attribute("height").hasValue() || (this.attribute("height", !0).value = "100%");
                if ("undefined" == typeof this.root) {
                    var e = this.attribute("width").toPixels("x"),
                    d = this.attribute("height").toPixels("y"),
                    c = 0,
                    f = 0;
                    this.attribute("refX").hasValue() && this.attribute("refY").hasValue() && (c = -this.attribute("refX").toPixels("x"), f = -this.attribute("refY").toPixels("y"));
                    "visible" != this.attribute("overflow").valueOrDefault("hidden") && (b.beginPath(), b.moveTo(c, f), b.lineTo(e, f), b.lineTo(e, d), b.lineTo(c, d), b.closePath(), b.clip())
                }
                a.ViewPort.SetCurrent(e, d);
                if (this.attribute("viewBox").hasValue()) {
                    var c = a.ToNumberArray(this.attribute("viewBox").value),
                    f = c[0],
                    g = c[1],
                    e = c[2],
                    d = c[3];
                    a.AspectRatio(b, this.attribute("preserveAspectRatio").value, a.ViewPort.width(), e, a.ViewPort.height(), d, f, g, this.attribute("refX").value, this.attribute("refY").value);
                    a.ViewPort.RemoveCurrent();
                    a.ViewPort.SetCurrent(c[2], c[3])
                }
            }
        };
        a.Element.svg.prototype = new a.Element.RenderedElementBase;
        a.Element.rect = function (c) {
            this.base = a.Element.PathElementBase;
            this.base(c);
            this.path = function (b) {
                var e = this.attribute("x").toPixels("x"),
                d = this.attribute("y").toPixels("y"),
                c = this.attribute("width").toPixels("x"),
                f = this.attribute("height").toPixels("y"),
                g = this.attribute("rx").toPixels("x"),
                n = this.attribute("ry").toPixels("y");
                this.attribute("rx").hasValue() && !this.attribute("ry").hasValue() && (n = g);
                this.attribute("ry").hasValue() &&
                !this.attribute("rx").hasValue() && (g = n);
                g = Math.min(g, c / 2);
                n = Math.min(n, f / 2);
                null != b && (b.beginPath(), b.moveTo(e + g, d), b.lineTo(e + c - g, d), b.quadraticCurveTo(e + c, d, e + c, d + n), b.lineTo(e + c, d + f - n), b.quadraticCurveTo(e + c, d + f, e + c - g, d + f), b.lineTo(e + g, d + f), b.quadraticCurveTo(e, d + f, e, d + f - n), b.lineTo(e, d + n), b.quadraticCurveTo(e, d, e + g, d), b.closePath());
                return new a.BoundingBox(e, d, e + c, d + f)
            }
        };
        a.Element.rect.prototype = new a.Element.PathElementBase;
        a.Element.circle = function (c) {
            this.base = a.Element.PathElementBase;
            this.base(c);
            this.path = function (b) {
                var e = this.attribute("cx").toPixels("x"),
                d = this.attribute("cy").toPixels("y"),
                c = this.attribute("r").toPixels();
                null != b && (b.beginPath(), b.arc(e, d, c, 0, 2 * Math.PI, !0), b.closePath());
                return new a.BoundingBox(e - c, d - c, e + c, d + c)
            }
        };
        a.Element.circle.prototype = new a.Element.PathElementBase;
        a.Element.ellipse = function (c) {
            this.base = a.Element.PathElementBase;
            this.base(c);
            this.path = function (b) {
                var e = (Math.sqrt(2) - 1) / 3 * 4,
                d = this.attribute("rx").toPixels("x"),
                c = this.attribute("ry").toPixels("y"),
                f = this.attribute("cx").toPixels("x"),
                g = this.attribute("cy").toPixels("y");
                null != b && (b.beginPath(), b.moveTo(f, g - c), b.bezierCurveTo(f + e * d, g - c, f + d, g - e * c, f + d, g), b.bezierCurveTo(f + d, g + e * c, f + e * d, g + c, f, g + c), b.bezierCurveTo(f - e * d, g + c, f - d, g + e * c, f - d, g), b.bezierCurveTo(f - d, g - e * c, f - e * d, g - c, f, g - c), b.closePath());
                return new a.BoundingBox(f - d, g - c, f + d, g + c)
            }
        };
        a.Element.ellipse.prototype = new a.Element.PathElementBase;
        a.Element.line = function (c) {
            this.base = a.Element.PathElementBase;
            this.base(c);
            this.getPoints = function () {
                return [new a.Point(this.attribute("x1").toPixels("x"),
                        this.attribute("y1").toPixels("y")), new a.Point(this.attribute("x2").toPixels("x"), this.attribute("y2").toPixels("y"))]
            };
            this.path = function (b) {
                var e = this.getPoints();
                null != b && (b.beginPath(), b.moveTo(e[0].x, e[0].y), b.lineTo(e[1].x, e[1].y));
                return new a.BoundingBox(e[0].x, e[0].y, e[1].x, e[1].y)
            };
            this.getMarkers = function () {
                var a = this.getPoints(),
                e = a[0].angleTo(a[1]);
                return [[a[0], e], [a[1], e]]
            }
        };
        a.Element.line.prototype = new a.Element.PathElementBase;
        a.Element.polyline = function (c) {
            this.base = a.Element.PathElementBase;
            this.base(c);
            this.points = a.CreatePath(this.attribute("points").value);
            this.path = function (b) {
                var e = new a.BoundingBox(this.points[0].x, this.points[0].y);
                null != b && (b.beginPath(), b.moveTo(this.points[0].x, this.points[0].y));
                for (var d = 1; d < this.points.length; d++)
                    e.addPoint(this.points[d].x, this.points[d].y), null != b && b.lineTo(this.points[d].x, this.points[d].y);
                return e
            };
            this.getMarkers = function () {
                for (var a = [], e = 0; e < this.points.length - 1; e++)
                    a.push([this.points[e], this.points[e].angleTo(this.points[e + 1])]);
                0 < a.length && a.push([this.points[this.points.length - 1], a[a.length - 1][1]]);
                return a
            }
        };
        a.Element.polyline.prototype = new a.Element.PathElementBase;
        a.Element.polygon = function (c) {
            this.base = a.Element.polyline;
            this.base(c);
            this.basePath = this.path;
            this.path = function (a) {
                var e = this.basePath(a);
                null != a && (a.lineTo(this.points[0].x, this.points[0].y), a.closePath());
                return e
            }
        };
        a.Element.polygon.prototype = new a.Element.polyline;
        a.Element.path = function (c) {
            this.base = a.Element.PathElementBase;
            this.base(c);
            c = this.attribute("d").value;
            c = c.replace(/,/gm, " ");
            for (var b = 0; 2 > b; b++)
                c = c.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2");
            c = c.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2");
            c = c.replace(/([0-9])([+\-])/gm, "$1 $2");
            for (b = 0; 2 > b; b++)
                c = c.replace(/(\.[0-9]*)(\.)/gm, "$1 $2");
            c = c.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, "$1 $3 $4 ");
            c = a.compressSpaces(c);
            c = a.trim(c);
            this.PathParser = new function (b) {
                this.tokens = b.split(" ");
                this.reset = function () {
                    this.i = -1;
                    this.previousCommand = this.command = "";
                    this.start = new a.Point(0,
                            0);
                    this.control = new a.Point(0, 0);
                    this.current = new a.Point(0, 0);
                    this.points = [];
                    this.angles = []
                };
                this.isEnd = function () {
                    return this.i >= this.tokens.length - 1
                };
                this.isCommandOrEnd = function () {
                    return this.isEnd() ? !0 : null != this.tokens[this.i + 1].match(/^[A-Za-z]$/)
                };
                this.isRelativeCommand = function () {
                    switch (this.command) {
                    case "m":
                    case "l":
                    case "h":
                    case "v":
                    case "c":
                    case "s":
                    case "q":
                    case "t":
                    case "a":
                    case "z":
                        return !0
                    }
                    return !1
                };
                this.getToken = function () {
                    this.i++;
                    return this.tokens[this.i]
                };
                this.getScalar = function () {
                    return parseFloat(this.getToken())
                };
                this.nextCommand = function () {
                    this.previousCommand = this.command;
                    this.command = this.getToken()
                };
                this.getPoint = function () {
                    var b = new a.Point(this.getScalar(), this.getScalar());
                    return this.makeAbsolute(b)
                };
                this.getAsControlPoint = function () {
                    var a = this.getPoint();
                    return this.control = a
                };
                this.getAsCurrentPoint = function () {
                    var a = this.getPoint();
                    return this.current = a
                };
                this.getReflectedControlPoint = function () {
                    return "c" != this.previousCommand.toLowerCase() && "s" != this.previousCommand.toLowerCase() && "q" != this.previousCommand.toLowerCase() &&
                    "t" != this.previousCommand.toLowerCase() ? this.current : new a.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y)
                };
                this.makeAbsolute = function (a) {
                    this.isRelativeCommand() && (a.x += this.current.x, a.y += this.current.y);
                    return a
                };
                this.addMarker = function (a, b, e) {
                    null != e && 0 < this.angles.length && null == this.angles[this.angles.length - 1] && (this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(e));
                    this.addMarkerAngle(a, null == b ? null : b.angleTo(a))
                };
                this.addMarkerAngle = function (a,
                    b) {
                    this.points.push(a);
                    this.angles.push(b)
                };
                this.getMarkerPoints = function () {
                    return this.points
                };
                this.getMarkerAngles = function () {
                    for (var a = 0; a < this.angles.length; a++)
                        if (null == this.angles[a])
                            for (var b = a + 1; b < this.angles.length; b++)
                                if (null != this.angles[b]) {
                                    this.angles[a] = this.angles[b];
                                    break
                                }
                    return this.angles
                }
            }
            (c);
            this.path = function (b) {
                var d = this.PathParser;
                d.reset();
                var c = new a.BoundingBox;
                for (null != b && b.beginPath(); !d.isEnd(); )
                    switch (d.nextCommand(), d.command) {
                    case "M":
                    case "m":
                        var f = d.getAsCurrentPoint();
                        d.addMarker(f);
                        c.addPoint(f.x, f.y);
                        null != b && b.moveTo(f.x, f.y);
                        for (d.start = d.current; !d.isCommandOrEnd(); )
                            f = d.getAsCurrentPoint(), d.addMarker(f, d.start), c.addPoint(f.x, f.y), null != b && b.lineTo(f.x, f.y);
                        break;
                    case "L":
                    case "l":
                        for (; !d.isCommandOrEnd(); ) {
                            var g = d.current,
                            f = d.getAsCurrentPoint();
                            d.addMarker(f, g);
                            c.addPoint(f.x, f.y);
                            null != b && b.lineTo(f.x, f.y)
                        }
                        break;
                    case "H":
                    case "h":
                        for (; !d.isCommandOrEnd(); )
                            f = new a.Point((d.isRelativeCommand() ? d.current.x : 0) + d.getScalar(), d.current.y), d.addMarker(f, d.current),
                            d.current = f, c.addPoint(d.current.x, d.current.y), null != b && b.lineTo(d.current.x, d.current.y);
                        break;
                    case "V":
                    case "v":
                        for (; !d.isCommandOrEnd(); )
                            f = new a.Point(d.current.x, (d.isRelativeCommand() ? d.current.y : 0) + d.getScalar()), d.addMarker(f, d.current), d.current = f, c.addPoint(d.current.x, d.current.y), null != b && b.lineTo(d.current.x, d.current.y);
                        break;
                    case "C":
                    case "c":
                        for (; !d.isCommandOrEnd(); ) {
                            var n = d.current,
                            g = d.getPoint(),
                            m = d.getAsControlPoint(),
                            f = d.getAsCurrentPoint();
                            d.addMarker(f, m, g);
                            c.addBezierCurve(n.x,
                                n.y, g.x, g.y, m.x, m.y, f.x, f.y);
                            null != b && b.bezierCurveTo(g.x, g.y, m.x, m.y, f.x, f.y)
                        }
                        break;
                    case "S":
                    case "s":
                        for (; !d.isCommandOrEnd(); )
                            n = d.current, g = d.getReflectedControlPoint(), m = d.getAsControlPoint(), f = d.getAsCurrentPoint(), d.addMarker(f, m, g), c.addBezierCurve(n.x, n.y, g.x, g.y, m.x, m.y, f.x, f.y), null != b && b.bezierCurveTo(g.x, g.y, m.x, m.y, f.x, f.y);
                        break;
                    case "Q":
                    case "q":
                        for (; !d.isCommandOrEnd(); )
                            n = d.current, m = d.getAsControlPoint(), f = d.getAsCurrentPoint(), d.addMarker(f, m, m), c.addQuadraticCurve(n.x, n.y, m.x, m.y,
                                f.x, f.y), null != b && b.quadraticCurveTo(m.x, m.y, f.x, f.y);
                        break;
                    case "T":
                    case "t":
                        for (; !d.isCommandOrEnd(); )
                            n = d.current, m = d.getReflectedControlPoint(), d.control = m, f = d.getAsCurrentPoint(), d.addMarker(f, m, m), c.addQuadraticCurve(n.x, n.y, m.x, m.y, f.x, f.y), null != b && b.quadraticCurveTo(m.x, m.y, f.x, f.y);
                        break;
                    case "A":
                    case "a":
                        for (; !d.isCommandOrEnd(); ) {
                            var n = d.current,
                            v = d.getScalar(),
                            h = d.getScalar(),
                            g = d.getScalar() * (Math.PI / 180),
                            l = d.getScalar(),
                            m = d.getScalar(),
                            f = d.getAsCurrentPoint(),
                            q = new a.Point(Math.cos(g) *
                                    (n.x - f.x) / 2 + Math.sin(g) * (n.y - f.y) / 2, -Math.sin(g) * (n.x - f.x) / 2 + Math.cos(g) * (n.y - f.y) / 2),
                            p = Math.pow(q.x, 2) / Math.pow(v, 2) + Math.pow(q.y, 2) / Math.pow(h, 2);
                            1 < p && (v *= Math.sqrt(p), h *= Math.sqrt(p));
                            l = (l == m ? -1 : 1) * Math.sqrt((Math.pow(v, 2) * Math.pow(h, 2) - Math.pow(v, 2) * Math.pow(q.y, 2) - Math.pow(h, 2) * Math.pow(q.x, 2)) / (Math.pow(v, 2) * Math.pow(q.y, 2) + Math.pow(h, 2) * Math.pow(q.x, 2)));
                            isNaN(l) && (l = 0);
                            var r = new a.Point(l * v * q.y / h, l * -h * q.x / v),
                            n = new a.Point((n.x + f.x) / 2 + Math.cos(g) * r.x - Math.sin(g) * r.y, (n.y + f.y) / 2 + Math.sin(g) *
                                    r.x + Math.cos(g) * r.y),
                            u = function (a, b) {
                                return (a[0] * b[0] + a[1] * b[1]) / (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2)) * Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2)))
                            },
                            w = function (a, b) {
                                return (a[0] * b[1] < a[1] * b[0] ? -1 : 1) * Math.acos(u(a, b))
                            },
                            l = w([1, 0], [(q.x - r.x) / v, (q.y - r.y) / h]),
                            p = [(q.x - r.x) / v, (q.y - r.y) / h],
                            r = [(-q.x - r.x) / v, (-q.y - r.y) / h],
                            q = w(p, r);
                            -1 >= u(p, r) && (q = Math.PI);
                            1 <= u(p, r) && (q = 0);
                            p = 1 - m ? 1 : -1;
                            r = l + q / 2 * p;
                            w = new a.Point(n.x + v * Math.cos(r), n.y + h * Math.sin(r));
                            d.addMarkerAngle(w, r - p * Math.PI / 2);
                            d.addMarkerAngle(f, r - p * Math.PI);
                            c.addPoint(f.x, f.y);
                            null != b && (u = v > h ? v : h, f = v > h ? 1 : v / h, v = v > h ? h / v : 1, b.translate(n.x, n.y), b.rotate(g), b.scale(f, v), b.arc(0, 0, u, l, l + q, 1 - m), b.scale(1 / f, 1 / v), b.rotate(-g), b.translate(-n.x, -n.y))
                        }
                        break;
                    case "Z":
                    case "z":
                        null != b && b.closePath(),
                        d.current = d.start
                    }
                return c
            };
            this.getMarkers = function () {
                for (var a = this.PathParser.getMarkerPoints(), b = this.PathParser.getMarkerAngles(), c = [], f = 0; f < a.length; f++)
                    c.push([a[f], b[f]]);
                return c
            }
        };
        a.Element.path.prototype = new a.Element.PathElementBase;
        a.Element.pattern = function (c) {
            this.base =
                a.Element.ElementBase;
            this.base(c);
            this.createPattern = function (b, e) {
                var d = this.attribute("width").toPixels("x", !0),
                c = this.attribute("height").toPixels("y", !0),
                f = new a.Element.svg;
                f.attributes.viewBox = new a.Property("viewBox", this.attribute("viewBox").value);
                f.attributes.width = new a.Property("width", d + "px");
                f.attributes.height = new a.Property("height", c + "px");
                f.attributes.transform = new a.Property("transform", this.attribute("patternTransform").value);
                f.children = this.children;
                var g = document.createElement("canvas");
                g.width = d;
                g.height = c;
                d = g.getContext("2d");
                this.attribute("x").hasValue() && this.attribute("y").hasValue() && d.translate(this.attribute("x").toPixels("x", !0), this.attribute("y").toPixels("y", !0));
                for (c = -1; 1 >= c; c++)
                    for (var n = -1; 1 >= n; n++)
                        d.save(), f.attributes.x = new a.Property("x", c * g.width), f.attributes.y = new a.Property("y", n * g.height), f.render(d), d.restore();
                return b.createPattern(g, "repeat")
            }
        };
        a.Element.pattern.prototype = new a.Element.ElementBase;
        a.Element.marker = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.baseRender = this.render;
            this.render = function (b, e, d) {
                b.translate(e.x, e.y);
                "auto" == this.attribute("orient").valueOrDefault("auto") && b.rotate(d);
                "strokeWidth" == this.attribute("markerUnits").valueOrDefault("strokeWidth") && b.scale(b.lineWidth, b.lineWidth);
                b.save();
                var c = new a.Element.svg;
                c.attributes.viewBox = new a.Property("viewBox", this.attribute("viewBox").value);
                c.attributes.refX = new a.Property("refX", this.attribute("refX").value);
                c.attributes.refY = new a.Property("refY", this.attribute("refY").value);
                c.attributes.width = new a.Property("width", this.attribute("markerWidth").value);
                c.attributes.height = new a.Property("height", this.attribute("markerHeight").value);
                c.attributes.fill = new a.Property("fill", this.attribute("fill").valueOrDefault("black"));
                c.attributes.stroke = new a.Property("stroke", this.attribute("stroke").valueOrDefault("none"));
                c.children = this.children;
                var f = 0,
                g = 0;
                this.attribute("refX").hasValue() && (f = -parseFloat(this.attribute("refX").value));
                this.attribute("refY").hasValue() && (g = -parseFloat(this.attribute("refY").value));
                b.translate(f, g);
                c.render(b);
                b.restore();
                "strokeWidth" == this.attribute("markerUnits").valueOrDefault("strokeWidth") && b.scale(1 / b.lineWidth, 1 / b.lineWidth);
                "auto" == this.attribute("orient").valueOrDefault("auto") && b.rotate(-d);
                b.translate(-e.x, -e.y)
            }
        };
        a.Element.marker.prototype = new a.Element.ElementBase;
        a.Element.defs = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.render = function (a) {}
        };
        a.Element.defs.prototype = new a.Element.ElementBase;
        a.Element.GradientBase = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.stops = [];
            for (c = 0; c < this.children.length; c++) {
                var b = this.children[c];
                "stop" == b.type && this.stops.push(b)
            }
            this.getGradient = function () {};
            this.gradientUnits = function () {
                return this.attribute("gradientUnits").valueOrDefault("objectBoundingBox")
            };
            this.attributesToInherit = ["gradientUnits"];
            this.inheritStopContainer = function (a) {
                for (var b = 0; b < this.attributesToInherit.length; b++) {
                    var c = this.attributesToInherit[b];
                    !this.attribute(c).hasValue() && a.attribute(c).hasValue() && (this.attribute(c, !0).value =
                            a.attribute(c).value)
                }
            };
            this.createGradient = function (b, d, c) {
                var f = this;
                this.getHrefAttribute().hasValue() && (f = this.getHrefAttribute().getDefinition(), this.inheritStopContainer(f));
                var g = function (b) {
                    return c.hasValue() ? (new a.Property("color", b)).addOpacity(c).value : b
                };
                b = this.getGradient(b, d);
                if (null == b)
                    return g(f.stops[f.stops.length - 1].color);
                for (d = 0; d < f.stops.length; d++)
                    b.addColorStop(f.stops[d].offset, g(f.stops[d].color));
                return this.attribute("gradientTransform").hasValue() ? (f = a.ViewPort.viewPorts[0],
                    g = new a.Element.rect, g.attributes.x = new a.Property("x", -a.MAX_VIRTUAL_PIXELS / 3), g.attributes.y = new a.Property("y", -a.MAX_VIRTUAL_PIXELS / 3), g.attributes.width = new a.Property("width", a.MAX_VIRTUAL_PIXELS), g.attributes.height = new a.Property("height", a.MAX_VIRTUAL_PIXELS), d = new a.Element.g, d.attributes.transform = new a.Property("transform", this.attribute("gradientTransform").value), d.children = [g], g = new a.Element.svg, g.attributes.x = new a.Property("x", 0), g.attributes.y = new a.Property("y", 0), g.attributes.width =
                        new a.Property("width", f.width), g.attributes.height = new a.Property("height", f.height), g.children = [d], d = document.createElement("canvas"), d.width = f.width, d.height = f.height, f = d.getContext("2d"), f.fillStyle = b, g.render(f), f.createPattern(d, "no-repeat")) : b
            }
        };
        a.Element.GradientBase.prototype = new a.Element.ElementBase;
        a.Element.linearGradient = function (c) {
            this.base = a.Element.GradientBase;
            this.base(c);
            this.attributesToInherit.push("x1");
            this.attributesToInherit.push("y1");
            this.attributesToInherit.push("x2");
            this.attributesToInherit.push("y2");
            this.getGradient = function (a, e) {
                var c = "objectBoundingBox" == this.gradientUnits() ? e.getBoundingBox() : null;
                this.attribute("x1").hasValue() || this.attribute("y1").hasValue() || this.attribute("x2").hasValue() || this.attribute("y2").hasValue() || (this.attribute("x1", !0).value = 0, this.attribute("y1", !0).value = 0, this.attribute("x2", !0).value = 1, this.attribute("y2", !0).value = 0);
                var k = "objectBoundingBox" == this.gradientUnits() ? c.x() + c.width() * this.attribute("x1").numValue() : this.attribute("x1").toPixels("x"),
                f = "objectBoundingBox" == this.gradientUnits() ? c.y() + c.height() * this.attribute("y1").numValue() : this.attribute("y1").toPixels("y"),
                g = "objectBoundingBox" == this.gradientUnits() ? c.x() + c.width() * this.attribute("x2").numValue() : this.attribute("x2").toPixels("x"),
                c = "objectBoundingBox" == this.gradientUnits() ? c.y() + c.height() * this.attribute("y2").numValue() : this.attribute("y2").toPixels("y");
                return k == g && f == c ? null : a.createLinearGradient(k, f, g, c)
            }
        };
        a.Element.linearGradient.prototype = new a.Element.GradientBase;
        a.Element.radialGradient = function (c) {
            this.base = a.Element.GradientBase;
            this.base(c);
            this.attributesToInherit.push("cx");
            this.attributesToInherit.push("cy");
            this.attributesToInherit.push("r");
            this.attributesToInherit.push("fx");
            this.attributesToInherit.push("fy");
            this.getGradient = function (a, c) {
                var d = c.getBoundingBox();
                this.attribute("cx").hasValue() || (this.attribute("cx", !0).value = "50%");
                this.attribute("cy").hasValue() || (this.attribute("cy", !0).value = "50%");
                this.attribute("r").hasValue() || (this.attribute("r",
                        !0).value = "50%");
                var k = "objectBoundingBox" == this.gradientUnits() ? d.x() + d.width() * this.attribute("cx").numValue() : this.attribute("cx").toPixels("x"),
                f = "objectBoundingBox" == this.gradientUnits() ? d.y() + d.height() * this.attribute("cy").numValue() : this.attribute("cy").toPixels("y"),
                g = k,
                n = f;
                this.attribute("fx").hasValue() && (g = "objectBoundingBox" == this.gradientUnits() ? d.x() + d.width() * this.attribute("fx").numValue() : this.attribute("fx").toPixels("x"));
                this.attribute("fy").hasValue() && (n = "objectBoundingBox" ==
                        this.gradientUnits() ? d.y() + d.height() * this.attribute("fy").numValue() : this.attribute("fy").toPixels("y"));
                d = "objectBoundingBox" == this.gradientUnits() ? (d.width() + d.height()) / 2 * this.attribute("r").numValue() : this.attribute("r").toPixels();
                return a.createRadialGradient(g, n, 0, k, f, d)
            }
        };
        a.Element.radialGradient.prototype = new a.Element.GradientBase;
        a.Element.stop = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.offset = this.attribute("offset").numValue();
            0 > this.offset && (this.offset = 0);
            1 < this.offset &&
            (this.offset = 1);
            c = this.style("stop-color", !0);
            "" === c.value && (c.value = "#000");
            this.style("stop-opacity").hasValue() && (c = c.addOpacity(this.style("stop-opacity")));
            this.color = c.value
        };
        a.Element.stop.prototype = new a.Element.ElementBase;
        a.Element.AnimateBase = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            a.Animations.push(this);
            this.duration = 0;
            this.begin = this.attribute("begin").toMilliseconds();
            this.maxDuration = this.begin + this.attribute("dur").toMilliseconds();
            this.getProperty = function () {
                var a =
                    this.attribute("attributeType").value,
                c = this.attribute("attributeName").value;
                return "CSS" == a ? this.parent.style(c, !0) : this.parent.attribute(c, !0)
            };
            this.initialValue = null;
            this.initialUnits = "";
            this.removed = !1;
            this.calcValue = function () {
                return ""
            };
            this.update = function (a) {
                null == this.initialValue && (this.initialValue = this.getProperty().value, this.initialUnits = this.getProperty().getUnits());
                if (this.duration > this.maxDuration) {
                    if ("indefinite" == this.attribute("repeatCount").value || "indefinite" == this.attribute("repeatDur").value)
                        this.duration =
                            0;
                    else if ("freeze" == this.attribute("fill").valueOrDefault("remove") && !this.frozen)
                        this.frozen = !0, this.parent.animationFrozen = !0, this.parent.animationFrozenValue = this.getProperty().value;
                    else if ("remove" == this.attribute("fill").valueOrDefault("remove") && !this.removed)
                        return this.removed = !0, this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue, !0;
                    return !1
                }
                this.duration += a;
                a = !1;
                this.begin < this.duration && (a = this.calcValue(), this.attribute("type").hasValue() &&
                    (a = this.attribute("type").value + "(" + a + ")"), this.getProperty().value = a, a = !0);
                return a
            };
            this.from = this.attribute("from");
            this.to = this.attribute("to");
            this.values = this.attribute("values");
            this.values.hasValue() && (this.values.value = this.values.value.split(";"));
            this.progress = function () {
                var b = {
                    progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
                };
                if (this.values.hasValue()) {
                    var c = b.progress * (this.values.value.length - 1),
                    d = Math.floor(c),
                    k = Math.ceil(c);
                    b.from = new a.Property("from", parseFloat(this.values.value[d]));
                    b.to = new a.Property("to", parseFloat(this.values.value[k]));
                    b.progress = (c - d) / (k - d)
                } else
                    b.from = this.from, b.to = this.to;
                return b
            }
        };
        a.Element.AnimateBase.prototype = new a.Element.ElementBase;
        a.Element.animate = function (c) {
            this.base = a.Element.AnimateBase;
            this.base(c);
            this.calcValue = function () {
                var a = this.progress();
                return a.from.numValue() + (a.to.numValue() - a.from.numValue()) * a.progress + this.initialUnits
            }
        };
        a.Element.animate.prototype = new a.Element.AnimateBase;
        a.Element.animateColor = function (c) {
            this.base = a.Element.AnimateBase;
            this.base(c);
            this.calcValue = function () {
                var a = this.progress(),
                c = new A(a.from.value),
                d = new A(a.to.value);
                if (c.ok && d.ok) {
                    var k = c.g + (d.g - c.g) * a.progress,
                    f = c.b + (d.b - c.b) * a.progress;
                    return "rgb(" + parseInt(c.r + (d.r - c.r) * a.progress, 10) + "," + parseInt(k, 10) + "," + parseInt(f, 10) + ")"
                }
                return this.attribute("from").value
            }
        };
        a.Element.animateColor.prototype = new a.Element.AnimateBase;
        a.Element.animateTransform = function (c) {
            this.base = a.Element.AnimateBase;
            this.base(c);
            this.calcValue = function () {
                for (var b = this.progress(),
                    c = a.ToNumberArray(b.from.value), d = a.ToNumberArray(b.to.value), k = "", f = 0; f < c.length; f++)
                    k += c[f] + (d[f] - c[f]) * b.progress + " ";
                return k
            }
        };
        a.Element.animateTransform.prototype = new a.Element.animate;
        a.Element.font = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.horizAdvX = this.attribute("horiz-adv-x").numValue();
            this.isArabic = this.isRTL = !1;
            this.missingGlyph = this.fontFace = null;
            this.glyphs = [];
            for (c = 0; c < this.children.length; c++) {
                var b = this.children[c];
                "font-face" == b.type ? (this.fontFace = b, b.style("font-family").hasValue() &&
                    (a.Definitions[b.style("font-family").value] = this)) : "missing-glyph" == b.type ? this.missingGlyph = b : "glyph" == b.type && ("" != b.arabicForm ? (this.isArabic = this.isRTL = !0, "undefined" == typeof this.glyphs[b.unicode] && (this.glyphs[b.unicode] = []), this.glyphs[b.unicode][b.arabicForm] = b) : this.glyphs[b.unicode] = b)
            }
        };
        a.Element.font.prototype = new a.Element.ElementBase;
        a.Element.fontface = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.ascent = this.attribute("ascent").value;
            this.descent = this.attribute("descent").value;
            this.unitsPerEm = this.attribute("units-per-em").numValue()
        };
        a.Element.fontface.prototype = new a.Element.ElementBase;
        a.Element.missingglyph = function (c) {
            this.base = a.Element.path;
            this.base(c);
            this.horizAdvX = 0
        };
        a.Element.missingglyph.prototype = new a.Element.path;
        a.Element.glyph = function (c) {
            this.base = a.Element.path;
            this.base(c);
            this.horizAdvX = this.attribute("horiz-adv-x").numValue();
            this.unicode = this.attribute("unicode").value;
            this.arabicForm = this.attribute("arabic-form").value
        };
        a.Element.glyph.prototype =
            new a.Element.path;
        a.Element.text = function (c) {
            this.captureTextNodes = !0;
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.baseSetContext = this.setContext;
            this.setContext = function (a) {
                this.baseSetContext(a);
                var c = this.style("dominant-baseline").toTextBaseline();
                null == c && (c = this.style("alignment-baseline").toTextBaseline());
                null != c && (a.textBaseline = c)
            };
            this.getBoundingBox = function () {
                var b = this.attribute("x").toPixels("x"),
                c = this.attribute("y").toPixels("y"),
                d = this.parent.style("font-size").numValueOrDefault(a.Font.Parse(a.ctx.font).fontSize);
                return new a.BoundingBox(b, c - d, b + Math.floor(2 * d / 3) * this.children[0].getText().length, c)
            };
            this.renderChildren = function (a) {
                this.x = this.attribute("x").toPixels("x");
                this.y = this.attribute("y").toPixels("y");
                this.attribute("dx").hasValue() && (this.x += this.attribute("dx").toPixels("x"));
                this.attribute("dy").hasValue() && (this.y += this.attribute("dy").toPixels("y"));
                this.x += this.getAnchorDelta(a, this, 0);
                for (var c = 0; c < this.children.length; c++)
                    this.renderChild(a, this, this, c)
            };
            this.getAnchorDelta = function (a, c,
                d) {
                var k = this.style("text-anchor").valueOrDefault("start");
                if ("start" != k) {
                    for (var f = 0, g = d; g < c.children.length; g++) {
                        var n = c.children[g];
                        if (g > d && n.attribute("x").hasValue())
                            break;
                        f += n.measureTextRecursive(a)
                    }
                    return -1 * ("end" == k ? f : f / 2)
                }
                return 0
            };
            this.renderChild = function (a, c, d, k) {
                var f = d.children[k];
                f.attribute("x").hasValue() ? (f.x = f.attribute("x").toPixels("x") + c.getAnchorDelta(a, d, k), f.attribute("dx").hasValue() && (f.x += f.attribute("dx").toPixels("x"))) : (f.attribute("dx").hasValue() && (c.x += f.attribute("dx").toPixels("x")),
                    f.x = c.x);
                c.x = f.x + f.measureText(a);
                f.attribute("y").hasValue() ? (f.y = f.attribute("y").toPixels("y"), f.attribute("dy").hasValue() && (f.y += f.attribute("dy").toPixels("y"))) : (f.attribute("dy").hasValue() && (c.y += f.attribute("dy").toPixels("y")), f.y = c.y);
                c.y = f.y;
                f.render(a);
                for (k = 0; k < f.children.length; k++)
                    c.renderChild(a, c, f, k)
            }
        };
        a.Element.text.prototype = new a.Element.RenderedElementBase;
        a.Element.TextElementBase = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.getGlyph = function (a, c,
                d) {
                var k = c[d],
                f = null;
                if (a.isArabic) {
                    var g = "isolated";
                    (0 == d || " " == c[d - 1]) && d < c.length - 2 && " " != c[d + 1] && (g = "terminal");
                    0 < d && " " != c[d - 1] && d < c.length - 2 && " " != c[d + 1] && (g = "medial");
                    0 < d && " " != c[d - 1] && (d == c.length - 1 || " " == c[d + 1]) && (g = "initial");
                    "undefined" != typeof a.glyphs[k] && (f = a.glyphs[k][g], null == f && "glyph" == a.glyphs[k].type && (f = a.glyphs[k]))
                } else
                    f = a.glyphs[k];
                null == f && (f = a.missingGlyph);
                return f
            };
            this.renderChildren = function (b) {
                var c = this.parent.style("font-family").getDefinition();
                if (null != c) {
                    var d =
                        this.parent.style("font-size").numValueOrDefault(a.Font.Parse(a.ctx.font).fontSize),
                    k = this.parent.style("font-style").valueOrDefault(a.Font.Parse(a.ctx.font).fontStyle),
                    f = this.getText();
                    c.isRTL && (f = f.split("").reverse().join(""));
                    for (var g = a.ToNumberArray(this.parent.attribute("dx").value), n = 0; n < f.length; n++) {
                        var m = this.getGlyph(c, f, n),
                        h = d / c.fontFace.unitsPerEm;
                        b.translate(this.x, this.y);
                        b.scale(h, -h);
                        var l = b.lineWidth;
                        b.lineWidth = b.lineWidth * c.fontFace.unitsPerEm / d;
                        "italic" == k && b.transform(1, 0, .4,
                            1, 0, 0);
                        m.render(b);
                        "italic" == k && b.transform(1, 0,  - .4, 1, 0, 0);
                        b.lineWidth = l;
                        b.scale(1 / h, -1 / h);
                        b.translate(-this.x, -this.y);
                        this.x += d * (m.horizAdvX || c.horizAdvX) / c.fontFace.unitsPerEm;
                        "undefined" == typeof g[n] || isNaN(g[n]) || (this.x += g[n])
                    }
                } else
                    "" != b.fillStyle && b.fillText(a.compressSpaces(this.getText()), this.x, this.y), "" != b.strokeStyle && b.strokeText(a.compressSpaces(this.getText()), this.x, this.y)
            };
            this.getText = function () {};
            this.measureTextRecursive = function (a) {
                for (var c = this.measureText(a), d = 0; d < this.children.length; d++)
                    c +=
                    this.children[d].measureTextRecursive(a);
                return c
            };
            this.measureText = function (b) {
                var c = this.parent.style("font-family").getDefinition();
                if (null != c) {
                    b = this.parent.style("font-size").numValueOrDefault(a.Font.Parse(a.ctx.font).fontSize);
                    var d = 0,
                    k = this.getText();
                    c.isRTL && (k = k.split("").reverse().join(""));
                    for (var f = a.ToNumberArray(this.parent.attribute("dx").value), g = 0; g < k.length; g++) {
                        var n = this.getGlyph(c, k, g),
                        d = d + (n.horizAdvX || c.horizAdvX) * b / c.fontFace.unitsPerEm;
                        "undefined" == typeof f[g] || isNaN(f[g]) ||
                        (d += f[g])
                    }
                    return d
                }
                c = a.compressSpaces(this.getText());
                if (!b.measureText)
                    return 10 * c.length;
                b.save();
                this.setContext(b);
                c = b.measureText(c).width;
                b.restore();
                return c
            }
        };
        a.Element.TextElementBase.prototype = new a.Element.RenderedElementBase;
        a.Element.tspan = function (c) {
            this.captureTextNodes = !0;
            this.base = a.Element.TextElementBase;
            this.base(c);
            this.text = a.compressSpaces(c.value || c.text || c.textContent || "");
            this.getText = function () {
                return 0 < this.children.length ? "" : this.text
            }
        };
        a.Element.tspan.prototype = new a.Element.TextElementBase;
        a.Element.tref = function (c) {
            this.base = a.Element.TextElementBase;
            this.base(c);
            this.getText = function () {
                var a = this.getHrefAttribute().getDefinition();
                if (null != a)
                    return a.children[0].getText()
            }
        };
        a.Element.tref.prototype = new a.Element.TextElementBase;
        a.Element.a = function (c) {
            this.base = a.Element.TextElementBase;
            this.base(c);
            this.hasText = 0 < c.childNodes.length;
            for (var b = 0; b < c.childNodes.length; b++)
                3 != c.childNodes[b].nodeType && (this.hasText = !1);
            this.text = this.hasText ? c.childNodes[0].value : "";
            this.getText = function () {
                return this.text
            };
            this.baseRenderChildren = this.renderChildren;
            this.renderChildren = function (b) {
                if (this.hasText) {
                    this.baseRenderChildren(b);
                    var c = new a.Property("fontSize", a.Font.Parse(a.ctx.font).fontSize);
                    a.Mouse.checkBoundingBox(this, new a.BoundingBox(this.x, this.y - c.toPixels("y"), this.x + this.measureText(b), this.y))
                } else
                    0 < this.children.length && (c = new a.Element.g, c.children = this.children, c.parent = this, c.render(b))
            };
            this.onclick = function () {
                window.open(this.getHrefAttribute().value)
            };
            this.onmousemove = function () {
                a.ctx.canvas.style.cursor =
                    "pointer"
            }
        };
        a.Element.a.prototype = new a.Element.TextElementBase;
        a.Element.image = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            var b = this.getHrefAttribute().value;
            if ("" != b) {
                var e = b.match(/\.svg$/);
                a.Images.push(this);
                this.loaded = !1;
                if (e)
                    this.img = a.ajax(b), this.loaded = !0;
                else {
                    this.img = document.createElement("img");
                    1 == a.opts.useCORS && (this.img.crossOrigin = "Anonymous");
                    var d = this;
                    this.img.onload = function () {
                        d.loaded = !0
                    };
                    this.img.onerror = function () {
                        a.log('ERROR: image "' + b + '" not found');
                        d.loaded = !0
                    };
                    this.img.src = b
                }
                this.renderChildren = function (b) {
                    var c = this.attribute("x").toPixels("x"),
                    d = this.attribute("y").toPixels("y"),
                    n = this.attribute("width").toPixels("x"),
                    m = this.attribute("height").toPixels("y");
                    0 != n && 0 != m && (b.save(), e ? b.drawSvg(this.img, c, d, n, m) : (b.translate(c, d), a.AspectRatio(b, this.attribute("preserveAspectRatio").value, n, this.img.width, m, this.img.height, 0, 0), b.drawImage(this.img, 0, 0)), b.restore())
                };
                this.getBoundingBox = function () {
                    var b = this.attribute("x").toPixels("x"),
                    c =
                        this.attribute("y").toPixels("y"),
                    d = this.attribute("width").toPixels("x"),
                    e = this.attribute("height").toPixels("y");
                    return new a.BoundingBox(b, c, b + d, c + e)
                }
            }
        };
        a.Element.image.prototype = new a.Element.RenderedElementBase;
        a.Element.g = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.getBoundingBox = function () {
                for (var b = new a.BoundingBox, c = 0; c < this.children.length; c++)
                    b.addBoundingBox(this.children[c].getBoundingBox());
                return b
            }
        };
        a.Element.g.prototype = new a.Element.RenderedElementBase;
        a.Element.symbol = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.render = function (a) {}
        };
        a.Element.symbol.prototype = new a.Element.RenderedElementBase;
        a.Element.style = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            for (var b = "", e = 0; e < c.childNodes.length; e++)
                b += c.childNodes[e].data;
            b = b.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, "");
            b = a.compressSpaces(b);
            c = b.split("}");
            for (e = 0; e < c.length; e++)
                if ("" != a.trim(c[e]))
                    for (var d = c[e].split("{"), b = d[0].split(","),
                        d = d[1].split(";"), k = 0; k < b.length; k++) {
                        var f = a.trim(b[k]);
                        if ("" != f) {
                            for (var g = a.Styles[f] || {}, n = 0; n < d.length; n++) {
                                var m = d[n].indexOf(":"),
                                h = d[n].substr(0, m),
                                m = d[n].substr(m + 1, d[n].length - m);
                                null != h && null != m && (g[a.trim(h)] = new a.Property(a.trim(h), a.trim(m)))
                            }
                            a.Styles[f] = g;
                            a.StylesSpecificity[f] = K(f);
                            if ("@font-face" == f)
                                for (f = g["font-family"].value.replace(/"/g, ""), g = g.src.value.split(","), n = 0; n < g.length; n++)
                                    if (0 < g[n].indexOf('format("svg")'))
                                        for (h = g[n].indexOf("url"), m = g[n].indexOf(")", h), h = g[n].substr(h +
                                                    5, m - h - 6), h = a.parseXml(a.ajax(h)).getElementsByTagName("font"), m = 0; m < h.length; m++) {
                                            var l = a.CreateElement(h[m]);
                                            a.Definitions[f] = l
                                        }
                        }
                    }
        };
        a.Element.style.prototype = new a.Element.ElementBase;
        a.Element.use = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c);
            this.baseSetContext = this.setContext;
            this.setContext = function (a) {
                this.baseSetContext(a);
                this.attribute("x").hasValue() && a.translate(this.attribute("x").toPixels("x"), 0);
                this.attribute("y").hasValue() && a.translate(0, this.attribute("y").toPixels("y"))
            };
            var b = this.getHrefAttribute().getDefinition();
            this.path = function (a) {
                null != b && b.path(a)
            };
            this.getBoundingBox = function () {
                if (null != b)
                    return b.getBoundingBox()
            };
            this.renderChildren = function (c) {
                if (null != b) {
                    var d = b;
                    "symbol" == b.type && (d = new a.Element.svg, d.type = "svg", d.attributes.viewBox = new a.Property("viewBox", b.attribute("viewBox").value), d.attributes.preserveAspectRatio = new a.Property("preserveAspectRatio", b.attribute("preserveAspectRatio").value), d.attributes.overflow = new a.Property("overflow", b.attribute("overflow").value),
                        d.children = b.children);
                    "svg" == d.type && (this.attribute("width").hasValue() && (d.attributes.width = new a.Property("width", this.attribute("width").value)), this.attribute("height").hasValue() && (d.attributes.height = new a.Property("height", this.attribute("height").value)));
                    var k = d.parent;
                    d.parent = null;
                    d.render(c);
                    d.parent = k
                }
            }
        };
        a.Element.use.prototype = new a.Element.RenderedElementBase;
        a.Element.mask = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.apply = function (b, c) {
                var d = this.attribute("x").toPixels("x"),
                k = this.attribute("y").toPixels("y"),
                f = this.attribute("width").toPixels("x"),
                g = this.attribute("height").toPixels("y");
                if (0 == f && 0 == g) {
                    g = new a.BoundingBox;
                    for (d = 0; d < this.children.length; d++)
                        g.addBoundingBox(this.children[d].getBoundingBox());
                    d = Math.floor(g.x1);
                    k = Math.floor(g.y1);
                    f = Math.floor(g.width());
                    g = Math.floor(g.height())
                }
                var n = c.attribute("mask").value;
                c.attribute("mask").value = "";
                var m = document.createElement("canvas");
                m.width = d + f;
                m.height = k + g;
                var h = m.getContext("2d");
                this.renderChildren(h);
                var l =
                    document.createElement("canvas");
                l.width = d + f;
                l.height = k + g;
                var p = l.getContext("2d");
                c.render(p);
                p.globalCompositeOperation = "destination-in";
                p.fillStyle = h.createPattern(m, "no-repeat");
                p.fillRect(0, 0, d + f, k + g);
                b.fillStyle = p.createPattern(l, "no-repeat");
                b.fillRect(0, 0, d + f, k + g);
                c.attribute("mask").value = n
            };
            this.render = function (a) {}
        };
        a.Element.mask.prototype = new a.Element.ElementBase;
        a.Element.clipPath = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.apply = function (b) {
                var c = CanvasRenderingContext2D.prototype.beginPath;
                CanvasRenderingContext2D.prototype.beginPath = function () {};
                var d = CanvasRenderingContext2D.prototype.closePath;
                CanvasRenderingContext2D.prototype.closePath = function () {};
                c.call(b);
                for (var k = 0; k < this.children.length; k++) {
                    var f = this.children[k];
                    if ("undefined" != typeof f.path) {
                        var g = null;
                        f.style("transform", !1, !0).hasValue() && (g = new a.Transform(f.style("transform", !1, !0).value), g.apply(b));
                        f.path(b);
                        CanvasRenderingContext2D.prototype.closePath = d;
                        g && g.unapply(b)
                    }
                }
                d.call(b);
                b.clip();
                CanvasRenderingContext2D.prototype.beginPath =
                    c;
                CanvasRenderingContext2D.prototype.closePath = d
            };
            this.render = function (a) {}
        };
        a.Element.clipPath.prototype = new a.Element.ElementBase;
        a.Element.filter = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.apply = function (a, c) {
                var d = c.getBoundingBox(),
                k = Math.floor(d.x1),
                f = Math.floor(d.y1),
                g = Math.floor(d.width()),
                d = Math.floor(d.height()),
                n = c.style("filter").value;
                c.style("filter").value = "";
                for (var m = 0, h = 0, l = 0; l < this.children.length; l++)
                    var p = this.children[l].extraFilterDistance || 0, m = Math.max(m,
                            p), h = Math.max(h, p);
                p = document.createElement("canvas");
                p.width = g + 2 * m;
                p.height = d + 2 * h;
                var q = p.getContext("2d");
                q.translate(-k + m, -f + h);
                c.render(q);
                for (l = 0; l < this.children.length; l++)
                    "function" == typeof this.children[l].apply && this.children[l].apply(q, 0, 0, g + 2 * m, d + 2 * h);
                a.drawImage(p, 0, 0, g + 2 * m, d + 2 * h, k - m, f - h, g + 2 * m, d + 2 * h);
                c.style("filter", !0).value = n
            };
            this.render = function (a) {}
        };
        a.Element.filter.prototype = new a.Element.ElementBase;
        a.Element.feMorphology = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.apply = function (a, c, d, k, f) {}
        };
        a.Element.feMorphology.prototype = new a.Element.ElementBase;
        a.Element.feComposite = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.apply = function (a, c, d, k, f) {}
        };
        a.Element.feComposite.prototype = new a.Element.ElementBase;
        a.Element.feColorMatrix = function (c) {
            function b(a, b) {
                var c = e[a];
                return c * (0 > c ? b - 255 : b)
            }
            this.base = a.Element.ElementBase;
            this.base(c);
            var e = a.ToNumberArray(this.attribute("values").value);
            switch (this.attribute("type").valueOrDefault("matrix")) {
            case "saturate":
                c =
                    e[0];
                e = [.213 + .787 * c, .715 - .715 * c, .072 - .072 * c, 0, 0, .213 - .213 * c, .715 + .285 * c, .072 - .072 * c, 0, 0, .213 - .213 * c, .715 - .715 * c, .072 + .928 * c, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                break;
            case "hueRotate":
                var d = e[0] * Math.PI / 180;
                c = function (a, b, c) {
                    return a + Math.cos(d) * b + Math.sin(d) * c
                };
                e = [c(.213, .787,  - .213), c(.715,  - .715,  - .715), c(.072,  - .072, .928), 0, 0, c(.213,  - .213, .143), c(.715, .285, .14), c(.072,  - .072,  - .283), 0, 0, c(.213,  - .213,  - .787), c(.715,  - .715, .715), c(.072, .928, .072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                break;
            case "luminanceToAlpha":
                e = [0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .2125, .7154, .0721, 0, 0, 0, 0, 0, 0, 1]
            }
            this.apply = function (a, c, d, e, h) {
                var l = a.getImageData(0, 0, e, h);
                for (d = 0; d < h; d++)
                    for (c = 0; c < e; c++) {
                        var p = l.data[d * e * 4 + 4 * c + 0],
                        u = l.data[d * e * 4 + 4 * c + 1],
                        q = l.data[d * e * 4 + 4 * c + 2],
                        w = l.data[d * e * 4 + 4 * c + 3],
                        r = b(0, p) + b(1, u) + b(2, q) + b(3, w) + b(4, 1);
                        l.data[d * e * 4 + 4 * c + 0] = r;
                        r = b(5, p) + b(6, u) + b(7, q) + b(8, w) + b(9, 1);
                        l.data[d * e * 4 + 4 * c + 1] = r;
                        r = b(10, p) + b(11, u) + b(12, q) + b(13, w) + b(14, 1);
                        l.data[d * e * 4 + 4 * c + 2] = r;
                        p = b(15, p) + b(16, u) + b(17, q) + b(18, w) + b(19, 1);
                        l.data[d * e * 4 + 4 * c + 3] = p
                    }
                a.clearRect(0, 0,
                    e, h);
                a.putImageData(l, 0, 0)
            }
        };
        a.Element.feColorMatrix.prototype = new a.Element.ElementBase;
        a.Element.feGaussianBlur = function (c) {
            this.base = a.Element.ElementBase;
            this.base(c);
            this.extraFilterDistance = this.blurRadius = Math.floor(this.attribute("stdDeviation").numValue());
            this.apply = function (b, c, d, k, f) {
                "undefined" == typeof E.canvasRGBA ? a.log("ERROR: StackBlur.js must be included for blur to work") : (b.canvas.id = a.UniqueId(), b.canvas.style.display = "none", document.body.appendChild(b.canvas), E.canvasRGBA(b.canvas.id,
                        c, d, k, f, this.blurRadius), document.body.removeChild(b.canvas))
            }
        };
        a.Element.feGaussianBlur.prototype = new a.Element.ElementBase;
        a.Element.title = function (a) {};
        a.Element.title.prototype = new a.Element.ElementBase;
        a.Element.desc = function (a) {};
        a.Element.desc.prototype = new a.Element.ElementBase;
        a.Element.MISSING = function (c) {
            a.log("ERROR: Element '" + c.nodeName + "' not yet implemented.")
        };
        a.Element.MISSING.prototype = new a.Element.ElementBase;
        a.CreateElement = function (c) {
            var b = c.nodeName.replace(/^[^:]+:/, ""),
            b = b.replace(/\-/g, ""),
            b = "undefined" != typeof a.Element[b] ? new a.Element[b](c) : new a.Element.MISSING(c);
            b.type = c.nodeName;
            return b
        };
        a.load = function (c, b) {
            a.loadXml(c, a.ajax(b))
        };
        a.loadXml = function (c, b) {
            a.loadXmlDoc(c, a.parseXml(b))
        };
        a.loadXmlDoc = function (c, b) {
            a.init(c);
            var e = function (a) {
                for (var b = c.canvas; b; )
                    a.x -= b.offsetLeft, a.y -= b.offsetTop, b = b.offsetParent;
                window.scrollX && (a.x += window.scrollX);
                window.scrollY && (a.y += window.scrollY);
                return a
            };
            1 != a.opts.ignoreMouse && (c.canvas.onclick = function (b) {
                b = e(new a.Point(null !=
                            b ? b.clientX : event.clientX, null != b ? b.clientY : event.clientY));
                a.Mouse.onclick(b.x, b.y)
            }, c.canvas.onmousemove = function (b) {
                b = e(new a.Point(null != b ? b.clientX : event.clientX, null != b ? b.clientY : event.clientY));
                a.Mouse.onmousemove(b.x, b.y)
            });
            var d = a.CreateElement(b.documentElement);
            d.root = !0;
            d.addStylesFromStyleDefinition();
            var k = !0,
            f = function () {
                a.ViewPort.Clear();
                c.canvas.parentNode && a.ViewPort.SetCurrent(c.canvas.parentNode.clientWidth, c.canvas.parentNode.clientHeight);
                1 != a.opts.ignoreDimensions && (d.style("width").hasValue() &&
                    (c.canvas.width = d.style("width").toPixels("x"), c.canvas.style.width = c.canvas.width + "px"), d.style("height").hasValue() && (c.canvas.height = d.style("height").toPixels("y"), c.canvas.style.height = c.canvas.height + "px"));
                var e = c.canvas.clientWidth || c.canvas.width,
                f = c.canvas.clientHeight || c.canvas.height;
                1 == a.opts.ignoreDimensions && d.style("width").hasValue() && d.style("height").hasValue() && (e = d.style("width").toPixels("x"), f = d.style("height").toPixels("y"));
                a.ViewPort.SetCurrent(e, f);
                null != a.opts.offsetX &&
                (d.attribute("x", !0).value = a.opts.offsetX);
                null != a.opts.offsetY && (d.attribute("y", !0).value = a.opts.offsetY);
                if (null != a.opts.scaleWidth || null != a.opts.scaleHeight) {
                    var g = null,
                    h = null,
                    l = a.ToNumberArray(d.attribute("viewBox").value);
                    null != a.opts.scaleWidth && (d.attribute("width").hasValue() ? g = d.attribute("width").toPixels("x") / a.opts.scaleWidth : isNaN(l[2]) || (g = l[2] / a.opts.scaleWidth));
                    null != a.opts.scaleHeight && (d.attribute("height").hasValue() ? h = d.attribute("height").toPixels("y") / a.opts.scaleHeight : isNaN(l[3]) ||
                            (h = l[3] / a.opts.scaleHeight));
                    null == g && (g = h);
                    null == h && (h = g);
                    d.attribute("width", !0).value = a.opts.scaleWidth;
                    d.attribute("height", !0).value = a.opts.scaleHeight;
                    d.style("transform", !0, !0).value += " scale(" + 1 / g + "," + 1 / h + ")"
                }
                1 != a.opts.ignoreClear && c.clearRect(0, 0, e, f);
                d.render(c);
                k && (k = !1, "function" == typeof a.opts.renderCallback && a.opts.renderCallback(b))
            },
            g = !0;
            a.ImagesLoaded() && (g = !1, f());
            a.intervalID = setInterval(function () {
                var b = !1;
                g && a.ImagesLoaded() && (g = !1, b = !0);
                1 != a.opts.ignoreMouse && (b |= a.Mouse.hasEvents());
                if (1 != a.opts.ignoreAnimation)
                    for (var c = 0; c < a.Animations.length; c++)
                        b |= a.Animations[c].update(1E3 / a.FRAMERATE);
                "function" == typeof a.opts.forceRedraw && 1 == a.opts.forceRedraw() && (b = !0);
                b && (f(), a.Mouse.runEvents())
            }, 1E3 / a.FRAMERATE)
        };
        a.stop = function () {
            a.intervalID && clearInterval(a.intervalID)
        };
        a.Mouse = new function () {
            this.events = [];
            this.hasEvents = function () {
                return 0 != this.events.length
            };
            this.onclick = function (a, b) {
                this.events.push({
                    type: "onclick",
                    x: a,
                    y: b,
                    run: function (a) {
                        if (a.onclick)
                            a.onclick()
                    }
                })
            };
            this.onmousemove =
            function (a, b) {
                this.events.push({
                    type: "onmousemove",
                    x: a,
                    y: b,
                    run: function (a) {
                        if (a.onmousemove)
                            a.onmousemove()
                    }
                })
            };
            this.eventElements = [];
            this.checkPath = function (a, b) {
                for (var e = 0; e < this.events.length; e++) {
                    var d = this.events[e];
                    b.isPointInPath && b.isPointInPath(d.x, d.y) && (this.eventElements[e] = a)
                }
            };
            this.checkBoundingBox = function (a, b) {
                for (var e = 0; e < this.events.length; e++) {
                    var d = this.events[e];
                    b.isPointInBox(d.x, d.y) && (this.eventElements[e] = a)
                }
            };
            this.runEvents = function () {
                a.ctx.canvas.style.cursor = "";
                for (var c =
                        0; c < this.events.length; c++)
                    for (var b = this.events[c], e = this.eventElements[c]; e; )
                        b.run(e), e = e.parent;
                this.events = [];
                this.eventElements = []
            }
        };
        return a
    }
    var O = function (h, a, l) {
        if (null == h && null == a && null == l)
            for (a = document.querySelectorAll("svg"), h = 0; h < a.length; h++) {
                l = a[h];
                var c = document.createElement("canvas");
                c.width = l.clientWidth;
                c.height = l.clientHeight;
                l.parentNode.insertBefore(c, l);
                l.parentNode.removeChild(l);
                var b = document.createElement("div");
                b.appendChild(l);
                O(c, b.innerHTML)
            }
        else {
            "string" == typeof h &&
            (h = document.getElementById(h));
            null != h.svg && h.svg.stop();
            l = X(l || {});
            if (1 != h.childNodes.length || "OBJECT" != h.childNodes[0].nodeName)
                h.svg = l;
            h = h.getContext("2d");
            "undefined" != typeof a.documentElement ? l.loadXmlDoc(h, a) : "<" == a.substr(0, 1) ? l.loadXml(h, a) : l.load(h, a)
        }
    },
    L;
    if ("undefined" != typeof Element.prototype.matches)
        L = function (h, a) {
            return h.matches(a)
        };
    else if ("undefined" != typeof Element.prototype.webkitMatchesSelector)
        L = function (h, a) {
            return h.webkitMatchesSelector(a)
        };
    else if ("undefined" != typeof Element.prototype.mozMatchesSelector)
        L =
        function (h, a) {
            return h.mozMatchesSelector(a)
        };
    else if ("undefined" != typeof Element.prototype.msMatchesSelector)
        L = function (h, a) {
            return h.msMatchesSelector(a)
        };
    else if ("undefined" != typeof Element.prototype.oMatchesSelector)
        L = function (h, a) {
            return h.oMatchesSelector(a)
        };
    else {
        if ("function" === typeof jQuery || "function" === typeof Zepto)
            L = function (h, a) {
                return $(h).is(a)
            };
        "undefined" === typeof L && (L = Sizzle.matchesSelector)
    }
    var W = /(\[[^\]]+\])/g,
    M = /(#[^\s\+>~\.\[:]+)/g,
    u = /(\.[^\s\+>~\.\[:]+)/g,
    B = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,
    p = /(:[\w-]+\([^\)]*\))/gi,
    C = /(:[^\s\+>~\.\[:]+)/g,
    w = /([^\s\+>~\.\[:]+)/g;
    "undefined" != typeof CanvasRenderingContext2D && (CanvasRenderingContext2D.prototype.drawSvg = function (h, a, l, c, b, e) {
        a = {
            ignoreMouse: !0,
            ignoreAnimation: !0,
            ignoreDimensions: !0,
            ignoreClear: !0,
            offsetX: a,
            offsetY: l,
            scaleWidth: c,
            scaleHeight: b
        };
        for (var d in e)
            e.hasOwnProperty(d) && (a[d] = e[d]);
        O(this.canvas, h, a)
    });
    return O
});

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.2 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs,require,define;
(function (global, setTimeout) {
    var req,
    s,
    head,
    baseElement,
    dataMain,
    src,
    interactiveScript,
    currentlyAddingScript,
    mainScript,
    subPath,
    version = "2.3.2",
    commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
    cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    jsSuffixRegExp = /\.js$/,
    currDirRegExp = /^\.\//,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
    isWebWorker = !isBrowser && "undefined" != typeof importScripts,
    readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
    defContextName = "_",
    isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
    contexts = {},
    cfg = {},
    globalDefQueue = [],
    useInteractive = !1;
    function commentReplace(e, t) {
        return t || ""
    }
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }
    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }
    function each(e, t) {
        var i;
        if (e)
            for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
    }
    function eachReverse(e, t) {
        var i;
        if (e)
            for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
    }
    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }
    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }
    function eachProp(e, t) {
        var i;
        for (i in e)
            if (hasProp(e, i) && t(e[i], i))
                break
    }
    function mixin(e, t, i, r) {
        return t && eachProp(t, (function (t, n) {
                !i && hasProp(e, n) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)))
            })),
        e
    }
    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function defaultOnError(e) {
        throw e
    }
    function getGlobal(e) {
        if (!e)
            return e;
        var t = global;
        return each(e.split("."), (function (e) {
                t = t[e]
            })),
        t
    }
    function makeError(e, t, i, r) {
        var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return n.requireType = e,
        n.requireModules = r,
        i && (n.originalError = i),
        n
    }
    if (void 0 === define) {
        if (void 0 !== requirejs) {
            if (isFunction(requirejs))
                return;
            cfg = requirejs,
            requirejs = void 0
        }
        void 0 === require || isFunction(require) || (cfg = require, require = void 0),
        req = requirejs = function (e, t, i, r) {
            var n,
            o,
            a = defContextName;
            return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = i, i = r) : e = []),
            o && o.context && (a = o.context),
            (n = getOwn(contexts, a)) || (n = contexts[a] = req.s.newContext(a)),
            o && n.configure(o),
            n.require(e, t, i)
        },
        req.config = function (e) {
            return req(e)
        },
        req.nextTick = void 0 !== setTimeout ? function (e) {
            setTimeout(e, 4)
        }
         : function (e) {
            e()
        },
        require || (require = req),
        req.version = version,
        req.jsExtRegExp = /^\/|:|\?|\.js$/,
        req.isBrowser = isBrowser,
        s = req.s = {
            contexts: contexts,
            newContext: newContext
        },
        req({}),
        each(["toUrl", "undef", "defined", "specified"], (function (e) {
                req[e] = function () {
                    var t = contexts[defContextName];
                    return t.require[e].apply(t, arguments)
                }
            })),
        isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)),
        req.onError = defaultOnError,
        req.createNode = function (e, t, i) {
            var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return r.type = e.scriptType || "text/javascript",
            r.charset = "utf-8",
            r.async = !0,
            r
        },
        req.load = function (e, t, i) {
            var r,
            n = e && e.config || {};
            if (isBrowser)
                return (r = req.createNode(n, t, i)).setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, n.onNodeCreated && n.onNodeCreated(r, n, t, i), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
            if (isWebWorker)
                try {
                    setTimeout((function () {}), 0),
                    importScripts(i),
                    e.completeLoad(t)
                } catch (r) {
                    e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, r, [t]))
                }
        },
        isBrowser && !cfg.skipDataMain && eachReverse(scripts(), (function (e) {
                if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main"))
                    return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
            })),
        define = function (e, t, i) {
            var r,
            n;
            "string" != typeof e && (i = t, t = e, e = null),
            isArray(t) || (i = t, t = null),
            !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, (function (e, i) {
                            t.push(i)
                        })), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))),
            useInteractive && (r = currentlyAddingScript || getInteractiveScript()) && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")]),
            n ? (n.defQueue.push([e, t, i]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, t, i])
        },
        define.amd = {
            jQuery: !0
        },
        req.exec = function (text) {
            return eval(text)
        },
        req(cfg)
    }
    function newContext(e) {
        var t,
        i,
        r,
        n,
        o,
        a = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
        s = {},
        u = {},
        c = {},
        d = [],
        p = {},
        f = {},
        l = {},
        h = 1,
        m = 1;
        function g(e, t, i) {
            var r,
            n,
            o,
            s,
            u,
            c,
            d,
            p,
            f,
            l,
            h = t && t.split("/"),
            m = a.map,
            g = m && m["*"];
            if (e && (c = (e = e.split("/")).length - 1, a.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), function (e) {
                    var t,
                    i;
                    for (t = 0; t < e.length; t++)
                        if ("." === (i = e[t]))
                            e.splice(t, 1) , t -= 1;
                            else if (".." === i) {
                                if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])
                                    continue;
                                t > 0 && (e.splice(t - 1, 2), t -= 2)
                            }
                    }
                        (e), e = e.join("/")), i && m && (h || g)) {
                    e: for (o = (n = e.split("/")).length; o > 0; o -= 1) {
                        if (u = n.slice(0, o).join("/"), h)
                            for (s = h.length; s > 0; s -= 1)
                                if ((r = getOwn(m, h.slice(0, s).join("/"))) && (r = getOwn(r, u))) {
                                    d = r,
                                    p = o;
                                    break e
                                }
                        !f && g && getOwn(g, u) && (f = getOwn(g, u), l = o)
                    }
                    !d && f && (d = f, p = l),
                    d && (n.splice(0, p, d), e = n.join("/"))
                }
            return getOwn(a.pkgs, e) || e
        }
        function v(e) {
            isBrowser && each(scripts(), (function (t) {
                    if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName)
                        return t.parentNode.removeChild(t), !0
                }))
        }
        function x(e) {
            var t = getOwn(a.paths, e);
            if (t && isArray(t) && t.length > 1)
                return t.shift(), r.require.undef(e), r.makeRequire(null, {
                    skipMap: !0
                })([e]), !0
        }
        function b(e) {
            var t,
            i = e ? e.indexOf("!") : -1;
            return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)),
            [t, e]
        }
        function q(e, t, i, n) {
            var o,
            a,
            s,
            u,
            c = null,
            d = t ? t.name : null,
            f = e,
            l = !0,
            v = "";
            return e || (l = !1, e = "_@r" + (h += 1)),
            c = (u = b(e))[0],
            e = u[1],
            c && (c = g(c, d, n), a = getOwn(p, c)),
            e && (c ? v = a && a.normalize ? a.normalize(e, (function (e) {
                            return g(e, d, n)
                        })) : -1 === e.indexOf("!") ? g(e, d, n) : e : (c = (u = b(v = g(e, d, n)))[0], v = u[1], i = !0, o = r.nameToUrl(v))), {
                prefix: c,
                name: v,
                parentMap: t,
                unnormalized: !!(s = !c || a || i ? "" : "_unnormalized" + (m += 1)),
                url: o,
                originalName: f,
                isDefine: l,
                id: (c ? c + "!" + v : v) + s
            }
        }
        function E(e) {
            var t = e.id,
            i = getOwn(s, t);
            return i || (i = s[t] = new r.Module(e)),
            i
        }
        function w(e, t, i) {
            var r = e.id,
            n = getOwn(s, r);
            !hasProp(p, r) || n && !n.defineEmitComplete ? (n = E(e)).error && "error" === t ? i(n.error) : n.on(t, i) : "defined" === t && i(p[r])
        }
        function y(e, t) {
            var i = e.requireModules,
            r = !1;
            t ? t(e) : (each(i, (function (t) {
                        var i = getOwn(s, t);
                        i && (i.error = e, i.events.error && (r = !0, i.emit("error", e)))
                    })), r || req.onError(e))
        }
        function S() {
            globalDefQueue.length && (each(globalDefQueue, (function (e) {
                        var t = e[0];
                        "string" == typeof t && (r.defQueueMap[t] = !0),
                        d.push(e)
                    })), globalDefQueue = [])
        }
        function k(e) {
            delete s[e],
            delete u[e]
        }
        function M(e, t, i) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, (function (r, n) {
                        var o = r.id,
                        a = getOwn(s, o);
                        !a || e.depMatched[n] || i[o] || (getOwn(t, o) ? (e.defineDep(n, p[o]), e.check()) : M(a, t, i))
                    })), i[r] = !0)
        }
        function O() {
            var e,
            i,
            n = 1e3 * a.waitSeconds,
            s = n && r.startTime + n < (new Date).getTime(),
            c = [],
            d = [],
            p = !1,
            f = !0;
            if (!t) {
                if (t = !0, eachProp(u, (function (e) {
                            var t = e.map,
                            r = t.id;
                            if (e.enabled && (t.isDefine || d.push(e), !e.error))
                                if (!e.inited && s)
                                    x(r)
                                         ? (i = !0, p = !0) : (c.push(r), v(r));
                                    else if (!e.inited && e.fetched && t.isDefine && (p = !0, !t.prefix))
                                        return f = !1
                            })), s && c.length)return (e = makeError("timeout", "Load timeout for modules: " + c, null, c)).contextName = r.contextName, y(e);
                f && each(d, (function (e) {
                        M(e, {}, {})
                    })),
                s && !i || !p || !isBrowser && !isWebWorker || o || (o = setTimeout((function () {
                                o = 0,
                                O()
                            }), 50)),
                t = !1
            }
        }
        function j(e) {
            hasProp(p, e[0]) || E(q(e[0], null, !0)).init(e[1], e[2])
        }
        function P(e, t, i, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1)
        }
        function R(e) {
            var t = e.currentTarget || e.srcElement;
            return P(t, r.onScriptLoad, "load", "onreadystatechange"),
            P(t, r.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }
        function T() {
            var e;
            for (S(); d.length; ) {
                if (null === (e = d.shift())[0])
                    return y(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                j(e)
            }
            r.defQueueMap = {}
        }
        return n = {
            require: function (e) {
                return e.require ? e.require : e.require = r.makeRequire(e.map)
            },
            exports: function (e) {
                if (e.usingExports = !0, e.map.isDefine)
                    return e.exports ? p[e.map.id] = e.exports : e.exports = p[e.map.id] = {}
            },
            module: function (e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function () {
                        return getOwn(a.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        },
        (i = function (e) {
            this.events = getOwn(c, e.id) || {},
            this.map = e,
            this.shim = getOwn(a.shim, e.id),
            this.depExports = [],
            this.depMaps = [],
            this.depMatched = [],
            this.pluginMaps = {},
            this.depCount = 0
        }).prototype = {
            init: function (e, t, i, r) {
                r = r || {},
                this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, (function (e) {
                                    this.emit("error", e)
                                }))), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function (e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0,
                    r.startTime = (new Date).getTime();
                    var e = this.map;
                    if (!this.shim)
                        return e.prefix ? this.callPlugin() : this.load();
                    r.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, (function () {
                                return e.prefix ? this.callPlugin() : this.load()
                            })))
                }
            },
            load: function () {
                var e = this.map.url;
                f[e] || (f[e] = !0, r.load(this.map.id, e))
            },
            check: function () {
                if (this.enabled && !this.enabling) {
                    var e,
                    t,
                    i = this.map.id,
                    n = this.depExports,
                    o = this.exports,
                    a = this.factory;
                    if (this.inited) {
                        if (this.error)
                            this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(a)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                                        try {
                                            o = r.execCb(i, a, n, o)
                                        } catch (t) {
                                            e = t
                                        }
                                    else
                                        o = r.execCb(i, a, n, o);
                                    if (this.map.isDefine && void 0 === o && ((t = this.module) ? o = t.exports : this.usingExports && (o = this.exports)), e)
                                        return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", y(this.error = e)
                                } else
                                    o = a;
                                if (this.exports = o, this.map.isDefine && !this.ignore && (p[i] = o, req.onResourceLoad)) {
                                    var s = [];
                                    each(this.depMaps, (function (e) {
                                            s.push(e.normalizedMap || e)
                                        })),
                                    req.onResourceLoad(r, this.map, s)
                                }
                                k(i),
                                this.defined = !0
                            }
                            this.defining = !1,
                            this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else
                        hasProp(r.defQueueMap, i) || this.fetch()
                }
            },
            callPlugin: function () {
                var e = this.map,
                t = e.id,
                i = q(e.prefix);
                this.depMaps.push(i),
                w(i, "defined", bind(this, (function (i) {
                            var n,
                            o,
                            u,
                            c = getOwn(l, this.map.id),
                            d = this.map.name,
                            p = this.map.parentMap ? this.map.parentMap.name : null,
                            f = r.makeRequire(e.parentMap, {
                                enableBuildCallback: !0
                            });
                            return this.map.unnormalized ? (i.normalize && (d = i.normalize(d, (function (e) {
                                                return g(e, p, !0)
                                            })) || ""), w(o = q(e.prefix + "!" + d, this.map.parentMap), "defined", bind(this, (function (e) {
                                            this.map.normalizedMap = o,
                                            this.init([], (function () {
                                                    return e
                                                }), null, {
                                                enabled: !0,
                                                ignore: !0
                                            })
                                        }))), void((u = getOwn(s, o.id)) && (this.depMaps.push(o), this.events.error && u.on("error", bind(this, (function (e) {
                                                    this.emit("error", e)
                                                }))), u.enable()))) : c ? (this.map.url = r.nameToUrl(c), void this.load()) : ((n = bind(this, (function (e) {
                                                this.init([], (function () {
                                                        return e
                                                    }), null, {
                                                    enabled: !0
                                                })
                                            }))).error = bind(this, (function (e) {
                                            this.inited = !0,
                                            this.error = e,
                                            e.requireModules = [t],
                                            eachProp(s, (function (e) {
                                                    0 === e.map.id.indexOf(t + "_unnormalized") && k(e.map.id)
                                                })),
                                            y(e)
                                        })), n.fromText = bind(this, (function (i, o) {
                                            var s = e.name,
                                            u = q(s),
                                            c = useInteractive;
                                            o && (i = o),
                                            c && (useInteractive = !1),
                                            E(u),
                                            hasProp(a.config, t) && (a.config[s] = a.config[t]);
                                            try {
                                                req.exec(i)
                                            } catch (e) {
                                                return y(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]))
                                            }
                                            c && (useInteractive = !0),
                                            this.depMaps.push(u),
                                            r.completeLoad(s),
                                            f([s], n)
                                        })), void i.load(e.name, f, n, a))
                        }))),
                r.enable(i, this),
                this.pluginMaps[i.id] = i
            },
            enable: function () {
                u[this.map.id] = this,
                this.enabled = !0,
                this.enabling = !0,
                each(this.depMaps, bind(this, (function (e, t) {
                            var i,
                            o,
                            a;
                            if ("string" == typeof e) {
                                if (e = q(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, a = getOwn(n, e.id))
                                    return void(this.depExports[t] = a(this));
                                this.depCount += 1,
                                w(e, "defined", bind(this, (function (e) {
                                            this.undefed || (this.defineDep(t, e), this.check())
                                        }))),
                                this.errback ? w(e, "error", bind(this, this.errback)) : this.events.error && w(e, "error", bind(this, (function (e) {
                                            this.emit("error", e)
                                        })))
                            }
                            i = e.id,
                            o = s[i],
                            hasProp(n, i) || !o || o.enabled || r.enable(e, this)
                        }))),
                eachProp(this.pluginMaps, bind(this, (function (e) {
                            var t = getOwn(s, e.id);
                            t && !t.enabled && r.enable(e, this)
                        }))),
                this.enabling = !1,
                this.check()
            },
            on: function (e, t) {
                var i = this.events[e];
                i || (i = this.events[e] = []),
                i.push(t)
            },
            emit: function (e, t) {
                each(this.events[e], (function (e) {
                        e(t)
                    })),
                "error" === e && delete this.events[e]
            }
        },
        (r = {
                config: a,
                contextName: e,
                registry: s,
                defined: p,
                urlFetched: f,
                defQueue: d,
                defQueueMap: {},
                Module: i,
                makeModuleMap: q,
                nextTick: req.nextTick,
                onError: y,
                configure: function (e) {
                    if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
                        var t = e.urlArgs;
                        e.urlArgs = function (e, i) {
                            return (-1 === i.indexOf("?") ? "?" : "&") + t
                        }
                    }
                    var i = a.shim,
                    n = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                    eachProp(e, (function (e, t) {
                            n[t] ? (a[t] || (a[t] = {}), mixin(a[t], e, !0, !0)) : a[t] = e
                        })),
                    e.bundles && eachProp(e.bundles, (function (e, t) {
                            each(e, (function (e) {
                                    e !== t && (l[e] = t)
                                }))
                        })),
                    e.shim && (eachProp(e.shim, (function (e, t) {
                                isArray(e) && (e = {
                                        deps: e
                                    }),
                                !e.exports && !e.init || e.exportsFn || (e.exportsFn = r.makeShimExports(e)),
                                i[t] = e
                            })), a.shim = i),
                    e.packages && each(e.packages, (function (e) {
                            var t;
                            t = (e = "string" == typeof e ? {
                                    name: e
                                }
                                 : e).name,
                            e.location && (a.paths[t] = e.location),
                            a.pkgs[t] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                        })),
                    eachProp(s, (function (e, t) {
                            e.inited || e.map.unnormalized || (e.map = q(t, null, !0))
                        })),
                    (e.deps || e.callback) && r.require(e.deps || [], e.callback)
                },
                makeShimExports: function (e) {
                    return function () {
                        var t;
                        return e.init && (t = e.init.apply(global, arguments)),
                        t || e.exports && getGlobal(e.exports)
                    }
                },
                makeRequire: function (t, i) {
                    function o(a, u, c) {
                        var d,
                        f;
                        return i.enableBuildCallback && u && isFunction(u) && (u.__requireJsBuild = !0),
                        "string" == typeof a ? isFunction(u) ? y(makeError("requireargs", "Invalid require call"), c) : t && hasProp(n, a) ? n[a](s[t.id]) : req.get ? req.get(r, a, t, o) : (d = q(a, t, !1, !0).id, hasProp(p, d) ? p[d] : y(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (T(), r.nextTick((function () {
                                    T(),
                                    (f = E(q(null, t))).skipMap = i.skipMap,
                                    f.init(a, u, c, {
                                        enabled: !0
                                    }),
                                    O()
                                })), o)
                    }
                    return i = i || {},
                    mixin(o, {
                        isBrowser: isBrowser,
                        toUrl: function (e) {
                            var i,
                            n = e.lastIndexOf("."),
                            o = e.split("/")[0];
                            return -1 !== n && (!("." === o || ".." === o) || n > 1) && (i = e.substring(n, e.length), e = e.substring(0, n)),
                            r.nameToUrl(g(e, t && t.id, !0), i, !0)
                        },
                        defined: function (e) {
                            return hasProp(p, q(e, t, !1, !0).id)
                        },
                        specified: function (e) {
                            return e = q(e, t, !1, !0).id,
                            hasProp(p, e) || hasProp(s, e)
                        }
                    }),
                    t || (o.undef = function (e) {
                        S();
                        var i = q(e, t, !0),
                        n = getOwn(s, e);
                        n.undefed = !0,
                        v(e),
                        delete p[e],
                        delete f[i.url],
                        delete c[e],
                        eachReverse(d, (function (t, i) {
                                t[0] === e && d.splice(i, 1)
                            })),
                        delete r.defQueueMap[e],
                        n && (n.events.defined && (c[e] = n.events), k(e))
                    }),
                    o
                },
                enable: function (e) {
                    getOwn(s, e.id) && E(e).enable()
                },
                completeLoad: function (e) {
                    var t,
                    i,
                    n,
                    o = getOwn(a.shim, e) || {},
                    u = o.exports;
                    for (S(); d.length; ) {
                        if (null === (i = d.shift())[0]) {
                            if (i[0] = e, t)
                                break;
                            t = !0
                        } else
                            i[0] === e && (t = !0);
                        j(i)
                    }
                    if (r.defQueueMap = {}, n = getOwn(s, e), !t && !hasProp(p, e) && n && !n.inited) {
                        if (!(!a.enforceDefine || u && getGlobal(u)))
                            return x(e) ? void 0 : y(makeError("nodefine", "No define call for " + e, null, [e]));
                        j([e, o.deps || [], o.exportsFn])
                    }
                    O()
                },
                nameToUrl: function (e, t, i) {
                    var n,
                    o,
                    s,
                    u,
                    c,
                    d,
                    p = getOwn(a.pkgs, e);
                    if (p && (e = p), d = getOwn(l, e))
                        return r.nameToUrl(d, t, i);
                    if (req.jsExtRegExp.test(e))
                        u = e + (t || "");
                    else {
                        for (n = a.paths, s = (o = e.split("/")).length; s > 0; s -= 1)
                            if (c = getOwn(n, o.slice(0, s).join("/"))) {
                                isArray(c) && (c = c[0]),
                                o.splice(0, s, c);
                                break
                            }
                        u = o.join("/"),
                        u = ("/" === (u += t || (/^data\:|^blob\:|\?/.test(u) || i ? "" : ".js")).charAt(0) || u.match(/^[\w\+\.\-]+:/) ? "" : a.baseUrl) + u
                    }
                    return a.urlArgs && !/^blob\:/.test(u) ? u + a.urlArgs(e, u) : u
                },
                load: function (e, t) {
                    req.load(r, e, t)
                },
                execCb: function (e, t, i, r) {
                    return t.apply(r, i)
                },
                onScriptLoad: function (e) {
                    if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                        interactiveScript = null;
                        var t = R(e);
                        r.completeLoad(t.id)
                    }
                },
                onScriptError: function (e) {
                    var t = R(e);
                    if (!x(t.id)) {
                        var i = [];
                        return eachProp(s, (function (e, r) {
                                0 !== r.indexOf("_@r") && each(e.depMaps, (function (e) {
                                        if (e.id === t.id)
                                            return i.push(r), !0
                                    }))
                            })),
                        y(makeError("scripterror", 'Script error for "' + t.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), e, [t.id]))
                    }
                }
            }).require = r.makeRequire(),
        r
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState || eachReverse(scripts(), (function (e) {
                if ("interactive" === e.readyState)
                    return interactiveScript = e
            })),
        interactiveScript
    }
})(this, "undefined" == typeof setTimeout ? void 0 : setTimeout);

String.prototype.extract = function (iStartIndex, iEndIndex) {
    var startIndex = iStartIndex || 0;
    var afterEndIndex = isNaN(iEndIndex) ? this.length : iEndIndex + 1;
    return this.slice(startIndex, afterEndIndex)
};