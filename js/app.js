(function () {
  const E = window.EB, root = document.documentElement;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const main = $('#main'), drawer = $('#drawer');

  E.renderMath = el => {
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
        throwOnError: false
      });
    } catch (e) { console.error(e); }
  };

  // Wrap Latin/number runs inside Arabic text in LTR isolates so "(kJ/s)", "T<sub>sat</sub> = 250°C" etc. keep their order
  const AR = /[؀-ۿ]/, LAT = /[A-Za-z0-9Ͱ-Ͽ°ṁυ₀-₉]/;
  const ARSPLIT = /([؀-ۿً-ٟ]+(?:[\s،؛؟.:]+[؀-ۿً-ٟ]+)*)/;
  const INLINE = new Set(['SUB', 'SUP', 'B', 'I', 'U', 'EM', 'STRONG', 'CODE', 'SMALL', 'SPAN', 'A']);
  const SKIP = el => !!el.closest('svg, .katex, bdi') || el.matches('.ltr, .en, .statement, .math, script, style, input, select, textarea, .num, table.given, .qtext, .choice, code');
  E.bidi = function iso(el) {
    if (el.nodeType !== 1 || SKIP(el)) return;
    Array.from(el.childNodes).forEach(n => {
      if (n.nodeType === 3 && AR.test(n.data) && LAT.test(n.data)) {
        const parts = n.data.split(ARSPLIT).filter(s => s !== '');
        parts.forEach(p => el.insertBefore(document.createTextNode(p), n));
        el.removeChild(n);
      }
    });
    let run = [];
    const flush = () => {
      if (!run.length) return;
      const txt = run.map(n => n.textContent).join('');
      if (LAT.test(txt)) {
        const first = run[0], last = run[run.length - 1];
        if (first.nodeType === 3) { const m = first.data.match(/^[\s—]+/); if (m) { el.insertBefore(document.createTextNode(m[0]), first); first.data = first.data.slice(m[0].length); } }
        let tail = null;
        const o = (txt.match(/\(/g) || []).length, c = (txt.match(/\)/g) || []).length;
        const tre = o > c ? /[\s.,:;،—(]+$/ : c > o ? /[\s.,:;،—)]+$/ : /[\s.,:;،—]+$/;
        if (last.nodeType === 3) { const m = last.data.match(tre); if (m && m[0].length < last.data.length) { tail = document.createTextNode(m[0]); last.data = last.data.slice(0, -m[0].length); } }
        if (c > o && first.nodeType === 3) { const m = first.data.match(/^[)\s]+/); if (m && m[0].length < first.data.length) { el.insertBefore(document.createTextNode(m[0]), first); first.data = first.data.slice(m[0].length); } }
        const b = document.createElement('bdi'); b.setAttribute('dir', 'ltr');
        el.insertBefore(b, first); run.forEach(n => b.appendChild(n));
        if (tail) el.insertBefore(tail, b.nextSibling);
      }
      run = [];
    };
    Array.from(el.childNodes).forEach(n => {
      const isText = n.nodeType === 3, isEl = n.nodeType === 1;
      if (isText && !AR.test(n.data)) { run.push(n); return; }
      if (isEl && (n.classList.contains('katex') || (INLINE.has(n.tagName) && !AR.test(n.textContent) && !n.querySelector('input,button')))) { run.push(n); return; }
      flush();
      if (isEl) iso(n);
    });
    flush();
  };

  // Render every page once so all examples register for progress counting
  E.pages.forEach(p => { try { p.render(); } catch (e) { console.error('page', p.id, e); } });

  const mode = () => root.dataset.mode || 'quiz';
  const visible = () => E.pages.filter(p => mode() === 'mid' || p.scope !== 'mid');

  function buildNav() {
    let html = '', grp = '';
    E.pages.forEach(p => {
      if (p.group !== grp) { grp = p.group; html += `<div class="grp"${p.scope === 'mid' ? ' data-scope="mid"' : ''}>${grp}</div>`; }
      html += `<a href="#/${p.id}" data-id="${p.id}"${p.scope === 'mid' ? ' data-scope="mid"' : ''}>${p.title}${p.scope === 'mid' ? '<span class="tag new">ميد</span>' : ''}</a>`;
    });
    drawer.innerHTML = html + `<div class="grp">التقدم</div><div style="padding:0 10px" id="navProgress"></div>`;
  }

  function progressHTML() {
    const done = E.store.get('done', {});
    const ex = Object.values(E.examples);
    const q = ex.filter(e => e.scope === 'quiz'), all = ex;
    const dq = q.filter(e => done[e.id]).length, da = all.filter(e => done[e.id]).length;
    const bar = (lbl, d, t, cls) => `<div class="prog ${cls}"><div class="lbl"><span>${lbl}</span><span>${d}/${t}</span></div><div class="bar"><i style="width:${t ? d / t * 100 : 0}%"></i></div></div>`;
    const bq = E.store.get('best_quiz', null), bm = E.store.get('best_mid', null);
    return bar('الكوز (لحد 1.13)', dq, q.length, '') + `<div data-scope="mid">${bar('الميد (لحد 1.21)', da, all.length, 'mid')}</div>` +
      `<small>أعلى نتيجة ببنك الأسئلة: كوز ${bq === null ? '—' : bq + '%'}<span data-scope="mid"> · ميد ${bm === null ? '—' : bm + '%'}</span></small>`;
  }
  function updateProgress() {
    const h = progressHTML();
    const n = $('#navProgress'); if (n) n.innerHTML = h;
    const hp = $('#homeProgress'); if (hp) hp.innerHTML = h;
  }

  function mountModels(el) {
    $$('[data-model]', el).forEach(m => {
      const fn = E.models[m.dataset.model];
      if (fn) { try { fn(m); } catch (e) { console.error('model', m.dataset.model, e); m.innerHTML = '<div class="box bad">خطأ بتحميل النموذج.</div>'; } }
    });
  }

  function route() {
    const id = (location.hash.match(/^#\/([\w-]+)/) || [])[1] || 'home';
    let page = E.pages.find(p => p.id === id) || E.pages[0];
    if (page.scope === 'mid' && mode() !== 'mid') {
      main.innerHTML = `<div class="box midbox"><strong>هذا القسم للميد فقط</strong>انت هسه بوضع الكوز. <button class="btn mid small" data-setmode="mid">حوّل لوضع الميد</button> أو <a href="#/home">ارجع للرئيسية</a>.</div>`;
      return;
    }
    main.innerHTML = page.render();
    const vis = visible(), i = vis.indexOf(page);
    const prev = vis[i - 1], next = vis[i + 1];
    main.insertAdjacentHTML('beforeend', `<nav class="pager">${prev ? `<a href="#/${prev.id}"><small>السابق</small>${prev.title}</a>` : '<span></span>'}${next ? `<a class="next" href="#/${next.id}"><small>التالي</small>${next.title}</a>` : '<span></span>'}</nav>`);
    E.renderMath(main);
    E.bidi(main);
    mountModels(main);
    $$('#drawer a').forEach(a => a.classList.toggle('active', a.dataset.id === page.id));
    const map = $('#examTypeMap', main);
    if (map) map.innerHTML = E.examTypes.map(t => `<a href="#/exams" data-goto="t-${t.id}"${t.scope === 'mid' ? ' data-scope="mid"' : ''}><b>${t.title}</b></a>`).join('') + '<a href="#/exams" data-goto="t-out"><b>خارج المادة</b></a>';
    updateProgress();
    document.title = page.title + ' | موازنة الطاقة';
    const anchor = sessionStorage.getItem('eb_goto');
    if (anchor) { sessionStorage.removeItem('eb_goto'); const t = document.getElementById(anchor); if (t) { t.scrollIntoView(); return; } }
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  function setMode(m) {
    root.dataset.mode = m;
    E.store.set('mode', m);
    try { localStorage.setItem('eb_mode', m); } catch (e) { /* ignore */ }
    route();
  }

  document.addEventListener('click', e => {
    const sm = e.target.closest('[data-setmode]');
    if (sm) { setMode(sm.dataset.setmode); return; }
    const g = e.target.closest('[data-goto]');
    if (g) {
      e.preventDefault();
      const t = document.getElementById(g.dataset.goto);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (e.target.closest('#drawer a')) document.body.classList.remove('drawer-open');
    if (e.target.closest('#openSheet2')) openSheet();
  });
  document.addEventListener('change', e => {
    const cb = e.target.closest('[data-done]');
    if (cb) { const d = E.store.get('done', {}); if (cb.checked) d[cb.dataset.done] = 1; else delete d[cb.dataset.done]; E.store.set('done', d); updateProgress(); }
  });

  $('#menuBtn').onclick = () => document.body.classList.toggle('drawer-open');
  $('#scrim').onclick = () => document.body.classList.remove('drawer-open');
  $('#themeBtn').onclick = () => {
    const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = t;
    try { localStorage.setItem('eb_theme', t); } catch (e) { /* ignore */ }
  };
  if (!root.dataset.theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';

  const modal = $('#sheetModal');
  function openSheet() {
    $('#sheetBody').innerHTML = E.sheetHTML();
    E.renderMath($('#sheetBody'));
    E.bidi($('#sheetBody'));
    modal.hidden = false;
  }
  $('#fabSheet').onclick = openSheet;
  $('#sheetClose').onclick = () => { modal.hidden = true; };
  modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { modal.hidden = true; document.body.classList.remove('drawer-open'); } });
  $('.modal-head .btn', modal).onclick = () => { document.body.classList.add('print-sheet'); window.print(); };
  window.addEventListener('afterprint', () => document.body.classList.remove('print-sheet'));

  // Keep bidi isolation working for content that models write later
  const mo = new MutationObserver(muts => {
    const targets = new Set();
    muts.forEach(m => m.addedNodes.forEach(n => {
      const t = n.nodeType === 1 ? n : n.parentElement;
      if (t && !t.closest('.katex, bdi, svg')) targets.add(t);
    }));
    if (!targets.size) return;
    mo.disconnect();
    targets.forEach(t => { if (t.isConnected) E.bidi(t); });
    mo.observe(main, { childList: true, subtree: true });
  });
  mo.observe(main, { childList: true, subtree: true });

  buildNav();
  window.addEventListener('hashchange', route);
  route();
})();
