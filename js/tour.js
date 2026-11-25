// Guided, step-by-step lessons on reading the Cp table and the steam tables
(function () {
  const E = window.EB, $ = (s, el) => (el || document).querySelector(s), $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  // ---- mini tables (cells get ids r{i}c{j}; header row is r-1)
  const CPROWS = [
    ['Acetone', 'CH₃COCH₃', 'l', 1, '°C', '123.0', '0.186', '', '', '−30 to 60'],
    ['Acetone', 'CH₃COCH₃', 'g', 1, '°C', '71.96', '0.201', '−1.278×10⁻⁴', '3.476×10⁻⁸', '0–1200'],
    ['Air', '', 'g', 1, '°C', '28.94', '0.004147', '0.3191×10⁻⁵', '−1.965×10⁻⁹', '0–1500'],
    ['', '', 'g', 1, 'K', '28.09', '0.001965', '0.4799×10⁻⁵', '−1.965×10⁻⁹', '273–1800'],
    ['Benzene', 'C₆H₆', 'l', 1, '°C', '126.5', '0.234', '', '', '6–67'],
    ['', '', 'g', 1, '°C', '74.06', '0.3295', '−2.520×10⁻⁴', '7.757×10⁻⁸', '0–1200'],
    ['Carbon dioxide', 'CO₂', 'g', 1, '°C', '36.11', '0.04233', '−2.887×10⁻⁵', '7.464×10⁻⁹', '0–1500'],
    ['Carbon monoxide', 'CO', 'g', 1, '°C', '28.95', '0.00411', '0.3548×10⁻⁵', '−2.220×10⁻⁹', '0–1500'],
    ['Methane', 'CH₄', 'g', 1, '°C', '34.31', '0.05469', '0.3661×10⁻⁵', '−1.100×10⁻⁸', '0–1200'],
    ['', '', 'g', 1, 'K', '19.87', '0.05021', '1.268×10⁻⁵', '−1.100×10⁻⁸', '273–1500'],
    ['Nitrogen', 'N₂', 'g', 1, '°C', '29.00', '0.002199', '0.5723×10⁻⁵', '−2.871×10⁻⁹', '0–1500'],
    ['Oxygen', 'O₂', 'g', 1, '°C', '29.10', '0.01158', '−0.6076×10⁻⁵', '1.311×10⁻⁹', '0–1500']
  ];
  const CPHEAD = ['Compound', 'Formula', 'State', 'Form', 'T', 'a', 'b', 'c', 'd', 'Range'];
  const T8ROWS = [[0.10, 99.6, 0.001043, 1.694, 417.5, 2257.9, 2675.4], [0.20, 120.2, 0.001061, 0.885, 504.7, 2201.6, 2706.3], [0.30, 133.5, 0.001074, 0.606, 561.4, 2163.2, 2724.7], [0.40, 143.6, 0.001084, 0.462, 604.7, 2133.0, 2737.6], [0.50, 151.8, 0.001093, 0.375, 640.1, 2107.4, 2747.5], [0.70, 165.0, 0.001108, 0.273, 697.1, 2064.9, 2762.0], [1.00, 179.9, 0.001127, 0.1943, 762.6, 2013.6, 2776.2], [1.60, 201.4, 0.001159, 0.1237, 858.6, 1933.2, 2791.7], [2.0, 212.4, 0.001177, 0.0995, 908.6, 1888.6, 2797.2]];
  const T8HEAD = ['p MN/m²', 't °C', 'v<sub>f</sub>', 'v<sub>g</sub>', 'h<sub>f</sub> (Water)', 'h<sub>fg</sub> (Evap.)', 'h<sub>g</sub> (Steam)'];
  const T9P = ['0.1', '0.5', '1', '2', '4'], T9BAR = ['1', '5', '10', '20', '40'];
  const T9SAT = [['Sat. t °C', '99.6', '151.8', '179.9', '212.4', '250.3'], ['Sat. h Water', '417.5', '640.1', '762.6', '908.6', '1087.4'], ['Sat. h Steam', '2675.4', '2747.5', '2776.2', '2797.2', '2800.3']];
  const T9ROWS = [[25, 104.9, 105.2, 105.7, 106.6, 108.5], [100, 2676, 419.4, 419.7, 420.5, 422.0], [150, 2776, 632.2, 632.5, 633.1, 634.3], [200, 2875, 2855, 2827, 852.6, 853.4], [250, 2975, 2961, 2943, 2902, 1085.8], [300, 3074, 3065, 3052, 3025, 2962], [350, 3176, 3168, 3159, 3139, 3095], [375, 3227, 3220, 3211, 3194, 3156], [400, 3278, 3272, 3264, 3249, 3216], [450, 3382, 3377, 3371, 3358, 3331]];
  const T9SATT = [99.6, 151.8, 179.9, 212.4, 250.3];

  const mk = {
    cp: () => `<table class="given tourtbl"><tr>${CPHEAD.map((h, j) => `<th id="h${j}">${h}</th>`).join('')}</tr>${CPROWS.map((r, i) => `<tr id="r${i}">${r.map((v, j) => `<td id="r${i}c${j}">${v}</td>`).join('')}</tr>`).join('')}</table>`,
    t8: () => `<table class="given tourtbl"><tr>${T8HEAD.map((h, j) => `<th id="h${j}">${h}</th>`).join('')}</tr>${T8ROWS.map((r, i) => `<tr id="r${i}">${r.map((v, j) => `<td id="r${i}c${j}">${v}</td>`).join('')}</tr>`).join('')}</table>`,
    t9: () => `<table class="given tourtbl"><tr><th id="h0">p MN/m²</th>${T9P.map((p, j) => `<th id="h${j + 1}">${p}</th>`).join('')}</tr><tr><th>p bar</th>${T9BAR.map(p => `<th>${p}</th>`).join('')}</tr>${T9SAT.map((r, i) => `<tr id="s${i}" class="satrow">${r.map((v, j) => `<td id="s${i}c${j}">${v}</td>`).join('')}</tr>`).join('')}${T9ROWS.map((r, i) => `<tr id="r${i}"><th id="r${i}c0">${r[0]}</th>${r.slice(1).map((v, j) => `<td id="r${i}c${j + 1}" class="${r[0] < T9SATT[j] ? 'liq' : 'stm'}">${v}</td>`).join('')}</tr>`).join('')}</table>`
  };

  // ---- lessons. Each step: t = Arabic text, m = LTR line (optional), hl = ids to highlight, row/col = whole row/column ids
  const L = [
    { id: 'cp1', grp: 'cp', title: 'جدول Cp — اقرا معادلة CO₂ (غاز)', tbl: 'cp', q: 'Heat 100 mol/s of CO₂ gas from 25°C to 500°C. Use the heat-capacity table.', steps: [
      { t: 'أول شي <b>دوّر على اسم المادة</b> بعمود Compound. الجدول مرتب أبجدياً بالإنكليزي: CO₂ = <b>Carbon dioxide</b>.', hl: ['r6c0'] },
      { t: 'شوف عمود <b>State</b>: g يعني غاز، l سائل، c صلب. السؤال يكول gas، والسطر g ✓.', hl: ['r6c2'] },
      { t: 'عمود <b>Form = 1</b> يعني شكل المعادلة:', m: 'Cp = a + bT + cT² + dT³', hl: ['r6c3'] },
      { t: '<b>أهم خانة: عمود T</b>. مكتوب °C، يعني لازم تعوض الحرارة بالـ °C. حرارتنا 25 و 500°C، فنعوض مباشرة بدون تحويل.', hl: ['r6c4'] },
      { t: 'اقرا <b>a</b>:', m: 'a = 36.11', hl: ['r6c5'] },
      { t: 'اقرا <b>b</b>:', m: 'b = 0.04233', hl: ['r6c6'] },
      { t: 'اقرا <b>c</b> — انتبه للإشارة والأس. على الحاسبة تكتبها: <b>−2.887 ثم زر EXP (أو ×10ˣ) ثم −5</b>.', m: 'c = −2.887×10⁻⁵ = −0.00002887', hl: ['r6c7'] },
      { t: 'اقرا <b>d</b>:', m: 'd = 7.464×10⁻⁹', hl: ['r6c8'] },
      { t: 'شوف <b>Range</b>: المعادلة صالحة من 0 لـ 1500°C، وحرارتنا (25–500) داخلها ✓.', hl: ['r6c9'] },
      { t: '<b>اكتب المعادلة على ورقتك</b> بالأرقام — هاي أول سطر بالحل، وعليه درجة:', m: 'Cp = 36.11 + 0.04233T − 2.887×10⁻⁵T² + 7.464×10⁻⁹T³   [J/mol·°C]', row: ['r6'] },
      { t: 'هسه كامل حد بحد وعوّض 25 و 500:', m: 'Δh = 36.11(475) + (0.04233/2)(500² − 25²) + (−2.887×10⁻⁵/3)(500³ − 25³) + (7.464×10⁻⁹/4)(500⁴ − 25⁴)<br>= 17152 + 5278 − 1203 + 117 = 21344 J/mol', row: ['r6'] },
      { t: 'اضرب بالتدفق المولي (الوحدة J/<b>mol</b> — فتضرب بالمولات مو بالكيلوغرام):', m: 'Q = 100 × 21344 = 2.134×10⁶ J/s = 2134 kW', row: ['r6'] }
    ] },
    { id: 'cp2', grp: 'cp', title: 'جدول Cp — مادة إلها سطرين (سائل وغاز)', tbl: 'cp', q: 'Liquid benzene is heated from 20°C to 60°C.', steps: [
      { t: 'دوّر على <b>Benzene</b>. لاحظ إله <b>سطرين</b>: السطر الثاني بدون اسم يعني نفس المادة.', row: ['r4', 'r5'] },
      { t: 'السؤال يكول <b>liquid</b> → ناخذ سطر <b>State = l</b>.', hl: ['r4c2'] },
      { t: 'c و d <b>فارغات</b> → يعني صفر. المعادلة خطية:', m: 'Cp = 126.5 + 0.234T   [J/mol·°C]', hl: ['r4c5', 'r4c6', 'r4c7', 'r4c8'] },
      { t: 'الـ Range للسائل 6–67°C، وحرارتنا 20–60 ✓ داخلها.', hl: ['r4c9'] },
      { t: 'التكامل (بس حدين):', m: 'Δh = 126.5(60 − 20) + (0.234/2)(60² − 20²) = 5060 + 374 = 5434 J/mol', row: ['r4'] },
      { t: '⚠️ لو أخذت سطر الغاز بالغلط، الجواب يطلع غلط تماماً. <b>دائماً تأكد من الحالة.</b>', row: ['r5'] }
    ] },
    { id: 'cp3', grp: 'cp', title: 'جدول Cp — الهوا بالكلفن (اختار السطر الصح)', tbl: 'cp', q: 'Air is heated from 300 K to 600 K.', steps: [
      { t: '<b>Air</b> إله سطرين، الاثنين غاز. الفرق بعمود <b>T</b>: واحد °C وواحد K.', row: ['r2', 'r3'] },
      { t: 'حرارتنا بالكلفن (300 و 600 K) → ناخذ سطر <b>K</b> ونعوض مباشرة.', hl: ['r3c4'] },
      { t: 'نقرا المعاملات:', m: 'a = 28.09, b = 0.001965, c = 0.4799×10⁻⁵, d = −1.965×10⁻⁹', hl: ['r3c5', 'r3c6', 'r3c7', 'r3c8'] },
      { t: 'نكامل من 300 لـ 600:', m: 'Δh = 8427 + 265.3 + 302.3 − 59.7 = 8935 J/mol', row: ['r3'] },
      { t: '💡 لو حرارتك بالـ °C والسطر بالـ K: <b>حوّل T + 273.15</b> قبل التعويض. ولو العكس، <b>T − 273.15</b>.', hl: ['r2c4', 'r3c4'] }
    ] },
    { id: 'st1', grp: 'st', title: 'جدول البخار 8 — بخار مشبع عند 4 bar', tbl: 't8', q: 'Find Tsat, hf, hfg and hg of saturated steam at 4 bar.', steps: [
      { t: 'Haywood يكتب الضغط بالـ <b>MN/m²</b>. حوّل:', m: '4 bar ÷ 10 = 0.40 MN/m²', hl: ['h0'] },
      { t: 'انزل بعمود الضغط لحد سطر <b>0.40</b>.', hl: ['r3c0'], row: ['r3'] },
      { t: 'عمود <b>t</b> = حرارة التشبع:', m: 'Tsat = 143.6°C', hl: ['r3c1'] },
      { t: '<b>Water</b> = سائل مشبع (f):', m: 'hf = 604.7 kJ/kg', hl: ['r3c4'] },
      { t: '<b>Evaporation</b> = حرارة التبخر (fg):', m: 'hfg = 2133.0 kJ/kg', hl: ['r3c5'] },
      { t: '<b>Steam</b> = بخار مشبع (g):', m: 'hg = 2737.6 kJ/kg   (check: 604.7 + 2133.0 = 2737.7 ✓)', hl: ['r3c6'] },
      { t: 'متى تستخدم أي واحد؟', m: '"saturated liquid" → hf   ·   "saturated steam / dry saturated" → hg   ·   condenses fully → Δh = −hfg', row: ['r3'] }
    ] },
    { id: 'st2', grp: 'st', title: 'جدول البخار 8 — بخار رطب x = 0.9 عند 10 bar', tbl: 't8', q: 'Steam at 10 bar with 90% quality. Find h.', steps: [
      { t: 'حوّل الضغط: <b>10 bar = 1.00 MN/m²</b> (مو السطر 10!).', hl: ['h0'], row: ['r6'] },
      { t: 'اقرا h<sub>f</sub> و h<sub>fg</sub> من نفس السطر:', m: 'hf = 762.6, hfg = 2013.6 kJ/kg', hl: ['r6c4', 'r6c5'] },
      { t: '"90% quality" = x = 0.9. ("10% liquid" نفس الشي.)', m: 'h = hf + x·hfg = 762.6 + 0.9 × 2013.6 = 2574.8 kJ/kg', row: ['r6'] },
      { t: 'والحرارة = T<sub>sat</sub> لأن البخار رطب:', m: 'T = 179.9°C', hl: ['r6c1'] }
    ] },
    { id: 'st3', grp: 'st', title: 'جدول البخار 9 — محمص عند 10 bar و 400°C', tbl: 't9', q: 'Find h of steam at 10 bar and 400°C.', steps: [
      { t: 'حوّل الضغط واختار <b>العمود</b>: 10 bar = <b>1</b> MN/m² (وتحته مكتوب 10 bar).', hl: ['h3'] },
      { t: 'فوق العمود تلگى <b>حرارة التشبع</b>. قارن: 400 > 179.9 → <b>محمص</b> ✓.', hl: ['s0c3'] },
      { t: 'انزل لسطر <b>400°C</b>.', hl: ['r8c0'], row: ['r8'] },
      { t: 'الرقم بتقاطع السطر ويا العمود هو الجواب:', m: 'h = 3264 kJ/kg', hl: ['r8c3'] },
      { t: '💡 الخانات <b>البرتقالية</b> بخار محمص، و<b>الزرقاء</b> سائل مضغوط. بالجدول الورقي أكو خط مدرج يفصلهم.', hl: ['r3c3', 'r2c3'] }
    ] },
    { id: 'st4', grp: 'st', title: 'جدول البخار 9 — استيفاء (10 bar و 369.9°C)', tbl: 't9', q: 'Steam at 10 bar with 190°C of superheat. Find h.', steps: [
      { t: 'أول شي الحرارة: superheat يعني فوق T<sub>sat</sub>:', m: 'T = 179.9 + 190 = 369.9°C', hl: ['s0c3'] },
      { t: '369.9 <b>مو موجودة</b> بالجدول. بعمود 10 bar، هي بين سطر 350 وسطر 375.', hl: ['r6c3', 'r7c3'] },
      { t: 'اكتب القيمتين:', m: '350°C → 3159      375°C → 3211', hl: ['r6c3', 'r7c3'] },
      { t: 'الكسر = شكد قطعت من المسافة:', m: 'fraction = (369.9 − 350) / (375 − 350) = 0.796', hl: ['r6c0', 'r7c0'] },
      { t: 'الجواب = القيمة الأولى + الكسر × الفرق:', m: 'h = 3159 + 0.796 × (3211 − 3159) = 3200.4 kJ/kg', hl: ['r6c3', 'r7c3'] }
    ] },
    { id: 'st5', grp: 'st', title: 'جدول البخار 9 — ماي سائل (25°C عند 10 bar)', tbl: 't9', q: 'Liquid water at 25°C and 10 bar. Find h.', steps: [
      { t: 'عمود 10 bar. T<sub>sat</sub> = 179.9°C، و 25 أقل منها → <b>سائل مضغوط</b>.', hl: ['h3', 's0c3'] },
      { t: 'سطر 25°C — خانة زرقاء:', m: 'h = 105.7 kJ/kg', hl: ['r0c3'] },
      { t: '💡 طريقة ثانية مقبولة: h<sub>f</sub> عند نفس الحرارة (25°C) = 104.8 — الفرق صغير لأن الضغط ما يأثر كثير على السوائل.', hl: ['r0c1'] }
    ] }
  ];

  E.model('tour', el => {
    const only = el.dataset.only;
    const list = L.filter(l => !only || l.grp === only);
    el.innerHTML = `<div class="model tour"><h3>🎯 درس مرشد: شلون تقرا الجدول (خطوة بخطوة)</h3>
      <p><small>اختار درس، واضغط <b>التالي</b>. كل خطوة تأشرلك الخانة اللي لازم تشوفها <span class="hlchip">بالأحمر</span> وتكلك ليش. افتح الجدول الورقي جنبك ودوّر نفس الخانة.</small></p>
      <div class="row"><label class="fld">الدرس<select data-l>${list.map(l => `<option value="${l.id}">${l.title}</option>`).join('')}</select></label></div>
      <div class="statement tq"></div>
      <div class="tblwrap tourwrap"></div>
      <div class="tstep"></div>
      <div class="row tnav"><button class="btn ghost" data-prev>→ السابق</button><span class="tcount"></span><button class="btn" data-next>التالي ←</button></div></div>`;
    let les, k;
    const show = () => {
      const s = les.steps[k];
      $$('.hl, .hlrow', el).forEach(c => c.classList.remove('hl', 'hlrow'));
      (s.row || []).forEach(id => { const r = $(`.tourwrap #${id}`, el); if (r) r.classList.add('hlrow'); });
      (s.hl || []).forEach(id => { const c = $(`.tourwrap #${id}`, el); if (c) c.classList.add('hl'); });
      const first = $('.tourwrap .hl', el) || $('.tourwrap .hlrow', el);
      if (first) {
        const w = $('.tourwrap', el), cell = $('.tourwrap .hl', el) || first;
        const pos = n => { let x = 0, y = 0; while (n && n !== w) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x, y }; };
        const p = pos(cell);
        w.scrollTo({ top: Math.max(0, p.y - 70), left: cell.tagName === 'TR' ? 0 : Math.max(0, p.x - w.clientWidth / 2 + cell.offsetWidth / 2) });
      }
      $('.tstep', el).innerHTML = `<div class="result"><b>خطوة ${k + 1}:</b> ${s.t}${s.m ? `<div class="ltr tm">${s.m}</div>` : ''}</div>`;
      $('.tcount', el).textContent = `${k + 1} / ${les.steps.length}`;
      $('[data-prev]', el).disabled = k === 0;
      $('[data-next]', el).textContent = k === les.steps.length - 1 ? 'خلص ✓ — الدرس الجاي' : 'التالي ←';
    };
    const load = id => {
      les = L.find(l => l.id === id); k = 0;
      $('.tq', el).textContent = les.q;
      $('.tourwrap', el).innerHTML = mk[les.tbl]();
      show();
    };
    $('[data-l]', el).onchange = e => load(e.target.value);
    $('[data-prev]', el).onclick = () => { if (k > 0) { k--; show(); } };
    $('[data-next]', el).onclick = () => {
      if (k < les.steps.length - 1) { k++; show(); return; }
      const i = list.indexOf(les); const nx = list[(i + 1) % list.length];
      $('[data-l]', el).value = nx.id; load(nx.id);
    };
    load(list[0].id);
  });

  E.calcTips = `<div class="box tip"><strong>🧮 الحاسبة ويا الجدول (أكثر غلط يصير هنا)</strong>
<ul>
<li><b>الأس:</b> <span class="ltr">−2.887×10⁻⁵</span> تكتبها: <span class="ltr">(−) 2.887 EXP (−) 5</span> — زر EXP أو <span class="ltr">×10ˣ</span>. لا تكتب <span class="ltr">×10^−5</span> يدوياً.</li>
<li><b>كل حد لوحده:</b> احسب a-term، b-term، c-term، d-term واكتب كل واحد، بعدين اجمع. أسهل تكتشف الغلط وعليها درجات.</li>
<li><b>القسمة:</b> b÷2، c÷3، d÷4 — والأسس 2، 3، 4.</li>
<li><b>الفرق بالأس:</b> <span class="ltr">(T₂³ − T₁³)</span> مو <span class="ltr">(T₂ − T₁)³</span>.</li>
<li><b>الوحدة:</b> الجواب <span class="ltr">J/mol</span> — اضربه بالمولات، و ÷1000 للـ kJ.</li>
<li><b>بالورقة:</b> اكتب سطر الجدول بالأرقام قبل الحل (مثلاً: "From table: CO₂(g), T in °C: a = 36.11 …").</li>
</ul></div>`;
})();
