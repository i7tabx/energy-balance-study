// Cp table (book appendix) — lookup + Δh step by step
(function () {
  const E = window.EB, $ = (s, el) => (el || document).querySelector(s), $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const f = (v, d) => E.fmt(v, d);
  const BAD = new Set(['Carbon tetrachloride|l', 'n-Hexane|l', 'n-Pentane|l']);
  const sub = s => s.toLowerCase().replace(/[₀-₉]/g, m => '0123456789'['₀₁₂₃₄₅₆₇₈₉'.indexOf(m)]);
  const sci = v => {
    if (v === null || v === undefined) return '';
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 0.001 && a < 1e4) return String(v);
    const [m, e] = v.toExponential(4).split('e');
    return `${+m}×10<sup>${+e}</sup>`;
  };
  const tex = v => { const a = Math.abs(v); if (a !== 0 && a < 1e-3) { const [m, e] = a.toExponential(4).split('e'); return `${+m}\\times10^{${+e}}`; } return String(+a.toPrecision(6)); };

  E.cpRow = name => window.CPTABLE.find(r => r[1] === name[0] && r[4] === name[1]);

  E.model('cptbl', el => {
    const CP = window.CPTABLE;
    el.innerHTML = `<div class="model"><h3>جدول السعات الحرارية (ملحق الكتاب) — دوّر واحسب</h3>
      <p><small>بالكتاب مكتوب <b>TABLE A.3 — Heat Capacity Equations</b> (والنص يسميه Appendix A.2). الوحدة <span class="ltr">J/(g mol)(°C or K)</span>. <b>Form 1:</b> <span class="ltr">Cp = a + bT + cT² + dT³</span>. <b>Form 2:</b> <span class="ltr">Cp = a + bT + cT⁻²</span>. الحالة: l سائل، g غاز، c صلب. اضغط على سطر.</small></p>
      <div class="row"><label class="fld">دوّر على مادة<input type="text" placeholder="مثلاً CO2 أو benzene أو oxygen" data-q></label></div>
      <div class="tblwrap" style="max-height:300px;overflow-y:auto"><table class="given h8 cpt"><tr><th>No.</th><th>Compound</th><th>Formula</th><th>MW</th><th>State</th><th>Form</th><th>T</th><th>a</th><th>b</th><th>c</th><th>d</th><th>Range</th></tr>
      ${CP.map((r, i) => `<tr data-i="${i}"${BAD.has(r[1] + '|' + r[4]) ? ' class="badrow"' : ''}><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td>${r.slice(7, 11).map(v => `<td>${sci(v)}</td>`).join('')}<td>${r[11]}</td></tr>`).join('')}</table></div>
      <div class="row" style="margin-top:8px"><label class="fld">T₁ (°C)<input type="number" step="any" value="25" data-t1></label><label class="fld">T₂ (°C)<input type="number" step="any" value="500" data-t2></label><label class="fld">التدفق mol/s (اختياري)<input type="number" step="any" data-n></label></div>
      <div class="out"></div></div>`;
    let cur = CP.findIndex(r => r[1] === 'Carbon dioxide');
    const calc = () => {
      const r = CP[cur];
      $$('tr[data-i]', el).forEach(t => t.classList.toggle('selrow', +t.dataset.i === cur));
      const [a, b, c, d] = r.slice(7, 11).map(v => v || 0), K = r[6] === 'K';
      const T1c = +$('[data-t1]', el).value, T2c = +$('[data-t2]', el).value, n = $('[data-n]', el).value;
      const T1 = K ? T1c + 273.15 : T1c, T2 = K ? T2c + 273.15 : T2c;
      let terms, names, eqn;
      if (r[5] === 2) {
        terms = [a * (T2 - T1), b / 2 * (T2 ** 2 - T1 ** 2), -c * (1 / T2 - 1 / T1)];
        names = ['a(T₂ − T₁)', 'b/2 (T₂² − T₁²)', '−c (1/T₂ − 1/T₁)'];
        eqn = `C_p = ${tex(a)} + ${tex(b)}\\,T ${c < 0 ? '-' : '+'} ${tex(c)}\\,T^{-2}`;
      } else {
        terms = [a * (T2 - T1), b / 2 * (T2 ** 2 - T1 ** 2), c / 3 * (T2 ** 3 - T1 ** 3), d / 4 * (T2 ** 4 - T1 ** 4)];
        names = ['a(T₂ − T₁)', 'b/2 (T₂² − T₁²)', 'c/3 (T₂³ − T₁³)', 'd/4 (T₂⁴ − T₁⁴)'];
        eqn = `C_p = ${tex(a)}${b ? ` ${b < 0 ? '-' : '+'} ${tex(b)}\\,T` : ''}${c ? ` ${c < 0 ? '-' : '+'} ${tex(c)}\\,T^2` : ''}${d ? ` ${d < 0 ? '-' : '+'} ${tex(d)}\\,T^3` : ''}`;
      }
      const dh = terms.reduce((s, x) => s + x, 0);
      const bad = BAD.has(r[1] + '|' + r[4]);
      const state = r[4] === 'l' ? 'سائل' : r[4] === 'g' ? 'غاز' : 'صلب';
      $('.out', el).innerHTML = `<div class="result${bad ? ' bad' : ''}">
        <div><b>1) السطر من الجدول:</b> ${r[1]} — الحالة <b>${state}</b>، Form ${r[5]}، <b>T بالـ ${K ? 'K' : '°C'}</b>، المدى ${r[11] || '—'}</div>
        <div class="math">\\[${eqn}\\]</div>
        <div><b>2) حوّل الحرارة لوحدة السطر:</b></div>
        <div class="ltr">${K ? `T₁ = ${T1c} + 273.15 = ${f(T1, 2)} K, T₂ = ${T2c} + 273.15 = ${f(T2, 2)} K` : `°C — substitute directly: ${T1c} → ${T2c}°C`}</div>
        <div><b>3) كامل حد بحد:</b></div>
        <div class="ltr">${terms.map((t, i) => `${names[i]} = ${f(t, 2)}`).join('<br>')}</div>
        <div><b>4) اجمع:</b></div>
        <div class="ltr"><b>Δh = ${f(dh, 1)} J/mol = ${f(dh / 1000, 4)} kJ/mol</b>${n !== '' ? `<br>Q = ṅ·Δh = ${n} × ${f(dh, 1)} J/s = <b>${f(+n * dh / 1000, 3)} kW</b>` : ''}</div>
        ${bad ? '<div>⚠️ معاملات هذا السطر مطبوعة غلط بنسخة الكتاب (تعطي C<sub>p</sub> مو منطقي) — لا تعتمد عليها.</div>' : ''}</div>`;
      E.renderMath($('.out', el));
    };
    el.addEventListener('click', e => { const tr = e.target.closest('tr[data-i]'); if (tr) { cur = +tr.dataset.i; calc(); } });
    $$('[data-t1], [data-t2], [data-n]', el).forEach(i => { i.oninput = calc; });
    $('[data-q]', el).oninput = e => {
      const q = sub(e.target.value);
      $$('tr[data-i]', el).forEach(t => { const r = CP[+t.dataset.i]; t.style.display = !q || sub(r[1] + ' ' + r[2]).includes(q) ? '' : 'none'; });
    };
    calc();
  });
})();
