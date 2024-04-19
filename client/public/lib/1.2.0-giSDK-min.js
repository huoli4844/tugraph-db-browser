!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(require("React")))
    : "function" == typeof define && define.amd
    ? define(["React"], t)
    : "object" == typeof exports
    ? (exports.GI_SDK_APP = t(require("React")))
    : (e.GI_SDK_APP = t(e.React));
})(self, (e) =>
  (() => {
    "use strict";
    var t = {
        24: (t) => {
          t.exports = e;
        },
      },
      n = {};
    function o(e) {
      var r = n[e];
      if (void 0 !== r) return r.exports;
      var a = (n[e] = { exports: {} });
      return t[e](a, a.exports, o), a.exports;
    }
    (o.d = (e, t) => {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (o.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var r = {};
    return (
      (() => {
        o.r(r), o.d(r, { default: () => i });
        var e = o(24),
          t = function (e, t, n, o) {
            return new (n || (n = Promise))(function (r, a) {
              function i(e) {
                try {
                  s(o.next(e));
                } catch (e) {
                  a(e);
                }
              }
              function c(e) {
                try {
                  s(o.throw(e));
                } catch (e) {
                  a(e);
                }
              }
              function s(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(i, c);
              }
              s((o = o.apply(e, t || [])).next());
            });
          };
        const n = (e) =>
            t(void 0, void 0, void 0, function* () {
              return Promise.all([
                ...e.map((e) => {
                  const n = window[e.global];
                  return n
                    ? Object.assign(Object.assign({}, n), e)
                    : ((e) =>
                        t(void 0, void 0, void 0, function* () {
                          return new Promise((t) => {
                            const n = document.createElement("script");
                            (n.type = "text/javascript"),
                              (n.charset = "UTF-8"),
                              (n.id = e.global || e.url),
                              (n.src = e.url),
                              (n.defer = !0),
                              (n.async = !1),
                              document.body.append(n);
                            const o = document.createElement("link"),
                              r = e.url.replace("min.js", "css");
                            (o.href = r),
                              (o.type = "text/css"),
                              (o.rel = "stylesheet"),
                              document.head.append(o),
                              (n.onload = () => {
                                t(n);
                              }),
                              (n.onerror = () => {
                                t(n);
                              });
                          });
                        }))(e).then((t) => {
                        let n = window[e.global];
                        if (n)
                          return (
                            n.hasOwnProperty("default") && (n = n.default),
                            Object.assign(Object.assign({}, n), e)
                          );
                        console.warn(`${e.global} is not found`);
                      });
                }),
              ]).then((e) => e.filter((e) => e));
            }),
          a = (t) => {
            const { title: n } = t;
            return e.createElement(
              "div",
              { className: "spinner-box" },
              e.createElement(
                "div",
                { className: "configure-border-1" },
                e.createElement("div", { className: "configure-core" })
              ),
              e.createElement(
                "div",
                { className: "configure-border-2" },
                e.createElement("div", { className: "configure-core" })
              ),
              e.createElement("div", { className: "loading-text" }, n)
            );
          };
        const i = (t) => {
          const { id: o, service: r, loadingText: i = "正在加载图应用..." } = t,
            [c, s] = e.useState({
              isReady: !1,
              assets: null,
              config: {},
              services: [],
              ThemeComponent: () => null,
              GISDK: () => e.createElement(e.Fragment, null),
            });
          e.useEffect(() => {
            var e, t, a, i;
            (e = void 0),
              (t = void 0),
              (i = function* () {
                try {
                  const { data: e } = yield r(o),
                    {
                      dataset: t,
                      workbook: a,
                      GI_ASSETS_PACKAGES: i,
                      deps: c,
                    } = e,
                    { projectConfig: l, theme: d = "light" } = a,
                    { engineContext: u } = t,
                    { Graphin: f, GISDK: m } = c,
                    p = (function (e, t) {
                      var n = {};
                      for (var o in e)
                        Object.prototype.hasOwnProperty.call(e, o) &&
                          t.indexOf(o) < 0 &&
                          (n[o] = e[o]);
                      if (
                        null != e &&
                        "function" == typeof Object.getOwnPropertySymbols
                      ) {
                        var r = 0;
                        for (
                          o = Object.getOwnPropertySymbols(e);
                          r < o.length;
                          r++
                        )
                          t.indexOf(o[r]) < 0 &&
                            Object.prototype.propertyIsEnumerable.call(
                              e,
                              o[r]
                            ) &&
                            (n[o[r]] = e[o[r]]);
                      }
                      return n;
                    })(c, ["Graphin", "GISDK"]);
                  yield n(Object.values(p)), yield n([f]), yield n([m]);
                  const { default: y, utils: v } = window.GISDK,
                    g = yield v.loaderCombinedAssets(Object.values(i));
                  window.localStorage.setItem(
                    "SERVER_ENGINE_CONTEXT",
                    JSON.stringify(u)
                  ),
                    window.localStorage.setItem("@theme", d),
                    "GI" === t.engineId &&
                      (window.LOCAL_DATA_FOR_GI_ENGINE = {
                        data: t.data.transData,
                        schemaData: t.schemaData,
                      });
                  try {
                    yield v.registerIconFonts(g.icons);
                  } catch (e) {
                    console.log("register font error", e);
                  }
                  const b = v.getCombineServices(g.services);
                  s((e) =>
                    Object.assign(Object.assign({}, e), {
                      isReady: !0,
                      assets: g,
                      services: b,
                      config: l || a.config,
                      ThemeComponent:
                        (window.GI_THEME_ANTD &&
                          window.GI_THEME_ANTD.default) ||
                        (() => null),
                      GISDK: y,
                    })
                  );
                } catch (e) {
                  console.log(e);
                }
              }),
              new ((a = void 0) || (a = Promise))(function (n, o) {
                function r(e) {
                  try {
                    s(i.next(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function c(e) {
                  try {
                    s(i.throw(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function s(e) {
                  var t;
                  e.done
                    ? n(e.value)
                    : ((t = e.value),
                      t instanceof a
                        ? t
                        : new a(function (e) {
                            e(t);
                          })).then(r, c);
                }
                s((i = i.apply(e, t || [])).next());
              });
          }, []);
          const {
            assets: l,
            isReady: d,
            config: u,
            services: f,
            ThemeComponent: m,
            GISDK: p,
          } = c;
          return d
            ? e.createElement(
                e.Fragment,
                null,
                e.createElement(m, {
                  style: { visibility: "hidden", position: "absolute" },
                }),
                e.createElement(p, {
                  config: u,
                  assets: l,
                  services: f,
                  id: `GI_STUDIO_${o}`,
                })
              )
            : e.createElement("div", null, e.createElement(a, { title: i }));
        };
      })(),
      r
    );
  })()
);
