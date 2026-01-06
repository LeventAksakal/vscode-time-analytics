import {
  d as V,
  s as M,
  r as f,
  c as h,
  a as B,
  b as r,
  e,
  t as y,
  F as j,
  f as F,
  o as n,
  _ as b,
  u as O,
  g as $,
  h as K,
  n as L,
} from './index-CnE5YJgu.js';
const x = V('analytics', () => {
    const l = M({}),
      c = f({ totalActiveTime: 0, totalIdleTime: 0 }),
      s = f({ active: 0, idle: 0 }),
      p = f(''),
      u = f(void 0),
      a = f(!1),
      i = f(!0);
    function d(t) {
      switch (t.type) {
        case 'initialData':
          (_(t.data), (i.value = !1));
          break;
        case 'workspaceData':
          (console.log('[Store] Received workspaceData:', t.data.buckets),
            (l.value = t.data.buckets));
          break;
        case 'globalStats':
          s.value = t.stats;
          break;
        case 'updateBucket':
          w(t.bucketKey, t.value);
          break;
        case 'newBucket':
          w(t.bucketKey, t.value);
          break;
        case 'deleteBucket':
          C(t.bucketKey);
          break;
        case 'error':
          u.value = t.reason;
          break;
      }
    }
    function _(t) {
      (console.log('[Store] Setting initial data:', t),
        (l.value = t.buckets),
        (c.value = {
          totalActiveTime: t.projectTotals.active,
          totalIdleTime: t.projectTotals.idle,
        }),
        (s.value = t.globalStats),
        (p.value = t.workspaceName),
        (u.value = t.error),
        (a.value = !0));
    }
    function w(t, o) {
      const v = typeof o == 'string' ? JSON.parse(o) : o;
      l.value = { ...l.value, [t]: v };
    }
    function C(t) {
      const o = { ...l.value };
      (delete o[t], (l.value = o));
    }
    const T = h(() => {
        const t = new Date(),
          o = String(t.getDate()).padStart(2, '0'),
          v = String(t.getMonth() + 1).padStart(2, '0'),
          k = t.getFullYear();
        return `${o}-${v}-${k}`;
      }),
      N = h(() => {
        const t = T.value,
          o = {};
        for (const [v, k] of Object.entries(l.value))
          v.startsWith(t) && (o[v] = k);
        return o;
      }),
      A = h(() => {
        const t = T.value;
        (console.log('[Store] Computing daily summary for date:', t),
          console.log(
            '[Store] Total buckets count:',
            Object.keys(l.value).length,
          ));
        let o = 0,
          v = 0,
          k = 0;
        const g = [],
          D = N.value;
        console.log('[Store] Today buckets count:', Object.keys(D).length);
        for (const [S, m] of Object.entries(D)) {
          ((o += m.active || 0), (v += m.idle || 0), k++);
          const I = S.split(',').slice(3).join(',');
          g.push({ path: I, active: m.active || 0, idle: m.idle || 0 });
        }
        return (
          g.sort((S, m) => m.active - S.active),
          { active: o, idle: v, fileCount: k, files: g }
        );
      });
    return {
      buckets: l,
      projectTotals: c,
      globalStats: s,
      workspaceName: p,
      error: u,
      isReady: a,
      loading: i,
      handleMessage: d,
      dailySummary: A,
    };
  }),
  R = { class: 'daily-summary' },
  W = { class: 'stats-grid' },
  z = { class: 'stat-card' },
  E = { class: 'stat-value active' },
  J = { class: 'stat-card' },
  P = { class: 'stat-value idle' },
  Y = { class: 'stat-card' },
  q = { class: 'stat-value' },
  G = { class: 'top-files' },
  H = { key: 0, class: 'no-data' },
  Q = { key: 1, class: 'file-list' },
  U = ['title'],
  X = { class: 'file-duration' },
  Z = B({
    __name: 'DailySummary',
    setup(l) {
      const c = x(),
        s = h(() => c.dailySummary);
      function p(u) {
        const a = Math.floor(u / 3600),
          i = Math.floor((u % 3600) / 60),
          d = Math.floor(u % 60),
          _ = [];
        return (
          a > 0 && _.push(`${a}h`),
          i > 0 && _.push(`${i}m`),
          (d > 0 || _.length === 0) && _.push(`${d}s`),
          _.join(' ')
        );
      }
      return (u, a) => (
        n(),
        r('div', R, [
          e('section', W, [
            e('div', z, [
              a[0] ||
                (a[0] = e('span', { class: 'stat-label' }, 'Active Time', -1)),
              e('div', E, y(p(s.value.active)), 1),
            ]),
            e('div', J, [
              a[1] ||
                (a[1] = e('span', { class: 'stat-label' }, 'Idle Time', -1)),
              e('div', P, y(p(s.value.idle)), 1),
            ]),
            e('div', Y, [
              a[2] ||
                (a[2] = e(
                  'span',
                  { class: 'stat-label' },
                  'Files Touched',
                  -1,
                )),
              e('div', q, y(s.value.fileCount), 1),
            ]),
          ]),
          e('section', G, [
            a[3] || (a[3] = e('h3', null, 'Top Files Today', -1)),
            s.value.files.length === 0
              ? (n(), r('div', H, 'No activity recorded today.'))
              : (n(),
                r('div', Q, [
                  (n(!0),
                  r(
                    j,
                    null,
                    F(
                      s.value.files,
                      (i) => (
                        n(),
                        r('div', { key: i.path, class: 'file-item' }, [
                          e(
                            'span',
                            { class: 'file-path', title: i.path },
                            y(i.path),
                            9,
                            U,
                          ),
                          e('span', X, y(p(i.active)), 1),
                        ])
                      ),
                    ),
                    128,
                  )),
                ])),
          ]),
        ])
      );
    },
  }),
  tt = b(Z, [['__scopeId', 'data-v-dd99315d']]),
  et = {};
function st(l, c) {
  return (
    n(),
    r('div', null, [
      ...(c[0] ||
        (c[0] = [
          e('h2', null, 'All Files', -1),
          e('p', null, 'File list view coming soon...', -1),
        ])),
    ])
  );
}
const at = b(et, [['render', st]]),
  ot = {};
function nt(l, c) {
  return (
    n(),
    r('div', null, [
      ...(c[0] ||
        (c[0] = [
          e('h2', null, 'Settings', -1),
          e('p', null, 'Settings view coming soon...', -1),
        ])),
    ])
  );
}
const lt = b(ot, [['render', nt]]),
  ct = { class: 'app-container' },
  it = { class: 'app-header' },
  rt = { class: 'meta-info' },
  ut = { key: 0 },
  dt = { key: 1 },
  vt = { class: 'app-nav' },
  pt = ['onClick'],
  _t = { class: 'app-content' },
  yt = B({
    __name: 'index',
    setup(l) {
      const c = x(),
        s = f('summary'),
        p = h(() => 'Workspace Analytics'),
        u = [
          { id: 'summary', label: 'Daily Summary' },
          { id: 'files', label: 'Files' },
          { id: 'settings', label: 'Settings' },
        ];
      return (a, i) => (
        n(),
        r('div', ct, [
          e('header', it, [
            e('h1', null, y(p.value), 1),
            e('div', rt, [
              O(c).loading
                ? (n(), r('span', ut, 'Loading...'))
                : (n(),
                  r(
                    'span',
                    dt,
                    'Last updated: ' + y(new Date().toLocaleTimeString()),
                    1,
                  )),
            ]),
          ]),
          e('nav', vt, [
            (n(),
            r(
              j,
              null,
              F(u, (d) =>
                e(
                  'button',
                  {
                    key: d.id,
                    class: L(['nav-tab', { active: s.value === d.id }]),
                    onClick: (_) => (s.value = d.id),
                  },
                  y(d.label),
                  11,
                  pt,
                ),
              ),
              64,
            )),
          ]),
          e('main', _t, [
            s.value === 'summary'
              ? (n(), $(tt, { key: 0 }))
              : s.value === 'files'
                ? (n(), $(at, { key: 1 }))
                : s.value === 'settings'
                  ? (n(), $(lt, { key: 2 }))
                  : K('', !0),
          ]),
        ])
      );
    },
  }),
  mt = b(yt, [['__scopeId', 'data-v-1b524dc7']]);
export { mt as default };
