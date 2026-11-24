(function () {
  const E = window.EB;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const fmt = (v, d) => E.fmt(v, d);
  const math = el => E.renderMath && E.renderMath(el);
  const integ = (k, T1, T2) => k.reduce((s, c, i) => s + c / (i + 1) * (Math.pow(T2, i + 1) - Math.pow(T1, i + 1)), 0);
  const cpAt = (k, T) => k.reduce((s, c, i) => s + c * Math.pow(T, i), 0);

  // ============ 7. Cp integrator + Cp unit converter
  E.model('cpint', el => {
    const P = {
      ac_l: ['Acetone (l) — J/mol·°C', [123.0, 0.186, 0, 0], 10, 50],
      bz_l: ['Benzene (l) — J/mol·°C', [126.5, 0.234, 0, 0], 10, 50],
      mix: ['70% acetone + 30% benzene (Ex 1.19)', [124.05, 0.2004, 0, 0], 10, 50],
      ex14: ['Ex 1.14 fluid Cv — kJ/kg·°C', [0.855, 9.42e-4, 0, 0], 20, 150],
      ac_g: ['Acetone (g) — J/mol·°C', [71.96, 0.201, -1.278e-4, 3.476e-8], 100, 400],
      c2h2: ['Acetylene (g) — J/mol·°C', [42.43, 0.06053, -5.033e-5, 1.82e-8], 25, 500],
      co2: ['CO₂ (g) — J/mol·°C', [36.11, 0.04233, -2.887e-5, 7.464e-9], 25, 500],
      air: ['Air (g, °C form) — J/mol·°C', [28.94, 0.004147, 0.3191e-5, -1.965e-9], 25, 500]
    };
    el.innerHTML = `<div class="model"><h3>نموذج 7: مكامل السعة الحرارية — المساحة المظللة هي Δh</h3>
      <div class="row"><label class="fld">المادة<select data-p>${Object.keys(P).map(k => `<option value="${k}">${P[k][0]}</option>`).join('')}</select></label></div>
      <div class="row">${['a', 'b', 'c', 'd'].map((k, i) => `<label class="fld">${k}<input type="number" step="any" data-k="${i}"></label>`).join('')}</div>
      <div class="row"><label class="fld">T₁ (°C): <b data-o="1"></b><input type="range" min="-30" max="600" step="1" data-t="1"></label>
      <label class="fld">T₂ (°C): <b data-o="2"></b><input type="range" min="-30" max="600" step="1" data-t="2"></label></div>
      <label class="donebox" style="font-weight:400"><input type="checkbox" data-trap> جرّب الغلط: عوّض بالكلفن بمعادلة وحدتها °C</label>
      <div class="svgbox"><svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg"></svg></div>
      <div class="math out"></div><div class="result res"></div>
      <hr><h3>محوّل وحدات معادلة C<sub>p</sub></h3>
      <p>اكتب المعاملات ووحداتها، واختار الوحدات الجديدة. (طريقة الحل: عوّض T القديمة بدلالة الجديدة وافتح الأقواس، بعدين اضرب بمعامل وحدة C<sub>p</sub>.)</p>
      <div class="row">${['a', 'b', 'c', 'd'].map((k, i) => `<label class="fld">${k}<input type="number" step="any" data-cv="${i}"></label>`).join('')}</div>
      <div class="row">
        <label class="fld">T من<select data-tf><option>°C</option><option>K</option><option selected>°F</option><option>°R</option></select></label>
        <label class="fld">T إلى<select data-tt><option>°C</option><option selected>K</option><option>°F</option><option>°R</option></select></label>
        <label class="fld">Cp من<select data-uf></select></label><label class="fld">Cp إلى<select data-ut></select></label>
      </div>
      <div class="row"><button class="btn small ghost" data-acet>مثال Final 2025 (الأستيلين)</button></div>
      <div class="math conv"></div></div>`;
    const svg = $('svg', el);
    const get = () => [0, 1, 2, 3].map(i => +$(`[data-k="${i}"]`, el).value || 0);
    const draw = () => {
      const k = get(); let T1 = +$('[data-t="1"]', el).value, T2 = +$('[data-t="2"]', el).value;
      $('[data-o="1"]', el).textContent = T1; $('[data-o="2"]', el).textContent = T2;
      const trap = $('[data-trap]', el).checked, off = trap ? 273.15 : 0;
      const lo = Math.min(T1, T2) - 20, hi = Math.max(T1, T2) + 20;
      const ys = []; for (let i = 0; i <= 60; i++) { const T = lo + (hi - lo) * i / 60; ys.push([T, cpAt(k, T)]); }
      const ymin = Math.min(0, ...ys.map(p => p[1])), ymax = Math.max(...ys.map(p => p[1])) * 1.1 || 1;
      const X = T => 50 + (T - lo) / (hi - lo) * 530, Y = c => 230 - (c - ymin) / (ymax - ymin) * 210;
      const a = Math.min(T1, T2), b = Math.max(T1, T2);
      let area = `M${X(a)} ${Y(ymin)} `; for (let i = 0; i <= 40; i++) { const T = a + (b - a) * i / 40; area += `L${X(T)} ${Y(cpAt(k, T))} `; } area += `L${X(b)} ${Y(ymin)} Z`;
      svg.innerHTML = `<path d="${area}" fill="var(--mid)" opacity=".25"/><path d="${ys.map((p, i) => (i ? 'L' : 'M') + X(p[0]) + ' ' + Y(p[1])).join(' ')}" fill="none" stroke="var(--mid)" stroke-width="2.5"/>
        <line x1="50" y1="230" x2="580" y2="230" stroke="var(--fg)"/><line x1="50" y1="15" x2="50" y2="230" stroke="var(--fg)"/>
        ${[lo, (lo + hi) / 2, hi].map(T => `<text x="${X(T)}" y="248" text-anchor="middle" font-size="12" fill="var(--fg)">${fmt(T, 0)}°C</text>`).join('')}
        <text x="45" y="${Y(ymax / 1.1)}" text-anchor="end" font-size="11" fill="var(--fg)">${fmt(ymax / 1.1, 3)}</text>
        <text x="45" y="${Y(ymin)}" text-anchor="end" font-size="11" fill="var(--fg)">${fmt(ymin, 2)}</text>
        <text x="${(X(a) + X(b)) / 2}" y="${Y(cpAt(k, (a + b) / 2)) / 2 + 115}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--mid)">Δh</text>
        <text x="60" y="18" font-size="12" fill="var(--muted)">Cp</text>`;
      const t1 = T1 + off, t2 = T2 + off;
      const terms = k.map((c, i) => c / (i + 1) * (Math.pow(t2, i + 1) - Math.pow(t1, i + 1)));
      const tot = terms.reduce((s, x) => s + x, 0), right = integ(k, T1, T2);
      $('.out', el).innerHTML = `\\[\\Delta h = ${fmt(k[0], 6)}(${fmt(t2, 2)}-${fmt(t1, 2)}) + \\tfrac{${fmt(k[1], 6)}}{2}(\\cdots) + \\tfrac{${fmt(k[2], 6)}}{3}(\\cdots) + \\tfrac{${fmt(k[3], 6)}}{4}(\\cdots)\\]`;
      math($('.out', el));
      $('.res', el).className = 'result res' + (trap ? ' bad' : '');
      $('.res', el).innerHTML = `<div class="ltr">a-term = ${fmt(terms[0], 2)} · b-term = ${fmt(terms[1], 2)} · c-term = ${fmt(terms[2], 2)} · d-term = ${fmt(terms[3], 2)}</div><div class="ltr">Δh = ${fmt(tot, 2)} &nbsp;(Cp unit × degree) · average Cp = ${fmt(tot / (t2 - t1 || 1), 3)}</div>` +
        (trap ? `<div>⚠️ الجواب الصحيح: <span class="ltr">${fmt(right, 2)}</span> — يعني الغلط <span class="ltr">${fmt((tot / right - 1) * 100, 0)}%</span></div>` : '');
    };
    const load = key => { const p = P[key]; p[1].forEach((v, i) => { $(`[data-k="${i}"]`, el).value = v; }); $('[data-t="1"]', el).value = p[2]; $('[data-t="2"]', el).value = p[3]; draw(); };
    $('[data-p]', el).onchange = e => load(e.target.value);
    $$('[data-k], [data-t], [data-trap]', el).forEach(i => { i.oninput = draw; i.onchange = draw; });
    $('[data-p]', el).value = 'mix'; load('mix');

    // converter
    const U = { 'J/(mol·K)': 1, 'kJ/(kmol·K)': 1, 'cal/(mol·K)': 4.184, 'Btu/(lbmol·°F)': 4.184, 'kJ/(mol·K)': 1000 };
    $('[data-uf]', el).innerHTML = Object.keys(U).map(u => `<option${u === 'Btu/(lbmol·°F)' ? ' selected' : ''}>${u}</option>`).join('');
    $('[data-ut]', el).innerHTML = Object.keys(U).map(u => `<option${u === 'J/(mol·K)' ? ' selected' : ''}>${u}</option>`).join('');
    const TS = { '°C': [1, 273.15], K: [1, 0], '°F': [1 / 1.8, 459.67 / 1.8], '°R': [1 / 1.8, 0] };
    const binom = (n, r) => { let x = 1; for (let i = 1; i <= r; i++) x = x * (n - r + i) / i; return x; };
    const conv = () => {
      const k = [0, 1, 2, 3].map(i => +$(`[data-cv="${i}"]`, el).value || 0);
      const [so, oo] = TS[$('[data-tf]', el).value], [sn, on] = TS[$('[data-tt]', el).value];
      const al = sn / so, be = (on - oo) / so;
      const f = U[$('[data-uf]', el).value] / U[$('[data-ut]', el).value];
      const nk = [0, 1, 2, 3].map(j => { let s = 0; for (let i = j; i < 4; i++) s += k[i] * binom(i, j) * Math.pow(al, j) * Math.pow(be, i - j); return s * f; });
      const tx = v => { const a = Math.abs(v); if (a !== 0 && a < 1e-2) { const [m, e] = a.toExponential(4).split('e'); return `${m}\\times10^{${+e}}`; } return fmt(a, 4); };
      const term = (c, i) => i === 0 ? (c < 0 ? '-' : '') + tx(c) : `${c < 0 ? '-' : '+'} ${tx(c)}\\,T${i > 1 ? '^' + i : ''}`;
      $('.conv', el).innerHTML = `\\[T_{old} = ${fmt(al, 4)}\\,T_{new} ${be < 0 ? '-' : '+'} ${fmt(Math.abs(be), 2)},\\qquad \\times ${fmt(f, 4)}\\]\\[C_p = ${nk.map(term).filter((t, i) => i === 0 || nk[i] !== 0).join(' ')}\\]`;
      math($('.conv', el));
    };
    $$('[data-cv], [data-tf], [data-tt], [data-uf], [data-ut]', el).forEach(i => { i.oninput = conv; i.onchange = conv; });
    $('[data-acet]', el).onclick = () => { [9.89, 0.8273e-2, -0.3783e-5, 0].forEach((v, i) => { $(`[data-cv="${i}"]`, el).value = v; }); $('[data-tf]', el).value = '°F'; $('[data-tt]', el).value = 'K'; $('[data-uf]', el).value = 'Btu/(lbmol·°F)'; $('[data-ut]', el).value = 'J/(mol·K)'; conv(); };
    $('[data-acet]', el).onclick();
  });

  // ============ 8. Phase-change staircase
  E.model('stairs', el => {
    const S = {
      water: { n: 'Water', Tb: 100.0, Hv: 40.656, l: [75.4, 0, 0, 0], g: [33.46, 0.688e-2, 0.7604e-5, -3.593e-9], T1: 25, T2: 150 },
      acetone: { n: 'Acetone', Tb: 56.05, Hv: 30.2, l: [123.0, 0.186, 0, 0], g: [71.96, 0.201, -1.278e-4, 3.476e-8], T1: 25, T2: 100 },
      benzene: { n: 'Benzene', Tb: 80.11, Hv: 30.76, l: [126.5, 0.234, 0, 0], g: [74.06, 0.3295, -2.52e-4, 7.757e-8], T1: 25, T2: 150 }
    };
    el.innerHTML = `<div class="model"><h3>نموذج 8: درج تغير الطور — الحرارة مقابل الإنثالبي، لكل 1 mol عند 1 atm</h3>
      <div class="row"><label class="fld">المادة<select data-s>${Object.keys(S).map(k => `<option value="${k}">${S[k].n}</option>`).join('')}</select></label>
      <label class="fld">T₁ سائل (°C): <b data-o="1"></b><input type="range" step="1" data-t="1"></label>
      <label class="fld">T₂ بخار (°C): <b data-o="2"></b><input type="range" step="1" data-t="2"></label></div>
      <div class="svgbox stairs"><svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"></svg></div>
      <div class="result res"></div>
      <p><small>للأسيتون والبنزين: درجة الغليان وحرارة التبخر من Table A.1 بالكتاب، والسعة الحرارية من A.2. للماي: السعة الحرارية للسائل 75.4 J/mol·°C، وحرارة التبخر 40.656 kJ/mol وهي h<sub>fg</sub> × 18.015.</small></p></div>`;
    const svg = $('svg', el);
    let cur;
    const draw = () => {
      const s = S[cur], T1 = +$('[data-t="1"]', el).value, T2 = +$('[data-t="2"]', el).value;
      $('[data-o="1"]', el).textContent = T1; $('[data-o="2"]', el).textContent = T2;
      const h1 = integ(s.l, T1, s.Tb) / 1000, h2 = s.Hv, h3 = integ(s.g, s.Tb, T2) / 1000, tot = h1 + h2 + h3;
      const X = h => 60 + h / tot * 510, Y = T => 250 - (T - (T1 - 10)) / ((T2 + 10) - (T1 - 10)) * 225;
      const pts = [];
      for (let i = 0; i <= 20; i++) { const T = T1 + (s.Tb - T1) * i / 20; pts.push([integ(s.l, T1, T) / 1000, T]); }
      pts.push([h1 + h2, s.Tb]);
      for (let i = 1; i <= 20; i++) { const T = s.Tb + (T2 - s.Tb) * i / 20; pts.push([h1 + h2 + integ(s.g, s.Tb, T) / 1000, T]); }
      const lab = (x, y, t, c, a) => `<text x="${x}" y="${y}" text-anchor="${a || 'middle'}" font-size="12" font-weight="700" fill="${c}">${t}</text>`;
      svg.innerHTML = `<line x1="60" y1="250" x2="580" y2="250" stroke="var(--fg)"/><line x1="60" y1="10" x2="60" y2="250" stroke="var(--fg)"/>
        <line x1="60" y1="${Y(s.Tb)}" x2="580" y2="${Y(s.Tb)}" stroke="var(--muted)" stroke-dasharray="4 4"/>
        <path d="${pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ')}" fill="none" stroke="var(--mid)" stroke-width="3"/>
        ${lab(X(h1 / 2) + 10, Y((T1 + s.Tb) / 2), `① ${fmt(h1, 2)} kJ`, 'var(--w)', 'start')}
        ${lab(X(h1 + h2 / 2), Y(s.Tb) - 8, `② Δhᵥ = ${fmt(h2, 2)} kJ`, 'var(--ke)')}
        ${lab(X(h1 + h2) - 8, Y((s.Tb + T2) / 2), `③ ${fmt(h3, 2)} kJ`, 'var(--q)', 'end')}
        ${lab(55, Y(s.Tb) + 4, `Tb ${s.Tb}°C`, 'var(--fg)', 'end')}${lab(55, Y(T1) + 4, `${T1}`, 'var(--fg)', 'end')}${lab(55, Y(T2) + 4, `${T2}`, 'var(--fg)', 'end')}
        ${lab(320, 272, 'H (kJ/mol) →', 'var(--muted)')}${lab(70, 22, 'T (°C)', 'var(--muted)', 'start')}`;
      $('.res', el).innerHTML = `<ol style="margin:0"><li>سخّن السائل من ${T1} إلى ${s.Tb}°C: <b>${fmt(h1, 3)} kJ/mol</b></li><li>بخّر عند درجة الغليان: <b>${fmt(h2, 3)} kJ/mol</b></li><li>سخّن البخار من ${s.Tb} إلى ${T2}°C: <b>${fmt(h3, 3)} kJ/mol</b></li></ol>المجموع: <b>${fmt(tot, 3)} kJ/mol</b>، والحرارة الكامنة ${fmt(h2 / tot * 100, 0)}% منه.`;
    };
    const load = k => {
      cur = k; const s = S[k];
      const a = $('[data-t="1"]', el), b = $('[data-t="2"]', el);
      a.min = 0; a.max = Math.floor(s.Tb) - 1; a.value = s.T1; b.min = Math.ceil(s.Tb) + 1; b.max = 300; b.value = s.T2; draw();
    };
    $('[data-s]', el).onchange = e => load(e.target.value);
    $$('[data-t]', el).forEach(i => i.oninput = draw);
    load('water');
  });
})();
