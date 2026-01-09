var ao = Object.defineProperty;
var Gi = (i) => {
  throw TypeError(i);
};
var ro = (i, t, e) =>
  t in i
    ? ao(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (i[t] = e);
var A = (i, t, e) => ro(i, typeof t != 'symbol' ? t + '' : t, e),
  lo = (i, t, e) => t.has(i) || Gi('Cannot ' + e);
var Nt = (i, t, e) => (
    lo(i, t, 'read from private field'),
    e ? e.call(i) : t.get(i)
  ),
  Oe = (i, t, e) =>
    t.has(i)
      ? Gi('Cannot add the same private member more than once')
      : t instanceof WeakSet
        ? t.add(i)
        : t.set(i, e);
import {
  d as yt,
  s as dn,
  h as wi,
  v as co,
  r as ye,
  o as ho,
  a as uo,
  w as fo,
  t as Mi,
  i as un,
  n as go,
  c as et,
  b as U,
  e as j,
  f as It,
  u as nt,
  g as _,
  F as fn,
  j as gn,
  k as it,
  l as Et,
  m as Jt,
  p as Kt,
  q as po,
  T as mo,
  x as pn,
  y as Ft,
  z as ae,
  A as bo,
  B as _o,
  C as Zi,
  D as hi,
  E as Qi,
  G as xo,
  K as yo,
} from './index.js';
function ve(i) {
  const t = Math.floor(i / 1e3);
  if (t < 60) return `${t}s`;
  const e = Math.floor(t / 60);
  if (e < 60) return `${e}m ${t % 60}s`;
  const s = Math.floor(e / 60),
    n = e % 60;
  return n > 0 ? `${s}h ${n}m` : `${s}h`;
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */ function Ae(i) {
  return (i + 0.5) | 0;
}
const kt = (i, t, e) => Math.max(Math.min(i, e), t);
function ue(i) {
  return kt(Ae(i * 2.55), 0, 255);
}
function St(i) {
  return kt(Ae(i * 255), 0, 255);
}
function bt(i) {
  return kt(Ae(i / 2.55) / 100, 0, 1);
}
function Ji(i) {
  return kt(Ae(i * 100), 0, 100);
}
const st = {
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
  Si = [...'0123456789ABCDEF'],
  vo = (i) => Si[i & 15],
  ko = (i) => Si[(i & 240) >> 4] + Si[i & 15],
  Pe = (i) => (i & 240) >> 4 === (i & 15),
  wo = (i) => Pe(i.r) && Pe(i.g) && Pe(i.b) && Pe(i.a);
function Mo(i) {
  var t = i.length,
    e;
  return (
    i[0] === '#' &&
      (t === 4 || t === 5
        ? (e = {
            r: 255 & (st[i[1]] * 17),
            g: 255 & (st[i[2]] * 17),
            b: 255 & (st[i[3]] * 17),
            a: t === 5 ? st[i[4]] * 17 : 255,
          })
        : (t === 7 || t === 9) &&
          (e = {
            r: (st[i[1]] << 4) | st[i[2]],
            g: (st[i[3]] << 4) | st[i[4]],
            b: (st[i[5]] << 4) | st[i[6]],
            a: t === 9 ? (st[i[7]] << 4) | st[i[8]] : 255,
          })),
    e
  );
}
const So = (i, t) => (i < 255 ? t(i) : '');
function Do(i) {
  var t = wo(i) ? vo : ko;
  return i ? '#' + t(i.r) + t(i.g) + t(i.b) + So(i.a, t) : void 0;
}
const Ao =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function mn(i, t, e) {
  const s = t * Math.min(e, 1 - e),
    n = (o, a = (o + i / 30) % 12) =>
      e - s * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [n(0), n(8), n(4)];
}
function Co(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) =>
    e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Oo(i, t, e) {
  const s = mn(i, 1, 0.5);
  let n;
  for (t + e > 1 && ((n = 1 / (t + e)), (t *= n), (e *= n)), n = 0; n < 3; n++)
    ((s[n] *= 1 - t - e), (s[n] += t));
  return s;
}
function Po(i, t, e, s, n) {
  return i === n
    ? (t - e) / s + (t < e ? 6 : 0)
    : t === n
      ? (e - i) / s + 2
      : (i - t) / s + 4;
}
function Fi(i) {
  const e = i.r / 255,
    s = i.g / 255,
    n = i.b / 255,
    o = Math.max(e, s, n),
    a = Math.min(e, s, n),
    r = (o + a) / 2;
  let l, c, h;
  return (
    o !== a &&
      ((h = o - a),
      (c = r > 0.5 ? h / (2 - o - a) : h / (o + a)),
      (l = Po(e, s, n, h, o)),
      (l = l * 60 + 0.5)),
    [l | 0, c || 0, r]
  );
}
function Ii(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(St);
}
function Ei(i, t, e) {
  return Ii(mn, i, t, e);
}
function To(i, t, e) {
  return Ii(Oo, i, t, e);
}
function Ro(i, t, e) {
  return Ii(Co, i, t, e);
}
function bn(i) {
  return ((i % 360) + 360) % 360;
}
function Lo(i) {
  const t = Ao.exec(i);
  let e = 255,
    s;
  if (!t) return;
  t[5] !== s && (e = t[6] ? ue(+t[5]) : St(+t[5]));
  const n = bn(+t[2]),
    o = +t[3] / 100,
    a = +t[4] / 100;
  return (
    t[1] === 'hwb'
      ? (s = To(n, o, a))
      : t[1] === 'hsv'
        ? (s = Ro(n, o, a))
        : (s = Ei(n, o, a)),
    { r: s[0], g: s[1], b: s[2], a: e }
  );
}
function Fo(i, t) {
  var e = Fi(i);
  ((e[0] = bn(e[0] + t)),
    (e = Ei(e)),
    (i.r = e[0]),
    (i.g = e[1]),
    (i.b = e[2]));
}
function Io(i) {
  if (!i) return;
  const t = Fi(i),
    e = t[0],
    s = Ji(t[1]),
    n = Ji(t[2]);
  return i.a < 255
    ? `hsla(${e}, ${s}%, ${n}%, ${bt(i.a)})`
    : `hsl(${e}, ${s}%, ${n}%)`;
}
const ts = {
    x: 'dark',
    Z: 'light',
    Y: 're',
    X: 'blu',
    W: 'gr',
    V: 'medium',
    U: 'slate',
    A: 'ee',
    T: 'ol',
    S: 'or',
    B: 'ra',
    C: 'lateg',
    D: 'ights',
    R: 'in',
    Q: 'turquois',
    E: 'hi',
    P: 'ro',
    O: 'al',
    N: 'le',
    M: 'de',
    L: 'yello',
    F: 'en',
    K: 'ch',
    G: 'arks',
    H: 'ea',
    I: 'ightg',
    J: 'wh',
  },
  es = {
    OiceXe: 'f0f8ff',
    antiquewEte: 'faebd7',
    aqua: 'ffff',
    aquamarRe: '7fffd4',
    azuY: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '0',
    blanKedOmond: 'ffebcd',
    Xe: 'ff',
    XeviTet: '8a2be2',
    bPwn: 'a52a2a',
    burlywood: 'deb887',
    caMtXe: '5f9ea0',
    KartYuse: '7fff00',
    KocTate: 'd2691e',
    cSO: 'ff7f50',
    cSnflowerXe: '6495ed',
    cSnsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: 'ffff',
    xXe: '8b',
    xcyan: '8b8b',
    xgTMnPd: 'b8860b',
    xWay: 'a9a9a9',
    xgYF: '6400',
    xgYy: 'a9a9a9',
    xkhaki: 'bdb76b',
    xmagFta: '8b008b',
    xTivegYF: '556b2f',
    xSange: 'ff8c00',
    xScEd: '9932cc',
    xYd: '8b0000',
    xsOmon: 'e9967a',
    xsHgYF: '8fbc8f',
    xUXe: '483d8b',
    xUWay: '2f4f4f',
    xUgYy: '2f4f4f',
    xQe: 'ced1',
    xviTet: '9400d3',
    dAppRk: 'ff1493',
    dApskyXe: 'bfff',
    dimWay: '696969',
    dimgYy: '696969',
    dodgerXe: '1e90ff',
    fiYbrick: 'b22222',
    flSOwEte: 'fffaf0',
    foYstWAn: '228b22',
    fuKsia: 'ff00ff',
    gaRsbSo: 'dcdcdc',
    ghostwEte: 'f8f8ff',
    gTd: 'ffd700',
    gTMnPd: 'daa520',
    Way: '808080',
    gYF: '8000',
    gYFLw: 'adff2f',
    gYy: '808080',
    honeyMw: 'f0fff0',
    hotpRk: 'ff69b4',
    RdianYd: 'cd5c5c',
    Rdigo: '4b0082',
    ivSy: 'fffff0',
    khaki: 'f0e68c',
    lavFMr: 'e6e6fa',
    lavFMrXsh: 'fff0f5',
    lawngYF: '7cfc00',
    NmoncEffon: 'fffacd',
    ZXe: 'add8e6',
    ZcSO: 'f08080',
    Zcyan: 'e0ffff',
    ZgTMnPdLw: 'fafad2',
    ZWay: 'd3d3d3',
    ZgYF: '90ee90',
    ZgYy: 'd3d3d3',
    ZpRk: 'ffb6c1',
    ZsOmon: 'ffa07a',
    ZsHgYF: '20b2aa',
    ZskyXe: '87cefa',
    ZUWay: '778899',
    ZUgYy: '778899',
    ZstAlXe: 'b0c4de',
    ZLw: 'ffffe0',
    lime: 'ff00',
    limegYF: '32cd32',
    lRF: 'faf0e6',
    magFta: 'ff00ff',
    maPon: '800000',
    VaquamarRe: '66cdaa',
    VXe: 'cd',
    VScEd: 'ba55d3',
    VpurpN: '9370db',
    VsHgYF: '3cb371',
    VUXe: '7b68ee',
    VsprRggYF: 'fa9a',
    VQe: '48d1cc',
    VviTetYd: 'c71585',
    midnightXe: '191970',
    mRtcYam: 'f5fffa',
    mistyPse: 'ffe4e1',
    moccasR: 'ffe4b5',
    navajowEte: 'ffdead',
    navy: '80',
    Tdlace: 'fdf5e6',
    Tive: '808000',
    TivedBb: '6b8e23',
    Sange: 'ffa500',
    SangeYd: 'ff4500',
    ScEd: 'da70d6',
    pOegTMnPd: 'eee8aa',
    pOegYF: '98fb98',
    pOeQe: 'afeeee',
    pOeviTetYd: 'db7093',
    papayawEp: 'ffefd5',
    pHKpuff: 'ffdab9',
    peru: 'cd853f',
    pRk: 'ffc0cb',
    plum: 'dda0dd',
    powMrXe: 'b0e0e6',
    purpN: '800080',
    YbeccapurpN: '663399',
    Yd: 'ff0000',
    Psybrown: 'bc8f8f',
    PyOXe: '4169e1',
    saddNbPwn: '8b4513',
    sOmon: 'fa8072',
    sandybPwn: 'f4a460',
    sHgYF: '2e8b57',
    sHshell: 'fff5ee',
    siFna: 'a0522d',
    silver: 'c0c0c0',
    skyXe: '87ceeb',
    UXe: '6a5acd',
    UWay: '708090',
    UgYy: '708090',
    snow: 'fffafa',
    sprRggYF: 'ff7f',
    stAlXe: '4682b4',
    tan: 'd2b48c',
    teO: '8080',
    tEstN: 'd8bfd8',
    tomato: 'ff6347',
    Qe: '40e0d0',
    viTet: 'ee82ee',
    JHt: 'f5deb3',
    wEte: 'ffffff',
    wEtesmoke: 'f5f5f5',
    Lw: 'ffff00',
    LwgYF: '9acd32',
  };
function Eo() {
  const i = {},
    t = Object.keys(es),
    e = Object.keys(ts);
  let s, n, o, a, r;
  for (s = 0; s < t.length; s++) {
    for (a = r = t[s], n = 0; n < e.length; n++)
      ((o = e[n]), (r = r.replace(o, ts[o])));
    ((o = parseInt(es[a], 16)),
      (i[r] = [(o >> 16) & 255, (o >> 8) & 255, o & 255]));
  }
  return i;
}
let Te;
function zo(i) {
  Te || ((Te = Eo()), (Te.transparent = [0, 0, 0, 0]));
  const t = Te[i.toLowerCase()];
  return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 };
}
const Bo =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ho(i) {
  const t = Bo.exec(i);
  let e = 255,
    s,
    n,
    o;
  if (t) {
    if (t[7] !== s) {
      const a = +t[7];
      e = t[8] ? ue(a) : kt(a * 255, 0, 255);
    }
    return (
      (s = +t[1]),
      (n = +t[3]),
      (o = +t[5]),
      (s = 255 & (t[2] ? ue(s) : kt(s, 0, 255))),
      (n = 255 & (t[4] ? ue(n) : kt(n, 0, 255))),
      (o = 255 & (t[6] ? ue(o) : kt(o, 0, 255))),
      { r: s, g: n, b: o, a: e }
    );
  }
}
function Wo(i) {
  return (
    i &&
    (i.a < 255
      ? `rgba(${i.r}, ${i.g}, ${i.b}, ${bt(i.a)})`
      : `rgb(${i.r}, ${i.g}, ${i.b})`)
  );
}
const di = (i) =>
    i <= 0.0031308 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055,
  Yt = (i) => (i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4));
function Vo(i, t, e) {
  const s = Yt(bt(i.r)),
    n = Yt(bt(i.g)),
    o = Yt(bt(i.b));
  return {
    r: St(di(s + e * (Yt(bt(t.r)) - s))),
    g: St(di(n + e * (Yt(bt(t.g)) - n))),
    b: St(di(o + e * (Yt(bt(t.b)) - o))),
    a: i.a + e * (t.a - i.a),
  };
}
function Re(i, t, e) {
  if (i) {
    let s = Fi(i);
    ((s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1))),
      (s = Ei(s)),
      (i.r = s[0]),
      (i.g = s[1]),
      (i.b = s[2]));
  }
}
function _n(i, t) {
  return i && Object.assign(t || {}, i);
}
function is(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return (
    Array.isArray(i)
      ? i.length >= 3 &&
        ((t = { r: i[0], g: i[1], b: i[2], a: 255 }),
        i.length > 3 && (t.a = St(i[3])))
      : ((t = _n(i, { r: 0, g: 0, b: 0, a: 1 })), (t.a = St(t.a))),
    t
  );
}
function $o(i) {
  return i.charAt(0) === 'r' ? Ho(i) : Lo(i);
}
class ke {
  constructor(t) {
    if (t instanceof ke) return t;
    const e = typeof t;
    let s;
    (e === 'object'
      ? (s = is(t))
      : e === 'string' && (s = Mo(t) || zo(t) || $o(t)),
      (this._rgb = s),
      (this._valid = !!s));
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = _n(this._rgb);
    return (t && (t.a = bt(t.a)), t);
  }
  set rgb(t) {
    this._rgb = is(t);
  }
  rgbString() {
    return this._valid ? Wo(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Do(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Io(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb,
        n = t.rgb;
      let o;
      const a = e === o ? 0.5 : e,
        r = 2 * a - 1,
        l = s.a - n.a,
        c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      ((o = 1 - c),
        (s.r = 255 & (c * s.r + o * n.r + 0.5)),
        (s.g = 255 & (c * s.g + o * n.g + 0.5)),
        (s.b = 255 & (c * s.b + o * n.b + 0.5)),
        (s.a = a * s.a + (1 - a) * n.a),
        (this.rgb = s));
    }
    return this;
  }
  interpolate(t, e) {
    return (t && (this._rgb = Vo(this._rgb, t._rgb, e)), this);
  }
  clone() {
    return new ke(this.rgb);
  }
  alpha(t) {
    return ((this._rgb.a = St(t)), this);
  }
  clearer(t) {
    const e = this._rgb;
    return ((e.a *= 1 - t), this);
  }
  greyscale() {
    const t = this._rgb,
      e = Ae(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return ((t.r = t.g = t.b = e), this);
  }
  opaquer(t) {
    const e = this._rgb;
    return ((e.a *= 1 + t), this);
  }
  negate() {
    const t = this._rgb;
    return ((t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this);
  }
  lighten(t) {
    return (Re(this._rgb, 2, t), this);
  }
  darken(t) {
    return (Re(this._rgb, 2, -t), this);
  }
  saturate(t) {
    return (Re(this._rgb, 1, t), this);
  }
  desaturate(t) {
    return (Re(this._rgb, 1, -t), this);
  }
  rotate(t) {
    return (Fo(this._rgb, t), this);
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */ function ft() {}
const jo = (() => {
  let i = 0;
  return () => i++;
})();
function z(i) {
  return i == null;
}
function N(i) {
  if (Array.isArray && Array.isArray(i)) return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === '[object' && t.slice(-6) === 'Array]';
}
function R(i) {
  return i !== null && Object.prototype.toString.call(i) === '[object Object]';
}
function at(i) {
  return (typeof i == 'number' || i instanceof Number) && isFinite(+i);
}
function ct(i, t) {
  return at(i) ? i : t;
}
function T(i, t) {
  return typeof i > 'u' ? t : i;
}
const No = (i, t) =>
    typeof i == 'string' && i.endsWith('%') ? parseFloat(i) / 100 : +i / t,
  xn = (i, t) =>
    typeof i == 'string' && i.endsWith('%') ? (parseFloat(i) / 100) * t : +i;
function H(i, t, e) {
  if (i && typeof i.call == 'function') return i.apply(e, t);
}
function I(i, t, e, s) {
  let n, o, a;
  if (N(i)) for (o = i.length, n = 0; n < o; n++) t.call(e, i[n], n);
  else if (R(i))
    for (a = Object.keys(i), o = a.length, n = 0; n < o; n++)
      t.call(e, i[a[n]], a[n]);
}
function Ke(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length) return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (
      ((n = i[e]),
      (o = t[e]),
      n.datasetIndex !== o.datasetIndex || n.index !== o.index)
    )
      return !1;
  return !0;
}
function qe(i) {
  if (N(i)) return i.map(qe);
  if (R(i)) {
    const t = Object.create(null),
      e = Object.keys(i),
      s = e.length;
    let n = 0;
    for (; n < s; ++n) t[e[n]] = qe(i[e[n]]);
    return t;
  }
  return i;
}
function yn(i) {
  return ['__proto__', 'prototype', 'constructor'].indexOf(i) === -1;
}
function Yo(i, t, e, s) {
  if (!yn(i)) return;
  const n = t[i],
    o = e[i];
  R(n) && R(o) ? we(n, o, s) : (t[i] = qe(o));
}
function we(i, t, e) {
  const s = N(t) ? t : [t],
    n = s.length;
  if (!R(i)) return i;
  e = e || {};
  const o = e.merger || Yo;
  let a;
  for (let r = 0; r < n; ++r) {
    if (((a = s[r]), !R(a))) continue;
    const l = Object.keys(a);
    for (let c = 0, h = l.length; c < h; ++c) o(l[c], i, a, e);
  }
  return i;
}
function be(i, t) {
  return we(i, t, { merger: Uo });
}
function Uo(i, t, e) {
  if (!yn(i)) return;
  const s = t[i],
    n = e[i];
  R(s) && R(n)
    ? be(s, n)
    : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = qe(n));
}
const ss = { '': (i) => i, x: (i) => i.x, y: (i) => i.y };
function Xo(i) {
  const t = i.split('.'),
    e = [];
  let s = '';
  for (const n of t)
    ((s += n),
      s.endsWith('\\') ? (s = s.slice(0, -1) + '.') : (e.push(s), (s = '')));
  return e;
}
function Ko(i) {
  const t = Xo(i);
  return (e) => {
    for (const s of t) {
      if (s === '') break;
      e = e && e[s];
    }
    return e;
  };
}
function Ht(i, t) {
  return (ss[t] || (ss[t] = Ko(t)))(i);
}
function zi(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const Me = (i) => typeof i < 'u',
  At = (i) => typeof i == 'function',
  ns = (i, t) => {
    if (i.size !== t.size) return !1;
    for (const e of i) if (!t.has(e)) return !1;
    return !0;
  };
function qo(i) {
  return i.type === 'mouseup' || i.type === 'click' || i.type === 'contextmenu';
}
const E = Math.PI,
  $ = 2 * E,
  Ge = Number.POSITIVE_INFINITY,
  Go = E / 180,
  Y = E / 2,
  Pt = E / 4,
  os = (E * 2) / 3,
  vn = Math.log10,
  Dt = Math.sign;
function je(i, t, e) {
  return Math.abs(i - t) < e;
}
function as(i) {
  const t = Math.round(i);
  i = je(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(vn(i))),
    s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function Zo(i) {
  const t = [],
    e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++) i % s === 0 && (t.push(s), t.push(i / s));
  return (e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t);
}
function Qo(i) {
  return (
    typeof i == 'symbol' ||
    (typeof i == 'object' &&
      i !== null &&
      !(Symbol.toPrimitive in i || 'toString' in i || 'valueOf' in i))
  );
}
function Ze(i) {
  return !Qo(i) && !isNaN(parseFloat(i)) && isFinite(i);
}
function Jo(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function ta(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    ((o = i[s][e]),
      isNaN(o) || ((t.min = Math.min(t.min, o)), (t.max = Math.max(t.max, o))));
}
function _t(i) {
  return i * (E / 180);
}
function ea(i) {
  return i * (180 / E);
}
function rs(i) {
  if (!at(i)) return;
  let t = 1,
    e = 0;
  for (; Math.round(i * t) / t !== i; ) ((t *= 10), e++);
  return e;
}
function kn(i, t) {
  const e = t.x - i.x,
    s = t.y - i.y,
    n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return (o < -0.5 * E && (o += $), { angle: o, distance: n });
}
function ia(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function ut(i) {
  return ((i % $) + $) % $;
}
function Qe(i, t, e, s) {
  const n = ut(i),
    o = ut(t),
    a = ut(e),
    r = ut(o - n),
    l = ut(a - n),
    c = ut(n - o),
    h = ut(n - a);
  return n === o || n === a || (s && o === a) || (r > l && c < h);
}
function tt(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function sa(i) {
  return tt(i, -32768, 32767);
}
function zt(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function Bi(i, t, e) {
  e = e || ((a) => i[a] < t);
  let s = i.length - 1,
    n = 0,
    o;
  for (; s - n > 1; ) ((o = (n + s) >> 1), e(o) ? (n = o) : (s = o));
  return { lo: n, hi: s };
}
const Di = (i, t, e, s) =>
    Bi(
      i,
      e,
      s
        ? (n) => {
            const o = i[n][t];
            return o < e || (o === e && i[n + 1][t] === e);
          }
        : (n) => i[n][t] < e,
    ),
  na = (i, t, e) => Bi(i, e, (s) => i[s][t] >= e);
function oa(i, t, e) {
  let s = 0,
    n = i.length;
  for (; s < n && i[s] < t; ) s++;
  for (; n > s && i[n - 1] > e; ) n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const wn = ['push', 'pop', 'shift', 'splice', 'unshift'];
function aa(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  (Object.defineProperty(i, '_chartjs', {
    configurable: !0,
    enumerable: !1,
    value: { listeners: [t] },
  }),
    wn.forEach((e) => {
      const s = '_onData' + zi(e),
        n = i[e];
      Object.defineProperty(i, e, {
        configurable: !0,
        enumerable: !1,
        value(...o) {
          const a = n.apply(this, o);
          return (
            i._chartjs.listeners.forEach((r) => {
              typeof r[s] == 'function' && r[s](...o);
            }),
            a
          );
        },
      });
    }));
}
function ls(i, t) {
  const e = i._chartjs;
  if (!e) return;
  const s = e.listeners,
    n = s.indexOf(t);
  (n !== -1 && s.splice(n, 1),
    !(s.length > 0) &&
      (wn.forEach((o) => {
        delete i[o];
      }),
      delete i._chartjs));
}
function Mn(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const Sn = (function () {
  return typeof window > 'u'
    ? function (i) {
        return i();
      }
    : window.requestAnimationFrame;
})();
function Dn(i, t) {
  let e = [],
    s = !1;
  return function (...n) {
    ((e = n),
      s ||
        ((s = !0),
        Sn.call(window, () => {
          ((s = !1), i.apply(t, e));
        })));
  };
}
function ra(i, t) {
  let e;
  return function (...s) {
    return (
      t ? (clearTimeout(e), (e = setTimeout(i, t, s))) : i.apply(this, s),
      t
    );
  };
}
const Hi = (i) => (i === 'start' ? 'left' : i === 'end' ? 'right' : 'center'),
  q = (i, t, e) => (i === 'start' ? t : i === 'end' ? e : (t + e) / 2),
  la = (i, t, e, s) =>
    i === (s ? 'left' : 'right') ? e : i === 'center' ? (t + e) / 2 : t,
  Le = (i) => i === 0 || i === 1,
  cs = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin(((i - t) * $) / e)),
  hs = (i, t, e) => Math.pow(2, -10 * i) * Math.sin(((i - t) * $) / e) + 1,
  _e = {
    linear: (i) => i,
    easeInQuad: (i) => i * i,
    easeOutQuad: (i) => -i * (i - 2),
    easeInOutQuad: (i) =>
      (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
    easeInCubic: (i) => i * i * i,
    easeOutCubic: (i) => (i -= 1) * i * i + 1,
    easeInOutCubic: (i) =>
      (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
    easeInQuart: (i) => i * i * i * i,
    easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
    easeInOutQuart: (i) =>
      (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
    easeInQuint: (i) => i * i * i * i * i,
    easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
    easeInOutQuint: (i) =>
      (i /= 0.5) < 1
        ? 0.5 * i * i * i * i * i
        : 0.5 * ((i -= 2) * i * i * i * i + 2),
    easeInSine: (i) => -Math.cos(i * Y) + 1,
    easeOutSine: (i) => Math.sin(i * Y),
    easeInOutSine: (i) => -0.5 * (Math.cos(E * i) - 1),
    easeInExpo: (i) => (i === 0 ? 0 : Math.pow(2, 10 * (i - 1))),
    easeOutExpo: (i) => (i === 1 ? 1 : -Math.pow(2, -10 * i) + 1),
    easeInOutExpo: (i) =>
      Le(i)
        ? i
        : i < 0.5
          ? 0.5 * Math.pow(2, 10 * (i * 2 - 1))
          : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
    easeInCirc: (i) => (i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1)),
    easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
    easeInOutCirc: (i) =>
      (i /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - i * i) - 1)
        : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
    easeInElastic: (i) => (Le(i) ? i : cs(i, 0.075, 0.3)),
    easeOutElastic: (i) => (Le(i) ? i : hs(i, 0.075, 0.3)),
    easeInOutElastic(i) {
      return Le(i)
        ? i
        : i < 0.5
          ? 0.5 * cs(i * 2, 0.1125, 0.45)
          : 0.5 + 0.5 * hs(i * 2 - 1, 0.1125, 0.45);
    },
    easeInBack(i) {
      return i * i * ((1.70158 + 1) * i - 1.70158);
    },
    easeOutBack(i) {
      return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
    },
    easeInOutBack(i) {
      let t = 1.70158;
      return (i /= 0.5) < 1
        ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t))
        : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
    },
    easeInBounce: (i) => 1 - _e.easeOutBounce(1 - i),
    easeOutBounce(i) {
      return i < 1 / 2.75
        ? 7.5625 * i * i
        : i < 2 / 2.75
          ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75
          : i < 2.5 / 2.75
            ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375
            : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
    },
    easeInOutBounce: (i) =>
      i < 0.5
        ? _e.easeInBounce(i * 2) * 0.5
        : _e.easeOutBounce(i * 2 - 1) * 0.5 + 0.5,
  };
function An(i) {
  if (i && typeof i == 'object') {
    const t = i.toString();
    return t === '[object CanvasPattern]' || t === '[object CanvasGradient]';
  }
  return !1;
}
function ds(i) {
  return An(i) ? i : new ke(i);
}
function ui(i) {
  return An(i) ? i : new ke(i).saturate(0.5).darken(0.1).hexString();
}
const ca = ['x', 'y', 'borderWidth', 'radius', 'tension'],
  ha = ['color', 'borderColor', 'backgroundColor'];
function da(i) {
  (i.set('animation', {
    delay: void 0,
    duration: 1e3,
    easing: 'easeOutQuart',
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0,
  }),
    i.describe('animation', {
      _fallback: !1,
      _indexable: !1,
      _scriptable: (t) =>
        t !== 'onProgress' && t !== 'onComplete' && t !== 'fn',
    }),
    i.set('animations', {
      colors: { type: 'color', properties: ha },
      numbers: { type: 'number', properties: ca },
    }),
    i.describe('animations', { _fallback: 'animation' }),
    i.set('transitions', {
      active: { animation: { duration: 400 } },
      resize: { animation: { duration: 0 } },
      show: {
        animations: {
          colors: { from: 'transparent' },
          visible: { type: 'boolean', duration: 0 },
        },
      },
      hide: {
        animations: {
          colors: { to: 'transparent' },
          visible: { type: 'boolean', easing: 'linear', fn: (t) => t | 0 },
        },
      },
    }));
}
function ua(i) {
  i.set('layout', {
    autoPadding: !0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });
}
const us = new Map();
function fa(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = us.get(e);
  return (s || ((s = new Intl.NumberFormat(i, t)), us.set(e, s)), s);
}
function Wi(i, t, e) {
  return fa(t, e).format(i);
}
const ga = {
  values(i) {
    return N(i) ? i : '' + i;
  },
  numeric(i, t, e) {
    if (i === 0) return '0';
    const s = this.chart.options.locale;
    let n,
      o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      ((c < 1e-4 || c > 1e15) && (n = 'scientific'), (o = pa(i, e)));
    }
    const a = vn(Math.abs(o)),
      r = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0),
      l = { notation: n, minimumFractionDigits: r, maximumFractionDigits: r };
    return (Object.assign(l, this.options.ticks.format), Wi(i, s, l));
  },
};
function pa(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return (
    Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)),
    e
  );
}
var Cn = { formatters: ga };
function ma(i) {
  (i.set('scale', {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: 'ticks',
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1,
    },
    border: { display: !0, dash: [], dashOffset: 0, width: 1 },
    title: { display: !1, text: '', padding: { top: 4, bottom: 4 } },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: '',
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Cn.formatters.values,
      minor: {},
      major: {},
      align: 'center',
      crossAlign: 'near',
      showLabelBackdrop: !1,
      backdropColor: 'rgba(255, 255, 255, 0.75)',
      backdropPadding: 2,
    },
  }),
    i.route('scale.ticks', 'color', '', 'color'),
    i.route('scale.grid', 'color', '', 'borderColor'),
    i.route('scale.border', 'color', '', 'borderColor'),
    i.route('scale.title', 'color', '', 'color'),
    i.describe('scale', {
      _fallback: !1,
      _scriptable: (t) =>
        !t.startsWith('before') &&
        !t.startsWith('after') &&
        t !== 'callback' &&
        t !== 'parser',
      _indexable: (t) =>
        t !== 'borderDash' && t !== 'tickBorderDash' && t !== 'dash',
    }),
    i.describe('scales', { _fallback: 'scale' }),
    i.describe('scale.ticks', {
      _scriptable: (t) => t !== 'backdropPadding' && t !== 'callback',
      _indexable: (t) => t !== 'backdropPadding',
    }));
}
const Wt = Object.create(null),
  Ai = Object.create(null);
function xe(i, t) {
  if (!t) return i;
  const e = t.split('.');
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = Object.create(null));
  }
  return i;
}
function fi(i, t, e) {
  return typeof t == 'string' ? we(xe(i, t), e) : we(xe(i, ''), t);
}
class ba {
  constructor(t, e) {
    ((this.animation = void 0),
      (this.backgroundColor = 'rgba(0,0,0,0.1)'),
      (this.borderColor = 'rgba(0,0,0,0.1)'),
      (this.color = '#666'),
      (this.datasets = {}),
      (this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio()),
      (this.elements = {}),
      (this.events = [
        'mousemove',
        'mouseout',
        'click',
        'touchstart',
        'touchmove',
      ]),
      (this.font = {
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        style: 'normal',
        lineHeight: 1.2,
        weight: null,
      }),
      (this.hover = {}),
      (this.hoverBackgroundColor = (s, n) => ui(n.backgroundColor)),
      (this.hoverBorderColor = (s, n) => ui(n.borderColor)),
      (this.hoverColor = (s, n) => ui(n.color)),
      (this.indexAxis = 'x'),
      (this.interaction = {
        mode: 'nearest',
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
      this.describe(t),
      this.apply(e));
  }
  set(t, e) {
    return fi(this, t, e);
  }
  get(t) {
    return xe(this, t);
  }
  describe(t, e) {
    return fi(Ai, t, e);
  }
  override(t, e) {
    return fi(Wt, t, e);
  }
  route(t, e, s, n) {
    const o = xe(this, t),
      a = xe(this, s),
      r = '_' + e;
    Object.defineProperties(o, {
      [r]: { value: o[e], writable: !0 },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[r],
            c = a[n];
          return R(l) ? Object.assign({}, c, l) : T(l, c);
        },
        set(l) {
          this[r] = l;
        },
      },
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var V = new ba(
  {
    _scriptable: (i) => !i.startsWith('on'),
    _indexable: (i) => i !== 'events',
    hover: { _fallback: 'interaction' },
    interaction: { _scriptable: !1, _indexable: !1 },
  },
  [da, ua, ma],
);
function _a(i) {
  return !i || z(i.size) || z(i.family)
    ? null
    : (i.style ? i.style + ' ' : '') +
        (i.weight ? i.weight + ' ' : '') +
        i.size +
        'px ' +
        i.family;
}
function fs(i, t, e, s, n) {
  let o = t[n];
  return (
    o || ((o = t[n] = i.measureText(n).width), e.push(n)),
    o > s && (s = o),
    s
  );
}
function Tt(i, t, e) {
  const s = i.currentDevicePixelRatio,
    n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function gs(i, t) {
  (!t && !i) ||
    ((t = t || i.getContext('2d')),
    t.save(),
    t.resetTransform(),
    t.clearRect(0, 0, i.width, i.height),
    t.restore());
}
function ps(i, t, e, s) {
  On(i, t, e, s, null);
}
function On(i, t, e, s, n) {
  let o, a, r, l, c, h, d, u;
  const f = t.pointStyle,
    p = t.rotation,
    g = t.radius;
  let m = (p || 0) * Go;
  if (
    f &&
    typeof f == 'object' &&
    ((o = f.toString()),
    o === '[object HTMLImageElement]' || o === '[object HTMLCanvasElement]')
  ) {
    (i.save(),
      i.translate(e, s),
      i.rotate(m),
      i.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height),
      i.restore());
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch ((i.beginPath(), f)) {
      default:
        (n ? i.ellipse(e, s, n / 2, g, 0, 0, $) : i.arc(e, s, g, 0, $),
          i.closePath());
        break;
      case 'triangle':
        ((h = n ? n / 2 : g),
          i.moveTo(e + Math.sin(m) * h, s - Math.cos(m) * g),
          (m += os),
          i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * g),
          (m += os),
          i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * g),
          i.closePath());
        break;
      case 'rectRounded':
        ((c = g * 0.516),
          (l = g - c),
          (a = Math.cos(m + Pt) * l),
          (d = Math.cos(m + Pt) * (n ? n / 2 - c : l)),
          (r = Math.sin(m + Pt) * l),
          (u = Math.sin(m + Pt) * (n ? n / 2 - c : l)),
          i.arc(e - d, s - r, c, m - E, m - Y),
          i.arc(e + u, s - a, c, m - Y, m),
          i.arc(e + d, s + r, c, m, m + Y),
          i.arc(e - u, s + a, c, m + Y, m + E),
          i.closePath());
        break;
      case 'rect':
        if (!p) {
          ((l = Math.SQRT1_2 * g),
            (h = n ? n / 2 : l),
            i.rect(e - h, s - l, 2 * h, 2 * l));
          break;
        }
        m += Pt;
      case 'rectRot':
        ((d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          i.moveTo(e - d, s - r),
          i.lineTo(e + u, s - a),
          i.lineTo(e + d, s + r),
          i.lineTo(e - u, s + a),
          i.closePath());
        break;
      case 'crossRot':
        m += Pt;
      case 'cross':
        ((d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          i.moveTo(e - d, s - r),
          i.lineTo(e + d, s + r),
          i.moveTo(e + u, s - a),
          i.lineTo(e - u, s + a));
        break;
      case 'star':
        ((d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          i.moveTo(e - d, s - r),
          i.lineTo(e + d, s + r),
          i.moveTo(e + u, s - a),
          i.lineTo(e - u, s + a),
          (m += Pt),
          (d = Math.cos(m) * (n ? n / 2 : g)),
          (a = Math.cos(m) * g),
          (r = Math.sin(m) * g),
          (u = Math.sin(m) * (n ? n / 2 : g)),
          i.moveTo(e - d, s - r),
          i.lineTo(e + d, s + r),
          i.moveTo(e + u, s - a),
          i.lineTo(e - u, s + a));
        break;
      case 'line':
        ((a = n ? n / 2 : Math.cos(m) * g),
          (r = Math.sin(m) * g),
          i.moveTo(e - a, s - r),
          i.lineTo(e + a, s + r));
        break;
      case 'dash':
        (i.moveTo(e, s),
          i.lineTo(e + Math.cos(m) * (n ? n / 2 : g), s + Math.sin(m) * g));
        break;
      case !1:
        i.closePath();
        break;
    }
    (i.fill(), t.borderWidth > 0 && i.stroke());
  }
}
function Pn(i, t, e) {
  return (
    (e = e || 0.5),
    !t ||
      (i &&
        i.x > t.left - e &&
        i.x < t.right + e &&
        i.y > t.top - e &&
        i.y < t.bottom + e)
  );
}
function Vi(i, t) {
  (i.save(),
    i.beginPath(),
    i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top),
    i.clip());
}
function $i(i) {
  i.restore();
}
function xa(i, t) {
  (t.translation && i.translate(t.translation[0], t.translation[1]),
    z(t.rotation) || i.rotate(t.rotation),
    t.color && (i.fillStyle = t.color),
    t.textAlign && (i.textAlign = t.textAlign),
    t.textBaseline && (i.textBaseline = t.textBaseline));
}
function ya(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s),
      a = t - o.actualBoundingBoxLeft,
      r = t + o.actualBoundingBoxRight,
      l = e - o.actualBoundingBoxAscent,
      c = e + o.actualBoundingBoxDescent,
      h = n.strikethrough ? (l + c) / 2 : c;
    ((i.strokeStyle = i.fillStyle),
      i.beginPath(),
      (i.lineWidth = n.decorationWidth || 2),
      i.moveTo(a, h),
      i.lineTo(r, h),
      i.stroke());
  }
}
function va(i, t) {
  const e = i.fillStyle;
  ((i.fillStyle = t.color),
    i.fillRect(t.left, t.top, t.width, t.height),
    (i.fillStyle = e));
}
function Se(i, t, e, s, n, o = {}) {
  const a = N(t) ? t : [t],
    r = o.strokeWidth > 0 && o.strokeColor !== '';
  let l, c;
  for (i.save(), i.font = n.string, xa(i, o), l = 0; l < a.length; ++l)
    ((c = a[l]),
      o.backdrop && va(i, o.backdrop),
      r &&
        (o.strokeColor && (i.strokeStyle = o.strokeColor),
        z(o.strokeWidth) || (i.lineWidth = o.strokeWidth),
        i.strokeText(c, e, s, o.maxWidth)),
      i.fillText(c, e, s, o.maxWidth),
      ya(i, e, s, c, o),
      (s += Number(n.lineHeight)));
  i.restore();
}
function Je(i, t) {
  const { x: e, y: s, w: n, h: o, radius: a } = t;
  (i.arc(e + a.topLeft, s + a.topLeft, a.topLeft, 1.5 * E, E, !0),
    i.lineTo(e, s + o - a.bottomLeft),
    i.arc(e + a.bottomLeft, s + o - a.bottomLeft, a.bottomLeft, E, Y, !0),
    i.lineTo(e + n - a.bottomRight, s + o),
    i.arc(
      e + n - a.bottomRight,
      s + o - a.bottomRight,
      a.bottomRight,
      Y,
      0,
      !0,
    ),
    i.lineTo(e + n, s + a.topRight),
    i.arc(e + n - a.topRight, s + a.topRight, a.topRight, 0, -Y, !0),
    i.lineTo(e + a.topLeft, s));
}
const ka = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
  wa = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Ma(i, t) {
  const e = ('' + i).match(ka);
  if (!e || e[1] === 'normal') return t * 1.2;
  switch (((i = +e[2]), e[3])) {
    case 'px':
      return i;
    case '%':
      i /= 100;
      break;
  }
  return t * i;
}
const Sa = (i) => +i || 0;
function ji(i, t) {
  const e = {},
    s = R(t),
    n = s ? Object.keys(t) : t,
    o = R(i) ? (s ? (a) => T(i[a], i[t[a]]) : (a) => i[a]) : () => i;
  for (const a of n) e[a] = Sa(o(a));
  return e;
}
function Tn(i) {
  return ji(i, { top: 'y', right: 'x', bottom: 'y', left: 'x' });
}
function qt(i) {
  return ji(i, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);
}
function rt(i) {
  const t = Tn(i);
  return ((t.width = t.left + t.right), (t.height = t.top + t.bottom), t);
}
function Z(i, t) {
  ((i = i || {}), (t = t || V.font));
  let e = T(i.size, t.size);
  typeof e == 'string' && (e = parseInt(e, 10));
  let s = T(i.style, t.style);
  s &&
    !('' + s).match(wa) &&
    (console.warn('Invalid font style specified: "' + s + '"'), (s = void 0));
  const n = {
    family: T(i.family, t.family),
    lineHeight: Ma(T(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: T(i.weight, t.weight),
    string: '',
  };
  return ((n.string = _a(n)), n);
}
function Fe(i, t, e, s) {
  let n, o, a;
  for (n = 0, o = i.length; n < o; ++n)
    if (((a = i[n]), a !== void 0 && a !== void 0)) return a;
}
function Da(i, t, e) {
  const { min: s, max: n } = i,
    o = xn(t, (n - s) / 2),
    a = (r, l) => (e && r === 0 ? 0 : r + l);
  return { min: a(s, -Math.abs(o)), max: a(n, o) };
}
function ie(i, t) {
  return Object.assign(Object.create(i), t);
}
function Ni(i, t = [''], e, s, n = () => i[0]) {
  const o = e || i;
  typeof s > 'u' && (s = In('_fallback', i));
  const a = {
    [Symbol.toStringTag]: 'Object',
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (r) => Ni([r, ...i], t, o, s),
  };
  return new Proxy(a, {
    deleteProperty(r, l) {
      return (delete r[l], delete r._keys, delete i[0][l], !0);
    },
    get(r, l) {
      return Ln(r, l, () => Fa(l, t, i, r));
    },
    getOwnPropertyDescriptor(r, l) {
      return Reflect.getOwnPropertyDescriptor(r._scopes[0], l);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    has(r, l) {
      return bs(r).includes(l);
    },
    ownKeys(r) {
      return bs(r);
    },
    set(r, l, c) {
      const h = r._storage || (r._storage = n());
      return ((r[l] = h[l] = c), delete r._keys, !0);
    },
  });
}
function te(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: new Set(),
    _descriptors: Rn(i, s),
    setContext: (o) => te(i, o, e, s),
    override: (o) => te(i.override(o), t, e, s),
  };
  return new Proxy(n, {
    deleteProperty(o, a) {
      return (delete o[a], delete i[a], !0);
    },
    get(o, a, r) {
      return Ln(o, a, () => Ca(o, a, r));
    },
    getOwnPropertyDescriptor(o, a) {
      return o._descriptors.allKeys
        ? Reflect.has(i, a)
          ? { enumerable: !0, configurable: !0 }
          : void 0
        : Reflect.getOwnPropertyDescriptor(i, a);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    has(o, a) {
      return Reflect.has(i, a);
    },
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    set(o, a, r) {
      return ((i[a] = r), delete o[a], !0);
    },
  });
}
function Rn(i, t = { scriptable: !0, indexable: !0 }) {
  const {
    _scriptable: e = t.scriptable,
    _indexable: s = t.indexable,
    _allKeys: n = t.allKeys,
  } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: At(e) ? e : () => e,
    isIndexable: At(s) ? s : () => s,
  };
}
const Aa = (i, t) => (i ? i + zi(t) : t),
  Yi = (i, t) =>
    R(t) &&
    i !== 'adapters' &&
    (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Ln(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t) || t === 'constructor')
    return i[t];
  const s = e();
  return ((i[t] = s), s);
}
function Ca(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: a } = i;
  let r = s[t];
  return (
    At(r) && a.isScriptable(t) && (r = Oa(t, r, i, e)),
    N(r) && r.length && (r = Pa(t, r, i, a.isIndexable)),
    Yi(t, r) && (r = te(r, n, o && o[t], a)),
    r
  );
}
function Oa(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: a, _stack: r } = e;
  if (r.has(i))
    throw new Error(
      'Recursion detected: ' + Array.from(r).join('->') + '->' + i,
    );
  r.add(i);
  let l = t(o, a || s);
  return (r.delete(i), Yi(i, l) && (l = Ui(n._scopes, n, i, l)), l);
}
function Pa(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: a, _descriptors: r } = e;
  if (typeof o.index < 'u' && s(i)) return t[o.index % t.length];
  if (R(t[0])) {
    const l = t,
      c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = Ui(c, n, i, h);
      t.push(te(d, o, a && a[i], r));
    }
  }
  return t;
}
function Fn(i, t, e) {
  return At(i) ? i(t, e) : i;
}
const Ta = (i, t) => (i === !0 ? t : typeof i == 'string' ? Ht(t, i) : void 0);
function Ra(i, t, e, s, n) {
  for (const o of t) {
    const a = Ta(e, o);
    if (a) {
      i.add(a);
      const r = Fn(a._fallback, e, n);
      if (typeof r < 'u' && r !== e && r !== s) return r;
    } else if (a === !1 && typeof s < 'u' && e !== s) return null;
  }
  return !1;
}
function Ui(i, t, e, s) {
  const n = t._rootScopes,
    o = Fn(t._fallback, e, s),
    a = [...i, ...n],
    r = new Set();
  r.add(s);
  let l = ms(r, a, e, o || e, s);
  return l === null ||
    (typeof o < 'u' && o !== e && ((l = ms(r, a, o, l, s)), l === null))
    ? !1
    : Ni(Array.from(r), [''], n, o, () => La(t, e, s));
}
function ms(i, t, e, s, n) {
  for (; e; ) e = Ra(i, t, e, s, n);
  return e;
}
function La(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return N(n) && R(e) ? e : n || {};
}
function Fa(i, t, e, s) {
  let n;
  for (const o of t)
    if (((n = In(Aa(o, i), e)), typeof n < 'u'))
      return Yi(i, n) ? Ui(e, s, i, n) : n;
}
function In(i, t) {
  for (const e of t) {
    if (!e) continue;
    const s = e[i];
    if (typeof s < 'u') return s;
  }
}
function bs(i) {
  let t = i._keys;
  return (t || (t = i._keys = Ia(i._scopes)), t);
}
function Ia(i) {
  const t = new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith('_'))) t.add(s);
  return Array.from(t);
}
function Xi() {
  return typeof window < 'u' && typeof document < 'u';
}
function Ki(i) {
  let t = i.parentNode;
  return (t && t.toString() === '[object ShadowRoot]' && (t = t.host), t);
}
function ti(i, t, e) {
  let s;
  return (
    typeof i == 'string'
      ? ((s = parseInt(i, 10)),
        i.indexOf('%') !== -1 && (s = (s / 100) * t.parentNode[e]))
      : (s = i),
    s
  );
}
const ai = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function Ea(i, t) {
  return ai(i).getPropertyValue(t);
}
const za = ['top', 'right', 'bottom', 'left'];
function Bt(i, t, e) {
  const s = {};
  e = e ? '-' + e : '';
  for (let n = 0; n < 4; n++) {
    const o = za[n];
    s[o] = parseFloat(i[t + '-' + o + e]) || 0;
  }
  return ((s.width = s.left + s.right), (s.height = s.top + s.bottom), s);
}
const Ba = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function Ha(i, t) {
  const e = i.touches,
    s = e && e.length ? e[0] : i,
    { offsetX: n, offsetY: o } = s;
  let a = !1,
    r,
    l;
  if (Ba(n, o, i.target)) ((r = n), (l = o));
  else {
    const c = t.getBoundingClientRect();
    ((r = s.clientX - c.left), (l = s.clientY - c.top), (a = !0));
  }
  return { x: r, y: l, box: a };
}
function Lt(i, t) {
  if ('native' in i) return i;
  const { canvas: e, currentDevicePixelRatio: s } = t,
    n = ai(e),
    o = n.boxSizing === 'border-box',
    a = Bt(n, 'padding'),
    r = Bt(n, 'border', 'width'),
    { x: l, y: c, box: h } = Ha(i, e),
    d = a.left + (h && r.left),
    u = a.top + (h && r.top);
  let { width: f, height: p } = t;
  return (
    o && ((f -= a.width + r.width), (p -= a.height + r.height)),
    {
      x: Math.round((((l - d) / f) * e.width) / s),
      y: Math.round((((c - u) / p) * e.height) / s),
    }
  );
}
function Wa(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = i && Ki(i);
    if (!o) ((t = i.clientWidth), (e = i.clientHeight));
    else {
      const a = o.getBoundingClientRect(),
        r = ai(o),
        l = Bt(r, 'border', 'width'),
        c = Bt(r, 'padding');
      ((t = a.width - c.width - l.width),
        (e = a.height - c.height - l.height),
        (s = ti(r.maxWidth, o, 'clientWidth')),
        (n = ti(r.maxHeight, o, 'clientHeight')));
    }
  }
  return { width: t, height: e, maxWidth: s || Ge, maxHeight: n || Ge };
}
const wt = (i) => Math.round(i * 10) / 10;
function Va(i, t, e, s) {
  const n = ai(i),
    o = Bt(n, 'margin'),
    a = ti(n.maxWidth, i, 'clientWidth') || Ge,
    r = ti(n.maxHeight, i, 'clientHeight') || Ge,
    l = Wa(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === 'content-box') {
    const u = Bt(n, 'border', 'width'),
      f = Bt(n, 'padding');
    ((c -= f.width + u.width), (h -= f.height + u.height));
  }
  return (
    (c = Math.max(0, c - o.width)),
    (h = Math.max(0, s ? c / s : h - o.height)),
    (c = wt(Math.min(c, a, l.maxWidth))),
    (h = wt(Math.min(h, r, l.maxHeight))),
    c && !h && (h = wt(c / 2)),
    (t !== void 0 || e !== void 0) &&
      s &&
      l.height &&
      h > l.height &&
      ((h = l.height), (c = wt(Math.floor(h * s)))),
    { width: c, height: h }
  );
}
function _s(i, t, e) {
  const s = t || 1,
    n = wt(i.height * s),
    o = wt(i.width * s);
  ((i.height = wt(i.height)), (i.width = wt(i.width)));
  const a = i.canvas;
  return (
    a.style &&
      (e || (!a.style.height && !a.style.width)) &&
      ((a.style.height = `${i.height}px`), (a.style.width = `${i.width}px`)),
    i.currentDevicePixelRatio !== s || a.height !== n || a.width !== o
      ? ((i.currentDevicePixelRatio = s),
        (a.height = n),
        (a.width = o),
        i.ctx.setTransform(s, 0, 0, s, 0, 0),
        !0)
      : !1
  );
}
const $a = (function () {
  let i = !1;
  try {
    const t = {
      get passive() {
        return ((i = !0), !1);
      },
    };
    Xi() &&
      (window.addEventListener('test', null, t),
      window.removeEventListener('test', null, t));
  } catch {}
  return i;
})();
function xs(i, t) {
  const e = Ea(i, t),
    s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
const ja = function (i, t) {
    return {
      x(e) {
        return i + i + t - e;
      },
      setWidth(e) {
        t = e;
      },
      textAlign(e) {
        return e === 'center' ? e : e === 'right' ? 'left' : 'right';
      },
      xPlus(e, s) {
        return e - s;
      },
      leftForLtr(e, s) {
        return e - s;
      },
    };
  },
  Na = function () {
    return {
      x(i) {
        return i;
      },
      setWidth(i) {},
      textAlign(i) {
        return i;
      },
      xPlus(i, t) {
        return i + t;
      },
      leftForLtr(i, t) {
        return i;
      },
    };
  };
function Gt(i, t, e) {
  return i ? ja(t, e) : Na();
}
function En(i, t) {
  let e, s;
  (t === 'ltr' || t === 'rtl') &&
    ((e = i.canvas.style),
    (s = [e.getPropertyValue('direction'), e.getPropertyPriority('direction')]),
    e.setProperty('direction', t, 'important'),
    (i.prevTextDirection = s));
}
function zn(i, t) {
  t !== void 0 &&
    (delete i.prevTextDirection,
    i.canvas.style.setProperty('direction', t[0], t[1]));
}
function Ie(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function Ya(i, t) {
  const { xScale: e, yScale: s } = i;
  return e && s
    ? {
        left: Ie(e, t, 'left'),
        right: Ie(e, t, 'right'),
        top: Ie(s, t, 'top'),
        bottom: Ie(s, t, 'bottom'),
      }
    : t;
}
function Ua(i, t) {
  const e = t._clip;
  if (e.disabled) return !1;
  const s = Ya(t, i.chartArea);
  return {
    left: e.left === !1 ? 0 : s.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? i.width : s.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : s.top - (e.top === !0 ? 0 : e.top),
    bottom:
      e.bottom === !1 ? i.height : s.bottom + (e.bottom === !0 ? 0 : e.bottom),
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */ class Xa {
  constructor() {
    ((this._request = null),
      (this._charts = new Map()),
      (this._running = !1),
      (this._lastDate = void 0));
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n],
      a = e.duration;
    o.forEach((r) =>
      r({
        chart: t,
        initial: e.initial,
        numSteps: a,
        currentStep: Math.min(s - e.start, a),
      }),
    );
  }
  _refresh() {
    this._request ||
      ((this._running = !0),
      (this._request = Sn.call(window, () => {
        (this._update(),
          (this._request = null),
          this._running && this._refresh());
      })));
  }
  _update(t = Date.now()) {
    let e = 0;
    (this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length) return;
      const o = s.items;
      let a = o.length - 1,
        r = !1,
        l;
      for (; a >= 0; --a)
        ((l = o[a]),
          l._active
            ? (l._total > s.duration && (s.duration = l._total),
              l.tick(t),
              (r = !0))
            : ((o[a] = o[o.length - 1]), o.pop()));
      (r && (n.draw(), this._notify(n, s, t, 'progress')),
        o.length ||
          ((s.running = !1),
          this._notify(n, s, t, 'complete'),
          (s.initial = !1)),
        (e += o.length));
    }),
      (this._lastDate = t),
      e === 0 && (this._running = !1));
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return (
      s ||
        ((s = {
          running: !1,
          initial: !0,
          items: [],
          listeners: { complete: [], progress: [] },
        }),
        e.set(t, s)),
      s
    );
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e &&
      ((e.running = !0),
      (e.start = Date.now()),
      (e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0)),
      this._refresh());
  }
  running(t) {
    if (!this._running) return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length) return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n) s[n].cancel();
    ((e.items = []), this._notify(t, e, Date.now(), 'complete'));
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var gt = new Xa();
const ys = 'transparent',
  Ka = {
    boolean(i, t, e) {
      return e > 0.5 ? t : i;
    },
    color(i, t, e) {
      const s = ds(i || ys),
        n = s.valid && ds(t || ys);
      return n && n.valid ? n.mix(s, e).hexString() : t;
    },
    number(i, t, e) {
      return i + (t - i) * e;
    },
  };
class qa {
  constructor(t, e, s, n) {
    const o = e[s];
    n = Fe([t.to, n, o, t.from]);
    const a = Fe([t.from, o, n]);
    ((this._active = !0),
      (this._fn = t.fn || Ka[t.type || typeof a]),
      (this._easing = _e[t.easing] || _e.linear),
      (this._start = Math.floor(Date.now() + (t.delay || 0))),
      (this._duration = this._total = Math.floor(t.duration)),
      (this._loop = !!t.loop),
      (this._target = e),
      (this._prop = s),
      (this._from = a),
      (this._to = n),
      (this._promises = void 0));
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop],
        o = s - this._start,
        a = this._duration - o;
      ((this._start = s),
        (this._duration = Math.floor(Math.max(a, t.duration))),
        (this._total += o),
        (this._loop = !!t.loop),
        (this._to = Fe([t.to, e, n, t.from])),
        (this._from = Fe([t.from, n, e])));
    }
  }
  cancel() {
    this._active &&
      (this.tick(Date.now()), (this._active = !1), this._notify(!1));
  }
  tick(t) {
    const e = t - this._start,
      s = this._duration,
      n = this._prop,
      o = this._from,
      a = this._loop,
      r = this._to;
    let l;
    if (((this._active = o !== r && (a || e < s)), !this._active)) {
      ((this._target[n] = r), this._notify(!0));
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    ((l = (e / s) % 2),
      (l = a && l > 1 ? 2 - l : l),
      (l = this._easing(Math.min(1, Math.max(0, l)))),
      (this._target[n] = this._fn(o, r, l)));
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({ res: e, rej: s });
    });
  }
  _notify(t) {
    const e = t ? 'res' : 'rej',
      s = this._promises || [];
    for (let n = 0; n < s.length; n++) s[n][e]();
  }
}
class Bn {
  constructor(t, e) {
    ((this._chart = t), (this._properties = new Map()), this.configure(e));
  }
  configure(t) {
    if (!R(t)) return;
    const e = Object.keys(V.animation),
      s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!R(o)) return;
      const a = {};
      for (const r of e) a[r] = o[r];
      ((N(o.properties) && o.properties) || [n]).forEach((r) => {
        (r === n || !s.has(r)) && s.set(r, a);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options,
      n = Za(t, s);
    if (!n) return [];
    const o = this._createAnimations(n, s);
    return (
      s.$shared &&
        Ga(t.options.$animations, s).then(
          () => {
            t.options = s;
          },
          () => {},
        ),
      o
    );
  }
  _createAnimations(t, e) {
    const s = this._properties,
      n = [],
      o = t.$animations || (t.$animations = {}),
      a = Object.keys(e),
      r = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const c = a[l];
      if (c.charAt(0) === '$') continue;
      if (c === 'options') {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const u = s.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, r);
          continue;
        } else d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      ((o[c] = d = new qa(u, t, c, h)), n.push(d));
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length) return (gt.add(this._chart, s), !0);
  }
}
function Ga(i, t) {
  const e = [],
    s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function Za(i, t) {
  if (!t) return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return (
    e.$shared &&
      (i.options = e = Object.assign({}, e, { $shared: !1, $animations: {} })),
    e
  );
}
function vs(i, t) {
  const e = (i && i.options) || {},
    s = e.reverse,
    n = e.min === void 0 ? t : 0,
    o = e.max === void 0 ? t : 0;
  return { start: s ? o : n, end: s ? n : o };
}
function Qa(i, t, e) {
  if (e === !1) return !1;
  const s = vs(i, e),
    n = vs(t, e);
  return { top: n.end, right: s.end, bottom: n.start, left: s.start };
}
function Ja(i) {
  let t, e, s, n;
  return (
    R(i)
      ? ((t = i.top), (e = i.right), (s = i.bottom), (n = i.left))
      : (t = e = s = n = i),
    { top: t, right: e, bottom: s, left: n, disabled: i === !1 }
  );
}
function Hn(i, t) {
  const e = [],
    s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n) e.push(s[n].index);
  return e;
}
function ks(i, t, e, s = {}) {
  const n = i.keys,
    o = s.mode === 'single';
  let a, r, l, c;
  if (t === null) return;
  let h = !1;
  for (a = 0, r = n.length; a < r; ++a) {
    if (((l = +n[a]), l === e)) {
      if (((h = !0), s.all)) continue;
      break;
    }
    ((c = i.values[l]), at(c) && (o || t === 0 || Dt(t) === Dt(c)) && (t += c));
  }
  return !h && !s.all ? 0 : t;
}
function tr(i, t) {
  const { iScale: e, vScale: s } = t,
    n = e.axis === 'x' ? 'x' : 'y',
    o = s.axis === 'x' ? 'x' : 'y',
    a = Object.keys(i),
    r = new Array(a.length);
  let l, c, h;
  for (l = 0, c = a.length; l < c; ++l)
    ((h = a[l]), (r[l] = { [n]: h, [o]: i[h] }));
  return r;
}
function gi(i, t) {
  const e = i && i.options.stacked;
  return e || (e === void 0 && t.stack !== void 0);
}
function er(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function ir(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY,
  };
}
function sr(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function ws(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if ((e && o > 0) || (!e && o < 0)) return n.index;
  }
  return null;
}
function Ms(i, t) {
  const { chart: e, _cachedMeta: s } = i,
    n = e._stacks || (e._stacks = {}),
    { iScale: o, vScale: a, index: r } = s,
    l = o.axis,
    c = a.axis,
    h = er(o, a, s),
    d = t.length;
  let u;
  for (let f = 0; f < d; ++f) {
    const p = t[f],
      { [l]: g, [c]: m } = p,
      b = p._stacks || (p._stacks = {});
    ((u = b[c] = sr(n, h, g)),
      (u[r] = m),
      (u._top = ws(u, a, !0, s.type)),
      (u._bottom = ws(u, a, !1, s.type)));
    const x = u._visualValues || (u._visualValues = {});
    x[r] = m;
  }
}
function pi(i, t) {
  const e = i.scales;
  return Object.keys(e)
    .filter((s) => e[s].axis === t)
    .shift();
}
function nr(i, t) {
  return ie(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: 'default',
    type: 'dataset',
  });
}
function or(i, t, e) {
  return ie(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: 'default',
    type: 'data',
  });
}
function re(i, t) {
  const e = i.controller.index,
    s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0) return;
      (delete o[s][e],
        o[s]._visualValues !== void 0 &&
          o[s]._visualValues[e] !== void 0 &&
          delete o[s]._visualValues[e]);
    }
  }
}
const mi = (i) => i === 'reset' || i === 'none',
  Ss = (i, t) => (t ? i : Object.assign({}, i)),
  ar = (i, t, e) =>
    i && !t.hidden && t._stacked && { keys: Hn(e, !0), values: null };
class Zt {
  constructor(t, e) {
    ((this.chart = t),
      (this._ctx = t.ctx),
      (this.index = e),
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
      (this.datasetElementType = new.target.datasetElementType),
      (this.dataElementType = new.target.dataElementType),
      this.initialize());
  }
  initialize() {
    const t = this._cachedMeta;
    (this.configure(),
      this.linkScales(),
      (t._stacked = gi(t.vScale, t)),
      this.addElements(),
      this.options.fill &&
        !this.chart.isPluginEnabled('filler') &&
        console.warn(
          "Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options",
        ));
  }
  updateIndex(t) {
    (this.index !== t && re(this._cachedMeta), (this.index = t));
  }
  linkScales() {
    const t = this.chart,
      e = this._cachedMeta,
      s = this.getDataset(),
      n = (d, u, f, p) => (d === 'x' ? u : d === 'r' ? p : f),
      o = (e.xAxisID = T(s.xAxisID, pi(t, 'x'))),
      a = (e.yAxisID = T(s.yAxisID, pi(t, 'y'))),
      r = (e.rAxisID = T(s.rAxisID, pi(t, 'r'))),
      l = e.indexAxis,
      c = (e.iAxisID = n(l, o, a, r)),
      h = (e.vAxisID = n(l, a, o, r));
    ((e.xScale = this.getScaleForId(o)),
      (e.yScale = this.getScaleForId(a)),
      (e.rScale = this.getScaleForId(r)),
      (e.iScale = this.getScaleForId(c)),
      (e.vScale = this.getScaleForId(h)));
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
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update('reset');
  }
  _destroy() {
    const t = this._cachedMeta;
    (this._data && ls(this._data, this), t._stacked && re(t));
  }
  _dataCheck() {
    const t = this.getDataset(),
      e = t.data || (t.data = []),
      s = this._data;
    if (R(e)) {
      const n = this._cachedMeta;
      this._data = tr(e, n);
    } else if (s !== e) {
      if (s) {
        ls(s, this);
        const n = this._cachedMeta;
        (re(n), (n._parsed = []));
      }
      (e && Object.isExtensible(e) && aa(e, this),
        (this._syncList = []),
        (this._data = e));
    }
  }
  addElements() {
    const t = this._cachedMeta;
    (this._dataCheck(),
      this.datasetElementType && (t.dataset = new this.datasetElementType()));
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta,
      s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    ((e._stacked = gi(e.vScale, e)),
      e.stack !== s.stack && ((n = !0), re(e), (e.stack = s.stack)),
      this._resyncElements(t),
      (n || o !== e._stacked) &&
        (Ms(this, e._parsed), (e._stacked = gi(e.vScale, e))));
  }
  configure() {
    const t = this.chart.config,
      e = t.datasetScopeKeys(this._type),
      s = t.getOptionScopes(this.getDataset(), e, !0);
    ((this.options = t.createResolver(s, this.getContext())),
      (this._parsing = this.options.parsing),
      (this._cachedDataOpts = {}));
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this,
      { iScale: o, _stacked: a } = s,
      r = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted,
      c = t > 0 && s._parsed[t - 1],
      h,
      d,
      u;
    if (this._parsing === !1) ((s._parsed = n), (s._sorted = !0), (u = n));
    else {
      N(n[t])
        ? (u = this.parseArrayData(s, n, t, e))
        : R(n[t])
          ? (u = this.parseObjectData(s, n, t, e))
          : (u = this.parsePrimitiveData(s, n, t, e));
      const f = () => d[r] === null || (c && d[r] < c[r]);
      for (h = 0; h < e; ++h)
        ((s._parsed[h + t] = d = u[h]), l && (f() && (l = !1), (c = d)));
      s._sorted = l;
    }
    a && Ms(this, u);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: a } = t,
      r = o.axis,
      l = a.axis,
      c = o.getLabels(),
      h = o === a,
      d = new Array(n);
    let u, f, p;
    for (u = 0, f = n; u < f; ++u)
      ((p = u + s),
        (d[u] = { [r]: h || o.parse(c[p], p), [l]: a.parse(e[p], p) }));
    return d;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: a } = t,
      r = new Array(n);
    let l, c, h, d;
    for (l = 0, c = n; l < c; ++l)
      ((h = l + s),
        (d = e[h]),
        (r[l] = { x: o.parse(d[0], h), y: a.parse(d[1], h) }));
    return r;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: a } = t,
      { xAxisKey: r = 'x', yAxisKey: l = 'y' } = this._parsing,
      c = new Array(n);
    let h, d, u, f;
    for (h = 0, d = n; h < d; ++h)
      ((u = h + s),
        (f = e[u]),
        (c[h] = { x: o.parse(Ht(f, r), u), y: a.parse(Ht(f, l), u) }));
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart,
      o = this._cachedMeta,
      a = e[t.axis],
      r = { keys: Hn(n, !0), values: e._stacks[t.axis]._visualValues };
    return ks(r, a, o.index, { mode: s });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let a = o === null ? NaN : o;
    const r = n && s._stacks[e.axis];
    (n && r && ((n.values = r), (a = ks(n, o, this._cachedMeta.index))),
      (t.min = Math.min(t.min, a)),
      (t.max = Math.max(t.max, a)));
  }
  getMinMax(t, e) {
    const s = this._cachedMeta,
      n = s._parsed,
      o = s._sorted && t === s.iScale,
      a = n.length,
      r = this._getOtherScale(t),
      l = ar(e, s, this.chart),
      c = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
      { min: h, max: d } = ir(r);
    let u, f;
    function p() {
      f = n[u];
      const g = f[r.axis];
      return !at(f[t.axis]) || h > g || d < g;
    }
    for (
      u = 0;
      u < a && !(!p() && (this.updateRangeFromParsed(c, t, f, l), o));
      ++u
    );
    if (o) {
      for (u = a - 1; u >= 0; --u)
        if (!p()) {
          this.updateRangeFromParsed(c, t, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed,
      s = [];
    let n, o, a;
    for (n = 0, o = e.length; n < o; ++n)
      ((a = e[n][t.axis]), at(a) && s.push(a));
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta,
      s = e.iScale,
      n = e.vScale,
      o = this.getParsed(t);
    return {
      label: s ? '' + s.getLabelForValue(o[s.axis]) : '',
      value: n ? '' + n.getLabelForValue(o[n.axis]) : '',
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    (this.update(t || 'default'),
      (e._clip = Ja(
        T(this.options.clip, Qa(e.xScale, e.yScale, this.getMaxOverflow())),
      )));
  }
  update(t) {}
  draw() {
    const t = this._ctx,
      e = this.chart,
      s = this._cachedMeta,
      n = s.data || [],
      o = e.chartArea,
      a = [],
      r = this._drawStart || 0,
      l = this._drawCount || n.length - r,
      c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, r, l), h = r; h < r + l; ++h) {
      const d = n[h];
      d.hidden || (d.active && c ? a.push(d) : d.draw(t, o));
    }
    for (h = 0; h < a.length; ++h) a[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? 'active' : 'default';
    return t === void 0 && this._cachedMeta.dataset
      ? this.resolveDatasetElementOptions(s)
      : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[t];
      ((o = a.$context || (a.$context = or(this.getContext(), t, a))),
        (o.parsed = this.getParsed(t)),
        (o.raw = n.data[t]),
        (o.index = o.dataIndex = t));
    } else
      ((o =
        this.$context ||
        (this.$context = nr(this.chart.getContext(), this.index))),
        (o.dataset = n),
        (o.index = o.datasetIndex = this.index));
    return ((o.active = !!e), (o.mode = s), o);
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = 'default', s) {
    const n = e === 'active',
      o = this._cachedDataOpts,
      a = t + '-' + e,
      r = o[a],
      l = this.enableOptionSharing && Me(s);
    if (r) return Ss(r, l);
    const c = this.chart.config,
      h = c.datasetElementScopeKeys(this._type, t),
      d = n ? [`${t}Hover`, 'hover', t, ''] : [t, ''],
      u = c.getOptionScopes(this.getDataset(), h),
      f = Object.keys(V.elements[t]),
      p = () => this.getContext(s, n, e),
      g = c.resolveNamedOptions(u, f, p, d);
    return (
      g.$shared && ((g.$shared = l), (o[a] = Object.freeze(Ss(g, l)))),
      g
    );
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart,
      o = this._cachedDataOpts,
      a = `animation-${e}`,
      r = o[a];
    if (r) return r;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config,
        d = h.datasetAnimationScopeKeys(this._type, e),
        u = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(u, this.getContext(t, s, e));
    }
    const c = new Bn(n, l && l.animations);
    return (l && l._cacheable && (o[a] = Object.freeze(c)), c);
  }
  getSharedOptions(t) {
    if (t.$shared)
      return (
        this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
      );
  }
  includeOptions(t, e) {
    return !e || mi(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e),
      n = this._sharedOptions,
      o = this.getSharedOptions(s),
      a = this.includeOptions(e, o) || o !== n;
    return (
      this.updateSharedOptions(o, e, s),
      { sharedOptions: o, includeOptions: a }
    );
  }
  updateElement(t, e, s, n) {
    mi(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !mi(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: (!n && this.getSharedOptions(o)) || o,
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, 'active', !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, 'active', !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, 'active', !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, 'active', !0);
  }
  _resyncElements(t) {
    const e = this._data,
      s = this._cachedMeta.data;
    for (const [r, l, c] of this._syncList) this[r](l, c);
    this._syncList = [];
    const n = s.length,
      o = e.length,
      a = Math.min(o, n);
    (a && this.parse(0, a),
      o > n
        ? this._insertElements(n, o - n, t)
        : o < n && this._removeElements(o, n - o));
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta,
      o = n.data,
      a = t + e;
    let r;
    const l = (c) => {
      for (c.length += e, r = c.length - 1; r >= a; r--) c[r] = c[r - e];
    };
    for (l(o), r = t; r < a; ++r) o[r] = new this.dataElementType();
    (this._parsing && l(n._parsed),
      this.parse(t, e),
      s && this.updateElements(o, t, e, 'reset'));
  }
  updateElements(t, e, s, n) {}
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && re(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing) this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([this.index, ...t]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync(['_insertElements', this.getDataset().data.length - t, t]);
  }
  _onDataPop() {
    this._sync(['_removeElements', this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(['_removeElements', 0, 1]);
  }
  _onDataSplice(t, e) {
    e && this._sync(['_removeElements', t, e]);
    const s = arguments.length - 2;
    s && this._sync(['_insertElements', t, s]);
  }
  _onDataUnshift() {
    this._sync(['_insertElements', 0, arguments.length]);
  }
}
(A(Zt, 'defaults', {}),
  A(Zt, 'datasetElementType', null),
  A(Zt, 'dataElementType', null));
function rr(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = e.length; n < o; n++)
      s = s.concat(e[n].controller.getAllParsedValues(i));
    i._cache.$bar = Mn(s.sort((n, o) => n - o));
  }
  return i._cache.$bar;
}
function lr(i) {
  const t = i.iScale,
    e = rr(t, i.type);
  let s = t._length,
    n,
    o,
    a,
    r;
  const l = () => {
    a === 32767 ||
      a === -32768 ||
      (Me(r) && (s = Math.min(s, Math.abs(a - r) || s)), (r = a));
  };
  for (n = 0, o = e.length; n < o; ++n) ((a = t.getPixelForValue(e[n])), l());
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    ((a = t.getPixelForTick(n)), l());
  return s;
}
function cr(i, t, e, s) {
  const n = e.barThickness;
  let o, a;
  return (
    z(n)
      ? ((o = t.min * e.categoryPercentage), (a = e.barPercentage))
      : ((o = n * s), (a = 1)),
    { chunk: o / s, ratio: a, start: t.pixels[i] - o / 2 }
  );
}
function hr(i, t, e, s) {
  const n = t.pixels,
    o = n[i];
  let a = i > 0 ? n[i - 1] : null,
    r = i < n.length - 1 ? n[i + 1] : null;
  const l = e.categoryPercentage;
  (a === null && (a = o - (r === null ? t.end - t.start : r - o)),
    r === null && (r = o + o - a));
  const c = o - ((o - Math.min(a, r)) / 2) * l;
  return {
    chunk: ((Math.abs(r - a) / 2) * l) / s,
    ratio: e.barPercentage,
    start: c,
  };
}
function dr(i, t, e, s) {
  const n = e.parse(i[0], s),
    o = e.parse(i[1], s),
    a = Math.min(n, o),
    r = Math.max(n, o);
  let l = a,
    c = r;
  (Math.abs(a) > Math.abs(r) && ((l = r), (c = a)),
    (t[e.axis] = c),
    (t._custom = { barStart: l, barEnd: c, start: n, end: o, min: a, max: r }));
}
function Wn(i, t, e, s) {
  return (N(i) ? dr(i, t, e, s) : (t[e.axis] = e.parse(i, s)), t);
}
function Ds(i, t, e, s) {
  const n = i.iScale,
    o = i.vScale,
    a = n.getLabels(),
    r = n === o,
    l = [];
  let c, h, d, u;
  for (c = e, h = e + s; c < h; ++c)
    ((u = t[c]),
      (d = {}),
      (d[n.axis] = r || n.parse(a[c], c)),
      l.push(Wn(u, d, o, c)));
  return l;
}
function bi(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function ur(i, t, e) {
  return i !== 0 ? Dt(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function fr(i) {
  let t, e, s, n, o;
  return (
    i.horizontal
      ? ((t = i.base > i.x), (e = 'left'), (s = 'right'))
      : ((t = i.base < i.y), (e = 'bottom'), (s = 'top')),
    t ? ((n = 'end'), (o = 'start')) : ((n = 'start'), (o = 'end')),
    { start: e, end: s, reverse: t, top: n, bottom: o }
  );
}
function gr(i, t, e, s) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    i.borderSkipped = o;
    return;
  }
  if (n === !0) {
    i.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
    return;
  }
  const { start: a, end: r, reverse: l, top: c, bottom: h } = fr(i);
  (n === 'middle' &&
    e &&
    ((i.enableBorderRadius = !0),
    (e._top || 0) === s
      ? (n = c)
      : (e._bottom || 0) === s
        ? (n = h)
        : ((o[As(h, a, r, l)] = !0), (n = c))),
    (o[As(n, a, r, l)] = !0),
    (i.borderSkipped = o));
}
function As(i, t, e, s) {
  return (s ? ((i = pr(i, t, e)), (i = Cs(i, e, t))) : (i = Cs(i, t, e)), i);
}
function pr(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function Cs(i, t, e) {
  return i === 'start' ? t : i === 'end' ? e : i;
}
function mr(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === 'auto' ? (e === 1 ? 0.33 : 0) : t;
}
class Ne extends Zt {
  parsePrimitiveData(t, e, s, n) {
    return Ds(t, e, s, n);
  }
  parseArrayData(t, e, s, n) {
    return Ds(t, e, s, n);
  }
  parseObjectData(t, e, s, n) {
    const { iScale: o, vScale: a } = t,
      { xAxisKey: r = 'x', yAxisKey: l = 'y' } = this._parsing,
      c = o.axis === 'x' ? r : l,
      h = a.axis === 'x' ? r : l,
      d = [];
    let u, f, p, g;
    for (u = s, f = s + n; u < f; ++u)
      ((g = e[u]),
        (p = {}),
        (p[o.axis] = o.parse(Ht(g, c), u)),
        d.push(Wn(Ht(g, h), p, a, u)));
    return d;
  }
  updateRangeFromParsed(t, e, s, n) {
    super.updateRangeFromParsed(t, e, s, n);
    const o = s._custom;
    o &&
      e === this._cachedMeta.vScale &&
      ((t.min = Math.min(t.min, o.min)), (t.max = Math.max(t.max, o.max)));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta,
      { iScale: s, vScale: n } = e,
      o = this.getParsed(t),
      a = o._custom,
      r = bi(a)
        ? '[' + a.start + ', ' + a.end + ']'
        : '' + n.getLabelForValue(o[n.axis]);
    return { label: '' + s.getLabelForValue(o[s.axis]), value: r };
  }
  initialize() {
    ((this.enableOptionSharing = !0), super.initialize());
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === 'reset',
      {
        index: a,
        _cachedMeta: { vScale: r },
      } = this,
      l = r.getBasePixel(),
      c = r.isHorizontal(),
      h = this._getRuler(),
      { sharedOptions: d, includeOptions: u } = this._getSharedOptions(e, n);
    for (let f = e; f < e + s; f++) {
      const p = this.getParsed(f),
        g =
          o || z(p[r.axis])
            ? { base: l, head: l }
            : this._calculateBarValuePixels(f),
        m = this._calculateBarIndexPixels(f, h),
        b = (p._stacks || {})[r.axis],
        x = {
          horizontal: c,
          base: g.base,
          enableBorderRadius:
            !b || bi(p._custom) || a === b._top || a === b._bottom,
          x: c ? g.head : m.center,
          y: c ? m.center : g.head,
          height: c ? m.size : Math.abs(g.size),
          width: c ? Math.abs(g.size) : m.size,
        };
      u &&
        (x.options =
          d || this.resolveDataElementOptions(f, t[f].active ? 'active' : n));
      const y = x.options || t[f].options;
      (gr(x, y, b, a), mr(x, y, h.ratio), this.updateElement(t[f], f, x, n));
    }
  }
  _getStacks(t, e) {
    const { iScale: s } = this._cachedMeta,
      n = s
        .getMatchingVisibleMetas(this._type)
        .filter((h) => h.controller.options.grouped),
      o = s.options.stacked,
      a = [],
      r = this._cachedMeta.controller.getParsed(e),
      l = r && r[s.axis],
      c = (h) => {
        const d = h._parsed.find((f) => f[s.axis] === l),
          u = d && d[h.vScale.axis];
        if (z(u) || isNaN(u)) return !0;
      };
    for (const h of n)
      if (
        !(e !== void 0 && c(h)) &&
        ((o === !1 ||
          a.indexOf(h.stack) === -1 ||
          (o === void 0 && h.stack === void 0)) &&
          a.push(h.stack),
        h.index === t)
      )
        break;
    return (a.length || a.push(void 0), a);
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales,
      e = this.chart.options.indexAxis;
    return Object.keys(t)
      .filter((s) => t[s].axis === e)
      .shift();
  }
  _getAxis() {
    const t = {},
      e = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      t[T(this.chart.options.indexAxis === 'x' ? s.xAxisID : s.yAxisID, e)] =
        !0;
    return Object.keys(t);
  }
  _getStackIndex(t, e, s) {
    const n = this._getStacks(t, s),
      o = e !== void 0 ? n.indexOf(e) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options,
      e = this._cachedMeta,
      s = e.iScale,
      n = [];
    let o, a;
    for (o = 0, a = e.data.length; o < a; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const r = t.barThickness;
    return {
      min: r || lr(e),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage,
    };
  }
  _calculateBarValuePixels(t) {
    const {
        _cachedMeta: { vScale: e, _stacked: s, index: n },
        options: { base: o, minBarLength: a },
      } = this,
      r = o || 0,
      l = this.getParsed(t),
      c = l._custom,
      h = bi(c);
    let d = l[e.axis],
      u = 0,
      f = s ? this.applyStack(e, l, s) : d,
      p,
      g;
    (f !== d && ((u = f - d), (f = d)),
      h &&
        ((d = c.barStart),
        (f = c.barEnd - c.barStart),
        d !== 0 && Dt(d) !== Dt(c.barEnd) && (u = 0),
        (u += d)));
    const m = !z(o) && !h ? o : u;
    let b = e.getPixelForValue(m);
    if (
      (this.chart.getDataVisibility(t)
        ? (p = e.getPixelForValue(u + f))
        : (p = b),
      (g = p - b),
      Math.abs(g) < a)
    ) {
      ((g = ur(g, e, r) * a), d === r && (b -= g / 2));
      const x = e.getPixelForDecimal(0),
        y = e.getPixelForDecimal(1),
        k = Math.min(x, y),
        v = Math.max(x, y);
      ((b = Math.max(Math.min(b, v), k)),
        (p = b + g),
        s &&
          !h &&
          (l._stacks[e.axis]._visualValues[n] =
            e.getValueForPixel(p) - e.getValueForPixel(b)));
    }
    if (b === e.getPixelForValue(r)) {
      const x = (Dt(g) * e.getLineWidthForValue(r)) / 2;
      ((b += x), (g -= x));
    }
    return { size: g, base: b, head: p, center: p + g / 2 };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale,
      n = this.options,
      o = n.skipNull,
      a = T(n.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (e.grouped) {
      const h = o ? this._getStackCount(t) : e.stackCount,
        d = n.barThickness === 'flex' ? hr(t, e, n, h * c) : cr(t, e, n, h * c),
        u =
          this.chart.options.indexAxis === 'x'
            ? this.getDataset().xAxisID
            : this.getDataset().yAxisID,
        f = this._getAxis().indexOf(T(u, this.getFirstScaleIdForIndexAxis())),
        p =
          this._getStackIndex(
            this.index,
            this._cachedMeta.stack,
            o ? t : void 0,
          ) + f;
      ((r = d.start + d.chunk * p + d.chunk / 2),
        (l = Math.min(a, d.chunk * d.ratio)));
    } else
      ((r = s.getPixelForValue(this.getParsed(t)[s.axis], t)),
        (l = Math.min(a, e.min * e.ratio)));
    return { base: r - l / 2, head: r + l / 2, center: r, size: l };
  }
  draw() {
    const t = this._cachedMeta,
      e = t.vScale,
      s = t.data,
      n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[e.axis] !== null &&
        !s[o].hidden &&
        s[o].draw(this._ctx);
  }
}
(A(Ne, 'id', 'bar'),
  A(Ne, 'defaults', {
    datasetElementType: !1,
    dataElementType: 'bar',
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'base', 'width', 'height'],
      },
    },
  }),
  A(Ne, 'overrides', {
    scales: {
      _index_: { type: 'category', offset: !0, grid: { offset: !0 } },
      _value_: { type: 'linear', beginAtZero: !0 },
    },
  }));
function br(i, t, e) {
  let s = 1,
    n = 1,
    o = 0,
    a = 0;
  if (t < $) {
    const r = i,
      l = r + t,
      c = Math.cos(r),
      h = Math.sin(r),
      d = Math.cos(l),
      u = Math.sin(l),
      f = (y, k, v) => (Qe(y, r, l, !0) ? 1 : Math.max(k, k * e, v, v * e)),
      p = (y, k, v) => (Qe(y, r, l, !0) ? -1 : Math.min(k, k * e, v, v * e)),
      g = f(0, c, d),
      m = f(Y, h, u),
      b = p(E, c, d),
      x = p(E + Y, h, u);
    ((s = (g - b) / 2),
      (n = (m - x) / 2),
      (o = -(g + b) / 2),
      (a = -(m + x) / 2));
  }
  return { ratioX: s, ratioY: n, offsetX: o, offsetY: a };
}
class fe extends Zt {
  constructor(t, e) {
    (super(t, e),
      (this.enableOptionSharing = !0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.offsetX = void 0),
      (this.offsetY = void 0));
  }
  linkScales() {}
  parse(t, e) {
    const s = this.getDataset().data,
      n = this._cachedMeta;
    if (this._parsing === !1) n._parsed = s;
    else {
      let o = (l) => +s[l];
      if (R(s[t])) {
        const { key: l = 'value' } = this._parsing;
        o = (c) => +Ht(s[c], l);
      }
      let a, r;
      for (a = t, r = t + e; a < r; ++a) n._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return _t(this.options.rotation - 90);
  }
  _getCircumference() {
    return _t(this.options.circumference);
  }
  _getRotationExtents() {
    let t = $,
      e = -$;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (
        this.chart.isDatasetVisible(s) &&
        this.chart.getDatasetMeta(s).type === this._type
      ) {
        const n = this.chart.getDatasetMeta(s).controller,
          o = n._getRotation(),
          a = n._getCircumference();
        ((t = Math.min(t, o)), (e = Math.max(e, o + a)));
      }
    return { rotation: t, circumference: e - t };
  }
  update(t) {
    const e = this.chart,
      { chartArea: s } = e,
      n = this._cachedMeta,
      o = n.data,
      a =
        this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing,
      r = Math.max((Math.min(s.width, s.height) - a) / 2, 0),
      l = Math.min(No(this.options.cutout, r), 1),
      c = this._getRingWeight(this.index),
      { circumference: h, rotation: d } = this._getRotationExtents(),
      { ratioX: u, ratioY: f, offsetX: p, offsetY: g } = br(d, h, l),
      m = (s.width - a) / u,
      b = (s.height - a) / f,
      x = Math.max(Math.min(m, b) / 2, 0),
      y = xn(this.options.radius, x),
      k = Math.max(y * l, 0),
      v = (y - k) / this._getVisibleDatasetWeightTotal();
    ((this.offsetX = p * y),
      (this.offsetY = g * y),
      (n.total = this.calculateTotal()),
      (this.outerRadius = y - v * this._getRingWeightOffset(this.index)),
      (this.innerRadius = Math.max(this.outerRadius - v * c, 0)),
      this.updateElements(o, 0, o.length, t));
  }
  _circumference(t, e) {
    const s = this.options,
      n = this._cachedMeta,
      o = this._getCircumference();
    return (e && s.animation.animateRotate) ||
      !this.chart.getDataVisibility(t) ||
      n._parsed[t] === null ||
      n.data[t].hidden
      ? 0
      : this.calculateCircumference((n._parsed[t] * o) / $);
  }
  updateElements(t, e, s, n) {
    const o = n === 'reset',
      a = this.chart,
      r = a.chartArea,
      c = a.options.animation,
      h = (r.left + r.right) / 2,
      d = (r.top + r.bottom) / 2,
      u = o && c.animateScale,
      f = u ? 0 : this.innerRadius,
      p = u ? 0 : this.outerRadius,
      { sharedOptions: g, includeOptions: m } = this._getSharedOptions(e, n);
    let b = this._getRotation(),
      x;
    for (x = 0; x < e; ++x) b += this._circumference(x, o);
    for (x = e; x < e + s; ++x) {
      const y = this._circumference(x, o),
        k = t[x],
        v = {
          x: h + this.offsetX,
          y: d + this.offsetY,
          startAngle: b,
          endAngle: b + y,
          circumference: y,
          outerRadius: p,
          innerRadius: f,
        };
      (m &&
        (v.options =
          g || this.resolveDataElementOptions(x, k.active ? 'active' : n)),
        (b += y),
        this.updateElement(k, x, v, n));
    }
  }
  calculateTotal() {
    const t = this._cachedMeta,
      e = t.data;
    let s = 0,
      n;
    for (n = 0; n < e.length; n++) {
      const o = t._parsed[n];
      o !== null &&
        !isNaN(o) &&
        this.chart.getDataVisibility(n) &&
        !e[n].hidden &&
        (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? $ * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta,
      s = this.chart,
      n = s.data.labels || [],
      o = Wi(e._parsed[t], s.options.locale);
    return { label: n[t] || '', value: o };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let n, o, a, r, l;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          ((a = s.getDatasetMeta(n)), (t = a.data), (r = a.controller));
          break;
        }
    }
    if (!t) return 0;
    for (n = 0, o = t.length; n < o; ++n)
      ((l = r.resolveDataElementOptions(n)),
        l.borderAlign !== 'inner' &&
          (e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0)));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(T(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
(A(fe, 'id', 'doughnut'),
  A(fe, 'defaults', {
    datasetElementType: !1,
    dataElementType: 'arc',
    animation: { animateRotate: !0, animateScale: !1 },
    animations: {
      numbers: {
        type: 'number',
        properties: [
          'circumference',
          'endAngle',
          'innerRadius',
          'outerRadius',
          'startAngle',
          'x',
          'y',
          'offset',
          'borderWidth',
          'spacing',
        ],
      },
    },
    cutout: '50%',
    rotation: 0,
    circumference: 360,
    radius: '100%',
    spacing: 0,
    indexAxis: 'r',
  }),
  A(fe, 'descriptors', {
    _scriptable: (t) => t !== 'spacing',
    _indexable: (t) =>
      t !== 'spacing' &&
      !t.startsWith('borderDash') &&
      !t.startsWith('hoverBorderDash'),
  }),
  A(fe, 'overrides', {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data,
              {
                labels: {
                  pointStyle: s,
                  textAlign: n,
                  color: o,
                  useBorderRadius: a,
                  borderRadius: r,
                },
              } = t.legend.options;
            return e.labels.length && e.datasets.length
              ? e.labels.map((l, c) => {
                  const d = t.getDatasetMeta(0).controller.getStyle(c);
                  return {
                    text: l,
                    fillStyle: d.backgroundColor,
                    fontColor: o,
                    hidden: !t.getDataVisibility(c),
                    lineDash: d.borderDash,
                    lineDashOffset: d.borderDashOffset,
                    lineJoin: d.borderJoinStyle,
                    lineWidth: d.borderWidth,
                    strokeStyle: d.borderColor,
                    textAlign: n,
                    pointStyle: s,
                    borderRadius: a && (r || d.borderRadius),
                    index: c,
                  };
                })
              : [];
          },
        },
        onClick(t, e, s) {
          (s.chart.toggleDataVisibility(e.index), s.chart.update());
        },
      },
    },
  }));
class Ci extends fe {}
(A(Ci, 'id', 'pie'),
  A(Ci, 'defaults', {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: '100%',
  }));
function Rt() {
  throw new Error(
    'This method is not implemented: Check that a complete date adapter is provided.',
  );
}
class qi {
  constructor(t) {
    A(this, 'options');
    this.options = t || {};
  }
  static override(t) {
    Object.assign(qi.prototype, t);
  }
  init() {}
  formats() {
    return Rt();
  }
  parse() {
    return Rt();
  }
  format() {
    return Rt();
  }
  add() {
    return Rt();
  }
  diff() {
    return Rt();
  }
  startOf() {
    return Rt();
  }
  endOf() {
    return Rt();
  }
}
var _r = { _date: qi };
function xr(i, t, e, s) {
  const { controller: n, data: o, _sorted: a } = i,
    r = n._cachedMeta.iScale,
    l = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== 'r' && a && o.length) {
    const c = r._reversePixels ? na : Di;
    if (s) {
      if (n._sharedOptions) {
        const h = o[0],
          d = typeof h.getRange == 'function' && h.getRange(t);
        if (d) {
          const u = c(o, t, e - d),
            f = c(o, t, e + d);
          return { lo: u.lo, hi: f.hi };
        }
      }
    } else {
      const h = c(o, t, e);
      if (l) {
        const { vScale: d } = n._cachedMeta,
          { _parsed: u } = i,
          f = u
            .slice(0, h.lo + 1)
            .reverse()
            .findIndex((g) => !z(g[d.axis]));
        h.lo -= Math.max(0, f);
        const p = u.slice(h.hi).findIndex((g) => !z(g[d.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return { lo: 0, hi: o.length - 1 };
}
function ri(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(),
    a = e[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: c, data: h } = o[r],
      { lo: d, hi: u } = xr(o[r], t, a, n);
    for (let f = d; f <= u; ++f) {
      const p = h[f];
      p.skip || s(p, c, f);
    }
  }
}
function yr(i) {
  const t = i.indexOf('x') !== -1,
    e = i.indexOf('y') !== -1;
  return function (s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0,
      a = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function _i(i, t, e, s, n) {
  const o = [];
  return (
    (!n && !i.isPointInArea(t)) ||
      ri(
        i,
        e,
        t,
        function (r, l, c) {
          (!n && !Pn(r, i.chartArea, 0)) ||
            (r.inRange(t.x, t.y, s) &&
              o.push({ element: r, datasetIndex: l, index: c }));
        },
        !0,
      ),
    o
  );
}
function vr(i, t, e, s) {
  let n = [];
  function o(a, r, l) {
    const { startAngle: c, endAngle: h } = a.getProps(
        ['startAngle', 'endAngle'],
        s,
      ),
      { angle: d } = kn(a, { x: t.x, y: t.y });
    Qe(d, c, h) && n.push({ element: a, datasetIndex: r, index: l });
  }
  return (ri(i, e, t, o), n);
}
function kr(i, t, e, s, n, o) {
  let a = [];
  const r = yr(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const f = h.inRange(t.x, t.y, n);
    if (s && !f) return;
    const p = h.getCenterPoint(n);
    if (!(!!o || i.isPointInArea(p)) && !f) return;
    const m = r(t, p);
    m < l
      ? ((a = [{ element: h, datasetIndex: d, index: u }]), (l = m))
      : m === l && a.push({ element: h, datasetIndex: d, index: u });
  }
  return (ri(i, e, t, c), a);
}
function xi(i, t, e, s, n, o) {
  return !o && !i.isPointInArea(t)
    ? []
    : e === 'r' && !s
      ? vr(i, t, e, n)
      : kr(i, t, e, s, n, o);
}
function Os(i, t, e, s, n) {
  const o = [],
    a = e === 'x' ? 'inXRange' : 'inYRange';
  let r = !1;
  return (
    ri(i, e, t, (l, c, h) => {
      l[a] &&
        l[a](t[e], n) &&
        (o.push({ element: l, datasetIndex: c, index: h }),
        (r = r || l.inRange(t.x, t.y, n)));
    }),
    s && !r ? [] : o
  );
}
var wr = {
  modes: {
    index(i, t, e, s) {
      const n = Lt(t, i),
        o = e.axis || 'x',
        a = e.includeInvisible || !1,
        r = e.intersect ? _i(i, n, o, s, a) : xi(i, n, o, !1, s, a),
        l = [];
      return r.length
        ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
            const h = r[0].index,
              d = c.data[h];
            d &&
              !d.skip &&
              l.push({ element: d, datasetIndex: c.index, index: h });
          }),
          l)
        : [];
    },
    dataset(i, t, e, s) {
      const n = Lt(t, i),
        o = e.axis || 'xy',
        a = e.includeInvisible || !1;
      let r = e.intersect ? _i(i, n, o, s, a) : xi(i, n, o, !1, s, a);
      if (r.length > 0) {
        const l = r[0].datasetIndex,
          c = i.getDatasetMeta(l).data;
        r = [];
        for (let h = 0; h < c.length; ++h)
          r.push({ element: c[h], datasetIndex: l, index: h });
      }
      return r;
    },
    point(i, t, e, s) {
      const n = Lt(t, i),
        o = e.axis || 'xy',
        a = e.includeInvisible || !1;
      return _i(i, n, o, s, a);
    },
    nearest(i, t, e, s) {
      const n = Lt(t, i),
        o = e.axis || 'xy',
        a = e.includeInvisible || !1;
      return xi(i, n, o, e.intersect, s, a);
    },
    x(i, t, e, s) {
      const n = Lt(t, i);
      return Os(i, n, 'x', e.intersect, s);
    },
    y(i, t, e, s) {
      const n = Lt(t, i);
      return Os(i, n, 'y', e.intersect, s);
    },
  },
};
const Vn = ['left', 'top', 'right', 'bottom'];
function le(i, t) {
  return i.filter((e) => e.pos === t);
}
function Ps(i, t) {
  return i.filter((e) => Vn.indexOf(e.pos) === -1 && e.box.axis === t);
}
function ce(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e,
      o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Mr(i) {
  const t = [];
  let e, s, n, o, a, r;
  for (e = 0, s = (i || []).length; e < s; ++e)
    ((n = i[e]),
      ({
        position: o,
        options: { stack: a, stackWeight: r = 1 },
      } = n),
      t.push({
        index: e,
        box: n,
        pos: o,
        horizontal: n.isHorizontal(),
        weight: n.weight,
        stack: a && o + a,
        stackWeight: r,
      }));
  return t;
}
function Sr(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !Vn.includes(n)) continue;
    const a = t[s] || (t[s] = { count: 0, placed: 0, weight: 0, size: 0 });
    (a.count++, (a.weight += o));
  }
  return t;
}
function Dr(i, t) {
  const e = Sr(i),
    { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, a, r;
  for (o = 0, a = i.length; o < a; ++o) {
    r = i[o];
    const { fullSize: l } = r.box,
      c = e[r.stack],
      h = c && r.stackWeight / c.weight;
    r.horizontal
      ? ((r.width = h ? h * s : l && t.availableWidth), (r.height = n))
      : ((r.width = s), (r.height = h ? h * n : l && t.availableHeight));
  }
  return e;
}
function Ar(i) {
  const t = Mr(i),
    e = ce(
      t.filter((c) => c.box.fullSize),
      !0,
    ),
    s = ce(le(t, 'left'), !0),
    n = ce(le(t, 'right')),
    o = ce(le(t, 'top'), !0),
    a = ce(le(t, 'bottom')),
    r = Ps(t, 'x'),
    l = Ps(t, 'y');
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(a).concat(r),
    chartArea: le(t, 'chartArea'),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(a).concat(r),
  };
}
function Ts(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function $n(i, t) {
  ((i.top = Math.max(i.top, t.top)),
    (i.left = Math.max(i.left, t.left)),
    (i.bottom = Math.max(i.bottom, t.bottom)),
    (i.right = Math.max(i.right, t.right)));
}
function Cr(i, t, e, s) {
  const { pos: n, box: o } = e,
    a = i.maxPadding;
  if (!R(n)) {
    e.size && (i[n] -= e.size);
    const d = s[e.stack] || { size: 0, count: 1 };
    ((d.size = Math.max(d.size, e.horizontal ? o.height : o.width)),
      (e.size = d.size / d.count),
      (i[n] += e.size));
  }
  o.getPadding && $n(a, o.getPadding());
  const r = Math.max(0, t.outerWidth - Ts(a, i, 'left', 'right')),
    l = Math.max(0, t.outerHeight - Ts(a, i, 'top', 'bottom')),
    c = r !== i.w,
    h = l !== i.h;
  return (
    (i.w = r),
    (i.h = l),
    e.horizontal ? { same: c, other: h } : { same: h, other: c }
  );
}
function Or(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return ((i[s] += n), n);
  }
  ((i.y += e('top')), (i.x += e('left')), e('right'), e('bottom'));
}
function Pr(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = { left: 0, top: 0, right: 0, bottom: 0 };
    return (
      n.forEach((a) => {
        o[a] = Math.max(t[a], e[a]);
      }),
      o
    );
  }
  return s(i ? ['left', 'right'] : ['top', 'bottom']);
}
function ge(i, t, e, s) {
  const n = [];
  let o, a, r, l, c, h;
  for (o = 0, a = i.length, c = 0; o < a; ++o) {
    ((r = i[o]),
      (l = r.box),
      l.update(r.width || t.w, r.height || t.h, Pr(r.horizontal, t)));
    const { same: d, other: u } = Cr(t, e, r, s);
    ((c |= d && n.length), (h = h || u), l.fullSize || n.push(r));
  }
  return (c && ge(n, t, e, s)) || h;
}
function Ee(i, t, e, s, n) {
  ((i.top = e),
    (i.left = t),
    (i.right = t + s),
    (i.bottom = e + n),
    (i.width = s),
    (i.height = n));
}
function Rs(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: a } = t;
  for (const r of i) {
    const l = r.box,
      c = s[r.stack] || { placed: 0, weight: 1 },
      h = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const d = t.w * h,
        u = c.size || l.height;
      (Me(c.start) && (a = c.start),
        l.fullSize
          ? Ee(l, n.left, a, e.outerWidth - n.right - n.left, u)
          : Ee(l, t.left + c.placed, a, d, u),
        (c.start = a),
        (c.placed += d),
        (a = l.bottom));
    } else {
      const d = t.h * h,
        u = c.size || l.width;
      (Me(c.start) && (o = c.start),
        l.fullSize
          ? Ee(l, o, n.top, u, e.outerHeight - n.bottom - n.top)
          : Ee(l, o, t.top + c.placed, u, d),
        (c.start = o),
        (c.placed += d),
        (o = l.right));
    }
  }
  ((t.x = o), (t.y = a));
}
var ot = {
  addBox(i, t) {
    (i.boxes || (i.boxes = []),
      (t.fullSize = t.fullSize || !1),
      (t.position = t.position || 'top'),
      (t.weight = t.weight || 0),
      (t._layers =
        t._layers ||
        function () {
          return [
            {
              z: 0,
              draw(e) {
                t.draw(e);
              },
            },
          ];
        }),
      i.boxes.push(t));
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    ((t.fullSize = e.fullSize),
      (t.position = e.position),
      (t.weight = e.weight));
  },
  update(i, t, e, s) {
    if (!i) return;
    const n = rt(i.options.layout.padding),
      o = Math.max(t - n.width, 0),
      a = Math.max(e - n.height, 0),
      r = Ar(i.boxes),
      l = r.vertical,
      c = r.horizontal;
    I(i.boxes, (g) => {
      typeof g.beforeLayout == 'function' && g.beforeLayout();
    });
    const h =
        l.reduce(
          (g, m) => (m.box.options && m.box.options.display === !1 ? g : g + 1),
          0,
        ) || 1,
      d = Object.freeze({
        outerWidth: t,
        outerHeight: e,
        padding: n,
        availableWidth: o,
        availableHeight: a,
        vBoxMaxWidth: o / 2 / h,
        hBoxMaxHeight: a / 2,
      }),
      u = Object.assign({}, n);
    $n(u, rt(s));
    const f = Object.assign(
        { maxPadding: u, w: o, h: a, x: n.left, y: n.top },
        n,
      ),
      p = Dr(l.concat(c), d);
    (ge(r.fullSize, f, d, p),
      ge(l, f, d, p),
      ge(c, f, d, p) && ge(l, f, d, p),
      Or(f),
      Rs(r.leftAndTop, f, d, p),
      (f.x += f.w),
      (f.y += f.h),
      Rs(r.rightAndBottom, f, d, p),
      (i.chartArea = {
        left: f.left,
        top: f.top,
        right: f.left + f.w,
        bottom: f.top + f.h,
        height: f.h,
        width: f.w,
      }),
      I(r.chartArea, (g) => {
        const m = g.box;
        (Object.assign(m, i.chartArea),
          m.update(f.w, f.h, { left: 0, top: 0, right: 0, bottom: 0 }));
      }));
  },
};
class jn {
  acquireContext(t, e) {}
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {}
  removeEventListener(t, e, s) {}
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return (
      (e = Math.max(0, e || t.width)),
      (s = s || t.height),
      { width: e, height: Math.max(0, n ? Math.floor(e / n) : s) }
    );
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {}
}
class Tr extends jn {
  acquireContext(t) {
    return (t && t.getContext && t.getContext('2d')) || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Ye = '$chartjs',
  Rr = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    pointerenter: 'mouseenter',
    pointerdown: 'mousedown',
    pointermove: 'mousemove',
    pointerup: 'mouseup',
    pointerleave: 'mouseout',
    pointerout: 'mouseout',
  },
  Ls = (i) => i === null || i === '';
function Lr(i, t) {
  const e = i.style,
    s = i.getAttribute('height'),
    n = i.getAttribute('width');
  if (
    ((i[Ye] = {
      initial: {
        height: s,
        width: n,
        style: { display: e.display, height: e.height, width: e.width },
      },
    }),
    (e.display = e.display || 'block'),
    (e.boxSizing = e.boxSizing || 'border-box'),
    Ls(n))
  ) {
    const o = xs(i, 'width');
    o !== void 0 && (i.width = o);
  }
  if (Ls(s))
    if (i.style.height === '') i.height = i.width / (t || 2);
    else {
      const o = xs(i, 'height');
      o !== void 0 && (i.height = o);
    }
  return i;
}
const Nn = $a ? { passive: !0 } : !1;
function Fr(i, t, e) {
  i && i.addEventListener(t, e, Nn);
}
function Ir(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, Nn);
}
function Er(i, t) {
  const e = Rr[i.type] || i.type,
    { x: s, y: n } = Lt(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null,
  };
}
function ei(i, t) {
  for (const e of i) if (e === t || e.contains(t)) return !0;
}
function zr(i, t, e) {
  const s = i.canvas,
    n = new MutationObserver((o) => {
      let a = !1;
      for (const r of o)
        ((a = a || ei(r.addedNodes, s)), (a = a && !ei(r.removedNodes, s)));
      a && e();
    });
  return (n.observe(document, { childList: !0, subtree: !0 }), n);
}
function Br(i, t, e) {
  const s = i.canvas,
    n = new MutationObserver((o) => {
      let a = !1;
      for (const r of o)
        ((a = a || ei(r.removedNodes, s)), (a = a && !ei(r.addedNodes, s)));
      a && e();
    });
  return (n.observe(document, { childList: !0, subtree: !0 }), n);
}
const De = new Map();
let Fs = 0;
function Yn() {
  const i = window.devicePixelRatio;
  i !== Fs &&
    ((Fs = i),
    De.forEach((t, e) => {
      e.currentDevicePixelRatio !== i && t();
    }));
}
function Hr(i, t) {
  (De.size || window.addEventListener('resize', Yn), De.set(i, t));
}
function Wr(i) {
  (De.delete(i), De.size || window.removeEventListener('resize', Yn));
}
function Vr(i, t, e) {
  const s = i.canvas,
    n = s && Ki(s);
  if (!n) return;
  const o = Dn((r, l) => {
      const c = n.clientWidth;
      (e(r, l), c < n.clientWidth && e());
    }, window),
    a = new ResizeObserver((r) => {
      const l = r[0],
        c = l.contentRect.width,
        h = l.contentRect.height;
      (c === 0 && h === 0) || o(c, h);
    });
  return (a.observe(n), Hr(i, o), a);
}
function yi(i, t, e) {
  (e && e.disconnect(), t === 'resize' && Wr(i));
}
function $r(i, t, e) {
  const s = i.canvas,
    n = Dn((o) => {
      i.ctx !== null && e(Er(o, i));
    }, i);
  return (Fr(s, t, n), n);
}
class jr extends jn {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext('2d');
    return s && s.canvas === t ? (Lr(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[Ye]) return !1;
    const s = e[Ye].initial;
    ['height', 'width'].forEach((o) => {
      const a = s[o];
      z(a) ? e.removeAttribute(o) : e.setAttribute(o, a);
    });
    const n = s.style || {};
    return (
      Object.keys(n).forEach((o) => {
        e.style[o] = n[o];
      }),
      (e.width = e.width),
      delete e[Ye],
      !0
    );
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}),
      a = { attach: zr, detach: Br, resize: Vr }[e] || $r;
    n[e] = a(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}),
      n = s[e];
    if (!n) return;
    ((({ attach: yi, detach: yi, resize: yi })[e] || Ir)(t, e, n),
      (s[e] = void 0));
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return Va(t, e, s, n);
  }
  isAttached(t) {
    const e = t && Ki(t);
    return !!(e && e.isConnected);
  }
}
function Nr(i) {
  return !Xi() || (typeof OffscreenCanvas < 'u' && i instanceof OffscreenCanvas)
    ? Tr
    : jr;
}
class xt {
  constructor() {
    A(this, 'x');
    A(this, 'y');
    A(this, 'active', !1);
    A(this, 'options');
    A(this, '$animations');
  }
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps(['x', 'y'], t);
    return { x: e, y: s };
  }
  hasValue() {
    return Ze(this.x) && Ze(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s) return this;
    const n = {};
    return (
      t.forEach((o) => {
        n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
      }),
      n
    );
  }
}
(A(xt, 'defaults', {}), A(xt, 'defaultRoutes'));
function Yr(i, t) {
  const e = i.options.ticks,
    s = Ur(i),
    n = Math.min(e.maxTicksLimit || s, s),
    o = e.major.enabled ? Kr(t) : [],
    a = o.length,
    r = o[0],
    l = o[a - 1],
    c = [];
  if (a > n) return (qr(t, c, o, a / n), c);
  const h = Xr(o, t, n);
  if (a > 0) {
    let d, u;
    const f = a > 1 ? Math.round((l - r) / (a - 1)) : null;
    for (ze(t, c, h, z(f) ? 0 : r - f, r), d = 0, u = a - 1; d < u; d++)
      ze(t, c, h, o[d], o[d + 1]);
    return (ze(t, c, h, l, z(f) ? t.length : l + f), c);
  }
  return (ze(t, c, h), c);
}
function Ur(i) {
  const t = i.options.offset,
    e = i._tickSize(),
    s = i._length / e + (t ? 0 : 1),
    n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function Xr(i, t, e) {
  const s = Gr(i),
    n = t.length / e;
  if (!s) return Math.max(n, 1);
  const o = Zo(s);
  for (let a = 0, r = o.length - 1; a < r; a++) {
    const l = o[a];
    if (l > n) return l;
  }
  return Math.max(n, 1);
}
function Kr(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++) i[e].major && t.push(e);
  return t;
}
function qr(i, t, e, s) {
  let n = 0,
    o = e[0],
    a;
  for (s = Math.ceil(s), a = 0; a < i.length; a++)
    a === o && (t.push(i[a]), n++, (o = e[n * s]));
}
function ze(i, t, e, s, n) {
  const o = T(s, 0),
    a = Math.min(T(n, i.length), i.length);
  let r = 0,
    l,
    c,
    h;
  for (
    e = Math.ceil(e), n && ((l = n - s), (e = l / Math.floor(l / e))), h = o;
    h < 0;
  )
    (r++, (h = Math.round(o + r * e)));
  for (c = Math.max(o, 0); c < a; c++)
    c === h && (t.push(i[c]), r++, (h = Math.round(o + r * e)));
}
function Gr(i) {
  const t = i.length;
  let e, s;
  if (t < 2) return !1;
  for (s = i[0], e = 1; e < t; ++e) if (i[e] - i[e - 1] !== s) return !1;
  return s;
}
const Zr = (i) => (i === 'left' ? 'right' : i === 'right' ? 'left' : i),
  Is = (i, t, e) => (t === 'top' || t === 'left' ? i[t] + e : i[t] - e),
  Es = (i, t) => Math.min(t || i, i);
function zs(i, t) {
  const e = [],
    s = i.length / t,
    n = i.length;
  let o = 0;
  for (; o < n; o += s) e.push(i[Math.floor(o)]);
  return e;
}
function Qr(i, t, e) {
  const s = i.ticks.length,
    n = Math.min(t, s - 1),
    o = i._startPixel,
    a = i._endPixel,
    r = 1e-6;
  let l = i.getPixelForTick(n),
    c;
  if (
    !(
      e &&
      (s === 1
        ? (c = Math.max(l - o, a - l))
        : t === 0
          ? (c = (i.getPixelForTick(1) - l) / 2)
          : (c = (l - i.getPixelForTick(n - 1)) / 2),
      (l += n < t ? c : -c),
      l < o - r || l > a + r)
    )
  )
    return l;
}
function Jr(i, t) {
  I(i, (e) => {
    const s = e.gc,
      n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o) delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function he(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function Bs(i, t) {
  if (!i.display) return 0;
  const e = Z(i.font, t),
    s = rt(i.padding);
  return (N(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function tl(i, t) {
  return ie(i, { scale: t, type: 'scale' });
}
function el(i, t, e) {
  return ie(i, { tick: e, index: t, type: 'tick' });
}
function il(i, t, e) {
  let s = Hi(i);
  return (((e && t !== 'right') || (!e && t === 'right')) && (s = Zr(s)), s);
}
function sl(i, t, e, s) {
  const { top: n, left: o, bottom: a, right: r, chart: l } = i,
    { chartArea: c, scales: h } = l;
  let d = 0,
    u,
    f,
    p;
  const g = a - n,
    m = r - o;
  if (i.isHorizontal()) {
    if (((f = q(s, o, r)), R(e))) {
      const b = Object.keys(e)[0],
        x = e[b];
      p = h[b].getPixelForValue(x) + g - t;
    } else
      e === 'center' ? (p = (c.bottom + c.top) / 2 + g - t) : (p = Is(i, e, t));
    u = r - o;
  } else {
    if (R(e)) {
      const b = Object.keys(e)[0],
        x = e[b];
      f = h[b].getPixelForValue(x) - m + t;
    } else
      e === 'center' ? (f = (c.left + c.right) / 2 - m + t) : (f = Is(i, e, t));
    ((p = q(s, a, n)), (d = e === 'left' ? -Y : Y));
  }
  return { titleX: f, titleY: p, maxWidth: u, rotation: d };
}
class se extends xt {
  constructor(t) {
    (super(),
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
      (this.$context = void 0));
  }
  init(t) {
    ((this.options = t.setContext(this.getContext())),
      (this.axis = t.axis),
      (this._userMin = this.parse(t.min)),
      (this._userMax = this.parse(t.max)),
      (this._suggestedMin = this.parse(t.suggestedMin)),
      (this._suggestedMax = this.parse(t.suggestedMax)));
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return (
      (t = ct(t, Number.POSITIVE_INFINITY)),
      (e = ct(e, Number.NEGATIVE_INFINITY)),
      (s = ct(s, Number.POSITIVE_INFINITY)),
      (n = ct(n, Number.NEGATIVE_INFINITY)),
      { min: ct(t, s), max: ct(e, n), minDefined: at(t), maxDefined: at(e) }
    );
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(),
      a;
    if (n && o) return { min: e, max: s };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      ((a = r[l].controller.getMinMax(this, t)),
        n || (e = Math.min(e, a.min)),
        o || (s = Math.max(s, a.max)));
    return (
      (e = o && e > s ? s : e),
      (s = n && e > s ? e : s),
      { min: ct(e, ct(s, e)), max: ct(s, ct(e, s)) }
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
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    ((this._cache = {}), (this._dataLimitsCached = !1));
  }
  beforeUpdate() {
    H(this.options.beforeUpdate, [this]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: a } = this.options,
      r = a.sampleSize;
    (this.beforeUpdate(),
      (this.maxWidth = t),
      (this.maxHeight = e),
      (this._margins = s =
        Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, s)),
      (this.ticks = null),
      (this._labelSizes = null),
      (this._gridLineItems = null),
      (this._labelItems = null),
      this.beforeSetDimensions(),
      this.setDimensions(),
      this.afterSetDimensions(),
      (this._maxLength = this.isHorizontal()
        ? this.width + s.left + s.right
        : this.height + s.top + s.bottom),
      this._dataLimitsCached ||
        (this.beforeDataLimits(),
        this.determineDataLimits(),
        this.afterDataLimits(),
        (this._range = Da(this, o, n)),
        (this._dataLimitsCached = !0)),
      this.beforeBuildTicks(),
      (this.ticks = this.buildTicks() || []),
      this.afterBuildTicks());
    const l = r < this.ticks.length;
    (this._convertTicksToLabels(l ? zs(this.ticks, r) : this.ticks),
      this.configure(),
      this.beforeCalculateLabelRotation(),
      this.calculateLabelRotation(),
      this.afterCalculateLabelRotation(),
      a.display &&
        (a.autoSkip || a.source === 'auto') &&
        ((this.ticks = Yr(this, this.ticks)),
        (this._labelSizes = null),
        this.afterAutoSkip()),
      l && this._convertTicksToLabels(this.ticks),
      this.beforeFit(),
      this.fit(),
      this.afterFit(),
      this.afterUpdate());
  }
  configure() {
    let t = this.options.reverse,
      e,
      s;
    (this.isHorizontal()
      ? ((e = this.left), (s = this.right))
      : ((e = this.top), (s = this.bottom), (t = !t)),
      (this._startPixel = e),
      (this._endPixel = s),
      (this._reversePixels = t),
      (this._length = s - e),
      (this._alignToPixels = this.options.alignToPixels));
  }
  afterUpdate() {
    H(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    H(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    (this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = 0),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = 0),
        (this.bottom = this.height)),
      (this.paddingLeft = 0),
      (this.paddingTop = 0),
      (this.paddingRight = 0),
      (this.paddingBottom = 0));
  }
  afterSetDimensions() {
    H(this.options.afterSetDimensions, [this]);
  }
  _callHooks(t) {
    (this.chart.notifyPlugins(t, this.getContext()),
      H(this.options[t], [this]));
  }
  beforeDataLimits() {
    this._callHooks('beforeDataLimits');
  }
  determineDataLimits() {}
  afterDataLimits() {
    this._callHooks('afterDataLimits');
  }
  beforeBuildTicks() {
    this._callHooks('beforeBuildTicks');
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks('afterBuildTicks');
  }
  beforeTickToLabelConversion() {
    H(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      ((o = t[s]), (o.label = H(e.callback, [o.value, s, t], this)));
  }
  afterTickToLabelConversion() {
    H(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    H(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const t = this.options,
      e = t.ticks,
      s = Es(this.ticks.length, t.ticks.maxTicksLimit),
      n = e.minRotation || 0,
      o = e.maxRotation;
    let a = n,
      r,
      l,
      c;
    if (
      !this._isVisible() ||
      !e.display ||
      n >= o ||
      s <= 1 ||
      !this.isHorizontal()
    ) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(),
      d = h.widest.width,
      u = h.highest.height,
      f = tt(this.chart.width - d, 0, this.maxWidth);
    ((r = t.offset ? this.maxWidth / s : f / (s - 1)),
      d + 6 > r &&
        ((r = f / (s - (t.offset ? 0.5 : 1))),
        (l =
          this.maxHeight -
          he(t.grid) -
          e.padding -
          Bs(t.title, this.chart.options.font)),
        (c = Math.sqrt(d * d + u * u)),
        (a = ea(
          Math.min(
            Math.asin(tt((h.highest.height + 6) / r, -1, 1)),
            Math.asin(tt(l / c, -1, 1)) - Math.asin(tt(u / c, -1, 1)),
          ),
        )),
        (a = Math.max(n, Math.min(o, a)))),
      (this.labelRotation = a));
  }
  afterCalculateLabelRotation() {
    H(this.options.afterCalculateLabelRotation, [this]);
  }
  afterAutoSkip() {}
  beforeFit() {
    H(this.options.beforeFit, [this]);
  }
  fit() {
    const t = { width: 0, height: 0 },
      {
        chart: e,
        options: { ticks: s, title: n, grid: o },
      } = this,
      a = this._isVisible(),
      r = this.isHorizontal();
    if (a) {
      const l = Bs(n, e.options.font);
      if (
        (r
          ? ((t.width = this.maxWidth), (t.height = he(o) + l))
          : ((t.height = this.maxHeight), (t.width = he(o) + l)),
        s.display && this.ticks.length)
      ) {
        const {
            first: c,
            last: h,
            widest: d,
            highest: u,
          } = this._getLabelSizes(),
          f = s.padding * 2,
          p = _t(this.labelRotation),
          g = Math.cos(p),
          m = Math.sin(p);
        if (r) {
          const b = s.mirror ? 0 : m * d.width + g * u.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = s.mirror ? 0 : g * d.width + m * u.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(c, h, m, g);
      }
    }
    (this._handleMargins(),
      r
        ? ((this.width = this._length =
            e.width - this._margins.left - this._margins.right),
          (this.height = t.height))
        : ((this.width = t.width),
          (this.height = this._length =
            e.height - this._margins.top - this._margins.bottom)));
  }
  _calculatePadding(t, e, s, n) {
    const {
        ticks: { align: o, padding: a },
        position: r,
      } = this.options,
      l = this.labelRotation !== 0,
      c = r !== 'top' && this.axis === 'x';
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left,
        d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0,
        f = 0;
      (l
        ? c
          ? ((u = n * t.width), (f = s * e.height))
          : ((u = s * t.height), (f = n * e.width))
        : o === 'start'
          ? (f = e.width)
          : o === 'end'
            ? (u = t.width)
            : o !== 'inner' && ((u = t.width / 2), (f = e.width / 2)),
        (this.paddingLeft = Math.max(
          ((u - h + a) * this.width) / (this.width - h),
          0,
        )),
        (this.paddingRight = Math.max(
          ((f - d + a) * this.width) / (this.width - d),
          0,
        )));
    } else {
      let h = e.height / 2,
        d = t.height / 2;
      (o === 'start'
        ? ((h = 0), (d = t.height))
        : o === 'end' && ((h = e.height), (d = 0)),
        (this.paddingTop = h + a),
        (this.paddingBottom = d + a));
    }
  }
  _handleMargins() {
    this._margins &&
      ((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
      (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
      (this._margins.right = Math.max(this.paddingRight, this._margins.right)),
      (this._margins.bottom = Math.max(
        this.paddingBottom,
        this._margins.bottom,
      )));
  }
  afterFit() {
    H(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === 'top' || e === 'bottom' || t === 'x';
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    (this.beforeTickToLabelConversion(), this.generateTickLabels(t));
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      z(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      (e < s.length && (s = zs(s, e)),
        (this._labelSizes = t =
          this._computeLabelSizes(
            s,
            s.length,
            this.options.ticks.maxTicksLimit,
          )));
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: n, _longestTextCache: o } = this,
      a = [],
      r = [],
      l = Math.floor(e / Es(e, s));
    let c = 0,
      h = 0,
      d,
      u,
      f,
      p,
      g,
      m,
      b,
      x,
      y,
      k,
      v;
    for (d = 0; d < e; d += l) {
      if (
        ((p = t[d].label),
        (g = this._resolveTickFontOptions(d)),
        (n.font = m = g.string),
        (b = o[m] = o[m] || { data: {}, gc: [] }),
        (x = g.lineHeight),
        (y = k = 0),
        !z(p) && !N(p))
      )
        ((y = fs(n, b.data, b.gc, y, p)), (k = x));
      else if (N(p))
        for (u = 0, f = p.length; u < f; ++u)
          ((v = p[u]),
            !z(v) && !N(v) && ((y = fs(n, b.data, b.gc, y, v)), (k += x)));
      (a.push(y), r.push(k), (c = Math.max(y, c)), (h = Math.max(k, h)));
    }
    Jr(o, e);
    const S = a.indexOf(c),
      w = r.indexOf(h),
      M = (D) => ({ width: a[D] || 0, height: r[D] || 0 });
    return {
      first: M(0),
      last: M(e - 1),
      widest: M(S),
      highest: M(w),
      widths: a,
      heights: r,
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {}
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return sa(this._alignToPixels ? Tt(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = el(this.getContext(), t, s));
    }
    return this.$context || (this.$context = tl(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks,
      e = _t(this.labelRotation),
      s = Math.abs(Math.cos(e)),
      n = Math.abs(Math.sin(e)),
      o = this._getLabelSizes(),
      a = t.autoSkipPadding || 0,
      r = o ? o.widest.width + a : 0,
      l = o ? o.highest.height + a : 0;
    return this.isHorizontal()
      ? l * s > r * n
        ? r / s
        : l / n
      : l * n < r * s
        ? l / s
        : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== 'auto' ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis,
      s = this.chart,
      n = this.options,
      { grid: o, position: a, border: r } = n,
      l = o.offset,
      c = this.isHorizontal(),
      d = this.ticks.length + (l ? 1 : 0),
      u = he(o),
      f = [],
      p = r.setContext(this.getContext()),
      g = p.display ? p.width : 0,
      m = g / 2,
      b = function (F) {
        return Tt(s, F, g);
      };
    let x, y, k, v, S, w, M, D, C, O, P, B;
    if (a === 'top')
      ((x = b(this.bottom)),
        (w = this.bottom - u),
        (D = x - m),
        (O = b(t.top) + m),
        (B = t.bottom));
    else if (a === 'bottom')
      ((x = b(this.top)),
        (O = t.top),
        (B = b(t.bottom) - m),
        (w = x + m),
        (D = this.top + u));
    else if (a === 'left')
      ((x = b(this.right)),
        (S = this.right - u),
        (M = x - m),
        (C = b(t.left) + m),
        (P = t.right));
    else if (a === 'right')
      ((x = b(this.left)),
        (C = t.left),
        (P = b(t.right) - m),
        (S = x + m),
        (M = this.left + u));
    else if (e === 'x') {
      if (a === 'center') x = b((t.top + t.bottom) / 2 + 0.5);
      else if (R(a)) {
        const F = Object.keys(a)[0],
          W = a[F];
        x = b(this.chart.scales[F].getPixelForValue(W));
      }
      ((O = t.top), (B = t.bottom), (w = x + m), (D = w + u));
    } else if (e === 'y') {
      if (a === 'center') x = b((t.left + t.right) / 2);
      else if (R(a)) {
        const F = Object.keys(a)[0],
          W = a[F];
        x = b(this.chart.scales[F].getPixelForValue(W));
      }
      ((S = x - m), (M = S - u), (C = t.left), (P = t.right));
    }
    const X = T(n.ticks.maxTicksLimit, d),
      L = Math.max(1, Math.ceil(d / X));
    for (y = 0; y < d; y += L) {
      const F = this.getContext(y),
        W = o.setContext(F),
        lt = r.setContext(F),
        K = W.lineWidth,
        $t = W.color,
        Ce = lt.dash || [],
        jt = lt.dashOffset,
        ne = W.tickWidth,
        Ct = W.tickColor,
        oe = W.tickBorderDash || [],
        Ot = W.tickBorderDashOffset;
      ((k = Qr(this, y, l)),
        k !== void 0 &&
          ((v = Tt(s, k, K)),
          c ? (S = M = C = P = v) : (w = D = O = B = v),
          f.push({
            tx1: S,
            ty1: w,
            tx2: M,
            ty2: D,
            x1: C,
            y1: O,
            x2: P,
            y2: B,
            width: K,
            color: $t,
            borderDash: Ce,
            borderDashOffset: jt,
            tickWidth: ne,
            tickColor: Ct,
            tickBorderDash: oe,
            tickBorderDashOffset: Ot,
          })));
    }
    return ((this._ticksLength = d), (this._borderValue = x), f);
  }
  _computeLabelItems(t) {
    const e = this.axis,
      s = this.options,
      { position: n, ticks: o } = s,
      a = this.isHorizontal(),
      r = this.ticks,
      { align: l, crossAlign: c, padding: h, mirror: d } = o,
      u = he(s.grid),
      f = u + h,
      p = d ? -h : f,
      g = -_t(this.labelRotation),
      m = [];
    let b,
      x,
      y,
      k,
      v,
      S,
      w,
      M,
      D,
      C,
      O,
      P,
      B = 'middle';
    if (n === 'top')
      ((S = this.bottom - p), (w = this._getXAxisLabelAlignment()));
    else if (n === 'bottom')
      ((S = this.top + p), (w = this._getXAxisLabelAlignment()));
    else if (n === 'left') {
      const L = this._getYAxisLabelAlignment(u);
      ((w = L.textAlign), (v = L.x));
    } else if (n === 'right') {
      const L = this._getYAxisLabelAlignment(u);
      ((w = L.textAlign), (v = L.x));
    } else if (e === 'x') {
      if (n === 'center') S = (t.top + t.bottom) / 2 + f;
      else if (R(n)) {
        const L = Object.keys(n)[0],
          F = n[L];
        S = this.chart.scales[L].getPixelForValue(F) + f;
      }
      w = this._getXAxisLabelAlignment();
    } else if (e === 'y') {
      if (n === 'center') v = (t.left + t.right) / 2 - f;
      else if (R(n)) {
        const L = Object.keys(n)[0],
          F = n[L];
        v = this.chart.scales[L].getPixelForValue(F);
      }
      w = this._getYAxisLabelAlignment(u).textAlign;
    }
    e === 'y' && (l === 'start' ? (B = 'top') : l === 'end' && (B = 'bottom'));
    const X = this._getLabelSizes();
    for (b = 0, x = r.length; b < x; ++b) {
      ((y = r[b]), (k = y.label));
      const L = o.setContext(this.getContext(b));
      ((M = this.getPixelForTick(b) + o.labelOffset),
        (D = this._resolveTickFontOptions(b)),
        (C = D.lineHeight),
        (O = N(k) ? k.length : 1));
      const F = O / 2,
        W = L.color,
        lt = L.textStrokeColor,
        K = L.textStrokeWidth;
      let $t = w;
      a
        ? ((v = M),
          w === 'inner' &&
            (b === x - 1
              ? ($t = this.options.reverse ? 'left' : 'right')
              : b === 0
                ? ($t = this.options.reverse ? 'right' : 'left')
                : ($t = 'center')),
          n === 'top'
            ? c === 'near' || g !== 0
              ? (P = -O * C + C / 2)
              : c === 'center'
                ? (P = -X.highest.height / 2 - F * C + C)
                : (P = -X.highest.height + C / 2)
            : c === 'near' || g !== 0
              ? (P = C / 2)
              : c === 'center'
                ? (P = X.highest.height / 2 - F * C)
                : (P = X.highest.height - O * C),
          d && (P *= -1),
          g !== 0 && !L.showLabelBackdrop && (v += (C / 2) * Math.sin(g)))
        : ((S = M), (P = ((1 - O) * C) / 2));
      let Ce;
      if (L.showLabelBackdrop) {
        const jt = rt(L.backdropPadding),
          ne = X.heights[b],
          Ct = X.widths[b];
        let oe = P - jt.top,
          Ot = 0 - jt.left;
        switch (B) {
          case 'middle':
            oe -= ne / 2;
            break;
          case 'bottom':
            oe -= ne;
            break;
        }
        switch (w) {
          case 'center':
            Ot -= Ct / 2;
            break;
          case 'right':
            Ot -= Ct;
            break;
          case 'inner':
            b === x - 1 ? (Ot -= Ct) : b > 0 && (Ot -= Ct / 2);
            break;
        }
        Ce = {
          left: Ot,
          top: oe,
          width: Ct + jt.width,
          height: ne + jt.height,
          color: L.backdropColor,
        };
      }
      m.push({
        label: k,
        font: D,
        textOffset: P,
        options: {
          rotation: g,
          color: W,
          strokeColor: lt,
          strokeWidth: K,
          textAlign: $t,
          textBaseline: B,
          translation: [v, S],
          backdrop: Ce,
        },
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-_t(this.labelRotation)) return t === 'top' ? 'left' : 'right';
    let n = 'center';
    return (
      e.align === 'start'
        ? (n = 'left')
        : e.align === 'end'
          ? (n = 'right')
          : e.align === 'inner' && (n = 'inner'),
      n
    );
  }
  _getYAxisLabelAlignment(t) {
    const {
        position: e,
        ticks: { crossAlign: s, mirror: n, padding: o },
      } = this.options,
      a = this._getLabelSizes(),
      r = t + o,
      l = a.widest.width;
    let c, h;
    return (
      e === 'left'
        ? n
          ? ((h = this.right + o),
            s === 'near'
              ? (c = 'left')
              : s === 'center'
                ? ((c = 'center'), (h += l / 2))
                : ((c = 'right'), (h += l)))
          : ((h = this.right - r),
            s === 'near'
              ? (c = 'right')
              : s === 'center'
                ? ((c = 'center'), (h -= l / 2))
                : ((c = 'left'), (h = this.left)))
        : e === 'right'
          ? n
            ? ((h = this.left + o),
              s === 'near'
                ? (c = 'right')
                : s === 'center'
                  ? ((c = 'center'), (h -= l / 2))
                  : ((c = 'left'), (h -= l)))
            : ((h = this.left + r),
              s === 'near'
                ? (c = 'left')
                : s === 'center'
                  ? ((c = 'center'), (h += l / 2))
                  : ((c = 'right'), (h = this.right)))
          : (c = 'right'),
      { textAlign: c, x: h }
    );
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) return;
    const t = this.chart,
      e = this.options.position;
    if (e === 'left' || e === 'right')
      return { top: 0, left: this.left, bottom: t.height, right: this.right };
    if (e === 'top' || e === 'bottom')
      return { top: this.top, left: 0, bottom: this.bottom, right: t.width };
  }
  drawBackground() {
    const {
      ctx: t,
      options: { backgroundColor: e },
      left: s,
      top: n,
      width: o,
      height: a,
    } = this;
    e && (t.save(), (t.fillStyle = e), t.fillRect(s, n, o, a), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display) return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid,
      s = this.ctx,
      n =
        this._gridLineItems ||
        (this._gridLineItems = this._computeGridLineItems(t));
    let o, a;
    const r = (l, c, h) => {
      !h.width ||
        !h.color ||
        (s.save(),
        (s.lineWidth = h.width),
        (s.strokeStyle = h.color),
        s.setLineDash(h.borderDash || []),
        (s.lineDashOffset = h.borderDashOffset),
        s.beginPath(),
        s.moveTo(l.x, l.y),
        s.lineTo(c.x, c.y),
        s.stroke(),
        s.restore());
    };
    if (e.display)
      for (o = 0, a = n.length; o < a; ++o) {
        const l = n[o];
        (e.drawOnChartArea && r({ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }, l),
          e.drawTicks &&
            r(
              { x: l.tx1, y: l.ty1 },
              { x: l.tx2, y: l.ty2 },
              {
                color: l.tickColor,
                width: l.tickWidth,
                borderDash: l.tickBorderDash,
                borderDashOffset: l.tickBorderDashOffset,
              },
            ));
      }
  }
  drawBorder() {
    const {
        chart: t,
        ctx: e,
        options: { border: s, grid: n },
      } = this,
      o = s.setContext(this.getContext()),
      a = s.display ? o.width : 0;
    if (!a) return;
    const r = n.setContext(this.getContext(0)).lineWidth,
      l = this._borderValue;
    let c, h, d, u;
    (this.isHorizontal()
      ? ((c = Tt(t, this.left, a) - a / 2),
        (h = Tt(t, this.right, r) + r / 2),
        (d = u = l))
      : ((d = Tt(t, this.top, a) - a / 2),
        (u = Tt(t, this.bottom, r) + r / 2),
        (c = h = l)),
      e.save(),
      (e.lineWidth = o.width),
      (e.strokeStyle = o.color),
      e.beginPath(),
      e.moveTo(c, d),
      e.lineTo(h, u),
      e.stroke(),
      e.restore());
  }
  drawLabels(t) {
    if (!this.options.ticks.display) return;
    const s = this.ctx,
      n = this._computeLabelArea();
    n && Vi(s, n);
    const o = this.getLabelItems(t);
    for (const a of o) {
      const r = a.options,
        l = a.font,
        c = a.label,
        h = a.textOffset;
      Se(s, c, 0, h, l, r);
    }
    n && $i(s);
  }
  drawTitle() {
    const {
      ctx: t,
      options: { position: e, title: s, reverse: n },
    } = this;
    if (!s.display) return;
    const o = Z(s.font),
      a = rt(s.padding),
      r = s.align;
    let l = o.lineHeight / 2;
    e === 'bottom' || e === 'center' || R(e)
      ? ((l += a.bottom),
        N(s.text) && (l += o.lineHeight * (s.text.length - 1)))
      : (l += a.top);
    const {
      titleX: c,
      titleY: h,
      maxWidth: d,
      rotation: u,
    } = sl(this, l, e, r);
    Se(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: d,
      rotation: u,
      textAlign: il(r, e, n),
      textBaseline: 'middle',
      translation: [c, h],
    });
  }
  draw(t) {
    this._isVisible() &&
      (this.drawBackground(),
      this.drawGrid(t),
      this.drawBorder(),
      this.drawTitle(),
      this.drawLabels(t));
  }
  _layers() {
    const t = this.options,
      e = (t.ticks && t.ticks.z) || 0,
      s = T(t.grid && t.grid.z, -1),
      n = T(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== se.prototype.draw
      ? [
          {
            z: e,
            draw: (o) => {
              this.draw(o);
            },
          },
        ]
      : [
          {
            z: s,
            draw: (o) => {
              (this.drawBackground(), this.drawGrid(o), this.drawTitle());
            },
          },
          {
            z: n,
            draw: () => {
              this.drawBorder();
            },
          },
          {
            z: e,
            draw: (o) => {
              this.drawLabels(o);
            },
          },
        ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(),
      s = this.axis + 'AxisID',
      n = [];
    let o, a;
    for (o = 0, a = e.length; o < a; ++o) {
      const r = e[o];
      r[s] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return Z(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Be {
  constructor(t, e, s) {
    ((this.type = t),
      (this.scope = e),
      (this.override = s),
      (this.items = Object.create(null)));
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(
      this.type.prototype,
      t.prototype,
    );
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    al(e) && (s = this.register(e));
    const n = this.items,
      o = t.id,
      a = this.scope + '.' + o;
    if (!o) throw new Error('class does not have id: ' + t);
    return (
      o in n ||
        ((n[o] = t),
        nl(t, a, s),
        this.override && V.override(t.id, t.overrides)),
      a
    );
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items,
      s = t.id,
      n = this.scope;
    (s in e && delete e[s],
      n && s in V[n] && (delete V[n][s], this.override && delete Wt[s]));
  }
}
function nl(i, t, e) {
  const s = we(Object.create(null), [e ? V.get(e) : {}, V.get(t), i.defaults]);
  (V.set(t, s),
    i.defaultRoutes && ol(t, i.defaultRoutes),
    i.descriptors && V.describe(t, i.descriptors));
}
function ol(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split('.'),
      n = s.pop(),
      o = [i].concat(s).join('.'),
      a = t[e].split('.'),
      r = a.pop(),
      l = a.join('.');
    V.route(o, n, l, r);
  });
}
function al(i) {
  return 'id' in i && 'defaults' in i;
}
class rl {
  constructor() {
    ((this.controllers = new Be(Zt, 'datasets', !0)),
      (this.elements = new Be(xt, 'elements')),
      (this.plugins = new Be(Object, 'plugins')),
      (this.scales = new Be(se, 'scales')),
      (this._typedRegistries = [this.controllers, this.scales, this.elements]));
  }
  add(...t) {
    this._each('register', t);
  }
  remove(...t) {
    this._each('unregister', t);
  }
  addControllers(...t) {
    this._each('register', t, this.controllers);
  }
  addElements(...t) {
    this._each('register', t, this.elements);
  }
  addPlugins(...t) {
    this._each('register', t, this.plugins);
  }
  addScales(...t) {
    this._each('register', t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, 'controller');
  }
  getElement(t) {
    return this._get(t, this.elements, 'element');
  }
  getPlugin(t) {
    return this._get(t, this.plugins, 'plugin');
  }
  getScale(t) {
    return this._get(t, this.scales, 'scale');
  }
  removeControllers(...t) {
    this._each('unregister', t, this.controllers);
  }
  removeElements(...t) {
    this._each('unregister', t, this.elements);
  }
  removePlugins(...t) {
    this._each('unregister', t, this.plugins);
  }
  removeScales(...t) {
    this._each('unregister', t, this.scales);
  }
  _each(t, e, s) {
    [...e].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || (o === this.plugins && n.id)
        ? this._exec(t, o, n)
        : I(n, (a) => {
            const r = s || this._getRegistryForType(a);
            this._exec(t, r, a);
          });
    });
  }
  _exec(t, e, s) {
    const n = zi(t);
    (H(s['before' + n], [], s), e[t](s), H(s['after' + n], [], s));
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t)) return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + '.');
    return n;
  }
}
var dt = new rl();
class ll {
  constructor() {
    this._init = void 0;
  }
  notify(t, e, s, n) {
    if (
      (e === 'beforeInit' &&
        ((this._init = this._createDescriptors(t, !0)),
        this._notify(this._init, t, 'install')),
      this._init === void 0)
    )
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t),
      a = this._notify(o, t, e, s);
    return (
      e === 'afterDestroy' &&
        (this._notify(o, t, 'stop'),
        this._notify(this._init, t, 'uninstall'),
        (this._init = void 0)),
      a
    );
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const a = o.plugin,
        r = a[s],
        l = [e, n, o.options];
      if (H(r, l, a) === !1 && n.cancelable) return !1;
    }
    return !0;
  }
  invalidate() {
    z(this._cache) || ((this._oldCache = this._cache), (this._cache = void 0));
  }
  _descriptors(t) {
    if (this._cache) return this._cache;
    const e = (this._cache = this._createDescriptors(t));
    return (this._notifyStateChanges(t), e);
  }
  _createDescriptors(t, e) {
    const s = t && t.config,
      n = T(s.options && s.options.plugins, {}),
      o = cl(s);
    return n === !1 && !e ? [] : dl(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [],
      s = this._cache,
      n = (o, a) =>
        o.filter((r) => !a.some((l) => r.plugin.id === l.plugin.id));
    (this._notify(n(e, s), t, 'stop'), this._notify(n(s, e), t, 'start'));
  }
}
function cl(i) {
  const t = {},
    e = [],
    s = Object.keys(dt.plugins.items);
  for (let o = 0; o < s.length; o++) e.push(dt.getPlugin(s[o]));
  const n = i.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    e.indexOf(a) === -1 && (e.push(a), (t[a.id] = !0));
  }
  return { plugins: e, localIds: t };
}
function hl(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function dl(i, { plugins: t, localIds: e }, s, n) {
  const o = [],
    a = i.getContext();
  for (const r of t) {
    const l = r.id,
      c = hl(s[l], n);
    c !== null &&
      o.push({
        plugin: r,
        options: ul(i.config, { plugin: r, local: e[l] }, c, a),
      });
  }
  return o;
}
function ul(i, { plugin: t, local: e }, s, n) {
  const o = i.pluginScopeKeys(t),
    a = i.getOptionScopes(s, o);
  return (
    e && t.defaults && a.push(t.defaults),
    i.createResolver(a, n, [''], { scriptable: !1, indexable: !1, allKeys: !0 })
  );
}
function Oi(i, t) {
  const e = V.datasets[i] || {};
  return (
    ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || 'x'
  );
}
function fl(i, t) {
  let e = i;
  return (
    i === '_index_' ? (e = t) : i === '_value_' && (e = t === 'x' ? 'y' : 'x'),
    e
  );
}
function gl(i, t) {
  return i === t ? '_index_' : '_value_';
}
function Hs(i) {
  if (i === 'x' || i === 'y' || i === 'r') return i;
}
function pl(i) {
  if (i === 'top' || i === 'bottom') return 'x';
  if (i === 'left' || i === 'right') return 'y';
}
function Pi(i, ...t) {
  if (Hs(i)) return i;
  for (const e of t) {
    const s =
      e.axis || pl(e.position) || (i.length > 1 && Hs(i[0].toLowerCase()));
    if (s) return s;
  }
  throw new Error(
    `Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`,
  );
}
function Ws(i, t, e) {
  if (e[t + 'AxisID'] === i) return { axis: t };
}
function ml(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === i || s.yAxisID === i);
    if (e.length) return Ws(i, 'x', e[0]) || Ws(i, 'y', e[0]);
  }
  return {};
}
function bl(i, t) {
  const e = Wt[i.type] || { scales: {} },
    s = t.scales || {},
    n = Oi(i.type, t),
    o = Object.create(null);
  return (
    Object.keys(s).forEach((a) => {
      const r = s[a];
      if (!R(r))
        return console.error(`Invalid scale configuration for scale: ${a}`);
      if (r._proxy)
        return console.warn(
          `Ignoring resolver passed as options for scale: ${a}`,
        );
      const l = Pi(a, r, ml(a, i), V.scales[r.type]),
        c = gl(l, n),
        h = e.scales || {};
      o[a] = be(Object.create(null), [{ axis: l }, r, h[l], h[c]]);
    }),
    i.data.datasets.forEach((a) => {
      const r = a.type || i.type,
        l = a.indexAxis || Oi(r, t),
        h = (Wt[r] || {}).scales || {};
      Object.keys(h).forEach((d) => {
        const u = fl(d, l),
          f = a[u + 'AxisID'] || u;
        ((o[f] = o[f] || Object.create(null)),
          be(o[f], [{ axis: u }, s[f], h[d]]));
      });
    }),
    Object.keys(o).forEach((a) => {
      const r = o[a];
      be(r, [V.scales[r.type], V.scale]);
    }),
    o
  );
}
function Un(i) {
  const t = i.options || (i.options = {});
  ((t.plugins = T(t.plugins, {})), (t.scales = bl(i, t)));
}
function Xn(i) {
  return (
    (i = i || {}),
    (i.datasets = i.datasets || []),
    (i.labels = i.labels || []),
    i
  );
}
function _l(i) {
  return ((i = i || {}), (i.data = Xn(i.data)), Un(i), i);
}
const Vs = new Map(),
  Kn = new Set();
function He(i, t) {
  let e = Vs.get(i);
  return (e || ((e = t()), Vs.set(i, e), Kn.add(e)), e);
}
const de = (i, t, e) => {
  const s = Ht(t, e);
  s !== void 0 && i.add(s);
};
class xl {
  constructor(t) {
    ((this._config = _l(t)),
      (this._scopeCache = new Map()),
      (this._resolverCache = new Map()));
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
    this._config.data = Xn(t);
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
    (this.clearCache(), Un(t));
  }
  clearCache() {
    (this._scopeCache.clear(), this._resolverCache.clear());
  }
  datasetScopeKeys(t) {
    return He(t, () => [[`datasets.${t}`, '']]);
  }
  datasetAnimationScopeKeys(t, e) {
    return He(`${t}.transition.${e}`, () => [
      [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
      [`datasets.${t}`, ''],
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return He(`${t}-${e}`, () => [
      [`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, ''],
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id,
      s = this.type;
    return He(`${s}-plugin-${e}`, () => [
      [`plugins.${e}`, ...(t.additionalOptionScopes || [])],
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return ((!n || e) && ((n = new Map()), s.set(t, n)), n);
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this,
      a = this._cachedScopes(t, s),
      r = a.get(e);
    if (r) return r;
    const l = new Set();
    e.forEach((h) => {
      (t && (l.add(t), h.forEach((d) => de(l, t, d))),
        h.forEach((d) => de(l, n, d)),
        h.forEach((d) => de(l, Wt[o] || {}, d)),
        h.forEach((d) => de(l, V, d)),
        h.forEach((d) => de(l, Ai, d)));
    });
    const c = Array.from(l);
    return (
      c.length === 0 && c.push(Object.create(null)),
      Kn.has(e) && a.set(e, c),
      c
    );
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [t, Wt[e] || {}, V.datasets[e] || {}, { type: e }, V, Ai];
  }
  resolveNamedOptions(t, e, s, n = ['']) {
    const o = { $shared: !0 },
      { resolver: a, subPrefixes: r } = $s(this._resolverCache, t, n);
    let l = a;
    if (vl(a, e)) {
      ((o.$shared = !1), (s = At(s) ? s() : s));
      const c = this.createResolver(t, s, r);
      l = te(a, s, c);
    }
    for (const c of e) o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [''], n) {
    const { resolver: o } = $s(this._resolverCache, t, s);
    return R(e) ? te(o, e, void 0, n) : o;
  }
}
function $s(i, t, e) {
  let s = i.get(t);
  s || ((s = new Map()), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return (
    o ||
      ((o = {
        resolver: Ni(t, e),
        subPrefixes: e.filter((r) => !r.toLowerCase().includes('hover')),
      }),
      s.set(n, o)),
    o
  );
}
const yl = (i) => R(i) && Object.getOwnPropertyNames(i).some((t) => At(i[t]));
function vl(i, t) {
  const { isScriptable: e, isIndexable: s } = Rn(i);
  for (const n of t) {
    const o = e(n),
      a = s(n),
      r = (a || o) && i[n];
    if ((o && (At(r) || yl(r))) || (a && N(r))) return !0;
  }
  return !1;
}
var kl = '4.5.1';
const wl = ['top', 'bottom', 'left', 'right', 'chartArea'];
function js(i, t) {
  return i === 'top' || i === 'bottom' || (wl.indexOf(i) === -1 && t === 'x');
}
function Ns(i, t) {
  return function (e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function Ys(i) {
  const t = i.chart,
    e = t.options.animation;
  (t.notifyPlugins('afterRender'), H(e && e.onComplete, [i], t));
}
function Ml(i) {
  const t = i.chart,
    e = t.options.animation;
  H(e && e.onProgress, [i], t);
}
function qn(i) {
  return (
    Xi() && typeof i == 'string'
      ? (i = document.getElementById(i))
      : i && i.length && (i = i[0]),
    i && i.canvas && (i = i.canvas),
    i
  );
}
const Ue = {},
  Us = (i) => {
    const t = qn(i);
    return Object.values(Ue)
      .filter((e) => e.canvas === t)
      .pop();
  };
function Sl(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const a = i[n];
      (delete i[n], (e > 0 || o > t) && (i[o + e] = a));
    }
  }
}
function Dl(i, t, e, s) {
  return !e || i.type === 'mouseout' ? null : s ? t : i;
}
var vt;
let li =
  ((vt = class {
    static register(...t) {
      (dt.add(...t), Xs());
    }
    static unregister(...t) {
      (dt.remove(...t), Xs());
    }
    constructor(t, e) {
      const s = (this.config = new xl(e)),
        n = qn(t),
        o = Us(n);
      if (o)
        throw new Error(
          "Canvas is already in use. Chart with ID '" +
            o.id +
            "' must be destroyed before the canvas with ID '" +
            o.canvas.id +
            "' can be reused.",
        );
      const a = s.createResolver(s.chartOptionScopes(), this.getContext());
      ((this.platform = new (s.platform || Nr(n))()),
        this.platform.updateConfig(s));
      const r = this.platform.acquireContext(n, a.aspectRatio),
        l = r && r.canvas,
        c = l && l.height,
        h = l && l.width;
      if (
        ((this.id = jo()),
        (this.ctx = r),
        (this.canvas = l),
        (this.width = h),
        (this.height = c),
        (this._options = a),
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
        (this._plugins = new ll()),
        (this.$proxies = {}),
        (this._hiddenIndices = {}),
        (this.attached = !1),
        (this._animationsDisabled = void 0),
        (this.$context = void 0),
        (this._doResize = ra((d) => this.update(d), a.resizeDelay || 0)),
        (this._dataChanges = []),
        (Ue[this.id] = this),
        !r || !l)
      ) {
        console.error(
          "Failed to create chart: can't acquire context from the given item",
        );
        return;
      }
      (gt.listen(this, 'complete', Ys),
        gt.listen(this, 'progress', Ml),
        this._initialize(),
        this.attached && this.update());
    }
    get aspectRatio() {
      const {
        options: { aspectRatio: t, maintainAspectRatio: e },
        width: s,
        height: n,
        _aspectRatio: o,
      } = this;
      return z(t) ? (e && o ? o : n ? s / n : null) : t;
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
    get registry() {
      return dt;
    }
    _initialize() {
      return (
        this.notifyPlugins('beforeInit'),
        this.options.responsive
          ? this.resize()
          : _s(this, this.options.devicePixelRatio),
        this.bindEvents(),
        this.notifyPlugins('afterInit'),
        this
      );
    }
    clear() {
      return (gs(this.canvas, this.ctx), this);
    }
    stop() {
      return (gt.stop(this), this);
    }
    resize(t, e) {
      gt.running(this)
        ? (this._resizeBeforeDraw = { width: t, height: e })
        : this._resize(t, e);
    }
    _resize(t, e) {
      const s = this.options,
        n = this.canvas,
        o = s.maintainAspectRatio && this.aspectRatio,
        a = this.platform.getMaximumSize(n, t, e, o),
        r = s.devicePixelRatio || this.platform.getDevicePixelRatio(),
        l = this.width ? 'resize' : 'attach';
      ((this.width = a.width),
        (this.height = a.height),
        (this._aspectRatio = this.aspectRatio),
        _s(this, r, !0) &&
          (this.notifyPlugins('resize', { size: a }),
          H(s.onResize, [this, a], this),
          this.attached && this._doResize(l) && this.render()));
    }
    ensureScalesHaveIDs() {
      const e = this.options.scales || {};
      I(e, (s, n) => {
        s.id = n;
      });
    }
    buildOrUpdateScales() {
      const t = this.options,
        e = t.scales,
        s = this.scales,
        n = Object.keys(s).reduce((a, r) => ((a[r] = !1), a), {});
      let o = [];
      (e &&
        (o = o.concat(
          Object.keys(e).map((a) => {
            const r = e[a],
              l = Pi(a, r),
              c = l === 'r',
              h = l === 'x';
            return {
              options: r,
              dposition: c ? 'chartArea' : h ? 'bottom' : 'left',
              dtype: c ? 'radialLinear' : h ? 'category' : 'linear',
            };
          }),
        )),
        I(o, (a) => {
          const r = a.options,
            l = r.id,
            c = Pi(l, r),
            h = T(r.type, a.dtype);
          ((r.position === void 0 || js(r.position, c) !== js(a.dposition)) &&
            (r.position = a.dposition),
            (n[l] = !0));
          let d = null;
          if (l in s && s[l].type === h) d = s[l];
          else {
            const u = dt.getScale(h);
            ((d = new u({ id: l, type: h, ctx: this.ctx, chart: this })),
              (s[d.id] = d));
          }
          d.init(r, t);
        }),
        I(n, (a, r) => {
          a || delete s[r];
        }),
        I(s, (a) => {
          (ot.configure(this, a, a.options), ot.addBox(this, a));
        }));
    }
    _updateMetasets() {
      const t = this._metasets,
        e = this.data.datasets.length,
        s = t.length;
      if ((t.sort((n, o) => n.index - o.index), s > e)) {
        for (let n = e; n < s; ++n) this._destroyDatasetMeta(n);
        t.splice(e, s - e);
      }
      this._sortedMetasets = t.slice(0).sort(Ns('order', 'index'));
    }
    _removeUnreferencedMetasets() {
      const {
        _metasets: t,
        data: { datasets: e },
      } = this;
      (t.length > e.length && delete this._stacks,
        t.forEach((s, n) => {
          e.filter((o) => o === s._dataset).length === 0 &&
            this._destroyDatasetMeta(n);
        }));
    }
    buildOrUpdateControllers() {
      const t = [],
        e = this.data.datasets;
      let s, n;
      for (
        this._removeUnreferencedMetasets(), s = 0, n = e.length;
        s < n;
        s++
      ) {
        const o = e[s];
        let a = this.getDatasetMeta(s);
        const r = o.type || this.config.type;
        if (
          (a.type &&
            a.type !== r &&
            (this._destroyDatasetMeta(s), (a = this.getDatasetMeta(s))),
          (a.type = r),
          (a.indexAxis = o.indexAxis || Oi(r, this.options)),
          (a.order = o.order || 0),
          (a.index = s),
          (a.label = '' + o.label),
          (a.visible = this.isDatasetVisible(s)),
          a.controller)
        )
          (a.controller.updateIndex(s), a.controller.linkScales());
        else {
          const l = dt.getController(r),
            { datasetElementType: c, dataElementType: h } = V.datasets[r];
          (Object.assign(l, {
            dataElementType: dt.getElement(h),
            datasetElementType: c && dt.getElement(c),
          }),
            (a.controller = new l(this, s)),
            t.push(a.controller));
        }
      }
      return (this._updateMetasets(), t);
    }
    _resetElements() {
      I(
        this.data.datasets,
        (t, e) => {
          this.getDatasetMeta(e).controller.reset();
        },
        this,
      );
    }
    reset() {
      (this._resetElements(), this.notifyPlugins('reset'));
    }
    update(t) {
      const e = this.config;
      e.update();
      const s = (this._options = e.createResolver(
          e.chartOptionScopes(),
          this.getContext(),
        )),
        n = (this._animationsDisabled = !s.animation);
      if (
        (this._updateScales(),
        this._checkEventBindings(),
        this._updateHiddenIndices(),
        this._plugins.invalidate(),
        this.notifyPlugins('beforeUpdate', { mode: t, cancelable: !0 }) === !1)
      )
        return;
      const o = this.buildOrUpdateControllers();
      this.notifyPlugins('beforeElementsUpdate');
      let a = 0;
      for (let c = 0, h = this.data.datasets.length; c < h; c++) {
        const { controller: d } = this.getDatasetMeta(c),
          u = !n && o.indexOf(d) === -1;
        (d.buildOrUpdateElements(u), (a = Math.max(+d.getMaxOverflow(), a)));
      }
      ((a = this._minPadding = s.layout.autoPadding ? a : 0),
        this._updateLayout(a),
        n ||
          I(o, (c) => {
            c.reset();
          }),
        this._updateDatasets(t),
        this.notifyPlugins('afterUpdate', { mode: t }),
        this._layers.sort(Ns('z', '_idx')));
      const { _active: r, _lastEvent: l } = this;
      (l
        ? this._eventHandler(l, !0)
        : r.length && this._updateHoverStyles(r, r, !0),
        this.render());
    }
    _updateScales() {
      (I(this.scales, (t) => {
        ot.removeBox(this, t);
      }),
        this.ensureScalesHaveIDs(),
        this.buildOrUpdateScales());
    }
    _checkEventBindings() {
      const t = this.options,
        e = new Set(Object.keys(this._listeners)),
        s = new Set(t.events);
      (!ns(e, s) || !!this._responsiveListeners !== t.responsive) &&
        (this.unbindEvents(), this.bindEvents());
    }
    _updateHiddenIndices() {
      const { _hiddenIndices: t } = this,
        e = this._getUniformDataChanges() || [];
      for (const { method: s, start: n, count: o } of e) {
        const a = s === '_removeElements' ? -o : o;
        Sl(t, n, a);
      }
    }
    _getUniformDataChanges() {
      const t = this._dataChanges;
      if (!t || !t.length) return;
      this._dataChanges = [];
      const e = this.data.datasets.length,
        s = (o) =>
          new Set(
            t
              .filter((a) => a[0] === o)
              .map((a, r) => r + ',' + a.splice(1).join(',')),
          ),
        n = s(0);
      for (let o = 1; o < e; o++) if (!ns(n, s(o))) return;
      return Array.from(n)
        .map((o) => o.split(','))
        .map((o) => ({ method: o[1], start: +o[2], count: +o[3] }));
    }
    _updateLayout(t) {
      if (this.notifyPlugins('beforeLayout', { cancelable: !0 }) === !1) return;
      ot.update(this, this.width, this.height, t);
      const e = this.chartArea,
        s = e.width <= 0 || e.height <= 0;
      ((this._layers = []),
        I(
          this.boxes,
          (n) => {
            (s && n.position === 'chartArea') ||
              (n.configure && n.configure(), this._layers.push(...n._layers()));
          },
          this,
        ),
        this._layers.forEach((n, o) => {
          n._idx = o;
        }),
        this.notifyPlugins('afterLayout'));
    }
    _updateDatasets(t) {
      if (
        this.notifyPlugins('beforeDatasetsUpdate', {
          mode: t,
          cancelable: !0,
        }) !== !1
      ) {
        for (let e = 0, s = this.data.datasets.length; e < s; ++e)
          this.getDatasetMeta(e).controller.configure();
        for (let e = 0, s = this.data.datasets.length; e < s; ++e)
          this._updateDataset(e, At(t) ? t({ datasetIndex: e }) : t);
        this.notifyPlugins('afterDatasetsUpdate', { mode: t });
      }
    }
    _updateDataset(t, e) {
      const s = this.getDatasetMeta(t),
        n = { meta: s, index: t, mode: e, cancelable: !0 };
      this.notifyPlugins('beforeDatasetUpdate', n) !== !1 &&
        (s.controller._update(e),
        (n.cancelable = !1),
        this.notifyPlugins('afterDatasetUpdate', n));
    }
    render() {
      this.notifyPlugins('beforeRender', { cancelable: !0 }) !== !1 &&
        (gt.has(this)
          ? this.attached && !gt.running(this) && gt.start(this)
          : (this.draw(), Ys({ chart: this })));
    }
    draw() {
      let t;
      if (this._resizeBeforeDraw) {
        const { width: s, height: n } = this._resizeBeforeDraw;
        ((this._resizeBeforeDraw = null), this._resize(s, n));
      }
      if (
        (this.clear(),
        this.width <= 0 ||
          this.height <= 0 ||
          this.notifyPlugins('beforeDraw', { cancelable: !0 }) === !1)
      )
        return;
      const e = this._layers;
      for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
      for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
      this.notifyPlugins('afterDraw');
    }
    _getSortedDatasetMetas(t) {
      const e = this._sortedMetasets,
        s = [];
      let n, o;
      for (n = 0, o = e.length; n < o; ++n) {
        const a = e[n];
        (!t || a.visible) && s.push(a);
      }
      return s;
    }
    getSortedVisibleDatasetMetas() {
      return this._getSortedDatasetMetas(!0);
    }
    _drawDatasets() {
      if (this.notifyPlugins('beforeDatasetsDraw', { cancelable: !0 }) === !1)
        return;
      const t = this.getSortedVisibleDatasetMetas();
      for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
      this.notifyPlugins('afterDatasetsDraw');
    }
    _drawDataset(t) {
      const e = this.ctx,
        s = { meta: t, index: t.index, cancelable: !0 },
        n = Ua(this, t);
      this.notifyPlugins('beforeDatasetDraw', s) !== !1 &&
        (n && Vi(e, n),
        t.controller.draw(),
        n && $i(e),
        (s.cancelable = !1),
        this.notifyPlugins('afterDatasetDraw', s));
    }
    isPointInArea(t) {
      return Pn(t, this.chartArea, this._minPadding);
    }
    getElementsAtEventForMode(t, e, s, n) {
      const o = wr.modes[e];
      return typeof o == 'function' ? o(this, t, s, n) : [];
    }
    getDatasetMeta(t) {
      const e = this.data.datasets[t],
        s = this._metasets;
      let n = s.filter((o) => o && o._dataset === e).pop();
      return (
        n ||
          ((n = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null,
            order: (e && e.order) || 0,
            index: t,
            _dataset: e,
            _parsed: [],
            _sorted: !1,
          }),
          s.push(n)),
        n
      );
    }
    getContext() {
      return (
        this.$context ||
        (this.$context = ie(null, { chart: this, type: 'chart' }))
      );
    }
    getVisibleDatasetCount() {
      return this.getSortedVisibleDatasetMetas().length;
    }
    isDatasetVisible(t) {
      const e = this.data.datasets[t];
      if (!e) return !1;
      const s = this.getDatasetMeta(t);
      return typeof s.hidden == 'boolean' ? !s.hidden : !e.hidden;
    }
    setDatasetVisibility(t, e) {
      const s = this.getDatasetMeta(t);
      s.hidden = !e;
    }
    toggleDataVisibility(t) {
      this._hiddenIndices[t] = !this._hiddenIndices[t];
    }
    getDataVisibility(t) {
      return !this._hiddenIndices[t];
    }
    _updateVisibility(t, e, s) {
      const n = s ? 'show' : 'hide',
        o = this.getDatasetMeta(t),
        a = o.controller._resolveAnimations(void 0, n);
      Me(e)
        ? ((o.data[e].hidden = !s), this.update())
        : (this.setDatasetVisibility(t, s),
          a.update(o, { visible: s }),
          this.update((r) => (r.datasetIndex === t ? n : void 0)));
    }
    hide(t, e) {
      this._updateVisibility(t, e, !1);
    }
    show(t, e) {
      this._updateVisibility(t, e, !0);
    }
    _destroyDatasetMeta(t) {
      const e = this._metasets[t];
      (e && e.controller && e.controller._destroy(), delete this._metasets[t]);
    }
    _stop() {
      let t, e;
      for (
        this.stop(), gt.remove(this), t = 0, e = this.data.datasets.length;
        t < e;
        ++t
      )
        this._destroyDatasetMeta(t);
    }
    destroy() {
      this.notifyPlugins('beforeDestroy');
      const { canvas: t, ctx: e } = this;
      (this._stop(),
        this.config.clearCache(),
        t &&
          (this.unbindEvents(),
          gs(t, e),
          this.platform.releaseContext(e),
          (this.canvas = null),
          (this.ctx = null)),
        delete Ue[this.id],
        this.notifyPlugins('afterDestroy'));
    }
    toBase64Image(...t) {
      return this.canvas.toDataURL(...t);
    }
    bindEvents() {
      (this.bindUserEvents(),
        this.options.responsive
          ? this.bindResponsiveEvents()
          : (this.attached = !0));
    }
    bindUserEvents() {
      const t = this._listeners,
        e = this.platform,
        s = (o, a) => {
          (e.addEventListener(this, o, a), (t[o] = a));
        },
        n = (o, a, r) => {
          ((o.offsetX = a), (o.offsetY = r), this._eventHandler(o));
        };
      I(this.options.events, (o) => s(o, n));
    }
    bindResponsiveEvents() {
      this._responsiveListeners || (this._responsiveListeners = {});
      const t = this._responsiveListeners,
        e = this.platform,
        s = (l, c) => {
          (e.addEventListener(this, l, c), (t[l] = c));
        },
        n = (l, c) => {
          t[l] && (e.removeEventListener(this, l, c), delete t[l]);
        },
        o = (l, c) => {
          this.canvas && this.resize(l, c);
        };
      let a;
      const r = () => {
        (n('attach', r),
          (this.attached = !0),
          this.resize(),
          s('resize', o),
          s('detach', a));
      };
      ((a = () => {
        ((this.attached = !1),
          n('resize', o),
          this._stop(),
          this._resize(0, 0),
          s('attach', r));
      }),
        e.isAttached(this.canvas) ? r() : a());
    }
    unbindEvents() {
      (I(this._listeners, (t, e) => {
        this.platform.removeEventListener(this, e, t);
      }),
        (this._listeners = {}),
        I(this._responsiveListeners, (t, e) => {
          this.platform.removeEventListener(this, e, t);
        }),
        (this._responsiveListeners = void 0));
    }
    updateHoverStyle(t, e, s) {
      const n = s ? 'set' : 'remove';
      let o, a, r, l;
      for (
        e === 'dataset' &&
          ((o = this.getDatasetMeta(t[0].datasetIndex)),
          o.controller['_' + n + 'DatasetHoverStyle']()),
          r = 0,
          l = t.length;
        r < l;
        ++r
      ) {
        a = t[r];
        const c = a && this.getDatasetMeta(a.datasetIndex).controller;
        c && c[n + 'HoverStyle'](a.element, a.datasetIndex, a.index);
      }
    }
    getActiveElements() {
      return this._active || [];
    }
    setActiveElements(t) {
      const e = this._active || [],
        s = t.map(({ datasetIndex: o, index: a }) => {
          const r = this.getDatasetMeta(o);
          if (!r) throw new Error('No dataset found at index ' + o);
          return { datasetIndex: o, element: r.data[a], index: a };
        });
      !Ke(s, e) &&
        ((this._active = s),
        (this._lastEvent = null),
        this._updateHoverStyles(s, e));
    }
    notifyPlugins(t, e, s) {
      return this._plugins.notify(this, t, e, s);
    }
    isPluginEnabled(t) {
      return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
    }
    _updateHoverStyles(t, e, s) {
      const n = this.options.hover,
        o = (l, c) =>
          l.filter(
            (h) =>
              !c.some(
                (d) => h.datasetIndex === d.datasetIndex && h.index === d.index,
              ),
          ),
        a = o(e, t),
        r = s ? t : o(t, e);
      (a.length && this.updateHoverStyle(a, n.mode, !1),
        r.length && n.mode && this.updateHoverStyle(r, n.mode, !0));
    }
    _eventHandler(t, e) {
      const s = {
          event: t,
          replay: e,
          cancelable: !0,
          inChartArea: this.isPointInArea(t),
        },
        n = (a) =>
          (a.options.events || this.options.events).includes(t.native.type);
      if (this.notifyPlugins('beforeEvent', s, n) === !1) return;
      const o = this._handleEvent(t, e, s.inChartArea);
      return (
        (s.cancelable = !1),
        this.notifyPlugins('afterEvent', s, n),
        (o || s.changed) && this.render(),
        this
      );
    }
    _handleEvent(t, e, s) {
      const { _active: n = [], options: o } = this,
        a = e,
        r = this._getActiveElements(t, n, s, a),
        l = qo(t),
        c = Dl(t, this._lastEvent, s, l);
      s &&
        ((this._lastEvent = null),
        H(o.onHover, [t, r, this], this),
        l && H(o.onClick, [t, r, this], this));
      const h = !Ke(r, n);
      return (
        (h || e) && ((this._active = r), this._updateHoverStyles(r, n, e)),
        (this._lastEvent = c),
        h
      );
    }
    _getActiveElements(t, e, s, n) {
      if (t.type === 'mouseout') return [];
      if (!s) return e;
      const o = this.options.hover;
      return this.getElementsAtEventForMode(t, o.mode, o, n);
    }
  }),
  A(vt, 'defaults', V),
  A(vt, 'instances', Ue),
  A(vt, 'overrides', Wt),
  A(vt, 'registry', dt),
  A(vt, 'version', kl),
  A(vt, 'getChart', Us),
  vt);
function Xs() {
  return I(li.instances, (i) => i._plugins.invalidate());
}
function Al(i, t, e) {
  const {
      startAngle: s,
      x: n,
      y: o,
      outerRadius: a,
      innerRadius: r,
      options: l,
    } = t,
    { borderWidth: c, borderJoinStyle: h } = l,
    d = Math.min(c / a, ut(s - e));
  if ((i.beginPath(), i.arc(n, o, a - c / 2, s + d / 2, e - d / 2), r > 0)) {
    const u = Math.min(c / r, ut(s - e));
    i.arc(n, o, r + c / 2, e - u / 2, s + u / 2, !0);
  } else {
    const u = Math.min(c / 2, a * ut(s - e));
    if (h === 'round') i.arc(n, o, u, e - E / 2, s + E / 2, !0);
    else if (h === 'bevel') {
      const f = 2 * u * u,
        p = -f * Math.cos(e + E / 2) + n,
        g = -f * Math.sin(e + E / 2) + o,
        m = f * Math.cos(s + E / 2) + n,
        b = f * Math.sin(s + E / 2) + o;
      (i.lineTo(p, g), i.lineTo(m, b));
    }
  }
  (i.closePath(),
    i.moveTo(0, 0),
    i.rect(0, 0, i.canvas.width, i.canvas.height),
    i.clip('evenodd'));
}
function Cl(i, t, e) {
  const {
    startAngle: s,
    pixelMargin: n,
    x: o,
    y: a,
    outerRadius: r,
    innerRadius: l,
  } = t;
  let c = n / r;
  (i.beginPath(),
    i.arc(o, a, r, s - c, e + c),
    l > n
      ? ((c = n / l), i.arc(o, a, l, e + c, s - c, !0))
      : i.arc(o, a, n, e + Y, s - Y),
    i.closePath(),
    i.clip());
}
function Ol(i) {
  return ji(i, ['outerStart', 'outerEnd', 'innerStart', 'innerEnd']);
}
function Pl(i, t, e, s) {
  const n = Ol(i.options.borderRadius),
    o = (e - t) / 2,
    a = Math.min(o, (s * t) / 2),
    r = (l) => {
      const c = ((e - Math.min(o, l)) * s) / 2;
      return tt(l, 0, Math.min(o, c));
    };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: tt(n.innerStart, 0, a),
    innerEnd: tt(n.innerEnd, 0, a),
  };
}
function Ut(i, t, e, s) {
  return { x: e + i * Math.cos(t), y: s + i * Math.sin(t) };
}
function ii(i, t, e, s, n, o) {
  const { x: a, y: r, startAngle: l, pixelMargin: c, innerRadius: h } = t,
    d = Math.max(t.outerRadius + s + e - c, 0),
    u = h > 0 ? h + s + e + c : 0;
  let f = 0;
  const p = n - l;
  if (s) {
    const L = h > 0 ? h - s : 0,
      F = d > 0 ? d - s : 0,
      W = (L + F) / 2,
      lt = W !== 0 ? (p * W) / (W + s) : p;
    f = (p - lt) / 2;
  }
  const g = Math.max(0.001, p * d - e / E) / d,
    m = (p - g) / 2,
    b = l + m + f,
    x = n - m - f,
    {
      outerStart: y,
      outerEnd: k,
      innerStart: v,
      innerEnd: S,
    } = Pl(t, u, d, x - b),
    w = d - y,
    M = d - k,
    D = b + y / w,
    C = x - k / M,
    O = u + v,
    P = u + S,
    B = b + v / O,
    X = x - S / P;
  if ((i.beginPath(), o)) {
    const L = (D + C) / 2;
    if ((i.arc(a, r, d, D, L), i.arc(a, r, d, L, C), k > 0)) {
      const K = Ut(M, C, a, r);
      i.arc(K.x, K.y, k, C, x + Y);
    }
    const F = Ut(P, x, a, r);
    if ((i.lineTo(F.x, F.y), S > 0)) {
      const K = Ut(P, X, a, r);
      i.arc(K.x, K.y, S, x + Y, X + Math.PI);
    }
    const W = (x - S / u + (b + v / u)) / 2;
    if (
      (i.arc(a, r, u, x - S / u, W, !0),
      i.arc(a, r, u, W, b + v / u, !0),
      v > 0)
    ) {
      const K = Ut(O, B, a, r);
      i.arc(K.x, K.y, v, B + Math.PI, b - Y);
    }
    const lt = Ut(w, b, a, r);
    if ((i.lineTo(lt.x, lt.y), y > 0)) {
      const K = Ut(w, D, a, r);
      i.arc(K.x, K.y, y, b - Y, D);
    }
  } else {
    i.moveTo(a, r);
    const L = Math.cos(D) * d + a,
      F = Math.sin(D) * d + r;
    i.lineTo(L, F);
    const W = Math.cos(C) * d + a,
      lt = Math.sin(C) * d + r;
    i.lineTo(W, lt);
  }
  i.closePath();
}
function Tl(i, t, e, s, n) {
  const { fullCircles: o, startAngle: a, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    ii(i, t, e, s, l, n);
    for (let c = 0; c < o; ++c) i.fill();
    isNaN(r) || (l = a + (r % $ || $));
  }
  return (ii(i, t, e, s, l, n), i.fill(), l);
}
function Rl(i, t, e, s, n) {
  const { fullCircles: o, startAngle: a, circumference: r, options: l } = t,
    {
      borderWidth: c,
      borderJoinStyle: h,
      borderDash: d,
      borderDashOffset: u,
      borderRadius: f,
    } = l,
    p = l.borderAlign === 'inner';
  if (!c) return;
  (i.setLineDash(d || []),
    (i.lineDashOffset = u),
    p
      ? ((i.lineWidth = c * 2), (i.lineJoin = h || 'round'))
      : ((i.lineWidth = c), (i.lineJoin = h || 'bevel')));
  let g = t.endAngle;
  if (o) {
    ii(i, t, e, s, g, n);
    for (let m = 0; m < o; ++m) i.stroke();
    isNaN(r) || (g = a + (r % $ || $));
  }
  (p && Cl(i, t, g),
    l.selfJoin && g - a >= E && f === 0 && h !== 'miter' && Al(i, t, g),
    o || (ii(i, t, e, s, g, n), i.stroke()));
}
class pe extends xt {
  constructor(e) {
    super();
    A(this, 'circumference');
    A(this, 'endAngle');
    A(this, 'fullCircles');
    A(this, 'innerRadius');
    A(this, 'outerRadius');
    A(this, 'pixelMargin');
    A(this, 'startAngle');
    ((this.options = void 0),
      (this.circumference = void 0),
      (this.startAngle = void 0),
      (this.endAngle = void 0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.pixelMargin = 0),
      (this.fullCircles = 0),
      e && Object.assign(this, e));
  }
  inRange(e, s, n) {
    const o = this.getProps(['x', 'y'], n),
      { angle: a, distance: r } = kn(o, { x: e, y: s }),
      {
        startAngle: l,
        endAngle: c,
        innerRadius: h,
        outerRadius: d,
        circumference: u,
      } = this.getProps(
        [
          'startAngle',
          'endAngle',
          'innerRadius',
          'outerRadius',
          'circumference',
        ],
        n,
      ),
      f = (this.options.spacing + this.options.borderWidth) / 2,
      p = T(u, c - l),
      g = Qe(a, l, c) && l !== c,
      m = p >= $ || g,
      b = zt(r, h + f, d + f);
    return m && b;
  }
  getCenterPoint(e) {
    const {
        x: s,
        y: n,
        startAngle: o,
        endAngle: a,
        innerRadius: r,
        outerRadius: l,
      } = this.getProps(
        ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius'],
        e,
      ),
      { offset: c, spacing: h } = this.options,
      d = (o + a) / 2,
      u = (r + l + h + c) / 2;
    return { x: s + Math.cos(d) * u, y: n + Math.sin(d) * u };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: s, circumference: n } = this,
      o = (s.offset || 0) / 4,
      a = (s.spacing || 0) / 2,
      r = s.circular;
    if (
      ((this.pixelMargin = s.borderAlign === 'inner' ? 0.33 : 0),
      (this.fullCircles = n > $ ? Math.floor(n / $) : 0),
      n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
    )
      return;
    e.save();
    const l = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(l) * o, Math.sin(l) * o);
    const c = 1 - Math.sin(Math.min(E, n || 0)),
      h = o * c;
    ((e.fillStyle = s.backgroundColor),
      (e.strokeStyle = s.borderColor),
      Tl(e, this, h, a, r),
      Rl(e, this, h, a, r),
      e.restore());
  }
}
(A(pe, 'id', 'arc'),
  A(pe, 'defaults', {
    borderAlign: 'center',
    borderColor: '#fff',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0,
    circular: !0,
    selfJoin: !1,
  }),
  A(pe, 'defaultRoutes', { backgroundColor: 'backgroundColor' }),
  A(pe, 'descriptors', {
    _scriptable: !0,
    _indexable: (e) => e !== 'borderDash',
  }));
function Gn(i, t) {
  const {
    x: e,
    y: s,
    base: n,
    width: o,
    height: a,
  } = i.getProps(['x', 'y', 'base', 'width', 'height'], t);
  let r, l, c, h, d;
  return (
    i.horizontal
      ? ((d = a / 2),
        (r = Math.min(e, n)),
        (l = Math.max(e, n)),
        (c = s - d),
        (h = s + d))
      : ((d = o / 2),
        (r = e - d),
        (l = e + d),
        (c = Math.min(s, n)),
        (h = Math.max(s, n))),
    { left: r, top: c, right: l, bottom: h }
  );
}
function Mt(i, t, e, s) {
  return i ? 0 : tt(t, e, s);
}
function Ll(i, t, e) {
  const s = i.options.borderWidth,
    n = i.borderSkipped,
    o = Tn(s);
  return {
    t: Mt(n.top, o.top, 0, e),
    r: Mt(n.right, o.right, 0, t),
    b: Mt(n.bottom, o.bottom, 0, e),
    l: Mt(n.left, o.left, 0, t),
  };
}
function Fl(i, t, e) {
  const { enableBorderRadius: s } = i.getProps(['enableBorderRadius']),
    n = i.options.borderRadius,
    o = qt(n),
    a = Math.min(t, e),
    r = i.borderSkipped,
    l = s || R(n);
  return {
    topLeft: Mt(!l || r.top || r.left, o.topLeft, 0, a),
    topRight: Mt(!l || r.top || r.right, o.topRight, 0, a),
    bottomLeft: Mt(!l || r.bottom || r.left, o.bottomLeft, 0, a),
    bottomRight: Mt(!l || r.bottom || r.right, o.bottomRight, 0, a),
  };
}
function Il(i) {
  const t = Gn(i),
    e = t.right - t.left,
    s = t.bottom - t.top,
    n = Ll(i, e / 2, s / 2),
    o = Fl(i, e / 2, s / 2);
  return {
    outer: { x: t.left, y: t.top, w: e, h: s, radius: o },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: e - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r)),
      },
    },
  };
}
function vi(i, t, e, s) {
  const n = t === null,
    o = e === null,
    r = i && !(n && o) && Gn(i, s);
  return r && (n || zt(t, r.left, r.right)) && (o || zt(e, r.top, r.bottom));
}
function El(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function zl(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function ki(i, t, e = {}) {
  const s = i.x !== e.x ? -t : 0,
    n = i.y !== e.y ? -t : 0,
    o = (i.x + i.w !== e.x + e.w ? t : 0) - s,
    a = (i.y + i.h !== e.y + e.h ? t : 0) - n;
  return { x: i.x + s, y: i.y + n, w: i.w + o, h: i.h + a, radius: i.radius };
}
class Xe extends xt {
  constructor(t) {
    (super(),
      (this.options = void 0),
      (this.horizontal = void 0),
      (this.base = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.inflateAmount = void 0),
      t && Object.assign(this, t));
  }
  draw(t) {
    const {
        inflateAmount: e,
        options: { borderColor: s, backgroundColor: n },
      } = this,
      { inner: o, outer: a } = Il(this),
      r = El(a.radius) ? Je : zl;
    (t.save(),
      (a.w !== o.w || a.h !== o.h) &&
        (t.beginPath(),
        r(t, ki(a, e, o)),
        t.clip(),
        r(t, ki(o, -e, a)),
        (t.fillStyle = s),
        t.fill('evenodd')),
      t.beginPath(),
      r(t, ki(o, e)),
      (t.fillStyle = n),
      t.fill(),
      t.restore());
  }
  inRange(t, e, s) {
    return vi(this, t, e, s);
  }
  inXRange(t, e) {
    return vi(this, t, null, e);
  }
  inYRange(t, e) {
    return vi(this, null, t, e);
  }
  getCenterPoint(t) {
    const {
      x: e,
      y: s,
      base: n,
      horizontal: o,
    } = this.getProps(['x', 'y', 'base', 'horizontal'], t);
    return { x: o ? (e + n) / 2 : e, y: o ? s : (s + n) / 2 };
  }
  getRange(t) {
    return t === 'x' ? this.width / 2 : this.height / 2;
  }
}
(A(Xe, 'id', 'bar'),
  A(Xe, 'defaults', {
    borderSkipped: 'start',
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: 'auto',
    pointStyle: void 0,
  }),
  A(Xe, 'defaultRoutes', {
    backgroundColor: 'backgroundColor',
    borderColor: 'borderColor',
  }));
const Ks = (i, t) => {
    let { boxHeight: e = t, boxWidth: s = t } = i;
    return (
      i.usePointStyle &&
        ((e = Math.min(e, t)), (s = i.pointStyleWidth || Math.min(s, t))),
      { boxWidth: s, boxHeight: e, itemHeight: Math.max(t, e) }
    );
  },
  Bl = (i, t) =>
    i !== null &&
    t !== null &&
    i.datasetIndex === t.datasetIndex &&
    i.index === t.index;
class qs extends xt {
  constructor(t) {
    (super(),
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
      (this.fullSize = void 0));
  }
  update(t, e, s) {
    ((this.maxWidth = t),
      (this.maxHeight = e),
      (this._margins = s),
      this.setDimensions(),
      this.buildLabels(),
      this.fit());
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
    let e = H(t.generateLabels, [this.chart], this) || [];
    (t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))),
      t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))),
      this.options.reverse && e.reverse(),
      (this.legendItems = e));
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels,
      n = Z(s.font),
      o = n.size,
      a = this._computeTitleHeight(),
      { boxWidth: r, itemHeight: l } = Ks(s, o);
    let c, h;
    ((e.font = n.string),
      this.isHorizontal()
        ? ((c = this.maxWidth), (h = this._fitRows(a, o, r, l) + 10))
        : ((h = this.maxHeight), (c = this._fitCols(a, n, r, l) + 10)),
      (this.width = Math.min(c, t.maxWidth || this.maxWidth)),
      (this.height = Math.min(h, t.maxHeight || this.maxHeight)));
  }
  _fitRows(t, e, s, n) {
    const {
        ctx: o,
        maxWidth: a,
        options: {
          labels: { padding: r },
        },
      } = this,
      l = (this.legendHitBoxes = []),
      c = (this.lineWidths = [0]),
      h = n + r;
    let d = t;
    ((o.textAlign = 'left'), (o.textBaseline = 'middle'));
    let u = -1,
      f = -h;
    return (
      this.legendItems.forEach((p, g) => {
        const m = s + e / 2 + o.measureText(p.text).width;
        ((g === 0 || c[c.length - 1] + m + 2 * r > a) &&
          ((d += h), (c[c.length - (g > 0 ? 0 : 1)] = 0), (f += h), u++),
          (l[g] = { left: 0, top: f, row: u, width: m, height: n }),
          (c[c.length - 1] += m + r));
      }),
      d
    );
  }
  _fitCols(t, e, s, n) {
    const {
        ctx: o,
        maxHeight: a,
        options: {
          labels: { padding: r },
        },
      } = this,
      l = (this.legendHitBoxes = []),
      c = (this.columnSizes = []),
      h = a - t;
    let d = r,
      u = 0,
      f = 0,
      p = 0,
      g = 0;
    return (
      this.legendItems.forEach((m, b) => {
        const { itemWidth: x, itemHeight: y } = Hl(s, e, o, m, n);
        (b > 0 &&
          f + y + 2 * r > h &&
          ((d += u + r),
          c.push({ width: u, height: f }),
          (p += u + r),
          g++,
          (u = f = 0)),
          (l[b] = { left: p, top: f, col: g, width: x, height: y }),
          (u = Math.max(u, x)),
          (f += y + r));
      }),
      (d += u),
      c.push({ width: u, height: f }),
      d
    );
  }
  adjustHitBoxes() {
    if (!this.options.display) return;
    const t = this._computeTitleHeight(),
      {
        legendHitBoxes: e,
        options: {
          align: s,
          labels: { padding: n },
          rtl: o,
        },
      } = this,
      a = Gt(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0,
        l = q(s, this.left + n, this.right - this.lineWidths[r]);
      for (const c of e)
        (r !== c.row &&
          ((r = c.row),
          (l = q(s, this.left + n, this.right - this.lineWidths[r]))),
          (c.top += this.top + t + n),
          (c.left = a.leftForLtr(a.x(l), c.width)),
          (l += c.width + n));
    } else {
      let r = 0,
        l = q(s, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const c of e)
        (c.col !== r &&
          ((r = c.col),
          (l = q(
            s,
            this.top + t + n,
            this.bottom - this.columnSizes[r].height,
          ))),
          (c.top = l),
          (c.left += this.left + n),
          (c.left = a.leftForLtr(a.x(c.left), c.width)),
          (l += c.height + n));
    }
  }
  isHorizontal() {
    return (
      this.options.position === 'top' || this.options.position === 'bottom'
    );
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      (Vi(t, this), this._draw(), $i(t));
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this,
      { align: o, labels: a } = t,
      r = V.color,
      l = Gt(t.rtl, this.left, this.width),
      c = Z(a.font),
      { padding: h } = a,
      d = c.size,
      u = d / 2;
    let f;
    (this.drawTitle(),
      (n.textAlign = l.textAlign('left')),
      (n.textBaseline = 'middle'),
      (n.lineWidth = 0.5),
      (n.font = c.string));
    const { boxWidth: p, boxHeight: g, itemHeight: m } = Ks(a, d),
      b = function (S, w, M) {
        if (isNaN(p) || p <= 0 || isNaN(g) || g < 0) return;
        n.save();
        const D = T(M.lineWidth, 1);
        if (
          ((n.fillStyle = T(M.fillStyle, r)),
          (n.lineCap = T(M.lineCap, 'butt')),
          (n.lineDashOffset = T(M.lineDashOffset, 0)),
          (n.lineJoin = T(M.lineJoin, 'miter')),
          (n.lineWidth = D),
          (n.strokeStyle = T(M.strokeStyle, r)),
          n.setLineDash(T(M.lineDash, [])),
          a.usePointStyle)
        ) {
          const C = {
              radius: (g * Math.SQRT2) / 2,
              pointStyle: M.pointStyle,
              rotation: M.rotation,
              borderWidth: D,
            },
            O = l.xPlus(S, p / 2),
            P = w + u;
          On(n, C, O, P, a.pointStyleWidth && p);
        } else {
          const C = w + Math.max((d - g) / 2, 0),
            O = l.leftForLtr(S, p),
            P = qt(M.borderRadius);
          (n.beginPath(),
            Object.values(P).some((B) => B !== 0)
              ? Je(n, { x: O, y: C, w: p, h: g, radius: P })
              : n.rect(O, C, p, g),
            n.fill(),
            D !== 0 && n.stroke());
        }
        n.restore();
      },
      x = function (S, w, M) {
        Se(n, M.text, S, w + m / 2, c, {
          strikethrough: M.hidden,
          textAlign: l.textAlign(M.textAlign),
        });
      },
      y = this.isHorizontal(),
      k = this._computeTitleHeight();
    (y
      ? (f = {
          x: q(o, this.left + h, this.right - s[0]),
          y: this.top + h + k,
          line: 0,
        })
      : (f = {
          x: this.left + h,
          y: q(o, this.top + k + h, this.bottom - e[0].height),
          line: 0,
        }),
      En(this.ctx, t.textDirection));
    const v = m + h;
    (this.legendItems.forEach((S, w) => {
      ((n.strokeStyle = S.fontColor), (n.fillStyle = S.fontColor));
      const M = n.measureText(S.text).width,
        D = l.textAlign(S.textAlign || (S.textAlign = a.textAlign)),
        C = p + u + M;
      let O = f.x,
        P = f.y;
      (l.setWidth(this.width),
        y
          ? w > 0 &&
            O + C + h > this.right &&
            ((P = f.y += v),
            f.line++,
            (O = f.x = q(o, this.left + h, this.right - s[f.line])))
          : w > 0 &&
            P + v > this.bottom &&
            ((O = f.x = O + e[f.line].width + h),
            f.line++,
            (P = f.y =
              q(o, this.top + k + h, this.bottom - e[f.line].height))));
      const B = l.x(O);
      if (
        (b(B, P, S),
        (O = la(D, O + p + u, y ? O + C : this.right, t.rtl)),
        x(l.x(O), P, S),
        y)
      )
        f.x += C + h;
      else if (typeof S.text != 'string') {
        const X = c.lineHeight;
        f.y += Zn(S, X) + h;
      } else f.y += v;
    }),
      zn(this.ctx, t.textDirection));
  }
  drawTitle() {
    const t = this.options,
      e = t.title,
      s = Z(e.font),
      n = rt(e.padding);
    if (!e.display) return;
    const o = Gt(t.rtl, this.left, this.width),
      a = this.ctx,
      r = e.position,
      l = s.size / 2,
      c = n.top + l;
    let h,
      d = this.left,
      u = this.width;
    if (this.isHorizontal())
      ((u = Math.max(...this.lineWidths)),
        (h = this.top + c),
        (d = q(t.align, d, this.right - u)));
    else {
      const p = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h =
        c +
        q(
          t.align,
          this.top,
          this.bottom - p - t.labels.padding - this._computeTitleHeight(),
        );
    }
    const f = q(r, d, d + u);
    ((a.textAlign = o.textAlign(Hi(r))),
      (a.textBaseline = 'middle'),
      (a.strokeStyle = e.color),
      (a.fillStyle = e.color),
      (a.font = s.string),
      Se(a, e.text, f, h, s));
  }
  _computeTitleHeight() {
    const t = this.options.title,
      e = Z(t.font),
      s = rt(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, n, o;
    if (zt(t, this.left, this.right) && zt(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (
          ((n = o[s]),
          zt(t, n.left, n.left + n.width) && zt(e, n.top, n.top + n.height))
        )
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!$l(t.type, e)) return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === 'mousemove' || t.type === 'mouseout') {
      const n = this._hoveredItem,
        o = Bl(n, s);
      (n && !o && H(e.onLeave, [t, n, this], this),
        (this._hoveredItem = s),
        s && !o && H(e.onHover, [t, s, this], this));
    } else s && H(e.onClick, [t, s, this], this);
  }
}
function Hl(i, t, e, s, n) {
  const o = Wl(s, i, t, e),
    a = Vl(n, s, t.lineHeight);
  return { itemWidth: o, itemHeight: a };
}
function Wl(i, t, e, s) {
  let n = i.text;
  return (
    n &&
      typeof n != 'string' &&
      (n = n.reduce((o, a) => (o.length > a.length ? o : a))),
    t + e.size / 2 + s.measureText(n).width
  );
}
function Vl(i, t, e) {
  let s = i;
  return (typeof t.text != 'string' && (s = Zn(t, e)), s);
}
function Zn(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function $l(i, t) {
  return !!(
    ((i === 'mousemove' || i === 'mouseout') && (t.onHover || t.onLeave)) ||
    (t.onClick && (i === 'click' || i === 'mouseup'))
  );
}
var jl = {
  id: 'legend',
  _element: qs,
  start(i, t, e) {
    const s = (i.legend = new qs({ ctx: i.ctx, options: e, chart: i }));
    (ot.configure(i, s, e), ot.addBox(i, s));
  },
  stop(i) {
    (ot.removeBox(i, i.legend), delete i.legend);
  },
  beforeUpdate(i, t, e) {
    const s = i.legend;
    (ot.configure(i, s, e), (s.options = e));
  },
  afterUpdate(i) {
    const t = i.legend;
    (t.buildLabels(), t.adjustHitBoxes());
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: 'top',
    align: 'center',
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const s = t.datasetIndex,
        n = e.chart;
      n.isDatasetVisible(s)
        ? (n.hide(s), (t.hidden = !0))
        : (n.show(s), (t.hidden = !1));
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets,
          {
            labels: {
              usePointStyle: e,
              pointStyle: s,
              textAlign: n,
              color: o,
              useBorderRadius: a,
              borderRadius: r,
            },
          } = i.legend.options;
        return i._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(e ? 0 : void 0),
            h = rt(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: s || c.pointStyle,
            rotation: c.rotation,
            textAlign: n || c.textAlign,
            borderRadius: a && (r || c.borderRadius),
            datasetIndex: l.index,
          };
        }, this);
      },
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: 'center',
      text: '',
    },
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith('on'),
    labels: {
      _scriptable: (i) => !['generateLabels', 'filter', 'sort'].includes(i),
    },
  },
};
class Qn extends xt {
  constructor(t) {
    (super(),
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
      (this.fullSize = void 0));
  }
  update(t, e) {
    const s = this.options;
    if (((this.left = 0), (this.top = 0), !s.display)) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    ((this.width = this.right = t), (this.height = this.bottom = e));
    const n = N(s.text) ? s.text.length : 1;
    this._padding = rt(s.padding);
    const o = n * Z(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? (this.height = o) : (this.width = o);
  }
  isHorizontal() {
    const t = this.options.position;
    return t === 'top' || t === 'bottom';
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: n, right: o, options: a } = this,
      r = a.align;
    let l = 0,
      c,
      h,
      d;
    return (
      this.isHorizontal()
        ? ((h = q(r, s, o)), (d = e + t), (c = o - s))
        : (a.position === 'left'
            ? ((h = s + t), (d = q(r, n, e)), (l = E * -0.5))
            : ((h = o - t), (d = q(r, e, n)), (l = E * 0.5)),
          (c = n - e)),
      { titleX: h, titleY: d, maxWidth: c, rotation: l }
    );
  }
  draw() {
    const t = this.ctx,
      e = this.options;
    if (!e.display) return;
    const s = Z(e.font),
      o = s.lineHeight / 2 + this._padding.top,
      { titleX: a, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(o);
    Se(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: Hi(e.align),
      textBaseline: 'middle',
      translation: [a, r],
    });
  }
}
function Nl(i, t) {
  const e = new Qn({ ctx: i.ctx, options: t, chart: i });
  (ot.configure(i, e, t), ot.addBox(i, e), (i.titleBlock = e));
}
var Yl = {
  id: 'title',
  _element: Qn,
  start(i, t, e) {
    Nl(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    (ot.removeBox(i, t), delete i.titleBlock);
  },
  beforeUpdate(i, t, e) {
    const s = i.titleBlock;
    (ot.configure(i, s, e), (s.options = e));
  },
  defaults: {
    align: 'center',
    display: !1,
    font: { weight: 'bold' },
    fullSize: !0,
    padding: 10,
    position: 'top',
    text: '',
    weight: 2e3,
  },
  defaultRoutes: { color: 'color' },
  descriptors: { _scriptable: !0, _indexable: !1 },
};
const me = {
  average(i) {
    if (!i.length) return !1;
    let t,
      e,
      s = new Set(),
      n = 0,
      o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const r = i[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        (s.add(l.x), (n += l.y), ++o);
      }
    }
    return o === 0 || s.size === 0
      ? !1
      : { x: [...s].reduce((r, l) => r + l) / s.size, y: n / o };
  },
  nearest(i, t) {
    if (!i.length) return !1;
    let e = t.x,
      s = t.y,
      n = Number.POSITIVE_INFINITY,
      o,
      a,
      r;
    for (o = 0, a = i.length; o < a; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(),
          h = ia(t, c);
        h < n && ((n = h), (r = l));
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      ((e = l.x), (s = l.y));
    }
    return { x: e, y: s };
  },
};
function ht(i, t) {
  return (t && (N(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i);
}
function pt(i) {
  return (typeof i == 'string' || i instanceof String) &&
    i.indexOf(`
`) > -1
    ? i.split(`
`)
    : i;
}
function Ul(i, t) {
  const { element: e, datasetIndex: s, index: n } = t,
    o = i.getDatasetMeta(s).controller,
    { label: a, value: r } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: a,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e,
  };
}
function Gs(i, t) {
  const e = i.chart.ctx,
    { body: s, footer: n, title: o } = i,
    { boxWidth: a, boxHeight: r } = t,
    l = Z(t.bodyFont),
    c = Z(t.titleFont),
    h = Z(t.footerFont),
    d = o.length,
    u = n.length,
    f = s.length,
    p = rt(t.padding);
  let g = p.height,
    m = 0,
    b = s.reduce(
      (k, v) => k + v.before.length + v.lines.length + v.after.length,
      0,
    );
  if (
    ((b += i.beforeBody.length + i.afterBody.length),
    d &&
      (g += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom),
    b)
  ) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    g += f * k + (b - f) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  u && (g += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let x = 0;
  const y = function (k) {
    m = Math.max(m, e.measureText(k).width + x);
  };
  return (
    e.save(),
    (e.font = c.string),
    I(i.title, y),
    (e.font = l.string),
    I(i.beforeBody.concat(i.afterBody), y),
    (x = t.displayColors ? a + 2 + t.boxPadding : 0),
    I(s, (k) => {
      (I(k.before, y), I(k.lines, y), I(k.after, y));
    }),
    (x = 0),
    (e.font = h.string),
    I(i.footer, y),
    e.restore(),
    (m += p.width),
    { width: m, height: g }
  );
}
function Xl(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? 'top' : e > i.height - s / 2 ? 'bottom' : 'center';
}
function Kl(i, t, e, s) {
  const { x: n, width: o } = s,
    a = e.caretSize + e.caretPadding;
  if ((i === 'left' && n + o + a > t.width) || (i === 'right' && n - o - a < 0))
    return !0;
}
function ql(i, t, e, s) {
  const { x: n, width: o } = e,
    {
      width: a,
      chartArea: { left: r, right: l },
    } = i;
  let c = 'center';
  return (
    s === 'center'
      ? (c = n <= (r + l) / 2 ? 'left' : 'right')
      : n <= o / 2
        ? (c = 'left')
        : n >= a - o / 2 && (c = 'right'),
    Kl(c, i, t, e) && (c = 'center'),
    c
  );
}
function Zs(i, t, e) {
  const s = e.yAlign || t.yAlign || Xl(i, e);
  return { xAlign: e.xAlign || t.xAlign || ql(i, t, e, s), yAlign: s };
}
function Gl(i, t) {
  let { x: e, width: s } = i;
  return (t === 'right' ? (e -= s) : t === 'center' && (e -= s / 2), e);
}
function Zl(i, t, e) {
  let { y: s, height: n } = i;
  return (
    t === 'top' ? (s += e) : t === 'bottom' ? (s -= n + e) : (s -= n / 2),
    s
  );
}
function Qs(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: a } = i,
    { xAlign: r, yAlign: l } = e,
    c = n + o,
    { topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = qt(a);
  let p = Gl(t, r);
  const g = Zl(t, l, c);
  return (
    l === 'center'
      ? r === 'left'
        ? (p += c)
        : r === 'right' && (p -= c)
      : r === 'left'
        ? (p -= Math.max(h, u) + n)
        : r === 'right' && (p += Math.max(d, f) + n),
    { x: tt(p, 0, s.width - t.width), y: tt(g, 0, s.height - t.height) }
  );
}
function We(i, t, e) {
  const s = rt(e.padding);
  return t === 'center'
    ? i.x + i.width / 2
    : t === 'right'
      ? i.x + i.width - s.right
      : i.x + s.left;
}
function Js(i) {
  return ht([], pt(i));
}
function Ql(i, t, e) {
  return ie(i, { tooltip: t, tooltipItems: e, type: 'tooltip' });
}
function tn(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const Jn = {
  beforeTitle: ft,
  title(i) {
    if (i.length > 0) {
      const t = i[0],
        e = t.chart.data.labels,
        s = e ? e.length : 0;
      if (this && this.options && this.options.mode === 'dataset')
        return t.dataset.label || '';
      if (t.label) return t.label;
      if (s > 0 && t.dataIndex < s) return e[t.dataIndex];
    }
    return '';
  },
  afterTitle: ft,
  beforeBody: ft,
  beforeLabel: ft,
  label(i) {
    if (this && this.options && this.options.mode === 'dataset')
      return i.label + ': ' + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || '';
    t && (t += ': ');
    const e = i.formattedValue;
    return (z(e) || (t += e), t);
  },
  labelColor(i) {
    const e = i.chart
      .getDatasetMeta(i.datasetIndex)
      .controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0,
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart
      .getDatasetMeta(i.datasetIndex)
      .controller.getStyle(i.dataIndex);
    return { pointStyle: e.pointStyle, rotation: e.rotation };
  },
  afterLabel: ft,
  afterBody: ft,
  beforeFooter: ft,
  footer: ft,
  afterFooter: ft,
};
function Q(i, t, e, s) {
  const n = i[t].call(e, s);
  return typeof n > 'u' ? Jn[t].call(e, s) : n;
}
class Ti extends xt {
  constructor(t) {
    (super(),
      (this.opacity = 0),
      (this._active = []),
      (this._eventPosition = void 0),
      (this._size = void 0),
      (this._cachedAnimations = void 0),
      (this._tooltipItems = []),
      (this.$animations = void 0),
      (this.$context = void 0),
      (this.chart = t.chart),
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
      (this.labelTextColors = void 0));
  }
  initialize(t) {
    ((this.options = t),
      (this._cachedAnimations = void 0),
      (this.$context = void 0));
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t) return t;
    const e = this.chart,
      s = this.options.setContext(this.getContext()),
      n = s.enabled && e.options.animation && s.animations,
      o = new Bn(this.chart, n);
    return (n._cacheable && (this._cachedAnimations = Object.freeze(o)), o);
  }
  getContext() {
    return (
      this.$context ||
      (this.$context = Ql(this.chart.getContext(), this, this._tooltipItems))
    );
  }
  getTitle(t, e) {
    const { callbacks: s } = e,
      n = Q(s, 'beforeTitle', this, t),
      o = Q(s, 'title', this, t),
      a = Q(s, 'afterTitle', this, t);
    let r = [];
    return ((r = ht(r, pt(n))), (r = ht(r, pt(o))), (r = ht(r, pt(a))), r);
  }
  getBeforeBody(t, e) {
    return Js(Q(e.callbacks, 'beforeBody', this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e,
      n = [];
    return (
      I(t, (o) => {
        const a = { before: [], lines: [], after: [] },
          r = tn(s, o);
        (ht(a.before, pt(Q(r, 'beforeLabel', this, o))),
          ht(a.lines, Q(r, 'label', this, o)),
          ht(a.after, pt(Q(r, 'afterLabel', this, o))),
          n.push(a));
      }),
      n
    );
  }
  getAfterBody(t, e) {
    return Js(Q(e.callbacks, 'afterBody', this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e,
      n = Q(s, 'beforeFooter', this, t),
      o = Q(s, 'footer', this, t),
      a = Q(s, 'afterFooter', this, t);
    let r = [];
    return ((r = ht(r, pt(n))), (r = ht(r, pt(o))), (r = ht(r, pt(a))), r);
  }
  _createItems(t) {
    const e = this._active,
      s = this.chart.data,
      n = [],
      o = [],
      a = [];
    let r = [],
      l,
      c;
    for (l = 0, c = e.length; l < c; ++l) r.push(Ul(this.chart, e[l]));
    return (
      t.filter && (r = r.filter((h, d, u) => t.filter(h, d, u, s))),
      t.itemSort && (r = r.sort((h, d) => t.itemSort(h, d, s))),
      I(r, (h) => {
        const d = tn(t.callbacks, h);
        (n.push(Q(d, 'labelColor', this, h)),
          o.push(Q(d, 'labelPointStyle', this, h)),
          a.push(Q(d, 'labelTextColor', this, h)));
      }),
      (this.labelColors = n),
      (this.labelPointStyles = o),
      (this.labelTextColors = a),
      (this.dataPoints = r),
      r
    );
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()),
      n = this._active;
    let o,
      a = [];
    if (!n.length) this.opacity !== 0 && (o = { opacity: 0 });
    else {
      const r = me[s.position].call(this, n, this._eventPosition);
      ((a = this._createItems(s)),
        (this.title = this.getTitle(a, s)),
        (this.beforeBody = this.getBeforeBody(a, s)),
        (this.body = this.getBody(a, s)),
        (this.afterBody = this.getAfterBody(a, s)),
        (this.footer = this.getFooter(a, s)));
      const l = (this._size = Gs(this, s)),
        c = Object.assign({}, r, l),
        h = Zs(this.chart, s, c),
        d = Qs(s, c, h, this.chart);
      ((this.xAlign = h.xAlign),
        (this.yAlign = h.yAlign),
        (o = {
          opacity: 1,
          x: d.x,
          y: d.y,
          width: l.width,
          height: l.height,
          caretX: r.x,
          caretY: r.y,
        }));
    }
    ((this._tooltipItems = a),
      (this.$context = void 0),
      o && this._resolveAnimations().update(this, o),
      t &&
        s.external &&
        s.external.call(this, { chart: this.chart, tooltip: this, replay: e }));
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    (e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3));
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this,
      { caretSize: a, cornerRadius: r } = s,
      { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = qt(r),
      { x: u, y: f } = t,
      { width: p, height: g } = e;
    let m, b, x, y, k, v;
    return (
      o === 'center'
        ? ((k = f + g / 2),
          n === 'left'
            ? ((m = u), (b = m - a), (y = k + a), (v = k - a))
            : ((m = u + p), (b = m + a), (y = k - a), (v = k + a)),
          (x = m))
        : (n === 'left'
            ? (b = u + Math.max(l, h) + a)
            : n === 'right'
              ? (b = u + p - Math.max(c, d) - a)
              : (b = this.caretX),
          o === 'top'
            ? ((y = f), (k = y - a), (m = b - a), (x = b + a))
            : ((y = f + g), (k = y + a), (m = b + a), (x = b - a)),
          (v = y)),
      { x1: m, x2: b, x3: x, y1: y, y2: k, y3: v }
    );
  }
  drawTitle(t, e, s) {
    const n = this.title,
      o = n.length;
    let a, r, l;
    if (o) {
      const c = Gt(s.rtl, this.x, this.width);
      for (
        t.x = We(this, s.titleAlign, s),
          e.textAlign = c.textAlign(s.titleAlign),
          e.textBaseline = 'middle',
          a = Z(s.titleFont),
          r = s.titleSpacing,
          e.fillStyle = s.titleColor,
          e.font = a.string,
          l = 0;
        l < o;
        ++l
      )
        (e.fillText(n[l], c.x(t.x), t.y + a.lineHeight / 2),
          (t.y += a.lineHeight + r),
          l + 1 === o && (t.y += s.titleMarginBottom - r));
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const a = this.labelColors[s],
      r = this.labelPointStyles[s],
      { boxHeight: l, boxWidth: c } = o,
      h = Z(o.bodyFont),
      d = We(this, 'left', o),
      u = n.x(d),
      f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0,
      p = e.y + f;
    if (o.usePointStyle) {
      const g = {
          radius: Math.min(c, l) / 2,
          pointStyle: r.pointStyle,
          rotation: r.rotation,
          borderWidth: 1,
        },
        m = n.leftForLtr(u, c) + c / 2,
        b = p + l / 2;
      ((t.strokeStyle = o.multiKeyBackground),
        (t.fillStyle = o.multiKeyBackground),
        ps(t, g, m, b),
        (t.strokeStyle = a.borderColor),
        (t.fillStyle = a.backgroundColor),
        ps(t, g, m, b));
    } else {
      ((t.lineWidth = R(a.borderWidth)
        ? Math.max(...Object.values(a.borderWidth))
        : a.borderWidth || 1),
        (t.strokeStyle = a.borderColor),
        t.setLineDash(a.borderDash || []),
        (t.lineDashOffset = a.borderDashOffset || 0));
      const g = n.leftForLtr(u, c),
        m = n.leftForLtr(n.xPlus(u, 1), c - 2),
        b = qt(a.borderRadius);
      Object.values(b).some((x) => x !== 0)
        ? (t.beginPath(),
          (t.fillStyle = o.multiKeyBackground),
          Je(t, { x: g, y: p, w: c, h: l, radius: b }),
          t.fill(),
          t.stroke(),
          (t.fillStyle = a.backgroundColor),
          t.beginPath(),
          Je(t, { x: m, y: p + 1, w: c - 2, h: l - 2, radius: b }),
          t.fill())
        : ((t.fillStyle = o.multiKeyBackground),
          t.fillRect(g, p, c, l),
          t.strokeRect(g, p, c, l),
          (t.fillStyle = a.backgroundColor),
          t.fillRect(m, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this,
      {
        bodySpacing: o,
        bodyAlign: a,
        displayColors: r,
        boxHeight: l,
        boxWidth: c,
        boxPadding: h,
      } = s,
      d = Z(s.bodyFont);
    let u = d.lineHeight,
      f = 0;
    const p = Gt(s.rtl, this.x, this.width),
      g = function (M) {
        (e.fillText(M, p.x(t.x + f), t.y + u / 2), (t.y += u + o));
      },
      m = p.textAlign(a);
    let b, x, y, k, v, S, w;
    for (
      e.textAlign = a,
        e.textBaseline = 'middle',
        e.font = d.string,
        t.x = We(this, m, s),
        e.fillStyle = s.bodyColor,
        I(this.beforeBody, g),
        f = r && m !== 'right' ? (a === 'center' ? c / 2 + h : c + 2 + h) : 0,
        k = 0,
        S = n.length;
      k < S;
      ++k
    ) {
      for (
        b = n[k],
          x = this.labelTextColors[k],
          e.fillStyle = x,
          I(b.before, g),
          y = b.lines,
          r &&
            y.length &&
            (this._drawColorBox(e, t, k, p, s),
            (u = Math.max(d.lineHeight, l))),
          v = 0,
          w = y.length;
        v < w;
        ++v
      )
        (g(y[v]), (u = d.lineHeight));
      I(b.after, g);
    }
    ((f = 0), (u = d.lineHeight), I(this.afterBody, g), (t.y -= o));
  }
  drawFooter(t, e, s) {
    const n = this.footer,
      o = n.length;
    let a, r;
    if (o) {
      const l = Gt(s.rtl, this.x, this.width);
      for (
        t.x = We(this, s.footerAlign, s),
          t.y += s.footerMarginTop,
          e.textAlign = l.textAlign(s.footerAlign),
          e.textBaseline = 'middle',
          a = Z(s.footerFont),
          e.fillStyle = s.footerColor,
          e.font = a.string,
          r = 0;
        r < o;
        ++r
      )
        (e.fillText(n[r], l.x(t.x), t.y + a.lineHeight / 2),
          (t.y += a.lineHeight + s.footerSpacing));
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: a } = this,
      { x: r, y: l } = t,
      { width: c, height: h } = s,
      {
        topLeft: d,
        topRight: u,
        bottomLeft: f,
        bottomRight: p,
      } = qt(n.cornerRadius);
    ((e.fillStyle = n.backgroundColor),
      (e.strokeStyle = n.borderColor),
      (e.lineWidth = n.borderWidth),
      e.beginPath(),
      e.moveTo(r + d, l),
      a === 'top' && this.drawCaret(t, e, s, n),
      e.lineTo(r + c - u, l),
      e.quadraticCurveTo(r + c, l, r + c, l + u),
      a === 'center' && o === 'right' && this.drawCaret(t, e, s, n),
      e.lineTo(r + c, l + h - p),
      e.quadraticCurveTo(r + c, l + h, r + c - p, l + h),
      a === 'bottom' && this.drawCaret(t, e, s, n),
      e.lineTo(r + f, l + h),
      e.quadraticCurveTo(r, l + h, r, l + h - f),
      a === 'center' && o === 'left' && this.drawCaret(t, e, s, n),
      e.lineTo(r, l + d),
      e.quadraticCurveTo(r, l, r + d, l),
      e.closePath(),
      e.fill(),
      n.borderWidth > 0 && e.stroke());
  }
  _updateAnimationTarget(t) {
    const e = this.chart,
      s = this.$animations,
      n = s && s.x,
      o = s && s.y;
    if (n || o) {
      const a = me[t.position].call(this, this._active, this._eventPosition);
      if (!a) return;
      const r = (this._size = Gs(this, t)),
        l = Object.assign({}, a, this._size),
        c = Zs(e, t, l),
        h = Qs(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) &&
        ((this.xAlign = c.xAlign),
        (this.yAlign = c.yAlign),
        (this.width = r.width),
        (this.height = r.height),
        (this.caretX = a.x),
        (this.caretY = a.y),
        this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s) return;
    this._updateAnimationTarget(e);
    const n = { width: this.width, height: this.height },
      o = { x: this.x, y: this.y };
    s = Math.abs(s) < 0.001 ? 0 : s;
    const a = rt(e.padding),
      r =
        this.title.length ||
        this.beforeBody.length ||
        this.body.length ||
        this.afterBody.length ||
        this.footer.length;
    e.enabled &&
      r &&
      (t.save(),
      (t.globalAlpha = s),
      this.drawBackground(o, t, n, e),
      En(t, e.textDirection),
      (o.y += a.top),
      this.drawTitle(o, t, e),
      this.drawBody(o, t, e),
      this.drawFooter(o, t, e),
      zn(t, e.textDirection),
      t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active,
      n = t.map(({ datasetIndex: r, index: l }) => {
        const c = this.chart.getDatasetMeta(r);
        if (!c) throw new Error('Cannot find a dataset at index ' + r);
        return { datasetIndex: r, element: c.data[l], index: l };
      }),
      o = !Ke(s, n),
      a = this._positionChanged(n, e);
    (o || a) &&
      ((this._active = n),
      (this._eventPosition = e),
      (this._ignoreReplayEvents = !0),
      this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents) return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options,
      o = this._active || [],
      a = this._getActiveElements(t, o, e, s),
      r = this._positionChanged(a, t),
      l = e || !Ke(a, o) || r;
    return (
      l &&
        ((this._active = a),
        (n.enabled || n.external) &&
          ((this._eventPosition = { x: t.x, y: t.y }), this.update(!0, e))),
      l
    );
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === 'mouseout') return [];
    if (!n)
      return e.filter(
        (r) =>
          this.chart.data.datasets[r.datasetIndex] &&
          this.chart
            .getDatasetMeta(r.datasetIndex)
            .controller.getParsed(r.index) !== void 0,
      );
    const a = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return (o.reverse && a.reverse(), a);
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this,
      a = me[o.position].call(this, t, e);
    return a !== !1 && (s !== a.x || n !== a.y);
  }
}
A(Ti, 'positioners', me);
var Jl = {
  id: 'tooltip',
  _element: Ti,
  positioners: me,
  afterInit(i, t, e) {
    e && (i.tooltip = new Ti({ chart: i, options: e }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = { tooltip: t };
      if (i.notifyPlugins('beforeTooltipDraw', { ...e, cancelable: !0 }) === !1)
        return;
      (t.draw(i.ctx), i.notifyPlugins('afterTooltipDraw', e));
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: 'average',
    backgroundColor: 'rgba(0,0,0,0.8)',
    titleColor: '#fff',
    titleFont: { weight: 'bold' },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: 'left',
    bodyColor: '#fff',
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: 'left',
    footerColor: '#fff',
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: { weight: 'bold' },
    footerAlign: 'left',
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: '#fff',
    displayColors: !0,
    boxPadding: 0,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    animation: { duration: 400, easing: 'easeOutQuart' },
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY'],
      },
      opacity: { easing: 'linear', duration: 200 },
    },
    callbacks: Jn,
  },
  defaultRoutes: { bodyFont: 'font', footerFont: 'font', titleFont: 'font' },
  descriptors: {
    _scriptable: (i) => i !== 'filter' && i !== 'itemSort' && i !== 'external',
    _indexable: !1,
    callbacks: { _scriptable: !1, _indexable: !1 },
    animation: { _fallback: !1 },
    animations: { _fallback: 'animation' },
  },
  additionalOptionScopes: ['interaction'],
};
const tc = (i, t, e, s) => (
  typeof t == 'string'
    ? ((e = i.push(t) - 1), s.unshift({ index: e, label: t }))
    : isNaN(t) && (e = null),
  e
);
function ec(i, t, e, s) {
  const n = i.indexOf(t);
  if (n === -1) return tc(i, t, e, s);
  const o = i.lastIndexOf(t);
  return n !== o ? e : n;
}
const ic = (i, t) => (i === null ? null : tt(Math.round(i), 0, t));
function en(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class Ri extends se {
  constructor(t) {
    (super(t),
      (this._startValue = void 0),
      (this._valueRange = 0),
      (this._addedLabels = []));
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of e) s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (z(t)) return null;
    const s = this.getLabels();
    return (
      (e =
        isFinite(e) && s[e] === t ? e : ec(s, t, T(e, t), this._addedLabels)),
      ic(e, s.length - 1)
    );
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    (this.options.bounds === 'ticks' &&
      (t || (s = 0), e || (n = this.getLabels().length - 1)),
      (this.min = s),
      (this.max = n));
  }
  buildTicks() {
    const t = this.min,
      e = this.max,
      s = this.options.offset,
      n = [];
    let o = this.getLabels();
    ((o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1)),
      (this._valueRange = Math.max(o.length - (s ? 0 : 1), 1)),
      (this._startValue = this.min - (s ? 0.5 : 0)));
    for (let a = t; a <= e; a++) n.push({ value: a });
    return n;
  }
  getLabelForValue(t) {
    return en.call(this, t);
  }
  configure() {
    (super.configure(),
      this.isHorizontal() || (this._reversePixels = !this._reversePixels));
  }
  getPixelForValue(t) {
    return (
      typeof t != 'number' && (t = this.parse(t)),
      t === null
        ? NaN
        : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
    );
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(
      this._startValue + this.getDecimalForPixel(t) * this._valueRange,
    );
  }
  getBasePixel() {
    return this.bottom;
  }
}
(A(Ri, 'id', 'category'), A(Ri, 'defaults', { ticks: { callback: en } }));
function sc(i, t) {
  const e = [],
    {
      bounds: n,
      step: o,
      min: a,
      max: r,
      precision: l,
      count: c,
      maxTicks: h,
      maxDigits: d,
      includeBounds: u,
    } = i,
    f = o || 1,
    p = h - 1,
    { min: g, max: m } = t,
    b = !z(a),
    x = !z(r),
    y = !z(c),
    k = (m - g) / (d + 1);
  let v = as((m - g) / p / f) * f,
    S,
    w,
    M,
    D;
  if (v < 1e-14 && !b && !x) return [{ value: g }, { value: m }];
  ((D = Math.ceil(m / v) - Math.floor(g / v)),
    D > p && (v = as((D * v) / p / f) * f),
    z(l) || ((S = Math.pow(10, l)), (v = Math.ceil(v * S) / S)),
    n === 'ticks'
      ? ((w = Math.floor(g / v) * v), (M = Math.ceil(m / v) * v))
      : ((w = g), (M = m)),
    b && x && o && Jo((r - a) / o, v / 1e3)
      ? ((D = Math.round(Math.min((r - a) / v, h))),
        (v = (r - a) / D),
        (w = a),
        (M = r))
      : y
        ? ((w = b ? a : w), (M = x ? r : M), (D = c - 1), (v = (M - w) / D))
        : ((D = (M - w) / v),
          je(D, Math.round(D), v / 1e3)
            ? (D = Math.round(D))
            : (D = Math.ceil(D))));
  const C = Math.max(rs(v), rs(w));
  ((S = Math.pow(10, z(l) ? C : l)),
    (w = Math.round(w * S) / S),
    (M = Math.round(M * S) / S));
  let O = 0;
  for (
    b &&
    (u && w !== a
      ? (e.push({ value: a }),
        w < a && O++,
        je(Math.round((w + O * v) * S) / S, a, sn(a, k, i)) && O++)
      : w < a && O++);
    O < D;
    ++O
  ) {
    const P = Math.round((w + O * v) * S) / S;
    if (x && P > r) break;
    e.push({ value: P });
  }
  return (
    x && u && M !== r
      ? e.length && je(e[e.length - 1].value, r, sn(r, k, i))
        ? (e[e.length - 1].value = r)
        : e.push({ value: r })
      : (!x || M === r) && e.push({ value: M }),
    e
  );
}
function sn(i, t, { horizontal: e, minRotation: s }) {
  const n = _t(s),
    o = (e ? Math.sin(n) : Math.cos(n)) || 0.001,
    a = 0.75 * t * ('' + i).length;
  return Math.min(t / o, a);
}
class nc extends se {
  constructor(t) {
    (super(t),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._endValue = void 0),
      (this._valueRange = 0));
  }
  parse(t, e) {
    return z(t) ||
      ((typeof t == 'number' || t instanceof Number) && !isFinite(+t))
      ? null
      : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options,
      { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const a = (l) => (n = e ? n : l),
      r = (l) => (o = s ? o : l);
    if (t) {
      const l = Dt(n),
        c = Dt(o);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && a(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      (r(o + l), t || a(n - l));
    }
    ((this.min = n), (this.max = o));
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t,
      n;
    return (
      s
        ? ((n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1),
          n > 1e3 &&
            (console.warn(
              `scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`,
            ),
            (n = 1e3)))
        : ((n = this.computeTickLimit()), (e = e || 11)),
      e && (n = Math.min(e, n)),
      n
    );
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options,
      e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
        maxTicks: s,
        bounds: t.bounds,
        min: t.min,
        max: t.max,
        precision: e.precision,
        step: e.stepSize,
        count: e.count,
        maxDigits: this._maxDigits(),
        horizontal: this.isHorizontal(),
        minRotation: e.minRotation || 0,
        includeBounds: e.includeBounds !== !1,
      },
      o = this._range || this,
      a = sc(n, o);
    return (
      t.bounds === 'ticks' && ta(a, this, 'value'),
      t.reverse
        ? (a.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      a
    );
  }
  configure() {
    const t = this.ticks;
    let e = this.min,
      s = this.max;
    if ((super.configure(), this.options.offset && t.length)) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      ((e -= n), (s += n));
    }
    ((this._startValue = e), (this._endValue = s), (this._valueRange = s - e));
  }
  getLabelForValue(t) {
    return Wi(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Li extends nc {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    ((this.min = at(t) ? t : 0),
      (this.max = at(e) ? e : 1),
      this.handleTickRangeOptions());
  }
  computeTickLimit() {
    const t = this.isHorizontal(),
      e = t ? this.width : this.height,
      s = _t(this.options.ticks.minRotation),
      n = (t ? Math.sin(s) : Math.cos(s)) || 0.001,
      o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
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
(A(Li, 'id', 'linear'),
  A(Li, 'defaults', { ticks: { callback: Cn.formatters.numeric } }));
const ci = {
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
  J = Object.keys(ci);
function nn(i, t) {
  return i - t;
}
function on(i, t) {
  if (z(t)) return null;
  const e = i._adapter,
    { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let a = t;
  return (
    typeof s == 'function' && (a = s(a)),
    at(a) || (a = typeof s == 'string' ? e.parse(a, s) : e.parse(a)),
    a === null
      ? null
      : (n &&
          (a =
            n === 'week' && (Ze(o) || o === !0)
              ? e.startOf(a, 'isoWeek', o)
              : e.startOf(a, n)),
        +a)
  );
}
function an(i, t, e, s) {
  const n = J.length;
  for (let o = J.indexOf(i); o < n - 1; ++o) {
    const a = ci[J[o]],
      r = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((e - t) / (r * a.size)) <= s) return J[o];
  }
  return J[n - 1];
}
function oc(i, t, e, s, n) {
  for (let o = J.length - 1; o >= J.indexOf(e); o--) {
    const a = J[o];
    if (ci[a].common && i._adapter.diff(n, s, a) >= t - 1) return a;
  }
  return J[e ? J.indexOf(e) : 0];
}
function ac(i) {
  for (let t = J.indexOf(i) + 1, e = J.length; t < e; ++t)
    if (ci[J[t]].common) return J[t];
}
function rn(i, t, e) {
  if (!e) i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = Bi(e, t),
      o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function rc(i, t, e, s) {
  const n = i._adapter,
    o = +n.startOf(t[0].value, s),
    a = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= a; r = +n.add(r, 1, s))
    ((l = e[r]), l >= 0 && (t[l].major = !0));
  return t;
}
function ln(i, t, e) {
  const s = [],
    n = {},
    o = t.length;
  let a, r;
  for (a = 0; a < o; ++a)
    ((r = t[a]), (n[r] = a), s.push({ value: r, major: !1 }));
  return o === 0 || !e ? s : rc(i, s, n, e);
}
class si extends se {
  constructor(t) {
    (super(t),
      (this._cache = { data: [], labels: [], all: [] }),
      (this._unit = 'day'),
      (this._majorUnit = void 0),
      (this._offsets = {}),
      (this._normalized = !1),
      (this._parseOpts = void 0));
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}),
      n = (this._adapter = new _r._date(t.adapters.date));
    (n.init(e),
      be(s.displayFormats, n.formats()),
      (this._parseOpts = {
        parser: s.parser,
        round: s.round,
        isoWeekday: s.isoWeekday,
      }),
      super.init(t),
      (this._normalized = e.normalized));
  }
  parse(t, e) {
    return t === void 0 ? null : on(this, t);
  }
  beforeLayout() {
    (super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] }));
  }
  determineDataLimits() {
    const t = this.options,
      e = this._adapter,
      s = t.time.unit || 'day';
    let { min: n, max: o, minDefined: a, maxDefined: r } = this.getUserBounds();
    function l(c) {
      (!a && !isNaN(c.min) && (n = Math.min(n, c.min)),
        !r && !isNaN(c.max) && (o = Math.max(o, c.max)));
    }
    ((!a || !r) &&
      (l(this._getLabelBounds()),
      (t.bounds !== 'ticks' || t.ticks.source !== 'labels') &&
        l(this.getMinMax(!1))),
      (n = at(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s)),
      (o = at(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1),
      (this.min = Math.min(n, o - 1)),
      (this.max = Math.max(n + 1, o)));
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY,
      s = Number.NEGATIVE_INFINITY;
    return (
      t.length && ((e = t[0]), (s = t[t.length - 1])),
      { min: e, max: s }
    );
  }
  buildTicks() {
    const t = this.options,
      e = t.time,
      s = t.ticks,
      n = s.source === 'labels' ? this.getLabelTimestamps() : this._generate();
    t.bounds === 'ticks' &&
      n.length &&
      ((this.min = this._userMin || n[0]),
      (this.max = this._userMax || n[n.length - 1]));
    const o = this.min,
      a = this.max,
      r = oa(n, o, a);
    return (
      (this._unit =
        e.unit ||
        (s.autoSkip
          ? an(e.minUnit, this.min, this.max, this._getLabelCapacity(o))
          : oc(this, r.length, e.minUnit, this.min, this.max))),
      (this._majorUnit =
        !s.major.enabled || this._unit === 'year' ? void 0 : ac(this._unit)),
      this.initOffsets(n),
      t.reverse && r.reverse(),
      ln(this, r, this._majorUnit)
    );
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip &&
      this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0,
      s = 0,
      n,
      o;
    this.options.offset &&
      t.length &&
      ((n = this.getDecimalForValue(t[0])),
      t.length === 1
        ? (e = 1 - n)
        : (e = (this.getDecimalForValue(t[1]) - n) / 2),
      (o = this.getDecimalForValue(t[t.length - 1])),
      t.length === 1
        ? (s = o)
        : (s = (o - this.getDecimalForValue(t[t.length - 2])) / 2));
    const a = t.length < 3 ? 0.5 : 0.25;
    ((e = tt(e, 0, a)),
      (s = tt(s, 0, a)),
      (this._offsets = { start: e, end: s, factor: 1 / (e + 1 + s) }));
  }
  _generate() {
    const t = this._adapter,
      e = this.min,
      s = this.max,
      n = this.options,
      o = n.time,
      a = o.unit || an(o.minUnit, e, s, this._getLabelCapacity(e)),
      r = T(n.ticks.stepSize, 1),
      l = a === 'week' ? o.isoWeekday : !1,
      c = Ze(l) || l === !0,
      h = {};
    let d = e,
      u,
      f;
    if (
      (c && (d = +t.startOf(d, 'isoWeek', l)),
      (d = +t.startOf(d, c ? 'day' : a)),
      t.diff(s, e, a) > 1e5 * r)
    )
      throw new Error(
        e + ' and ' + s + ' are too far apart with stepSize of ' + r + ' ' + a,
      );
    const p = n.ticks.source === 'data' && this.getDataTimestamps();
    for (u = d, f = 0; u < s; u = +t.add(u, r, a), f++) rn(h, u, p);
    return (
      (u === s || n.bounds === 'ticks' || f === 1) && rn(h, u, p),
      Object.keys(h)
        .sort(nn)
        .map((g) => +g)
    );
  }
  getLabelForValue(t) {
    const e = this._adapter,
      s = this.options.time;
    return s.tooltipFormat
      ? e.format(t, s.tooltipFormat)
      : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const n = this.options.time.displayFormats,
      o = this._unit,
      a = e || n[o];
    return this._adapter.format(t, a);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options,
      a = o.ticks.callback;
    if (a) return H(a, [t, e, s], this);
    const r = o.time.displayFormats,
      l = this._unit,
      c = this._majorUnit,
      h = l && r[l],
      d = c && r[c],
      u = s[e],
      f = c && d && u && u.major;
    return this._adapter.format(t, n || (f ? d : h));
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      ((n = t[e]), (n.label = this._tickFormatFunction(n.value, e, t)));
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets,
      s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets,
      s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks,
      s = this.ctx.measureText(t).width,
      n = _t(this.isHorizontal() ? e.maxRotation : e.minRotation),
      o = Math.cos(n),
      a = Math.sin(n),
      r = this._resolveTickFontOptions(0).size;
    return { w: s * o + r * a, h: s * a + r * o };
  }
  _getLabelCapacity(t) {
    const e = this.options.time,
      s = e.displayFormats,
      n = s[e.unit] || s.millisecond,
      o = this._tickFormatFunction(t, 0, ln(this, [t], this._majorUnit), n),
      a = this._getLabelSize(o),
      r =
        Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) -
        1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [],
      e,
      s;
    if (t.length) return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return (this._cache.data = n[0].controller.getAllParsedValues(this));
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return (this._cache.data = this.normalize(t));
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length) return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e) t.push(on(this, n[e]));
    return (this._cache.labels = this._normalized ? t : this.normalize(t));
  }
  normalize(t) {
    return Mn(t.sort(nn));
  }
}
(A(si, 'id', 'time'),
  A(si, 'defaults', {
    bounds: 'data',
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: 'millisecond',
      displayFormats: {},
    },
    ticks: { source: 'auto', callback: !1, major: { enabled: !1 } },
  }));
function Ve(i, t, e) {
  let s = 0,
    n = i.length - 1,
    o,
    a,
    r,
    l;
  e
    ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = Di(i, 'pos', t)),
      ({ pos: o, time: r } = i[s]),
      ({ pos: a, time: l } = i[n]))
    : (t >= i[s].time &&
        t <= i[n].time &&
        ({ lo: s, hi: n } = Di(i, 'time', t)),
      ({ time: o, pos: r } = i[s]),
      ({ time: a, pos: l } = i[n]));
  const c = a - o;
  return c ? r + ((l - r) * (t - o)) / c : r;
}
class cn extends si {
  constructor(t) {
    (super(t),
      (this._table = []),
      (this._minPos = void 0),
      (this._tableRange = void 0));
  }
  initOffsets() {
    const t = this._getTimestampsForTable(),
      e = (this._table = this.buildLookupTable(t));
    ((this._minPos = Ve(e, this.min)),
      (this._tableRange = Ve(e, this.max) - this._minPos),
      super.initOffsets(t));
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this,
      n = [],
      o = [];
    let a, r, l, c, h;
    for (a = 0, r = t.length; a < r; ++a)
      ((c = t[a]), c >= e && c <= s && n.push(c));
    if (n.length < 2)
      return [
        { time: e, pos: 0 },
        { time: s, pos: 1 },
      ];
    for (a = 0, r = n.length; a < r; ++a)
      ((h = n[a + 1]),
        (l = n[a - 1]),
        (c = n[a]),
        Math.round((h + l) / 2) !== c && o.push({ time: c, pos: a / (r - 1) }));
    return o;
  }
  _generate() {
    const t = this.min,
      e = this.max;
    let s = super.getDataTimestamps();
    return (
      (!s.includes(t) || !s.length) && s.splice(0, 0, t),
      (!s.includes(e) || s.length === 1) && s.push(e),
      s.sort((n, o) => n - o)
    );
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length) return t;
    const e = this.getDataTimestamps(),
      s = this.getLabelTimestamps();
    return (
      e.length && s.length
        ? (t = this.normalize(e.concat(s)))
        : (t = e.length ? e : s),
      (t = this._cache.all = t),
      t
    );
  }
  getDecimalForValue(t) {
    return (Ve(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets,
      s = this.getDecimalForPixel(t) / e.factor - e.end;
    return Ve(this._table, s * this._tableRange + this._minPos, !0);
  }
}
(A(cn, 'id', 'timeseries'), A(cn, 'defaults', si.defaults));
const to = {
    data: { type: Object, required: !0 },
    options: { type: Object, default: () => ({}) },
    plugins: { type: Array, default: () => [] },
    datasetIdKey: { type: String, default: 'label' },
    updateMode: { type: String, default: void 0 },
  },
  lc = { ariaLabel: { type: String }, ariaDescribedby: { type: String } },
  cc = {
    type: { type: String, required: !0 },
    destroyDelay: { type: Number, default: 0 },
    ...to,
    ...lc,
  },
  hc =
    co[0] === '2'
      ? (i, t) => Object.assign(i, { attrs: t })
      : (i, t) => Object.assign(i, t);
function Xt(i) {
  return un(i) ? Mi(i) : i;
}
function dc(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : i;
  return un(t) ? new Proxy(i, {}) : i;
}
function uc(i, t) {
  const e = i.options;
  e && t && Object.assign(e, t);
}
function eo(i, t) {
  i.labels = t;
}
function io(i, t, e) {
  const s = [];
  i.datasets = t.map((n) => {
    const o = i.datasets.find((a) => a[e] === n[e]);
    return !o || !n.data || s.includes(o)
      ? { ...n }
      : (s.push(o), Object.assign(o, n), o);
  });
}
function fc(i, t) {
  const e = { labels: [], datasets: [] };
  return (eo(e, i.labels), io(e, i.datasets, t), e);
}
const gc = yt({
  props: cc,
  setup(i, t) {
    let { expose: e, slots: s } = t;
    const n = ye(null),
      o = dn(null);
    e({ chart: o });
    const a = () => {
        if (!n.value) return;
        const { type: c, data: h, options: d, plugins: u, datasetIdKey: f } = i,
          p = fc(h, f),
          g = dc(p, h);
        o.value = new li(n.value, {
          type: c,
          data: g,
          options: { ...d },
          plugins: u,
        });
      },
      r = () => {
        const c = Mi(o.value);
        c &&
          (i.destroyDelay > 0
            ? setTimeout(() => {
                (c.destroy(), (o.value = null));
              }, i.destroyDelay)
            : (c.destroy(), (o.value = null)));
      },
      l = (c) => {
        c.update(i.updateMode);
      };
    return (
      ho(a),
      uo(r),
      fo(
        [() => i.options, () => i.data],
        (c, h) => {
          let [d, u] = c,
            [f, p] = h;
          const g = Mi(o.value);
          if (!g) return;
          let m = !1;
          if (d) {
            const b = Xt(d),
              x = Xt(f);
            b && b !== x && (uc(g, b), (m = !0));
          }
          if (u) {
            const b = Xt(u.labels),
              x = Xt(p.labels),
              y = Xt(u.datasets),
              k = Xt(p.datasets);
            (b !== x && (eo(g.config.data, b), (m = !0)),
              y && y !== k && (io(g.config.data, y, i.datasetIdKey), (m = !0)));
          }
          m &&
            go(() => {
              l(g);
            });
        },
        { deep: !0 },
      ),
      () =>
        wi(
          'canvas',
          {
            role: 'img',
            'aria-label': i.ariaLabel,
            'aria-describedby': i.ariaDescribedby,
            ref: n,
          },
          [wi('p', {}, [s.default ? s.default() : ''])],
        )
    );
  },
});
function so(i, t) {
  return (
    li.register(t),
    yt({
      props: to,
      setup(e, s) {
        let { expose: n } = s;
        const o = dn(null),
          a = (r) => {
            o.value = r == null ? void 0 : r.chart;
          };
        return (
          n({ chart: o }),
          () => wi(gc, hc({ ref: a }, { type: i, ...e }))
        );
      },
    })
  );
}
const pc = so('bar', Ne),
  mc = so('pie', Ci);
li.register(Ri, Li, Xe, pe, Yl, Jl, jl);
function G(i) {
  let e = getComputedStyle(document.documentElement).getPropertyValue(i).trim();
  return (
    e || (e = getComputedStyle(document.body).getPropertyValue(i).trim()),
    e
  );
}
function ee() {
  return {
    foreground: G('--vscode-foreground') || '#cccccc',
    background: G('--vscode-editor-background') || '#1e1e1e',
    blue: G('--vscode-charts-blue') || '#3794ff',
    orange: G('--vscode-charts-orange') || '#d18616',
    green: G('--vscode-charts-green') || '#89d185',
    purple: G('--vscode-charts-purple') || '#b180d7',
    red: G('--vscode-charts-red') || '#f14c4c',
    yellow: G('--vscode-charts-yellow') || '#cca700',
  };
}
function mt(i, t) {
  return i.startsWith('#')
    ? (i.length === 4 && (i = '#' + i[1] + i[1] + i[2] + i[2] + i[3] + i[3]),
      i + t)
    : i;
}
function hn(i) {
  if (i > 0 && i < 1) return `${Math.max(1, Math.round(i * 60))}s`;
  if (i <= 0) return '0m';
  if (i < 60) return `${Math.round(i)}m`;
  const t = Math.floor(i / 60),
    e = Math.round(i % 60);
  return e > 0 ? `${t}h ${e}m` : `${t}h`;
}
function no(i = {}) {
  const t = G('--vscode-foreground') || '#cccccc',
    e = G('--vscode-panel-border') || '#333333',
    s = G('--vscode-font-family') || 'sans-serif',
    n = 12;
  return {
    responsive: !0,
    maintainAspectRatio: !1,
    color: t,
    font: { family: s, size: n },
    scales: {
      y: {
        beginAtZero: !0,
        grid: { color: mt(e, '40') },
        ticks: {
          color: mt(t, '80'),
          font: { family: s, size: 10 },
          callback: (a) => hn(Number(a)),
        },
        border: { display: !1 },
      },
      x: {
        grid: { display: !1 },
        ticks: { color: t, font: { family: s, size: 10 } },
        border: { display: !1 },
      },
    },
    plugins: {
      legend: { labels: { color: t, font: { family: s, size: n } } },
      tooltip: {
        backgroundColor: G('--vscode-menu-background') || '#252526',
        titleColor: G('--vscode-menu-foreground') || '#cccccc',
        bodyColor: G('--vscode-menu-foreground') || '#cccccc',
        borderColor:
          G('--vscode-menu-border') || G('--vscode-focusBorder') || '#454545',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        displayColors: !0,
        position: 'nearest',
        yAlign: 'bottom',
        callbacks: {
          title: (a) => {
            var r;
            return (a.length && ((r = a[0]) == null ? void 0 : r.label)) || '';
          },
          label: (a) => {
            const r = Number(a.raw || 0);
            return ` ${a.dataset.label}: ${hn(r)}`;
          },
        },
      },
    },
  };
}
const bc = { class: 'chart-container' },
  _c = yt({
    __name: 'ActivityBarChart',
    props: { data: {}, horizontal: { type: Boolean } },
    setup(i) {
      const t = i,
        e = [
          {
            id: 'current-indicator',
            afterDatasetsDraw(o) {
              const { ctx: a, chartArea: r, scales: l } = o,
                c = ee(),
                h = l.x;
              t.data.forEach((d, u) => {
                if (d.isCurrent) {
                  const f = o.getDatasetMeta(0);
                  if (!f.data[u]) return;
                  const p = f.data[u].x,
                    g = h.bottom + 4,
                    m = g + 6;
                  (a.save(),
                    a.beginPath(),
                    (a.fillStyle = c.red),
                    a.moveTo(p, g),
                    a.lineTo(p - 5, m),
                    a.lineTo(p + 5, m),
                    a.closePath(),
                    a.fill(),
                    a.restore());
                }
              });
            },
          },
        ],
        s = et(() => {
          const o = ee();
          return {
            labels: t.data.map((a) => a.label),
            datasets: [
              {
                label: 'Active',
                backgroundColor: (a) => {
                  const r = a.chart,
                    { ctx: l, chartArea: c } = r;
                  if (!c) return o.blue;
                  try {
                    const h = l.createLinearGradient(0, c.bottom, 0, c.top);
                    return (
                      h.addColorStop(0, o.blue),
                      h.addColorStop(1, mt(o.blue, 'B3')),
                      h
                    );
                  } catch {
                    return o.blue;
                  }
                },
                hoverBackgroundColor: mt(o.blue, 'dd'),
                borderWidth: 0,
                borderRadius: 4,
                data: t.data.map((a) => a.active),
                maxBarThickness: 12,
                stack: 'total',
              },
              {
                label: 'Idle',
                backgroundColor: (a) => {
                  const r = a.chart,
                    { ctx: l, chartArea: c } = r;
                  if (!c) return mt(o.foreground, '20');
                  try {
                    const h = l.createLinearGradient(0, c.bottom, 0, c.top);
                    return (
                      h.addColorStop(0, mt(o.foreground, '10')),
                      h.addColorStop(1, mt(o.foreground, '40')),
                      h
                    );
                  } catch {
                    return mt(o.foreground, '30');
                  }
                },
                hoverBackgroundColor: mt(o.foreground, '40'),
                borderWidth: 0,
                borderRadius: 4,
                data: t.data.map((a) => a.idle),
                maxBarThickness: 12,
                stack: 'total',
              },
            ],
          };
        }),
        n = et(() => {
          const o = no();
          (t.horizontal && (o.indexAxis = 'y'),
            o.scales || (o.scales = {}),
            (o.scales.x = { ...o.scales.x, stacked: !0 }),
            (o.scales.y = { ...o.scales.y, stacked: !0 }),
            o.plugins &&
              o.plugins.tooltip &&
              ((o.plugins.tooltip.mode = 'index'),
              (o.plugins.tooltip.intersect = !1)),
            o.layout || (o.layout = {}));
          const a =
            typeof o.layout.padding == 'object'
              ? o.layout.padding
              : { top: 0, bottom: 0, left: 0, right: 0 };
          return ((o.layout.padding = { ...a, bottom: 20 }), o);
        });
      return (o, a) => (
        j(),
        U('div', bc, [
          It(nt(pc), { data: s.value, options: n.value, plugins: e }, null, 8, [
            'data',
            'options',
          ]),
        ])
      );
    },
  }),
  Vt = (i, t) => {
    const e = i.__vccOpts || i;
    for (const [s, n] of t) e[s] = n;
    return e;
  },
  xc = Vt(_c, [['__scopeId', 'data-v-1f78ef29']]),
  yc = { class: 'chart-container' },
  vc = yt({
    __name: 'ActivityPieChart',
    props: { data: {} },
    setup(i) {
      const t = i,
        e = et(() => {
          const n = ee(),
            o = [n.blue, n.red, n.yellow, n.green, n.orange, n.purple];
          return {
            labels: t.data.map((a) => a.label),
            datasets: [
              {
                data: t.data.map((a) => a.value),
                backgroundColor: t.data.map((a, r) => o[r % o.length]),
                borderWidth: 1,
                borderColor: n.background,
              },
            ],
          };
        }),
        s = et(() => {
          const n = no();
          return (n.scales && delete n.scales, n);
        });
      return (n, o) => (
        j(),
        U('div', yc, [
          It(nt(mc), { data: e.value, options: s.value }, null, 8, [
            'data',
            'options',
          ]),
        ])
      );
    },
  }),
  kc = Vt(vc, [['__scopeId', 'data-v-3199d477']]),
  wc = { class: 'file-table-container' },
  Mc = { class: 'file-table' },
  Sc = ['title'],
  Dc = ['title'],
  Ac = { class: 'col-branch' },
  Cc = { key: 0, class: 'branch-tag' },
  Oc = { key: 1, class: 'branch-tag' },
  Pc = { class: 'col-activity' },
  Tc = { class: 'activity-cell' },
  Rc = { class: 'bar-container' },
  Lc = { class: 'col-time' },
  Fc = yt({
    __name: 'FileActivityTable',
    props: { files: {} },
    setup(i) {
      const t = i,
        e = ee(),
        s = et(
          () =>
            (t.files.length &&
              Math.max(...t.files.map((o) => o.active + o.idle))) ||
            1,
        );
      return (n, o) => (
        j(),
        U('div', wc, [
          _('table', Mc, [
            o[0] ||
              (o[0] = _(
                'thead',
                null,
                [
                  _('tr', null, [
                    _('th', { class: 'col-path' }, 'Path'),
                    _('th', { class: 'col-auth' }, 'Author'),
                    _('th', { class: 'col-branch' }, 'Branch'),
                    _('th', { class: 'col-activity' }, 'Activity'),
                    _('th', { class: 'col-time' }, 'Time'),
                  ]),
                ],
                -1,
              )),
            _('tbody', null, [
              (j(!0),
              U(
                fn,
                null,
                gn(
                  i.files,
                  (a, r) => (
                    j(),
                    U('tr', { key: r }, [
                      _(
                        'td',
                        { class: 'col-path', title: a.path },
                        it(a.path),
                        9,
                        Sc,
                      ),
                      _(
                        'td',
                        { class: 'col-auth', title: a.author },
                        it(a.author || '-'),
                        9,
                        Dc,
                      ),
                      _('td', Ac, [
                        a.branch !== 'null' && a.branch !== 'unknown'
                          ? (j(), U('span', Cc, it(a.branch), 1))
                          : (j(), U('span', Oc, 'main')),
                      ]),
                      _('td', Pc, [
                        _('div', Tc, [
                          _('div', Rc, [
                            _(
                              'div',
                              {
                                class: 'bar-segment active',
                                style: Et({
                                  width: (a.active / s.value) * 100 + '%',
                                  backgroundColor: nt(e).blue,
                                }),
                              },
                              null,
                              4,
                            ),
                            _(
                              'div',
                              {
                                class: 'bar-segment idle',
                                style: Et({
                                  width: (a.idle / s.value) * 100 + '%',
                                  backgroundColor: nt(e).orange,
                                }),
                              },
                              null,
                              4,
                            ),
                          ]),
                        ]),
                      ]),
                      _('td', Lc, it(nt(ve)(a.active)), 1),
                    ])
                  ),
                ),
                128,
              )),
            ]),
          ]),
        ])
      );
    },
  }),
  oo = Vt(Fc, [['__scopeId', 'data-v-ca425156']]),
  Ic = { class: 'dashboard-root' },
  Ec = { class: 'dashboard-header' },
  zc = { class: 'control-group' },
  Bc = { class: 'range-pills' },
  Hc = { class: 'summary-row' },
  Wc = { class: 'stat-card' },
  Vc = { class: 'stat-card' },
  $c = { class: 'stat-card' },
  jc = { class: 'stat-card' },
  Nc = { class: 'chart-inner' },
  Yc = { key: 'trend', class: 'chart-box layout-item item-trend' },
  Uc = { class: 'chart-inner' },
  Xc = { class: 'table-box' },
  Kc = yt({
    __name: 'TimelineTab',
    setup(i) {
      const t = Jt(),
        e = ee(),
        s = ye('7d');
      ye('');
      function n(u) {
        const f = String(u.getDate()).padStart(2, '0'),
          p = String(u.getMonth() + 1).padStart(2, '0'),
          g = u.getFullYear();
        return `${f}-${p}-${g}`;
      }
      function o(u) {
        let f = 0,
          p = 0;
        for (const [g, m] of Object.entries(t.buckets))
          g.startsWith(u + ',') && ((f += m.active || 0), (p += m.idle || 0));
        return { active: f / 6e4, idle: p / 6e4 };
      }
      function a(u) {
        const f = new Date(),
          p = [];
        let g = new Date(),
          m = 0;
        if (u === 'week') {
          const b = f.getDay(),
            x = (b === 0 ? -6 : 1) - b;
          ((g = new Date(f.getFullYear(), f.getMonth(), f.getDate() + x)),
            (m = 7));
        } else
          ((g = new Date(f.getFullYear(), f.getMonth(), 1)),
            (m = new Date(f.getFullYear(), f.getMonth() + 1, 0).getDate()));
        for (let b = 0; b < m; b++) {
          const x = new Date(g);
          x.setDate(g.getDate() + b);
          const y = n(x),
            k = o(y),
            v = x.toDateString() === f.toDateString();
          let S = '';
          (u === 'week'
            ? (S = x.toLocaleDateString('en-US', { weekday: 'short' }))
            : (S = x.getDate().toString()),
            p.push({ label: S, active: k.active, idle: k.idle, isCurrent: v }));
        }
        return p;
      }
      function r() {
        const u = [],
          f = new Date().getHours(),
          p = n(new Date()),
          g = o(p);
        for (let m = 0; m < 24; m++) {
          const b = m === f;
          u.push({
            label: `${String(m).padStart(2, '0')}:00`,
            active: b ? g.active : 0,
            idle: b ? g.idle : 0,
            isCurrent: b,
          });
        }
        return u;
      }
      const l = et(() => {
          switch (s.value) {
            case '24h':
              return r();
            case '7d':
              return a('week');
            case '30d':
              return a('month');
            default:
              return [];
          }
        }),
        c = et(() => {
          const u = new Date(),
            f = new Set();
          let p = new Date(),
            g = 0;
          if (s.value === '24h') ((p = u), (g = 1));
          else if (s.value === '7d') {
            const w = u.getDay(),
              M = (w === 0 ? -6 : 1) - w;
            ((p = new Date(u.getFullYear(), u.getMonth(), u.getDate() + M)),
              (g = 7));
          } else
            ((p = new Date(u.getFullYear(), u.getMonth(), 1)),
              (g = new Date(u.getFullYear(), u.getMonth() + 1, 0).getDate()));
          for (let w = 0; w < g; w++) {
            const M = new Date(p);
            (M.setDate(p.getDate() + w), f.add(n(M)));
          }
          const m = {};
          let b = 0,
            x = 0;
          for (const [w, M] of Object.entries(t.buckets)) {
            const D = w.split(','),
              C = D[0];
            if (C && f.has(C)) {
              const O = D[2] || 'unknown',
                B = `${D.slice(3).join(',')}::${O}`;
              (m[B] || (m[B] = { active: 0, idle: 0 }),
                (m[B].active += M.active || 0),
                (m[B].idle += M.idle || 0),
                (b += M.active || 0),
                (x += M.idle || 0));
            }
          }
          const y = new Map();
          for (const [w, M] of Object.entries(t.buckets)) {
            const D = w.split(','),
              C = D[0];
            if (C && f.has(C)) {
              const O = D[1],
                P = D[2],
                B = D.slice(3).join(','),
                X = O === 'null' || !O ? null : O,
                L = P === 'null' || !P ? 'main' : P;
              y.has(B) ||
                y.set(B, {
                  active: 0,
                  idle: 0,
                  authors: new Set(),
                  branches: new Set(),
                });
              const F = y.get(B);
              ((F.active += M.active || 0),
                (F.idle += M.idle || 0),
                X && F.authors.add(X),
                L && F.branches.add(L));
            }
          }
          const k = Array.from(y.entries())
              .map(([w, M]) => {
                const D = Array.from(M.authors).join(', '),
                  C = Array.from(M.branches).join(', ');
                return {
                  path: w,
                  branch: C || 'main',
                  author: D || '(me)',
                  active: M.active,
                  idle: M.idle,
                };
              })
              .sort((w, M) => M.active - w.active),
            v = Math.max(...k.map((w) => w.active), 1);
          return {
            files: k.map((w) => ({ ...w, ratio: w.active / v })),
            totalActive: b,
            totalIdle: x,
            fileCount: k.length,
          };
        }),
        h = et(() => {
          const u = c.value,
            f = Math.round(
              (u.totalActive / (u.totalActive + u.totalIdle || 1)) * 100,
            );
          return {
            activeStr: ve(u.totalActive),
            idleStr: ve(u.totalIdle),
            files: u.fileCount,
            efficiencyStr: `${f}%`,
          };
        }),
        d = et(() => {
          const u = {};
          for (const f of c.value.files) {
            const g = (f.path || 'unknown').split('.').pop() || 'other',
              m = f.active / 6e4;
            u[g] = (u[g] || 0) + m;
          }
          return Object.entries(u)
            .map(([f, p]) => ({ label: f, value: p }))
            .sort((f, p) => p.value - f.value)
            .reverse()
            .slice(0, 6);
        });
      return (u, f) => (
        j(),
        U('div', Ic, [
          _('header', Ec, [
            f[3] || (f[3] = _('h2', { class: 'title' }, 'Dashboard', -1)),
            _('div', zc, [
              _('div', Bc, [
                _(
                  'button',
                  {
                    class: Kt({ active: s.value === '24h' }),
                    onClick: f[0] || (f[0] = (p) => (s.value = '24h')),
                  },
                  'Today',
                  2,
                ),
                _(
                  'button',
                  {
                    class: Kt({ active: s.value === '7d' }),
                    onClick: f[1] || (f[1] = (p) => (s.value = '7d')),
                  },
                  'Week',
                  2,
                ),
                _(
                  'button',
                  {
                    class: Kt({ active: s.value === '30d' }),
                    onClick: f[2] || (f[2] = (p) => (s.value = '30d')),
                  },
                  'Month',
                  2,
                ),
              ]),
            ]),
          ]),
          _('section', Hc, [
            _('div', Wc, [
              f[4] || (f[4] = _('label', null, 'Active Time', -1)),
              _(
                'div',
                { class: 'stat-value', style: Et({ color: nt(e).blue }) },
                it(h.value.activeStr),
                5,
              ),
            ]),
            _('div', Vc, [
              f[5] || (f[5] = _('label', null, 'Idle Time', -1)),
              _(
                'div',
                { class: 'stat-value', style: Et({ color: nt(e).orange }) },
                it(h.value.idleStr),
                5,
              ),
            ]),
            _('div', $c, [
              f[6] || (f[6] = _('label', null, 'Files Touched', -1)),
              _(
                'div',
                { class: 'stat-value', style: Et({ color: nt(e).green }) },
                it(h.value.files),
                5,
              ),
            ]),
            _('div', jc, [
              f[7] || (f[7] = _('label', null, 'Efficiency', -1)),
              _(
                'div',
                { class: 'stat-value', style: Et({ color: nt(e).purple }) },
                it(h.value.efficiencyStr),
                5,
              ),
            ]),
          ]),
          It(
            mo,
            { name: 'grid-anim', tag: 'div', class: 'main-grid' },
            {
              default: po(() => [
                _(
                  'div',
                  {
                    key: 'lang',
                    class: Kt([
                      'chart-box layout-item item-lang',
                      { 'lang-today': s.value === '24h' },
                    ]),
                  },
                  [
                    f[8] || (f[8] = _('h4', null, 'Language Distribution', -1)),
                    _('div', Nc, [
                      It(kc, { data: d.value }, null, 8, ['data']),
                    ]),
                  ],
                  2,
                ),
                s.value !== '24h'
                  ? (j(),
                    U('div', Yc, [
                      f[9] || (f[9] = _('h4', null, 'Activity Trend', -1)),
                      _('div', Uc, [
                        It(xc, { data: l.value }, null, 8, ['data']),
                      ]),
                    ]))
                  : pn('', !0),
                _(
                  'div',
                  {
                    key: 'files',
                    class: Kt([
                      'layout-item item-files',
                      { 'files-today': s.value === '24h' },
                    ]),
                  },
                  [
                    f[10] || (f[10] = _('h4', null, 'File Activity Today', -1)),
                    _('div', Xc, [
                      It(oo, { files: c.value.files }, null, 8, ['files']),
                    ]),
                  ],
                  2,
                ),
              ]),
              _: 1,
            },
          ),
        ])
      );
    },
  }),
  qc = Vt(Kc, [['__scopeId', 'data-v-f8e25128']]),
  Gc = { class: 'search-container' },
  Zc = { class: 'filters-box' },
  Qc = { class: 'filter-row full-width' },
  Jc = { class: 'filter-grid' },
  th = { class: 'filter-group' },
  eh = { class: 'filter-group' },
  ih = { class: 'filter-group date-group' },
  sh = { class: 'filter-group date-group' },
  nh = { class: 'results-area' },
  oh = { key: 0, class: 'empty-state' },
  ah = { key: 1, class: 'empty-state' },
  rh = { key: 2, class: 'results-list' },
  lh = { class: 'results-meta' },
  ch = yt({
    __name: 'SearchTab',
    setup(i) {
      const t = Jt(),
        e = ee(),
        s = ye({
          path: '',
          author: '',
          branch: '',
          startDate: '',
          endDate: '',
        });
      function n(h) {
        const d = h.split('-');
        if (d.length !== 3) return null;
        const u = parseInt(d[0] || '1', 10),
          f = parseInt(d[1] || '1', 10) - 1,
          p = parseInt(d[2] || '1970', 10);
        return new Date(p, f, u);
      }
      function o(h) {
        return h ? new Date(h) : null;
      }
      function a(h) {
        const d = h.indexOf(',');
        if (d < 0) return null;
        const u = h.indexOf(',', d + 1);
        if (u < 0) return null;
        const f = h.indexOf(',', u + 1);
        if (f < 0) return null;
        const p = h.substring(0, d),
          g = h.substring(d + 1, u),
          m = h.substring(u + 1, f),
          b = h.substring(f + 1);
        return { dateStr: p, auth: g, branch: m, path: b };
      }
      function r(h, d) {
        if (!h) return !0;
        const u = h.toLowerCase(),
          f = d.toLowerCase();
        let p = 0,
          g = 0;
        for (; p < u.length && g < f.length; ) (u[p] === f[g] && p++, g++);
        return p === u.length;
      }
      const l = et(() => Object.values(s.value).some((h) => h.trim() !== '')),
        c = et(() => {
          if (!l.value && Object.keys(t.buckets).length > 200) return [];
          const h = o(s.value.startDate),
            d = o(s.value.endDate),
            u = {};
          for (const [f, p] of Object.entries(t.buckets)) {
            const g = a(f);
            if (!g) continue;
            const { dateStr: m, auth: b, branch: x, path: y } = g;
            if (
              (s.value.path && !r(s.value.path, y)) ||
              (s.value.author &&
                !b.toLowerCase().includes(s.value.author.toLowerCase())) ||
              (s.value.branch &&
                !x.toLowerCase().includes(s.value.branch.toLowerCase()))
            )
              continue;
            if (h || d) {
              const v = n(m);
              if (!v || (h && v < h) || (d && v > d)) continue;
            }
            const k = `${y}::${x}`;
            (u[k] || (u[k] = { path: y, branch: x, active: 0, idle: 0 }),
              (u[k].active += p.active || 0),
              (u[k].idle += p.idle || 0));
          }
          return Object.values(u).sort((f, p) => p.active - f.active);
        });
      return (h, d) => (
        j(),
        U('div', Gc, [
          _('div', Zc, [
            _('div', Qc, [
              d[5] || (d[5] = _('label', null, 'File Path', -1)),
              Ft(
                _(
                  'input',
                  {
                    type: 'text',
                    'onUpdate:modelValue':
                      d[0] || (d[0] = (u) => (s.value.path = u)),
                    placeholder: 'Search files (fuzzy)...',
                    class: 'vs-input',
                    autofocus: '',
                  },
                  null,
                  512,
                ),
                [[ae, s.value.path]],
              ),
            ]),
            _('div', Jc, [
              _('div', th, [
                d[6] || (d[6] = _('label', null, 'Author', -1)),
                Ft(
                  _(
                    'input',
                    {
                      type: 'text',
                      'onUpdate:modelValue':
                        d[1] || (d[1] = (u) => (s.value.author = u)),
                      placeholder: 'Filter by author...',
                      class: 'vs-input',
                    },
                    null,
                    512,
                  ),
                  [[ae, s.value.author]],
                ),
              ]),
              _('div', eh, [
                d[7] || (d[7] = _('label', null, 'Branch', -1)),
                Ft(
                  _(
                    'input',
                    {
                      type: 'text',
                      'onUpdate:modelValue':
                        d[2] || (d[2] = (u) => (s.value.branch = u)),
                      placeholder: 'Filter by branch...',
                      class: 'vs-input',
                    },
                    null,
                    512,
                  ),
                  [[ae, s.value.branch]],
                ),
              ]),
              _('div', ih, [
                d[8] || (d[8] = _('label', null, 'Start Date', -1)),
                Ft(
                  _(
                    'input',
                    {
                      type: 'date',
                      'onUpdate:modelValue':
                        d[3] || (d[3] = (u) => (s.value.startDate = u)),
                      class: 'vs-input',
                    },
                    null,
                    512,
                  ),
                  [[ae, s.value.startDate]],
                ),
              ]),
              _('div', sh, [
                d[9] || (d[9] = _('label', null, 'End Date', -1)),
                Ft(
                  _(
                    'input',
                    {
                      type: 'date',
                      'onUpdate:modelValue':
                        d[4] || (d[4] = (u) => (s.value.endDate = u)),
                      class: 'vs-input',
                    },
                    null,
                    512,
                  ),
                  [[ae, s.value.endDate]],
                ),
              ]),
            ]),
          ]),
          _('div', nh, [
            l.value
              ? c.value.length === 0
                ? (j(),
                  U('div', ah, [
                    ...(d[13] ||
                      (d[13] = [_('p', null, 'No matches found.', -1)])),
                  ]))
                : (j(),
                  U('div', rh, [
                    _(
                      'div',
                      lh,
                      ' Found ' + it(c.value.length) + ' matching entries ',
                      1,
                    ),
                    It(oo, { files: c.value }, null, 8, ['files']),
                  ]))
              : (j(),
                U('div', oh, [
                  _(
                    'div',
                    {
                      class: 'empty-icon',
                      style: Et({ color: nt(e).foreground + '40' }),
                    },
                    [
                      ...(d[10] ||
                        (d[10] = [
                          _(
                            'svg',
                            {
                              width: '64',
                              height: '64',
                              viewBox: '0 0 24 24',
                              fill: 'none',
                              class: 'filter-svg',
                              stroke: 'currentColor',
                            },
                            [
                              _('path', {
                                'stroke-width': '1.5',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                                d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
                              }),
                            ],
                            -1,
                          ),
                        ])),
                    ],
                    4,
                  ),
                  d[11] || (d[11] = _('h4', null, 'Start searching', -1)),
                  d[12] ||
                    (d[12] = _(
                      'p',
                      null,
                      'Use the filters above to search specific activity logs',
                      -1,
                    )),
                ])),
          ]),
        ])
      );
    },
  }),
  hh = Vt(ch, [['__scopeId', 'data-v-b806a10c']]),
  dh = {
    postMessage: (i) => console.log('[MockVsCode] To Backend:', i),
    getState: () => ({}),
    setState: (i) => i,
  };
function uh() {
  return typeof acquireVsCodeApi == 'function' ? acquireVsCodeApi() : dh;
}
var Qt, ni, oi;
class fh {
  constructor() {
    Oe(this, Qt, uh());
    Oe(this, ni, typeof acquireVsCodeApi != 'function');
    Oe(this, oi, (t) => {
      const e = t.data;
      (console.log('[Webview] Received message:', e), Jt().handleMessage(e));
    });
    (window.addEventListener('message', Nt(this, oi)),
      this.postMessage({ type: 'webviewBoot' }),
      this.postMessage({ type: 'requestInitialData' }),
      Nt(this, ni) &&
        (console.log('[Webview] Dev mode detected, loading mock data...'),
        setTimeout(() => {
          Jt().handleMessage({ type: 'initialData', data: bo });
        }, 100)));
  }
  postMessage(t) {
    (console.log('[Webview] Sending message:', t), Nt(this, Qt).postMessage(t));
  }
  getState() {
    return Nt(this, Qt).getState();
  }
  setState(t) {
    return Nt(this, Qt).setState(t);
  }
}
((Qt = new WeakMap()), (ni = new WeakMap()), (oi = new WeakMap()));
const $e = new fh(),
  gh = { class: 'settings-container' },
  ph = { class: 'card' },
  mh = { class: 'stats-layout' },
  bh = { class: 'stat-item' },
  _h = { class: 'stat-value active-color' },
  xh = { class: 'stat-item' },
  yh = { class: 'stat-value idle-color' },
  vh = { class: 'card' },
  kh = { class: 'config-list' },
  wh = { class: 'config-item' },
  Mh = { class: 'switch' },
  Sh = { class: 'config-item' },
  Dh = { class: 'switch' },
  Ah = { class: 'card actions-section' },
  Ch = { class: 'actions-list' },
  Oh = yt({
    __name: 'SettingsTab',
    setup(i) {
      const t = Jt(),
        e = et(() => ({
          activeTime: ve(t.projectTotals.totalActiveTime),
          idleTime: ve(t.projectTotals.totalIdleTime),
        })),
        s = _o({ autoTrack: !0, repoTracking: !0 }),
        n = (a, r) => {
          $e.postMessage({
            type: 'updateConfig',
            config: { key: a, value: r },
          });
        },
        o = (a) => {
          switch (a) {
            case 'gitignore':
              $e.postMessage({ type: 'addToGitignore' });
              break;
            case 'export':
              $e.postMessage({ type: 'exportData' });
              break;
            case 'clear':
              $e.postMessage({ type: 'clearData' });
              break;
          }
        };
      return (a, r) => (
        j(),
        U('div', gh, [
          _('div', ph, [
            r[9] ||
              (r[9] = _(
                'div',
                { class: 'card-header' },
                [_('h3', null, 'Lifetime Statistics')],
                -1,
              )),
            _('div', mh, [
              _('div', bh, [
                r[7] ||
                  (r[7] = _(
                    'span',
                    { class: 'stat-label' },
                    'Total Active Time',
                    -1,
                  )),
                _('span', _h, it(e.value.activeTime), 1),
              ]),
              _('div', xh, [
                r[8] ||
                  (r[8] = _(
                    'span',
                    { class: 'stat-label' },
                    'Total Idle Time',
                    -1,
                  )),
                _('span', yh, it(e.value.idleTime), 1),
              ]),
            ]),
          ]),
          _('div', vh, [
            r[14] ||
              (r[14] = _(
                'div',
                { class: 'card-header' },
                [_('h3', null, 'Configuration')],
                -1,
              )),
            _('div', kh, [
              _('div', wh, [
                r[11] ||
                  (r[11] = _(
                    'div',
                    { class: 'config-info' },
                    [
                      _(
                        'span',
                        { class: 'config-title' },
                        'Auto-track Activity',
                      ),
                      _(
                        'span',
                        { class: 'config-desc' },
                        'Automatically track time spent in files',
                      ),
                    ],
                    -1,
                  )),
                _('label', Mh, [
                  Ft(
                    _(
                      'input',
                      {
                        type: 'checkbox',
                        'onUpdate:modelValue':
                          r[0] || (r[0] = (l) => (s.autoTrack = l)),
                        onChange:
                          r[1] || (r[1] = (l) => n('autoTrack', s.autoTrack)),
                      },
                      null,
                      544,
                    ),
                    [[Zi, s.autoTrack]],
                  ),
                  r[10] ||
                    (r[10] = _('span', { class: 'slider round' }, null, -1)),
                ]),
              ]),
              _('div', Sh, [
                r[13] ||
                  (r[13] = _(
                    'div',
                    { class: 'config-info' },
                    [
                      _(
                        'span',
                        { class: 'config-title' },
                        'Repository Tracking',
                      ),
                      _(
                        'span',
                        { class: 'config-desc' },
                        'Track branch and commit information',
                      ),
                    ],
                    -1,
                  )),
                _('label', Dh, [
                  Ft(
                    _(
                      'input',
                      {
                        type: 'checkbox',
                        'onUpdate:modelValue':
                          r[2] || (r[2] = (l) => (s.repoTracking = l)),
                        onChange:
                          r[3] ||
                          (r[3] = (l) => n('repoTracking', s.repoTracking)),
                      },
                      null,
                      544,
                    ),
                    [[Zi, s.repoTracking]],
                  ),
                  r[12] ||
                    (r[12] = _('span', { class: 'slider round' }, null, -1)),
                ]),
              ]),
            ]),
          ]),
          _('div', Ah, [
            r[18] ||
              (r[18] = _(
                'div',
                { class: 'card-header' },
                [_('h3', null, 'Actions')],
                -1,
              )),
            _('div', Ch, [
              _(
                'button',
                {
                  class: 'action-btn',
                  onClick: r[4] || (r[4] = (l) => o('gitignore')),
                },
                [
                  ...(r[15] ||
                    (r[15] = [
                      hi(
                        '<span class="icon" data-v-d206f6d0><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d206f6d0><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-d206f6d0></path><polyline points="14 2 14 8 20 8" data-v-d206f6d0></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-d206f6d0></line><line x1="9" y1="15" x2="15" y2="15" data-v-d206f6d0></line></svg></span><div class="btn-text" data-v-d206f6d0><span class="btn-title" data-v-d206f6d0>Add to .gitignore</span><span class="btn-desc" data-v-d206f6d0>Prevent tracking data from being committed</span></div>',
                        2,
                      ),
                    ])),
                ],
              ),
              _(
                'button',
                {
                  class: 'action-btn',
                  onClick: r[5] || (r[5] = (l) => o('export')),
                },
                [
                  ...(r[16] ||
                    (r[16] = [
                      hi(
                        '<span class="icon" data-v-d206f6d0><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d206f6d0><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-d206f6d0></path><polyline points="7 10 12 15 17 10" data-v-d206f6d0></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-d206f6d0></line></svg></span><div class="btn-text" data-v-d206f6d0><span class="btn-title" data-v-d206f6d0>Export JSON</span><span class="btn-desc" data-v-d206f6d0>Download all tracking data as JSON</span></div>',
                        2,
                      ),
                    ])),
                ],
              ),
              _(
                'button',
                {
                  class: 'action-btn danger',
                  onClick: r[6] || (r[6] = (l) => o('clear')),
                },
                [
                  ...(r[17] ||
                    (r[17] = [
                      hi(
                        '<span class="icon" data-v-d206f6d0><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d206f6d0><polyline points="3 6 5 6 21 6" data-v-d206f6d0></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-d206f6d0></path><line x1="10" y1="11" x2="10" y2="17" data-v-d206f6d0></line><line x1="14" y1="11" x2="14" y2="17" data-v-d206f6d0></line></svg></span><div class="btn-text" data-v-d206f6d0><span class="btn-title" data-v-d206f6d0>Clear All Data</span><span class="btn-desc" data-v-d206f6d0>Permanently delete all tracking data</span></div>',
                        2,
                      ),
                    ])),
                ],
              ),
            ]),
          ]),
        ])
      );
    },
  }),
  Ph = Vt(Oh, [['__scopeId', 'data-v-d206f6d0']]),
  Th = { class: 'page-container' },
  Rh = { class: 'navbar' },
  Lh = { key: 0, class: 'workspace-section' },
  Fh = { class: 'workspace-pill' },
  Ih = { class: 'name' },
  Eh = { class: 'tab-list', role: 'tablist' },
  zh = ['aria-selected', 'onClick'],
  Bh = { class: 'content-area' },
  Hh = yt({
    __name: 'index',
    setup(i) {
      const t = Jt(),
        e = ye('timeline'),
        s = [
          { id: 'timeline', label: 'Dashboard', component: qc },
          { id: 'search', label: 'Search', component: hh },
          { id: 'settings', label: 'Settings', component: Ph },
        ],
        n = et(() => {
          var o;
          return (o = s.find((a) => a.id === e.value)) == null
            ? void 0
            : o.component;
        });
      return (o, a) => (
        j(),
        U('div', Th, [
          _('header', Rh, [
            nt(t).workspaceName
              ? (j(),
                U('div', Lh, [
                  _('div', Fh, [
                    a[0] || (a[0] = _('span', { class: 'icon' }, '📂', -1)),
                    _('span', Ih, it(nt(t).workspaceName), 1),
                  ]),
                ]))
              : pn('', !0),
            a[1] || (a[1] = _('div', { class: 'divider' }, null, -1)),
            _('nav', Eh, [
              (j(),
              U(
                fn,
                null,
                gn(s, (r) =>
                  _(
                    'button',
                    {
                      key: r.id,
                      role: 'tab',
                      class: Kt(['tab-btn', { active: e.value === r.id }]),
                      'aria-selected': e.value === r.id,
                      onClick: (l) => (e.value = r.id),
                    },
                    it(r.label),
                    11,
                    zh,
                  ),
                ),
                64,
              )),
            ]),
          ]),
          _('main', Bh, [(j(), Qi(yo, null, [(j(), Qi(xo(n.value)))], 1024))]),
        ])
      );
    },
  }),
  jh = Vt(Hh, [['__scopeId', 'data-v-3821bcf3']]);
export { jh as default };
