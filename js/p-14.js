(function () {
  const R = String.raw, E = window.EB;
  const mid = 'mid';

  // Excerpt of Appendix A.2 (the sheet attached to the Final 2025 paper)
  const A2 = [
    ['Acetone', 'CH₃COCH₃', 'l', '°C', '123.0', '18.6 × 10⁻²', '—', '—', '−30 to 60'],
    ['Acetone', 'CH₃COCH₃', 'g', '°C', '71.96', '20.10 × 10⁻²', '−12.78 × 10⁻⁵', '34.76 × 10⁻⁹', '0–1200'],
    ['Acetylene', 'C₂H₂', 'g', '°C', '42.43', '6.053 × 10⁻²', '−5.033 × 10⁻⁵', '18.20 × 10⁻⁹', '0–1200'],
    ['Air', '—', 'g', '°C', '28.94', '0.4147 × 10⁻²', '0.3191 × 10⁻⁵', '−1.965 × 10⁻⁹', '0–1500'],
    ['Air', '—', 'g', 'K', '28.09', '0.1965 × 10⁻²', '0.4799 × 10⁻⁵', '−1.965 × 10⁻⁹', '273–1800'],
    ['Benzene', 'C₆H₆', 'l', '°C', '126.5', '23.4 × 10⁻²', '—', '—', '6–67'],
    ['Benzene', 'C₆H₆', 'g', '°C', '74.06', '32.95 × 10⁻²', '−25.20 × 10⁻⁵', '77.57 × 10⁻⁹', '0–1200'],
    ['Carbon dioxide', 'CO₂', 'g', '°C', '36.11', '4.233 × 10⁻²', '−2.887 × 10⁻⁵', '7.464 × 10⁻⁹', '0–1500'],
    ['Carbon monoxide', 'CO', 'g', '°C', '28.95', '0.4110 × 10⁻²', '0.3548 × 10⁻⁵', '−2.220 × 10⁻⁹', '0–1500']
  ];

  E.page({
    id: 's14', group: 'ميد فقط', title: '1.4 الإنثالبي بالـ Cp', scope: mid, prio: 'hot',
    render: () => R`
<h1>1.4 حسابات الإنثالبي بالسعة الحرارية <span class="tag new">جديد للميد</span></h1>
<p class="ltr"><b>1.4 Enthalpy Calculations</b> — book pp. 32–39</p>
<div class="box midbox"><strong>الفكرة</strong>
الإنثالبي يتغير لثلاث أسباب: <b>تغير الحرارة</b> (هذا القسم)، <b>تغير الطور</b> (القسم 1.5)، أو الخلط/التفاعلات. جداول البخار تنفع للماي بس — لباقي المواد نحتاج <b>C<sub>p</sub></b>.</div>

<h2>1) الحرارة المحسوسة (Sensible heat)</h2>
<p><b class="ltr">Sensible heat</b> = الحرارة اللي ترفع أو تنزل درجة حرارة المادة <b>بدون تغير طور</b>. نحسبها بالسعة الحرارية بضغط ثابت C<sub>p</sub> (وحداتها J/(mol·K) أو cal/(g·°C)).</p>
${E.eq(R`\Delta \dot H = \dot m\int_{T_1}^{T_2} C_p\,dT \;\;\xrightarrow{\;C_p\ \text{constant}\;}\;\; \Delta\dot H = \dot m\,C_p\,(T_2 - T_1)`, {
  name: 'Eq. (1.22)', scope: mid,
  mean: 'تغير الإنثالبي = الكتلة × السعة الحرارية × فرق الحرارة. إذا C<sub>p</sub> ثابت (معدل) نضرب مباشرة.',
  sym: [[R`C_p`, 'السعة الحرارية بضغط ثابت', 'J/(mol·K), kJ/(kg·°C), cal/(g·°C)'], [R`T_1,T_2`, 'حرارة البداية والنهاية', '°C أو K']],
  when: 'سائل أو غاز ينسخن/يبرد بدون ما يغلي أو يتكثف، والسؤال يعطيك C<sub>p</sub> ثابت أو "average heat capacity".',
  trick: 'ΔT بالـ °C = ΔT بالـ K، فإذا C<sub>p</sub> ثابت ما يفرق. بس إذا C<sub>p</sub> معادلة — يفرق كلش!'
})}
${E.eq(R`\Delta U = m\int_{T_1}^{T_2} C_v\,dT`, {
  name: 'Internal energy with Cv', scope: mid,
  mean: 'بوعاء صلب مسدود (حجم ثابت) نستخدم C<sub>v</sub> ونحسب ΔU مو ΔH.',
  sym: [[R`C_v`, 'السعة الحرارية بحجم ثابت', 'kJ/(kg·°C)']],
  when: '"closed rigid vessel" — نظام مغلق W = 0 فـ Q = ΔU.',
  trick: 'v = volume → C<sub>v</sub> ويا U (مغلق). p = pressure → C<sub>p</sub> ويا H (مفتوح/ضغط ثابت).'
})}

<h2>2) C<sub>p</sub> كمتعددة حدود والتكامل حد بحد</h2>
${E.eq(R`C_p = a + bT + cT^2 + dT^3`, {
  name: 'Eq. (1.23)', scope: mid,
  mean: 'السعة الحرارية تتغير ويا الحرارة، فالجدول (Appendix A.2) يعطيها معادلة بأربع معاملات.',
  sym: [['a, b, c, d', 'معاملات من Appendix A.2', 'حسب الجدول'], ['T', 'الحرارة — <b>بالوحدة المكتوبة بعمود Form</b>', '°C أو K']],
  when: 'لما يعطيك معادلة C<sub>p</sub> أو يكول "use Appendix A.2".',
  trick: 'شوف عمود <b>T</b> (Form) بالجدول أول شي: إذا مكتوب °C عوض بالـ °C، وإذا K عوض بالـ K.'
})}
${E.eq(R`\Delta h = \int_{T_1}^{T_2}(a+bT+cT^2+dT^3)\,dT = a(T_2-T_1) + \frac{b}{2}(T_2^2-T_1^2) + \frac{c}{3}(T_2^3-T_1^3) + \frac{d}{4}(T_2^4-T_1^4)`, {
  name: 'Eq. (1.24) integrated', scope: mid,
  mean: 'نكامل كل حد لوحده: الأس يزيد واحد ونقسم على الأس الجديد.',
  when: 'كل سؤال فيه C<sub>p</sub> معادلة (مثال 1.14، 1.19، وأسئلة الأسيتون/البنزين).',
  trick: '"1-2-3-4": a ما ينقسم، b ÷2، c ÷3، d ÷4 — والأسس 1، 2، 3، 4.'
})}

<h3>قراءة Appendix A.2 (مقتطف من الورقة اللي جت ويا الامتحان)</h3>
<p>عمود <b>Form</b> يكول هل C<sub>p</sub> بالـ J/(mol·°C) و T بالـ °C، أو J/(mol·K) و T بالـ K. الشكل: ${E.n(R`C_p = a + bT + cT^2 + dT^3`)}.</p>
<div class="tblwrap"><table class="given"><tr><th>Compound</th><th>Formula</th><th>State</th><th>T unit</th><th>a</th><th>b</th><th>c</th><th>d</th><th>Range</th></tr>
${A2.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>
<div class="box warn"><strong>⚠️ الهوا مكتوب مرتين</strong> سطر بالـ °C وسطر بالـ K بمعاملات مختلفة — اختار السطر حسب وحدة الحرارة اللي عندك.</div>

<div data-model="cpint"></div>

<h2>3) الحالة المرجعية (Reference state) وخواص الحالة</h2>
<p>h و u <b class="ltr">state properties</b>: قيمتهم تعتمد بس على الحالة (T, P, الطور) مو على الطريق. فـ Δh = h₂ − h₁ <b>ما يعتمد على الحالة المرجعية</b> — بشرط الاثنين من نفس الجدول (نفس المرجع).</p>
${E.eq(R`\Delta u = \Delta h - \Delta(Pv) = \Delta h - \left[(Pv)_2 - (Pv)_1\right]`, {
  scope: mid, mean: 'من h = u + Pv نطلع Δu إذا الجدول يعطي h و P و v بس.',
  when: 'جدول مادة غير الماي (مثل CH₃Cl بمثال 1.15) ما بيه u.',
  trick: 'atm × m³/kg → اضرب × 101.325 يصير kJ/kg.'
})}

${E.ex({
  id: 'e1-14', scope: mid, title: 'Example 1.14 Internal Energy and Heat Capacity', src: 'الكتاب ص 33',
  statement: 'A closed rigid vessel that contains 200 kg of a fluid is heated from 20°C to 150°C. Calculate the heat required for this purpose. The constant volume heat capacity of the fluid is given by the following relation: C<sub>v</sub> (kJ/kg·°C) = a + bT = 0.855 + 9.42 × 10⁻⁴ T',
  diagram: E.dev({ kind: 'box', name: 'Rigid vessel, 200 kg', Q: 'Q = ?', Qdir: 'in' }),
  given: [['m', '200 kg', '200 kg'], ['T₁ → T₂', '20 → 150°C', 'T in °C (Cv form)'], ['Cv', '0.855 + 9.42×10⁻⁴T kJ/kg·°C', '']],
  find: 'Q',
  assume: [['W = 0', 'وعاء صلب — ماكو أجزاء متحركة.'], [R`\Delta KE = \Delta PE = 0`, 'الوعاء ما يتحرك.']],
  steps: [
    [R`Q - W = \Delta U \Rightarrow Q = \Delta U = m\int_{20}^{150}(0.855 + 9.42\times10^{-4}T)\,dT`, 'نظام مغلق بحجم ثابت → C<sub>v</sub>.'],
    [R`\Delta U = m\left[0.855(T_2-T_1) + 9.42\times10^{-4}\,\frac{T_2^2-T_1^2}{2}\right]`, 'تكامل حد بحد.'],
    [R`= 200\left[0.855(130) + 9.42\times10^{-4}\,\frac{150^2-20^2}{2}\right] = 200\,[111.15 + 10.41]`, 'نعوض بالـ °C لأن المعادلة معطاة بالـ °C.'],
    [R`Q = 200\times121.56 = 24\,312\ \text{kJ}`, '']
  ],
  answer: R`\[Q = \Delta U \approx 2.43\times10^{4}\ \text{kJ}\]`,
  check: 'C<sub>v</sub> معدل ≈ 0.935 kJ/kg·°C × 200 kg × 130°C ≈ 24 300 kJ ✓.',
  trap: 'لا تنسى ÷2 بحد b، ولا تعوض بالكلفن إذا المعادلة بالـ °C.'
})}

${E.ex({
  id: 'e1-15', scope: mid, title: 'Example 1.15 Use of Data from Tables and Reference State', src: 'الكتاب ص 35',
  statement: 'The data shown in Table E1.15 are for a saturated fluid. Calculate Δh and Δu for the transition of saturated vapor from 10°C to −20°C.<br><table class="given" style="margin-top:6px"><tr><th>State</th><th>T (°C)</th><th>P (atm)</th><th>v (m³/kg)</th><th>h (kJ/kg)</th></tr><tr><td>Liquid</td><td>−40</td><td>0.47</td><td>0.001</td><td>0.00</td></tr><tr><td>Vapor</td><td>−20</td><td>1.30</td><td>0.310</td><td>456</td></tr><tr><td>Vapor</td><td>10</td><td>3.54</td><td>0.120</td><td>470</td></tr></table><small>Properties of saturated methyl chloride (CH₃Cl)</small>',
  given: [['State 1', 'vapor 10°C', 'P = 3.54 atm, v = 0.120, h = 470'], ['State 2', 'vapor −20°C', 'P = 1.30 atm, v = 0.310, h = 456']],
  find: 'Δh, Δu',
  assume: [['h_{ref}=0\\ \\text{at liquid } -40^\\circ\\text{C}', 'المرجع ما يأثر على Δh.']],
  steps: [
    [R`\Delta h = h_{-20} - h_{10} = 456 - 470 = -14\ \text{kJ/kg}`, 'النهاية ناقص البداية.'],
    [R`\Delta(Pv) = (1.30)(0.310) - (3.54)(0.120) = -0.0218\ \text{atm·m}^3/\text{kg}`, ''],
    [R`\Delta(Pv) = -0.0218\times101.325 = -2.21\ \text{kJ/kg}`, '1 atm·m³ = 101.325 kJ.'],
    [R`\Delta u = \Delta h - \Delta(Pv) = -14 - (-2.21) = -11.8 \approx -12\ \text{kJ/kg}`, '']
  ],
  answer: R`\[\Delta h = -14\ \text{kJ/kg},\qquad \Delta u \approx -12\ \text{kJ/kg}\]`,
  check: 'التبريد يقلل h و u ✓، و Δu قريب من Δh لأن Pv صغير.',
  trap: 'إشارة Δ(Pv): (حالة 2) ناقص (حالة 1) — والحالة 2 هي −20°C.',
  note: 'الكتاب عوض v = 0.312 بدل 0.310 الموجود بالجدول. الجواب بالحالتين يتقرب لـ −12 kJ/kg.'
})}

${E.ex({
  id: 'e1-16', scope: mid, title: 'Example 1.16 Constant Heat Capacity', src: 'الكتاب ص 36',
  statement: 'What is the change in the enthalpy of 100 g/s acid heated in a double pipe heat exchanger from 20°C to 80°C, if the average heat capacity at constant pressure is 0.50 cal/g°C?',
  given: [['ṁ', '100 g/s', '100 g/s'], ['Cp', '0.50 cal/g·°C (constant)', '2.092 J/g·°C'], ['T₁ → T₂', '20 → 80°C', 'ΔT = 60°C']],
  find: 'ΔḢ',
  steps: [
    [R`\Delta\dot H = \dot m\,C_p\,(T_2-T_1) = 100\ \tfrac{\text{g}}{\text{s}}\times0.5\ \tfrac{\text{cal}}{\text{g}^\circ\text{C}}\times(80-20)^\circ\text{C}`, 'C<sub>p</sub> ثابت فنضرب مباشرة.'],
    [R`\Delta\dot H = 3000\ \text{cal/s} = 3.0\ \text{kcal/s}\ (=12.55\ \text{kW})`, '× 4.184 إذا تريدها بالـ kW.']
  ],
  answer: R`\[\Delta\dot H = 3.0\ \text{kcal/s} \approx 12.6\ \text{kW}\]`,
  check: 'الوحدات: g/s × cal/(g·°C) × °C = cal/s ✓.',
  trap: 'الدكتورة ممكن تطلب الجواب بالـ kW: 3000 cal/s × 4.184 = 12 552 W.'
})}

${E.ex({
  id: 'e1-17', scope: mid, title: 'Example 1.17 Heat Added to a Boiler', src: 'الكتاب ص 37',
  statement: 'Liquid water is fed to a boiler at 23°C under a pressure of 10 bar, and is converted at constant pressure to saturated steam. Calculate Δh for this process and the heat input required for producing 15,000 m³/h of steam at the exit conditions. Assume that the inlet velocity of liquid entering the boiler is negligible and that the steam is discharged through a 0.15 m ID (inner diameter) pipe. Inlet and exit pipes are at the same level.',
  diagram: E.dev({ kind: 'box', name: 'Boiler', ins: [['liquid water', '23°C, 10 bar']], outs: [['sat. vapor 10 bar', '15 000 m³/h, D = 0.15 m']], Q: 'Q (heat)', Qdir: 'in' }),
  given: [['Inlet', 'water 23°C, 10 bar', 'h₁ ≈ h_f(23°C)'], ['Outlet', 'sat. steam 10 bar', '1.0 MN/m²'], [R`\(\dot V_2\)`, '15 000 m³/h', '4.167 m³/s'], ['D₂', '0.15 m', '']],
  find: 'Δh and Q',
  assume: [['W_s = 0', 'البويلر ما بيه عمود.'], [R`\Delta PE = 0`, 'نفس المستوى.'], [R`\upsilon_1 \approx 0`, 'مذكور — بس <b>ΔKE ما نهمله</b> لأن سرعة البخار الطالع كبيرة.']],
  steps: [
    [R`h_1 \approx h_f(23^\circ\text{C}) = 96.2\ \text{kJ/kg}`, 'ماكو قيمة للسائل عند 23°C و 10 bar، فناخذ السائل المشبع بنفس الحرارة (الضغط تأثيره قليل).'],
    [R`h_2 = h_g(10\ \text{bar}) = 2776.2\ \text{kJ/kg}\ \Rightarrow\ \Delta h = 2776.2 - 96.2 = 2680\ \text{kJ/kg}`, 'Table 8 سطر 1.00 MN/m².'],
    [R`\dot m = \frac{\dot V}{v_g} = \frac{15000/3600}{0.1943} = 21.45\ \text{kg/s}`, 'نحسب ṁ من المخرج لأن التدفق معطى هناك.'],
    [R`\upsilon_2 = \frac{15000/3600}{\pi(0.15)^2/4} = 235.8\ \text{m/s}`, ''],
    [R`Q = \dot m\Delta h + \tfrac12\dot m\upsilon_2^2 = 21.45(2680) + \tfrac12(21.45)(235.8)^2/1000`, ''],
    [R`Q = 57\,486 + 596 = 58\,082\ \text{kJ/s}`, '']
  ],
  answer: R`\[\Delta h = 2680\ \text{kJ/kg},\qquad Q \approx 5.81\times10^{4}\ \text{kW}\]`,
  check: 'Q موجب = حرارة داخلة ✓. ΔKE (596 kW) صغير مقارنة بـ ΔH بس مو صفر.',
  trap: 'ṁ تنحسب بـ v<sub>g</sub> للبخار مو كثافة الماي (1000)!'
})}
`
  });

  E.page({
    id: 's15', group: 'ميد فقط', title: '1.5 تغير الطور والخلط', scope: mid, prio: 'hot',
    render: () => R`
<h1>1.5 الإنثالبي ويا تغير الطور <span class="tag new">جديد للميد</span></h1>
<p class="ltr"><b>1.5 Enthalpy Calculations with Phase Changes</b> — book pp. 39–49</p>

<h2>1) الحرارة الكامنة (Latent heat)</h2>
<p>تغير الطور (تبخر، انصهار) يصاحبه تغير كبير بـ U و H لأن الروابط بين الجزيئات تنكسر وتتكون. الحرارة اللي تغير الطور <b>بحرارة وضغط ثابتين</b> اسمها <b class="ltr">latent heat</b>:</p>
${E.table(['النوع', 'الإنكليزي', 'شنو تسوي'], [
  ['حرارة التبخر', '<span class="ltr">latent heat of vaporization (Δh<sub>v</sub>)</span>', 'تبخر سائل'],
  ['حرارة الانصهار', '<span class="ltr">latent heat of fusion (Δh<sub>m</sub>)</span>', 'تذوب صلب'],
  ['حرارة التسامي', '<span class="ltr">latent heat of sublimation</span>', 'صلب → بخار مباشرة']
])}
<ul>
<li>الحرارة <b>تنطلق</b> بالتكثف، و<b>نحتاجها</b> للتبخير أو الصهر.</li>
<li><b>Table A.1</b> يعطي Δh<sub>v</sub> عند درجة الغليان الطبيعية T<sub>b</sub> و Δh<sub>m</sub> عند T<sub>m</sub> (بضغط 1 atm).</li>
<li><b class="ltr">Sensible heat</b> = تغير حرارة بدون تغير طور.</li>
<li>للسوائل والصلبة ${E.n(R`C_p \approx C_v`)}، وللغاز المثالي ${E.n(R`C_p = C_v + R`)}.</li>
</ul>
${E.table(['Compound', 'T<sub>b</sub> (K)', 'Δh<sub>v</sub> at T<sub>b</sub> (kJ/mol)', 'T<sub>m</sub> (K)', 'Δh<sub>m</sub> (kJ/mol)'], [
  ['Acetone', '329.2', '30.2', '178.2', '5.69'],
  ['Benzene', '353.26', '30.76', '278.693', '9.837'],
  ['Acetic acid', '390.4', '24.4', '289.9', '12.09'],
  ['Ammonia', '239.73', '23.35', '195.40', '5.653']
], 'given')}
<p><small>من Table A.1 بالكتاب. للماي استخدم جدول البخار: h<sub>fg</sub>(1 atm) = 2256.9 kJ/kg.</small></p>

<h2>2) وصفة المسار الافتراضي (Hypothetical path) — الدرج</h2>
<p>لأن h <b>خاصية حالة</b>، نكدر نختار أي طريق مريح بين البداية والنهاية. الطريق المريح دائماً: <b>سخّن السائل لحد T<sub>b</sub> ← بخّر عند T<sub>b</sub> ← سخّن البخار للنهاية</b>.</p>
${E.eq(R`\Delta h = \underbrace{\int_{T_1}^{T_b}C_{p,l}\,dT}_{\text{heat liquid}} + \underbrace{\Delta h_v(T_b)}_{\text{vaporize}} + \underbrace{\int_{T_b}^{T_2}C_{p,v}\,dT}_{\text{heat vapor}}`, {
  name: 'Hypothetical path', scope: mid,
  mean: 'ثلاث درجات: حرارة محسوسة للسائل، حرارة كامنة، حرارة محسوسة للبخار.',
  sym: [[R`C_{p,l}`, 'Cp للسائل (State = l)', 'J/(mol·°C)'], [R`C_{p,v}`, 'Cp للغاز (State = g)', 'J/(mol·°C)'], [R`\Delta h_v`, 'حرارة التبخر عند T<sub>b</sub>', 'kJ/mol']],
  when: 'مادة تبدي سائل وتنتهي بخار (أو العكس)، والسؤال ما يعطيك جدول h جاهز.',
  trick: 'ارسم <b>درج</b>: صعدة (سخّن)، بسطة مستوية (بخّر — الحرارة ثابتة)، صعدة (سخّن). كل درجة إلها C<sub>p</sub> مختلف!'
})}
<div data-model="stairs"></div>

${E.ex({
  id: 'path-demo', scope: mid, title: 'Illustration — hypothetical path vs. steam table', src: 'مثال توضيحي (مو من الكتاب) — للتأكد إن الطريقة صح',
  statement: 'Estimate Δh for 1 kg of water going from liquid at 25°C to vapor at 150°C at 1 atm using a hypothetical path (C<sub>p,l</sub> ≈ 4.19 kJ/kg·°C, C<sub>p,v</sub> ≈ 2.0 kJ/kg·°C), and compare with the steam tables.',
  given: [['T₁', '25°C liquid', ''], ['T_b', '100°C (1 atm)', 'h_fg = 2256.9 kJ/kg'], ['T₂', '150°C vapor', '']],
  find: 'Δh',
  steps: [
    [R`\Delta h_1 = C_{p,l}(100-25) = 4.19\times75 = 314.3\ \text{kJ/kg}`, 'الدرجة الأولى: سخّن السائل.'],
    [R`\Delta h_2 = h_{fg}(1\ \text{atm}) = 2256.9\ \text{kJ/kg}`, 'البسطة: تبخير بحرارة ثابتة.'],
    [R`\Delta h_3 = C_{p,v}(150-100) = 2.0\times50 = 100\ \text{kJ/kg}`, 'الدرجة الثالثة: سخّن البخار.'],
    [R`\Delta h = 314.3 + 2256.9 + 100 = 2671\ \text{kJ/kg}`, ''],
    [R`\text{Tables: } h(1\ \text{atm},150^\circ\text{C}) - h_f(25^\circ\text{C}) \approx 2776.4 - 104.8 = 2671.6\ \text{kJ/kg}`, 'نفس الجواب تقريباً ✓ لأن h خاصية حالة.']
  ],
  answer: R`\[\Delta h \approx 2671\ \text{kJ/kg}\quad(\text{85\% of it is latent heat!})\]`,
  check: 'لاحظ الحرارة الكامنة هي الأكبر بكثير — لهذا البخار وسط تسخين ممتاز.',
  trap: 'نسيان الحرارة الكامنة = أكبر غلطة بأسئلة تغير الطور.'
})}

${E.ex({
  id: 'e1-18', scope: mid, title: 'Example 1.18 Enthalpy of Phase Change', src: 'الكتاب ص 40',
  statement: 'Steam at a rate of 100 kg/h is used to heat a stream of gas flowing on the tube side of a heat exchanger. The steam enters the shell side of the heat exchanger as saturated vapor at 10 bar of 90% quality, and exits as saturated liquid water at 10 bar. Calculate the rate of heat transfer to the gas side.',
  diagram: E.dev({ kind: 'hx', name: 'HX (shell)', ins: [['steam 100 kg/h', '10 bar, x = 0.9']], outs: [['sat. liquid', '10 bar']], cold: { in: ['gas (tubes)'], out: ['heated gas'] }, Q: 'Q = ?', Qdir: 'out' }),
  given: [['ṁ_s', '100 kg/h', '0.02778 kg/s'], ['Inlet', '10 bar, x = 0.90', ''], ['Outlet', 'sat. liquid 10 bar', 'h = h_f']],
  find: 'Q',
  assume: [[R`W_s = 0,\ \Delta KE = \Delta PE = 0`, 'مبادل حراري.']],
  steps: [
    [R`h_{s,1} = h_f + x\,h_{fg} = 762.6 + 0.9(2013.6) = 2574.8\ \text{kJ/kg}`, 'Table 8، 1.00 MN/m².'],
    [R`h_{s,2} = h_f = 762.6\ \text{kJ/kg}\ \Rightarrow\ \Delta h_s = -1812.2\ \text{kJ/kg}`, 'البخار تكثف بالكامل.'],
    [R`Q = \dot m_s\Delta h_s = \frac{100}{3600}(-1812.2) = -50.34\ \text{kJ/s}`, '']
  ],
  answer: R`\[Q = -50.3\ \text{kW}\ (\text{heat from steam to gas})\]`,
  check: 'Δh<sub>s</sub> = −x·h<sub>fg</sub> بالضبط — لأن البخار بس يتكثف بنفس الضغط ✓.',
  trap: 'الإشارة سالبة لأن النظام هو البخار. الغاز يكسب +50.3 kW.',
  note: 'بالكتاب مطبوع "0.9 × 213.6" — المقصود 2013.6 (الحساب نفسه صحيح).'
})}

<h2>3) أنظمة مفتوحة بعدة مداخل ومخارج</h2>
${E.eq(R`Q - W_s = \Delta\dot H + \Delta KE + \Delta PE \qquad \Delta\dot H = \sum_{out}\dot m_i h_i - \sum_{in}\dot m_i h_i`, {
  name: 'Eq. (1.25)–(1.27)', scope: mid,
  mean: 'نجمع إنثالبي كل التيارات الطالعة ونطرح الداخلة.',
  when: 'مبادل حراري (تيارين)، خلاط، بويلر بمدخلين.',
  trick: 'اكتب جدول: كل تيار → ṁ و h. بعدين "الطالع − الداخل".'
})}
${E.eq(R`C_{p,mix} = \sum y_i\,C_{p,i} \qquad \Delta h_{mix} = \sum y_i\,\Delta h_i`, {
  name: 'Ideal mixture', scope: mid,
  mean: 'خاصية الخليط المثالي = مجموع مساهمات المكونات (بالكسور المولية إذا C<sub>p</sub> مولي).',
  sym: [[R`y_i`, 'الكسر المولي للمكون', '—']],
  when: 'خليط أسيتون/بنزين، دهن (حامض + ماي).',
  trick: 'ادمج المعاملات: a<sub>mix</sub> = Σy<sub>i</sub>a<sub>i</sub> و b<sub>mix</sub> = Σy<sub>i</sub>b<sub>i</sub> وبعدين كامل مرة وحدة.'
})}

${E.ex({
  id: 'e1-19', scope: mid, title: 'Example 1.19 Enthalpy Change of Mixtures and Phase Change', src: 'الكتاب ص 42 · انعاد بـ Final 2023 و Final 2025',
  statement: 'Thousand kilomoles per hour of a liquid mixture of 70 mol% acetone and 30 mol% benzene is heated from 10°C to 50°C in a shell-and-tube heat exchanger using steam as the heating medium. The steam enters the heat exchanger in the shell as a saturated vapor at 16 bar of 90% quality, and exits as saturated liquid water at 16 bar. Calculate the mass flow rate of the inlet steam required for this purpose.',
  diagram: E.dev({ kind: 'hx', name: 'HX', ins: [['1000 kmol/h mixture', '70% acetone, 10°C']], outs: [['mixture', '50°C']], cold: { in: ['steam 16 bar, x = 0.9'], out: ['sat. liquid 16 bar'] } }),
  given: [['ṅ_mix', '1000 kmol/h', R`\(10^{6}\) mol/h`], ['y', '0.70 acetone, 0.30 benzene', ''], ['T', '10 → 50°C', '°C (Cp form)'], ['Steam', '16 bar, x = 0.9 → sat. liq', '1.6 MN/m²'], ['Cp acetone (l)', '123 + 0.186T J/mol·°C', ''], ['Cp benzene (l)', '126.5 + 0.234T J/mol·°C', '']],
  find: 'ṁ_s',
  assume: [['Q = 0', 'المبادل كله معزول (الكتاب كاتب "boiler is adiabatic" — غلط مطبعي).'], [R`W_s = 0,\ \Delta KE = \Delta PE = 0`, '']],
  steps: [
    [R`\Delta\dot H = 0 = \dot m_s\Delta h_s + \dot n_{mix}\Delta h_{mix}`, 'النظام = المبادل كله: الحرارة اللي يخسرها البخار يكسبها الخليط.'],
    [R`h_{s,1} = 858.6 + 0.9(1933.2) = 2598.5;\quad h_{s,2} = 858.6\ \Rightarrow\ \Delta h_s = -1740\ \text{kJ/kg}`, 'Table 8 سطر 1.6 MN/m².'],
    [R`C_{p,mix} = [0.7(123) + 0.3(126.5)] + [0.7(0.186) + 0.3(0.234)]T = 124 + 0.20T`, 'ندمج المعاملات بالكسور المولية.'],
    [R`\Delta h_{mix} = 124(50-10) + \frac{0.20}{2}(50^2-10^2) = 4960 + 240 = 5200\ \text{J/mol}`, 'تكامل بالـ °C.'],
    [R`\dot m_s(1740) = 1000\tfrac{\text{kmol}}{\text{h}}\times\tfrac{1000\ \text{mol}}{\text{kmol}}\times5.200\tfrac{\text{kJ}}{\text{mol}} = 5.20\times10^{6}\ \text{kJ/h}`, ''],
    [R`\dot m_s = \frac{5.20\times10^{6}}{1740} = 2.99\times10^{3}\ \text{kg/h}`, '']
  ],
  answer: R`\[\dot m_s \approx 2990\ \text{kg/h}\ (0.830\ \text{kg/s})\]`,
  check: 'كل kg بخار يعطي 1740 kJ، والخليط يحتاج 5.2 مليون kJ/h ✓.',
  trap: 'J/mol × mol/h → J/h: لا تنسى kmol → mol (×1000) و J → kJ (÷1000). وإذا T معطاة بالكلفن (مثل Final 2025) حولها °C قبل التعويض!'
})}

<h2>4) الخلط (Mixing)</h2>
${E.ex({
  id: 'e1-20', scope: mid, title: 'Example 1.20 Mixing', src: 'الكتاب ص 45',
  statement: 'Hundred kilograms per hour of a saturated steam at 1 bar is mixed with superheated steam available at 400°C and 1 bar to produce superheated steam at 300°C and 1 bar. Calculate the amount of superheated steam produced at 300°C, and the required mass flow rate of the 400°C steam.',
  diagram: E.dev({ kind: 'mixer', name: 'Mix', ins: [['(1) 100 kg/h', 'sat. 1 bar'], ['(2) ṁ₂ = ?', '400°C, 1 bar']], outs: [['(3) ṁ₃ = ?', '300°C, 1 bar']] }),
  given: [['Stream 1', '100 kg/h sat. steam 1 bar', 'h₁ = 2675.4'], ['Stream 2', '400°C, 1 bar', 'h₂ = 3278'], ['Stream 3', '300°C, 1 bar', 'h₃ = 3074']],
  find: 'ṁ₃, ṁ₂',
  assume: [[R`Q = W_s = 0,\ \Delta KE=\Delta PE=0`, 'خلاط adiabatic.']],
  steps: [
    [R`\text{Mass: } \dot m_2 = \dot m_3 - 100`, 'موازنة كتلة أول.'],
    [R`\text{Energy: } 100(2675.4) + \dot m_2(3278) = \dot m_3(3074)`, 'الداخل = الطالع. h من Table 8 و Table 9 (عمود 0.1 MN/m²).'],
    [R`100(2675.4) + (\dot m_3-100)(3278) = 3074\,\dot m_3`, 'نعوض موازنة الكتلة.'],
    [R`\dot m_3 = \frac{100(2675.4-3278)}{3074-3278} = 295\ \text{kg/h},\quad \dot m_2 = 195\ \text{kg/h}`, '']
  ],
  answer: R`\[\dot m_3 \approx 295\ \text{kg/h},\qquad \dot m_2 \approx 195\ \text{kg/h}\]`,
  check: '300°C بين 99.6 و 400 وأقرب للـ 400، فلازم ṁ₂ > ṁ₁ ✓ (195 > 100).',
  trap: 'موازنة الطاقة وحدها ما تكفي — تحتاج موازنة الكتلة ويّاها (مجهولين = معادلتين).',
  note: 'الكتاب بالـ Known quantities كاتب "1 atm" و "volumetric flow rate" — ما متطابقين ويا نص السؤال (1 bar، mass flow). الحل مبني على نص السؤال.'
})}

<h2>5) تبريد الدهون (Fatty acids)</h2>
${E.ex({
  id: 'e1-21', scope: mid, title: 'Example 1.21 Cooling of Fatty Acids', src: 'الكتاب ص 47 · نفس سؤال Final 2024 Q2',
  statement: 'A liquid at the rate of 2000 kg/h fat (20 wt% acid, 80 wt% water) at 90°C is to be cooled to 7°C. Cooling is achieved by heat exchange with 2700 kg/h coolant fluid initially at 2°C. The final temperature of the coolant liquid is 50°C. The fat is flowing on the shell side and coolant liquid is on the tube side. The heat exchanger is not adiabatic, so part of the heat is lost through the exchanger walls and the rest to coolant fluid. What is the rate of heat loss from the acid solution to the surroundings? Assume the heat capacity of acid is 1.463 (kJ/kg°C).',
  diagram: E.dev({ kind: 'hx', name: 'HX', ins: [['fat 2000 kg/h, 90°C', '20% acid, 80% water']], outs: [['product 7°C']], cold: { in: ['coolant 2700 kg/h, 2°C'], out: ['coolant 50°C'] }, Q: 'Q_loss = ?', Qdir: 'out' }),
  given: [['Acid', '0.20 × 2000', '400 kg/h'], ['Water', '0.80 × 2000', '1600 kg/h'], ['Coolant', '2700 kg/h, h = 8.124 → 209.5 kJ/kg', ''], ['Water in fat', '90 → 7°C', 'h_f = 376.8 → 29.3 kJ/kg'], ['Cp acid', '1.463 kJ/kg·°C', '']],
  find: 'Q_loss',
  assume: [[R`W_s = 0,\ \Delta KE = \Delta PE = 0`, ''], ['\\text{system} = \\text{whole HX}', 'فالـ Q الوحيد هو الخسارة للمحيط.']],
  steps: [
    [R`Q = \dot m_c(h_{c,4}-h_{c,3}) + \dot m_a C_{p,a}(T_2-T_1) + \dot m_w(h_{w,2}-h_{w,1})`, 'ثلاث تيارات: المبرد، الحامض (بالـ Cp)، الماي (من جدول البخار كسائل مشبع).'],
    [R`\text{coolant: } \tfrac{2700}{3600}(209.5-8.124) = +151.0\ \text{kW}`, ''],
    [R`\text{acid: } \tfrac{400}{3600}(1.463)(7-90) = -13.49\ \text{kW}`, ''],
    [R`\text{water: } \tfrac{1600}{3600}(29.3-376.8) = -154.4\ \text{kW}`, 'كتلة الماي 80% من 2000 = 1600 kg/h.'],
    [R`Q = 151.0 - 13.49 - 154.4 = -16.9\ \text{kW}`, '']
  ],
  answer: R`\[Q_{loss} \approx -16.9\ \text{kW}\ (\text{heat lost to the surroundings})\]`,
  check: 'الدهن خسر 167.9 kW، المبرد أخذ 151.0 kW، والفرق (16.9 kW) راح للمحيط ✓ — منطقي إنه جزء صغير.',
  trap: 'نسبة الوزن! الماي 80% من 2000 = 1600 kg/h — مو 2000.',
  note: '<b>غلط بالكتاب:</b> الكتاب عوض 2000 kg/h لحد الماي (كأن كل الدهن ماي) فطلعله −193 kW للماي و <b>Q = −55.49 kW</b>. الصحيح بـ 1600 kg/h هو <b>−16.9 kW</b>. إذا جه بالامتحان، اكتب الحل الصحيح ووضّح الكتلة.'
})}
`
  });

  // ---------------- midterm past-exam questions (inserted into the exams page)
  E.midExams = () => {
    const T = (id, title) => { if (!E.examTypes.some(x => x.id === id)) E.examTypes.push({ id, title, scope: mid }); return `<h2 id="t-${id}" data-scope="mid">${title} <span class="tag new">جديد للميد</span></h2>`; };
    return R`
${T('hxcp', 'نوع 9: مبادل حراري ويا متعددة حدود Cp')}
${E.ex({
  id: 'f23-q3', scope: mid, title: 'Final 8/1/2023 — Q3 (20 Marks)', src: 'Final 2023 · Example 1.19 بصياغة ثانية',
  statement: 'In a shell-and-tube heat exchanger, steam is used as the heating medium to raise the temperature of 1000 Kmol/hr of liquid mixture 40°C per hour. The liquid mixture consists of 70% acetone and 30% benzene. Steam of 90% purity enters the heat exchanger in the shell as saturated vapour and departs as saturated liquid water. The pressure gauge pointer on the steam stream and the saturated water stream pointed to the same value (16 bar). Determine the mass flow rate of steam required for this purpose if you know that the temperature of the inlet liquid mixture stream is 10°C.<br>C<sub>P</sub> (Acetone liquid J/mol.°C) = 123 + 0.186 T<br>C<sub>P</sub> (Benzene liquid J/mol.°C) = 126.5 + 0.234 T',
  given: [['ṅ', '1000 kmol/h', ''], ['T₁ → T₂', '10°C, raised by 40°C', '10 → 50°C'], ['x', '"90% purity"', '0.90'], ['P', '"pressure gauge … 16 bar"', '16 + 1.01 ≈ 17 bar abs']],
  find: 'ṁ_s',
  assume: [['T_2 = 50^\\circ\\text{C}', '"raise the temperature … 40°C" يعني ΔT = 40.'], ['x = 0.9', '"90% purity" = جودة 90%.'], ['P_{abs} \\approx 17\\ \\text{bar}', 'الرقم من <b>pressure gauge</b> فهو gauge: 16 + 1.013 ≈ 17 bar (مثل ملاحظة الطالب بالورقة).']],
  steps: [
    [R`\Delta h_{mix} = 124(40) + 0.10(50^2-10^2) = 5200\ \text{J/mol}`, 'نفس مثال 1.19.'],
    [R`\text{Table 8, 1.7 MN/m}^2:\ h_{fg} = 1921.5 \Rightarrow \Delta h_s = -0.9(1921.5) = -1729.4\ \text{kJ/kg}`, 'تكثف بنفس الضغط → Δh = −x·h<sub>fg</sub>.'],
    [R`\dot m_s = \frac{10^{6}\ \text{mol/h}\times5.200\ \text{kJ/mol}}{1729.4} = 3.01\times10^{3}\ \text{kg/h}`, '']
  ],
  answer: R`\[\dot m_s \approx 3.0\times10^{3}\ \text{kg/h}\ \ (\text{if 16 bar abs is used: } 2990\ \text{kg/h})\]`,
  check: 'قريب جداً من مثال 1.19 لأن h<sub>fg</sub> ما يتغير كثير بين 16 و 17 bar ✓.',
  trap: 'كلمة "gauge" — الدكتورة حطتها حتى تشوف تنتبه للـ absolute لو لا. اكتب فرضيتك.'
})}
${E.ex({
  id: 'f25-q2', scope: mid, title: 'Final 28/12/2025 — Q2 (16.6 Marks)', src: 'Final 2025 · Example 1.19 بالكلفن و MPa',
  statement: 'A liquid mixture flows at a rate of 1.0 × 10⁶ mol/h, consisting of 70 mole % CH₃COCH₃ and 30 mole % C₆H₆. The mixture is heated in a shell-and-tube heat exchanger from 283 K to 323 K using steam as the heating medium. The steam enters the shell side of the heat exchanger as a wet saturated steam at a pressure of 1.6 MPa with a 10% liquid water, and leaves the exchanger as saturated liquid water at the same pressure. Determine the required mass flow rate of the inlet steam (kg/s).',
  given: [['ṅ', '1.0×10⁶ mol/h', '1000 kmol/h'], ['T', '283 → 323 K', '10 → 50°C'], ['P', '1.6 MPa', '16 bar abs'], ['10% liquid', '', 'x = 0.90'], ['Cp', 'from Appendix A.2 (sheet)', 'acetone l: 123.0 + 0.186T; benzene l: 126.5 + 0.234T (°C)']],
  find: 'ṁ_s (kg/s)',
  steps: [
    [R`T: 283 - 273 = 10^\circ\text{C},\ \ 323 - 273 = 50^\circ\text{C}`, 'معادلات A.2 للسوائل بعمود Form = °C — لازم نحول!'],
    [R`\Delta h_{mix} = 5200\ \text{J/mol};\quad \Delta h_s = -0.9(1933.2) = -1740\ \text{kJ/kg}`, 'نفس مثال 1.19 (1.6 MPa = 16 bar abs).'],
    [R`\dot m_s = \frac{5.20\times10^{6}\ \text{kJ/h}}{1740} = 2990\ \text{kg/h} = \frac{2990}{3600} = 0.830\ \text{kg/s}`, 'المطلوب بالـ kg/s.']
  ],
  answer: R`\[\dot m_s \approx 0.83\ \text{kg/s}\]`,
  check: 'نفس جواب مثال 1.19 بس بوحدة ثانية ✓.',
  trap: 'إذا عوضت 283 و 323 مباشرة بمعادلة °C يطلع Δh = 124(40) + 0.1(323² − 283²) ≈ 7400 J/mol — غلط بـ 42%! و "10% liquid" = x = 0.9.'
})}
<div class="card" data-scope="mid"><b>Final 26/12/2024 — Q2:</b> نفس <b>مثال 1.21</b> حرفياً (تبريد الدهن). الجواب الصحيح <b>Q<sub>loss</sub> ≈ −16.9 kW</b> (كتلة الماي 1600 kg/h). الكتاب طالع −55.49 kW بسبب غلط بكتلة الماي. <a href="#/s15">← شوف الحل الكامل</a></div>

${T('mix', 'نوع 10: الخلط والبويلر')}
${E.ex({
  id: 'f24-q4', scope: mid, title: 'Final 26/12/2024 — Q4 (12.5 Marks)', src: 'Final 2024',
  statement: 'Two streams of H₂O are mixed to form feed to boiler (stream A is 120 kg/min at 30 °C and stream B is 175 kg/min at 65 °C). The existing streams emerges from the boiler through 6 cm I.D pipe. Calculate the required heat input to the boiler in kJ/min. If the system leaving is saturated steam at pressure 17 bar neglect kinetic energy of inlet stream. Given that Ĥ<sub>A</sub> = 125.7 kJ/kg, Ĥ<sub>B</sub> = 217 kJ/kg, outlet stream has Ĥ = 2793 kJ/kg, V̂<sub>g</sub> = 0.1166 m³/kg?',
  diagram: E.dev({ kind: 'box', name: 'Mix + Boiler', ins: [['A: 120 kg/min, 30°C', 'h = 125.7'], ['B: 175 kg/min, 65°C', 'h = 217']], outs: [['C: sat. steam 17 bar', 'h = 2793, D = 6 cm']], Q: 'Q = ?', Qdir: 'in' }),
  given: [['ṁ_A, ṁ_B', '120, 175 kg/min', ''], ['ṁ_C', 'mass balance', '295 kg/min'], ['D', '6 cm', '0.06 m'], ['v_g', '0.1166 m³/kg', '']],
  find: 'Q (kJ/min)',
  assume: [['W_s = 0,\\ \\Delta PE = 0', 'بويلر.'], ['\\upsilon_{A},\\upsilon_B \\approx 0', 'مذكور: نهمل KE للمداخل.']],
  steps: [
    [R`\dot m_C = 120 + 175 = 295\ \text{kg/min} = 4.917\ \text{kg/s}`, 'موازنة كتلة.'],
    [R`\upsilon_C = \frac{\dot m v_g}{A} = \frac{4.917\times0.1166}{\pi(0.06)^2/4} = 202.8\ \text{m/s}`, ''],
    [R`\Delta\dot H = 295(2793) - 120(125.7) - 175(217) = 7.709\times10^{5}\ \text{kJ/min}`, 'الطالع − الداخل.'],
    [R`\Delta KE = \tfrac12(295)(202.8)^2/1000 = 6.06\times10^{3}\ \text{kJ/min}`, 'kg/min × m²/s² = J/min → ÷1000.'],
    [R`Q = \Delta\dot H + \Delta KE = 7.709\times10^{5} + 6.06\times10^{3} = 7.77\times10^{5}\ \text{kJ/min}`, '']
  ],
  answer: R`\[Q \approx 7.77\times10^{5}\ \text{kJ/min}\]`,
  check: 'ΔKE أقل من 1% — بس السؤال يقصد تحسبه لأن عطاك القطر و v<sub>g</sub>.',
  trap: 'خلي الوحدات بالدقيقة كلها (المطلوب kJ/min) — بس السرعة لازم بالـ m/s.'
})}

${T('cpconv', 'نوع 11: تحويل معادلة Cp بين الوحدات')}
${E.ex({
  id: 'f25-q3a', scope: mid, title: 'Final 28/12/2025 — Q3 (1)', src: 'Final 2025',
  statement: 'A heat capacity equation for acetylene is given by C<sub>p</sub> = 9.89 + 0.8273 × 10⁻²T − 0.3783 × 10⁻⁵T² where T is in °F and C<sub>p</sub> is in Btu/(lb mol)(°F).<br>a. Convert the C<sub>p</sub> equation so that T can be inserted in the equation in °R, and the units of C<sub>p</sub> will be Btu/(lb mol)(°R).<br>b. Convert the C<sub>p</sub> equation so that T can be inserted in the equation in K and the units of C<sub>p</sub> will be J/(g mol)(K).',
  given: [['T_°F', 'T_°R − 459.67', ''], ['T_°F', '1.8 T_K − 459.67', ''], ['1 Btu/(lbmol·°F)', '= 1 Btu/(lbmol·°R)', '= 4.184 J/(gmol·K)']],
  find: 'Cp(T_R) and Cp(T_K)',
  assume: [['\\Delta T(^\\circ\\text{F}) = \\Delta T(^\\circ\\text{R})', 'فرق درجة واحدة بالـ °F = فرق درجة بالـ °R، فوحدة Cp ما تتغير بالجزء (a).']],
  steps: [
    [R`\text{(a) } C_p = 9.89 + 0.8273\times10^{-2}(T_R-459.67) - 0.3783\times10^{-5}(T_R-459.67)^2`, 'نعوض T<sub>F</sub> بدلالة T<sub>R</sub>.'],
    [R`(T_R-459.67)^2 = T_R^2 - 919.34\,T_R + 211\,296`, 'نفك التربيع.'],
    [R`a' = 9.89 - 3.803 - 0.799 = 5.288;\quad b' = 0.8273\times10^{-2} + 0.3783\times10^{-5}(919.34) = 1.175\times10^{-2}`, 'نجمع الحدود الثابتة وحدود T.'],
    [R`C_p\left[\tfrac{\text{Btu}}{\text{lbmol}\,{}^\circ\text{R}}\right] = 5.288 + 1.175\times10^{-2}\,T_R - 0.3783\times10^{-5}\,T_R^2`, 'c ما يتغير.'],
    [R`\text{(b) } T_F = 1.8T_K - 459.67:\ C_p = 5.288 + 1.8(1.175\times10^{-2})T_K - (1.8)^2(0.3783\times10^{-5})T_K^2`, 'نفس الشي بس كل T ينضرب ×1.8 (مع الأس).'],
    [R`C_p\left[\tfrac{\text{Btu}}{\text{lbmol}\,{}^\circ\text{F}}\right] = 5.288 + 2.115\times10^{-2}T_K - 1.226\times10^{-5}T_K^2`, ''],
    [R`\times4.184:\quad C_p\left[\tfrac{\text{J}}{\text{gmol K}}\right] = 22.12 + 8.850\times10^{-2}\,T_K - 5.128\times10^{-5}\,T_K^2`, 'نضرب كل المعادلة بمعامل الوحدة.']
  ],
  answer: R`\[\text{(a) } C_p = 5.288 + 1.175\times10^{-2}T - 3.783\times10^{-6}T^2\quad \text{(b) } C_p = 22.12 + 8.850\times10^{-2}T - 5.128\times10^{-5}T^2\]`,
  check: 'عند 100°F (559.67°R، 310.93 K): الأصلية = 10.68، (a) = 10.68، و (b) ÷ 4.184 = 10.68 ✓.',
  trap: 'لازم تعوض T(°F) بدلالة الوحدة الجديدة <b>داخل</b> المعادلة وتفك الأقواس — مو تضرب المعاملات بس. وانتبه: معامل الوحدة (4.184) يضرب <b>كل</b> المعادلة.'
})}
`;
  };

})();
