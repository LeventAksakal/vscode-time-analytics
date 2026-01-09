const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['./index2.js', './index2.css']),
) => i.map((i) => d[i]);
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === 'childList')
        for (const i of o.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
/**
 * @vue/shared v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function $s(e) {
  const t = Object.create(null);
  for (const n of e.split(',')) t[n] = 1;
  return (n) => n in t;
}
const ie = {},
  Ht = [],
  ze = () => {},
  xo = () => !1,
  qn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  qs = (e) => e.startsWith('onUpdate:'),
  pe = Object.assign,
  zs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ul = Object.prototype.hasOwnProperty,
  ne = (e, t) => ul.call(e, t),
  V = Array.isArray,
  Ut = (e) => Xt(e) === '[object Map]',
  zn = (e) => Xt(e) === '[object Set]',
  Er = (e) => Xt(e) === '[object Date]',
  al = (e) => Xt(e) === '[object RegExp]',
  $ = (e) => typeof e == 'function',
  ue = (e) => typeof e == 'string',
  Ye = (e) => typeof e == 'symbol',
  re = (e) => e !== null && typeof e == 'object',
  wo = (e) => (re(e) || $(e)) && $(e.then) && $(e.catch),
  Ro = Object.prototype.toString,
  Xt = (e) => Ro.call(e),
  fl = (e) => Xt(e).slice(8, -1),
  To = (e) => Xt(e) === '[object Object]',
  Jn = (e) =>
    ue(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  on = $s(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  Yn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  dl = /-\w/g,
  Fe = Yn((e) => e.replace(dl, (t) => t.slice(1).toUpperCase())),
  hl = /\B([A-Z])/g,
  Mt = Yn((e) => e.replace(hl, '-$1').toLowerCase()),
  Qn = Yn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  fs = Yn((e) => (e ? `on${Qn(e)}` : '')),
  _t = (e, t) => !Object.is(e, t),
  Kt = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  Oo = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    });
  },
  Js = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  pl = (e) => {
    const t = ue(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Sr;
const Xn = () =>
  Sr ||
  (Sr =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function Ys(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ue(s) ? yl(s) : Ys(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (ue(e) || re(e)) return e;
}
const gl = /;(?![^(]*\))/g,
  ml = /:([^]+)/,
  vl = /\/\*[^]*?\*\//g;
function yl(e) {
  const t = {};
  return (
    e
      .replace(vl, '')
      .split(gl)
      .forEach((n) => {
        if (n) {
          const s = n.split(ml);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Qs(e) {
  let t = '';
  if (ue(e)) t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const s = Qs(e[n]);
      s && (t += s + ' ');
    }
  else if (re(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const _l =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  bl = $s(_l);
function Po(e) {
  return !!e || e === '';
}
function El(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++) n = Zn(e[s], t[s]);
  return n;
}
function Zn(e, t) {
  if (e === t) return !0;
  let n = Er(e),
    s = Er(t);
  if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
  if (((n = Ye(e)), (s = Ye(t)), n || s)) return e === t;
  if (((n = V(e)), (s = V(t)), n || s)) return n && s ? El(e, t) : !1;
  if (((n = re(e)), (s = re(t)), n || s)) {
    if (!n || !s) return !1;
    const r = Object.keys(e).length,
      o = Object.keys(t).length;
    if (r !== o) return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i),
        c = t.hasOwnProperty(i);
      if ((l && !c) || (!l && c) || !Zn(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
function Io(e, t) {
  return e.findIndex((n) => Zn(n, t));
}
const No = (e) => !!(e && e.__v_isRef === !0),
  Sl = (e) =>
    ue(e)
      ? e
      : e == null
        ? ''
        : V(e) || (re(e) && (e.toString === Ro || !$(e.toString)))
          ? No(e)
            ? Sl(e.value)
            : JSON.stringify(e, Do, 2)
          : String(e),
  Do = (e, t) =>
    No(t)
      ? Do(e, t.value)
      : Ut(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], o) => ((n[ds(s, o) + ' =>'] = r), n),
              {},
            ),
          }
        : zn(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => ds(n)) }
          : Ye(t)
            ? ds(t)
            : re(t) && !V(t) && !To(t)
              ? String(t)
              : t,
  ds = (e, t = '') => {
    var n;
    return Ye(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let me;
class Mo {
  constructor(t = !1) {
    ((this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = me),
      !t &&
        me &&
        (this.index = (me.scopes || (me.scopes = [])).push(this) - 1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = me;
      try {
        return ((me = this), t());
      } finally {
        me = n;
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = me), (me = this));
  }
  off() {
    this._on > 0 &&
      --this._on === 0 &&
      ((me = this.prevScope), (this.prevScope = void 0));
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function Lo(e) {
  return new Mo(e);
}
function Fo() {
  return me;
}
function Cl(e, t = !1) {
  me && me.cleanups.push(e);
}
let ce;
const hs = new WeakSet();
class ko {
  constructor(t) {
    ((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      me && me.active && me.effects.push(this));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), hs.has(this) && (hs.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || jo(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    ((this.flags |= 2), Cr(this), Bo(this));
    const t = ce,
      n = ke;
    ((ce = this), (ke = !0));
    try {
      return this.fn();
    } finally {
      (Ho(this), (ce = t), (ke = n), (this.flags &= -3));
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) er(t);
      ((this.deps = this.depsTail = void 0),
        Cr(this),
        this.onStop && this.onStop(),
        (this.flags &= -2));
    }
  }
  trigger() {
    this.flags & 64
      ? hs.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    Rs(this) && this.run();
  }
  get dirty() {
    return Rs(this);
  }
}
let Vo = 0,
  ln,
  cn;
function jo(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ((e.next = cn), (cn = e));
    return;
  }
  ((e.next = ln), (ln = e));
}
function Xs() {
  Vo++;
}
function Zs() {
  if (--Vo > 0) return;
  if (cn) {
    let t = cn;
    for (cn = void 0; t; ) {
      const n = t.next;
      ((t.next = void 0), (t.flags &= -9), (t = n));
    }
  }
  let e;
  for (; ln; ) {
    let t = ln;
    for (ln = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Bo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t));
}
function Ho(e) {
  let t,
    n = e.depsTail,
    s = n;
  for (; s; ) {
    const r = s.prevDep;
    (s.version === -1 ? (s === n && (n = r), er(s), Al(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r));
  }
  ((e.deps = t), (e.depsTail = n));
}
function Rs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Uo(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Uo(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === pn) ||
    ((e.globalVersion = pn),
    !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Rs(e)))
  )
    return;
  e.flags |= 2;
  const t = e.dep,
    n = ce,
    s = ke;
  ((ce = e), (ke = !0));
  try {
    Bo(e);
    const r = e.fn(e._value);
    (t.version === 0 || _t(r, e._value)) &&
      ((e.flags |= 128), (e._value = r), t.version++);
  } catch (r) {
    throw (t.version++, r);
  } finally {
    ((ce = n), (ke = s), Ho(e), (e.flags &= -3));
  }
}
function er(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (
    (s && ((s.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) er(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Al(e) {
  const { prevDep: t, nextDep: n } = e;
  (t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let ke = !0;
const Ko = [];
function it() {
  (Ko.push(ke), (ke = !1));
}
function lt() {
  const e = Ko.pop();
  ke = e === void 0 ? !0 : e;
}
function Cr(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = ce;
    ce = void 0;
    try {
      t();
    } finally {
      ce = n;
    }
  }
}
let pn = 0;
class xl {
  constructor(t, n) {
    ((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0));
  }
}
class tr {
  constructor(t) {
    ((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0));
  }
  track(t) {
    if (!ce || !ke || ce === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ce)
      ((n = this.activeLink = new xl(ce, this)),
        ce.deps
          ? ((n.prevDep = ce.depsTail),
            (ce.depsTail.nextDep = n),
            (ce.depsTail = n))
          : (ce.deps = ce.depsTail = n),
        Wo(n));
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep;
      ((s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = ce.depsTail),
        (n.nextDep = void 0),
        (ce.depsTail.nextDep = n),
        (ce.depsTail = n),
        ce.deps === n && (ce.deps = s));
    }
    return n;
  }
  trigger(t) {
    (this.version++, pn++, this.notify(t));
  }
  notify(t) {
    Xs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Zs();
    }
  }
}
function Wo(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) Wo(s);
    }
    const n = e.dep.subs;
    (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
  }
}
const Mn = new WeakMap(),
  Pt = Symbol(''),
  Ts = Symbol(''),
  gn = Symbol('');
function ve(e, t, n) {
  if (ke && ce) {
    let s = Mn.get(e);
    s || Mn.set(e, (s = new Map()));
    let r = s.get(n);
    (r || (s.set(n, (r = new tr())), (r.map = s), (r.key = n)), r.track());
  }
}
function st(e, t, n, s, r, o) {
  const i = Mn.get(e);
  if (!i) {
    pn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ((Xs(), t === 'clear')) i.forEach(l);
  else {
    const c = V(e),
      f = c && Jn(n);
    if (c && n === 'length') {
      const u = Number(s);
      i.forEach((d, p) => {
        (p === 'length' || p === gn || (!Ye(p) && p >= u)) && l(d);
      });
    } else
      switch (
        ((n !== void 0 || i.has(void 0)) && l(i.get(n)), f && l(i.get(gn)), t)
      ) {
        case 'add':
          c ? f && l(i.get('length')) : (l(i.get(Pt)), Ut(e) && l(i.get(Ts)));
          break;
        case 'delete':
          c || (l(i.get(Pt)), Ut(e) && l(i.get(Ts)));
          break;
        case 'set':
          Ut(e) && l(i.get(Pt));
          break;
      }
  }
  Zs();
}
function wl(e, t) {
  const n = Mn.get(e);
  return n && n.get(t);
}
function kt(e) {
  const t = Z(e);
  return t === e ? t : (ve(t, 'iterate', gn), Ie(e) ? t : t.map(Ve));
}
function es(e) {
  return (ve((e = Z(e)), 'iterate', gn), e);
}
function gt(e, t) {
  return ct(e) ? (ot(e) ? qt(Ve(t)) : qt(t)) : Ve(t);
}
const Rl = {
  __proto__: null,
  [Symbol.iterator]() {
    return ps(this, Symbol.iterator, (e) => gt(this, e));
  },
  concat(...e) {
    return kt(this).concat(...e.map((t) => (V(t) ? kt(t) : t)));
  },
  entries() {
    return ps(this, 'entries', (e) => ((e[1] = gt(this, e[1])), e));
  },
  every(e, t) {
    return Ze(this, 'every', e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ze(
      this,
      'filter',
      e,
      t,
      (n) => n.map((s) => gt(this, s)),
      arguments,
    );
  },
  find(e, t) {
    return Ze(this, 'find', e, t, (n) => gt(this, n), arguments);
  },
  findIndex(e, t) {
    return Ze(this, 'findIndex', e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ze(this, 'findLast', e, t, (n) => gt(this, n), arguments);
  },
  findLastIndex(e, t) {
    return Ze(this, 'findLastIndex', e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Ze(this, 'forEach', e, t, void 0, arguments);
  },
  includes(...e) {
    return gs(this, 'includes', e);
  },
  indexOf(...e) {
    return gs(this, 'indexOf', e);
  },
  join(e) {
    return kt(this).join(e);
  },
  lastIndexOf(...e) {
    return gs(this, 'lastIndexOf', e);
  },
  map(e, t) {
    return Ze(this, 'map', e, t, void 0, arguments);
  },
  pop() {
    return en(this, 'pop');
  },
  push(...e) {
    return en(this, 'push', e);
  },
  reduce(e, ...t) {
    return Ar(this, 'reduce', e, t);
  },
  reduceRight(e, ...t) {
    return Ar(this, 'reduceRight', e, t);
  },
  shift() {
    return en(this, 'shift');
  },
  some(e, t) {
    return Ze(this, 'some', e, t, void 0, arguments);
  },
  splice(...e) {
    return en(this, 'splice', e);
  },
  toReversed() {
    return kt(this).toReversed();
  },
  toSorted(e) {
    return kt(this).toSorted(e);
  },
  toSpliced(...e) {
    return kt(this).toSpliced(...e);
  },
  unshift(...e) {
    return en(this, 'unshift', e);
  },
  values() {
    return ps(this, 'values', (e) => gt(this, e));
  },
};
function ps(e, t, n) {
  const s = es(e),
    r = s[t]();
  return (
    s !== e &&
      !Ie(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const o = r._next();
        return (o.done || (o.value = n(o.value)), o);
      })),
    r
  );
}
const Tl = Array.prototype;
function Ze(e, t, n, s, r, o) {
  const i = es(e),
    l = i !== e && !Ie(e),
    c = i[t];
  if (c !== Tl[t]) {
    const d = c.apply(e, o);
    return l ? Ve(d) : d;
  }
  let f = n;
  i !== e &&
    (l
      ? (f = function (d, p) {
          return n.call(this, gt(e, d), p, e);
        })
      : n.length > 2 &&
        (f = function (d, p) {
          return n.call(this, d, p, e);
        }));
  const u = c.call(i, f, s);
  return l && r ? r(u) : u;
}
function Ar(e, t, n, s) {
  const r = es(e);
  let o = n;
  return (
    r !== e &&
      (Ie(e)
        ? n.length > 3 &&
          (o = function (i, l, c) {
            return n.call(this, i, l, c, e);
          })
        : (o = function (i, l, c) {
            return n.call(this, i, gt(e, l), c, e);
          })),
    r[t](o, ...s)
  );
}
function gs(e, t, n) {
  const s = Z(e);
  ve(s, 'iterate', gn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && ts(n[0])
    ? ((n[0] = Z(n[0])), s[t](...n))
    : r;
}
function en(e, t, n = []) {
  (it(), Xs());
  const s = Z(e)[t].apply(e, n);
  return (Zs(), lt(), s);
}
const Ol = $s('__proto__,__v_isRef,__isVue'),
  Go = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ye),
  );
function Pl(e) {
  Ye(e) || (e = String(e));
  const t = Z(this);
  return (ve(t, 'has', e), t.hasOwnProperty(e));
}
class $o {
  constructor(t = !1, n = !1) {
    ((this._isReadonly = t), (this._isShallow = n));
  }
  get(t, n, s) {
    if (n === '__v_skip') return t.__v_skip;
    const r = this._isReadonly,
      o = this._isShallow;
    if (n === '__v_isReactive') return !r;
    if (n === '__v_isReadonly') return r;
    if (n === '__v_isShallow') return o;
    if (n === '__v_raw')
      return s === (r ? (o ? Bl : Yo) : o ? Jo : zo).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = V(t);
    if (!r) {
      let c;
      if (i && (c = Rl[n])) return c;
      if (n === 'hasOwnProperty') return Pl;
    }
    const l = Reflect.get(t, n, fe(t) ? t : s);
    if ((Ye(n) ? Go.has(n) : Ol(n)) || (r || ve(t, 'get', n), o)) return l;
    if (fe(l)) {
      const c = i && Jn(n) ? l : l.value;
      return r && re(c) ? Ps(c) : c;
    }
    return re(l) ? (r ? Ps(l) : Sn(l)) : l;
  }
}
class qo extends $o {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = V(t) && Jn(n);
    if (!this._isShallow) {
      const f = ct(o);
      if ((!Ie(s) && !ct(s) && ((o = Z(o)), (s = Z(s))), !i && fe(o) && !fe(s)))
        return (f || (o.value = s), !0);
    }
    const l = i ? Number(n) < t.length : ne(t, n),
      c = Reflect.set(t, n, s, fe(t) ? t : r);
    return (
      t === Z(r) && (l ? _t(s, o) && st(t, 'set', n, s) : st(t, 'add', n, s)),
      c
    );
  }
  deleteProperty(t, n) {
    const s = ne(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return (r && s && st(t, 'delete', n, void 0), r);
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return ((!Ye(n) || !Go.has(n)) && ve(t, 'has', n), s);
  }
  ownKeys(t) {
    return (ve(t, 'iterate', V(t) ? 'length' : Pt), Reflect.ownKeys(t));
  }
}
class Il extends $o {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Nl = new qo(),
  Dl = new Il(),
  Ml = new qo(!0);
const Os = (e) => e,
  xn = (e) => Reflect.getPrototypeOf(e);
function Ll(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = Z(r),
      i = Ut(o),
      l = e === 'entries' || (e === Symbol.iterator && i),
      c = e === 'keys' && i,
      f = r[e](...s),
      u = n ? Os : t ? qt : Ve;
    return (
      !t && ve(o, 'iterate', c ? Ts : Pt),
      {
        next() {
          const { value: d, done: p } = f.next();
          return p
            ? { value: d, done: p }
            : { value: l ? [u(d[0]), u(d[1])] : u(d), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function wn(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
  };
}
function Fl(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw,
        i = Z(o),
        l = Z(r);
      e || (_t(r, l) && ve(i, 'get', r), ve(i, 'get', l));
      const { has: c } = xn(i),
        f = t ? Os : e ? qt : Ve;
      if (c.call(i, r)) return f(o.get(r));
      if (c.call(i, l)) return f(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return (!e && ve(Z(r), 'iterate', Pt), r.size);
    },
    has(r) {
      const o = this.__v_raw,
        i = Z(o),
        l = Z(r);
      return (
        e || (_t(r, l) && ve(i, 'has', r), ve(i, 'has', l)),
        r === l ? o.has(r) : o.has(r) || o.has(l)
      );
    },
    forEach(r, o) {
      const i = this,
        l = i.__v_raw,
        c = Z(l),
        f = t ? Os : e ? qt : Ve;
      return (
        !e && ve(c, 'iterate', Pt),
        l.forEach((u, d) => r.call(o, f(u), f(d), i))
      );
    },
  };
  return (
    pe(
      n,
      e
        ? {
            add: wn('add'),
            set: wn('set'),
            delete: wn('delete'),
            clear: wn('clear'),
          }
        : {
            add(r) {
              !t && !Ie(r) && !ct(r) && (r = Z(r));
              const o = Z(this);
              return (
                xn(o).has.call(o, r) || (o.add(r), st(o, 'add', r, r)),
                this
              );
            },
            set(r, o) {
              !t && !Ie(o) && !ct(o) && (o = Z(o));
              const i = Z(this),
                { has: l, get: c } = xn(i);
              let f = l.call(i, r);
              f || ((r = Z(r)), (f = l.call(i, r)));
              const u = c.call(i, r);
              return (
                i.set(r, o),
                f ? _t(o, u) && st(i, 'set', r, o) : st(i, 'add', r, o),
                this
              );
            },
            delete(r) {
              const o = Z(this),
                { has: i, get: l } = xn(o);
              let c = i.call(o, r);
              (c || ((r = Z(r)), (c = i.call(o, r))), l && l.call(o, r));
              const f = o.delete(r);
              return (c && st(o, 'delete', r, void 0), f);
            },
            clear() {
              const r = Z(this),
                o = r.size !== 0,
                i = r.clear();
              return (o && st(r, 'clear', void 0, void 0), i);
            },
          },
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      n[r] = Ll(r, e, t);
    }),
    n
  );
}
function nr(e, t) {
  const n = Fl(e, t);
  return (s, r, o) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
        ? e
        : r === '__v_raw'
          ? s
          : Reflect.get(ne(n, r) && r in s ? n : s, r, o);
}
const kl = { get: nr(!1, !1) },
  Vl = { get: nr(!1, !0) },
  jl = { get: nr(!0, !1) };
const zo = new WeakMap(),
  Jo = new WeakMap(),
  Yo = new WeakMap(),
  Bl = new WeakMap();
function Hl(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Ul(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Hl(fl(e));
}
function Sn(e) {
  return ct(e) ? e : sr(e, !1, Nl, kl, zo);
}
function Qo(e) {
  return sr(e, !1, Ml, Vl, Jo);
}
function Ps(e) {
  return sr(e, !0, Dl, jl, Yo);
}
function sr(e, t, n, s, r) {
  if (!re(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = Ul(e);
  if (o === 0) return e;
  const i = r.get(e);
  if (i) return i;
  const l = new Proxy(e, o === 2 ? s : n);
  return (r.set(e, l), l);
}
function ot(e) {
  return ct(e) ? ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
function ts(e) {
  return e ? !!e.__v_raw : !1;
}
function Z(e) {
  const t = e && e.__v_raw;
  return t ? Z(t) : e;
}
function rr(e) {
  return (
    !ne(e, '__v_skip') && Object.isExtensible(e) && Oo(e, '__v_skip', !0),
    e
  );
}
const Ve = (e) => (re(e) ? Sn(e) : e),
  qt = (e) => (re(e) ? Ps(e) : e);
function fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function nt(e) {
  return Zo(e, !1);
}
function Xo(e) {
  return Zo(e, !0);
}
function Zo(e, t) {
  return fe(e) ? e : new Kl(e, t);
}
class Kl {
  constructor(t, n) {
    ((this.dep = new tr()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : Z(t)),
      (this._value = n ? t : Ve(t)),
      (this.__v_isShallow = n));
  }
  get value() {
    return (this.dep.track(), this._value);
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Ie(t) || ct(t);
    ((t = s ? t : Z(t)),
      _t(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : Ve(t)),
        this.dep.trigger()));
  }
}
function It(e) {
  return fe(e) ? e.value : e;
}
const Wl = {
  get: (e, t, n) => (t === '__v_raw' ? e : It(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t];
    return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function ei(e) {
  return ot(e) ? e : new Proxy(e, Wl);
}
function Gl(e) {
  const t = V(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = ql(e, n);
  return t;
}
class $l {
  constructor(t, n, s) {
    ((this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0),
      (this._value = void 0),
      (this._raw = Z(t)));
    let r = !0,
      o = t;
    if (!V(t) || !Jn(String(n)))
      do r = !ts(o) || Ie(o);
      while (r && (o = o.__v_raw));
    this._shallow = r;
  }
  get value() {
    let t = this._object[this._key];
    return (
      this._shallow && (t = It(t)),
      (this._value = t === void 0 ? this._defaultValue : t)
    );
  }
  set value(t) {
    if (this._shallow && fe(this._raw[this._key])) {
      const n = this._object[this._key];
      if (fe(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return wl(this._raw, this._key);
  }
}
function ql(e, t, n) {
  return new $l(e, t, n);
}
class zl {
  constructor(t, n, s) {
    ((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new tr(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = pn - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s));
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && ce !== this))
      return (jo(this, !0), !0);
  }
  get value() {
    const t = this.dep.track();
    return (Uo(this), t && (t.version = this.dep.version), this._value);
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Jl(e, t, n = !1) {
  let s, r;
  return ($(e) ? (s = e) : ((s = e.get), (r = e.set)), new zl(s, r, n));
}
const Rn = {},
  Ln = new WeakMap();
let xt;
function Yl(e, t = !1, n = xt) {
  if (n) {
    let s = Ln.get(n);
    (s || Ln.set(n, (s = [])), s.push(e));
  }
}
function Ql(e, t, n = ie) {
  const {
      immediate: s,
      deep: r,
      once: o,
      scheduler: i,
      augmentJob: l,
      call: c,
    } = n,
    f = (S) => (r ? S : Ie(S) || r === !1 || r === 0 ? rt(S, 1) : rt(S));
  let u,
    d,
    p,
    m,
    v = !1,
    w = !1;
  if (
    (fe(e)
      ? ((d = () => e.value), (v = Ie(e)))
      : ot(e)
        ? ((d = () => f(e)), (v = !0))
        : V(e)
          ? ((w = !0),
            (v = e.some((S) => ot(S) || Ie(S))),
            (d = () =>
              e.map((S) => {
                if (fe(S)) return S.value;
                if (ot(S)) return f(S);
                if ($(S)) return c ? c(S, 2) : S();
              })))
          : $(e)
            ? t
              ? (d = c ? () => c(e, 2) : e)
              : (d = () => {
                  if (p) {
                    it();
                    try {
                      p();
                    } finally {
                      lt();
                    }
                  }
                  const S = xt;
                  xt = u;
                  try {
                    return c ? c(e, 3, [m]) : e(m);
                  } finally {
                    xt = S;
                  }
                })
            : (d = ze),
    t && r)
  ) {
    const S = d,
      F = r === !0 ? 1 / 0 : r;
    d = () => rt(S(), F);
  }
  const L = Fo(),
    I = () => {
      (u.stop(), L && L.active && zs(L.effects, u));
    };
  if (o && t) {
    const S = t;
    t = (...F) => {
      (S(...F), I());
    };
  }
  let E = w ? new Array(e.length).fill(Rn) : Rn;
  const x = (S) => {
    if (!(!(u.flags & 1) || (!u.dirty && !S)))
      if (t) {
        const F = u.run();
        if (r || v || (w ? F.some((z, W) => _t(z, E[W])) : _t(F, E))) {
          p && p();
          const z = xt;
          xt = u;
          try {
            const W = [F, E === Rn ? void 0 : w && E[0] === Rn ? [] : E, m];
            ((E = F), c ? c(t, 3, W) : t(...W));
          } finally {
            xt = z;
          }
        }
      } else u.run();
  };
  return (
    l && l(x),
    (u = new ko(d)),
    (u.scheduler = i ? () => i(x, !1) : x),
    (m = (S) => Yl(S, !1, u)),
    (p = u.onStop =
      () => {
        const S = Ln.get(u);
        if (S) {
          if (c) c(S, 4);
          else for (const F of S) F();
          Ln.delete(u);
        }
      }),
    t ? (s ? x(!0) : (E = u.run())) : i ? i(x.bind(null, !0), !0) : u.run(),
    (I.pause = u.pause.bind(u)),
    (I.resume = u.resume.bind(u)),
    (I.stop = I),
    I
  );
}
function rt(e, t = 1 / 0, n) {
  if (
    t <= 0 ||
    !re(e) ||
    e.__v_skip ||
    ((n = n || new Map()), (n.get(e) || 0) >= t)
  )
    return e;
  if ((n.set(e, t), t--, fe(e))) rt(e.value, t, n);
  else if (V(e)) for (let s = 0; s < e.length; s++) rt(e[s], t, n);
  else if (zn(e) || Ut(e))
    e.forEach((s) => {
      rt(s, t, n);
    });
  else if (To(e)) {
    for (const s in e) rt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && rt(e[s], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Cn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    ns(r, t, n);
  }
}
function je(e, t, n, s) {
  if ($(e)) {
    const r = Cn(e, t, n, s);
    return (
      r &&
        wo(r) &&
        r.catch((o) => {
          ns(o, t, n);
        }),
      r
    );
  }
  if (V(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(je(e[o], t, n, s));
    return r;
  }
}
function ns(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || ie;
  if (t) {
    let l = t.parent;
    const c = t.proxy,
      f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, c, f) === !1) return;
      }
      l = l.parent;
    }
    if (o) {
      (it(), Cn(o, null, 10, [e, c, f]), lt());
      return;
    }
  }
  Xl(e, n, r, s, i);
}
function Xl(e, t, n, s = !0, r = !1) {
  if (r) throw e;
  console.error(e);
}
const Se = [];
let $e = -1;
const Wt = [];
let mt = null,
  jt = 0;
const ti = Promise.resolve();
let Fn = null;
function or(e) {
  const t = Fn || ti;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zl(e) {
  let t = $e + 1,
    n = Se.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = Se[s],
      o = mn(r);
    o < e || (o === e && r.flags & 2) ? (t = s + 1) : (n = s);
  }
  return t;
}
function ir(e) {
  if (!(e.flags & 1)) {
    const t = mn(e),
      n = Se[Se.length - 1];
    (!n || (!(e.flags & 2) && t >= mn(n)) ? Se.push(e) : Se.splice(Zl(t), 0, e),
      (e.flags |= 1),
      ni());
  }
}
function ni() {
  Fn || (Fn = ti.then(ri));
}
function ec(e) {
  (V(e)
    ? Wt.push(...e)
    : mt && e.id === -1
      ? mt.splice(jt + 1, 0, e)
      : e.flags & 1 || (Wt.push(e), (e.flags |= 1)),
    ni());
}
function xr(e, t, n = $e + 1) {
  for (; n < Se.length; n++) {
    const s = Se[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      (Se.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        s.flags & 4 || (s.flags &= -2));
    }
  }
}
function si(e) {
  if (Wt.length) {
    const t = [...new Set(Wt)].sort((n, s) => mn(n) - mn(s));
    if (((Wt.length = 0), mt)) {
      mt.push(...t);
      return;
    }
    for (mt = t, jt = 0; jt < mt.length; jt++) {
      const n = mt[jt];
      (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
    }
    ((mt = null), (jt = 0));
  }
}
const mn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function ri(e) {
  try {
    for ($e = 0; $e < Se.length; $e++) {
      const t = Se[$e];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        Cn(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; $e < Se.length; $e++) {
      const t = Se[$e];
      t && (t.flags &= -2);
    }
    (($e = -1),
      (Se.length = 0),
      si(),
      (Fn = null),
      (Se.length || Wt.length) && ri());
  }
}
let Oe = null,
  oi = null;
function kn(e) {
  const t = Oe;
  return ((Oe = e), (oi = (e && e.type.__scopeId) || null), t);
}
function tc(e, t = Oe, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Un(-1);
    const o = kn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      (kn(o), s._d && Un(1));
    }
    return i;
  };
  return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function mf(e, t) {
  if (Oe === null) return e;
  const n = cs(Oe),
    s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = ie] = t[r];
    o &&
      ($(o) && (o = { mounted: o, updated: o }),
      o.deep && rt(i),
      s.push({
        dir: o,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function St(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (it(), je(c, n, 8, [e.el, l, e, t]), lt());
  }
}
function Pn(e, t) {
  if (ye) {
    let n = ye.provides;
    const s = ye.parent && ye.parent.provides;
    (s === n && (n = ye.provides = Object.create(s)), (n[e] = t));
  }
}
function Je(e, t, n = !1) {
  const s = ls();
  if (s || Dt) {
    let r = Dt
      ? Dt._context.provides
      : s
        ? s.parent == null || s.ce
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && $(t) ? t.call(s && s.proxy) : t;
  }
}
function nc() {
  return !!(ls() || Dt);
}
const sc = Symbol.for('v-scx'),
  rc = () => Je(sc);
function Gt(e, t, n) {
  return ii(e, t, n);
}
function ii(e, t, n = ie) {
  const { immediate: s, deep: r, flush: o, once: i } = n,
    l = pe({}, n),
    c = (t && s) || (!t && o !== 'post');
  let f;
  if (_n) {
    if (o === 'sync') {
      const m = rc();
      f = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {};
      return ((m.stop = ze), (m.resume = ze), (m.pause = ze), m);
    }
  }
  const u = ye;
  l.call = (m, v, w) => je(m, u, v, w);
  let d = !1;
  (o === 'post'
    ? (l.scheduler = (m) => {
        ge(m, u && u.suspense);
      })
    : o !== 'sync' &&
      ((d = !0),
      (l.scheduler = (m, v) => {
        v ? m() : ir(m);
      })),
    (l.augmentJob = (m) => {
      (t && (m.flags |= 4),
        d && ((m.flags |= 2), u && ((m.id = u.uid), (m.i = u))));
    }));
  const p = Ql(e, t, l);
  return (_n && (f ? f.push(p) : c && p()), p);
}
function oc(e, t, n) {
  const s = this.proxy,
    r = ue(e) ? (e.includes('.') ? li(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  $(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = An(this),
    l = ii(r, o.bind(s), n);
  return (i(), l);
}
function li(e, t) {
  const n = t.split('.');
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
const ic = Symbol('_vte'),
  lc = (e) => e.__isTeleport,
  wt = Symbol('_leaveCb'),
  Tn = Symbol('_enterCb');
function cc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    rs(() => {
      e.isMounted = !0;
    }),
    ur(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const De = [Function, Array],
  uc = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: De,
    onEnter: De,
    onAfterEnter: De,
    onEnterCancelled: De,
    onBeforeLeave: De,
    onLeave: De,
    onAfterLeave: De,
    onLeaveCancelled: De,
    onBeforeAppear: De,
    onAppear: De,
    onAfterAppear: De,
    onAppearCancelled: De,
  };
function ac(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return (s || ((s = Object.create(null)), n.set(t.type, s)), s);
}
function Is(e, t, n, s, r) {
  const {
      appear: o,
      mode: i,
      persisted: l = !1,
      onBeforeEnter: c,
      onEnter: f,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: p,
      onLeave: m,
      onAfterLeave: v,
      onLeaveCancelled: w,
      onBeforeAppear: L,
      onAppear: I,
      onAfterAppear: E,
      onAppearCancelled: x,
    } = t,
    S = String(e.key),
    F = ac(n, e),
    z = (P, K) => {
      P && je(P, s, 9, K);
    },
    W = (P, K) => {
      const J = K[1];
      (z(P, K),
        V(P) ? P.every((D) => D.length <= 1) && J() : P.length <= 1 && J());
    },
    U = {
      mode: i,
      persisted: l,
      beforeEnter(P) {
        let K = c;
        if (!n.isMounted)
          if (o) K = L || c;
          else return;
        P[wt] && P[wt](!0);
        const J = F[S];
        (J && Rt(e, J) && J.el[wt] && J.el[wt](), z(K, [P]));
      },
      enter(P) {
        let K = f,
          J = u,
          D = d;
        if (!n.isMounted)
          if (o) ((K = I || f), (J = E || u), (D = x || d));
          else return;
        let Y = !1;
        const de = (P[Tn] = (_e) => {
          Y ||
            ((Y = !0),
            _e ? z(D, [P]) : z(J, [P]),
            U.delayedLeave && U.delayedLeave(),
            (P[Tn] = void 0));
        });
        K ? W(K, [P, de]) : de();
      },
      leave(P, K) {
        const J = String(e.key);
        if ((P[Tn] && P[Tn](!0), n.isUnmounting)) return K();
        z(p, [P]);
        let D = !1;
        const Y = (P[wt] = (de) => {
          D ||
            ((D = !0),
            K(),
            de ? z(w, [P]) : z(v, [P]),
            (P[wt] = void 0),
            F[J] === e && delete F[J]);
        });
        ((F[J] = e), m ? W(m, [P, Y]) : Y());
      },
      clone(P) {
        return Is(P, t, n, s);
      },
    };
  return U;
}
function zt(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), zt(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function ci(e, t = !1, n) {
  let s = [],
    r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === Le
      ? (i.patchFlag & 128 && r++, (s = s.concat(ci(i.children, t, l))))
      : (t || i.type !== Qe) && s.push(l != null ? bt(i, { key: l }) : i);
  }
  if (r > 1) for (let o = 0; o < s.length; o++) s[o].patchFlag = -2;
  return s;
}
function lr(e, t) {
  return $(e) ? pe({ name: e.name }, t, { setup: e }) : e;
}
function ui(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
const Vn = new WeakMap();
function un(e, t, n, s, r = !1) {
  if (V(e)) {
    e.forEach((v, w) => un(v, t && (V(t) ? t[w] : t), n, s, r));
    return;
  }
  if (Nt(s) && !r) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      un(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? cs(s.component) : s.el,
    i = r ? null : o,
    { i: l, r: c } = e,
    f = t && t.r,
    u = l.refs === ie ? (l.refs = {}) : l.refs,
    d = l.setupState,
    p = Z(d),
    m = d === ie ? xo : (v) => ne(p, v);
  if (f != null && f !== c) {
    if ((wr(t), ue(f))) ((u[f] = null), m(f) && (d[f] = null));
    else if (fe(f)) {
      f.value = null;
      const v = t;
      v.k && (u[v.k] = null);
    }
  }
  if ($(c)) Cn(c, l, 12, [i, u]);
  else {
    const v = ue(c),
      w = fe(c);
    if (v || w) {
      const L = () => {
        if (e.f) {
          const I = v ? (m(c) ? d[c] : u[c]) : c.value;
          if (r) V(I) && zs(I, o);
          else if (V(I)) I.includes(o) || I.push(o);
          else if (v) ((u[c] = [o]), m(c) && (d[c] = u[c]));
          else {
            const E = [o];
            ((c.value = E), e.k && (u[e.k] = E));
          }
        } else
          v
            ? ((u[c] = i), m(c) && (d[c] = i))
            : w && ((c.value = i), e.k && (u[e.k] = i));
      };
      if (i) {
        const I = () => {
          (L(), Vn.delete(e));
        };
        ((I.id = -1), Vn.set(e, I), ge(I, n));
      } else (wr(e), L());
    }
  }
}
function wr(e) {
  const t = Vn.get(e);
  t && ((t.flags |= 8), Vn.delete(e));
}
Xn().requestIdleCallback;
Xn().cancelIdleCallback;
const Nt = (e) => !!e.type.__asyncLoader,
  ai = (e) => e.type.__isKeepAlive,
  fc = {
    name: 'KeepAlive',
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = ls(),
        s = n.ctx;
      if (!s.renderer)
        return () => {
          const E = t.default && t.default();
          return E && E.length === 1 ? E[0] : E;
        };
      const r = new Map(),
        o = new Set();
      let i = null;
      const l = n.suspense,
        {
          renderer: {
            p: c,
            m: f,
            um: u,
            o: { createElement: d },
          },
        } = s,
        p = d('div');
      ((s.activate = (E, x, S, F, z) => {
        const W = E.component;
        (f(E, x, S, 0, l),
          c(W.vnode, E, x, S, W, l, F, E.slotScopeIds, z),
          ge(() => {
            ((W.isDeactivated = !1), W.a && Kt(W.a));
            const U = E.props && E.props.onVnodeMounted;
            U && Me(U, W.parent, E);
          }, l));
      }),
        (s.deactivate = (E) => {
          const x = E.component;
          (Bn(x.m),
            Bn(x.a),
            f(E, p, null, 1, l),
            ge(() => {
              x.da && Kt(x.da);
              const S = E.props && E.props.onVnodeUnmounted;
              (S && Me(S, x.parent, E), (x.isDeactivated = !0));
            }, l));
        }));
      function m(E) {
        (ms(E), u(E, n, l, !0));
      }
      function v(E) {
        r.forEach((x, S) => {
          const F = ks(Nt(x) ? x.type.__asyncResolved || {} : x.type);
          F && !E(F) && w(S);
        });
      }
      function w(E) {
        const x = r.get(E);
        (x && (!i || !Rt(x, i)) ? m(x) : i && ms(i), r.delete(E), o.delete(E));
      }
      Gt(
        () => [e.include, e.exclude],
        ([E, x]) => {
          (E && v((S) => sn(E, S)), x && v((S) => !sn(x, S)));
        },
        { flush: 'post', deep: !0 },
      );
      let L = null;
      const I = () => {
        L != null &&
          (Hn(n.subTree.type)
            ? ge(() => {
                r.set(L, On(n.subTree));
              }, n.subTree.suspense)
            : r.set(L, On(n.subTree)));
      };
      return (
        rs(I),
        cr(I),
        ur(() => {
          r.forEach((E) => {
            const { subTree: x, suspense: S } = n,
              F = On(x);
            if (E.type === F.type && E.key === F.key) {
              ms(F);
              const z = F.component.da;
              z && ge(z, S);
              return;
            }
            m(E);
          });
        }),
        () => {
          if (((L = null), !t.default)) return (i = null);
          const E = t.default(),
            x = E[0];
          if (E.length > 1) return ((i = null), E);
          if (!yn(x) || (!(x.shapeFlag & 4) && !(x.shapeFlag & 128)))
            return ((i = null), x);
          let S = On(x);
          if (S.type === Qe) return ((i = null), S);
          const F = S.type,
            z = ks(Nt(S) ? S.type.__asyncResolved || {} : F),
            { include: W, exclude: U, max: P } = e;
          if ((W && (!z || !sn(W, z))) || (U && z && sn(U, z)))
            return ((S.shapeFlag &= -257), (i = S), x);
          const K = S.key == null ? F : S.key,
            J = r.get(K);
          return (
            S.el && ((S = bt(S)), x.shapeFlag & 128 && (x.ssContent = S)),
            (L = K),
            J
              ? ((S.el = J.el),
                (S.component = J.component),
                S.transition && zt(S, S.transition),
                (S.shapeFlag |= 512),
                o.delete(K),
                o.add(K))
              : (o.add(K),
                P && o.size > parseInt(P, 10) && w(o.values().next().value)),
            (S.shapeFlag |= 256),
            (i = S),
            Hn(x.type) ? x : S
          );
        }
      );
    },
  },
  vf = fc;
function sn(e, t) {
  return V(e)
    ? e.some((n) => sn(n, t))
    : ue(e)
      ? e.split(',').includes(t)
      : al(e)
        ? ((e.lastIndex = 0), e.test(t))
        : !1;
}
function dc(e, t) {
  fi(e, 'a', t);
}
function hc(e, t) {
  fi(e, 'da', t);
}
function fi(e, t, n = ye) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((ss(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      (ai(r.parent.vnode) && pc(s, t, n, r), (r = r.parent));
  }
}
function pc(e, t, n, s) {
  const r = ss(t, e, s, !0);
  di(() => {
    zs(s[t], r);
  }, n);
}
function ms(e) {
  ((e.shapeFlag &= -257), (e.shapeFlag &= -513));
}
function On(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function ss(e, t, n = ye, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          it();
          const l = An(n),
            c = je(t, n, e, i);
          return (l(), lt(), c);
        });
    return (s ? r.unshift(o) : r.push(o), o);
  }
}
const ut =
    (e) =>
    (t, n = ye) => {
      (!_n || e === 'sp') && ss(e, (...s) => t(...s), n);
    },
  gc = ut('bm'),
  rs = ut('m'),
  mc = ut('bu'),
  cr = ut('u'),
  ur = ut('bum'),
  di = ut('um'),
  vc = ut('sp'),
  yc = ut('rtg'),
  _c = ut('rtc');
function bc(e, t = ye) {
  ss('ec', e, t);
}
const hi = 'components';
function Ec(e, t) {
  return gi(hi, e, !0, t) || e;
}
const pi = Symbol.for('v-ndc');
function yf(e) {
  return ue(e) ? gi(hi, e, !1) || e : e || pi;
}
function gi(e, t, n = !0, s = !1) {
  const r = Oe || ye;
  if (r) {
    const o = r.type;
    {
      const l = ks(o, !1);
      if (l && (l === t || l === Fe(t) || l === Qn(Fe(t)))) return o;
    }
    const i = Rr(r[e] || o[e], t) || Rr(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Rr(e, t) {
  return e && (e[t] || e[Fe(t)] || e[Qn(Fe(t))]);
}
function _f(e, t, n, s) {
  let r;
  const o = n,
    i = V(e);
  if (i || ue(e)) {
    const l = i && ot(e);
    let c = !1,
      f = !1;
    (l && ((c = !Ie(e)), (f = ct(e)), (e = es(e))), (r = new Array(e.length)));
    for (let u = 0, d = e.length; u < d; u++)
      r[u] = t(c ? (f ? qt(Ve(e[u])) : Ve(e[u])) : e[u], u, void 0, o);
  } else if (typeof e == 'number') {
    r = new Array(e);
    for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, o);
  } else if (re(e))
    if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, o));
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const u = l[c];
        r[c] = t(e[u], u, c, o);
      }
    }
  else r = [];
  return r;
}
const Ns = (e) => (e ? (Fi(e) ? cs(e) : Ns(e.parent)) : null),
  an = pe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ns(e.parent),
    $root: (e) => Ns(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => vi(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ir(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = or.bind(e.proxy)),
    $watch: (e) => oc.bind(e),
  }),
  vs = (e, t) => e !== ie && !e.__isScriptSetup && ne(e, t),
  Sc = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0;
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      if (t[0] !== '$') {
        const p = i[t];
        if (p !== void 0)
          switch (p) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (vs(s, t)) return ((i[t] = 1), s[t]);
          if (r !== ie && ne(r, t)) return ((i[t] = 2), r[t]);
          if (ne(o, t)) return ((i[t] = 3), o[t]);
          if (n !== ie && ne(n, t)) return ((i[t] = 4), n[t]);
          Ds && (i[t] = 0);
        }
      }
      const f = an[t];
      let u, d;
      if (f) return (t === '$attrs' && ve(e.attrs, 'get', ''), f(e));
      if ((u = l.__cssModules) && (u = u[t])) return u;
      if (n !== ie && ne(n, t)) return ((i[t] = 4), n[t]);
      if (((d = c.config.globalProperties), ne(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return vs(r, t)
        ? ((r[t] = n), !0)
        : s !== ie && ne(s, t)
          ? ((s[t] = n), !0)
          : ne(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          props: o,
          type: i,
        },
      },
      l,
    ) {
      let c;
      return !!(
        n[l] ||
        (e !== ie && l[0] !== '$' && ne(e, l)) ||
        vs(t, l) ||
        ne(o, l) ||
        ne(s, l) ||
        ne(an, l) ||
        ne(r.config.globalProperties, l) ||
        ((c = i.__cssModules) && c[l])
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ne(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Tr(e) {
  return V(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Ds = !0;
function Cc(e) {
  const t = vi(e),
    n = e.proxy,
    s = e.ctx;
  ((Ds = !1), t.beforeCreate && Or(t.beforeCreate, e, 'bc'));
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: f,
    created: u,
    beforeMount: d,
    mounted: p,
    beforeUpdate: m,
    updated: v,
    activated: w,
    deactivated: L,
    beforeDestroy: I,
    beforeUnmount: E,
    destroyed: x,
    unmounted: S,
    render: F,
    renderTracked: z,
    renderTriggered: W,
    errorCaptured: U,
    serverPrefetch: P,
    expose: K,
    inheritAttrs: J,
    components: D,
    directives: Y,
    filters: de,
  } = t;
  if ((f && Ac(f, s, null), i))
    for (const q in i) {
      const ee = i[q];
      $(ee) && (s[q] = ee.bind(n));
    }
  if (r) {
    const q = r.call(n, n);
    re(q) && (e.data = Sn(q));
  }
  if (((Ds = !0), o))
    for (const q in o) {
      const ee = o[q],
        Xe = $(ee) ? ee.bind(n, n) : $(ee.get) ? ee.get.bind(n, n) : ze,
        at = !$(ee) && $(ee.set) ? ee.set.bind(n) : ze,
        He = Ce({ get: Xe, set: at });
      Object.defineProperty(s, q, {
        enumerable: !0,
        configurable: !0,
        get: () => He.value,
        set: (xe) => (He.value = xe),
      });
    }
  if (l) for (const q in l) mi(l[q], s, n, q);
  if (c) {
    const q = $(c) ? c.call(n) : c;
    Reflect.ownKeys(q).forEach((ee) => {
      Pn(ee, q[ee]);
    });
  }
  u && Or(u, e, 'c');
  function oe(q, ee) {
    V(ee) ? ee.forEach((Xe) => q(Xe.bind(n))) : ee && q(ee.bind(n));
  }
  if (
    (oe(gc, d),
    oe(rs, p),
    oe(mc, m),
    oe(cr, v),
    oe(dc, w),
    oe(hc, L),
    oe(bc, U),
    oe(_c, z),
    oe(yc, W),
    oe(ur, E),
    oe(di, S),
    oe(vc, P),
    V(K))
  )
    if (K.length) {
      const q = e.exposed || (e.exposed = {});
      K.forEach((ee) => {
        Object.defineProperty(q, ee, {
          get: () => n[ee],
          set: (Xe) => (n[ee] = Xe),
          enumerable: !0,
        });
      });
    } else e.exposed || (e.exposed = {});
  (F && e.render === ze && (e.render = F),
    J != null && (e.inheritAttrs = J),
    D && (e.components = D),
    Y && (e.directives = Y),
    P && ui(e));
}
function Ac(e, t, n = ze) {
  V(e) && (e = Ms(e));
  for (const s in e) {
    const r = e[s];
    let o;
    (re(r)
      ? 'default' in r
        ? (o = Je(r.from || s, r.default, !0))
        : (o = Je(r.from || s))
      : (o = Je(r)),
      fe(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o));
  }
}
function Or(e, t, n) {
  je(V(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function mi(e, t, n, s) {
  let r = s.includes('.') ? li(n, s) : () => n[s];
  if (ue(e)) {
    const o = t[e];
    $(o) && Gt(r, o);
  } else if ($(e)) Gt(r, e.bind(n));
  else if (re(e))
    if (V(e)) e.forEach((o) => mi(o, t, n, s));
    else {
      const o = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(o) && Gt(r, o, e);
    }
}
function vi(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((f) => jn(c, f, i, !0)),
          jn(c, t, i)),
    re(t) && o.set(t, c),
    c
  );
}
function jn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  (o && jn(e, o, n, !0), r && r.forEach((i) => jn(e, i, n, !0)));
  for (const i in t)
    if (!(s && i === 'expose')) {
      const l = xc[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const xc = {
  data: Pr,
  props: Ir,
  emits: Ir,
  methods: rn,
  computed: rn,
  beforeCreate: be,
  created: be,
  beforeMount: be,
  mounted: be,
  beforeUpdate: be,
  updated: be,
  beforeDestroy: be,
  beforeUnmount: be,
  destroyed: be,
  unmounted: be,
  activated: be,
  deactivated: be,
  errorCaptured: be,
  serverPrefetch: be,
  components: rn,
  directives: rn,
  watch: Rc,
  provide: Pr,
  inject: wc,
};
function Pr(e, t) {
  return t
    ? e
      ? function () {
          return pe(
            $(e) ? e.call(this, this) : e,
            $(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function wc(e, t) {
  return rn(Ms(e), Ms(t));
}
function Ms(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function rn(e, t) {
  return e ? pe(Object.create(null), e, t) : t;
}
function Ir(e, t) {
  return e
    ? V(e) && V(t)
      ? [...new Set([...e, ...t])]
      : pe(Object.create(null), Tr(e), Tr(t ?? {}))
    : t;
}
function Rc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = pe(Object.create(null), e);
  for (const s in t) n[s] = be(e[s], t[s]);
  return n;
}
function yi() {
  return {
    app: null,
    config: {
      isNativeTag: xo,
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
let Tc = 0;
function Oc(e, t) {
  return function (s, r = null) {
    ($(s) || (s = pe({}, s)), r != null && !re(r) && (r = null));
    const o = yi(),
      i = new WeakSet(),
      l = [];
    let c = !1;
    const f = (o.app = {
      _uid: Tc++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: lu,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...d) {
        return (
          i.has(u) ||
            (u && $(u.install)
              ? (i.add(u), u.install(f, ...d))
              : $(u) && (i.add(u), u(f, ...d))),
          f
        );
      },
      mixin(u) {
        return (o.mixins.includes(u) || o.mixins.push(u), f);
      },
      component(u, d) {
        return d ? ((o.components[u] = d), f) : o.components[u];
      },
      directive(u, d) {
        return d ? ((o.directives[u] = d), f) : o.directives[u];
      },
      mount(u, d, p) {
        if (!c) {
          const m = f._ceVNode || Ae(s, r);
          return (
            (m.appContext = o),
            p === !0 ? (p = 'svg') : p === !1 && (p = void 0),
            e(m, u, p),
            (c = !0),
            (f._container = u),
            (u.__vue_app__ = f),
            cs(m.component)
          );
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c &&
          (je(l, f._instance, 16),
          e(null, f._container),
          delete f._container.__vue_app__);
      },
      provide(u, d) {
        return ((o.provides[u] = d), f);
      },
      runWithContext(u) {
        const d = Dt;
        Dt = f;
        try {
          return u();
        } finally {
          Dt = d;
        }
      },
    });
    return f;
  };
}
let Dt = null;
const Pc = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Fe(t)}Modifiers`] || e[`${Mt(t)}Modifiers`];
function Ic(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ie;
  let r = n;
  const o = t.startsWith('update:'),
    i = o && Pc(s, t.slice(7));
  i &&
    (i.trim && (r = n.map((u) => (ue(u) ? u.trim() : u))),
    i.number && (r = n.map(Js)));
  let l,
    c = s[(l = fs(t))] || s[(l = fs(Fe(t)))];
  (!c && o && (c = s[(l = fs(Mt(t)))]), c && je(c, e, 6, r));
  const f = s[l + 'Once'];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    ((e.emitted[l] = !0), je(f, e, 6, r));
  }
}
const Nc = new WeakMap();
function _i(e, t, n = !1) {
  const s = n ? Nc : t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!$(e)) {
    const c = (f) => {
      const u = _i(f, t, !0);
      u && ((l = !0), pe(i, u));
    };
    (!n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c));
  }
  return !o && !l
    ? (re(e) && s.set(e, null), null)
    : (V(o) ? o.forEach((c) => (i[c] = null)) : pe(i, o),
      re(e) && s.set(e, i),
      i);
}
function os(e, t) {
  return !e || !qn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, Mt(t)) || ne(e, t));
}
function Nr(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [o],
      slots: i,
      attrs: l,
      emit: c,
      render: f,
      renderCache: u,
      props: d,
      data: p,
      setupState: m,
      ctx: v,
      inheritAttrs: w,
    } = e,
    L = kn(e);
  let I, E;
  try {
    if (n.shapeFlag & 4) {
      const S = r || s,
        F = S;
      ((I = qe(f.call(F, S, u, d, m, p, v))), (E = l));
    } else {
      const S = t;
      ((I = qe(
        S.length > 1 ? S(d, { attrs: l, slots: i, emit: c }) : S(d, null),
      )),
        (E = t.props ? l : Dc(l)));
    }
  } catch (S) {
    ((fn.length = 0), ns(S, e, 1), (I = Ae(Qe)));
  }
  let x = I;
  if (E && w !== !1) {
    const S = Object.keys(E),
      { shapeFlag: F } = x;
    S.length &&
      F & 7 &&
      (o && S.some(qs) && (E = Mc(E, o)), (x = bt(x, E, !1, !0)));
  }
  return (
    n.dirs &&
      ((x = bt(x, null, !1, !0)),
      (x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs)),
    n.transition && zt(x, n.transition),
    (I = x),
    kn(L),
    I
  );
}
const Dc = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || qn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Mc = (e, t) => {
    const n = {};
    for (const s in e) (!qs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Lc(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    f = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Dr(s, i, f) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const p = u[d];
        if (i[p] !== s[p] && !os(f, p)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? Dr(s, i, f)
            : !0
          : !!i;
  return !1;
}
function Dr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !os(n, o)) return !0;
  }
  return !1;
}
function Fc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      (((e = t.vnode).el = n), (t = t.parent));
    else break;
  }
}
const bi = {},
  Ei = () => Object.create(bi),
  Si = (e) => Object.getPrototypeOf(e) === bi;
function kc(e, t, n, s = !1) {
  const r = {},
    o = Ei();
  ((e.propsDefaults = Object.create(null)), Ci(e, t, r, o));
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  (n ? (e.props = s ? r : Qo(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o));
}
function Vc(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = Z(r),
    [c] = e.propsOptions;
  let f = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let p = u[d];
        if (os(e.emitsOptions, p)) continue;
        const m = t[p];
        if (c)
          if (ne(o, p)) m !== o[p] && ((o[p] = m), (f = !0));
          else {
            const v = Fe(p);
            r[v] = Ls(c, l, v, m, e, !1);
          }
        else m !== o[p] && ((o[p] = m), (f = !0));
      }
    }
  } else {
    Ci(e, t, r, o) && (f = !0);
    let u;
    for (const d in l)
      (!t || (!ne(t, d) && ((u = Mt(d)) === d || !ne(t, u)))) &&
        (c
          ? n &&
            (n[d] !== void 0 || n[u] !== void 0) &&
            (r[d] = Ls(c, l, d, void 0, e, !0))
          : delete r[d]);
    if (o !== l)
      for (const d in o) (!t || !ne(t, d)) && (delete o[d], (f = !0));
  }
  f && st(e.attrs, 'set', '');
}
function Ci(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (on(c)) continue;
      const f = t[c];
      let u;
      r && ne(r, (u = Fe(c)))
        ? !o || !o.includes(u)
          ? (n[u] = f)
          : ((l || (l = {}))[u] = f)
        : os(e.emitsOptions, c) ||
          ((!(c in s) || f !== s[c]) && ((s[c] = f), (i = !0)));
    }
  if (o) {
    const c = Z(n),
      f = l || ie;
    for (let u = 0; u < o.length; u++) {
      const d = o[u];
      n[d] = Ls(r, c, d, f[d], e, !ne(f, d));
    }
  }
  return i;
}
function Ls(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = ne(i, 'default');
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && $(c)) {
        const { propsDefaults: f } = r;
        if (n in f) s = f[n];
        else {
          const u = An(r);
          ((s = f[n] = c.call(null, t)), u());
        }
      } else s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === '' || s === Mt(n)) && (s = !0));
  }
  return s;
}
const jc = new WeakMap();
function Ai(e, t, n = !1) {
  const s = n ? jc : t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!$(e)) {
    const u = (d) => {
      c = !0;
      const [p, m] = Ai(d, t, !0);
      (pe(i, p), m && l.push(...m));
    };
    (!n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u));
  }
  if (!o && !c) return (re(e) && s.set(e, Ht), Ht);
  if (V(o))
    for (let u = 0; u < o.length; u++) {
      const d = Fe(o[u]);
      Mr(d) && (i[d] = ie);
    }
  else if (o)
    for (const u in o) {
      const d = Fe(u);
      if (Mr(d)) {
        const p = o[u],
          m = (i[d] = V(p) || $(p) ? { type: p } : pe({}, p)),
          v = m.type;
        let w = !1,
          L = !0;
        if (V(v))
          for (let I = 0; I < v.length; ++I) {
            const E = v[I],
              x = $(E) && E.name;
            if (x === 'Boolean') {
              w = !0;
              break;
            } else x === 'String' && (L = !1);
          }
        else w = $(v) && v.name === 'Boolean';
        ((m[0] = w), (m[1] = L), (w || ne(m, 'default')) && l.push(d));
      }
    }
  const f = [i, l];
  return (re(e) && s.set(e, f), f);
}
function Mr(e) {
  return e[0] !== '$' && !on(e);
}
const ar = (e) => e === '_' || e === '_ctx' || e === '$stable',
  fr = (e) => (V(e) ? e.map(qe) : [qe(e)]),
  Bc = (e, t, n) => {
    if (t._n) return t;
    const s = tc((...r) => fr(t(...r)), n);
    return ((s._c = !1), s);
  },
  xi = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (ar(r)) continue;
      const o = e[r];
      if ($(o)) t[r] = Bc(r, o, s);
      else if (o != null) {
        const i = fr(o);
        t[r] = () => i;
      }
    }
  },
  wi = (e, t) => {
    const n = fr(t);
    e.slots.default = () => n;
  },
  Ri = (e, t, n) => {
    for (const s in t) (n || !ar(s)) && (e[s] = t[s]);
  },
  Hc = (e, t, n) => {
    const s = (e.slots = Ei());
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (Ri(s, t, n), n && Oo(s, '_', r, !0)) : xi(t, s);
    } else t && wi(e, t);
  },
  Uc = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = ie;
    if (s.shapeFlag & 32) {
      const l = t._;
      (l
        ? n && l === 1
          ? (o = !1)
          : Ri(r, t, n)
        : ((o = !t.$stable), xi(t, r)),
        (i = t));
    } else t && (wi(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !ar(l) && i[l] == null && delete r[l];
  },
  ge = qc;
function Kc(e) {
  return Wc(e);
}
function Wc(e, t) {
  const n = Xn();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: f,
      setElementText: u,
      parentNode: d,
      nextSibling: p,
      setScopeId: m = ze,
      insertStaticContent: v,
    } = e,
    w = (
      a,
      h,
      g,
      y = null,
      C = null,
      _ = null,
      O = void 0,
      T = null,
      R = !!h.dynamicChildren,
    ) => {
      if (a === h) return;
      (a && !Rt(a, h) && ((y = b(a)), xe(a, C, _, !0), (a = null)),
        h.patchFlag === -2 && ((R = !1), (h.dynamicChildren = null)));
      const { type: A, ref: H, shapeFlag: M } = h;
      switch (A) {
        case is:
          L(a, h, g, y);
          break;
        case Qe:
          I(a, h, g, y);
          break;
        case In:
          a == null && E(h, g, y, O);
          break;
        case Le:
          D(a, h, g, y, C, _, O, T, R);
          break;
        default:
          M & 1
            ? F(a, h, g, y, C, _, O, T, R)
            : M & 6
              ? Y(a, h, g, y, C, _, O, T, R)
              : (M & 64 || M & 128) && A.process(a, h, g, y, C, _, O, T, R, j);
      }
      H != null && C
        ? un(H, a && a.ref, _, h || a, !h)
        : H == null && a && a.ref != null && un(a.ref, null, _, a, !0);
    },
    L = (a, h, g, y) => {
      if (a == null) s((h.el = l(h.children)), g, y);
      else {
        const C = (h.el = a.el);
        h.children !== a.children && f(C, h.children);
      }
    },
    I = (a, h, g, y) => {
      a == null ? s((h.el = c(h.children || '')), g, y) : (h.el = a.el);
    },
    E = (a, h, g, y) => {
      [a.el, a.anchor] = v(a.children, h, g, y, a.el, a.anchor);
    },
    x = ({ el: a, anchor: h }, g, y) => {
      let C;
      for (; a && a !== h; ) ((C = p(a)), s(a, g, y), (a = C));
      s(h, g, y);
    },
    S = ({ el: a, anchor: h }) => {
      let g;
      for (; a && a !== h; ) ((g = p(a)), r(a), (a = g));
      r(h);
    },
    F = (a, h, g, y, C, _, O, T, R) => {
      if (
        (h.type === 'svg' ? (O = 'svg') : h.type === 'math' && (O = 'mathml'),
        a == null)
      )
        z(h, g, y, C, _, O, T, R);
      else {
        const A = a.el && a.el._isVueCE ? a.el : null;
        try {
          (A && A._beginPatch(), P(a, h, C, _, O, T, R));
        } finally {
          A && A._endPatch();
        }
      }
    },
    z = (a, h, g, y, C, _, O, T) => {
      let R, A;
      const { props: H, shapeFlag: M, transition: B, dirs: G } = a;
      if (
        ((R = a.el = i(a.type, _, H && H.is, H)),
        M & 8
          ? u(R, a.children)
          : M & 16 && U(a.children, R, null, y, C, ys(a, _), O, T),
        G && St(a, null, y, 'created'),
        W(R, a, a.scopeId, O, y),
        H)
      ) {
        for (const le in H)
          le !== 'value' && !on(le) && o(R, le, null, H[le], _, y);
        ('value' in H && o(R, 'value', null, H.value, _),
          (A = H.onVnodeBeforeMount) && Me(A, y, a));
      }
      G && St(a, null, y, 'beforeMount');
      const X = Gc(C, B);
      (X && B.beforeEnter(R),
        s(R, h, g),
        ((A = H && H.onVnodeMounted) || X || G) &&
          ge(() => {
            (A && Me(A, y, a), X && B.enter(R), G && St(a, null, y, 'mounted'));
          }, C));
    },
    W = (a, h, g, y, C) => {
      if ((g && m(a, g), y)) for (let _ = 0; _ < y.length; _++) m(a, y[_]);
      if (C) {
        let _ = C.subTree;
        if (
          h === _ ||
          (Hn(_.type) && (_.ssContent === h || _.ssFallback === h))
        ) {
          const O = C.vnode;
          W(a, O, O.scopeId, O.slotScopeIds, C.parent);
        }
      }
    },
    U = (a, h, g, y, C, _, O, T, R = 0) => {
      for (let A = R; A < a.length; A++) {
        const H = (a[A] = T ? vt(a[A]) : qe(a[A]));
        w(null, H, h, g, y, C, _, O, T);
      }
    },
    P = (a, h, g, y, C, _, O) => {
      const T = (h.el = a.el);
      let { patchFlag: R, dynamicChildren: A, dirs: H } = h;
      R |= a.patchFlag & 16;
      const M = a.props || ie,
        B = h.props || ie;
      let G;
      if (
        (g && Ct(g, !1),
        (G = B.onVnodeBeforeUpdate) && Me(G, g, h, a),
        H && St(h, a, g, 'beforeUpdate'),
        g && Ct(g, !0),
        ((M.innerHTML && B.innerHTML == null) ||
          (M.textContent && B.textContent == null)) &&
          u(T, ''),
        A
          ? K(a.dynamicChildren, A, T, g, y, ys(h, C), _)
          : O || ee(a, h, T, null, g, y, ys(h, C), _, !1),
        R > 0)
      ) {
        if (R & 16) J(T, M, B, g, C);
        else if (
          (R & 2 && M.class !== B.class && o(T, 'class', null, B.class, C),
          R & 4 && o(T, 'style', M.style, B.style, C),
          R & 8)
        ) {
          const X = h.dynamicProps;
          for (let le = 0; le < X.length; le++) {
            const se = X[le],
              we = M[se],
              Re = B[se];
            (Re !== we || se === 'value') && o(T, se, we, Re, C, g);
          }
        }
        R & 1 && a.children !== h.children && u(T, h.children);
      } else !O && A == null && J(T, M, B, g, C);
      ((G = B.onVnodeUpdated) || H) &&
        ge(() => {
          (G && Me(G, g, h, a), H && St(h, a, g, 'updated'));
        }, y);
    },
    K = (a, h, g, y, C, _, O) => {
      for (let T = 0; T < h.length; T++) {
        const R = a[T],
          A = h[T],
          H =
            R.el && (R.type === Le || !Rt(R, A) || R.shapeFlag & 198)
              ? d(R.el)
              : g;
        w(R, A, H, null, y, C, _, O, !0);
      }
    },
    J = (a, h, g, y, C) => {
      if (h !== g) {
        if (h !== ie)
          for (const _ in h) !on(_) && !(_ in g) && o(a, _, h[_], null, C, y);
        for (const _ in g) {
          if (on(_)) continue;
          const O = g[_],
            T = h[_];
          O !== T && _ !== 'value' && o(a, _, T, O, C, y);
        }
        'value' in g && o(a, 'value', h.value, g.value, C);
      }
    },
    D = (a, h, g, y, C, _, O, T, R) => {
      const A = (h.el = a ? a.el : l('')),
        H = (h.anchor = a ? a.anchor : l(''));
      let { patchFlag: M, dynamicChildren: B, slotScopeIds: G } = h;
      (G && (T = T ? T.concat(G) : G),
        a == null
          ? (s(A, g, y), s(H, g, y), U(h.children || [], g, H, C, _, O, T, R))
          : M > 0 &&
              M & 64 &&
              B &&
              a.dynamicChildren &&
              a.dynamicChildren.length === B.length
            ? (K(a.dynamicChildren, B, g, C, _, O, T),
              (h.key != null || (C && h === C.subTree)) && Ti(a, h, !0))
            : ee(a, h, g, H, C, _, O, T, R));
    },
    Y = (a, h, g, y, C, _, O, T, R) => {
      ((h.slotScopeIds = T),
        a == null
          ? h.shapeFlag & 512
            ? C.ctx.activate(h, g, y, O, R)
            : de(h, g, y, C, _, O, R)
          : _e(a, h, R));
    },
    de = (a, h, g, y, C, _, O) => {
      const T = (a.component = tu(a, y, C));
      if ((ai(a) && (T.ctx.renderer = j), nu(T, !1, O), T.asyncDep)) {
        if ((C && C.registerDep(T, oe, O), !a.el)) {
          const R = (T.subTree = Ae(Qe));
          (I(null, R, h, g), (a.placeholder = R.el));
        }
      } else oe(T, a, h, g, C, _, O);
    },
    _e = (a, h, g) => {
      const y = (h.component = a.component);
      if (Lc(a, h, g))
        if (y.asyncDep && !y.asyncResolved) {
          q(y, h, g);
          return;
        } else ((y.next = h), y.update());
      else ((h.el = a.el), (y.vnode = h));
    },
    oe = (a, h, g, y, C, _, O) => {
      const T = () => {
        if (a.isMounted) {
          let { next: M, bu: B, u: G, parent: X, vnode: le } = a;
          {
            const Ke = Oi(a);
            if (Ke) {
              (M && ((M.el = le.el), q(a, M, O)),
                Ke.asyncDep.then(() => {
                  a.isUnmounted || T();
                }));
              return;
            }
          }
          let se = M,
            we;
          (Ct(a, !1),
            M ? ((M.el = le.el), q(a, M, O)) : (M = le),
            B && Kt(B),
            (we = M.props && M.props.onVnodeBeforeUpdate) && Me(we, X, M, le),
            Ct(a, !0));
          const Re = Nr(a),
            Ue = a.subTree;
          ((a.subTree = Re),
            w(Ue, Re, d(Ue.el), b(Ue), a, C, _),
            (M.el = Re.el),
            se === null && Fc(a, Re.el),
            G && ge(G, C),
            (we = M.props && M.props.onVnodeUpdated) &&
              ge(() => Me(we, X, M, le), C));
        } else {
          let M;
          const { el: B, props: G } = h,
            { bm: X, m: le, parent: se, root: we, type: Re } = a,
            Ue = Nt(h);
          (Ct(a, !1),
            X && Kt(X),
            !Ue && (M = G && G.onVnodeBeforeMount) && Me(M, se, h),
            Ct(a, !0));
          {
            we.ce &&
              we.ce._def.shadowRoot !== !1 &&
              we.ce._injectChildStyle(Re);
            const Ke = (a.subTree = Nr(a));
            (w(null, Ke, g, y, a, C, _), (h.el = Ke.el));
          }
          if ((le && ge(le, C), !Ue && (M = G && G.onVnodeMounted))) {
            const Ke = h;
            ge(() => Me(M, se, Ke), C);
          }
          ((h.shapeFlag & 256 ||
            (se && Nt(se.vnode) && se.vnode.shapeFlag & 256)) &&
            a.a &&
            ge(a.a, C),
            (a.isMounted = !0),
            (h = g = y = null));
        }
      };
      a.scope.on();
      const R = (a.effect = new ko(T));
      a.scope.off();
      const A = (a.update = R.run.bind(R)),
        H = (a.job = R.runIfDirty.bind(R));
      ((H.i = a), (H.id = a.uid), (R.scheduler = () => ir(H)), Ct(a, !0), A());
    },
    q = (a, h, g) => {
      h.component = a;
      const y = a.vnode.props;
      ((a.vnode = h),
        (a.next = null),
        Vc(a, h.props, y, g),
        Uc(a, h.children, g),
        it(),
        xr(a),
        lt());
    },
    ee = (a, h, g, y, C, _, O, T, R = !1) => {
      const A = a && a.children,
        H = a ? a.shapeFlag : 0,
        M = h.children,
        { patchFlag: B, shapeFlag: G } = h;
      if (B > 0) {
        if (B & 128) {
          at(A, M, g, y, C, _, O, T, R);
          return;
        } else if (B & 256) {
          Xe(A, M, g, y, C, _, O, T, R);
          return;
        }
      }
      G & 8
        ? (H & 16 && Ne(A, C, _), M !== A && u(g, M))
        : H & 16
          ? G & 16
            ? at(A, M, g, y, C, _, O, T, R)
            : Ne(A, C, _, !0)
          : (H & 8 && u(g, ''), G & 16 && U(M, g, y, C, _, O, T, R));
    },
    Xe = (a, h, g, y, C, _, O, T, R) => {
      ((a = a || Ht), (h = h || Ht));
      const A = a.length,
        H = h.length,
        M = Math.min(A, H);
      let B;
      for (B = 0; B < M; B++) {
        const G = (h[B] = R ? vt(h[B]) : qe(h[B]));
        w(a[B], G, g, null, C, _, O, T, R);
      }
      A > H ? Ne(a, C, _, !0, !1, M) : U(h, g, y, C, _, O, T, R, M);
    },
    at = (a, h, g, y, C, _, O, T, R) => {
      let A = 0;
      const H = h.length;
      let M = a.length - 1,
        B = H - 1;
      for (; A <= M && A <= B; ) {
        const G = a[A],
          X = (h[A] = R ? vt(h[A]) : qe(h[A]));
        if (Rt(G, X)) w(G, X, g, null, C, _, O, T, R);
        else break;
        A++;
      }
      for (; A <= M && A <= B; ) {
        const G = a[M],
          X = (h[B] = R ? vt(h[B]) : qe(h[B]));
        if (Rt(G, X)) w(G, X, g, null, C, _, O, T, R);
        else break;
        (M--, B--);
      }
      if (A > M) {
        if (A <= B) {
          const G = B + 1,
            X = G < H ? h[G].el : y;
          for (; A <= B; )
            (w(null, (h[A] = R ? vt(h[A]) : qe(h[A])), g, X, C, _, O, T, R),
              A++);
        }
      } else if (A > B) for (; A <= M; ) (xe(a[A], C, _, !0), A++);
      else {
        const G = A,
          X = A,
          le = new Map();
        for (A = X; A <= B; A++) {
          const Te = (h[A] = R ? vt(h[A]) : qe(h[A]));
          Te.key != null && le.set(Te.key, A);
        }
        let se,
          we = 0;
        const Re = B - X + 1;
        let Ue = !1,
          Ke = 0;
        const Zt = new Array(Re);
        for (A = 0; A < Re; A++) Zt[A] = 0;
        for (A = G; A <= M; A++) {
          const Te = a[A];
          if (we >= Re) {
            xe(Te, C, _, !0);
            continue;
          }
          let We;
          if (Te.key != null) We = le.get(Te.key);
          else
            for (se = X; se <= B; se++)
              if (Zt[se - X] === 0 && Rt(Te, h[se])) {
                We = se;
                break;
              }
          We === void 0
            ? xe(Te, C, _, !0)
            : ((Zt[We - X] = A + 1),
              We >= Ke ? (Ke = We) : (Ue = !0),
              w(Te, h[We], g, null, C, _, O, T, R),
              we++);
        }
        const yr = Ue ? $c(Zt) : Ht;
        for (se = yr.length - 1, A = Re - 1; A >= 0; A--) {
          const Te = X + A,
            We = h[Te],
            _r = h[Te + 1],
            br = Te + 1 < H ? _r.el || Pi(_r) : y;
          Zt[A] === 0
            ? w(null, We, g, br, C, _, O, T, R)
            : Ue && (se < 0 || A !== yr[se] ? He(We, g, br, 2) : se--);
        }
      }
    },
    He = (a, h, g, y, C = null) => {
      const { el: _, type: O, transition: T, children: R, shapeFlag: A } = a;
      if (A & 6) {
        He(a.component.subTree, h, g, y);
        return;
      }
      if (A & 128) {
        a.suspense.move(h, g, y);
        return;
      }
      if (A & 64) {
        O.move(a, h, g, j);
        return;
      }
      if (O === Le) {
        s(_, h, g);
        for (let M = 0; M < R.length; M++) He(R[M], h, g, y);
        s(a.anchor, h, g);
        return;
      }
      if (O === In) {
        x(a, h, g);
        return;
      }
      if (y !== 2 && A & 1 && T)
        if (y === 0) (T.beforeEnter(_), s(_, h, g), ge(() => T.enter(_), C));
        else {
          const { leave: M, delayLeave: B, afterLeave: G } = T,
            X = () => {
              a.ctx.isUnmounted ? r(_) : s(_, h, g);
            },
            le = () => {
              (_._isLeaving && _[wt](!0),
                M(_, () => {
                  (X(), G && G());
                }));
            };
          B ? B(_, X, le) : le();
        }
      else s(_, h, g);
    },
    xe = (a, h, g, y = !1, C = !1) => {
      const {
        type: _,
        props: O,
        ref: T,
        children: R,
        dynamicChildren: A,
        shapeFlag: H,
        patchFlag: M,
        dirs: B,
        cacheIndex: G,
      } = a;
      if (
        (M === -2 && (C = !1),
        T != null && (it(), un(T, null, g, a, !0), lt()),
        G != null && (h.renderCache[G] = void 0),
        H & 256)
      ) {
        h.ctx.deactivate(a);
        return;
      }
      const X = H & 1 && B,
        le = !Nt(a);
      let se;
      if ((le && (se = O && O.onVnodeBeforeUnmount) && Me(se, h, a), H & 6))
        Et(a.component, g, y);
      else {
        if (H & 128) {
          a.suspense.unmount(g, y);
          return;
        }
        (X && St(a, null, h, 'beforeUnmount'),
          H & 64
            ? a.type.remove(a, h, g, j, y)
            : A && !A.hasOnce && (_ !== Le || (M > 0 && M & 64))
              ? Ne(A, h, g, !1, !0)
              : ((_ === Le && M & 384) || (!C && H & 16)) && Ne(R, h, g),
          y && Lt(a));
      }
      ((le && (se = O && O.onVnodeUnmounted)) || X) &&
        ge(() => {
          (se && Me(se, h, a), X && St(a, null, h, 'unmounted'));
        }, g);
    },
    Lt = (a) => {
      const { type: h, el: g, anchor: y, transition: C } = a;
      if (h === Le) {
        Ft(g, y);
        return;
      }
      if (h === In) {
        S(a);
        return;
      }
      const _ = () => {
        (r(g), C && !C.persisted && C.afterLeave && C.afterLeave());
      };
      if (a.shapeFlag & 1 && C && !C.persisted) {
        const { leave: O, delayLeave: T } = C,
          R = () => O(g, _);
        T ? T(a.el, _, R) : R();
      } else _();
    },
    Ft = (a, h) => {
      let g;
      for (; a !== h; ) ((g = p(a)), r(a), (a = g));
      r(h);
    },
    Et = (a, h, g) => {
      const { bum: y, scope: C, job: _, subTree: O, um: T, m: R, a: A } = a;
      (Bn(R),
        Bn(A),
        y && Kt(y),
        C.stop(),
        _ && ((_.flags |= 8), xe(O, a, h, g)),
        T && ge(T, h),
        ge(() => {
          a.isUnmounted = !0;
        }, h));
    },
    Ne = (a, h, g, y = !1, C = !1, _ = 0) => {
      for (let O = _; O < a.length; O++) xe(a[O], h, g, y, C);
    },
    b = (a) => {
      if (a.shapeFlag & 6) return b(a.component.subTree);
      if (a.shapeFlag & 128) return a.suspense.next();
      const h = p(a.anchor || a.el),
        g = h && h[ic];
      return g ? p(g) : h;
    };
  let k = !1;
  const N = (a, h, g) => {
      let y;
      (a == null
        ? h._vnode && (xe(h._vnode, null, null, !0), (y = h._vnode.component))
        : w(h._vnode || null, a, h, null, null, null, g),
        (h._vnode = a),
        k || ((k = !0), xr(y), si(), (k = !1)));
    },
    j = {
      p: w,
      um: xe,
      m: He,
      r: Lt,
      mt: de,
      mc: U,
      pc: ee,
      pbc: K,
      n: b,
      o: e,
    };
  return { render: N, hydrate: void 0, createApp: Oc(N) };
}
function ys({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' &&
      e === 'annotation-xml' &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : n;
}
function Ct({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Gc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Ti(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (V(s) && V(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      (l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = vt(r[o])), (l.el = i.el)),
        !n && l.patchFlag !== -2 && Ti(i, l)),
        l.type === is &&
          (l.patchFlag !== -1
            ? (l.el = i.el)
            : (l.__elIndex = o + (e.type === Le ? 1 : 0))),
        l.type === Qe && !l.el && (l.el = i.el));
    }
}
function $c(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        ((t[s] = r), n.push(s));
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        ((l = (o + i) >> 1), e[n[l]] < f ? (o = l + 1) : (i = l));
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) ((n[o] = i), (i = t[i]));
  return n;
}
function Oi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Oi(t);
}
function Bn(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Pi(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Pi(t.subTree) : null;
}
const Hn = (e) => e.__isSuspense;
function qc(e, t) {
  t && t.pendingBranch
    ? V(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ec(e);
}
const Le = Symbol.for('v-fgt'),
  is = Symbol.for('v-txt'),
  Qe = Symbol.for('v-cmt'),
  In = Symbol.for('v-stc'),
  fn = [];
let Pe = null;
function Ii(e = !1) {
  fn.push((Pe = e ? null : []));
}
function zc() {
  (fn.pop(), (Pe = fn[fn.length - 1] || null));
}
let vn = 1;
function Un(e, t = !1) {
  ((vn += e), e < 0 && Pe && t && (Pe.hasOnce = !0));
}
function Ni(e) {
  return (
    (e.dynamicChildren = vn > 0 ? Pe || Ht : null),
    zc(),
    vn > 0 && Pe && Pe.push(e),
    e
  );
}
function bf(e, t, n, s, r, o) {
  return Ni(Li(e, t, n, s, r, o, !0));
}
function Di(e, t, n, s, r) {
  return Ni(Ae(e, t, n, s, r, !0));
}
function yn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Rt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Mi = ({ key: e }) => e ?? null,
  Nn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? ue(e) || fe(e) || $(e)
        ? { i: Oe, r: e, k: t, f: !!n }
        : e
      : null
  );
function Li(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === Le ? 0 : 1,
  i = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Mi(t),
    ref: t && Nn(t),
    scopeId: oi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Oe,
  };
  return (
    l
      ? (dr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= ue(n) ? 8 : 16),
    vn > 0 &&
      !i &&
      Pe &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Pe.push(c),
    c
  );
}
const Ae = Jc;
function Jc(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === pi) && (e = Qe), yn(e))) {
    const l = bt(e, t, !0);
    return (
      n && dr(l, n),
      vn > 0 &&
        !o &&
        Pe &&
        (l.shapeFlag & 6 ? (Pe[Pe.indexOf(e)] = l) : Pe.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((iu(e) && (e = e.__vccOpts), t)) {
    t = Yc(t);
    let { class: l, style: c } = t;
    (l && !ue(l) && (t.class = Qs(l)),
      re(c) && (ts(c) && !V(c) && (c = pe({}, c)), (t.style = Ys(c))));
  }
  const i = ue(e) ? 1 : Hn(e) ? 128 : lc(e) ? 64 : re(e) ? 4 : $(e) ? 2 : 0;
  return Li(e, t, n, s, r, i, o, !0);
}
function Yc(e) {
  return e ? (ts(e) || Si(e) ? pe({}, e) : e) : null;
}
function bt(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e,
    f = t ? Xc(r || {}, t) : r,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: f,
      key: f && Mi(f),
      ref:
        t && t.ref
          ? n && o
            ? V(o)
              ? o.concat(Nn(t))
              : [o, Nn(t)]
            : Nn(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Le ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && bt(e.ssContent),
      ssFallback: e.ssFallback && bt(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return (c && s && zt(u, c.clone(u)), u);
}
function Qc(e = ' ', t = 0) {
  return Ae(is, null, e, t);
}
function Ef(e, t) {
  const n = Ae(In, null, e);
  return ((n.staticCount = t), n);
}
function Sf(e = '', t = !1) {
  return t ? (Ii(), Di(Qe, null, e)) : Ae(Qe, null, e);
}
function qe(e) {
  return e == null || typeof e == 'boolean'
    ? Ae(Qe)
    : V(e)
      ? Ae(Le, null, e.slice())
      : yn(e)
        ? vt(e)
        : Ae(is, null, String(e));
}
function vt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : bt(e);
}
function dr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (V(t)) n = 16;
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), dr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Si(t)
        ? (t._ctx = Oe)
        : r === 3 &&
          Oe &&
          (Oe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    $(t)
      ? ((t = { default: t, _ctx: Oe }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Qc(t)])) : (n = 8));
  ((e.children = t), (e.shapeFlag |= n));
}
function Xc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === 'class')
        t.class !== s.class && (t.class = Qs([t.class, s.class]));
      else if (r === 'style') t.style = Ys([t.style, s.style]);
      else if (qn(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(V(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== '' && (t[r] = s[r]);
  }
  return t;
}
function Me(e, t, n, s = null) {
  je(e, t, 7, [n, s]);
}
const Zc = yi();
let eu = 0;
function tu(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Zc,
    o = {
      uid: eu++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Mo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ai(s, r),
      emitsOptions: _i(s, r),
      emit: null,
      emitted: null,
      propsDefaults: ie,
      inheritAttrs: s.inheritAttrs,
      ctx: ie,
      data: ie,
      props: ie,
      attrs: ie,
      slots: ie,
      refs: ie,
      setupState: ie,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
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
    (o.emit = Ic.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ye = null;
const ls = () => ye || Oe;
let Kn, Fs;
{
  const e = Xn(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (o) => {
          r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
        }
      );
    };
  ((Kn = t('__VUE_INSTANCE_SETTERS__', (n) => (ye = n))),
    (Fs = t('__VUE_SSR_SETTERS__', (n) => (_n = n))));
}
const An = (e) => {
    const t = ye;
    return (
      Kn(e),
      e.scope.on(),
      () => {
        (e.scope.off(), Kn(t));
      }
    );
  },
  Lr = () => {
    (ye && ye.scope.off(), Kn(null));
  };
function Fi(e) {
  return e.vnode.shapeFlag & 4;
}
let _n = !1;
function nu(e, t = !1, n = !1) {
  t && Fs(t);
  const { props: s, children: r } = e.vnode,
    o = Fi(e);
  (kc(e, s, o, t), Hc(e, r, n || t));
  const i = o ? su(e, t) : void 0;
  return (t && Fs(!1), i);
}
function su(e, t) {
  const n = e.type;
  ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Sc)));
  const { setup: s } = n;
  if (s) {
    it();
    const r = (e.setupContext = s.length > 1 ? ou(e) : null),
      o = An(e),
      i = Cn(s, e, 0, [e.props, r]),
      l = wo(i);
    if ((lt(), o(), (l || e.sp) && !Nt(e) && ui(e), l)) {
      if ((i.then(Lr, Lr), t))
        return i
          .then((c) => {
            Fr(e, c);
          })
          .catch((c) => {
            ns(c, e, 0);
          });
      e.asyncDep = i;
    } else Fr(e, i);
  } else ki(e);
}
function Fr(e, t, n) {
  ($(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : re(t) && (e.setupState = ei(t)),
    ki(e));
}
function ki(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || ze);
  {
    const r = An(e);
    it();
    try {
      Cc(e);
    } finally {
      (lt(), r());
    }
  }
}
const ru = {
  get(e, t) {
    return (ve(e, 'get', ''), e[t]);
  },
};
function ou(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ru),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function cs(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(ei(rr(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in an) return an[n](e);
          },
          has(t, n) {
            return n in t || n in an;
          },
        }))
    : e.proxy;
}
function ks(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function iu(e) {
  return $(e) && '__vccOpts' in e;
}
const Ce = (e, t) => Jl(e, t, _n);
function Vi(e, t, n) {
  try {
    Un(-1);
    const s = arguments.length;
    return s === 2
      ? re(t) && !V(t)
        ? yn(t)
          ? Ae(e, null, [t])
          : Ae(e, t)
        : Ae(e, null, t)
      : (s > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : s === 3 && yn(n) && (n = [n]),
        Ae(e, t, n));
  } finally {
    Un(1);
  }
}
const lu = '3.5.26';
/**
 * @vue/runtime-dom v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Vs;
const kr = typeof window < 'u' && window.trustedTypes;
if (kr)
  try {
    Vs = kr.createPolicy('vue', { createHTML: (e) => e });
  } catch {}
const ji = Vs ? (e) => Vs.createHTML(e) : (e) => e,
  cu = 'http://www.w3.org/2000/svg',
  uu = 'http://www.w3.org/1998/Math/MathML',
  tt = typeof document < 'u' ? document : null,
  Vr = tt && tt.createElement('template'),
  au = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === 'svg'
          ? tt.createElementNS(cu, e)
          : t === 'mathml'
            ? tt.createElementNS(uu, e)
            : n
              ? tt.createElement(e, { is: n })
              : tt.createElement(e);
      return (
        e === 'select' &&
          s &&
          s.multiple != null &&
          r.setAttribute('multiple', s.multiple),
        r
      );
    },
    createText: (e) => tt.createTextNode(e),
    createComment: (e) => tt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => tt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));
        );
      else {
        Vr.innerHTML = ji(
          s === 'svg'
            ? `<svg>${e}</svg>`
            : s === 'mathml'
              ? `<math>${e}</math>`
              : e,
        );
        const l = Vr.content;
        if (s === 'svg' || s === 'mathml') {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  ft = 'transition',
  tn = 'animation',
  Jt = Symbol('_vtc'),
  Bi = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  fu = pe({}, uc, Bi),
  At = (e, t = []) => {
    V(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  jr = (e) => (e ? (V(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function du(e) {
  const t = {};
  for (const D in e) D in Bi || (t[D] = e[D]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: s,
      duration: r,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = o,
      appearActiveClass: f = i,
      appearToClass: u = l,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: p = `${n}-leave-active`,
      leaveToClass: m = `${n}-leave-to`,
    } = e,
    v = hu(r),
    w = v && v[0],
    L = v && v[1],
    {
      onBeforeEnter: I,
      onEnter: E,
      onEnterCancelled: x,
      onLeave: S,
      onLeaveCancelled: F,
      onBeforeAppear: z = I,
      onAppear: W = E,
      onAppearCancelled: U = x,
    } = t,
    P = (D, Y, de, _e) => {
      ((D._enterCancelled = _e),
        ht(D, Y ? u : l),
        ht(D, Y ? f : i),
        de && de());
    },
    K = (D, Y) => {
      ((D._isLeaving = !1), ht(D, d), ht(D, m), ht(D, p), Y && Y());
    },
    J = (D) => (Y, de) => {
      const _e = D ? W : E,
        oe = () => P(Y, D, de);
      (At(_e, [Y, oe]),
        Br(() => {
          (ht(Y, D ? c : o), Ge(Y, D ? u : l), jr(_e) || Hr(Y, s, w, oe));
        }));
    };
  return pe(t, {
    onBeforeEnter(D) {
      (At(I, [D]), Ge(D, o), Ge(D, i));
    },
    onBeforeAppear(D) {
      (At(z, [D]), Ge(D, c), Ge(D, f));
    },
    onEnter: J(!1),
    onAppear: J(!0),
    onLeave(D, Y) {
      D._isLeaving = !0;
      const de = () => K(D, Y);
      (Ge(D, d),
        D._enterCancelled ? (Ge(D, p), js(D)) : (js(D), Ge(D, p)),
        Br(() => {
          D._isLeaving && (ht(D, d), Ge(D, m), jr(S) || Hr(D, s, L, de));
        }),
        At(S, [D, de]));
    },
    onEnterCancelled(D) {
      (P(D, !1, void 0, !0), At(x, [D]));
    },
    onAppearCancelled(D) {
      (P(D, !0, void 0, !0), At(U, [D]));
    },
    onLeaveCancelled(D) {
      (K(D), At(F, [D]));
    },
  });
}
function hu(e) {
  if (e == null) return null;
  if (re(e)) return [_s(e.enter), _s(e.leave)];
  {
    const t = _s(e);
    return [t, t];
  }
}
function _s(e) {
  return pl(e);
}
function Ge(e, t) {
  (t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[Jt] || (e[Jt] = new Set())).add(t));
}
function ht(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[Jt];
  n && (n.delete(t), n.size || (e[Jt] = void 0));
}
function Br(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let pu = 0;
function Hr(e, t, n, s) {
  const r = (e._endId = ++pu),
    o = () => {
      r === e._endId && s();
    };
  if (n != null) return setTimeout(o, n);
  const { type: i, timeout: l, propCount: c } = Hi(e, t);
  if (!i) return s();
  const f = i + 'end';
  let u = 0;
  const d = () => {
      (e.removeEventListener(f, p), o());
    },
    p = (m) => {
      m.target === e && ++u >= c && d();
    };
  (setTimeout(() => {
    u < c && d();
  }, l + 1),
    e.addEventListener(f, p));
}
function Hi(e, t) {
  const n = window.getComputedStyle(e),
    s = (v) => (n[v] || '').split(', '),
    r = s(`${ft}Delay`),
    o = s(`${ft}Duration`),
    i = Ur(r, o),
    l = s(`${tn}Delay`),
    c = s(`${tn}Duration`),
    f = Ur(l, c);
  let u = null,
    d = 0,
    p = 0;
  t === ft
    ? i > 0 && ((u = ft), (d = i), (p = o.length))
    : t === tn
      ? f > 0 && ((u = tn), (d = f), (p = c.length))
      : ((d = Math.max(i, f)),
        (u = d > 0 ? (i > f ? ft : tn) : null),
        (p = u ? (u === ft ? o.length : c.length) : 0));
  const m =
    u === ft &&
    /\b(?:transform|all)(?:,|$)/.test(s(`${ft}Property`).toString());
  return { type: u, timeout: d, propCount: p, hasTransform: m };
}
function Ur(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => Kr(n) + Kr(e[s])));
}
function Kr(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function js(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function gu(e, t, n) {
  const s = e[Jt];
  (s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
        ? e.setAttribute('class', t)
        : (e.className = t));
}
const Wr = Symbol('_vod'),
  mu = Symbol('_vsh'),
  vu = Symbol(''),
  yu = /(?:^|;)\s*display\s*:/;
function _u(e, t, n) {
  const s = e.style,
    r = ue(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (ue(t))
        for (const i of t.split(';')) {
          const l = i.slice(0, i.indexOf(':')).trim();
          n[l] == null && Dn(s, l, '');
        }
      else for (const i in t) n[i] == null && Dn(s, i, '');
    for (const i in n) (i === 'display' && (o = !0), Dn(s, i, n[i]));
  } else if (r) {
    if (t !== n) {
      const i = s[vu];
      (i && (n += ';' + i), (s.cssText = n), (o = yu.test(n)));
    }
  } else t && e.removeAttribute('style');
  Wr in e && ((e[Wr] = o ? s.display : ''), e[mu] && (s.display = 'none'));
}
const Gr = /\s*!important$/;
function Dn(e, t, n) {
  if (V(n)) n.forEach((s) => Dn(e, t, s));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const s = bu(e, t);
    Gr.test(n)
      ? e.setProperty(Mt(s), n.replace(Gr, ''), 'important')
      : (e[s] = n);
  }
}
const $r = ['Webkit', 'Moz', 'ms'],
  bs = {};
function bu(e, t) {
  const n = bs[t];
  if (n) return n;
  let s = Fe(t);
  if (s !== 'filter' && s in e) return (bs[t] = s);
  s = Qn(s);
  for (let r = 0; r < $r.length; r++) {
    const o = $r[r] + s;
    if (o in e) return (bs[t] = o);
  }
  return t;
}
const qr = 'http://www.w3.org/1999/xlink';
function zr(e, t, n, s, r, o = bl(t)) {
  s && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(qr, t.slice(6, t.length))
      : e.setAttributeNS(qr, t, n)
    : n == null || (o && !Po(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? '' : Ye(n) ? String(n) : n);
}
function Jr(e, t, n, s, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? ji(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === 'value' && o !== 'PROGRESS' && !o.includes('-')) {
    const l = o === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
    ((l !== c || !('_value' in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n));
    return;
  }
  let i = !1;
  if (n === '' || n == null) {
    const l = typeof e[t];
    l === 'boolean'
      ? (n = Po(n))
      : n == null && l === 'string'
        ? ((n = ''), (i = !0))
        : l === 'number' && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(r || t);
}
function Tt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Eu(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Yr = Symbol('_vei');
function Su(e, t, n, s, r = null) {
  const o = e[Yr] || (e[Yr] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = Cu(t);
    if (s) {
      const f = (o[t] = wu(s, r));
      Tt(e, l, f, c);
    } else i && (Eu(e, l, i, c), (o[t] = void 0));
  }
}
const Qr = /(?:Once|Passive|Capture)$/;
function Cu(e) {
  let t;
  if (Qr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Qr)); )
      ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
  }
  return [e[2] === ':' ? e.slice(3) : Mt(e.slice(2)), t];
}
let Es = 0;
const Au = Promise.resolve(),
  xu = () => Es || (Au.then(() => (Es = 0)), (Es = Date.now()));
function wu(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    je(Ru(s, n.value), t, 5, [s]);
  };
  return ((n.value = e), (n.attached = xu()), n);
}
function Ru(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        (n.call(e), (e._stopped = !0));
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const Xr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Tu = (e, t, n, s, r, o) => {
    const i = r === 'svg';
    t === 'class'
      ? gu(e, s, i)
      : t === 'style'
        ? _u(e, n, s)
        : qn(t)
          ? qs(t) || Su(e, t, n, s, o)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Ou(e, t, s, i)
              )
            ? (Jr(e, t, s),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                zr(e, t, s, i, o, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !ue(s))
              ? Jr(e, Fe(t), s, o, t)
              : (t === 'true-value'
                  ? (e._trueValue = s)
                  : t === 'false-value' && (e._falseValue = s),
                zr(e, t, s, i));
  };
function Ou(e, t, n, s) {
  if (s)
    return !!(
      t === 'innerHTML' ||
      t === 'textContent' ||
      (t in e && Xr(t) && $(n))
    );
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'autocorrect' ||
    (t === 'sandbox' && e.tagName === 'IFRAME') ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1;
  if (t === 'width' || t === 'height') {
    const r = e.tagName;
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE')
      return !1;
  }
  return Xr(t) && ue(n) ? !1 : t in e;
}
const Ui = new WeakMap(),
  Ki = new WeakMap(),
  Wn = Symbol('_moveCb'),
  Zr = Symbol('_enterCb'),
  Pu = (e) => (delete e.props.mode, e),
  Iu = Pu({
    name: 'TransitionGroup',
    props: pe({}, fu, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = ls(),
        s = cc();
      let r, o;
      return (
        cr(() => {
          if (!r.length) return;
          const i = e.moveClass || `${e.name || 'v'}-move`;
          if (!Lu(r[0].el, n.vnode.el, i)) {
            r = [];
            return;
          }
          (r.forEach(Nu), r.forEach(Du));
          const l = r.filter(Mu);
          (js(n.vnode.el),
            l.forEach((c) => {
              const f = c.el,
                u = f.style;
              (Ge(f, i),
                (u.transform = u.webkitTransform = u.transitionDuration = ''));
              const d = (f[Wn] = (p) => {
                (p && p.target !== f) ||
                  ((!p || p.propertyName.endsWith('transform')) &&
                    (f.removeEventListener('transitionend', d),
                    (f[Wn] = null),
                    ht(f, i)));
              });
              f.addEventListener('transitionend', d);
            }),
            (r = []));
        }),
        () => {
          const i = Z(e),
            l = du(i);
          let c = i.tag || Le;
          if (((r = []), o))
            for (let f = 0; f < o.length; f++) {
              const u = o[f];
              u.el &&
                u.el instanceof Element &&
                (r.push(u),
                zt(u, Is(u, l, s, n)),
                Ui.set(u, { left: u.el.offsetLeft, top: u.el.offsetTop }));
            }
          o = t.default ? ci(t.default()) : [];
          for (let f = 0; f < o.length; f++) {
            const u = o[f];
            u.key != null && zt(u, Is(u, l, s, n));
          }
          return Ae(c, null, o);
        }
      );
    },
  }),
  Cf = Iu;
function Nu(e) {
  const t = e.el;
  (t[Wn] && t[Wn](), t[Zr] && t[Zr]());
}
function Du(e) {
  Ki.set(e, { left: e.el.offsetLeft, top: e.el.offsetTop });
}
function Mu(e) {
  const t = Ui.get(e),
    n = Ki.get(e),
    s = t.left - n.left,
    r = t.top - n.top;
  if (s || r) {
    const o = e.el.style;
    return (
      (o.transform = o.webkitTransform = `translate(${s}px,${r}px)`),
      (o.transitionDuration = '0s'),
      e
    );
  }
}
function Lu(e, t, n) {
  const s = e.cloneNode(),
    r = e[Jt];
  (r &&
    r.forEach((l) => {
      l.split(/\s+/).forEach((c) => c && s.classList.remove(c));
    }),
    n.split(/\s+/).forEach((l) => l && s.classList.add(l)),
    (s.style.display = 'none'));
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(s);
  const { hasTransform: i } = Hi(s);
  return (o.removeChild(s), i);
}
const Gn = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1;
  return V(t) ? (n) => Kt(t, n) : t;
};
function Fu(e) {
  e.target.composing = !0;
}
function eo(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const $t = Symbol('_assign');
function to(e, t, n) {
  return (t && (e = e.trim()), n && (e = Js(e)), e);
}
const Af = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e[$t] = Gn(r);
      const o = s || (r.props && r.props.type === 'number');
      (Tt(e, t ? 'change' : 'input', (i) => {
        i.target.composing || e[$t](to(e.value, n, o));
      }),
        (n || o) &&
          Tt(e, 'change', () => {
            e.value = to(e.value, n, o);
          }),
        t ||
          (Tt(e, 'compositionstart', Fu),
          Tt(e, 'compositionend', eo),
          Tt(e, 'change', eo)));
    },
    mounted(e, { value: t }) {
      e.value = t ?? '';
    },
    beforeUpdate(
      e,
      { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: o } },
      i,
    ) {
      if (((e[$t] = Gn(i)), e.composing)) return;
      const l =
          (o || e.type === 'number') && !/^0\d/.test(e.value)
            ? Js(e.value)
            : e.value,
        c = t ?? '';
      l !== c &&
        ((document.activeElement === e &&
          e.type !== 'range' &&
          ((s && t === n) || (r && e.value.trim() === c))) ||
          (e.value = c));
    },
  },
  xf = {
    deep: !0,
    created(e, t, n) {
      ((e[$t] = Gn(n)),
        Tt(e, 'change', () => {
          const s = e._modelValue,
            r = ku(e),
            o = e.checked,
            i = e[$t];
          if (V(s)) {
            const l = Io(s, r),
              c = l !== -1;
            if (o && !c) i(s.concat(r));
            else if (!o && c) {
              const f = [...s];
              (f.splice(l, 1), i(f));
            }
          } else if (zn(s)) {
            const l = new Set(s);
            (o ? l.add(r) : l.delete(r), i(l));
          } else i(Wi(e, o));
        }));
    },
    mounted: no,
    beforeUpdate(e, t, n) {
      ((e[$t] = Gn(n)), no(e, t, n));
    },
  };
function no(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let r;
  if (V(t)) r = Io(t, s.props.value) > -1;
  else if (zn(t)) r = t.has(s.props.value);
  else {
    if (t === n) return;
    r = Zn(t, Wi(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
function ku(e) {
  return '_value' in e ? e._value : e.value;
}
function Wi(e, t) {
  const n = t ? '_trueValue' : '_falseValue';
  return n in e ? e[n] : t;
}
const Vu = pe({ patchProp: Tu }, au);
let so;
function ju() {
  return so || (so = Kc(Vu));
}
const Bu = (...e) => {
  const t = ju().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Uu(s);
      if (!r) return;
      const o = t._component;
      (!$(o) && !o.render && !o.template && (o.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = ''));
      const i = n(r, !1, Hu(r));
      return (
        r instanceof Element &&
          (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
        i
      );
    }),
    t
  );
};
function Hu(e) {
  if (e instanceof SVGElement) return 'svg';
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
    return 'mathml';
}
function Uu(e) {
  return ue(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ let Gi;
const us = (e) => (Gi = e),
  $i = Symbol();
function Bs(e) {
  return (
    e &&
    typeof e == 'object' &&
    Object.prototype.toString.call(e) === '[object Object]' &&
    typeof e.toJSON != 'function'
  );
}
var dn;
(function (e) {
  ((e.direct = 'direct'),
    (e.patchObject = 'patch object'),
    (e.patchFunction = 'patch function'));
})(dn || (dn = {}));
function Ku() {
  const e = Lo(!0),
    t = e.run(() => nt({}));
  let n = [],
    s = [];
  const r = rr({
    install(o) {
      (us(r),
        (r._a = o),
        o.provide($i, r),
        (o.config.globalProperties.$pinia = r),
        s.forEach((i) => n.push(i)),
        (s = []));
    },
    use(o) {
      return (this._a ? n.push(o) : s.push(o), this);
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return r;
}
const qi = () => {};
function ro(e, t, n, s = qi) {
  e.add(t);
  const r = () => {
    e.delete(t) && s();
  };
  return (!n && Fo() && Cl(r), r);
}
function Vt(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const Wu = (e) => e(),
  oo = Symbol(),
  Ss = Symbol();
function Hs(e, t) {
  e instanceof Map && t instanceof Map
    ? t.forEach((n, s) => e.set(s, n))
    : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n],
      r = e[n];
    Bs(r) && Bs(s) && e.hasOwnProperty(n) && !fe(s) && !ot(s)
      ? (e[n] = Hs(r, s))
      : (e[n] = s);
  }
  return e;
}
const Gu = Symbol();
function $u(e) {
  return !Bs(e) || !Object.prototype.hasOwnProperty.call(e, Gu);
}
const { assign: pt } = Object;
function qu(e) {
  return !!(fe(e) && e.effect);
}
function zu(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t,
    l = n.state.value[e];
  let c;
  function f() {
    l || (n.state.value[e] = r ? r() : {});
    const u = Gl(n.state.value[e]);
    return pt(
      u,
      o,
      Object.keys(i || {}).reduce(
        (d, p) => (
          (d[p] = rr(
            Ce(() => {
              us(n);
              const m = n._s.get(e);
              return i[p].call(m, m);
            }),
          )),
          d
        ),
        {},
      ),
    );
  }
  return ((c = zi(e, f, t, n, s, !0)), c);
}
function zi(e, t, n = {}, s, r, o) {
  let i;
  const l = pt({ actions: {} }, n),
    c = { deep: !0 };
  let f,
    u,
    d = new Set(),
    p = new Set(),
    m;
  const v = s.state.value[e];
  (!o && !v && (s.state.value[e] = {}), nt({}));
  let w;
  function L(U) {
    let P;
    ((f = u = !1),
      typeof U == 'function'
        ? (U(s.state.value[e]),
          (P = { type: dn.patchFunction, storeId: e, events: m }))
        : (Hs(s.state.value[e], U),
          (P = { type: dn.patchObject, payload: U, storeId: e, events: m })));
    const K = (w = Symbol());
    (or().then(() => {
      w === K && (f = !0);
    }),
      (u = !0),
      Vt(d, P, s.state.value[e]));
  }
  const I = o
    ? function () {
        const { state: P } = n,
          K = P ? P() : {};
        this.$patch((J) => {
          pt(J, K);
        });
      }
    : qi;
  function E() {
    (i.stop(), d.clear(), p.clear(), s._s.delete(e));
  }
  const x = (U, P = '') => {
      if (oo in U) return ((U[Ss] = P), U);
      const K = function () {
        us(s);
        const J = Array.from(arguments),
          D = new Set(),
          Y = new Set();
        function de(q) {
          D.add(q);
        }
        function _e(q) {
          Y.add(q);
        }
        Vt(p, { args: J, name: K[Ss], store: F, after: de, onError: _e });
        let oe;
        try {
          oe = U.apply(this && this.$id === e ? this : F, J);
        } catch (q) {
          throw (Vt(Y, q), q);
        }
        return oe instanceof Promise
          ? oe
              .then((q) => (Vt(D, q), q))
              .catch((q) => (Vt(Y, q), Promise.reject(q)))
          : (Vt(D, oe), oe);
      };
      return ((K[oo] = !0), (K[Ss] = P), K);
    },
    S = {
      _p: s,
      $id: e,
      $onAction: ro.bind(null, p),
      $patch: L,
      $reset: I,
      $subscribe(U, P = {}) {
        const K = ro(d, U, P.detached, () => J()),
          J = i.run(() =>
            Gt(
              () => s.state.value[e],
              (D) => {
                (P.flush === 'sync' ? u : f) &&
                  U({ storeId: e, type: dn.direct, events: m }, D);
              },
              pt({}, c, P),
            ),
          );
        return K;
      },
      $dispose: E,
    },
    F = Sn(S);
  s._s.set(e, F);
  const W = ((s._a && s._a.runWithContext) || Wu)(() =>
    s._e.run(() => (i = Lo()).run(() => t({ action: x }))),
  );
  for (const U in W) {
    const P = W[U];
    if ((fe(P) && !qu(P)) || ot(P))
      o ||
        (v && $u(P) && (fe(P) ? (P.value = v[U]) : Hs(P, v[U])),
        (s.state.value[e][U] = P));
    else if (typeof P == 'function') {
      const K = x(P, U);
      ((W[U] = K), (l.actions[U] = P));
    }
  }
  return (
    pt(F, W),
    pt(Z(F), W),
    Object.defineProperty(F, '$state', {
      get: () => s.state.value[e],
      set: (U) => {
        L((P) => {
          pt(P, U);
        });
      },
    }),
    s._p.forEach((U) => {
      pt(
        F,
        i.run(() => U({ store: F, app: s._a, pinia: s, options: l })),
      );
    }),
    v && o && n.hydrate && n.hydrate(F.$state, v),
    (f = !0),
    (u = !0),
    F
  );
}
/*! #__NO_SIDE_EFFECTS__ */ function Ju(e, t, n) {
  let s;
  const r = typeof t == 'function';
  s = r ? n : t;
  function o(i, l) {
    const c = nc();
    return (
      (i = i || (c ? Je($i, null) : null)),
      i && us(i),
      (i = Gi),
      i._s.has(e) || (r ? zi(e, t, s, i) : zu(e, s, i)),
      i._s.get(e)
    );
  }
  return ((o.$id = e), o);
}
const Yu = Ju('analytics', () => {
    const e = Xo({}),
      t = nt({ totalActiveTime: 0, totalIdleTime: 0 }),
      n = nt({ active: 0, idle: 0 }),
      s = nt(''),
      r = nt(void 0),
      o = nt(!1),
      i = nt(!0);
    function l(v) {
      switch (v.type) {
        case 'initialData':
          (c(v.data), (i.value = !1));
          break;
        case 'workspaceData':
          (console.log('[Store] Received workspaceData:', v.data.buckets),
            (e.value = v.data.buckets));
          break;
        case 'globalStats':
          n.value = v.stats;
          break;
        case 'updateBucket':
          f(v.bucketKey, v.value);
          break;
        case 'newBucket':
          f(v.bucketKey, v.value);
          break;
        case 'deleteBucket':
          u(v.bucketKey);
          break;
        case 'error':
          r.value = v.reason;
          break;
      }
    }
    function c(v) {
      (console.log('[Store] Setting initial data:', v),
        (e.value = v.buckets),
        (t.value = {
          totalActiveTime: v.projectTotals.active,
          totalIdleTime: v.projectTotals.idle,
        }),
        (n.value = v.globalStats),
        (s.value = v.workspaceName),
        (r.value = v.error),
        (o.value = !0));
    }
    function f(v, w) {
      const L = typeof w == 'string' ? JSON.parse(w) : w;
      e.value = { ...e.value, [v]: L };
    }
    function u(v) {
      const w = { ...e.value };
      (delete w[v], (e.value = w));
    }
    const d = Ce(() => {
        const v = new Date(),
          w = String(v.getDate()).padStart(2, '0'),
          L = String(v.getMonth() + 1).padStart(2, '0'),
          I = v.getFullYear();
        return `${w}-${L}-${I}`;
      }),
      p = Ce(() => {
        const v = d.value,
          w = {};
        for (const [L, I] of Object.entries(e.value))
          L.startsWith(v) && (w[L] = I);
        return w;
      }),
      m = Ce(() => {
        const v = d.value;
        (console.log('[Store] Computing daily summary for date:', v),
          console.log(
            '[Store] Total buckets count:',
            Object.keys(e.value).length,
          ));
        let w = 0,
          L = 0,
          I = 0;
        const E = [],
          x = p.value;
        console.log('[Store] Today buckets count:', Object.keys(x).length);
        for (const [S, F] of Object.entries(x)) {
          ((w += F.active || 0), (L += F.idle || 0), I++);
          const W = S.split(',').slice(3).join(',');
          E.push({ path: W, active: F.active || 0, idle: F.idle || 0 });
        }
        return (
          E.sort((S, F) => F.active - S.active),
          { active: w, idle: L, fileCount: I, files: E }
        );
      });
    return {
      buckets: e,
      projectTotals: t,
      globalStats: n,
      workspaceName: s,
      error: r,
      isReady: o,
      loading: i,
      handleMessage: l,
      dailySummary: m,
    };
  }),
  hr = new Date(),
  Ji = 1440 * 60 * 1e3;
function pr(e) {
  const t = String(e.getDate()).padStart(2, '0'),
    n = String(e.getMonth() + 1).padStart(2, '0'),
    s = e.getFullYear();
  return `${t}-${n}-${s}`;
}
const $n = (e, t, n = 'user', s = 'main') => `${e},${n},${s},${t}`,
  bn = {},
  Qu = ['alice', 'bob', 'charlie'],
  io = ['src/core/auth.ts', 'src/core/db.ts', 'src/core/api.ts'];
for (let e = 0; e < 7; e++) {
  const t = new Date(hr.getTime() - e * Ji),
    n = pr(t);
  (Qu.forEach((s) => {
    if (Math.random() > 0.3) {
      const r = io[Math.floor(Math.random() * io.length)] || 'src/unknown.ts',
        o = Math.floor(Math.random() * 60 * 60 * 1e3),
        i = Math.floor(Math.random() * 15 * 60 * 1e3);
      bn[$n(n, r, s, 'feature/team-collab')] = { active: o, idle: i };
    }
  }),
    e < 3 &&
      (bn[$n(n, 'README.md', 'alice', 'main')] = { active: 3e5, idle: 6e4 }));
}
const Xu = ['src/ui/Button.vue', 'src/ui/Modal.vue', 'src/App.vue'];
Xu.forEach((e) => {
  bn[$n(pr(hr), e, 'dave', 'feature/new-ui')] = {
    active: 7200 * 1e3,
    idle: 600 * 1e3,
  };
});
const Zu = new Date(hr.getTime() - 25 * Ji);
bn[$n(pr(Zu), 'legacy/script.js', 'alice', 'legacy')] = {
  active: 5e6,
  idle: 2e5,
};
const ea = { buckets: bn },
  ta = {
    projectTotals: { active: 0, idle: 0 },
    buckets: ea.buckets,
    globalStats: { active: 0, idle: 0 },
    workspaceName: 'Mock Multi-User Workspace',
  },
  na = lr({
    __name: 'App',
    setup(e) {
      return (
        rs(() => {
          'acquireVsCodeApi' in window ||
            (console.log('Detected browser environment, loading mock data...'),
            Yu().handleMessage({ type: 'initialData', data: ta }));
        }),
        (t, n) => {
          const s = Ec('RouterView');
          return (Ii(), Di(s));
        }
      );
    },
  });
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ const Bt = typeof document < 'u';
function Yi(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function sa(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === 'Module' ||
    (e.default && Yi(e.default))
  );
}
const te = Object.assign;
function Cs(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Be(r) ? r.map(e) : e(r);
  }
  return n;
}
const hn = () => {},
  Be = Array.isArray;
function lo(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const Qi = /#/g,
  ra = /&/g,
  oa = /\//g,
  ia = /=/g,
  la = /\?/g,
  Xi = /\+/g,
  ca = /%5B/g,
  ua = /%5D/g,
  Zi = /%5E/g,
  aa = /%60/g,
  el = /%7B/g,
  fa = /%7C/g,
  tl = /%7D/g,
  da = /%20/g;
function gr(e) {
  return e == null
    ? ''
    : encodeURI('' + e)
        .replace(fa, '|')
        .replace(ca, '[')
        .replace(ua, ']');
}
function ha(e) {
  return gr(e).replace(el, '{').replace(tl, '}').replace(Zi, '^');
}
function Us(e) {
  return gr(e)
    .replace(Xi, '%2B')
    .replace(da, '+')
    .replace(Qi, '%23')
    .replace(ra, '%26')
    .replace(aa, '`')
    .replace(el, '{')
    .replace(tl, '}')
    .replace(Zi, '^');
}
function pa(e) {
  return Us(e).replace(ia, '%3D');
}
function ga(e) {
  return gr(e).replace(Qi, '%23').replace(la, '%3F');
}
function ma(e) {
  return ga(e).replace(oa, '%2F');
}
function En(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
const va = /\/$/,
  ya = (e) => e.replace(va, '');
function As(e, t, n = '/') {
  let s,
    r = {},
    o = '',
    i = '';
  const l = t.indexOf('#');
  let c = t.indexOf('?');
  return (
    (c = l >= 0 && c > l ? -1 : c),
    c >= 0 &&
      ((s = t.slice(0, c)),
      (o = t.slice(c, l > 0 ? l : t.length)),
      (r = e(o.slice(1)))),
    l >= 0 && ((s = s || t.slice(0, l)), (i = t.slice(l, t.length))),
    (s = Sa(s ?? t, n)),
    { fullPath: s + o + i, path: s, query: r, hash: En(i) }
  );
}
function _a(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function co(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function ba(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    Yt(t.matched[s], n.matched[r]) &&
    nl(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Yt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function nl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Ea(e[n], t[n])) return !1;
  return !0;
}
function Ea(e, t) {
  return Be(e)
    ? uo(e, t)
    : Be(t)
      ? uo(t, e)
      : (e == null ? void 0 : e.valueOf()) ===
        (t == null ? void 0 : t.valueOf());
}
function uo(e, t) {
  return Be(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function Sa(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    s = e.split('/'),
    r = s[s.length - 1];
  (r === '..' || r === '.') && s.push('');
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < s.length; i++)
    if (((l = s[i]), l !== '.'))
      if (l === '..') o > 1 && o--;
      else break;
  return n.slice(0, o).join('/') + '/' + s.slice(i).join('/');
}
const dt = {
  path: '/',
  name: void 0,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
let Ks = (function (e) {
    return ((e.pop = 'pop'), (e.push = 'push'), e);
  })({}),
  xs = (function (e) {
    return ((e.back = 'back'), (e.forward = 'forward'), (e.unknown = ''), e);
  })({});
function Ca(e) {
  if (!e)
    if (Bt) {
      const t = document.querySelector('base');
      ((e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, '')));
    } else e = '/';
  return (e[0] !== '/' && e[0] !== '#' && (e = '/' + e), ya(e));
}
const Aa = /^[^#]+#/;
function xa(e, t) {
  return e.replace(Aa, '#') + t;
}
function wa(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const as = () => ({ left: window.scrollX, top: window.scrollY });
function Ra(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      s = typeof n == 'string' && n.startsWith('#'),
      r =
        typeof n == 'string'
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = wa(r, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      );
}
function ao(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ws = new Map();
function Ta(e, t) {
  Ws.set(e, t);
}
function Oa(e) {
  const t = Ws.get(e);
  return (Ws.delete(e), t);
}
function Pa(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function sl(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
let ae = (function (e) {
  return (
    (e[(e.MATCHER_NOT_FOUND = 1)] = 'MATCHER_NOT_FOUND'),
    (e[(e.NAVIGATION_GUARD_REDIRECT = 2)] = 'NAVIGATION_GUARD_REDIRECT'),
    (e[(e.NAVIGATION_ABORTED = 4)] = 'NAVIGATION_ABORTED'),
    (e[(e.NAVIGATION_CANCELLED = 8)] = 'NAVIGATION_CANCELLED'),
    (e[(e.NAVIGATION_DUPLICATED = 16)] = 'NAVIGATION_DUPLICATED'),
    e
  );
})({});
const rl = Symbol('');
(ae.MATCHER_NOT_FOUND + '',
  ae.NAVIGATION_GUARD_REDIRECT + '',
  ae.NAVIGATION_ABORTED + '',
  ae.NAVIGATION_CANCELLED + '',
  ae.NAVIGATION_DUPLICATED + '');
function Qt(e, t) {
  return te(new Error(), { type: e, [rl]: !0 }, t);
}
function et(e, t) {
  return e instanceof Error && rl in e && (t == null || !!(e.type & t));
}
const Ia = ['params', 'query', 'hash'];
function Na(e) {
  if (typeof e == 'string') return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Ia) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function Da(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const n = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(Xi, ' '),
      o = r.indexOf('='),
      i = En(o < 0 ? r : r.slice(0, o)),
      l = o < 0 ? null : En(r.slice(o + 1));
    if (i in t) {
      let c = t[i];
      (Be(c) || (c = t[i] = [c]), c.push(l));
    } else t[i] = l;
  }
  return t;
}
function fo(e) {
  let t = '';
  for (let n in e) {
    const s = e[n];
    if (((n = pa(n)), s == null)) {
      s !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (Be(s) ? s.map((r) => r && Us(r)) : [s && Us(s)]).forEach((r) => {
      r !== void 0 &&
        ((t += (t.length ? '&' : '') + n), r != null && (t += '=' + r));
    });
  }
  return t;
}
function Ma(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = Be(s)
        ? s.map((r) => (r == null ? null : '' + r))
        : s == null
          ? s
          : '' + s);
  }
  return t;
}
const La = Symbol(''),
  ho = Symbol(''),
  mr = Symbol(''),
  ol = Symbol(''),
  Gs = Symbol('');
function nn() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function yt(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((l, c) => {
      const f = (p) => {
          p === !1
            ? c(Qt(ae.NAVIGATION_ABORTED, { from: n, to: t }))
            : p instanceof Error
              ? c(p)
              : Pa(p)
                ? c(Qt(ae.NAVIGATION_GUARD_REDIRECT, { from: t, to: p }))
                : (i &&
                    s.enterCallbacks[r] === i &&
                    typeof p == 'function' &&
                    i.push(p),
                  l());
        },
        u = o(() => e.call(s && s.instances[r], t, n, f));
      let d = Promise.resolve(u);
      (e.length < 3 && (d = d.then(f)), d.catch((p) => c(p)));
    });
}
function ws(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== 'beforeRouteEnter' && !i.instances[l]))
        if (Yi(c)) {
          const f = (c.__vccOpts || c)[t];
          f && o.push(yt(f, n, s, i, l, r));
        } else {
          let f = c();
          o.push(() =>
            f.then((u) => {
              if (!u)
                throw new Error(
                  `Couldn't resolve component "${l}" at "${i.path}"`,
                );
              const d = sa(u) ? u.default : u;
              ((i.mods[l] = u), (i.components[l] = d));
              const p = (d.__vccOpts || d)[t];
              return p && yt(p, n, s, i, l, r)();
            }),
          );
        }
    }
  return o;
}
function Fa(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((f) => Yt(f, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((f) => Yt(f, c)) || r.push(c));
  }
  return [n, s, r];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ let ka = () => location.protocol + '//' + location.host;
function il(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf('#');
  if (o > -1) {
    let i = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = r.slice(i);
    return (l[0] !== '/' && (l = '/' + l), co(l, ''));
  }
  return co(n, e) + s + r;
}
function Va(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const l = ({ state: p }) => {
    const m = il(e, location),
      v = n.value,
      w = t.value;
    let L = 0;
    if (p) {
      if (((n.value = m), (t.value = p), i && i === v)) {
        i = null;
        return;
      }
      L = w ? p.position - w.position : 0;
    } else s(m);
    r.forEach((I) => {
      I(n.value, v, {
        delta: L,
        type: Ks.pop,
        direction: L ? (L > 0 ? xs.forward : xs.back) : xs.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function f(p) {
    r.push(p);
    const m = () => {
      const v = r.indexOf(p);
      v > -1 && r.splice(v, 1);
    };
    return (o.push(m), m);
  }
  function u() {
    if (document.visibilityState === 'hidden') {
      const { history: p } = window;
      if (!p.state) return;
      p.replaceState(te({}, p.state, { scroll: as() }), '');
    }
  }
  function d() {
    for (const p of o) p();
    ((o = []),
      window.removeEventListener('popstate', l),
      window.removeEventListener('pagehide', u),
      document.removeEventListener('visibilitychange', u));
  }
  return (
    window.addEventListener('popstate', l),
    window.addEventListener('pagehide', u),
    document.addEventListener('visibilitychange', u),
    { pauseListeners: c, listen: f, destroy: d }
  );
}
function po(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? as() : null,
  };
}
function ja(e) {
  const { history: t, location: n } = window,
    s = { value: il(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(c, f, u) {
    const d = e.indexOf('#'),
      p =
        d > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(d)) + c
          : ka() + e + c;
    try {
      (t[u ? 'replaceState' : 'pushState'](f, '', p), (r.value = f));
    } catch (m) {
      (console.error(m), n[u ? 'replace' : 'assign'](p));
    }
  }
  function i(c, f) {
    (o(
      c,
      te({}, t.state, po(r.value.back, c, r.value.forward, !0), f, {
        position: r.value.position,
      }),
      !0,
    ),
      (s.value = c));
  }
  function l(c, f) {
    const u = te({}, r.value, t.state, { forward: c, scroll: as() });
    (o(u.current, u, !0),
      o(c, te({}, po(s.value, c, null), { position: u.position + 1 }, f), !1),
      (s.value = c));
  }
  return { location: s, state: r, push: l, replace: i };
}
function Ba(e) {
  e = Ca(e);
  const t = ja(e),
    n = Va(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    (i || n.pauseListeners(), history.go(o));
  }
  const r = te(
    { location: '', base: e, go: s, createHref: xa.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(r, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function Ha(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ''),
    e.includes('#') || (e += '#'),
    Ba(e)
  );
}
let Ot = (function (e) {
  return (
    (e[(e.Static = 0)] = 'Static'),
    (e[(e.Param = 1)] = 'Param'),
    (e[(e.Group = 2)] = 'Group'),
    e
  );
})({});
var he = (function (e) {
  return (
    (e[(e.Static = 0)] = 'Static'),
    (e[(e.Param = 1)] = 'Param'),
    (e[(e.ParamRegExp = 2)] = 'ParamRegExp'),
    (e[(e.ParamRegExpEnd = 3)] = 'ParamRegExpEnd'),
    (e[(e.EscapeNext = 4)] = 'EscapeNext'),
    e
  );
})(he || {});
const Ua = { type: Ot.Static, value: '' },
  Ka = /[a-zA-Z0-9_]/;
function Wa(e) {
  if (!e) return [[]];
  if (e === '/') return [[Ua]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${f}": ${m}`);
  }
  let n = he.Static,
    s = n;
  const r = [];
  let o;
  function i() {
    (o && r.push(o), (o = []));
  }
  let l = 0,
    c,
    f = '',
    u = '';
  function d() {
    f &&
      (n === he.Static
        ? o.push({ type: Ot.Static, value: f })
        : n === he.Param || n === he.ParamRegExp || n === he.ParamRegExpEnd
          ? (o.length > 1 &&
              (c === '*' || c === '+') &&
              t(
                `A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: Ot.Param,
              value: f,
              regexp: u,
              repeatable: c === '*' || c === '+',
              optional: c === '*' || c === '?',
            }))
          : t('Invalid state to consume buffer'),
      (f = ''));
  }
  function p() {
    f += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === '\\' && n !== he.ParamRegExp)) {
      ((s = n), (n = he.EscapeNext));
      continue;
    }
    switch (n) {
      case he.Static:
        c === '/' ? (f && d(), i()) : c === ':' ? (d(), (n = he.Param)) : p();
        break;
      case he.EscapeNext:
        (p(), (n = s));
        break;
      case he.Param:
        c === '('
          ? (n = he.ParamRegExp)
          : Ka.test(c)
            ? p()
            : (d(),
              (n = he.Static),
              c !== '*' && c !== '?' && c !== '+' && l--);
        break;
      case he.ParamRegExp:
        c === ')'
          ? u[u.length - 1] == '\\'
            ? (u = u.slice(0, -1) + c)
            : (n = he.ParamRegExpEnd)
          : (u += c);
        break;
      case he.ParamRegExpEnd:
        (d(),
          (n = he.Static),
          c !== '*' && c !== '?' && c !== '+' && l--,
          (u = ''));
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return (
    n === he.ParamRegExp && t(`Unfinished custom RegExp for param "${f}"`),
    d(),
    i(),
    r
  );
}
const go = '[^/]+?',
  Ga = { sensitive: !1, strict: !1, start: !0, end: !0 };
var Ee = (function (e) {
  return (
    (e[(e._multiplier = 10)] = '_multiplier'),
    (e[(e.Root = 90)] = 'Root'),
    (e[(e.Segment = 40)] = 'Segment'),
    (e[(e.SubSegment = 30)] = 'SubSegment'),
    (e[(e.Static = 40)] = 'Static'),
    (e[(e.Dynamic = 20)] = 'Dynamic'),
    (e[(e.BonusCustomRegExp = 10)] = 'BonusCustomRegExp'),
    (e[(e.BonusWildcard = -50)] = 'BonusWildcard'),
    (e[(e.BonusRepeatable = -20)] = 'BonusRepeatable'),
    (e[(e.BonusOptional = -8)] = 'BonusOptional'),
    (e[(e.BonusStrict = 0.7000000000000001)] = 'BonusStrict'),
    (e[(e.BonusCaseSensitive = 0.25)] = 'BonusCaseSensitive'),
    e
  );
})(Ee || {});
const $a = /[.+*?^${}()[\]/\\]/g;
function qa(e, t) {
  const n = te({}, Ga, t),
    s = [];
  let r = n.start ? '^' : '';
  const o = [];
  for (const f of e) {
    const u = f.length ? [] : [Ee.Root];
    n.strict && !f.length && (r += '/');
    for (let d = 0; d < f.length; d++) {
      const p = f[d];
      let m = Ee.Segment + (n.sensitive ? Ee.BonusCaseSensitive : 0);
      if (p.type === Ot.Static)
        (d || (r += '/'), (r += p.value.replace($a, '\\$&')), (m += Ee.Static));
      else if (p.type === Ot.Param) {
        const { value: v, repeatable: w, optional: L, regexp: I } = p;
        o.push({ name: v, repeatable: w, optional: L });
        const E = I || go;
        if (E !== go) {
          m += Ee.BonusCustomRegExp;
          try {
            `${E}`;
          } catch (S) {
            throw new Error(
              `Invalid custom RegExp for param "${v}" (${E}): ` + S.message,
            );
          }
        }
        let x = w ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
        (d || (x = L && f.length < 2 ? `(?:/${x})` : '/' + x),
          L && (x += '?'),
          (r += x),
          (m += Ee.Dynamic),
          L && (m += Ee.BonusOptional),
          w && (m += Ee.BonusRepeatable),
          E === '.*' && (m += Ee.BonusWildcard));
      }
      u.push(m);
    }
    s.push(u);
  }
  if (n.strict && n.end) {
    const f = s.length - 1;
    s[f][s[f].length - 1] += Ee.BonusStrict;
  }
  (n.strict || (r += '/?'),
    n.end ? (r += '$') : n.strict && !r.endsWith('/') && (r += '(?:/|$)'));
  const i = new RegExp(r, n.sensitive ? '' : 'i');
  function l(f) {
    const u = f.match(i),
      d = {};
    if (!u) return null;
    for (let p = 1; p < u.length; p++) {
      const m = u[p] || '',
        v = o[p - 1];
      d[v.name] = m && v.repeatable ? m.split('/') : m;
    }
    return d;
  }
  function c(f) {
    let u = '',
      d = !1;
    for (const p of e) {
      ((!d || !u.endsWith('/')) && (u += '/'), (d = !1));
      for (const m of p)
        if (m.type === Ot.Static) u += m.value;
        else if (m.type === Ot.Param) {
          const { value: v, repeatable: w, optional: L } = m,
            I = v in f ? f[v] : '';
          if (Be(I) && !w)
            throw new Error(
              `Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const E = Be(I) ? I.join('/') : I;
          if (!E)
            if (L)
              p.length < 2 &&
                (u.endsWith('/') ? (u = u.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${v}"`);
          u += E;
        }
    }
    return u || '/';
  }
  return { re: i, score: s, keys: o, parse: l, stringify: c };
}
function za(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === Ee.Static + Ee.Segment
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === Ee.Static + Ee.Segment
        ? 1
        : -1
      : 0;
}
function ll(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = za(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (mo(s)) return 1;
    if (mo(r)) return -1;
  }
  return r.length - s.length;
}
function mo(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Ja = { strict: !1, end: !0, sensitive: !1 };
function Ya(e, t, n) {
  const s = qa(Wa(e.path), n),
    r = te(s, { record: e, parent: t, children: [], alias: [] });
  return (t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r);
}
function Qa(e, t) {
  const n = [],
    s = new Map();
  t = lo(Ja, t);
  function r(d) {
    return s.get(d);
  }
  function o(d, p, m) {
    const v = !m,
      w = yo(d);
    w.aliasOf = m && m.record;
    const L = lo(t, d),
      I = [w];
    if ('alias' in d) {
      const S = typeof d.alias == 'string' ? [d.alias] : d.alias;
      for (const F of S)
        I.push(
          yo(
            te({}, w, {
              components: m ? m.record.components : w.components,
              path: F,
              aliasOf: m ? m.record : w,
            }),
          ),
        );
    }
    let E, x;
    for (const S of I) {
      const { path: F } = S;
      if (p && F[0] !== '/') {
        const z = p.record.path,
          W = z[z.length - 1] === '/' ? '' : '/';
        S.path = p.record.path + (F && W + F);
      }
      if (
        ((E = Ya(S, p, L)),
        m
          ? m.alias.push(E)
          : ((x = x || E),
            x !== E && x.alias.push(E),
            v && d.name && !_o(E) && i(d.name)),
        cl(E) && c(E),
        w.children)
      ) {
        const z = w.children;
        for (let W = 0; W < z.length; W++) o(z[W], E, m && m.children[W]);
      }
      m = m || E;
    }
    return x
      ? () => {
          i(x);
        }
      : hn;
  }
  function i(d) {
    if (sl(d)) {
      const p = s.get(d);
      p &&
        (s.delete(d),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(i),
        p.alias.forEach(i));
    } else {
      const p = n.indexOf(d);
      p > -1 &&
        (n.splice(p, 1),
        d.record.name && s.delete(d.record.name),
        d.children.forEach(i),
        d.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(d) {
    const p = ef(d, n);
    (n.splice(p, 0, d), d.record.name && !_o(d) && s.set(d.record.name, d));
  }
  function f(d, p) {
    let m,
      v = {},
      w,
      L;
    if ('name' in d && d.name) {
      if (((m = s.get(d.name)), !m))
        throw Qt(ae.MATCHER_NOT_FOUND, { location: d });
      ((L = m.record.name),
        (v = te(
          vo(
            p.params,
            m.keys
              .filter((x) => !x.optional)
              .concat(m.parent ? m.parent.keys.filter((x) => x.optional) : [])
              .map((x) => x.name),
          ),
          d.params &&
            vo(
              d.params,
              m.keys.map((x) => x.name),
            ),
        )),
        (w = m.stringify(v)));
    } else if (d.path != null)
      ((w = d.path),
        (m = n.find((x) => x.re.test(w))),
        m && ((v = m.parse(w)), (L = m.record.name)));
    else {
      if (((m = p.name ? s.get(p.name) : n.find((x) => x.re.test(p.path))), !m))
        throw Qt(ae.MATCHER_NOT_FOUND, { location: d, currentLocation: p });
      ((L = m.record.name),
        (v = te({}, p.params, d.params)),
        (w = m.stringify(v)));
    }
    const I = [];
    let E = m;
    for (; E; ) (I.unshift(E.record), (E = E.parent));
    return { name: L, path: w, params: v, matched: I, meta: Za(I) };
  }
  e.forEach((d) => o(d));
  function u() {
    ((n.length = 0), s.clear());
  }
  return {
    addRoute: o,
    resolve: f,
    removeRoute: i,
    clearRoutes: u,
    getRoutes: l,
    getRecordMatcher: r,
  };
}
function vo(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function yo(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Xa(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && { default: e.component },
  };
  return (Object.defineProperty(t, 'mods', { value: {} }), t);
}
function Xa(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == 'object' ? n[s] : n;
  return t;
}
function _o(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Za(e) {
  return e.reduce((t, n) => te(t, n.meta), {});
}
function ef(e, t) {
  let n = 0,
    s = t.length;
  for (; n !== s; ) {
    const o = (n + s) >> 1;
    ll(e, t[o]) < 0 ? (s = o) : (n = o + 1);
  }
  const r = tf(e);
  return (r && (s = t.lastIndexOf(r, s - 1)), s);
}
function tf(e) {
  let t = e;
  for (; (t = t.parent); ) if (cl(t) && ll(e, t) === 0) return t;
}
function cl({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function bo(e) {
  const t = Je(mr),
    n = Je(ol),
    s = Ce(() => {
      const c = It(e.to);
      return t.resolve(c);
    }),
    r = Ce(() => {
      const { matched: c } = s.value,
        { length: f } = c,
        u = c[f - 1],
        d = n.matched;
      if (!u || !d.length) return -1;
      const p = d.findIndex(Yt.bind(null, u));
      if (p > -1) return p;
      const m = Eo(c[f - 2]);
      return f > 1 && Eo(u) === m && d[d.length - 1].path !== m
        ? d.findIndex(Yt.bind(null, c[f - 2]))
        : p;
    }),
    o = Ce(() => r.value > -1 && lf(n.params, s.value.params)),
    i = Ce(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        nl(n.params, s.value.params),
    );
  function l(c = {}) {
    if (of(c)) {
      const f = t[It(e.replace) ? 'replace' : 'push'](It(e.to)).catch(hn);
      return (
        e.viewTransition &&
          typeof document < 'u' &&
          'startViewTransition' in document &&
          document.startViewTransition(() => f),
        f
      );
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: Ce(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
function nf(e) {
  return e.length === 1 ? e[0] : e;
}
const sf = lr({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
      viewTransition: Boolean,
    },
    useLink: bo,
    setup(e, { slots: t }) {
      const n = Sn(bo(e)),
        { options: s } = Je(mr),
        r = Ce(() => ({
          [So(e.activeClass, s.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [So(
            e.exactActiveClass,
            s.linkExactActiveClass,
            'router-link-exact-active',
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && nf(t.default(n));
        return e.custom
          ? o
          : Vi(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o,
            );
      };
    },
  }),
  rf = sf;
function of(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return (e.preventDefault && e.preventDefault(), !0);
  }
}
function lf(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == 'string') {
      if (s !== r) return !1;
    } else if (
      !Be(r) ||
      r.length !== s.length ||
      s.some((o, i) => o.valueOf() !== r[i].valueOf())
    )
      return !1;
  }
  return !0;
}
function Eo(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const So = (e, t, n) => e ?? t ?? n,
  cf = lr({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = Je(Gs),
        r = Ce(() => e.route || s.value),
        o = Je(ho, 0),
        i = Ce(() => {
          let f = It(o);
          const { matched: u } = r.value;
          let d;
          for (; (d = u[f]) && !d.components; ) f++;
          return f;
        }),
        l = Ce(() => r.value.matched[i.value]);
      (Pn(
        ho,
        Ce(() => i.value + 1),
      ),
        Pn(La, l),
        Pn(Gs, r));
      const c = nt();
      return (
        Gt(
          () => [c.value, l.value, e.name],
          ([f, u, d], [p, m, v]) => {
            (u &&
              ((u.instances[d] = f),
              m &&
                m !== u &&
                f &&
                f === p &&
                (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards),
                u.updateGuards.size || (u.updateGuards = m.updateGuards))),
              f &&
                u &&
                (!m || !Yt(u, m) || !p) &&
                (u.enterCallbacks[d] || []).forEach((w) => w(f)));
          },
          { flush: 'post' },
        ),
        () => {
          const f = r.value,
            u = e.name,
            d = l.value,
            p = d && d.components[u];
          if (!p) return Co(n.default, { Component: p, route: f });
          const m = d.props[u],
            v = m
              ? m === !0
                ? f.params
                : typeof m == 'function'
                  ? m(f)
                  : m
              : null,
            L = Vi(
              p,
              te({}, v, t, {
                onVnodeUnmounted: (I) => {
                  I.component.isUnmounted && (d.instances[u] = null);
                },
                ref: c,
              }),
            );
          return Co(n.default, { Component: L, route: f }) || L;
        }
      );
    },
  });
function Co(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const uf = cf;
function af(e) {
  const t = Qa(e.routes, e),
    n = e.parseQuery || Da,
    s = e.stringifyQuery || fo,
    r = e.history,
    o = nn(),
    i = nn(),
    l = nn(),
    c = Xo(dt);
  let f = dt;
  Bt &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const u = Cs.bind(null, (b) => '' + b),
    d = Cs.bind(null, ma),
    p = Cs.bind(null, En);
  function m(b, k) {
    let N, j;
    return (
      sl(b) ? ((N = t.getRecordMatcher(b)), (j = k)) : (j = b),
      t.addRoute(j, N)
    );
  }
  function v(b) {
    const k = t.getRecordMatcher(b);
    k && t.removeRoute(k);
  }
  function w() {
    return t.getRoutes().map((b) => b.record);
  }
  function L(b) {
    return !!t.getRecordMatcher(b);
  }
  function I(b, k) {
    if (((k = te({}, k || c.value)), typeof b == 'string')) {
      const g = As(n, b, k.path),
        y = t.resolve({ path: g.path }, k),
        C = r.createHref(g.fullPath);
      return te(g, y, {
        params: p(y.params),
        hash: En(g.hash),
        redirectedFrom: void 0,
        href: C,
      });
    }
    let N;
    if (b.path != null) N = te({}, b, { path: As(n, b.path, k.path).path });
    else {
      const g = te({}, b.params);
      for (const y in g) g[y] == null && delete g[y];
      ((N = te({}, b, { params: d(g) })), (k.params = d(k.params)));
    }
    const j = t.resolve(N, k),
      Q = b.hash || '';
    j.params = u(p(j.params));
    const a = _a(s, te({}, b, { hash: ha(Q), path: j.path })),
      h = r.createHref(a);
    return te(
      { fullPath: a, hash: Q, query: s === fo ? Ma(b.query) : b.query || {} },
      j,
      { redirectedFrom: void 0, href: h },
    );
  }
  function E(b) {
    return typeof b == 'string' ? As(n, b, c.value.path) : te({}, b);
  }
  function x(b, k) {
    if (f !== b) return Qt(ae.NAVIGATION_CANCELLED, { from: k, to: b });
  }
  function S(b) {
    return W(b);
  }
  function F(b) {
    return S(te(E(b), { replace: !0 }));
  }
  function z(b, k) {
    const N = b.matched[b.matched.length - 1];
    if (N && N.redirect) {
      const { redirect: j } = N;
      let Q = typeof j == 'function' ? j(b, k) : j;
      return (
        typeof Q == 'string' &&
          ((Q = Q.includes('?') || Q.includes('#') ? (Q = E(Q)) : { path: Q }),
          (Q.params = {})),
        te(
          {
            query: b.query,
            hash: b.hash,
            params: Q.path != null ? {} : b.params,
          },
          Q,
        )
      );
    }
  }
  function W(b, k) {
    const N = (f = I(b)),
      j = c.value,
      Q = b.state,
      a = b.force,
      h = b.replace === !0,
      g = z(N, j);
    if (g)
      return W(
        te(E(g), {
          state: typeof g == 'object' ? te({}, Q, g.state) : Q,
          force: a,
          replace: h,
        }),
        k || N,
      );
    const y = N;
    y.redirectedFrom = k;
    let C;
    return (
      !a &&
        ba(s, j, N) &&
        ((C = Qt(ae.NAVIGATION_DUPLICATED, { to: y, from: j })),
        He(j, j, !0, !1)),
      (C ? Promise.resolve(C) : K(y, j))
        .catch((_) =>
          et(_)
            ? et(_, ae.NAVIGATION_GUARD_REDIRECT)
              ? _
              : at(_)
            : ee(_, y, j),
        )
        .then((_) => {
          if (_) {
            if (et(_, ae.NAVIGATION_GUARD_REDIRECT))
              return W(
                te({ replace: h }, E(_.to), {
                  state: typeof _.to == 'object' ? te({}, Q, _.to.state) : Q,
                  force: a,
                }),
                k || y,
              );
          } else _ = D(y, j, !0, h, Q);
          return (J(y, j, _), _);
        })
    );
  }
  function U(b, k) {
    const N = x(b, k);
    return N ? Promise.reject(N) : Promise.resolve();
  }
  function P(b) {
    const k = Ft.values().next().value;
    return k && typeof k.runWithContext == 'function'
      ? k.runWithContext(b)
      : b();
  }
  function K(b, k) {
    let N;
    const [j, Q, a] = Fa(b, k);
    N = ws(j.reverse(), 'beforeRouteLeave', b, k);
    for (const g of j)
      g.leaveGuards.forEach((y) => {
        N.push(yt(y, b, k));
      });
    const h = U.bind(null, b, k);
    return (
      N.push(h),
      Ne(N)
        .then(() => {
          N = [];
          for (const g of o.list()) N.push(yt(g, b, k));
          return (N.push(h), Ne(N));
        })
        .then(() => {
          N = ws(Q, 'beforeRouteUpdate', b, k);
          for (const g of Q)
            g.updateGuards.forEach((y) => {
              N.push(yt(y, b, k));
            });
          return (N.push(h), Ne(N));
        })
        .then(() => {
          N = [];
          for (const g of a)
            if (g.beforeEnter)
              if (Be(g.beforeEnter))
                for (const y of g.beforeEnter) N.push(yt(y, b, k));
              else N.push(yt(g.beforeEnter, b, k));
          return (N.push(h), Ne(N));
        })
        .then(
          () => (
            b.matched.forEach((g) => (g.enterCallbacks = {})),
            (N = ws(a, 'beforeRouteEnter', b, k, P)),
            N.push(h),
            Ne(N)
          ),
        )
        .then(() => {
          N = [];
          for (const g of i.list()) N.push(yt(g, b, k));
          return (N.push(h), Ne(N));
        })
        .catch((g) => (et(g, ae.NAVIGATION_CANCELLED) ? g : Promise.reject(g)))
    );
  }
  function J(b, k, N) {
    l.list().forEach((j) => P(() => j(b, k, N)));
  }
  function D(b, k, N, j, Q) {
    const a = x(b, k);
    if (a) return a;
    const h = k === dt,
      g = Bt ? history.state : {};
    (N &&
      (j || h
        ? r.replace(b.fullPath, te({ scroll: h && g && g.scroll }, Q))
        : r.push(b.fullPath, Q)),
      (c.value = b),
      He(b, k, N, h),
      at());
  }
  let Y;
  function de() {
    Y ||
      (Y = r.listen((b, k, N) => {
        if (!Et.listening) return;
        const j = I(b),
          Q = z(j, Et.currentRoute.value);
        if (Q) {
          W(te(Q, { replace: !0, force: !0 }), j).catch(hn);
          return;
        }
        f = j;
        const a = c.value;
        (Bt && Ta(ao(a.fullPath, N.delta), as()),
          K(j, a)
            .catch((h) =>
              et(h, ae.NAVIGATION_ABORTED | ae.NAVIGATION_CANCELLED)
                ? h
                : et(h, ae.NAVIGATION_GUARD_REDIRECT)
                  ? (W(te(E(h.to), { force: !0 }), j)
                      .then((g) => {
                        et(
                          g,
                          ae.NAVIGATION_ABORTED | ae.NAVIGATION_DUPLICATED,
                        ) &&
                          !N.delta &&
                          N.type === Ks.pop &&
                          r.go(-1, !1);
                      })
                      .catch(hn),
                    Promise.reject())
                  : (N.delta && r.go(-N.delta, !1), ee(h, j, a)),
            )
            .then((h) => {
              ((h = h || D(j, a, !1)),
                h &&
                  (N.delta && !et(h, ae.NAVIGATION_CANCELLED)
                    ? r.go(-N.delta, !1)
                    : N.type === Ks.pop &&
                      et(h, ae.NAVIGATION_ABORTED | ae.NAVIGATION_DUPLICATED) &&
                      r.go(-1, !1)),
                J(j, a, h));
            })
            .catch(hn));
      }));
  }
  let _e = nn(),
    oe = nn(),
    q;
  function ee(b, k, N) {
    at(b);
    const j = oe.list();
    return (
      j.length ? j.forEach((Q) => Q(b, k, N)) : console.error(b),
      Promise.reject(b)
    );
  }
  function Xe() {
    return q && c.value !== dt
      ? Promise.resolve()
      : new Promise((b, k) => {
          _e.add([b, k]);
        });
  }
  function at(b) {
    return (
      q ||
        ((q = !b),
        de(),
        _e.list().forEach(([k, N]) => (b ? N(b) : k())),
        _e.reset()),
      b
    );
  }
  function He(b, k, N, j) {
    const { scrollBehavior: Q } = e;
    if (!Bt || !Q) return Promise.resolve();
    const a =
      (!N && Oa(ao(b.fullPath, 0))) ||
      ((j || !N) && history.state && history.state.scroll) ||
      null;
    return or()
      .then(() => Q(b, k, a))
      .then((h) => h && Ra(h))
      .catch((h) => ee(h, b, k));
  }
  const xe = (b) => r.go(b);
  let Lt;
  const Ft = new Set(),
    Et = {
      currentRoute: c,
      listening: !0,
      addRoute: m,
      removeRoute: v,
      clearRoutes: t.clearRoutes,
      hasRoute: L,
      getRoutes: w,
      resolve: I,
      options: e,
      push: S,
      replace: F,
      go: xe,
      back: () => xe(-1),
      forward: () => xe(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: oe.add,
      isReady: Xe,
      install(b) {
        (b.component('RouterLink', rf),
          b.component('RouterView', uf),
          (b.config.globalProperties.$router = Et),
          Object.defineProperty(b.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => It(c),
          }),
          Bt &&
            !Lt &&
            c.value === dt &&
            ((Lt = !0), S(r.location).catch((j) => {})));
        const k = {};
        for (const j in dt)
          Object.defineProperty(k, j, {
            get: () => c.value[j],
            enumerable: !0,
          });
        (b.provide(mr, Et), b.provide(ol, Qo(k)), b.provide(Gs, c));
        const N = b.unmount;
        (Ft.add(b),
          (b.unmount = function () {
            (Ft.delete(b),
              Ft.size < 1 &&
                ((f = dt),
                Y && Y(),
                (Y = null),
                (c.value = dt),
                (Lt = !1),
                (q = !1)),
              N());
          }));
      },
    };
  function Ne(b) {
    return b.reduce((k, N) => k.then(() => P(N)), Promise.resolve());
  }
  return Et;
}
const ff = 'modulepreload',
  df = function (e, t) {
    return new URL(e, t).href;
  },
  Ao = {},
  hf = function (t, n, s) {
    let r = Promise.resolve();
    if (n && n.length > 0) {
      let i = function (u) {
        return Promise.all(
          u.map((d) =>
            Promise.resolve(d).then(
              (p) => ({ status: 'fulfilled', value: p }),
              (p) => ({ status: 'rejected', reason: p }),
            ),
          ),
        );
      };
      const l = document.getElementsByTagName('link'),
        c = document.querySelector('meta[property=csp-nonce]'),
        f =
          (c == null ? void 0 : c.nonce) ||
          (c == null ? void 0 : c.getAttribute('nonce'));
      r = i(
        n.map((u) => {
          if (((u = df(u, s)), u in Ao)) return;
          Ao[u] = !0;
          const d = u.endsWith('.css'),
            p = d ? '[rel="stylesheet"]' : '';
          if (!!s)
            for (let w = l.length - 1; w >= 0; w--) {
              const L = l[w];
              if (L.href === u && (!d || L.rel === 'stylesheet')) return;
            }
          else if (document.querySelector(`link[href="${u}"]${p}`)) return;
          const v = document.createElement('link');
          if (
            ((v.rel = d ? 'stylesheet' : ff),
            d || (v.as = 'script'),
            (v.crossOrigin = ''),
            (v.href = u),
            f && v.setAttribute('nonce', f),
            document.head.appendChild(v),
            d)
          )
            return new Promise((w, L) => {
              (v.addEventListener('load', w),
                v.addEventListener('error', () =>
                  L(new Error(`Unable to preload CSS for ${u}`)),
                ));
            });
        }),
      );
    }
    function o(i) {
      const l = new Event('vite:preloadError', { cancelable: !0 });
      if (((l.payload = i), window.dispatchEvent(l), !l.defaultPrevented))
        throw i;
    }
    return r.then((i) => {
      for (const l of i || []) l.status === 'rejected' && o(l.reason);
      return t().catch(o);
    });
  },
  pf = [
    {
      path: '/',
      name: '/',
      component: () =>
        hf(
          () => import('./index2.js'),
          __vite__mapDeps([0, 1]),
          import.meta.url,
        ),
    },
  ],
  gf = af({ history: Ha('./'), routes: pf }),
  vr = Bu(na);
vr.use(Ku());
vr.use(gf);
vr.mount('#app');
export {
  ta as A,
  Sn as B,
  xf as C,
  Ef as D,
  Di as E,
  Le as F,
  yf as G,
  vf as K,
  Cf as T,
  di as a,
  bf as b,
  Ce as c,
  lr as d,
  Ii as e,
  Ae as f,
  Li as g,
  Vi as h,
  ts as i,
  _f as j,
  Sl as k,
  Ys as l,
  Yu as m,
  or as n,
  rs as o,
  Qs as p,
  tc as q,
  nt as r,
  Xo as s,
  Z as t,
  It as u,
  lu as v,
  Gt as w,
  Sf as x,
  mf as y,
  Af as z,
};
