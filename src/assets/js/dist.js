var x = new WeakMap, N = !0, k = !0, X = () => {
}, M = {createHTML: t => t}, g = {
  anchor: `
a[href^="http"]:not([download]):not([target]),
a[href^="."]:not([download]):not([target]),
a[href^="/"]:not([download]):not([target])
`,
  form: `
form:not([target])
`,
  focused: `
:focus,
:hover,
button[type=submit],
button:not([type])`,
  className: "fetching",
  credentials: "same-origin",
  interval: 1e3,
  redirect: "follow",
  retries: 1 / 0,
  onContract: X,
  onError: console.error
}, F = t => t, {
  defaults: P,
  fetch: Y,
  listen: j,
  on: w,
  parse: S,
  sse: E,
  trigger: q,
  when: Z
} = A({window: typeof globalThis != "undefined" && globalThis}), R = {
  event: null, target: null, request: null, session: null, retries: null, async fetch() {
    let {request: t, session: e} = this, {window: i} = e, s;
    try {
      let c = await i.fetch(t.clone()), {url: n = t.url} = c, l = await c.text();
      s = S(l, n), await this.trigger(s, n)
    } catch (c) {
      let {interval: n, retries: l = e.retries} = this;
      if (!s && l) this.retries -= 1, console.log(`Retrying in ${n / 1e3}s`), await z(n), await this.fetch(); else return Promise.reject(c)
    }
  }, async trigger(t, e) {
    let i = [];
    return this.session.contracts.forEach(({selector: s, listener: c}) => {
      i.push(...[...t.querySelectorAll(s)].map(n => l => c(n, l)))
    }), Promise.all(i.map(J, {url: e}))
  }
}, b = {};
b.blur = ["blur", "touchcancel", "touchleave"];
b.blur.listener = function (t, e) {
  return t.call(this, e)
};
b.click = ["click", "touchend"];
b.click.listener = function (t, e) {
  if (!e.touches || e.touches.length === 1) return t.call(this, e)
};
b.focus = ["focus", "touchstart"];
b.focus.listener = b.blur.listener;

function I(t, e) {
  return e && e.createPolicy && !x.has(e) && x.set(e, e.createPolicy("anticore", M)), (x.get(e) || M).createHTML(t)
}

function z(t) {
  return new Promise(e => setTimeout(e, t))
}

function D(t, e, i, s, c) {
  let n = b[e] || [e], {length: l} = n;
  for (let u = 0; u < l; u += 1) {
    let p = n[u];
    `on${p}` in i && i[t](p, s, c)
  }
}

async function J(t) {
  let {url: e} = this;
  await t(e)
}

function H(t, e) {
  let {window: i} = t, {Request: s} = i, {init: c, url: n} = K(t, e);
  return new s(n, c)
}

function K(t, e) {
  let {credentials: i, redirect: s, window: c} = t, {
      FormData: n,
      Headers: l,
      URL: u,
      URLSearchParams: p
    } = c, {action: y, elements: L, href: h} = e, d = (e.method || "GET").toUpperCase(), r = !["GET", "HEAD"].includes(d),
    o = new u(y || h || e.ownerDocument.location.href);
  if (L && !r) {
    let a = [o.search, new n(e)].filter(O);
    o.search = new p(a.join("&")).toString()
  }
  return {
    init: {
      ...r && {body: new n(e)},
      credentials: i,
      headers: new l({"X-Requested-With": "XMLHttpRequest"}),
      method: d,
      redirect: s
    }, url: o.toString()
  }
}

function O(t) {
  return t.toString().length
}

function A({
             anchor: t = g.anchor,
             className: e = g.className,
             credentials: i = g.credentials,
             focused: s = g.focused,
             form: c = g.form,
             interval: n = g.interval,
             onContract: l = g.onContract,
             onError: u = g.onError,
             redirect: p = g.redirect,
             retries: y = g.retries,
             window: L
           }) {
  let h = {
    className: e,
    credentials: i,
    interval: n,
    onContract: l,
    onError: u,
    redirect: p,
    retries: y,
    window: L,
    contracts: [],
    promise: Promise.resolve(),
    url: L.location.href
  }, d = {
    defaults() {
      d.on(t, r => {
        d.listen("click", r, o => d.fetch(H(h, r), o, r).catch(u))
      }), d.on(c, r => {
        d.listen("submit", r, o => (r.querySelectorAll(".error").forEach(a => a.remove()), d.fetch(H(h, r), o, r).catch(u)))
      })
    }, async fetch(r, o, a = o && o.target) {
      let f = {...R, event: o, request: r, target: a, session: h};
      if (!o) return f.fetch();
      if (o.defaultPrevented || o.cancelBubble) return;
      let m = o.type === "submit" ? a.querySelector(s) : a;
      return o.preventDefault(), h.promise = h.promise.then(async () => {
        m.classList.add(e), await f.fetch(), m.classList.remove(e)
      }), h.promise
    }, listen(r, o, a, f = {}) {
      let m = b[r], T = Array.isArray(m) ? m.listener.bind(o, a) : a;
      return D("addEventListener", r, o, T, f), () => D("removeEventListener", r, o, T, f)
    }, on(r, o) {
      h.contracts.push({listener: o, selector: r}), h.onContract(r, o)
    }, parse(r, o) {
      let a = globalThis.document.createElement("body");
      return a.classList.add("anticore"), a.id = o, a.innerHTML = I(r, globalThis.trustedTypes), a
    }, when(r, {url: o}, a, f = F) {
      let m = `${new URL(a, o)}`;
      return d.on(r, async (T, G) => {
        let v = await import(m);
        return f(v.default, v)(T, G)
      })
    }, sse(r, o, a = S) {
      let f = new globalThis.EventSource(r, o), m = !1;
      return j("beforeunload", globalThis, () => {
        m = !0
      }, {once: N, passive: k}), j("message", f, T => {
        d.trigger(a(T.data, r), r)
      }, {passive: k}), j("error", f, T => {
        m || u(T)
      }, {passive: k}), f
    }, trigger(r = h.window.document, o = h.window.document.location.href) {
      return {...R, session: h}.trigger(r, o).catch(u)
    }
  };
  return d
}

w("body:not(.anticore) [data-sse]", t => {
  E(t.dataset.sse)
});

function $({target: {classList: t}, type: e}) {
  e === "input" ? t.add("highlighted") : t.remove("highlighted")
}

w("form input, form select, form textarea", t => {
  j("input", t, $, {passive: !0}), j("blur", t, $, {passive: !0})
});
w("main.congrats", t => {
  t.querySelector("h1").classList.add("success")
});
P();
var C = t => {
  let {dataset: e, ownerDocument: i} = t, {
      after: s,
      append: c,
      before: n,
      prepend: l,
      replace: u
    } = e, [p] = [s, c, n, l, u].filter(Boolean),
    y = new Map([[s, "after"], [c, "append"], [n, "before"], [l, "prepend"], [u, "replaceWith"]]).get(p);
  i.querySelector(p)?.[y](t)
};
w(".anticore > [data-before], .anticore > [data-after], .anticore > [data-prepend], .anticore > [data-append], .anticore > [data-replace]", C);
var W = new WeakMap, {history: U} = globalThis, Q = ({outerHTML: t}) => t, V = t => {
  let {name: e, nodeName: i, property: s, ownerDocument: c} = t, n = i.toLowerCase(),
    l = n !== "meta" ? n : `${n}[${e ? "name" : "property"}="${e || s}"]`;
  c.querySelector(l).replaceWith(t)
};
j("popstate", globalThis, ({state: t}) => {
  let e = S(t, globalThis.document.location.href);
  W.set(e, !0), q(e)
});
var B = (t, e) => {
  let {ownerDocument: i} = t, s = t.getRootNode(), c = t.closest("body"), n = s.querySelector("title"),
    l = s.querySelectorAll("meta[name], meta[property]"), u = [n, ...l, t], y = [u.map(Q).join(""), n.innerHTML, e];
  if (i.contains(t)) {
    U.replaceState(...y);
    return
  }
  u.forEach(V), (!W.has(c) || !t.classList.contains("error")) && U.pushState(...y), globalThis.location.hash || globalThis.scrollTo(0, 0)
};
w("main", B);
q();
