(function () {
  const R = String.raw, E = window.EB, H = window.Haywood;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const f = (v, d) => E.fmt(v, d);
  const T9rows = () => Object.keys(H.H9).map(Number).sort((a, b) => a - b);
  const isLiq = (T, j) => T < H.SAT9.t[j];
  const bar = mn => +(mn * 10).toPrecision(6);

  E.page({
    id: 'tables', group: 'كوز + ميد', title: 'شلون أستعمل جداول البخار', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>شلون أستعمل جداول البخار (Haywood) خطوة بخطوة</h1>
<p>هاي الصفحة تعلمك تقرا الجدول الورقي اللي تاخذه بالامتحان. الجداول هنا <b>منقولة من نفس كتاب Haywood</b> (مقتطف)، وتكدر تضغط على أي خانة حتى يشرحلك شلون انقرت.</p>

<div data-model="tour"></div>
${E.calcTips}

<h2>الخطوة 1: أي جدول أفتح؟</h2>
${E.table(['عندك بالسؤال', 'الجدول', 'مثال'], [
  ['ضغط + "saturated" أو "wet" أو جودة x', '<b>Table 8</b> (مشبع حسب الضغط)', '"saturated steam at 3 bar"، "wet steam at 4 bar"، "x = 0.9 at 10 bar"'],
  ['حرارة + "saturated" (لحد 100°C)', '<b>Table 7</b> (مشبع حسب الحرارة)', '"saturated water at 45°C"'],
  ['ضغط + حرارة، والبخار محمص', '<b>Table 9</b> (الإنثالبي h)', '"steam at 10 bar and 400°C"'],
  ['تحتاج v للمحمص', '<b>Table 11</b> (الكثافة ρ) ← v = 1/ρ', '"v at 20 bar and 300°C"'],
  ['تحتاج u للمحمص', '<b>Table 12</b>، أو احسبها: u = h − Pv', '']
])}
<div class="box tip"><strong>🧠 حيلة</strong> إذا السؤال يكول <b>saturated / wet / quality / dry</b> → Table 8. إذا يعطيك <b>P و T</b> → أول شي قارن T بـ T<sub>sat</sub> من Table 8، وإذا أكبر روح لـ Table 9.</div>

<h2>الخطوة 2: حوّل الضغط لوحدة الجدول</h2>
<p>Haywood يكتب الضغط بالـ <b>MN/m²</b> (= MPa). الصفحة الأولى من Table 8 بالـ <b>kN/m²</b> (= kPa).</p>
${E.table(['بالسؤال', 'بالجدول', 'وين تدوره'], [
  ['1 bar', '0.10 MN/m²', 'Table 8 — سطر 0.10'],
  ['1 atm', '101.325 kN/m² = 0.101325 MN/m²', 'Table 8 — سطر خاص مكتوب "1 atm"'],
  ['4 bar', '0.40 MN/m²', 'سطر 0.40'],
  ['10 bar', '<b>1.00 MN/m²</b>', 'سطر 1.00 — <b>مو</b> سطر "10" بالصفحة الأولى (ذاك 10 kN/m² = 0.1 bar!)'],
  ['20 kPa', '20 kN/m² = 0.020 MN/m²', 'الصفحة الأولى، سطر 20'],
  ['0.5 MPa', '0.50 MN/m²', 'سطر 0.50']
])}
<div class="box warn"><strong>⚠️ gauge؟</strong> إذا الضغط مكتوب gauge، اجمع 1.013 bar قبل ما تدور بالجدول: 16 bar gauge = 17.01 bar abs → سطر 1.7 MN/m².</div>

<h2>الخطوة 3: Table 8 — البخار المشبع (اختار ضغط)</h2>
<p>كل سطر = ضغط واحد. <b>Water</b> = سائل مشبع (f)، <b>Steam</b> = بخار مشبع (g)، و<b>Evaporation</b> = h<sub>fg</sub> (حرارة التبخر). اكتب ضغط أو اضغط على سطر.</p>
<div data-model="tbl8"></div>

<h2>الخطوة 4: Table 9 — البخار المحمص (اضغط على أي خانة)</h2>
<p>جدول بعدين: <b>الأعمدة = الضغط</b> (MN/m² وتحته bar)، و<b>السطور = الحرارة °C</b>. الخانات <span style="background:var(--warn-soft);padding:0 6px;border-radius:4px">البرتقالية</span> = بخار محمص، و<span style="background:var(--accent-soft);padding:0 6px;border-radius:4px">الزرقاء</span> = سائل مضغوط. الخط بيناتهم هو "الخط المدرّج" اللي تشوفه بالجدول الورقي.</p>
<div data-model="tbl9"></div>

<h2>الخطوة 5: الاستيفاء — إذا الرقم مو موجود بالجدول</h2>
${E.eq(R`y = y_1 + \frac{x - x_1}{x_2 - x_1}\,(y_2 - y_1)`, {
  mean: 'خذ السطرين اللي يحيطون رقمك، واحسب "كم قطعت من المسافة بيناتهم"، واضربه بفرق القيم.',
  when: 'T أو P مو موجودة بالضبط بالجدول.',
  trick: '<b>القيمة الأولى + (الكسر × الفرق)</b>. الكسر دائماً بين 0 و 1 — إذا طلع أكبر من 1 فأنت مختار سطور غلط.'
})}
<div class="card"><b>استيفاء مرة وحدة (على الحرارة)</b> — 10 bar و 369.9°C:
<ol>
<li>عمود 1 MN/m² (10 bar). 369.9 بين سطر 350 وسطر 375.</li>
<li>عند 350 → 3159 · عند 375 → 3211.</li>
<li>الكسر = (369.9 − 350) ÷ (375 − 350) = 0.796</li>
<li>h = 3159 + 0.796 × (3211 − 3159) = <b>3200.4 kJ/kg</b></li>
</ol></div>
<div class="card"><b>استيفاء مرتين (على الحرارة وبعدين على الضغط)</b> — 12 bar و 240°C:
<ol>
<li>بعمود 1 MN/m²: بين 225 (2886) و 250 (2943) → 2886 + 0.6 × 57 = <b>2920.2</b></li>
<li>بعمود 2 MN/m²: بين 225 (2834) و 250 (2902) → 2834 + 0.6 × 68 = <b>2874.8</b></li>
<li>12 bar = 1.2 MN/m² يعني 0.2 من المسافة بين 1 و 2 → 2920.2 + 0.2 × (2874.8 − 2920.2) = <b>2911.1 kJ/kg</b></li>
</ol>جرّب تكتب P = 12 و T = 240 بالأداة فوق وشوف الخانات الأربع اللي تنستخدم.</div>
<div class="box warn"><strong>⚠️ لا تستوفي عبر الخط المدرّج</strong> إذا سطر سائل (أزرق) وسطر بخار (برتقالي)، لا تستوفي بيناتهم! استخدم بداله نقطة التشبع (T<sub>sat</sub>، h<sub>g</sub>) من أعلى العمود كأحد الطرفين.</div>
<div data-model="interp"></div>

<h2>حالات خاصة</h2>
<div class="grid">
<div class="card"><b>بخار رطب (x معطاة)</b><br>من Table 8 بنفس الضغط: <span class="ltr">h = h<sub>f</sub> + x·h<sub>fg</sub></span>، و <span class="ltr">v = v<sub>f</sub> + x(v<sub>g</sub> − v<sub>f</sub>)</span>، و <span class="ltr">u = u<sub>f</sub> + x(u<sub>g</sub> − u<sub>f</sub>)</span>. والحرارة = T<sub>sat</sub>.</div>
<div class="card"><b>سائل مضغوط (T أقل من T<sub>sat</sub>)</b><br>إما من الخانات الزرقاء بـ Table 9، أو تقريباً: خذ h<sub>f</sub> عند <b>نفس الحرارة</b> (الضغط تأثيره قليل على السوائل). مثلاً ماي 23°C عند 10 bar ≈ h<sub>f</sub>(23°C) = 96.2.</div>
<div class="card"><b>v و u للمحمص</b><br>Table 11 يعطي الكثافة ρ بنفس ترتيب Table 9 ← <span class="ltr">v = 1/ρ</span>. و Table 12 يعطي u، أو احسبها: <span class="ltr">u = h − P·v</span> (P بالـ kPa).</div>
<div class="card"><b>Degree of superheat</b><br><span class="ltr">T = T<sub>sat</sub> + superheat</span>. مثلاً "10 bar with 190°C of superheat" ← T = 179.9 + 190 = 369.9°C.</div>
</div>

<h2>جدول السعات الحرارية (C<sub>p</sub>) — ملحق الكتاب</h2>
<p>هذا الجدول اللي تطلع منه a, b, c, d بسؤال الـ C<sub>p</sub>. اضغط على أي مادة وحط الحرارتين، فيوريك القراءة والتكامل خطوة بخطوة.</p>
<div data-model="cptbl"></div>

<h2>تمرن: اقرا من الجدول</h2>
<p>سؤال عشوائي. اكتب الجواب من الجدولين فوق (مو من الأداة!)، وبعدين شوف الحل.</p>
<div data-model="tblquiz"></div>
`
  });

  // ---------- Table 8 interactive
  E.model('tbl8', el => {
    const cols = ['p (MN/m²)', 'bar', 't (°C)', 'v<sub>f</sub>', 'v<sub>g</sub>', 'u<sub>f</sub>', 'u<sub>g</sub>', 'h<sub>f</sub>', 'h<sub>fg</sub>', 'h<sub>g</sub>', 's<sub>f</sub>', 's<sub>g</sub>'];
    el.innerHTML = `<div class="model">
      <div class="row"><label class="fld">الضغط (bar)<input type="number" step="any" value="4" data-p></label><label class="fld">الجودة x (اختياري)<input type="number" step="any" min="0" max="1" placeholder="مثلاً 0.9" data-x></label></div>
      <div class="out"></div>
      <div class="tblwrap" style="max-height:340px;overflow-y:auto"><table class="given h8"><tr><th rowspan="2">${cols[0]}</th><th rowspan="2">${cols[1]}</th><th rowspan="2">${cols[2]}</th><th colspan="2">Specific volume m³/kg</th><th colspan="2">Internal energy kJ/kg</th><th colspan="3">Specific enthalpy kJ/kg</th><th colspan="2">Entropy kJ/kg K</th></tr>
      <tr><th>Water ${cols[3]}</th><th>Steam ${cols[4]}</th><th>Water ${cols[5]}</th><th>Steam ${cols[6]}</th><th>Water ${cols[7]}</th><th>Evap. ${cols[8]}</th><th>Steam ${cols[9]}</th><th>${cols[10]}</th><th>${cols[11]}</th></tr>
      ${H.T8.map((r, i) => `<tr data-i="${i}"><td><b>${r[0] === 0.101325 ? '1 atm' : r[0]}</b></td><td>${r[0] === 0.101325 ? '1.01325' : bar(r[0])}</td>${r.slice(1).map((v, k) => `<td>${k === 0 ? v.toFixed(1) : k === 1 ? v.toFixed(6) : k === 2 ? v : k >= 9 ? v.toFixed(3) : v.toFixed(1)}</td>`).join('')}</tr>`).join('')}</table></div></div>`;
    const show = () => {
      const pb = +$('[data-p]', el).value, x = $('[data-x]', el).value === '' ? null : +$('[data-x]', el).value, mn = pb / 10;
      $$('tr[data-i]', el).forEach(t => t.classList.remove('selrow'));
      const rows = H.T8; let i = rows.findIndex(r => Math.abs(r[0] - mn) < 1e-9);
      let r, note;
      if (i >= 0) { r = rows[i]; const tr = $(`tr[data-i="${i}"]`, el); tr.classList.add('selrow'); tr.scrollIntoView({ block: 'nearest' }); note = `السطر موجود بالجدول:<div class="ltr">${pb} bar = <b>${r[0]} MN/m²</b></div>`; }
      else {
        const j = rows.findIndex(q => q[0] > mn);
        if (j <= 0) { $('.out', el).innerHTML = '<div class="result bad">هذا الضغط برّة المقتطف (0.1–30 bar).</div>'; return; }
        const a = rows[j - 1], b = rows[j], fr = (mn - a[0]) / (b[0] - a[0]);
        r = a.map((v, k) => k === 0 ? mn : v + fr * (b[k] - v));
        [j - 1, j].forEach(k => $(`tr[data-i="${k}"]`, el).classList.add('selrow'));
        $(`tr[data-i="${j}"]`, el).scrollIntoView({ block: 'nearest' });
        note = `السطر <b>مو موجود</b>، فنستوفي بين السطرين المظللين:<div class="ltr">${pb} bar = ${f(mn, 4)} MN/m², between ${a[0]} and ${b[0]}<br>fraction = (${f(mn, 4)} − ${a[0]}) / (${b[0]} − ${a[0]}) = <b>${f(fr, 3)}</b></div>`;
      }
      let h = `<div class="result">${note}<div class="ltr" style="margin-top:4px">T<sub>sat</sub> = <b>${f(r[1], 1)}°C</b><br>v<sub>f</sub> = ${f(r[2], 6)}, v<sub>g</sub> = <b>${f(r[3], 4)}</b> m³/kg<br>h<sub>f</sub> = <b>${f(r[6], 1)}</b>, h<sub>fg</sub> = <b>${f(r[7], 1)}</b>, h<sub>g</sub> = <b>${f(r[8], 1)}</b> kJ/kg<br>u<sub>f</sub> = ${f(r[4], 1)}, u<sub>g</sub> = ${f(r[5], 1)} kJ/kg</div></div>`;
      if (x !== null && x >= 0 && x <= 1) {
        h += `<div class="result" style="margin-top:6px">بخار رطب جودته x = ${x}:<br><span class="ltr">h = h<sub>f</sub> + x·h<sub>fg</sub> = ${f(r[6], 1)} + ${x} × ${f(r[7], 1)} = <b>${f(r[6] + x * r[7], 1)} kJ/kg</b></span><br><span class="ltr">v = v<sub>f</sub> + x(v<sub>g</sub> − v<sub>f</sub>) = <b>${f(r[2] + x * (r[3] - r[2]), 4)} m³/kg</b></span><br><span class="ltr">u = u<sub>f</sub> + x(u<sub>g</sub> − u<sub>f</sub>) = <b>${f(r[4] + x * (r[5] - r[4]), 1)} kJ/kg</b></span><br><span class="ltr">T = T<sub>sat</sub> = ${f(r[1], 1)}°C</span></div>`;
      }
      $('.out', el).innerHTML = h;
    };
    $$('[data-p], [data-x]', el).forEach(i => i.oninput = show);
    el.addEventListener('click', e => { const tr = e.target.closest('tr[data-i]'); if (!tr) return; const r = H.T8[+tr.dataset.i]; $('[data-p]', el).value = r[0] === 0.101325 ? 1.01325 : bar(r[0]); show(); });
    show();
  });

  // ---------- Table 9 interactive + lookup with highlighted cells
  E.t9lookup = function (pb, T) {
    const mn = pb / 10, P = H.P9, rows = T9rows();
    const steps = [];
    const colIdx = []; const ej = P.findIndex(p => Math.abs(p - mn) < 1e-9);
    if (ej >= 0) colIdx.push([ej, 0]); else {
      const j = P.findIndex(p => p > mn); if (j <= 0) return { err: 'الضغط برّة المقتطف (0.1–100 bar).' };
      colIdx.push([j - 1, (mn - P[j - 1]) / (P[j] - P[j - 1])], [j, 0]);
    }
    const used = []; const vals = [];
    for (const [j] of colIdx) {
      const ts = H.SAT9.t[j];
      const liq = T < ts;
      const ri = rows.indexOf(T);
      let v;
      if (ri >= 0) { v = H.H9[T][j]; used.push([T, j]); steps.push(`<b>عمود ${bar(P[j])} bar</b> — ${liq ? '<b>سائل مضغوط</b> لأن الحرارة أقل من' : '<b>بخار محمص</b> لأن الحرارة أكبر من'} T<sub>sat</sub>. السطر موجود بالجدول.<div class="ltr">column ${P[j]} MN/m², T<sub>sat</sub> = ${ts}°C, row ${T}°C → h = <b>${v}</b></div>`); }
      else {
        const k = rows.findIndex(r => r > T); if (k <= 0) return { err: 'الحرارة برّة الجدول (0–800°C).' };
        let t1 = rows[k - 1], t2 = rows[k], h1 = H.H9[t1][j], h2 = H.H9[t2][j]; let lbl1 = `${t1}°C`;
        if (!liq && isLiq(t1, j)) { t1 = ts; h1 = H.SAT9.hg[j]; lbl1 = `sat. vapour ${ts}°C`; }
        else used.push([rows[k - 1], j]);
        if (liq && !isLiq(t2, j)) { t2 = ts; h2 = H.SAT9.hf[j]; }
        else used.push([rows[k], j]);
        const fr = (T - t1) / (t2 - t1); v = h1 + fr * (h2 - h1);
        steps.push(`<b>عمود ${bar(P[j])} bar</b> — ${liq ? 'سائل مضغوط' : 'بخار محمص'}. الحرارة مو موجودة، فنستوفي بين السطرين:<div class="ltr">T<sub>sat</sub> = ${ts}°C; ${lbl1}: h = ${h1} &nbsp;|&nbsp; ${t2}°C: h = ${h2}<br>fraction = (${T} − ${f(t1, 1)}) / (${t2} − ${f(t1, 1)}) = ${f(fr, 3)}<br>h = ${h1} + ${f(fr, 3)} × ${f(h2 - h1, 1)} = <b>${f(v, 1)}</b></div>`);
      }
      vals.push(v);
    }
    let h = vals[0];
    if (colIdx.length === 2) {
      const fr = colIdx[0][1]; h = vals[0] + fr * (vals[1] - vals[0]);
      steps.push(`<b>استيفاء على الضغط</b> — الضغط بين العمودين:<div class="ltr">fraction = (${pb} − ${bar(P[colIdx[0][0]])}) / (${bar(P[colIdx[1][0]])} − ${bar(P[colIdx[0][0]])}) = ${f(fr, 3)}<br>h = ${f(vals[0], 1)} + ${f(fr, 3)} × (${f(vals[1], 1)} − ${f(vals[0], 1)}) = <b>${f(h, 1)}</b></div>`);
      const l0 = T < H.SAT9.t[colIdx[0][0]], l1 = T < H.SAT9.t[colIdx[1][0]];
      if (l0 !== l1) steps.push('⚠️ العمودين على جهتين مختلفتين من الخط المدرّج — الاستيفاء هنا تقريبي. استخدم أداة جداول البخار للتأكد.');
    }
    return { h, steps, used };
  };

  E.model('tbl9', el => {
    const P = H.P9, rows = T9rows();
    el.innerHTML = `<div class="model">
      <div class="row"><label class="fld">P (bar)<input type="number" step="any" value="10" data-p></label><label class="fld">T (°C)<input type="number" step="any" value="400" data-t></label><button class="btn" data-go style="flex:0 0 auto;align-self:flex-end">دوّر بالجدول</button></div>
      <div class="out"></div>
      <div class="tblwrap" style="max-height:460px;overflow-y:auto"><table class="given h9">
        <tr><th>p MN/m²</th>${P.map(p => `<th>${p}</th>`).join('')}</tr>
        <tr><th>p bar</th>${P.map(p => `<th>${bar(p)}</th>`).join('')}</tr>
        <tr class="satrow"><td>Sat. t °C</td>${H.SAT9.t.map(v => `<td>${v}</td>`).join('')}</tr>
        <tr class="satrow"><td>Sat. h Water</td>${H.SAT9.hf.map(v => `<td>${v.toFixed(1)}</td>`).join('')}</tr>
        <tr class="satrow"><td>Sat. h Steam</td>${H.SAT9.hg.map(v => `<td>${v.toFixed(1)}</td>`).join('')}</tr>
        ${rows.map(T => `<tr><th>${T}</th>${H.H9[T].map((v, j) => `<td class="${isLiq(T, j) ? 'liq' : 'stm'}${isLiq(T, j) && !isLiq(rows[rows.indexOf(T) + 1] ?? 9999, j) ? ' edge' : ''}" data-c="${T},${j}">${v < 2000 ? v.toFixed(1) : v}</td>`).join('')}</tr>`).join('')}
      </table></div><p><small>Table 9 — Specific enthalpy of water and steam, h (kJ/kg). مقتطف من Haywood.</small></p></div>`;
    const mark = used => { $$('td.used, td.sel', el).forEach(t => t.classList.remove('used', 'sel')); used.forEach(([T, j]) => { const c = $(`td[data-c="${T},${j}"]`, el); if (c) c.classList.add('used'); }); const c0 = used[0] && $(`td[data-c="${used[0][0]},${used[0][1]}"]`, el); if (c0) c0.scrollIntoView({ block: 'nearest', inline: 'nearest' }); };
    const go = () => {
      const pb = +$('[data-p]', el).value, T = +$('[data-t]', el).value;
      const r = E.t9lookup(pb, T);
      if (r.err) { $('.out', el).innerHTML = `<div class="result bad">${r.err}</div>`; return; }
      mark(r.used);
      $('.out', el).innerHTML = `<div class="result"><ol style="margin:0">${r.steps.map(s => `<li style="margin-bottom:6px">${s}</li>`).join('')}</ol><div>الجواب:</div><div class="ltr" style="font-size:1.1em"><b>h = ${f(r.h, 1)} kJ/kg</b></div></div>`;
    };
    $('[data-go]', el).onclick = go;
    $$('[data-p], [data-t]', el).forEach(i => i.onkeydown = e => { if (e.key === 'Enter') go(); });
    el.addEventListener('click', e => {
      const td = e.target.closest('td[data-c]'); if (!td) return;
      const [T, j] = td.dataset.c.split(',').map(Number); const ts = H.SAT9.t[j];
      $$('td.used, td.sel', el).forEach(t => t.classList.remove('used', 'sel')); td.classList.add('sel');
      $('[data-p]', el).value = bar(P[j]); $('[data-t]', el).value = T;
      $('.out', el).innerHTML = `<div class="result"><ol style="margin:0"><li>العمود (الضغط):<div class="ltr">${P[j]} MN/m² = ${bar(P[j])} bar</div></li><li>فوق العمود تلگى حرارة التشبع:<div class="ltr">T<sub>sat</sub> = ${ts}°C</div></li><li>السطر (الحرارة) ${T < ts ? 'أقل من' : 'أكبر من'} T<sub>sat</sub> ← ${T < ts ? '<b>سائل مضغوط</b> (خانة زرقاء)' : '<b>بخار محمص</b> (خانة برتقالية)'}:<div class="ltr">${T}°C ${T < ts ? '&lt;' : '&gt;'} ${ts}°C</div></li><li>الرقم بتقاطع السطر ويا العمود:<div class="ltr"><b>h = ${td.textContent} kJ/kg</b></div></li></ol></div>`;
    });
    go();
  });

  // ---------- practice
  E.model('tblquiz', el => {
    const rows = T9rows();
    let cur, sc = E.store.get('tblq', { ok: 0, n: 0 });
    el.innerHTML = `<div class="model"><div class="q"></div><div class="blankin"><input type="number" step="any" placeholder="جوابك"><button class="btn small" data-chk>تحقق</button><button class="btn small ghost" data-new>سؤال جديد</button></div><div class="fb"></div><p class="score"></p></div>`;
    const pick = a => a[Math.floor(Math.random() * a.length)];
    const gen = () => {
      const k = Math.floor(Math.random() * 5);
      if (k === 0) { const r = pick(H.T8.filter(r => r[0] >= 0.1 && r[0] !== 0.101325)); cur = { q: `شكد T<sub>sat</sub> (درجة حرارة التشبع) عند <b>${bar(r[0])} bar</b>؟`, a: r[1], tol: 0.15, u: '°C', sol: `Table 8 سطر ${r[0]} MN/m² ← عمود t = <b>${r[1]}°C</b>` }; }
      else if (k === 1) { const r = pick(H.T8.filter(r => r[0] >= 0.1 && r[0] !== 0.101325)); const x = pick([0.8, 0.85, 0.9, 0.95]); const a = r[6] + x * r[7]; cur = { q: `شكد h لبخار رطب عند <b>${bar(r[0])} bar</b> وجودته <b>x = ${x}</b>؟`, a, tol: 1, u: 'kJ/kg', sol: `Table 8 سطر ${r[0]} MN/m²: h<sub>f</sub> = ${r[6]}، h<sub>fg</sub> = ${r[7]} ← <span class="ltr">h = ${r[6]} + ${x} × ${r[7]} = <b>${f(a, 1)}</b></span>` }; }
      else if (k === 2) { const j = 2 + Math.floor(Math.random() * 7); const T = pick(rows.filter(t => t > H.SAT9.t[j] + 10 && t <= 600)); const a = H.H9[T][j]; cur = { q: `شكد h للبخار المحمص عند <b>${bar(H.P9[j])} bar</b> و <b>${T}°C</b>؟`, a, tol: 0.6, u: 'kJ/kg', sol: `Table 9: عمود ${H.P9[j]} MN/m²، سطر ${T}°C ← <b>${a}</b> (T أكبر من T<sub>sat</sub> = ${H.SAT9.t[j]})` }; }
      else if (k === 3) { const j = 2 + Math.floor(Math.random() * 7); const cand = rows.filter((t, i) => t > H.SAT9.t[j] + 5 && rows[i + 1] && rows[i + 1] <= 600 && !isLiq(t, j)); const t1 = pick(cand); const t2 = rows[rows.indexOf(t1) + 1]; const T = Math.round(t1 + (0.2 + Math.random() * 0.6) * (t2 - t1)); const r = E.t9lookup(bar(H.P9[j]), T); cur = { q: `شكد h عند <b>${bar(H.P9[j])} bar</b> و <b>${T}°C</b>؟ (تحتاج استيفاء)`, a: r.h, tol: 1.5, u: 'kJ/kg', sol: r.steps.join('<br>') }; }
      else { const r = pick(H.T8.filter(r => r[0] >= 0.1 && r[0] <= 2)); const j = 3 + Math.floor(Math.random() * 3); const T = pick([150, 200, 250, 300, 350, 400]); const pb = bar(r[0]); const ts = r[1]; const st = T > ts ? 'superheated' : 'compressed liquid'; cur = { q: `بخار/ماي عند <b>${pb} bar</b> و <b>${T}°C</b> — حالته؟ اكتب <b>1</b> إذا محمص، و <b>0</b> إذا سائل مضغوط.`, a: T > ts ? 1 : 0, tol: 0.01, u: '', sol: `T<sub>sat</sub>(${pb} bar) = ${ts}°C. ${T} ${T > ts ? '&gt;' : '&lt;'} ${ts} ← <b>${st}</b>` }; void j; }
      $('.q', el).innerHTML = `<p>${cur.q}</p>`; $('.fb', el).innerHTML = ''; $('input', el).value = '';
    };
    const score = () => { $('.score', el).textContent = `نتيجتك: ${sc.ok}/${sc.n}`; };
    $('[data-chk]', el).onclick = () => {
      if (!cur || cur.done) return; cur.done = 1; const v = +$('input', el).value; const ok = $('input', el).value !== '' && Math.abs(v - cur.a) <= cur.tol;
      sc.n++; if (ok) sc.ok++; E.store.set('tblq', sc); score();
      $('.fb', el).innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? 'صح ✓' : `الجواب: <b class="ltr">${f(cur.a, 1)} ${cur.u}</b>`}<br>${cur.sol}</div>`;
    };
    $('[data-new]', el).onclick = gen; gen(); score();
  });
})();
