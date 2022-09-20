const Lu = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const r of o.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerpolicy && (o.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = i(s);
    fetch(s.href, o);
  }
};
Lu();
function Cr(e, t) {
  const i = Object.create(null),
    n = e.split(",");
  for (let s = 0; s < n.length; s++) i[n[s]] = !0;
  return t ? (s) => !!i[s.toLowerCase()] : (s) => !!i[s];
}
const Pu =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Au = Cr(Pu);
function bc(e) {
  return !!e || e === "";
}
function Mr(e) {
  if (pt(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const n = e[i],
        s = Qt(n) ? Bu(n) : Mr(n);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (Qt(e)) return e;
    if (Kt(e)) return e;
  }
}
const Iu = /;(?![^(]*\))/g,
  Ru = /:(.+)/;
function Bu(e) {
  const t = {};
  return (
    e.split(Iu).forEach((i) => {
      if (i) {
        const n = i.split(Ru);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }),
    t
  );
}
function Er(e) {
  let t = "";
  if (Qt(e)) t = e;
  else if (pt(e))
    for (let i = 0; i < e.length; i++) {
      const n = Er(e[i]);
      n && (t += n + " ");
    }
  else if (Kt(e)) for (const i in e) e[i] && (t += i + " ");
  return t.trim();
}
function Fu(e, t) {
  if (e.length !== t.length) return !1;
  let i = !0;
  for (let n = 0; i && n < e.length; n++) i = Zi(e[n], t[n]);
  return i;
}
function Zi(e, t) {
  if (e === t) return !0;
  let i = fa(e),
    n = fa(t);
  if (i || n) return i && n ? e.getTime() === t.getTime() : !1;
  if (((i = Wn(e)), (n = Wn(t)), i || n)) return e === t;
  if (((i = pt(e)), (n = pt(t)), i || n)) return i && n ? Fu(e, t) : !1;
  if (((i = Kt(e)), (n = Kt(t)), i || n)) {
    if (!i || !n) return !1;
    const s = Object.keys(e).length,
      o = Object.keys(t).length;
    if (s !== o) return !1;
    for (const r in e) {
      const a = e.hasOwnProperty(r),
        c = t.hasOwnProperty(r);
      if ((a && !c) || (!a && c) || !Zi(e[r], t[r])) return !1;
    }
  }
  return String(e) === String(t);
}
function xc(e, t) {
  return e.findIndex((i) => Zi(i, t));
}
const ve = (e) =>
    Qt(e)
      ? e
      : e == null
      ? ""
      : pt(e) || (Kt(e) && (e.toString === Cc || !yt(e.toString)))
      ? JSON.stringify(e, wc, 2)
      : String(e),
  wc = (e, t) =>
    t && t.__v_isRef
      ? wc(e, t.value)
      : Xi(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (i, [n, s]) => ((i[`${n} =>`] = s), i),
            {}
          ),
        }
      : Zs(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Kt(t) && !pt(t) && !Mc(t)
      ? String(t)
      : t,
  Rt = {},
  Ui = [],
  Ce = () => {},
  Hu = () => !1,
  $u = /^on[^a-z]/,
  Gs = (e) => $u.test(e),
  Sr = (e) => e.startsWith("onUpdate:"),
  se = Object.assign,
  Or = (e, t) => {
    const i = e.indexOf(t);
    i > -1 && e.splice(i, 1);
  },
  Wu = Object.prototype.hasOwnProperty,
  Mt = (e, t) => Wu.call(e, t),
  pt = Array.isArray,
  Xi = (e) => es(e) === "[object Map]",
  Zs = (e) => es(e) === "[object Set]",
  fa = (e) => es(e) === "[object Date]",
  yt = (e) => typeof e == "function",
  Qt = (e) => typeof e == "string",
  Wn = (e) => typeof e == "symbol",
  Kt = (e) => e !== null && typeof e == "object",
  kc = (e) => Kt(e) && yt(e.then) && yt(e.catch),
  Cc = Object.prototype.toString,
  es = (e) => Cc.call(e),
  zu = (e) => es(e).slice(8, -1),
  Mc = (e) => es(e) === "[object Object]",
  Tr = (e) =>
    Qt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Os = Cr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  to = (e) => {
    const t = Object.create(null);
    return (i) => t[i] || (t[i] = e(i));
  },
  Nu = /-(\w)/g,
  Be = to((e) => e.replace(Nu, (t, i) => (i ? i.toUpperCase() : ""))),
  Vu = /\B([A-Z])/g,
  ln = to((e) => e.replace(Vu, "-$1").toLowerCase()),
  eo = to((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Eo = to((e) => (e ? `on${eo(e)}` : "")),
  zn = (e, t) => !Object.is(e, t),
  Ts = (e, t) => {
    for (let i = 0; i < e.length; i++) e[i](t);
  },
  Is = (e, t, i) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: i });
  },
  Ko = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let pa;
const ju = () =>
  pa ||
  (pa =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Pe;
class qu {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        Pe &&
        ((this.parent = Pe),
        (this.index = (Pe.scopes || (Pe.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active) {
      const i = Pe;
      try {
        return (Pe = this), t();
      } finally {
        Pe = i;
      }
    }
  }
  on() {
    Pe = this;
  }
  off() {
    Pe = this.parent;
  }
  stop(t) {
    if (this.active) {
      let i, n;
      for (i = 0, n = this.effects.length; i < n; i++) this.effects[i].stop();
      for (i = 0, n = this.cleanups.length; i < n; i++) this.cleanups[i]();
      if (this.scopes)
        for (i = 0, n = this.scopes.length; i < n; i++) this.scopes[i].stop(!0);
      if (this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Ku(e, t = Pe) {
  t && t.active && t.effects.push(e);
}
const Dr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Ec = (e) => (e.w & pi) > 0,
  Sc = (e) => (e.n & pi) > 0,
  Yu = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= pi;
  },
  Uu = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let i = 0;
      for (let n = 0; n < t.length; n++) {
        const s = t[n];
        Ec(s) && !Sc(s) ? s.delete(e) : (t[i++] = s),
          (s.w &= ~pi),
          (s.n &= ~pi);
      }
      t.length = i;
    }
  },
  Yo = new WeakMap();
let Cn = 0,
  pi = 1;
const Uo = 30;
let ye;
const Pi = Symbol(""),
  Xo = Symbol("");
class Lr {
  constructor(t, i = null, n) {
    (this.fn = t),
      (this.scheduler = i),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Ku(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ye,
      i = hi;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ye),
        (ye = this),
        (hi = !0),
        (pi = 1 << ++Cn),
        Cn <= Uo ? Yu(this) : ga(this),
        this.fn()
      );
    } finally {
      Cn <= Uo && Uu(this),
        (pi = 1 << --Cn),
        (ye = this.parent),
        (hi = i),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ye === this
      ? (this.deferStop = !0)
      : this.active &&
        (ga(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ga(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let i = 0; i < t.length; i++) t[i].delete(e);
    t.length = 0;
  }
}
let hi = !0;
const Oc = [];
function cn() {
  Oc.push(hi), (hi = !1);
}
function hn() {
  const e = Oc.pop();
  hi = e === void 0 ? !0 : e;
}
function ue(e, t, i) {
  if (hi && ye) {
    let n = Yo.get(e);
    n || Yo.set(e, (n = new Map()));
    let s = n.get(i);
    s || n.set(i, (s = Dr())), Tc(s);
  }
}
function Tc(e, t) {
  let i = !1;
  Cn <= Uo ? Sc(e) || ((e.n |= pi), (i = !Ec(e))) : (i = !e.has(ye)),
    i && (e.add(ye), ye.deps.push(e));
}
function Qe(e, t, i, n, s, o) {
  const r = Yo.get(e);
  if (!r) return;
  let a = [];
  if (t === "clear") a = [...r.values()];
  else if (i === "length" && pt(e))
    r.forEach((c, u) => {
      (u === "length" || u >= n) && a.push(c);
    });
  else
    switch ((i !== void 0 && a.push(r.get(i)), t)) {
      case "add":
        pt(e)
          ? Tr(i) && a.push(r.get("length"))
          : (a.push(r.get(Pi)), Xi(e) && a.push(r.get(Xo)));
        break;
      case "delete":
        pt(e) || (a.push(r.get(Pi)), Xi(e) && a.push(r.get(Xo)));
        break;
      case "set":
        Xi(e) && a.push(r.get(Pi));
        break;
    }
  if (a.length === 1) a[0] && Qo(a[0]);
  else {
    const c = [];
    for (const u of a) u && c.push(...u);
    Qo(Dr(c));
  }
}
function Qo(e, t) {
  const i = pt(e) ? e : [...e];
  for (const n of i) n.computed && ma(n);
  for (const n of i) n.computed || ma(n);
}
function ma(e, t) {
  (e !== ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Xu = Cr("__proto__,__v_isRef,__isVue"),
  Dc = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Wn)
  ),
  Qu = Pr(),
  Ju = Pr(!1, !0),
  Gu = Pr(!0),
  va = Zu();
function Zu() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...i) {
        const n = Dt(this);
        for (let o = 0, r = this.length; o < r; o++) ue(n, "get", o + "");
        const s = n[t](...i);
        return s === -1 || s === !1 ? n[t](...i.map(Dt)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...i) {
        cn();
        const n = Dt(this)[t].apply(this, i);
        return hn(), n;
      };
    }),
    e
  );
}
function Pr(e = !1, t = !1) {
  return function (n, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && o === (e ? (t ? gd : Rc) : t ? Ic : Ac).get(n))
      return n;
    const r = pt(n);
    if (!e && r && Mt(va, s)) return Reflect.get(va, s, o);
    const a = Reflect.get(n, s, o);
    return (Wn(s) ? Dc.has(s) : Xu(s)) || (e || ue(n, "get", s), t)
      ? a
      : jt(a)
      ? r && Tr(s)
        ? a
        : a.value
      : Kt(a)
      ? e
        ? Bc(a)
        : is(a)
      : a;
  };
}
const td = Lc(),
  ed = Lc(!0);
function Lc(e = !1) {
  return function (i, n, s, o) {
    let r = i[n];
    if (Nn(r) && jt(r) && !jt(s)) return !1;
    if (
      !e &&
      !Nn(s) &&
      (Jo(s) || ((s = Dt(s)), (r = Dt(r))), !pt(i) && jt(r) && !jt(s))
    )
      return (r.value = s), !0;
    const a = pt(i) && Tr(n) ? Number(n) < i.length : Mt(i, n),
      c = Reflect.set(i, n, s, o);
    return (
      i === Dt(o) && (a ? zn(s, r) && Qe(i, "set", n, s) : Qe(i, "add", n, s)),
      c
    );
  };
}
function id(e, t) {
  const i = Mt(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && i && Qe(e, "delete", t, void 0), n;
}
function nd(e, t) {
  const i = Reflect.has(e, t);
  return (!Wn(t) || !Dc.has(t)) && ue(e, "has", t), i;
}
function sd(e) {
  return ue(e, "iterate", pt(e) ? "length" : Pi), Reflect.ownKeys(e);
}
const Pc = { get: Qu, set: td, deleteProperty: id, has: nd, ownKeys: sd },
  od = {
    get: Gu,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  rd = se({}, Pc, { get: Ju, set: ed }),
  Ar = (e) => e,
  io = (e) => Reflect.getPrototypeOf(e);
function hs(e, t, i = !1, n = !1) {
  e = e.__v_raw;
  const s = Dt(e),
    o = Dt(t);
  i || (t !== o && ue(s, "get", t), ue(s, "get", o));
  const { has: r } = io(s),
    a = n ? Ar : i ? Br : Vn;
  if (r.call(s, t)) return a(e.get(t));
  if (r.call(s, o)) return a(e.get(o));
  e !== s && e.get(t);
}
function us(e, t = !1) {
  const i = this.__v_raw,
    n = Dt(i),
    s = Dt(e);
  return (
    t || (e !== s && ue(n, "has", e), ue(n, "has", s)),
    e === s ? i.has(e) : i.has(e) || i.has(s)
  );
}
function ds(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ue(Dt(e), "iterate", Pi), Reflect.get(e, "size", e)
  );
}
function _a(e) {
  e = Dt(e);
  const t = Dt(this);
  return io(t).has.call(t, e) || (t.add(e), Qe(t, "add", e, e)), this;
}
function ya(e, t) {
  t = Dt(t);
  const i = Dt(this),
    { has: n, get: s } = io(i);
  let o = n.call(i, e);
  o || ((e = Dt(e)), (o = n.call(i, e)));
  const r = s.call(i, e);
  return (
    i.set(e, t), o ? zn(t, r) && Qe(i, "set", e, t) : Qe(i, "add", e, t), this
  );
}
function ba(e) {
  const t = Dt(this),
    { has: i, get: n } = io(t);
  let s = i.call(t, e);
  s || ((e = Dt(e)), (s = i.call(t, e))), n && n.call(t, e);
  const o = t.delete(e);
  return s && Qe(t, "delete", e, void 0), o;
}
function xa() {
  const e = Dt(this),
    t = e.size !== 0,
    i = e.clear();
  return t && Qe(e, "clear", void 0, void 0), i;
}
function fs(e, t) {
  return function (n, s) {
    const o = this,
      r = o.__v_raw,
      a = Dt(r),
      c = t ? Ar : e ? Br : Vn;
    return (
      !e && ue(a, "iterate", Pi), r.forEach((u, f) => n.call(s, c(u), c(f), o))
    );
  };
}
function ps(e, t, i) {
  return function (...n) {
    const s = this.__v_raw,
      o = Dt(s),
      r = Xi(o),
      a = e === "entries" || (e === Symbol.iterator && r),
      c = e === "keys" && r,
      u = s[e](...n),
      f = i ? Ar : t ? Br : Vn;
    return (
      !t && ue(o, "iterate", c ? Xo : Pi),
      {
        next() {
          const { value: m, done: b } = u.next();
          return b
            ? { value: m, done: b }
            : { value: a ? [f(m[0]), f(m[1])] : f(m), done: b };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ze(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ad() {
  const e = {
      get(o) {
        return hs(this, o);
      },
      get size() {
        return ds(this);
      },
      has: us,
      add: _a,
      set: ya,
      delete: ba,
      clear: xa,
      forEach: fs(!1, !1),
    },
    t = {
      get(o) {
        return hs(this, o, !1, !0);
      },
      get size() {
        return ds(this);
      },
      has: us,
      add: _a,
      set: ya,
      delete: ba,
      clear: xa,
      forEach: fs(!1, !0),
    },
    i = {
      get(o) {
        return hs(this, o, !0);
      },
      get size() {
        return ds(this, !0);
      },
      has(o) {
        return us.call(this, o, !0);
      },
      add: Ze("add"),
      set: Ze("set"),
      delete: Ze("delete"),
      clear: Ze("clear"),
      forEach: fs(!0, !1),
    },
    n = {
      get(o) {
        return hs(this, o, !0, !0);
      },
      get size() {
        return ds(this, !0);
      },
      has(o) {
        return us.call(this, o, !0);
      },
      add: Ze("add"),
      set: Ze("set"),
      delete: Ze("delete"),
      clear: Ze("clear"),
      forEach: fs(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = ps(o, !1, !1)),
        (i[o] = ps(o, !0, !1)),
        (t[o] = ps(o, !1, !0)),
        (n[o] = ps(o, !0, !0));
    }),
    [e, i, t, n]
  );
}
const [ld, cd, hd, ud] = ad();
function Ir(e, t) {
  const i = t ? (e ? ud : hd) : e ? cd : ld;
  return (n, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? n
      : Reflect.get(Mt(i, s) && s in n ? i : n, s, o);
}
const dd = { get: Ir(!1, !1) },
  fd = { get: Ir(!1, !0) },
  pd = { get: Ir(!0, !1) },
  Ac = new WeakMap(),
  Ic = new WeakMap(),
  Rc = new WeakMap(),
  gd = new WeakMap();
function md(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function vd(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : md(zu(e));
}
function is(e) {
  return Nn(e) ? e : Rr(e, !1, Pc, dd, Ac);
}
function _d(e) {
  return Rr(e, !1, rd, fd, Ic);
}
function Bc(e) {
  return Rr(e, !0, od, pd, Rc);
}
function Rr(e, t, i, n, s) {
  if (!Kt(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const r = vd(e);
  if (r === 0) return e;
  const a = new Proxy(e, r === 2 ? n : i);
  return s.set(e, a), a;
}
function Qi(e) {
  return Nn(e) ? Qi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Nn(e) {
  return !!(e && e.__v_isReadonly);
}
function Jo(e) {
  return !!(e && e.__v_isShallow);
}
function Fc(e) {
  return Qi(e) || Nn(e);
}
function Dt(e) {
  const t = e && e.__v_raw;
  return t ? Dt(t) : e;
}
function Hc(e) {
  return Is(e, "__v_skip", !0), e;
}
const Vn = (e) => (Kt(e) ? is(e) : e),
  Br = (e) => (Kt(e) ? Bc(e) : e);
function $c(e) {
  hi && ye && ((e = Dt(e)), Tc(e.dep || (e.dep = Dr())));
}
function Wc(e, t) {
  (e = Dt(e)), e.dep && Qo(e.dep);
}
function jt(e) {
  return !!(e && e.__v_isRef === !0);
}
function le(e) {
  return zc(e, !1);
}
function yd(e) {
  return zc(e, !0);
}
function zc(e, t) {
  return jt(e) ? e : new bd(e, t);
}
class bd {
  constructor(t, i) {
    (this.__v_isShallow = i),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = i ? t : Dt(t)),
      (this._value = i ? t : Vn(t));
  }
  get value() {
    return $c(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : Dt(t)),
      zn(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : Vn(t)),
        Wc(this));
  }
}
function Ft(e) {
  return jt(e) ? e.value : e;
}
const xd = {
  get: (e, t, i) => Ft(Reflect.get(e, t, i)),
  set: (e, t, i, n) => {
    const s = e[t];
    return jt(s) && !jt(i) ? ((s.value = i), !0) : Reflect.set(e, t, i, n);
  },
};
function Nc(e) {
  return Qi(e) ? e : new Proxy(e, xd);
}
class wd {
  constructor(t, i, n, s) {
    (this._setter = i),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new Lr(t, () => {
        this._dirty || ((this._dirty = !0), Wc(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = n);
  }
  get value() {
    const t = Dt(this);
    return (
      $c(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function kd(e, t, i = !1) {
  let n, s;
  const o = yt(e);
  return (
    o ? ((n = e), (s = Ce)) : ((n = e.get), (s = e.set)),
    new wd(n, s, o || !s, i)
  );
}
function ui(e, t, i, n) {
  let s;
  try {
    s = n ? e(...n) : e();
  } catch (o) {
    no(o, t, i);
  }
  return s;
}
function Me(e, t, i, n) {
  if (yt(e)) {
    const o = ui(e, t, i, n);
    return (
      o &&
        kc(o) &&
        o.catch((r) => {
          no(r, t, i);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Me(e[o], t, i, n));
  return s;
}
function no(e, t, i, n = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const r = t.proxy,
      a = i;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, r, a) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      ui(c, null, 10, [e, r, a]);
      return;
    }
  }
  Cd(e, i, s, n);
}
function Cd(e, t, i, n = !0) {
  console.error(e);
}
let Rs = !1,
  Go = !1;
const he = [];
let Ke = 0;
const Tn = [];
let Mn = null,
  qi = 0;
const Dn = [];
let ni = null,
  Ki = 0;
const Vc = Promise.resolve();
let Fr = null,
  Zo = null;
function jc(e) {
  const t = Fr || Vc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Md(e) {
  let t = Ke + 1,
    i = he.length;
  for (; t < i; ) {
    const n = (t + i) >>> 1;
    jn(he[n]) < e ? (t = n + 1) : (i = n);
  }
  return t;
}
function qc(e) {
  (!he.length || !he.includes(e, Rs && e.allowRecurse ? Ke + 1 : Ke)) &&
    e !== Zo &&
    (e.id == null ? he.push(e) : he.splice(Md(e.id), 0, e), Kc());
}
function Kc() {
  !Rs && !Go && ((Go = !0), (Fr = Vc.then(Xc)));
}
function Ed(e) {
  const t = he.indexOf(e);
  t > Ke && he.splice(t, 1);
}
function Yc(e, t, i, n) {
  pt(e)
    ? i.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? n + 1 : n)) && i.push(e),
    Kc();
}
function Sd(e) {
  Yc(e, Mn, Tn, qi);
}
function Od(e) {
  Yc(e, ni, Dn, Ki);
}
function so(e, t = null) {
  if (Tn.length) {
    for (
      Zo = t, Mn = [...new Set(Tn)], Tn.length = 0, qi = 0;
      qi < Mn.length;
      qi++
    )
      Mn[qi]();
    (Mn = null), (qi = 0), (Zo = null), so(e, t);
  }
}
function Uc(e) {
  if ((so(), Dn.length)) {
    const t = [...new Set(Dn)];
    if (((Dn.length = 0), ni)) {
      ni.push(...t);
      return;
    }
    for (ni = t, ni.sort((i, n) => jn(i) - jn(n)), Ki = 0; Ki < ni.length; Ki++)
      ni[Ki]();
    (ni = null), (Ki = 0);
  }
}
const jn = (e) => (e.id == null ? 1 / 0 : e.id);
function Xc(e) {
  (Go = !1), (Rs = !0), so(e), he.sort((i, n) => jn(i) - jn(n));
  const t = Ce;
  try {
    for (Ke = 0; Ke < he.length; Ke++) {
      const i = he[Ke];
      i && i.active !== !1 && ui(i, null, 14);
    }
  } finally {
    (Ke = 0),
      (he.length = 0),
      Uc(),
      (Rs = !1),
      (Fr = null),
      (he.length || Tn.length || Dn.length) && Xc(e);
  }
}
function Td(e, t, ...i) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Rt;
  let s = i;
  const o = t.startsWith("update:"),
    r = o && t.slice(7);
  if (r && r in n) {
    const f = `${r === "modelValue" ? "model" : r}Modifiers`,
      { number: m, trim: b } = n[f] || Rt;
    b && (s = i.map((x) => x.trim())), m && (s = i.map(Ko));
  }
  let a,
    c = n[(a = Eo(t))] || n[(a = Eo(Be(t)))];
  !c && o && (c = n[(a = Eo(ln(t)))]), c && Me(c, e, 6, s);
  const u = n[a + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Me(u, e, 6, s);
  }
}
function Qc(e, t, i = !1) {
  const n = t.emitsCache,
    s = n.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let r = {},
    a = !1;
  if (!yt(e)) {
    const c = (u) => {
      const f = Qc(u, t, !0);
      f && ((a = !0), se(r, f));
    };
    !i && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !a
    ? (n.set(e, null), null)
    : (pt(o) ? o.forEach((c) => (r[c] = null)) : se(r, o), n.set(e, r), r);
}
function oo(e, t) {
  return !e || !Gs(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Mt(e, t[0].toLowerCase() + t.slice(1)) || Mt(e, ln(t)) || Mt(e, t));
}
let be = null,
  ro = null;
function Bs(e) {
  const t = be;
  return (be = e), (ro = (e && e.type.__scopeId) || null), t;
}
function un(e) {
  ro = e;
}
function dn() {
  ro = null;
}
function si(e, t = be, i) {
  if (!t || e._n) return e;
  const n = (...s) => {
    n._d && La(-1);
    const o = Bs(t),
      r = e(...s);
    return Bs(o), n._d && La(1), r;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function So(e) {
  const {
    type: t,
    vnode: i,
    proxy: n,
    withProxy: s,
    props: o,
    propsOptions: [r],
    slots: a,
    attrs: c,
    emit: u,
    render: f,
    renderCache: m,
    data: b,
    setupState: x,
    ctx: S,
    inheritAttrs: p,
  } = e;
  let v, k;
  const E = Bs(e);
  try {
    if (i.shapeFlag & 4) {
      const g = s || n;
      (v = Ie(f.call(g, g, m, o, x, b, S))), (k = c);
    } else {
      const g = t;
      (v = Ie(
        g.length > 1 ? g(o, { attrs: c, slots: a, emit: u }) : g(o, null)
      )),
        (k = t.props ? c : Dd(c));
    }
  } catch (g) {
    (Pn.length = 0), no(g, e, 1), (v = Tt(Bi));
  }
  let y = v;
  if (k && p !== !1) {
    const g = Object.keys(k),
      { shapeFlag: h } = y;
    g.length && h & 7 && (r && g.some(Sr) && (k = Ld(k, r)), (y = tn(y, k)));
  }
  return (
    i.dirs && ((y = tn(y)), (y.dirs = y.dirs ? y.dirs.concat(i.dirs) : i.dirs)),
    i.transition && (y.transition = i.transition),
    (v = y),
    Bs(E),
    v
  );
}
const Dd = (e) => {
    let t;
    for (const i in e)
      (i === "class" || i === "style" || Gs(i)) && ((t || (t = {}))[i] = e[i]);
    return t;
  },
  Ld = (e, t) => {
    const i = {};
    for (const n in e) (!Sr(n) || !(n.slice(9) in t)) && (i[n] = e[n]);
    return i;
  };
function Pd(e, t, i) {
  const { props: n, children: s, component: o } = e,
    { props: r, children: a, patchFlag: c } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (i && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return n ? wa(n, r, u) : !!r;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        const b = f[m];
        if (r[b] !== n[b] && !oo(u, b)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : n === r
      ? !1
      : n
      ? r
        ? wa(n, r, u)
        : !0
      : !!r;
  return !1;
}
function wa(e, t, i) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    if (t[o] !== e[o] && !oo(i, o)) return !0;
  }
  return !1;
}
function Ad({ vnode: e, parent: t }, i) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = i), (t = t.parent);
}
const Id = (e) => e.__isSuspense;
function Rd(e, t) {
  t && t.pendingBranch
    ? pt(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Od(e);
}
function Ds(e, t) {
  if (Jt) {
    let i = Jt.provides;
    const n = Jt.parent && Jt.parent.provides;
    n === i && (i = Jt.provides = Object.create(n)), (i[e] = t);
  }
}
function di(e, t, i = !1) {
  const n = Jt || be;
  if (n) {
    const s =
      n.parent == null
        ? n.vnode.appContext && n.vnode.appContext.provides
        : n.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return i && yt(t) ? t.call(n.proxy) : t;
  }
}
const ka = {};
function Ln(e, t, i) {
  return Jc(e, t, i);
}
function Jc(
  e,
  t,
  { immediate: i, deep: n, flush: s, onTrack: o, onTrigger: r } = Rt
) {
  const a = Jt;
  let c,
    u = !1,
    f = !1;
  if (
    (jt(e)
      ? ((c = () => e.value), (u = Jo(e)))
      : Qi(e)
      ? ((c = () => e), (n = !0))
      : pt(e)
      ? ((f = !0),
        (u = e.some((k) => Qi(k) || Jo(k))),
        (c = () =>
          e.map((k) => {
            if (jt(k)) return k.value;
            if (Qi(k)) return Li(k);
            if (yt(k)) return ui(k, a, 2);
          })))
      : yt(e)
      ? t
        ? (c = () => ui(e, a, 2))
        : (c = () => {
            if (!(a && a.isUnmounted)) return m && m(), Me(e, a, 3, [b]);
          })
      : (c = Ce),
    t && n)
  ) {
    const k = c;
    c = () => Li(k());
  }
  let m,
    b = (k) => {
      m = v.onStop = () => {
        ui(k, a, 4);
      };
    };
  if (Yn)
    return (b = Ce), t ? i && Me(t, a, 3, [c(), f ? [] : void 0, b]) : c(), Ce;
  let x = f ? [] : ka;
  const S = () => {
    if (v.active)
      if (t) {
        const k = v.run();
        (n || u || (f ? k.some((E, y) => zn(E, x[y])) : zn(k, x))) &&
          (m && m(), Me(t, a, 3, [k, x === ka ? void 0 : x, b]), (x = k));
      } else v.run();
  };
  S.allowRecurse = !!t;
  let p;
  s === "sync"
    ? (p = S)
    : s === "post"
    ? (p = () => re(S, a && a.suspense))
    : (p = () => Sd(S));
  const v = new Lr(c, p);
  return (
    t
      ? i
        ? S()
        : (x = v.run())
      : s === "post"
      ? re(v.run.bind(v), a && a.suspense)
      : v.run(),
    () => {
      v.stop(), a && a.scope && Or(a.scope.effects, v);
    }
  );
}
function Bd(e, t, i) {
  const n = this.proxy,
    s = Qt(e) ? (e.includes(".") ? Gc(n, e) : () => n[e]) : e.bind(n, n);
  let o;
  yt(t) ? (o = t) : ((o = t.handler), (i = t));
  const r = Jt;
  en(this);
  const a = Jc(s, o.bind(n), i);
  return r ? en(r) : Ai(), a;
}
function Gc(e, t) {
  const i = t.split(".");
  return () => {
    let n = e;
    for (let s = 0; s < i.length && n; s++) n = n[i[s]];
    return n;
  };
}
function Li(e, t) {
  if (!Kt(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), jt(e))) Li(e.value, t);
  else if (pt(e)) for (let i = 0; i < e.length; i++) Li(e[i], t);
  else if (Zs(e) || Xi(e))
    e.forEach((i) => {
      Li(i, t);
    });
  else if (Mc(e)) for (const i in e) Li(e[i], t);
  return e;
}
function Vt(e) {
  return yt(e) ? { setup: e, name: e.name } : e;
}
const Ls = (e) => !!e.type.__asyncLoader,
  Zc = (e) => e.type.__isKeepAlive;
function Fd(e, t) {
  th(e, "a", t);
}
function Hd(e, t) {
  th(e, "da", t);
}
function th(e, t, i = Jt) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let s = i;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((ao(t, n, i), i)) {
    let s = i.parent;
    for (; s && s.parent; )
      Zc(s.parent.vnode) && $d(n, t, i, s), (s = s.parent);
  }
}
function $d(e, t, i, n) {
  const s = ao(t, e, n, !0);
  eh(() => {
    Or(n[t], s);
  }, i);
}
function ao(e, t, i = Jt, n = !1) {
  if (i) {
    const s = i[e] || (i[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...r) => {
          if (i.isUnmounted) return;
          cn(), en(i);
          const a = Me(t, i, e, r);
          return Ai(), hn(), a;
        });
    return n ? s.unshift(o) : s.push(o), o;
  }
}
const Je =
    (e) =>
    (t, i = Jt) =>
      (!Yn || e === "sp") && ao(e, t, i),
  Wd = Je("bm"),
  $i = Je("m"),
  zd = Je("bu"),
  Nd = Je("u"),
  Vd = Je("bum"),
  eh = Je("um"),
  jd = Je("sp"),
  qd = Je("rtg"),
  Kd = Je("rtc");
function Yd(e, t = Jt) {
  ao("ec", e, t);
}
function Gt(e, t) {
  const i = be;
  if (i === null) return e;
  const n = co(i) || i.proxy,
    s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [r, a, c, u = Rt] = t[o];
    yt(r) && (r = { mounted: r, updated: r }),
      r.deep && Li(a),
      s.push({
        dir: r,
        instance: n,
        value: a,
        oldValue: void 0,
        arg: c,
        modifiers: u,
      });
  }
  return e;
}
function ki(e, t, i, n) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let r = 0; r < s.length; r++) {
    const a = s[r];
    o && (a.oldValue = o[r].value);
    const c = a.dir[n];
    c && (cn(), Me(c, i, 8, [e.el, a, e, t]), hn());
  }
}
const ih = "components";
function nh(e, t) {
  return Xd(ih, e, !0, t) || e;
}
const Ud = Symbol();
function Xd(e, t, i = !0, n = !1) {
  const s = be || Jt;
  if (s) {
    const o = s.type;
    if (e === ih) {
      const a = Mf(o, !1);
      if (a && (a === t || a === Be(t) || a === eo(Be(t)))) return o;
    }
    const r = Ca(s[e] || o[e], t) || Ca(s.appContext[e], t);
    return !r && n ? o : r;
  }
}
function Ca(e, t) {
  return e && (e[t] || e[Be(t)] || e[eo(Be(t))]);
}
function xe(e, t, i, n) {
  let s;
  const o = i && i[n];
  if (pt(e) || Qt(e)) {
    s = new Array(e.length);
    for (let r = 0, a = e.length; r < a; r++)
      s[r] = t(e[r], r, void 0, o && o[r]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let r = 0; r < e; r++) s[r] = t(r + 1, r, void 0, o && o[r]);
  } else if (Kt(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (r, a) => t(r, a, void 0, o && o[a]));
    else {
      const r = Object.keys(e);
      s = new Array(r.length);
      for (let a = 0, c = r.length; a < c; a++) {
        const u = r[a];
        s[a] = t(e[u], u, a, o && o[a]);
      }
    }
  else s = [];
  return i && (i[n] = s), s;
}
const tr = (e) => (e ? (gh(e) ? co(e) || e.proxy : tr(e.parent)) : null),
  Fs = se(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => tr(e.parent),
    $root: (e) => tr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => oh(e),
    $forceUpdate: (e) => e.f || (e.f = () => qc(e.update)),
    $nextTick: (e) => e.n || (e.n = jc.bind(e.proxy)),
    $watch: (e) => Bd.bind(e),
  }),
  Qd = {
    get({ _: e }, t) {
      const {
        ctx: i,
        setupState: n,
        data: s,
        props: o,
        accessCache: r,
        type: a,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const x = r[t];
        if (x !== void 0)
          switch (x) {
            case 1:
              return n[t];
            case 2:
              return s[t];
            case 4:
              return i[t];
            case 3:
              return o[t];
          }
        else {
          if (n !== Rt && Mt(n, t)) return (r[t] = 1), n[t];
          if (s !== Rt && Mt(s, t)) return (r[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && Mt(u, t)) return (r[t] = 3), o[t];
          if (i !== Rt && Mt(i, t)) return (r[t] = 4), i[t];
          er && (r[t] = 0);
        }
      }
      const f = Fs[t];
      let m, b;
      if (f) return t === "$attrs" && ue(e, "get", t), f(e);
      if ((m = a.__cssModules) && (m = m[t])) return m;
      if (i !== Rt && Mt(i, t)) return (r[t] = 4), i[t];
      if (((b = c.config.globalProperties), Mt(b, t))) return b[t];
    },
    set({ _: e }, t, i) {
      const { data: n, setupState: s, ctx: o } = e;
      return s !== Rt && Mt(s, t)
        ? ((s[t] = i), !0)
        : n !== Rt && Mt(n, t)
        ? ((n[t] = i), !0)
        : Mt(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = i), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: i,
          ctx: n,
          appContext: s,
          propsOptions: o,
        },
      },
      r
    ) {
      let a;
      return (
        !!i[r] ||
        (e !== Rt && Mt(e, r)) ||
        (t !== Rt && Mt(t, r)) ||
        ((a = o[0]) && Mt(a, r)) ||
        Mt(n, r) ||
        Mt(Fs, r) ||
        Mt(s.config.globalProperties, r)
      );
    },
    defineProperty(e, t, i) {
      return (
        i.get != null
          ? (e._.accessCache[t] = 0)
          : Mt(i, "value") && this.set(e, t, i.value, null),
        Reflect.defineProperty(e, t, i)
      );
    },
  };
let er = !0;
function Jd(e) {
  const t = oh(e),
    i = e.proxy,
    n = e.ctx;
  (er = !1), t.beforeCreate && Ma(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: r,
    watch: a,
    provide: c,
    inject: u,
    created: f,
    beforeMount: m,
    mounted: b,
    beforeUpdate: x,
    updated: S,
    activated: p,
    deactivated: v,
    beforeDestroy: k,
    beforeUnmount: E,
    destroyed: y,
    unmounted: g,
    render: h,
    renderTracked: l,
    renderTriggered: d,
    errorCaptured: C,
    serverPrefetch: T,
    expose: L,
    inheritAttrs: A,
    components: R,
    directives: W,
    filters: z,
  } = t;
  if ((u && Gd(u, n, null, e.appContext.config.unwrapInjectedRef), r))
    for (const X in r) {
      const Q = r[X];
      yt(Q) && (n[X] = Q.bind(i));
    }
  if (s) {
    const X = s.call(i, i);
    Kt(X) && (e.data = is(X));
  }
  if (((er = !0), o))
    for (const X in o) {
      const Q = o[X],
        lt = yt(Q) ? Q.bind(i, i) : yt(Q.get) ? Q.get.bind(i, i) : Ce,
        xt = !yt(Q) && yt(Q.set) ? Q.set.bind(i) : Ce,
        bt = ge({ get: lt, set: xt });
      Object.defineProperty(n, X, {
        enumerable: !0,
        configurable: !0,
        get: () => bt.value,
        set: (dt) => (bt.value = dt),
      });
    }
  if (a) for (const X in a) sh(a[X], n, i, X);
  if (c) {
    const X = yt(c) ? c.call(i) : c;
    Reflect.ownKeys(X).forEach((Q) => {
      Ds(Q, X[Q]);
    });
  }
  f && Ma(f, e, "c");
  function Y(X, Q) {
    pt(Q) ? Q.forEach((lt) => X(lt.bind(i))) : Q && X(Q.bind(i));
  }
  if (
    (Y(Wd, m),
    Y($i, b),
    Y(zd, x),
    Y(Nd, S),
    Y(Fd, p),
    Y(Hd, v),
    Y(Yd, C),
    Y(Kd, l),
    Y(qd, d),
    Y(Vd, E),
    Y(eh, g),
    Y(jd, T),
    pt(L))
  )
    if (L.length) {
      const X = e.exposed || (e.exposed = {});
      L.forEach((Q) => {
        Object.defineProperty(X, Q, {
          get: () => i[Q],
          set: (lt) => (i[Q] = lt),
        });
      });
    } else e.exposed || (e.exposed = {});
  h && e.render === Ce && (e.render = h),
    A != null && (e.inheritAttrs = A),
    R && (e.components = R),
    W && (e.directives = W);
}
function Gd(e, t, i = Ce, n = !1) {
  pt(e) && (e = ir(e));
  for (const s in e) {
    const o = e[s];
    let r;
    Kt(o)
      ? "default" in o
        ? (r = di(o.from || s, o.default, !0))
        : (r = di(o.from || s))
      : (r = di(o)),
      jt(r) && n
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: (a) => (r.value = a),
          })
        : (t[s] = r);
  }
}
function Ma(e, t, i) {
  Me(pt(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, i);
}
function sh(e, t, i, n) {
  const s = n.includes(".") ? Gc(i, n) : () => i[n];
  if (Qt(e)) {
    const o = t[e];
    yt(o) && Ln(s, o);
  } else if (yt(e)) Ln(s, e.bind(i));
  else if (Kt(e))
    if (pt(e)) e.forEach((o) => sh(o, t, i, n));
    else {
      const o = yt(e.handler) ? e.handler.bind(i) : t[e.handler];
      yt(o) && Ln(s, o, e);
    }
}
function oh(e) {
  const t = e.type,
    { mixins: i, extends: n } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: r },
    } = e.appContext,
    a = o.get(t);
  let c;
  return (
    a
      ? (c = a)
      : !s.length && !i && !n
      ? (c = t)
      : ((c = {}), s.length && s.forEach((u) => Hs(c, u, r, !0)), Hs(c, t, r)),
    o.set(t, c),
    c
  );
}
function Hs(e, t, i, n = !1) {
  const { mixins: s, extends: o } = t;
  o && Hs(e, o, i, !0), s && s.forEach((r) => Hs(e, r, i, !0));
  for (const r in t)
    if (!(n && r === "expose")) {
      const a = Zd[r] || (i && i[r]);
      e[r] = a ? a(e[r], t[r]) : t[r];
    }
  return e;
}
const Zd = {
  data: Ea,
  props: Si,
  emits: Si,
  methods: Si,
  computed: Si,
  beforeCreate: ne,
  created: ne,
  beforeMount: ne,
  mounted: ne,
  beforeUpdate: ne,
  updated: ne,
  beforeDestroy: ne,
  beforeUnmount: ne,
  destroyed: ne,
  unmounted: ne,
  activated: ne,
  deactivated: ne,
  errorCaptured: ne,
  serverPrefetch: ne,
  components: Si,
  directives: Si,
  watch: ef,
  provide: Ea,
  inject: tf,
};
function Ea(e, t) {
  return t
    ? e
      ? function () {
          return se(
            yt(e) ? e.call(this, this) : e,
            yt(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function tf(e, t) {
  return Si(ir(e), ir(t));
}
function ir(e) {
  if (pt(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) t[e[i]] = e[i];
    return t;
  }
  return e;
}
function ne(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Si(e, t) {
  return e ? se(se(Object.create(null), e), t) : t;
}
function ef(e, t) {
  if (!e) return t;
  if (!t) return e;
  const i = se(Object.create(null), e);
  for (const n in t) i[n] = ne(e[n], t[n]);
  return i;
}
function nf(e, t, i, n = !1) {
  const s = {},
    o = {};
  Is(o, lo, 1), (e.propsDefaults = Object.create(null)), rh(e, t, s, o);
  for (const r in e.propsOptions[0]) r in s || (s[r] = void 0);
  i ? (e.props = n ? s : _d(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function sf(e, t, i, n) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: r },
    } = e,
    a = Dt(s),
    [c] = e.propsOptions;
  let u = !1;
  if ((n || r > 0) && !(r & 16)) {
    if (r & 8) {
      const f = e.vnode.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        const b = f[m];
        if (oo(e.emitsOptions, b)) continue;
        const x = t[b];
        if (c)
          if (Mt(o, b)) x !== o[b] && ((o[b] = x), (u = !0));
          else {
            const S = Be(b);
            s[S] = nr(c, a, S, x, e, !1);
          }
        else x !== o[b] && ((o[b] = x), (u = !0));
      }
    }
  } else {
    rh(e, t, s, o) && (u = !0);
    let f;
    for (const m in a)
      (!t || (!Mt(t, m) && ((f = ln(m)) === m || !Mt(t, f)))) &&
        (c
          ? i &&
            (i[m] !== void 0 || i[f] !== void 0) &&
            (s[m] = nr(c, a, m, void 0, e, !0))
          : delete s[m]);
    if (o !== a)
      for (const m in o) (!t || (!Mt(t, m) && !0)) && (delete o[m], (u = !0));
  }
  u && Qe(e, "set", "$attrs");
}
function rh(e, t, i, n) {
  const [s, o] = e.propsOptions;
  let r = !1,
    a;
  if (t)
    for (const c in t) {
      if (Os(c)) continue;
      const u = t[c];
      let f;
      s && Mt(s, (f = Be(c)))
        ? !o || !o.includes(f)
          ? (i[f] = u)
          : ((a || (a = {}))[f] = u)
        : oo(e.emitsOptions, c) ||
          ((!(c in n) || u !== n[c]) && ((n[c] = u), (r = !0)));
    }
  if (o) {
    const c = Dt(i),
      u = a || Rt;
    for (let f = 0; f < o.length; f++) {
      const m = o[f];
      i[m] = nr(s, c, m, u[m], e, !Mt(u, m));
    }
  }
  return r;
}
function nr(e, t, i, n, s, o) {
  const r = e[i];
  if (r != null) {
    const a = Mt(r, "default");
    if (a && n === void 0) {
      const c = r.default;
      if (r.type !== Function && yt(c)) {
        const { propsDefaults: u } = s;
        i in u ? (n = u[i]) : (en(s), (n = u[i] = c.call(null, t)), Ai());
      } else n = c;
    }
    r[0] &&
      (o && !a ? (n = !1) : r[1] && (n === "" || n === ln(i)) && (n = !0));
  }
  return n;
}
function ah(e, t, i = !1) {
  const n = t.propsCache,
    s = n.get(e);
  if (s) return s;
  const o = e.props,
    r = {},
    a = [];
  let c = !1;
  if (!yt(e)) {
    const f = (m) => {
      c = !0;
      const [b, x] = ah(m, t, !0);
      se(r, b), x && a.push(...x);
    };
    !i && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  if (!o && !c) return n.set(e, Ui), Ui;
  if (pt(o))
    for (let f = 0; f < o.length; f++) {
      const m = Be(o[f]);
      Sa(m) && (r[m] = Rt);
    }
  else if (o)
    for (const f in o) {
      const m = Be(f);
      if (Sa(m)) {
        const b = o[f],
          x = (r[m] = pt(b) || yt(b) ? { type: b } : b);
        if (x) {
          const S = Da(Boolean, x.type),
            p = Da(String, x.type);
          (x[0] = S > -1),
            (x[1] = p < 0 || S < p),
            (S > -1 || Mt(x, "default")) && a.push(m);
        }
      }
    }
  const u = [r, a];
  return n.set(e, u), u;
}
function Sa(e) {
  return e[0] !== "$";
}
function Oa(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Ta(e, t) {
  return Oa(e) === Oa(t);
}
function Da(e, t) {
  return pt(t) ? t.findIndex((i) => Ta(i, e)) : yt(t) && Ta(t, e) ? 0 : -1;
}
const lh = (e) => e[0] === "_" || e === "$stable",
  Hr = (e) => (pt(e) ? e.map(Ie) : [Ie(e)]),
  of = (e, t, i) => {
    if (t._n) return t;
    const n = si((...s) => Hr(t(...s)), i);
    return (n._c = !1), n;
  },
  ch = (e, t, i) => {
    const n = e._ctx;
    for (const s in e) {
      if (lh(s)) continue;
      const o = e[s];
      if (yt(o)) t[s] = of(s, o, n);
      else if (o != null) {
        const r = Hr(o);
        t[s] = () => r;
      }
    }
  },
  hh = (e, t) => {
    const i = Hr(t);
    e.slots.default = () => i;
  },
  rf = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const i = t._;
      i ? ((e.slots = Dt(t)), Is(t, "_", i)) : ch(t, (e.slots = {}));
    } else (e.slots = {}), t && hh(e, t);
    Is(e.slots, lo, 1);
  },
  af = (e, t, i) => {
    const { vnode: n, slots: s } = e;
    let o = !0,
      r = Rt;
    if (n.shapeFlag & 32) {
      const a = t._;
      a
        ? i && a === 1
          ? (o = !1)
          : (se(s, t), !i && a === 1 && delete s._)
        : ((o = !t.$stable), ch(t, s)),
        (r = t);
    } else t && (hh(e, t), (r = { default: 1 }));
    if (o) for (const a in s) !lh(a) && !(a in r) && delete s[a];
  };
function uh() {
  return {
    app: null,
    config: {
      isNativeTag: Hu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let lf = 0;
function cf(e, t) {
  return function (n, s = null) {
    yt(n) || (n = Object.assign({}, n)), s != null && !Kt(s) && (s = null);
    const o = uh(),
      r = new Set();
    let a = !1;
    const c = (o.app = {
      _uid: lf++,
      _component: n,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Sf,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...f) {
        return (
          r.has(u) ||
            (u && yt(u.install)
              ? (r.add(u), u.install(c, ...f))
              : yt(u) && (r.add(u), u(c, ...f))),
          c
        );
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), c;
      },
      component(u, f) {
        return f ? ((o.components[u] = f), c) : o.components[u];
      },
      directive(u, f) {
        return f ? ((o.directives[u] = f), c) : o.directives[u];
      },
      mount(u, f, m) {
        if (!a) {
          const b = Tt(n, s);
          return (
            (b.appContext = o),
            f && t ? t(b, u) : e(b, u, m),
            (a = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            co(b.component) || b.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, f) {
        return (o.provides[u] = f), c;
      },
    });
    return c;
  };
}
function sr(e, t, i, n, s = !1) {
  if (pt(e)) {
    e.forEach((b, x) => sr(b, t && (pt(t) ? t[x] : t), i, n, s));
    return;
  }
  if (Ls(n) && !s) return;
  const o = n.shapeFlag & 4 ? co(n.component) || n.component.proxy : n.el,
    r = s ? null : o,
    { i: a, r: c } = e,
    u = t && t.r,
    f = a.refs === Rt ? (a.refs = {}) : a.refs,
    m = a.setupState;
  if (
    (u != null &&
      u !== c &&
      (Qt(u)
        ? ((f[u] = null), Mt(m, u) && (m[u] = null))
        : jt(u) && (u.value = null)),
    yt(c))
  )
    ui(c, a, 12, [r, f]);
  else {
    const b = Qt(c),
      x = jt(c);
    if (b || x) {
      const S = () => {
        if (e.f) {
          const p = b ? f[c] : c.value;
          s
            ? pt(p) && Or(p, o)
            : pt(p)
            ? p.includes(o) || p.push(o)
            : b
            ? ((f[c] = [o]), Mt(m, c) && (m[c] = f[c]))
            : ((c.value = [o]), e.k && (f[e.k] = c.value));
        } else
          b
            ? ((f[c] = r), Mt(m, c) && (m[c] = r))
            : x && ((c.value = r), e.k && (f[e.k] = r));
      };
      r ? ((S.id = -1), re(S, i)) : S();
    }
  }
}
const re = Rd;
function hf(e) {
  return uf(e);
}
function uf(e, t) {
  const i = ju();
  i.__VUE__ = !0;
  const {
      insert: n,
      remove: s,
      patchProp: o,
      createElement: r,
      createText: a,
      createComment: c,
      setText: u,
      setElementText: f,
      parentNode: m,
      nextSibling: b,
      setScopeId: x = Ce,
      cloneNode: S,
      insertStaticContent: p,
    } = e,
    v = (
      P,
      B,
      V,
      j = null,
      U = null,
      Z = null,
      nt = !1,
      G = null,
      et = !!B.dynamicChildren
    ) => {
      if (P === B) return;
      P && !gn(P, B) && ((j = rt(P)), Et(P, U, Z, !0), (P = null)),
        B.patchFlag === -2 && ((et = !1), (B.dynamicChildren = null));
      const { type: J, ref: O, shapeFlag: I } = B;
      switch (J) {
        case $r:
          k(P, B, V, j);
          break;
        case Bi:
          E(P, B, V, j);
          break;
        case Oo:
          P == null && y(B, V, j, nt);
          break;
        case $t:
          W(P, B, V, j, U, Z, nt, G, et);
          break;
        default:
          I & 1
            ? l(P, B, V, j, U, Z, nt, G, et)
            : I & 6
            ? z(P, B, V, j, U, Z, nt, G, et)
            : (I & 64 || I & 128) && J.process(P, B, V, j, U, Z, nt, G, et, wt);
      }
      O != null && U && sr(O, P && P.ref, Z, B || P, !B);
    },
    k = (P, B, V, j) => {
      if (P == null) n((B.el = a(B.children)), V, j);
      else {
        const U = (B.el = P.el);
        B.children !== P.children && u(U, B.children);
      }
    },
    E = (P, B, V, j) => {
      P == null ? n((B.el = c(B.children || "")), V, j) : (B.el = P.el);
    },
    y = (P, B, V, j) => {
      [P.el, P.anchor] = p(P.children, B, V, j, P.el, P.anchor);
    },
    g = ({ el: P, anchor: B }, V, j) => {
      let U;
      for (; P && P !== B; ) (U = b(P)), n(P, V, j), (P = U);
      n(B, V, j);
    },
    h = ({ el: P, anchor: B }) => {
      let V;
      for (; P && P !== B; ) (V = b(P)), s(P), (P = V);
      s(B);
    },
    l = (P, B, V, j, U, Z, nt, G, et) => {
      (nt = nt || B.type === "svg"),
        P == null ? d(B, V, j, U, Z, nt, G, et) : L(P, B, U, Z, nt, G, et);
    },
    d = (P, B, V, j, U, Z, nt, G) => {
      let et, J;
      const {
        type: O,
        props: I,
        shapeFlag: _,
        transition: w,
        patchFlag: D,
        dirs: H,
      } = P;
      if (P.el && S !== void 0 && D === -1) et = P.el = S(P.el);
      else {
        if (
          ((et = P.el = r(P.type, Z, I && I.is, I)),
          _ & 8
            ? f(et, P.children)
            : _ & 16 &&
              T(P.children, et, null, j, U, Z && O !== "foreignObject", nt, G),
          H && ki(P, null, j, "created"),
          I)
        ) {
          for (const tt in I)
            tt !== "value" &&
              !Os(tt) &&
              o(et, tt, null, I[tt], Z, P.children, j, U, it);
          "value" in I && o(et, "value", null, I.value),
            (J = I.onVnodeBeforeMount) && Le(J, j, P);
        }
        C(et, P, P.scopeId, nt, j);
      }
      H && ki(P, null, j, "beforeMount");
      const q = (!U || (U && !U.pendingBranch)) && w && !w.persisted;
      q && w.beforeEnter(et),
        n(et, B, V),
        ((J = I && I.onVnodeMounted) || q || H) &&
          re(() => {
            J && Le(J, j, P), q && w.enter(et), H && ki(P, null, j, "mounted");
          }, U);
    },
    C = (P, B, V, j, U) => {
      if ((V && x(P, V), j)) for (let Z = 0; Z < j.length; Z++) x(P, j[Z]);
      if (U) {
        const Z = U.subTree;
        if (B === Z) {
          const nt = U.vnode;
          C(P, nt, nt.scopeId, nt.slotScopeIds, U.parent);
        }
      }
    },
    T = (P, B, V, j, U, Z, nt, G, et = 0) => {
      for (let J = et; J < P.length; J++) {
        const O = (P[J] = G ? oi(P[J]) : Ie(P[J]));
        v(null, O, B, V, j, U, Z, nt, G);
      }
    },
    L = (P, B, V, j, U, Z, nt) => {
      const G = (B.el = P.el);
      let { patchFlag: et, dynamicChildren: J, dirs: O } = B;
      et |= P.patchFlag & 16;
      const I = P.props || Rt,
        _ = B.props || Rt;
      let w;
      V && Ci(V, !1),
        (w = _.onVnodeBeforeUpdate) && Le(w, V, B, P),
        O && ki(B, P, V, "beforeUpdate"),
        V && Ci(V, !0);
      const D = U && B.type !== "foreignObject";
      if (
        (J
          ? A(P.dynamicChildren, J, G, V, j, D, Z)
          : nt || lt(P, B, G, null, V, j, D, Z, !1),
        et > 0)
      ) {
        if (et & 16) R(G, B, I, _, V, j, U);
        else if (
          (et & 2 && I.class !== _.class && o(G, "class", null, _.class, U),
          et & 4 && o(G, "style", I.style, _.style, U),
          et & 8)
        ) {
          const H = B.dynamicProps;
          for (let q = 0; q < H.length; q++) {
            const tt = H[q],
              ht = I[tt],
              ct = _[tt];
            (ct !== ht || tt === "value") &&
              o(G, tt, ht, ct, U, P.children, V, j, it);
          }
        }
        et & 1 && P.children !== B.children && f(G, B.children);
      } else !nt && J == null && R(G, B, I, _, V, j, U);
      ((w = _.onVnodeUpdated) || O) &&
        re(() => {
          w && Le(w, V, B, P), O && ki(B, P, V, "updated");
        }, j);
    },
    A = (P, B, V, j, U, Z, nt) => {
      for (let G = 0; G < B.length; G++) {
        const et = P[G],
          J = B[G],
          O =
            et.el && (et.type === $t || !gn(et, J) || et.shapeFlag & 70)
              ? m(et.el)
              : V;
        v(et, J, O, null, j, U, Z, nt, !0);
      }
    },
    R = (P, B, V, j, U, Z, nt) => {
      if (V !== j) {
        for (const G in j) {
          if (Os(G)) continue;
          const et = j[G],
            J = V[G];
          et !== J && G !== "value" && o(P, G, J, et, nt, B.children, U, Z, it);
        }
        if (V !== Rt)
          for (const G in V)
            !Os(G) &&
              !(G in j) &&
              o(P, G, V[G], null, nt, B.children, U, Z, it);
        "value" in j && o(P, "value", V.value, j.value);
      }
    },
    W = (P, B, V, j, U, Z, nt, G, et) => {
      const J = (B.el = P ? P.el : a("")),
        O = (B.anchor = P ? P.anchor : a(""));
      const { patchFlag: I, dynamicChildren: _, slotScopeIds: w } = B;
      w && (G = G ? G.concat(w) : w),
        P == null
          ? (n(J, V, j), n(O, V, j), T(B.children, V, O, U, Z, nt, G, et))
          : I > 0 && I & 64 && _ && P.dynamicChildren
          ? (A(P.dynamicChildren, _, V, U, Z, nt, G),
            (B.key != null || (U && B === U.subTree)) && dh(P, B, !0))
          : lt(P, B, V, O, U, Z, nt, G, et);
    },
    z = (P, B, V, j, U, Z, nt, G, et) => {
      (B.slotScopeIds = G),
        P == null
          ? B.shapeFlag & 512
            ? U.ctx.activate(B, V, j, nt, et)
            : N(B, V, j, U, Z, nt, et)
          : Y(P, B, et);
    },
    N = (P, B, V, j, U, Z, nt) => {
      const G = (P.component = bf(P, j, U));
      if ((Zc(P) && (G.ctx.renderer = wt), xf(G), G.asyncDep)) {
        if ((U && U.registerDep(G, X), !P.el)) {
          const et = (G.subTree = Tt(Bi));
          E(null, et, B, V);
        }
        return;
      }
      X(G, P, B, V, U, Z, nt);
    },
    Y = (P, B, V) => {
      const j = (B.component = P.component);
      if (Pd(P, B, V))
        if (j.asyncDep && !j.asyncResolved) {
          Q(j, B, V);
          return;
        } else (j.next = B), Ed(j.update), j.update();
      else (B.el = P.el), (j.vnode = B);
    },
    X = (P, B, V, j, U, Z, nt) => {
      const G = () => {
          if (P.isMounted) {
            let { next: O, bu: I, u: _, parent: w, vnode: D } = P,
              H = O,
              q;
            Ci(P, !1),
              O ? ((O.el = D.el), Q(P, O, nt)) : (O = D),
              I && Ts(I),
              (q = O.props && O.props.onVnodeBeforeUpdate) && Le(q, w, O, D),
              Ci(P, !0);
            const tt = So(P),
              ht = P.subTree;
            (P.subTree = tt),
              v(ht, tt, m(ht.el), rt(ht), P, U, Z),
              (O.el = tt.el),
              H === null && Ad(P, tt.el),
              _ && re(_, U),
              (q = O.props && O.props.onVnodeUpdated) &&
                re(() => Le(q, w, O, D), U);
          } else {
            let O;
            const { el: I, props: _ } = B,
              { bm: w, m: D, parent: H } = P,
              q = Ls(B);
            if (
              (Ci(P, !1),
              w && Ts(w),
              !q && (O = _ && _.onVnodeBeforeMount) && Le(O, H, B),
              Ci(P, !0),
              I && ut)
            ) {
              const tt = () => {
                (P.subTree = So(P)), ut(I, P.subTree, P, U, null);
              };
              q
                ? B.type.__asyncLoader().then(() => !P.isUnmounted && tt())
                : tt();
            } else {
              const tt = (P.subTree = So(P));
              v(null, tt, V, j, P, U, Z), (B.el = tt.el);
            }
            if ((D && re(D, U), !q && (O = _ && _.onVnodeMounted))) {
              const tt = B;
              re(() => Le(O, H, tt), U);
            }
            (B.shapeFlag & 256 ||
              (H && Ls(H.vnode) && H.vnode.shapeFlag & 256)) &&
              P.a &&
              re(P.a, U),
              (P.isMounted = !0),
              (B = V = j = null);
          }
        },
        et = (P.effect = new Lr(G, () => qc(J), P.scope)),
        J = (P.update = () => et.run());
      (J.id = P.uid), Ci(P, !0), J();
    },
    Q = (P, B, V) => {
      B.component = P;
      const j = P.vnode.props;
      (P.vnode = B),
        (P.next = null),
        sf(P, B.props, j, V),
        af(P, B.children, V),
        cn(),
        so(void 0, P.update),
        hn();
    },
    lt = (P, B, V, j, U, Z, nt, G, et = !1) => {
      const J = P && P.children,
        O = P ? P.shapeFlag : 0,
        I = B.children,
        { patchFlag: _, shapeFlag: w } = B;
      if (_ > 0) {
        if (_ & 128) {
          bt(J, I, V, j, U, Z, nt, G, et);
          return;
        } else if (_ & 256) {
          xt(J, I, V, j, U, Z, nt, G, et);
          return;
        }
      }
      w & 8
        ? (O & 16 && it(J, U, Z), I !== J && f(V, I))
        : O & 16
        ? w & 16
          ? bt(J, I, V, j, U, Z, nt, G, et)
          : it(J, U, Z, !0)
        : (O & 8 && f(V, ""), w & 16 && T(I, V, j, U, Z, nt, G, et));
    },
    xt = (P, B, V, j, U, Z, nt, G, et) => {
      (P = P || Ui), (B = B || Ui);
      const J = P.length,
        O = B.length,
        I = Math.min(J, O);
      let _;
      for (_ = 0; _ < I; _++) {
        const w = (B[_] = et ? oi(B[_]) : Ie(B[_]));
        v(P[_], w, V, null, U, Z, nt, G, et);
      }
      J > O ? it(P, U, Z, !0, !1, I) : T(B, V, j, U, Z, nt, G, et, I);
    },
    bt = (P, B, V, j, U, Z, nt, G, et) => {
      let J = 0;
      const O = B.length;
      let I = P.length - 1,
        _ = O - 1;
      for (; J <= I && J <= _; ) {
        const w = P[J],
          D = (B[J] = et ? oi(B[J]) : Ie(B[J]));
        if (gn(w, D)) v(w, D, V, null, U, Z, nt, G, et);
        else break;
        J++;
      }
      for (; J <= I && J <= _; ) {
        const w = P[I],
          D = (B[_] = et ? oi(B[_]) : Ie(B[_]));
        if (gn(w, D)) v(w, D, V, null, U, Z, nt, G, et);
        else break;
        I--, _--;
      }
      if (J > I) {
        if (J <= _) {
          const w = _ + 1,
            D = w < O ? B[w].el : j;
          for (; J <= _; )
            v(null, (B[J] = et ? oi(B[J]) : Ie(B[J])), V, D, U, Z, nt, G, et),
              J++;
        }
      } else if (J > _) for (; J <= I; ) Et(P[J], U, Z, !0), J++;
      else {
        const w = J,
          D = J,
          H = new Map();
        for (J = D; J <= _; J++) {
          const mt = (B[J] = et ? oi(B[J]) : Ie(B[J]));
          mt.key != null && H.set(mt.key, J);
        }
        let q,
          tt = 0;
        const ht = _ - D + 1;
        let ct = !1,
          Ut = 0;
        const ie = new Array(ht);
        for (J = 0; J < ht; J++) ie[J] = 0;
        for (J = w; J <= I; J++) {
          const mt = P[J];
          if (tt >= ht) {
            Et(mt, U, Z, !0);
            continue;
          }
          let At;
          if (mt.key != null) At = H.get(mt.key);
          else
            for (q = D; q <= _; q++)
              if (ie[q - D] === 0 && gn(mt, B[q])) {
                At = q;
                break;
              }
          At === void 0
            ? Et(mt, U, Z, !0)
            : ((ie[At - D] = J + 1),
              At >= Ut ? (Ut = At) : (ct = !0),
              v(mt, B[At], V, null, U, Z, nt, G, et),
              tt++);
        }
        const ot = ct ? df(ie) : Ui;
        for (q = ot.length - 1, J = ht - 1; J >= 0; J--) {
          const mt = D + J,
            At = B[mt],
            Te = mt + 1 < O ? B[mt + 1].el : j;
          ie[J] === 0
            ? v(null, At, V, Te, U, Z, nt, G, et)
            : ct && (q < 0 || J !== ot[q] ? dt(At, V, Te, 2) : q--);
        }
      }
    },
    dt = (P, B, V, j, U = null) => {
      const { el: Z, type: nt, transition: G, children: et, shapeFlag: J } = P;
      if (J & 6) {
        dt(P.component.subTree, B, V, j);
        return;
      }
      if (J & 128) {
        P.suspense.move(B, V, j);
        return;
      }
      if (J & 64) {
        nt.move(P, B, V, wt);
        return;
      }
      if (nt === $t) {
        n(Z, B, V);
        for (let I = 0; I < et.length; I++) dt(et[I], B, V, j);
        n(P.anchor, B, V);
        return;
      }
      if (nt === Oo) {
        g(P, B, V);
        return;
      }
      if (j !== 2 && J & 1 && G)
        if (j === 0) G.beforeEnter(Z), n(Z, B, V), re(() => G.enter(Z), U);
        else {
          const { leave: I, delayLeave: _, afterLeave: w } = G,
            D = () => n(Z, B, V),
            H = () => {
              I(Z, () => {
                D(), w && w();
              });
            };
          _ ? _(Z, D, H) : H();
        }
      else n(Z, B, V);
    },
    Et = (P, B, V, j = !1, U = !1) => {
      const {
        type: Z,
        props: nt,
        ref: G,
        children: et,
        dynamicChildren: J,
        shapeFlag: O,
        patchFlag: I,
        dirs: _,
      } = P;
      if ((G != null && sr(G, null, V, P, !0), O & 256)) {
        B.ctx.deactivate(P);
        return;
      }
      const w = O & 1 && _,
        D = !Ls(P);
      let H;
      if ((D && (H = nt && nt.onVnodeBeforeUnmount) && Le(H, B, P), O & 6))
        st(P.component, V, j);
      else {
        if (O & 128) {
          P.suspense.unmount(V, j);
          return;
        }
        w && ki(P, null, B, "beforeUnmount"),
          O & 64
            ? P.type.remove(P, B, V, U, wt, j)
            : J && (Z !== $t || (I > 0 && I & 64))
            ? it(J, B, V, !1, !0)
            : ((Z === $t && I & 384) || (!U && O & 16)) && it(et, B, V),
          j && St(P);
      }
      ((D && (H = nt && nt.onVnodeUnmounted)) || w) &&
        re(() => {
          H && Le(H, B, P), w && ki(P, null, B, "unmounted");
        }, V);
    },
    St = (P) => {
      const { type: B, el: V, anchor: j, transition: U } = P;
      if (B === $t) {
        K(V, j);
        return;
      }
      if (B === Oo) {
        h(P);
        return;
      }
      const Z = () => {
        s(V), U && !U.persisted && U.afterLeave && U.afterLeave();
      };
      if (P.shapeFlag & 1 && U && !U.persisted) {
        const { leave: nt, delayLeave: G } = U,
          et = () => nt(V, Z);
        G ? G(P.el, Z, et) : et();
      } else Z();
    },
    K = (P, B) => {
      let V;
      for (; P !== B; ) (V = b(P)), s(P), (P = V);
      s(B);
    },
    st = (P, B, V) => {
      const { bum: j, scope: U, update: Z, subTree: nt, um: G } = P;
      j && Ts(j),
        U.stop(),
        Z && ((Z.active = !1), Et(nt, P, B, V)),
        G && re(G, B),
        re(() => {
          P.isUnmounted = !0;
        }, B),
        B &&
          B.pendingBranch &&
          !B.isUnmounted &&
          P.asyncDep &&
          !P.asyncResolved &&
          P.suspenseId === B.pendingId &&
          (B.deps--, B.deps === 0 && B.resolve());
    },
    it = (P, B, V, j = !1, U = !1, Z = 0) => {
      for (let nt = Z; nt < P.length; nt++) Et(P[nt], B, V, j, U);
    },
    rt = (P) =>
      P.shapeFlag & 6
        ? rt(P.component.subTree)
        : P.shapeFlag & 128
        ? P.suspense.next()
        : b(P.anchor || P.el),
    gt = (P, B, V) => {
      P == null
        ? B._vnode && Et(B._vnode, null, null, !0)
        : v(B._vnode || null, P, B, null, null, null, V),
        Uc(),
        (B._vnode = P);
    },
    wt = {
      p: v,
      um: Et,
      m: dt,
      r: St,
      mt: N,
      mc: T,
      pc: lt,
      pbc: A,
      n: rt,
      o: e,
    };
  let at, ut;
  return (
    t && ([at, ut] = t(wt)), { render: gt, hydrate: at, createApp: cf(gt, at) }
  );
}
function Ci({ effect: e, update: t }, i) {
  e.allowRecurse = t.allowRecurse = i;
}
function dh(e, t, i = !1) {
  const n = e.children,
    s = t.children;
  if (pt(n) && pt(s))
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      let a = s[o];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[o] = oi(s[o])), (a.el = r.el)),
        i || dh(r, a));
    }
}
function df(e) {
  const t = e.slice(),
    i = [0];
  let n, s, o, r, a;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const u = e[n];
    if (u !== 0) {
      if (((s = i[i.length - 1]), e[s] < u)) {
        (t[n] = s), i.push(n);
        continue;
      }
      for (o = 0, r = i.length - 1; o < r; )
        (a = (o + r) >> 1), e[i[a]] < u ? (o = a + 1) : (r = a);
      u < e[i[o]] && (o > 0 && (t[n] = i[o - 1]), (i[o] = n));
    }
  }
  for (o = i.length, r = i[o - 1]; o-- > 0; ) (i[o] = r), (r = t[r]);
  return i;
}
const ff = (e) => e.__isTeleport,
  $t = Symbol(void 0),
  $r = Symbol(void 0),
  Bi = Symbol(void 0),
  Oo = Symbol(void 0),
  Pn = [];
let we = null;
function ft(e = !1) {
  Pn.push((we = e ? null : []));
}
function pf() {
  Pn.pop(), (we = Pn[Pn.length - 1] || null);
}
let qn = 1;
function La(e) {
  qn += e;
}
function fh(e) {
  return (
    (e.dynamicChildren = qn > 0 ? we || Ui : null),
    pf(),
    qn > 0 && we && we.push(e),
    e
  );
}
function vt(e, t, i, n, s, o) {
  return fh(F(e, t, i, n, s, o, !0));
}
function Kn(e, t, i, n, s) {
  return fh(Tt(e, t, i, n, s, !0));
}
function or(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function gn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const lo = "__vInternal",
  ph = ({ key: e }) => (e != null ? e : null),
  Ps = ({ ref: e, ref_key: t, ref_for: i }) =>
    e != null
      ? Qt(e) || jt(e) || yt(e)
        ? { i: be, r: e, k: t, f: !!i }
        : e
      : null;
function F(
  e,
  t = null,
  i = null,
  n = 0,
  s = null,
  o = e === $t ? 0 : 1,
  r = !1,
  a = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ph(t),
    ref: t && Ps(t),
    scopeId: ro,
    slotScopeIds: null,
    children: i,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    a
      ? (Wr(c, i), o & 128 && e.normalize(c))
      : i && (c.shapeFlag |= Qt(i) ? 8 : 16),
    qn > 0 &&
      !r &&
      we &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      we.push(c),
    c
  );
}
const Tt = gf;
function gf(e, t = null, i = null, n = 0, s = null, o = !1) {
  if (((!e || e === Ud) && (e = Bi), or(e))) {
    const a = tn(e, t, !0);
    return (
      i && Wr(a, i),
      qn > 0 &&
        !o &&
        we &&
        (a.shapeFlag & 6 ? (we[we.indexOf(e)] = a) : we.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((Ef(e) && (e = e.__vccOpts), t)) {
    t = mf(t);
    let { class: a, style: c } = t;
    a && !Qt(a) && (t.class = Er(a)),
      Kt(c) && (Fc(c) && !pt(c) && (c = se({}, c)), (t.style = Mr(c)));
  }
  const r = Qt(e) ? 1 : Id(e) ? 128 : ff(e) ? 64 : Kt(e) ? 4 : yt(e) ? 2 : 0;
  return F(e, t, i, n, s, r, o, !0);
}
function mf(e) {
  return e ? (Fc(e) || lo in e ? se({}, e) : e) : null;
}
function tn(e, t, i = !1) {
  const { props: n, ref: s, patchFlag: o, children: r } = e,
    a = t ? vf(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && ph(a),
    ref:
      t && t.ref
        ? i && s
          ? pt(s)
            ? s.concat(Ps(t))
            : [s, Ps(t)]
          : Ps(t)
        : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== $t ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && tn(e.ssContent),
    ssFallback: e.ssFallback && tn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function vi(e = " ", t = 0) {
  return Tt($r, null, e, t);
}
function gs(e = "", t = !1) {
  return t ? (ft(), Kn(Bi, null, e)) : Tt(Bi, null, e);
}
function Ie(e) {
  return e == null || typeof e == "boolean"
    ? Tt(Bi)
    : pt(e)
    ? Tt($t, null, e.slice())
    : typeof e == "object"
    ? oi(e)
    : Tt($r, null, String(e));
}
function oi(e) {
  return e.el === null || e.memo ? e : tn(e);
}
function Wr(e, t) {
  let i = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (pt(t)) i = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Wr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      i = 32;
      const s = t._;
      !s && !(lo in t)
        ? (t._ctx = be)
        : s === 3 &&
          be &&
          (be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    yt(t)
      ? ((t = { default: t, _ctx: be }), (i = 32))
      : ((t = String(t)), n & 64 ? ((i = 16), (t = [vi(t)])) : (i = 8));
  (e.children = t), (e.shapeFlag |= i);
}
function vf(...e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const n = e[i];
    for (const s in n)
      if (s === "class")
        t.class !== n.class && (t.class = Er([t.class, n.class]));
      else if (s === "style") t.style = Mr([t.style, n.style]);
      else if (Gs(s)) {
        const o = t[s],
          r = n[s];
        r &&
          o !== r &&
          !(pt(o) && o.includes(r)) &&
          (t[s] = o ? [].concat(o, r) : r);
      } else s !== "" && (t[s] = n[s]);
  }
  return t;
}
function Le(e, t, i, n = null) {
  Me(e, t, 7, [i, n]);
}
const _f = uh();
let yf = 0;
function bf(e, t, i) {
  const n = e.type,
    s = (t ? t.appContext : e.appContext) || _f,
    o = {
      uid: yf++,
      vnode: e,
      type: n,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new qu(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ah(n, s),
      emitsOptions: Qc(n, s),
      emit: null,
      emitted: null,
      propsDefaults: Rt,
      inheritAttrs: n.inheritAttrs,
      ctx: Rt,
      data: Rt,
      props: Rt,
      attrs: Rt,
      slots: Rt,
      refs: Rt,
      setupState: Rt,
      setupContext: null,
      suspense: i,
      suspenseId: i ? i.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Td.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let Jt = null;
const en = (e) => {
    (Jt = e), e.scope.on();
  },
  Ai = () => {
    Jt && Jt.scope.off(), (Jt = null);
  };
function gh(e) {
  return e.vnode.shapeFlag & 4;
}
let Yn = !1;
function xf(e, t = !1) {
  Yn = t;
  const { props: i, children: n } = e.vnode,
    s = gh(e);
  nf(e, i, s, t), rf(e, n);
  const o = s ? wf(e, t) : void 0;
  return (Yn = !1), o;
}
function wf(e, t) {
  const i = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Hc(new Proxy(e.ctx, Qd)));
  const { setup: n } = i;
  if (n) {
    const s = (e.setupContext = n.length > 1 ? Cf(e) : null);
    en(e), cn();
    const o = ui(n, e, 0, [e.props, s]);
    if ((hn(), Ai(), kc(o))) {
      if ((o.then(Ai, Ai), t))
        return o
          .then((r) => {
            Pa(e, r, t);
          })
          .catch((r) => {
            no(r, e, 0);
          });
      e.asyncDep = o;
    } else Pa(e, o, t);
  } else mh(e, t);
}
function Pa(e, t, i) {
  yt(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Kt(t) && (e.setupState = Nc(t)),
    mh(e, i);
}
let Aa;
function mh(e, t, i) {
  const n = e.type;
  if (!e.render) {
    if (!t && Aa && !n.render) {
      const s = n.template;
      if (s) {
        const { isCustomElement: o, compilerOptions: r } = e.appContext.config,
          { delimiters: a, compilerOptions: c } = n,
          u = se(se({ isCustomElement: o, delimiters: a }, r), c);
        n.render = Aa(s, u);
      }
    }
    e.render = n.render || Ce;
  }
  en(e), cn(), Jd(e), hn(), Ai();
}
function kf(e) {
  return new Proxy(e.attrs, {
    get(t, i) {
      return ue(e, "get", "$attrs"), t[i];
    },
  });
}
function Cf(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  let i;
  return {
    get attrs() {
      return i || (i = kf(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function co(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Nc(Hc(e.exposed)), {
        get(t, i) {
          if (i in t) return t[i];
          if (i in Fs) return Fs[i](e);
        },
      }))
    );
}
function Mf(e, t = !0) {
  return yt(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ef(e) {
  return yt(e) && "__vccOpts" in e;
}
const ge = (e, t) => kd(e, t, Yn);
function vh(e, t, i) {
  const n = arguments.length;
  return n === 2
    ? Kt(t) && !pt(t)
      ? or(t)
        ? Tt(e, null, [t])
        : Tt(e, t)
      : Tt(e, null, t)
    : (n > 3
        ? (i = Array.prototype.slice.call(arguments, 2))
        : n === 3 && or(i) && (i = [i]),
      Tt(e, t, i));
}
const Sf = "3.2.37",
  Of = "http://www.w3.org/2000/svg",
  Di = typeof document < "u" ? document : null,
  Ia = Di && Di.createElement("template"),
  Tf = {
    insert: (e, t, i) => {
      t.insertBefore(e, i || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, i, n) => {
      const s = t
        ? Di.createElementNS(Of, e)
        : Di.createElement(e, i ? { is: i } : void 0);
      return (
        e === "select" &&
          n &&
          n.multiple != null &&
          s.setAttribute("multiple", n.multiple),
        s
      );
    },
    createText: (e) => Di.createTextNode(e),
    createComment: (e) => Di.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Di.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, i, n, s, o) {
      const r = i ? i.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), i),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Ia.innerHTML = n ? `<svg>${e}</svg>` : e;
        const a = Ia.content;
        if (n) {
          const c = a.firstChild;
          for (; c.firstChild; ) a.appendChild(c.firstChild);
          a.removeChild(c);
        }
        t.insertBefore(a, i);
      }
      return [
        r ? r.nextSibling : t.firstChild,
        i ? i.previousSibling : t.lastChild,
      ];
    },
  };
function Df(e, t, i) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : i
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Lf(e, t, i) {
  const n = e.style,
    s = Qt(i);
  if (i && !s) {
    for (const o in i) rr(n, o, i[o]);
    if (t && !Qt(t)) for (const o in t) i[o] == null && rr(n, o, "");
  } else {
    const o = n.display;
    s ? t !== i && (n.cssText = i) : t && e.removeAttribute("style"),
      "_vod" in e && (n.display = o);
  }
}
const Ra = /\s*!important$/;
function rr(e, t, i) {
  if (pt(i)) i.forEach((n) => rr(e, t, n));
  else if ((i == null && (i = ""), t.startsWith("--"))) e.setProperty(t, i);
  else {
    const n = Pf(e, t);
    Ra.test(i)
      ? e.setProperty(ln(n), i.replace(Ra, ""), "important")
      : (e[n] = i);
  }
}
const Ba = ["Webkit", "Moz", "ms"],
  To = {};
function Pf(e, t) {
  const i = To[t];
  if (i) return i;
  let n = Be(t);
  if (n !== "filter" && n in e) return (To[t] = n);
  n = eo(n);
  for (let s = 0; s < Ba.length; s++) {
    const o = Ba[s] + n;
    if (o in e) return (To[t] = o);
  }
  return t;
}
const Fa = "http://www.w3.org/1999/xlink";
function Af(e, t, i, n, s) {
  if (n && t.startsWith("xlink:"))
    i == null
      ? e.removeAttributeNS(Fa, t.slice(6, t.length))
      : e.setAttributeNS(Fa, t, i);
  else {
    const o = Au(t);
    i == null || (o && !bc(i))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : i);
  }
}
function If(e, t, i, n, s, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n && r(n, s, o), (e[t] = i == null ? "" : i);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = i;
    const c = i == null ? "" : i;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      i == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (i === "" || i == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (i = bc(i))
      : i == null && c === "string"
      ? ((i = ""), (a = !0))
      : c === "number" && ((i = 0), (a = !0));
  }
  try {
    e[t] = i;
  } catch {}
  a && e.removeAttribute(t);
}
const [_h, Rf] = (() => {
  let e = Date.now,
    t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp &&
      (e = performance.now.bind(performance));
    const i = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(i && Number(i[1]) <= 53);
  }
  return [e, t];
})();
let ar = 0;
const Bf = Promise.resolve(),
  Ff = () => {
    ar = 0;
  },
  Hf = () => ar || (Bf.then(Ff), (ar = _h()));
function ai(e, t, i, n) {
  e.addEventListener(t, i, n);
}
function $f(e, t, i, n) {
  e.removeEventListener(t, i, n);
}
function Wf(e, t, i, n, s = null) {
  const o = e._vei || (e._vei = {}),
    r = o[t];
  if (n && r) r.value = n;
  else {
    const [a, c] = zf(t);
    if (n) {
      const u = (o[t] = Nf(n, s));
      ai(e, a, u, c);
    } else r && ($f(e, a, r, c), (o[t] = void 0));
  }
}
const Ha = /(?:Once|Passive|Capture)$/;
function zf(e) {
  let t;
  if (Ha.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Ha)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [ln(e.slice(2)), t];
}
function Nf(e, t) {
  const i = (n) => {
    const s = n.timeStamp || _h();
    (Rf || s >= i.attached - 1) && Me(Vf(n, i.value), t, 5, [n]);
  };
  return (i.value = e), (i.attached = Hf()), i;
}
function Vf(e, t) {
  if (pt(t)) {
    const i = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        i.call(e), (e._stopped = !0);
      }),
      t.map((n) => (s) => !s._stopped && n && n(s))
    );
  } else return t;
}
const $a = /^on[a-z]/,
  jf = (e, t, i, n, s = !1, o, r, a, c) => {
    t === "class"
      ? Df(e, n, s)
      : t === "style"
      ? Lf(e, i, n)
      : Gs(t)
      ? Sr(t) || Wf(e, t, i, n, r)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : qf(e, t, n, s)
        )
      ? If(e, t, n, o, r, a, c)
      : (t === "true-value"
          ? (e._trueValue = n)
          : t === "false-value" && (e._falseValue = n),
        Af(e, t, n, s));
  };
function qf(e, t, i, n) {
  return n
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && $a.test(t) && yt(i))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      ($a.test(t) && Qt(i))
    ? !1
    : t in e;
}
const nn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return pt(t) ? (i) => Ts(t, i) : t;
};
function Kf(e) {
  e.target.composing = !0;
}
function Wa(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Ee = {
    created(e, { modifiers: { lazy: t, trim: i, number: n } }, s) {
      e._assign = nn(s);
      const o = n || (s.props && s.props.type === "number");
      ai(e, t ? "change" : "input", (r) => {
        if (r.target.composing) return;
        let a = e.value;
        i && (a = a.trim()), o && (a = Ko(a)), e._assign(a);
      }),
        i &&
          ai(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (ai(e, "compositionstart", Kf),
          ai(e, "compositionend", Wa),
          ai(e, "change", Wa));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: i, trim: n, number: s } },
      o
    ) {
      if (
        ((e._assign = nn(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (i ||
              (n && e.value.trim() === t) ||
              ((s || e.type === "number") && Ko(e.value) === t))))
      )
        return;
      const r = t == null ? "" : t;
      e.value !== r && (e.value = r);
    },
  },
  $s = {
    deep: !0,
    created(e, t, i) {
      (e._assign = nn(i)),
        ai(e, "change", () => {
          const n = e._modelValue,
            s = yh(e),
            o = e.checked,
            r = e._assign;
          if (pt(n)) {
            const a = xc(n, s),
              c = a !== -1;
            if (o && !c) r(n.concat(s));
            else if (!o && c) {
              const u = [...n];
              u.splice(a, 1), r(u);
            }
          } else if (Zs(n)) {
            const a = new Set(n);
            o ? a.add(s) : a.delete(s), r(a);
          } else r(bh(e, o));
        });
    },
    mounted: za,
    beforeUpdate(e, t, i) {
      (e._assign = nn(i)), za(e, t, i);
    },
  };
function za(e, { value: t, oldValue: i }, n) {
  (e._modelValue = t),
    pt(t)
      ? (e.checked = xc(t, n.props.value) > -1)
      : Zs(t)
      ? (e.checked = t.has(n.props.value))
      : t !== i && (e.checked = Zi(t, bh(e, !0)));
}
const Na = {
  created(e, { value: t }, i) {
    (e.checked = Zi(t, i.props.value)),
      (e._assign = nn(i)),
      ai(e, "change", () => {
        e._assign(yh(e));
      });
  },
  beforeUpdate(e, { value: t, oldValue: i }, n) {
    (e._assign = nn(n)), t !== i && (e.checked = Zi(t, n.props.value));
  },
};
function yh(e) {
  return "_value" in e ? e._value : e.value;
}
function bh(e, t) {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}
const Yf = se({ patchProp: jf }, Tf);
let Va;
function Uf() {
  return Va || (Va = hf(Yf));
}
const Xf = (...e) => {
  const t = Uf().createApp(...e),
    { mount: i } = t;
  return (
    (t.mount = (n) => {
      const s = Qf(n);
      if (!s) return;
      const o = t._component;
      !yt(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = "");
      const r = i(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        r
      );
    }),
    t
  );
};
function Qf(e) {
  return Qt(e) ? document.querySelector(e) : e;
}
const _i = (e, t) => {
    const i = e.__vccOpts || e;
    for (const [n, s] of t) i[n] = s;
    return i;
  },
  Jf = {},
  Gf = vi("Dashboard"),
  Zf = vi("Cards"),
  tp = vi("Criar cards"),
  ep = vi("Recorrentes"),
  ip = vi("Checklist"),
  np = vi("An\xE1lises"),
  sp = vi("API_KEY");
function op(e, t) {
  const i = nh("RouterLink");
  return (
    ft(),
    vt(
      $t,
      null,
      [
        Tt(
          i,
          { class: "waves-effect waves-light btn", to: "/trello-utils/" },
          { default: si(() => [Gf]), _: 1 }
        ),
        Tt(
          i,
          { class: "waves-effect waves-light btn", to: "/trello-utils/cards" },
          { default: si(() => [Zf]), _: 1 }
        ),
        Tt(
          i,
          {
            class: "waves-effect waves-light btn",
            to: "/trello-utils/create-cards",
          },
          { default: si(() => [tp]), _: 1 }
        ),
        Tt(
          i,
          {
            class: "waves-effect waves-light btn",
            to: "/trello-utils/recurrents",
          },
          { default: si(() => [ep]), _: 1 }
        ),
        Tt(
          i,
          {
            class: "waves-effect waves-light btn",
            to: "/trello-utils/checklist",
          },
          { default: si(() => [ip]), _: 1 }
        ),
        Tt(
          i,
          {
            class: "waves-effect waves-light btn",
            to: "/trello-utils/analises",
          },
          { default: si(() => [np]), _: 1 }
        ),
        Tt(
          i,
          {
            class: "waves-effect waves-light btn",
            to: "/trello-utils/api-key",
          },
          { default: si(() => [sp]), _: 1 }
        ),
      ],
      64
    )
  );
}
const rp = _i(Jf, [
  ["render", op],
  ["__scopeId", "data-v-c1e65cb6"],
]);
const mn =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  lr = { exports: {} };
/*!
 * Materialize v1.0.0-rc.2 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */ (function (e, t) {
  const i = function p(v, k, E) {
      v === null && (v = Function.prototype);
      const y = Object.getOwnPropertyDescriptor(v, k);
      if (y === void 0) {
        const g = Object.getPrototypeOf(v);
        return g === null ? void 0 : p(g, k, E);
      } else {
        if ("value" in y) return y.value;
        const h = y.get;
        return h === void 0 ? void 0 : h.call(E);
      }
    },
    n = (function () {
      function p(v, k) {
        for (let E = 0; E < k.length; E++) {
          const y = k[E];
          (y.enumerable = y.enumerable || !1),
            (y.configurable = !0),
            "value" in y && (y.writable = !0),
            Object.defineProperty(v, y.key, y);
        }
      }
      return function (v, k, E) {
        return k && p(v.prototype, k), E && p(v, E), v;
      };
    })();
  function s(p, v) {
    if (!p)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return v && (typeof v == "object" || typeof v == "function") ? v : p;
  }
  function o(p, v) {
    if (typeof v != "function" && v !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof v
      );
    (p.prototype = Object.create(v && v.prototype, {
      constructor: { value: p, enumerable: !1, writable: !0, configurable: !0 },
    })),
      v &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(p, v)
          : (p.__proto__ = v));
  }
  function r(p, v) {
    if (!(p instanceof v))
      throw new TypeError("Cannot call a class as a function");
  }
  /*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */ (function (
    p
  ) {
    window.cash = p();
  })(function () {
    const p = document,
      v = window,
      k = Array.prototype,
      E = k.slice,
      y = k.filter,
      g = k.push,
      h = function () {},
      l = function (_) {
        return typeof _ == typeof h && _.call;
      },
      d = function (_) {
        return typeof _ == "string";
      },
      C = /^#[\w-]*$/,
      T = /^\.[\w-]*$/,
      L = /<.+>/,
      A = /^\w+$/;
    function R(_, w) {
      w = w || p;
      const D = T.test(_)
        ? w.getElementsByClassName(_.slice(1))
        : A.test(_)
        ? w.getElementsByTagName(_)
        : w.querySelectorAll(_);
      return D;
    }
    let W;
    function z(_) {
      if (!W) {
        W = p.implementation.createHTMLDocument(null);
        const w = W.createElement("base");
        (w.href = p.location.href), W.head.appendChild(w);
      }
      return (W.body.innerHTML = _), W.body.childNodes;
    }
    function N(_) {
      p.readyState !== "loading"
        ? _()
        : p.addEventListener("DOMContentLoaded", _);
    }
    function Y(_, w) {
      if (!_) return this;
      if (_.cash && _ !== v) return _;
      let D = _,
        H = 0,
        q;
      if (d(_))
        D = C.test(_)
          ? p.getElementById(_.slice(1))
          : L.test(_)
          ? z(_)
          : R(_, w);
      else if (l(_)) return N(_), this;
      if (!D) return this;
      if (D.nodeType || D === v) (this[0] = D), (this.length = 1);
      else for (q = this.length = D.length; H < q; H++) this[H] = D[H];
      return this;
    }
    function X(_, w) {
      return new Y(_, w);
    }
    const Q =
      (X.fn =
      X.prototype =
      Y.prototype =
        {
          cash: !0,
          length: 0,
          push: g,
          splice: k.splice,
          map: k.map,
          init: Y,
        });
    Object.defineProperty(Q, "constructor", { value: X }),
      (X.parseHTML = z),
      (X.noop = h),
      (X.isFunction = l),
      (X.isString = d),
      (X.extend = Q.extend =
        function (_) {
          _ = _ || {};
          let w = E.call(arguments),
            D = w.length,
            H = 1;
          for (w.length === 1 && ((_ = this), (H = 0)); H < D; H++)
            if (w[H])
              for (const q in w[H]) w[H].hasOwnProperty(q) && (_[q] = w[H][q]);
          return _;
        });
    function lt(_, w) {
      for (
        let D = _.length, H = 0;
        H < D && w.call(_[H], _[H], H, _) !== !1;
        H++
      );
    }
    function xt(_, w) {
      const D =
        _ &&
        (_.matches ||
          _.webkitMatchesSelector ||
          _.mozMatchesSelector ||
          _.msMatchesSelector ||
          _.oMatchesSelector);
      return !!D && D.call(_, w);
    }
    function bt(_) {
      return d(_)
        ? xt
        : _.cash
        ? function (w) {
            return _.is(w);
          }
        : function (w, D) {
            return w === D;
          };
    }
    function dt(_) {
      return X(
        E.call(_).filter(function (w, D, H) {
          return H.indexOf(w) === D;
        })
      );
    }
    X.extend({
      merge: function (_, w) {
        for (var D = +w.length, H = _.length, q = 0; q < D; H++, q++)
          _[H] = w[q];
        return (_.length = H), _;
      },
      each: lt,
      matches: xt,
      unique: dt,
      isArray: Array.isArray,
      isNumeric: function (_) {
        return !isNaN(parseFloat(_)) && isFinite(_);
      },
    });
    const Et = (X.uid = "_cash" + Date.now());
    function St(_) {
      return (_[Et] = _[Et] || {});
    }
    function K(_, w, D) {
      return (St(_)[w] = D);
    }
    function st(_, w) {
      const D = St(_);
      return (
        D[w] === void 0 &&
          (D[w] = _.dataset ? _.dataset[w] : X(_).attr("data-" + w)),
        D[w]
      );
    }
    function it(_, w) {
      const D = St(_);
      D
        ? delete D[w]
        : _.dataset
        ? delete _.dataset[w]
        : X(_).removeAttr("data-" + name);
    }
    Q.extend({
      data: function (_, w) {
        if (d(_))
          return w === void 0
            ? st(this[0], _)
            : this.each(function (H) {
                return K(H, _, w);
              });
        for (const D in _) this.data(D, _[D]);
        return this;
      },
      removeData: function (_) {
        return this.each(function (w) {
          return it(w, _);
        });
      },
    });
    const rt = /\S+/g;
    function gt(_) {
      return d(_) && _.match(rt);
    }
    function wt(_, w) {
      return _.classList
        ? _.classList.contains(w)
        : new RegExp("(^| )" + w + "( |$)", "gi").test(_.className);
    }
    function at(_, w, D) {
      _.classList
        ? _.classList.add(w)
        : D.indexOf(" " + w + " ") && (_.className += " " + w);
    }
    function ut(_, w) {
      _.classList
        ? _.classList.remove(w)
        : (_.className = _.className.replace(w, ""));
    }
    Q.extend({
      addClass: function (_) {
        const w = gt(_);
        return w
          ? this.each(function (D) {
              const H = " " + D.className + " ";
              lt(w, function (q) {
                at(D, q, H);
              });
            })
          : this;
      },
      attr: function (_, w) {
        if (_) {
          if (d(_))
            return w === void 0
              ? this[0]
                ? this[0].getAttribute
                  ? this[0].getAttribute(_)
                  : this[0][_]
                : void 0
              : this.each(function (H) {
                  H.setAttribute ? H.setAttribute(_, w) : (H[_] = w);
                });
          for (const D in _) this.attr(D, _[D]);
          return this;
        }
      },
      hasClass: function (_) {
        let w = !1,
          D = gt(_);
        return (
          D &&
            D.length &&
            this.each(function (H) {
              return (w = wt(H, D[0])), !w;
            }),
          w
        );
      },
      prop: function (_, w) {
        if (d(_))
          return w === void 0
            ? this[0][_]
            : this.each(function (H) {
                H[_] = w;
              });
        for (const D in _) this.prop(D, _[D]);
        return this;
      },
      removeAttr: function (_) {
        return this.each(function (w) {
          w.removeAttribute ? w.removeAttribute(_) : delete w[_];
        });
      },
      removeClass: function (_) {
        if (!arguments.length) return this.attr("class", "");
        const w = gt(_);
        return w
          ? this.each(function (D) {
              lt(w, function (H) {
                ut(D, H);
              });
            })
          : this;
      },
      removeProp: function (_) {
        return this.each(function (w) {
          delete w[_];
        });
      },
      toggleClass: function (_, w) {
        if (w !== void 0) return this[w ? "addClass" : "removeClass"](_);
        const D = gt(_);
        return D
          ? this.each(function (H) {
              const q = " " + H.className + " ";
              lt(D, function (tt) {
                wt(H, tt) ? ut(H, tt) : at(H, tt, q);
              });
            })
          : this;
      },
    }),
      Q.extend({
        add: function (_, w) {
          return dt(X.merge(this, X(_, w)));
        },
        each: function (_) {
          return lt(this, _), this;
        },
        eq: function (_) {
          return X(this.get(_));
        },
        filter: function (_) {
          if (!_) return this;
          const w = l(_) ? _ : bt(_);
          return X(
            y.call(this, function (D) {
              return w(D, _);
            })
          );
        },
        first: function () {
          return this.eq(0);
        },
        get: function (_) {
          return _ === void 0
            ? E.call(this)
            : _ < 0
            ? this[_ + this.length]
            : this[_];
        },
        index: function (_) {
          const w = _ ? X(_)[0] : this[0],
            D = _ ? this : X(w).parent().children();
          return E.call(D).indexOf(w);
        },
        last: function () {
          return this.eq(-1);
        },
      });
    const P = (function () {
        const _ = /(?:^\w|[A-Z]|\b\w)/g,
          w = /[\s-_]+/g;
        return function (D) {
          return D.replace(_, function (H, q) {
            return H[q === 0 ? "toLowerCase" : "toUpperCase"]();
          }).replace(w, "");
        };
      })(),
      B = (function () {
        const _ = {},
          w = document,
          D = w.createElement("div"),
          H = D.style;
        return function (q) {
          if (((q = P(q)), _[q])) return _[q];
          const tt = q.charAt(0).toUpperCase() + q.slice(1),
            ht = ["webkit", "moz", "ms", "o"],
            ct = (q + " " + ht.join(tt + " ") + tt).split(" ");
          return (
            lt(ct, function (Ut) {
              if (Ut in H) return (_[Ut] = q = _[q] = Ut), !1;
            }),
            _[q]
          );
        };
      })();
    (X.prefixedProp = B),
      (X.camelCase = P),
      Q.extend({
        css: function (_, w) {
          if (d(_))
            return (
              (_ = B(_)),
              arguments.length > 1
                ? this.each(function (H) {
                    return (H.style[_] = w);
                  })
                : v.getComputedStyle(this[0])[_]
            );
          for (const D in _) this.css(D, _[D]);
          return this;
        },
      });
    function V(_, w) {
      return parseInt(v.getComputedStyle(_[0], null)[w], 10) || 0;
    }
    lt(["Width", "Height"], function (_) {
      const w = _.toLowerCase();
      (Q[w] = function () {
        return this[0].getBoundingClientRect()[w];
      }),
        (Q["inner" + _] = function () {
          return this[0]["client" + _];
        }),
        (Q["outer" + _] = function (D) {
          return (
            this[0]["offset" + _] +
            (D
              ? V(this, "margin" + (_ === "Width" ? "Left" : "Top")) +
                V(this, "margin" + (_ === "Width" ? "Right" : "Bottom"))
              : 0)
          );
        });
    });
    function j(_, w, D) {
      const H = st(_, "_cashEvents") || K(_, "_cashEvents", {});
      (H[w] = H[w] || []), H[w].push(D), _.addEventListener(w, D);
    }
    function U(_, w, D) {
      let H = st(_, "_cashEvents"),
        q = H && H[w],
        tt;
      !q ||
        (D
          ? (_.removeEventListener(w, D),
            (tt = q.indexOf(D)),
            tt >= 0 && q.splice(tt, 1))
          : (lt(q, function (ht) {
              _.removeEventListener(w, ht);
            }),
            (q = [])));
    }
    Q.extend({
      off: function (_, w) {
        return this.each(function (D) {
          return U(D, _, w);
        });
      },
      on: function (_, w, D, H) {
        let q;
        if (!d(_)) {
          for (const tt in _) this.on(tt, w, _[tt]);
          return this;
        }
        return (
          l(w) && ((D = w), (w = null)),
          _ === "ready"
            ? (N(D), this)
            : (w &&
                ((q = D),
                (D = function (ht) {
                  for (var ct = ht.target; !xt(ct, w); ) {
                    if (ct === this || ct === null) return (ct = !1);
                    ct = ct.parentNode;
                  }
                  ct && q.call(ct, ht);
                })),
              this.each(function (ht) {
                let ct = D;
                H &&
                  (ct = function () {
                    D.apply(this, arguments), U(ht, _, ct);
                  }),
                  j(ht, _, ct);
              }))
        );
      },
      one: function (_, w, D) {
        return this.on(_, w, D, !0);
      },
      ready: N,
      trigger: function (_, w) {
        if (document.createEvent) {
          let D = document.createEvent("HTMLEvents");
          return (
            D.initEvent(_, !0, !1),
            (D = this.extend(D, w)),
            this.each(function (H) {
              return H.dispatchEvent(D);
            })
          );
        }
      },
    });
    function Z(_, w) {
      return (
        "&" +
        encodeURIComponent(_) +
        "=" +
        encodeURIComponent(w).replace(/%20/g, "+")
      );
    }
    function nt(_) {
      const w = [];
      return (
        lt(_.options, function (D) {
          D.selected && w.push(D.value);
        }),
        w.length ? w : null
      );
    }
    function G(_) {
      const w = _.selectedIndex;
      return w >= 0 ? _.options[w].value : null;
    }
    function et(_) {
      const w = _.type;
      if (!w) return null;
      switch (w.toLowerCase()) {
        case "select-one":
          return G(_);
        case "select-multiple":
          return nt(_);
        case "radio":
          return _.checked ? _.value : null;
        case "checkbox":
          return _.checked ? _.value : null;
        default:
          return _.value ? _.value : null;
      }
    }
    Q.extend({
      serialize: function () {
        let _ = "";
        return (
          lt(this[0].elements || this, function (w) {
            if (!(w.disabled || w.tagName === "FIELDSET")) {
              const D = w.name;
              switch (w.type.toLowerCase()) {
                case "file":
                case "reset":
                case "submit":
                case "button":
                  break;
                case "select-multiple":
                  var H = et(w);
                  H !== null &&
                    lt(H, function (tt) {
                      _ += Z(D, tt);
                    });
                  break;
                default:
                  var q = et(w);
                  q !== null && (_ += Z(D, q));
              }
            }
          }),
          _.substr(1)
        );
      },
      val: function (_) {
        return _ === void 0
          ? et(this[0])
          : this.each(function (w) {
              return (w.value = _);
            });
      },
    });
    function J(_, w, D) {
      if (D) {
        const H = _.childNodes[0];
        _.insertBefore(w, H);
      } else _.appendChild(w);
    }
    function O(_, w, D) {
      const H = d(w);
      if (!H && w.length) {
        lt(w, function (q) {
          return O(_, q, D);
        });
        return;
      }
      lt(
        _,
        H
          ? function (q) {
              return q.insertAdjacentHTML(D ? "afterbegin" : "beforeend", w);
            }
          : function (q, tt) {
              return J(q, tt === 0 ? w : w.cloneNode(!0), D);
            }
      );
    }
    Q.extend({
      after: function (_) {
        return X(_).insertAfter(this), this;
      },
      append: function (_) {
        return O(this, _), this;
      },
      appendTo: function (_) {
        return O(X(_), this), this;
      },
      before: function (_) {
        return X(_).insertBefore(this), this;
      },
      clone: function () {
        return X(
          this.map(function (_) {
            return _.cloneNode(!0);
          })
        );
      },
      empty: function () {
        return this.html(""), this;
      },
      html: function (_) {
        if (_ === void 0) return this[0].innerHTML;
        const w = _.nodeType ? _[0].outerHTML : _;
        return this.each(function (D) {
          return (D.innerHTML = w);
        });
      },
      insertAfter: function (_) {
        const w = this;
        return (
          X(_).each(function (D, H) {
            const q = D.parentNode,
              tt = D.nextSibling;
            w.each(function (ht) {
              q.insertBefore(H === 0 ? ht : ht.cloneNode(!0), tt);
            });
          }),
          this
        );
      },
      insertBefore: function (_) {
        const w = this;
        return (
          X(_).each(function (D, H) {
            const q = D.parentNode;
            w.each(function (tt) {
              q.insertBefore(H === 0 ? tt : tt.cloneNode(!0), D);
            });
          }),
          this
        );
      },
      prepend: function (_) {
        return O(this, _, !0), this;
      },
      prependTo: function (_) {
        return O(X(_), this, !0), this;
      },
      remove: function () {
        return this.each(function (_) {
          if (_.parentNode) return _.parentNode.removeChild(_);
        });
      },
      text: function (_) {
        return _ === void 0
          ? this[0].textContent
          : this.each(function (w) {
              return (w.textContent = _);
            });
      },
    });
    const I = p.documentElement;
    return (
      Q.extend({
        position: function () {
          const _ = this[0];
          return { left: _.offsetLeft, top: _.offsetTop };
        },
        offset: function () {
          const _ = this[0].getBoundingClientRect();
          return {
            top: _.top + v.pageYOffset - I.clientTop,
            left: _.left + v.pageXOffset - I.clientLeft,
          };
        },
        offsetParent: function () {
          return X(this[0].offsetParent);
        },
      }),
      Q.extend({
        children: function (_) {
          let w = [];
          return (
            this.each(function (D) {
              g.apply(w, D.children);
            }),
            (w = dt(w)),
            _
              ? w.filter(function (D) {
                  return xt(D, _);
                })
              : w
          );
        },
        closest: function (_) {
          return !_ || this.length < 1
            ? X()
            : this.is(_)
            ? this.filter(_)
            : this.parent().closest(_);
        },
        is: function (_) {
          if (!_) return !1;
          let w = !1,
            D = bt(_);
          return (
            this.each(function (H) {
              return (w = D(H, _)), !w;
            }),
            w
          );
        },
        find: function (_) {
          if (!_ || _.nodeType) return X(_ && this.has(_).length ? _ : null);
          const w = [];
          return (
            this.each(function (D) {
              g.apply(w, R(_, D));
            }),
            dt(w)
          );
        },
        has: function (_) {
          const w = d(_)
            ? function (D) {
                return R(_, D).length !== 0;
              }
            : function (D) {
                return D.contains(_);
              };
          return this.filter(w);
        },
        next: function () {
          return X(this[0].nextElementSibling);
        },
        not: function (_) {
          if (!_) return this;
          const w = bt(_);
          return this.filter(function (D) {
            return !w(D, _);
          });
        },
        parent: function () {
          const _ = [];
          return (
            this.each(function (w) {
              w && w.parentNode && _.push(w.parentNode);
            }),
            dt(_)
          );
        },
        parents: function (_) {
          let w,
            D = [];
          return (
            this.each(function (H) {
              for (w = H; w && w.parentNode && w !== p.body.parentNode; )
                (w = w.parentNode), (!_ || (_ && xt(w, _))) && D.push(w);
            }),
            dt(D)
          );
        },
        prev: function () {
          return X(this[0].previousElementSibling);
        },
        siblings: function (_) {
          const w = this.parent().children(_),
            D = this[0];
          return w.filter(function (H) {
            return H !== D;
          });
        },
      }),
      X
    );
  });
  const a = (function () {
    function p(v, k, E) {
      r(this, p),
        k instanceof Element ||
          console.error(Error(k + " is not an HTML Element"));
      const y = v.getInstance(k);
      y && y.destroy(), (this.el = k), (this.$el = cash(k));
    }
    return (
      n(p, null, [
        {
          key: "init",
          value: function (k, E, y) {
            let g = null;
            if (E instanceof Element) g = new k(E, y);
            else if (!!E && (E.jquery || E.cash || E instanceof NodeList)) {
              for (var h = [], l = 0; l < E.length; l++) h.push(new k(E[l], y));
              g = h;
            }
            return g;
          },
        },
      ]),
      p
    );
  })();
  (function (p) {
    p.Package ? (M = {}) : (p.M = {}), (M.jQueryLoaded = !!p.jQuery);
  })(window),
    t.nodeType ||
      (!e.nodeType && e.exports && (t = e.exports = M), (t.default = M)),
    (M.keys = { TAB: 9, ENTER: 13, ESC: 27, ARROW_UP: 38, ARROW_DOWN: 40 }),
    (M.tabPressed = !1),
    (M.keyDown = !1);
  const c = function (p) {
      (M.keyDown = !0),
        (p.which === M.keys.TAB ||
          p.which === M.keys.ARROW_DOWN ||
          p.which === M.keys.ARROW_UP) &&
          (M.tabPressed = !0);
    },
    u = function (p) {
      (M.keyDown = !1),
        (p.which === M.keys.TAB ||
          p.which === M.keys.ARROW_DOWN ||
          p.which === M.keys.ARROW_UP) &&
          (M.tabPressed = !1);
    },
    f = function (p) {
      M.keyDown && document.body.classList.add("keyboard-focused");
    },
    m = function (p) {
      document.body.classList.remove("keyboard-focused");
    };
  document.addEventListener("keydown", c, !0),
    document.addEventListener("keyup", u, !0),
    document.addEventListener("focus", f, !0),
    document.addEventListener("blur", m, !0),
    (M.initializeJqueryWrapper = function (p, v, k) {
      jQuery.fn[v] = function (E) {
        if (p.prototype[E]) {
          const y = Array.prototype.slice.call(arguments, 1);
          if (E.slice(0, 3) === "get") {
            const g = this.first()[0][k];
            return g[E].apply(g, y);
          }
          return this.each(function () {
            const h = this[k];
            h[E].apply(h, y);
          });
        } else if (typeof E == "object" || !E)
          return p.init(this, arguments[0]), this;
        jQuery.error("Method " + E + " does not exist on jQuery." + v);
      };
    }),
    (M.AutoInit = function (p) {
      const v = p || document.body,
        k = {
          Autocomplete: v.querySelectorAll(".autocomplete:not(.no-autoinit)"),
          Carousel: v.querySelectorAll(".carousel:not(.no-autoinit)"),
          Chips: v.querySelectorAll(".chips:not(.no-autoinit)"),
          Collapsible: v.querySelectorAll(".collapsible:not(.no-autoinit)"),
          Datepicker: v.querySelectorAll(".datepicker:not(.no-autoinit)"),
          Dropdown: v.querySelectorAll(".dropdown-trigger:not(.no-autoinit)"),
          Materialbox: v.querySelectorAll(".materialboxed:not(.no-autoinit)"),
          Modal: v.querySelectorAll(".modal:not(.no-autoinit)"),
          Parallax: v.querySelectorAll(".parallax:not(.no-autoinit)"),
          Pushpin: v.querySelectorAll(".pushpin:not(.no-autoinit)"),
          ScrollSpy: v.querySelectorAll(".scrollspy:not(.no-autoinit)"),
          FormSelect: v.querySelectorAll("select:not(.no-autoinit)"),
          Sidenav: v.querySelectorAll(".sidenav:not(.no-autoinit)"),
          Tabs: v.querySelectorAll(".tabs:not(.no-autoinit)"),
          TapTarget: v.querySelectorAll(".tap-target:not(.no-autoinit)"),
          Timepicker: v.querySelectorAll(".timepicker:not(.no-autoinit)"),
          Tooltip: v.querySelectorAll(".tooltipped:not(.no-autoinit)"),
          FloatingActionButton: v.querySelectorAll(
            ".fixed-action-btn:not(.no-autoinit)"
          ),
        };
      for (const E in k) {
        const y = M[E];
        y.init(k[E]);
      }
    }),
    (M.objectSelectorString = function (p) {
      const v = p.prop("tagName") || "",
        k = p.attr("id") || "",
        E = p.attr("class") || "";
      return (v + k + E).replace(/\s/g, "");
    }),
    (M.guid = (function () {
      function p() {
        return Math.floor((1 + Math.random()) * 65536)
          .toString(16)
          .substring(1);
      }
      return function () {
        return (
          p() + p() + "-" + p() + "-" + p() + "-" + p() + "-" + p() + p() + p()
        );
      };
    })()),
    (M.escapeHash = function (p) {
      return p.replace(/(:|\.|\[|\]|,|=|\/)/g, "\\$1");
    }),
    (M.elementOrParentIsFixed = function (p) {
      let v = $(p),
        k = v.add(v.parents()),
        E = !1;
      return (
        k.each(function () {
          if ($(this).css("position") === "fixed") return (E = !0), !1;
        }),
        E
      );
    }),
    (M.checkWithinContainer = function (p, v, k) {
      const E = { top: !1, right: !1, bottom: !1, left: !1 },
        y = p.getBoundingClientRect(),
        g =
          p === document.body
            ? Math.max(y.bottom, window.innerHeight)
            : y.bottom,
        h = p.scrollLeft,
        l = p.scrollTop,
        d = v.left - h,
        C = v.top - l;
      return (
        (d < y.left + k || d < k) && (E.left = !0),
        (d + v.width > y.right - k || d + v.width > window.innerWidth - k) &&
          (E.right = !0),
        (C < y.top + k || C < k) && (E.top = !0),
        (C + v.height > g - k || C + v.height > window.innerHeight - k) &&
          (E.bottom = !0),
        E
      );
    }),
    (M.checkPossibleAlignments = function (p, v, k, E) {
      const y = {
          top: !0,
          right: !0,
          bottom: !0,
          left: !0,
          spaceOnTop: null,
          spaceOnRight: null,
          spaceOnBottom: null,
          spaceOnLeft: null,
        },
        g = getComputedStyle(v).overflow === "visible",
        h = v.getBoundingClientRect(),
        l = Math.min(h.height, window.innerHeight),
        d = Math.min(h.width, window.innerWidth),
        C = p.getBoundingClientRect(),
        T = v.scrollLeft,
        L = v.scrollTop,
        A = k.left - T,
        R = k.top - L,
        W = k.top + C.height - L;
      return (
        (y.spaceOnRight = g
          ? window.innerWidth - (C.left + k.width)
          : d - (A + k.width)),
        y.spaceOnRight < 0 && (y.left = !1),
        (y.spaceOnLeft = g ? C.right - k.width : A - k.width + C.width),
        y.spaceOnLeft < 0 && (y.right = !1),
        (y.spaceOnBottom = g
          ? window.innerHeight - (C.top + k.height + E)
          : l - (R + k.height + E)),
        y.spaceOnBottom < 0 && (y.top = !1),
        (y.spaceOnTop = g ? C.bottom - (k.height + E) : W - (k.height - E)),
        y.spaceOnTop < 0 && (y.bottom = !1),
        y
      );
    }),
    (M.getOverflowParent = function (p) {
      return p == null
        ? null
        : p === document.body || getComputedStyle(p).overflow !== "visible"
        ? p
        : M.getOverflowParent(p.parentElement);
    }),
    (M.getIdFromTrigger = function (p) {
      let v = p.getAttribute("data-target");
      return (
        v || ((v = p.getAttribute("href")), v ? (v = v.slice(1)) : (v = "")), v
      );
    }),
    (M.getDocumentScrollTop = function () {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    }),
    (M.getDocumentScrollLeft = function () {
      return (
        window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0
      );
    });
  /**
   * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
   * @type {function}
   * @return {number}
   */ const b =
    Date.now ||
    function () {
      return new Date().getTime();
    };
  /**
   * Returns a function, that, when invoked, will only be triggered at most once
   * during a given window of time. Normally, the throttled function will run
   * as much as it can, without ever going more than once per `wait` duration;
   * but if you'd like to disable the execution on the leading edge, pass
   * `{leading: false}`. To disable execution on the trailing edge, ditto.
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
   * @param {function} func
   * @param {number} wait
   * @param {Object=} options
   * @returns {Function}
   */ M.throttle = function (p, v, k) {
    let E = void 0,
      y = void 0,
      g = void 0,
      h = null,
      l = 0;
    k || (k = {});
    const d = function () {
      (l = k.leading === !1 ? 0 : b()),
        (h = null),
        (g = p.apply(E, y)),
        (E = y = null);
    };
    return function () {
      const C = b();
      !l && k.leading === !1 && (l = C);
      const T = v - (C - l);
      return (
        (E = this),
        (y = arguments),
        T <= 0
          ? (clearTimeout(h),
            (h = null),
            (l = C),
            (g = p.apply(E, y)),
            (E = y = null))
          : !h && k.trailing !== !1 && (h = setTimeout(d, T)),
        g
      );
    };
  };
  const x = { scope: {} };
  (x.defineProperty =
    typeof Object.defineProperties == "function"
      ? Object.defineProperty
      : function (p, v, k) {
          if (k.get || k.set)
            throw new TypeError("ES3 does not support getters and setters.");
          p != Array.prototype && p != Object.prototype && (p[v] = k.value);
        }),
    (x.getGlobal = function (p) {
      return typeof window < "u" && window === p
        ? p
        : typeof mn < "u" && mn != null
        ? mn
        : p;
    }),
    (x.global = x.getGlobal(mn)),
    (x.SYMBOL_PREFIX = "jscomp_symbol_"),
    (x.initSymbol = function () {
      (x.initSymbol = function () {}),
        x.global.Symbol || (x.global.Symbol = x.Symbol);
    }),
    (x.symbolCounter_ = 0),
    (x.Symbol = function (p) {
      return x.SYMBOL_PREFIX + (p || "") + x.symbolCounter_++;
    }),
    (x.initSymbolIterator = function () {
      x.initSymbol();
      let p = x.global.Symbol.iterator;
      p || (p = x.global.Symbol.iterator = x.global.Symbol("iterator")),
        typeof Array.prototype[p] != "function" &&
          x.defineProperty(Array.prototype, p, {
            configurable: !0,
            writable: !0,
            value: function () {
              return x.arrayIterator(this);
            },
          }),
        (x.initSymbolIterator = function () {});
    }),
    (x.arrayIterator = function (p) {
      let v = 0;
      return x.iteratorPrototype(function () {
        return v < p.length ? { done: !1, value: p[v++] } : { done: !0 };
      });
    }),
    (x.iteratorPrototype = function (p) {
      return (
        x.initSymbolIterator(),
        (p = { next: p }),
        (p[x.global.Symbol.iterator] = function () {
          return this;
        }),
        p
      );
    }),
    (x.array = x.array || {}),
    (x.iteratorFromArray = function (p, v) {
      x.initSymbolIterator(), p instanceof String && (p += "");
      var k = 0,
        E = {
          next: function () {
            if (k < p.length) {
              const y = k++;
              return { value: v(y, p[y]), done: !1 };
            }
            return (
              (E.next = function () {
                return { done: !0, value: void 0 };
              }),
              E.next()
            );
          },
        };
      return (
        (E[Symbol.iterator] = function () {
          return E;
        }),
        E
      );
    }),
    (x.polyfill = function (p, v, k, E) {
      if (v) {
        for (k = x.global, p = p.split("."), E = 0; E < p.length - 1; E++) {
          const y = p[E];
          y in k || (k[y] = {}), (k = k[y]);
        }
        (p = p[p.length - 1]),
          (E = k[p]),
          (v = v(E)),
          v != E &&
            v != null &&
            x.defineProperty(k, p, {
              configurable: !0,
              writable: !0,
              value: v,
            });
      }
    }),
    x.polyfill(
      "Array.prototype.keys",
      function (p) {
        return (
          p ||
          function () {
            return x.iteratorFromArray(this, function (v) {
              return v;
            });
          }
        );
      },
      "es6-impl",
      "es3"
    );
  const S = mn;
  (function (p) {
    M.anime = p();
  })(function () {
    function p(O) {
      if (!j.col(O))
        try {
          return document.querySelectorAll(O);
        } catch {}
    }
    function v(O, I) {
      for (
        var _ = O.length,
          w = 2 <= arguments.length ? arguments[1] : void 0,
          D = [],
          H = 0;
        H < _;
        H++
      )
        if (H in O) {
          const q = O[H];
          I.call(w, q, H, O) && D.push(q);
        }
      return D;
    }
    function k(O) {
      return O.reduce(function (I, _) {
        return I.concat(j.arr(_) ? k(_) : _);
      }, []);
    }
    function E(O) {
      return j.arr(O)
        ? O
        : (j.str(O) && (O = p(O) || O),
          O instanceof NodeList || O instanceof HTMLCollection
            ? [].slice.call(O)
            : [O]);
    }
    function y(O, I) {
      return O.some(function (_) {
        return _ === I;
      });
    }
    function g(O) {
      let I = {},
        _;
      for (_ in O) I[_] = O[_];
      return I;
    }
    function h(O, I) {
      let _ = g(O),
        w;
      for (w in O) _[w] = I.hasOwnProperty(w) ? I[w] : O[w];
      return _;
    }
    function l(O, I) {
      let _ = g(O),
        w;
      for (w in I) _[w] = j.und(O[w]) ? I[w] : O[w];
      return _;
    }
    function d(O) {
      O = O.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (w, D, H, q) {
        return D + D + H + H + q + q;
      });
      var _ = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(O);
      O = parseInt(_[1], 16);
      var I = parseInt(_[2], 16),
        _ = parseInt(_[3], 16);
      return "rgba(" + O + "," + I + "," + _ + ",1)";
    }
    function C(O) {
      function I(tt, ht, ct) {
        return (
          0 > ct && (ct += 1),
          1 < ct && --ct,
          ct < 1 / 6
            ? tt + 6 * (ht - tt) * ct
            : 0.5 > ct
            ? ht
            : ct < 2 / 3
            ? tt + (ht - tt) * (2 / 3 - ct) * 6
            : tt
        );
      }
      var D =
        /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(O) ||
        /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(O);
      O = parseInt(D[1]) / 360;
      var _ = parseInt(D[2]) / 100,
        w = parseInt(D[3]) / 100,
        D = D[4] || 1;
      if (_ == 0) w = _ = O = w;
      else {
        var H = 0.5 > w ? w * (1 + _) : w + _ - w * _,
          q = 2 * w - H,
          w = I(q, H, O + 1 / 3),
          _ = I(q, H, O);
        O = I(q, H, O - 1 / 3);
      }
      return "rgba(" + 255 * w + "," + 255 * _ + "," + 255 * O + "," + D + ")";
    }
    function T(O) {
      if (
        (O =
          /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
            O
          ))
      )
        return O[2];
    }
    function L(O) {
      if (-1 < O.indexOf("translate") || O === "perspective") return "px";
      if (-1 < O.indexOf("rotate") || -1 < O.indexOf("skew")) return "deg";
    }
    function A(O, I) {
      return j.fnc(O) ? O(I.target, I.id, I.total) : O;
    }
    function R(O, I) {
      if (I in O.style)
        return (
          getComputedStyle(O).getPropertyValue(
            I.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
          ) || "0"
        );
    }
    function W(O, I) {
      if (j.dom(O) && y(B, I)) return "transform";
      if (j.dom(O) && (O.getAttribute(I) || (j.svg(O) && O[I])))
        return "attribute";
      if (j.dom(O) && I !== "transform" && R(O, I)) return "css";
      if (O[I] != null) return "object";
    }
    function z(O, I) {
      var _ = L(I),
        _ = -1 < I.indexOf("scale") ? 1 : 0 + _;
      if (((O = O.style.transform), !O)) return _;
      for (var w = [], D = [], H = [], q = /(\w+)\((.+?)\)/g; (w = q.exec(O)); )
        D.push(w[1]), H.push(w[2]);
      return (
        (O = v(H, function (tt, ht) {
          return D[ht] === I;
        })),
        O.length ? O[0] : _
      );
    }
    function N(O, I) {
      switch (W(O, I)) {
        case "transform":
          return z(O, I);
        case "css":
          return R(O, I);
        case "attribute":
          return O.getAttribute(I);
      }
      return O[I] || 0;
    }
    function Y(O, I) {
      const _ = /^(\*=|\+=|-=)/.exec(O);
      if (!_) return O;
      const w = T(O) || 0;
      switch (
        ((I = parseFloat(I)), (O = parseFloat(O.replace(_[0], ""))), _[0][0])
      ) {
        case "+":
          return I + O + w;
        case "-":
          return I - O + w;
        case "*":
          return I * O + w;
      }
    }
    function X(O, I) {
      return Math.sqrt(Math.pow(I.x - O.x, 2) + Math.pow(I.y - O.y, 2));
    }
    function Q(O) {
      O = O.points;
      for (var I = 0, _, w = 0; w < O.numberOfItems; w++) {
        const D = O.getItem(w);
        0 < w && (I += X(_, D)), (_ = D);
      }
      return I;
    }
    function lt(O) {
      if (O.getTotalLength) return O.getTotalLength();
      switch (O.tagName.toLowerCase()) {
        case "circle":
          return 2 * Math.PI * O.getAttribute("r");
        case "rect":
          return 2 * O.getAttribute("width") + 2 * O.getAttribute("height");
        case "line":
          return X(
            { x: O.getAttribute("x1"), y: O.getAttribute("y1") },
            { x: O.getAttribute("x2"), y: O.getAttribute("y2") }
          );
        case "polyline":
          return Q(O);
        case "polygon":
          var I = O.points;
          return Q(O) + X(I.getItem(I.numberOfItems - 1), I.getItem(0));
      }
    }
    function xt(O, I) {
      function _(q) {
        return (
          (q = q === void 0 ? 0 : q),
          O.el.getPointAtLength(1 <= I + q ? I + q : 0)
        );
      }
      const w = _(),
        D = _(-1),
        H = _(1);
      switch (O.property) {
        case "x":
          return w.x;
        case "y":
          return w.y;
        case "angle":
          return (180 * Math.atan2(H.y - D.y, H.x - D.x)) / Math.PI;
      }
    }
    function bt(O, I) {
      let _ = /-?\d*\.?\d+/g,
        w;
      if (((w = j.pth(O) ? O.totalLength : O), j.col(w)))
        if (j.rgb(w)) {
          var D = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(w);
          w = D ? "rgba(" + D[1] + ",1)" : w;
        } else w = j.hex(w) ? d(w) : j.hsl(w) ? C(w) : void 0;
      else
        (D = (D = T(w)) ? w.substr(0, w.length - D.length) : w),
          (w = I && !/\s/g.test(w) ? D + I : D);
      return (
        (w += ""),
        {
          original: w,
          numbers: w.match(_) ? w.match(_).map(Number) : [0],
          strings: j.str(O) || I ? w.split(_) : [],
        }
      );
    }
    function dt(O) {
      return (
        (O = O ? k(j.arr(O) ? O.map(E) : E(O)) : []),
        v(O, function (I, _, w) {
          return w.indexOf(I) === _;
        })
      );
    }
    function Et(O) {
      const I = dt(O);
      return I.map(function (_, w) {
        return { target: _, id: w, total: I.length };
      });
    }
    function St(O, I) {
      const _ = g(I);
      if (j.arr(O)) {
        const w = O.length;
        w !== 2 || j.obj(O[0])
          ? j.fnc(I.duration) || (_.duration = I.duration / w)
          : (O = { value: O });
      }
      return E(O)
        .map(function (D, H) {
          return (
            (H = H ? 0 : I.delay),
            (D = j.obj(D) && !j.pth(D) ? D : { value: D }),
            j.und(D.delay) && (D.delay = H),
            D
          );
        })
        .map(function (D) {
          return l(D, _);
        });
    }
    function K(O, I) {
      let _ = {},
        w;
      for (w in O) {
        let D = A(O[w], I);
        j.arr(D) &&
          ((D = D.map(function (H) {
            return A(H, I);
          })),
          D.length === 1 && (D = D[0])),
          (_[w] = D);
      }
      return (
        (_.duration = parseFloat(_.duration)),
        (_.delay = parseFloat(_.delay)),
        _
      );
    }
    function st(O) {
      return j.arr(O) ? U.apply(this, O) : Z[O];
    }
    function it(O, I) {
      let _;
      return O.tweens.map(function (w) {
        w = K(w, I);
        var D = w.value,
          tt = N(I.target, O.name),
          H = _ ? _.to.original : tt,
          H = j.arr(D) ? D[0] : H,
          q = Y(j.arr(D) ? D[1] : D, H),
          tt = T(q) || T(H) || T(tt);
        return (
          (w.from = bt(H, tt)),
          (w.to = bt(q, tt)),
          (w.start = _ ? _.end : O.offset),
          (w.end = w.start + w.delay + w.duration),
          (w.easing = st(w.easing)),
          (w.elasticity =
            (1e3 - Math.min(Math.max(w.elasticity, 1), 999)) / 1e3),
          (w.isPath = j.pth(D)),
          (w.isColor = j.col(w.from.original)),
          w.isColor && (w.round = 1),
          (_ = w)
        );
      });
    }
    function rt(O, I) {
      return v(
        k(
          O.map(function (_) {
            return I.map(function (w) {
              const D = W(_.target, w.name);
              if (D) {
                const H = it(w, _);
                w = {
                  type: D,
                  property: w.name,
                  animatable: _,
                  tweens: H,
                  duration: H[H.length - 1].end,
                  delay: H[0].delay,
                };
              } else w = void 0;
              return w;
            });
          })
        ),
        function (_) {
          return !j.und(_);
        }
      );
    }
    function gt(O, I, _, w) {
      const D = O === "delay";
      return I.length
        ? (D ? Math.min : Math.max).apply(
            Math,
            I.map(function (H) {
              return H[O];
            })
          )
        : D
        ? w.delay
        : _.offset + w.delay + w.duration;
    }
    function wt(O) {
      let I = h(ut, O),
        _ = h(P, O),
        w = Et(O.targets),
        D = [],
        H = l(I, _),
        q;
      for (q in O)
        H.hasOwnProperty(q) ||
          q === "targets" ||
          D.push({ name: q, offset: H.offset, tweens: St(O[q], _) });
      return (
        (O = rt(w, D)),
        l(I, {
          children: [],
          animatables: w,
          animations: O,
          duration: gt("duration", O, I, _),
          delay: gt("delay", O, I, _),
        })
      );
    }
    function at(O) {
      function I() {
        return (
          window.Promise &&
          new Promise(function (mt) {
            return (Ut = mt);
          })
        );
      }
      function _(mt) {
        return ot.reversed ? ot.duration - mt : mt;
      }
      function w(mt) {
        for (
          var At = 0, Te = {}, He = ot.animations, cs = He.length;
          At < cs;

        ) {
          var Ge = He[At],
            de = Ge.animatable,
            oe = Ge.tweens,
            De = oe.length - 1,
            zt = oe[De];
          De &&
            (zt =
              v(oe, function (Du) {
                return mt < Du.end;
              })[0] || zt);
          for (
            var oe =
                Math.min(Math.max(mt - zt.start - zt.delay, 0), zt.duration) /
                zt.duration,
              xi = isNaN(oe) ? 1 : zt.easing(oe, zt.elasticity),
              oe = zt.to.strings,
              zi = zt.round,
              De = [],
              $e = void 0,
              $e = zt.to.numbers.length,
              We = 0;
            We < $e;
            We++
          ) {
            var wi = void 0,
              wi = zt.to.numbers[We],
              da = zt.from.numbers[We],
              wi = zt.isPath ? xt(zt.value, xi * wi) : da + xi * (wi - da);
            zi && ((zt.isColor && 2 < We) || (wi = Math.round(wi * zi) / zi)),
              De.push(wi);
          }
          if ((zt = oe.length))
            for ($e = oe[0], xi = 0; xi < zt; xi++)
              (zi = oe[xi + 1]),
                (We = De[xi]),
                isNaN(We) || ($e = zi ? $e + (We + zi) : $e + (We + " "));
          else $e = De[0];
          nt[Ge.type](de.target, Ge.property, $e, Te, de.id),
            (Ge.currentValue = $e),
            At++;
        }
        if ((At = Object.keys(Te).length))
          for (He = 0; He < At; He++)
            V ||
              (V = R(document.body, "transform")
                ? "transform"
                : "-webkit-transform"),
              (ot.animatables[He].target.style[V] = Te[He].join(" "));
        (ot.currentTime = mt), (ot.progress = (mt / ot.duration) * 100);
      }
      function D(mt) {
        ot[mt] && ot[mt](ot);
      }
      function H() {
        ot.remaining && ot.remaining !== !0 && ot.remaining--;
      }
      function q(mt) {
        const At = ot.duration,
          Te = ot.offset,
          He = Te + ot.delay,
          cs = ot.currentTime,
          Ge = ot.reversed,
          de = _(mt);
        if (ot.children.length) {
          let oe = ot.children,
            De = oe.length;
          if (de >= ot.currentTime)
            for (let zt = 0; zt < De; zt++) oe[zt].seek(de);
          else for (; De--; ) oe[De].seek(de);
        }
        (de >= He || !At) &&
          (ot.began || ((ot.began = !0), D("begin")), D("run")),
          de > Te && de < At
            ? w(de)
            : (de <= Te && cs !== 0 && (w(0), Ge && H()),
              ((de >= At && cs !== At) || !At) && (w(At), Ge || H())),
          D("update"),
          mt >= At &&
            (ot.remaining
              ? ((ht = tt),
                ot.direction === "alternate" && (ot.reversed = !ot.reversed))
              : (ot.pause(),
                ot.completed ||
                  ((ot.completed = !0),
                  D("complete"),
                  "Promise" in window && (Ut(), (ie = I())))),
            (ct = 0));
      }
      O = O === void 0 ? {} : O;
      var tt,
        ht,
        ct = 0,
        Ut = null,
        ie = I(),
        ot = wt(O);
      return (
        (ot.reset = function () {
          let mt = ot.direction,
            At = ot.loop;
          for (
            ot.currentTime = 0,
              ot.progress = 0,
              ot.paused = !0,
              ot.began = !1,
              ot.completed = !1,
              ot.reversed = mt === "reverse",
              ot.remaining = mt === "alternate" && At === 1 ? 2 : At,
              w(0),
              mt = ot.children.length;
            mt--;

          )
            ot.children[mt].reset();
        }),
        (ot.tick = function (mt) {
          (tt = mt), ht || (ht = tt), q((ct + tt - ht) * at.speed);
        }),
        (ot.seek = function (mt) {
          q(_(mt));
        }),
        (ot.pause = function () {
          const mt = G.indexOf(ot);
          -1 < mt && G.splice(mt, 1), (ot.paused = !0);
        }),
        (ot.play = function () {
          ot.paused &&
            ((ot.paused = !1),
            (ht = 0),
            (ct = _(ot.currentTime)),
            G.push(ot),
            et || J());
        }),
        (ot.reverse = function () {
          (ot.reversed = !ot.reversed), (ht = 0), (ct = _(ot.currentTime));
        }),
        (ot.restart = function () {
          ot.pause(), ot.reset(), ot.play();
        }),
        (ot.finished = ie),
        ot.reset(),
        ot.autoplay && ot.play(),
        ot
      );
    }
    var ut = {
        update: void 0,
        begin: void 0,
        run: void 0,
        complete: void 0,
        loop: 1,
        direction: "normal",
        autoplay: !0,
        offset: 0,
      },
      P = {
        duration: 1e3,
        delay: 0,
        easing: "easeOutElastic",
        elasticity: 500,
        round: 0,
      },
      B =
        "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(
          " "
        ),
      V,
      j = {
        arr: function (O) {
          return Array.isArray(O);
        },
        obj: function (O) {
          return -1 < Object.prototype.toString.call(O).indexOf("Object");
        },
        pth: function (O) {
          return j.obj(O) && O.hasOwnProperty("totalLength");
        },
        svg: function (O) {
          return O instanceof SVGElement;
        },
        dom: function (O) {
          return O.nodeType || j.svg(O);
        },
        str: function (O) {
          return typeof O == "string";
        },
        fnc: function (O) {
          return typeof O == "function";
        },
        und: function (O) {
          return typeof O > "u";
        },
        hex: function (O) {
          return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(O);
        },
        rgb: function (O) {
          return /^rgb/.test(O);
        },
        hsl: function (O) {
          return /^hsl/.test(O);
        },
        col: function (O) {
          return j.hex(O) || j.rgb(O) || j.hsl(O);
        },
      },
      U = (function () {
        function O(I, _, w) {
          return (((1 - 3 * w + 3 * _) * I + (3 * w - 6 * _)) * I + 3 * _) * I;
        }
        return function (I, _, w, D) {
          if (0 <= I && 1 >= I && 0 <= w && 1 >= w) {
            const H = new Float32Array(11);
            if (I !== _ || w !== D)
              for (let q = 0; 11 > q; ++q) H[q] = O(0.1 * q, I, w);
            return function (tt) {
              if (I === _ && w === D) return tt;
              if (tt === 0) return 0;
              if (tt === 1) return 1;
              for (var ht = 0, ct = 1; ct !== 10 && H[ct] <= tt; ++ct)
                ht += 0.1;
              --ct;
              var ct = ht + ((tt - H[ct]) / (H[ct + 1] - H[ct])) * 0.1,
                Ut =
                  3 * (1 - 3 * w + 3 * I) * ct * ct +
                  2 * (3 * w - 6 * I) * ct +
                  3 * I;
              if (0.001 <= Ut) {
                for (
                  ht = 0;
                  4 > ht &&
                  ((Ut =
                    3 * (1 - 3 * w + 3 * I) * ct * ct +
                    2 * (3 * w - 6 * I) * ct +
                    3 * I),
                  Ut !== 0);
                  ++ht
                )
                  var ie = O(ct, I, w) - tt, ct = ct - ie / Ut;
                tt = ct;
              } else if (Ut === 0) tt = ct;
              else {
                var ct = ht,
                  ht = ht + 0.1,
                  ot = 0;
                do
                  (ie = ct + (ht - ct) / 2),
                    (Ut = O(ie, I, w) - tt),
                    0 < Ut ? (ht = ie) : (ct = ie);
                while (1e-7 < Math.abs(Ut) && 10 > ++ot);
                tt = ie;
              }
              return O(tt, _, D);
            };
          }
        };
      })(),
      Z = (function () {
        function O(q, tt) {
          return q === 0 || q === 1
            ? q
            : -Math.pow(2, 10 * (q - 1)) *
                Math.sin(
                  (2 *
                    (q - 1 - (tt / (2 * Math.PI)) * Math.asin(1)) *
                    Math.PI) /
                    tt
                );
        }
        let I = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
          _ = {
            In: [
              [0.55, 0.085, 0.68, 0.53],
              [0.55, 0.055, 0.675, 0.19],
              [0.895, 0.03, 0.685, 0.22],
              [0.755, 0.05, 0.855, 0.06],
              [0.47, 0, 0.745, 0.715],
              [0.95, 0.05, 0.795, 0.035],
              [0.6, 0.04, 0.98, 0.335],
              [0.6, -0.28, 0.735, 0.045],
              O,
            ],
            Out: [
              [0.25, 0.46, 0.45, 0.94],
              [0.215, 0.61, 0.355, 1],
              [0.165, 0.84, 0.44, 1],
              [0.23, 1, 0.32, 1],
              [0.39, 0.575, 0.565, 1],
              [0.19, 1, 0.22, 1],
              [0.075, 0.82, 0.165, 1],
              [0.175, 0.885, 0.32, 1.275],
              function (q, tt) {
                return 1 - O(1 - q, tt);
              },
            ],
            InOut: [
              [0.455, 0.03, 0.515, 0.955],
              [0.645, 0.045, 0.355, 1],
              [0.77, 0, 0.175, 1],
              [0.86, 0, 0.07, 1],
              [0.445, 0.05, 0.55, 0.95],
              [1, 0, 0, 1],
              [0.785, 0.135, 0.15, 0.86],
              [0.68, -0.55, 0.265, 1.55],
              function (q, tt) {
                return 0.5 > q ? O(2 * q, tt) / 2 : 1 - O(-2 * q + 2, tt) / 2;
              },
            ],
          },
          w = { linear: U(0.25, 0.25, 0.75, 0.75) },
          D = {},
          H;
        for (H in _)
          (D.type = H),
            _[D.type].forEach(
              (function (q) {
                return function (tt, ht) {
                  w["ease" + q.type + I[ht]] = j.fnc(tt) ? tt : U.apply(S, tt);
                };
              })(D)
            ),
            (D = { type: D.type });
        return w;
      })(),
      nt = {
        css: function (O, I, _) {
          return (O.style[I] = _);
        },
        attribute: function (O, I, _) {
          return O.setAttribute(I, _);
        },
        object: function (O, I, _) {
          return (O[I] = _);
        },
        transform: function (O, I, _, w, D) {
          w[D] || (w[D] = []), w[D].push(I + "(" + _ + ")");
        },
      },
      G = [],
      et = 0,
      J = (function () {
        function O() {
          et = requestAnimationFrame(I);
        }
        function I(_) {
          const w = G.length;
          if (w) {
            for (let D = 0; D < w; ) G[D] && G[D].tick(_), D++;
            O();
          } else cancelAnimationFrame(et), (et = 0);
        }
        return O;
      })();
    return (
      (at.version = "2.2.0"),
      (at.speed = 1),
      (at.running = G),
      (at.remove = function (O) {
        O = dt(O);
        for (let I = G.length; I--; )
          for (let _ = G[I], w = _.animations, D = w.length; D--; )
            y(O, w[D].animatable.target) &&
              (w.splice(D, 1), w.length || _.pause());
      }),
      (at.getValue = N),
      (at.path = function (O, I) {
        const _ = j.str(O) ? p(O)[0] : O,
          w = I || 100;
        return function (D) {
          return { el: _, property: D, totalLength: lt(_) * (w / 100) };
        };
      }),
      (at.setDashoffset = function (O) {
        const I = lt(O);
        return O.setAttribute("stroke-dasharray", I), I;
      }),
      (at.bezier = U),
      (at.easings = Z),
      (at.timeline = function (O) {
        const I = at(O);
        return (
          I.pause(),
          (I.duration = 0),
          (I.add = function (_) {
            return (
              I.children.forEach(function (w) {
                (w.began = !0), (w.completed = !0);
              }),
              E(_).forEach(function (w) {
                let D = l(w, h(P, O || {}));
                (D.targets = D.targets || O.targets), (w = I.duration);
                const H = D.offset;
                (D.autoplay = !1),
                  (D.direction = I.direction),
                  (D.offset = j.und(H) ? w : Y(H, w)),
                  (I.began = !0),
                  (I.completed = !0),
                  I.seek(D.offset),
                  (D = at(D)),
                  (D.began = !0),
                  (D.completed = !0),
                  D.duration > w && (I.duration = D.duration),
                  I.children.push(D);
              }),
              I.seek(0),
              I.reset(),
              I.autoplay && I.restart(),
              I
            );
          }),
          I
        );
      }),
      (at.random = function (O, I) {
        return Math.floor(Math.random() * (I - O + 1)) + O;
      }),
      at
    );
  }),
    (function (p, v) {
      const k = {
          accordion: !0,
          onOpenStart: void 0,
          onOpenEnd: void 0,
          onCloseStart: void 0,
          onCloseEnd: void 0,
          inDuration: 300,
          outDuration: 300,
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            (d.el.M_Collapsible = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d.$headers = d.$el
                .children("li")
                .children(".collapsible-header")),
              d.$headers.attr("tabindex", 0),
              d._setupEventHandlers();
            const C = d.$el.children("li.active").children(".collapsible-body");
            return (
              d.options.accordion
                ? C.first().css("display", "block")
                : C.css("display", "block"),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      (this.el.M_Collapsible = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    const l = this;
                    (this._handleCollapsibleClickBound =
                      this._handleCollapsibleClick.bind(this)),
                      (this._handleCollapsibleKeydownBound =
                        this._handleCollapsibleKeydown.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleCollapsibleClickBound
                      ),
                      this.$headers.each(function (d) {
                        d.addEventListener(
                          "keydown",
                          l._handleCollapsibleKeydownBound
                        );
                      });
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    const l = this;
                    this.el.removeEventListener(
                      "click",
                      this._handleCollapsibleClickBound
                    ),
                      this.$headers.each(function (d) {
                        d.removeEventListener(
                          "keydown",
                          l._handleCollapsibleKeydownBound
                        );
                      });
                  },
                },
                {
                  key: "_handleCollapsibleClick",
                  value: function (l) {
                    const d = p(l.target).closest(".collapsible-header");
                    if (l.target && d.length) {
                      const C = d.closest(".collapsible");
                      if (C[0] === this.el) {
                        const T = d.closest("li"),
                          L = C.children("li"),
                          A = T[0].classList.contains("active"),
                          R = L.index(T);
                        A ? this.close(R) : this.open(R);
                      }
                    }
                  },
                },
                {
                  key: "_handleCollapsibleKeydown",
                  value: function (l) {
                    l.keyCode === 13 && this._handleCollapsibleClickBound(l);
                  },
                },
                {
                  key: "_animateIn",
                  value: function (l) {
                    const d = this,
                      C = this.$el.children("li").eq(l);
                    if (C.length) {
                      const T = C.children(".collapsible-body");
                      v.remove(T[0]),
                        T.css({
                          display: "block",
                          overflow: "hidden",
                          height: 0,
                          paddingTop: "",
                          paddingBottom: "",
                        });
                      const L = T.css("padding-top"),
                        A = T.css("padding-bottom"),
                        R = T[0].scrollHeight;
                      T.css({ paddingTop: 0, paddingBottom: 0 }),
                        v({
                          targets: T[0],
                          height: R,
                          paddingTop: L,
                          paddingBottom: A,
                          duration: this.options.inDuration,
                          easing: "easeInOutCubic",
                          complete: function (W) {
                            T.css({
                              overflow: "",
                              paddingTop: "",
                              paddingBottom: "",
                              height: "",
                            }),
                              typeof d.options.onOpenEnd == "function" &&
                                d.options.onOpenEnd.call(d, C[0]);
                          },
                        });
                    }
                  },
                },
                {
                  key: "_animateOut",
                  value: function (l) {
                    const d = this,
                      C = this.$el.children("li").eq(l);
                    if (C.length) {
                      const T = C.children(".collapsible-body");
                      v.remove(T[0]),
                        T.css("overflow", "hidden"),
                        v({
                          targets: T[0],
                          height: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          duration: this.options.outDuration,
                          easing: "easeInOutCubic",
                          complete: function () {
                            T.css({
                              height: "",
                              overflow: "",
                              padding: "",
                              display: "",
                            }),
                              typeof d.options.onCloseEnd == "function" &&
                                d.options.onCloseEnd.call(d, C[0]);
                          },
                        });
                    }
                  },
                },
                {
                  key: "open",
                  value: function (l) {
                    const d = this,
                      C = this.$el.children("li").eq(l);
                    if (C.length && !C[0].classList.contains("active")) {
                      if (
                        (typeof this.options.onOpenStart == "function" &&
                          this.options.onOpenStart.call(this, C[0]),
                        this.options.accordion)
                      ) {
                        const T = this.$el.children("li"),
                          L = this.$el.children("li.active");
                        L.each(function (A) {
                          const R = T.index(p(A));
                          d.close(R);
                        });
                      }
                      C[0].classList.add("active"), this._animateIn(l);
                    }
                  },
                },
                {
                  key: "close",
                  value: function (l) {
                    const d = this.$el.children("li").eq(l);
                    d.length &&
                      d[0].classList.contains("active") &&
                      (typeof this.options.onCloseStart == "function" &&
                        this.options.onCloseStart.call(this, d[0]),
                      d[0].classList.remove("active"),
                      this._animateOut(l));
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Collapsible;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (M.Collapsible = E),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(E, "collapsible", "M_Collapsible");
    })(cash, M.anime),
    (function (p, v) {
      const k = {
          alignment: "left",
          autoFocus: !0,
          constrainWidth: !0,
          container: null,
          coverTrigger: !0,
          closeOnClick: !0,
          hover: !1,
          inDuration: 150,
          outDuration: 250,
          onOpenStart: null,
          onOpenEnd: null,
          onCloseStart: null,
          onCloseEnd: null,
          onItemClick: null,
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Dropdown = d),
              g._dropdowns.push(d),
              (d.id = M.getIdFromTrigger(h)),
              (d.dropdownEl = document.getElementById(d.id)),
              (d.$dropdownEl = p(d.dropdownEl)),
              (d.options = p.extend({}, g.defaults, l)),
              (d.isOpen = !1),
              (d.isScrollable = !1),
              (d.isTouchMoving = !1),
              (d.focusedIndex = -1),
              (d.filterQuery = []),
              d.options.container
                ? p(d.options.container).append(d.dropdownEl)
                : d.$el.after(d.dropdownEl),
              d._makeDropdownFocusable(),
              (d._resetFilterQueryBound = d._resetFilterQuery.bind(d)),
              (d._handleDocumentClickBound = d._handleDocumentClick.bind(d)),
              (d._handleDocumentTouchmoveBound =
                d._handleDocumentTouchmove.bind(d)),
              (d._handleDropdownClickBound = d._handleDropdownClick.bind(d)),
              (d._handleDropdownKeydownBound =
                d._handleDropdownKeydown.bind(d)),
              (d._handleTriggerKeydownBound = d._handleTriggerKeydown.bind(d)),
              d._setupEventHandlers(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._resetDropdownStyles(),
                      this._removeEventHandlers(),
                      g._dropdowns.splice(g._dropdowns.indexOf(this), 1),
                      (this.el.M_Dropdown = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    this.el.addEventListener(
                      "keydown",
                      this._handleTriggerKeydownBound
                    ),
                      this.dropdownEl.addEventListener(
                        "click",
                        this._handleDropdownClickBound
                      ),
                      this.options.hover
                        ? ((this._handleMouseEnterBound =
                            this._handleMouseEnter.bind(this)),
                          this.el.addEventListener(
                            "mouseenter",
                            this._handleMouseEnterBound
                          ),
                          (this._handleMouseLeaveBound =
                            this._handleMouseLeave.bind(this)),
                          this.el.addEventListener(
                            "mouseleave",
                            this._handleMouseLeaveBound
                          ),
                          this.dropdownEl.addEventListener(
                            "mouseleave",
                            this._handleMouseLeaveBound
                          ))
                        : ((this._handleClickBound =
                            this._handleClick.bind(this)),
                          this.el.addEventListener(
                            "click",
                            this._handleClickBound
                          ));
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "keydown",
                      this._handleTriggerKeydownBound
                    ),
                      this.dropdownEl.removeEventListener(
                        "click",
                        this._handleDropdownClickBound
                      ),
                      this.options.hover
                        ? (this.el.removeEventListener(
                            "mouseenter",
                            this._handleMouseEnterBound
                          ),
                          this.el.removeEventListener(
                            "mouseleave",
                            this._handleMouseLeaveBound
                          ),
                          this.dropdownEl.removeEventListener(
                            "mouseleave",
                            this._handleMouseLeaveBound
                          ))
                        : this.el.removeEventListener(
                            "click",
                            this._handleClickBound
                          );
                  },
                },
                {
                  key: "_setupTemporaryEventHandlers",
                  value: function () {
                    document.body.addEventListener(
                      "click",
                      this._handleDocumentClickBound,
                      !0
                    ),
                      document.body.addEventListener(
                        "touchend",
                        this._handleDocumentClickBound
                      ),
                      document.body.addEventListener(
                        "touchmove",
                        this._handleDocumentTouchmoveBound
                      ),
                      this.dropdownEl.addEventListener(
                        "keydown",
                        this._handleDropdownKeydownBound
                      );
                  },
                },
                {
                  key: "_removeTemporaryEventHandlers",
                  value: function () {
                    document.body.removeEventListener(
                      "click",
                      this._handleDocumentClickBound,
                      !0
                    ),
                      document.body.removeEventListener(
                        "touchend",
                        this._handleDocumentClickBound
                      ),
                      document.body.removeEventListener(
                        "touchmove",
                        this._handleDocumentTouchmoveBound
                      ),
                      this.dropdownEl.removeEventListener(
                        "keydown",
                        this._handleDropdownKeydownBound
                      );
                  },
                },
                {
                  key: "_handleClick",
                  value: function (l) {
                    l.preventDefault(), this.open();
                  },
                },
                {
                  key: "_handleMouseEnter",
                  value: function () {
                    this.open();
                  },
                },
                {
                  key: "_handleMouseLeave",
                  value: function (l) {
                    let d = l.toElement || l.relatedTarget,
                      C = !!p(d).closest(".dropdown-content").length,
                      T = !1,
                      L = p(d).closest(".dropdown-trigger");
                    L.length &&
                      !!L[0].M_Dropdown &&
                      L[0].M_Dropdown.isOpen &&
                      (T = !0),
                      !T && !C && this.close();
                  },
                },
                {
                  key: "_handleDocumentClick",
                  value: function (l) {
                    const d = this,
                      C = p(l.target);
                    this.options.closeOnClick &&
                    C.closest(".dropdown-content").length &&
                    !this.isTouchMoving
                      ? setTimeout(function () {
                          d.close();
                        }, 0)
                      : (C.closest(".dropdown-trigger").length ||
                          !C.closest(".dropdown-content").length) &&
                        setTimeout(function () {
                          d.close();
                        }, 0),
                      (this.isTouchMoving = !1);
                  },
                },
                {
                  key: "_handleTriggerKeydown",
                  value: function (l) {
                    (l.which === M.keys.ARROW_DOWN ||
                      l.which === M.keys.ENTER) &&
                      !this.isOpen &&
                      (l.preventDefault(), this.open());
                  },
                },
                {
                  key: "_handleDocumentTouchmove",
                  value: function (l) {
                    const d = p(l.target);
                    d.closest(".dropdown-content").length &&
                      (this.isTouchMoving = !0);
                  },
                },
                {
                  key: "_handleDropdownClick",
                  value: function (l) {
                    if (typeof this.options.onItemClick == "function") {
                      const d = p(l.target).closest("li")[0];
                      this.options.onItemClick.call(this, d);
                    }
                  },
                },
                {
                  key: "_handleDropdownKeydown",
                  value: function (l) {
                    if (l.which === M.keys.TAB)
                      l.preventDefault(), this.close();
                    else if (
                      (l.which === M.keys.ARROW_DOWN ||
                        l.which === M.keys.ARROW_UP) &&
                      this.isOpen
                    ) {
                      l.preventDefault();
                      let d = l.which === M.keys.ARROW_DOWN ? 1 : -1,
                        C = this.focusedIndex,
                        T = !1;
                      do
                        if (
                          ((C = C + d),
                          !!this.dropdownEl.children[C] &&
                            this.dropdownEl.children[C].tabIndex !== -1)
                        ) {
                          T = !0;
                          break;
                        }
                      while (C < this.dropdownEl.children.length && C >= 0);
                      T && ((this.focusedIndex = C), this._focusFocusedItem());
                    } else if (l.which === M.keys.ENTER && this.isOpen) {
                      const L = this.dropdownEl.children[this.focusedIndex],
                        A = p(L).find("a, button").first();
                      A.length ? A[0].click() : L.click();
                    } else
                      l.which === M.keys.ESC &&
                        this.isOpen &&
                        (l.preventDefault(), this.close());
                    const R = String.fromCharCode(l.which).toLowerCase(),
                      W = [9, 13, 27, 38, 40];
                    if (R && W.indexOf(l.which) === -1) {
                      this.filterQuery.push(R);
                      const z = this.filterQuery.join(""),
                        N = p(this.dropdownEl)
                          .find("li")
                          .filter(function (Y) {
                            return p(Y).text().toLowerCase().indexOf(z) === 0;
                          })[0];
                      N &&
                        ((this.focusedIndex = p(N).index()),
                        this._focusFocusedItem());
                    }
                    this.filterTimeout = setTimeout(
                      this._resetFilterQueryBound,
                      1e3
                    );
                  },
                },
                {
                  key: "_resetFilterQuery",
                  value: function () {
                    this.filterQuery = [];
                  },
                },
                {
                  key: "_resetDropdownStyles",
                  value: function () {
                    this.$dropdownEl.css({
                      display: "",
                      width: "",
                      height: "",
                      left: "",
                      top: "",
                      "transform-origin": "",
                      transform: "",
                      opacity: "",
                    });
                  },
                },
                {
                  key: "_makeDropdownFocusable",
                  value: function () {
                    (this.dropdownEl.tabIndex = 0),
                      p(this.dropdownEl)
                        .children()
                        .each(function (l) {
                          l.getAttribute("tabindex") ||
                            l.setAttribute("tabindex", 0);
                        });
                  },
                },
                {
                  key: "_focusFocusedItem",
                  value: function () {
                    this.focusedIndex >= 0 &&
                      this.focusedIndex < this.dropdownEl.children.length &&
                      this.options.autoFocus &&
                      this.dropdownEl.children[this.focusedIndex].focus();
                  },
                },
                {
                  key: "_getDropdownPosition",
                  value: function () {
                    this.el.offsetParent.getBoundingClientRect();
                    let l = this.el.getBoundingClientRect(),
                      d = this.dropdownEl.getBoundingClientRect(),
                      C = d.height,
                      T = d.width,
                      L = l.left - d.left,
                      A = l.top - d.top,
                      R = { left: L, top: A, height: C, width: T },
                      W = this.dropdownEl.offsetParent
                        ? this.dropdownEl.offsetParent
                        : this.dropdownEl.parentNode,
                      z = M.checkPossibleAlignments(
                        this.el,
                        W,
                        R,
                        this.options.coverTrigger ? 0 : l.height
                      ),
                      N = "top",
                      Y = this.options.alignment;
                    if (
                      ((A += this.options.coverTrigger ? 0 : l.height),
                      (this.isScrollable = !1),
                      z.top ||
                        (z.bottom
                          ? (N = "bottom")
                          : ((this.isScrollable = !0),
                            z.spaceOnTop > z.spaceOnBottom
                              ? ((N = "bottom"),
                                (C += z.spaceOnTop),
                                (A -= z.spaceOnTop))
                              : (C += z.spaceOnBottom))),
                      !z[Y])
                    ) {
                      const X = Y === "left" ? "right" : "left";
                      z[X]
                        ? (Y = X)
                        : z.spaceOnLeft > z.spaceOnRight
                        ? ((Y = "right"),
                          (T += z.spaceOnLeft),
                          (L -= z.spaceOnLeft))
                        : ((Y = "left"), (T += z.spaceOnRight));
                    }
                    return (
                      N === "bottom" &&
                        (A =
                          A -
                          d.height +
                          (this.options.coverTrigger ? l.height : 0)),
                      Y === "right" && (L = L - d.width + l.width),
                      {
                        x: L,
                        y: A,
                        verticalAlignment: N,
                        horizontalAlignment: Y,
                        height: C,
                        width: T,
                      }
                    );
                  },
                },
                {
                  key: "_animateIn",
                  value: function () {
                    const l = this;
                    v.remove(this.dropdownEl),
                      v({
                        targets: this.dropdownEl,
                        opacity: { value: [0, 1], easing: "easeOutQuad" },
                        scaleX: [0.3, 1],
                        scaleY: [0.3, 1],
                        duration: this.options.inDuration,
                        easing: "easeOutQuint",
                        complete: function (d) {
                          if (
                            (l.options.autoFocus && l.dropdownEl.focus(),
                            typeof l.options.onOpenEnd == "function")
                          ) {
                            const C = d.animatables[0].target;
                            l.options.onOpenEnd.call(C, l.el);
                          }
                        },
                      });
                  },
                },
                {
                  key: "_animateOut",
                  value: function () {
                    const l = this;
                    v.remove(this.dropdownEl),
                      v({
                        targets: this.dropdownEl,
                        opacity: { value: 0, easing: "easeOutQuint" },
                        scaleX: 0.3,
                        scaleY: 0.3,
                        duration: this.options.outDuration,
                        easing: "easeOutQuint",
                        complete: function (d) {
                          l._resetDropdownStyles(),
                            typeof l.options.onCloseEnd == "function" &&
                              (d.animatables[0].target,
                              l.options.onCloseEnd.call(l, l.el));
                        },
                      });
                  },
                },
                {
                  key: "_placeDropdown",
                  value: function () {
                    const l = this.options.constrainWidth
                      ? this.el.getBoundingClientRect().width
                      : this.dropdownEl.getBoundingClientRect().width;
                    this.dropdownEl.style.width = l + "px";
                    const d = this._getDropdownPosition();
                    (this.dropdownEl.style.left = d.x + "px"),
                      (this.dropdownEl.style.top = d.y + "px"),
                      (this.dropdownEl.style.height = d.height + "px"),
                      (this.dropdownEl.style.width = d.width + "px"),
                      (this.dropdownEl.style.transformOrigin =
                        (d.horizontalAlignment === "left" ? "0" : "100%") +
                        " " +
                        (d.verticalAlignment === "top" ? "0" : "100%"));
                  },
                },
                {
                  key: "open",
                  value: function () {
                    this.isOpen ||
                      ((this.isOpen = !0),
                      typeof this.options.onOpenStart == "function" &&
                        this.options.onOpenStart.call(this, this.el),
                      this._resetDropdownStyles(),
                      (this.dropdownEl.style.display = "block"),
                      this._placeDropdown(),
                      this._animateIn(),
                      this._setupTemporaryEventHandlers());
                  },
                },
                {
                  key: "close",
                  value: function () {
                    !this.isOpen ||
                      ((this.isOpen = !1),
                      (this.focusedIndex = -1),
                      typeof this.options.onCloseStart == "function" &&
                        this.options.onCloseStart.call(this, this.el),
                      this._animateOut(),
                      this._removeTemporaryEventHandlers(),
                      this.options.autoFocus && this.el.focus());
                  },
                },
                {
                  key: "recalculateDimensions",
                  value: function () {
                    this.isOpen &&
                      (this.$dropdownEl.css({
                        width: "",
                        height: "",
                        left: "",
                        top: "",
                        "transform-origin": "",
                      }),
                      this._placeDropdown());
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Dropdown;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (E._dropdowns = []),
        (window.M.Dropdown = E),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(E, "dropdown", "M_Dropdown");
    })(cash, M.anime),
    (function (p, v) {
      const k = {
          opacity: 0.5,
          inDuration: 250,
          outDuration: 250,
          onOpenStart: null,
          onOpenEnd: null,
          onCloseStart: null,
          onCloseEnd: null,
          preventScrolling: !0,
          dismissible: !0,
          startingTop: "4%",
          endingTop: "10%",
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Modal = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d.isOpen = !1),
              (d.id = d.$el.attr("id")),
              (d._openingTrigger = void 0),
              (d.$overlay = p('<div class="modal-overlay"></div>')),
              (d.el.tabIndex = 0),
              (d._nthModalOpened = 0),
              g._count++,
              d._setupEventHandlers(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    g._count--,
                      this._removeEventHandlers(),
                      this.el.removeAttribute("style"),
                      this.$overlay.remove(),
                      (this.el.M_Modal = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleOverlayClickBound =
                      this._handleOverlayClick.bind(this)),
                      (this._handleModalCloseClickBound =
                        this._handleModalCloseClick.bind(this)),
                      g._count === 1 &&
                        document.body.addEventListener(
                          "click",
                          this._handleTriggerClick
                        ),
                      this.$overlay[0].addEventListener(
                        "click",
                        this._handleOverlayClickBound
                      ),
                      this.el.addEventListener(
                        "click",
                        this._handleModalCloseClickBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    g._count === 0 &&
                      document.body.removeEventListener(
                        "click",
                        this._handleTriggerClick
                      ),
                      this.$overlay[0].removeEventListener(
                        "click",
                        this._handleOverlayClickBound
                      ),
                      this.el.removeEventListener(
                        "click",
                        this._handleModalCloseClickBound
                      );
                  },
                },
                {
                  key: "_handleTriggerClick",
                  value: function (l) {
                    const d = p(l.target).closest(".modal-trigger");
                    if (d.length) {
                      const C = M.getIdFromTrigger(d[0]),
                        T = document.getElementById(C).M_Modal;
                      T && T.open(d), l.preventDefault();
                    }
                  },
                },
                {
                  key: "_handleOverlayClick",
                  value: function () {
                    this.options.dismissible && this.close();
                  },
                },
                {
                  key: "_handleModalCloseClick",
                  value: function (l) {
                    const d = p(l.target).closest(".modal-close");
                    d.length && this.close();
                  },
                },
                {
                  key: "_handleKeydown",
                  value: function (l) {
                    l.keyCode === 27 &&
                      this.options.dismissible &&
                      this.close();
                  },
                },
                {
                  key: "_handleFocus",
                  value: function (l) {
                    !this.el.contains(l.target) &&
                      this._nthModalOpened === g._modalsOpen &&
                      this.el.focus();
                  },
                },
                {
                  key: "_animateIn",
                  value: function () {
                    const l = this;
                    p.extend(this.el.style, { display: "block", opacity: 0 }),
                      p.extend(this.$overlay[0].style, {
                        display: "block",
                        opacity: 0,
                      }),
                      v({
                        targets: this.$overlay[0],
                        opacity: this.options.opacity,
                        duration: this.options.inDuration,
                        easing: "easeOutQuad",
                      });
                    const d = {
                      targets: this.el,
                      duration: this.options.inDuration,
                      easing: "easeOutCubic",
                      complete: function () {
                        typeof l.options.onOpenEnd == "function" &&
                          l.options.onOpenEnd.call(l, l.el, l._openingTrigger);
                      },
                    };
                    this.el.classList.contains("bottom-sheet")
                      ? (p.extend(d, { bottom: 0, opacity: 1 }), v(d))
                      : (p.extend(d, {
                          top: [
                            this.options.startingTop,
                            this.options.endingTop,
                          ],
                          opacity: 1,
                          scaleX: [0.8, 1],
                          scaleY: [0.8, 1],
                        }),
                        v(d));
                  },
                },
                {
                  key: "_animateOut",
                  value: function () {
                    const l = this;
                    v({
                      targets: this.$overlay[0],
                      opacity: 0,
                      duration: this.options.outDuration,
                      easing: "easeOutQuart",
                    });
                    const d = {
                      targets: this.el,
                      duration: this.options.outDuration,
                      easing: "easeOutCubic",
                      complete: function () {
                        (l.el.style.display = "none"),
                          l.$overlay.remove(),
                          typeof l.options.onCloseEnd == "function" &&
                            l.options.onCloseEnd.call(l, l.el);
                      },
                    };
                    this.el.classList.contains("bottom-sheet")
                      ? (p.extend(d, { bottom: "-100%", opacity: 0 }), v(d))
                      : (p.extend(d, {
                          top: [
                            this.options.endingTop,
                            this.options.startingTop,
                          ],
                          opacity: 0,
                          scaleX: 0.8,
                          scaleY: 0.8,
                        }),
                        v(d));
                  },
                },
                {
                  key: "open",
                  value: function (l) {
                    if (!this.isOpen)
                      return (
                        (this.isOpen = !0),
                        g._modalsOpen++,
                        (this._nthModalOpened = g._modalsOpen),
                        (this.$overlay[0].style.zIndex =
                          1e3 + g._modalsOpen * 2),
                        (this.el.style.zIndex = 1e3 + g._modalsOpen * 2 + 1),
                        (this._openingTrigger = l ? l[0] : void 0),
                        typeof this.options.onOpenStart == "function" &&
                          this.options.onOpenStart.call(
                            this,
                            this.el,
                            this._openingTrigger
                          ),
                        this.options.preventScrolling &&
                          (document.body.style.overflow = "hidden"),
                        this.el.classList.add("open"),
                        this.el.insertAdjacentElement(
                          "afterend",
                          this.$overlay[0]
                        ),
                        this.options.dismissible &&
                          ((this._handleKeydownBound =
                            this._handleKeydown.bind(this)),
                          (this._handleFocusBound =
                            this._handleFocus.bind(this)),
                          document.addEventListener(
                            "keydown",
                            this._handleKeydownBound
                          ),
                          document.addEventListener(
                            "focus",
                            this._handleFocusBound,
                            !0
                          )),
                        v.remove(this.el),
                        v.remove(this.$overlay[0]),
                        this._animateIn(),
                        this.el.focus(),
                        this
                      );
                  },
                },
                {
                  key: "close",
                  value: function () {
                    if (this.isOpen)
                      return (
                        (this.isOpen = !1),
                        g._modalsOpen--,
                        (this._nthModalOpened = 0),
                        typeof this.options.onCloseStart == "function" &&
                          this.options.onCloseStart.call(this, this.el),
                        this.el.classList.remove("open"),
                        g._modalsOpen === 0 &&
                          (document.body.style.overflow = ""),
                        this.options.dismissible &&
                          (document.removeEventListener(
                            "keydown",
                            this._handleKeydownBound
                          ),
                          document.removeEventListener(
                            "focus",
                            this._handleFocusBound,
                            !0
                          )),
                        v.remove(this.el),
                        v.remove(this.$overlay[0]),
                        this._animateOut(),
                        this
                      );
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Modal;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (E._modalsOpen = 0),
        (E._count = 0),
        (M.Modal = E),
        M.jQueryLoaded && M.initializeJqueryWrapper(E, "modal", "M_Modal");
    })(cash, M.anime),
    (function (p, v) {
      const k = {
          inDuration: 275,
          outDuration: 200,
          onOpenStart: null,
          onOpenEnd: null,
          onCloseStart: null,
          onCloseEnd: null,
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Materialbox = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d.overlayActive = !1),
              (d.doneAnimating = !0),
              (d.placeholder = p("<div></div>").addClass(
                "material-placeholder"
              )),
              (d.originalWidth = 0),
              (d.originalHeight = 0),
              (d.originInlineStyles = d.$el.attr("style")),
              (d.caption = d.el.getAttribute("data-caption") || ""),
              d.$el.before(d.placeholder),
              d.placeholder.append(d.$el),
              d._setupEventHandlers(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      (this.el.M_Materialbox = void 0),
                      p(this.placeholder).after(this.el).remove(),
                      this.$el.removeAttr("style");
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleMaterialboxClickBound =
                      this._handleMaterialboxClick.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleMaterialboxClickBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "click",
                      this._handleMaterialboxClickBound
                    );
                  },
                },
                {
                  key: "_handleMaterialboxClick",
                  value: function (l) {
                    this.doneAnimating === !1 ||
                    (this.overlayActive && this.doneAnimating)
                      ? this.close()
                      : this.open();
                  },
                },
                {
                  key: "_handleWindowScroll",
                  value: function () {
                    this.overlayActive && this.close();
                  },
                },
                {
                  key: "_handleWindowResize",
                  value: function () {
                    this.overlayActive && this.close();
                  },
                },
                {
                  key: "_handleWindowEscape",
                  value: function (l) {
                    l.keyCode === 27 &&
                      this.doneAnimating &&
                      this.overlayActive &&
                      this.close();
                  },
                },
                {
                  key: "_makeAncestorsOverflowVisible",
                  value: function () {
                    this.ancestorsChanged = p();
                    for (
                      let l = this.placeholder[0].parentNode;
                      l !== null && !p(l).is(document);

                    ) {
                      const d = p(l);
                      d.css("overflow") !== "visible" &&
                        (d.css("overflow", "visible"),
                        this.ancestorsChanged === void 0
                          ? (this.ancestorsChanged = d)
                          : (this.ancestorsChanged =
                              this.ancestorsChanged.add(d))),
                        (l = l.parentNode);
                    }
                  },
                },
                {
                  key: "_animateImageIn",
                  value: function () {
                    const l = this,
                      d = {
                        targets: this.el,
                        height: [this.originalHeight, this.newHeight],
                        width: [this.originalWidth, this.newWidth],
                        left:
                          M.getDocumentScrollLeft() +
                          this.windowWidth / 2 -
                          this.placeholder.offset().left -
                          this.newWidth / 2,
                        top:
                          M.getDocumentScrollTop() +
                          this.windowHeight / 2 -
                          this.placeholder.offset().top -
                          this.newHeight / 2,
                        duration: this.options.inDuration,
                        easing: "easeOutQuad",
                        complete: function () {
                          (l.doneAnimating = !0),
                            typeof l.options.onOpenEnd == "function" &&
                              l.options.onOpenEnd.call(l, l.el);
                        },
                      };
                    (this.maxWidth = this.$el.css("max-width")),
                      (this.maxHeight = this.$el.css("max-height")),
                      this.maxWidth !== "none" && (d.maxWidth = this.newWidth),
                      this.maxHeight !== "none" &&
                        (d.maxHeight = this.newHeight),
                      v(d);
                  },
                },
                {
                  key: "_animateImageOut",
                  value: function () {
                    const l = this,
                      d = {
                        targets: this.el,
                        width: this.originalWidth,
                        height: this.originalHeight,
                        left: 0,
                        top: 0,
                        duration: this.options.outDuration,
                        easing: "easeOutQuad",
                        complete: function () {
                          l.placeholder.css({
                            height: "",
                            width: "",
                            position: "",
                            top: "",
                            left: "",
                          }),
                            l.attrWidth && l.$el.attr("width", l.attrWidth),
                            l.attrHeight && l.$el.attr("height", l.attrHeight),
                            l.$el.removeAttr("style"),
                            l.originInlineStyles &&
                              l.$el.attr("style", l.originInlineStyles),
                            l.$el.removeClass("active"),
                            (l.doneAnimating = !0),
                            l.ancestorsChanged.length &&
                              l.ancestorsChanged.css("overflow", ""),
                            typeof l.options.onCloseEnd == "function" &&
                              l.options.onCloseEnd.call(l, l.el);
                        },
                      };
                    v(d);
                  },
                },
                {
                  key: "_updateVars",
                  value: function () {
                    (this.windowWidth = window.innerWidth),
                      (this.windowHeight = window.innerHeight),
                      (this.caption =
                        this.el.getAttribute("data-caption") || "");
                  },
                },
                {
                  key: "open",
                  value: function () {
                    const l = this;
                    this._updateVars(),
                      (this.originalWidth =
                        this.el.getBoundingClientRect().width),
                      (this.originalHeight =
                        this.el.getBoundingClientRect().height),
                      (this.doneAnimating = !1),
                      this.$el.addClass("active"),
                      (this.overlayActive = !0),
                      typeof this.options.onOpenStart == "function" &&
                        this.options.onOpenStart.call(this, this.el),
                      this.placeholder.css({
                        width:
                          this.placeholder[0].getBoundingClientRect().width +
                          "px",
                        height:
                          this.placeholder[0].getBoundingClientRect().height +
                          "px",
                        position: "relative",
                        top: 0,
                        left: 0,
                      }),
                      this._makeAncestorsOverflowVisible(),
                      this.$el.css({
                        position: "absolute",
                        "z-index": 1e3,
                        "will-change": "left, top, width, height",
                      }),
                      (this.attrWidth = this.$el.attr("width")),
                      (this.attrHeight = this.$el.attr("height")),
                      this.attrWidth &&
                        (this.$el.css("width", this.attrWidth + "px"),
                        this.$el.removeAttr("width")),
                      this.attrHeight &&
                        (this.$el.css("width", this.attrHeight + "px"),
                        this.$el.removeAttr("height")),
                      (this.$overlay = p('<div id="materialbox-overlay"></div>')
                        .css({ opacity: 0 })
                        .one("click", function () {
                          l.doneAnimating && l.close();
                        })),
                      this.$el.before(this.$overlay);
                    const d = this.$overlay[0].getBoundingClientRect();
                    this.$overlay.css({
                      width: this.windowWidth + "px",
                      height: this.windowHeight + "px",
                      left: -1 * d.left + "px",
                      top: -1 * d.top + "px",
                    }),
                      v.remove(this.el),
                      v.remove(this.$overlay[0]),
                      v({
                        targets: this.$overlay[0],
                        opacity: 1,
                        duration: this.options.inDuration,
                        easing: "easeOutQuad",
                      }),
                      this.caption !== "" &&
                        (this.$photocaption && v.remove(this.$photoCaption[0]),
                        (this.$photoCaption = p(
                          '<div class="materialbox-caption"></div>'
                        )),
                        this.$photoCaption.text(this.caption),
                        p("body").append(this.$photoCaption),
                        this.$photoCaption.css({ display: "inline" }),
                        v({
                          targets: this.$photoCaption[0],
                          opacity: 1,
                          duration: this.options.inDuration,
                          easing: "easeOutQuad",
                        }));
                    let C = 0,
                      T = this.originalWidth / this.windowWidth,
                      L = this.originalHeight / this.windowHeight;
                    (this.newWidth = 0),
                      (this.newHeight = 0),
                      T > L
                        ? ((C = this.originalHeight / this.originalWidth),
                          (this.newWidth = this.windowWidth * 0.9),
                          (this.newHeight = this.windowWidth * 0.9 * C))
                        : ((C = this.originalWidth / this.originalHeight),
                          (this.newWidth = this.windowHeight * 0.9 * C),
                          (this.newHeight = this.windowHeight * 0.9)),
                      this._animateImageIn(),
                      (this._handleWindowScrollBound =
                        this._handleWindowScroll.bind(this)),
                      (this._handleWindowResizeBound =
                        this._handleWindowResize.bind(this)),
                      (this._handleWindowEscapeBound =
                        this._handleWindowEscape.bind(this)),
                      window.addEventListener(
                        "scroll",
                        this._handleWindowScrollBound
                      ),
                      window.addEventListener(
                        "resize",
                        this._handleWindowResizeBound
                      ),
                      window.addEventListener(
                        "keyup",
                        this._handleWindowEscapeBound
                      );
                  },
                },
                {
                  key: "close",
                  value: function () {
                    const l = this;
                    this._updateVars(),
                      (this.doneAnimating = !1),
                      typeof this.options.onCloseStart == "function" &&
                        this.options.onCloseStart.call(this, this.el),
                      v.remove(this.el),
                      v.remove(this.$overlay[0]),
                      this.caption !== "" && v.remove(this.$photoCaption[0]),
                      window.removeEventListener(
                        "scroll",
                        this._handleWindowScrollBound
                      ),
                      window.removeEventListener(
                        "resize",
                        this._handleWindowResizeBound
                      ),
                      window.removeEventListener(
                        "keyup",
                        this._handleWindowEscapeBound
                      ),
                      v({
                        targets: this.$overlay[0],
                        opacity: 0,
                        duration: this.options.outDuration,
                        easing: "easeOutQuad",
                        complete: function () {
                          (l.overlayActive = !1), l.$overlay.remove();
                        },
                      }),
                      this._animateImageOut(),
                      this.caption !== "" &&
                        v({
                          targets: this.$photoCaption[0],
                          opacity: 0,
                          duration: this.options.outDuration,
                          easing: "easeOutQuad",
                          complete: function () {
                            l.$photoCaption.remove();
                          },
                        });
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Materialbox;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (M.Materialbox = E),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(E, "materialbox", "M_Materialbox");
    })(cash, M.anime),
    (function (p) {
      const v = { responsiveThreshold: 0 },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_Parallax = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l._enabled = window.innerWidth > l.options.responsiveThreshold),
              (l.$img = l.$el.find("img").first()),
              l.$img.each(function () {
                const d = this;
                d.complete && p(d).trigger("load");
              }),
              l._updateParallax(),
              l._setupEventHandlers(),
              l._setupStyles(),
              y._parallaxes.push(l),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    y._parallaxes.splice(y._parallaxes.indexOf(this), 1),
                      (this.$img[0].style.transform = ""),
                      this._removeEventHandlers(),
                      (this.$el[0].M_Parallax = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleImageLoadBound =
                      this._handleImageLoad.bind(this)),
                      this.$img[0].addEventListener(
                        "load",
                        this._handleImageLoadBound
                      ),
                      y._parallaxes.length === 0 &&
                        ((y._handleScrollThrottled = M.throttle(
                          y._handleScroll,
                          5
                        )),
                        window.addEventListener(
                          "scroll",
                          y._handleScrollThrottled
                        ),
                        (y._handleWindowResizeThrottled = M.throttle(
                          y._handleWindowResize,
                          5
                        )),
                        window.addEventListener(
                          "resize",
                          y._handleWindowResizeThrottled
                        ));
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.$img[0].removeEventListener(
                      "load",
                      this._handleImageLoadBound
                    ),
                      y._parallaxes.length === 0 &&
                        (window.removeEventListener(
                          "scroll",
                          y._handleScrollThrottled
                        ),
                        window.removeEventListener(
                          "resize",
                          y._handleWindowResizeThrottled
                        ));
                  },
                },
                {
                  key: "_setupStyles",
                  value: function () {
                    this.$img[0].style.opacity = 1;
                  },
                },
                {
                  key: "_handleImageLoad",
                  value: function () {
                    this._updateParallax();
                  },
                },
                {
                  key: "_updateParallax",
                  value: function () {
                    const h =
                        this.$el.height() > 0
                          ? this.el.parentNode.offsetHeight
                          : 500,
                      l = this.$img[0].offsetHeight,
                      d = l - h,
                      C = this.$el.offset().top + h,
                      T = this.$el.offset().top,
                      L = M.getDocumentScrollTop(),
                      A = window.innerHeight,
                      R = L + A,
                      W = (R - T) / (h + A),
                      z = d * W;
                    this._enabled
                      ? C > L &&
                        T < L + A &&
                        (this.$img[0].style.transform =
                          "translate3D(-50%, " + z + "px, 0)")
                      : (this.$img[0].style.transform = "");
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Parallax;
                  },
                },
                {
                  key: "_handleScroll",
                  value: function () {
                    for (let h = 0; h < y._parallaxes.length; h++) {
                      const l = y._parallaxes[h];
                      l._updateParallax.call(l);
                    }
                  },
                },
                {
                  key: "_handleWindowResize",
                  value: function () {
                    for (let h = 0; h < y._parallaxes.length; h++) {
                      const l = y._parallaxes[h];
                      l._enabled =
                        window.innerWidth > l.options.responsiveThreshold;
                    }
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (k._parallaxes = []),
        (M.Parallax = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "parallax", "M_Parallax");
    })(cash),
    (function (p, v) {
      const k = {
          duration: 300,
          onShow: null,
          swipeable: !1,
          responsiveThreshold: 1 / 0,
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Tabs = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d.$tabLinks = d.$el.children("li.tab").children("a")),
              (d.index = 0),
              d._setupActiveTabLink(),
              d.options.swipeable
                ? d._setupSwipeableTabs()
                : d._setupNormalTabs(),
              d._setTabsAndTabWidth(),
              d._createIndicator(),
              d._setupEventHandlers(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this._indicator.parentNode.removeChild(this._indicator),
                      this.options.swipeable
                        ? this._teardownSwipeableTabs()
                        : this._teardownNormalTabs(),
                      (this.$el[0].M_Tabs = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleWindowResizeBound =
                      this._handleWindowResize.bind(this)),
                      window.addEventListener(
                        "resize",
                        this._handleWindowResizeBound
                      ),
                      (this._handleTabClickBound =
                        this._handleTabClick.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleTabClickBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    window.removeEventListener(
                      "resize",
                      this._handleWindowResizeBound
                    ),
                      this.el.removeEventListener(
                        "click",
                        this._handleTabClickBound
                      );
                  },
                },
                {
                  key: "_handleWindowResize",
                  value: function () {
                    this._setTabsAndTabWidth(),
                      this.tabWidth !== 0 &&
                        this.tabsWidth !== 0 &&
                        ((this._indicator.style.left =
                          this._calcLeftPos(this.$activeTabLink) + "px"),
                        (this._indicator.style.right =
                          this._calcRightPos(this.$activeTabLink) + "px"));
                  },
                },
                {
                  key: "_handleTabClick",
                  value: function (l) {
                    const d = this,
                      C = p(l.target).closest("li.tab"),
                      T = p(l.target).closest("a");
                    if (!(!T.length || !T.parent().hasClass("tab"))) {
                      if (C.hasClass("disabled")) {
                        l.preventDefault();
                        return;
                      }
                      if (!T.attr("target")) {
                        this.$activeTabLink.removeClass("active");
                        const L = this.$content;
                        (this.$activeTabLink = T),
                          (this.$content = p(M.escapeHash(T[0].hash))),
                          (this.$tabLinks = this.$el
                            .children("li.tab")
                            .children("a")),
                          this.$activeTabLink.addClass("active");
                        const A = this.index;
                        (this.index = Math.max(this.$tabLinks.index(T), 0)),
                          this.options.swipeable
                            ? this._tabsCarousel &&
                              this._tabsCarousel.set(this.index, function () {
                                typeof d.options.onShow == "function" &&
                                  d.options.onShow.call(d, d.$content[0]);
                              })
                            : this.$content.length &&
                              ((this.$content[0].style.display = "block"),
                              this.$content.addClass("active"),
                              typeof this.options.onShow == "function" &&
                                this.options.onShow.call(
                                  this,
                                  this.$content[0]
                                ),
                              L.length &&
                                !L.is(this.$content) &&
                                ((L[0].style.display = "none"),
                                L.removeClass("active"))),
                          this._setTabsAndTabWidth(),
                          this._animateIndicator(A),
                          l.preventDefault();
                      }
                    }
                  },
                },
                {
                  key: "_createIndicator",
                  value: function () {
                    const l = this,
                      d = document.createElement("li");
                    d.classList.add("indicator"),
                      this.el.appendChild(d),
                      (this._indicator = d),
                      setTimeout(function () {
                        (l._indicator.style.left =
                          l._calcLeftPos(l.$activeTabLink) + "px"),
                          (l._indicator.style.right =
                            l._calcRightPos(l.$activeTabLink) + "px");
                      }, 0);
                  },
                },
                {
                  key: "_setupActiveTabLink",
                  value: function () {
                    (this.$activeTabLink = p(
                      this.$tabLinks.filter('[href="' + location.hash + '"]')
                    )),
                      this.$activeTabLink.length === 0 &&
                        (this.$activeTabLink = this.$el
                          .children("li.tab")
                          .children("a.active")
                          .first()),
                      this.$activeTabLink.length === 0 &&
                        (this.$activeTabLink = this.$el
                          .children("li.tab")
                          .children("a")
                          .first()),
                      this.$tabLinks.removeClass("active"),
                      this.$activeTabLink[0].classList.add("active"),
                      (this.index = Math.max(
                        this.$tabLinks.index(this.$activeTabLink),
                        0
                      )),
                      this.$activeTabLink.length &&
                        ((this.$content = p(
                          M.escapeHash(this.$activeTabLink[0].hash)
                        )),
                        this.$content.addClass("active"));
                  },
                },
                {
                  key: "_setupSwipeableTabs",
                  value: function () {
                    const l = this;
                    window.innerWidth > this.options.responsiveThreshold &&
                      (this.options.swipeable = !1);
                    let d = p();
                    this.$tabLinks.each(function (L) {
                      const A = p(M.escapeHash(L.hash));
                      A.addClass("carousel-item"), (d = d.add(A));
                    });
                    const C = p(
                      '<div class="tabs-content carousel carousel-slider"></div>'
                    );
                    d.first().before(C), C.append(d), (d[0].style.display = "");
                    const T = this.$activeTabLink.closest(".tab").index();
                    (this._tabsCarousel = M.Carousel.init(C[0], {
                      fullWidth: !0,
                      noWrap: !0,
                      onCycleTo: function (L) {
                        const A = l.index;
                        (l.index = p(L).index()),
                          l.$activeTabLink.removeClass("active"),
                          (l.$activeTabLink = l.$tabLinks.eq(l.index)),
                          l.$activeTabLink.addClass("active"),
                          l._animateIndicator(A),
                          typeof l.options.onShow == "function" &&
                            l.options.onShow.call(l, l.$content[0]);
                      },
                    })),
                      this._tabsCarousel.set(T);
                  },
                },
                {
                  key: "_teardownSwipeableTabs",
                  value: function () {
                    const l = this._tabsCarousel.$el;
                    this._tabsCarousel.destroy(),
                      l.after(l.children()),
                      l.remove();
                  },
                },
                {
                  key: "_setupNormalTabs",
                  value: function () {
                    this.$tabLinks.not(this.$activeTabLink).each(function (l) {
                      if (l.hash) {
                        const d = p(M.escapeHash(l.hash));
                        d.length && (d[0].style.display = "none");
                      }
                    });
                  },
                },
                {
                  key: "_teardownNormalTabs",
                  value: function () {
                    this.$tabLinks.each(function (l) {
                      if (l.hash) {
                        const d = p(M.escapeHash(l.hash));
                        d.length && (d[0].style.display = "");
                      }
                    });
                  },
                },
                {
                  key: "_setTabsAndTabWidth",
                  value: function () {
                    (this.tabsWidth = this.$el.width()),
                      (this.tabWidth =
                        Math.max(this.tabsWidth, this.el.scrollWidth) /
                        this.$tabLinks.length);
                  },
                },
                {
                  key: "_calcRightPos",
                  value: function (l) {
                    return Math.ceil(
                      this.tabsWidth -
                        l.position().left -
                        l[0].getBoundingClientRect().width
                    );
                  },
                },
                {
                  key: "_calcLeftPos",
                  value: function (l) {
                    return Math.floor(l.position().left);
                  },
                },
                {
                  key: "updateTabIndicator",
                  value: function () {
                    this._setTabsAndTabWidth(),
                      this._animateIndicator(this.index);
                  },
                },
                {
                  key: "_animateIndicator",
                  value: function (l) {
                    let d = 0,
                      C = 0;
                    this.index - l >= 0 ? (d = 90) : (C = 90);
                    const T = {
                      targets: this._indicator,
                      left: {
                        value: this._calcLeftPos(this.$activeTabLink),
                        delay: d,
                      },
                      right: {
                        value: this._calcRightPos(this.$activeTabLink),
                        delay: C,
                      },
                      duration: this.options.duration,
                      easing: "easeOutQuad",
                    };
                    v.remove(this._indicator), v(T);
                  },
                },
                {
                  key: "select",
                  value: function (l) {
                    const d = this.$tabLinks.filter('[href="#' + l + '"]');
                    d.length && d.trigger("click");
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Tabs;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (window.M.Tabs = E),
        M.jQueryLoaded && M.initializeJqueryWrapper(E, "tabs", "M_Tabs");
    })(cash, M.anime),
    (function (p, v) {
      const k = {
          exitDelay: 200,
          enterDelay: 0,
          html: null,
          margin: 5,
          inDuration: 250,
          outDuration: 200,
          position: "bottom",
          transitionMovement: 10,
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Tooltip = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d.isOpen = !1),
              (d.isHovered = !1),
              (d.isFocused = !1),
              d._appendTooltipEl(),
              d._setupEventHandlers(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    p(this.tooltipEl).remove(),
                      this._removeEventHandlers(),
                      (this.el.M_Tooltip = void 0);
                  },
                },
                {
                  key: "_appendTooltipEl",
                  value: function () {
                    const l = document.createElement("div");
                    l.classList.add("material-tooltip"), (this.tooltipEl = l);
                    const d = document.createElement("div");
                    d.classList.add("tooltip-content"),
                      (d.innerHTML = this.options.html),
                      l.appendChild(d),
                      document.body.appendChild(l);
                  },
                },
                {
                  key: "_updateTooltipContent",
                  value: function () {
                    this.tooltipEl.querySelector(".tooltip-content").innerHTML =
                      this.options.html;
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleMouseEnterBound =
                      this._handleMouseEnter.bind(this)),
                      (this._handleMouseLeaveBound =
                        this._handleMouseLeave.bind(this)),
                      (this._handleFocusBound = this._handleFocus.bind(this)),
                      (this._handleBlurBound = this._handleBlur.bind(this)),
                      this.el.addEventListener(
                        "mouseenter",
                        this._handleMouseEnterBound
                      ),
                      this.el.addEventListener(
                        "mouseleave",
                        this._handleMouseLeaveBound
                      ),
                      this.el.addEventListener(
                        "focus",
                        this._handleFocusBound,
                        !0
                      ),
                      this.el.addEventListener(
                        "blur",
                        this._handleBlurBound,
                        !0
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "mouseenter",
                      this._handleMouseEnterBound
                    ),
                      this.el.removeEventListener(
                        "mouseleave",
                        this._handleMouseLeaveBound
                      ),
                      this.el.removeEventListener(
                        "focus",
                        this._handleFocusBound,
                        !0
                      ),
                      this.el.removeEventListener(
                        "blur",
                        this._handleBlurBound,
                        !0
                      );
                  },
                },
                {
                  key: "open",
                  value: function (l) {
                    this.isOpen ||
                      ((l = l === void 0 ? !0 : void 0),
                      (this.isOpen = !0),
                      (this.options = p.extend(
                        {},
                        this.options,
                        this._getAttributeOptions()
                      )),
                      this._updateTooltipContent(),
                      this._setEnterDelayTimeout(l));
                  },
                },
                {
                  key: "close",
                  value: function () {
                    !this.isOpen ||
                      ((this.isHovered = !1),
                      (this.isFocused = !1),
                      (this.isOpen = !1),
                      this._setExitDelayTimeout());
                  },
                },
                {
                  key: "_setExitDelayTimeout",
                  value: function () {
                    const l = this;
                    clearTimeout(this._exitDelayTimeout),
                      (this._exitDelayTimeout = setTimeout(function () {
                        l.isHovered || l.isFocused || l._animateOut();
                      }, this.options.exitDelay));
                  },
                },
                {
                  key: "_setEnterDelayTimeout",
                  value: function (l) {
                    const d = this;
                    clearTimeout(this._enterDelayTimeout),
                      (this._enterDelayTimeout = setTimeout(function () {
                        (!d.isHovered && !d.isFocused && !l) || d._animateIn();
                      }, this.options.enterDelay));
                  },
                },
                {
                  key: "_positionTooltip",
                  value: function () {
                    let l = this.el,
                      d = this.tooltipEl,
                      C = l.offsetHeight,
                      T = l.offsetWidth,
                      L = d.offsetHeight,
                      A = d.offsetWidth,
                      R = void 0,
                      W = this.options.margin,
                      z = void 0,
                      N = void 0;
                    (this.xMovement = 0),
                      (this.yMovement = 0),
                      (z =
                        l.getBoundingClientRect().top +
                        M.getDocumentScrollTop()),
                      (N =
                        l.getBoundingClientRect().left +
                        M.getDocumentScrollLeft()),
                      this.options.position === "top"
                        ? ((z += -L - W),
                          (N += T / 2 - A / 2),
                          (this.yMovement = -this.options.transitionMovement))
                        : this.options.position === "right"
                        ? ((z += C / 2 - L / 2),
                          (N += T + W),
                          (this.xMovement = this.options.transitionMovement))
                        : this.options.position === "left"
                        ? ((z += C / 2 - L / 2),
                          (N += -A - W),
                          (this.xMovement = -this.options.transitionMovement))
                        : ((z += C + W),
                          (N += T / 2 - A / 2),
                          (this.yMovement = this.options.transitionMovement)),
                      (R = this._repositionWithinScreen(N, z, A, L)),
                      p(d).css({ top: R.y + "px", left: R.x + "px" });
                  },
                },
                {
                  key: "_repositionWithinScreen",
                  value: function (l, d, C, T) {
                    let L = M.getDocumentScrollLeft(),
                      A = M.getDocumentScrollTop(),
                      R = l - L,
                      W = d - A,
                      z = { left: R, top: W, width: C, height: T },
                      N = this.options.margin + this.options.transitionMovement,
                      Y = M.checkWithinContainer(document.body, z, N);
                    return (
                      Y.left
                        ? (R = N)
                        : Y.right && (R -= R + C - window.innerWidth),
                      Y.top
                        ? (W = N)
                        : Y.bottom && (W -= W + T - window.innerHeight),
                      { x: R + L, y: W + A }
                    );
                  },
                },
                {
                  key: "_animateIn",
                  value: function () {
                    this._positionTooltip(),
                      (this.tooltipEl.style.visibility = "visible"),
                      v.remove(this.tooltipEl),
                      v({
                        targets: this.tooltipEl,
                        opacity: 1,
                        translateX: this.xMovement,
                        translateY: this.yMovement,
                        duration: this.options.inDuration,
                        easing: "easeOutCubic",
                      });
                  },
                },
                {
                  key: "_animateOut",
                  value: function () {
                    v.remove(this.tooltipEl),
                      v({
                        targets: this.tooltipEl,
                        opacity: 0,
                        translateX: 0,
                        translateY: 0,
                        duration: this.options.outDuration,
                        easing: "easeOutCubic",
                      });
                  },
                },
                {
                  key: "_handleMouseEnter",
                  value: function () {
                    (this.isHovered = !0), (this.isFocused = !1), this.open(!1);
                  },
                },
                {
                  key: "_handleMouseLeave",
                  value: function () {
                    (this.isHovered = !1), (this.isFocused = !1), this.close();
                  },
                },
                {
                  key: "_handleFocus",
                  value: function () {
                    M.tabPressed && ((this.isFocused = !0), this.open(!1));
                  },
                },
                {
                  key: "_handleBlur",
                  value: function () {
                    (this.isFocused = !1), this.close();
                  },
                },
                {
                  key: "_getAttributeOptions",
                  value: function () {
                    const l = {},
                      d = this.el.getAttribute("data-tooltip"),
                      C = this.el.getAttribute("data-position");
                    return d && (l.html = d), C && (l.position = C), l;
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Tooltip;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (M.Tooltip = E),
        M.jQueryLoaded && M.initializeJqueryWrapper(E, "tooltip", "M_Tooltip");
    })(cash, M.anime),
    (function (p) {
      var v = v || {},
        k = document.querySelectorAll.bind(document);
      function E(L) {
        return L !== null && L === L.window;
      }
      function y(L) {
        return E(L) ? L : L.nodeType === 9 && L.defaultView;
      }
      function g(L) {
        let A,
          R,
          W = { top: 0, left: 0 },
          z = L && L.ownerDocument;
        return (
          (A = z.documentElement),
          typeof L.getBoundingClientRect < "u" &&
            (W = L.getBoundingClientRect()),
          (R = y(z)),
          {
            top: W.top + R.pageYOffset - A.clientTop,
            left: W.left + R.pageXOffset - A.clientLeft,
          }
        );
      }
      function h(L) {
        let A = "";
        for (const R in L) L.hasOwnProperty(R) && (A += R + ":" + L[R] + ";");
        return A;
      }
      var l = {
          duration: 750,
          show: function (L, A) {
            if (L.button === 2) return !1;
            const R = A || this,
              W = document.createElement("div");
            (W.className = "waves-ripple"), R.appendChild(W);
            let z = g(R),
              N = L.pageY - z.top,
              Y = L.pageX - z.left,
              X = "scale(" + (R.clientWidth / 100) * 10 + ")";
            "touches" in L &&
              ((N = L.touches[0].pageY - z.top),
              (Y = L.touches[0].pageX - z.left)),
              W.setAttribute("data-hold", Date.now()),
              W.setAttribute("data-scale", X),
              W.setAttribute("data-x", Y),
              W.setAttribute("data-y", N);
            const Q = { top: N + "px", left: Y + "px" };
            (W.className = W.className + " waves-notransition"),
              W.setAttribute("style", h(Q)),
              (W.className = W.className.replace("waves-notransition", "")),
              (Q["-webkit-transform"] = X),
              (Q["-moz-transform"] = X),
              (Q["-ms-transform"] = X),
              (Q["-o-transform"] = X),
              (Q.transform = X),
              (Q.opacity = "1"),
              (Q["-webkit-transition-duration"] = l.duration + "ms"),
              (Q["-moz-transition-duration"] = l.duration + "ms"),
              (Q["-o-transition-duration"] = l.duration + "ms"),
              (Q["transition-duration"] = l.duration + "ms"),
              (Q["-webkit-transition-timing-function"] =
                "cubic-bezier(0.250, 0.460, 0.450, 0.940)"),
              (Q["-moz-transition-timing-function"] =
                "cubic-bezier(0.250, 0.460, 0.450, 0.940)"),
              (Q["-o-transition-timing-function"] =
                "cubic-bezier(0.250, 0.460, 0.450, 0.940)"),
              (Q["transition-timing-function"] =
                "cubic-bezier(0.250, 0.460, 0.450, 0.940)"),
              W.setAttribute("style", h(Q));
          },
          hide: function (L) {
            d.touchup(L);
            const A = this;
            A.clientWidth * 1.4;
            let R = null,
              W = A.getElementsByClassName("waves-ripple");
            if (W.length > 0) R = W[W.length - 1];
            else return !1;
            let z = R.getAttribute("data-x"),
              N = R.getAttribute("data-y"),
              Y = R.getAttribute("data-scale"),
              X = Date.now() - Number(R.getAttribute("data-hold")),
              Q = 350 - X;
            Q < 0 && (Q = 0),
              setTimeout(function () {
                const lt = {
                  top: N + "px",
                  left: z + "px",
                  opacity: "0",
                  "-webkit-transition-duration": l.duration + "ms",
                  "-moz-transition-duration": l.duration + "ms",
                  "-o-transition-duration": l.duration + "ms",
                  "transition-duration": l.duration + "ms",
                  "-webkit-transform": Y,
                  "-moz-transform": Y,
                  "-ms-transform": Y,
                  "-o-transform": Y,
                  transform: Y,
                };
                R.setAttribute("style", h(lt)),
                  setTimeout(function () {
                    try {
                      A.removeChild(R);
                    } catch {
                      return !1;
                    }
                  }, l.duration);
              }, Q);
          },
          wrapInput: function (L) {
            for (let A = 0; A < L.length; A++) {
              const R = L[A];
              if (R.tagName.toLowerCase() === "input") {
                const W = R.parentNode;
                if (
                  W.tagName.toLowerCase() === "i" &&
                  W.className.indexOf("waves-effect") !== -1
                )
                  continue;
                const z = document.createElement("i");
                z.className = R.className + " waves-input-wrapper";
                let N = R.getAttribute("style");
                N || (N = ""),
                  z.setAttribute("style", N),
                  (R.className = "waves-button-input"),
                  R.removeAttribute("style"),
                  W.replaceChild(z, R),
                  z.appendChild(R);
              }
            }
          },
        },
        d = {
          touches: 0,
          allowEvent: function (L) {
            let A = !0;
            return (
              L.type === "touchstart"
                ? (d.touches += 1)
                : L.type === "touchend" || L.type === "touchcancel"
                ? setTimeout(function () {
                    d.touches > 0 && (d.touches -= 1);
                  }, 500)
                : L.type === "mousedown" && d.touches > 0 && (A = !1),
              A
            );
          },
          touchup: function (L) {
            d.allowEvent(L);
          },
        };
      function C(L) {
        if (d.allowEvent(L) === !1) return null;
        for (
          var A = null, R = L.target || L.srcElement;
          R.parentNode !== null;

        ) {
          if (
            !(R instanceof SVGElement) &&
            R.className.indexOf("waves-effect") !== -1
          ) {
            A = R;
            break;
          }
          R = R.parentNode;
        }
        return A;
      }
      function T(L) {
        const A = C(L);
        A !== null &&
          (l.show(L, A),
          "ontouchstart" in p &&
            (A.addEventListener("touchend", l.hide, !1),
            A.addEventListener("touchcancel", l.hide, !1)),
          A.addEventListener("mouseup", l.hide, !1),
          A.addEventListener("mouseleave", l.hide, !1),
          A.addEventListener("dragend", l.hide, !1));
      }
      (v.displayEffect = function (L) {
        (L = L || {}),
          "duration" in L && (l.duration = L.duration),
          l.wrapInput(k(".waves-effect")),
          "ontouchstart" in p &&
            document.body.addEventListener("touchstart", T, !1),
          document.body.addEventListener("mousedown", T, !1);
      }),
        (v.attach = function (L) {
          L.tagName.toLowerCase() === "input" &&
            (l.wrapInput([L]), (L = L.parentNode)),
            "ontouchstart" in p && L.addEventListener("touchstart", T, !1),
            L.addEventListener("mousedown", T, !1);
        }),
        (p.Waves = v),
        document.addEventListener(
          "DOMContentLoaded",
          function () {
            v.displayEffect();
          },
          !1
        );
    })(window),
    (function (p, v) {
      const k = {
          html: "",
          displayLength: 4e3,
          inDuration: 300,
          outDuration: 375,
          classes: "",
          completeCallback: null,
          activationPercent: 0.8,
        },
        E = (function () {
          function y(g) {
            r(this, y),
              (this.options = p.extend({}, y.defaults, g)),
              (this.message = this.options.html),
              (this.panning = !1),
              (this.timeRemaining = this.options.displayLength),
              y._toasts.length === 0 && y._createContainer(),
              y._toasts.push(this);
            const h = this._createToast();
            (h.M_Toast = this),
              (this.el = h),
              (this.$el = p(h)),
              this._animateIn(),
              this._setTimer();
          }
          return (
            n(
              y,
              [
                {
                  key: "_createToast",
                  value: function () {
                    const h = document.createElement("div");
                    return (
                      h.classList.add("toast"),
                      this.options.classes.length &&
                        p(h).addClass(this.options.classes),
                      (
                        typeof HTMLElement == "object"
                          ? this.message instanceof HTMLElement
                          : this.message &&
                            typeof this.message == "object" &&
                            this.message !== null &&
                            this.message.nodeType === 1 &&
                            typeof this.message.nodeName == "string"
                      )
                        ? h.appendChild(this.message)
                        : this.message.jquery
                        ? p(h).append(this.message[0])
                        : (h.innerHTML = this.message),
                      y._container.appendChild(h),
                      h
                    );
                  },
                },
                {
                  key: "_animateIn",
                  value: function () {
                    v({
                      targets: this.el,
                      top: 0,
                      opacity: 1,
                      duration: this.options.inDuration,
                      easing: "easeOutCubic",
                    });
                  },
                },
                {
                  key: "_setTimer",
                  value: function () {
                    const h = this;
                    this.timeRemaining !== 1 / 0 &&
                      (this.counterInterval = setInterval(function () {
                        h.panning || (h.timeRemaining -= 20),
                          h.timeRemaining <= 0 && h.dismiss();
                      }, 20));
                  },
                },
                {
                  key: "dismiss",
                  value: function () {
                    const h = this;
                    window.clearInterval(this.counterInterval);
                    const l =
                      this.el.offsetWidth * this.options.activationPercent;
                    this.wasSwiped &&
                      ((this.el.style.transition =
                        "transform .05s, opacity .05s"),
                      (this.el.style.transform = "translateX(" + l + "px)"),
                      (this.el.style.opacity = 0)),
                      v({
                        targets: this.el,
                        opacity: 0,
                        marginTop: -40,
                        duration: this.options.outDuration,
                        easing: "easeOutExpo",
                        complete: function () {
                          typeof h.options.completeCallback == "function" &&
                            h.options.completeCallback(),
                            h.$el.remove(),
                            y._toasts.splice(y._toasts.indexOf(h), 1),
                            y._toasts.length === 0 && y._removeContainer();
                        },
                      });
                  },
                },
              ],
              [
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Toast;
                  },
                },
                {
                  key: "_createContainer",
                  value: function () {
                    const h = document.createElement("div");
                    h.setAttribute("id", "toast-container"),
                      h.addEventListener("touchstart", y._onDragStart),
                      h.addEventListener("touchmove", y._onDragMove),
                      h.addEventListener("touchend", y._onDragEnd),
                      h.addEventListener("mousedown", y._onDragStart),
                      document.addEventListener("mousemove", y._onDragMove),
                      document.addEventListener("mouseup", y._onDragEnd),
                      document.body.appendChild(h),
                      (y._container = h);
                  },
                },
                {
                  key: "_removeContainer",
                  value: function () {
                    document.removeEventListener("mousemove", y._onDragMove),
                      document.removeEventListener("mouseup", y._onDragEnd),
                      p(y._container).remove(),
                      (y._container = null);
                  },
                },
                {
                  key: "_onDragStart",
                  value: function (h) {
                    if (h.target && p(h.target).closest(".toast").length) {
                      const l = p(h.target).closest(".toast"),
                        d = l[0].M_Toast;
                      (d.panning = !0),
                        (y._draggedToast = d),
                        d.el.classList.add("panning"),
                        (d.el.style.transition = ""),
                        (d.startingXPos = y._xPos(h)),
                        (d.time = Date.now()),
                        (d.xPos = y._xPos(h));
                    }
                  },
                },
                {
                  key: "_onDragMove",
                  value: function (h) {
                    if (y._draggedToast) {
                      h.preventDefault();
                      const l = y._draggedToast;
                      (l.deltaX = Math.abs(l.xPos - y._xPos(h))),
                        (l.xPos = y._xPos(h)),
                        (l.velocityX = l.deltaX / (Date.now() - l.time)),
                        (l.time = Date.now());
                      const d = l.xPos - l.startingXPos,
                        C = l.el.offsetWidth * l.options.activationPercent;
                      (l.el.style.transform = "translateX(" + d + "px)"),
                        (l.el.style.opacity = 1 - Math.abs(d / C));
                    }
                  },
                },
                {
                  key: "_onDragEnd",
                  value: function () {
                    if (y._draggedToast) {
                      const h = y._draggedToast;
                      (h.panning = !1), h.el.classList.remove("panning");
                      const l = h.xPos - h.startingXPos,
                        d = h.el.offsetWidth * h.options.activationPercent,
                        C = Math.abs(l) > d || h.velocityX > 1;
                      C
                        ? ((h.wasSwiped = !0), h.dismiss())
                        : ((h.el.style.transition =
                            "transform .2s, opacity .2s"),
                          (h.el.style.transform = ""),
                          (h.el.style.opacity = "")),
                        (y._draggedToast = null);
                    }
                  },
                },
                {
                  key: "_xPos",
                  value: function (h) {
                    return h.targetTouches && h.targetTouches.length >= 1
                      ? h.targetTouches[0].clientX
                      : h.clientX;
                  },
                },
                {
                  key: "dismissAll",
                  value: function () {
                    for (const h in y._toasts) y._toasts[h].dismiss();
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            y
          );
        })();
      (E._toasts = []),
        (E._container = null),
        (E._draggedToast = null),
        (M.Toast = E),
        (M.toast = function (y) {
          return new E(y);
        });
    })(cash, M.anime),
    (function (p, v) {
      const k = {
          edge: "left",
          draggable: !0,
          inDuration: 250,
          outDuration: 200,
          onOpenStart: null,
          onOpenEnd: null,
          onCloseStart: null,
          onCloseEnd: null,
          preventScrolling: !0,
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Sidenav = d),
              (d.id = d.$el.attr("id")),
              (d.options = p.extend({}, g.defaults, l)),
              (d.isOpen = !1),
              (d.isFixed = d.el.classList.contains("sidenav-fixed")),
              (d.isDragged = !1),
              (d.lastWindowWidth = window.innerWidth),
              (d.lastWindowHeight = window.innerHeight),
              d._createOverlay(),
              d._createDragTarget(),
              d._setupEventHandlers(),
              d._setupClasses(),
              d._setupFixed(),
              g._sidenavs.push(d),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this._enableBodyScrolling(),
                      this._overlay.parentNode.removeChild(this._overlay),
                      this.dragTarget.parentNode.removeChild(this.dragTarget),
                      (this.el.M_Sidenav = void 0),
                      (this.el.style.transform = "");
                    const l = g._sidenavs.indexOf(this);
                    l >= 0 && g._sidenavs.splice(l, 1);
                  },
                },
                {
                  key: "_createOverlay",
                  value: function () {
                    const l = document.createElement("div");
                    (this._closeBound = this.close.bind(this)),
                      l.classList.add("sidenav-overlay"),
                      l.addEventListener("click", this._closeBound),
                      document.body.appendChild(l),
                      (this._overlay = l);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    g._sidenavs.length === 0 &&
                      document.body.addEventListener(
                        "click",
                        this._handleTriggerClick
                      ),
                      (this._handleDragTargetDragBound =
                        this._handleDragTargetDrag.bind(this)),
                      (this._handleDragTargetReleaseBound =
                        this._handleDragTargetRelease.bind(this)),
                      (this._handleCloseDragBound =
                        this._handleCloseDrag.bind(this)),
                      (this._handleCloseReleaseBound =
                        this._handleCloseRelease.bind(this)),
                      (this._handleCloseTriggerClickBound =
                        this._handleCloseTriggerClick.bind(this)),
                      this.dragTarget.addEventListener(
                        "touchmove",
                        this._handleDragTargetDragBound
                      ),
                      this.dragTarget.addEventListener(
                        "touchend",
                        this._handleDragTargetReleaseBound
                      ),
                      this._overlay.addEventListener(
                        "touchmove",
                        this._handleCloseDragBound
                      ),
                      this._overlay.addEventListener(
                        "touchend",
                        this._handleCloseReleaseBound
                      ),
                      this.el.addEventListener(
                        "touchmove",
                        this._handleCloseDragBound
                      ),
                      this.el.addEventListener(
                        "touchend",
                        this._handleCloseReleaseBound
                      ),
                      this.el.addEventListener(
                        "click",
                        this._handleCloseTriggerClickBound
                      ),
                      this.isFixed &&
                        ((this._handleWindowResizeBound =
                          this._handleWindowResize.bind(this)),
                        window.addEventListener(
                          "resize",
                          this._handleWindowResizeBound
                        ));
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    g._sidenavs.length === 1 &&
                      document.body.removeEventListener(
                        "click",
                        this._handleTriggerClick
                      ),
                      this.dragTarget.removeEventListener(
                        "touchmove",
                        this._handleDragTargetDragBound
                      ),
                      this.dragTarget.removeEventListener(
                        "touchend",
                        this._handleDragTargetReleaseBound
                      ),
                      this._overlay.removeEventListener(
                        "touchmove",
                        this._handleCloseDragBound
                      ),
                      this._overlay.removeEventListener(
                        "touchend",
                        this._handleCloseReleaseBound
                      ),
                      this.el.removeEventListener(
                        "touchmove",
                        this._handleCloseDragBound
                      ),
                      this.el.removeEventListener(
                        "touchend",
                        this._handleCloseReleaseBound
                      ),
                      this.el.removeEventListener(
                        "click",
                        this._handleCloseTriggerClickBound
                      ),
                      this.isFixed &&
                        window.removeEventListener(
                          "resize",
                          this._handleWindowResizeBound
                        );
                  },
                },
                {
                  key: "_handleTriggerClick",
                  value: function (l) {
                    const d = p(l.target).closest(".sidenav-trigger");
                    if (l.target && d.length) {
                      const C = M.getIdFromTrigger(d[0]),
                        T = document.getElementById(C).M_Sidenav;
                      T && T.open(d), l.preventDefault();
                    }
                  },
                },
                {
                  key: "_startDrag",
                  value: function (l) {
                    const d = l.targetTouches[0].clientX;
                    (this.isDragged = !0),
                      (this._startingXpos = d),
                      (this._xPos = this._startingXpos),
                      (this._time = Date.now()),
                      (this._width = this.el.getBoundingClientRect().width),
                      (this._overlay.style.display = "block"),
                      (this._initialScrollTop = this.isOpen
                        ? this.el.scrollTop
                        : M.getDocumentScrollTop()),
                      (this._verticallyScrolling = !1),
                      v.remove(this.el),
                      v.remove(this._overlay);
                  },
                },
                {
                  key: "_dragMoveUpdate",
                  value: function (l) {
                    const d = l.targetTouches[0].clientX,
                      C = this.isOpen
                        ? this.el.scrollTop
                        : M.getDocumentScrollTop();
                    (this.deltaX = Math.abs(this._xPos - d)),
                      (this._xPos = d),
                      (this.velocityX =
                        this.deltaX / (Date.now() - this._time)),
                      (this._time = Date.now()),
                      this._initialScrollTop !== C &&
                        (this._verticallyScrolling = !0);
                  },
                },
                {
                  key: "_handleDragTargetDrag",
                  value: function (l) {
                    if (
                      !(
                        !this.options.draggable ||
                        this._isCurrentlyFixed() ||
                        this._verticallyScrolling
                      )
                    ) {
                      this.isDragged || this._startDrag(l),
                        this._dragMoveUpdate(l);
                      let d = this._xPos - this._startingXpos,
                        C = d > 0 ? "right" : "left";
                      (d = Math.min(this._width, Math.abs(d))),
                        this.options.edge === C && (d = 0);
                      let T = d,
                        L = "translateX(-100%)";
                      this.options.edge === "right" &&
                        ((L = "translateX(100%)"), (T = -T)),
                        (this.percentOpen = Math.min(1, d / this._width)),
                        (this.el.style.transform =
                          L + " translateX(" + T + "px)"),
                        (this._overlay.style.opacity = this.percentOpen);
                    }
                  },
                },
                {
                  key: "_handleDragTargetRelease",
                  value: function () {
                    this.isDragged &&
                      (this.percentOpen > 0.2
                        ? this.open()
                        : this._animateOut(),
                      (this.isDragged = !1),
                      (this._verticallyScrolling = !1));
                  },
                },
                {
                  key: "_handleCloseDrag",
                  value: function (l) {
                    if (this.isOpen) {
                      if (
                        !this.options.draggable ||
                        this._isCurrentlyFixed() ||
                        this._verticallyScrolling
                      )
                        return;
                      this.isDragged || this._startDrag(l),
                        this._dragMoveUpdate(l);
                      let d = this._xPos - this._startingXpos,
                        C = d > 0 ? "right" : "left";
                      (d = Math.min(this._width, Math.abs(d))),
                        this.options.edge !== C && (d = 0);
                      let T = -d;
                      this.options.edge === "right" && (T = -T),
                        (this.percentOpen = Math.min(1, 1 - d / this._width)),
                        (this.el.style.transform = "translateX(" + T + "px)"),
                        (this._overlay.style.opacity = this.percentOpen);
                    }
                  },
                },
                {
                  key: "_handleCloseRelease",
                  value: function () {
                    this.isOpen &&
                      this.isDragged &&
                      (this.percentOpen > 0.8
                        ? this._animateIn()
                        : this.close(),
                      (this.isDragged = !1),
                      (this._verticallyScrolling = !1));
                  },
                },
                {
                  key: "_handleCloseTriggerClick",
                  value: function (l) {
                    const d = p(l.target).closest(".sidenav-close");
                    d.length && !this._isCurrentlyFixed() && this.close();
                  },
                },
                {
                  key: "_handleWindowResize",
                  value: function () {
                    this.lastWindowWidth !== window.innerWidth &&
                      (window.innerWidth > 992 ? this.open() : this.close()),
                      (this.lastWindowWidth = window.innerWidth),
                      (this.lastWindowHeight = window.innerHeight);
                  },
                },
                {
                  key: "_setupClasses",
                  value: function () {
                    this.options.edge === "right" &&
                      (this.el.classList.add("right-aligned"),
                      this.dragTarget.classList.add("right-aligned"));
                  },
                },
                {
                  key: "_removeClasses",
                  value: function () {
                    this.el.classList.remove("right-aligned"),
                      this.dragTarget.classList.remove("right-aligned");
                  },
                },
                {
                  key: "_setupFixed",
                  value: function () {
                    this._isCurrentlyFixed() && this.open();
                  },
                },
                {
                  key: "_isCurrentlyFixed",
                  value: function () {
                    return this.isFixed && window.innerWidth > 992;
                  },
                },
                {
                  key: "_createDragTarget",
                  value: function () {
                    const l = document.createElement("div");
                    l.classList.add("drag-target"),
                      document.body.appendChild(l),
                      (this.dragTarget = l);
                  },
                },
                {
                  key: "_preventBodyScrolling",
                  value: function () {
                    const l = document.body;
                    l.style.overflow = "hidden";
                  },
                },
                {
                  key: "_enableBodyScrolling",
                  value: function () {
                    const l = document.body;
                    l.style.overflow = "";
                  },
                },
                {
                  key: "open",
                  value: function () {
                    this.isOpen !== !0 &&
                      ((this.isOpen = !0),
                      typeof this.options.onOpenStart == "function" &&
                        this.options.onOpenStart.call(this, this.el),
                      this._isCurrentlyFixed()
                        ? (v.remove(this.el),
                          v({
                            targets: this.el,
                            translateX: 0,
                            duration: 0,
                            easing: "easeOutQuad",
                          }),
                          this._enableBodyScrolling(),
                          (this._overlay.style.display = "none"))
                        : (this.options.preventScrolling &&
                            this._preventBodyScrolling(),
                          (!this.isDragged || this.percentOpen != 1) &&
                            this._animateIn()));
                  },
                },
                {
                  key: "close",
                  value: function () {
                    if (this.isOpen !== !1)
                      if (
                        ((this.isOpen = !1),
                        typeof this.options.onCloseStart == "function" &&
                          this.options.onCloseStart.call(this, this.el),
                        this._isCurrentlyFixed())
                      ) {
                        const l =
                          this.options.edge === "left" ? "-105%" : "105%";
                        this.el.style.transform = "translateX(" + l + ")";
                      } else
                        this._enableBodyScrolling(),
                          !this.isDragged || this.percentOpen != 0
                            ? this._animateOut()
                            : (this._overlay.style.display = "none");
                  },
                },
                {
                  key: "_animateIn",
                  value: function () {
                    this._animateSidenavIn(), this._animateOverlayIn();
                  },
                },
                {
                  key: "_animateSidenavIn",
                  value: function () {
                    let l = this,
                      d = this.options.edge === "left" ? -1 : 1;
                    this.isDragged &&
                      (d =
                        this.options.edge === "left"
                          ? d + this.percentOpen
                          : d - this.percentOpen),
                      v.remove(this.el),
                      v({
                        targets: this.el,
                        translateX: [d * 100 + "%", 0],
                        duration: this.options.inDuration,
                        easing: "easeOutQuad",
                        complete: function () {
                          typeof l.options.onOpenEnd == "function" &&
                            l.options.onOpenEnd.call(l, l.el);
                        },
                      });
                  },
                },
                {
                  key: "_animateOverlayIn",
                  value: function () {
                    let l = 0;
                    this.isDragged
                      ? (l = this.percentOpen)
                      : p(this._overlay).css({ display: "block" }),
                      v.remove(this._overlay),
                      v({
                        targets: this._overlay,
                        opacity: [l, 1],
                        duration: this.options.inDuration,
                        easing: "easeOutQuad",
                      });
                  },
                },
                {
                  key: "_animateOut",
                  value: function () {
                    this._animateSidenavOut(), this._animateOverlayOut();
                  },
                },
                {
                  key: "_animateSidenavOut",
                  value: function () {
                    let l = this,
                      d = this.options.edge === "left" ? -1 : 1,
                      C = 0;
                    this.isDragged &&
                      (C =
                        this.options.edge === "left"
                          ? d + this.percentOpen
                          : d - this.percentOpen),
                      v.remove(this.el),
                      v({
                        targets: this.el,
                        translateX: [C * 100 + "%", d * 105 + "%"],
                        duration: this.options.outDuration,
                        easing: "easeOutQuad",
                        complete: function () {
                          typeof l.options.onCloseEnd == "function" &&
                            l.options.onCloseEnd.call(l, l.el);
                        },
                      });
                  },
                },
                {
                  key: "_animateOverlayOut",
                  value: function () {
                    const l = this;
                    v.remove(this._overlay),
                      v({
                        targets: this._overlay,
                        opacity: 0,
                        duration: this.options.outDuration,
                        easing: "easeOutQuad",
                        complete: function () {
                          p(l._overlay).css("display", "none");
                        },
                      });
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Sidenav;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (E._sidenavs = []),
        (window.M.Sidenav = E),
        M.jQueryLoaded && M.initializeJqueryWrapper(E, "sidenav", "M_Sidenav");
    })(cash, M.anime),
    (function (p, v) {
      const k = {
          throttle: 100,
          scrollOffset: 200,
          activeClass: "active",
          getActiveElement: function (y) {
            return 'a[href="#' + y + '"]';
          },
        },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_ScrollSpy = d),
              (d.options = p.extend({}, g.defaults, l)),
              g._elements.push(d),
              g._count++,
              g._increment++,
              (d.tickId = -1),
              (d.id = g._increment),
              d._setupEventHandlers(),
              d._handleWindowScroll(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    g._elements.splice(g._elements.indexOf(this), 1),
                      g._elementsInView.splice(
                        g._elementsInView.indexOf(this),
                        1
                      ),
                      g._visibleElements.splice(
                        g._visibleElements.indexOf(this.$el),
                        1
                      ),
                      g._count--,
                      this._removeEventHandlers(),
                      p(
                        this.options.getActiveElement(this.$el.attr("id"))
                      ).removeClass(this.options.activeClass),
                      (this.el.M_ScrollSpy = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    const l = M.throttle(this._handleWindowScroll, 200);
                    (this._handleThrottledResizeBound = l.bind(this)),
                      (this._handleWindowScrollBound =
                        this._handleWindowScroll.bind(this)),
                      g._count === 1 &&
                        (window.addEventListener(
                          "scroll",
                          this._handleWindowScrollBound
                        ),
                        window.addEventListener(
                          "resize",
                          this._handleThrottledResizeBound
                        ),
                        document.body.addEventListener(
                          "click",
                          this._handleTriggerClick
                        ));
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    g._count === 0 &&
                      (window.removeEventListener(
                        "scroll",
                        this._handleWindowScrollBound
                      ),
                      window.removeEventListener(
                        "resize",
                        this._handleThrottledResizeBound
                      ),
                      document.body.removeEventListener(
                        "click",
                        this._handleTriggerClick
                      ));
                  },
                },
                {
                  key: "_handleTriggerClick",
                  value: function (l) {
                    for (
                      let d = p(l.target), C = g._elements.length - 1;
                      C >= 0;
                      C--
                    ) {
                      const T = g._elements[C];
                      if (d.is('a[href="#' + T.$el.attr("id") + '"]')) {
                        l.preventDefault();
                        const L = T.$el.offset().top + 1;
                        v({
                          targets: [document.documentElement, document.body],
                          scrollTop: L - T.options.scrollOffset,
                          duration: 400,
                          easing: "easeOutCubic",
                        });
                        break;
                      }
                    }
                  },
                },
                {
                  key: "_handleWindowScroll",
                  value: function () {
                    g._ticks++;
                    for (
                      var l = M.getDocumentScrollTop(),
                        d = M.getDocumentScrollLeft(),
                        C = d + window.innerWidth,
                        T = l + window.innerHeight,
                        L = g._findElements(l, C, T, d),
                        A = 0;
                      A < L.length;
                      A++
                    ) {
                      const R = L[A],
                        W = R.tickId;
                      W < 0 && R._enter(), (R.tickId = g._ticks);
                    }
                    for (let z = 0; z < g._elementsInView.length; z++) {
                      const N = g._elementsInView[z],
                        Y = N.tickId;
                      Y >= 0 && Y !== g._ticks && (N._exit(), (N.tickId = -1));
                    }
                    g._elementsInView = L;
                  },
                },
                {
                  key: "_enter",
                  value: function () {
                    (g._visibleElements = g._visibleElements.filter(function (
                      l
                    ) {
                      return l.height() != 0;
                    })),
                      g._visibleElements[0]
                        ? (p(
                            this.options.getActiveElement(
                              g._visibleElements[0].attr("id")
                            )
                          ).removeClass(this.options.activeClass),
                          g._visibleElements[0][0].M_ScrollSpy &&
                          this.id < g._visibleElements[0][0].M_ScrollSpy.id
                            ? g._visibleElements.unshift(this.$el)
                            : g._visibleElements.push(this.$el))
                        : g._visibleElements.push(this.$el),
                      p(
                        this.options.getActiveElement(
                          g._visibleElements[0].attr("id")
                        )
                      ).addClass(this.options.activeClass);
                  },
                },
                {
                  key: "_exit",
                  value: function () {
                    const l = this;
                    (g._visibleElements = g._visibleElements.filter(function (
                      d
                    ) {
                      return d.height() != 0;
                    })),
                      g._visibleElements[0] &&
                        (p(
                          this.options.getActiveElement(
                            g._visibleElements[0].attr("id")
                          )
                        ).removeClass(this.options.activeClass),
                        (g._visibleElements = g._visibleElements.filter(
                          function (d) {
                            return d.attr("id") != l.$el.attr("id");
                          }
                        )),
                        g._visibleElements[0] &&
                          p(
                            this.options.getActiveElement(
                              g._visibleElements[0].attr("id")
                            )
                          ).addClass(this.options.activeClass));
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_ScrollSpy;
                  },
                },
                {
                  key: "_findElements",
                  value: function (l, d, C, T) {
                    for (var L = [], A = 0; A < g._elements.length; A++) {
                      const R = g._elements[A],
                        W = l + R.options.scrollOffset || 200;
                      if (R.$el.height() > 0) {
                        const z = R.$el.offset().top,
                          N = R.$el.offset().left,
                          Y = N + R.$el.width(),
                          X = z + R.$el.height(),
                          Q = !(N > d || Y < T || z > C || X < W);
                        Q && L.push(R);
                      }
                    }
                    return L;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (E._elements = []),
        (E._elementsInView = []),
        (E._visibleElements = []),
        (E._count = 0),
        (E._increment = 0),
        (E._ticks = 0),
        (M.ScrollSpy = E),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(E, "scrollSpy", "M_ScrollSpy");
    })(cash, M.anime),
    (function (p) {
      const v = {
          data: {},
          limit: 1 / 0,
          onAutocomplete: null,
          minLength: 1,
          sortFunction: function (E, y, g) {
            return E.indexOf(g) - y.indexOf(g);
          },
        },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_Autocomplete = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l.isOpen = !1),
              (l.count = 0),
              (l.activeIndex = -1),
              l.oldVal,
              (l.$inputField = l.$el.closest(".input-field")),
              (l.$active = p()),
              (l._mousedown = !1),
              l._setupDropdown(),
              l._setupEventHandlers(),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this._removeDropdown(),
                      (this.el.M_Autocomplete = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleInputBlurBound =
                      this._handleInputBlur.bind(this)),
                      (this._handleInputKeyupAndFocusBound =
                        this._handleInputKeyupAndFocus.bind(this)),
                      (this._handleInputKeydownBound =
                        this._handleInputKeydown.bind(this)),
                      (this._handleInputClickBound =
                        this._handleInputClick.bind(this)),
                      (this._handleContainerMousedownAndTouchstartBound =
                        this._handleContainerMousedownAndTouchstart.bind(this)),
                      (this._handleContainerMouseupAndTouchendBound =
                        this._handleContainerMouseupAndTouchend.bind(this)),
                      this.el.addEventListener(
                        "blur",
                        this._handleInputBlurBound
                      ),
                      this.el.addEventListener(
                        "keyup",
                        this._handleInputKeyupAndFocusBound
                      ),
                      this.el.addEventListener(
                        "focus",
                        this._handleInputKeyupAndFocusBound
                      ),
                      this.el.addEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      ),
                      this.el.addEventListener(
                        "click",
                        this._handleInputClickBound
                      ),
                      this.container.addEventListener(
                        "mousedown",
                        this._handleContainerMousedownAndTouchstartBound
                      ),
                      this.container.addEventListener(
                        "mouseup",
                        this._handleContainerMouseupAndTouchendBound
                      ),
                      typeof window.ontouchstart < "u" &&
                        (this.container.addEventListener(
                          "touchstart",
                          this._handleContainerMousedownAndTouchstartBound
                        ),
                        this.container.addEventListener(
                          "touchend",
                          this._handleContainerMouseupAndTouchendBound
                        ));
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "blur",
                      this._handleInputBlurBound
                    ),
                      this.el.removeEventListener(
                        "keyup",
                        this._handleInputKeyupAndFocusBound
                      ),
                      this.el.removeEventListener(
                        "focus",
                        this._handleInputKeyupAndFocusBound
                      ),
                      this.el.removeEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      ),
                      this.el.removeEventListener(
                        "click",
                        this._handleInputClickBound
                      ),
                      this.container.removeEventListener(
                        "mousedown",
                        this._handleContainerMousedownAndTouchstartBound
                      ),
                      this.container.removeEventListener(
                        "mouseup",
                        this._handleContainerMouseupAndTouchendBound
                      ),
                      typeof window.ontouchstart < "u" &&
                        (this.container.removeEventListener(
                          "touchstart",
                          this._handleContainerMousedownAndTouchstartBound
                        ),
                        this.container.removeEventListener(
                          "touchend",
                          this._handleContainerMouseupAndTouchendBound
                        ));
                  },
                },
                {
                  key: "_setupDropdown",
                  value: function () {
                    const h = this;
                    (this.container = document.createElement("ul")),
                      (this.container.id = "autocomplete-options-" + M.guid()),
                      p(this.container).addClass(
                        "autocomplete-content dropdown-content"
                      ),
                      this.$inputField.append(this.container),
                      this.el.setAttribute("data-target", this.container.id),
                      (this.dropdown = M.Dropdown.init(this.el, {
                        autoFocus: !1,
                        closeOnClick: !1,
                        coverTrigger: !1,
                        onItemClick: function (l) {
                          h.selectOption(p(l));
                        },
                      })),
                      this.el.removeEventListener(
                        "click",
                        this.dropdown._handleClickBound
                      );
                  },
                },
                {
                  key: "_removeDropdown",
                  value: function () {
                    this.container.parentNode.removeChild(this.container);
                  },
                },
                {
                  key: "_handleInputBlur",
                  value: function () {
                    this._mousedown ||
                      (this.close(), this._resetAutocomplete());
                  },
                },
                {
                  key: "_handleInputKeyupAndFocus",
                  value: function (h) {
                    h.type === "keyup" && (y._keydown = !1), (this.count = 0);
                    const l = this.el.value.toLowerCase();
                    h.keyCode === 13 ||
                      h.keyCode === 38 ||
                      h.keyCode === 40 ||
                      (this.oldVal !== l &&
                        (M.tabPressed || h.type !== "focus") &&
                        this.open(),
                      (this.oldVal = l));
                  },
                },
                {
                  key: "_handleInputKeydown",
                  value: function (h) {
                    y._keydown = !0;
                    let l = h.keyCode,
                      d = void 0,
                      C = p(this.container).children("li").length;
                    if (l === M.keys.ENTER && this.activeIndex >= 0) {
                      (d = p(this.container)
                        .children("li")
                        .eq(this.activeIndex)),
                        d.length && (this.selectOption(d), h.preventDefault());
                      return;
                    }
                    (l === M.keys.ARROW_UP || l === M.keys.ARROW_DOWN) &&
                      (h.preventDefault(),
                      l === M.keys.ARROW_UP &&
                        this.activeIndex > 0 &&
                        this.activeIndex--,
                      l === M.keys.ARROW_DOWN &&
                        this.activeIndex < C - 1 &&
                        this.activeIndex++,
                      this.$active.removeClass("active"),
                      this.activeIndex >= 0 &&
                        ((this.$active = p(this.container)
                          .children("li")
                          .eq(this.activeIndex)),
                        this.$active.addClass("active")));
                  },
                },
                {
                  key: "_handleInputClick",
                  value: function (h) {
                    this.open();
                  },
                },
                {
                  key: "_handleContainerMousedownAndTouchstart",
                  value: function (h) {
                    this._mousedown = !0;
                  },
                },
                {
                  key: "_handleContainerMouseupAndTouchend",
                  value: function (h) {
                    this._mousedown = !1;
                  },
                },
                {
                  key: "_highlight",
                  value: function (h, l) {
                    const d = l.find("img"),
                      C = l
                        .text()
                        .toLowerCase()
                        .indexOf("" + h.toLowerCase()),
                      T = C + h.length - 1,
                      L = l.text().slice(0, C),
                      A = l.text().slice(C, T + 1),
                      R = l.text().slice(T + 1);
                    l.html(
                      "<span>" +
                        L +
                        "<span class='highlight'>" +
                        A +
                        "</span>" +
                        R +
                        "</span>"
                    ),
                      d.length && l.prepend(d);
                  },
                },
                {
                  key: "_resetCurrentElement",
                  value: function () {
                    (this.activeIndex = -1), this.$active.removeClass("active");
                  },
                },
                {
                  key: "_resetAutocomplete",
                  value: function () {
                    p(this.container).empty(),
                      this._resetCurrentElement(),
                      (this.oldVal = null),
                      (this.isOpen = !1),
                      (this._mousedown = !1);
                  },
                },
                {
                  key: "selectOption",
                  value: function (h) {
                    const l = h.text().trim();
                    (this.el.value = l),
                      this.$el.trigger("change"),
                      this._resetAutocomplete(),
                      this.close(),
                      typeof this.options.onAutocomplete == "function" &&
                        this.options.onAutocomplete.call(this, l);
                  },
                },
                {
                  key: "_renderDropdown",
                  value: function (h, l) {
                    const d = this;
                    this._resetAutocomplete();
                    const C = [];
                    for (const T in h)
                      if (
                        h.hasOwnProperty(T) &&
                        T.toLowerCase().indexOf(l) !== -1
                      ) {
                        if (this.count >= this.options.limit) break;
                        const L = { data: h[T], key: T };
                        C.push(L), this.count++;
                      }
                    if (this.options.sortFunction) {
                      const A = function (N, Y) {
                        return d.options.sortFunction(
                          N.key.toLowerCase(),
                          Y.key.toLowerCase(),
                          l.toLowerCase()
                        );
                      };
                      C.sort(A);
                    }
                    for (let R = 0; R < C.length; R++) {
                      const W = C[R],
                        z = p("<li></li>");
                      W.data
                        ? z.append(
                            '<img src="' +
                              W.data +
                              '" class="right circle"><span>' +
                              W.key +
                              "</span>"
                          )
                        : z.append("<span>" + W.key + "</span>"),
                        p(this.container).append(z),
                        this._highlight(l, z);
                    }
                  },
                },
                {
                  key: "open",
                  value: function () {
                    const h = this.el.value.toLowerCase();
                    this._resetAutocomplete(),
                      h.length >= this.options.minLength &&
                        ((this.isOpen = !0),
                        this._renderDropdown(this.options.data, h)),
                      this.dropdown.isOpen
                        ? this.dropdown.recalculateDimensions()
                        : this.dropdown.open();
                  },
                },
                {
                  key: "close",
                  value: function () {
                    this.dropdown.close();
                  },
                },
                {
                  key: "updateData",
                  value: function (h) {
                    const l = this.el.value.toLowerCase();
                    (this.options.data = h),
                      this.isOpen && this._renderDropdown(h, l);
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Autocomplete;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (k._keydown = !1),
        (M.Autocomplete = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "autocomplete", "M_Autocomplete");
    })(cash),
    (function (p) {
      (M.updateTextFields = function () {
        const v =
          "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
        p(v).each(function (k, E) {
          const y = p(this);
          k.value.length > 0 ||
          p(k).is(":focus") ||
          k.autofocus ||
          y.attr("placeholder") !== null
            ? y.siblings("label").addClass("active")
            : k.validity
            ? y
                .siblings("label")
                .toggleClass("active", k.validity.badInput === !0)
            : y.siblings("label").removeClass("active");
        });
      }),
        (M.validate_field = function (v) {
          const k = v.attr("data-length") !== null,
            E = parseInt(v.attr("data-length")),
            y = v[0].value.length;
          y === 0 && v[0].validity.badInput === !1 && !v.is(":required")
            ? v.hasClass("validate") &&
              (v.removeClass("valid"), v.removeClass("invalid"))
            : v.hasClass("validate") &&
              ((v.is(":valid") && k && y <= E) || (v.is(":valid") && !k)
                ? (v.removeClass("invalid"), v.addClass("valid"))
                : (v.removeClass("valid"), v.addClass("invalid")));
        }),
        (M.textareaAutoResize = function (v) {
          if ((v instanceof Element && (v = p(v)), !v.length)) {
            console.error("No textarea element found");
            return;
          }
          let k = p(".hiddendiv").first();
          k.length ||
            ((k = p('<div class="hiddendiv common"></div>')),
            p("body").append(k));
          const E = v.css("font-family"),
            y = v.css("font-size"),
            g = v.css("line-height"),
            h = v.css("padding-top"),
            l = v.css("padding-right"),
            d = v.css("padding-bottom"),
            C = v.css("padding-left");
          y && k.css("font-size", y),
            E && k.css("font-family", E),
            g && k.css("line-height", g),
            h && k.css("padding-top", h),
            l && k.css("padding-right", l),
            d && k.css("padding-bottom", d),
            C && k.css("padding-left", C),
            v.data("original-height") || v.data("original-height", v.height()),
            v.attr("wrap") === "off" &&
              k.css("overflow-wrap", "normal").css("white-space", "pre"),
            k.text(
              v[0].value +
                `
`
            );
          const T = k.html().replace(/\n/g, "<br>");
          k.html(T),
            v[0].offsetWidth > 0 && v[0].offsetHeight > 0
              ? k.css("width", v.width() + "px")
              : k.css("width", window.innerWidth / 2 + "px"),
            v.data("original-height") <= k.innerHeight()
              ? v.css("height", k.innerHeight() + "px")
              : v[0].value.length < v.data("previous-length") &&
                v.css("height", v.data("original-height") + "px"),
            v.data("previous-length", v[0].value.length);
        }),
        p(document).ready(function () {
          const v =
            "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
          p(document).on("change", v, function () {
            (this.value.length !== 0 || p(this).attr("placeholder") !== null) &&
              p(this).siblings("label").addClass("active"),
              M.validate_field(p(this));
          }),
            p(document).ready(function () {
              M.updateTextFields();
            }),
            p(document).on("reset", function (y) {
              const g = p(y.target);
              g.is("form") &&
                (g.find(v).removeClass("valid").removeClass("invalid"),
                g.find(v).each(function (h) {
                  this.value.length &&
                    p(this).siblings("label").removeClass("active");
                }),
                setTimeout(function () {
                  g.find("select").each(function () {
                    this.M_FormSelect && p(this).trigger("change");
                  });
                }, 0));
            }),
            document.addEventListener(
              "focus",
              function (y) {
                p(y.target).is(v) &&
                  p(y.target).siblings("label, .prefix").addClass("active");
              },
              !0
            ),
            document.addEventListener(
              "blur",
              function (y) {
                const g = p(y.target);
                if (g.is(v)) {
                  let h = ".prefix";
                  g[0].value.length === 0 &&
                    g[0].validity.badInput !== !0 &&
                    g.attr("placeholder") === null &&
                    (h += ", label"),
                    g.siblings(h).removeClass("active"),
                    M.validate_field(g);
                }
              },
              !0
            );
          const k = "input[type=radio], input[type=checkbox]";
          p(document).on("keyup", k, function (y) {
            if (y.which === M.keys.TAB) {
              p(this).addClass("tabbed");
              const g = p(this);
              g.one("blur", function (h) {
                p(this).removeClass("tabbed");
              });
              return;
            }
          });
          const E = ".materialize-textarea";
          p(E).each(function () {
            const y = p(this);
            y.data("original-height", y.height()),
              y.data("previous-length", this.value.length),
              M.textareaAutoResize(y);
          }),
            p(document).on("keyup", E, function () {
              M.textareaAutoResize(p(this));
            }),
            p(document).on("keydown", E, function () {
              M.textareaAutoResize(p(this));
            }),
            p(document).on(
              "change",
              '.file-field input[type="file"]',
              function () {
                for (
                  var y = p(this).closest(".file-field"),
                    g = y.find("input.file-path"),
                    h = p(this)[0].files,
                    l = [],
                    d = 0;
                  d < h.length;
                  d++
                )
                  l.push(h[d].name);
                (g[0].value = l.join(", ")), g.trigger("change");
              }
            );
        });
    })(cash),
    (function (p, v) {
      const k = { indicators: !0, height: 400, duration: 500, interval: 6e3 },
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Slider = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d.$slider = d.$el.find(".slides")),
              (d.$slides = d.$slider.children("li")),
              (d.activeIndex = d.$slides
                .filter(function (C) {
                  return p(C).hasClass("active");
                })
                .first()
                .index()),
              d.activeIndex != -1 && (d.$active = d.$slides.eq(d.activeIndex)),
              d._setSliderHeight(),
              d.$slides.find(".caption").each(function (C) {
                d._animateCaptionIn(C, 0);
              }),
              d.$slides.find("img").each(function (C) {
                const T =
                  "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                p(C).attr("src") !== T &&
                  (p(C).css(
                    "background-image",
                    'url("' + p(C).attr("src") + '")'
                  ),
                  p(C).attr("src", T));
              }),
              d._setupIndicators(),
              d.$active
                ? d.$active.css("display", "block")
                : (d.$slides.first().addClass("active"),
                  v({
                    targets: d.$slides.first()[0],
                    opacity: 1,
                    duration: d.options.duration,
                    easing: "easeOutQuad",
                  }),
                  (d.activeIndex = 0),
                  (d.$active = d.$slides.eq(d.activeIndex)),
                  d.options.indicators &&
                    d.$indicators.eq(d.activeIndex).addClass("active")),
              d.$active.find("img").each(function (C) {
                v({
                  targets: d.$active.find(".caption")[0],
                  opacity: 1,
                  translateX: 0,
                  translateY: 0,
                  duration: d.options.duration,
                  easing: "easeOutQuad",
                });
              }),
              d._setupEventHandlers(),
              d.start(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this.pause(),
                      this._removeIndicators(),
                      this._removeEventHandlers(),
                      (this.el.M_Slider = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    const l = this;
                    (this._handleIntervalBound =
                      this._handleInterval.bind(this)),
                      (this._handleIndicatorClickBound =
                        this._handleIndicatorClick.bind(this)),
                      this.options.indicators &&
                        this.$indicators.each(function (d) {
                          d.addEventListener(
                            "click",
                            l._handleIndicatorClickBound
                          );
                        });
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    const l = this;
                    this.options.indicators &&
                      this.$indicators.each(function (d) {
                        d.removeEventListener(
                          "click",
                          l._handleIndicatorClickBound
                        );
                      });
                  },
                },
                {
                  key: "_handleIndicatorClick",
                  value: function (l) {
                    const d = p(l.target).index();
                    this.set(d);
                  },
                },
                {
                  key: "_handleInterval",
                  value: function () {
                    let l = this.$slider.find(".active").index();
                    this.$slides.length === l + 1 ? (l = 0) : (l += 1),
                      this.set(l);
                  },
                },
                {
                  key: "_animateCaptionIn",
                  value: function (l, d) {
                    const C = {
                      targets: l,
                      opacity: 0,
                      duration: d,
                      easing: "easeOutQuad",
                    };
                    p(l).hasClass("center-align")
                      ? (C.translateY = -100)
                      : p(l).hasClass("right-align")
                      ? (C.translateX = 100)
                      : p(l).hasClass("left-align") && (C.translateX = -100),
                      v(C);
                  },
                },
                {
                  key: "_setSliderHeight",
                  value: function () {
                    this.$el.hasClass("fullscreen") ||
                      (this.options.indicators
                        ? this.$el.css(
                            "height",
                            this.options.height + 40 + "px"
                          )
                        : this.$el.css("height", this.options.height + "px"),
                      this.$slider.css("height", this.options.height + "px"));
                  },
                },
                {
                  key: "_setupIndicators",
                  value: function () {
                    const l = this;
                    this.options.indicators &&
                      ((this.$indicators = p('<ul class="indicators"></ul>')),
                      this.$slides.each(function (d, C) {
                        const T = p('<li class="indicator-item"></li>');
                        l.$indicators.append(T[0]);
                      }),
                      this.$el.append(this.$indicators[0]),
                      (this.$indicators =
                        this.$indicators.children("li.indicator-item")));
                  },
                },
                {
                  key: "_removeIndicators",
                  value: function () {
                    this.$el.find("ul.indicators").remove();
                  },
                },
                {
                  key: "set",
                  value: function (l) {
                    const d = this;
                    if (
                      (l >= this.$slides.length
                        ? (l = 0)
                        : l < 0 && (l = this.$slides.length - 1),
                      this.activeIndex != l)
                    ) {
                      this.$active = this.$slides.eq(this.activeIndex);
                      const C = this.$active.find(".caption");
                      this.$active.removeClass("active"),
                        v({
                          targets: this.$active[0],
                          opacity: 0,
                          duration: this.options.duration,
                          easing: "easeOutQuad",
                          complete: function () {
                            d.$slides.not(".active").each(function (T) {
                              v({
                                targets: T,
                                opacity: 0,
                                translateX: 0,
                                translateY: 0,
                                duration: 0,
                                easing: "easeOutQuad",
                              });
                            });
                          },
                        }),
                        this._animateCaptionIn(C[0], this.options.duration),
                        this.options.indicators &&
                          (this.$indicators
                            .eq(this.activeIndex)
                            .removeClass("active"),
                          this.$indicators.eq(l).addClass("active")),
                        v({
                          targets: this.$slides.eq(l)[0],
                          opacity: 1,
                          duration: this.options.duration,
                          easing: "easeOutQuad",
                        }),
                        v({
                          targets: this.$slides.eq(l).find(".caption")[0],
                          opacity: 1,
                          translateX: 0,
                          translateY: 0,
                          duration: this.options.duration,
                          delay: this.options.duration,
                          easing: "easeOutQuad",
                        }),
                        this.$slides.eq(l).addClass("active"),
                        (this.activeIndex = l),
                        this.start();
                    }
                  },
                },
                {
                  key: "pause",
                  value: function () {
                    clearInterval(this.interval);
                  },
                },
                {
                  key: "start",
                  value: function () {
                    clearInterval(this.interval),
                      (this.interval = setInterval(
                        this._handleIntervalBound,
                        this.options.duration + this.options.interval
                      ));
                  },
                },
                {
                  key: "next",
                  value: function () {
                    let l = this.activeIndex + 1;
                    l >= this.$slides.length
                      ? (l = 0)
                      : l < 0 && (l = this.$slides.length - 1),
                      this.set(l);
                  },
                },
                {
                  key: "prev",
                  value: function () {
                    let l = this.activeIndex - 1;
                    l >= this.$slides.length
                      ? (l = 0)
                      : l < 0 && (l = this.$slides.length - 1),
                      this.set(l);
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Slider;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (M.Slider = E),
        M.jQueryLoaded && M.initializeJqueryWrapper(E, "slider", "M_Slider");
    })(cash, M.anime),
    (function (p, v) {
      p(document).on("click", ".card", function (k) {
        if (p(this).children(".card-reveal").length) {
          const E = p(k.target).closest(".card");
          E.data("initialOverflow") === void 0 &&
            E.data(
              "initialOverflow",
              E.css("overflow") === void 0 ? "" : E.css("overflow")
            );
          const y = p(this).find(".card-reveal");
          p(k.target).is(p(".card-reveal .card-title")) ||
          p(k.target).is(p(".card-reveal .card-title i"))
            ? v({
                targets: y[0],
                translateY: 0,
                duration: 225,
                easing: "easeInOutQuad",
                complete: function (g) {
                  const h = g.animatables[0].target;
                  p(h).css({ display: "none" }),
                    E.css("overflow", E.data("initialOverflow"));
                },
              })
            : (p(k.target).is(p(".card .activator")) ||
                p(k.target).is(p(".card .activator i"))) &&
              (E.css("overflow", "hidden"),
              y.css({ display: "block" }),
              v({
                targets: y[0],
                translateY: "-100%",
                duration: 300,
                easing: "easeInOutQuad",
              }));
        }
      });
    })(cash, M.anime),
    (function (p) {
      const v = {
          data: [],
          placeholder: "",
          secondaryPlaceholder: "",
          autocompleteOptions: {},
          limit: 1 / 0,
          onChipAdd: null,
          onChipSelect: null,
          onChipDelete: null,
        },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_Chips = l),
              (l.options = p.extend({}, y.defaults, h)),
              l.$el.addClass("chips input-field"),
              (l.chipsData = []),
              (l.$chips = p()),
              l._setupInput(),
              (l.hasAutocomplete =
                Object.keys(l.options.autocompleteOptions).length > 0),
              l.$input.attr("id") || l.$input.attr("id", M.guid()),
              l.options.data.length &&
                ((l.chipsData = l.options.data), l._renderChips(l.chipsData)),
              l.hasAutocomplete && l._setupAutocomplete(),
              l._setPlaceholder(),
              l._setupLabel(),
              l._setupEventHandlers(),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "getData",
                  value: function () {
                    return this.chipsData;
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this.$chips.remove(),
                      (this.el.M_Chips = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleChipClickBound =
                      this._handleChipClick.bind(this)),
                      (this._handleInputKeydownBound =
                        this._handleInputKeydown.bind(this)),
                      (this._handleInputFocusBound =
                        this._handleInputFocus.bind(this)),
                      (this._handleInputBlurBound =
                        this._handleInputBlur.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleChipClickBound
                      ),
                      document.addEventListener(
                        "keydown",
                        y._handleChipsKeydown
                      ),
                      document.addEventListener("keyup", y._handleChipsKeyup),
                      this.el.addEventListener("blur", y._handleChipsBlur, !0),
                      this.$input[0].addEventListener(
                        "focus",
                        this._handleInputFocusBound
                      ),
                      this.$input[0].addEventListener(
                        "blur",
                        this._handleInputBlurBound
                      ),
                      this.$input[0].addEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "click",
                      this._handleChipClickBound
                    ),
                      document.removeEventListener(
                        "keydown",
                        y._handleChipsKeydown
                      ),
                      document.removeEventListener(
                        "keyup",
                        y._handleChipsKeyup
                      ),
                      this.el.removeEventListener(
                        "blur",
                        y._handleChipsBlur,
                        !0
                      ),
                      this.$input[0].removeEventListener(
                        "focus",
                        this._handleInputFocusBound
                      ),
                      this.$input[0].removeEventListener(
                        "blur",
                        this._handleInputBlurBound
                      ),
                      this.$input[0].removeEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      );
                  },
                },
                {
                  key: "_handleChipClick",
                  value: function (h) {
                    const l = p(h.target).closest(".chip"),
                      d = p(h.target).is(".close");
                    if (l.length) {
                      const C = l.index();
                      d
                        ? (this.deleteChip(C), this.$input[0].focus())
                        : this.selectChip(C);
                    } else this.$input[0].focus();
                  },
                },
                {
                  key: "_handleInputFocus",
                  value: function () {
                    this.$el.addClass("focus");
                  },
                },
                {
                  key: "_handleInputBlur",
                  value: function () {
                    this.$el.removeClass("focus");
                  },
                },
                {
                  key: "_handleInputKeydown",
                  value: function (h) {
                    if (((y._keydown = !0), h.keyCode === 13)) {
                      if (
                        this.hasAutocomplete &&
                        this.autocomplete &&
                        this.autocomplete.isOpen
                      )
                        return;
                      h.preventDefault(),
                        this.addChip({ tag: this.$input[0].value }),
                        (this.$input[0].value = "");
                    } else
                      (h.keyCode === 8 || h.keyCode === 37) &&
                        this.$input[0].value === "" &&
                        this.chipsData.length &&
                        (h.preventDefault(),
                        this.selectChip(this.chipsData.length - 1));
                  },
                },
                {
                  key: "_renderChip",
                  value: function (h) {
                    if (h.tag) {
                      const l = document.createElement("div"),
                        d = document.createElement("i");
                      if (
                        (l.classList.add("chip"),
                        (l.textContent = h.tag),
                        l.setAttribute("tabindex", 0),
                        p(d).addClass("material-icons close"),
                        (d.textContent = "close"),
                        h.image)
                      ) {
                        const C = document.createElement("img");
                        C.setAttribute("src", h.image),
                          l.insertBefore(C, l.firstChild);
                      }
                      return l.appendChild(d), l;
                    }
                  },
                },
                {
                  key: "_renderChips",
                  value: function () {
                    this.$chips.remove();
                    for (let h = 0; h < this.chipsData.length; h++) {
                      const l = this._renderChip(this.chipsData[h]);
                      this.$el.append(l), this.$chips.add(l);
                    }
                    this.$el.append(this.$input[0]);
                  },
                },
                {
                  key: "_setupAutocomplete",
                  value: function () {
                    const h = this;
                    (this.options.autocompleteOptions.onAutocomplete =
                      function (l) {
                        h.addChip({ tag: l }),
                          (h.$input[0].value = ""),
                          h.$input[0].focus();
                      }),
                      (this.autocomplete = M.Autocomplete.init(
                        this.$input[0],
                        this.options.autocompleteOptions
                      ));
                  },
                },
                {
                  key: "_setupInput",
                  value: function () {
                    (this.$input = this.$el.find("input")),
                      this.$input.length ||
                        ((this.$input = p("<input></input>")),
                        this.$el.append(this.$input)),
                      this.$input.addClass("input");
                  },
                },
                {
                  key: "_setupLabel",
                  value: function () {
                    (this.$label = this.$el.find("label")),
                      this.$label.length &&
                        this.$label.setAttribute("for", this.$input.attr("id"));
                  },
                },
                {
                  key: "_setPlaceholder",
                  value: function () {
                    this.chipsData !== void 0 &&
                    !this.chipsData.length &&
                    this.options.placeholder
                      ? p(this.$input).prop(
                          "placeholder",
                          this.options.placeholder
                        )
                      : (this.chipsData === void 0 ||
                          !!this.chipsData.length) &&
                        this.options.secondaryPlaceholder &&
                        p(this.$input).prop(
                          "placeholder",
                          this.options.secondaryPlaceholder
                        );
                  },
                },
                {
                  key: "_isValid",
                  value: function (h) {
                    if (h.hasOwnProperty("tag") && h.tag !== "") {
                      for (var l = !1, d = 0; d < this.chipsData.length; d++)
                        if (this.chipsData[d].tag === h.tag) {
                          l = !0;
                          break;
                        }
                      return !l;
                    }
                    return !1;
                  },
                },
                {
                  key: "addChip",
                  value: function (h) {
                    if (
                      !(
                        !this._isValid(h) ||
                        this.chipsData.length >= this.options.limit
                      )
                    ) {
                      const l = this._renderChip(h);
                      this.$chips.add(l),
                        this.chipsData.push(h),
                        p(this.$input).before(l),
                        this._setPlaceholder(),
                        typeof this.options.onChipAdd == "function" &&
                          this.options.onChipAdd.call(this, this.$el, l);
                    }
                  },
                },
                {
                  key: "deleteChip",
                  value: function (h) {
                    const l = this.$chips.eq(h);
                    this.$chips.eq(h).remove(),
                      (this.$chips = this.$chips.filter(function (d) {
                        return p(d).index() >= 0;
                      })),
                      this.chipsData.splice(h, 1),
                      this._setPlaceholder(),
                      typeof this.options.onChipDelete == "function" &&
                        this.options.onChipDelete.call(this, this.$el, l[0]);
                  },
                },
                {
                  key: "selectChip",
                  value: function (h) {
                    const l = this.$chips.eq(h);
                    (this._selectedChip = l),
                      l[0].focus(),
                      typeof this.options.onChipSelect == "function" &&
                        this.options.onChipSelect.call(this, this.$el, l[0]);
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Chips;
                  },
                },
                {
                  key: "_handleChipsKeydown",
                  value: function (h) {
                    y._keydown = !0;
                    const l = p(h.target).closest(".chips"),
                      d = h.target && l.length;
                    if (!(p(h.target).is("input, textarea") || !d)) {
                      const C = l[0].M_Chips;
                      if (h.keyCode === 8 || h.keyCode === 46) {
                        h.preventDefault();
                        let T = C.chipsData.length;
                        if (C._selectedChip) {
                          const L = C._selectedChip.index();
                          C.deleteChip(L),
                            (C._selectedChip = null),
                            (T = Math.max(L - 1, 0));
                        }
                        C.chipsData.length && C.selectChip(T);
                      } else if (h.keyCode === 37) {
                        if (C._selectedChip) {
                          const A = C._selectedChip.index() - 1;
                          if (A < 0) return;
                          C.selectChip(A);
                        }
                      } else if (h.keyCode === 39 && C._selectedChip) {
                        const R = C._selectedChip.index() + 1;
                        R >= C.chipsData.length
                          ? C.$input[0].focus()
                          : C.selectChip(R);
                      }
                    }
                  },
                },
                {
                  key: "_handleChipsKeyup",
                  value: function (h) {
                    y._keydown = !1;
                  },
                },
                {
                  key: "_handleChipsBlur",
                  value: function (h) {
                    if (!y._keydown) {
                      const l = p(h.target).closest(".chips"),
                        d = l[0].M_Chips;
                      d._selectedChip = null;
                    }
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (k._keydown = !1),
        (M.Chips = k),
        M.jQueryLoaded && M.initializeJqueryWrapper(k, "chips", "M_Chips"),
        p(document).ready(function () {
          p(document.body).on("click", ".chip .close", function () {
            const E = p(this).closest(".chips");
            (E.length && E[0].M_Chips) || p(this).closest(".chip").remove();
          });
        });
    })(cash),
    (function (p) {
      const v = { top: 0, bottom: 1 / 0, offset: 0, onPositionChange: null },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_Pushpin = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l.originalOffset = l.el.offsetTop),
              y._pushpins.push(l),
              l._setupEventHandlers(),
              l._updatePosition(),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    (this.el.style.top = null),
                      this._removePinClasses(),
                      this._removeEventHandlers();
                    const h = y._pushpins.indexOf(this);
                    y._pushpins.splice(h, 1);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    document.addEventListener("scroll", y._updateElements);
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    document.removeEventListener("scroll", y._updateElements);
                  },
                },
                {
                  key: "_updatePosition",
                  value: function () {
                    const h = M.getDocumentScrollTop() + this.options.offset;
                    this.options.top <= h &&
                      this.options.bottom >= h &&
                      !this.el.classList.contains("pinned") &&
                      (this._removePinClasses(),
                      (this.el.style.top = this.options.offset + "px"),
                      this.el.classList.add("pinned"),
                      typeof this.options.onPositionChange == "function" &&
                        this.options.onPositionChange.call(this, "pinned")),
                      h < this.options.top &&
                        !this.el.classList.contains("pin-top") &&
                        (this._removePinClasses(),
                        (this.el.style.top = 0),
                        this.el.classList.add("pin-top"),
                        typeof this.options.onPositionChange == "function" &&
                          this.options.onPositionChange.call(this, "pin-top")),
                      h > this.options.bottom &&
                        !this.el.classList.contains("pin-bottom") &&
                        (this._removePinClasses(),
                        this.el.classList.add("pin-bottom"),
                        (this.el.style.top =
                          this.options.bottom - this.originalOffset + "px"),
                        typeof this.options.onPositionChange == "function" &&
                          this.options.onPositionChange.call(
                            this,
                            "pin-bottom"
                          ));
                  },
                },
                {
                  key: "_removePinClasses",
                  value: function () {
                    this.el.classList.remove("pin-top"),
                      this.el.classList.remove("pinned"),
                      this.el.classList.remove("pin-bottom");
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Pushpin;
                  },
                },
                {
                  key: "_updateElements",
                  value: function () {
                    for (const h in y._pushpins) {
                      const l = y._pushpins[h];
                      l._updatePosition();
                    }
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (k._pushpins = []),
        (M.Pushpin = k),
        M.jQueryLoaded && M.initializeJqueryWrapper(k, "pushpin", "M_Pushpin");
    })(cash),
    (function (p, v) {
      const k = { direction: "top", hoverEnabled: !0, toolbarEnabled: !1 };
      p.fn.reverse = [].reverse;
      const E = (function (y) {
        o(g, y);
        function g(h, l) {
          r(this, g);
          const d = s(
            this,
            (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
          );
          return (
            (d.el.M_FloatingActionButton = d),
            (d.options = p.extend({}, g.defaults, l)),
            (d.isOpen = !1),
            (d.$anchor = d.$el.children("a").first()),
            (d.$menu = d.$el.children("ul").first()),
            (d.$floatingBtns = d.$el.find("ul .btn-floating")),
            (d.$floatingBtnsReverse = d.$el.find("ul .btn-floating").reverse()),
            (d.offsetY = 0),
            (d.offsetX = 0),
            d.$el.addClass("direction-" + d.options.direction),
            d.options.direction === "top"
              ? (d.offsetY = 40)
              : d.options.direction === "right"
              ? (d.offsetX = -40)
              : d.options.direction === "bottom"
              ? (d.offsetY = -40)
              : (d.offsetX = 40),
            d._setupEventHandlers(),
            d
          );
        }
        return (
          n(
            g,
            [
              {
                key: "destroy",
                value: function () {
                  this._removeEventHandlers(),
                    (this.el.M_FloatingActionButton = void 0);
                },
              },
              {
                key: "_setupEventHandlers",
                value: function () {
                  (this._handleFABClickBound = this._handleFABClick.bind(this)),
                    (this._handleOpenBound = this.open.bind(this)),
                    (this._handleCloseBound = this.close.bind(this)),
                    this.options.hoverEnabled && !this.options.toolbarEnabled
                      ? (this.el.addEventListener(
                          "mouseenter",
                          this._handleOpenBound
                        ),
                        this.el.addEventListener(
                          "mouseleave",
                          this._handleCloseBound
                        ))
                      : this.el.addEventListener(
                          "click",
                          this._handleFABClickBound
                        );
                },
              },
              {
                key: "_removeEventHandlers",
                value: function () {
                  this.options.hoverEnabled && !this.options.toolbarEnabled
                    ? (this.el.removeEventListener(
                        "mouseenter",
                        this._handleOpenBound
                      ),
                      this.el.removeEventListener(
                        "mouseleave",
                        this._handleCloseBound
                      ))
                    : this.el.removeEventListener(
                        "click",
                        this._handleFABClickBound
                      );
                },
              },
              {
                key: "_handleFABClick",
                value: function () {
                  this.isOpen ? this.close() : this.open();
                },
              },
              {
                key: "_handleDocumentClick",
                value: function (l) {
                  p(l.target).closest(this.$menu).length || this.close();
                },
              },
              {
                key: "open",
                value: function () {
                  this.isOpen ||
                    (this.options.toolbarEnabled
                      ? this._animateInToolbar()
                      : this._animateInFAB(),
                    (this.isOpen = !0));
                },
              },
              {
                key: "close",
                value: function () {
                  !this.isOpen ||
                    (this.options.toolbarEnabled
                      ? (window.removeEventListener(
                          "scroll",
                          this._handleCloseBound,
                          !0
                        ),
                        document.body.removeEventListener(
                          "click",
                          this._handleDocumentClickBound,
                          !0
                        ),
                        this._animateOutToolbar())
                      : this._animateOutFAB(),
                    (this.isOpen = !1));
                },
              },
              {
                key: "_animateInFAB",
                value: function () {
                  const l = this;
                  this.$el.addClass("active");
                  let d = 0;
                  this.$floatingBtnsReverse.each(function (C) {
                    v({
                      targets: C,
                      opacity: 1,
                      scale: [0.4, 1],
                      translateY: [l.offsetY, 0],
                      translateX: [l.offsetX, 0],
                      duration: 275,
                      delay: d,
                      easing: "easeInOutQuad",
                    }),
                      (d += 40);
                  });
                },
              },
              {
                key: "_animateOutFAB",
                value: function () {
                  const l = this;
                  this.$floatingBtnsReverse.each(function (d) {
                    v.remove(d),
                      v({
                        targets: d,
                        opacity: 0,
                        scale: 0.4,
                        translateY: l.offsetY,
                        translateX: l.offsetX,
                        duration: 175,
                        easing: "easeOutQuad",
                        complete: function () {
                          l.$el.removeClass("active");
                        },
                      });
                  });
                },
              },
              {
                key: "_animateInToolbar",
                value: function () {
                  let l = this,
                    d = void 0,
                    C = window.innerWidth,
                    T = window.innerHeight,
                    L = this.el.getBoundingClientRect(),
                    A = p('<div class="fab-backdrop"></div>'),
                    R = this.$anchor.css("background-color");
                  this.$anchor.append(A),
                    (this.offsetX = L.left - C / 2 + L.width / 2),
                    (this.offsetY = T - L.bottom),
                    (d = C / A[0].clientWidth),
                    (this.btnBottom = L.bottom),
                    (this.btnLeft = L.left),
                    (this.btnWidth = L.width),
                    this.$el.addClass("active"),
                    this.$el.css({
                      "text-align": "center",
                      width: "100%",
                      bottom: 0,
                      left: 0,
                      transform: "translateX(" + this.offsetX + "px)",
                      transition: "none",
                    }),
                    this.$anchor.css({
                      transform: "translateY(" + -this.offsetY + "px)",
                      transition: "none",
                    }),
                    A.css({ "background-color": R }),
                    setTimeout(function () {
                      l.$el.css({
                        transform: "",
                        transition:
                          "transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s",
                      }),
                        l.$anchor.css({
                          overflow: "visible",
                          transform: "",
                          transition: "transform .2s",
                        }),
                        setTimeout(function () {
                          l.$el.css({
                            overflow: "hidden",
                            "background-color": R,
                          }),
                            A.css({
                              transform: "scale(" + d + ")",
                              transition:
                                "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                            }),
                            l.$menu
                              .children("li")
                              .children("a")
                              .css({ opacity: 1 }),
                            (l._handleDocumentClickBound =
                              l._handleDocumentClick.bind(l)),
                            window.addEventListener(
                              "scroll",
                              l._handleCloseBound,
                              !0
                            ),
                            document.body.addEventListener(
                              "click",
                              l._handleDocumentClickBound,
                              !0
                            );
                        }, 100);
                    }, 0);
                },
              },
              {
                key: "_animateOutToolbar",
                value: function () {
                  const l = this,
                    d = window.innerWidth,
                    C = window.innerHeight,
                    T = this.$el.find(".fab-backdrop"),
                    L = this.$anchor.css("background-color");
                  (this.offsetX = this.btnLeft - d / 2 + this.btnWidth / 2),
                    (this.offsetY = C - this.btnBottom),
                    this.$el.removeClass("active"),
                    this.$el.css({
                      "background-color": "transparent",
                      transition: "none",
                    }),
                    this.$anchor.css({ transition: "none" }),
                    T.css({ transform: "scale(0)", "background-color": L }),
                    this.$menu
                      .children("li")
                      .children("a")
                      .css({ opacity: "" }),
                    setTimeout(function () {
                      T.remove(),
                        l.$el.css({
                          "text-align": "",
                          width: "",
                          bottom: "",
                          left: "",
                          overflow: "",
                          "background-color": "",
                          transform: "translate3d(" + -l.offsetX + "px,0,0)",
                        }),
                        l.$anchor.css({
                          overflow: "",
                          transform: "translate3d(0," + l.offsetY + "px,0)",
                        }),
                        setTimeout(function () {
                          l.$el.css({
                            transform: "translate3d(0,0,0)",
                            transition: "transform .2s",
                          }),
                            l.$anchor.css({
                              transform: "translate3d(0,0,0)",
                              transition:
                                "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                            });
                        }, 20);
                    }, 200);
                },
              },
            ],
            [
              {
                key: "init",
                value: function (l, d) {
                  return i(
                    g.__proto__ || Object.getPrototypeOf(g),
                    "init",
                    this
                  ).call(this, this, l, d);
                },
              },
              {
                key: "getInstance",
                value: function (l) {
                  const d = l.jquery ? l[0] : l;
                  return d.M_FloatingActionButton;
                },
              },
              {
                key: "defaults",
                get: function () {
                  return k;
                },
              },
            ]
          ),
          g
        );
      })(a);
      (M.FloatingActionButton = E),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(
            E,
            "floatingActionButton",
            "M_FloatingActionButton"
          );
    })(cash, M.anime),
    (function (p) {
      const v = {
          autoClose: !1,
          format: "mmm dd, yyyy",
          parse: null,
          defaultDate: null,
          setDefaultDate: !1,
          disableWeekends: !1,
          disableDayFn: null,
          firstDay: 0,
          minDate: null,
          maxDate: null,
          yearRange: 10,
          minYear: 0,
          maxYear: 9999,
          minMonth: void 0,
          maxMonth: void 0,
          startRange: null,
          endRange: null,
          isRTL: !1,
          showMonthAfterYear: !1,
          showDaysInNextAndPreviousMonths: !1,
          container: null,
          showClearBtn: !1,
          i18n: {
            cancel: "Cancel",
            clear: "Clear",
            done: "Ok",
            previousMonth: "\u2039",
            nextMonth: "\u203A",
            months: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            monthsShort: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            weekdays: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
          },
          events: [],
          onSelect: null,
          onOpen: null,
          onClose: null,
          onDraw: null,
        },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            (l.el.M_Datepicker = l),
              (l.options = p.extend({}, y.defaults, h)),
              !!h &&
                h.hasOwnProperty("i18n") &&
                typeof h.i18n == "object" &&
                (l.options.i18n = p.extend({}, y.defaults.i18n, h.i18n)),
              l.options.minDate && l.options.minDate.setHours(0, 0, 0, 0),
              l.options.maxDate && l.options.maxDate.setHours(0, 0, 0, 0),
              (l.id = M.guid()),
              l._setupVariables(),
              l._insertHTMLIntoDOM(),
              l._setupModal(),
              l._setupEventHandlers(),
              l.options.defaultDate ||
                (l.options.defaultDate = new Date(Date.parse(l.el.value)));
            const d = l.options.defaultDate;
            return (
              y._isDate(d)
                ? l.options.setDefaultDate
                  ? (l.setDate(d, !0), l.setInputValue())
                  : l.gotoDate(d)
                : l.gotoDate(new Date()),
              (l.isOpen = !1),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this.modal.destroy(),
                      p(this.modalEl).remove(),
                      this.destroySelects(),
                      (this.el.M_Datepicker = void 0);
                  },
                },
                {
                  key: "destroySelects",
                  value: function () {
                    const h =
                      this.calendarEl.querySelector(".orig-select-year");
                    h && M.FormSelect.getInstance(h).destroy();
                    const l =
                      this.calendarEl.querySelector(".orig-select-month");
                    l && M.FormSelect.getInstance(l).destroy();
                  },
                },
                {
                  key: "_insertHTMLIntoDOM",
                  value: function () {
                    this.options.showClearBtn &&
                      (p(this.clearBtn).css({ visibility: "" }),
                      (this.clearBtn.innerHTML = this.options.i18n.clear)),
                      (this.doneBtn.innerHTML = this.options.i18n.done),
                      (this.cancelBtn.innerHTML = this.options.i18n.cancel),
                      this.options.container
                        ? this.$modalEl.appendTo(this.options.container)
                        : this.$modalEl.insertBefore(this.el);
                  },
                },
                {
                  key: "_setupModal",
                  value: function () {
                    const h = this;
                    (this.modalEl.id = "modal-" + this.id),
                      (this.modal = M.Modal.init(this.modalEl, {
                        onCloseEnd: function () {
                          h.isOpen = !1;
                        },
                      }));
                  },
                },
                {
                  key: "toString",
                  value: function (h) {
                    const l = this;
                    if (((h = h || this.options.format), !y._isDate(this.date)))
                      return "";
                    const d = h.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g),
                      C = d
                        .map(function (T) {
                          return l.formats[T] ? l.formats[T]() : T;
                        })
                        .join("");
                    return C;
                  },
                },
                {
                  key: "setDate",
                  value: function (h, l) {
                    if (!h)
                      return (
                        (this.date = null),
                        this._renderDateDisplay(),
                        this.draw()
                      );
                    if (
                      (typeof h == "string" && (h = new Date(Date.parse(h))),
                      !!y._isDate(h))
                    ) {
                      const d = this.options.minDate,
                        C = this.options.maxDate;
                      y._isDate(d) && h < d
                        ? (h = d)
                        : y._isDate(C) && h > C && (h = C),
                        (this.date = new Date(h.getTime())),
                        this._renderDateDisplay(),
                        y._setToStartOfDay(this.date),
                        this.gotoDate(this.date),
                        !l &&
                          typeof this.options.onSelect == "function" &&
                          this.options.onSelect.call(this, this.date);
                    }
                  },
                },
                {
                  key: "setInputValue",
                  value: function () {
                    (this.el.value = this.toString()),
                      this.$el.trigger("change", { firedBy: this });
                  },
                },
                {
                  key: "_renderDateDisplay",
                  value: function () {
                    const h = y._isDate(this.date) ? this.date : new Date(),
                      l = this.options.i18n,
                      d = l.weekdaysShort[h.getDay()],
                      C = l.monthsShort[h.getMonth()],
                      T = h.getDate();
                    (this.yearTextEl.innerHTML = h.getFullYear()),
                      (this.dateTextEl.innerHTML = d + ", " + C + " " + T);
                  },
                },
                {
                  key: "gotoDate",
                  value: function (h) {
                    let l = !0;
                    if (y._isDate(h)) {
                      if (this.calendars) {
                        const d = new Date(
                            this.calendars[0].year,
                            this.calendars[0].month,
                            1
                          ),
                          C = new Date(
                            this.calendars[this.calendars.length - 1].year,
                            this.calendars[this.calendars.length - 1].month,
                            1
                          ),
                          T = h.getTime();
                        C.setMonth(C.getMonth() + 1),
                          C.setDate(C.getDate() - 1),
                          (l = T < d.getTime() || C.getTime() < T);
                      }
                      l &&
                        (this.calendars = [
                          { month: h.getMonth(), year: h.getFullYear() },
                        ]),
                        this.adjustCalendars();
                    }
                  },
                },
                {
                  key: "adjustCalendars",
                  value: function () {
                    (this.calendars[0] = this.adjustCalendar(
                      this.calendars[0]
                    )),
                      this.draw();
                  },
                },
                {
                  key: "adjustCalendar",
                  value: function (h) {
                    return (
                      h.month < 0 &&
                        ((h.year -= Math.ceil(Math.abs(h.month) / 12)),
                        (h.month += 12)),
                      h.month > 11 &&
                        ((h.year += Math.floor(Math.abs(h.month) / 12)),
                        (h.month -= 12)),
                      h
                    );
                  },
                },
                {
                  key: "nextMonth",
                  value: function () {
                    this.calendars[0].month++, this.adjustCalendars();
                  },
                },
                {
                  key: "prevMonth",
                  value: function () {
                    this.calendars[0].month--, this.adjustCalendars();
                  },
                },
                {
                  key: "render",
                  value: function (h, l, d) {
                    let C = this.options,
                      T = new Date(),
                      L = y._getDaysInMonth(h, l),
                      A = new Date(h, l, 1).getDay(),
                      R = [],
                      W = [];
                    y._setToStartOfDay(T),
                      C.firstDay > 0 && ((A -= C.firstDay), A < 0 && (A += 7));
                    for (
                      var z = l === 0 ? 11 : l - 1,
                        N = l === 11 ? 0 : l + 1,
                        Y = l === 0 ? h - 1 : h,
                        X = l === 11 ? h + 1 : h,
                        Q = y._getDaysInMonth(Y, z),
                        lt = L + A,
                        xt = lt;
                      xt > 7;

                    )
                      xt -= 7;
                    lt += 7 - xt;
                    for (let bt = !1, dt = 0, Et = 0; dt < lt; dt++) {
                      let St = new Date(h, l, 1 + (dt - A)),
                        K = y._isDate(this.date)
                          ? y._compareDates(St, this.date)
                          : !1,
                        st = y._compareDates(St, T),
                        it = C.events.indexOf(St.toDateString()) !== -1,
                        rt = dt < A || dt >= L + A,
                        gt = 1 + (dt - A),
                        wt = l,
                        at = h,
                        ut = C.startRange && y._compareDates(C.startRange, St),
                        P = C.endRange && y._compareDates(C.endRange, St),
                        B =
                          C.startRange &&
                          C.endRange &&
                          C.startRange < St &&
                          St < C.endRange,
                        V =
                          (C.minDate && St < C.minDate) ||
                          (C.maxDate && St > C.maxDate) ||
                          (C.disableWeekends && y._isWeekend(St)) ||
                          (C.disableDayFn && C.disableDayFn(St));
                      rt &&
                        (dt < A
                          ? ((gt = Q + gt), (wt = z), (at = Y))
                          : ((gt = gt - L), (wt = N), (at = X)));
                      const j = {
                        day: gt,
                        month: wt,
                        year: at,
                        hasEvent: it,
                        isSelected: K,
                        isToday: st,
                        isDisabled: V,
                        isEmpty: rt,
                        isStartRange: ut,
                        isEndRange: P,
                        isInRange: B,
                        showDaysInNextAndPreviousMonths:
                          C.showDaysInNextAndPreviousMonths,
                      };
                      W.push(this.renderDay(j)),
                        ++Et === 7 &&
                          (R.push(this.renderRow(W, C.isRTL, bt)),
                          (W = []),
                          (Et = 0),
                          (bt = !1));
                    }
                    return this.renderTable(C, R, d);
                  },
                },
                {
                  key: "renderDay",
                  value: function (h) {
                    let l = [],
                      d = "false";
                    if (h.isEmpty)
                      if (h.showDaysInNextAndPreviousMonths)
                        l.push("is-outside-current-month"),
                          l.push("is-selection-disabled");
                      else return '<td class="is-empty"></td>';
                    return (
                      h.isDisabled && l.push("is-disabled"),
                      h.isToday && l.push("is-today"),
                      h.isSelected && (l.push("is-selected"), (d = "true")),
                      h.hasEvent && l.push("has-event"),
                      h.isInRange && l.push("is-inrange"),
                      h.isStartRange && l.push("is-startrange"),
                      h.isEndRange && l.push("is-endrange"),
                      '<td data-day="' +
                        h.day +
                        '" class="' +
                        l.join(" ") +
                        '" aria-selected="' +
                        d +
                        '">' +
                        ('<button class="datepicker-day-button" type="button" data-year="' +
                          h.year +
                          '" data-month="' +
                          h.month +
                          '" data-day="' +
                          h.day +
                          '">' +
                          h.day +
                          "</button>") +
                        "</td>"
                    );
                  },
                },
                {
                  key: "renderRow",
                  value: function (h, l, d) {
                    return (
                      '<tr class="datepicker-row' +
                      (d ? " is-selected" : "") +
                      '">' +
                      (l ? h.reverse() : h).join("") +
                      "</tr>"
                    );
                  },
                },
                {
                  key: "renderTable",
                  value: function (h, l, d) {
                    return (
                      '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' +
                      d +
                      '">' +
                      this.renderHead(h) +
                      this.renderBody(l) +
                      "</table></div>"
                    );
                  },
                },
                {
                  key: "renderHead",
                  value: function (h) {
                    let l = void 0,
                      d = [];
                    for (l = 0; l < 7; l++)
                      d.push(
                        '<th scope="col"><abbr title="' +
                          this.renderDayName(h, l) +
                          '">' +
                          this.renderDayName(h, l, !0) +
                          "</abbr></th>"
                      );
                    return (
                      "<thead><tr>" +
                      (h.isRTL ? d.reverse() : d).join("") +
                      "</tr></thead>"
                    );
                  },
                },
                {
                  key: "renderBody",
                  value: function (h) {
                    return "<tbody>" + h.join("") + "</tbody>";
                  },
                },
                {
                  key: "renderTitle",
                  value: function (h, l, d, C, T, L) {
                    let A = void 0,
                      R = void 0,
                      W = void 0,
                      z = this.options,
                      N = d === z.minYear,
                      Y = d === z.maxYear,
                      X =
                        '<div id="' +
                        L +
                        '" class="datepicker-controls" role="heading" aria-live="assertive">',
                      Q = void 0,
                      lt = void 0,
                      xt = !0,
                      bt = !0;
                    for (W = [], A = 0; A < 12; A++)
                      W.push(
                        '<option value="' +
                          (d === T ? A - l : 12 + A - l) +
                          '"' +
                          (A === C ? ' selected="selected"' : "") +
                          ((N && A < z.minMonth) || (Y && A > z.maxMonth)
                            ? 'disabled="disabled"'
                            : "") +
                          ">" +
                          z.i18n.months[A] +
                          "</option>"
                      );
                    for (
                      Q =
                        '<select class="datepicker-select orig-select-month" tabindex="-1">' +
                        W.join("") +
                        "</select>",
                        p.isArray(z.yearRange)
                          ? ((A = z.yearRange[0]), (R = z.yearRange[1] + 1))
                          : ((A = d - z.yearRange), (R = 1 + d + z.yearRange)),
                        W = [];
                      A < R && A <= z.maxYear;
                      A++
                    )
                      A >= z.minYear &&
                        W.push(
                          '<option value="' +
                            A +
                            '" ' +
                            (A === d ? 'selected="selected"' : "") +
                            ">" +
                            A +
                            "</option>"
                        );
                    lt =
                      '<select class="datepicker-select orig-select-year" tabindex="-1">' +
                      W.join("") +
                      "</select>";
                    const dt =
                      '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
                    (X +=
                      '<button class="month-prev' +
                      (xt ? "" : " is-disabled") +
                      '" type="button">' +
                      dt +
                      "</button>"),
                      (X += '<div class="selects-container">'),
                      z.showMonthAfterYear ? (X += lt + Q) : (X += Q + lt),
                      (X += "</div>"),
                      N && (C === 0 || z.minMonth >= C) && (xt = !1),
                      Y && (C === 11 || z.maxMonth <= C) && (bt = !1);
                    const Et =
                      '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
                    return (
                      (X +=
                        '<button class="month-next' +
                        (bt ? "" : " is-disabled") +
                        '" type="button">' +
                        Et +
                        "</button>"),
                      (X += "</div>")
                    );
                  },
                },
                {
                  key: "draw",
                  value: function (h) {
                    if (!(!this.isOpen && !h)) {
                      let l = this.options,
                        d = l.minYear,
                        C = l.maxYear,
                        T = l.minMonth,
                        L = l.maxMonth,
                        A = "",
                        R = void 0;
                      this._y <= d &&
                        ((this._y = d),
                        !isNaN(T) && this._m < T && (this._m = T)),
                        this._y >= C &&
                          ((this._y = C),
                          !isNaN(L) && this._m > L && (this._m = L)),
                        (R =
                          "datepicker-title-" +
                          Math.random()
                            .toString(36)
                            .replace(/[^a-z]+/g, "")
                            .substr(0, 2));
                      for (let W = 0; W < 1; W++)
                        this._renderDateDisplay(),
                          (A +=
                            this.renderTitle(
                              this,
                              W,
                              this.calendars[W].year,
                              this.calendars[W].month,
                              this.calendars[0].year,
                              R
                            ) +
                            this.render(
                              this.calendars[W].year,
                              this.calendars[W].month,
                              R
                            ));
                      this.destroySelects(), (this.calendarEl.innerHTML = A);
                      const z =
                          this.calendarEl.querySelector(".orig-select-year"),
                        N = this.calendarEl.querySelector(".orig-select-month");
                      M.FormSelect.init(z, {
                        classes: "select-year",
                        dropdownOptions: {
                          container: document.body,
                          constrainWidth: !1,
                        },
                      }),
                        M.FormSelect.init(N, {
                          classes: "select-month",
                          dropdownOptions: {
                            container: document.body,
                            constrainWidth: !1,
                          },
                        }),
                        z.addEventListener(
                          "change",
                          this._handleYearChange.bind(this)
                        ),
                        N.addEventListener(
                          "change",
                          this._handleMonthChange.bind(this)
                        ),
                        typeof this.options.onDraw == "function" &&
                          this.options.onDraw(this);
                    }
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleInputKeydownBound =
                      this._handleInputKeydown.bind(this)),
                      (this._handleInputClickBound =
                        this._handleInputClick.bind(this)),
                      (this._handleInputChangeBound =
                        this._handleInputChange.bind(this)),
                      (this._handleCalendarClickBound =
                        this._handleCalendarClick.bind(this)),
                      (this._finishSelectionBound =
                        this._finishSelection.bind(this)),
                      (this._handleMonthChange =
                        this._handleMonthChange.bind(this)),
                      (this._closeBound = this.close.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleInputClickBound
                      ),
                      this.el.addEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      ),
                      this.el.addEventListener(
                        "change",
                        this._handleInputChangeBound
                      ),
                      this.calendarEl.addEventListener(
                        "click",
                        this._handleCalendarClickBound
                      ),
                      this.doneBtn.addEventListener(
                        "click",
                        this._finishSelectionBound
                      ),
                      this.cancelBtn.addEventListener(
                        "click",
                        this._closeBound
                      ),
                      this.options.showClearBtn &&
                        ((this._handleClearClickBound =
                          this._handleClearClick.bind(this)),
                        this.clearBtn.addEventListener(
                          "click",
                          this._handleClearClickBound
                        ));
                  },
                },
                {
                  key: "_setupVariables",
                  value: function () {
                    const h = this;
                    (this.$modalEl = p(y._template)),
                      (this.modalEl = this.$modalEl[0]),
                      (this.calendarEl = this.modalEl.querySelector(
                        ".datepicker-calendar"
                      )),
                      (this.yearTextEl =
                        this.modalEl.querySelector(".year-text")),
                      (this.dateTextEl =
                        this.modalEl.querySelector(".date-text")),
                      this.options.showClearBtn &&
                        (this.clearBtn =
                          this.modalEl.querySelector(".datepicker-clear")),
                      (this.doneBtn =
                        this.modalEl.querySelector(".datepicker-done")),
                      (this.cancelBtn =
                        this.modalEl.querySelector(".datepicker-cancel")),
                      (this.formats = {
                        d: function () {
                          return h.date.getDate();
                        },
                        dd: function () {
                          const l = h.date.getDate();
                          return (l < 10 ? "0" : "") + l;
                        },
                        ddd: function () {
                          return h.options.i18n.weekdaysShort[h.date.getDay()];
                        },
                        dddd: function () {
                          return h.options.i18n.weekdays[h.date.getDay()];
                        },
                        m: function () {
                          return h.date.getMonth() + 1;
                        },
                        mm: function () {
                          const l = h.date.getMonth() + 1;
                          return (l < 10 ? "0" : "") + l;
                        },
                        mmm: function () {
                          return h.options.i18n.monthsShort[h.date.getMonth()];
                        },
                        mmmm: function () {
                          return h.options.i18n.months[h.date.getMonth()];
                        },
                        yy: function () {
                          return ("" + h.date.getFullYear()).slice(2);
                        },
                        yyyy: function () {
                          return h.date.getFullYear();
                        },
                      });
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "click",
                      this._handleInputClickBound
                    ),
                      this.el.removeEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      ),
                      this.el.removeEventListener(
                        "change",
                        this._handleInputChangeBound
                      ),
                      this.calendarEl.removeEventListener(
                        "click",
                        this._handleCalendarClickBound
                      );
                  },
                },
                {
                  key: "_handleInputClick",
                  value: function () {
                    this.open();
                  },
                },
                {
                  key: "_handleInputKeydown",
                  value: function (h) {
                    h.which === M.keys.ENTER &&
                      (h.preventDefault(), this.open());
                  },
                },
                {
                  key: "_handleCalendarClick",
                  value: function (h) {
                    if (this.isOpen) {
                      const l = p(h.target);
                      l.hasClass("is-disabled") ||
                        (l.hasClass("datepicker-day-button") &&
                        !l.hasClass("is-empty") &&
                        !l.parent().hasClass("is-disabled")
                          ? (this.setDate(
                              new Date(
                                h.target.getAttribute("data-year"),
                                h.target.getAttribute("data-month"),
                                h.target.getAttribute("data-day")
                              )
                            ),
                            this.options.autoClose && this._finishSelection())
                          : l.closest(".month-prev").length
                          ? this.prevMonth()
                          : l.closest(".month-next").length &&
                            this.nextMonth());
                    }
                  },
                },
                {
                  key: "_handleClearClick",
                  value: function () {
                    (this.date = null), this.setInputValue(), this.close();
                  },
                },
                {
                  key: "_handleMonthChange",
                  value: function (h) {
                    this.gotoMonth(h.target.value);
                  },
                },
                {
                  key: "_handleYearChange",
                  value: function (h) {
                    this.gotoYear(h.target.value);
                  },
                },
                {
                  key: "gotoMonth",
                  value: function (h) {
                    isNaN(h) ||
                      ((this.calendars[0].month = parseInt(h, 10)),
                      this.adjustCalendars());
                  },
                },
                {
                  key: "gotoYear",
                  value: function (h) {
                    isNaN(h) ||
                      ((this.calendars[0].year = parseInt(h, 10)),
                      this.adjustCalendars());
                  },
                },
                {
                  key: "_handleInputChange",
                  value: function (h) {
                    let l = void 0;
                    h.firedBy !== this &&
                      (this.options.parse
                        ? (l = this.options.parse(
                            this.el.value,
                            this.options.format
                          ))
                        : (l = new Date(Date.parse(this.el.value))),
                      y._isDate(l) && this.setDate(l));
                  },
                },
                {
                  key: "renderDayName",
                  value: function (h, l, d) {
                    for (l += h.firstDay; l >= 7; ) l -= 7;
                    return d ? h.i18n.weekdaysAbbrev[l] : h.i18n.weekdays[l];
                  },
                },
                {
                  key: "_finishSelection",
                  value: function () {
                    this.setInputValue(), this.close();
                  },
                },
                {
                  key: "open",
                  value: function () {
                    if (!this.isOpen)
                      return (
                        (this.isOpen = !0),
                        typeof this.options.onOpen == "function" &&
                          this.options.onOpen.call(this),
                        this.draw(),
                        this.modal.open(),
                        this
                      );
                  },
                },
                {
                  key: "close",
                  value: function () {
                    if (this.isOpen)
                      return (
                        (this.isOpen = !1),
                        typeof this.options.onClose == "function" &&
                          this.options.onClose.call(this),
                        this.modal.close(),
                        this
                      );
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "_isDate",
                  value: function (h) {
                    return (
                      /Date/.test(Object.prototype.toString.call(h)) &&
                      !isNaN(h.getTime())
                    );
                  },
                },
                {
                  key: "_isWeekend",
                  value: function (h) {
                    const l = h.getDay();
                    return l === 0 || l === 6;
                  },
                },
                {
                  key: "_setToStartOfDay",
                  value: function (h) {
                    y._isDate(h) && h.setHours(0, 0, 0, 0);
                  },
                },
                {
                  key: "_getDaysInMonth",
                  value: function (h, l) {
                    return [
                      31,
                      y._isLeapYear(h) ? 29 : 28,
                      31,
                      30,
                      31,
                      30,
                      31,
                      31,
                      30,
                      31,
                      30,
                      31,
                    ][l];
                  },
                },
                {
                  key: "_isLeapYear",
                  value: function (h) {
                    return (h % 4 === 0 && h % 100 !== 0) || h % 400 === 0;
                  },
                },
                {
                  key: "_compareDates",
                  value: function (h, l) {
                    return h.getTime() === l.getTime();
                  },
                },
                {
                  key: "_setToStartOfDay",
                  value: function (h) {
                    y._isDate(h) && h.setHours(0, 0, 0, 0);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Datepicker;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (k._template = [
        '<div class= "modal datepicker-modal">',
        '<div class="modal-content datepicker-container">',
        '<div class="datepicker-date-display">',
        '<span class="year-text"></span>',
        '<span class="date-text"></span>',
        "</div>",
        '<div class="datepicker-calendar-container">',
        '<div class="datepicker-calendar"></div>',
        '<div class="datepicker-footer">',
        '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>',
        '<div class="confirmation-btns">',
        '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>',
        '<button class="btn-flat datepicker-done waves-effect" type="button"></button>',
        "</div>",
        "</div>",
        "</div>",
        "</div>",
        "</div>",
      ].join("")),
        (M.Datepicker = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "datepicker", "M_Datepicker");
    })(cash),
    (function (p) {
      const v = {
          dialRadius: 135,
          outerRadius: 105,
          innerRadius: 70,
          tickRadius: 20,
          duration: 350,
          container: null,
          defaultTime: "now",
          fromNow: 0,
          showClearBtn: !1,
          i18n: { cancel: "Cancel", clear: "Clear", done: "Ok" },
          autoClose: !1,
          twelveHour: !0,
          vibrate: !0,
          onOpenStart: null,
          onOpenEnd: null,
          onCloseStart: null,
          onCloseEnd: null,
          onSelect: null,
        },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_Timepicker = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l.id = M.guid()),
              l._insertHTMLIntoDOM(),
              l._setupModal(),
              l._setupVariables(),
              l._setupEventHandlers(),
              l._clockSetup(),
              l._pickerSetup(),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this.modal.destroy(),
                      p(this.modalEl).remove(),
                      (this.el.M_Timepicker = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleInputKeydownBound =
                      this._handleInputKeydown.bind(this)),
                      (this._handleInputClickBound =
                        this._handleInputClick.bind(this)),
                      (this._handleClockClickStartBound =
                        this._handleClockClickStart.bind(this)),
                      (this._handleDocumentClickMoveBound =
                        this._handleDocumentClickMove.bind(this)),
                      (this._handleDocumentClickEndBound =
                        this._handleDocumentClickEnd.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleInputClickBound
                      ),
                      this.el.addEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      ),
                      this.plate.addEventListener(
                        "mousedown",
                        this._handleClockClickStartBound
                      ),
                      this.plate.addEventListener(
                        "touchstart",
                        this._handleClockClickStartBound
                      ),
                      p(this.spanHours).on(
                        "click",
                        this.showView.bind(this, "hours")
                      ),
                      p(this.spanMinutes).on(
                        "click",
                        this.showView.bind(this, "minutes")
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "click",
                      this._handleInputClickBound
                    ),
                      this.el.removeEventListener(
                        "keydown",
                        this._handleInputKeydownBound
                      );
                  },
                },
                {
                  key: "_handleInputClick",
                  value: function () {
                    this.open();
                  },
                },
                {
                  key: "_handleInputKeydown",
                  value: function (h) {
                    h.which === M.keys.ENTER &&
                      (h.preventDefault(), this.open());
                  },
                },
                {
                  key: "_handleClockClickStart",
                  value: function (h) {
                    h.preventDefault();
                    const l = this.plate.getBoundingClientRect(),
                      d = { x: l.left, y: l.top };
                    (this.x0 = d.x + this.options.dialRadius),
                      (this.y0 = d.y + this.options.dialRadius),
                      (this.moved = !1);
                    const C = y._Pos(h);
                    (this.dx = C.x - this.x0),
                      (this.dy = C.y - this.y0),
                      this.setHand(this.dx, this.dy, !1),
                      document.addEventListener(
                        "mousemove",
                        this._handleDocumentClickMoveBound
                      ),
                      document.addEventListener(
                        "touchmove",
                        this._handleDocumentClickMoveBound
                      ),
                      document.addEventListener(
                        "mouseup",
                        this._handleDocumentClickEndBound
                      ),
                      document.addEventListener(
                        "touchend",
                        this._handleDocumentClickEndBound
                      );
                  },
                },
                {
                  key: "_handleDocumentClickMove",
                  value: function (h) {
                    h.preventDefault();
                    const l = y._Pos(h),
                      d = l.x - this.x0,
                      C = l.y - this.y0;
                    (this.moved = !0), this.setHand(d, C, !1, !0);
                  },
                },
                {
                  key: "_handleDocumentClickEnd",
                  value: function (h) {
                    const l = this;
                    h.preventDefault(),
                      document.removeEventListener(
                        "mouseup",
                        this._handleDocumentClickEndBound
                      ),
                      document.removeEventListener(
                        "touchend",
                        this._handleDocumentClickEndBound
                      );
                    const d = y._Pos(h),
                      C = d.x - this.x0,
                      T = d.y - this.y0;
                    this.moved &&
                      C === this.dx &&
                      T === this.dy &&
                      this.setHand(C, T),
                      this.currentView === "hours"
                        ? this.showView("minutes", this.options.duration / 2)
                        : this.options.autoClose &&
                          (p(this.minutesView).addClass("timepicker-dial-out"),
                          setTimeout(function () {
                            l.done();
                          }, this.options.duration / 2)),
                      typeof this.options.onSelect == "function" &&
                        this.options.onSelect.call(
                          this,
                          this.hours,
                          this.minutes
                        ),
                      document.removeEventListener(
                        "mousemove",
                        this._handleDocumentClickMoveBound
                      ),
                      document.removeEventListener(
                        "touchmove",
                        this._handleDocumentClickMoveBound
                      );
                  },
                },
                {
                  key: "_insertHTMLIntoDOM",
                  value: function () {
                    (this.$modalEl = p(y._template)),
                      (this.modalEl = this.$modalEl[0]),
                      (this.modalEl.id = "modal-" + this.id);
                    const h = document.querySelector(this.options.container);
                    this.options.container && !!h
                      ? this.$modalEl.appendTo(h)
                      : this.$modalEl.insertBefore(this.el);
                  },
                },
                {
                  key: "_setupModal",
                  value: function () {
                    const h = this;
                    this.modal = M.Modal.init(this.modalEl, {
                      onOpenStart: this.options.onOpenStart,
                      onOpenEnd: this.options.onOpenEnd,
                      onCloseStart: this.options.onCloseStart,
                      onCloseEnd: function () {
                        typeof h.options.onCloseEnd == "function" &&
                          h.options.onCloseEnd.call(h),
                          (h.isOpen = !1);
                      },
                    });
                  },
                },
                {
                  key: "_setupVariables",
                  value: function () {
                    (this.currentView = "hours"),
                      (this.vibrate = navigator.vibrate
                        ? "vibrate"
                        : navigator.webkitVibrate
                        ? "webkitVibrate"
                        : null),
                      (this._canvas =
                        this.modalEl.querySelector(".timepicker-canvas")),
                      (this.plate =
                        this.modalEl.querySelector(".timepicker-plate")),
                      (this.hoursView =
                        this.modalEl.querySelector(".timepicker-hours")),
                      (this.minutesView = this.modalEl.querySelector(
                        ".timepicker-minutes"
                      )),
                      (this.spanHours = this.modalEl.querySelector(
                        ".timepicker-span-hours"
                      )),
                      (this.spanMinutes = this.modalEl.querySelector(
                        ".timepicker-span-minutes"
                      )),
                      (this.spanAmPm = this.modalEl.querySelector(
                        ".timepicker-span-am-pm"
                      )),
                      (this.footer =
                        this.modalEl.querySelector(".timepicker-footer")),
                      (this.amOrPm = "PM");
                  },
                },
                {
                  key: "_pickerSetup",
                  value: function () {
                    const h = p(
                      '<button class="btn-flat timepicker-clear waves-effect" style="visibility: hidden;" type="button" tabindex="' +
                        (this.options.twelveHour ? "3" : "1") +
                        '">' +
                        this.options.i18n.clear +
                        "</button>"
                    )
                      .appendTo(this.footer)
                      .on("click", this.clear.bind(this));
                    this.options.showClearBtn && h.css({ visibility: "" });
                    const l = p('<div class="confirmation-btns"></div>');
                    p(
                      '<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' +
                        (this.options.twelveHour ? "3" : "1") +
                        '">' +
                        this.options.i18n.cancel +
                        "</button>"
                    )
                      .appendTo(l)
                      .on("click", this.close.bind(this)),
                      p(
                        '<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' +
                          (this.options.twelveHour ? "3" : "1") +
                          '">' +
                          this.options.i18n.done +
                          "</button>"
                      )
                        .appendTo(l)
                        .on("click", this.done.bind(this)),
                      l.appendTo(this.footer);
                  },
                },
                {
                  key: "_clockSetup",
                  value: function () {
                    this.options.twelveHour &&
                      ((this.$amBtn = p('<div class="am-btn">AM</div>')),
                      (this.$pmBtn = p('<div class="pm-btn">PM</div>')),
                      this.$amBtn
                        .on("click", this._handleAmPmClick.bind(this))
                        .appendTo(this.spanAmPm),
                      this.$pmBtn
                        .on("click", this._handleAmPmClick.bind(this))
                        .appendTo(this.spanAmPm)),
                      this._buildHoursView(),
                      this._buildMinutesView(),
                      this._buildSVGClock();
                  },
                },
                {
                  key: "_buildSVGClock",
                  value: function () {
                    const h = this.options.dialRadius,
                      l = this.options.tickRadius,
                      d = h * 2,
                      C = y._createSVGEl("svg");
                    C.setAttribute("class", "timepicker-svg"),
                      C.setAttribute("width", d),
                      C.setAttribute("height", d);
                    const T = y._createSVGEl("g");
                    T.setAttribute(
                      "transform",
                      "translate(" + h + "," + h + ")"
                    );
                    const L = y._createSVGEl("circle");
                    L.setAttribute("class", "timepicker-canvas-bearing"),
                      L.setAttribute("cx", 0),
                      L.setAttribute("cy", 0),
                      L.setAttribute("r", 4);
                    const A = y._createSVGEl("line");
                    A.setAttribute("x1", 0), A.setAttribute("y1", 0);
                    const R = y._createSVGEl("circle");
                    R.setAttribute("class", "timepicker-canvas-bg"),
                      R.setAttribute("r", l),
                      T.appendChild(A),
                      T.appendChild(R),
                      T.appendChild(L),
                      C.appendChild(T),
                      this._canvas.appendChild(C),
                      (this.hand = A),
                      (this.bg = R),
                      (this.bearing = L),
                      (this.g = T);
                  },
                },
                {
                  key: "_buildHoursView",
                  value: function () {
                    const h = p('<div class="timepicker-tick"></div>');
                    if (this.options.twelveHour)
                      for (let l = 1; l < 13; l += 1) {
                        const d = h.clone(),
                          C = (l / 6) * Math.PI,
                          T = this.options.outerRadius;
                        d.css({
                          left:
                            this.options.dialRadius +
                            Math.sin(C) * T -
                            this.options.tickRadius +
                            "px",
                          top:
                            this.options.dialRadius -
                            Math.cos(C) * T -
                            this.options.tickRadius +
                            "px",
                        }),
                          d.html(l === 0 ? "00" : l),
                          this.hoursView.appendChild(d[0]);
                      }
                    else
                      for (let L = 0; L < 24; L += 1) {
                        const A = h.clone(),
                          R = (L / 6) * Math.PI,
                          W = L > 0 && L < 13,
                          z = W
                            ? this.options.innerRadius
                            : this.options.outerRadius;
                        A.css({
                          left:
                            this.options.dialRadius +
                            Math.sin(R) * z -
                            this.options.tickRadius +
                            "px",
                          top:
                            this.options.dialRadius -
                            Math.cos(R) * z -
                            this.options.tickRadius +
                            "px",
                        }),
                          A.html(L === 0 ? "00" : L),
                          this.hoursView.appendChild(A[0]);
                      }
                  },
                },
                {
                  key: "_buildMinutesView",
                  value: function () {
                    for (
                      let h = p('<div class="timepicker-tick"></div>'), l = 0;
                      l < 60;
                      l += 5
                    ) {
                      const d = h.clone(),
                        C = (l / 30) * Math.PI;
                      d.css({
                        left:
                          this.options.dialRadius +
                          Math.sin(C) * this.options.outerRadius -
                          this.options.tickRadius +
                          "px",
                        top:
                          this.options.dialRadius -
                          Math.cos(C) * this.options.outerRadius -
                          this.options.tickRadius +
                          "px",
                      }),
                        d.html(y._addLeadingZero(l)),
                        this.minutesView.appendChild(d[0]);
                    }
                  },
                },
                {
                  key: "_handleAmPmClick",
                  value: function (h) {
                    const l = p(h.target);
                    (this.amOrPm = l.hasClass("am-btn") ? "AM" : "PM"),
                      this._updateAmPmView();
                  },
                },
                {
                  key: "_updateAmPmView",
                  value: function () {
                    this.options.twelveHour &&
                      (this.$amBtn.toggleClass(
                        "text-primary",
                        this.amOrPm === "AM"
                      ),
                      this.$pmBtn.toggleClass(
                        "text-primary",
                        this.amOrPm === "PM"
                      ));
                  },
                },
                {
                  key: "_updateTimeFromInput",
                  value: function () {
                    let h = (
                      (this.el.value || this.options.defaultTime || "") + ""
                    ).split(":");
                    if (
                      (this.options.twelveHour &&
                        !(typeof h[1] > "u") &&
                        (h[1].toUpperCase().indexOf("AM") > 0
                          ? (this.amOrPm = "AM")
                          : (this.amOrPm = "PM"),
                        (h[1] = h[1].replace("AM", "").replace("PM", ""))),
                      h[0] === "now")
                    ) {
                      const l = new Date(+new Date() + this.options.fromNow);
                      (h = [l.getHours(), l.getMinutes()]),
                        this.options.twelveHour &&
                          (this.amOrPm = h[0] >= 12 && h[0] < 24 ? "PM" : "AM");
                    }
                    (this.hours = +h[0] || 0),
                      (this.minutes = +h[1] || 0),
                      (this.spanHours.innerHTML = this.hours),
                      (this.spanMinutes.innerHTML = y._addLeadingZero(
                        this.minutes
                      )),
                      this._updateAmPmView();
                  },
                },
                {
                  key: "showView",
                  value: function (h, l) {
                    h === "minutes" && p(this.hoursView).css("visibility");
                    const d = h === "hours",
                      C = d ? this.hoursView : this.minutesView,
                      T = d ? this.minutesView : this.hoursView;
                    (this.currentView = h),
                      p(this.spanHours).toggleClass("text-primary", d),
                      p(this.spanMinutes).toggleClass("text-primary", !d),
                      T.classList.add("timepicker-dial-out"),
                      p(C)
                        .css("visibility", "visible")
                        .removeClass("timepicker-dial-out"),
                      this.resetClock(l),
                      clearTimeout(this.toggleViewTimer),
                      (this.toggleViewTimer = setTimeout(function () {
                        p(T).css("visibility", "hidden");
                      }, this.options.duration));
                  },
                },
                {
                  key: "resetClock",
                  value: function (h) {
                    const l = this.currentView,
                      d = this[l],
                      C = l === "hours",
                      T = Math.PI / (C ? 6 : 30),
                      L = d * T,
                      A =
                        C && d > 0 && d < 13
                          ? this.options.innerRadius
                          : this.options.outerRadius,
                      R = Math.sin(L) * A,
                      W = -Math.cos(L) * A,
                      z = this;
                    h
                      ? (p(this.canvas).addClass("timepicker-canvas-out"),
                        setTimeout(function () {
                          p(z.canvas).removeClass("timepicker-canvas-out"),
                            z.setHand(R, W);
                        }, h))
                      : this.setHand(R, W);
                  },
                },
                {
                  key: "setHand",
                  value: function (h, l, d) {
                    let C = this,
                      T = Math.atan2(h, -l),
                      L = this.currentView === "hours",
                      A = Math.PI / (L || d ? 6 : 30),
                      R = Math.sqrt(h * h + l * l),
                      W =
                        L &&
                        R <
                          (this.options.outerRadius +
                            this.options.innerRadius) /
                            2,
                      z = W
                        ? this.options.innerRadius
                        : this.options.outerRadius;
                    this.options.twelveHour && (z = this.options.outerRadius),
                      T < 0 && (T = Math.PI * 2 + T);
                    let N = Math.round(T / A);
                    (T = N * A),
                      this.options.twelveHour
                        ? L
                          ? N === 0 && (N = 12)
                          : (d && (N *= 5), N === 60 && (N = 0))
                        : L
                        ? (N === 12 && (N = 0),
                          (N = W ? (N === 0 ? 12 : N) : N === 0 ? 0 : N + 12))
                        : (d && (N *= 5), N === 60 && (N = 0)),
                      this[this.currentView] !== N &&
                        this.vibrate &&
                        this.options.vibrate &&
                        (this.vibrateTimer ||
                          (navigator[this.vibrate](10),
                          (this.vibrateTimer = setTimeout(function () {
                            C.vibrateTimer = null;
                          }, 100)))),
                      (this[this.currentView] = N),
                      L
                        ? (this.spanHours.innerHTML = N)
                        : (this.spanMinutes.innerHTML = y._addLeadingZero(N));
                    const Y = Math.sin(T) * (z - this.options.tickRadius),
                      X = -Math.cos(T) * (z - this.options.tickRadius),
                      Q = Math.sin(T) * z,
                      lt = -Math.cos(T) * z;
                    this.hand.setAttribute("x2", Y),
                      this.hand.setAttribute("y2", X),
                      this.bg.setAttribute("cx", Q),
                      this.bg.setAttribute("cy", lt);
                  },
                },
                {
                  key: "open",
                  value: function () {
                    this.isOpen ||
                      ((this.isOpen = !0),
                      this._updateTimeFromInput(),
                      this.showView("hours"),
                      this.modal.open());
                  },
                },
                {
                  key: "close",
                  value: function () {
                    !this.isOpen || ((this.isOpen = !1), this.modal.close());
                  },
                },
                {
                  key: "done",
                  value: function (h, l) {
                    let d = this.el.value,
                      C = l
                        ? ""
                        : y._addLeadingZero(this.hours) +
                          ":" +
                          y._addLeadingZero(this.minutes);
                    (this.time = C),
                      !l &&
                        this.options.twelveHour &&
                        (C = C + " " + this.amOrPm),
                      (this.el.value = C),
                      C !== d && this.$el.trigger("change"),
                      this.close(),
                      this.el.focus();
                  },
                },
                {
                  key: "clear",
                  value: function () {
                    this.done(null, !0);
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "_addLeadingZero",
                  value: function (h) {
                    return (h < 10 ? "0" : "") + h;
                  },
                },
                {
                  key: "_createSVGEl",
                  value: function (h) {
                    const l = "http://www.w3.org/2000/svg";
                    return document.createElementNS(l, h);
                  },
                },
                {
                  key: "_Pos",
                  value: function (h) {
                    return h.targetTouches && h.targetTouches.length >= 1
                      ? {
                          x: h.targetTouches[0].clientX,
                          y: h.targetTouches[0].clientY,
                        }
                      : { x: h.clientX, y: h.clientY };
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Timepicker;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (k._template = [
        '<div class= "modal timepicker-modal">',
        '<div class="modal-content timepicker-container">',
        '<div class="timepicker-digital-display">',
        '<div class="timepicker-text-container">',
        '<div class="timepicker-display-column">',
        '<span class="timepicker-span-hours text-primary"></span>',
        ":",
        '<span class="timepicker-span-minutes"></span>',
        "</div>",
        '<div class="timepicker-display-column timepicker-display-am-pm">',
        '<div class="timepicker-span-am-pm"></div>',
        "</div>",
        "</div>",
        "</div>",
        '<div class="timepicker-analog-display">',
        '<div class="timepicker-plate">',
        '<div class="timepicker-canvas"></div>',
        '<div class="timepicker-dial timepicker-hours"></div>',
        '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>',
        "</div>",
        '<div class="timepicker-footer"></div>',
        "</div>",
        "</div>",
        "</div>",
      ].join("")),
        (M.Timepicker = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "timepicker", "M_Timepicker");
    })(cash),
    (function (p) {
      const v = {},
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_CharacterCounter = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l.isInvalid = !1),
              (l.isValidLength = !1),
              l._setupCounter(),
              l._setupEventHandlers(),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      (this.el.CharacterCounter = void 0),
                      this._removeCounter();
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleUpdateCounterBound =
                      this.updateCounter.bind(this)),
                      this.el.addEventListener(
                        "focus",
                        this._handleUpdateCounterBound,
                        !0
                      ),
                      this.el.addEventListener(
                        "input",
                        this._handleUpdateCounterBound,
                        !0
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "focus",
                      this._handleUpdateCounterBound,
                      !0
                    ),
                      this.el.removeEventListener(
                        "input",
                        this._handleUpdateCounterBound,
                        !0
                      );
                  },
                },
                {
                  key: "_setupCounter",
                  value: function () {
                    (this.counterEl = document.createElement("span")),
                      p(this.counterEl).addClass("character-counter").css({
                        float: "right",
                        "font-size": "12px",
                        height: 1,
                      }),
                      this.$el.parent().append(this.counterEl);
                  },
                },
                {
                  key: "_removeCounter",
                  value: function () {
                    p(this.counterEl).remove();
                  },
                },
                {
                  key: "updateCounter",
                  value: function () {
                    const h = +this.$el.attr("data-length"),
                      l = this.el.value.length;
                    this.isValidLength = l <= h;
                    let d = l;
                    h && ((d += "/" + h), this._validateInput()),
                      p(this.counterEl).html(d);
                  },
                },
                {
                  key: "_validateInput",
                  value: function () {
                    this.isValidLength && this.isInvalid
                      ? ((this.isInvalid = !1), this.$el.removeClass("invalid"))
                      : !this.isValidLength &&
                        !this.isInvalid &&
                        ((this.isInvalid = !0),
                        this.$el.removeClass("valid"),
                        this.$el.addClass("invalid"));
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_CharacterCounter;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (M.CharacterCounter = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(
            k,
            "characterCounter",
            "M_CharacterCounter"
          );
    })(cash),
    (function (p) {
      const v = {
          duration: 200,
          dist: -100,
          shift: 0,
          padding: 0,
          numVisible: 5,
          fullWidth: !1,
          indicators: !1,
          noWrap: !1,
          onCycleTo: null,
        },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_Carousel = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l.hasMultipleSlides = l.$el.find(".carousel-item").length > 1),
              (l.showIndicators = l.options.indicators && l.hasMultipleSlides),
              (l.noWrap = l.options.noWrap || !l.hasMultipleSlides),
              (l.pressed = !1),
              (l.dragged = !1),
              (l.offset = l.target = 0),
              (l.images = []),
              (l.itemWidth = l.$el.find(".carousel-item").first().innerWidth()),
              (l.itemHeight = l.$el
                .find(".carousel-item")
                .first()
                .innerHeight()),
              (l.dim = l.itemWidth * 2 + l.options.padding || 1),
              (l._autoScrollBound = l._autoScroll.bind(l)),
              (l._trackBound = l._track.bind(l)),
              l.options.fullWidth &&
                ((l.options.dist = 0),
                l._setCarouselHeight(),
                l.showIndicators &&
                  l.$el
                    .find(".carousel-fixed-item")
                    .addClass("with-indicators")),
              (l.$indicators = p('<ul class="indicators"></ul>')),
              l.$el.find(".carousel-item").each(function (d, C) {
                if ((l.images.push(d), l.showIndicators)) {
                  const T = p('<li class="indicator-item"></li>');
                  C === 0 && T[0].classList.add("active"),
                    l.$indicators.append(T);
                }
              }),
              l.showIndicators && l.$el.append(l.$indicators),
              (l.count = l.images.length),
              (l.options.numVisible = Math.min(l.count, l.options.numVisible)),
              (l.xform = "transform"),
              ["webkit", "Moz", "O", "ms"].every(function (d) {
                const C = d + "Transform";
                return typeof document.body.style[C] < "u"
                  ? ((l.xform = C), !1)
                  : !0;
              }),
              l._setupEventHandlers(),
              l._scroll(l.offset),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(), (this.el.M_Carousel = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    const h = this;
                    (this._handleCarouselTapBound =
                      this._handleCarouselTap.bind(this)),
                      (this._handleCarouselDragBound =
                        this._handleCarouselDrag.bind(this)),
                      (this._handleCarouselReleaseBound =
                        this._handleCarouselRelease.bind(this)),
                      (this._handleCarouselClickBound =
                        this._handleCarouselClick.bind(this)),
                      typeof window.ontouchstart < "u" &&
                        (this.el.addEventListener(
                          "touchstart",
                          this._handleCarouselTapBound
                        ),
                        this.el.addEventListener(
                          "touchmove",
                          this._handleCarouselDragBound
                        ),
                        this.el.addEventListener(
                          "touchend",
                          this._handleCarouselReleaseBound
                        )),
                      this.el.addEventListener(
                        "mousedown",
                        this._handleCarouselTapBound
                      ),
                      this.el.addEventListener(
                        "mousemove",
                        this._handleCarouselDragBound
                      ),
                      this.el.addEventListener(
                        "mouseup",
                        this._handleCarouselReleaseBound
                      ),
                      this.el.addEventListener(
                        "mouseleave",
                        this._handleCarouselReleaseBound
                      ),
                      this.el.addEventListener(
                        "click",
                        this._handleCarouselClickBound
                      ),
                      this.showIndicators &&
                        this.$indicators &&
                        ((this._handleIndicatorClickBound =
                          this._handleIndicatorClick.bind(this)),
                        this.$indicators
                          .find(".indicator-item")
                          .each(function (d, C) {
                            d.addEventListener(
                              "click",
                              h._handleIndicatorClickBound
                            );
                          }));
                    const l = M.throttle(this._handleResize, 200);
                    (this._handleThrottledResizeBound = l.bind(this)),
                      window.addEventListener(
                        "resize",
                        this._handleThrottledResizeBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    const h = this;
                    typeof window.ontouchstart < "u" &&
                      (this.el.removeEventListener(
                        "touchstart",
                        this._handleCarouselTapBound
                      ),
                      this.el.removeEventListener(
                        "touchmove",
                        this._handleCarouselDragBound
                      ),
                      this.el.removeEventListener(
                        "touchend",
                        this._handleCarouselReleaseBound
                      )),
                      this.el.removeEventListener(
                        "mousedown",
                        this._handleCarouselTapBound
                      ),
                      this.el.removeEventListener(
                        "mousemove",
                        this._handleCarouselDragBound
                      ),
                      this.el.removeEventListener(
                        "mouseup",
                        this._handleCarouselReleaseBound
                      ),
                      this.el.removeEventListener(
                        "mouseleave",
                        this._handleCarouselReleaseBound
                      ),
                      this.el.removeEventListener(
                        "click",
                        this._handleCarouselClickBound
                      ),
                      this.showIndicators &&
                        this.$indicators &&
                        this.$indicators
                          .find(".indicator-item")
                          .each(function (l, d) {
                            l.removeEventListener(
                              "click",
                              h._handleIndicatorClickBound
                            );
                          }),
                      window.removeEventListener(
                        "resize",
                        this._handleThrottledResizeBound
                      );
                  },
                },
                {
                  key: "_handleCarouselTap",
                  value: function (h) {
                    h.type === "mousedown" &&
                      p(h.target).is("img") &&
                      h.preventDefault(),
                      (this.pressed = !0),
                      (this.dragged = !1),
                      (this.verticalDragged = !1),
                      (this.reference = this._xpos(h)),
                      (this.referenceY = this._ypos(h)),
                      (this.velocity = this.amplitude = 0),
                      (this.frame = this.offset),
                      (this.timestamp = Date.now()),
                      clearInterval(this.ticker),
                      (this.ticker = setInterval(this._trackBound, 100));
                  },
                },
                {
                  key: "_handleCarouselDrag",
                  value: function (h) {
                    let l = void 0,
                      d = void 0,
                      C = void 0,
                      T = void 0;
                    if (this.pressed)
                      if (
                        ((l = this._xpos(h)),
                        (d = this._ypos(h)),
                        (C = this.reference - l),
                        (T = Math.abs(this.referenceY - d)),
                        T < 30 && !this.verticalDragged)
                      )
                        (C > 2 || C < -2) &&
                          ((this.dragged = !0),
                          (this.reference = l),
                          this._scroll(this.offset + C));
                      else {
                        if (this.dragged)
                          return h.preventDefault(), h.stopPropagation(), !1;
                        this.verticalDragged = !0;
                      }
                    if (this.dragged)
                      return h.preventDefault(), h.stopPropagation(), !1;
                  },
                },
                {
                  key: "_handleCarouselRelease",
                  value: function (h) {
                    if (this.pressed) this.pressed = !1;
                    else return;
                    return (
                      clearInterval(this.ticker),
                      (this.target = this.offset),
                      (this.velocity > 10 || this.velocity < -10) &&
                        ((this.amplitude = 0.9 * this.velocity),
                        (this.target = this.offset + this.amplitude)),
                      (this.target =
                        Math.round(this.target / this.dim) * this.dim),
                      this.noWrap &&
                        (this.target >= this.dim * (this.count - 1)
                          ? (this.target = this.dim * (this.count - 1))
                          : this.target < 0 && (this.target = 0)),
                      (this.amplitude = this.target - this.offset),
                      (this.timestamp = Date.now()),
                      requestAnimationFrame(this._autoScrollBound),
                      this.dragged && (h.preventDefault(), h.stopPropagation()),
                      !1
                    );
                  },
                },
                {
                  key: "_handleCarouselClick",
                  value: function (h) {
                    if (this.dragged)
                      return h.preventDefault(), h.stopPropagation(), !1;
                    if (!this.options.fullWidth) {
                      const l = p(h.target).closest(".carousel-item").index(),
                        d = this._wrap(this.center) - l;
                      d !== 0 && (h.preventDefault(), h.stopPropagation()),
                        this._cycleTo(l);
                    }
                  },
                },
                {
                  key: "_handleIndicatorClick",
                  value: function (h) {
                    h.stopPropagation();
                    const l = p(h.target).closest(".indicator-item");
                    l.length && this._cycleTo(l.index());
                  },
                },
                {
                  key: "_handleResize",
                  value: function (h) {
                    this.options.fullWidth
                      ? ((this.itemWidth = this.$el
                          .find(".carousel-item")
                          .first()
                          .innerWidth()),
                        (this.imageHeight = this.$el
                          .find(".carousel-item.active")
                          .height()),
                        (this.dim = this.itemWidth * 2 + this.options.padding),
                        (this.offset = this.center * 2 * this.itemWidth),
                        (this.target = this.offset),
                        this._setCarouselHeight(!0))
                      : this._scroll();
                  },
                },
                {
                  key: "_setCarouselHeight",
                  value: function (h) {
                    const l = this,
                      d = this.$el.find(".carousel-item.active").length
                        ? this.$el.find(".carousel-item.active").first()
                        : this.$el.find(".carousel-item").first(),
                      C = d.find("img").first();
                    if (C.length)
                      if (C[0].complete) {
                        const T = C.height();
                        if (T > 0) this.$el.css("height", T + "px");
                        else {
                          const L = C[0].naturalWidth,
                            A = C[0].naturalHeight,
                            R = (this.$el.width() / L) * A;
                          this.$el.css("height", R + "px");
                        }
                      } else
                        C.one("load", function (z, N) {
                          l.$el.css("height", z.offsetHeight + "px");
                        });
                    else if (!h) {
                      const W = d.height();
                      this.$el.css("height", W + "px");
                    }
                  },
                },
                {
                  key: "_xpos",
                  value: function (h) {
                    return h.targetTouches && h.targetTouches.length >= 1
                      ? h.targetTouches[0].clientX
                      : h.clientX;
                  },
                },
                {
                  key: "_ypos",
                  value: function (h) {
                    return h.targetTouches && h.targetTouches.length >= 1
                      ? h.targetTouches[0].clientY
                      : h.clientY;
                  },
                },
                {
                  key: "_wrap",
                  value: function (h) {
                    return h >= this.count
                      ? h % this.count
                      : h < 0
                      ? this._wrap(this.count + (h % this.count))
                      : h;
                  },
                },
                {
                  key: "_track",
                  value: function () {
                    let h = void 0,
                      l = void 0,
                      d = void 0,
                      C = void 0;
                    (h = Date.now()),
                      (l = h - this.timestamp),
                      (this.timestamp = h),
                      (d = this.offset - this.frame),
                      (this.frame = this.offset),
                      (C = (1e3 * d) / (1 + l)),
                      (this.velocity = 0.8 * C + 0.2 * this.velocity);
                  },
                },
                {
                  key: "_autoScroll",
                  value: function () {
                    let h = void 0,
                      l = void 0;
                    this.amplitude &&
                      ((h = Date.now() - this.timestamp),
                      (l =
                        this.amplitude * Math.exp(-h / this.options.duration)),
                      l > 2 || l < -2
                        ? (this._scroll(this.target - l),
                          requestAnimationFrame(this._autoScrollBound))
                        : this._scroll(this.target));
                  },
                },
                {
                  key: "_scroll",
                  value: function (h) {
                    const l = this;
                    this.$el.hasClass("scrolling") ||
                      this.el.classList.add("scrolling"),
                      this.scrollingTimeout != null &&
                        window.clearTimeout(this.scrollingTimeout),
                      (this.scrollingTimeout = window.setTimeout(function () {
                        l.$el.removeClass("scrolling");
                      }, this.options.duration));
                    let d = void 0,
                      C = void 0,
                      T = void 0,
                      L = void 0,
                      A = void 0,
                      R = void 0,
                      W = void 0,
                      z = void 0,
                      N = void 0,
                      Y = void 0,
                      X = this.center,
                      Q = 1 / this.options.numVisible;
                    if (
                      ((this.offset = typeof h == "number" ? h : this.offset),
                      (this.center = Math.floor(
                        (this.offset + this.dim / 2) / this.dim
                      )),
                      (T = this.offset - this.center * this.dim),
                      (L = T < 0 ? 1 : -1),
                      (A = (-L * T * 2) / this.dim),
                      (C = this.count >> 1),
                      this.options.fullWidth
                        ? ((W = "translateX(0)"), (Y = 1))
                        : ((W =
                            "translateX(" +
                            (this.el.clientWidth - this.itemWidth) / 2 +
                            "px) "),
                          (W +=
                            "translateY(" +
                            (this.el.clientHeight - this.itemHeight) / 2 +
                            "px)"),
                          (Y = 1 - Q * A)),
                      this.showIndicators)
                    ) {
                      const lt = this.center % this.count,
                        xt = this.$indicators.find(".indicator-item.active");
                      xt.index() !== lt &&
                        (xt.removeClass("active"),
                        this.$indicators
                          .find(".indicator-item")
                          .eq(lt)[0]
                          .classList.add("active"));
                    }
                    if (
                      !this.noWrap ||
                      (this.center >= 0 && this.center < this.count)
                    ) {
                      (R = this.images[this._wrap(this.center)]),
                        p(R).hasClass("active") ||
                          (this.$el
                            .find(".carousel-item")
                            .removeClass("active"),
                          R.classList.add("active"));
                      const bt =
                        W +
                        " translateX(" +
                        -T / 2 +
                        "px) translateX(" +
                        L * this.options.shift * A * d +
                        "px) translateZ(" +
                        this.options.dist * A +
                        "px)";
                      this._updateItemStyle(R, Y, 0, bt);
                    }
                    for (d = 1; d <= C; ++d) {
                      if (
                        (this.options.fullWidth
                          ? ((z = this.options.dist),
                            (N = d === C && T < 0 ? 1 - A : 1))
                          : ((z = this.options.dist * (d * 2 + A * L)),
                            (N = 1 - Q * (d * 2 + A * L))),
                        !this.noWrap || this.center + d < this.count)
                      ) {
                        R = this.images[this._wrap(this.center + d)];
                        const dt =
                          W +
                          " translateX(" +
                          (this.options.shift + (this.dim * d - T) / 2) +
                          "px) translateZ(" +
                          z +
                          "px)";
                        this._updateItemStyle(R, N, -d, dt);
                      }
                      if (
                        (this.options.fullWidth
                          ? ((z = this.options.dist),
                            (N = d === C && T > 0 ? 1 - A : 1))
                          : ((z = this.options.dist * (d * 2 - A * L)),
                            (N = 1 - Q * (d * 2 - A * L))),
                        !this.noWrap || this.center - d >= 0)
                      ) {
                        R = this.images[this._wrap(this.center - d)];
                        const Et =
                          W +
                          " translateX(" +
                          (-this.options.shift + (-this.dim * d - T) / 2) +
                          "px) translateZ(" +
                          z +
                          "px)";
                        this._updateItemStyle(R, N, -d, Et);
                      }
                    }
                    if (
                      !this.noWrap ||
                      (this.center >= 0 && this.center < this.count)
                    ) {
                      R = this.images[this._wrap(this.center)];
                      const St =
                        W +
                        " translateX(" +
                        -T / 2 +
                        "px) translateX(" +
                        L * this.options.shift * A +
                        "px) translateZ(" +
                        this.options.dist * A +
                        "px)";
                      this._updateItemStyle(R, Y, 0, St);
                    }
                    const K = this.$el
                      .find(".carousel-item")
                      .eq(this._wrap(this.center));
                    X !== this.center &&
                      typeof this.options.onCycleTo == "function" &&
                      this.options.onCycleTo.call(this, K[0], this.dragged),
                      typeof this.oneTimeCallback == "function" &&
                        (this.oneTimeCallback.call(this, K[0], this.dragged),
                        (this.oneTimeCallback = null));
                  },
                },
                {
                  key: "_updateItemStyle",
                  value: function (h, l, d, C) {
                    (h.style[this.xform] = C),
                      (h.style.zIndex = d),
                      (h.style.opacity = l),
                      (h.style.visibility = "visible");
                  },
                },
                {
                  key: "_cycleTo",
                  value: function (h, l) {
                    let d = (this.center % this.count) - h;
                    this.noWrap ||
                      (d < 0
                        ? Math.abs(d + this.count) < Math.abs(d) &&
                          (d += this.count)
                        : d > 0 &&
                          Math.abs(d - this.count) < d &&
                          (d -= this.count)),
                      (this.target =
                        this.dim * Math.round(this.offset / this.dim)),
                      d < 0
                        ? (this.target += this.dim * Math.abs(d))
                        : d > 0 && (this.target -= this.dim * d),
                      typeof l == "function" && (this.oneTimeCallback = l),
                      this.offset !== this.target &&
                        ((this.amplitude = this.target - this.offset),
                        (this.timestamp = Date.now()),
                        requestAnimationFrame(this._autoScrollBound));
                  },
                },
                {
                  key: "next",
                  value: function (h) {
                    (h === void 0 || isNaN(h)) && (h = 1);
                    let l = this.center + h;
                    if (l >= this.count || l < 0) {
                      if (this.noWrap) return;
                      l = this._wrap(l);
                    }
                    this._cycleTo(l);
                  },
                },
                {
                  key: "prev",
                  value: function (h) {
                    (h === void 0 || isNaN(h)) && (h = 1);
                    let l = this.center - h;
                    if (l >= this.count || l < 0) {
                      if (this.noWrap) return;
                      l = this._wrap(l);
                    }
                    this._cycleTo(l);
                  },
                },
                {
                  key: "set",
                  value: function (h, l) {
                    if (
                      ((h === void 0 || isNaN(h)) && (h = 0),
                      h > this.count || h < 0)
                    ) {
                      if (this.noWrap) return;
                      h = this._wrap(h);
                    }
                    this._cycleTo(h, l);
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_Carousel;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (M.Carousel = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "carousel", "M_Carousel");
    })(cash),
    (function (p) {
      const v = { onOpen: void 0, onClose: void 0 },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return (
              (l.el.M_TapTarget = l),
              (l.options = p.extend({}, y.defaults, h)),
              (l.isOpen = !1),
              (l.$origin = p("#" + l.$el.attr("data-target"))),
              l._setup(),
              l._calculatePositioning(),
              l._setupEventHandlers(),
              l
            );
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(), (this.el.TapTarget = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleDocumentClickBound =
                      this._handleDocumentClick.bind(this)),
                      (this._handleTargetClickBound =
                        this._handleTargetClick.bind(this)),
                      (this._handleOriginClickBound =
                        this._handleOriginClick.bind(this)),
                      this.el.addEventListener(
                        "click",
                        this._handleTargetClickBound
                      ),
                      this.originEl.addEventListener(
                        "click",
                        this._handleOriginClickBound
                      );
                    const h = M.throttle(this._handleResize, 200);
                    (this._handleThrottledResizeBound = h.bind(this)),
                      window.addEventListener(
                        "resize",
                        this._handleThrottledResizeBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "click",
                      this._handleTargetClickBound
                    ),
                      this.originEl.removeEventListener(
                        "click",
                        this._handleOriginClickBound
                      ),
                      window.removeEventListener(
                        "resize",
                        this._handleThrottledResizeBound
                      );
                  },
                },
                {
                  key: "_handleTargetClick",
                  value: function (h) {
                    this.open();
                  },
                },
                {
                  key: "_handleOriginClick",
                  value: function (h) {
                    this.close();
                  },
                },
                {
                  key: "_handleResize",
                  value: function (h) {
                    this._calculatePositioning();
                  },
                },
                {
                  key: "_handleDocumentClick",
                  value: function (h) {
                    p(h.target).closest(".tap-target-wrapper").length ||
                      (this.close(), h.preventDefault(), h.stopPropagation());
                  },
                },
                {
                  key: "_setup",
                  value: function () {
                    (this.wrapper = this.$el.parent()[0]),
                      (this.waveEl = p(this.wrapper).find(
                        ".tap-target-wave"
                      )[0]),
                      (this.originEl = p(this.wrapper).find(
                        ".tap-target-origin"
                      )[0]),
                      (this.contentEl = this.$el.find(
                        ".tap-target-content"
                      )[0]),
                      p(this.wrapper).hasClass(".tap-target-wrapper") ||
                        ((this.wrapper = document.createElement("div")),
                        this.wrapper.classList.add("tap-target-wrapper"),
                        this.$el.before(p(this.wrapper)),
                        this.wrapper.append(this.el)),
                      this.contentEl ||
                        ((this.contentEl = document.createElement("div")),
                        this.contentEl.classList.add("tap-target-content"),
                        this.$el.append(this.contentEl)),
                      this.waveEl ||
                        ((this.waveEl = document.createElement("div")),
                        this.waveEl.classList.add("tap-target-wave"),
                        this.originEl ||
                          ((this.originEl = this.$origin.clone(!0, !0)),
                          this.originEl.addClass("tap-target-origin"),
                          this.originEl.removeAttr("id"),
                          this.originEl.removeAttr("style"),
                          (this.originEl = this.originEl[0]),
                          this.waveEl.append(this.originEl)),
                        this.wrapper.append(this.waveEl));
                  },
                },
                {
                  key: "_calculatePositioning",
                  value: function () {
                    let h = this.$origin.css("position") === "fixed";
                    if (!h)
                      for (
                        let l = this.$origin.parents(), d = 0;
                        d < l.length &&
                        ((h = p(l[d]).css("position") == "fixed"), !h);
                        d++
                      );
                    const C = this.$origin.outerWidth(),
                      T = this.$origin.outerHeight(),
                      L = h
                        ? this.$origin.offset().top - M.getDocumentScrollTop()
                        : this.$origin.offset().top,
                      A = h
                        ? this.$origin.offset().left - M.getDocumentScrollLeft()
                        : this.$origin.offset().left,
                      R = window.innerWidth,
                      W = window.innerHeight,
                      z = R / 2,
                      N = W / 2,
                      Y = A <= z,
                      X = A > z,
                      Q = L <= N,
                      lt = L > N,
                      xt = A >= R * 0.25 && A <= R * 0.75,
                      bt = this.$el.outerWidth(),
                      dt = this.$el.outerHeight(),
                      Et = L + T / 2 - dt / 2,
                      St = A + C / 2 - bt / 2,
                      K = h ? "fixed" : "absolute",
                      st = xt ? bt : bt / 2 + C,
                      it = dt / 2,
                      rt = Q ? dt / 2 : 0,
                      gt = 0,
                      wt = Y && !xt ? bt / 2 - C : 0,
                      at = 0,
                      ut = C,
                      P = lt ? "bottom" : "top",
                      B = (C > T, C * 2),
                      V = B,
                      j = dt / 2 - V / 2,
                      U = bt / 2 - B / 2,
                      Z = {};
                    (Z.top = Q ? Et + "px" : ""),
                      (Z.right = X ? R - St - bt + "px" : ""),
                      (Z.bottom = lt ? W - Et - dt + "px" : ""),
                      (Z.left = Y ? St + "px" : ""),
                      (Z.position = K),
                      p(this.wrapper).css(Z),
                      p(this.contentEl).css({
                        width: st + "px",
                        height: it + "px",
                        top: rt + "px",
                        right: at + "px",
                        bottom: gt + "px",
                        left: wt + "px",
                        padding: ut + "px",
                        verticalAlign: P,
                      }),
                      p(this.waveEl).css({
                        top: j + "px",
                        left: U + "px",
                        width: B + "px",
                        height: V + "px",
                      });
                  },
                },
                {
                  key: "open",
                  value: function () {
                    this.isOpen ||
                      (typeof this.options.onOpen == "function" &&
                        this.options.onOpen.call(this, this.$origin[0]),
                      (this.isOpen = !0),
                      this.wrapper.classList.add("open"),
                      document.body.addEventListener(
                        "click",
                        this._handleDocumentClickBound,
                        !0
                      ),
                      document.body.addEventListener(
                        "touchend",
                        this._handleDocumentClickBound
                      ));
                  },
                },
                {
                  key: "close",
                  value: function () {
                    !this.isOpen ||
                      (typeof this.options.onClose == "function" &&
                        this.options.onClose.call(this, this.$origin[0]),
                      (this.isOpen = !1),
                      this.wrapper.classList.remove("open"),
                      document.body.removeEventListener(
                        "click",
                        this._handleDocumentClickBound,
                        !0
                      ),
                      document.body.removeEventListener(
                        "touchend",
                        this._handleDocumentClickBound
                      ));
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_TapTarget;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (M.TapTarget = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "tapTarget", "M_TapTarget");
    })(cash),
    (function (p) {
      const v = { classes: "", dropdownOptions: {} },
        k = (function (E) {
          o(y, E);
          function y(g, h) {
            r(this, y);
            const l = s(
              this,
              (y.__proto__ || Object.getPrototypeOf(y)).call(this, y, g, h)
            );
            return l.$el.hasClass("browser-default")
              ? s(l)
              : ((l.el.M_FormSelect = l),
                (l.options = p.extend({}, y.defaults, h)),
                (l.isMultiple = l.$el.prop("multiple")),
                (l.el.tabIndex = -1),
                (l._keysSelected = {}),
                (l._valueDict = {}),
                l._setupDropdown(),
                l._setupEventHandlers(),
                l);
          }
          return (
            n(
              y,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this._removeDropdown(),
                      (this.el.M_FormSelect = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    const h = this;
                    (this._handleSelectChangeBound =
                      this._handleSelectChange.bind(this)),
                      (this._handleOptionClickBound =
                        this._handleOptionClick.bind(this)),
                      (this._handleInputClickBound =
                        this._handleInputClick.bind(this)),
                      p(this.dropdownOptions)
                        .find("li:not(.optgroup)")
                        .each(function (l) {
                          l.addEventListener(
                            "click",
                            h._handleOptionClickBound
                          );
                        }),
                      this.el.addEventListener(
                        "change",
                        this._handleSelectChangeBound
                      ),
                      this.input.addEventListener(
                        "click",
                        this._handleInputClickBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    const h = this;
                    p(this.dropdownOptions)
                      .find("li:not(.optgroup)")
                      .each(function (l) {
                        l.removeEventListener(
                          "click",
                          h._handleOptionClickBound
                        );
                      }),
                      this.el.removeEventListener(
                        "change",
                        this._handleSelectChangeBound
                      ),
                      this.input.removeEventListener(
                        "click",
                        this._handleInputClickBound
                      );
                  },
                },
                {
                  key: "_handleSelectChange",
                  value: function (h) {
                    this._setValueToInput();
                  },
                },
                {
                  key: "_handleOptionClick",
                  value: function (h) {
                    h.preventDefault();
                    const l = p(h.target).closest("li")[0],
                      d = l.id;
                    if (
                      !p(l).hasClass("disabled") &&
                      !p(l).hasClass("optgroup") &&
                      d.length
                    ) {
                      let C = !0;
                      if (this.isMultiple) {
                        const T = p(this.dropdownOptions).find(
                          "li.disabled.selected"
                        );
                        T.length &&
                          (T.removeClass("selected"),
                          T.find('input[type="checkbox"]').prop("checked", !1),
                          this._toggleEntryFromArray(T[0].id)),
                          (C = this._toggleEntryFromArray(d));
                      } else
                        p(this.dropdownOptions)
                          .find("li")
                          .removeClass("selected"),
                          p(l).toggleClass("selected", C);
                      const L = p(this._valueDict[d].el).prop("selected");
                      L !== C &&
                        (p(this._valueDict[d].el).prop("selected", C),
                        this.$el.trigger("change"));
                    }
                    h.stopPropagation();
                  },
                },
                {
                  key: "_handleInputClick",
                  value: function () {
                    this.dropdown &&
                      this.dropdown.isOpen &&
                      (this._setValueToInput(), this._setSelectedStates());
                  },
                },
                {
                  key: "_setupDropdown",
                  value: function () {
                    const h = this;
                    (this.wrapper = document.createElement("div")),
                      p(this.wrapper).addClass(
                        "select-wrapper " + this.options.classes
                      ),
                      this.$el.before(p(this.wrapper)),
                      this.wrapper.appendChild(this.el),
                      this.el.disabled &&
                        this.wrapper.classList.add("disabled"),
                      (this.$selectOptions =
                        this.$el.children("option, optgroup")),
                      (this.dropdownOptions = document.createElement("ul")),
                      (this.dropdownOptions.id = "select-options-" + M.guid()),
                      p(this.dropdownOptions).addClass(
                        "dropdown-content select-dropdown " +
                          (this.isMultiple ? "multiple-select-dropdown" : "")
                      ),
                      this.$selectOptions.length &&
                        this.$selectOptions.each(function (C) {
                          if (p(C).is("option")) {
                            let T = void 0;
                            h.isMultiple
                              ? (T = h._appendOptionWithIcon(
                                  h.$el,
                                  C,
                                  "multiple"
                                ))
                              : (T = h._appendOptionWithIcon(h.$el, C)),
                              h._addOptionToValueDict(C, T);
                          } else if (p(C).is("optgroup")) {
                            const L = p(C).children("option");
                            p(h.dropdownOptions).append(
                              p(
                                '<li class="optgroup"><span>' +
                                  C.getAttribute("label") +
                                  "</span></li>"
                              )[0]
                            ),
                              L.each(function (A) {
                                const R = h._appendOptionWithIcon(
                                  h.$el,
                                  A,
                                  "optgroup-option"
                                );
                                h._addOptionToValueDict(A, R);
                              });
                          }
                        }),
                      this.$el.after(this.dropdownOptions),
                      (this.input = document.createElement("input")),
                      p(this.input).addClass(
                        "select-dropdown dropdown-trigger"
                      ),
                      this.input.setAttribute("type", "text"),
                      this.input.setAttribute("readonly", "true"),
                      this.input.setAttribute(
                        "data-target",
                        this.dropdownOptions.id
                      ),
                      this.el.disabled &&
                        p(this.input).prop("disabled", "true"),
                      this.$el.before(this.input),
                      this._setValueToInput();
                    const l = p(
                      '<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                    );
                    if ((this.$el.before(l[0]), !this.el.disabled)) {
                      const d = p.extend({}, this.options.dropdownOptions);
                      (d.onOpenEnd = function (C) {
                        const T = p(h.dropdownOptions)
                          .find(".selected")
                          .first();
                        if (h.dropdown.isScrollable && T.length) {
                          let L =
                            T[0].getBoundingClientRect().top -
                            h.dropdownOptions.getBoundingClientRect().top;
                          (L -= h.dropdownOptions.clientHeight / 2),
                            (h.dropdownOptions.scrollTop = L);
                        }
                      }),
                        this.isMultiple && (d.closeOnClick = !1),
                        (this.dropdown = M.Dropdown.init(this.input, d));
                    }
                    this._setSelectedStates();
                  },
                },
                {
                  key: "_addOptionToValueDict",
                  value: function (h, l) {
                    const d = Object.keys(this._valueDict).length,
                      C = this.dropdownOptions.id + d,
                      T = {};
                    (l.id = C),
                      (T.el = h),
                      (T.optionEl = l),
                      (this._valueDict[C] = T);
                  },
                },
                {
                  key: "_removeDropdown",
                  value: function () {
                    p(this.wrapper).find(".caret").remove(),
                      p(this.input).remove(),
                      p(this.dropdownOptions).remove(),
                      p(this.wrapper).before(this.$el),
                      p(this.wrapper).remove();
                  },
                },
                {
                  key: "_appendOptionWithIcon",
                  value: function (h, l, d) {
                    const C = l.disabled ? "disabled " : "",
                      T = d === "optgroup-option" ? "optgroup-option " : "",
                      L = this.isMultiple
                        ? '<label><input type="checkbox"' +
                          C +
                          '"/><span>' +
                          l.innerHTML +
                          "</span></label>"
                        : l.innerHTML,
                      A = p("<li></li>"),
                      R = p("<span></span>");
                    R.html(L), A.addClass(C + " " + T), A.append(R);
                    const W = l.getAttribute("data-icon");
                    if (W) {
                      const z = p('<img alt="" src="' + W + '">');
                      A.prepend(z);
                    }
                    return p(this.dropdownOptions).append(A[0]), A[0];
                  },
                },
                {
                  key: "_toggleEntryFromArray",
                  value: function (h) {
                    const l = !this._keysSelected.hasOwnProperty(h),
                      d = p(this._valueDict[h].optionEl);
                    return (
                      l
                        ? (this._keysSelected[h] = !0)
                        : delete this._keysSelected[h],
                      d.toggleClass("selected", l),
                      d.find('input[type="checkbox"]').prop("checked", l),
                      d.prop("selected", l),
                      l
                    );
                  },
                },
                {
                  key: "_setValueToInput",
                  value: function () {
                    const h = [],
                      l = this.$el.find("option");
                    if (
                      (l.each(function (C) {
                        if (p(C).prop("selected")) {
                          const T = p(C).text();
                          h.push(T);
                        }
                      }),
                      !h.length)
                    ) {
                      const d = this.$el.find("option:disabled").eq(0);
                      d.length && d[0].value === "" && h.push(d.text());
                    }
                    this.input.value = h.join(", ");
                  },
                },
                {
                  key: "_setSelectedStates",
                  value: function () {
                    this._keysSelected = {};
                    for (const h in this._valueDict) {
                      const l = this._valueDict[h],
                        d = p(l.el).prop("selected");
                      p(l.optionEl)
                        .find('input[type="checkbox"]')
                        .prop("checked", d),
                        d
                          ? (this._activateOption(
                              p(this.dropdownOptions),
                              p(l.optionEl)
                            ),
                            (this._keysSelected[h] = !0))
                          : p(l.optionEl).removeClass("selected");
                    }
                  },
                },
                {
                  key: "_activateOption",
                  value: function (h, l) {
                    if (l) {
                      this.isMultiple ||
                        h.find("li.selected").removeClass("selected");
                      const d = p(l);
                      d.addClass("selected");
                    }
                  },
                },
                {
                  key: "getSelectedValues",
                  value: function () {
                    const h = [];
                    for (const l in this._keysSelected)
                      h.push(this._valueDict[l].el.value);
                    return h;
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (h, l) {
                    return i(
                      y.__proto__ || Object.getPrototypeOf(y),
                      "init",
                      this
                    ).call(this, this, h, l);
                  },
                },
                {
                  key: "getInstance",
                  value: function (h) {
                    const l = h.jquery ? h[0] : h;
                    return l.M_FormSelect;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return v;
                  },
                },
              ]
            ),
            y
          );
        })(a);
      (M.FormSelect = k),
        M.jQueryLoaded &&
          M.initializeJqueryWrapper(k, "formSelect", "M_FormSelect");
    })(cash),
    (function (p, v) {
      const k = {},
        E = (function (y) {
          o(g, y);
          function g(h, l) {
            r(this, g);
            const d = s(
              this,
              (g.__proto__ || Object.getPrototypeOf(g)).call(this, g, h, l)
            );
            return (
              (d.el.M_Range = d),
              (d.options = p.extend({}, g.defaults, l)),
              (d._mousedown = !1),
              d._setupThumb(),
              d._setupEventHandlers(),
              d
            );
          }
          return (
            n(
              g,
              [
                {
                  key: "destroy",
                  value: function () {
                    this._removeEventHandlers(),
                      this._removeThumb(),
                      (this.el.M_Range = void 0);
                  },
                },
                {
                  key: "_setupEventHandlers",
                  value: function () {
                    (this._handleRangeChangeBound =
                      this._handleRangeChange.bind(this)),
                      (this._handleRangeMousedownTouchstartBound =
                        this._handleRangeMousedownTouchstart.bind(this)),
                      (this._handleRangeInputMousemoveTouchmoveBound =
                        this._handleRangeInputMousemoveTouchmove.bind(this)),
                      (this._handleRangeMouseupTouchendBound =
                        this._handleRangeMouseupTouchend.bind(this)),
                      (this._handleRangeBlurMouseoutTouchleaveBound =
                        this._handleRangeBlurMouseoutTouchleave.bind(this)),
                      this.el.addEventListener(
                        "change",
                        this._handleRangeChangeBound
                      ),
                      this.el.addEventListener(
                        "mousedown",
                        this._handleRangeMousedownTouchstartBound
                      ),
                      this.el.addEventListener(
                        "touchstart",
                        this._handleRangeMousedownTouchstartBound
                      ),
                      this.el.addEventListener(
                        "input",
                        this._handleRangeInputMousemoveTouchmoveBound
                      ),
                      this.el.addEventListener(
                        "mousemove",
                        this._handleRangeInputMousemoveTouchmoveBound
                      ),
                      this.el.addEventListener(
                        "touchmove",
                        this._handleRangeInputMousemoveTouchmoveBound
                      ),
                      this.el.addEventListener(
                        "mouseup",
                        this._handleRangeMouseupTouchendBound
                      ),
                      this.el.addEventListener(
                        "touchend",
                        this._handleRangeMouseupTouchendBound
                      ),
                      this.el.addEventListener(
                        "blur",
                        this._handleRangeBlurMouseoutTouchleaveBound
                      ),
                      this.el.addEventListener(
                        "mouseout",
                        this._handleRangeBlurMouseoutTouchleaveBound
                      ),
                      this.el.addEventListener(
                        "touchleave",
                        this._handleRangeBlurMouseoutTouchleaveBound
                      );
                  },
                },
                {
                  key: "_removeEventHandlers",
                  value: function () {
                    this.el.removeEventListener(
                      "change",
                      this._handleRangeChangeBound
                    ),
                      this.el.removeEventListener(
                        "mousedown",
                        this._handleRangeMousedownTouchstartBound
                      ),
                      this.el.removeEventListener(
                        "touchstart",
                        this._handleRangeMousedownTouchstartBound
                      ),
                      this.el.removeEventListener(
                        "input",
                        this._handleRangeInputMousemoveTouchmoveBound
                      ),
                      this.el.removeEventListener(
                        "mousemove",
                        this._handleRangeInputMousemoveTouchmoveBound
                      ),
                      this.el.removeEventListener(
                        "touchmove",
                        this._handleRangeInputMousemoveTouchmoveBound
                      ),
                      this.el.removeEventListener(
                        "mouseup",
                        this._handleRangeMouseupTouchendBound
                      ),
                      this.el.removeEventListener(
                        "touchend",
                        this._handleRangeMouseupTouchendBound
                      ),
                      this.el.removeEventListener(
                        "blur",
                        this._handleRangeBlurMouseoutTouchleaveBound
                      ),
                      this.el.removeEventListener(
                        "mouseout",
                        this._handleRangeBlurMouseoutTouchleaveBound
                      ),
                      this.el.removeEventListener(
                        "touchleave",
                        this._handleRangeBlurMouseoutTouchleaveBound
                      );
                  },
                },
                {
                  key: "_handleRangeChange",
                  value: function () {
                    p(this.value).html(this.$el.val()),
                      p(this.thumb).hasClass("active") ||
                        this._showRangeBubble();
                    const l = this._calcRangeOffset();
                    p(this.thumb)
                      .addClass("active")
                      .css("left", l + "px");
                  },
                },
                {
                  key: "_handleRangeMousedownTouchstart",
                  value: function (l) {
                    if (
                      (p(this.value).html(this.$el.val()),
                      (this._mousedown = !0),
                      this.$el.addClass("active"),
                      p(this.thumb).hasClass("active") ||
                        this._showRangeBubble(),
                      l.type !== "input")
                    ) {
                      const d = this._calcRangeOffset();
                      p(this.thumb)
                        .addClass("active")
                        .css("left", d + "px");
                    }
                  },
                },
                {
                  key: "_handleRangeInputMousemoveTouchmove",
                  value: function () {
                    if (this._mousedown) {
                      p(this.thumb).hasClass("active") ||
                        this._showRangeBubble();
                      const l = this._calcRangeOffset();
                      p(this.thumb)
                        .addClass("active")
                        .css("left", l + "px"),
                        p(this.value).html(this.$el.val());
                    }
                  },
                },
                {
                  key: "_handleRangeMouseupTouchend",
                  value: function () {
                    (this._mousedown = !1), this.$el.removeClass("active");
                  },
                },
                {
                  key: "_handleRangeBlurMouseoutTouchleave",
                  value: function () {
                    if (!this._mousedown) {
                      const l = parseInt(this.$el.css("padding-left")),
                        d = 7 + l + "px";
                      p(this.thumb).hasClass("active") &&
                        (v.remove(this.thumb),
                        v({
                          targets: this.thumb,
                          height: 0,
                          width: 0,
                          top: 10,
                          easing: "easeOutQuad",
                          marginLeft: d,
                          duration: 100,
                        })),
                        p(this.thumb).removeClass("active");
                    }
                  },
                },
                {
                  key: "_setupThumb",
                  value: function () {
                    (this.thumb = document.createElement("span")),
                      (this.value = document.createElement("span")),
                      p(this.thumb).addClass("thumb"),
                      p(this.value).addClass("value"),
                      p(this.thumb).append(this.value),
                      this.$el.after(this.thumb);
                  },
                },
                {
                  key: "_removeThumb",
                  value: function () {
                    p(this.thumb).remove();
                  },
                },
                {
                  key: "_showRangeBubble",
                  value: function () {
                    const l = parseInt(
                        p(this.thumb).parent().css("padding-left")
                      ),
                      d = -7 + l + "px";
                    v.remove(this.thumb),
                      v({
                        targets: this.thumb,
                        height: 30,
                        width: 30,
                        top: -30,
                        marginLeft: d,
                        duration: 300,
                        easing: "easeOutQuint",
                      });
                  },
                },
                {
                  key: "_calcRangeOffset",
                  value: function () {
                    const l = this.$el.width() - 15,
                      d = parseFloat(this.$el.attr("max")) || 100,
                      C = parseFloat(this.$el.attr("min")) || 0,
                      T = (parseFloat(this.$el.val()) - C) / (d - C);
                    return T * l;
                  },
                },
              ],
              [
                {
                  key: "init",
                  value: function (l, d) {
                    return i(
                      g.__proto__ || Object.getPrototypeOf(g),
                      "init",
                      this
                    ).call(this, this, l, d);
                  },
                },
                {
                  key: "getInstance",
                  value: function (l) {
                    const d = l.jquery ? l[0] : l;
                    return d.M_Range;
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return k;
                  },
                },
              ]
            ),
            g
          );
        })(a);
      (M.Range = E),
        M.jQueryLoaded && M.initializeJqueryWrapper(E, "range", "M_Range"),
        E.init(p("input[type=range]"));
    })(cash, M.anime);
})(lr, lr.exports);
const fn = lr.exports,
  ap = { class: "row" },
  lp = { class: "col s2" },
  cp = { class: "col s10" },
  hp = Vt({
    __name: "App",
    setup(e) {
      return (
        $i(() => {
          fn.AutoInit();
        }),
        (t, i) => {
          const n = nh("RouterView");
          return (
            ft(), vt("div", ap, [F("div", lp, [Tt(rp)]), F("div", cp, [Tt(n)])])
          );
        }
      );
    },
  });
const up = _i(hp, [["__scopeId", "data-v-99ada351"]]);
/*!
 * vue-router v4.1.3
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Yi = typeof window < "u";
function dp(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const It = Object.assign;
function Do(e, t) {
  const i = {};
  for (const n in t) {
    const s = t[n];
    i[n] = Se(s) ? s.map(e) : e(s);
  }
  return i;
}
const An = () => {},
  Se = Array.isArray,
  fp = /\/$/,
  pp = (e) => e.replace(fp, "");
function Lo(e, t, i = "/") {
  let n,
    s = {},
    o = "",
    r = "";
  const a = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    a < c && a >= 0 && (c = -1),
    c > -1 &&
      ((n = t.slice(0, c)),
      (o = t.slice(c + 1, a > -1 ? a : t.length)),
      (s = e(o))),
    a > -1 && ((n = n || t.slice(0, a)), (r = t.slice(a, t.length))),
    (n = _p(n != null ? n : t, i)),
    { fullPath: n + (o && "?") + o + r, path: n, query: s, hash: r }
  );
}
function gp(e, t) {
  const i = t.query ? e(t.query) : "";
  return t.path + (i && "?") + i + (t.hash || "");
}
function ja(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function mp(e, t, i) {
  const n = t.matched.length - 1,
    s = i.matched.length - 1;
  return (
    n > -1 &&
    n === s &&
    sn(t.matched[n], i.matched[s]) &&
    xh(t.params, i.params) &&
    e(t.query) === e(i.query) &&
    t.hash === i.hash
  );
}
function sn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function xh(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const i in e) if (!vp(e[i], t[i])) return !1;
  return !0;
}
function vp(e, t) {
  return Se(e) ? qa(e, t) : Se(t) ? qa(t, e) : e === t;
}
function qa(e, t) {
  return Se(t)
    ? e.length === t.length && e.every((i, n) => i === t[n])
    : e.length === 1 && e[0] === t;
}
function _p(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const i = t.split("/"),
    n = e.split("/");
  let s = i.length - 1,
    o,
    r;
  for (o = 0; o < n.length; o++)
    if (((r = n[o]), r !== "."))
      if (r === "..") s > 1 && s--;
      else break;
  return (
    i.slice(0, s).join("/") +
    "/" +
    n.slice(o - (o === n.length ? 1 : 0)).join("/")
  );
}
let Un;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Un || (Un = {}));
let In;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(In || (In = {}));
function yp(e) {
  if (!e)
    if (Yi) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), pp(e);
}
const bp = /^[^#]+#/;
function xp(e, t) {
  return e.replace(bp, "#") + t;
}
function wp(e, t) {
  const i = document.documentElement.getBoundingClientRect(),
    n = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: n.left - i.left - (t.left || 0),
    top: n.top - i.top - (t.top || 0),
  };
}
const ho = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function kp(e) {
  let t;
  if ("el" in e) {
    const i = e.el,
      n = typeof i == "string" && i.startsWith("#"),
      s =
        typeof i == "string"
          ? n
            ? document.getElementById(i.slice(1))
            : document.querySelector(i)
          : i;
    if (!s) return;
    t = wp(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Ka(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const cr = new Map();
function Cp(e, t) {
  cr.set(e, t);
}
function Mp(e) {
  const t = cr.get(e);
  return cr.delete(e), t;
}
const Ep = () => location.protocol + "//" + location.host;
function wh(e, t) {
  const { pathname: i, search: n, hash: s } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let a = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = s.slice(a);
    return c[0] !== "/" && (c = "/" + c), ja(c, "");
  }
  return ja(i, e) + n + s;
}
function Sp(e, t, i, n) {
  let s = [],
    o = [],
    r = null;
  const a = ({ state: b }) => {
    const x = wh(e, location),
      S = i.value,
      p = t.value;
    let v = 0;
    if (b) {
      if (((i.value = x), (t.value = b), r && r === S)) {
        r = null;
        return;
      }
      v = p ? b.position - p.position : 0;
    } else n(x);
    s.forEach((k) => {
      k(i.value, S, {
        delta: v,
        type: Un.pop,
        direction: v ? (v > 0 ? In.forward : In.back) : In.unknown,
      });
    });
  };
  function c() {
    r = i.value;
  }
  function u(b) {
    s.push(b);
    const x = () => {
      const S = s.indexOf(b);
      S > -1 && s.splice(S, 1);
    };
    return o.push(x), x;
  }
  function f() {
    const { history: b } = window;
    !b.state || b.replaceState(It({}, b.state, { scroll: ho() }), "");
  }
  function m() {
    for (const b of o) b();
    (o = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", f);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", f),
    { pauseListeners: c, listen: u, destroy: m }
  );
}
function Ya(e, t, i, n = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: i,
    replaced: n,
    position: window.history.length,
    scroll: s ? ho() : null,
  };
}
function Op(e) {
  const { history: t, location: i } = window,
    n = { value: wh(e, i) },
    s = { value: t.state };
  s.value ||
    o(
      n.value,
      {
        back: null,
        current: n.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(c, u, f) {
    const m = e.indexOf("#"),
      b =
        m > -1
          ? (i.host && document.querySelector("base") ? e : e.slice(m)) + c
          : Ep() + e + c;
    try {
      t[f ? "replaceState" : "pushState"](u, "", b), (s.value = u);
    } catch (x) {
      console.error(x), i[f ? "replace" : "assign"](b);
    }
  }
  function r(c, u) {
    const f = It({}, t.state, Ya(s.value.back, c, s.value.forward, !0), u, {
      position: s.value.position,
    });
    o(c, f, !0), (n.value = c);
  }
  function a(c, u) {
    const f = It({}, s.value, t.state, { forward: c, scroll: ho() });
    o(f.current, f, !0);
    const m = It({}, Ya(n.value, c, null), { position: f.position + 1 }, u);
    o(c, m, !1), (n.value = c);
  }
  return { location: n, state: s, push: a, replace: r };
}
function Tp(e) {
  e = yp(e);
  const t = Op(e),
    i = Sp(e, t.state, t.location, t.replace);
  function n(o, r = !0) {
    r || i.pauseListeners(), history.go(o);
  }
  const s = It(
    { location: "", base: e, go: n, createHref: xp.bind(null, e) },
    t,
    i
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Dp(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function kh(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const ti = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Ch = Symbol("");
let Ua;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Ua || (Ua = {}));
function on(e, t) {
  return It(new Error(), { type: e, [Ch]: !0 }, t);
}
function ze(e, t) {
  return e instanceof Error && Ch in e && (t == null || !!(e.type & t));
}
const Xa = "[^/]+?",
  Lp = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Pp = /[.+*?^${}()[\]/\\]/g;
function Ap(e, t) {
  const i = It({}, Lp, t),
    n = [];
  let s = i.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const f = u.length ? [] : [90];
    i.strict && !u.length && (s += "/");
    for (let m = 0; m < u.length; m++) {
      const b = u[m];
      let x = 40 + (i.sensitive ? 0.25 : 0);
      if (b.type === 0)
        m || (s += "/"), (s += b.value.replace(Pp, "\\$&")), (x += 40);
      else if (b.type === 1) {
        const { value: S, repeatable: p, optional: v, regexp: k } = b;
        o.push({ name: S, repeatable: p, optional: v });
        const E = k || Xa;
        if (E !== Xa) {
          x += 10;
          try {
            new RegExp(`(${E})`);
          } catch (g) {
            throw new Error(
              `Invalid custom RegExp for param "${S}" (${E}): ` + g.message
            );
          }
        }
        let y = p ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        m || (y = v && u.length < 2 ? `(?:/${y})` : "/" + y),
          v && (y += "?"),
          (s += y),
          (x += 20),
          v && (x += -8),
          p && (x += -20),
          E === ".*" && (x += -50);
      }
      f.push(x);
    }
    n.push(f);
  }
  if (i.strict && i.end) {
    const u = n.length - 1;
    n[u][n[u].length - 1] += 0.7000000000000001;
  }
  i.strict || (s += "/?"), i.end ? (s += "$") : i.strict && (s += "(?:/|$)");
  const r = new RegExp(s, i.sensitive ? "" : "i");
  function a(u) {
    const f = u.match(r),
      m = {};
    if (!f) return null;
    for (let b = 1; b < f.length; b++) {
      const x = f[b] || "",
        S = o[b - 1];
      m[S.name] = x && S.repeatable ? x.split("/") : x;
    }
    return m;
  }
  function c(u) {
    let f = "",
      m = !1;
    for (const b of e) {
      (!m || !f.endsWith("/")) && (f += "/"), (m = !1);
      for (const x of b)
        if (x.type === 0) f += x.value;
        else if (x.type === 1) {
          const { value: S, repeatable: p, optional: v } = x,
            k = S in u ? u[S] : "";
          if (Se(k) && !p)
            throw new Error(
              `Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`
            );
          const E = Se(k) ? k.join("/") : k;
          if (!E)
            if (v)
              b.length < 2 &&
                (f.endsWith("/") ? (f = f.slice(0, -1)) : (m = !0));
            else throw new Error(`Missing required param "${S}"`);
          f += E;
        }
    }
    return f || "/";
  }
  return { re: r, score: n, keys: o, parse: a, stringify: c };
}
function Ip(e, t) {
  let i = 0;
  for (; i < e.length && i < t.length; ) {
    const n = t[i] - e[i];
    if (n) return n;
    i++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Rp(e, t) {
  let i = 0;
  const n = e.score,
    s = t.score;
  for (; i < n.length && i < s.length; ) {
    const o = Ip(n[i], s[i]);
    if (o) return o;
    i++;
  }
  if (Math.abs(s.length - n.length) === 1) {
    if (Qa(n)) return 1;
    if (Qa(s)) return -1;
  }
  return s.length - n.length;
}
function Qa(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Bp = { type: 0, value: "" },
  Fp = /[a-zA-Z0-9_]/;
function Hp(e) {
  if (!e) return [[]];
  if (e === "/") return [[Bp]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(x) {
    throw new Error(`ERR (${i})/"${u}": ${x}`);
  }
  let i = 0,
    n = i;
  const s = [];
  let o;
  function r() {
    o && s.push(o), (o = []);
  }
  let a = 0,
    c,
    u = "",
    f = "";
  function m() {
    !u ||
      (i === 0
        ? o.push({ type: 0, value: u })
        : i === 1 || i === 2 || i === 3
        ? (o.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: u,
            regexp: f,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function b() {
    u += c;
  }
  for (; a < e.length; ) {
    if (((c = e[a++]), c === "\\" && i !== 2)) {
      (n = i), (i = 4);
      continue;
    }
    switch (i) {
      case 0:
        c === "/" ? (u && m(), r()) : c === ":" ? (m(), (i = 1)) : b();
        break;
      case 4:
        b(), (i = n);
        break;
      case 1:
        c === "("
          ? (i = 2)
          : Fp.test(c)
          ? b()
          : (m(), (i = 0), c !== "*" && c !== "?" && c !== "+" && a--);
        break;
      case 2:
        c === ")"
          ? f[f.length - 1] == "\\"
            ? (f = f.slice(0, -1) + c)
            : (i = 3)
          : (f += c);
        break;
      case 3:
        m(), (i = 0), c !== "*" && c !== "?" && c !== "+" && a--, (f = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return i === 2 && t(`Unfinished custom RegExp for param "${u}"`), m(), r(), s;
}
function $p(e, t, i) {
  const n = Ap(Hp(e.path), i),
    s = It(n, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Wp(e, t) {
  const i = [],
    n = new Map();
  t = Ga({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(f) {
    return n.get(f);
  }
  function o(f, m, b) {
    const x = !b,
      S = Np(f);
    S.aliasOf = b && b.record;
    const p = Ga(t, f),
      v = [S];
    if ("alias" in f) {
      const y = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const g of y)
        v.push(
          It({}, S, {
            components: b ? b.record.components : S.components,
            path: g,
            aliasOf: b ? b.record : S,
          })
        );
    }
    let k, E;
    for (const y of v) {
      const { path: g } = y;
      if (m && g[0] !== "/") {
        const h = m.record.path,
          l = h[h.length - 1] === "/" ? "" : "/";
        y.path = m.record.path + (g && l + g);
      }
      if (
        ((k = $p(y, m, p)),
        b
          ? b.alias.push(k)
          : ((E = E || k),
            E !== k && E.alias.push(k),
            x && f.name && !Ja(k) && r(f.name)),
        S.children)
      ) {
        const h = S.children;
        for (let l = 0; l < h.length; l++) o(h[l], k, b && b.children[l]);
      }
      (b = b || k), c(k);
    }
    return E
      ? () => {
          r(E);
        }
      : An;
  }
  function r(f) {
    if (kh(f)) {
      const m = n.get(f);
      m &&
        (n.delete(f),
        i.splice(i.indexOf(m), 1),
        m.children.forEach(r),
        m.alias.forEach(r));
    } else {
      const m = i.indexOf(f);
      m > -1 &&
        (i.splice(m, 1),
        f.record.name && n.delete(f.record.name),
        f.children.forEach(r),
        f.alias.forEach(r));
    }
  }
  function a() {
    return i;
  }
  function c(f) {
    let m = 0;
    for (
      ;
      m < i.length &&
      Rp(f, i[m]) >= 0 &&
      (f.record.path !== i[m].record.path || !Mh(f, i[m]));

    )
      m++;
    i.splice(m, 0, f), f.record.name && !Ja(f) && n.set(f.record.name, f);
  }
  function u(f, m) {
    let b,
      x = {},
      S,
      p;
    if ("name" in f && f.name) {
      if (((b = n.get(f.name)), !b)) throw on(1, { location: f });
      (p = b.record.name),
        (x = It(
          zp(
            m.params,
            b.keys.filter((E) => !E.optional).map((E) => E.name)
          ),
          f.params
        )),
        (S = b.stringify(x));
    } else if ("path" in f)
      (S = f.path),
        (b = i.find((E) => E.re.test(S))),
        b && ((x = b.parse(S)), (p = b.record.name));
    else {
      if (((b = m.name ? n.get(m.name) : i.find((E) => E.re.test(m.path))), !b))
        throw on(1, { location: f, currentLocation: m });
      (p = b.record.name),
        (x = It({}, m.params, f.params)),
        (S = b.stringify(x));
    }
    const v = [];
    let k = b;
    for (; k; ) v.unshift(k.record), (k = k.parent);
    return { name: p, path: S, params: x, matched: v, meta: jp(v) };
  }
  return (
    e.forEach((f) => o(f)),
    {
      addRoute: o,
      resolve: u,
      removeRoute: r,
      getRoutes: a,
      getRecordMatcher: s,
    }
  );
}
function zp(e, t) {
  const i = {};
  for (const n of t) n in e && (i[n] = e[n]);
  return i;
}
function Np(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Vp(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Vp(e) {
  const t = {},
    i = e.props || !1;
  if ("component" in e) t.default = i;
  else for (const n in e.components) t[n] = typeof i == "boolean" ? i : i[n];
  return t;
}
function Ja(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function jp(e) {
  return e.reduce((t, i) => It(t, i.meta), {});
}
function Ga(e, t) {
  const i = {};
  for (const n in e) i[n] = n in t ? t[n] : e[n];
  return i;
}
function Mh(e, t) {
  return t.children.some((i) => i === e || Mh(e, i));
}
const Eh = /#/g,
  qp = /&/g,
  Kp = /\//g,
  Yp = /=/g,
  Up = /\?/g,
  Sh = /\+/g,
  Xp = /%5B/g,
  Qp = /%5D/g,
  Oh = /%5E/g,
  Jp = /%60/g,
  Th = /%7B/g,
  Gp = /%7C/g,
  Dh = /%7D/g,
  Zp = /%20/g;
function zr(e) {
  return encodeURI("" + e)
    .replace(Gp, "|")
    .replace(Xp, "[")
    .replace(Qp, "]");
}
function tg(e) {
  return zr(e).replace(Th, "{").replace(Dh, "}").replace(Oh, "^");
}
function hr(e) {
  return zr(e)
    .replace(Sh, "%2B")
    .replace(Zp, "+")
    .replace(Eh, "%23")
    .replace(qp, "%26")
    .replace(Jp, "`")
    .replace(Th, "{")
    .replace(Dh, "}")
    .replace(Oh, "^");
}
function eg(e) {
  return hr(e).replace(Yp, "%3D");
}
function ig(e) {
  return zr(e).replace(Eh, "%23").replace(Up, "%3F");
}
function ng(e) {
  return e == null ? "" : ig(e).replace(Kp, "%2F");
}
function Ws(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function sg(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const o = n[s].replace(Sh, " "),
      r = o.indexOf("="),
      a = Ws(r < 0 ? o : o.slice(0, r)),
      c = r < 0 ? null : Ws(o.slice(r + 1));
    if (a in t) {
      let u = t[a];
      Se(u) || (u = t[a] = [u]), u.push(c);
    } else t[a] = c;
  }
  return t;
}
function Za(e) {
  let t = "";
  for (let i in e) {
    const n = e[i];
    if (((i = eg(i)), n == null)) {
      n !== void 0 && (t += (t.length ? "&" : "") + i);
      continue;
    }
    (Se(n) ? n.map((o) => o && hr(o)) : [n && hr(n)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + i), o != null && (t += "=" + o));
    });
  }
  return t;
}
function og(e) {
  const t = {};
  for (const i in e) {
    const n = e[i];
    n !== void 0 &&
      (t[i] = Se(n)
        ? n.map((s) => (s == null ? null : "" + s))
        : n == null
        ? n
        : "" + n);
  }
  return t;
}
const rg = Symbol(""),
  tl = Symbol(""),
  Nr = Symbol(""),
  Lh = Symbol(""),
  ur = Symbol("");
function vn() {
  let e = [];
  function t(n) {
    return (
      e.push(n),
      () => {
        const s = e.indexOf(n);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function i() {
    e = [];
  }
  return { add: t, list: () => e, reset: i };
}
function ri(e, t, i, n, s) {
  const o = n && (n.enterCallbacks[s] = n.enterCallbacks[s] || []);
  return () =>
    new Promise((r, a) => {
      const c = (m) => {
          m === !1
            ? a(on(4, { from: i, to: t }))
            : m instanceof Error
            ? a(m)
            : Dp(m)
            ? a(on(2, { from: t, to: m }))
            : (o &&
                n.enterCallbacks[s] === o &&
                typeof m == "function" &&
                o.push(m),
              r());
        },
        u = e.call(n && n.instances[s], t, i, c);
      let f = Promise.resolve(u);
      e.length < 3 && (f = f.then(c)), f.catch((m) => a(m));
    });
}
function Po(e, t, i, n) {
  const s = [];
  for (const o of e)
    for (const r in o.components) {
      const a = o.components[r];
      if (!(t !== "beforeRouteEnter" && !o.instances[r]))
        if (ag(a)) {
          const u = (a.__vccOpts || a)[t];
          u && s.push(ri(u, i, n, o, r));
        } else {
          const c = a();
          s.push(() =>
            c.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${r}" at "${o.path}"`)
                );
              const f = dp(u) ? u.default : u;
              o.components[r] = f;
              const b = (f.__vccOpts || f)[t];
              return b && ri(b, i, n, o, r)();
            })
          );
        }
    }
  return s;
}
function ag(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function el(e) {
  const t = di(Nr),
    i = di(Lh),
    n = ge(() => t.resolve(Ft(e.to))),
    s = ge(() => {
      const { matched: c } = n.value,
        { length: u } = c,
        f = c[u - 1],
        m = i.matched;
      if (!f || !m.length) return -1;
      const b = m.findIndex(sn.bind(null, f));
      if (b > -1) return b;
      const x = il(c[u - 2]);
      return u > 1 && il(f) === x && m[m.length - 1].path !== x
        ? m.findIndex(sn.bind(null, c[u - 2]))
        : b;
    }),
    o = ge(() => s.value > -1 && ug(i.params, n.value.params)),
    r = ge(
      () =>
        s.value > -1 &&
        s.value === i.matched.length - 1 &&
        xh(i.params, n.value.params)
    );
  function a(c = {}) {
    return hg(c)
      ? t[Ft(e.replace) ? "replace" : "push"](Ft(e.to)).catch(An)
      : Promise.resolve();
  }
  return {
    route: n,
    href: ge(() => n.value.href),
    isActive: o,
    isExactActive: r,
    navigate: a,
  };
}
const lg = Vt({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: el,
    setup(e, { slots: t }) {
      const i = is(el(e)),
        { options: n } = di(Nr),
        s = ge(() => ({
          [nl(e.activeClass, n.linkActiveClass, "router-link-active")]:
            i.isActive,
          [nl(
            e.exactActiveClass,
            n.linkExactActiveClass,
            "router-link-exact-active"
          )]: i.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(i);
        return e.custom
          ? o
          : vh(
              "a",
              {
                "aria-current": i.isExactActive ? e.ariaCurrentValue : null,
                href: i.href,
                onClick: i.navigate,
                class: s.value,
              },
              o
            );
      };
    },
  }),
  cg = lg;
function hg(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function ug(e, t) {
  for (const i in t) {
    const n = t[i],
      s = e[i];
    if (typeof n == "string") {
      if (n !== s) return !1;
    } else if (!Se(s) || s.length !== n.length || n.some((o, r) => o !== s[r]))
      return !1;
  }
  return !0;
}
function il(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const nl = (e, t, i) => (e != null ? e : t != null ? t : i),
  dg = Vt({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: i }) {
      const n = di(ur),
        s = ge(() => e.route || n.value),
        o = di(tl, 0),
        r = ge(() => {
          let u = Ft(o);
          const { matched: f } = s.value;
          let m;
          for (; (m = f[u]) && !m.components; ) u++;
          return u;
        }),
        a = ge(() => s.value.matched[r.value]);
      Ds(
        tl,
        ge(() => r.value + 1)
      ),
        Ds(rg, a),
        Ds(ur, s);
      const c = le();
      return (
        Ln(
          () => [c.value, a.value, e.name],
          ([u, f, m], [b, x, S]) => {
            f &&
              ((f.instances[m] = u),
              x &&
                x !== f &&
                u &&
                u === b &&
                (f.leaveGuards.size || (f.leaveGuards = x.leaveGuards),
                f.updateGuards.size || (f.updateGuards = x.updateGuards))),
              u &&
                f &&
                (!x || !sn(f, x) || !b) &&
                (f.enterCallbacks[m] || []).forEach((p) => p(u));
          },
          { flush: "post" }
        ),
        () => {
          const u = s.value,
            f = e.name,
            m = a.value,
            b = m && m.components[f];
          if (!b) return sl(i.default, { Component: b, route: u });
          const x = m.props[f],
            S = x
              ? x === !0
                ? u.params
                : typeof x == "function"
                ? x(u)
                : x
              : null,
            v = vh(
              b,
              It({}, S, t, {
                onVnodeUnmounted: (k) => {
                  k.component.isUnmounted && (m.instances[f] = null);
                },
                ref: c,
              })
            );
          return sl(i.default, { Component: v, route: u }) || v;
        }
      );
    },
  });
function sl(e, t) {
  if (!e) return null;
  const i = e(t);
  return i.length === 1 ? i[0] : i;
}
const fg = dg;
function pg(e) {
  const t = Wp(e.routes, e),
    i = e.parseQuery || sg,
    n = e.stringifyQuery || Za,
    s = e.history,
    o = vn(),
    r = vn(),
    a = vn(),
    c = yd(ti);
  let u = ti;
  Yi &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const f = Do.bind(null, (K) => "" + K),
    m = Do.bind(null, ng),
    b = Do.bind(null, Ws);
  function x(K, st) {
    let it, rt;
    return (
      kh(K) ? ((it = t.getRecordMatcher(K)), (rt = st)) : (rt = K),
      t.addRoute(rt, it)
    );
  }
  function S(K) {
    const st = t.getRecordMatcher(K);
    st && t.removeRoute(st);
  }
  function p() {
    return t.getRoutes().map((K) => K.record);
  }
  function v(K) {
    return !!t.getRecordMatcher(K);
  }
  function k(K, st) {
    if (((st = It({}, st || c.value)), typeof K == "string")) {
      const ut = Lo(i, K, st.path),
        P = t.resolve({ path: ut.path }, st),
        B = s.createHref(ut.fullPath);
      return It(ut, P, {
        params: b(P.params),
        hash: Ws(ut.hash),
        redirectedFrom: void 0,
        href: B,
      });
    }
    let it;
    if ("path" in K) it = It({}, K, { path: Lo(i, K.path, st.path).path });
    else {
      const ut = It({}, K.params);
      for (const P in ut) ut[P] == null && delete ut[P];
      (it = It({}, K, { params: m(K.params) })), (st.params = m(st.params));
    }
    const rt = t.resolve(it, st),
      gt = K.hash || "";
    rt.params = f(b(rt.params));
    const wt = gp(n, It({}, K, { hash: tg(gt), path: rt.path })),
      at = s.createHref(wt);
    return It(
      { fullPath: wt, hash: gt, query: n === Za ? og(K.query) : K.query || {} },
      rt,
      { redirectedFrom: void 0, href: at }
    );
  }
  function E(K) {
    return typeof K == "string" ? Lo(i, K, c.value.path) : It({}, K);
  }
  function y(K, st) {
    if (u !== K) return on(8, { from: st, to: K });
  }
  function g(K) {
    return d(K);
  }
  function h(K) {
    return g(It(E(K), { replace: !0 }));
  }
  function l(K) {
    const st = K.matched[K.matched.length - 1];
    if (st && st.redirect) {
      const { redirect: it } = st;
      let rt = typeof it == "function" ? it(K) : it;
      return (
        typeof rt == "string" &&
          ((rt =
            rt.includes("?") || rt.includes("#") ? (rt = E(rt)) : { path: rt }),
          (rt.params = {})),
        It(
          {
            query: K.query,
            hash: K.hash,
            params: "path" in rt ? {} : K.params,
          },
          rt
        )
      );
    }
  }
  function d(K, st) {
    const it = (u = k(K)),
      rt = c.value,
      gt = K.state,
      wt = K.force,
      at = K.replace === !0,
      ut = l(it);
    if (ut)
      return d(It(E(ut), { state: gt, force: wt, replace: at }), st || it);
    const P = it;
    P.redirectedFrom = st;
    let B;
    return (
      !wt &&
        mp(n, rt, it) &&
        ((B = on(16, { to: P, from: rt })), xt(rt, rt, !0, !1)),
      (B ? Promise.resolve(B) : T(P, rt))
        .catch((V) => (ze(V) ? (ze(V, 2) ? V : lt(V)) : X(V, P, rt)))
        .then((V) => {
          if (V) {
            if (ze(V, 2))
              return d(
                It({ replace: at }, E(V.to), { state: gt, force: wt }),
                st || P
              );
          } else V = A(P, rt, !0, at, gt);
          return L(P, rt, V), V;
        })
    );
  }
  function C(K, st) {
    const it = y(K, st);
    return it ? Promise.reject(it) : Promise.resolve();
  }
  function T(K, st) {
    let it;
    const [rt, gt, wt] = gg(K, st);
    it = Po(rt.reverse(), "beforeRouteLeave", K, st);
    for (const ut of rt)
      ut.leaveGuards.forEach((P) => {
        it.push(ri(P, K, st));
      });
    const at = C.bind(null, K, st);
    return (
      it.push(at),
      Ni(it)
        .then(() => {
          it = [];
          for (const ut of o.list()) it.push(ri(ut, K, st));
          return it.push(at), Ni(it);
        })
        .then(() => {
          it = Po(gt, "beforeRouteUpdate", K, st);
          for (const ut of gt)
            ut.updateGuards.forEach((P) => {
              it.push(ri(P, K, st));
            });
          return it.push(at), Ni(it);
        })
        .then(() => {
          it = [];
          for (const ut of K.matched)
            if (ut.beforeEnter && !st.matched.includes(ut))
              if (Se(ut.beforeEnter))
                for (const P of ut.beforeEnter) it.push(ri(P, K, st));
              else it.push(ri(ut.beforeEnter, K, st));
          return it.push(at), Ni(it);
        })
        .then(
          () => (
            K.matched.forEach((ut) => (ut.enterCallbacks = {})),
            (it = Po(wt, "beforeRouteEnter", K, st)),
            it.push(at),
            Ni(it)
          )
        )
        .then(() => {
          it = [];
          for (const ut of r.list()) it.push(ri(ut, K, st));
          return it.push(at), Ni(it);
        })
        .catch((ut) => (ze(ut, 8) ? ut : Promise.reject(ut)))
    );
  }
  function L(K, st, it) {
    for (const rt of a.list()) rt(K, st, it);
  }
  function A(K, st, it, rt, gt) {
    const wt = y(K, st);
    if (wt) return wt;
    const at = st === ti,
      ut = Yi ? history.state : {};
    it &&
      (rt || at
        ? s.replace(K.fullPath, It({ scroll: at && ut && ut.scroll }, gt))
        : s.push(K.fullPath, gt)),
      (c.value = K),
      xt(K, st, it, at),
      lt();
  }
  let R;
  function W() {
    R ||
      (R = s.listen((K, st, it) => {
        if (!St.listening) return;
        const rt = k(K),
          gt = l(rt);
        if (gt) {
          d(It(gt, { replace: !0 }), rt).catch(An);
          return;
        }
        u = rt;
        const wt = c.value;
        Yi && Cp(Ka(wt.fullPath, it.delta), ho()),
          T(rt, wt)
            .catch((at) =>
              ze(at, 12)
                ? at
                : ze(at, 2)
                ? (d(at.to, rt)
                    .then((ut) => {
                      ze(ut, 20) &&
                        !it.delta &&
                        it.type === Un.pop &&
                        s.go(-1, !1);
                    })
                    .catch(An),
                  Promise.reject())
                : (it.delta && s.go(-it.delta, !1), X(at, rt, wt))
            )
            .then((at) => {
              (at = at || A(rt, wt, !1)),
                at &&
                  (it.delta && !ze(at, 8)
                    ? s.go(-it.delta, !1)
                    : it.type === Un.pop && ze(at, 20) && s.go(-1, !1)),
                L(rt, wt, at);
            })
            .catch(An);
      }));
  }
  let z = vn(),
    N = vn(),
    Y;
  function X(K, st, it) {
    lt(K);
    const rt = N.list();
    return (
      rt.length ? rt.forEach((gt) => gt(K, st, it)) : console.error(K),
      Promise.reject(K)
    );
  }
  function Q() {
    return Y && c.value !== ti
      ? Promise.resolve()
      : new Promise((K, st) => {
          z.add([K, st]);
        });
  }
  function lt(K) {
    return (
      Y ||
        ((Y = !K),
        W(),
        z.list().forEach(([st, it]) => (K ? it(K) : st())),
        z.reset()),
      K
    );
  }
  function xt(K, st, it, rt) {
    const { scrollBehavior: gt } = e;
    if (!Yi || !gt) return Promise.resolve();
    const wt =
      (!it && Mp(Ka(K.fullPath, 0))) ||
      ((rt || !it) && history.state && history.state.scroll) ||
      null;
    return jc()
      .then(() => gt(K, st, wt))
      .then((at) => at && kp(at))
      .catch((at) => X(at, K, st));
  }
  const bt = (K) => s.go(K);
  let dt;
  const Et = new Set(),
    St = {
      currentRoute: c,
      listening: !0,
      addRoute: x,
      removeRoute: S,
      hasRoute: v,
      getRoutes: p,
      resolve: k,
      options: e,
      push: g,
      replace: h,
      go: bt,
      back: () => bt(-1),
      forward: () => bt(1),
      beforeEach: o.add,
      beforeResolve: r.add,
      afterEach: a.add,
      onError: N.add,
      isReady: Q,
      install(K) {
        const st = this;
        K.component("RouterLink", cg),
          K.component("RouterView", fg),
          (K.config.globalProperties.$router = st),
          Object.defineProperty(K.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Ft(c),
          }),
          Yi &&
            !dt &&
            c.value === ti &&
            ((dt = !0), g(s.location).catch((gt) => {}));
        const it = {};
        for (const gt in ti) it[gt] = ge(() => c.value[gt]);
        K.provide(Nr, st), K.provide(Lh, is(it)), K.provide(ur, c);
        const rt = K.unmount;
        Et.add(K),
          (K.unmount = function () {
            Et.delete(K),
              Et.size < 1 &&
                ((u = ti),
                R && R(),
                (R = null),
                (c.value = ti),
                (dt = !1),
                (Y = !1)),
              rt();
          });
      },
    };
  return St;
}
function Ni(e) {
  return e.reduce((t, i) => t.then(() => i()), Promise.resolve());
}
function gg(e, t) {
  const i = [],
    n = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let r = 0; r < o; r++) {
    const a = t.matched[r];
    a && (e.matched.find((u) => sn(u, a)) ? n.push(a) : i.push(a));
    const c = e.matched[r];
    c && (t.matched.find((u) => sn(u, c)) || s.push(c));
  }
  return [i, n, s];
}
const mg = Vt({
  data() {
    return {
      cards: [],
      cardsFiltered: [],
      selecteds: [],
      selectedsCards: [],
      board: localStorage.board,
      apiKey: localStorage.apiKey,
      token: localStorage.token,
      searchValue: "",
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    async getCards() {
      const e = await fetch(
        `https://api.trello.com/1/boards/${this.board}/cards?key=${this.apiKey}&token=${this.token}`
      );
      (this.cards = await e.json()), this.cardsFilter();
    },
    send() {
      event == null || event.preventDefault();
    },
    search() {
      event == null || event.preventDefault(), this.cardsFilter();
    },
    cardsFilter() {
      this.cardsFiltered = this.cards.filter((e) => {
        const t = this.searchValue
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return e.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(t);
      });
    },
    select() {
      const e = this.selecteds.map((t) => t);
      this.selectedsCards = this.cards.filter((t) => e.includes(t.id));
    },
  },
});
const Vr = (e) => (un("data-v-8cee3f7b"), (e = e()), dn(), e),
  vg = { class: "row" },
  _g = { class: "input-field col s11" },
  yg = Vr(() => F("label", { for: "search" }, null, -1)),
  bg = Vr(() =>
    F(
      "div",
      { class: "input-field col s1" },
      [
        F("button", { class: "waves-effect waves-light btn" }, [
          F("i", { class: "material-icons" }, "search"),
        ]),
      ],
      -1
    )
  ),
  xg = { class: "row" },
  wg = { class: "col s7" },
  kg = { class: "cards" },
  Cg = { class: "col s12" },
  Mg = ["value"],
  Eg = { class: "col s5 cards" },
  Sg = Vr(() =>
    F(
      "div",
      { class: "row form-button" },
      [
        F("div", { class: "col s12" }, [
          F("button", { class: "waves-effect waves-light btn" }, "Enviar"),
        ]),
      ],
      -1
    )
  );
function Og(e, t, i, n, s, o) {
  return (
    ft(),
    vt(
      $t,
      null,
      [
        F("div", vg, [
          F("div", _g, [
            Gt(
              F(
                "input",
                {
                  "onUpdate:modelValue":
                    t[0] || (t[0] = (r) => (e.searchValue = r)),
                  id: "search",
                  type: "text",
                  onKeyup:
                    t[1] || (t[1] = (...r) => e.search && e.search(...r)),
                },
                null,
                544
              ),
              [[Ee, e.searchValue]]
            ),
            yg,
          ]),
          bg,
        ]),
        F(
          "form",
          { onSubmit: t[4] || (t[4] = (r) => e.send()) },
          [
            F("div", xg, [
              F("div", wg, [
                F("div", kg, [
                  (ft(!0),
                  vt(
                    $t,
                    null,
                    xe(
                      e.cardsFiltered,
                      (r, a) => (
                        ft(),
                        vt("div", { class: "row", key: a }, [
                          F("div", Cg, [
                            F("label", null, [
                              Gt(
                                F(
                                  "input",
                                  {
                                    type: "checkbox",
                                    value: r.id,
                                    "onUpdate:modelValue":
                                      t[2] || (t[2] = (c) => (e.selecteds = c)),
                                    onChange:
                                      t[3] ||
                                      (t[3] = (...c) =>
                                        e.select && e.select(...c)),
                                  },
                                  null,
                                  40,
                                  Mg
                                ),
                                [[$s, e.selecteds]]
                              ),
                              F("span", null, ve(r.name), 1),
                            ]),
                          ]),
                        ])
                      )
                    ),
                    128
                  )),
                ]),
              ]),
              F("div", Eg, [
                (ft(!0),
                vt(
                  $t,
                  null,
                  xe(
                    e.selectedsCards,
                    (r) => (ft(), vt("div", { key: r.id }, ve(r.name), 1))
                  ),
                  128
                )),
              ]),
            ]),
            Sg,
          ],
          32
        ),
      ],
      64
    )
  );
}
const Tg = _i(mg, [
    ["render", Og],
    ["__scopeId", "data-v-8cee3f7b"],
  ]),
  Dg = { class: "row" },
  Lg = { class: "col s12" },
  Pg = Vt({
    __name: "Cards",
    setup(e) {
      return (t, i) => (
        ft(), vt("main", null, [F("div", Dg, [F("div", Lg, [Tt(Tg)])])])
      );
    },
  }),
  Ag = Vt({
    __name: "checklist",
    setup(e) {
      return (t, i) => "component 2";
    },
  }),
  Ig = { class: "row" },
  Rg = { class: "col s12" },
  Bg = Vt({
    __name: "Checklist",
    setup(e) {
      return (t, i) => (
        ft(), vt("main", null, [F("div", Ig, [F("div", Rg, [Tt(Ag)])])])
      );
    },
  }),
  Fg = Vt({
    data() {
      return { board: "", apiKey: "", token: "" };
    },
    methods: {
      save() {
        (localStorage.board = this.board),
          (localStorage.apiKey = this.apiKey),
          (localStorage.token = this.token),
          alert("Sucesso"),
          (this.board = ""),
          (this.apiKey = ""),
          (this.token = "");
      },
    },
  });
const jr = (e) => (un("data-v-77dd926b"), (e = e()), dn(), e),
  Hg = { class: "col s12" },
  $g = { class: "row" },
  Wg = { class: "input-field col s12" },
  zg = jr(() => F("label", { for: "board" }, "Boards", -1)),
  Ng = { class: "row" },
  Vg = { class: "input-field col s12" },
  jg = jr(() => F("label", { for: "key" }, "Key", -1)),
  qg = { class: "row" },
  Kg = { class: "input-field col s12" },
  Yg = jr(() => F("label", { for: "token" }, "Token", -1)),
  Ug = { class: "row" },
  Xg = { class: "col s3 offset-s9 form-button" };
function Qg(e, t, i, n, s, o) {
  return (
    ft(),
    vt("form", Hg, [
      F("div", $g, [
        F("div", Wg, [
          Gt(
            F(
              "input",
              {
                "onUpdate:modelValue": t[0] || (t[0] = (r) => (e.board = r)),
                id: "board",
                type: "text",
                class: "validate",
              },
              null,
              512
            ),
            [[Ee, e.board]]
          ),
          zg,
        ]),
      ]),
      F("div", Ng, [
        F("div", Vg, [
          Gt(
            F(
              "input",
              {
                "onUpdate:modelValue": t[1] || (t[1] = (r) => (e.apiKey = r)),
                id: "key",
                type: "text",
                class: "validate",
              },
              null,
              512
            ),
            [[Ee, e.apiKey]]
          ),
          jg,
        ]),
      ]),
      F("div", qg, [
        F("div", Kg, [
          Gt(
            F(
              "input",
              {
                "onUpdate:modelValue": t[2] || (t[2] = (r) => (e.token = r)),
                id: "token",
                type: "text",
                class: "validate",
              },
              null,
              512
            ),
            [[Ee, e.token]]
          ),
          Yg,
        ]),
      ]),
      F("div", Ug, [
        F("div", Xg, [
          F(
            "a",
            {
              class: "waves-effect waves-light btn",
              onClick: t[3] || (t[3] = (r) => e.save()),
            },
            "Salvar"
          ),
        ]),
      ]),
    ])
  );
}
const Jg = _i(Fg, [
    ["render", Qg],
    ["__scopeId", "data-v-77dd926b"],
  ]),
  Gg = Vt({
    __name: "ApiKey",
    setup(e) {
      return (t, i) => (ft(), Kn(Jg));
    },
  });
function Ph() {
  let e = new Date().getTime(),
    t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (i) {
      const n = (e + Math.random() * 16) % 16 | 0;
      return (
        (e = Math.floor(e / 16)), (i == "x" ? n : (n & 3) | 8).toString(16)
      );
    });
  return t;
}
async function Ah(e, t, i, n, s) {
  for (const o in e) {
    let r = e[o],
      a = t.replace("{name}", r.name);
    a = a.replace("{NAME}", r.name.toUpperCase());
    const c = new URLSearchParams({ name: a, idLabels: i.map((f) => f.id) }),
      u = {};
    await fetch(
      `https://api.trello.com/1/cards?idList=${r.id}&key=${n}&token=${s}`,
      { method: "POST", body: c, headers: u }
    );
  }
}
const Zg = Vt({
  data() {
    return {
      lists: [],
      labels: [],
      listsFiltered: [],
      selecteds: [],
      labelsSelecteds: [],
      selectedsLabels: [],
      selectedsLists: [],
      board: localStorage.board,
      apiKey: localStorage.apiKey,
      token: localStorage.token,
      searchValue: "",
      cardName: "",
    };
  },
  mounted() {
    this.getLists(), this.getLabels();
  },
  methods: {
    async getLists() {
      const e = await fetch(
        `https://api.trello.com/1/boards/${this.board}/lists?key=${this.apiKey}&token=${this.token}`
      );
      (this.lists = await e.json()), this.filter();
    },
    async getLabels() {
      const e = await fetch(
        `https://api.trello.com/1/boards/${this.board}/labels?key=${this.apiKey}&token=${this.token}`
      );
      this.labels = await e.json();
    },
    search() {
      event == null || event.preventDefault(), this.filter();
    },
    filter() {
      this.listsFiltered = this.lists.filter((e) => {
        const t = this.searchValue
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return e.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(t);
      });
    },
    select() {
      const e = this.selecteds.map((i) => i),
        t = this.labelsSelecteds.map((i) => i);
      (this.selectedsLists = this.lists.filter((i) => e.includes(i.id))),
        (this.selectedsLabels = this.labels.filter((i) => t.includes(i.id)));
    },
    async send() {
      event == null || event.preventDefault(),
        await Ah(
          this.selectedsLists,
          this.cardName,
          this.selectedsLabels,
          this.apiKey,
          this.token
        ),
        alert("Sucesso"),
        (this.cardName = "");
    },
    saveRecurrents() {
      let n;
      const e = localStorage.recurrents || "[]",
        t = JSON.parse(e),
        i = {
          id: Ph(),
          selectedsLists: this.selectedsLists,
          cardName: this.cardName,
          selectedsLabels: this.selectedsLabels,
        };
      i.cardName &&
        (t.push(i),
        (localStorage.recurrents = JSON.stringify(t)),
        alert("Salvo"),
        (n = document.querySelector("form")) == null || n.reset());
    },
  },
});
const uo = (e) => (un("data-v-4bb1582e"), (e = e()), dn(), e),
  tm = { class: "row" },
  em = { class: "input-field col s11" },
  im = uo(() => F("label", { for: "search" }, null, -1)),
  nm = uo(() =>
    F(
      "div",
      { class: "input-field col s1" },
      [
        F("button", { class: "waves-effect waves-light btn" }, [
          F("i", { class: "material-icons" }, "search"),
        ]),
      ],
      -1
    )
  ),
  sm = { class: "row" },
  om = { class: "col s12" },
  rm = { class: "row" },
  am = { class: "col s7 lists" },
  lm = { class: "col s12" },
  cm = ["value"],
  hm = { class: "col s5" },
  um = { class: "row" },
  dm = { class: "col s7 labels" },
  fm = { class: "col s12" },
  pm = ["value"],
  gm = { class: "col s5" },
  mm = { class: "row form-button" },
  vm = { class: "col s10" },
  _m = uo(() => F("label", { for: "cardName" }, null, -1)),
  ym = uo(() =>
    F(
      "div",
      { class: "col s1" },
      [F("button", { class: "waves-effect waves-light btn" }, "Enviar")],
      -1
    )
  ),
  bm = { class: "col s1" };
function xm(e, t, i, n, s, o) {
  return (
    ft(),
    vt(
      $t,
      null,
      [
        F("div", tm, [
          F("div", em, [
            Gt(
              F(
                "input",
                {
                  "onUpdate:modelValue":
                    t[0] || (t[0] = (r) => (e.searchValue = r)),
                  id: "search",
                  type: "text",
                  onKeyup:
                    t[1] || (t[1] = (...r) => e.search && e.search(...r)),
                },
                null,
                544
              ),
              [[Ee, e.searchValue]]
            ),
            im,
          ]),
          nm,
        ]),
        F(
          "form",
          { onSubmit: t[8] || (t[8] = (r) => e.send()) },
          [
            F("div", sm, [
              F("div", om, [
                F("div", rm, [
                  F("div", am, [
                    (ft(!0),
                    vt(
                      $t,
                      null,
                      xe(
                        e.listsFiltered,
                        (r, a) => (
                          ft(),
                          vt("div", { class: "row", key: a }, [
                            F("div", lm, [
                              F("label", null, [
                                Gt(
                                  F(
                                    "input",
                                    {
                                      type: "checkbox",
                                      value: r.id,
                                      "onUpdate:modelValue":
                                        t[2] ||
                                        (t[2] = (c) => (e.selecteds = c)),
                                      onChange:
                                        t[3] ||
                                        (t[3] = (...c) =>
                                          e.select && e.select(...c)),
                                    },
                                    null,
                                    40,
                                    cm
                                  ),
                                  [[$s, e.selecteds]]
                                ),
                                F("span", null, ve(r.name), 1),
                              ]),
                            ]),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                  F("div", hm, [
                    (ft(!0),
                    vt(
                      $t,
                      null,
                      xe(
                        e.selectedsLists,
                        (r) => (ft(), vt("div", { key: r.id }, ve(r.name), 1))
                      ),
                      128
                    )),
                  ]),
                ]),
                F("div", um, [
                  F("div", dm, [
                    (ft(!0),
                    vt(
                      $t,
                      null,
                      xe(
                        e.labels,
                        (r, a) => (
                          ft(),
                          vt("div", { class: "row", key: a }, [
                            F("div", fm, [
                              F("label", null, [
                                Gt(
                                  F(
                                    "input",
                                    {
                                      type: "checkbox",
                                      value: r.id,
                                      "onUpdate:modelValue":
                                        t[4] ||
                                        (t[4] = (c) => (e.labelsSelecteds = c)),
                                      onChange:
                                        t[5] ||
                                        (t[5] = (...c) =>
                                          e.select && e.select(...c)),
                                    },
                                    null,
                                    40,
                                    pm
                                  ),
                                  [[$s, e.labelsSelecteds]]
                                ),
                                F("span", null, ve(r.name), 1),
                              ]),
                            ]),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                  F("div", gm, [
                    (ft(!0),
                    vt(
                      $t,
                      null,
                      xe(
                        e.selectedsLabels,
                        (r) => (ft(), vt("div", { key: r.id }, ve(r.name), 1))
                      ),
                      128
                    )),
                  ]),
                ]),
              ]),
            ]),
            F("div", mm, [
              F("div", vm, [
                Gt(
                  F(
                    "input",
                    {
                      "onUpdate:modelValue":
                        t[6] || (t[6] = (r) => (e.cardName = r)),
                      id: "cardName",
                      type: "text",
                      required: "",
                    },
                    null,
                    512
                  ),
                  [[Ee, e.cardName]]
                ),
                _m,
              ]),
              ym,
              F("div", bm, [
                F(
                  "button",
                  {
                    type: "button",
                    onClick:
                      t[7] ||
                      (t[7] = (...r) =>
                        e.saveRecurrents && e.saveRecurrents(...r)),
                    class: "waves-effect waves-light btn",
                  },
                  " Salvar "
                ),
              ]),
            ]),
          ],
          32
        ),
      ],
      64
    )
  );
}
const wm = _i(Zg, [
    ["render", xm],
    ["__scopeId", "data-v-4bb1582e"],
  ]),
  km = { class: "row" },
  Cm = { class: "col s12" },
  Mm = Vt({
    __name: "CreateCards",
    setup(e) {
      return (t, i) => (
        ft(), vt("main", null, [F("div", km, [F("div", Cm, [Tt(wm)])])])
      );
    },
  }),
  Em = Vt({
    data() {
      return {
        recurrents: [],
        apiKey: localStorage.apiKey,
        token: localStorage.token,
      };
    },
    mounted() {
      fn.AutoInit();
      const e = localStorage.recurrents || "[]";
      this.recurrents = JSON.parse(e);
    },
    methods: {
      remove(e) {
        (this.recurrents = this.recurrents.filter((t) => t.id != e)),
          (localStorage.recurrents = JSON.stringify(this.recurrents));
      },
      async send(e) {
        await Ah(
          e.selectedsLists,
          e.cardName,
          e.selectedsLabels,
          this.apiKey,
          this.token
        ),
          alert("Sucesso");
      },
    },
  });
const qr = (e) => (un("data-v-66f27336"), (e = e()), dn(), e),
  Sm = { class: "highlight" },
  Om = qr(() =>
    F(
      "thead",
      null,
      [
        F("tr", null, [
          F("th", { class: "line-name" }, "Nome"),
          F("th", null, "Colunas"),
          F("th", null, "Etiquetas"),
          F("th"),
          F("th"),
        ]),
      ],
      -1
    )
  ),
  Tm = ["onClick"],
  Dm = qr(() => F("i", { class: "material-icons" }, "delete", -1)),
  Lm = [Dm],
  Pm = ["onClick"],
  Am = qr(() => F("i", { class: "material-icons" }, "send", -1)),
  Im = [Am];
function Rm(e, t, i, n, s, o) {
  return (
    ft(),
    vt("table", Sm, [
      Om,
      F("tbody", null, [
        (ft(!0),
        vt(
          $t,
          null,
          xe(
            e.recurrents,
            (r, a) => (
              ft(),
              vt("tr", { key: a }, [
                F("td", null, ve(r.cardName), 1),
                F("td", null, [
                  F("ul", null, [
                    (ft(!0),
                    vt(
                      $t,
                      null,
                      xe(
                        r.selectedsLists,
                        (c, u) => (ft(), vt("li", { key: u }, ve(c.name), 1))
                      ),
                      128
                    )),
                  ]),
                ]),
                F("td", null, [
                  F("ul", null, [
                    (ft(!0),
                    vt(
                      $t,
                      null,
                      xe(
                        r.selectedsLabels,
                        (c, u) => (ft(), vt("li", { key: u }, ve(c.name), 1))
                      ),
                      128
                    )),
                  ]),
                ]),
                F(
                  "td",
                  { onClick: (c) => e.remove(r.id), class: "remove" },
                  Lm,
                  8,
                  Tm
                ),
                F(
                  "td",
                  { onClick: (c) => e.send(r), class: "remove" },
                  Im,
                  8,
                  Pm
                ),
              ])
            )
          ),
          128
        )),
      ]),
    ])
  );
}
const Bm = _i(Em, [
    ["render", Rm],
    ["__scopeId", "data-v-66f27336"],
  ]),
  Fm = { class: "row" },
  Hm = { class: "col s12" },
  $m = Vt({
    __name: "Recurrents",
    setup(e) {
      return (t, i) => (
        ft(), vt("main", null, [F("div", Fm, [F("div", Hm, [Tt(Bm)])])])
      );
    },
  }),
  Wm = { class: "nav-extended" },
  zm = { class: "nav-content" },
  Nm = { class: "tabs tabs-transparent" },
  Vm = { class: "tab" },
  jm = { class: "tab" },
  qm = Vt({
    __name: "dashboard-nav",
    emits: ["changeView"],
    setup(e, { emit: t }) {
      function i(n) {
        t("changeView", n);
      }
      return (n, s) => (
        ft(),
        vt("nav", Wm, [
          F("div", zm, [
            F("ul", Nm, [
              F("li", Vm, [
                F(
                  "a",
                  {
                    href: "#test1",
                    onClick: s[0] || (s[0] = (o) => i("dashboard")),
                  },
                  "Dashboard"
                ),
              ]),
              F("li", jm, [
                F(
                  "a",
                  {
                    href: "#test2",
                    onClick: s[1] || (s[1] = (o) => i("config")),
                  },
                  "Configura\xE7\xE3o"
                ),
              ]),
            ]),
          ]),
        ])
      );
    },
  });
/*!
 * Chart.js v3.8.2
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */ const Ih = (function () {
  return typeof window > "u"
    ? function (e) {
        return e();
      }
    : window.requestAnimationFrame;
})();
function Rh(e, t, i) {
  const n = i || ((r) => Array.prototype.slice.call(r));
  let s = !1,
    o = [];
  return function (...r) {
    (o = n(r)),
      s ||
        ((s = !0),
        Ih.call(window, () => {
          (s = !1), e.apply(t, o);
        }));
  };
}
function Km(e, t) {
  let i;
  return function (...n) {
    return (
      t ? (clearTimeout(i), (i = setTimeout(e, t, n))) : e.apply(this, n), t
    );
  };
}
const Kr = (e) => (e === "start" ? "left" : e === "end" ? "right" : "center"),
  Zt = (e, t, i) => (e === "start" ? t : e === "end" ? i : (t + i) / 2),
  Ym = (e, t, i, n) =>
    e === (n ? "left" : "right") ? i : e === "center" ? (t + i) / 2 : t;
function Ne() {}
const Um = (function () {
  let e = 0;
  return function () {
    return e++;
  };
})();
function Ot(e) {
  return e === null || typeof e > "u";
}
function Ht(e) {
  if (Array.isArray && Array.isArray(e)) return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function kt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
const qt = (e) => (typeof e == "number" || e instanceof Number) && isFinite(+e);
function pe(e, t) {
  return qt(e) ? e : t;
}
function _t(e, t) {
  return typeof e > "u" ? t : e;
}
const Xm = (e, t) =>
    typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : e / t,
  Bh = (e, t) =>
    typeof e == "string" && e.endsWith("%") ? (parseFloat(e) / 100) * t : +e;
function Bt(e, t, i) {
  if (e && typeof e.call == "function") return e.apply(i, t);
}
function Lt(e, t, i, n) {
  let s, o, r;
  if (Ht(e))
    if (((o = e.length), n)) for (s = o - 1; s >= 0; s--) t.call(i, e[s], s);
    else for (s = 0; s < o; s++) t.call(i, e[s], s);
  else if (kt(e))
    for (r = Object.keys(e), o = r.length, s = 0; s < o; s++)
      t.call(i, e[r[s]], r[s]);
}
function zs(e, t) {
  let i, n, s, o;
  if (!e || !t || e.length !== t.length) return !1;
  for (i = 0, n = e.length; i < n; ++i)
    if (
      ((s = e[i]),
      (o = t[i]),
      s.datasetIndex !== o.datasetIndex || s.index !== o.index)
    )
      return !1;
  return !0;
}
function Ns(e) {
  if (Ht(e)) return e.map(Ns);
  if (kt(e)) {
    const t = Object.create(null),
      i = Object.keys(e),
      n = i.length;
    let s = 0;
    for (; s < n; ++s) t[i[s]] = Ns(e[i[s]]);
    return t;
  }
  return e;
}
function Fh(e) {
  return ["__proto__", "prototype", "constructor"].indexOf(e) === -1;
}
function Qm(e, t, i, n) {
  if (!Fh(e)) return;
  const s = t[e],
    o = i[e];
  kt(s) && kt(o) ? Xn(s, o, n) : (t[e] = Ns(o));
}
function Xn(e, t, i) {
  const n = Ht(t) ? t : [t],
    s = n.length;
  if (!kt(e)) return e;
  i = i || {};
  const o = i.merger || Qm;
  for (let r = 0; r < s; ++r) {
    if (((t = n[r]), !kt(t))) continue;
    const a = Object.keys(t);
    for (let c = 0, u = a.length; c < u; ++c) o(a[c], e, t, i);
  }
  return e;
}
function Rn(e, t) {
  return Xn(e, t, { merger: Jm });
}
function Jm(e, t, i) {
  if (!Fh(e)) return;
  const n = t[e],
    s = i[e];
  kt(n) && kt(s)
    ? Rn(n, s)
    : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ns(s));
}
const Gm = "",
  Zm = ".";
function ol(e, t) {
  const i = e.indexOf(Zm, t);
  return i === -1 ? e.length : i;
}
function gi(e, t) {
  if (t === Gm) return e;
  let i = 0,
    n = ol(t, i);
  for (; e && n > i; ) (e = e[t.slice(i, n)]), (i = n + 1), (n = ol(t, i));
  return e;
}
function Yr(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const _e = (e) => typeof e < "u",
  mi = (e) => typeof e == "function",
  rl = (e, t) => {
    if (e.size !== t.size) return !1;
    for (const i of e) if (!t.has(i)) return !1;
    return !0;
  };
function tv(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Wt = Math.PI,
  Pt = 2 * Wt,
  ev = Pt + Wt,
  Vs = Number.POSITIVE_INFINITY,
  iv = Wt / 180,
  Nt = Wt / 2,
  _n = Wt / 4,
  al = (Wt * 2) / 3,
  me = Math.log10,
  Re = Math.sign;
function ll(e) {
  const t = Math.round(e);
  e = Bn(e, t, e / 1e3) ? t : e;
  const i = Math.pow(10, Math.floor(me(e))),
    n = e / i;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * i;
}
function nv(e) {
  const t = [],
    i = Math.sqrt(e);
  let n;
  for (n = 1; n < i; n++) e % n === 0 && (t.push(n), t.push(e / n));
  return i === (i | 0) && t.push(i), t.sort((s, o) => s - o).pop(), t;
}
function Qn(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
function Bn(e, t, i) {
  return Math.abs(e - t) < i;
}
function sv(e, t) {
  const i = Math.round(e);
  return i - t <= e && i + t >= e;
}
function Hh(e, t, i) {
  let n, s, o;
  for (n = 0, s = e.length; n < s; n++)
    (o = e[n][i]),
      isNaN(o) || ((t.min = Math.min(t.min, o)), (t.max = Math.max(t.max, o)));
}
function ke(e) {
  return e * (Wt / 180);
}
function Ur(e) {
  return e * (180 / Wt);
}
function cl(e) {
  if (!qt(e)) return;
  let t = 1,
    i = 0;
  for (; Math.round(e * t) / t !== e; ) (t *= 10), i++;
  return i;
}
function $h(e, t) {
  const i = t.x - e.x,
    n = t.y - e.y,
    s = Math.sqrt(i * i + n * n);
  let o = Math.atan2(n, i);
  return o < -0.5 * Wt && (o += Pt), { angle: o, distance: s };
}
function dr(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function ov(e, t) {
  return ((e - t + ev) % Pt) - Wt;
}
function ce(e) {
  return ((e % Pt) + Pt) % Pt;
}
function Jn(e, t, i, n) {
  const s = ce(e),
    o = ce(t),
    r = ce(i),
    a = ce(o - s),
    c = ce(r - s),
    u = ce(s - o),
    f = ce(s - r);
  return s === o || s === r || (n && o === r) || (a > c && u < f);
}
function Xt(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function rv(e) {
  return Xt(e, -32768, 32767);
}
function Ye(e, t, i, n = 1e-6) {
  return e >= Math.min(t, i) - n && e <= Math.max(t, i) + n;
}
const ms = (e) => e === 0 || e === 1,
  hl = (e, t, i) =>
    -(Math.pow(2, 10 * (e -= 1)) * Math.sin(((e - t) * Pt) / i)),
  ul = (e, t, i) => Math.pow(2, -10 * e) * Math.sin(((e - t) * Pt) / i) + 1,
  Fn = {
    linear: (e) => e,
    easeInQuad: (e) => e * e,
    easeOutQuad: (e) => -e * (e - 2),
    easeInOutQuad: (e) =>
      (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
    easeInCubic: (e) => e * e * e,
    easeOutCubic: (e) => (e -= 1) * e * e + 1,
    easeInOutCubic: (e) =>
      (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
    easeInQuart: (e) => e * e * e * e,
    easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
    easeInOutQuart: (e) =>
      (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
    easeInQuint: (e) => e * e * e * e * e,
    easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
    easeInOutQuint: (e) =>
      (e /= 0.5) < 1
        ? 0.5 * e * e * e * e * e
        : 0.5 * ((e -= 2) * e * e * e * e + 2),
    easeInSine: (e) => -Math.cos(e * Nt) + 1,
    easeOutSine: (e) => Math.sin(e * Nt),
    easeInOutSine: (e) => -0.5 * (Math.cos(Wt * e) - 1),
    easeInExpo: (e) => (e === 0 ? 0 : Math.pow(2, 10 * (e - 1))),
    easeOutExpo: (e) => (e === 1 ? 1 : -Math.pow(2, -10 * e) + 1),
    easeInOutExpo: (e) =>
      ms(e)
        ? e
        : e < 0.5
        ? 0.5 * Math.pow(2, 10 * (e * 2 - 1))
        : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
    easeInCirc: (e) => (e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1)),
    easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
    easeInOutCirc: (e) =>
      (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
    easeInElastic: (e) => (ms(e) ? e : hl(e, 0.075, 0.3)),
    easeOutElastic: (e) => (ms(e) ? e : ul(e, 0.075, 0.3)),
    easeInOutElastic(e) {
      return ms(e)
        ? e
        : e < 0.5
        ? 0.5 * hl(e * 2, 0.1125, 0.45)
        : 0.5 + 0.5 * ul(e * 2 - 1, 0.1125, 0.45);
    },
    easeInBack(e) {
      return e * e * ((1.70158 + 1) * e - 1.70158);
    },
    easeOutBack(e) {
      return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
    },
    easeInOutBack(e) {
      let t = 1.70158;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    },
    easeInBounce: (e) => 1 - Fn.easeOutBounce(1 - e),
    easeOutBounce(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    },
    easeInOutBounce: (e) =>
      e < 0.5
        ? Fn.easeInBounce(e * 2) * 0.5
        : Fn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5,
  };
/*!
 * @kurkle/color v0.2.1
 * https://github.com/kurkle/color#readme
 * (c) 2022 Jukka Kurkela
 * Released under the MIT License
 */ function ns(e) {
  return (e + 0.5) | 0;
}
const li = (e, t, i) => Math.max(Math.min(e, i), t);
function En(e) {
  return li(ns(e * 2.55), 0, 255);
}
function fi(e) {
  return li(ns(e * 255), 0, 255);
}
function qe(e) {
  return li(ns(e / 2.55) / 100, 0, 1);
}
function dl(e) {
  return li(ns(e * 100), 0, 100);
}
const fe = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  },
  fr = [..."0123456789ABCDEF"],
  av = (e) => fr[e & 15],
  lv = (e) => fr[(e & 240) >> 4] + fr[e & 15],
  vs = (e) => (e & 240) >> 4 === (e & 15),
  cv = (e) => vs(e.r) && vs(e.g) && vs(e.b) && vs(e.a);
function hv(e) {
  let t = e.length,
    i;
  return (
    e[0] === "#" &&
      (t === 4 || t === 5
        ? (i = {
            r: 255 & (fe[e[1]] * 17),
            g: 255 & (fe[e[2]] * 17),
            b: 255 & (fe[e[3]] * 17),
            a: t === 5 ? fe[e[4]] * 17 : 255,
          })
        : (t === 7 || t === 9) &&
          (i = {
            r: (fe[e[1]] << 4) | fe[e[2]],
            g: (fe[e[3]] << 4) | fe[e[4]],
            b: (fe[e[5]] << 4) | fe[e[6]],
            a: t === 9 ? (fe[e[7]] << 4) | fe[e[8]] : 255,
          })),
    i
  );
}
const uv = (e, t) => (e < 255 ? t(e) : "");
function dv(e) {
  const t = cv(e) ? av : lv;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + uv(e.a, t) : void 0;
}
const fv =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Wh(e, t, i) {
  const n = t * Math.min(i, 1 - i),
    s = (o, r = (o + e / 30) % 12) =>
      i - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [s(0), s(8), s(4)];
}
function pv(e, t, i) {
  const n = (s, o = (s + e / 60) % 6) =>
    i - i * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [n(5), n(3), n(1)];
}
function gv(e, t, i) {
  const n = Wh(e, 1, 0.5);
  let s;
  for (t + i > 1 && ((s = 1 / (t + i)), (t *= s), (i *= s)), s = 0; s < 3; s++)
    (n[s] *= 1 - t - i), (n[s] += t);
  return n;
}
function mv(e, t, i, n, s) {
  return e === s
    ? (t - i) / n + (t < i ? 6 : 0)
    : t === s
    ? (i - e) / n + 2
    : (e - t) / n + 4;
}
function Xr(e) {
  const i = e.r / 255,
    n = e.g / 255,
    s = e.b / 255,
    o = Math.max(i, n, s),
    r = Math.min(i, n, s),
    a = (o + r) / 2;
  let c, u, f;
  return (
    o !== r &&
      ((f = o - r),
      (u = a > 0.5 ? f / (2 - o - r) : f / (o + r)),
      (c = mv(i, n, s, f, o)),
      (c = c * 60 + 0.5)),
    [c | 0, u || 0, a]
  );
}
function Qr(e, t, i, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, i, n)).map(fi);
}
function Jr(e, t, i) {
  return Qr(Wh, e, t, i);
}
function vv(e, t, i) {
  return Qr(gv, e, t, i);
}
function _v(e, t, i) {
  return Qr(pv, e, t, i);
}
function zh(e) {
  return ((e % 360) + 360) % 360;
}
function yv(e) {
  const t = fv.exec(e);
  let i = 255,
    n;
  if (!t) return;
  t[5] !== n && (i = t[6] ? En(+t[5]) : fi(+t[5]));
  const s = zh(+t[2]),
    o = +t[3] / 100,
    r = +t[4] / 100;
  return (
    t[1] === "hwb"
      ? (n = vv(s, o, r))
      : t[1] === "hsv"
      ? (n = _v(s, o, r))
      : (n = Jr(s, o, r)),
    { r: n[0], g: n[1], b: n[2], a: i }
  );
}
function bv(e, t) {
  let i = Xr(e);
  (i[0] = zh(i[0] + t)), (i = Jr(i)), (e.r = i[0]), (e.g = i[1]), (e.b = i[2]);
}
function xv(e) {
  if (!e) return;
  const t = Xr(e),
    i = t[0],
    n = dl(t[1]),
    s = dl(t[2]);
  return e.a < 255
    ? `hsla(${i}, ${n}%, ${s}%, ${qe(e.a)})`
    : `hsl(${i}, ${n}%, ${s}%)`;
}
const fl = {
    x: "dark",
    Z: "light",
    Y: "re",
    X: "blu",
    W: "gr",
    V: "medium",
    U: "slate",
    A: "ee",
    T: "ol",
    S: "or",
    B: "ra",
    C: "lateg",
    D: "ights",
    R: "in",
    Q: "turquois",
    E: "hi",
    P: "ro",
    O: "al",
    N: "le",
    M: "de",
    L: "yello",
    F: "en",
    K: "ch",
    G: "arks",
    H: "ea",
    I: "ightg",
    J: "wh",
  },
  pl = {
    OiceXe: "f0f8ff",
    antiquewEte: "faebd7",
    aqua: "ffff",
    aquamarRe: "7fffd4",
    azuY: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "0",
    blanKedOmond: "ffebcd",
    Xe: "ff",
    XeviTet: "8a2be2",
    bPwn: "a52a2a",
    burlywood: "deb887",
    caMtXe: "5f9ea0",
    KartYuse: "7fff00",
    KocTate: "d2691e",
    cSO: "ff7f50",
    cSnflowerXe: "6495ed",
    cSnsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "ffff",
    xXe: "8b",
    xcyan: "8b8b",
    xgTMnPd: "b8860b",
    xWay: "a9a9a9",
    xgYF: "6400",
    xgYy: "a9a9a9",
    xkhaki: "bdb76b",
    xmagFta: "8b008b",
    xTivegYF: "556b2f",
    xSange: "ff8c00",
    xScEd: "9932cc",
    xYd: "8b0000",
    xsOmon: "e9967a",
    xsHgYF: "8fbc8f",
    xUXe: "483d8b",
    xUWay: "2f4f4f",
    xUgYy: "2f4f4f",
    xQe: "ced1",
    xviTet: "9400d3",
    dAppRk: "ff1493",
    dApskyXe: "bfff",
    dimWay: "696969",
    dimgYy: "696969",
    dodgerXe: "1e90ff",
    fiYbrick: "b22222",
    flSOwEte: "fffaf0",
    foYstWAn: "228b22",
    fuKsia: "ff00ff",
    gaRsbSo: "dcdcdc",
    ghostwEte: "f8f8ff",
    gTd: "ffd700",
    gTMnPd: "daa520",
    Way: "808080",
    gYF: "8000",
    gYFLw: "adff2f",
    gYy: "808080",
    honeyMw: "f0fff0",
    hotpRk: "ff69b4",
    RdianYd: "cd5c5c",
    Rdigo: "4b0082",
    ivSy: "fffff0",
    khaki: "f0e68c",
    lavFMr: "e6e6fa",
    lavFMrXsh: "fff0f5",
    lawngYF: "7cfc00",
    NmoncEffon: "fffacd",
    ZXe: "add8e6",
    ZcSO: "f08080",
    Zcyan: "e0ffff",
    ZgTMnPdLw: "fafad2",
    ZWay: "d3d3d3",
    ZgYF: "90ee90",
    ZgYy: "d3d3d3",
    ZpRk: "ffb6c1",
    ZsOmon: "ffa07a",
    ZsHgYF: "20b2aa",
    ZskyXe: "87cefa",
    ZUWay: "778899",
    ZUgYy: "778899",
    ZstAlXe: "b0c4de",
    ZLw: "ffffe0",
    lime: "ff00",
    limegYF: "32cd32",
    lRF: "faf0e6",
    magFta: "ff00ff",
    maPon: "800000",
    VaquamarRe: "66cdaa",
    VXe: "cd",
    VScEd: "ba55d3",
    VpurpN: "9370db",
    VsHgYF: "3cb371",
    VUXe: "7b68ee",
    VsprRggYF: "fa9a",
    VQe: "48d1cc",
    VviTetYd: "c71585",
    midnightXe: "191970",
    mRtcYam: "f5fffa",
    mistyPse: "ffe4e1",
    moccasR: "ffe4b5",
    navajowEte: "ffdead",
    navy: "80",
    Tdlace: "fdf5e6",
    Tive: "808000",
    TivedBb: "6b8e23",
    Sange: "ffa500",
    SangeYd: "ff4500",
    ScEd: "da70d6",
    pOegTMnPd: "eee8aa",
    pOegYF: "98fb98",
    pOeQe: "afeeee",
    pOeviTetYd: "db7093",
    papayawEp: "ffefd5",
    pHKpuff: "ffdab9",
    peru: "cd853f",
    pRk: "ffc0cb",
    plum: "dda0dd",
    powMrXe: "b0e0e6",
    purpN: "800080",
    YbeccapurpN: "663399",
    Yd: "ff0000",
    Psybrown: "bc8f8f",
    PyOXe: "4169e1",
    saddNbPwn: "8b4513",
    sOmon: "fa8072",
    sandybPwn: "f4a460",
    sHgYF: "2e8b57",
    sHshell: "fff5ee",
    siFna: "a0522d",
    silver: "c0c0c0",
    skyXe: "87ceeb",
    UXe: "6a5acd",
    UWay: "708090",
    UgYy: "708090",
    snow: "fffafa",
    sprRggYF: "ff7f",
    stAlXe: "4682b4",
    tan: "d2b48c",
    teO: "8080",
    tEstN: "d8bfd8",
    tomato: "ff6347",
    Qe: "40e0d0",
    viTet: "ee82ee",
    JHt: "f5deb3",
    wEte: "ffffff",
    wEtesmoke: "f5f5f5",
    Lw: "ffff00",
    LwgYF: "9acd32",
  };
function wv() {
  const e = {},
    t = Object.keys(pl),
    i = Object.keys(fl);
  let n, s, o, r, a;
  for (n = 0; n < t.length; n++) {
    for (r = a = t[n], s = 0; s < i.length; s++)
      (o = i[s]), (a = a.replace(o, fl[o]));
    (o = parseInt(pl[r], 16)),
      (e[a] = [(o >> 16) & 255, (o >> 8) & 255, o & 255]);
  }
  return e;
}
let _s;
function kv(e) {
  _s || ((_s = wv()), (_s.transparent = [0, 0, 0, 0]));
  const t = _s[e.toLowerCase()];
  return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 };
}
const Cv =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Mv(e) {
  const t = Cv.exec(e);
  let i = 255,
    n,
    s,
    o;
  if (t) {
    if (t[7] !== n) {
      const r = +t[7];
      i = t[8] ? En(r) : li(r * 255, 0, 255);
    }
    return (
      (n = +t[1]),
      (s = +t[3]),
      (o = +t[5]),
      (n = 255 & (t[2] ? En(n) : li(n, 0, 255))),
      (s = 255 & (t[4] ? En(s) : li(s, 0, 255))),
      (o = 255 & (t[6] ? En(o) : li(o, 0, 255))),
      { r: n, g: s, b: o, a: i }
    );
  }
}
function Ev(e) {
  return (
    e &&
    (e.a < 255
      ? `rgba(${e.r}, ${e.g}, ${e.b}, ${qe(e.a)})`
      : `rgb(${e.r}, ${e.g}, ${e.b})`)
  );
}
const Ao = (e) =>
    e <= 0.0031308 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055,
  Vi = (e) => (e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4));
function Sv(e, t, i) {
  const n = Vi(qe(e.r)),
    s = Vi(qe(e.g)),
    o = Vi(qe(e.b));
  return {
    r: fi(Ao(n + i * (Vi(qe(t.r)) - n))),
    g: fi(Ao(s + i * (Vi(qe(t.g)) - s))),
    b: fi(Ao(o + i * (Vi(qe(t.b)) - o))),
    a: e.a + i * (t.a - e.a),
  };
}
function ys(e, t, i) {
  if (e) {
    let n = Xr(e);
    (n[t] = Math.max(0, Math.min(n[t] + n[t] * i, t === 0 ? 360 : 1))),
      (n = Jr(n)),
      (e.r = n[0]),
      (e.g = n[1]),
      (e.b = n[2]);
  }
}
function Nh(e, t) {
  return e && Object.assign(t || {}, e);
}
function gl(e) {
  let t = { r: 0, g: 0, b: 0, a: 255 };
  return (
    Array.isArray(e)
      ? e.length >= 3 &&
        ((t = { r: e[0], g: e[1], b: e[2], a: 255 }),
        e.length > 3 && (t.a = fi(e[3])))
      : ((t = Nh(e, { r: 0, g: 0, b: 0, a: 1 })), (t.a = fi(t.a))),
    t
  );
}
function Ov(e) {
  return e.charAt(0) === "r" ? Mv(e) : yv(e);
}
class js {
  constructor(t) {
    if (t instanceof js) return t;
    const i = typeof t;
    let n;
    i === "object"
      ? (n = gl(t))
      : i === "string" && (n = hv(t) || kv(t) || Ov(t)),
      (this._rgb = n),
      (this._valid = !!n);
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    const t = Nh(this._rgb);
    return t && (t.a = qe(t.a)), t;
  }
  set rgb(t) {
    this._rgb = gl(t);
  }
  rgbString() {
    return this._valid ? Ev(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? dv(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? xv(this._rgb) : void 0;
  }
  mix(t, i) {
    if (t) {
      const n = this.rgb,
        s = t.rgb;
      let o;
      const r = i === o ? 0.5 : i,
        a = 2 * r - 1,
        c = n.a - s.a,
        u = ((a * c === -1 ? a : (a + c) / (1 + a * c)) + 1) / 2;
      (o = 1 - u),
        (n.r = 255 & (u * n.r + o * s.r + 0.5)),
        (n.g = 255 & (u * n.g + o * s.g + 0.5)),
        (n.b = 255 & (u * n.b + o * s.b + 0.5)),
        (n.a = r * n.a + (1 - r) * s.a),
        (this.rgb = n);
    }
    return this;
  }
  interpolate(t, i) {
    return t && (this._rgb = Sv(this._rgb, t._rgb, i)), this;
  }
  clone() {
    return new js(this.rgb);
  }
  alpha(t) {
    return (this._rgb.a = fi(t)), this;
  }
  clearer(t) {
    const i = this._rgb;
    return (i.a *= 1 - t), this;
  }
  greyscale() {
    const t = this._rgb,
      i = ns(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return (t.r = t.g = t.b = i), this;
  }
  opaquer(t) {
    const i = this._rgb;
    return (i.a *= 1 + t), this;
  }
  negate() {
    const t = this._rgb;
    return (t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this;
  }
  lighten(t) {
    return ys(this._rgb, 2, t), this;
  }
  darken(t) {
    return ys(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ys(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ys(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return bv(this._rgb, t), this;
  }
}
function Vh(e) {
  return new js(e);
}
function jh(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ml(e) {
  return jh(e) ? e : Vh(e);
}
function Io(e) {
  return jh(e) ? e : Vh(e).saturate(0.5).darken(0.1).hexString();
}
const Fi = Object.create(null),
  pr = Object.create(null);
function Hn(e, t) {
  if (!t) return e;
  const i = t.split(".");
  for (let n = 0, s = i.length; n < s; ++n) {
    const o = i[n];
    e = e[o] || (e[o] = Object.create(null));
  }
  return e;
}
function Ro(e, t, i) {
  return typeof t == "string" ? Xn(Hn(e, t), i) : Xn(Hn(e, ""), t);
}
class Tv {
  constructor(t) {
    (this.animation = void 0),
      (this.backgroundColor = "rgba(0,0,0,0.1)"),
      (this.borderColor = "rgba(0,0,0,0.1)"),
      (this.color = "#666"),
      (this.datasets = {}),
      (this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio()),
      (this.elements = {}),
      (this.events = [
        "mousemove",
        "mouseout",
        "click",
        "touchstart",
        "touchmove",
      ]),
      (this.font = {
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        style: "normal",
        lineHeight: 1.2,
        weight: null,
      }),
      (this.hover = {}),
      (this.hoverBackgroundColor = (i, n) => Io(n.backgroundColor)),
      (this.hoverBorderColor = (i, n) => Io(n.borderColor)),
      (this.hoverColor = (i, n) => Io(n.color)),
      (this.indexAxis = "x"),
      (this.interaction = {
        mode: "nearest",
        intersect: !0,
        includeInvisible: !1,
      }),
      (this.maintainAspectRatio = !0),
      (this.onHover = null),
      (this.onClick = null),
      (this.parsing = !0),
      (this.plugins = {}),
      (this.responsive = !0),
      (this.scale = void 0),
      (this.scales = {}),
      (this.showLine = !0),
      (this.drawActiveElementsOnTop = !0),
      this.describe(t);
  }
  set(t, i) {
    return Ro(this, t, i);
  }
  get(t) {
    return Hn(this, t);
  }
  describe(t, i) {
    return Ro(pr, t, i);
  }
  override(t, i) {
    return Ro(Fi, t, i);
  }
  route(t, i, n, s) {
    const o = Hn(this, t),
      r = Hn(this, n),
      a = "_" + i;
    Object.defineProperties(o, {
      [a]: { value: o[i], writable: !0 },
      [i]: {
        enumerable: !0,
        get() {
          const c = this[a],
            u = r[s];
          return kt(c) ? Object.assign({}, u, c) : _t(c, u);
        },
        set(c) {
          this[a] = c;
        },
      },
    });
  }
}
const Ct = new Tv({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: { _fallback: "interaction" },
  interaction: { _scriptable: !1, _indexable: !1 },
});
function Dv(e) {
  return !e || Ot(e.size) || Ot(e.family)
    ? null
    : (e.style ? e.style + " " : "") +
        (e.weight ? e.weight + " " : "") +
        e.size +
        "px " +
        e.family;
}
function qs(e, t, i, n, s) {
  let o = t[s];
  return (
    o || ((o = t[s] = e.measureText(s).width), i.push(s)), o > n && (n = o), n
  );
}
function Lv(e, t, i, n) {
  n = n || {};
  let s = (n.data = n.data || {}),
    o = (n.garbageCollect = n.garbageCollect || []);
  n.font !== t &&
    ((s = n.data = {}), (o = n.garbageCollect = []), (n.font = t)),
    e.save(),
    (e.font = t);
  let r = 0;
  const a = i.length;
  let c, u, f, m, b;
  for (c = 0; c < a; c++)
    if (((m = i[c]), m != null && Ht(m) !== !0)) r = qs(e, s, o, r, m);
    else if (Ht(m))
      for (u = 0, f = m.length; u < f; u++)
        (b = m[u]), b != null && !Ht(b) && (r = qs(e, s, o, r, b));
  e.restore();
  const x = o.length / 2;
  if (x > i.length) {
    for (c = 0; c < x; c++) delete s[o[c]];
    o.splice(0, x);
  }
  return r;
}
function Mi(e, t, i) {
  const n = e.currentDevicePixelRatio,
    s = i !== 0 ? Math.max(i / 2, 0.5) : 0;
  return Math.round((t - s) * n) / n + s;
}
function vl(e, t) {
  (t = t || e.getContext("2d")),
    t.save(),
    t.resetTransform(),
    t.clearRect(0, 0, e.width, e.height),
    t.restore();
}
function gr(e, t, i, n) {
  qh(e, t, i, n, null);
}
function qh(e, t, i, n, s) {
  let o, r, a, c, u, f;
  const m = t.pointStyle,
    b = t.rotation,
    x = t.radius;
  let S = (b || 0) * iv;
  if (
    m &&
    typeof m == "object" &&
    ((o = m.toString()),
    o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")
  ) {
    e.save(),
      e.translate(i, n),
      e.rotate(S),
      e.drawImage(m, -m.width / 2, -m.height / 2, m.width, m.height),
      e.restore();
    return;
  }
  if (!(isNaN(x) || x <= 0)) {
    switch ((e.beginPath(), m)) {
      default:
        s ? e.ellipse(i, n, s / 2, x, 0, 0, Pt) : e.arc(i, n, x, 0, Pt),
          e.closePath();
        break;
      case "triangle":
        e.moveTo(i + Math.sin(S) * x, n - Math.cos(S) * x),
          (S += al),
          e.lineTo(i + Math.sin(S) * x, n - Math.cos(S) * x),
          (S += al),
          e.lineTo(i + Math.sin(S) * x, n - Math.cos(S) * x),
          e.closePath();
        break;
      case "rectRounded":
        (u = x * 0.516),
          (c = x - u),
          (r = Math.cos(S + _n) * c),
          (a = Math.sin(S + _n) * c),
          e.arc(i - r, n - a, u, S - Wt, S - Nt),
          e.arc(i + a, n - r, u, S - Nt, S),
          e.arc(i + r, n + a, u, S, S + Nt),
          e.arc(i - a, n + r, u, S + Nt, S + Wt),
          e.closePath();
        break;
      case "rect":
        if (!b) {
          (c = Math.SQRT1_2 * x),
            (f = s ? s / 2 : c),
            e.rect(i - f, n - c, 2 * f, 2 * c);
          break;
        }
        S += _n;
      case "rectRot":
        (r = Math.cos(S) * x),
          (a = Math.sin(S) * x),
          e.moveTo(i - r, n - a),
          e.lineTo(i + a, n - r),
          e.lineTo(i + r, n + a),
          e.lineTo(i - a, n + r),
          e.closePath();
        break;
      case "crossRot":
        S += _n;
      case "cross":
        (r = Math.cos(S) * x),
          (a = Math.sin(S) * x),
          e.moveTo(i - r, n - a),
          e.lineTo(i + r, n + a),
          e.moveTo(i + a, n - r),
          e.lineTo(i - a, n + r);
        break;
      case "star":
        (r = Math.cos(S) * x),
          (a = Math.sin(S) * x),
          e.moveTo(i - r, n - a),
          e.lineTo(i + r, n + a),
          e.moveTo(i + a, n - r),
          e.lineTo(i - a, n + r),
          (S += _n),
          (r = Math.cos(S) * x),
          (a = Math.sin(S) * x),
          e.moveTo(i - r, n - a),
          e.lineTo(i + r, n + a),
          e.moveTo(i + a, n - r),
          e.lineTo(i - a, n + r);
        break;
      case "line":
        (r = s ? s / 2 : Math.cos(S) * x),
          (a = Math.sin(S) * x),
          e.moveTo(i - r, n - a),
          e.lineTo(i + r, n + a);
        break;
      case "dash":
        e.moveTo(i, n), e.lineTo(i + Math.cos(S) * x, n + Math.sin(S) * x);
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Gn(e, t, i) {
  return (
    (i = i || 0.5),
    !t ||
      (e &&
        e.x > t.left - i &&
        e.x < t.right + i &&
        e.y > t.top - i &&
        e.y < t.bottom + i)
  );
}
function fo(e, t) {
  e.save(),
    e.beginPath(),
    e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top),
    e.clip();
}
function po(e) {
  e.restore();
}
function Pv(e, t, i, n, s) {
  if (!t) return e.lineTo(i.x, i.y);
  if (s === "middle") {
    const o = (t.x + i.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, i.y);
  } else (s === "after") != !!n ? e.lineTo(t.x, i.y) : e.lineTo(i.x, t.y);
  e.lineTo(i.x, i.y);
}
function Av(e, t, i, n) {
  if (!t) return e.lineTo(i.x, i.y);
  e.bezierCurveTo(
    n ? t.cp1x : t.cp2x,
    n ? t.cp1y : t.cp2y,
    n ? i.cp2x : i.cp1x,
    n ? i.cp2y : i.cp1y,
    i.x,
    i.y
  );
}
function Hi(e, t, i, n, s, o = {}) {
  const r = Ht(t) ? t : [t],
    a = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, u;
  for (e.save(), e.font = s.string, Iv(e, o), c = 0; c < r.length; ++c)
    (u = r[c]),
      a &&
        (o.strokeColor && (e.strokeStyle = o.strokeColor),
        Ot(o.strokeWidth) || (e.lineWidth = o.strokeWidth),
        e.strokeText(u, i, n, o.maxWidth)),
      e.fillText(u, i, n, o.maxWidth),
      Rv(e, i, n, u, o),
      (n += s.lineHeight);
  e.restore();
}
function Iv(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]),
    Ot(t.rotation) || e.rotate(t.rotation),
    t.color && (e.fillStyle = t.color),
    t.textAlign && (e.textAlign = t.textAlign),
    t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Rv(e, t, i, n, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(n),
      r = t - o.actualBoundingBoxLeft,
      a = t + o.actualBoundingBoxRight,
      c = i - o.actualBoundingBoxAscent,
      u = i + o.actualBoundingBoxDescent,
      f = s.strikethrough ? (c + u) / 2 : u;
    (e.strokeStyle = e.fillStyle),
      e.beginPath(),
      (e.lineWidth = s.decorationWidth || 2),
      e.moveTo(r, f),
      e.lineTo(a, f),
      e.stroke();
  }
}
function Zn(e, t) {
  const { x: i, y: n, w: s, h: o, radius: r } = t;
  e.arc(i + r.topLeft, n + r.topLeft, r.topLeft, -Nt, Wt, !0),
    e.lineTo(i, n + o - r.bottomLeft),
    e.arc(i + r.bottomLeft, n + o - r.bottomLeft, r.bottomLeft, Wt, Nt, !0),
    e.lineTo(i + s - r.bottomRight, n + o),
    e.arc(
      i + s - r.bottomRight,
      n + o - r.bottomRight,
      r.bottomRight,
      Nt,
      0,
      !0
    ),
    e.lineTo(i + s, n + r.topRight),
    e.arc(i + s - r.topRight, n + r.topRight, r.topRight, 0, -Nt, !0),
    e.lineTo(i + r.topLeft, n);
}
const Bv = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),
  Fv = new RegExp(
    /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/
  );
function Hv(e, t) {
  const i = ("" + e).match(Bv);
  if (!i || i[1] === "normal") return t * 1.2;
  switch (((e = +i[2]), i[3])) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const $v = (e) => +e || 0;
function Gr(e, t) {
  const i = {},
    n = kt(t),
    s = n ? Object.keys(t) : t,
    o = kt(e) ? (n ? (r) => _t(e[r], e[t[r]]) : (r) => e[r]) : () => e;
  for (const r of s) i[r] = $v(o(r));
  return i;
}
function Kh(e) {
  return Gr(e, { top: "y", right: "x", bottom: "y", left: "x" });
}
function Ii(e) {
  return Gr(e, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
}
function ee(e) {
  const t = Kh(e);
  return (t.width = t.left + t.right), (t.height = t.top + t.bottom), t;
}
function Yt(e, t) {
  (e = e || {}), (t = t || Ct.font);
  let i = _t(e.size, t.size);
  typeof i == "string" && (i = parseInt(i, 10));
  let n = _t(e.style, t.style);
  n &&
    !("" + n).match(Fv) &&
    (console.warn('Invalid font style specified: "' + n + '"'), (n = ""));
  const s = {
    family: _t(e.family, t.family),
    lineHeight: Hv(_t(e.lineHeight, t.lineHeight), i),
    size: i,
    style: n,
    weight: _t(e.weight, t.weight),
    string: "",
  };
  return (s.string = Dv(s)), s;
}
function Sn(e, t, i, n) {
  let s = !0,
    o,
    r,
    a;
  for (o = 0, r = e.length; o < r; ++o)
    if (
      ((a = e[o]),
      a !== void 0 &&
        (t !== void 0 && typeof a == "function" && ((a = a(t)), (s = !1)),
        i !== void 0 && Ht(a) && ((a = a[i % a.length]), (s = !1)),
        a !== void 0))
    )
      return n && !s && (n.cacheable = !1), a;
}
function Wv(e, t, i) {
  const { min: n, max: s } = e,
    o = Bh(t, (s - n) / 2),
    r = (a, c) => (i && a === 0 ? 0 : a + c);
  return { min: r(n, -Math.abs(o)), max: r(s, o) };
}
function yi(e, t) {
  return Object.assign(Object.create(e), t);
}
function Zr(e, t, i) {
  i = i || ((r) => e[r] < t);
  let n = e.length - 1,
    s = 0,
    o;
  for (; n - s > 1; ) (o = (s + n) >> 1), i(o) ? (s = o) : (n = o);
  return { lo: s, hi: n };
}
const Ue = (e, t, i) => Zr(e, i, (n) => e[n][t] < i),
  zv = (e, t, i) => Zr(e, i, (n) => e[n][t] >= i);
function Nv(e, t, i) {
  let n = 0,
    s = e.length;
  for (; n < s && e[n] < t; ) n++;
  for (; s > n && e[s - 1] > i; ) s--;
  return n > 0 || s < e.length ? e.slice(n, s) : e;
}
const Yh = ["push", "pop", "shift", "splice", "unshift"];
function Vv(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: { listeners: [t] },
  }),
    Yh.forEach((i) => {
      const n = "_onData" + Yr(i),
        s = e[i];
      Object.defineProperty(e, i, {
        configurable: !0,
        enumerable: !1,
        value(...o) {
          const r = s.apply(this, o);
          return (
            e._chartjs.listeners.forEach((a) => {
              typeof a[n] == "function" && a[n](...o);
            }),
            r
          );
        },
      });
    });
}
function _l(e, t) {
  const i = e._chartjs;
  if (!i) return;
  const n = i.listeners,
    s = n.indexOf(t);
  s !== -1 && n.splice(s, 1),
    !(n.length > 0) &&
      (Yh.forEach((o) => {
        delete e[o];
      }),
      delete e._chartjs);
}
function Uh(e) {
  const t = new Set();
  let i, n;
  for (i = 0, n = e.length; i < n; ++i) t.add(e[i]);
  return t.size === n ? e : Array.from(t);
}
function ta(e, t = [""], i = e, n, s = () => e[0]) {
  _e(n) || (n = Gh("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: i,
    _fallback: n,
    _getTarget: s,
    override: (r) => ta([r, ...e], t, i, n),
  };
  return new Proxy(o, {
    deleteProperty(r, a) {
      return delete r[a], delete r._keys, delete e[0][a], !0;
    },
    get(r, a) {
      return Qh(r, a, () => Jv(a, t, e, r));
    },
    getOwnPropertyDescriptor(r, a) {
      return Reflect.getOwnPropertyDescriptor(r._scopes[0], a);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    has(r, a) {
      return bl(r).includes(a);
    },
    ownKeys(r) {
      return bl(r);
    },
    set(r, a, c) {
      const u = r._storage || (r._storage = s());
      return (r[a] = u[a] = c), delete r._keys, !0;
    },
  });
}
function rn(e, t, i, n) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: i,
    _stack: new Set(),
    _descriptors: Xh(e, n),
    setContext: (o) => rn(e, o, i, n),
    override: (o) => rn(e.override(o), t, i, n),
  };
  return new Proxy(s, {
    deleteProperty(o, r) {
      return delete o[r], delete e[r], !0;
    },
    get(o, r, a) {
      return Qh(o, r, () => qv(o, r, a));
    },
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys
        ? Reflect.has(e, r)
          ? { enumerable: !0, configurable: !0 }
          : void 0
        : Reflect.getOwnPropertyDescriptor(e, r);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    has(o, r) {
      return Reflect.has(e, r);
    },
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    set(o, r, a) {
      return (e[r] = a), delete o[r], !0;
    },
  });
}
function Xh(e, t = { scriptable: !0, indexable: !0 }) {
  const {
    _scriptable: i = t.scriptable,
    _indexable: n = t.indexable,
    _allKeys: s = t.allKeys,
  } = e;
  return {
    allKeys: s,
    scriptable: i,
    indexable: n,
    isScriptable: mi(i) ? i : () => i,
    isIndexable: mi(n) ? n : () => n,
  };
}
const jv = (e, t) => (e ? e + Yr(t) : t),
  ea = (e, t) =>
    kt(t) &&
    e !== "adapters" &&
    (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Qh(e, t, i) {
  if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
  const n = i();
  return (e[t] = n), n;
}
function qv(e, t, i) {
  const { _proxy: n, _context: s, _subProxy: o, _descriptors: r } = e;
  let a = n[t];
  return (
    mi(a) && r.isScriptable(t) && (a = Kv(t, a, e, i)),
    Ht(a) && a.length && (a = Yv(t, a, e, r.isIndexable)),
    ea(t, a) && (a = rn(a, s, o && o[t], r)),
    a
  );
}
function Kv(e, t, i, n) {
  const { _proxy: s, _context: o, _subProxy: r, _stack: a } = i;
  if (a.has(e))
    throw new Error(
      "Recursion detected: " + Array.from(a).join("->") + "->" + e
    );
  return (
    a.add(e),
    (t = t(o, r || n)),
    a.delete(e),
    ea(e, t) && (t = ia(s._scopes, s, e, t)),
    t
  );
}
function Yv(e, t, i, n) {
  const { _proxy: s, _context: o, _subProxy: r, _descriptors: a } = i;
  if (_e(o.index) && n(e)) t = t[o.index % t.length];
  else if (kt(t[0])) {
    const c = t,
      u = s._scopes.filter((f) => f !== c);
    t = [];
    for (const f of c) {
      const m = ia(u, s, e, f);
      t.push(rn(m, o, r && r[e], a));
    }
  }
  return t;
}
function Jh(e, t, i) {
  return mi(e) ? e(t, i) : e;
}
const Uv = (e, t) => (e === !0 ? t : typeof e == "string" ? gi(t, e) : void 0);
function Xv(e, t, i, n, s) {
  for (const o of t) {
    const r = Uv(i, o);
    if (r) {
      e.add(r);
      const a = Jh(r._fallback, i, s);
      if (_e(a) && a !== i && a !== n) return a;
    } else if (r === !1 && _e(n) && i !== n) return null;
  }
  return !1;
}
function ia(e, t, i, n) {
  const s = t._rootScopes,
    o = Jh(t._fallback, i, n),
    r = [...e, ...s],
    a = new Set();
  a.add(n);
  let c = yl(a, r, i, o || i, n);
  return c === null ||
    (_e(o) && o !== i && ((c = yl(a, r, o, c, n)), c === null))
    ? !1
    : ta(Array.from(a), [""], s, o, () => Qv(t, i, n));
}
function yl(e, t, i, n, s) {
  for (; i; ) i = Xv(e, t, i, n, s);
  return i;
}
function Qv(e, t, i) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const s = n[t];
  return Ht(s) && kt(i) ? i : s;
}
function Jv(e, t, i, n) {
  let s;
  for (const o of t)
    if (((s = Gh(jv(o, e), i)), _e(s))) return ea(e, s) ? ia(i, n, e, s) : s;
}
function Gh(e, t) {
  for (const i of t) {
    if (!i) continue;
    const n = i[e];
    if (_e(n)) return n;
  }
}
function bl(e) {
  let t = e._keys;
  return t || (t = e._keys = Gv(e._scopes)), t;
}
function Gv(e) {
  const t = new Set();
  for (const i of e)
    for (const n of Object.keys(i).filter((s) => !s.startsWith("_"))) t.add(n);
  return Array.from(t);
}
function Zh(e, t, i, n) {
  const { iScale: s } = e,
    { key: o = "r" } = this._parsing,
    r = new Array(n);
  let a, c, u, f;
  for (a = 0, c = n; a < c; ++a)
    (u = a + i), (f = t[u]), (r[a] = { r: s.parse(gi(f, o), u) });
  return r;
}
const Zv = Number.EPSILON || 1e-14,
  an = (e, t) => t < e.length && !e[t].skip && e[t],
  tu = (e) => (e === "x" ? "y" : "x");
function t_(e, t, i, n) {
  const s = e.skip ? t : e,
    o = t,
    r = i.skip ? t : i,
    a = dr(o, s),
    c = dr(r, o);
  let u = a / (a + c),
    f = c / (a + c);
  (u = isNaN(u) ? 0 : u), (f = isNaN(f) ? 0 : f);
  const m = n * u,
    b = n * f;
  return {
    previous: { x: o.x - m * (r.x - s.x), y: o.y - m * (r.y - s.y) },
    next: { x: o.x + b * (r.x - s.x), y: o.y + b * (r.y - s.y) },
  };
}
function e_(e, t, i) {
  const n = e.length;
  let s,
    o,
    r,
    a,
    c,
    u = an(e, 0);
  for (let f = 0; f < n - 1; ++f)
    if (((c = u), (u = an(e, f + 1)), !(!c || !u))) {
      if (Bn(t[f], 0, Zv)) {
        i[f] = i[f + 1] = 0;
        continue;
      }
      (s = i[f] / t[f]),
        (o = i[f + 1] / t[f]),
        (a = Math.pow(s, 2) + Math.pow(o, 2)),
        !(a <= 9) &&
          ((r = 3 / Math.sqrt(a)),
          (i[f] = s * r * t[f]),
          (i[f + 1] = o * r * t[f]));
    }
}
function i_(e, t, i = "x") {
  const n = tu(i),
    s = e.length;
  let o,
    r,
    a,
    c = an(e, 0);
  for (let u = 0; u < s; ++u) {
    if (((r = a), (a = c), (c = an(e, u + 1)), !a)) continue;
    const f = a[i],
      m = a[n];
    r &&
      ((o = (f - r[i]) / 3),
      (a[`cp1${i}`] = f - o),
      (a[`cp1${n}`] = m - o * t[u])),
      c &&
        ((o = (c[i] - f) / 3),
        (a[`cp2${i}`] = f + o),
        (a[`cp2${n}`] = m + o * t[u]));
  }
}
function n_(e, t = "x") {
  const i = tu(t),
    n = e.length,
    s = Array(n).fill(0),
    o = Array(n);
  let r,
    a,
    c,
    u = an(e, 0);
  for (r = 0; r < n; ++r)
    if (((a = c), (c = u), (u = an(e, r + 1)), !!c)) {
      if (u) {
        const f = u[t] - c[t];
        s[r] = f !== 0 ? (u[i] - c[i]) / f : 0;
      }
      o[r] = a
        ? u
          ? Re(s[r - 1]) !== Re(s[r])
            ? 0
            : (s[r - 1] + s[r]) / 2
          : s[r - 1]
        : s[r];
    }
  e_(e, s, o), i_(e, o, t);
}
function bs(e, t, i) {
  return Math.max(Math.min(e, i), t);
}
function s_(e, t) {
  let i,
    n,
    s,
    o,
    r,
    a = Gn(e[0], t);
  for (i = 0, n = e.length; i < n; ++i)
    (r = o),
      (o = a),
      (a = i < n - 1 && Gn(e[i + 1], t)),
      o &&
        ((s = e[i]),
        r &&
          ((s.cp1x = bs(s.cp1x, t.left, t.right)),
          (s.cp1y = bs(s.cp1y, t.top, t.bottom))),
        a &&
          ((s.cp2x = bs(s.cp2x, t.left, t.right)),
          (s.cp2y = bs(s.cp2y, t.top, t.bottom))));
}
function o_(e, t, i, n, s) {
  let o, r, a, c;
  if (
    (t.spanGaps && (e = e.filter((u) => !u.skip)),
    t.cubicInterpolationMode === "monotone")
  )
    n_(e, s);
  else {
    let u = n ? e[e.length - 1] : e[0];
    for (o = 0, r = e.length; o < r; ++o)
      (a = e[o]),
        (c = t_(u, a, e[Math.min(o + 1, r - (n ? 0 : 1)) % r], t.tension)),
        (a.cp1x = c.previous.x),
        (a.cp1y = c.previous.y),
        (a.cp2x = c.next.x),
        (a.cp2y = c.next.y),
        (u = a);
  }
  t.capBezierPoints && s_(e, i);
}
function eu() {
  return typeof window < "u" && typeof document < "u";
}
function na(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Ks(e, t, i) {
  let n;
  return (
    typeof e == "string"
      ? ((n = parseInt(e, 10)),
        e.indexOf("%") !== -1 && (n = (n / 100) * t.parentNode[i]))
      : (n = e),
    n
  );
}
const go = (e) => window.getComputedStyle(e, null);
function r_(e, t) {
  return go(e).getPropertyValue(t);
}
const a_ = ["top", "right", "bottom", "left"];
function Ri(e, t, i) {
  const n = {};
  i = i ? "-" + i : "";
  for (let s = 0; s < 4; s++) {
    const o = a_[s];
    n[o] = parseFloat(e[t + "-" + o + i]) || 0;
  }
  return (n.width = n.left + n.right), (n.height = n.top + n.bottom), n;
}
const l_ = (e, t, i) => (e > 0 || t > 0) && (!i || !i.shadowRoot);
function c_(e, t) {
  const i = e.touches,
    n = i && i.length ? i[0] : e,
    { offsetX: s, offsetY: o } = n;
  let r = !1,
    a,
    c;
  if (l_(s, o, e.target)) (a = s), (c = o);
  else {
    const u = t.getBoundingClientRect();
    (a = n.clientX - u.left), (c = n.clientY - u.top), (r = !0);
  }
  return { x: a, y: c, box: r };
}
function Oi(e, t) {
  if ("native" in e) return e;
  const { canvas: i, currentDevicePixelRatio: n } = t,
    s = go(i),
    o = s.boxSizing === "border-box",
    r = Ri(s, "padding"),
    a = Ri(s, "border", "width"),
    { x: c, y: u, box: f } = c_(e, i),
    m = r.left + (f && a.left),
    b = r.top + (f && a.top);
  let { width: x, height: S } = t;
  return (
    o && ((x -= r.width + a.width), (S -= r.height + a.height)),
    {
      x: Math.round((((c - m) / x) * i.width) / n),
      y: Math.round((((u - b) / S) * i.height) / n),
    }
  );
}
function h_(e, t, i) {
  let n, s;
  if (t === void 0 || i === void 0) {
    const o = na(e);
    if (!o) (t = e.clientWidth), (i = e.clientHeight);
    else {
      const r = o.getBoundingClientRect(),
        a = go(o),
        c = Ri(a, "border", "width"),
        u = Ri(a, "padding");
      (t = r.width - u.width - c.width),
        (i = r.height - u.height - c.height),
        (n = Ks(a.maxWidth, o, "clientWidth")),
        (s = Ks(a.maxHeight, o, "clientHeight"));
    }
  }
  return { width: t, height: i, maxWidth: n || Vs, maxHeight: s || Vs };
}
const Bo = (e) => Math.round(e * 10) / 10;
function u_(e, t, i, n) {
  const s = go(e),
    o = Ri(s, "margin"),
    r = Ks(s.maxWidth, e, "clientWidth") || Vs,
    a = Ks(s.maxHeight, e, "clientHeight") || Vs,
    c = h_(e, t, i);
  let { width: u, height: f } = c;
  if (s.boxSizing === "content-box") {
    const m = Ri(s, "border", "width"),
      b = Ri(s, "padding");
    (u -= b.width + m.width), (f -= b.height + m.height);
  }
  return (
    (u = Math.max(0, u - o.width)),
    (f = Math.max(0, n ? Math.floor(u / n) : f - o.height)),
    (u = Bo(Math.min(u, r, c.maxWidth))),
    (f = Bo(Math.min(f, a, c.maxHeight))),
    u && !f && (f = Bo(u / 2)),
    { width: u, height: f }
  );
}
function xl(e, t, i) {
  const n = t || 1,
    s = Math.floor(e.height * n),
    o = Math.floor(e.width * n);
  (e.height = s / n), (e.width = o / n);
  const r = e.canvas;
  return (
    r.style &&
      (i || (!r.style.height && !r.style.width)) &&
      ((r.style.height = `${e.height}px`), (r.style.width = `${e.width}px`)),
    e.currentDevicePixelRatio !== n || r.height !== s || r.width !== o
      ? ((e.currentDevicePixelRatio = n),
        (r.height = s),
        (r.width = o),
        e.ctx.setTransform(n, 0, 0, n, 0, 0),
        !0)
      : !1
  );
}
const d_ = (function () {
  let e = !1;
  try {
    const t = {
      get passive() {
        return (e = !0), !1;
      },
    };
    window.addEventListener("test", null, t),
      window.removeEventListener("test", null, t);
  } catch {}
  return e;
})();
function wl(e, t) {
  const i = r_(e, t),
    n = i && i.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function Ti(e, t, i, n) {
  return { x: e.x + i * (t.x - e.x), y: e.y + i * (t.y - e.y) };
}
function f_(e, t, i, n) {
  return {
    x: e.x + i * (t.x - e.x),
    y:
      n === "middle"
        ? i < 0.5
          ? e.y
          : t.y
        : n === "after"
        ? i < 1
          ? e.y
          : t.y
        : i > 0
        ? t.y
        : e.y,
  };
}
function p_(e, t, i, n) {
  const s = { x: e.cp2x, y: e.cp2y },
    o = { x: t.cp1x, y: t.cp1y },
    r = Ti(e, s, i),
    a = Ti(s, o, i),
    c = Ti(o, t, i),
    u = Ti(r, a, i),
    f = Ti(a, c, i);
  return Ti(u, f, i);
}
const kl = new Map();
function g_(e, t) {
  t = t || {};
  const i = e + JSON.stringify(t);
  let n = kl.get(i);
  return n || ((n = new Intl.NumberFormat(e, t)), kl.set(i, n)), n;
}
function ss(e, t, i) {
  return g_(t, i).format(e);
}
const m_ = function (e, t) {
    return {
      x(i) {
        return e + e + t - i;
      },
      setWidth(i) {
        t = i;
      },
      textAlign(i) {
        return i === "center" ? i : i === "right" ? "left" : "right";
      },
      xPlus(i, n) {
        return i - n;
      },
      leftForLtr(i, n) {
        return i - n;
      },
    };
  },
  v_ = function () {
    return {
      x(e) {
        return e;
      },
      setWidth(e) {},
      textAlign(e) {
        return e;
      },
      xPlus(e, t) {
        return e + t;
      },
      leftForLtr(e, t) {
        return e;
      },
    };
  };
function Ji(e, t, i) {
  return e ? m_(t, i) : v_();
}
function iu(e, t) {
  let i, n;
  (t === "ltr" || t === "rtl") &&
    ((i = e.canvas.style),
    (n = [i.getPropertyValue("direction"), i.getPropertyPriority("direction")]),
    i.setProperty("direction", t, "important"),
    (e.prevTextDirection = n));
}
function nu(e, t) {
  t !== void 0 &&
    (delete e.prevTextDirection,
    e.canvas.style.setProperty("direction", t[0], t[1]));
}
function su(e) {
  return e === "angle"
    ? { between: Jn, compare: ov, normalize: ce }
    : { between: Ye, compare: (t, i) => t - i, normalize: (t) => t };
}
function Cl({ start: e, end: t, count: i, loop: n, style: s }) {
  return {
    start: e % i,
    end: t % i,
    loop: n && (t - e + 1) % i === 0,
    style: s,
  };
}
function __(e, t, i) {
  const { property: n, start: s, end: o } = i,
    { between: r, normalize: a } = su(n),
    c = t.length;
  let { start: u, end: f, loop: m } = e,
    b,
    x;
  if (m) {
    for (u += c, f += c, b = 0, x = c; b < x && r(a(t[u % c][n]), s, o); ++b)
      u--, f--;
    (u %= c), (f %= c);
  }
  return f < u && (f += c), { start: u, end: f, loop: m, style: e.style };
}
function ou(e, t, i) {
  if (!i) return [e];
  const { property: n, start: s, end: o } = i,
    r = t.length,
    { compare: a, between: c, normalize: u } = su(n),
    { start: f, end: m, loop: b, style: x } = __(e, t, i),
    S = [];
  let p = !1,
    v = null,
    k,
    E,
    y;
  const g = () => c(s, y, k) && a(s, y) !== 0,
    h = () => a(o, k) === 0 || c(o, y, k),
    l = () => p || g(),
    d = () => !p || h();
  for (let C = f, T = f; C <= m; ++C)
    (E = t[C % r]),
      !E.skip &&
        ((k = u(E[n])),
        k !== y &&
          ((p = c(k, s, o)),
          v === null && l() && (v = a(k, s) === 0 ? C : T),
          v !== null &&
            d() &&
            (S.push(Cl({ start: v, end: C, loop: b, count: r, style: x })),
            (v = null)),
          (T = C),
          (y = k)));
  return (
    v !== null && S.push(Cl({ start: v, end: m, loop: b, count: r, style: x })),
    S
  );
}
function ru(e, t) {
  const i = [],
    n = e.segments;
  for (let s = 0; s < n.length; s++) {
    const o = ou(n[s], e.points, t);
    o.length && i.push(...o);
  }
  return i;
}
function y_(e, t, i, n) {
  let s = 0,
    o = t - 1;
  if (i && !n) for (; s < t && !e[s].skip; ) s++;
  for (; s < t && e[s].skip; ) s++;
  for (s %= t, i && (o += s); o > s && e[o % t].skip; ) o--;
  return (o %= t), { start: s, end: o };
}
function b_(e, t, i, n) {
  const s = e.length,
    o = [];
  let r = t,
    a = e[t],
    c;
  for (c = t + 1; c <= i; ++c) {
    const u = e[c % s];
    u.skip || u.stop
      ? a.skip ||
        ((n = !1),
        o.push({ start: t % s, end: (c - 1) % s, loop: n }),
        (t = r = u.stop ? c : null))
      : ((r = c), a.skip && (t = c)),
      (a = u);
  }
  return r !== null && o.push({ start: t % s, end: r % s, loop: n }), o;
}
function x_(e, t) {
  const i = e.points,
    n = e.options.spanGaps,
    s = i.length;
  if (!s) return [];
  const o = !!e._loop,
    { start: r, end: a } = y_(i, s, o, n);
  if (n === !0) return Ml(e, [{ start: r, end: a, loop: o }], i, t);
  const c = a < r ? a + s : a,
    u = !!e._fullLoop && r === 0 && a === s - 1;
  return Ml(e, b_(i, r, c, u), i, t);
}
function Ml(e, t, i, n) {
  return !n || !n.setContext || !i ? t : w_(e, t, i, n);
}
function w_(e, t, i, n) {
  const s = e._chart.getContext(),
    o = El(e.options),
    {
      _datasetIndex: r,
      options: { spanGaps: a },
    } = e,
    c = i.length,
    u = [];
  let f = o,
    m = t[0].start,
    b = m;
  function x(S, p, v, k) {
    const E = a ? -1 : 1;
    if (S !== p) {
      for (S += c; i[S % c].skip; ) S -= E;
      for (; i[p % c].skip; ) p += E;
      S % c !== p % c &&
        (u.push({ start: S % c, end: p % c, loop: v, style: k }),
        (f = k),
        (m = p % c));
    }
  }
  for (const S of t) {
    m = a ? m : S.start;
    let p = i[m % c],
      v;
    for (b = m + 1; b <= S.end; b++) {
      const k = i[b % c];
      (v = El(
        n.setContext(
          yi(s, {
            type: "segment",
            p0: p,
            p1: k,
            p0DataIndex: (b - 1) % c,
            p1DataIndex: b % c,
            datasetIndex: r,
          })
        )
      )),
        k_(v, f) && x(m, b - 1, S.loop, f),
        (p = k),
        (f = v);
    }
    m < b - 1 && x(m, b - 1, S.loop, f);
  }
  return u;
}
function El(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor,
  };
}
function k_(e, t) {
  return t && JSON.stringify(e) !== JSON.stringify(t);
}
/*!
 * Chart.js v3.8.2
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */ class C_ {
  constructor() {
    (this._request = null),
      (this._charts = new Map()),
      (this._running = !1),
      (this._lastDate = void 0);
  }
  _notify(t, i, n, s) {
    const o = i.listeners[s],
      r = i.duration;
    o.forEach((a) =>
      a({
        chart: t,
        initial: i.initial,
        numSteps: r,
        currentStep: Math.min(n - i.start, r),
      })
    );
  }
  _refresh() {
    this._request ||
      ((this._running = !0),
      (this._request = Ih.call(window, () => {
        this._update(),
          (this._request = null),
          this._running && this._refresh();
      })));
  }
  _update(t = Date.now()) {
    let i = 0;
    this._charts.forEach((n, s) => {
      if (!n.running || !n.items.length) return;
      const o = n.items;
      let r = o.length - 1,
        a = !1,
        c;
      for (; r >= 0; --r)
        (c = o[r]),
          c._active
            ? (c._total > n.duration && (n.duration = c._total),
              c.tick(t),
              (a = !0))
            : ((o[r] = o[o.length - 1]), o.pop());
      a && (s.draw(), this._notify(s, n, t, "progress")),
        o.length ||
          ((n.running = !1),
          this._notify(s, n, t, "complete"),
          (n.initial = !1)),
        (i += o.length);
    }),
      (this._lastDate = t),
      i === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const i = this._charts;
    let n = i.get(t);
    return (
      n ||
        ((n = {
          running: !1,
          initial: !0,
          items: [],
          listeners: { complete: [], progress: [] },
        }),
        i.set(t, n)),
      n
    );
  }
  listen(t, i, n) {
    this._getAnims(t).listeners[i].push(n);
  }
  add(t, i) {
    !i || !i.length || this._getAnims(t).items.push(...i);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const i = this._charts.get(t);
    !i ||
      ((i.running = !0),
      (i.start = Date.now()),
      (i.duration = i.items.reduce((n, s) => Math.max(n, s._duration), 0)),
      this._refresh());
  }
  running(t) {
    if (!this._running) return !1;
    const i = this._charts.get(t);
    return !(!i || !i.running || !i.items.length);
  }
  stop(t) {
    const i = this._charts.get(t);
    if (!i || !i.items.length) return;
    const n = i.items;
    let s = n.length - 1;
    for (; s >= 0; --s) n[s].cancel();
    (i.items = []), this._notify(t, i, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
const Ve = new C_();
const Sl = "transparent",
  M_ = {
    boolean(e, t, i) {
      return i > 0.5 ? t : e;
    },
    color(e, t, i) {
      const n = ml(e || Sl),
        s = n.valid && ml(t || Sl);
      return s && s.valid ? s.mix(n, i).hexString() : t;
    },
    number(e, t, i) {
      return e + (t - e) * i;
    },
  };
class E_ {
  constructor(t, i, n, s) {
    const o = i[n];
    s = Sn([t.to, s, o, t.from]);
    const r = Sn([t.from, o, s]);
    (this._active = !0),
      (this._fn = t.fn || M_[t.type || typeof r]),
      (this._easing = Fn[t.easing] || Fn.linear),
      (this._start = Math.floor(Date.now() + (t.delay || 0))),
      (this._duration = this._total = Math.floor(t.duration)),
      (this._loop = !!t.loop),
      (this._target = i),
      (this._prop = n),
      (this._from = r),
      (this._to = s),
      (this._promises = void 0);
  }
  active() {
    return this._active;
  }
  update(t, i, n) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop],
        o = n - this._start,
        r = this._duration - o;
      (this._start = n),
        (this._duration = Math.floor(Math.max(r, t.duration))),
        (this._total += o),
        (this._loop = !!t.loop),
        (this._to = Sn([t.to, i, s, t.from])),
        (this._from = Sn([t.from, s, i]));
    }
  }
  cancel() {
    this._active &&
      (this.tick(Date.now()), (this._active = !1), this._notify(!1));
  }
  tick(t) {
    const i = t - this._start,
      n = this._duration,
      s = this._prop,
      o = this._from,
      r = this._loop,
      a = this._to;
    let c;
    if (((this._active = o !== a && (r || i < n)), !this._active)) {
      (this._target[s] = a), this._notify(!0);
      return;
    }
    if (i < 0) {
      this._target[s] = o;
      return;
    }
    (c = (i / n) % 2),
      (c = r && c > 1 ? 2 - c : c),
      (c = this._easing(Math.min(1, Math.max(0, c)))),
      (this._target[s] = this._fn(o, a, c));
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((i, n) => {
      t.push({ res: i, rej: n });
    });
  }
  _notify(t) {
    const i = t ? "res" : "rej",
      n = this._promises || [];
    for (let s = 0; s < n.length; s++) n[s][i]();
  }
}
const S_ = ["x", "y", "borderWidth", "radius", "tension"],
  O_ = ["color", "borderColor", "backgroundColor"];
Ct.set("animation", {
  delay: void 0,
  duration: 1e3,
  easing: "easeOutQuart",
  fn: void 0,
  from: void 0,
  loop: void 0,
  to: void 0,
  type: void 0,
});
const T_ = Object.keys(Ct.animation);
Ct.describe("animation", {
  _fallback: !1,
  _indexable: !1,
  _scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn",
});
Ct.set("animations", {
  colors: { type: "color", properties: O_ },
  numbers: { type: "number", properties: S_ },
});
Ct.describe("animations", { _fallback: "animation" });
Ct.set("transitions", {
  active: { animation: { duration: 400 } },
  resize: { animation: { duration: 0 } },
  show: {
    animations: {
      colors: { from: "transparent" },
      visible: { type: "boolean", duration: 0 },
    },
  },
  hide: {
    animations: {
      colors: { to: "transparent" },
      visible: { type: "boolean", easing: "linear", fn: (e) => e | 0 },
    },
  },
});
class au {
  constructor(t, i) {
    (this._chart = t), (this._properties = new Map()), this.configure(i);
  }
  configure(t) {
    if (!kt(t)) return;
    const i = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const s = t[n];
      if (!kt(s)) return;
      const o = {};
      for (const r of T_) o[r] = s[r];
      ((Ht(s.properties) && s.properties) || [n]).forEach((r) => {
        (r === n || !i.has(r)) && i.set(r, o);
      });
    });
  }
  _animateOptions(t, i) {
    const n = i.options,
      s = L_(t, n);
    if (!s) return [];
    const o = this._createAnimations(s, n);
    return (
      n.$shared &&
        D_(t.options.$animations, n).then(
          () => {
            t.options = n;
          },
          () => {}
        ),
      o
    );
  }
  _createAnimations(t, i) {
    const n = this._properties,
      s = [],
      o = t.$animations || (t.$animations = {}),
      r = Object.keys(i),
      a = Date.now();
    let c;
    for (c = r.length - 1; c >= 0; --c) {
      const u = r[c];
      if (u.charAt(0) === "$") continue;
      if (u === "options") {
        s.push(...this._animateOptions(t, i));
        continue;
      }
      const f = i[u];
      let m = o[u];
      const b = n.get(u);
      if (m)
        if (b && m.active()) {
          m.update(b, f, a);
          continue;
        } else m.cancel();
      if (!b || !b.duration) {
        t[u] = f;
        continue;
      }
      (o[u] = m = new E_(b, t, u, f)), s.push(m);
    }
    return s;
  }
  update(t, i) {
    if (this._properties.size === 0) {
      Object.assign(t, i);
      return;
    }
    const n = this._createAnimations(t, i);
    if (n.length) return Ve.add(this._chart, n), !0;
  }
}
function D_(e, t) {
  const i = [],
    n = Object.keys(t);
  for (let s = 0; s < n.length; s++) {
    const o = e[n[s]];
    o && o.active() && i.push(o.wait());
  }
  return Promise.all(i);
}
function L_(e, t) {
  if (!t) return;
  let i = e.options;
  if (!i) {
    e.options = t;
    return;
  }
  return (
    i.$shared &&
      (e.options = i = Object.assign({}, i, { $shared: !1, $animations: {} })),
    i
  );
}
function Ol(e, t) {
  const i = (e && e.options) || {},
    n = i.reverse,
    s = i.min === void 0 ? t : 0,
    o = i.max === void 0 ? t : 0;
  return { start: n ? o : s, end: n ? s : o };
}
function P_(e, t, i) {
  if (i === !1) return !1;
  const n = Ol(e, i),
    s = Ol(t, i);
  return { top: s.end, right: n.end, bottom: s.start, left: n.start };
}
function A_(e) {
  let t, i, n, s;
  return (
    kt(e)
      ? ((t = e.top), (i = e.right), (n = e.bottom), (s = e.left))
      : (t = i = n = s = e),
    { top: t, right: i, bottom: n, left: s, disabled: e === !1 }
  );
}
function lu(e, t) {
  const i = [],
    n = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = n.length; s < o; ++s) i.push(n[s].index);
  return i;
}
function Tl(e, t, i, n = {}) {
  const s = e.keys,
    o = n.mode === "single";
  let r, a, c, u;
  if (t !== null) {
    for (r = 0, a = s.length; r < a; ++r) {
      if (((c = +s[r]), c === i)) {
        if (n.all) continue;
        break;
      }
      (u = e.values[c]), qt(u) && (o || t === 0 || Re(t) === Re(u)) && (t += u);
    }
    return t;
  }
}
function I_(e) {
  const t = Object.keys(e),
    i = new Array(t.length);
  let n, s, o;
  for (n = 0, s = t.length; n < s; ++n) (o = t[n]), (i[n] = { x: o, y: e[o] });
  return i;
}
function Dl(e, t) {
  const i = e && e.options.stacked;
  return i || (i === void 0 && t.stack !== void 0);
}
function R_(e, t, i) {
  return `${e.id}.${t.id}.${i.stack || i.type}`;
}
function B_(e) {
  const { min: t, max: i, minDefined: n, maxDefined: s } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: s ? i : Number.POSITIVE_INFINITY,
  };
}
function F_(e, t, i) {
  const n = e[t] || (e[t] = {});
  return n[i] || (n[i] = {});
}
function Ll(e, t, i, n) {
  for (const s of t.getMatchingVisibleMetas(n).reverse()) {
    const o = e[s.index];
    if ((i && o > 0) || (!i && o < 0)) return s.index;
  }
  return null;
}
function Pl(e, t) {
  const { chart: i, _cachedMeta: n } = e,
    s = i._stacks || (i._stacks = {}),
    { iScale: o, vScale: r, index: a } = n,
    c = o.axis,
    u = r.axis,
    f = R_(o, r, n),
    m = t.length;
  let b;
  for (let x = 0; x < m; ++x) {
    const S = t[x],
      { [c]: p, [u]: v } = S,
      k = S._stacks || (S._stacks = {});
    (b = k[u] = F_(s, f, p)),
      (b[a] = v),
      (b._top = Ll(b, r, !0, n.type)),
      (b._bottom = Ll(b, r, !1, n.type));
  }
}
function Fo(e, t) {
  const i = e.scales;
  return Object.keys(i)
    .filter((n) => i[n].axis === t)
    .shift();
}
function H_(e, t) {
  return yi(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset",
  });
}
function $_(e, t, i) {
  return yi(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: i,
    index: t,
    mode: "default",
    type: "data",
  });
}
function yn(e, t) {
  const i = e.controller.index,
    n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const s of t) {
      const o = s._stacks;
      if (!o || o[n] === void 0 || o[n][i] === void 0) return;
      delete o[n][i];
    }
  }
}
const Ho = (e) => e === "reset" || e === "none",
  Al = (e, t) => (t ? e : Object.assign({}, e)),
  W_ = (e, t, i) =>
    e && !t.hidden && t._stacked && { keys: lu(i, !0), values: null };
class Fe {
  constructor(t, i) {
    (this.chart = t),
      (this._ctx = t.ctx),
      (this.index = i),
      (this._cachedDataOpts = {}),
      (this._cachedMeta = this.getMeta()),
      (this._type = this._cachedMeta.type),
      (this.options = void 0),
      (this._parsing = !1),
      (this._data = void 0),
      (this._objectData = void 0),
      (this._sharedOptions = void 0),
      (this._drawStart = void 0),
      (this._drawCount = void 0),
      (this.enableOptionSharing = !1),
      (this.supportsDecimation = !1),
      (this.$context = void 0),
      (this._syncList = []),
      this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(),
      this.linkScales(),
      (t._stacked = Dl(t.vScale, t)),
      this.addElements();
  }
  updateIndex(t) {
    this.index !== t && yn(this._cachedMeta), (this.index = t);
  }
  linkScales() {
    const t = this.chart,
      i = this._cachedMeta,
      n = this.getDataset(),
      s = (m, b, x, S) => (m === "x" ? b : m === "r" ? S : x),
      o = (i.xAxisID = _t(n.xAxisID, Fo(t, "x"))),
      r = (i.yAxisID = _t(n.yAxisID, Fo(t, "y"))),
      a = (i.rAxisID = _t(n.rAxisID, Fo(t, "r"))),
      c = i.indexAxis,
      u = (i.iAxisID = s(c, o, r, a)),
      f = (i.vAxisID = s(c, r, o, a));
    (i.xScale = this.getScaleForId(o)),
      (i.yScale = this.getScaleForId(r)),
      (i.rScale = this.getScaleForId(a)),
      (i.iScale = this.getScaleForId(u)),
      (i.vScale = this.getScaleForId(f));
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const i = this._cachedMeta;
    return t === i.iScale ? i.vScale : i.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && _l(this._data, this), t._stacked && yn(t);
  }
  _dataCheck() {
    const t = this.getDataset(),
      i = t.data || (t.data = []),
      n = this._data;
    if (kt(i)) this._data = I_(i);
    else if (n !== i) {
      if (n) {
        _l(n, this);
        const s = this._cachedMeta;
        yn(s), (s._parsed = []);
      }
      i && Object.isExtensible(i) && Vv(i, this),
        (this._syncList = []),
        (this._data = i);
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(),
      this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const i = this._cachedMeta,
      n = this.getDataset();
    let s = !1;
    this._dataCheck();
    const o = i._stacked;
    (i._stacked = Dl(i.vScale, i)),
      i.stack !== n.stack && ((s = !0), yn(i), (i.stack = n.stack)),
      this._resyncElements(t),
      (s || o !== i._stacked) && Pl(this, i._parsed);
  }
  configure() {
    const t = this.chart.config,
      i = t.datasetScopeKeys(this._type),
      n = t.getOptionScopes(this.getDataset(), i, !0);
    (this.options = t.createResolver(n, this.getContext())),
      (this._parsing = this.options.parsing),
      (this._cachedDataOpts = {});
  }
  parse(t, i) {
    const { _cachedMeta: n, _data: s } = this,
      { iScale: o, _stacked: r } = n,
      a = o.axis;
    let c = t === 0 && i === s.length ? !0 : n._sorted,
      u = t > 0 && n._parsed[t - 1],
      f,
      m,
      b;
    if (this._parsing === !1) (n._parsed = s), (n._sorted = !0), (b = s);
    else {
      Ht(s[t])
        ? (b = this.parseArrayData(n, s, t, i))
        : kt(s[t])
        ? (b = this.parseObjectData(n, s, t, i))
        : (b = this.parsePrimitiveData(n, s, t, i));
      const x = () => m[a] === null || (u && m[a] < u[a]);
      for (f = 0; f < i; ++f)
        (n._parsed[f + t] = m = b[f]), c && (x() && (c = !1), (u = m));
      n._sorted = c;
    }
    r && Pl(this, b);
  }
  parsePrimitiveData(t, i, n, s) {
    const { iScale: o, vScale: r } = t,
      a = o.axis,
      c = r.axis,
      u = o.getLabels(),
      f = o === r,
      m = new Array(s);
    let b, x, S;
    for (b = 0, x = s; b < x; ++b)
      (S = b + n),
        (m[b] = { [a]: f || o.parse(u[S], S), [c]: r.parse(i[S], S) });
    return m;
  }
  parseArrayData(t, i, n, s) {
    const { xScale: o, yScale: r } = t,
      a = new Array(s);
    let c, u, f, m;
    for (c = 0, u = s; c < u; ++c)
      (f = c + n),
        (m = i[f]),
        (a[c] = { x: o.parse(m[0], f), y: r.parse(m[1], f) });
    return a;
  }
  parseObjectData(t, i, n, s) {
    const { xScale: o, yScale: r } = t,
      { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing,
      u = new Array(s);
    let f, m, b, x;
    for (f = 0, m = s; f < m; ++f)
      (b = f + n),
        (x = i[b]),
        (u[f] = { x: o.parse(gi(x, a), b), y: r.parse(gi(x, c), b) });
    return u;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, i, n) {
    const s = this.chart,
      o = this._cachedMeta,
      r = i[t.axis],
      a = { keys: lu(s, !0), values: i._stacks[t.axis] };
    return Tl(a, r, o.index, { mode: n });
  }
  updateRangeFromParsed(t, i, n, s) {
    const o = n[i.axis];
    let r = o === null ? NaN : o;
    const a = s && n._stacks[i.axis];
    s && a && ((s.values = a), (r = Tl(s, o, this._cachedMeta.index))),
      (t.min = Math.min(t.min, r)),
      (t.max = Math.max(t.max, r));
  }
  getMinMax(t, i) {
    const n = this._cachedMeta,
      s = n._parsed,
      o = n._sorted && t === n.iScale,
      r = s.length,
      a = this._getOtherScale(t),
      c = W_(i, n, this.chart),
      u = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
      { min: f, max: m } = B_(a);
    let b, x;
    function S() {
      x = s[b];
      const p = x[a.axis];
      return !qt(x[t.axis]) || f > p || m < p;
    }
    for (
      b = 0;
      b < r && !(!S() && (this.updateRangeFromParsed(u, t, x, c), o));
      ++b
    );
    if (o) {
      for (b = r - 1; b >= 0; --b)
        if (!S()) {
          this.updateRangeFromParsed(u, t, x, c);
          break;
        }
    }
    return u;
  }
  getAllParsedValues(t) {
    const i = this._cachedMeta._parsed,
      n = [];
    let s, o, r;
    for (s = 0, o = i.length; s < o; ++s)
      (r = i[s][t.axis]), qt(r) && n.push(r);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const i = this._cachedMeta,
      n = i.iScale,
      s = i.vScale,
      o = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : "",
    };
  }
  _update(t) {
    const i = this._cachedMeta;
    this.update(t || "default"),
      (i._clip = A_(
        _t(this.options.clip, P_(i.xScale, i.yScale, this.getMaxOverflow()))
      ));
  }
  update(t) {}
  draw() {
    const t = this._ctx,
      i = this.chart,
      n = this._cachedMeta,
      s = n.data || [],
      o = i.chartArea,
      r = [],
      a = this._drawStart || 0,
      c = this._drawCount || s.length - a,
      u = this.options.drawActiveElementsOnTop;
    let f;
    for (n.dataset && n.dataset.draw(t, o, a, c), f = a; f < a + c; ++f) {
      const m = s[f];
      m.hidden || (m.active && u ? r.push(m) : m.draw(t, o));
    }
    for (f = 0; f < r.length; ++f) r[f].draw(t, o);
  }
  getStyle(t, i) {
    const n = i ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset
      ? this.resolveDatasetElementOptions(n)
      : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, i, n) {
    const s = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      (o = r.$context || (r.$context = $_(this.getContext(), t, r))),
        (o.parsed = this.getParsed(t)),
        (o.raw = s.data[t]),
        (o.index = o.dataIndex = t);
    } else
      (o =
        this.$context ||
        (this.$context = H_(this.chart.getContext(), this.index))),
        (o.dataset = s),
        (o.index = o.datasetIndex = this.index);
    return (o.active = !!i), (o.mode = n), o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, i) {
    return this._resolveElementOptions(this.dataElementType.id, i, t);
  }
  _resolveElementOptions(t, i = "default", n) {
    const s = i === "active",
      o = this._cachedDataOpts,
      r = t + "-" + i,
      a = o[r],
      c = this.enableOptionSharing && _e(n);
    if (a) return Al(a, c);
    const u = this.chart.config,
      f = u.datasetElementScopeKeys(this._type, t),
      m = s ? [`${t}Hover`, "hover", t, ""] : [t, ""],
      b = u.getOptionScopes(this.getDataset(), f),
      x = Object.keys(Ct.elements[t]),
      S = () => this.getContext(n, s),
      p = u.resolveNamedOptions(b, x, S, m);
    return p.$shared && ((p.$shared = c), (o[r] = Object.freeze(Al(p, c)))), p;
  }
  _resolveAnimations(t, i, n) {
    const s = this.chart,
      o = this._cachedDataOpts,
      r = `animation-${i}`,
      a = o[r];
    if (a) return a;
    let c;
    if (s.options.animation !== !1) {
      const f = this.chart.config,
        m = f.datasetAnimationScopeKeys(this._type, i),
        b = f.getOptionScopes(this.getDataset(), m);
      c = f.createResolver(b, this.getContext(t, n, i));
    }
    const u = new au(s, c && c.animations);
    return c && c._cacheable && (o[r] = Object.freeze(u)), u;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return (
        this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
      );
  }
  includeOptions(t, i) {
    return !i || Ho(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, i) {
    const n = this.resolveDataElementOptions(t, i),
      s = this._sharedOptions,
      o = this.getSharedOptions(n),
      r = this.includeOptions(i, o) || o !== s;
    return (
      this.updateSharedOptions(o, i, n), { sharedOptions: o, includeOptions: r }
    );
  }
  updateElement(t, i, n, s) {
    Ho(s) ? Object.assign(t, n) : this._resolveAnimations(i, s).update(t, n);
  }
  updateSharedOptions(t, i, n) {
    t && !Ho(i) && this._resolveAnimations(void 0, i).update(t, n);
  }
  _setStyle(t, i, n, s) {
    t.active = s;
    const o = this.getStyle(i, s);
    this._resolveAnimations(i, n, s).update(t, {
      options: (!s && this.getSharedOptions(o)) || o,
    });
  }
  removeHoverStyle(t, i, n) {
    this._setStyle(t, n, "active", !1);
  }
  setHoverStyle(t, i, n) {
    this._setStyle(t, n, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const i = this._data,
      n = this._cachedMeta.data;
    for (const [a, c, u] of this._syncList) this[a](c, u);
    this._syncList = [];
    const s = n.length,
      o = i.length,
      r = Math.min(o, s);
    r && this.parse(0, r),
      o > s
        ? this._insertElements(s, o - s, t)
        : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, i, n = !0) {
    const s = this._cachedMeta,
      o = s.data,
      r = t + i;
    let a;
    const c = (u) => {
      for (u.length += i, a = u.length - 1; a >= r; a--) u[a] = u[a - i];
    };
    for (c(o), a = t; a < r; ++a) o[a] = new this.dataElementType();
    this._parsing && c(s._parsed),
      this.parse(t, i),
      n && this.updateElements(o, t, i, "reset");
  }
  updateElements(t, i, n, s) {}
  _removeElements(t, i) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const s = n._parsed.splice(t, i);
      n._stacked && yn(n, s);
    }
    n.data.splice(t, i);
  }
  _sync(t) {
    if (this._parsing) this._syncList.push(t);
    else {
      const [i, n, s] = t;
      this[i](n, s);
    }
    this.chart._dataChanges.push([this.index, ...t]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync(["_insertElements", this.getDataset().data.length - t, t]);
  }
  _onDataPop() {
    this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(["_removeElements", 0, 1]);
  }
  _onDataSplice(t, i) {
    i && this._sync(["_removeElements", t, i]);
    const n = arguments.length - 2;
    n && this._sync(["_insertElements", t, n]);
  }
  _onDataUnshift() {
    this._sync(["_insertElements", 0, arguments.length]);
  }
}
Fe.defaults = {};
Fe.prototype.datasetElementType = null;
Fe.prototype.dataElementType = null;
function z_(e, t) {
  if (!e._cache.$bar) {
    const i = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let s = 0, o = i.length; s < o; s++)
      n = n.concat(i[s].controller.getAllParsedValues(e));
    e._cache.$bar = Uh(n.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function N_(e) {
  const t = e.iScale,
    i = z_(t, e.type);
  let n = t._length,
    s,
    o,
    r,
    a;
  const c = () => {
    r === 32767 ||
      r === -32768 ||
      (_e(a) && (n = Math.min(n, Math.abs(r - a) || n)), (a = r));
  };
  for (s = 0, o = i.length; s < o; ++s) (r = t.getPixelForValue(i[s])), c();
  for (a = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    (r = t.getPixelForTick(s)), c();
  return n;
}
function V_(e, t, i, n) {
  const s = i.barThickness;
  let o, r;
  return (
    Ot(s)
      ? ((o = t.min * i.categoryPercentage), (r = i.barPercentage))
      : ((o = s * n), (r = 1)),
    { chunk: o / n, ratio: r, start: t.pixels[e] - o / 2 }
  );
}
function j_(e, t, i, n) {
  const s = t.pixels,
    o = s[e];
  let r = e > 0 ? s[e - 1] : null,
    a = e < s.length - 1 ? s[e + 1] : null;
  const c = i.categoryPercentage;
  r === null && (r = o - (a === null ? t.end - t.start : a - o)),
    a === null && (a = o + o - r);
  const u = o - ((o - Math.min(r, a)) / 2) * c;
  return {
    chunk: ((Math.abs(a - r) / 2) * c) / n,
    ratio: i.barPercentage,
    start: u,
  };
}
function q_(e, t, i, n) {
  const s = i.parse(e[0], n),
    o = i.parse(e[1], n),
    r = Math.min(s, o),
    a = Math.max(s, o);
  let c = r,
    u = a;
  Math.abs(r) > Math.abs(a) && ((c = a), (u = r)),
    (t[i.axis] = u),
    (t._custom = { barStart: c, barEnd: u, start: s, end: o, min: r, max: a });
}
function cu(e, t, i, n) {
  return Ht(e) ? q_(e, t, i, n) : (t[i.axis] = i.parse(e, n)), t;
}
function Il(e, t, i, n) {
  const s = e.iScale,
    o = e.vScale,
    r = s.getLabels(),
    a = s === o,
    c = [];
  let u, f, m, b;
  for (u = i, f = i + n; u < f; ++u)
    (b = t[u]),
      (m = {}),
      (m[s.axis] = a || s.parse(r[u], u)),
      c.push(cu(b, m, o, u));
  return c;
}
function $o(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function K_(e, t, i) {
  return e !== 0 ? Re(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= i ? 1 : -1);
}
function Y_(e) {
  let t, i, n, s, o;
  return (
    e.horizontal
      ? ((t = e.base > e.x), (i = "left"), (n = "right"))
      : ((t = e.base < e.y), (i = "bottom"), (n = "top")),
    t ? ((s = "end"), (o = "start")) : ((s = "start"), (o = "end")),
    { start: i, end: n, reverse: t, top: s, bottom: o }
  );
}
function U_(e, t, i, n) {
  let s = t.borderSkipped;
  const o = {};
  if (!s) {
    e.borderSkipped = o;
    return;
  }
  const { start: r, end: a, reverse: c, top: u, bottom: f } = Y_(e);
  s === "middle" &&
    i &&
    ((e.enableBorderRadius = !0),
    (i._top || 0) === n
      ? (s = u)
      : (i._bottom || 0) === n
      ? (s = f)
      : ((o[Rl(f, r, a, c)] = !0), (s = u))),
    (o[Rl(s, r, a, c)] = !0),
    (e.borderSkipped = o);
}
function Rl(e, t, i, n) {
  return n ? ((e = X_(e, t, i)), (e = Bl(e, i, t))) : (e = Bl(e, t, i)), e;
}
function X_(e, t, i) {
  return e === t ? i : e === i ? t : e;
}
function Bl(e, t, i) {
  return e === "start" ? t : e === "end" ? i : e;
}
function Q_(e, { inflateAmount: t }, i) {
  e.inflateAmount = t === "auto" ? (i === 1 ? 0.33 : 0) : t;
}
class mo extends Fe {
  parsePrimitiveData(t, i, n, s) {
    return Il(t, i, n, s);
  }
  parseArrayData(t, i, n, s) {
    return Il(t, i, n, s);
  }
  parseObjectData(t, i, n, s) {
    const { iScale: o, vScale: r } = t,
      { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing,
      u = o.axis === "x" ? a : c,
      f = r.axis === "x" ? a : c,
      m = [];
    let b, x, S, p;
    for (b = n, x = n + s; b < x; ++b)
      (p = i[b]),
        (S = {}),
        (S[o.axis] = o.parse(gi(p, u), b)),
        m.push(cu(gi(p, f), S, r, b));
    return m;
  }
  updateRangeFromParsed(t, i, n, s) {
    super.updateRangeFromParsed(t, i, n, s);
    const o = n._custom;
    o &&
      i === this._cachedMeta.vScale &&
      ((t.min = Math.min(t.min, o.min)), (t.max = Math.max(t.max, o.max)));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const i = this._cachedMeta,
      { iScale: n, vScale: s } = i,
      o = this.getParsed(t),
      r = o._custom,
      a = $o(r)
        ? "[" + r.start + ", " + r.end + "]"
        : "" + s.getLabelForValue(o[s.axis]);
    return { label: "" + n.getLabelForValue(o[n.axis]), value: a };
  }
  initialize() {
    (this.enableOptionSharing = !0), super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const i = this._cachedMeta;
    this.updateElements(i.data, 0, i.data.length, t);
  }
  updateElements(t, i, n, s) {
    const o = s === "reset",
      {
        index: r,
        _cachedMeta: { vScale: a },
      } = this,
      c = a.getBasePixel(),
      u = a.isHorizontal(),
      f = this._getRuler(),
      { sharedOptions: m, includeOptions: b } = this._getSharedOptions(i, s);
    for (let x = i; x < i + n; x++) {
      const S = this.getParsed(x),
        p =
          o || Ot(S[a.axis])
            ? { base: c, head: c }
            : this._calculateBarValuePixels(x),
        v = this._calculateBarIndexPixels(x, f),
        k = (S._stacks || {})[a.axis],
        E = {
          horizontal: u,
          base: p.base,
          enableBorderRadius:
            !k || $o(S._custom) || r === k._top || r === k._bottom,
          x: u ? p.head : v.center,
          y: u ? v.center : p.head,
          height: u ? v.size : Math.abs(p.size),
          width: u ? Math.abs(p.size) : v.size,
        };
      b &&
        (E.options =
          m || this.resolveDataElementOptions(x, t[x].active ? "active" : s));
      const y = E.options || t[x].options;
      U_(E, y, k, r), Q_(E, y, f.ratio), this.updateElement(t[x], x, E, s);
    }
  }
  _getStacks(t, i) {
    const { iScale: n } = this._cachedMeta,
      s = n
        .getMatchingVisibleMetas(this._type)
        .filter((c) => c.controller.options.grouped),
      o = n.options.stacked,
      r = [],
      a = (c) => {
        const u = c.controller.getParsed(i),
          f = u && u[c.vScale.axis];
        if (Ot(f) || isNaN(f)) return !0;
      };
    for (const c of s)
      if (
        !(i !== void 0 && a(c)) &&
        ((o === !1 ||
          r.indexOf(c.stack) === -1 ||
          (o === void 0 && c.stack === void 0)) &&
          r.push(c.stack),
        c.index === t)
      )
        break;
    return r.length || r.push(void 0), r;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, i, n) {
    const s = this._getStacks(t, n),
      o = i !== void 0 ? s.indexOf(i) : -1;
    return o === -1 ? s.length - 1 : o;
  }
  _getRuler() {
    const t = this.options,
      i = this._cachedMeta,
      n = i.iScale,
      s = [];
    let o, r;
    for (o = 0, r = i.data.length; o < r; ++o)
      s.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
    const a = t.barThickness;
    return {
      min: a || N_(i),
      pixels: s,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage,
    };
  }
  _calculateBarValuePixels(t) {
    const {
        _cachedMeta: { vScale: i, _stacked: n },
        options: { base: s, minBarLength: o },
      } = this,
      r = s || 0,
      a = this.getParsed(t),
      c = a._custom,
      u = $o(c);
    let f = a[i.axis],
      m = 0,
      b = n ? this.applyStack(i, a, n) : f,
      x,
      S;
    b !== f && ((m = b - f), (b = f)),
      u &&
        ((f = c.barStart),
        (b = c.barEnd - c.barStart),
        f !== 0 && Re(f) !== Re(c.barEnd) && (m = 0),
        (m += f));
    const p = !Ot(s) && !u ? s : m;
    let v = i.getPixelForValue(p);
    if (
      (this.chart.getDataVisibility(t)
        ? (x = i.getPixelForValue(m + b))
        : (x = v),
      (S = x - v),
      Math.abs(S) < o)
    ) {
      (S = K_(S, i, r) * o), f === r && (v -= S / 2);
      const k = i.getPixelForDecimal(0),
        E = i.getPixelForDecimal(1),
        y = Math.min(k, E),
        g = Math.max(k, E);
      (v = Math.max(Math.min(v, g), y)), (x = v + S);
    }
    if (v === i.getPixelForValue(r)) {
      const k = (Re(S) * i.getLineWidthForValue(r)) / 2;
      (v += k), (S -= k);
    }
    return { size: S, base: v, head: x, center: x + S / 2 };
  }
  _calculateBarIndexPixels(t, i) {
    const n = i.scale,
      s = this.options,
      o = s.skipNull,
      r = _t(s.maxBarThickness, 1 / 0);
    let a, c;
    if (i.grouped) {
      const u = o ? this._getStackCount(t) : i.stackCount,
        f = s.barThickness === "flex" ? j_(t, i, s, u) : V_(t, i, s, u),
        m = this._getStackIndex(
          this.index,
          this._cachedMeta.stack,
          o ? t : void 0
        );
      (a = f.start + f.chunk * m + f.chunk / 2),
        (c = Math.min(r, f.chunk * f.ratio));
    } else
      (a = n.getPixelForValue(this.getParsed(t)[n.axis], t)),
        (c = Math.min(r, i.min * i.ratio));
    return { base: a - c / 2, head: a + c / 2, center: a, size: c };
  }
  draw() {
    const t = this._cachedMeta,
      i = t.vScale,
      n = t.data,
      s = n.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[i.axis] !== null && n[o].draw(this._ctx);
  }
}
mo.id = "bar";
mo.defaults = {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "base", "width", "height"],
    },
  },
};
mo.overrides = {
  scales: {
    _index_: { type: "category", offset: !0, grid: { offset: !0 } },
    _value_: { type: "linear", beginAtZero: !0 },
  },
};
class vo extends Fe {
  initialize() {
    (this.enableOptionSharing = !0), super.initialize();
  }
  parsePrimitiveData(t, i, n, s) {
    const o = super.parsePrimitiveData(t, i, n, s);
    for (let r = 0; r < o.length; r++)
      o[r]._custom = this.resolveDataElementOptions(r + n).radius;
    return o;
  }
  parseArrayData(t, i, n, s) {
    const o = super.parseArrayData(t, i, n, s);
    for (let r = 0; r < o.length; r++) {
      const a = i[n + r];
      o[r]._custom = _t(a[2], this.resolveDataElementOptions(r + n).radius);
    }
    return o;
  }
  parseObjectData(t, i, n, s) {
    const o = super.parseObjectData(t, i, n, s);
    for (let r = 0; r < o.length; r++) {
      const a = i[n + r];
      o[r]._custom = _t(
        a && a.r && +a.r,
        this.resolveDataElementOptions(r + n).radius
      );
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let i = 0;
    for (let n = t.length - 1; n >= 0; --n)
      i = Math.max(i, t[n].size(this.resolveDataElementOptions(n)) / 2);
    return i > 0 && i;
  }
  getLabelAndValue(t) {
    const i = this._cachedMeta,
      { xScale: n, yScale: s } = i,
      o = this.getParsed(t),
      r = n.getLabelForValue(o.x),
      a = s.getLabelForValue(o.y),
      c = o._custom;
    return {
      label: i.label,
      value: "(" + r + ", " + a + (c ? ", " + c : "") + ")",
    };
  }
  update(t) {
    const i = this._cachedMeta.data;
    this.updateElements(i, 0, i.length, t);
  }
  updateElements(t, i, n, s) {
    const o = s === "reset",
      { iScale: r, vScale: a } = this._cachedMeta,
      { sharedOptions: c, includeOptions: u } = this._getSharedOptions(i, s),
      f = r.axis,
      m = a.axis;
    for (let b = i; b < i + n; b++) {
      const x = t[b],
        S = !o && this.getParsed(b),
        p = {},
        v = (p[f] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(S[f])),
        k = (p[m] = o ? a.getBasePixel() : a.getPixelForValue(S[m]));
      (p.skip = isNaN(v) || isNaN(k)),
        u &&
          ((p.options =
            c || this.resolveDataElementOptions(b, x.active ? "active" : s)),
          o && (p.options.radius = 0)),
        this.updateElement(x, b, p, s);
    }
  }
  resolveDataElementOptions(t, i) {
    const n = this.getParsed(t);
    let s = super.resolveDataElementOptions(t, i);
    s.$shared && (s = Object.assign({}, s, { $shared: !1 }));
    const o = s.radius;
    return (
      i !== "active" && (s.radius = 0), (s.radius += _t(n && n._custom, o)), s
    );
  }
}
vo.id = "bubble";
vo.defaults = {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: ["x", "y", "borderWidth", "radius"],
    },
  },
};
vo.overrides = {
  scales: { x: { type: "linear" }, y: { type: "linear" } },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
      },
    },
  },
};
function J_(e, t, i) {
  let n = 1,
    s = 1,
    o = 0,
    r = 0;
  if (t < Pt) {
    const a = e,
      c = a + t,
      u = Math.cos(a),
      f = Math.sin(a),
      m = Math.cos(c),
      b = Math.sin(c),
      x = (y, g, h) => (Jn(y, a, c, !0) ? 1 : Math.max(g, g * i, h, h * i)),
      S = (y, g, h) => (Jn(y, a, c, !0) ? -1 : Math.min(g, g * i, h, h * i)),
      p = x(0, u, m),
      v = x(Nt, f, b),
      k = S(Wt, u, m),
      E = S(Wt + Nt, f, b);
    (n = (p - k) / 2),
      (s = (v - E) / 2),
      (o = -(p + k) / 2),
      (r = -(v + E) / 2);
  }
  return { ratioX: n, ratioY: s, offsetX: o, offsetY: r };
}
class pn extends Fe {
  constructor(t, i) {
    super(t, i),
      (this.enableOptionSharing = !0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.offsetX = void 0),
      (this.offsetY = void 0);
  }
  linkScales() {}
  parse(t, i) {
    const n = this.getDataset().data,
      s = this._cachedMeta;
    if (this._parsing === !1) s._parsed = n;
    else {
      let o = (c) => +n[c];
      if (kt(n[t])) {
        const { key: c = "value" } = this._parsing;
        o = (u) => +gi(n[u], c);
      }
      let r, a;
      for (r = t, a = t + i; r < a; ++r) s._parsed[r] = o(r);
    }
  }
  _getRotation() {
    return ke(this.options.rotation - 90);
  }
  _getCircumference() {
    return ke(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Pt,
      i = -Pt;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n)) {
        const s = this.chart.getDatasetMeta(n).controller,
          o = s._getRotation(),
          r = s._getCircumference();
        (t = Math.min(t, o)), (i = Math.max(i, o + r));
      }
    return { rotation: t, circumference: i - t };
  }
  update(t) {
    const i = this.chart,
      { chartArea: n } = i,
      s = this._cachedMeta,
      o = s.data,
      r =
        this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing,
      a = Math.max((Math.min(n.width, n.height) - r) / 2, 0),
      c = Math.min(Xm(this.options.cutout, a), 1),
      u = this._getRingWeight(this.index),
      { circumference: f, rotation: m } = this._getRotationExtents(),
      { ratioX: b, ratioY: x, offsetX: S, offsetY: p } = J_(m, f, c),
      v = (n.width - r) / b,
      k = (n.height - r) / x,
      E = Math.max(Math.min(v, k) / 2, 0),
      y = Bh(this.options.radius, E),
      g = Math.max(y * c, 0),
      h = (y - g) / this._getVisibleDatasetWeightTotal();
    (this.offsetX = S * y),
      (this.offsetY = p * y),
      (s.total = this.calculateTotal()),
      (this.outerRadius = y - h * this._getRingWeightOffset(this.index)),
      (this.innerRadius = Math.max(this.outerRadius - h * u, 0)),
      this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, i) {
    const n = this.options,
      s = this._cachedMeta,
      o = this._getCircumference();
    return (i && n.animation.animateRotate) ||
      !this.chart.getDataVisibility(t) ||
      s._parsed[t] === null ||
      s.data[t].hidden
      ? 0
      : this.calculateCircumference((s._parsed[t] * o) / Pt);
  }
  updateElements(t, i, n, s) {
    const o = s === "reset",
      r = this.chart,
      a = r.chartArea,
      u = r.options.animation,
      f = (a.left + a.right) / 2,
      m = (a.top + a.bottom) / 2,
      b = o && u.animateScale,
      x = b ? 0 : this.innerRadius,
      S = b ? 0 : this.outerRadius,
      { sharedOptions: p, includeOptions: v } = this._getSharedOptions(i, s);
    let k = this._getRotation(),
      E;
    for (E = 0; E < i; ++E) k += this._circumference(E, o);
    for (E = i; E < i + n; ++E) {
      const y = this._circumference(E, o),
        g = t[E],
        h = {
          x: f + this.offsetX,
          y: m + this.offsetY,
          startAngle: k,
          endAngle: k + y,
          circumference: y,
          outerRadius: S,
          innerRadius: x,
        };
      v &&
        (h.options =
          p || this.resolveDataElementOptions(E, g.active ? "active" : s)),
        (k += y),
        this.updateElement(g, E, h, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta,
      i = t.data;
    let n = 0,
      s;
    for (s = 0; s < i.length; s++) {
      const o = t._parsed[s];
      o !== null &&
        !isNaN(o) &&
        this.chart.getDataVisibility(s) &&
        !i[s].hidden &&
        (n += Math.abs(o));
    }
    return n;
  }
  calculateCircumference(t) {
    const i = this._cachedMeta.total;
    return i > 0 && !isNaN(t) ? Pt * (Math.abs(t) / i) : 0;
  }
  getLabelAndValue(t) {
    const i = this._cachedMeta,
      n = this.chart,
      s = n.data.labels || [],
      o = ss(i._parsed[t], n.options.locale);
    return { label: s[t] || "", value: o };
  }
  getMaxBorderWidth(t) {
    let i = 0;
    const n = this.chart;
    let s, o, r, a, c;
    if (!t) {
      for (s = 0, o = n.data.datasets.length; s < o; ++s)
        if (n.isDatasetVisible(s)) {
          (r = n.getDatasetMeta(s)), (t = r.data), (a = r.controller);
          break;
        }
    }
    if (!t) return 0;
    for (s = 0, o = t.length; s < o; ++s)
      (c = a.resolveDataElementOptions(s)),
        c.borderAlign !== "inner" &&
          (i = Math.max(i, c.borderWidth || 0, c.hoverBorderWidth || 0));
    return i;
  }
  getMaxOffset(t) {
    let i = 0;
    for (let n = 0, s = t.length; n < s; ++n) {
      const o = this.resolveDataElementOptions(n);
      i = Math.max(i, o.offset || 0, o.hoverOffset || 0);
    }
    return i;
  }
  _getRingWeightOffset(t) {
    let i = 0;
    for (let n = 0; n < t; ++n)
      this.chart.isDatasetVisible(n) && (i += this._getRingWeight(n));
    return i;
  }
  _getRingWeight(t) {
    return Math.max(_t(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
pn.id = "doughnut";
pn.defaults = {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: { animateRotate: !0, animateScale: !1 },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing",
      ],
    },
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r",
};
pn.descriptors = {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing",
};
pn.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const t = e.data;
          if (t.labels.length && t.datasets.length) {
            const {
              labels: { pointStyle: i },
            } = e.legend.options;
            return t.labels.map((n, s) => {
              const r = e.getDatasetMeta(0).controller.getStyle(s);
              return {
                text: n,
                fillStyle: r.backgroundColor,
                strokeStyle: r.borderColor,
                lineWidth: r.borderWidth,
                pointStyle: i,
                hidden: !e.getDataVisibility(s),
                index: s,
              };
            });
          }
          return [];
        },
      },
      onClick(e, t, i) {
        i.chart.toggleDataVisibility(t.index), i.chart.update();
      },
    },
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(e) {
          let t = e.label;
          const i = ": " + e.formattedValue;
          return Ht(t) ? ((t = t.slice()), (t[0] += i)) : (t += i), t;
        },
      },
    },
  },
};
class os extends Fe {
  initialize() {
    (this.enableOptionSharing = !0),
      (this.supportsDecimation = !0),
      super.initialize();
  }
  update(t) {
    const i = this._cachedMeta,
      { dataset: n, data: s = [], _dataset: o } = i,
      r = this.chart._animationsDisabled;
    let { start: a, count: c } = G_(i, s, r);
    (this._drawStart = a),
      (this._drawCount = c),
      Z_(i) && ((a = 0), (c = s.length)),
      (n._chart = this.chart),
      (n._datasetIndex = this.index),
      (n._decimated = !!o._decimated),
      (n.points = s);
    const u = this.resolveDatasetElementOptions(t);
    this.options.showLine || (u.borderWidth = 0),
      (u.segment = this.options.segment),
      this.updateElement(n, void 0, { animated: !r, options: u }, t),
      this.updateElements(s, a, c, t);
  }
  updateElements(t, i, n, s) {
    const o = s === "reset",
      { iScale: r, vScale: a, _stacked: c, _dataset: u } = this._cachedMeta,
      { sharedOptions: f, includeOptions: m } = this._getSharedOptions(i, s),
      b = r.axis,
      x = a.axis,
      { spanGaps: S, segment: p } = this.options,
      v = Qn(S) ? S : Number.POSITIVE_INFINITY,
      k = this.chart._animationsDisabled || o || s === "none";
    let E = i > 0 && this.getParsed(i - 1);
    for (let y = i; y < i + n; ++y) {
      const g = t[y],
        h = this.getParsed(y),
        l = k ? g : {},
        d = Ot(h[x]),
        C = (l[b] = r.getPixelForValue(h[b], y)),
        T = (l[x] =
          o || d
            ? a.getBasePixel()
            : a.getPixelForValue(c ? this.applyStack(a, h, c) : h[x], y));
      (l.skip = isNaN(C) || isNaN(T) || d),
        (l.stop = y > 0 && Math.abs(h[b] - E[b]) > v),
        p && ((l.parsed = h), (l.raw = u.data[y])),
        m &&
          (l.options =
            f || this.resolveDataElementOptions(y, g.active ? "active" : s)),
        k || this.updateElement(g, y, l, s),
        (E = h);
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta,
      i = t.dataset,
      n = (i.options && i.options.borderWidth) || 0,
      s = t.data || [];
    if (!s.length) return n;
    const o = s[0].size(this.resolveDataElementOptions(0)),
      r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(n, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
      super.draw();
  }
}
os.id = "line";
os.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1,
};
os.overrides = {
  scales: { _index_: { type: "category" }, _value_: { type: "linear" } },
};
function G_(e, t, i) {
  const n = t.length;
  let s = 0,
    o = n;
  if (e._sorted) {
    const { iScale: r, _parsed: a } = e,
      c = r.axis,
      { min: u, max: f, minDefined: m, maxDefined: b } = r.getUserBounds();
    m &&
      (s = Xt(
        Math.min(
          Ue(a, r.axis, u).lo,
          i ? n : Ue(t, c, r.getPixelForValue(u)).lo
        ),
        0,
        n - 1
      )),
      b
        ? (o =
            Xt(
              Math.max(
                Ue(a, r.axis, f).hi + 1,
                i ? 0 : Ue(t, c, r.getPixelForValue(f)).hi + 1
              ),
              s,
              n
            ) - s)
        : (o = n - s);
  }
  return { start: s, count: o };
}
function Z_(e) {
  const { xScale: t, yScale: i, _scaleRanges: n } = e,
    s = { xmin: t.min, xmax: t.max, ymin: i.min, ymax: i.max };
  if (!n) return (e._scaleRanges = s), !0;
  const o =
    n.xmin !== t.min ||
    n.xmax !== t.max ||
    n.ymin !== i.min ||
    n.ymax !== i.max;
  return Object.assign(n, s), o;
}
class _o extends Fe {
  constructor(t, i) {
    super(t, i), (this.innerRadius = void 0), (this.outerRadius = void 0);
  }
  getLabelAndValue(t) {
    const i = this._cachedMeta,
      n = this.chart,
      s = n.data.labels || [],
      o = ss(i._parsed[t].r, n.options.locale);
    return { label: s[t] || "", value: o };
  }
  parseObjectData(t, i, n, s) {
    return Zh.bind(this)(t, i, n, s);
  }
  update(t) {
    const i = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(i, 0, i.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta,
      i = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
    return (
      t.data.forEach((n, s) => {
        const o = this.getParsed(s).r;
        !isNaN(o) &&
          this.chart.getDataVisibility(s) &&
          (o < i.min && (i.min = o), o > i.max && (i.max = o));
      }),
      i
    );
  }
  _updateRadius() {
    const t = this.chart,
      i = t.chartArea,
      n = t.options,
      s = Math.min(i.right - i.left, i.bottom - i.top),
      o = Math.max(s / 2, 0),
      r = Math.max(n.cutoutPercentage ? (o / 100) * n.cutoutPercentage : 1, 0),
      a = (o - r) / t.getVisibleDatasetCount();
    (this.outerRadius = o - a * this.index),
      (this.innerRadius = this.outerRadius - a);
  }
  updateElements(t, i, n, s) {
    const o = s === "reset",
      r = this.chart,
      c = r.options.animation,
      u = this._cachedMeta.rScale,
      f = u.xCenter,
      m = u.yCenter,
      b = u.getIndexAngle(0) - 0.5 * Wt;
    let x = b,
      S;
    const p = 360 / this.countVisibleElements();
    for (S = 0; S < i; ++S) x += this._computeAngle(S, s, p);
    for (S = i; S < i + n; S++) {
      const v = t[S];
      let k = x,
        E = x + this._computeAngle(S, s, p),
        y = r.getDataVisibility(S)
          ? u.getDistanceFromCenterForValue(this.getParsed(S).r)
          : 0;
      (x = E), o && (c.animateScale && (y = 0), c.animateRotate && (k = E = b));
      const g = {
        x: f,
        y: m,
        innerRadius: 0,
        outerRadius: y,
        startAngle: k,
        endAngle: E,
        options: this.resolveDataElementOptions(S, v.active ? "active" : s),
      };
      this.updateElement(v, S, g, s);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let i = 0;
    return (
      t.data.forEach((n, s) => {
        !isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && i++;
      }),
      i
    );
  }
  _computeAngle(t, i, n) {
    return this.chart.getDataVisibility(t)
      ? ke(this.resolveDataElementOptions(t, i).angle || n)
      : 0;
  }
}
_o.id = "polarArea";
_o.defaults = {
  dataElementType: "arc",
  animation: { animateRotate: !0, animateScale: !0 },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius",
      ],
    },
  },
  indexAxis: "r",
  startAngle: 0,
};
_o.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const t = e.data;
          if (t.labels.length && t.datasets.length) {
            const {
              labels: { pointStyle: i },
            } = e.legend.options;
            return t.labels.map((n, s) => {
              const r = e.getDatasetMeta(0).controller.getStyle(s);
              return {
                text: n,
                fillStyle: r.backgroundColor,
                strokeStyle: r.borderColor,
                lineWidth: r.borderWidth,
                pointStyle: i,
                hidden: !e.getDataVisibility(s),
                index: s,
              };
            });
          }
          return [];
        },
      },
      onClick(e, t, i) {
        i.chart.toggleDataVisibility(t.index), i.chart.update();
      },
    },
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(e) {
          return e.chart.data.labels[e.dataIndex] + ": " + e.formattedValue;
        },
      },
    },
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: { display: !1 },
      beginAtZero: !0,
      grid: { circular: !0 },
      pointLabels: { display: !1 },
      startAngle: 0,
    },
  },
};
class sa extends pn {}
sa.id = "pie";
sa.defaults = { cutout: 0, rotation: 0, circumference: 360, radius: "100%" };
class yo extends Fe {
  getLabelAndValue(t) {
    const i = this._cachedMeta.vScale,
      n = this.getParsed(t);
    return {
      label: i.getLabels()[t],
      value: "" + i.getLabelForValue(n[i.axis]),
    };
  }
  parseObjectData(t, i, n, s) {
    return Zh.bind(this)(t, i, n, s);
  }
  update(t) {
    const i = this._cachedMeta,
      n = i.dataset,
      s = i.data || [],
      o = i.iScale.getLabels();
    if (((n.points = s), t !== "resize")) {
      const r = this.resolveDatasetElementOptions(t);
      this.options.showLine || (r.borderWidth = 0);
      const a = { _loop: !0, _fullLoop: o.length === s.length, options: r };
      this.updateElement(n, void 0, a, t);
    }
    this.updateElements(s, 0, s.length, t);
  }
  updateElements(t, i, n, s) {
    const o = this._cachedMeta.rScale,
      r = s === "reset";
    for (let a = i; a < i + n; a++) {
      const c = t[a],
        u = this.resolveDataElementOptions(a, c.active ? "active" : s),
        f = o.getPointPositionForValue(a, this.getParsed(a).r),
        m = r ? o.xCenter : f.x,
        b = r ? o.yCenter : f.y,
        x = {
          x: m,
          y: b,
          angle: f.angle,
          skip: isNaN(m) || isNaN(b),
          options: u,
        };
      this.updateElement(c, a, x, s);
    }
  }
}
yo.id = "radar";
yo.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: { line: { fill: "start" } },
};
yo.overrides = { aspectRatio: 1, scales: { r: { type: "radialLinear" } } };
class bo extends os {}
bo.id = "scatter";
bo.defaults = { showLine: !1, fill: !1 };
bo.overrides = {
  interaction: { mode: "point" },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return "";
        },
        label(e) {
          return "(" + e.label + ", " + e.formattedValue + ")";
        },
      },
    },
  },
  scales: { x: { type: "linear" }, y: { type: "linear" } },
};
const ty = Object.freeze({
  __proto__: null,
  BarController: mo,
  BubbleController: vo,
  DoughnutController: pn,
  LineController: os,
  PolarAreaController: _o,
  PieController: sa,
  RadarController: yo,
  ScatterController: bo,
});
function Ei() {
  throw new Error(
    "This method is not implemented: Check that a complete date adapter is provided."
  );
}
class mr {
  constructor(t) {
    this.options = t || {};
  }
  formats() {
    return Ei();
  }
  parse(t, i) {
    return Ei();
  }
  format(t, i) {
    return Ei();
  }
  add(t, i, n) {
    return Ei();
  }
  diff(t, i, n) {
    return Ei();
  }
  startOf(t, i, n) {
    return Ei();
  }
  endOf(t, i) {
    return Ei();
  }
}
mr.override = function (e) {
  Object.assign(mr.prototype, e);
};
const ey = { _date: mr };
function iy(e, t, i, n) {
  const { controller: s, data: o, _sorted: r } = e,
    a = s._cachedMeta.iScale;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const c = a._reversePixels ? zv : Ue;
    if (n) {
      if (s._sharedOptions) {
        const u = o[0],
          f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const m = c(o, t, i - f),
            b = c(o, t, i + f);
          return { lo: m.lo, hi: b.hi };
        }
      }
    } else return c(o, t, i);
  }
  return { lo: 0, hi: o.length - 1 };
}
function rs(e, t, i, n, s) {
  const o = e.getSortedVisibleDatasetMetas(),
    r = i[t];
  for (let a = 0, c = o.length; a < c; ++a) {
    const { index: u, data: f } = o[a],
      { lo: m, hi: b } = iy(o[a], t, r, s);
    for (let x = m; x <= b; ++x) {
      const S = f[x];
      S.skip || n(S, u, x);
    }
  }
}
function ny(e) {
  const t = e.indexOf("x") !== -1,
    i = e.indexOf("y") !== -1;
  return function (n, s) {
    const o = t ? Math.abs(n.x - s.x) : 0,
      r = i ? Math.abs(n.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function Wo(e, t, i, n, s) {
  const o = [];
  return (
    (!s && !e.isPointInArea(t)) ||
      rs(
        e,
        i,
        t,
        function (a, c, u) {
          (!s && !Gn(a, e.chartArea, 0)) ||
            (a.inRange(t.x, t.y, n) &&
              o.push({ element: a, datasetIndex: c, index: u }));
        },
        !0
      ),
    o
  );
}
function sy(e, t, i, n) {
  const s = [];
  function o(r, a, c) {
    const { startAngle: u, endAngle: f } = r.getProps(
        ["startAngle", "endAngle"],
        n
      ),
      { angle: m } = $h(r, { x: t.x, y: t.y });
    Jn(m, u, f) && s.push({ element: r, datasetIndex: a, index: c });
  }
  return rs(e, i, t, o), s;
}
function oy(e, t, i, n, s, o) {
  let r = [];
  const a = ny(i);
  let c = Number.POSITIVE_INFINITY;
  function u(f, m, b) {
    const x = f.inRange(t.x, t.y, s);
    if (n && !x) return;
    const S = f.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(S)) && !x) return;
    const v = a(t, S);
    v < c
      ? ((r = [{ element: f, datasetIndex: m, index: b }]), (c = v))
      : v === c && r.push({ element: f, datasetIndex: m, index: b });
  }
  return rs(e, i, t, u), r;
}
function zo(e, t, i, n, s, o) {
  return !o && !e.isPointInArea(t)
    ? []
    : i === "r" && !n
    ? sy(e, t, i, s)
    : oy(e, t, i, n, s, o);
}
function Fl(e, t, i, n, s) {
  const o = [],
    r = i === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return (
    rs(e, i, t, (c, u, f) => {
      c[r](t[i], s) &&
        (o.push({ element: c, datasetIndex: u, index: f }),
        (a = a || c.inRange(t.x, t.y, s)));
    }),
    n && !a ? [] : o
  );
}
const ry = {
  evaluateInteractionItems: rs,
  modes: {
    index(e, t, i, n) {
      const s = Oi(t, e),
        o = i.axis || "x",
        r = i.includeInvisible || !1,
        a = i.intersect ? Wo(e, s, o, n, r) : zo(e, s, o, !1, n, r),
        c = [];
      return a.length
        ? (e.getSortedVisibleDatasetMetas().forEach((u) => {
            const f = a[0].index,
              m = u.data[f];
            m &&
              !m.skip &&
              c.push({ element: m, datasetIndex: u.index, index: f });
          }),
          c)
        : [];
    },
    dataset(e, t, i, n) {
      const s = Oi(t, e),
        o = i.axis || "xy",
        r = i.includeInvisible || !1;
      let a = i.intersect ? Wo(e, s, o, n, r) : zo(e, s, o, !1, n, r);
      if (a.length > 0) {
        const c = a[0].datasetIndex,
          u = e.getDatasetMeta(c).data;
        a = [];
        for (let f = 0; f < u.length; ++f)
          a.push({ element: u[f], datasetIndex: c, index: f });
      }
      return a;
    },
    point(e, t, i, n) {
      const s = Oi(t, e),
        o = i.axis || "xy",
        r = i.includeInvisible || !1;
      return Wo(e, s, o, n, r);
    },
    nearest(e, t, i, n) {
      const s = Oi(t, e),
        o = i.axis || "xy",
        r = i.includeInvisible || !1;
      return zo(e, s, o, i.intersect, n, r);
    },
    x(e, t, i, n) {
      const s = Oi(t, e);
      return Fl(e, s, "x", i.intersect, n);
    },
    y(e, t, i, n) {
      const s = Oi(t, e);
      return Fl(e, s, "y", i.intersect, n);
    },
  },
};
const hu = ["left", "top", "right", "bottom"];
function bn(e, t) {
  return e.filter((i) => i.pos === t);
}
function Hl(e, t) {
  return e.filter((i) => hu.indexOf(i.pos) === -1 && i.box.axis === t);
}
function xn(e, t) {
  return e.sort((i, n) => {
    const s = t ? n : i,
      o = t ? i : n;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function ay(e) {
  const t = [];
  let i, n, s, o, r, a;
  for (i = 0, n = (e || []).length; i < n; ++i)
    (s = e[i]),
      ({
        position: o,
        options: { stack: r, stackWeight: a = 1 },
      } = s),
      t.push({
        index: i,
        box: s,
        pos: o,
        horizontal: s.isHorizontal(),
        weight: s.weight,
        stack: r && o + r,
        stackWeight: a,
      });
  return t;
}
function ly(e) {
  const t = {};
  for (const i of e) {
    const { stack: n, pos: s, stackWeight: o } = i;
    if (!n || !hu.includes(s)) continue;
    const r = t[n] || (t[n] = { count: 0, placed: 0, weight: 0, size: 0 });
    r.count++, (r.weight += o);
  }
  return t;
}
function cy(e, t) {
  const i = ly(e),
    { vBoxMaxWidth: n, hBoxMaxHeight: s } = t;
  let o, r, a;
  for (o = 0, r = e.length; o < r; ++o) {
    a = e[o];
    const { fullSize: c } = a.box,
      u = i[a.stack],
      f = u && a.stackWeight / u.weight;
    a.horizontal
      ? ((a.width = f ? f * n : c && t.availableWidth), (a.height = s))
      : ((a.width = n), (a.height = f ? f * s : c && t.availableHeight));
  }
  return i;
}
function hy(e) {
  const t = ay(e),
    i = xn(
      t.filter((u) => u.box.fullSize),
      !0
    ),
    n = xn(bn(t, "left"), !0),
    s = xn(bn(t, "right")),
    o = xn(bn(t, "top"), !0),
    r = xn(bn(t, "bottom")),
    a = Hl(t, "x"),
    c = Hl(t, "y");
  return {
    fullSize: i,
    leftAndTop: n.concat(o),
    rightAndBottom: s.concat(c).concat(r).concat(a),
    chartArea: bn(t, "chartArea"),
    vertical: n.concat(s).concat(c),
    horizontal: o.concat(r).concat(a),
  };
}
function $l(e, t, i, n) {
  return Math.max(e[i], t[i]) + Math.max(e[n], t[n]);
}
function uu(e, t) {
  (e.top = Math.max(e.top, t.top)),
    (e.left = Math.max(e.left, t.left)),
    (e.bottom = Math.max(e.bottom, t.bottom)),
    (e.right = Math.max(e.right, t.right));
}
function uy(e, t, i, n) {
  const { pos: s, box: o } = i,
    r = e.maxPadding;
  if (!kt(s)) {
    i.size && (e[s] -= i.size);
    const m = n[i.stack] || { size: 0, count: 1 };
    (m.size = Math.max(m.size, i.horizontal ? o.height : o.width)),
      (i.size = m.size / m.count),
      (e[s] += i.size);
  }
  o.getPadding && uu(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - $l(r, e, "left", "right")),
    c = Math.max(0, t.outerHeight - $l(r, e, "top", "bottom")),
    u = a !== e.w,
    f = c !== e.h;
  return (
    (e.w = a),
    (e.h = c),
    i.horizontal ? { same: u, other: f } : { same: f, other: u }
  );
}
function dy(e) {
  const t = e.maxPadding;
  function i(n) {
    const s = Math.max(t[n] - e[n], 0);
    return (e[n] += s), s;
  }
  (e.y += i("top")), (e.x += i("left")), i("right"), i("bottom");
}
function fy(e, t) {
  const i = t.maxPadding;
  function n(s) {
    const o = { left: 0, top: 0, right: 0, bottom: 0 };
    return (
      s.forEach((r) => {
        o[r] = Math.max(t[r], i[r]);
      }),
      o
    );
  }
  return n(e ? ["left", "right"] : ["top", "bottom"]);
}
function On(e, t, i, n) {
  const s = [];
  let o, r, a, c, u, f;
  for (o = 0, r = e.length, u = 0; o < r; ++o) {
    (a = e[o]),
      (c = a.box),
      c.update(a.width || t.w, a.height || t.h, fy(a.horizontal, t));
    const { same: m, other: b } = uy(t, i, a, n);
    (u |= m && s.length), (f = f || b), c.fullSize || s.push(a);
  }
  return (u && On(s, t, i, n)) || f;
}
function xs(e, t, i, n, s) {
  (e.top = i),
    (e.left = t),
    (e.right = t + n),
    (e.bottom = i + s),
    (e.width = n),
    (e.height = s);
}
function Wl(e, t, i, n) {
  const s = i.padding;
  let { x: o, y: r } = t;
  for (const a of e) {
    const c = a.box,
      u = n[a.stack] || { count: 1, placed: 0, weight: 1 },
      f = a.stackWeight / u.weight || 1;
    if (a.horizontal) {
      const m = t.w * f,
        b = u.size || c.height;
      _e(u.start) && (r = u.start),
        c.fullSize
          ? xs(c, s.left, r, i.outerWidth - s.right - s.left, b)
          : xs(c, t.left + u.placed, r, m, b),
        (u.start = r),
        (u.placed += m),
        (r = c.bottom);
    } else {
      const m = t.h * f,
        b = u.size || c.width;
      _e(u.start) && (o = u.start),
        c.fullSize
          ? xs(c, o, s.top, b, i.outerHeight - s.bottom - s.top)
          : xs(c, o, t.top + u.placed, b, m),
        (u.start = o),
        (u.placed += m),
        (o = c.right);
    }
  }
  (t.x = o), (t.y = r);
}
Ct.set("layout", {
  autoPadding: !0,
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
});
const te = {
  addBox(e, t) {
    e.boxes || (e.boxes = []),
      (t.fullSize = t.fullSize || !1),
      (t.position = t.position || "top"),
      (t.weight = t.weight || 0),
      (t._layers =
        t._layers ||
        function () {
          return [
            {
              z: 0,
              draw(i) {
                t.draw(i);
              },
            },
          ];
        }),
      e.boxes.push(t);
  },
  removeBox(e, t) {
    const i = e.boxes ? e.boxes.indexOf(t) : -1;
    i !== -1 && e.boxes.splice(i, 1);
  },
  configure(e, t, i) {
    (t.fullSize = i.fullSize), (t.position = i.position), (t.weight = i.weight);
  },
  update(e, t, i, n) {
    if (!e) return;
    const s = ee(e.options.layout.padding),
      o = Math.max(t - s.width, 0),
      r = Math.max(i - s.height, 0),
      a = hy(e.boxes),
      c = a.vertical,
      u = a.horizontal;
    Lt(e.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const f =
        c.reduce(
          (p, v) => (v.box.options && v.box.options.display === !1 ? p : p + 1),
          0
        ) || 1,
      m = Object.freeze({
        outerWidth: t,
        outerHeight: i,
        padding: s,
        availableWidth: o,
        availableHeight: r,
        vBoxMaxWidth: o / 2 / f,
        hBoxMaxHeight: r / 2,
      }),
      b = Object.assign({}, s);
    uu(b, ee(n));
    const x = Object.assign(
        { maxPadding: b, w: o, h: r, x: s.left, y: s.top },
        s
      ),
      S = cy(c.concat(u), m);
    On(a.fullSize, x, m, S),
      On(c, x, m, S),
      On(u, x, m, S) && On(c, x, m, S),
      dy(x),
      Wl(a.leftAndTop, x, m, S),
      (x.x += x.w),
      (x.y += x.h),
      Wl(a.rightAndBottom, x, m, S),
      (e.chartArea = {
        left: x.left,
        top: x.top,
        right: x.left + x.w,
        bottom: x.top + x.h,
        height: x.h,
        width: x.w,
      }),
      Lt(a.chartArea, (p) => {
        const v = p.box;
        Object.assign(v, e.chartArea),
          v.update(x.w, x.h, { left: 0, top: 0, right: 0, bottom: 0 });
      });
  },
};
class du {
  acquireContext(t, i) {}
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, i, n) {}
  removeEventListener(t, i, n) {}
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, i, n, s) {
    return (
      (i = Math.max(0, i || t.width)),
      (n = n || t.height),
      { width: i, height: Math.max(0, s ? Math.floor(i / s) : n) }
    );
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {}
}
class py extends du {
  acquireContext(t) {
    return (t && t.getContext && t.getContext("2d")) || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const As = "$chartjs",
  gy = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup",
    pointerenter: "mouseenter",
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointerleave: "mouseout",
    pointerout: "mouseout",
  },
  zl = (e) => e === null || e === "";
function my(e, t) {
  const i = e.style,
    n = e.getAttribute("height"),
    s = e.getAttribute("width");
  if (
    ((e[As] = {
      initial: {
        height: n,
        width: s,
        style: { display: i.display, height: i.height, width: i.width },
      },
    }),
    (i.display = i.display || "block"),
    (i.boxSizing = i.boxSizing || "border-box"),
    zl(s))
  ) {
    const o = wl(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (zl(n))
    if (e.style.height === "") e.height = e.width / (t || 2);
    else {
      const o = wl(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const fu = d_ ? { passive: !0 } : !1;
function vy(e, t, i) {
  e.addEventListener(t, i, fu);
}
function _y(e, t, i) {
  e.canvas.removeEventListener(t, i, fu);
}
function yy(e, t) {
  const i = gy[e.type] || e.type,
    { x: n, y: s } = Oi(e, t);
  return {
    type: i,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: s !== void 0 ? s : null,
  };
}
function Ys(e, t) {
  for (const i of e) if (i === t || i.contains(t)) return !0;
}
function by(e, t, i) {
  const n = e.canvas,
    s = new MutationObserver((o) => {
      let r = !1;
      for (const a of o)
        (r = r || Ys(a.addedNodes, n)), (r = r && !Ys(a.removedNodes, n));
      r && i();
    });
  return s.observe(document, { childList: !0, subtree: !0 }), s;
}
function xy(e, t, i) {
  const n = e.canvas,
    s = new MutationObserver((o) => {
      let r = !1;
      for (const a of o)
        (r = r || Ys(a.removedNodes, n)), (r = r && !Ys(a.addedNodes, n));
      r && i();
    });
  return s.observe(document, { childList: !0, subtree: !0 }), s;
}
const ts = new Map();
let Nl = 0;
function pu() {
  const e = window.devicePixelRatio;
  e !== Nl &&
    ((Nl = e),
    ts.forEach((t, i) => {
      i.currentDevicePixelRatio !== e && t();
    }));
}
function wy(e, t) {
  ts.size || window.addEventListener("resize", pu), ts.set(e, t);
}
function ky(e) {
  ts.delete(e), ts.size || window.removeEventListener("resize", pu);
}
function Cy(e, t, i) {
  const n = e.canvas,
    s = n && na(n);
  if (!s) return;
  const o = Rh((a, c) => {
      const u = s.clientWidth;
      i(a, c), u < s.clientWidth && i();
    }, window),
    r = new ResizeObserver((a) => {
      const c = a[0],
        u = c.contentRect.width,
        f = c.contentRect.height;
      (u === 0 && f === 0) || o(u, f);
    });
  return r.observe(s), wy(e, o), r;
}
function No(e, t, i) {
  i && i.disconnect(), t === "resize" && ky(e);
}
function My(e, t, i) {
  const n = e.canvas,
    s = Rh(
      (o) => {
        e.ctx !== null && i(yy(o, e));
      },
      e,
      (o) => {
        const r = o[0];
        return [r, r.offsetX, r.offsetY];
      }
    );
  return vy(n, t, s), s;
}
class Ey extends du {
  acquireContext(t, i) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (my(t, i), n) : null;
  }
  releaseContext(t) {
    const i = t.canvas;
    if (!i[As]) return !1;
    const n = i[As].initial;
    ["height", "width"].forEach((o) => {
      const r = n[o];
      Ot(r) ? i.removeAttribute(o) : i.setAttribute(o, r);
    });
    const s = n.style || {};
    return (
      Object.keys(s).forEach((o) => {
        i.style[o] = s[o];
      }),
      (i.width = i.width),
      delete i[As],
      !0
    );
  }
  addEventListener(t, i, n) {
    this.removeEventListener(t, i);
    const s = t.$proxies || (t.$proxies = {}),
      r = { attach: by, detach: xy, resize: Cy }[i] || My;
    s[i] = r(t, i, n);
  }
  removeEventListener(t, i) {
    const n = t.$proxies || (t.$proxies = {}),
      s = n[i];
    if (!s) return;
    (({ attach: No, detach: No, resize: No }[i] || _y)(t, i, s),
      (n[i] = void 0));
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, i, n, s) {
    return u_(t, i, n, s);
  }
  isAttached(t) {
    const i = na(t);
    return !!(i && i.isConnected);
  }
}
function Sy(e) {
  return !eu() || (typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
    ? py
    : Ey;
}
class Oe {
  constructor() {
    (this.x = void 0),
      (this.y = void 0),
      (this.active = !1),
      (this.options = void 0),
      (this.$animations = void 0);
  }
  tooltipPosition(t) {
    const { x: i, y: n } = this.getProps(["x", "y"], t);
    return { x: i, y: n };
  }
  hasValue() {
    return Qn(this.x) && Qn(this.y);
  }
  getProps(t, i) {
    const n = this.$animations;
    if (!i || !n) return this;
    const s = {};
    return (
      t.forEach((o) => {
        s[o] = n[o] && n[o].active() ? n[o]._to : this[o];
      }),
      s
    );
  }
}
Oe.defaults = {};
Oe.defaultRoutes = void 0;
const gu = {
  values(e) {
    return Ht(e) ? e : "" + e;
  },
  numeric(e, t, i) {
    if (e === 0) return "0";
    const n = this.chart.options.locale;
    let s,
      o = e;
    if (i.length > 1) {
      const u = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
      (u < 1e-4 || u > 1e15) && (s = "scientific"), (o = Oy(e, i));
    }
    const r = me(Math.abs(o)),
      a = Math.max(Math.min(-1 * Math.floor(r), 20), 0),
      c = { notation: s, minimumFractionDigits: a, maximumFractionDigits: a };
    return Object.assign(c, this.options.ticks.format), ss(e, n, c);
  },
  logarithmic(e, t, i) {
    if (e === 0) return "0";
    const n = e / Math.pow(10, Math.floor(me(e)));
    return n === 1 || n === 2 || n === 5 ? gu.numeric.call(this, e, t, i) : "";
  },
};
function Oy(e, t) {
  let i = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(i) >= 1 && e !== Math.floor(e) && (i = e - Math.floor(e)), i;
}
const xo = { formatters: gu };
Ct.set("scale", {
  display: !0,
  offset: !1,
  reverse: !1,
  beginAtZero: !1,
  bounds: "ticks",
  grace: 0,
  grid: {
    display: !0,
    lineWidth: 1,
    drawBorder: !0,
    drawOnChartArea: !0,
    drawTicks: !0,
    tickLength: 8,
    tickWidth: (e, t) => t.lineWidth,
    tickColor: (e, t) => t.color,
    offset: !1,
    borderDash: [],
    borderDashOffset: 0,
    borderWidth: 1,
  },
  title: { display: !1, text: "", padding: { top: 4, bottom: 4 } },
  ticks: {
    minRotation: 0,
    maxRotation: 50,
    mirror: !1,
    textStrokeWidth: 0,
    textStrokeColor: "",
    padding: 3,
    display: !0,
    autoSkip: !0,
    autoSkipPadding: 3,
    labelOffset: 0,
    callback: xo.formatters.values,
    minor: {},
    major: {},
    align: "center",
    crossAlign: "near",
    showLabelBackdrop: !1,
    backdropColor: "rgba(255, 255, 255, 0.75)",
    backdropPadding: 2,
  },
});
Ct.route("scale.ticks", "color", "", "color");
Ct.route("scale.grid", "color", "", "borderColor");
Ct.route("scale.grid", "borderColor", "", "borderColor");
Ct.route("scale.title", "color", "", "color");
Ct.describe("scale", {
  _fallback: !1,
  _scriptable: (e) =>
    !e.startsWith("before") &&
    !e.startsWith("after") &&
    e !== "callback" &&
    e !== "parser",
  _indexable: (e) => e !== "borderDash" && e !== "tickBorderDash",
});
Ct.describe("scales", { _fallback: "scale" });
Ct.describe("scale.ticks", {
  _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
  _indexable: (e) => e !== "backdropPadding",
});
function Ty(e, t) {
  const i = e.options.ticks,
    n = i.maxTicksLimit || Dy(e),
    s = i.major.enabled ? Py(t) : [],
    o = s.length,
    r = s[0],
    a = s[o - 1],
    c = [];
  if (o > n) return Ay(t, c, s, o / n), c;
  const u = Ly(s, t, n);
  if (o > 0) {
    let f, m;
    const b = o > 1 ? Math.round((a - r) / (o - 1)) : null;
    for (ws(t, c, u, Ot(b) ? 0 : r - b, r), f = 0, m = o - 1; f < m; f++)
      ws(t, c, u, s[f], s[f + 1]);
    return ws(t, c, u, a, Ot(b) ? t.length : a + b), c;
  }
  return ws(t, c, u), c;
}
function Dy(e) {
  const t = e.options.offset,
    i = e._tickSize(),
    n = e._length / i + (t ? 0 : 1),
    s = e._maxLength / i;
  return Math.floor(Math.min(n, s));
}
function Ly(e, t, i) {
  const n = Iy(e),
    s = t.length / i;
  if (!n) return Math.max(s, 1);
  const o = nv(n);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const c = o[r];
    if (c > s) return c;
  }
  return Math.max(s, 1);
}
function Py(e) {
  const t = [];
  let i, n;
  for (i = 0, n = e.length; i < n; i++) e[i].major && t.push(i);
  return t;
}
function Ay(e, t, i, n) {
  let s = 0,
    o = i[0],
    r;
  for (n = Math.ceil(n), r = 0; r < e.length; r++)
    r === o && (t.push(e[r]), s++, (o = i[s * n]));
}
function ws(e, t, i, n, s) {
  const o = _t(n, 0),
    r = Math.min(_t(s, e.length), e.length);
  let a = 0,
    c,
    u,
    f;
  for (
    i = Math.ceil(i), s && ((c = s - n), (i = c / Math.floor(c / i))), f = o;
    f < 0;

  )
    a++, (f = Math.round(o + a * i));
  for (u = Math.max(o, 0); u < r; u++)
    u === f && (t.push(e[u]), a++, (f = Math.round(o + a * i)));
}
function Iy(e) {
  const t = e.length;
  let i, n;
  if (t < 2) return !1;
  for (n = e[0], i = 1; i < t; ++i) if (e[i] - e[i - 1] !== n) return !1;
  return n;
}
const Ry = (e) => (e === "left" ? "right" : e === "right" ? "left" : e),
  Vl = (e, t, i) => (t === "top" || t === "left" ? e[t] + i : e[t] - i);
function jl(e, t) {
  const i = [],
    n = e.length / t,
    s = e.length;
  let o = 0;
  for (; o < s; o += n) i.push(e[Math.floor(o)]);
  return i;
}
function By(e, t, i) {
  const n = e.ticks.length,
    s = Math.min(t, n - 1),
    o = e._startPixel,
    r = e._endPixel,
    a = 1e-6;
  let c = e.getPixelForTick(s),
    u;
  if (
    !(
      i &&
      (n === 1
        ? (u = Math.max(c - o, r - c))
        : t === 0
        ? (u = (e.getPixelForTick(1) - c) / 2)
        : (u = (c - e.getPixelForTick(s - 1)) / 2),
      (c += s < t ? u : -u),
      c < o - a || c > r + a)
    )
  )
    return c;
}
function Fy(e, t) {
  Lt(e, (i) => {
    const n = i.gc,
      s = n.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o) delete i.data[n[o]];
      n.splice(0, s);
    }
  });
}
function wn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function ql(e, t) {
  if (!e.display) return 0;
  const i = Yt(e.font, t),
    n = ee(e.padding);
  return (Ht(e.text) ? e.text.length : 1) * i.lineHeight + n.height;
}
function Hy(e, t) {
  return yi(e, { scale: t, type: "scale" });
}
function $y(e, t, i) {
  return yi(e, { tick: i, index: t, type: "tick" });
}
function Wy(e, t, i) {
  let n = Kr(e);
  return ((i && t !== "right") || (!i && t === "right")) && (n = Ry(n)), n;
}
function zy(e, t, i, n) {
  const { top: s, left: o, bottom: r, right: a, chart: c } = e,
    { chartArea: u, scales: f } = c;
  let m = 0,
    b,
    x,
    S;
  const p = r - s,
    v = a - o;
  if (e.isHorizontal()) {
    if (((x = Zt(n, o, a)), kt(i))) {
      const k = Object.keys(i)[0],
        E = i[k];
      S = f[k].getPixelForValue(E) + p - t;
    } else
      i === "center" ? (S = (u.bottom + u.top) / 2 + p - t) : (S = Vl(e, i, t));
    b = a - o;
  } else {
    if (kt(i)) {
      const k = Object.keys(i)[0],
        E = i[k];
      x = f[k].getPixelForValue(E) - v + t;
    } else
      i === "center" ? (x = (u.left + u.right) / 2 - v + t) : (x = Vl(e, i, t));
    (S = Zt(n, r, s)), (m = i === "left" ? -Nt : Nt);
  }
  return { titleX: x, titleY: S, maxWidth: b, rotation: m };
}
class Wi extends Oe {
  constructor(t) {
    super(),
      (this.id = t.id),
      (this.type = t.type),
      (this.options = void 0),
      (this.ctx = t.ctx),
      (this.chart = t.chart),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
      (this.maxWidth = void 0),
      (this.maxHeight = void 0),
      (this.paddingTop = void 0),
      (this.paddingBottom = void 0),
      (this.paddingLeft = void 0),
      (this.paddingRight = void 0),
      (this.axis = void 0),
      (this.labelRotation = void 0),
      (this.min = void 0),
      (this.max = void 0),
      (this._range = void 0),
      (this.ticks = []),
      (this._gridLineItems = null),
      (this._labelItems = null),
      (this._labelSizes = null),
      (this._length = 0),
      (this._maxLength = 0),
      (this._longestTextCache = {}),
      (this._startPixel = void 0),
      (this._endPixel = void 0),
      (this._reversePixels = !1),
      (this._userMax = void 0),
      (this._userMin = void 0),
      (this._suggestedMax = void 0),
      (this._suggestedMin = void 0),
      (this._ticksLength = 0),
      (this._borderValue = 0),
      (this._cache = {}),
      (this._dataLimitsCached = !1),
      (this.$context = void 0);
  }
  init(t) {
    (this.options = t.setContext(this.getContext())),
      (this.axis = t.axis),
      (this._userMin = this.parse(t.min)),
      (this._userMax = this.parse(t.max)),
      (this._suggestedMin = this.parse(t.suggestedMin)),
      (this._suggestedMax = this.parse(t.suggestedMax));
  }
  parse(t, i) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: i, _suggestedMin: n, _suggestedMax: s } = this;
    return (
      (t = pe(t, Number.POSITIVE_INFINITY)),
      (i = pe(i, Number.NEGATIVE_INFINITY)),
      (n = pe(n, Number.POSITIVE_INFINITY)),
      (s = pe(s, Number.NEGATIVE_INFINITY)),
      { min: pe(t, n), max: pe(i, s), minDefined: qt(t), maxDefined: qt(i) }
    );
  }
  getMinMax(t) {
    let { min: i, max: n, minDefined: s, maxDefined: o } = this.getUserBounds(),
      r;
    if (s && o) return { min: i, max: n };
    const a = this.getMatchingVisibleMetas();
    for (let c = 0, u = a.length; c < u; ++c)
      (r = a[c].controller.getMinMax(this, t)),
        s || (i = Math.min(i, r.min)),
        o || (n = Math.max(n, r.max));
    return (
      (i = o && i > n ? n : i),
      (n = s && i > n ? i : n),
      { min: pe(i, pe(n, i)), max: pe(n, pe(i, n)) }
    );
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0,
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return (
      this.options.labels ||
      (this.isHorizontal() ? t.xLabels : t.yLabels) ||
      t.labels ||
      []
    );
  }
  beforeLayout() {
    (this._cache = {}), (this._dataLimitsCached = !1);
  }
  beforeUpdate() {
    Bt(this.options.beforeUpdate, [this]);
  }
  update(t, i, n) {
    const { beginAtZero: s, grace: o, ticks: r } = this.options,
      a = r.sampleSize;
    this.beforeUpdate(),
      (this.maxWidth = t),
      (this.maxHeight = i),
      (this._margins = n =
        Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, n)),
      (this.ticks = null),
      (this._labelSizes = null),
      (this._gridLineItems = null),
      (this._labelItems = null),
      this.beforeSetDimensions(),
      this.setDimensions(),
      this.afterSetDimensions(),
      (this._maxLength = this.isHorizontal()
        ? this.width + n.left + n.right
        : this.height + n.top + n.bottom),
      this._dataLimitsCached ||
        (this.beforeDataLimits(),
        this.determineDataLimits(),
        this.afterDataLimits(),
        (this._range = Wv(this, o, s)),
        (this._dataLimitsCached = !0)),
      this.beforeBuildTicks(),
      (this.ticks = this.buildTicks() || []),
      this.afterBuildTicks();
    const c = a < this.ticks.length;
    this._convertTicksToLabels(c ? jl(this.ticks, a) : this.ticks),
      this.configure(),
      this.beforeCalculateLabelRotation(),
      this.calculateLabelRotation(),
      this.afterCalculateLabelRotation(),
      r.display &&
        (r.autoSkip || r.source === "auto") &&
        ((this.ticks = Ty(this, this.ticks)),
        (this._labelSizes = null),
        this.afterAutoSkip()),
      c && this._convertTicksToLabels(this.ticks),
      this.beforeFit(),
      this.fit(),
      this.afterFit(),
      this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse,
      i,
      n;
    this.isHorizontal()
      ? ((i = this.left), (n = this.right))
      : ((i = this.top), (n = this.bottom), (t = !t)),
      (this._startPixel = i),
      (this._endPixel = n),
      (this._reversePixels = t),
      (this._length = n - i),
      (this._alignToPixels = this.options.alignToPixels);
  }
  afterUpdate() {
    Bt(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    Bt(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = 0),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = 0),
        (this.bottom = this.height)),
      (this.paddingLeft = 0),
      (this.paddingTop = 0),
      (this.paddingRight = 0),
      (this.paddingBottom = 0);
  }
  afterSetDimensions() {
    Bt(this.options.afterSetDimensions, [this]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Bt(this.options[t], [this]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {}
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    Bt(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(t) {
    const i = this.options.ticks;
    let n, s, o;
    for (n = 0, s = t.length; n < s; n++)
      (o = t[n]), (o.label = Bt(i.callback, [o.value, n, t], this));
  }
  afterTickToLabelConversion() {
    Bt(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    Bt(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const t = this.options,
      i = t.ticks,
      n = this.ticks.length,
      s = i.minRotation || 0,
      o = i.maxRotation;
    let r = s,
      a,
      c,
      u;
    if (
      !this._isVisible() ||
      !i.display ||
      s >= o ||
      n <= 1 ||
      !this.isHorizontal()
    ) {
      this.labelRotation = s;
      return;
    }
    const f = this._getLabelSizes(),
      m = f.widest.width,
      b = f.highest.height,
      x = Xt(this.chart.width - m, 0, this.maxWidth);
    (a = t.offset ? this.maxWidth / n : x / (n - 1)),
      m + 6 > a &&
        ((a = x / (n - (t.offset ? 0.5 : 1))),
        (c =
          this.maxHeight -
          wn(t.grid) -
          i.padding -
          ql(t.title, this.chart.options.font)),
        (u = Math.sqrt(m * m + b * b)),
        (r = Ur(
          Math.min(
            Math.asin(Xt((f.highest.height + 6) / a, -1, 1)),
            Math.asin(Xt(c / u, -1, 1)) - Math.asin(Xt(b / u, -1, 1))
          )
        )),
        (r = Math.max(s, Math.min(o, r)))),
      (this.labelRotation = r);
  }
  afterCalculateLabelRotation() {
    Bt(this.options.afterCalculateLabelRotation, [this]);
  }
  afterAutoSkip() {}
  beforeFit() {
    Bt(this.options.beforeFit, [this]);
  }
  fit() {
    const t = { width: 0, height: 0 },
      {
        chart: i,
        options: { ticks: n, title: s, grid: o },
      } = this,
      r = this._isVisible(),
      a = this.isHorizontal();
    if (r) {
      const c = ql(s, i.options.font);
      if (
        (a
          ? ((t.width = this.maxWidth), (t.height = wn(o) + c))
          : ((t.height = this.maxHeight), (t.width = wn(o) + c)),
        n.display && this.ticks.length)
      ) {
        const {
            first: u,
            last: f,
            widest: m,
            highest: b,
          } = this._getLabelSizes(),
          x = n.padding * 2,
          S = ke(this.labelRotation),
          p = Math.cos(S),
          v = Math.sin(S);
        if (a) {
          const k = n.mirror ? 0 : v * m.width + p * b.height;
          t.height = Math.min(this.maxHeight, t.height + k + x);
        } else {
          const k = n.mirror ? 0 : p * m.width + v * b.height;
          t.width = Math.min(this.maxWidth, t.width + k + x);
        }
        this._calculatePadding(u, f, v, p);
      }
    }
    this._handleMargins(),
      a
        ? ((this.width = this._length =
            i.width - this._margins.left - this._margins.right),
          (this.height = t.height))
        : ((this.width = t.width),
          (this.height = this._length =
            i.height - this._margins.top - this._margins.bottom));
  }
  _calculatePadding(t, i, n, s) {
    const {
        ticks: { align: o, padding: r },
        position: a,
      } = this.options,
      c = this.labelRotation !== 0,
      u = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const f = this.getPixelForTick(0) - this.left,
        m = this.right - this.getPixelForTick(this.ticks.length - 1);
      let b = 0,
        x = 0;
      c
        ? u
          ? ((b = s * t.width), (x = n * i.height))
          : ((b = n * t.height), (x = s * i.width))
        : o === "start"
        ? (x = i.width)
        : o === "end"
        ? (b = t.width)
        : o !== "inner" && ((b = t.width / 2), (x = i.width / 2)),
        (this.paddingLeft = Math.max(
          ((b - f + r) * this.width) / (this.width - f),
          0
        )),
        (this.paddingRight = Math.max(
          ((x - m + r) * this.width) / (this.width - m),
          0
        ));
    } else {
      let f = i.height / 2,
        m = t.height / 2;
      o === "start"
        ? ((f = 0), (m = t.height))
        : o === "end" && ((f = i.height), (m = 0)),
        (this.paddingTop = f + r),
        (this.paddingBottom = m + r);
    }
  }
  _handleMargins() {
    this._margins &&
      ((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
      (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
      (this._margins.right = Math.max(this.paddingRight, this._margins.right)),
      (this._margins.bottom = Math.max(
        this.paddingBottom,
        this._margins.bottom
      )));
  }
  afterFit() {
    Bt(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const { axis: t, position: i } = this.options;
    return i === "top" || i === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let i, n;
    for (i = 0, n = t.length; i < n; i++)
      Ot(t[i].label) && (t.splice(i, 1), n--, i--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const i = this.options.ticks.sampleSize;
      let n = this.ticks;
      i < n.length && (n = jl(n, i)),
        (this._labelSizes = t = this._computeLabelSizes(n, n.length));
    }
    return t;
  }
  _computeLabelSizes(t, i) {
    const { ctx: n, _longestTextCache: s } = this,
      o = [],
      r = [];
    let a = 0,
      c = 0,
      u,
      f,
      m,
      b,
      x,
      S,
      p,
      v,
      k,
      E,
      y;
    for (u = 0; u < i; ++u) {
      if (
        ((b = t[u].label),
        (x = this._resolveTickFontOptions(u)),
        (n.font = S = x.string),
        (p = s[S] = s[S] || { data: {}, gc: [] }),
        (v = x.lineHeight),
        (k = E = 0),
        !Ot(b) && !Ht(b))
      )
        (k = qs(n, p.data, p.gc, k, b)), (E = v);
      else if (Ht(b))
        for (f = 0, m = b.length; f < m; ++f)
          (y = b[f]),
            !Ot(y) && !Ht(y) && ((k = qs(n, p.data, p.gc, k, y)), (E += v));
      o.push(k), r.push(E), (a = Math.max(k, a)), (c = Math.max(E, c));
    }
    Fy(s, i);
    const g = o.indexOf(a),
      h = r.indexOf(c),
      l = (d) => ({ width: o[d] || 0, height: r[d] || 0 });
    return {
      first: l(0),
      last: l(i - 1),
      widest: l(g),
      highest: l(h),
      widths: o,
      heights: r,
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, i) {
    return NaN;
  }
  getValueForPixel(t) {}
  getPixelForTick(t) {
    const i = this.ticks;
    return t < 0 || t > i.length - 1 ? null : this.getPixelForValue(i[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const i = this._startPixel + t * this._length;
    return rv(this._alignToPixels ? Mi(this.chart, i, 0) : i);
  }
  getDecimalForPixel(t) {
    const i = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - i : i;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: i } = this;
    return t < 0 && i < 0 ? i : t > 0 && i > 0 ? t : 0;
  }
  getContext(t) {
    const i = this.ticks || [];
    if (t >= 0 && t < i.length) {
      const n = i[t];
      return n.$context || (n.$context = $y(this.getContext(), t, n));
    }
    return this.$context || (this.$context = Hy(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks,
      i = ke(this.labelRotation),
      n = Math.abs(Math.cos(i)),
      s = Math.abs(Math.sin(i)),
      o = this._getLabelSizes(),
      r = t.autoSkipPadding || 0,
      a = o ? o.widest.width + r : 0,
      c = o ? o.highest.height + r : 0;
    return this.isHorizontal()
      ? c * n > a * s
        ? a / n
        : c / s
      : c * s < a * n
      ? c / n
      : a / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const i = this.axis,
      n = this.chart,
      s = this.options,
      { grid: o, position: r } = s,
      a = o.offset,
      c = this.isHorizontal(),
      f = this.ticks.length + (a ? 1 : 0),
      m = wn(o),
      b = [],
      x = o.setContext(this.getContext()),
      S = x.drawBorder ? x.borderWidth : 0,
      p = S / 2,
      v = function (N) {
        return Mi(n, N, S);
      };
    let k, E, y, g, h, l, d, C, T, L, A, R;
    if (r === "top")
      (k = v(this.bottom)),
        (l = this.bottom - m),
        (C = k - p),
        (L = v(t.top) + p),
        (R = t.bottom);
    else if (r === "bottom")
      (k = v(this.top)),
        (L = t.top),
        (R = v(t.bottom) - p),
        (l = k + p),
        (C = this.top + m);
    else if (r === "left")
      (k = v(this.right)),
        (h = this.right - m),
        (d = k - p),
        (T = v(t.left) + p),
        (A = t.right);
    else if (r === "right")
      (k = v(this.left)),
        (T = t.left),
        (A = v(t.right) - p),
        (h = k + p),
        (d = this.left + m);
    else if (i === "x") {
      if (r === "center") k = v((t.top + t.bottom) / 2 + 0.5);
      else if (kt(r)) {
        const N = Object.keys(r)[0],
          Y = r[N];
        k = v(this.chart.scales[N].getPixelForValue(Y));
      }
      (L = t.top), (R = t.bottom), (l = k + p), (C = l + m);
    } else if (i === "y") {
      if (r === "center") k = v((t.left + t.right) / 2);
      else if (kt(r)) {
        const N = Object.keys(r)[0],
          Y = r[N];
        k = v(this.chart.scales[N].getPixelForValue(Y));
      }
      (h = k - p), (d = h - m), (T = t.left), (A = t.right);
    }
    const W = _t(s.ticks.maxTicksLimit, f),
      z = Math.max(1, Math.ceil(f / W));
    for (E = 0; E < f; E += z) {
      const N = o.setContext(this.getContext(E)),
        Y = N.lineWidth,
        X = N.color,
        Q = o.borderDash || [],
        lt = N.borderDashOffset,
        xt = N.tickWidth,
        bt = N.tickColor,
        dt = N.tickBorderDash || [],
        Et = N.tickBorderDashOffset;
      (y = By(this, E, a)),
        y !== void 0 &&
          ((g = Mi(n, y, Y)),
          c ? (h = d = T = A = g) : (l = C = L = R = g),
          b.push({
            tx1: h,
            ty1: l,
            tx2: d,
            ty2: C,
            x1: T,
            y1: L,
            x2: A,
            y2: R,
            width: Y,
            color: X,
            borderDash: Q,
            borderDashOffset: lt,
            tickWidth: xt,
            tickColor: bt,
            tickBorderDash: dt,
            tickBorderDashOffset: Et,
          }));
    }
    return (this._ticksLength = f), (this._borderValue = k), b;
  }
  _computeLabelItems(t) {
    const i = this.axis,
      n = this.options,
      { position: s, ticks: o } = n,
      r = this.isHorizontal(),
      a = this.ticks,
      { align: c, crossAlign: u, padding: f, mirror: m } = o,
      b = wn(n.grid),
      x = b + f,
      S = m ? -f : x,
      p = -ke(this.labelRotation),
      v = [];
    let k,
      E,
      y,
      g,
      h,
      l,
      d,
      C,
      T,
      L,
      A,
      R,
      W = "middle";
    if (s === "top")
      (l = this.bottom - S), (d = this._getXAxisLabelAlignment());
    else if (s === "bottom")
      (l = this.top + S), (d = this._getXAxisLabelAlignment());
    else if (s === "left") {
      const N = this._getYAxisLabelAlignment(b);
      (d = N.textAlign), (h = N.x);
    } else if (s === "right") {
      const N = this._getYAxisLabelAlignment(b);
      (d = N.textAlign), (h = N.x);
    } else if (i === "x") {
      if (s === "center") l = (t.top + t.bottom) / 2 + x;
      else if (kt(s)) {
        const N = Object.keys(s)[0],
          Y = s[N];
        l = this.chart.scales[N].getPixelForValue(Y) + x;
      }
      d = this._getXAxisLabelAlignment();
    } else if (i === "y") {
      if (s === "center") h = (t.left + t.right) / 2 - x;
      else if (kt(s)) {
        const N = Object.keys(s)[0],
          Y = s[N];
        h = this.chart.scales[N].getPixelForValue(Y);
      }
      d = this._getYAxisLabelAlignment(b).textAlign;
    }
    i === "y" && (c === "start" ? (W = "top") : c === "end" && (W = "bottom"));
    const z = this._getLabelSizes();
    for (k = 0, E = a.length; k < E; ++k) {
      (y = a[k]), (g = y.label);
      const N = o.setContext(this.getContext(k));
      (C = this.getPixelForTick(k) + o.labelOffset),
        (T = this._resolveTickFontOptions(k)),
        (L = T.lineHeight),
        (A = Ht(g) ? g.length : 1);
      const Y = A / 2,
        X = N.color,
        Q = N.textStrokeColor,
        lt = N.textStrokeWidth;
      let xt = d;
      r
        ? ((h = C),
          d === "inner" &&
            (k === E - 1
              ? (xt = this.options.reverse ? "left" : "right")
              : k === 0
              ? (xt = this.options.reverse ? "right" : "left")
              : (xt = "center")),
          s === "top"
            ? u === "near" || p !== 0
              ? (R = -A * L + L / 2)
              : u === "center"
              ? (R = -z.highest.height / 2 - Y * L + L)
              : (R = -z.highest.height + L / 2)
            : u === "near" || p !== 0
            ? (R = L / 2)
            : u === "center"
            ? (R = z.highest.height / 2 - Y * L)
            : (R = z.highest.height - A * L),
          m && (R *= -1))
        : ((l = C), (R = ((1 - A) * L) / 2));
      let bt;
      if (N.showLabelBackdrop) {
        const dt = ee(N.backdropPadding),
          Et = z.heights[k],
          St = z.widths[k];
        let K = l + R - dt.top,
          st = h - dt.left;
        switch (W) {
          case "middle":
            K -= Et / 2;
            break;
          case "bottom":
            K -= Et;
            break;
        }
        switch (d) {
          case "center":
            st -= St / 2;
            break;
          case "right":
            st -= St;
            break;
        }
        bt = {
          left: st,
          top: K,
          width: St + dt.width,
          height: Et + dt.height,
          color: N.backdropColor,
        };
      }
      v.push({
        rotation: p,
        label: g,
        font: T,
        color: X,
        strokeColor: Q,
        strokeWidth: lt,
        textOffset: R,
        textAlign: xt,
        textBaseline: W,
        translation: [h, l],
        backdrop: bt,
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: i } = this.options;
    if (-ke(this.labelRotation)) return t === "top" ? "left" : "right";
    let s = "center";
    return (
      i.align === "start"
        ? (s = "left")
        : i.align === "end"
        ? (s = "right")
        : i.align === "inner" && (s = "inner"),
      s
    );
  }
  _getYAxisLabelAlignment(t) {
    const {
        position: i,
        ticks: { crossAlign: n, mirror: s, padding: o },
      } = this.options,
      r = this._getLabelSizes(),
      a = t + o,
      c = r.widest.width;
    let u, f;
    return (
      i === "left"
        ? s
          ? ((f = this.right + o),
            n === "near"
              ? (u = "left")
              : n === "center"
              ? ((u = "center"), (f += c / 2))
              : ((u = "right"), (f += c)))
          : ((f = this.right - a),
            n === "near"
              ? (u = "right")
              : n === "center"
              ? ((u = "center"), (f -= c / 2))
              : ((u = "left"), (f = this.left)))
        : i === "right"
        ? s
          ? ((f = this.left + o),
            n === "near"
              ? (u = "right")
              : n === "center"
              ? ((u = "center"), (f -= c / 2))
              : ((u = "left"), (f -= c)))
          : ((f = this.left + a),
            n === "near"
              ? (u = "left")
              : n === "center"
              ? ((u = "center"), (f += c / 2))
              : ((u = "right"), (f = this.right)))
        : (u = "right"),
      { textAlign: u, x: f }
    );
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) return;
    const t = this.chart,
      i = this.options.position;
    if (i === "left" || i === "right")
      return { top: 0, left: this.left, bottom: t.height, right: this.right };
    if (i === "top" || i === "bottom")
      return { top: this.top, left: 0, bottom: this.bottom, right: t.width };
  }
  drawBackground() {
    const {
      ctx: t,
      options: { backgroundColor: i },
      left: n,
      top: s,
      width: o,
      height: r,
    } = this;
    i && (t.save(), (t.fillStyle = i), t.fillRect(n, s, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const i = this.options.grid;
    if (!this._isVisible() || !i.display) return 0;
    const s = this.ticks.findIndex((o) => o.value === t);
    return s >= 0 ? i.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const i = this.options.grid,
      n = this.ctx,
      s =
        this._gridLineItems ||
        (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (c, u, f) => {
      !f.width ||
        !f.color ||
        (n.save(),
        (n.lineWidth = f.width),
        (n.strokeStyle = f.color),
        n.setLineDash(f.borderDash || []),
        (n.lineDashOffset = f.borderDashOffset),
        n.beginPath(),
        n.moveTo(c.x, c.y),
        n.lineTo(u.x, u.y),
        n.stroke(),
        n.restore());
    };
    if (i.display)
      for (o = 0, r = s.length; o < r; ++o) {
        const c = s[o];
        i.drawOnChartArea && a({ x: c.x1, y: c.y1 }, { x: c.x2, y: c.y2 }, c),
          i.drawTicks &&
            a(
              { x: c.tx1, y: c.ty1 },
              { x: c.tx2, y: c.ty2 },
              {
                color: c.tickColor,
                width: c.tickWidth,
                borderDash: c.tickBorderDash,
                borderDashOffset: c.tickBorderDashOffset,
              }
            );
      }
  }
  drawBorder() {
    const {
        chart: t,
        ctx: i,
        options: { grid: n },
      } = this,
      s = n.setContext(this.getContext()),
      o = n.drawBorder ? s.borderWidth : 0;
    if (!o) return;
    const r = n.setContext(this.getContext(0)).lineWidth,
      a = this._borderValue;
    let c, u, f, m;
    this.isHorizontal()
      ? ((c = Mi(t, this.left, o) - o / 2),
        (u = Mi(t, this.right, r) + r / 2),
        (f = m = a))
      : ((f = Mi(t, this.top, o) - o / 2),
        (m = Mi(t, this.bottom, r) + r / 2),
        (c = u = a)),
      i.save(),
      (i.lineWidth = s.borderWidth),
      (i.strokeStyle = s.borderColor),
      i.beginPath(),
      i.moveTo(c, f),
      i.lineTo(u, m),
      i.stroke(),
      i.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display) return;
    const n = this.ctx,
      s = this._computeLabelArea();
    s && fo(n, s);
    const o =
      this._labelItems || (this._labelItems = this._computeLabelItems(t));
    let r, a;
    for (r = 0, a = o.length; r < a; ++r) {
      const c = o[r],
        u = c.font,
        f = c.label;
      c.backdrop &&
        ((n.fillStyle = c.backdrop.color),
        n.fillRect(
          c.backdrop.left,
          c.backdrop.top,
          c.backdrop.width,
          c.backdrop.height
        ));
      const m = c.textOffset;
      Hi(n, f, 0, m, u, c);
    }
    s && po(n);
  }
  drawTitle() {
    const {
      ctx: t,
      options: { position: i, title: n, reverse: s },
    } = this;
    if (!n.display) return;
    const o = Yt(n.font),
      r = ee(n.padding),
      a = n.align;
    let c = o.lineHeight / 2;
    i === "bottom" || i === "center" || kt(i)
      ? ((c += r.bottom),
        Ht(n.text) && (c += o.lineHeight * (n.text.length - 1)))
      : (c += r.top);
    const {
      titleX: u,
      titleY: f,
      maxWidth: m,
      rotation: b,
    } = zy(this, c, i, a);
    Hi(t, n.text, 0, 0, o, {
      color: n.color,
      maxWidth: m,
      rotation: b,
      textAlign: Wy(a, i, s),
      textBaseline: "middle",
      translation: [u, f],
    });
  }
  draw(t) {
    !this._isVisible() ||
      (this.drawBackground(),
      this.drawGrid(t),
      this.drawBorder(),
      this.drawTitle(),
      this.drawLabels(t));
  }
  _layers() {
    const t = this.options,
      i = (t.ticks && t.ticks.z) || 0,
      n = _t(t.grid && t.grid.z, -1);
    return !this._isVisible() || this.draw !== Wi.prototype.draw
      ? [
          {
            z: i,
            draw: (s) => {
              this.draw(s);
            },
          },
        ]
      : [
          {
            z: n,
            draw: (s) => {
              this.drawBackground(), this.drawGrid(s), this.drawTitle();
            },
          },
          {
            z: n + 1,
            draw: () => {
              this.drawBorder();
            },
          },
          {
            z: i,
            draw: (s) => {
              this.drawLabels(s);
            },
          },
        ];
  }
  getMatchingVisibleMetas(t) {
    const i = this.chart.getSortedVisibleDatasetMetas(),
      n = this.axis + "AxisID",
      s = [];
    let o, r;
    for (o = 0, r = i.length; o < r; ++o) {
      const a = i[o];
      a[n] === this.id && (!t || a.type === t) && s.push(a);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const i = this.options.ticks.setContext(this.getContext(t));
    return Yt(i.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ks {
  constructor(t, i, n) {
    (this.type = t),
      (this.scope = i),
      (this.override = n),
      (this.items = Object.create(null));
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(
      this.type.prototype,
      t.prototype
    );
  }
  register(t) {
    const i = Object.getPrototypeOf(t);
    let n;
    jy(i) && (n = this.register(i));
    const s = this.items,
      o = t.id,
      r = this.scope + "." + o;
    if (!o) throw new Error("class does not have id: " + t);
    return (
      o in s ||
        ((s[o] = t),
        Ny(t, r, n),
        this.override && Ct.override(t.id, t.overrides)),
      r
    );
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const i = this.items,
      n = t.id,
      s = this.scope;
    n in i && delete i[n],
      s && n in Ct[s] && (delete Ct[s][n], this.override && delete Fi[n]);
  }
}
function Ny(e, t, i) {
  const n = Xn(Object.create(null), [
    i ? Ct.get(i) : {},
    Ct.get(t),
    e.defaults,
  ]);
  Ct.set(t, n),
    e.defaultRoutes && Vy(t, e.defaultRoutes),
    e.descriptors && Ct.describe(t, e.descriptors);
}
function Vy(e, t) {
  Object.keys(t).forEach((i) => {
    const n = i.split("."),
      s = n.pop(),
      o = [e].concat(n).join("."),
      r = t[i].split("."),
      a = r.pop(),
      c = r.join(".");
    Ct.route(o, s, c, a);
  });
}
function jy(e) {
  return "id" in e && "defaults" in e;
}
class qy {
  constructor() {
    (this.controllers = new ks(Fe, "datasets", !0)),
      (this.elements = new ks(Oe, "elements")),
      (this.plugins = new ks(Object, "plugins")),
      (this.scales = new ks(Wi, "scales")),
      (this._typedRegistries = [this.controllers, this.scales, this.elements]);
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, i, n) {
    [...i].forEach((s) => {
      const o = n || this._getRegistryForType(s);
      n || o.isForType(s) || (o === this.plugins && s.id)
        ? this._exec(t, o, s)
        : Lt(s, (r) => {
            const a = n || this._getRegistryForType(r);
            this._exec(t, a, r);
          });
    });
  }
  _exec(t, i, n) {
    const s = Yr(t);
    Bt(n["before" + s], [], n), i[t](n), Bt(n["after" + s], [], n);
  }
  _getRegistryForType(t) {
    for (let i = 0; i < this._typedRegistries.length; i++) {
      const n = this._typedRegistries[i];
      if (n.isForType(t)) return n;
    }
    return this.plugins;
  }
  _get(t, i, n) {
    const s = i.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return s;
  }
}
const Xe = new qy();
class Ky {
  constructor() {
    this._init = [];
  }
  notify(t, i, n, s) {
    i === "beforeInit" &&
      ((this._init = this._createDescriptors(t, !0)),
      this._notify(this._init, t, "install"));
    const o = s ? this._descriptors(t).filter(s) : this._descriptors(t),
      r = this._notify(o, t, i, n);
    return (
      i === "afterDestroy" &&
        (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")),
      r
    );
  }
  _notify(t, i, n, s) {
    s = s || {};
    for (const o of t) {
      const r = o.plugin,
        a = r[n],
        c = [i, s, o.options];
      if (Bt(a, c, r) === !1 && s.cancelable) return !1;
    }
    return !0;
  }
  invalidate() {
    Ot(this._cache) || ((this._oldCache = this._cache), (this._cache = void 0));
  }
  _descriptors(t) {
    if (this._cache) return this._cache;
    const i = (this._cache = this._createDescriptors(t));
    return this._notifyStateChanges(t), i;
  }
  _createDescriptors(t, i) {
    const n = t && t.config,
      s = _t(n.options && n.options.plugins, {}),
      o = Yy(n);
    return s === !1 && !i ? [] : Xy(t, o, s, i);
  }
  _notifyStateChanges(t) {
    const i = this._oldCache || [],
      n = this._cache,
      s = (o, r) =>
        o.filter((a) => !r.some((c) => a.plugin.id === c.plugin.id));
    this._notify(s(i, n), t, "stop"), this._notify(s(n, i), t, "start");
  }
}
function Yy(e) {
  const t = {},
    i = [],
    n = Object.keys(Xe.plugins.items);
  for (let o = 0; o < n.length; o++) i.push(Xe.getPlugin(n[o]));
  const s = e.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    i.indexOf(r) === -1 && (i.push(r), (t[r.id] = !0));
  }
  return { plugins: i, localIds: t };
}
function Uy(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Xy(e, { plugins: t, localIds: i }, n, s) {
  const o = [],
    r = e.getContext();
  for (const a of t) {
    const c = a.id,
      u = Uy(n[c], s);
    u !== null &&
      o.push({
        plugin: a,
        options: Qy(e.config, { plugin: a, local: i[c] }, u, r),
      });
  }
  return o;
}
function Qy(e, { plugin: t, local: i }, n, s) {
  const o = e.pluginScopeKeys(t),
    r = e.getOptionScopes(n, o);
  return (
    i && t.defaults && r.push(t.defaults),
    e.createResolver(r, s, [""], { scriptable: !1, indexable: !1, allKeys: !0 })
  );
}
function vr(e, t) {
  const i = Ct.datasets[e] || {};
  return (
    ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || i.indexAxis || "x"
  );
}
function Jy(e, t) {
  let i = e;
  return (
    e === "_index_" ? (i = t) : e === "_value_" && (i = t === "x" ? "y" : "x"),
    i
  );
}
function Gy(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Zy(e) {
  if (e === "top" || e === "bottom") return "x";
  if (e === "left" || e === "right") return "y";
}
function _r(e, t) {
  return e === "x" || e === "y"
    ? e
    : t.axis || Zy(t.position) || e.charAt(0).toLowerCase();
}
function tb(e, t) {
  const i = Fi[e.type] || { scales: {} },
    n = t.scales || {},
    s = vr(e.type, t),
    o = Object.create(null),
    r = Object.create(null);
  return (
    Object.keys(n).forEach((a) => {
      const c = n[a];
      if (!kt(c))
        return console.error(`Invalid scale configuration for scale: ${a}`);
      if (c._proxy)
        return console.warn(
          `Ignoring resolver passed as options for scale: ${a}`
        );
      const u = _r(a, c),
        f = Gy(u, s),
        m = i.scales || {};
      (o[u] = o[u] || a),
        (r[a] = Rn(Object.create(null), [{ axis: u }, c, m[u], m[f]]));
    }),
    e.data.datasets.forEach((a) => {
      const c = a.type || e.type,
        u = a.indexAxis || vr(c, t),
        m = (Fi[c] || {}).scales || {};
      Object.keys(m).forEach((b) => {
        const x = Jy(b, u),
          S = a[x + "AxisID"] || o[x] || x;
        (r[S] = r[S] || Object.create(null)),
          Rn(r[S], [{ axis: x }, n[S], m[b]]);
      });
    }),
    Object.keys(r).forEach((a) => {
      const c = r[a];
      Rn(c, [Ct.scales[c.type], Ct.scale]);
    }),
    r
  );
}
function mu(e) {
  const t = e.options || (e.options = {});
  (t.plugins = _t(t.plugins, {})), (t.scales = tb(e, t));
}
function vu(e) {
  return (
    (e = e || {}),
    (e.datasets = e.datasets || []),
    (e.labels = e.labels || []),
    e
  );
}
function eb(e) {
  return (e = e || {}), (e.data = vu(e.data)), mu(e), e;
}
const Kl = new Map(),
  _u = new Set();
function Cs(e, t) {
  let i = Kl.get(e);
  return i || ((i = t()), Kl.set(e, i), _u.add(i)), i;
}
const kn = (e, t, i) => {
  const n = gi(t, i);
  n !== void 0 && e.add(n);
};
class ib {
  constructor(t) {
    (this._config = eb(t)),
      (this._scopeCache = new Map()),
      (this._resolverCache = new Map());
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = vu(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), mu(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Cs(t, () => [[`datasets.${t}`, ""]]);
  }
  datasetAnimationScopeKeys(t, i) {
    return Cs(`${t}.transition.${i}`, () => [
      [`datasets.${t}.transitions.${i}`, `transitions.${i}`],
      [`datasets.${t}`, ""],
    ]);
  }
  datasetElementScopeKeys(t, i) {
    return Cs(`${t}-${i}`, () => [
      [`datasets.${t}.elements.${i}`, `datasets.${t}`, `elements.${i}`, ""],
    ]);
  }
  pluginScopeKeys(t) {
    const i = t.id,
      n = this.type;
    return Cs(`${n}-plugin-${i}`, () => [
      [`plugins.${i}`, ...(t.additionalOptionScopes || [])],
    ]);
  }
  _cachedScopes(t, i) {
    const n = this._scopeCache;
    let s = n.get(t);
    return (!s || i) && ((s = new Map()), n.set(t, s)), s;
  }
  getOptionScopes(t, i, n) {
    const { options: s, type: o } = this,
      r = this._cachedScopes(t, n),
      a = r.get(i);
    if (a) return a;
    const c = new Set();
    i.forEach((f) => {
      t && (c.add(t), f.forEach((m) => kn(c, t, m))),
        f.forEach((m) => kn(c, s, m)),
        f.forEach((m) => kn(c, Fi[o] || {}, m)),
        f.forEach((m) => kn(c, Ct, m)),
        f.forEach((m) => kn(c, pr, m));
    });
    const u = Array.from(c);
    return (
      u.length === 0 && u.push(Object.create(null)), _u.has(i) && r.set(i, u), u
    );
  }
  chartOptionScopes() {
    const { options: t, type: i } = this;
    return [t, Fi[i] || {}, Ct.datasets[i] || {}, { type: i }, Ct, pr];
  }
  resolveNamedOptions(t, i, n, s = [""]) {
    const o = { $shared: !0 },
      { resolver: r, subPrefixes: a } = Yl(this._resolverCache, t, s);
    let c = r;
    if (sb(r, i)) {
      (o.$shared = !1), (n = mi(n) ? n() : n);
      const u = this.createResolver(t, n, a);
      c = rn(r, n, u);
    }
    for (const u of i) o[u] = c[u];
    return o;
  }
  createResolver(t, i, n = [""], s) {
    const { resolver: o } = Yl(this._resolverCache, t, n);
    return kt(i) ? rn(o, i, void 0, s) : o;
  }
}
function Yl(e, t, i) {
  let n = e.get(t);
  n || ((n = new Map()), e.set(t, n));
  const s = i.join();
  let o = n.get(s);
  return (
    o ||
      ((o = {
        resolver: ta(t, i),
        subPrefixes: i.filter((a) => !a.toLowerCase().includes("hover")),
      }),
      n.set(s, o)),
    o
  );
}
const nb = (e) =>
  kt(e) && Object.getOwnPropertyNames(e).reduce((t, i) => t || mi(e[i]), !1);
function sb(e, t) {
  const { isScriptable: i, isIndexable: n } = Xh(e);
  for (const s of t) {
    const o = i(s),
      r = n(s),
      a = (r || o) && e[s];
    if ((o && (mi(a) || nb(a))) || (r && Ht(a))) return !0;
  }
  return !1;
}
const ob = "3.8.2";
const rb = ["top", "bottom", "left", "right", "chartArea"];
function Ul(e, t) {
  return e === "top" || e === "bottom" || (rb.indexOf(e) === -1 && t === "x");
}
function Xl(e, t) {
  return function (i, n) {
    return i[e] === n[e] ? i[t] - n[t] : i[e] - n[e];
  };
}
function Ql(e) {
  const t = e.chart,
    i = t.options.animation;
  t.notifyPlugins("afterRender"), Bt(i && i.onComplete, [e], t);
}
function ab(e) {
  const t = e.chart,
    i = t.options.animation;
  Bt(i && i.onProgress, [e], t);
}
function yu(e) {
  return (
    eu() && typeof e == "string"
      ? (e = document.getElementById(e))
      : e && e.length && (e = e[0]),
    e && e.canvas && (e = e.canvas),
    e
  );
}
const Us = {},
  bu = (e) => {
    const t = yu(e);
    return Object.values(Us)
      .filter((i) => i.canvas === t)
      .pop();
  };
function lb(e, t, i) {
  const n = Object.keys(e);
  for (const s of n) {
    const o = +s;
    if (o >= t) {
      const r = e[s];
      delete e[s], (i > 0 || o > t) && (e[o + i] = r);
    }
  }
}
function cb(e, t, i, n) {
  return !i || e.type === "mouseout" ? null : n ? t : e;
}
class Xs {
  constructor(t, i) {
    const n = (this.config = new ib(i)),
      s = yu(t),
      o = bu(s);
    if (o)
      throw new Error(
        "Canvas is already in use. Chart with ID '" +
          o.id +
          "' must be destroyed before the canvas with ID '" +
          o.canvas.id +
          "' can be reused."
      );
    const r = n.createResolver(n.chartOptionScopes(), this.getContext());
    (this.platform = new (n.platform || Sy(s))()),
      this.platform.updateConfig(n);
    const a = this.platform.acquireContext(s, r.aspectRatio),
      c = a && a.canvas,
      u = c && c.height,
      f = c && c.width;
    if (
      ((this.id = Um()),
      (this.ctx = a),
      (this.canvas = c),
      (this.width = f),
      (this.height = u),
      (this._options = r),
      (this._aspectRatio = this.aspectRatio),
      (this._layers = []),
      (this._metasets = []),
      (this._stacks = void 0),
      (this.boxes = []),
      (this.currentDevicePixelRatio = void 0),
      (this.chartArea = void 0),
      (this._active = []),
      (this._lastEvent = void 0),
      (this._listeners = {}),
      (this._responsiveListeners = void 0),
      (this._sortedMetasets = []),
      (this.scales = {}),
      (this._plugins = new Ky()),
      (this.$proxies = {}),
      (this._hiddenIndices = {}),
      (this.attached = !1),
      (this._animationsDisabled = void 0),
      (this.$context = void 0),
      (this._doResize = Km((m) => this.update(m), r.resizeDelay || 0)),
      (this._dataChanges = []),
      (Us[this.id] = this),
      !a || !c)
    ) {
      console.error(
        "Failed to create chart: can't acquire context from the given item"
      );
      return;
    }
    Ve.listen(this, "complete", Ql),
      Ve.listen(this, "progress", ab),
      this._initialize(),
      this.attached && this.update();
  }
  get aspectRatio() {
    const {
      options: { aspectRatio: t, maintainAspectRatio: i },
      width: n,
      height: s,
      _aspectRatio: o,
    } = this;
    return Ot(t) ? (i && o ? o : s ? n / s : null) : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  _initialize() {
    return (
      this.notifyPlugins("beforeInit"),
      this.options.responsive
        ? this.resize()
        : xl(this, this.options.devicePixelRatio),
      this.bindEvents(),
      this.notifyPlugins("afterInit"),
      this
    );
  }
  clear() {
    return vl(this.canvas, this.ctx), this;
  }
  stop() {
    return Ve.stop(this), this;
  }
  resize(t, i) {
    Ve.running(this)
      ? (this._resizeBeforeDraw = { width: t, height: i })
      : this._resize(t, i);
  }
  _resize(t, i) {
    const n = this.options,
      s = this.canvas,
      o = n.maintainAspectRatio && this.aspectRatio,
      r = this.platform.getMaximumSize(s, t, i, o),
      a = n.devicePixelRatio || this.platform.getDevicePixelRatio(),
      c = this.width ? "resize" : "attach";
    (this.width = r.width),
      (this.height = r.height),
      (this._aspectRatio = this.aspectRatio),
      xl(this, a, !0) &&
        (this.notifyPlugins("resize", { size: r }),
        Bt(n.onResize, [this, r], this),
        this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const i = this.options.scales || {};
    Lt(i, (n, s) => {
      n.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options,
      i = t.scales,
      n = this.scales,
      s = Object.keys(n).reduce((r, a) => ((r[a] = !1), r), {});
    let o = [];
    i &&
      (o = o.concat(
        Object.keys(i).map((r) => {
          const a = i[r],
            c = _r(r, a),
            u = c === "r",
            f = c === "x";
          return {
            options: a,
            dposition: u ? "chartArea" : f ? "bottom" : "left",
            dtype: u ? "radialLinear" : f ? "category" : "linear",
          };
        })
      )),
      Lt(o, (r) => {
        const a = r.options,
          c = a.id,
          u = _r(c, a),
          f = _t(a.type, r.dtype);
        (a.position === void 0 || Ul(a.position, u) !== Ul(r.dposition)) &&
          (a.position = r.dposition),
          (s[c] = !0);
        let m = null;
        if (c in n && n[c].type === f) m = n[c];
        else {
          const b = Xe.getScale(f);
          (m = new b({ id: c, type: f, ctx: this.ctx, chart: this })),
            (n[m.id] = m);
        }
        m.init(a, t);
      }),
      Lt(s, (r, a) => {
        r || delete n[a];
      }),
      Lt(n, (r) => {
        te.configure(this, r, r.options), te.addBox(this, r);
      });
  }
  _updateMetasets() {
    const t = this._metasets,
      i = this.data.datasets.length,
      n = t.length;
    if ((t.sort((s, o) => s.index - o.index), n > i)) {
      for (let s = i; s < n; ++s) this._destroyDatasetMeta(s);
      t.splice(i, n - i);
    }
    this._sortedMetasets = t.slice(0).sort(Xl("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const {
      _metasets: t,
      data: { datasets: i },
    } = this;
    t.length > i.length && delete this._stacks,
      t.forEach((n, s) => {
        i.filter((o) => o === n._dataset).length === 0 &&
          this._destroyDatasetMeta(s);
      });
  }
  buildOrUpdateControllers() {
    const t = [],
      i = this.data.datasets;
    let n, s;
    for (this._removeUnreferencedMetasets(), n = 0, s = i.length; n < s; n++) {
      const o = i[n];
      let r = this.getDatasetMeta(n);
      const a = o.type || this.config.type;
      if (
        (r.type &&
          r.type !== a &&
          (this._destroyDatasetMeta(n), (r = this.getDatasetMeta(n))),
        (r.type = a),
        (r.indexAxis = o.indexAxis || vr(a, this.options)),
        (r.order = o.order || 0),
        (r.index = n),
        (r.label = "" + o.label),
        (r.visible = this.isDatasetVisible(n)),
        r.controller)
      )
        r.controller.updateIndex(n), r.controller.linkScales();
      else {
        const c = Xe.getController(a),
          { datasetElementType: u, dataElementType: f } = Ct.datasets[a];
        Object.assign(c.prototype, {
          dataElementType: Xe.getElement(f),
          datasetElementType: u && Xe.getElement(u),
        }),
          (r.controller = new c(this, n)),
          t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Lt(
      this.data.datasets,
      (t, i) => {
        this.getDatasetMeta(i).controller.reset();
      },
      this
    );
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const i = this.config;
    i.update();
    const n = (this._options = i.createResolver(
        i.chartOptionScopes(),
        this.getContext()
      )),
      s = (this._animationsDisabled = !n.animation);
    if (
      (this._updateScales(),
      this._checkEventBindings(),
      this._updateHiddenIndices(),
      this._plugins.invalidate(),
      this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }) === !1)
    )
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let u = 0, f = this.data.datasets.length; u < f; u++) {
      const { controller: m } = this.getDatasetMeta(u),
        b = !s && o.indexOf(m) === -1;
      m.buildOrUpdateElements(b), (r = Math.max(+m.getMaxOverflow(), r));
    }
    (r = this._minPadding = n.layout.autoPadding ? r : 0),
      this._updateLayout(r),
      s ||
        Lt(o, (u) => {
          u.reset();
        }),
      this._updateDatasets(t),
      this.notifyPlugins("afterUpdate", { mode: t }),
      this._layers.sort(Xl("z", "_idx"));
    const { _active: a, _lastEvent: c } = this;
    c
      ? this._eventHandler(c, !0)
      : a.length && this._updateHoverStyles(a, a, !0),
      this.render();
  }
  _updateScales() {
    Lt(this.scales, (t) => {
      te.removeBox(this, t);
    }),
      this.ensureScalesHaveIDs(),
      this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options,
      i = new Set(Object.keys(this._listeners)),
      n = new Set(t.events);
    (!rl(i, n) || !!this._responsiveListeners !== t.responsive) &&
      (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this,
      i = this._getUniformDataChanges() || [];
    for (const { method: n, start: s, count: o } of i) {
      const r = n === "_removeElements" ? -o : o;
      lb(t, s, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length) return;
    this._dataChanges = [];
    const i = this.data.datasets.length,
      n = (o) =>
        new Set(
          t
            .filter((r) => r[0] === o)
            .map((r, a) => a + "," + r.splice(1).join(","))
        ),
      s = n(0);
    for (let o = 1; o < i; o++) if (!rl(s, n(o))) return;
    return Array.from(s)
      .map((o) => o.split(","))
      .map((o) => ({ method: o[1], start: +o[2], count: +o[3] }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1) return;
    te.update(this, this.width, this.height, t);
    const i = this.chartArea,
      n = i.width <= 0 || i.height <= 0;
    (this._layers = []),
      Lt(
        this.boxes,
        (s) => {
          (n && s.position === "chartArea") ||
            (s.configure && s.configure(), this._layers.push(...s._layers()));
        },
        this
      ),
      this._layers.forEach((s, o) => {
        s._idx = o;
      }),
      this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (
      this.notifyPlugins("beforeDatasetsUpdate", {
        mode: t,
        cancelable: !0,
      }) !== !1
    ) {
      for (let i = 0, n = this.data.datasets.length; i < n; ++i)
        this.getDatasetMeta(i).controller.configure();
      for (let i = 0, n = this.data.datasets.length; i < n; ++i)
        this._updateDataset(i, mi(t) ? t({ datasetIndex: i }) : t);
      this.notifyPlugins("afterDatasetsUpdate", { mode: t });
    }
  }
  _updateDataset(t, i) {
    const n = this.getDatasetMeta(t),
      s = { meta: n, index: t, mode: i, cancelable: !0 };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 &&
      (n.controller._update(i),
      (s.cancelable = !1),
      this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 &&
      (Ve.has(this)
        ? this.attached && !Ve.running(this) && Ve.start(this)
        : (this.draw(), Ql({ chart: this })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: s } = this._resizeBeforeDraw;
      this._resize(n, s), (this._resizeBeforeDraw = null);
    }
    if (
      (this.clear(),
      this.width <= 0 ||
        this.height <= 0 ||
        this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1)
    )
      return;
    const i = this._layers;
    for (t = 0; t < i.length && i[t].z <= 0; ++t) i[t].draw(this.chartArea);
    for (this._drawDatasets(); t < i.length; ++t) i[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const i = this._sortedMetasets,
      n = [];
    let s, o;
    for (s = 0, o = i.length; s < o; ++s) {
      const r = i[s];
      (!t || r.visible) && n.push(r);
    }
    return n;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let i = t.length - 1; i >= 0; --i) this._drawDataset(t[i]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const i = this.ctx,
      n = t._clip,
      s = !n.disabled,
      o = this.chartArea,
      r = { meta: t, index: t.index, cancelable: !0 };
    this.notifyPlugins("beforeDatasetDraw", r) !== !1 &&
      (s &&
        fo(i, {
          left: n.left === !1 ? 0 : o.left - n.left,
          right: n.right === !1 ? this.width : o.right + n.right,
          top: n.top === !1 ? 0 : o.top - n.top,
          bottom: n.bottom === !1 ? this.height : o.bottom + n.bottom,
        }),
      t.controller.draw(),
      s && po(i),
      (r.cancelable = !1),
      this.notifyPlugins("afterDatasetDraw", r));
  }
  isPointInArea(t) {
    return Gn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, i, n, s) {
    const o = ry.modes[i];
    return typeof o == "function" ? o(this, t, n, s) : [];
  }
  getDatasetMeta(t) {
    const i = this.data.datasets[t],
      n = this._metasets;
    let s = n.filter((o) => o && o._dataset === i).pop();
    return (
      s ||
        ((s = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          xAxisID: null,
          yAxisID: null,
          order: (i && i.order) || 0,
          index: t,
          _dataset: i,
          _parsed: [],
          _sorted: !1,
        }),
        n.push(s)),
      s
    );
  }
  getContext() {
    return (
      this.$context ||
      (this.$context = yi(null, { chart: this, type: "chart" }))
    );
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const i = this.data.datasets[t];
    if (!i) return !1;
    const n = this.getDatasetMeta(t);
    return typeof n.hidden == "boolean" ? !n.hidden : !i.hidden;
  }
  setDatasetVisibility(t, i) {
    const n = this.getDatasetMeta(t);
    n.hidden = !i;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, i, n) {
    const s = n ? "show" : "hide",
      o = this.getDatasetMeta(t),
      r = o.controller._resolveAnimations(void 0, s);
    _e(i)
      ? ((o.data[i].hidden = !n), this.update())
      : (this.setDatasetVisibility(t, n),
        r.update(o, { visible: n }),
        this.update((a) => (a.datasetIndex === t ? s : void 0)));
  }
  hide(t, i) {
    this._updateVisibility(t, i, !1);
  }
  show(t, i) {
    this._updateVisibility(t, i, !0);
  }
  _destroyDatasetMeta(t) {
    const i = this._metasets[t];
    i && i.controller && i.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, i;
    for (
      this.stop(), Ve.remove(this), t = 0, i = this.data.datasets.length;
      t < i;
      ++t
    )
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: i } = this;
    this._stop(),
      this.config.clearCache(),
      t &&
        (this.unbindEvents(),
        vl(t, i),
        this.platform.releaseContext(i),
        (this.canvas = null),
        (this.ctx = null)),
      this.notifyPlugins("destroy"),
      delete Us[this.id],
      this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(),
      this.options.responsive
        ? this.bindResponsiveEvents()
        : (this.attached = !0);
  }
  bindUserEvents() {
    const t = this._listeners,
      i = this.platform,
      n = (o, r) => {
        i.addEventListener(this, o, r), (t[o] = r);
      },
      s = (o, r, a) => {
        (o.offsetX = r), (o.offsetY = a), this._eventHandler(o);
      };
    Lt(this.options.events, (o) => n(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners,
      i = this.platform,
      n = (c, u) => {
        i.addEventListener(this, c, u), (t[c] = u);
      },
      s = (c, u) => {
        t[c] && (i.removeEventListener(this, c, u), delete t[c]);
      },
      o = (c, u) => {
        this.canvas && this.resize(c, u);
      };
    let r;
    const a = () => {
      s("attach", a),
        (this.attached = !0),
        this.resize(),
        n("resize", o),
        n("detach", r);
    };
    (r = () => {
      (this.attached = !1),
        s("resize", o),
        this._stop(),
        this._resize(0, 0),
        n("attach", a);
    }),
      i.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    Lt(this._listeners, (t, i) => {
      this.platform.removeEventListener(this, i, t);
    }),
      (this._listeners = {}),
      Lt(this._responsiveListeners, (t, i) => {
        this.platform.removeEventListener(this, i, t);
      }),
      (this._responsiveListeners = void 0);
  }
  updateHoverStyle(t, i, n) {
    const s = n ? "set" : "remove";
    let o, r, a, c;
    for (
      i === "dataset" &&
        ((o = this.getDatasetMeta(t[0].datasetIndex)),
        o.controller["_" + s + "DatasetHoverStyle"]()),
        a = 0,
        c = t.length;
      a < c;
      ++a
    ) {
      r = t[a];
      const u = r && this.getDatasetMeta(r.datasetIndex).controller;
      u && u[s + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const i = this._active || [],
      n = t.map(({ datasetIndex: o, index: r }) => {
        const a = this.getDatasetMeta(o);
        if (!a) throw new Error("No dataset found at index " + o);
        return { datasetIndex: o, element: a.data[r], index: r };
      });
    !zs(n, i) &&
      ((this._active = n),
      (this._lastEvent = null),
      this._updateHoverStyles(n, i));
  }
  notifyPlugins(t, i, n) {
    return this._plugins.notify(this, t, i, n);
  }
  _updateHoverStyles(t, i, n) {
    const s = this.options.hover,
      o = (c, u) =>
        c.filter(
          (f) =>
            !u.some(
              (m) => f.datasetIndex === m.datasetIndex && f.index === m.index
            )
        ),
      r = o(i, t),
      a = n ? t : o(t, i);
    r.length && this.updateHoverStyle(r, s.mode, !1),
      a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
  }
  _eventHandler(t, i) {
    const n = {
        event: t,
        replay: i,
        cancelable: !0,
        inChartArea: this.isPointInArea(t),
      },
      s = (r) =>
        (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, s) === !1) return;
    const o = this._handleEvent(t, i, n.inChartArea);
    return (
      (n.cancelable = !1),
      this.notifyPlugins("afterEvent", n, s),
      (o || n.changed) && this.render(),
      this
    );
  }
  _handleEvent(t, i, n) {
    const { _active: s = [], options: o } = this,
      r = i,
      a = this._getActiveElements(t, s, n, r),
      c = tv(t),
      u = cb(t, this._lastEvent, n, c);
    n &&
      ((this._lastEvent = null),
      Bt(o.onHover, [t, a, this], this),
      c && Bt(o.onClick, [t, a, this], this));
    const f = !zs(a, s);
    return (
      (f || i) && ((this._active = a), this._updateHoverStyles(a, s, i)),
      (this._lastEvent = u),
      f
    );
  }
  _getActiveElements(t, i, n, s) {
    if (t.type === "mouseout") return [];
    if (!n) return i;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, s);
  }
}
const Jl = () => Lt(Xs.instances, (e) => e._plugins.invalidate()),
  ei = !0;
Object.defineProperties(Xs, {
  defaults: { enumerable: ei, value: Ct },
  instances: { enumerable: ei, value: Us },
  overrides: { enumerable: ei, value: Fi },
  registry: { enumerable: ei, value: Xe },
  version: { enumerable: ei, value: ob },
  getChart: { enumerable: ei, value: bu },
  register: {
    enumerable: ei,
    value: (...e) => {
      Xe.add(...e), Jl();
    },
  },
  unregister: {
    enumerable: ei,
    value: (...e) => {
      Xe.remove(...e), Jl();
    },
  },
});
function xu(e, t, i) {
  const {
    startAngle: n,
    pixelMargin: s,
    x: o,
    y: r,
    outerRadius: a,
    innerRadius: c,
  } = t;
  let u = s / a;
  e.beginPath(),
    e.arc(o, r, a, n - u, i + u),
    c > s
      ? ((u = s / c), e.arc(o, r, c, i + u, n - u, !0))
      : e.arc(o, r, s, i + Nt, n - Nt),
    e.closePath(),
    e.clip();
}
function hb(e) {
  return Gr(e, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
}
function ub(e, t, i, n) {
  const s = hb(e.options.borderRadius),
    o = (i - t) / 2,
    r = Math.min(o, (n * t) / 2),
    a = (c) => {
      const u = ((i - Math.min(o, c)) * n) / 2;
      return Xt(c, 0, Math.min(o, u));
    };
  return {
    outerStart: a(s.outerStart),
    outerEnd: a(s.outerEnd),
    innerStart: Xt(s.innerStart, 0, r),
    innerEnd: Xt(s.innerEnd, 0, r),
  };
}
function ji(e, t, i, n) {
  return { x: i + e * Math.cos(t), y: n + e * Math.sin(t) };
}
function yr(e, t, i, n, s) {
  const { x: o, y: r, startAngle: a, pixelMargin: c, innerRadius: u } = t,
    f = Math.max(t.outerRadius + n + i - c, 0),
    m = u > 0 ? u + n + i + c : 0;
  let b = 0;
  const x = s - a;
  if (n) {
    const Y = u > 0 ? u - n : 0,
      X = f > 0 ? f - n : 0,
      Q = (Y + X) / 2,
      lt = Q !== 0 ? (x * Q) / (Q + n) : x;
    b = (x - lt) / 2;
  }
  const S = Math.max(0.001, x * f - i / Wt) / f,
    p = (x - S) / 2,
    v = a + p + b,
    k = s - p - b,
    {
      outerStart: E,
      outerEnd: y,
      innerStart: g,
      innerEnd: h,
    } = ub(t, m, f, k - v),
    l = f - E,
    d = f - y,
    C = v + E / l,
    T = k - y / d,
    L = m + g,
    A = m + h,
    R = v + g / L,
    W = k - h / A;
  if ((e.beginPath(), e.arc(o, r, f, C, T), y > 0)) {
    const Y = ji(d, T, o, r);
    e.arc(Y.x, Y.y, y, T, k + Nt);
  }
  const z = ji(A, k, o, r);
  if ((e.lineTo(z.x, z.y), h > 0)) {
    const Y = ji(A, W, o, r);
    e.arc(Y.x, Y.y, h, k + Nt, W + Math.PI);
  }
  if ((e.arc(o, r, m, k - h / m, v + g / m, !0), g > 0)) {
    const Y = ji(L, R, o, r);
    e.arc(Y.x, Y.y, g, R + Math.PI, v - Nt);
  }
  const N = ji(l, v, o, r);
  if ((e.lineTo(N.x, N.y), E > 0)) {
    const Y = ji(l, C, o, r);
    e.arc(Y.x, Y.y, E, v - Nt, C);
  }
  e.closePath();
}
function db(e, t, i, n) {
  const { fullCircles: s, startAngle: o, circumference: r } = t;
  let a = t.endAngle;
  if (s) {
    yr(e, t, i, n, o + Pt);
    for (let c = 0; c < s; ++c) e.fill();
    isNaN(r) || ((a = o + (r % Pt)), r % Pt === 0 && (a += Pt));
  }
  return yr(e, t, i, n, a), e.fill(), a;
}
function fb(e, t, i) {
  const { x: n, y: s, startAngle: o, pixelMargin: r, fullCircles: a } = t,
    c = Math.max(t.outerRadius - r, 0),
    u = t.innerRadius + r;
  let f;
  for (
    i && xu(e, t, o + Pt), e.beginPath(), e.arc(n, s, u, o + Pt, o, !0), f = 0;
    f < a;
    ++f
  )
    e.stroke();
  for (e.beginPath(), e.arc(n, s, c, o, o + Pt), f = 0; f < a; ++f) e.stroke();
}
function pb(e, t, i, n, s) {
  const { options: o } = t,
    { borderWidth: r, borderJoinStyle: a } = o,
    c = o.borderAlign === "inner";
  !r ||
    (c
      ? ((e.lineWidth = r * 2), (e.lineJoin = a || "round"))
      : ((e.lineWidth = r), (e.lineJoin = a || "bevel")),
    t.fullCircles && fb(e, t, c),
    c && xu(e, t, s),
    yr(e, t, i, n, s),
    e.stroke());
}
class wo extends Oe {
  constructor(t) {
    super(),
      (this.options = void 0),
      (this.circumference = void 0),
      (this.startAngle = void 0),
      (this.endAngle = void 0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.pixelMargin = 0),
      (this.fullCircles = 0),
      t && Object.assign(this, t);
  }
  inRange(t, i, n) {
    const s = this.getProps(["x", "y"], n),
      { angle: o, distance: r } = $h(s, { x: t, y: i }),
      {
        startAngle: a,
        endAngle: c,
        innerRadius: u,
        outerRadius: f,
        circumference: m,
      } = this.getProps(
        [
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "circumference",
        ],
        n
      ),
      b = this.options.spacing / 2,
      S = _t(m, c - a) >= Pt || Jn(o, a, c),
      p = Ye(r, u + b, f + b);
    return S && p;
  }
  getCenterPoint(t) {
    const {
        x: i,
        y: n,
        startAngle: s,
        endAngle: o,
        innerRadius: r,
        outerRadius: a,
      } = this.getProps(
        [
          "x",
          "y",
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "circumference",
        ],
        t
      ),
      { offset: c, spacing: u } = this.options,
      f = (s + o) / 2,
      m = (r + a + u + c) / 2;
    return { x: i + Math.cos(f) * m, y: n + Math.sin(f) * m };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: i, circumference: n } = this,
      s = (i.offset || 0) / 2,
      o = (i.spacing || 0) / 2;
    if (
      ((this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0),
      (this.fullCircles = n > Pt ? Math.floor(n / Pt) : 0),
      n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
    )
      return;
    t.save();
    let r = 0;
    if (s) {
      r = s / 2;
      const c = (this.startAngle + this.endAngle) / 2;
      t.translate(Math.cos(c) * r, Math.sin(c) * r),
        this.circumference >= Wt && (r = s);
    }
    (t.fillStyle = i.backgroundColor), (t.strokeStyle = i.borderColor);
    const a = db(t, this, r, o);
    pb(t, this, r, o, a), t.restore();
  }
}
wo.id = "arc";
wo.defaults = {
  borderAlign: "center",
  borderColor: "#fff",
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
};
wo.defaultRoutes = { backgroundColor: "backgroundColor" };
function wu(e, t, i = t) {
  (e.lineCap = _t(i.borderCapStyle, t.borderCapStyle)),
    e.setLineDash(_t(i.borderDash, t.borderDash)),
    (e.lineDashOffset = _t(i.borderDashOffset, t.borderDashOffset)),
    (e.lineJoin = _t(i.borderJoinStyle, t.borderJoinStyle)),
    (e.lineWidth = _t(i.borderWidth, t.borderWidth)),
    (e.strokeStyle = _t(i.borderColor, t.borderColor));
}
function gb(e, t, i) {
  e.lineTo(i.x, i.y);
}
function mb(e) {
  return e.stepped
    ? Pv
    : e.tension || e.cubicInterpolationMode === "monotone"
    ? Av
    : gb;
}
function ku(e, t, i = {}) {
  const n = e.length,
    { start: s = 0, end: o = n - 1 } = i,
    { start: r, end: a } = t,
    c = Math.max(s, r),
    u = Math.min(o, a),
    f = (s < r && o < r) || (s > a && o > a);
  return {
    count: n,
    start: c,
    loop: t.loop,
    ilen: u < c && !f ? n + u - c : u - c,
  };
}
function vb(e, t, i, n) {
  const { points: s, options: o } = t,
    { count: r, start: a, loop: c, ilen: u } = ku(s, i, n),
    f = mb(o);
  let { move: m = !0, reverse: b } = n || {},
    x,
    S,
    p;
  for (x = 0; x <= u; ++x)
    (S = s[(a + (b ? u - x : x)) % r]),
      !S.skip &&
        (m ? (e.moveTo(S.x, S.y), (m = !1)) : f(e, p, S, b, o.stepped),
        (p = S));
  return c && ((S = s[(a + (b ? u : 0)) % r]), f(e, p, S, b, o.stepped)), !!c;
}
function _b(e, t, i, n) {
  const s = t.points,
    { count: o, start: r, ilen: a } = ku(s, i, n),
    { move: c = !0, reverse: u } = n || {};
  let f = 0,
    m = 0,
    b,
    x,
    S,
    p,
    v,
    k;
  const E = (g) => (r + (u ? a - g : g)) % o,
    y = () => {
      p !== v && (e.lineTo(f, v), e.lineTo(f, p), e.lineTo(f, k));
    };
  for (c && ((x = s[E(0)]), e.moveTo(x.x, x.y)), b = 0; b <= a; ++b) {
    if (((x = s[E(b)]), x.skip)) continue;
    const g = x.x,
      h = x.y,
      l = g | 0;
    l === S
      ? (h < p ? (p = h) : h > v && (v = h), (f = (m * f + g) / ++m))
      : (y(), e.lineTo(g, h), (S = l), (m = 0), (p = v = h)),
      (k = h);
  }
  y();
}
function br(e) {
  const t = e.options,
    i = t.borderDash && t.borderDash.length;
  return !e._decimated &&
    !e._loop &&
    !t.tension &&
    t.cubicInterpolationMode !== "monotone" &&
    !t.stepped &&
    !i
    ? _b
    : vb;
}
function yb(e) {
  return e.stepped
    ? f_
    : e.tension || e.cubicInterpolationMode === "monotone"
    ? p_
    : Ti;
}
function bb(e, t, i, n) {
  let s = t._path;
  s || ((s = t._path = new Path2D()), t.path(s, i, n) && s.closePath()),
    wu(e, t.options),
    e.stroke(s);
}
function xb(e, t, i, n) {
  const { segments: s, options: o } = t,
    r = br(t);
  for (const a of s)
    wu(e, o, a.style),
      e.beginPath(),
      r(e, t, a, { start: i, end: i + n - 1 }) && e.closePath(),
      e.stroke();
}
const wb = typeof Path2D == "function";
function kb(e, t, i, n) {
  wb && !t.options.segment ? bb(e, t, i, n) : xb(e, t, i, n);
}
class bi extends Oe {
  constructor(t) {
    super(),
      (this.animated = !0),
      (this.options = void 0),
      (this._chart = void 0),
      (this._loop = void 0),
      (this._fullLoop = void 0),
      (this._path = void 0),
      (this._points = void 0),
      (this._segments = void 0),
      (this._decimated = !1),
      (this._pointsUpdated = !1),
      (this._datasetIndex = void 0),
      t && Object.assign(this, t);
  }
  updateControlPoints(t, i) {
    const n = this.options;
    if (
      (n.tension || n.cubicInterpolationMode === "monotone") &&
      !n.stepped &&
      !this._pointsUpdated
    ) {
      const s = n.spanGaps ? this._loop : this._fullLoop;
      o_(this._points, n, t, s, i), (this._pointsUpdated = !0);
    }
  }
  set points(t) {
    (this._points = t),
      delete this._segments,
      delete this._path,
      (this._pointsUpdated = !1);
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = x_(this, this.options.segment));
  }
  first() {
    const t = this.segments,
      i = this.points;
    return t.length && i[t[0].start];
  }
  last() {
    const t = this.segments,
      i = this.points,
      n = t.length;
    return n && i[t[n - 1].end];
  }
  interpolate(t, i) {
    const n = this.options,
      s = t[i],
      o = this.points,
      r = ru(this, { property: i, start: s, end: s });
    if (!r.length) return;
    const a = [],
      c = yb(n);
    let u, f;
    for (u = 0, f = r.length; u < f; ++u) {
      const { start: m, end: b } = r[u],
        x = o[m],
        S = o[b];
      if (x === S) {
        a.push(x);
        continue;
      }
      const p = Math.abs((s - x[i]) / (S[i] - x[i])),
        v = c(x, S, p, n.stepped);
      (v[i] = t[i]), a.push(v);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, i, n) {
    return br(this)(t, this, i, n);
  }
  path(t, i, n) {
    const s = this.segments,
      o = br(this);
    let r = this._loop;
    (i = i || 0), (n = n || this.points.length - i);
    for (const a of s) r &= o(t, this, a, { start: i, end: i + n - 1 });
    return !!r;
  }
  draw(t, i, n, s) {
    const o = this.options || {};
    (this.points || []).length &&
      o.borderWidth &&
      (t.save(), kb(t, this, n, s), t.restore()),
      this.animated && ((this._pointsUpdated = !1), (this._path = void 0));
  }
}
bi.id = "line";
bi.defaults = {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0,
};
bi.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor",
};
bi.descriptors = {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill",
};
function Gl(e, t, i, n) {
  const s = e.options,
    { [i]: o } = e.getProps([i], n);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class ko extends Oe {
  constructor(t) {
    super(),
      (this.options = void 0),
      (this.parsed = void 0),
      (this.skip = void 0),
      (this.stop = void 0),
      t && Object.assign(this, t);
  }
  inRange(t, i, n) {
    const s = this.options,
      { x: o, y: r } = this.getProps(["x", "y"], n);
    return (
      Math.pow(t - o, 2) + Math.pow(i - r, 2) <
      Math.pow(s.hitRadius + s.radius, 2)
    );
  }
  inXRange(t, i) {
    return Gl(this, t, "x", i);
  }
  inYRange(t, i) {
    return Gl(this, t, "y", i);
  }
  getCenterPoint(t) {
    const { x: i, y: n } = this.getProps(["x", "y"], t);
    return { x: i, y: n };
  }
  size(t) {
    t = t || this.options || {};
    let i = t.radius || 0;
    i = Math.max(i, (i && t.hoverRadius) || 0);
    const n = (i && t.borderWidth) || 0;
    return (i + n) * 2;
  }
  draw(t, i) {
    const n = this.options;
    this.skip ||
      n.radius < 0.1 ||
      !Gn(this, i, this.size(n) / 2) ||
      ((t.strokeStyle = n.borderColor),
      (t.lineWidth = n.borderWidth),
      (t.fillStyle = n.backgroundColor),
      gr(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
ko.id = "point";
ko.defaults = {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0,
};
ko.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor",
};
function Cu(e, t) {
  const {
    x: i,
    y: n,
    base: s,
    width: o,
    height: r,
  } = e.getProps(["x", "y", "base", "width", "height"], t);
  let a, c, u, f, m;
  return (
    e.horizontal
      ? ((m = r / 2),
        (a = Math.min(i, s)),
        (c = Math.max(i, s)),
        (u = n - m),
        (f = n + m))
      : ((m = o / 2),
        (a = i - m),
        (c = i + m),
        (u = Math.min(n, s)),
        (f = Math.max(n, s))),
    { left: a, top: u, right: c, bottom: f }
  );
}
function ci(e, t, i, n) {
  return e ? 0 : Xt(t, i, n);
}
function Cb(e, t, i) {
  const n = e.options.borderWidth,
    s = e.borderSkipped,
    o = Kh(n);
  return {
    t: ci(s.top, o.top, 0, i),
    r: ci(s.right, o.right, 0, t),
    b: ci(s.bottom, o.bottom, 0, i),
    l: ci(s.left, o.left, 0, t),
  };
}
function Mb(e, t, i) {
  const { enableBorderRadius: n } = e.getProps(["enableBorderRadius"]),
    s = e.options.borderRadius,
    o = Ii(s),
    r = Math.min(t, i),
    a = e.borderSkipped,
    c = n || kt(s);
  return {
    topLeft: ci(!c || a.top || a.left, o.topLeft, 0, r),
    topRight: ci(!c || a.top || a.right, o.topRight, 0, r),
    bottomLeft: ci(!c || a.bottom || a.left, o.bottomLeft, 0, r),
    bottomRight: ci(!c || a.bottom || a.right, o.bottomRight, 0, r),
  };
}
function Eb(e) {
  const t = Cu(e),
    i = t.right - t.left,
    n = t.bottom - t.top,
    s = Cb(e, i / 2, n / 2),
    o = Mb(e, i / 2, n / 2);
  return {
    outer: { x: t.left, y: t.top, w: i, h: n, radius: o },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: i - s.l - s.r,
      h: n - s.t - s.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r)),
      },
    },
  };
}
function Vo(e, t, i, n) {
  const s = t === null,
    o = i === null,
    a = e && !(s && o) && Cu(e, n);
  return a && (s || Ye(t, a.left, a.right)) && (o || Ye(i, a.top, a.bottom));
}
function Sb(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Ob(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function jo(e, t, i = {}) {
  const n = e.x !== i.x ? -t : 0,
    s = e.y !== i.y ? -t : 0,
    o = (e.x + e.w !== i.x + i.w ? t : 0) - n,
    r = (e.y + e.h !== i.y + i.h ? t : 0) - s;
  return { x: e.x + n, y: e.y + s, w: e.w + o, h: e.h + r, radius: e.radius };
}
class Co extends Oe {
  constructor(t) {
    super(),
      (this.options = void 0),
      (this.horizontal = void 0),
      (this.base = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.inflateAmount = void 0),
      t && Object.assign(this, t);
  }
  draw(t) {
    const {
        inflateAmount: i,
        options: { borderColor: n, backgroundColor: s },
      } = this,
      { inner: o, outer: r } = Eb(this),
      a = Sb(r.radius) ? Zn : Ob;
    t.save(),
      (r.w !== o.w || r.h !== o.h) &&
        (t.beginPath(),
        a(t, jo(r, i, o)),
        t.clip(),
        a(t, jo(o, -i, r)),
        (t.fillStyle = n),
        t.fill("evenodd")),
      t.beginPath(),
      a(t, jo(o, i)),
      (t.fillStyle = s),
      t.fill(),
      t.restore();
  }
  inRange(t, i, n) {
    return Vo(this, t, i, n);
  }
  inXRange(t, i) {
    return Vo(this, t, null, i);
  }
  inYRange(t, i) {
    return Vo(this, null, t, i);
  }
  getCenterPoint(t) {
    const {
      x: i,
      y: n,
      base: s,
      horizontal: o,
    } = this.getProps(["x", "y", "base", "horizontal"], t);
    return { x: o ? (i + s) / 2 : i, y: o ? n : (n + s) / 2 };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
Co.id = "bar";
Co.defaults = {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0,
};
Co.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor",
};
const Tb = Object.freeze({
  __proto__: null,
  ArcElement: wo,
  LineElement: bi,
  PointElement: ko,
  BarElement: Co,
});
function Db(e, t, i, n, s) {
  const o = s.samples || n;
  if (o >= i) return e.slice(t, t + i);
  const r = [],
    a = (i - 2) / (o - 2);
  let c = 0;
  const u = t + i - 1;
  let f = t,
    m,
    b,
    x,
    S,
    p;
  for (r[c++] = e[f], m = 0; m < o - 2; m++) {
    let v = 0,
      k = 0,
      E;
    const y = Math.floor((m + 1) * a) + 1 + t,
      g = Math.min(Math.floor((m + 2) * a) + 1, i) + t,
      h = g - y;
    for (E = y; E < g; E++) (v += e[E].x), (k += e[E].y);
    (v /= h), (k /= h);
    const l = Math.floor(m * a) + 1 + t,
      d = Math.min(Math.floor((m + 1) * a) + 1, i) + t,
      { x: C, y: T } = e[f];
    for (x = S = -1, E = l; E < d; E++)
      (S = 0.5 * Math.abs((C - v) * (e[E].y - T) - (C - e[E].x) * (k - T))),
        S > x && ((x = S), (b = e[E]), (p = E));
    (r[c++] = b), (f = p);
  }
  return (r[c++] = e[u]), r;
}
function Lb(e, t, i, n) {
  let s = 0,
    o = 0,
    r,
    a,
    c,
    u,
    f,
    m,
    b,
    x,
    S,
    p;
  const v = [],
    k = t + i - 1,
    E = e[t].x,
    g = e[k].x - E;
  for (r = t; r < t + i; ++r) {
    (a = e[r]), (c = ((a.x - E) / g) * n), (u = a.y);
    const h = c | 0;
    if (h === f)
      u < S ? ((S = u), (m = r)) : u > p && ((p = u), (b = r)),
        (s = (o * s + a.x) / ++o);
    else {
      const l = r - 1;
      if (!Ot(m) && !Ot(b)) {
        const d = Math.min(m, b),
          C = Math.max(m, b);
        d !== x && d !== l && v.push({ ...e[d], x: s }),
          C !== x && C !== l && v.push({ ...e[C], x: s });
      }
      r > 0 && l !== x && v.push(e[l]),
        v.push(a),
        (f = h),
        (o = 0),
        (S = p = u),
        (m = b = x = r);
    }
  }
  return v;
}
function Mu(e) {
  if (e._decimated) {
    const t = e._data;
    delete e._decimated,
      delete e._data,
      Object.defineProperty(e, "data", { value: t });
  }
}
function Zl(e) {
  e.data.datasets.forEach((t) => {
    Mu(t);
  });
}
function Pb(e, t) {
  const i = t.length;
  let n = 0,
    s;
  const { iScale: o } = e,
    { min: r, max: a, minDefined: c, maxDefined: u } = o.getUserBounds();
  return (
    c && (n = Xt(Ue(t, o.axis, r).lo, 0, i - 1)),
    u ? (s = Xt(Ue(t, o.axis, a).hi + 1, n, i) - n) : (s = i - n),
    { start: n, count: s }
  );
}
const Ab = {
  id: "decimation",
  defaults: { algorithm: "min-max", enabled: !1 },
  beforeElementsUpdate: (e, t, i) => {
    if (!i.enabled) {
      Zl(e);
      return;
    }
    const n = e.width;
    e.data.datasets.forEach((s, o) => {
      const { _data: r, indexAxis: a } = s,
        c = e.getDatasetMeta(o),
        u = r || s.data;
      if (
        Sn([a, e.options.indexAxis]) === "y" ||
        !c.controller.supportsDecimation
      )
        return;
      const f = e.scales[c.xAxisID];
      if ((f.type !== "linear" && f.type !== "time") || e.options.parsing)
        return;
      const { start: m, count: b } = Pb(c, u);
      const x = i.threshold || 4 * n;
      if (b <= x) {
        Mu(s);
        return;
      }
      Ot(r) &&
        ((s._data = u),
        delete s.data,
        Object.defineProperty(s, "data", {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return this._decimated;
          },
          set: function (p) {
            this._data = p;
          },
        }));
      let S;
      switch (i.algorithm) {
        case "lttb":
          S = Db(u, m, b, n, i);
          break;
        case "min-max":
          S = Lb(u, m, b, n);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`);
      }
      s._decimated = S;
    });
  },
  destroy(e) {
    Zl(e);
  },
};
function Ib(e, t, i) {
  const n = e.segments,
    s = e.points,
    o = t.points,
    r = [];
  for (const a of n) {
    let { start: c, end: u } = a;
    u = oa(c, u, s);
    const f = xr(i, s[c], s[u], a.loop);
    if (!t.segments) {
      r.push({ source: a, target: f, start: s[c], end: s[u] });
      continue;
    }
    const m = ru(t, f);
    for (const b of m) {
      const x = xr(i, o[b.start], o[b.end], b.loop),
        S = ou(a, s, x);
      for (const p of S)
        r.push({
          source: p,
          target: b,
          start: { [i]: tc(f, x, "start", Math.max) },
          end: { [i]: tc(f, x, "end", Math.min) },
        });
    }
  }
  return r;
}
function xr(e, t, i, n) {
  if (n) return;
  let s = t[e],
    o = i[e];
  return (
    e === "angle" && ((s = ce(s)), (o = ce(o))),
    { property: e, start: s, end: o }
  );
}
function Rb(e, t) {
  const { x: i = null, y: n = null } = e || {},
    s = t.points,
    o = [];
  return (
    t.segments.forEach(({ start: r, end: a }) => {
      a = oa(r, a, s);
      const c = s[r],
        u = s[a];
      n !== null
        ? (o.push({ x: c.x, y: n }), o.push({ x: u.x, y: n }))
        : i !== null && (o.push({ x: i, y: c.y }), o.push({ x: i, y: u.y }));
    }),
    o
  );
}
function oa(e, t, i) {
  for (; t > e; t--) {
    const n = i[t];
    if (!isNaN(n.x) && !isNaN(n.y)) break;
  }
  return t;
}
function tc(e, t, i, n) {
  return e && t ? n(e[i], t[i]) : e ? e[i] : t ? t[i] : 0;
}
function Eu(e, t) {
  let i = [],
    n = !1;
  return (
    Ht(e) ? ((n = !0), (i = e)) : (i = Rb(e, t)),
    i.length
      ? new bi({ points: i, options: { tension: 0 }, _loop: n, _fullLoop: n })
      : null
  );
}
function ec(e) {
  return e && e.fill !== !1;
}
function Bb(e, t, i) {
  let s = e[t].fill;
  const o = [t];
  let r;
  if (!i) return s;
  for (; s !== !1 && o.indexOf(s) === -1; ) {
    if (!qt(s)) return s;
    if (((r = e[s]), !r)) return !1;
    if (r.visible) return s;
    o.push(s), (s = r.fill);
  }
  return !1;
}
function Fb(e, t, i) {
  const n = zb(e);
  if (kt(n)) return isNaN(n.value) ? !1 : n;
  const s = parseFloat(n);
  return qt(s) && Math.floor(s) === s
    ? Hb(n[0], t, s, i)
    : ["origin", "start", "end", "stack", "shape"].indexOf(n) >= 0 && n;
}
function Hb(e, t, i, n) {
  return (
    (e === "-" || e === "+") && (i = t + i), i === t || i < 0 || i >= n ? !1 : i
  );
}
function $b(e, t) {
  let i = null;
  return (
    e === "start"
      ? (i = t.bottom)
      : e === "end"
      ? (i = t.top)
      : kt(e)
      ? (i = t.getPixelForValue(e.value))
      : t.getBasePixel && (i = t.getBasePixel()),
    i
  );
}
function Wb(e, t, i) {
  let n;
  return (
    e === "start"
      ? (n = i)
      : e === "end"
      ? (n = t.options.reverse ? t.min : t.max)
      : kt(e)
      ? (n = e.value)
      : (n = t.getBaseValue()),
    n
  );
}
function zb(e) {
  const t = e.options,
    i = t.fill;
  let n = _t(i && i.target, i);
  return (
    n === void 0 && (n = !!t.backgroundColor),
    n === !1 || n === null ? !1 : n === !0 ? "origin" : n
  );
}
function Nb(e) {
  const { scale: t, index: i, line: n } = e,
    s = [],
    o = n.segments,
    r = n.points,
    a = Vb(t, i);
  a.push(Eu({ x: null, y: t.bottom }, n));
  for (let c = 0; c < o.length; c++) {
    const u = o[c];
    for (let f = u.start; f <= u.end; f++) jb(s, r[f], a);
  }
  return new bi({ points: s, options: {} });
}
function Vb(e, t) {
  const i = [],
    n = e.getMatchingVisibleMetas("line");
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    if (o.index === t) break;
    o.hidden || i.unshift(o.dataset);
  }
  return i;
}
function jb(e, t, i) {
  const n = [];
  for (let s = 0; s < i.length; s++) {
    const o = i[s],
      { first: r, last: a, point: c } = qb(o, t, "x");
    if (!(!c || (r && a))) {
      if (r) n.unshift(c);
      else if ((e.push(c), !a)) break;
    }
  }
  e.push(...n);
}
function qb(e, t, i) {
  const n = e.interpolate(t, i);
  if (!n) return {};
  const s = n[i],
    o = e.segments,
    r = e.points;
  let a = !1,
    c = !1;
  for (let u = 0; u < o.length; u++) {
    const f = o[u],
      m = r[f.start][i],
      b = r[f.end][i];
    if (Ye(s, m, b)) {
      (a = s === m), (c = s === b);
      break;
    }
  }
  return { first: a, last: c, point: n };
}
class Su {
  constructor(t) {
    (this.x = t.x), (this.y = t.y), (this.radius = t.radius);
  }
  pathSegment(t, i, n) {
    const { x: s, y: o, radius: r } = this;
    return (
      (i = i || { start: 0, end: Pt }),
      t.arc(s, o, r, i.end, i.start, !0),
      !n.bounds
    );
  }
  interpolate(t) {
    const { x: i, y: n, radius: s } = this,
      o = t.angle;
    return { x: i + Math.cos(o) * s, y: n + Math.sin(o) * s, angle: o };
  }
}
function Kb(e) {
  const { chart: t, fill: i, line: n } = e;
  if (qt(i)) return Yb(t, i);
  if (i === "stack") return Nb(e);
  if (i === "shape") return !0;
  const s = Ub(e);
  return s instanceof Su ? s : Eu(s, n);
}
function Yb(e, t) {
  const i = e.getDatasetMeta(t);
  return i && e.isDatasetVisible(t) ? i.dataset : null;
}
function Ub(e) {
  return (e.scale || {}).getPointPositionForValue ? Qb(e) : Xb(e);
}
function Xb(e) {
  const { scale: t = {}, fill: i } = e,
    n = $b(i, t);
  if (qt(n)) {
    const s = t.isHorizontal();
    return { x: s ? n : null, y: s ? null : n };
  }
  return null;
}
function Qb(e) {
  const { scale: t, fill: i } = e,
    n = t.options,
    s = t.getLabels().length,
    o = n.reverse ? t.max : t.min,
    r = Wb(i, t, o),
    a = [];
  if (n.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new Su({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(r),
    });
  }
  for (let c = 0; c < s; ++c) a.push(t.getPointPositionForValue(c, r));
  return a;
}
function qo(e, t, i) {
  const n = Kb(t),
    { line: s, scale: o, axis: r } = t,
    a = s.options,
    c = a.fill,
    u = a.backgroundColor,
    { above: f = u, below: m = u } = c || {};
  n &&
    s.points.length &&
    (fo(e, i),
    Jb(e, {
      line: s,
      target: n,
      above: f,
      below: m,
      area: i,
      scale: o,
      axis: r,
    }),
    po(e));
}
function Jb(e, t) {
  const { line: i, target: n, above: s, below: o, area: r, scale: a } = t,
    c = i._loop ? "angle" : t.axis;
  e.save(),
    c === "x" &&
      o !== s &&
      (ic(e, n, r.top),
      nc(e, { line: i, target: n, color: s, scale: a, property: c }),
      e.restore(),
      e.save(),
      ic(e, n, r.bottom)),
    nc(e, { line: i, target: n, color: o, scale: a, property: c }),
    e.restore();
}
function ic(e, t, i) {
  const { segments: n, points: s } = t;
  let o = !0,
    r = !1;
  e.beginPath();
  for (const a of n) {
    const { start: c, end: u } = a,
      f = s[c],
      m = s[oa(c, u, s)];
    o ? (e.moveTo(f.x, f.y), (o = !1)) : (e.lineTo(f.x, i), e.lineTo(f.x, f.y)),
      (r = !!t.pathSegment(e, a, { move: r })),
      r ? e.closePath() : e.lineTo(m.x, i);
  }
  e.lineTo(t.first().x, i), e.closePath(), e.clip();
}
function nc(e, t) {
  const { line: i, target: n, property: s, color: o, scale: r } = t,
    a = Ib(i, n, s);
  for (const { source: c, target: u, start: f, end: m } of a) {
    const { style: { backgroundColor: b = o } = {} } = c,
      x = n !== !0;
    e.save(), (e.fillStyle = b), Gb(e, r, x && xr(s, f, m)), e.beginPath();
    const S = !!i.pathSegment(e, c);
    let p;
    if (x) {
      S ? e.closePath() : sc(e, n, m, s);
      const v = !!n.pathSegment(e, u, { move: S, reverse: !0 });
      (p = S && v), p || sc(e, n, f, s);
    }
    e.closePath(), e.fill(p ? "evenodd" : "nonzero"), e.restore();
  }
}
function Gb(e, t, i) {
  const { top: n, bottom: s } = t.chart.chartArea,
    { property: o, start: r, end: a } = i || {};
  o === "x" && (e.beginPath(), e.rect(r, n, a - r, s - n), e.clip());
}
function sc(e, t, i, n) {
  const s = t.interpolate(i, n);
  s && e.lineTo(s.x, s.y);
}
const Zb = {
  id: "filler",
  afterDatasetsUpdate(e, t, i) {
    const n = (e.data.datasets || []).length,
      s = [];
    let o, r, a, c;
    for (r = 0; r < n; ++r)
      (o = e.getDatasetMeta(r)),
        (a = o.dataset),
        (c = null),
        a &&
          a.options &&
          a instanceof bi &&
          (c = {
            visible: e.isDatasetVisible(r),
            index: r,
            fill: Fb(a, r, n),
            chart: e,
            axis: o.controller.options.indexAxis,
            scale: o.vScale,
            line: a,
          }),
        (o.$filler = c),
        s.push(c);
    for (r = 0; r < n; ++r)
      (c = s[r]), !(!c || c.fill === !1) && (c.fill = Bb(s, r, i.propagate));
  },
  beforeDraw(e, t, i) {
    const n = i.drawTime === "beforeDraw",
      s = e.getSortedVisibleDatasetMetas(),
      o = e.chartArea;
    for (let r = s.length - 1; r >= 0; --r) {
      const a = s[r].$filler;
      !a ||
        (a.line.updateControlPoints(o, a.axis), n && a.fill && qo(e.ctx, a, o));
    }
  },
  beforeDatasetsDraw(e, t, i) {
    if (i.drawTime !== "beforeDatasetsDraw") return;
    const n = e.getSortedVisibleDatasetMetas();
    for (let s = n.length - 1; s >= 0; --s) {
      const o = n[s].$filler;
      ec(o) && qo(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, i) {
    const n = t.meta.$filler;
    !ec(n) || i.drawTime !== "beforeDatasetDraw" || qo(e.ctx, n, e.chartArea);
  },
  defaults: { propagate: !0, drawTime: "beforeDatasetDraw" },
};
const oc = (e, t) => {
    let { boxHeight: i = t, boxWidth: n = t } = e;
    return (
      e.usePointStyle &&
        ((i = Math.min(i, t)), (n = e.pointStyleWidth || Math.min(n, t))),
      { boxWidth: n, boxHeight: i, itemHeight: Math.max(t, i) }
    );
  },
  t0 = (e, t) =>
    e !== null &&
    t !== null &&
    e.datasetIndex === t.datasetIndex &&
    e.index === t.index;
class rc extends Oe {
  constructor(t) {
    super(),
      (this._added = !1),
      (this.legendHitBoxes = []),
      (this._hoveredItem = null),
      (this.doughnutMode = !1),
      (this.chart = t.chart),
      (this.options = t.options),
      (this.ctx = t.ctx),
      (this.legendItems = void 0),
      (this.columnSizes = void 0),
      (this.lineWidths = void 0),
      (this.maxHeight = void 0),
      (this.maxWidth = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.height = void 0),
      (this.width = void 0),
      (this._margins = void 0),
      (this.position = void 0),
      (this.weight = void 0),
      (this.fullSize = void 0);
  }
  update(t, i, n) {
    (this.maxWidth = t),
      (this.maxHeight = i),
      (this._margins = n),
      this.setDimensions(),
      this.buildLabels(),
      this.fit();
  }
  setDimensions() {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = this._margins.left),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = this._margins.top),
        (this.bottom = this.height));
  }
  buildLabels() {
    const t = this.options.labels || {};
    let i = Bt(t.generateLabels, [this.chart], this) || [];
    t.filter && (i = i.filter((n) => t.filter(n, this.chart.data))),
      t.sort && (i = i.sort((n, s) => t.sort(n, s, this.chart.data))),
      this.options.reverse && i.reverse(),
      (this.legendItems = i);
  }
  fit() {
    const { options: t, ctx: i } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels,
      s = Yt(n.font),
      o = s.size,
      r = this._computeTitleHeight(),
      { boxWidth: a, itemHeight: c } = oc(n, o);
    let u, f;
    (i.font = s.string),
      this.isHorizontal()
        ? ((u = this.maxWidth), (f = this._fitRows(r, o, a, c) + 10))
        : ((f = this.maxHeight), (u = this._fitCols(r, o, a, c) + 10)),
      (this.width = Math.min(u, t.maxWidth || this.maxWidth)),
      (this.height = Math.min(f, t.maxHeight || this.maxHeight));
  }
  _fitRows(t, i, n, s) {
    const {
        ctx: o,
        maxWidth: r,
        options: {
          labels: { padding: a },
        },
      } = this,
      c = (this.legendHitBoxes = []),
      u = (this.lineWidths = [0]),
      f = s + a;
    let m = t;
    (o.textAlign = "left"), (o.textBaseline = "middle");
    let b = -1,
      x = -f;
    return (
      this.legendItems.forEach((S, p) => {
        const v = n + i / 2 + o.measureText(S.text).width;
        (p === 0 || u[u.length - 1] + v + 2 * a > r) &&
          ((m += f), (u[u.length - (p > 0 ? 0 : 1)] = 0), (x += f), b++),
          (c[p] = { left: 0, top: x, row: b, width: v, height: s }),
          (u[u.length - 1] += v + a);
      }),
      m
    );
  }
  _fitCols(t, i, n, s) {
    const {
        ctx: o,
        maxHeight: r,
        options: {
          labels: { padding: a },
        },
      } = this,
      c = (this.legendHitBoxes = []),
      u = (this.columnSizes = []),
      f = r - t;
    let m = a,
      b = 0,
      x = 0,
      S = 0,
      p = 0;
    return (
      this.legendItems.forEach((v, k) => {
        const E = n + i / 2 + o.measureText(v.text).width;
        k > 0 &&
          x + s + 2 * a > f &&
          ((m += b + a),
          u.push({ width: b, height: x }),
          (S += b + a),
          p++,
          (b = x = 0)),
          (c[k] = { left: S, top: x, col: p, width: E, height: s }),
          (b = Math.max(b, E)),
          (x += s + a);
      }),
      (m += b),
      u.push({ width: b, height: x }),
      m
    );
  }
  adjustHitBoxes() {
    if (!this.options.display) return;
    const t = this._computeTitleHeight(),
      {
        legendHitBoxes: i,
        options: {
          align: n,
          labels: { padding: s },
          rtl: o,
        },
      } = this,
      r = Ji(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0,
        c = Zt(n, this.left + s, this.right - this.lineWidths[a]);
      for (const u of i)
        a !== u.row &&
          ((a = u.row),
          (c = Zt(n, this.left + s, this.right - this.lineWidths[a]))),
          (u.top += this.top + t + s),
          (u.left = r.leftForLtr(r.x(c), u.width)),
          (c += u.width + s);
    } else {
      let a = 0,
        c = Zt(n, this.top + t + s, this.bottom - this.columnSizes[a].height);
      for (const u of i)
        u.col !== a &&
          ((a = u.col),
          (c = Zt(
            n,
            this.top + t + s,
            this.bottom - this.columnSizes[a].height
          ))),
          (u.top = c),
          (u.left += this.left + s),
          (u.left = r.leftForLtr(r.x(u.left), u.width)),
          (c += u.height + s);
    }
  }
  isHorizontal() {
    return (
      this.options.position === "top" || this.options.position === "bottom"
    );
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      fo(t, this), this._draw(), po(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: i, lineWidths: n, ctx: s } = this,
      { align: o, labels: r } = t,
      a = Ct.color,
      c = Ji(t.rtl, this.left, this.width),
      u = Yt(r.font),
      { color: f, padding: m } = r,
      b = u.size,
      x = b / 2;
    let S;
    this.drawTitle(),
      (s.textAlign = c.textAlign("left")),
      (s.textBaseline = "middle"),
      (s.lineWidth = 0.5),
      (s.font = u.string);
    const { boxWidth: p, boxHeight: v, itemHeight: k } = oc(r, b),
      E = function (d, C, T) {
        if (isNaN(p) || p <= 0 || isNaN(v) || v < 0) return;
        s.save();
        const L = _t(T.lineWidth, 1);
        if (
          ((s.fillStyle = _t(T.fillStyle, a)),
          (s.lineCap = _t(T.lineCap, "butt")),
          (s.lineDashOffset = _t(T.lineDashOffset, 0)),
          (s.lineJoin = _t(T.lineJoin, "miter")),
          (s.lineWidth = L),
          (s.strokeStyle = _t(T.strokeStyle, a)),
          s.setLineDash(_t(T.lineDash, [])),
          r.usePointStyle)
        ) {
          const A = {
              radius: (v * Math.SQRT2) / 2,
              pointStyle: T.pointStyle,
              rotation: T.rotation,
              borderWidth: L,
            },
            R = c.xPlus(d, p / 2),
            W = C + x;
          qh(s, A, R, W, p);
        } else {
          const A = C + Math.max((b - v) / 2, 0),
            R = c.leftForLtr(d, p),
            W = Ii(T.borderRadius);
          s.beginPath(),
            Object.values(W).some((z) => z !== 0)
              ? Zn(s, { x: R, y: A, w: p, h: v, radius: W })
              : s.rect(R, A, p, v),
            s.fill(),
            L !== 0 && s.stroke();
        }
        s.restore();
      },
      y = function (d, C, T) {
        Hi(s, T.text, d, C + k / 2, u, {
          strikethrough: T.hidden,
          textAlign: c.textAlign(T.textAlign),
        });
      },
      g = this.isHorizontal(),
      h = this._computeTitleHeight();
    g
      ? (S = {
          x: Zt(o, this.left + m, this.right - n[0]),
          y: this.top + m + h,
          line: 0,
        })
      : (S = {
          x: this.left + m,
          y: Zt(o, this.top + h + m, this.bottom - i[0].height),
          line: 0,
        }),
      iu(this.ctx, t.textDirection);
    const l = k + m;
    this.legendItems.forEach((d, C) => {
      (s.strokeStyle = d.fontColor || f), (s.fillStyle = d.fontColor || f);
      const T = s.measureText(d.text).width,
        L = c.textAlign(d.textAlign || (d.textAlign = r.textAlign)),
        A = p + x + T;
      let R = S.x,
        W = S.y;
      c.setWidth(this.width),
        g
          ? C > 0 &&
            R + A + m > this.right &&
            ((W = S.y += l),
            S.line++,
            (R = S.x = Zt(o, this.left + m, this.right - n[S.line])))
          : C > 0 &&
            W + l > this.bottom &&
            ((R = S.x = R + i[S.line].width + m),
            S.line++,
            (W = S.y =
              Zt(o, this.top + h + m, this.bottom - i[S.line].height)));
      const z = c.x(R);
      E(z, W, d),
        (R = Ym(L, R + p + x, g ? R + A : this.right, t.rtl)),
        y(c.x(R), W, d),
        g ? (S.x += A + m) : (S.y += l);
    }),
      nu(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options,
      i = t.title,
      n = Yt(i.font),
      s = ee(i.padding);
    if (!i.display) return;
    const o = Ji(t.rtl, this.left, this.width),
      r = this.ctx,
      a = i.position,
      c = n.size / 2,
      u = s.top + c;
    let f,
      m = this.left,
      b = this.width;
    if (this.isHorizontal())
      (b = Math.max(...this.lineWidths)),
        (f = this.top + u),
        (m = Zt(t.align, m, this.right - b));
    else {
      const S = this.columnSizes.reduce((p, v) => Math.max(p, v.height), 0);
      f =
        u +
        Zt(
          t.align,
          this.top,
          this.bottom - S - t.labels.padding - this._computeTitleHeight()
        );
    }
    const x = Zt(a, m, m + b);
    (r.textAlign = o.textAlign(Kr(a))),
      (r.textBaseline = "middle"),
      (r.strokeStyle = i.color),
      (r.fillStyle = i.color),
      (r.font = n.string),
      Hi(r, i.text, x, f, n);
  }
  _computeTitleHeight() {
    const t = this.options.title,
      i = Yt(t.font),
      n = ee(t.padding);
    return t.display ? i.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, i) {
    let n, s, o;
    if (Ye(t, this.left, this.right) && Ye(i, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
        if (
          ((s = o[n]),
          Ye(t, s.left, s.left + s.width) && Ye(i, s.top, s.top + s.height))
        )
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const i = this.options;
    if (!e0(t.type, i)) return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem,
        o = t0(s, n);
      s && !o && Bt(i.onLeave, [t, s, this], this),
        (this._hoveredItem = n),
        n && !o && Bt(i.onHover, [t, n, this], this);
    } else n && Bt(i.onClick, [t, n, this], this);
  }
}
function e0(e, t) {
  return !!(
    ((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave)) ||
    (t.onClick && (e === "click" || e === "mouseup"))
  );
}
const i0 = {
  id: "legend",
  _element: rc,
  start(e, t, i) {
    const n = (e.legend = new rc({ ctx: e.ctx, options: i, chart: e }));
    te.configure(e, n, i), te.addBox(e, n);
  },
  stop(e) {
    te.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, i) {
    const n = e.legend;
    te.configure(e, n, i), (n.options = i);
  },
  afterUpdate(e) {
    const t = e.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(e, t) {
    t.replay || e.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(e, t, i) {
      const n = t.datasetIndex,
        s = i.chart;
      s.isDatasetVisible(n)
        ? (s.hide(n), (t.hidden = !0))
        : (s.show(n), (t.hidden = !1));
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets,
          {
            labels: { usePointStyle: i, pointStyle: n, textAlign: s, color: o },
          } = e.legend.options;
        return e._getSortedDatasetMetas().map((r) => {
          const a = r.controller.getStyle(i ? 0 : void 0),
            c = ee(a.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: a.backgroundColor,
            fontColor: o,
            hidden: !r.visible,
            lineCap: a.borderCapStyle,
            lineDash: a.borderDash,
            lineDashOffset: a.borderDashOffset,
            lineJoin: a.borderJoinStyle,
            lineWidth: (c.width + c.height) / 4,
            strokeStyle: a.borderColor,
            pointStyle: n || a.pointStyle,
            rotation: a.rotation,
            textAlign: s || a.textAlign,
            borderRadius: 0,
            datasetIndex: r.index,
          };
        }, this);
      },
    },
    title: {
      color: (e) => e.chart.options.color,
      display: !1,
      position: "center",
      text: "",
    },
  },
  descriptors: {
    _scriptable: (e) => !e.startsWith("on"),
    labels: {
      _scriptable: (e) => !["generateLabels", "filter", "sort"].includes(e),
    },
  },
};
class ra extends Oe {
  constructor(t) {
    super(),
      (this.chart = t.chart),
      (this.options = t.options),
      (this.ctx = t.ctx),
      (this._padding = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.position = void 0),
      (this.weight = void 0),
      (this.fullSize = void 0);
  }
  update(t, i) {
    const n = this.options;
    if (((this.left = 0), (this.top = 0), !n.display)) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    (this.width = this.right = t), (this.height = this.bottom = i);
    const s = Ht(n.text) ? n.text.length : 1;
    this._padding = ee(n.padding);
    const o = s * Yt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? (this.height = o) : (this.width = o);
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: i, left: n, bottom: s, right: o, options: r } = this,
      a = r.align;
    let c = 0,
      u,
      f,
      m;
    return (
      this.isHorizontal()
        ? ((f = Zt(a, n, o)), (m = i + t), (u = o - n))
        : (r.position === "left"
            ? ((f = n + t), (m = Zt(a, s, i)), (c = Wt * -0.5))
            : ((f = o - t), (m = Zt(a, i, s)), (c = Wt * 0.5)),
          (u = s - i)),
      { titleX: f, titleY: m, maxWidth: u, rotation: c }
    );
  }
  draw() {
    const t = this.ctx,
      i = this.options;
    if (!i.display) return;
    const n = Yt(i.font),
      o = n.lineHeight / 2 + this._padding.top,
      { titleX: r, titleY: a, maxWidth: c, rotation: u } = this._drawArgs(o);
    Hi(t, i.text, 0, 0, n, {
      color: i.color,
      maxWidth: c,
      rotation: u,
      textAlign: Kr(i.align),
      textBaseline: "middle",
      translation: [r, a],
    });
  }
}
function n0(e, t) {
  const i = new ra({ ctx: e.ctx, options: t, chart: e });
  te.configure(e, i, t), te.addBox(e, i), (e.titleBlock = i);
}
const s0 = {
  id: "title",
  _element: ra,
  start(e, t, i) {
    n0(e, i);
  },
  stop(e) {
    const t = e.titleBlock;
    te.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, i) {
    const n = e.titleBlock;
    te.configure(e, n, i), (n.options = i);
  },
  defaults: {
    align: "center",
    display: !1,
    font: { weight: "bold" },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3,
  },
  defaultRoutes: { color: "color" },
  descriptors: { _scriptable: !0, _indexable: !1 },
};
const Ms = new WeakMap();
const o0 = {
  id: "subtitle",
  start(e, t, i) {
    const n = new ra({ ctx: e.ctx, options: i, chart: e });
    te.configure(e, n, i), te.addBox(e, n), Ms.set(e, n);
  },
  stop(e) {
    te.removeBox(e, Ms.get(e)), Ms.delete(e);
  },
  beforeUpdate(e, t, i) {
    const n = Ms.get(e);
    te.configure(e, n, i), (n.options = i);
  },
  defaults: {
    align: "center",
    display: !1,
    font: { weight: "normal" },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500,
  },
  defaultRoutes: { color: "color" },
  descriptors: { _scriptable: !0, _indexable: !1 },
};
const $n = {
  average(e) {
    if (!e.length) return !1;
    let t,
      i,
      n = 0,
      s = 0,
      o = 0;
    for (t = 0, i = e.length; t < i; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const a = r.tooltipPosition();
        (n += a.x), (s += a.y), ++o;
      }
    }
    return { x: n / o, y: s / o };
  },
  nearest(e, t) {
    if (!e.length) return !1;
    let i = t.x,
      n = t.y,
      s = Number.POSITIVE_INFINITY,
      o,
      r,
      a;
    for (o = 0, r = e.length; o < r; ++o) {
      const c = e[o].element;
      if (c && c.hasValue()) {
        const u = c.getCenterPoint(),
          f = dr(t, u);
        f < s && ((s = f), (a = c));
      }
    }
    if (a) {
      const c = a.tooltipPosition();
      (i = c.x), (n = c.y);
    }
    return { x: i, y: n };
  },
};
function Ae(e, t) {
  return t && (Ht(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function je(e) {
  return (typeof e == "string" || e instanceof String) &&
    e.indexOf(`
`) > -1
    ? e.split(`
`)
    : e;
}
function r0(e, t) {
  const { element: i, datasetIndex: n, index: s } = t,
    o = e.getDatasetMeta(n).controller,
    { label: r, value: a } = o.getLabelAndValue(s);
  return {
    chart: e,
    label: r,
    parsed: o.getParsed(s),
    raw: e.data.datasets[n].data[s],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: s,
    datasetIndex: n,
    element: i,
  };
}
function ac(e, t) {
  const i = e.chart.ctx,
    { body: n, footer: s, title: o } = e,
    { boxWidth: r, boxHeight: a } = t,
    c = Yt(t.bodyFont),
    u = Yt(t.titleFont),
    f = Yt(t.footerFont),
    m = o.length,
    b = s.length,
    x = n.length,
    S = ee(t.padding);
  let p = S.height,
    v = 0,
    k = n.reduce(
      (g, h) => g + h.before.length + h.lines.length + h.after.length,
      0
    );
  if (
    ((k += e.beforeBody.length + e.afterBody.length),
    m &&
      (p += m * u.lineHeight + (m - 1) * t.titleSpacing + t.titleMarginBottom),
    k)
  ) {
    const g = t.displayColors ? Math.max(a, c.lineHeight) : c.lineHeight;
    p += x * g + (k - x) * c.lineHeight + (k - 1) * t.bodySpacing;
  }
  b && (p += t.footerMarginTop + b * f.lineHeight + (b - 1) * t.footerSpacing);
  let E = 0;
  const y = function (g) {
    v = Math.max(v, i.measureText(g).width + E);
  };
  return (
    i.save(),
    (i.font = u.string),
    Lt(e.title, y),
    (i.font = c.string),
    Lt(e.beforeBody.concat(e.afterBody), y),
    (E = t.displayColors ? r + 2 + t.boxPadding : 0),
    Lt(n, (g) => {
      Lt(g.before, y), Lt(g.lines, y), Lt(g.after, y);
    }),
    (E = 0),
    (i.font = f.string),
    Lt(e.footer, y),
    i.restore(),
    (v += S.width),
    { width: v, height: p }
  );
}
function a0(e, t) {
  const { y: i, height: n } = t;
  return i < n / 2 ? "top" : i > e.height - n / 2 ? "bottom" : "center";
}
function l0(e, t, i, n) {
  const { x: s, width: o } = n,
    r = i.caretSize + i.caretPadding;
  if ((e === "left" && s + o + r > t.width) || (e === "right" && s - o - r < 0))
    return !0;
}
function c0(e, t, i, n) {
  const { x: s, width: o } = i,
    {
      width: r,
      chartArea: { left: a, right: c },
    } = e;
  let u = "center";
  return (
    n === "center"
      ? (u = s <= (a + c) / 2 ? "left" : "right")
      : s <= o / 2
      ? (u = "left")
      : s >= r - o / 2 && (u = "right"),
    l0(u, e, t, i) && (u = "center"),
    u
  );
}
function lc(e, t, i) {
  const n = i.yAlign || t.yAlign || a0(e, i);
  return { xAlign: i.xAlign || t.xAlign || c0(e, t, i, n), yAlign: n };
}
function h0(e, t) {
  let { x: i, width: n } = e;
  return t === "right" ? (i -= n) : t === "center" && (i -= n / 2), i;
}
function u0(e, t, i) {
  let { y: n, height: s } = e;
  return (
    t === "top" ? (n += i) : t === "bottom" ? (n -= s + i) : (n -= s / 2), n
  );
}
function cc(e, t, i, n) {
  const { caretSize: s, caretPadding: o, cornerRadius: r } = e,
    { xAlign: a, yAlign: c } = i,
    u = s + o,
    { topLeft: f, topRight: m, bottomLeft: b, bottomRight: x } = Ii(r);
  let S = h0(t, a);
  const p = u0(t, c, u);
  return (
    c === "center"
      ? a === "left"
        ? (S += u)
        : a === "right" && (S -= u)
      : a === "left"
      ? (S -= Math.max(f, b) + s)
      : a === "right" && (S += Math.max(m, x) + s),
    { x: Xt(S, 0, n.width - t.width), y: Xt(p, 0, n.height - t.height) }
  );
}
function Es(e, t, i) {
  const n = ee(i.padding);
  return t === "center"
    ? e.x + e.width / 2
    : t === "right"
    ? e.x + e.width - n.right
    : e.x + n.left;
}
function hc(e) {
  return Ae([], je(e));
}
function d0(e, t, i) {
  return yi(e, { tooltip: t, tooltipItems: i, type: "tooltip" });
}
function uc(e, t) {
  const i = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return i ? e.override(i) : e;
}
class wr extends Oe {
  constructor(t) {
    super(),
      (this.opacity = 0),
      (this._active = []),
      (this._eventPosition = void 0),
      (this._size = void 0),
      (this._cachedAnimations = void 0),
      (this._tooltipItems = []),
      (this.$animations = void 0),
      (this.$context = void 0),
      (this.chart = t.chart || t._chart),
      (this._chart = this.chart),
      (this.options = t.options),
      (this.dataPoints = void 0),
      (this.title = void 0),
      (this.beforeBody = void 0),
      (this.body = void 0),
      (this.afterBody = void 0),
      (this.footer = void 0),
      (this.xAlign = void 0),
      (this.yAlign = void 0),
      (this.x = void 0),
      (this.y = void 0),
      (this.height = void 0),
      (this.width = void 0),
      (this.caretX = void 0),
      (this.caretY = void 0),
      (this.labelColors = void 0),
      (this.labelPointStyles = void 0),
      (this.labelTextColors = void 0);
  }
  initialize(t) {
    (this.options = t),
      (this._cachedAnimations = void 0),
      (this.$context = void 0);
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t) return t;
    const i = this.chart,
      n = this.options.setContext(this.getContext()),
      s = n.enabled && i.options.animation && n.animations,
      o = new au(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return (
      this.$context ||
      (this.$context = d0(this.chart.getContext(), this, this._tooltipItems))
    );
  }
  getTitle(t, i) {
    const { callbacks: n } = i,
      s = n.beforeTitle.apply(this, [t]),
      o = n.title.apply(this, [t]),
      r = n.afterTitle.apply(this, [t]);
    let a = [];
    return (a = Ae(a, je(s))), (a = Ae(a, je(o))), (a = Ae(a, je(r))), a;
  }
  getBeforeBody(t, i) {
    return hc(i.callbacks.beforeBody.apply(this, [t]));
  }
  getBody(t, i) {
    const { callbacks: n } = i,
      s = [];
    return (
      Lt(t, (o) => {
        const r = { before: [], lines: [], after: [] },
          a = uc(n, o);
        Ae(r.before, je(a.beforeLabel.call(this, o))),
          Ae(r.lines, a.label.call(this, o)),
          Ae(r.after, je(a.afterLabel.call(this, o))),
          s.push(r);
      }),
      s
    );
  }
  getAfterBody(t, i) {
    return hc(i.callbacks.afterBody.apply(this, [t]));
  }
  getFooter(t, i) {
    const { callbacks: n } = i,
      s = n.beforeFooter.apply(this, [t]),
      o = n.footer.apply(this, [t]),
      r = n.afterFooter.apply(this, [t]);
    let a = [];
    return (a = Ae(a, je(s))), (a = Ae(a, je(o))), (a = Ae(a, je(r))), a;
  }
  _createItems(t) {
    const i = this._active,
      n = this.chart.data,
      s = [],
      o = [],
      r = [];
    let a = [],
      c,
      u;
    for (c = 0, u = i.length; c < u; ++c) a.push(r0(this.chart, i[c]));
    return (
      t.filter && (a = a.filter((f, m, b) => t.filter(f, m, b, n))),
      t.itemSort && (a = a.sort((f, m) => t.itemSort(f, m, n))),
      Lt(a, (f) => {
        const m = uc(t.callbacks, f);
        s.push(m.labelColor.call(this, f)),
          o.push(m.labelPointStyle.call(this, f)),
          r.push(m.labelTextColor.call(this, f));
      }),
      (this.labelColors = s),
      (this.labelPointStyles = o),
      (this.labelTextColors = r),
      (this.dataPoints = a),
      a
    );
  }
  update(t, i) {
    const n = this.options.setContext(this.getContext()),
      s = this._active;
    let o,
      r = [];
    if (!s.length) this.opacity !== 0 && (o = { opacity: 0 });
    else {
      const a = $n[n.position].call(this, s, this._eventPosition);
      (r = this._createItems(n)),
        (this.title = this.getTitle(r, n)),
        (this.beforeBody = this.getBeforeBody(r, n)),
        (this.body = this.getBody(r, n)),
        (this.afterBody = this.getAfterBody(r, n)),
        (this.footer = this.getFooter(r, n));
      const c = (this._size = ac(this, n)),
        u = Object.assign({}, a, c),
        f = lc(this.chart, n, u),
        m = cc(n, u, f, this.chart);
      (this.xAlign = f.xAlign),
        (this.yAlign = f.yAlign),
        (o = {
          opacity: 1,
          x: m.x,
          y: m.y,
          width: c.width,
          height: c.height,
          caretX: a.x,
          caretY: a.y,
        });
    }
    (this._tooltipItems = r),
      (this.$context = void 0),
      o && this._resolveAnimations().update(this, o),
      t &&
        n.external &&
        n.external.call(this, { chart: this.chart, tooltip: this, replay: i });
  }
  drawCaret(t, i, n, s) {
    const o = this.getCaretPosition(t, n, s);
    i.lineTo(o.x1, o.y1), i.lineTo(o.x2, o.y2), i.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, i, n) {
    const { xAlign: s, yAlign: o } = this,
      { caretSize: r, cornerRadius: a } = n,
      { topLeft: c, topRight: u, bottomLeft: f, bottomRight: m } = Ii(a),
      { x: b, y: x } = t,
      { width: S, height: p } = i;
    let v, k, E, y, g, h;
    return (
      o === "center"
        ? ((g = x + p / 2),
          s === "left"
            ? ((v = b), (k = v - r), (y = g + r), (h = g - r))
            : ((v = b + S), (k = v + r), (y = g - r), (h = g + r)),
          (E = v))
        : (s === "left"
            ? (k = b + Math.max(c, f) + r)
            : s === "right"
            ? (k = b + S - Math.max(u, m) - r)
            : (k = this.caretX),
          o === "top"
            ? ((y = x), (g = y - r), (v = k - r), (E = k + r))
            : ((y = x + p), (g = y + r), (v = k + r), (E = k - r)),
          (h = y)),
      { x1: v, x2: k, x3: E, y1: y, y2: g, y3: h }
    );
  }
  drawTitle(t, i, n) {
    const s = this.title,
      o = s.length;
    let r, a, c;
    if (o) {
      const u = Ji(n.rtl, this.x, this.width);
      for (
        t.x = Es(this, n.titleAlign, n),
          i.textAlign = u.textAlign(n.titleAlign),
          i.textBaseline = "middle",
          r = Yt(n.titleFont),
          a = n.titleSpacing,
          i.fillStyle = n.titleColor,
          i.font = r.string,
          c = 0;
        c < o;
        ++c
      )
        i.fillText(s[c], u.x(t.x), t.y + r.lineHeight / 2),
          (t.y += r.lineHeight + a),
          c + 1 === o && (t.y += n.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, i, n, s, o) {
    const r = this.labelColors[n],
      a = this.labelPointStyles[n],
      { boxHeight: c, boxWidth: u, boxPadding: f } = o,
      m = Yt(o.bodyFont),
      b = Es(this, "left", o),
      x = s.x(b),
      S = c < m.lineHeight ? (m.lineHeight - c) / 2 : 0,
      p = i.y + S;
    if (o.usePointStyle) {
      const v = {
          radius: Math.min(u, c) / 2,
          pointStyle: a.pointStyle,
          rotation: a.rotation,
          borderWidth: 1,
        },
        k = s.leftForLtr(x, u) + u / 2,
        E = p + c / 2;
      (t.strokeStyle = o.multiKeyBackground),
        (t.fillStyle = o.multiKeyBackground),
        gr(t, v, k, E),
        (t.strokeStyle = r.borderColor),
        (t.fillStyle = r.backgroundColor),
        gr(t, v, k, E);
    } else {
      (t.lineWidth = kt(r.borderWidth)
        ? Math.max(...Object.values(r.borderWidth))
        : r.borderWidth || 1),
        (t.strokeStyle = r.borderColor),
        t.setLineDash(r.borderDash || []),
        (t.lineDashOffset = r.borderDashOffset || 0);
      const v = s.leftForLtr(x, u - f),
        k = s.leftForLtr(s.xPlus(x, 1), u - f - 2),
        E = Ii(r.borderRadius);
      Object.values(E).some((y) => y !== 0)
        ? (t.beginPath(),
          (t.fillStyle = o.multiKeyBackground),
          Zn(t, { x: v, y: p, w: u, h: c, radius: E }),
          t.fill(),
          t.stroke(),
          (t.fillStyle = r.backgroundColor),
          t.beginPath(),
          Zn(t, { x: k, y: p + 1, w: u - 2, h: c - 2, radius: E }),
          t.fill())
        : ((t.fillStyle = o.multiKeyBackground),
          t.fillRect(v, p, u, c),
          t.strokeRect(v, p, u, c),
          (t.fillStyle = r.backgroundColor),
          t.fillRect(k, p + 1, u - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, i, n) {
    const { body: s } = this,
      {
        bodySpacing: o,
        bodyAlign: r,
        displayColors: a,
        boxHeight: c,
        boxWidth: u,
        boxPadding: f,
      } = n,
      m = Yt(n.bodyFont);
    let b = m.lineHeight,
      x = 0;
    const S = Ji(n.rtl, this.x, this.width),
      p = function (C) {
        i.fillText(C, S.x(t.x + x), t.y + b / 2), (t.y += b + o);
      },
      v = S.textAlign(r);
    let k, E, y, g, h, l, d;
    for (
      i.textAlign = r,
        i.textBaseline = "middle",
        i.font = m.string,
        t.x = Es(this, v, n),
        i.fillStyle = n.bodyColor,
        Lt(this.beforeBody, p),
        x = a && v !== "right" ? (r === "center" ? u / 2 + f : u + 2 + f) : 0,
        g = 0,
        l = s.length;
      g < l;
      ++g
    ) {
      for (
        k = s[g],
          E = this.labelTextColors[g],
          i.fillStyle = E,
          Lt(k.before, p),
          y = k.lines,
          a &&
            y.length &&
            (this._drawColorBox(i, t, g, S, n),
            (b = Math.max(m.lineHeight, c))),
          h = 0,
          d = y.length;
        h < d;
        ++h
      )
        p(y[h]), (b = m.lineHeight);
      Lt(k.after, p);
    }
    (x = 0), (b = m.lineHeight), Lt(this.afterBody, p), (t.y -= o);
  }
  drawFooter(t, i, n) {
    const s = this.footer,
      o = s.length;
    let r, a;
    if (o) {
      const c = Ji(n.rtl, this.x, this.width);
      for (
        t.x = Es(this, n.footerAlign, n),
          t.y += n.footerMarginTop,
          i.textAlign = c.textAlign(n.footerAlign),
          i.textBaseline = "middle",
          r = Yt(n.footerFont),
          i.fillStyle = n.footerColor,
          i.font = r.string,
          a = 0;
        a < o;
        ++a
      )
        i.fillText(s[a], c.x(t.x), t.y + r.lineHeight / 2),
          (t.y += r.lineHeight + n.footerSpacing);
    }
  }
  drawBackground(t, i, n, s) {
    const { xAlign: o, yAlign: r } = this,
      { x: a, y: c } = t,
      { width: u, height: f } = n,
      {
        topLeft: m,
        topRight: b,
        bottomLeft: x,
        bottomRight: S,
      } = Ii(s.cornerRadius);
    (i.fillStyle = s.backgroundColor),
      (i.strokeStyle = s.borderColor),
      (i.lineWidth = s.borderWidth),
      i.beginPath(),
      i.moveTo(a + m, c),
      r === "top" && this.drawCaret(t, i, n, s),
      i.lineTo(a + u - b, c),
      i.quadraticCurveTo(a + u, c, a + u, c + b),
      r === "center" && o === "right" && this.drawCaret(t, i, n, s),
      i.lineTo(a + u, c + f - S),
      i.quadraticCurveTo(a + u, c + f, a + u - S, c + f),
      r === "bottom" && this.drawCaret(t, i, n, s),
      i.lineTo(a + x, c + f),
      i.quadraticCurveTo(a, c + f, a, c + f - x),
      r === "center" && o === "left" && this.drawCaret(t, i, n, s),
      i.lineTo(a, c + m),
      i.quadraticCurveTo(a, c, a + m, c),
      i.closePath(),
      i.fill(),
      s.borderWidth > 0 && i.stroke();
  }
  _updateAnimationTarget(t) {
    const i = this.chart,
      n = this.$animations,
      s = n && n.x,
      o = n && n.y;
    if (s || o) {
      const r = $n[t.position].call(this, this._active, this._eventPosition);
      if (!r) return;
      const a = (this._size = ac(this, t)),
        c = Object.assign({}, r, this._size),
        u = lc(i, t, c),
        f = cc(t, c, u, i);
      (s._to !== f.x || o._to !== f.y) &&
        ((this.xAlign = u.xAlign),
        (this.yAlign = u.yAlign),
        (this.width = a.width),
        (this.height = a.height),
        (this.caretX = r.x),
        (this.caretY = r.y),
        this._resolveAnimations().update(this, f));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const i = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n) return;
    this._updateAnimationTarget(i);
    const s = { width: this.width, height: this.height },
      o = { x: this.x, y: this.y };
    n = Math.abs(n) < 0.001 ? 0 : n;
    const r = ee(i.padding),
      a =
        this.title.length ||
        this.beforeBody.length ||
        this.body.length ||
        this.afterBody.length ||
        this.footer.length;
    i.enabled &&
      a &&
      (t.save(),
      (t.globalAlpha = n),
      this.drawBackground(o, t, s, i),
      iu(t, i.textDirection),
      (o.y += r.top),
      this.drawTitle(o, t, i),
      this.drawBody(o, t, i),
      this.drawFooter(o, t, i),
      nu(t, i.textDirection),
      t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, i) {
    const n = this._active,
      s = t.map(({ datasetIndex: a, index: c }) => {
        const u = this.chart.getDatasetMeta(a);
        if (!u) throw new Error("Cannot find a dataset at index " + a);
        return { datasetIndex: a, element: u.data[c], index: c };
      }),
      o = !zs(n, s),
      r = this._positionChanged(s, i);
    (o || r) &&
      ((this._active = s),
      (this._eventPosition = i),
      (this._ignoreReplayEvents = !0),
      this.update(!0));
  }
  handleEvent(t, i, n = !0) {
    if (i && this._ignoreReplayEvents) return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options,
      o = this._active || [],
      r = this._getActiveElements(t, o, i, n),
      a = this._positionChanged(r, t),
      c = i || !zs(r, o) || a;
    return (
      c &&
        ((this._active = r),
        (s.enabled || s.external) &&
          ((this._eventPosition = { x: t.x, y: t.y }), this.update(!0, i))),
      c
    );
  }
  _getActiveElements(t, i, n, s) {
    const o = this.options;
    if (t.type === "mouseout") return [];
    if (!s) return i;
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, n);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, i) {
    const { caretX: n, caretY: s, options: o } = this,
      r = $n[o.position].call(this, t, i);
    return r !== !1 && (n !== r.x || s !== r.y);
  }
}
wr.positioners = $n;
const f0 = {
    id: "tooltip",
    _element: wr,
    positioners: $n,
    afterInit(e, t, i) {
      i && (e.tooltip = new wr({ chart: e, options: i }));
    },
    beforeUpdate(e, t, i) {
      e.tooltip && e.tooltip.initialize(i);
    },
    reset(e, t, i) {
      e.tooltip && e.tooltip.initialize(i);
    },
    afterDraw(e) {
      const t = e.tooltip;
      if (t && t._willRender()) {
        const i = { tooltip: t };
        if (e.notifyPlugins("beforeTooltipDraw", i) === !1) return;
        t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", i);
      }
    },
    afterEvent(e, t) {
      if (e.tooltip) {
        const i = t.replay;
        e.tooltip.handleEvent(t.event, i, t.inChartArea) && (t.changed = !0);
      }
    },
    defaults: {
      enabled: !0,
      external: null,
      position: "average",
      backgroundColor: "rgba(0,0,0,0.8)",
      titleColor: "#fff",
      titleFont: { weight: "bold" },
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleAlign: "left",
      bodyColor: "#fff",
      bodySpacing: 2,
      bodyFont: {},
      bodyAlign: "left",
      footerColor: "#fff",
      footerSpacing: 2,
      footerMarginTop: 6,
      footerFont: { weight: "bold" },
      footerAlign: "left",
      padding: 6,
      caretPadding: 2,
      caretSize: 5,
      cornerRadius: 6,
      boxHeight: (e, t) => t.bodyFont.size,
      boxWidth: (e, t) => t.bodyFont.size,
      multiKeyBackground: "#fff",
      displayColors: !0,
      boxPadding: 0,
      borderColor: "rgba(0,0,0,0)",
      borderWidth: 0,
      animation: { duration: 400, easing: "easeOutQuart" },
      animations: {
        numbers: {
          type: "number",
          properties: ["x", "y", "width", "height", "caretX", "caretY"],
        },
        opacity: { easing: "linear", duration: 200 },
      },
      callbacks: {
        beforeTitle: Ne,
        title(e) {
          if (e.length > 0) {
            const t = e[0],
              i = t.chart.data.labels,
              n = i ? i.length : 0;
            if (this && this.options && this.options.mode === "dataset")
              return t.dataset.label || "";
            if (t.label) return t.label;
            if (n > 0 && t.dataIndex < n) return i[t.dataIndex];
          }
          return "";
        },
        afterTitle: Ne,
        beforeBody: Ne,
        beforeLabel: Ne,
        label(e) {
          if (this && this.options && this.options.mode === "dataset")
            return e.label + ": " + e.formattedValue || e.formattedValue;
          let t = e.dataset.label || "";
          t && (t += ": ");
          const i = e.formattedValue;
          return Ot(i) || (t += i), t;
        },
        labelColor(e) {
          const i = e.chart
            .getDatasetMeta(e.datasetIndex)
            .controller.getStyle(e.dataIndex);
          return {
            borderColor: i.borderColor,
            backgroundColor: i.backgroundColor,
            borderWidth: i.borderWidth,
            borderDash: i.borderDash,
            borderDashOffset: i.borderDashOffset,
            borderRadius: 0,
          };
        },
        labelTextColor() {
          return this.options.bodyColor;
        },
        labelPointStyle(e) {
          const i = e.chart
            .getDatasetMeta(e.datasetIndex)
            .controller.getStyle(e.dataIndex);
          return { pointStyle: i.pointStyle, rotation: i.rotation };
        },
        afterLabel: Ne,
        afterBody: Ne,
        beforeFooter: Ne,
        footer: Ne,
        afterFooter: Ne,
      },
    },
    defaultRoutes: { bodyFont: "font", footerFont: "font", titleFont: "font" },
    descriptors: {
      _scriptable: (e) =>
        e !== "filter" && e !== "itemSort" && e !== "external",
      _indexable: !1,
      callbacks: { _scriptable: !1, _indexable: !1 },
      animation: { _fallback: !1 },
      animations: { _fallback: "animation" },
    },
    additionalOptionScopes: ["interaction"],
  },
  p0 = Object.freeze({
    __proto__: null,
    Decimation: Ab,
    Filler: Zb,
    Legend: i0,
    SubTitle: o0,
    Title: s0,
    Tooltip: f0,
  });
const g0 = (e, t, i, n) => (
  typeof t == "string"
    ? ((i = e.push(t) - 1), n.unshift({ index: i, label: t }))
    : isNaN(t) && (i = null),
  i
);
function m0(e, t, i, n) {
  const s = e.indexOf(t);
  if (s === -1) return g0(e, t, i, n);
  const o = e.lastIndexOf(t);
  return s !== o ? i : s;
}
const v0 = (e, t) => (e === null ? null : Xt(Math.round(e), 0, t));
class Qs extends Wi {
  constructor(t) {
    super(t),
      (this._startValue = void 0),
      (this._valueRange = 0),
      (this._addedLabels = []);
  }
  init(t) {
    const i = this._addedLabels;
    if (i.length) {
      const n = this.getLabels();
      for (const { index: s, label: o } of i) n[s] === o && n.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, i) {
    if (Ot(t)) return null;
    const n = this.getLabels();
    return (
      (i =
        isFinite(i) && n[i] === t ? i : m0(n, t, _t(i, t), this._addedLabels)),
      v0(i, n.length - 1)
    );
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: i } = this.getUserBounds();
    let { min: n, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" &&
      (t || (n = 0), i || (s = this.getLabels().length - 1)),
      (this.min = n),
      (this.max = s);
  }
  buildTicks() {
    const t = this.min,
      i = this.max,
      n = this.options.offset,
      s = [];
    let o = this.getLabels();
    (o = t === 0 && i === o.length - 1 ? o : o.slice(t, i + 1)),
      (this._valueRange = Math.max(o.length - (n ? 0 : 1), 1)),
      (this._startValue = this.min - (n ? 0.5 : 0));
    for (let r = t; r <= i; r++) s.push({ value: r });
    return s;
  }
  getLabelForValue(t) {
    const i = this.getLabels();
    return t >= 0 && t < i.length ? i[t] : t;
  }
  configure() {
    super.configure(),
      this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return (
      typeof t != "number" && (t = this.parse(t)),
      t === null
        ? NaN
        : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
    );
  }
  getPixelForTick(t) {
    const i = this.ticks;
    return t < 0 || t > i.length - 1 ? null : this.getPixelForValue(i[t].value);
  }
  getValueForPixel(t) {
    return Math.round(
      this._startValue + this.getDecimalForPixel(t) * this._valueRange
    );
  }
  getBasePixel() {
    return this.bottom;
  }
}
Qs.id = "category";
Qs.defaults = { ticks: { callback: Qs.prototype.getLabelForValue } };
function _0(e, t) {
  const i = [],
    {
      bounds: s,
      step: o,
      min: r,
      max: a,
      precision: c,
      count: u,
      maxTicks: f,
      maxDigits: m,
      includeBounds: b,
    } = e,
    x = o || 1,
    S = f - 1,
    { min: p, max: v } = t,
    k = !Ot(r),
    E = !Ot(a),
    y = !Ot(u),
    g = (v - p) / (m + 1);
  let h = ll((v - p) / S / x) * x,
    l,
    d,
    C,
    T;
  if (h < 1e-14 && !k && !E) return [{ value: p }, { value: v }];
  (T = Math.ceil(v / h) - Math.floor(p / h)),
    T > S && (h = ll((T * h) / S / x) * x),
    Ot(c) || ((l = Math.pow(10, c)), (h = Math.ceil(h * l) / l)),
    s === "ticks"
      ? ((d = Math.floor(p / h) * h), (C = Math.ceil(v / h) * h))
      : ((d = p), (C = v)),
    k && E && o && sv((a - r) / o, h / 1e3)
      ? ((T = Math.round(Math.min((a - r) / h, f))),
        (h = (a - r) / T),
        (d = r),
        (C = a))
      : y
      ? ((d = k ? r : d), (C = E ? a : C), (T = u - 1), (h = (C - d) / T))
      : ((T = (C - d) / h),
        Bn(T, Math.round(T), h / 1e3)
          ? (T = Math.round(T))
          : (T = Math.ceil(T)));
  const L = Math.max(cl(h), cl(d));
  (l = Math.pow(10, Ot(c) ? L : c)),
    (d = Math.round(d * l) / l),
    (C = Math.round(C * l) / l);
  let A = 0;
  for (
    k &&
    (b && d !== r
      ? (i.push({ value: r }),
        d < r && A++,
        Bn(Math.round((d + A * h) * l) / l, r, dc(r, g, e)) && A++)
      : d < r && A++);
    A < T;
    ++A
  )
    i.push({ value: Math.round((d + A * h) * l) / l });
  return (
    E && b && C !== a
      ? i.length && Bn(i[i.length - 1].value, a, dc(a, g, e))
        ? (i[i.length - 1].value = a)
        : i.push({ value: a })
      : (!E || C === a) && i.push({ value: C }),
    i
  );
}
function dc(e, t, { horizontal: i, minRotation: n }) {
  const s = ke(n),
    o = (i ? Math.sin(s) : Math.cos(s)) || 0.001,
    r = 0.75 * t * ("" + e).length;
  return Math.min(t / o, r);
}
class Js extends Wi {
  constructor(t) {
    super(t),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._endValue = void 0),
      (this._valueRange = 0);
  }
  parse(t, i) {
    return Ot(t) ||
      ((typeof t == "number" || t instanceof Number) && !isFinite(+t))
      ? null
      : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options,
      { minDefined: i, maxDefined: n } = this.getUserBounds();
    let { min: s, max: o } = this;
    const r = (c) => (s = i ? s : c),
      a = (c) => (o = n ? o : c);
    if (t) {
      const c = Re(s),
        u = Re(o);
      c < 0 && u < 0 ? a(0) : c > 0 && u > 0 && r(0);
    }
    if (s === o) {
      let c = 1;
      (o >= Number.MAX_SAFE_INTEGER || s <= Number.MIN_SAFE_INTEGER) &&
        (c = Math.abs(o * 0.05)),
        a(o + c),
        t || r(s - c);
    }
    (this.min = s), (this.max = o);
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: i, stepSize: n } = t,
      s;
    return (
      n
        ? ((s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1),
          s > 1e3 &&
            (console.warn(
              `scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`
            ),
            (s = 1e3)))
        : ((s = this.computeTickLimit()), (i = i || 11)),
      i && (s = Math.min(i, s)),
      s
    );
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options,
      i = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const s = {
        maxTicks: n,
        bounds: t.bounds,
        min: t.min,
        max: t.max,
        precision: i.precision,
        step: i.stepSize,
        count: i.count,
        maxDigits: this._maxDigits(),
        horizontal: this.isHorizontal(),
        minRotation: i.minRotation || 0,
        includeBounds: i.includeBounds !== !1,
      },
      o = this._range || this,
      r = _0(s, o);
    return (
      t.bounds === "ticks" && Hh(r, this, "value"),
      t.reverse
        ? (r.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      r
    );
  }
  configure() {
    const t = this.ticks;
    let i = this.min,
      n = this.max;
    if ((super.configure(), this.options.offset && t.length)) {
      const s = (n - i) / Math.max(t.length - 1, 1) / 2;
      (i -= s), (n += s);
    }
    (this._startValue = i), (this._endValue = n), (this._valueRange = n - i);
  }
  getLabelForValue(t) {
    return ss(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class aa extends Js {
  determineDataLimits() {
    const { min: t, max: i } = this.getMinMax(!0);
    (this.min = qt(t) ? t : 0),
      (this.max = qt(i) ? i : 1),
      this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(),
      i = t ? this.width : this.height,
      n = ke(this.options.ticks.minRotation),
      s = (t ? Math.sin(n) : Math.cos(n)) || 0.001,
      o = this._resolveTickFontOptions(0);
    return Math.ceil(i / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null
      ? NaN
      : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
aa.id = "linear";
aa.defaults = { ticks: { callback: xo.formatters.numeric } };
function fc(e) {
  return e / Math.pow(10, Math.floor(me(e))) === 1;
}
function y0(e, t) {
  const i = Math.floor(me(t.max)),
    n = Math.ceil(t.max / Math.pow(10, i)),
    s = [];
  let o = pe(e.min, Math.pow(10, Math.floor(me(t.min)))),
    r = Math.floor(me(o)),
    a = Math.floor(o / Math.pow(10, r)),
    c = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
  do
    s.push({ value: o, major: fc(o) }),
      ++a,
      a === 10 && ((a = 1), ++r, (c = r >= 0 ? 1 : c)),
      (o = Math.round(a * Math.pow(10, r) * c) / c);
  while (r < i || (r === i && a < n));
  const u = pe(e.max, o);
  return s.push({ value: u, major: fc(o) }), s;
}
class la extends Wi {
  constructor(t) {
    super(t),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._valueRange = 0);
  }
  parse(t, i) {
    const n = Js.prototype.parse.apply(this, [t, i]);
    if (n === 0) {
      this._zero = !0;
      return;
    }
    return qt(n) && n > 0 ? n : null;
  }
  determineDataLimits() {
    const { min: t, max: i } = this.getMinMax(!0);
    (this.min = qt(t) ? Math.max(0, t) : null),
      (this.max = qt(i) ? Math.max(0, i) : null),
      this.options.beginAtZero && (this._zero = !0),
      this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: i } = this.getUserBounds();
    let n = this.min,
      s = this.max;
    const o = (c) => (n = t ? n : c),
      r = (c) => (s = i ? s : c),
      a = (c, u) => Math.pow(10, Math.floor(me(c)) + u);
    n === s && (n <= 0 ? (o(1), r(10)) : (o(a(n, -1)), r(a(s, 1)))),
      n <= 0 && o(a(s, -1)),
      s <= 0 && r(a(n, 1)),
      this._zero &&
        this.min !== this._suggestedMin &&
        n === a(this.min, 0) &&
        o(a(n, -1)),
      (this.min = n),
      (this.max = s);
  }
  buildTicks() {
    const t = this.options,
      i = { min: this._userMin, max: this._userMax },
      n = y0(i, this);
    return (
      t.bounds === "ticks" && Hh(n, this, "value"),
      t.reverse
        ? (n.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      n
    );
  }
  getLabelForValue(t) {
    return t === void 0
      ? "0"
      : ss(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(),
      (this._startValue = me(t)),
      (this._valueRange = me(this.max) - me(t));
  }
  getPixelForValue(t) {
    return (
      (t === void 0 || t === 0) && (t = this.min),
      t === null || isNaN(t)
        ? NaN
        : this.getPixelForDecimal(
            t === this.min ? 0 : (me(t) - this._startValue) / this._valueRange
          )
    );
  }
  getValueForPixel(t) {
    const i = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + i * this._valueRange);
  }
}
la.id = "logarithmic";
la.defaults = {
  ticks: { callback: xo.formatters.logarithmic, major: { enabled: !0 } },
};
function kr(e) {
  const t = e.ticks;
  if (t.display && e.display) {
    const i = ee(t.backdropPadding);
    return _t(t.font && t.font.size, Ct.font.size) + i.height;
  }
  return 0;
}
function b0(e, t, i) {
  return (
    (i = Ht(i) ? i : [i]), { w: Lv(e, t.string, i), h: i.length * t.lineHeight }
  );
}
function pc(e, t, i, n, s) {
  return e === n || e === s
    ? { start: t - i / 2, end: t + i / 2 }
    : e < n || e > s
    ? { start: t - i, end: t }
    : { start: t, end: t + i };
}
function x0(e) {
  const t = {
      l: e.left + e._padding.left,
      r: e.right - e._padding.right,
      t: e.top + e._padding.top,
      b: e.bottom - e._padding.bottom,
    },
    i = Object.assign({}, t),
    n = [],
    s = [],
    o = e._pointLabels.length,
    r = e.options.pointLabels,
    a = r.centerPointLabels ? Wt / o : 0;
  for (let c = 0; c < o; c++) {
    const u = r.setContext(e.getPointLabelContext(c));
    s[c] = u.padding;
    const f = e.getPointPosition(c, e.drawingArea + s[c], a),
      m = Yt(u.font),
      b = b0(e.ctx, m, e._pointLabels[c]);
    n[c] = b;
    const x = ce(e.getIndexAngle(c) + a),
      S = Math.round(Ur(x)),
      p = pc(S, f.x, b.w, 0, 180),
      v = pc(S, f.y, b.h, 90, 270);
    w0(i, t, x, p, v);
  }
  e.setCenterPoint(t.l - i.l, i.r - t.r, t.t - i.t, i.b - t.b),
    (e._pointLabelItems = k0(e, n, s));
}
function w0(e, t, i, n, s) {
  const o = Math.abs(Math.sin(i)),
    r = Math.abs(Math.cos(i));
  let a = 0,
    c = 0;
  n.start < t.l
    ? ((a = (t.l - n.start) / o), (e.l = Math.min(e.l, t.l - a)))
    : n.end > t.r && ((a = (n.end - t.r) / o), (e.r = Math.max(e.r, t.r + a))),
    s.start < t.t
      ? ((c = (t.t - s.start) / r), (e.t = Math.min(e.t, t.t - c)))
      : s.end > t.b &&
        ((c = (s.end - t.b) / r), (e.b = Math.max(e.b, t.b + c)));
}
function k0(e, t, i) {
  const n = [],
    s = e._pointLabels.length,
    o = e.options,
    r = kr(o) / 2,
    a = e.drawingArea,
    c = o.pointLabels.centerPointLabels ? Wt / s : 0;
  for (let u = 0; u < s; u++) {
    const f = e.getPointPosition(u, a + r + i[u], c),
      m = Math.round(Ur(ce(f.angle + Nt))),
      b = t[u],
      x = E0(f.y, b.h, m),
      S = C0(m),
      p = M0(f.x, b.w, S);
    n.push({
      x: f.x,
      y: x,
      textAlign: S,
      left: p,
      top: x,
      right: p + b.w,
      bottom: x + b.h,
    });
  }
  return n;
}
function C0(e) {
  return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
}
function M0(e, t, i) {
  return i === "right" ? (e -= t) : i === "center" && (e -= t / 2), e;
}
function E0(e, t, i) {
  return (
    i === 90 || i === 270 ? (e -= t / 2) : (i > 270 || i < 90) && (e -= t), e
  );
}
function S0(e, t) {
  const {
    ctx: i,
    options: { pointLabels: n },
  } = e;
  for (let s = t - 1; s >= 0; s--) {
    const o = n.setContext(e.getPointLabelContext(s)),
      r = Yt(o.font),
      {
        x: a,
        y: c,
        textAlign: u,
        left: f,
        top: m,
        right: b,
        bottom: x,
      } = e._pointLabelItems[s],
      { backdropColor: S } = o;
    if (!Ot(S)) {
      const p = Ii(o.borderRadius),
        v = ee(o.backdropPadding);
      i.fillStyle = S;
      const k = f - v.left,
        E = m - v.top,
        y = b - f + v.width,
        g = x - m + v.height;
      Object.values(p).some((h) => h !== 0)
        ? (i.beginPath(),
          Zn(i, { x: k, y: E, w: y, h: g, radius: p }),
          i.fill())
        : i.fillRect(k, E, y, g);
    }
    Hi(i, e._pointLabels[s], a, c + r.lineHeight / 2, r, {
      color: o.color,
      textAlign: u,
      textBaseline: "middle",
    });
  }
}
function Ou(e, t, i, n) {
  const { ctx: s } = e;
  if (i) s.arc(e.xCenter, e.yCenter, t, 0, Pt);
  else {
    let o = e.getPointPosition(0, t);
    s.moveTo(o.x, o.y);
    for (let r = 1; r < n; r++)
      (o = e.getPointPosition(r, t)), s.lineTo(o.x, o.y);
  }
}
function O0(e, t, i, n) {
  const s = e.ctx,
    o = t.circular,
    { color: r, lineWidth: a } = t;
  (!o && !n) ||
    !r ||
    !a ||
    i < 0 ||
    (s.save(),
    (s.strokeStyle = r),
    (s.lineWidth = a),
    s.setLineDash(t.borderDash),
    (s.lineDashOffset = t.borderDashOffset),
    s.beginPath(),
    Ou(e, i, o, n),
    s.closePath(),
    s.stroke(),
    s.restore());
}
function T0(e, t, i) {
  return yi(e, { label: i, index: t, type: "pointLabel" });
}
class as extends Js {
  constructor(t) {
    super(t),
      (this.xCenter = void 0),
      (this.yCenter = void 0),
      (this.drawingArea = void 0),
      (this._pointLabels = []),
      (this._pointLabelItems = []);
  }
  setDimensions() {
    const t = (this._padding = ee(kr(this.options) / 2)),
      i = (this.width = this.maxWidth - t.width),
      n = (this.height = this.maxHeight - t.height);
    (this.xCenter = Math.floor(this.left + i / 2 + t.left)),
      (this.yCenter = Math.floor(this.top + n / 2 + t.top)),
      (this.drawingArea = Math.floor(Math.min(i, n) / 2));
  }
  determineDataLimits() {
    const { min: t, max: i } = this.getMinMax(!1);
    (this.min = qt(t) && !isNaN(t) ? t : 0),
      (this.max = qt(i) && !isNaN(i) ? i : 0),
      this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / kr(this.options));
  }
  generateTickLabels(t) {
    Js.prototype.generateTickLabels.call(this, t),
      (this._pointLabels = this.getLabels()
        .map((i, n) => {
          const s = Bt(this.options.pointLabels.callback, [i, n], this);
          return s || s === 0 ? s : "";
        })
        .filter((i, n) => this.chart.getDataVisibility(n)));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display
      ? x0(this)
      : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, i, n, s) {
    (this.xCenter += Math.floor((t - i) / 2)),
      (this.yCenter += Math.floor((n - s) / 2)),
      (this.drawingArea -= Math.min(
        this.drawingArea / 2,
        Math.max(t, i, n, s)
      ));
  }
  getIndexAngle(t) {
    const i = Pt / (this._pointLabels.length || 1),
      n = this.options.startAngle || 0;
    return ce(t * i + ke(n));
  }
  getDistanceFromCenterForValue(t) {
    if (Ot(t)) return NaN;
    const i = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * i : (t - this.min) * i;
  }
  getValueForDistanceFromCenter(t) {
    if (Ot(t)) return NaN;
    const i = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - i : this.min + i;
  }
  getPointLabelContext(t) {
    const i = this._pointLabels || [];
    if (t >= 0 && t < i.length) {
      const n = i[t];
      return T0(this.getContext(), t, n);
    }
  }
  getPointPosition(t, i, n = 0) {
    const s = this.getIndexAngle(t) - Nt + n;
    return {
      x: Math.cos(s) * i + this.xCenter,
      y: Math.sin(s) * i + this.yCenter,
      angle: s,
    };
  }
  getPointPositionForValue(t, i) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(i));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: i, top: n, right: s, bottom: o } = this._pointLabelItems[t];
    return { left: i, top: n, right: s, bottom: o };
  }
  drawBackground() {
    const {
      backgroundColor: t,
      grid: { circular: i },
    } = this.options;
    if (t) {
      const n = this.ctx;
      n.save(),
        n.beginPath(),
        Ou(
          this,
          this.getDistanceFromCenterForValue(this._endValue),
          i,
          this._pointLabels.length
        ),
        n.closePath(),
        (n.fillStyle = t),
        n.fill(),
        n.restore();
    }
  }
  drawGrid() {
    const t = this.ctx,
      i = this.options,
      { angleLines: n, grid: s } = i,
      o = this._pointLabels.length;
    let r, a, c;
    if (
      (i.pointLabels.display && S0(this, o),
      s.display &&
        this.ticks.forEach((u, f) => {
          if (f !== 0) {
            a = this.getDistanceFromCenterForValue(u.value);
            const m = s.setContext(this.getContext(f - 1));
            O0(this, m, a, o);
          }
        }),
      n.display)
    ) {
      for (t.save(), r = o - 1; r >= 0; r--) {
        const u = n.setContext(this.getPointLabelContext(r)),
          { color: f, lineWidth: m } = u;
        !m ||
          !f ||
          ((t.lineWidth = m),
          (t.strokeStyle = f),
          t.setLineDash(u.borderDash),
          (t.lineDashOffset = u.borderDashOffset),
          (a = this.getDistanceFromCenterForValue(
            i.ticks.reverse ? this.min : this.max
          )),
          (c = this.getPointPosition(r, a)),
          t.beginPath(),
          t.moveTo(this.xCenter, this.yCenter),
          t.lineTo(c.x, c.y),
          t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {}
  drawLabels() {
    const t = this.ctx,
      i = this.options,
      n = i.ticks;
    if (!n.display) return;
    const s = this.getIndexAngle(0);
    let o, r;
    t.save(),
      t.translate(this.xCenter, this.yCenter),
      t.rotate(s),
      (t.textAlign = "center"),
      (t.textBaseline = "middle"),
      this.ticks.forEach((a, c) => {
        if (c === 0 && !i.reverse) return;
        const u = n.setContext(this.getContext(c)),
          f = Yt(u.font);
        if (
          ((o = this.getDistanceFromCenterForValue(this.ticks[c].value)),
          u.showLabelBackdrop)
        ) {
          (t.font = f.string),
            (r = t.measureText(a.label).width),
            (t.fillStyle = u.backdropColor);
          const m = ee(u.backdropPadding);
          t.fillRect(
            -r / 2 - m.left,
            -o - f.size / 2 - m.top,
            r + m.width,
            f.size + m.height
          );
        }
        Hi(t, a.label, 0, -o, f, { color: u.color });
      }),
      t.restore();
  }
  drawTitle() {}
}
as.id = "radialLinear";
as.defaults = {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0,
  },
  grid: { circular: !1 },
  startAngle: 0,
  ticks: { showLabelBackdrop: !0, callback: xo.formatters.numeric },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: { size: 10 },
    callback(e) {
      return e;
    },
    padding: 5,
    centerPointLabels: !1,
  },
};
as.defaultRoutes = {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color",
};
as.descriptors = { angleLines: { _fallback: "grid" } };
const Mo = {
    millisecond: { common: !0, size: 1, steps: 1e3 },
    second: { common: !0, size: 1e3, steps: 60 },
    minute: { common: !0, size: 6e4, steps: 60 },
    hour: { common: !0, size: 36e5, steps: 24 },
    day: { common: !0, size: 864e5, steps: 30 },
    week: { common: !1, size: 6048e5, steps: 4 },
    month: { common: !0, size: 2628e6, steps: 12 },
    quarter: { common: !1, size: 7884e6, steps: 4 },
    year: { common: !0, size: 3154e7 },
  },
  ae = Object.keys(Mo);
function D0(e, t) {
  return e - t;
}
function gc(e, t) {
  if (Ot(t)) return null;
  const i = e._adapter,
    { parser: n, round: s, isoWeekday: o } = e._parseOpts;
  let r = t;
  return (
    typeof n == "function" && (r = n(r)),
    qt(r) || (r = typeof n == "string" ? i.parse(r, n) : i.parse(r)),
    r === null
      ? null
      : (s &&
          (r =
            s === "week" && (Qn(o) || o === !0)
              ? i.startOf(r, "isoWeek", o)
              : i.startOf(r, s)),
        +r)
  );
}
function mc(e, t, i, n) {
  const s = ae.length;
  for (let o = ae.indexOf(e); o < s - 1; ++o) {
    const r = Mo[ae[o]],
      a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((i - t) / (a * r.size)) <= n) return ae[o];
  }
  return ae[s - 1];
}
function L0(e, t, i, n, s) {
  for (let o = ae.length - 1; o >= ae.indexOf(i); o--) {
    const r = ae[o];
    if (Mo[r].common && e._adapter.diff(s, n, r) >= t - 1) return r;
  }
  return ae[i ? ae.indexOf(i) : 0];
}
function P0(e) {
  for (let t = ae.indexOf(e) + 1, i = ae.length; t < i; ++t)
    if (Mo[ae[t]].common) return ae[t];
}
function vc(e, t, i) {
  if (!i) e[t] = !0;
  else if (i.length) {
    const { lo: n, hi: s } = Zr(i, t),
      o = i[n] >= t ? i[n] : i[s];
    e[o] = !0;
  }
}
function A0(e, t, i, n) {
  const s = e._adapter,
    o = +s.startOf(t[0].value, n),
    r = t[t.length - 1].value;
  let a, c;
  for (a = o; a <= r; a = +s.add(a, 1, n))
    (c = i[a]), c >= 0 && (t[c].major = !0);
  return t;
}
function _c(e, t, i) {
  const n = [],
    s = {},
    o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    (a = t[r]), (s[a] = r), n.push({ value: a, major: !1 });
  return o === 0 || !i ? n : A0(e, n, s, i);
}
class ls extends Wi {
  constructor(t) {
    super(t),
      (this._cache = { data: [], labels: [], all: [] }),
      (this._unit = "day"),
      (this._majorUnit = void 0),
      (this._offsets = {}),
      (this._normalized = !1),
      (this._parseOpts = void 0);
  }
  init(t, i) {
    const n = t.time || (t.time = {}),
      s = (this._adapter = new ey._date(t.adapters.date));
    Rn(n.displayFormats, s.formats()),
      (this._parseOpts = {
        parser: n.parser,
        round: n.round,
        isoWeekday: n.isoWeekday,
      }),
      super.init(t),
      (this._normalized = i.normalized);
  }
  parse(t, i) {
    return t === void 0 ? null : gc(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] });
  }
  determineDataLimits() {
    const t = this.options,
      i = this._adapter,
      n = t.time.unit || "day";
    let { min: s, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function c(u) {
      !r && !isNaN(u.min) && (s = Math.min(s, u.min)),
        !a && !isNaN(u.max) && (o = Math.max(o, u.max));
    }
    (!r || !a) &&
      (c(this._getLabelBounds()),
      (t.bounds !== "ticks" || t.ticks.source !== "labels") &&
        c(this.getMinMax(!1))),
      (s = qt(s) && !isNaN(s) ? s : +i.startOf(Date.now(), n)),
      (o = qt(o) && !isNaN(o) ? o : +i.endOf(Date.now(), n) + 1),
      (this.min = Math.min(s, o - 1)),
      (this.max = Math.max(s + 1, o));
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let i = Number.POSITIVE_INFINITY,
      n = Number.NEGATIVE_INFINITY;
    return t.length && ((i = t[0]), (n = t[t.length - 1])), { min: i, max: n };
  }
  buildTicks() {
    const t = this.options,
      i = t.time,
      n = t.ticks,
      s = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" &&
      s.length &&
      ((this.min = this._userMin || s[0]),
      (this.max = this._userMax || s[s.length - 1]));
    const o = this.min,
      r = this.max,
      a = Nv(s, o, r);
    return (
      (this._unit =
        i.unit ||
        (n.autoSkip
          ? mc(i.minUnit, this.min, this.max, this._getLabelCapacity(o))
          : L0(this, a.length, i.minUnit, this.min, this.max))),
      (this._majorUnit =
        !n.major.enabled || this._unit === "year" ? void 0 : P0(this._unit)),
      this.initOffsets(s),
      t.reverse && a.reverse(),
      _c(this, a, this._majorUnit)
    );
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip &&
      this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t) {
    let i = 0,
      n = 0,
      s,
      o;
    this.options.offset &&
      t.length &&
      ((s = this.getDecimalForValue(t[0])),
      t.length === 1
        ? (i = 1 - s)
        : (i = (this.getDecimalForValue(t[1]) - s) / 2),
      (o = this.getDecimalForValue(t[t.length - 1])),
      t.length === 1
        ? (n = o)
        : (n = (o - this.getDecimalForValue(t[t.length - 2])) / 2));
    const r = t.length < 3 ? 0.5 : 0.25;
    (i = Xt(i, 0, r)),
      (n = Xt(n, 0, r)),
      (this._offsets = { start: i, end: n, factor: 1 / (i + 1 + n) });
  }
  _generate() {
    const t = this._adapter,
      i = this.min,
      n = this.max,
      s = this.options,
      o = s.time,
      r = o.unit || mc(o.minUnit, i, n, this._getLabelCapacity(i)),
      a = _t(o.stepSize, 1),
      c = r === "week" ? o.isoWeekday : !1,
      u = Qn(c) || c === !0,
      f = {};
    let m = i,
      b,
      x;
    if (
      (u && (m = +t.startOf(m, "isoWeek", c)),
      (m = +t.startOf(m, u ? "day" : r)),
      t.diff(n, i, r) > 1e5 * a)
    )
      throw new Error(
        i + " and " + n + " are too far apart with stepSize of " + a + " " + r
      );
    const S = s.ticks.source === "data" && this.getDataTimestamps();
    for (b = m, x = 0; b < n; b = +t.add(b, a, r), x++) vc(f, b, S);
    return (
      (b === n || s.bounds === "ticks" || x === 1) && vc(f, b, S),
      Object.keys(f)
        .sort((p, v) => p - v)
        .map((p) => +p)
    );
  }
  getLabelForValue(t) {
    const i = this._adapter,
      n = this.options.time;
    return n.tooltipFormat
      ? i.format(t, n.tooltipFormat)
      : i.format(t, n.displayFormats.datetime);
  }
  _tickFormatFunction(t, i, n, s) {
    const o = this.options,
      r = o.time.displayFormats,
      a = this._unit,
      c = this._majorUnit,
      u = a && r[a],
      f = c && r[c],
      m = n[i],
      b = c && f && m && m.major,
      x = this._adapter.format(t, s || (b ? f : u)),
      S = o.ticks.callback;
    return S ? Bt(S, [x, i, n], this) : x;
  }
  generateTickLabels(t) {
    let i, n, s;
    for (i = 0, n = t.length; i < n; ++i)
      (s = t[i]), (s.label = this._tickFormatFunction(s.value, i, t));
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const i = this._offsets,
      n = this.getDecimalForValue(t);
    return this.getPixelForDecimal((i.start + n) * i.factor);
  }
  getValueForPixel(t) {
    const i = this._offsets,
      n = this.getDecimalForPixel(t) / i.factor - i.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(t) {
    const i = this.options.ticks,
      n = this.ctx.measureText(t).width,
      s = ke(this.isHorizontal() ? i.maxRotation : i.minRotation),
      o = Math.cos(s),
      r = Math.sin(s),
      a = this._resolveTickFontOptions(0).size;
    return { w: n * o + a * r, h: n * r + a * o };
  }
  _getLabelCapacity(t) {
    const i = this.options.time,
      n = i.displayFormats,
      s = n[i.unit] || n.millisecond,
      o = this._tickFormatFunction(t, 0, _c(this, [t], this._majorUnit), s),
      r = this._getLabelSize(o),
      a =
        Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) -
        1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [],
      i,
      n;
    if (t.length) return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return (this._cache.data = s[0].controller.getAllParsedValues(this));
    for (i = 0, n = s.length; i < n; ++i)
      t = t.concat(s[i].controller.getAllParsedValues(this));
    return (this._cache.data = this.normalize(t));
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let i, n;
    if (t.length) return t;
    const s = this.getLabels();
    for (i = 0, n = s.length; i < n; ++i) t.push(gc(this, s[i]));
    return (this._cache.labels = this._normalized ? t : this.normalize(t));
  }
  normalize(t) {
    return Uh(t.sort(D0));
  }
}
ls.id = "time";
ls.defaults = {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {},
  },
  ticks: { source: "auto", major: { enabled: !1 } },
};
function Ss(e, t, i) {
  let n = 0,
    s = e.length - 1,
    o,
    r,
    a,
    c;
  i
    ? (t >= e[n].pos && t <= e[s].pos && ({ lo: n, hi: s } = Ue(e, "pos", t)),
      ({ pos: o, time: a } = e[n]),
      ({ pos: r, time: c } = e[s]))
    : (t >= e[n].time &&
        t <= e[s].time &&
        ({ lo: n, hi: s } = Ue(e, "time", t)),
      ({ time: o, pos: a } = e[n]),
      ({ time: r, pos: c } = e[s]));
  const u = r - o;
  return u ? a + ((c - a) * (t - o)) / u : a;
}
class ca extends ls {
  constructor(t) {
    super(t),
      (this._table = []),
      (this._minPos = void 0),
      (this._tableRange = void 0);
  }
  initOffsets() {
    const t = this._getTimestampsForTable(),
      i = (this._table = this.buildLookupTable(t));
    (this._minPos = Ss(i, this.min)),
      (this._tableRange = Ss(i, this.max) - this._minPos),
      super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: i, max: n } = this,
      s = [],
      o = [];
    let r, a, c, u, f;
    for (r = 0, a = t.length; r < a; ++r)
      (u = t[r]), u >= i && u <= n && s.push(u);
    if (s.length < 2)
      return [
        { time: i, pos: 0 },
        { time: n, pos: 1 },
      ];
    for (r = 0, a = s.length; r < a; ++r)
      (f = s[r + 1]),
        (c = s[r - 1]),
        (u = s[r]),
        Math.round((f + c) / 2) !== u && o.push({ time: u, pos: r / (a - 1) });
    return o;
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length) return t;
    const i = this.getDataTimestamps(),
      n = this.getLabelTimestamps();
    return (
      i.length && n.length
        ? (t = this.normalize(i.concat(n)))
        : (t = i.length ? i : n),
      (t = this._cache.all = t),
      t
    );
  }
  getDecimalForValue(t) {
    return (Ss(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const i = this._offsets,
      n = this.getDecimalForPixel(t) / i.factor - i.end;
    return Ss(this._table, n * this._tableRange + this._minPos, !0);
  }
}
ca.id = "timeseries";
ca.defaults = ls.defaults;
const I0 = Object.freeze({
  __proto__: null,
  CategoryScale: Qs,
  LinearScale: aa,
  LogarithmicScale: la,
  RadialLinearScale: as,
  TimeScale: ls,
  TimeSeriesScale: ca,
});
const R0 = [ty, Tb, p0, I0],
  B0 = { class: "row" },
  F0 = { class: "col s12" },
  H0 = ["id"],
  yc = Vt({
    __name: "areaChart",
    props: { chartData: null, chartId: null },
    setup(e) {
      const t = e;
      let i = null,
        n = {
          scales: { y: { stacked: !0 } },
          plugins: {
            filler: { propagate: !1 },
            "samples-filler-analyser": { target: "chart-analyser" },
          },
          interaction: { intersect: !1 },
        };
      $i(() => {
        Xs.register(...R0), s();
      }),
        Ln(t, (o, r) => {
          (i.data = t.chartData), console.log("here"), i.update();
        });
      function s() {
        const o = t.chartData,
          r = { type: "line", data: o, options: n },
          a = document.getElementById(t.chartId);
        try {
          const c = a.getContext("2d");
          i = new Xs(c, r);
        } catch {}
      }
      return (o, r) => (
        ft(),
        vt("div", B0, [
          F("div", F0, [F("canvas", { id: e.chartId }, null, 8, H0)]),
        ])
      );
    },
  }),
  $0 = { class: "row" },
  W0 = { class: "col s3" },
  z0 = { class: "input-field col s11" },
  N0 = F("label", { for: "initialDate" }, "Data in\xEDcio", -1),
  V0 = { class: "col s3" },
  j0 = { class: "input-field col s11" },
  q0 = F("label", { for: "initialDate" }, "Data fim", -1),
  K0 = { class: "row" },
  Y0 = { class: "col s7 lists" },
  U0 = { class: "select-list" },
  X0 = { class: "col s12" },
  Q0 = ["value"],
  J0 = Vt({
    __name: "config",
    props: { lists: null, selectedLists: null },
    emits: ["changeView", "setSelectedList"],
    setup(e, { emit: t }) {
      const i = e;
      let n = le(""),
        s = le("");
      $i(() => {
        fn.AutoInit(),
          (n.value = localStorage.iintialDayString || ""),
          (s.value = localStorage.finalDayString || "");
      });
      function o() {
        (localStorage.iintialDayString = n.value),
          (localStorage.finalDayString = s.value),
          (localStorage.dashboardSelectedLists = JSON.stringify(
            i.selectedLists.map((r) => r)
          )),
          t("changeView", "dashboard");
      }
      return (r, a) => (
        ft(),
        vt(
          $t,
          null,
          [
            F("div", $0, [
              F("div", W0, [
                F("div", z0, [
                  Gt(
                    F(
                      "input",
                      {
                        id: "initialDate",
                        type: "date",
                        "onUpdate:modelValue":
                          a[0] ||
                          (a[0] = (c) => (jt(n) ? (n.value = c) : (n = c))),
                      },
                      null,
                      512
                    ),
                    [[Ee, Ft(n)]]
                  ),
                  N0,
                ]),
              ]),
              F("div", V0, [
                F("div", j0, [
                  Gt(
                    F(
                      "input",
                      {
                        id: "initialDate",
                        type: "date",
                        "onUpdate:modelValue":
                          a[1] ||
                          (a[1] = (c) => (jt(s) ? (s.value = c) : (s = c))),
                      },
                      null,
                      512
                    ),
                    [[Ee, Ft(s)]]
                  ),
                  q0,
                ]),
              ]),
            ]),
            F("div", K0, [
              F("div", Y0, [
                F("div", U0, [
                  (ft(!0),
                  vt(
                    $t,
                    null,
                    xe(
                      e.lists,
                      (c, u) => (
                        ft(),
                        vt("div", { class: "row", key: u }, [
                          F("div", X0, [
                            F("label", null, [
                              Gt(
                                F(
                                  "input",
                                  {
                                    type: "checkbox",
                                    value: c.name,
                                    "onUpdate:modelValue":
                                      a[2] ||
                                      (a[2] = (f) =>
                                        jt(selectedLists)
                                          ? (selectedLists.value = f)
                                          : null),
                                  },
                                  null,
                                  8,
                                  Q0
                                ),
                                [[$s, e.selectedLists]]
                              ),
                              F("span", null, ve(c.name), 1),
                            ]),
                          ]),
                        ])
                      )
                    ),
                    128
                  )),
                ]),
              ]),
            ]),
            F("div", { class: "row top-2" }, [
              F("div", { class: "col s12" }, [
                F(
                  "button",
                  { class: "waves-effect waves-light btn", onClick: o },
                  " Salvar "
                ),
              ]),
            ]),
          ],
          64
        )
      );
    },
  }),
  ha = (e) => (un("data-v-aac57e59"), (e = e()), dn(), e),
  G0 = { key: 0 },
  Z0 = { class: "row" },
  tx = { class: "col s3" },
  ex = { class: "row" },
  ix = { class: "col s6" },
  nx = ha(() => F("span", null, "Quantidade", -1)),
  sx = { class: "col s6" },
  ox = ha(() => F("span", null, "Pontua\xE7\xE3o", -1)),
  rx = ha(() => F("div", { class: "row" }, null, -1)),
  ax = { key: 1 },
  lx = Vt({
    __name: "dashboard",
    setup(e) {
      const t = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(0, 255, 221, 0.2)",
        "rgba(229, 0, 255, 0.2)",
        "rgba(50, 255, 0, 0.2)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 140, 0, 0.7)",
        "rgba(255, 0, 0, 0.5)",
      ];
      let i = localStorage.board,
        n = localStorage.apiKey,
        s = localStorage.token,
        o = le([]),
        r = le([]),
        a = le("dashboard"),
        c = le(""),
        u = le(""),
        f = le("quantity"),
        m = le(),
        b = le(),
        x = [],
        S = [];
      $i(() => {
        fn.AutoInit(),
          (c.value = localStorage.iintialDayString || ""),
          (u.value = localStorage.finalDayString || ""),
          g().then(() => {
            l();
          });
      });
      function p() {
        S = [];
        const L = c.value.split("-"),
          A = u.value.split("-"),
          R = new Date(
            Date.UTC(parseInt(L[0]), parseInt(L[1]) - 1, parseInt(L[2]))
          );
        let W = new Date(
          Date.UTC(parseInt(A[0]), parseInt(A[1]) - 1, parseInt(A[2]))
        );
        if (((W = new Date(W.setDate(W.getDate() + 1))), R < W)) {
          let z = R;
          for (; z < W; ) {
            const N = z
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/");
            S.push(N), (z = new Date(z.setDate(z.getDate() + 1)));
          }
        }
      }
      async function v() {
        let L = localStorage.chartDatas || "{}";
        L = JSON.parse(L);
        const A = new Date(),
          W = {
            date: new Date(Date.UTC(A.getFullYear(), A.getMonth(), A.getDate()))
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/"),
            data: {},
          };
        try {
          await g(),
            await h(),
            alert("Atualizado"),
            o.value.forEach((z) => {
              const N = x.filter((lt) => lt.idList == z.id),
                Y = k(N),
                X = N.length,
                Q = N.reduce((lt, xt) => {
                  const bt = lt.points || lt,
                    dt = xt.points;
                  return bt + dt;
                }, 0);
              W.data[z.name] = { cardsNumber: X, points: Q, labels: Y };
            }),
            (L[W.date] = W.data);
        } catch {
          alert("Falha ao atualizado");
        }
        (localStorage.chartDatas = JSON.stringify(L)),
          (m.value = y()),
          (b.value = E());
      }
      function k(L) {
        const R = L.map((N) => N.labels.map((Y) => Y.name)).reduce(
          (N, Y) => [...N, ...Y],
          []
        );
        return Array.from(new Set(R)).map((N) => {
          const Y = L.filter((X) => X.labels.find((Q) => Q.name == N));
          return { name: N, count: Y.length };
        });
      }
      function E() {
        let L = localStorage.chartDatas || "{}";
        L = JSON.parse(L);
        let A = o.value.filter((R) => r.value.includes(R.name));
        return (
          (A = A.map((R, W) => {
            let z;
            return (
              (z = S.map((N) => {
                if (L[N]) {
                  const Y = L[N][R.name].cardsNumber,
                    Q = (L[N][R.name].labels || []).find(
                      (lt) => lt.name == "Rotina"
                    );
                  return Y - (Q ? Q.count : 0);
                } else return null;
              })),
              {
                label: R.name,
                data: z,
                backgroundColor: t[W % 10],
                fill: W == 0 ? "start" : "-1",
              }
            );
          })),
          { labels: S, datasets: A }
        );
      }
      function y(L = "") {
        f.value = L || f.value;
        let A = localStorage.chartDatas || "{}";
        A = JSON.parse(A);
        let R = o.value.filter((z) => r.value.includes(z.name)),
          W = "";
        switch (f.value) {
          case "quantity":
            W = "cardsNumber";
            break;
          case "score":
            W = "points";
            break;
          default:
            W = "";
        }
        return (
          (R = R.map((z, N) => {
            const Y = S.map((X) => (A[X] ? A[X][z.name][W] : null));
            return {
              label: z.name,
              data: Y,
              backgroundColor: t[N % 10],
              fill: N == 0 ? "start" : "-1",
            };
          })),
          { labels: S, datasets: R }
        );
      }
      async function g() {
        try {
          const L = await fetch(
            `https://api.trello.com/1/boards/${i}/lists?key=${n}&token=${s}`
          );
          o.value = await L.json();
        } catch {
          o.value = JSON.parse(localStorage.lists);
        }
      }
      async function h() {
        x = (
          await (
            await fetch(
              `https://api.trello.com/1/boards/${i}/cards?key=${n}&token=${s}`
            )
          ).json()
        ).map((R) => {
          const W = R.name.split(" "),
            z = W[W.length - 1];
          return (
            (R.points = 0),
            z[0] == "|" && (R.points = parseInt(z.split("|").join(""))),
            R
          );
        });
      }
      function l() {
        localStorage.dashboardSelectedLists &&
          (r.value = JSON.parse(localStorage.dashboardSelectedLists)),
          p(),
          (m.value = y()),
          (b.value = E());
      }
      function d(L) {
        (a.value = L), l();
      }
      async function C() {
        (m.value = y()), (b.value = E());
      }
      function T() {
        const L = {};
        (L.quantityJson = JSON.stringify(y("quantity"), null, 2)),
          (L.scoreJson = JSON.stringify(y("score"), null, 2)),
          (localStorage.analise = JSON.stringify(L)),
          Gi.push({ path: "./analises-form" });
      }
      return (L, A) => (
        ft(),
        vt(
          $t,
          null,
          [
            Tt(qm, { onChangeView: d }),
            Ft(a) == "dashboard"
              ? (ft(),
                vt("div", G0, [
                  F("div", Z0, [
                    F("div", tx, [
                      F("div", ex, [
                        F("div", ix, [
                          F("label", null, [
                            Gt(
                              F(
                                "input",
                                {
                                  "onUpdate:modelValue":
                                    A[0] ||
                                    (A[0] = (R) =>
                                      jt(f) ? (f.value = R) : (f = R)),
                                  onChange: C,
                                  value: "quantity",
                                  name: "chartType",
                                  type: "radio",
                                  checked: "",
                                },
                                null,
                                544
                              ),
                              [[Na, Ft(f)]]
                            ),
                            nx,
                          ]),
                        ]),
                        F("div", sx, [
                          F("label", null, [
                            Gt(
                              F(
                                "input",
                                {
                                  "onUpdate:modelValue":
                                    A[1] ||
                                    (A[1] = (R) =>
                                      jt(f) ? (f.value = R) : (f = R)),
                                  onChange: C,
                                  value: "score",
                                  name: "chartType",
                                  type: "radio",
                                },
                                null,
                                544
                              ),
                              [[Na, Ft(f)]]
                            ),
                            ox,
                          ]),
                        ]),
                      ]),
                    ]),
                    F("div", { class: "col s8 right-align" }, [
                      F(
                        "button",
                        { class: "waves-effect waves-light btn", onClick: v },
                        " Atualizar "
                      ),
                    ]),
                    F("div", { class: "col s1 right-align" }, [
                      F(
                        "button",
                        {
                          class: "waves-effect waves-light btn",
                          onClick: T,
                          "data-target": "modal1",
                        },
                        " Salvar "
                      ),
                    ]),
                  ]),
                  Ft(m)
                    ? (ft(),
                      Kn(
                        yc,
                        {
                          key: 0,
                          onChangeChartType: C,
                          chartData: Ft(m),
                          chartId: "areaChart",
                        },
                        null,
                        8,
                        ["chartData"]
                      ))
                    : gs("", !0),
                  rx,
                  Ft(m)
                    ? (ft(),
                      Kn(
                        yc,
                        {
                          key: 1,
                          onChangeChartType: C,
                          chartData: Ft(b),
                          chartId: "areaChart1",
                        },
                        null,
                        8,
                        ["chartData"]
                      ))
                    : gs("", !0),
                ]))
              : gs("", !0),
            Ft(a) == "config"
              ? (ft(),
                vt("div", ax, [
                  Tt(
                    J0,
                    { onChangeView: d, lists: Ft(o), selectedLists: Ft(r) },
                    null,
                    8,
                    ["lists", "selectedLists"]
                  ),
                ]))
              : gs("", !0),
          ],
          64
        )
      );
    },
  });
const cx = _i(lx, [["__scopeId", "data-v-aac57e59"]]),
  hx = Vt({
    __name: "Dashboard",
    setup(e) {
      return (t, i) => (ft(), Kn(cx));
    },
  }),
  ua = (e) => (un("data-v-b14a5d9c"), (e = e()), dn(), e),
  ux = { class: "highlight" },
  dx = ua(() =>
    F(
      "thead",
      null,
      [
        F("tr", null, [
          F("th", { class: "line-name" }, "Nome"),
          F("th"),
          F("th"),
        ]),
      ],
      -1
    )
  ),
  fx = ["onClick"],
  px = ua(() => F("i", { class: "material-icons" }, "delete", -1)),
  gx = [px],
  mx = ["onClick"],
  vx = ua(() => F("i", { class: "material-icons" }, "edit", -1)),
  _x = [vx],
  yx = Vt({
    __name: "analises",
    setup(e) {
      const t = le([]);
      $i(() => {
        fn.AutoInit();
        const s = localStorage.analises || "[]";
        t.value = JSON.parse(s);
      });
      function i(s) {
        (t.value = t.value.filter((o) => o.id != s)),
          (localStorage.analises = JSON.stringify(t.value));
      }
      function n(s) {
        (localStorage.analise = JSON.stringify(t.value.find((o) => o.id == s))),
          Gi.push({ path: "./analises-form" });
      }
      return (s, o) => (
        ft(),
        vt("table", ux, [
          dx,
          F("tbody", null, [
            (ft(!0),
            vt(
              $t,
              null,
              xe(
                Ft(t),
                (r, a) => (
                  ft(),
                  vt("tr", { key: a }, [
                    F("td", null, ve(r.name), 1),
                    F(
                      "td",
                      { onClick: (c) => i(r.id), class: "remove" },
                      gx,
                      8,
                      fx
                    ),
                    F(
                      "td",
                      { onClick: (c) => n(r.id), class: "remove" },
                      _x,
                      8,
                      mx
                    ),
                  ])
                )
              ),
              128
            )),
          ]),
        ])
      );
    },
  });
const bx = _i(yx, [["__scopeId", "data-v-b14a5d9c"]]),
  xx = { class: "row" },
  wx = { class: "col s12" },
  kx = Vt({
    __name: "Analises",
    setup(e) {
      return (t, i) => (
        ft(), vt("main", null, [F("div", xx, [F("div", wx, [Tt(bx)])])])
      );
    },
  }),
  Cx = { class: "row" },
  Mx = { class: "col s6" },
  Ex = { class: "row form-button" },
  Sx = { class: "col s12" },
  Ox = { class: "input-field col s11" },
  Tx = F("label", { for: "name", class: "active" }, "Nome:", -1),
  Dx = { class: "row form-button" },
  Lx = { class: "col s12" },
  Px = { class: "input-field col s11" },
  Ax = F("label", { for: "obs", class: "active" }, "Pr\xE9-planejamento:", -1),
  Ix = { class: "row form-button" },
  Rx = { class: "col s12" },
  Bx = { class: "input-field col s11" },
  Fx = F("label", { for: "obs", class: "active" }, "P\xF3s-planejamento:", -1),
  Hx = F(
    "div",
    { class: "col s6 right-align" },
    [F("button", { class: "waves-effect waves-light btn" }, "Salvar")],
    -1
  ),
  $x = { class: "col s6" },
  Wx = Vt({
    __name: "analises-form",
    setup(e) {
      const t = le(JSON.parse(localStorage.analise));
      $i(() => {
        fn.AutoInit();
      });
      function i() {
        t.value.id ? n() : s();
      }
      function n() {
        event == null || event.preventDefault();
        const r = localStorage.analises || "[]",
          a = JSON.parse(r),
          c = a.findIndex((u) => t.value.id == u.id);
        (a[c] = { ...a[c], ...t.value }),
          (localStorage.analises = JSON.stringify(a)),
          alert("Salvo"),
          Gi.push({ path: "./analises" });
      }
      function s() {
        event == null || event.preventDefault();
        const r = localStorage.analises || "[]",
          a = JSON.parse(r);
        (t.value.id = Ph()),
          a.push(t.value),
          (localStorage.analises = JSON.stringify(a)),
          alert("Salvo"),
          Gi.push({ path: "./analises" });
      }
      function o() {
        Gi.back();
      }
      return (r, a) => (
        ft(),
        vt(
          "form",
          { onSubmit: a[3] || (a[3] = (c) => i()) },
          [
            F("div", Cx, [
              F("div", Mx, [
                F("div", Ex, [
                  F("div", Sx, [
                    F("div", Ox, [
                      Gt(
                        F(
                          "input",
                          {
                            id: "name",
                            type: "text",
                            "onUpdate:modelValue":
                              a[0] || (a[0] = (c) => (Ft(t).name = c)),
                            class: "validate",
                            placeholder: " ",
                          },
                          null,
                          512
                        ),
                        [[Ee, Ft(t).name]]
                      ),
                      Tx,
                    ]),
                  ]),
                ]),
                F("div", Dx, [
                  F("div", Lx, [
                    F("div", Px, [
                      Gt(
                        F(
                          "textarea",
                          {
                            id: "obs",
                            "onUpdate:modelValue":
                              a[1] || (a[1] = (c) => (Ft(t).pre = c)),
                            class: "materialize-textarea validate",
                            placeholder: " ",
                          },
                          null,
                          512
                        ),
                        [[Ee, Ft(t).pre]]
                      ),
                      Ax,
                    ]),
                  ]),
                ]),
                F("div", Ix, [
                  F("div", Rx, [
                    F("div", Bx, [
                      Gt(
                        F(
                          "textarea",
                          {
                            id: "obs",
                            "onUpdate:modelValue":
                              a[2] || (a[2] = (c) => (Ft(t).pos = c)),
                            class: "materialize-textarea validate",
                            placeholder: " ",
                          },
                          null,
                          512
                        ),
                        [[Ee, Ft(t).pos]]
                      ),
                      Fx,
                    ]),
                  ]),
                ]),
                F("div", { class: "row" }, [
                  F("div", { class: "col s6" }, [
                    F(
                      "button",
                      {
                        type: "button",
                        onClick: o,
                        class: "waves-effect waves-light btn",
                      },
                      " Cancelar "
                    ),
                  ]),
                  Hx,
                ]),
              ]),
              F("div", $x, [
                F(
                  "pre",
                  null,
                  "          " +
                    ve(Ft(t).quantityJson) +
                    `
          `,
                  1
                ),
              ]),
            ]),
          ],
          32
        )
      );
    },
  }),
  zx = { class: "row" },
  Nx = { class: "col s12" },
  Vx = Vt({
    __name: "Analises-form",
    setup(e) {
      return (t, i) => (
        ft(), vt("main", null, [F("div", zx, [F("div", Nx, [Tt(Wx)])])])
      );
    },
  }),
  ii = "/trello-utils",
  Gi = pg({
    history: Tp("/"),
    routes: [
      { path: `${ii}/`, name: "dashboard", component: hx },
      { path: `${ii}/cards`, name: "cards", component: Pg },
      { path: `${ii}/checklist`, name: "checklist", component: Bg },
      { path: `${ii}/api-key`, name: "api-key", component: Gg },
      { path: `${ii}/create-cards`, name: "create-cards", component: Mm },
      { path: `${ii}/recurrents`, name: "recurrents-cards", component: $m },
      { path: `${ii}/analises`, name: "analises", component: kx },
      { path: `${ii}/analises-form`, name: "analises-form", component: Vx },
    ],
  });
const Tu = Xf(up);
Tu.use(Gi);
Tu.mount("#app");
