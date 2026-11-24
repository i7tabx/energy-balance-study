(function () {
  const E = window.EB, S = window.Steam;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const fmt = (v, d) => {
    if (v === null || v === undefined || !isFinite(v)) return '—';
    const a = Math.abs(v);
    if (a !== 0 && (a < 1e-3 || a >= 1e6)) return v.toExponential(3);
    return (+v.toFixed(d === undefined ? 3 : d)).toLocaleString('en-US', { maximumFractionDigits: d === undefined ? 3 : d });
  };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const mode = () => document.documentElement.dataset.mode || 'quiz';
  const math = el => E.renderMath && E.renderMath(el);
  E.fmt = fmt;

  // Haywood rows read from the exam table (bar, Tsat °C, vf, vg, uf, ug, hf, hfg, hg)
  const HW = [
    [0.2, 60.1, 0.001017, 7.65, 251.4, 2456.9, 251.5, 2358.4, 2609.9],
    [1, 99.6, 0.001043, 1.694, 417.4, 2506.1, 417.5, 2257.9, 2675.4],
    [2, 120.2, 0.001061, 0.885, 504.5, 2529.2, 504.7, 2201.6, 2706.3],
    [3, 133.5, 0.001074, 0.606, 561.1, 2543.0, 561.4, 2163.2, 2724.7],
    [4, 143.6, 0.001084, 0.462, 604.2, 2552.7, 604.7, 2133.0, 2737.6],
    [5, 151.8, 0.001093, 0.375, 639.6, 2560.2, 640.1, 2107.4, 2747.5],
    [7, 165.0, 0.001108, 0.273, 696.3, 2571.1, 697.1, 2064.9, 2762.0],
    [10, 179.9, 0.001127, 0.1943, 761.5, 2581.9, 762.6, 2013.6, 2776.2],
    [11, 184.1, 0.001133, 0.1774, 779.9, 2584.5, 781.1, 1998.5, 2779.7],
    [12, 188.0, 0.001139, 0.1632, 797.1, 2586.9, 798.4, 1984.3, 2782.7],
    [16, 201.4, 0.001159, 0.1237, 856.7, 2593.8, 858.6, 1933.2, 2791.7],
    [20, 212.4, 0.001177, 0.0995, 906.2, 2598.2, 908.6, 1888.6, 2797.2]
  ];
  E.HW = HW;

  // ============ 1. System classifier
  E.model('classifier', el => {
    const items = [
      ['Windmill', 'طاحونة هوا', 'open', 'الهوا يعبر الريش (مادة) ويطلع شغل.'],
      ['Car engine (internal combustion)', 'محرك سيارة', 'open', 'هوا + وقود يدخل، عادم يطلع.'],
      ['Gas in a piston–cylinder', 'غاز بسلندر وبستن', 'closed', 'الغاز ما يطلع؛ حرارة وشغل بس.'],
      ['Sealed rigid tank being heated', 'خزان مسدود يتسخن', 'closed', 'حرارة تدخل، ماكو مادة.'],
      ['Steam turbine', 'توربين بخاري', 'open', 'بخار يدخل ويطلع.'],
      ['Perfectly insulated sealed thermos', 'ترمس معزول مسدود', 'isolated', 'لا حرارة ولا شغل ولا مادة.'],
      ['Pump moving water', 'مضخة ماي', 'open', 'الماي يجري خلالها.'],
      ['Aircraft during braking (as in Final 2025)', 'طيارة أثناء الفرملة', 'closed', 'الدكتورة اعتبرتها closed: الطاقة تتحول لحرارة وتطلع، الكتلة ثابتة.'],
      ['Pressure cooker with valve closed', 'قدر ضغط مسدود', 'closed', 'حرارة تدخل، ماكو بخار يطلع.'],
      ['Heat exchanger', 'مبادل حراري', 'open', 'مائعين يجرون خلاله.'],
      ['The universe', 'الكون كله', 'isolated', 'ماكو شي خارجه.'],
      ['Boiling kettle (open lid)', 'كتلي يغلي مفتوح', 'open', 'البخار يطلع للجو.']
    ];
    const names = { open: 'Open مفتوح', closed: 'Closed مغلق', isolated: 'Isolated معزول' };
    const sk = {
      open: `<svg viewBox="0 0 120 50"><rect x="35" y="8" width="50" height="34" rx="6" fill="none" stroke="var(--mid)" stroke-dasharray="4 3"/><path d="M5 25 H45 M75 25 H115" stroke="var(--fg)" stroke-width="2"/><path d="M110 21 L116 25 L110 29" fill="var(--fg)"/><text x="60" y="29" text-anchor="middle" font-size="9" fill="var(--muted)">m, Q, W</text></svg>`,
      closed: `<svg viewBox="0 0 120 50"><rect x="35" y="8" width="50" height="34" rx="6" fill="none" stroke="var(--mid)" stroke-dasharray="4 3"/><path d="M60 50 V36 M60 0 V14" stroke="var(--q)" stroke-width="2"/><text x="60" y="29" text-anchor="middle" font-size="9" fill="var(--muted)">Q, W only</text></svg>`,
      isolated: `<svg viewBox="0 0 120 50"><rect x="35" y="8" width="50" height="34" rx="6" fill="none" stroke="var(--fg)" stroke-width="3"/><rect x="31" y="4" width="58" height="42" rx="8" fill="none" stroke="var(--fg)"/><text x="60" y="29" text-anchor="middle" font-size="9" fill="var(--muted)">nothing</text></svg>`
    };
    el.innerHTML = `<div class="model"><h3>نموذج 1: صنّف الأنظمة (اسحب أو اضغط ثم اختار الصندوق)</h3>
      <div class="pool" data-bin="pool"></div>
      <div class="bins">${['open', 'closed', 'isolated'].map(k => `<div class="bin" data-bin="${k}"><h5>${names[k]}</h5><div class="diagram">${sk[k]}</div></div>`).join('')}</div>
      <div class="row" style="margin-top:10px"><button class="btn" data-act="check">صحح</button><button class="btn ghost" data-act="reset">إعادة</button></div>
      <div class="out"></div></div>`;
    const pool = $('[data-bin="pool"]', el);
    let sel = null;
    const build = () => {
      $$('.chip', el).forEach(c => c.remove());
      $('.out', el).innerHTML = '';
      shuffle(items).forEach(it => {
        const c = document.createElement('span');
        c.className = 'chip'; c.dataset.k = it[2]; c.dataset.why = it[3];
        c.innerHTML = `<span class="ltr">${it[0]}</span> · ${it[1]}`;
        pool.appendChild(c);
      });
    };
    build();
    const place = (chip, bin) => { if (bin) { chip.classList.remove('ok', 'no', 'sel'); bin.appendChild(chip); } };
    el.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (chip && !chip.dataset.dragged) { if (sel) sel.classList.remove('sel'); sel = chip === sel ? null : chip; if (sel) sel.classList.add('sel'); return; }
      const bin = e.target.closest('[data-bin]');
      if (bin && sel) { place(sel, bin); sel = null; }
    });
    let drag = null;
    el.addEventListener('pointerdown', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      drag = { chip, x: e.clientX, y: e.clientY, ghost: null };
      delete chip.dataset.dragged;
    });
    window.addEventListener('pointermove', e => {
      if (!drag) return;
      if (!drag.ghost && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) {
        drag.ghost = drag.chip.cloneNode(true);
        Object.assign(drag.ghost.style, { position: 'fixed', pointerEvents: 'none', zIndex: 200, opacity: .85 });
        document.body.appendChild(drag.ghost); drag.chip.dataset.dragged = '1';
      }
      if (drag.ghost) {
        drag.ghost.style.left = (e.clientX - 40) + 'px'; drag.ghost.style.top = (e.clientY - 18) + 'px';
        $$('.bin', el).forEach(b => b.classList.remove('over'));
        const t = document.elementFromPoint(e.clientX, e.clientY); const b = t && t.closest('.bin'); if (b && el.contains(b)) b.classList.add('over');
      }
    });
    window.addEventListener('pointerup', e => {
      if (!drag) return;
      if (drag.ghost) {
        drag.ghost.remove();
        const t = document.elementFromPoint(e.clientX, e.clientY); const b = t && t.closest('[data-bin]');
        if (b && el.contains(b)) place(drag.chip, b);
        $$('.bin', el).forEach(x => x.classList.remove('over'));
        const c = drag.chip; setTimeout(() => delete c.dataset.dragged, 50);
      }
      drag = null;
    });
    $('[data-act="reset"]', el).onclick = build;
    $('[data-act="check"]', el).onclick = () => {
      let ok = 0, n = 0, msgs = [];
      $$('.bin .chip', el).forEach(c => {
        n++; const right = c.parentElement.dataset.bin === c.dataset.k;
        c.classList.toggle('ok', right); c.classList.toggle('no', !right);
        if (right) ok++; else msgs.push(`<li>${c.innerHTML} → <b>${names[c.dataset.k]}</b>: ${c.dataset.why}</li>`);
      });
      const left = $$('.chip', pool).length;
      $('.out', el).innerHTML = `<div class="result ${ok === n && !left ? '' : 'bad'}">صح ${ok} من ${n}${left ? ` (باقي ${left} ما صنفتها)` : ''}</div>${msgs.length ? `<ul>${msgs.join('')}</ul>` : ''}`;
    };
  });

  // ============ 2. First-law energy bars
  E.model('energybars', el => {
    el.innerHTML = `<div class="model"><h3>نموذج 2: أشرطة القانون الأول</h3>
      <div class="row"><button class="btn small" data-sys="closed">نظام مغلق</button><button class="btn small ghost" data-sys="open">نظام مفتوح</button></div>
      <div class="row" style="margin-top:8px">
        <label class="fld">Q (kJ) <small>+ داخلة</small><input type="range" min="-100" max="100" value="60" data-v="Q"></label>
        <label class="fld"><span data-wlbl>W</span> (kJ) <small>+ by system</small><input type="range" min="-100" max="100" value="20" data-v="W"></label>
        <label class="fld">ΔKE (kJ)<input type="range" min="-50" max="50" value="5" data-v="KE"></label>
        <label class="fld">ΔPE (kJ)<input type="range" min="-50" max="50" value="0" data-v="PE"></label>
      </div>
      <div class="vbars"></div><div class="math eqline"></div><p class="interp"></p></div>`;
    let sys = 'closed';
    const draw = () => {
      const v = {}; $$('[data-v]', el).forEach(i => v[i.dataset.v] = +i.value);
      const U = v.Q - v.W - v.KE - v.PE;
      const Ul = sys === 'closed' ? 'ΔU' : 'ΔH', Wl = sys === 'closed' ? 'W' : 'Ws';
      $('[data-wlbl]', el).textContent = Wl;
      const rows = [['Q', v.Q, 'var(--q)'], [Wl, v.W, 'var(--w)'], ['ΔKE', v.KE, 'var(--ke)'], ['ΔPE', v.PE, 'var(--pe)'], [Ul, U, 'var(--u)']];
      const mx = Math.max(100, ...rows.map(r => Math.abs(r[1])));
      $('.vbars', el).innerHTML = rows.map(r => {
        const w = Math.abs(r[1]) / mx * 50;
        return `<div class="r"><b>${r[0]}</b><div class="track"><i style="background:${r[2]};${r[1] >= 0 ? 'left:50%' : `left:${50 - w}%`};width:${w}%"></i></div><span>${r[1].toFixed(0)} kJ</span></div>`;
      }).join('');
      const L = sys === 'closed' ? '\\Delta U' : '\\Delta H', WW = sys === 'closed' ? 'W' : 'W_s';
      $('.eqline', el).innerHTML = `\\[${L} = Q - ${WW} - \\Delta KE - \\Delta PE = ${v.Q} - (${v.W}) - (${v.KE}) - (${v.PE}) = ${U}\\ \\text{kJ}\\]`;
      math($('.eqline', el));
      $('.interp', el).innerHTML = U > 0 ? `${Ul} موجب: الطاقة الداخلة أكثر من الطالعة فالنظام <b>خزّن</b> طاقة (سخن).` : U < 0 ? `${Ul} سالب: النظام <b>خسر</b> طاقة داخلية.` : `${Ul} = 0: كل الطاقة الداخلة طلعت.`;
    };
    $$('[data-v]', el).forEach(i => i.oninput = draw);
    $$('[data-sys]', el).forEach(b => b.onclick = () => { sys = b.dataset.sys; $$('[data-sys]', el).forEach(x => x.classList.toggle('ghost', x !== b)); draw(); });
    draw();
  });

  // ============ 5. Device simulator
  E.model('device', el => {
    const P = {
      turbine: { n: 'Turbine (Ex 1.7)', m: 1500, h1: 3216, h2: 2549.3, u1: 0, u2: 0, z1: 0, z2: 0, Q: 0, Ws: 0, unk: 'Ws', zero: 'Q ≈ 0, ΔKE ≈ 0, ΔPE ≈ 0' },
      compressor: { n: 'Compressor (Ex 1.10)', m: 1.257, h1: 3025, h2: 3046, u1: 20, u2: 170, z1: 0, z2: 0, Q: -5, Ws: 0, unk: 'Ws', zero: 'ΔPE = 0' },
      pump: { n: 'Pump (Ex 1.12, Δh = ΔP/ρ)', m: 31.5, h1: 104.9, h2: 106.4, u1: 0, u2: 0, z1: 0, z2: 0, Q: 0, Ws: 0, unk: 'Ws', zero: 'Q = 0' },
      hx: { n: 'Heat exchanger (Ex 1.9)', m: 60 / 3600, h1: 2875, h2: 417.5, u1: 0, u2: 0, z1: 0, z2: 0, Q: 0, Ws: 0, unk: 'Q', zero: 'Ws = 0, ΔKE = 0, ΔPE = 0' },
      boiler: { n: 'Boiler', m: 1, h1: 96.4, h2: 2776.2, u1: 0, u2: 30, z1: 0, z2: 0, Q: 0, Ws: 0, unk: 'Q', zero: 'Ws = 0, ΔPE = 0' },
      nozzle: { n: 'Nozzle', m: 1, h1: 3000, h2: 2900, u1: 10, u2: 0, z1: 0, z2: 0, Q: 0, Ws: 0, unk: 'u2', zero: 'Q = 0, Ws = 0, ΔPE = 0' },
      valve: { n: 'Throttling valve', m: 1, h1: 2800, h2: 0, u1: 0, u2: 0, z1: 0, z2: 0, Q: 0, Ws: 0, unk: 'h2', zero: 'Q = Ws = ΔKE = ΔPE = 0 → h₁ = h₂' }
    };
    const f = [['m', 'ṁ (kg/s)'], ['h1', 'h₁ (kJ/kg)'], ['h2', 'h₂ (kJ/kg)'], ['u1', 'υ₁ (m/s)'], ['u2', 'υ₂ (m/s)'], ['z1', 'z₁ (m)'], ['z2', 'z₂ (m)'], ['Q', 'Q (kW)'], ['Ws', 'Ws (kW)']];
    el.innerHTML = `<div class="model"><h3>نموذج 5: محاكي الأجهزة — أي حد هو المسيطر؟</h3>
      <div class="row"><label class="fld">الجهاز<select data-dev>${Object.keys(P).map(k => `<option value="${k}">${P[k].n}</option>`).join('')}</select></label>
      <label class="fld">المجهول<select data-unk><option value="Ws">Ws</option><option value="Q">Q</option><option value="h2">h₂</option><option value="u2">υ₂</option></select></label></div>
      <div class="row">${f.map(([k, l]) => `<label class="fld">${l}<input type="number" step="any" data-f="${k}"></label>`).join('')}</div>
      <p class="zeroes"></p><div class="vbars"></div><div class="result"></div></div>`;
    const get = k => +$(`[data-f="${k}"]`, el).value || 0;
    const load = k => { const p = P[k]; f.forEach(([q]) => { $(`[data-f="${q}"]`, el).value = p[q]; }); $('[data-unk]', el).value = p.unk; $('.zeroes', el).innerHTML = `<b>عادةً صفر:</b> <span class="ltr">${p.zero}</span>`; calc(); };
    const calc = () => {
      const unk = $('[data-unk]', el).value;
      $$('[data-f]', el).forEach(i => { i.disabled = i.dataset.f === unk; });
      const m = get('m');
      let h1 = get('h1'), h2 = get('h2'), u1 = get('u1'), u2 = get('u2'), Q = get('Q'), Ws = get('Ws');
      const dPE = m * 9.81 * (get('z2') - get('z1')) / 1000;
      let dKE = m * (u2 * u2 - u1 * u1) / 2000, dH = m * (h2 - h1);
      let txt = '';
      if (unk === 'Ws') { Ws = Q - dH - dKE - dPE; txt = `Ws = ${fmt(Ws, 2)} kW (${fmt(Ws / 0.7457, 1)} hp) — ${Ws > 0 ? 'الجهاز ينتج شغل' : 'الجهاز يحتاج شغل'}`; }
      if (unk === 'Q') { Q = dH + dKE + dPE + Ws; txt = `Q = ${fmt(Q, 2)} kW — ${Q > 0 ? 'حرارة داخلة' : 'حرارة طالعة'}`; }
      if (unk === 'h2') { h2 = h1 + (Q - Ws - dKE - dPE) / m; dH = m * (h2 - h1); txt = `h₂ = ${fmt(h2, 1)} kJ/kg`; }
      if (unk === 'u2') { const r = u1 * u1 + 2000 * (Q - Ws - dH - dPE) / m; u2 = r >= 0 ? Math.sqrt(r) : NaN; dKE = m * (u2 * u2 - u1 * u1) / 2000; txt = isNaN(u2) ? 'ماكو حل (الطاقة ما تكفي)' : `υ₂ = ${fmt(u2, 1)} m/s`; }
      const rows = [['ΔH', dH, 'var(--h)'], ['ΔKE', dKE, 'var(--ke)'], ['ΔPE', dPE, 'var(--pe)'], ['Q', Q, 'var(--q)'], ['Ws', Ws, 'var(--w)']];
      const mx = Math.max(1e-9, ...rows.map(r => Math.abs(r[1] || 0)));
      $('.vbars', el).innerHTML = rows.map(r => { const w = Math.abs(r[1] || 0) / mx * 50; return `<div class="r"><b>${r[0]}</b><div class="track"><i style="background:${r[2]};${r[1] >= 0 ? 'left:50%' : `left:${50 - w}%`};width:${w}%"></i></div><span>${fmt(r[1], 3)} kW</span></div>`; }).join('');
      const dom = rows.slice(0, 3).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
      $('.result', el).innerHTML = `<span class="ltr">${txt}</span><br><small>الحد المسيطر من (ΔH, ΔKE, ΔPE): <b>${dom[0]}</b> — لاحظ شكد ΔPE صغير دائماً بالأجهزة.</small>`;
    };
    $('[data-dev]', el).onchange = e => load(e.target.value);
    $('[data-unk]', el).onchange = calc;
    $$('[data-f]', el).forEach(i => i.oninput = calc);
    load('turbine');
  });

  // ============ Steam state detective
  E.model('detective', el => {
    el.innerHTML = `<div class="model"><h3>محقق حالة البخار (3 أسئلة)</h3><div class="body"></div>
      <div class="row" style="margin-top:8px"><button class="btn small" data-new>مسألة جديدة</button><span class="score"></span></div></div>`;
    let sc = E.store.get('det', { ok: 0, n: 0 });
    const opts = [['liquid', 'سائل مضغوط (compressed liquid)'], ['wet', 'بخار رطب (wet)'], ['satv', 'بخار مشبع جاف (sat. vapor)'], ['sup', 'محمص (superheated)']];
    const gen = () => {
      const r = HW[1 + Math.floor(Math.random() * (HW.length - 1))];
      const [P, Ts, vf, vg, , , hf, hfg, hg] = r;
      const t = Math.floor(Math.random() * 4);
      let given, ans, steps;
      if (t === 0) {
        const k = Math.floor(Math.random() * 3); const T = k === 0 ? Math.round(Ts - 20 - Math.random() * 60) : k === 1 ? Math.round(Ts + 20 + Math.random() * 200) : Ts;
        given = `P = ${P} bar, T = ${T}°C${k === 2 ? ' (dry saturated)' : ''}`; ans = k === 0 ? 'liquid' : k === 1 ? 'sup' : 'satv';
        steps = [`T<sub>sat</sub> عند ${P} bar = <b>${Ts}°C</b> (Table 8)`, `قارن: T = ${T} ${T < Ts ? '&lt;' : T > Ts ? '&gt;' : '='} T<sub>sat</sub>`];
      } else if (t === 1) {
        const k = Math.floor(Math.random() * 3); const h = k === 0 ? Math.round(hf - 50 - Math.random() * 200) : k === 1 ? Math.round(hf + (0.2 + Math.random() * 0.75) * hfg) : Math.round(hg + 50 + Math.random() * 400);
        given = `P = ${P} bar, h = ${h} kJ/kg`; ans = ['liquid', 'wet', 'sup'][k];
        steps = [`عند ${P} bar: h<sub>f</sub> = <b>${hf}</b>، h<sub>g</sub> = <b>${hg}</b> kJ/kg`, `h = ${h} ${h < hf ? '&lt; h<sub>f</sub>' : h > hg ? '&gt; h<sub>g</sub>' : 'بين h<sub>f</sub> و h<sub>g</sub> → x = ' + ((h - hf) / hfg).toFixed(3)}`];
      } else if (t === 2) {
        const k = Math.random() < 0.6 ? 1 : 2; const v = k === 1 ? +(vg * (0.3 + Math.random() * 0.65)).toPrecision(3) : +(vg * (1.1 + Math.random())).toPrecision(3);
        given = `P = ${P} bar, v = ${v} m³/kg`; ans = k === 1 ? 'wet' : 'sup';
        steps = [`عند ${P} bar: v<sub>f</sub> = ${vf}، v<sub>g</sub> = <b>${vg}</b> m³/kg`, `v = ${v} ${v > vg ? '&gt; v<sub>g</sub>' : 'بين v<sub>f</sub> و v<sub>g</sub> → x ≈ ' + ((v - vf) / (vg - vf)).toFixed(3)}`];
      } else {
        const x = [0.85, 0.9, 0.95, 1][Math.floor(Math.random() * 4)];
        given = `P = ${P} bar, x = ${x}`; ans = x === 1 ? 'satv' : 'wet';
        steps = ['x معطاة → المادة أكيد مشبعة', x === 1 ? 'x = 1 → بخار مشبع جاف (h = h<sub>g</sub>)' : `0 &lt; x &lt; 1 → رطب، h = ${hf} + ${x}(${hfg}) = ${(hf + x * hfg).toFixed(1)}`];
      }
      const b = $('.body', el);
      b.innerHTML = `<p class="statement">Given: ${given}. What is the state?</p>
        <ol><li>شنو قيمة الـ sat (أو f و g) عند هذا الضغط؟</li><li>قارن رقمك بيها.</li><li>اختار الحالة:</li></ol>
        <div class="choices">${opts.map(o => `<button class="choice" data-a="${o[0]}" style="direction:rtl;text-align:right">${o[1]}</button>`).join('')}</div><div class="fb"></div>`;
      $$('.choice', b).forEach(c => c.onclick = () => {
        if (b.dataset.done) return; b.dataset.done = 1;
        const ok = c.dataset.a === ans; sc.n++; if (ok) sc.ok++; E.store.set('det', sc);
        c.classList.add(ok ? 'right' : 'wrong'); $(`[data-a="${ans}"]`, b).classList.add('right');
        $('.fb', b).innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? 'صح ✓' : 'غلط ✗'}<ol>${steps.map(s => `<li>${s}</li>`).join('')}<li>الحالة: <b>${opts.find(o => o[0] === ans)[1]}</b></li></ol></div>`;
        score();
      });
    };
    const score = () => { $('.score', el).textContent = `نتيجتك: ${sc.ok}/${sc.n}`; };
    $('[data-new]', el).onclick = gen; gen(); score();
  });

  // ============ Interpolation trainer
  E.model('interp', el => {
    const T9 = { 1: { 200: 2875, 250: 2975, 300: 3074, 350: 3176, 400: 3278 }, 10: { 200: 2827, 225: 2886, 250: 2943, 300: 3052, 350: 3159, 375: 3211, 400: 3264, 600: 3697 }, 20: { 225: 2834, 250: 2902, 300: 3025, 350: 3139, 400: 3249, 600: 3689 }, 40: { 300: 2962, 350: 3095, 400: 3216 } };
    el.innerHTML = `<div class="model"><h3>مدرب الاستيفاء (Interpolation trainer)</h3>
      <div class="q"></div><div class="blankin"><input type="number" step="any" placeholder="h = ? kJ/kg"><button class="btn small" data-chk>تحقق</button><button class="btn small ghost" data-new>سؤال جديد</button></div><div class="fb"></div>
      <hr><b>حاسبة سريعة</b><div class="row"><label class="fld">x₁<input type="number" step="any" data-c="x1" value="350"></label><label class="fld">y₁<input type="number" step="any" data-c="y1" value="3159"></label><label class="fld">x₂<input type="number" step="any" data-c="x2" value="375"></label><label class="fld">y₂<input type="number" step="any" data-c="y2" value="3211"></label><label class="fld">x<input type="number" step="any" data-c="x" value="369.9"></label></div><div class="result calc"></div></div>`;
    let cur;
    const gen = () => {
      const Ps = Object.keys(T9); const P = Ps[Math.floor(Math.random() * Ps.length)];
      const Ts = Object.keys(T9[P]).map(Number).sort((a, b) => a - b); const i = Math.floor(Math.random() * (Ts.length - 1));
      const T1 = Ts[i], T2 = Ts[i + 1]; const T = Math.round(T1 + (0.15 + Math.random() * 0.7) * (T2 - T1));
      cur = { P, T, T1, T2, h1: T9[P][T1], h2: T9[P][T2] }; cur.h = cur.h1 + (T - T1) / (T2 - T1) * (cur.h2 - cur.h1);
      $('.q', el).innerHTML = `<p>من Table 9 عند <b>${P} bar</b>: T = ${T1}°C → h = ${cur.h1}، T = ${T2}°C → h = ${cur.h2} kJ/kg.<br>شكد h عند <b>${T}°C</b>؟</p>`;
      $('.fb', el).innerHTML = ''; $('input', $('.blankin', el)).value = '';
    };
    $('[data-chk]', el).onclick = () => {
      const v = +$('input', $('.blankin', el)).value; const ok = Math.abs(v - cur.h) < 1;
      $('.fb', el).innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? 'صح ✓' : 'مو مضبوط'} — <span class="num">\\(h = ${cur.h1} + \\frac{${cur.T} - ${cur.T1}}{${cur.T2} - ${cur.T1}}(${cur.h2} - ${cur.h1}) = ${cur.h.toFixed(1)}\\)</span></div>`;
      math($('.fb', el));
    };
    $('[data-new]', el).onclick = gen;
    const calc = () => { const g = k => +$(`[data-c="${k}"]`, el).value; const y = g('y1') + (g('x') - g('x1')) / (g('x2') - g('x1')) * (g('y2') - g('y1')); $('.calc', el).textContent = `y = ${fmt(y, 4)}`; };
    $$('[data-c]', el).forEach(i => i.oninput = calc); calc(); gen();
  });

  // ============ 3. Steam table tool
  E.model('steamtool', el => {
    const check = [
      ['Sat 0.2 bar: Tsat', () => S.tsat(20) - 273.15, 60.1, '°C'], ['Sat 0.2 bar: vg', () => S.satByP(20).g.v, 7.65, 'm³/kg'],
      ['Sat 1 bar: Tsat', () => S.tsat(100) - 273.15, 99.6, '°C'], ['Sat 1 bar: hf', () => S.satByP(100).f.h, 417.5, 'kJ/kg'], ['Sat 1 bar: hg', () => S.satByP(100).g.h, 2675.4, 'kJ/kg'], ['Sat 1 bar: vg', () => S.satByP(100).g.v, 1.694, 'm³/kg'],
      ['Sat 3 bar: ug', () => S.satByP(300).g.u, 2543.0, 'kJ/kg'], ['Sat 4 bar: hf', () => S.satByP(400).f.h, 604.7, 'kJ/kg'], ['Sat 4 bar: hg', () => S.satByP(400).g.h, 2737.6, 'kJ/kg'],
      ['Sat 5 bar: vg', () => S.satByP(500).g.v, 0.375, 'm³/kg'], ['Sat 7 bar: ug', () => S.satByP(700).g.u, 2571.1, 'kJ/kg'],
      ['Sat 10 bar: Tsat', () => S.tsat(1000) - 273.15, 179.9, '°C'], ['Sat 10 bar: vg', () => S.satByP(1000).g.v, 0.1943, 'm³/kg'], ['Sat 10 bar: hg', () => S.satByP(1000).g.h, 2776.2, 'kJ/kg'],
      ['Sat 16 bar: hf', () => S.satByP(1600).f.h, 858.6, 'kJ/kg'], ['Sat 20 bar: Tsat', () => S.tsat(2000) - 273.15, 212.4, '°C'],
      ['SH 1 bar, 200°C: h', () => S.stateFromPT(100, 473.15).h, 2875, 'kJ/kg'], ['SH 1 bar, 300°C: h', () => S.stateFromPT(100, 573.15).h, 3074, 'kJ/kg'],
      ['SH 10 bar, 400°C: h', () => S.stateFromPT(1000, 673.15).h, 3264, 'kJ/kg'], ['SH 10 bar, 600°C: h', () => S.stateFromPT(1000, 873.15).h, 3697, 'kJ/kg'],
      ['SH 20 bar, 300°C: h', () => S.stateFromPT(2000, 573.15).h, 3025, 'kJ/kg'], ['SH 40 bar, 400°C: h', () => S.stateFromPT(4000, 673.15).h, 3216, 'kJ/kg'], ['SH 60 bar, 350°C: h', () => S.stateFromPT(6000, 623.15).h, 3046, 'kJ/kg']
    ];
    el.innerHTML = `<div class="model"><h3>نموذج 3: أداة جداول البخار (IAPWS-IF97)</h3>
      <p>اكتب <b>أي خاصيتين</b> وخلي الباقي فارغ. الضغط بالـ bar والحرارة بالـ °C.</p>
      <div class="row">
        <label class="fld">P (bar)<input type="number" step="any" data-s="P" value="10"></label>
        <label class="fld">T (°C)<input type="number" step="any" data-s="T" value="400"></label>
        <label class="fld">x (0–1)<input type="number" step="any" data-s="x"></label>
        <label class="fld">h (kJ/kg)<input type="number" step="any" data-s="h"></label>
        <label class="fld">v (m³/kg)<input type="number" step="any" data-s="v"></label>
      </div>
      <div class="row" style="margin-top:8px"><button class="btn" data-go>احسب</button><button class="btn ghost" data-clr>امسح</button></div>
      <div class="out"></div>
      <details style="margin-top:12px"><summary><b>مقارنة مع جدول Haywood (${check.length} قيمة قريتها من الـ PDF)</b></summary><div class="cmp"></div>
      <p><small>الفروقات الصغيرة (1–2 kJ/kg) لأن Haywood مطبوع على معادلات 1967 و IF97 أحدث. <b>بالامتحان استخدم أرقام الجدول.</b></small></p></details></div>`;
    $('.cmp', el).innerHTML = E.table(['Property', 'Haywood', 'IF97', 'Diff'], check.map(([n, f, ref, u]) => { const v = f(); return [n, `${ref} ${u}`, `${fmt(v, ref < 1 ? 4 : 1)}`, `${fmt(v - ref, ref < 1 ? 4 : 1)}`]; }), 'given');
    const go = () => {
      const g = {}; $$('[data-s]', el).forEach(i => { if (i.value !== '') g[i.dataset.s] = +i.value; });
      const k = Object.keys(g);
      const out = $('.out', el);
      if (k.length !== 2) { out.innerHTML = `<div class="result bad">لازم خاصيتين بالضبط (هسه ${k.length}).</div>`; return; }
      const q = {};
      if ('P' in g) q.P = g.P * 100; if ('T' in g) q.T = g.T + 273.15; if ('x' in g) q.x = g.x; if ('h' in g) q.h = g.h; if ('v' in g) q.v = g.v;
      if ('x' in g && (g.x < 0 || g.x > 1)) { out.innerHTML = '<div class="result bad">x لازم بين 0 و 1.</div>'; return; }
      if ('P' in g && (g.P <= 0.00612 || g.P > 220.64)) { out.innerHTML = '<div class="result bad">الضغط لازم بين 0.0061 و 220 bar.</div>'; return; }
      let s;
      try { s = S.solve(q); } catch (e) { s = { error: 'x' }; }
      if (!s || s.error || !isFinite(s.h)) {
        out.innerHTML = `<div class="result bad">${s && s.error === 'liquid-ambiguous' ? 'السائل المضغوط ما ينحدد من T و h بس — استخدم P.' : s && s.error === 'need-P-or-T' ? 'استخدم P أو T أو x ويا خاصية ثانية.' : 'ما كدرت أحل هذي الحالة — جرب قيم ضمن الجداول.'}</div>`; return;
      }
      const names = { liquid: 'سائل مضغوط — compressed liquid', wet: 'بخار رطب — wet steam', superheated: 'بخار محمص — superheated', sat: 'مشبع' };
      const Tc = s.T - 273.15, Ts = s.Tsat ? s.Tsat - 273.15 : null;
      out.innerHTML = `<div class="result"><span class="phase-${s.phase}">${names[s.phase]}</span></div>` + E.table(['P (bar)', 'T (°C)', 'T<sub>sat</sub> (°C)', 'x', 'v (m³/kg)', 'u (kJ/kg)', 'h (kJ/kg)', 's (kJ/kg·K)'],
        [[fmt(s.P / 100, 4), fmt(Tc, 2), Ts === null ? '—' : fmt(Ts, 2), s.x === null || s.x === undefined ? '—' : fmt(s.x, 4), fmt(s.v, 5), fmt(s.u, 1), fmt(s.h, 1), fmt(s.s, 4)]], 'given') +
        (s.phase === 'superheated' && Ts !== null ? `<p>درجة التحميص (degree of superheat) = ${fmt(Tc - Ts, 1)}°C</p>` : '') +
        (s.sat ? `<p class="ltr"><small>Saturation at this P: v<sub>f</sub> = ${fmt(s.sat.f.v, 6)}, v<sub>g</sub> = ${fmt(s.sat.g.v, 4)}, h<sub>f</sub> = ${fmt(s.sat.f.h, 1)}, h<sub>fg</sub> = ${fmt(s.sat.g.h - s.sat.f.h, 1)}, h<sub>g</sub> = ${fmt(s.sat.g.h, 1)}, u<sub>f</sub> = ${fmt(s.sat.f.u, 1)}, u<sub>g</sub> = ${fmt(s.sat.g.u, 1)}</small></p>` : '');
    };
    $('[data-go]', el).onclick = go;
    $('[data-clr]', el).onclick = () => { $$('[data-s]', el).forEach(i => i.value = ''); $('.out', el).innerHTML = ''; };
    go();
  });

  // ============ 4. T–v dome
  E.model('tvdome', el => {
    const W = 640, H = 380, L = 60, Rm = 20, Tp = 20, B = 50;
    const vmin = Math.log10(0.0008), vmax = Math.log10(200), Tmax = 420;
    const X = v => L + (Math.log10(v) - vmin) / (vmax - vmin) * (W - L - Rm);
    const Y = t => H - B - t / Tmax * (H - B - Tp);
    const iv = x => Math.pow(10, vmin + (x - L) / (W - L - Rm) * (vmax - vmin));
    const iT = y => (H - B - y) / (H - B - Tp) * Tmax;
    let fl = '', gl = '';
    for (let t = 0.01; t <= 373.9; t += t < 360 ? 4 : 0.5) {
      const s = S.satByT(t + 273.15); fl += `${fl ? 'L' : 'M'}${X(s.f.v).toFixed(1)} ${Y(t).toFixed(1)} `; gl = `L${X(s.g.v).toFixed(1)} ${Y(t).toFixed(1)} ` + gl;
    }
    const dome = fl + `L${X(0.00311).toFixed(1)} ${Y(374).toFixed(1)} ` + gl.replace(/^L/, 'L');
    const isobar = Pk => {
      const ts = S.tsat(Pk) - 273.15; let d = '';
      for (let t = 1; t < ts; t += 5) d += `${d ? 'L' : 'M'}${X(S.region1(Pk, t + 273.15).v).toFixed(1)} ${Y(t).toFixed(1)} `;
      const sat = S.satByP(Pk); d += `L${X(sat.f.v).toFixed(1)} ${Y(ts).toFixed(1)} L${X(sat.g.v).toFixed(1)} ${Y(ts).toFixed(1)} `;
      for (let t = ts + 2; t <= Tmax; t += 6) d += `L${X(S.region2(Pk, t + 273.15).v).toFixed(1)} ${Y(t).toFixed(1)} `;
      return `<path d="${d}" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/><text x="${X(S.region2(Pk, (Tmax - 10) + 273.15).v) + 4}" y="${Y(Tmax - 14)}" font-size="11" fill="var(--muted)">${Pk / 100} bar</text>`;
    };
    const ticks = [0.001, 0.01, 0.1, 1, 10, 100].map(v => `<line x1="${X(v)}" y1="${H - B}" x2="${X(v)}" y2="${H - B + 5}" stroke="var(--fg)"/><text x="${X(v)}" y="${H - B + 18}" text-anchor="middle" font-size="11" fill="var(--fg)">${v}</text>`).join('') +
      [0, 100, 200, 300, 400].map(t => `<line x1="${L - 5}" y1="${Y(t)}" x2="${L}" y2="${Y(t)}" stroke="var(--fg)"/><text x="${L - 8}" y="${Y(t) + 4}" text-anchor="end" font-size="11" fill="var(--fg)">${t}</text>`).join('');
    el.innerHTML = `<div class="model"><h3>نموذج 4: مخطط T–v — اسحب النقطة الحمرا</h3>
      <div class="svgbox"><svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        <path d="${dome} Z" fill="var(--ke)" opacity=".12"/><path d="${dome}" fill="none" stroke="var(--fg)" stroke-width="2"/>
        ${[100, 1000, 5000].map(isobar).join('')}
        <line x1="${L}" y1="${H - B}" x2="${W - Rm}" y2="${H - B}" stroke="var(--fg)"/><line x1="${L}" y1="${Tp}" x2="${L}" y2="${H - B}" stroke="var(--fg)"/>${ticks}
        <text x="${(W + L) / 2}" y="${H - 8}" text-anchor="middle" font-size="12" fill="var(--fg)">v (m³/kg, log scale)</text>
        <text x="16" y="${(H - B) / 2}" font-size="12" fill="var(--fg)" transform="rotate(-90 16 ${(H - B) / 2})" text-anchor="middle">T (°C)</text>
        <text x="${X(0.0015)}" y="${Y(250)}" font-size="12" fill="var(--w)">liquid</text>
        <text x="${X(0.05)}" y="${Y(120)}" font-size="12" fill="var(--ke)">wet (liquid + vapor)</text>
        <text x="${X(20)}" y="${Y(300)}" font-size="12" fill="var(--q)">superheated</text>
        <text x="${X(0.0035)}" y="${Y(385)}" font-size="11" fill="var(--fg)">critical point</text>
        <circle class="pt" r="9" fill="var(--q)" stroke="#fff" stroke-width="2" style="cursor:grab"/>
      </svg></div><div class="info"></div><div class="qbar"><i></i><b></b></div><p><small>الشريط: أزرق = سائل، أحمر = بخار (يمثل x)</small></p></div>`;
    const svg = $('svg', el), pt = $('.pt', el);
    let st = { v: 0.5, T: 150 };
    const upd = () => {
      pt.setAttribute('cx', X(st.v)); pt.setAttribute('cy', Y(st.T));
      let ph, x = null, Pb = null;
      if (st.T >= 373.9) { ph = 'supercritical / superheated'; }
      else {
        const s = S.satByT(st.T + 273.15);
        if (st.v < s.f.v * 1.002) { ph = 'compressed liquid'; x = 0; Pb = null; }
        else if (st.v <= s.g.v) { x = (st.v - s.f.v) / (s.g.v - s.f.v); ph = 'wet'; Pb = s.P / 100; }
        else { ph = 'superheated'; x = 1; const r = S.solve({ T: st.T + 273.15, v: st.v }); Pb = r && r.P ? r.P / 100 : null; }
      }
      const cls = ph.indexOf('wet') === 0 ? 'wet' : ph.indexOf('liquid') >= 0 ? 'liquid' : 'superheated';
      $('.info', el).innerHTML = `<div class="result"><span class="phase-${cls}">${{ wet: 'رطب', liquid: 'سائل مضغوط', superheated: 'محمص' }[cls]} (${ph})</span> · T = ${st.T.toFixed(0)}°C · v = ${fmt(st.v, 4)} m³/kg${Pb ? ` · P ≈ ${fmt(Pb, 3)} bar` : ''}${x !== null && cls === 'wet' ? ` · x = ${x.toFixed(3)}` : ''}</div>`;
      const xx = x === null ? 1 : x; $('.qbar i', el).style.width = (1 - xx) * 100 + '%'; $('.qbar b', el).style.width = xx * 100 + '%';
    };
    let dragging = false;
    const move = e => {
      const r = svg.getBoundingClientRect(); const sx = (e.clientX - r.left) / r.width * W, sy = (e.clientY - r.top) / r.height * H;
      st.v = iv(Math.min(W - Rm, Math.max(L, sx))); st.T = Math.min(Tmax - 5, Math.max(1, iT(Math.min(H - B, Math.max(Tp, sy))))); upd();
    };
    svg.addEventListener('pointerdown', e => { dragging = true; svg.setPointerCapture(e.pointerId); move(e); });
    svg.addEventListener('pointermove', e => { if (dragging) move(e); });
    svg.addEventListener('pointerup', () => { dragging = false; });
    upd();
  });

  // ============ 6. MEB pipe
  E.model('meb', el => {
    const sl = [['V', 'التدفق V̇ (m³/s)', 0.005, 0.5, 0.005, 0.3], ['dz', 'Δz (m)', 0, 300, 1, 152], ['dP', 'ΔP (bar)', 0, 20, 0.5, 0], ['D', 'القطر D (m)', 0.05, 0.5, 0.01, 0.15], ['F', 'الاحتكاك F (J/kg)', 0, 300, 5, 80], ['eta', 'الكفاءة η', 0.3, 1, 0.01, 1], ['rho', 'الكثافة ρ (kg/m³)', 1, 1200, 1, 1000]];
    el.innerHTML = `<div class="model"><h3>نموذج 6: بحيرة → مضخة → خزان مرتفع (MEB)</h3>
      <div class="svgbox"><svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(990)}
        <path d="M10 140 Q50 132 110 140 L110 175 L10 175 Z" class="water"/><path class="st" d="M60 160 L60 120 L150 120"/>
        <circle cx="170" cy="120" r="18" fill="var(--accent-soft)" stroke="var(--fg)"/><text x="170" y="125" text-anchor="middle" class="nm">P</text>
        <path class="st meb-pipe" d="M188 120 L420 40 L470 40"/><rect class="meb-tank" x="470" y="10" width="70" height="60" fill="var(--accent-soft)" stroke="var(--fg)"/>
        <text class="meb-dz" x="430" y="100" class="lb" font-size="12" fill="var(--fg)">Δz</text></svg></div>
      <div class="row"><button class="btn small ghost" data-pre="11">مثال 1.11</button><button class="btn small ghost" data-pre="12">مثال 1.12</button><button class="btn small ghost" data-pre="co2">Final 2023 CO₂</button></div>
      <div class="row">${sl.map(s => `<label class="fld">${s[1]}: <b data-o="${s[0]}"></b><input type="range" min="${s[2]}" max="${s[3]}" step="${s[4]}" value="${s[5]}" data-k="${s[0]}"></label>`).join('')}</div>
      <div class="vbars"></div><div class="math eqline"></div><div class="result"></div></div>`;
    const pre = { 11: { V: 0.3, dz: 152, dP: 0, D: 0.15, F: 80, eta: 1, rho: 1000 }, 12: { V: 0.0315, dz: 0, dP: 15, D: 0.5, F: 0, eta: 0.7, rho: 1000 }, co2: { V: 0.0315, dz: 0, dP: 16, D: 0.5, F: 0, eta: 1, rho: 1.98 } };
    const calc = () => {
      const g = {}; $$('[data-k]', el).forEach(i => { g[i.dataset.k] = +i.value; $(`[data-o="${i.dataset.k}"]`, el).textContent = i.value; });
      const A = Math.PI * g.D * g.D / 4, u = g.V / A, m = g.rho * g.V;
      const tP = g.dP * 1e5 / g.rho, tK = u * u / 2, tZ = 9.81 * g.dz, tF = g.F, w = tP + tK + tZ + tF;
      const Wi = m * w / 1000, Wa = Wi / g.eta;
      const rows = [['ΔP/ρ', tP, 'var(--w)'], ['Δυ²/2', tK, 'var(--ke)'], ['gΔz', tZ, 'var(--pe)'], ['F', tF, 'var(--q)']];
      const mx = Math.max(1, ...rows.map(r => r[1]));
      $('.vbars', el).innerHTML = rows.map(r => `<div class="r"><b>${r[0]}</b><div class="track"><i style="background:${r[2]};left:50%;width:${r[1] / mx * 50}%"></i></div><span>${fmt(r[1], 1)} J/kg</span></div>`).join('');
      $('.eqline', el).innerHTML = `\\[-\\frac{W_s}{\\dot m} = ${fmt(tP, 1)} + ${fmt(tK, 1)} + ${fmt(tZ, 1)} + ${fmt(tF, 1)} = ${fmt(w, 1)}\\ \\text{J/kg}\\]`; math($('.eqline', el));
      $('.result', el).innerHTML = `υ = ${fmt(u, 2)} m/s · ṁ = ${fmt(m, 3)} kg/s<br>الشغل النظري = <b>${fmt(Wi, 2)} kW</b> (${fmt(Wi / 0.7457, 1)} hp) · الفعلي (÷η) = <b>${fmt(Wa, 2)} kW = ${fmt(Wa / 0.7457, 1)} hp</b>`;
      $('.meb-dz', el).textContent = `Δz = ${g.dz} m`;
    };
    $$('[data-k]', el).forEach(i => i.oninput = calc);
    $$('[data-pre]', el).forEach(b => b.onclick = () => { const p = pre[b.dataset.pre]; Object.keys(p).forEach(k => $(`[data-k="${k}"]`, el).value = p[k]); calc(); });
    calc();
  });

  // ============ unit converter
  E.model('unitconv', el => {
    const U = {
      'طاقة': { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Btu: 1055.06, 'ft·lbf': 1.35582, 'L·atm': 101.325 },
      'قدرة': { W: 1, kW: 1000, hp: 745.7, 'Btu/h': 0.29307, 'kJ/h': 1000 / 3600, 'kcal/h': 4184 / 3600 },
      'ضغط': { Pa: 1, kPa: 1000, bar: 1e5, atm: 101325, psi: 6894.76, MPa: 1e6, mmHg: 133.322 },
      'طول': { m: 1, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254 },
      'كتلة': { kg: 1, g: 0.001, lbm: 0.45359237 },
      'سرعة': { 'm/s': 1, 'km/h': 1 / 3.6, 'ft/s': 0.3048 },
      'حرارة': { '°C': 'C', K: 'K', '°F': 'F', '°R': 'R' }
    };
    el.innerHTML = `<div class="model"><h3>محوّل الوحدات</h3><div class="row"><label class="fld">النوع<select data-cat>${Object.keys(U).map(k => `<option>${k}</option>`).join('')}</select></label>
      <label class="fld">القيمة<input type="number" step="any" value="1" data-val></label><label class="fld">من<select data-from></select></label></div><div class="out"></div></div>`;
    const toK = (v, u) => u === 'C' ? v + 273.15 : u === 'K' ? v : u === 'F' ? (v - 32) / 1.8 + 273.15 : v / 1.8;
    const fromK = (k, u) => u === 'C' ? k - 273.15 : u === 'K' ? k : u === 'F' ? (k - 273.15) * 1.8 + 32 : k * 1.8;
    const fill = () => { const c = $('[data-cat]', el).value; $('[data-from]', el).innerHTML = Object.keys(U[c]).map(u => `<option>${u}</option>`).join(''); run(); };
    const run = () => {
      const c = $('[data-cat]', el).value, v = +$('[data-val]', el).value, f = $('[data-from]', el).value, t = U[c];
      const rows = Object.keys(t).map(u => [u, c === 'حرارة' ? fmt(fromK(toK(v, t[f]), t[u]), 4) : fmt(v * t[f] / t[u], 6)]);
      $('.out', el).innerHTML = E.table(['Unit', 'Value'], rows, 'given');
    };
    $('[data-cat]', el).onchange = fill; $('[data-val]', el).oninput = run; $('[data-from]', el).onchange = run; fill();
  });

  // ============ Quiz bank
  const norm = s => s.toLowerCase().replace(/[δΔ]/g, 'δ').replace(/delta\s*/g, 'δ').replace(/[^a-zδ\s]/g, ' ').replace(/\s+/g, ' ').trim();
  E.model('quizbank', el => {
    const md = mode();
    const qs = shuffle([
      ...E.mcq.filter(q => md === 'mid' || q.scope !== 'mid').map(q => Object.assign({ t: 'mcq' }, q)),
      ...E.blanks.filter(q => md === 'mid' || q.scope !== 'mid').map(q => Object.assign({ t: 'blank' }, q))
    ]);
    const best = E.store.get('best_' + md, null);
    el.innerHTML = `<div class="model"><div class="row"><b class="score"></b><span>${best !== null ? `أعلى نتيجة (${md === 'mid' ? 'ميد' : 'كوز'}): ${best}%` : ''}</span><button class="btn small ghost" data-re>خلط من جديد</button></div><div class="qs"></div></div>`;
    let ok = 0, n = 0;
    const sc = () => { $('.score', el).textContent = `النتيجة: ${ok}/${n} من ${qs.length}`; if (n === qs.length) { const p = Math.round(ok / n * 100); const b = E.store.get('best_' + md, 0); if (p > b) E.store.set('best_' + md, p); } };
    $('.qs', el).innerHTML = qs.map((q, i) => q.t === 'mcq'
      ? `<div class="qcard" data-i="${i}"><div class="qtext">${i + 1}. ${q.q}</div><small class="qar">${q.src}${q.scope === 'mid' ? ' · <span class="tag new">ميد</span>' : ''}</small><div class="choices">${shuffle(q.c.map((c, j) => [c, j])).map(([c, j]) => `<button class="choice" data-j="${j}">${c}</button>`).join('')}</div><div class="fb"></div></div>`
      : `<div class="qcard" data-i="${i}"><div class="qtext">${i + 1}. ${q.q.replace(/___/g, '<u>&nbsp;&nbsp;?&nbsp;&nbsp;</u>')}</div><small class="qar">Fill in the blank · ${q.src}</small><div class="blankin">${q.a.map((_, k) => `<input type="text" placeholder="blank ${k + 1}" autocomplete="off" autocapitalize="off">`).join('')}<button class="btn small" data-chk>تحقق</button></div><div class="fb"></div></div>`).join('');
    $$('.qcard', el).forEach(card => {
      const q = qs[+card.dataset.i];
      if (q.t === 'mcq') {
        $$('.choice', card).forEach(b => b.onclick = () => {
          if (card.dataset.done) return; card.dataset.done = 1; n++;
          const right = +b.dataset.j === q.a; if (right) ok++;
          b.classList.add(right ? 'right' : 'wrong'); $(`.choice[data-j="${q.a}"]`, card).classList.add('right');
          $('.fb', card).innerHTML = `<div class="feedback ${right ? 'ok' : 'no'}">${right ? 'صح ✓' : 'غلط ✗'} — ${q.why}</div>`; sc();
        });
      } else {
        $('[data-chk]', card).onclick = () => {
          if (card.dataset.done) return; card.dataset.done = 1; n++;
          const ins = $$('input', card); const used = new Set();
          const res = ins.map((inp, k) => { const v = norm(inp.value); const acc = q.a[k].map(norm); const hit = acc.includes(v) && !used.has(v); if (hit) used.add(v); return hit; });
          const right = res.every(Boolean); if (right) ok++;
          ins.forEach((inp, k) => { inp.style.borderColor = res[k] ? 'var(--ok)' : 'var(--bad)'; });
          $('.fb', card).innerHTML = `<div class="feedback ${right ? 'ok' : 'no'}">${right ? 'صح ✓' : 'الجواب:'} <span class="ltr"><b>${q.a.map(a => a[0]).join(' / ')}</b></span></div>`; sc();
        };
      }
    });
    $('[data-re]', el).onclick = () => E.models.quizbank(el);
    sc();
  });

  E.model('flash', el => {
    const md = mode();
    const cards = shuffle(E.blanks.filter(q => md === 'mid' || q.scope !== 'mid'));
    el.innerHTML = `<div class="grid">${cards.map(c => {
      let k = 0; const filled = c.q.replace(/___/g, () => `<b style="color:var(--ok)">${c.a[k++][0]}</b>`);
      return `<div class="flash"><div class="face front"><small>${c.src}</small><p class="ltr">${c.q}</p><small>اضغط للقلب</small></div><div class="face back"><p class="ltr">${filled}</p></div></div>`;
    }).join('')}</div>`;
    $$('.flash', el).forEach(f => f.onclick = () => f.classList.toggle('flipped'));
  });
})();
