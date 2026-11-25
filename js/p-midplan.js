(function () {
  const R = String.raw, E = window.EB;
  const tank = (id, lbl) => R`<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(id)}
    <path class="st" d="M40 30 L40 190 L220 190 L220 30"/><rect x="41" y="60" width="178" height="129" class="water"/>
    <line x1="41" y1="60" x2="219" y2="60" stroke="var(--w)" stroke-width="2"/><text x="130" y="52" text-anchor="middle" class="lb">(1) free surface: P₁ = atm, υ₁ ≈ 0</text>
    <path class="st" d="M220 170 L330 170" marker-end="url(#ah${id})" color="var(--fg)"/><text x="335" y="174" class="lb">(2) jet: P₂ = atm, υ₂ = ?</text>
    <path class="st" d="M250 60 L250 170" stroke-dasharray="4 3"/><text x="258" y="120" class="lb">${lbl}</text></svg>`;
  const pipe = (id, a, b) => R`<svg viewBox="0 0 560 170" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(id)}
    <path d="M20 50 L250 50 L320 70 L540 70 L540 110 L320 110 L250 130 L20 130 Z" fill="var(--accent-soft)" stroke="var(--fg)" stroke-width="1.5"/>
    <path class="st" d="M40 90 L520 90" marker-end="url(#ah${id})" color="var(--w)" stroke="var(--w)"/>
    <text x="120" y="40" text-anchor="middle" class="lb">(1) ${a}</text><text x="430" y="60" text-anchor="middle" class="lb">(2) ${b}</text></svg>`;

  E.page({
    id: 'midplan', group: 'البداية', title: 'الميد باجر — حسب الدكتورة', scope: 'mid', prio: 'hot',
    render: () => R`
<h1>الميد باجر — حسب توجيهات الدكتورة</h1>
<div class="box midbox"><strong>شنو كالت الدكتورة (من التبليغ)</strong>
<ul>
<li>الامتحان <b>سؤالين بس، مسائل بدون شرح</b>: <b>السؤال الأول برنولي</b>، و<b>السؤال الثاني C<sub>p</sub></b>.</li>
<li>الأمثلة من 19 وفوق ما جايبة منها، بس ممكن تجيب <b>نفس فكرتها من المصادر</b> — لهذا بهاي الصفحة <b>مسائل جديدة</b> بنفس الأفكار.</li>
<li><b>الخلط (Mixing) مهم</b> — أكدت عليه.</li>
<li><b>أشياء بسيطة من الـ Steam Tables</b>.</li>
<li>الأسئلة سهلة. الامتحان باجر 2:30 ظهراً، <b>ساعة وحدة</b>.</li>
</ul></div>
<div class="box warn"><strong>⚠️ الأرقام من الجداول — مو من السؤال</strong> الدكتورة تخليك <b>تطلع الأرقام بنفسك من الجداول</b>: معاملات C<sub>p</sub> من <b>جدول السعات الحرارية</b> بملحق الكتاب، و h و T<sub>sat</sub> من <b>جداول البخار (Haywood)</b>. يعني بكل مسألة <b>أول خطوة = القراءة من الجدول</b>. جيب الجدولين ويا الحاسبة (وهذا الأرجح المقصود بـ "المخطط").</div>

<h2 id="mp-tables">أولاً: الجداول — تعلم تقراها قبل المسائل</h2>
<p>المسائل تحت كلها تبدي بخطوة "اقرا من الجدول". فتعلم الجدولين هنا أول — <b>ابدي بالدرس المرشد</b>، هو يمشي وياك خانة خانة:</p>
<div data-model="tour"></div>
${E.calcTips}
<h3>1) جدول السعات الحرارية (C<sub>p</sub>) — للسؤال الثاني</h3>
<div class="box tip"><strong>🧠 شلون تقرا سطر C<sub>p</sub> (4 أشياء)</strong>
<ol>
<li><b>المادة والحالة (State):</b> l سائل، g غاز. نفس المادة ممكن إلها سطرين (مثل البنزين: سائل وغاز) — اختار حسب حالتها بالسؤال.</li>
<li><b>Form:</b> 1 يعني <span class="ltr">a + bT + cT² + dT³</span>، و 2 يعني <span class="ltr">a + bT + cT⁻²</span>.</li>
<li><b>عمود T:</b> °C أو K — <b>هاي أهم خانة</b>. عوّض حرارتك بنفس الوحدة.</li>
<li><b>a, b, c, d:</b> انتبه للأسس: <span class="ltr">−2.887×10⁻⁵</span> يعني <span class="ltr">−0.00002887</span>. والخانة الفارغة = صفر.</li>
</ol>
الوحدة دائماً <span class="ltr">J/(mol·°C)</span> أو <span class="ltr">J/(mol·K)</span> — فالجواب <span class="ltr">J/mol</span>، اضربه بالمولات (مو بالكيلوغرام!).</div>
<div data-model="cptbl"></div>
<h3>2) جداول البخار (Haywood) — للخلط والأشياء البسيطة</h3>
<ul>
<li><b>Table 8</b> للبخار المشبع: تختار الضغط وتقرا <span class="ltr">T<sub>sat</sub>, h<sub>f</sub>, h<sub>fg</sub>, h<sub>g</sub></span>.</li>
<li><b>Table 9</b> للبخار المحمص: تقرا h من تقاطع الضغط ويا الحرارة.</li>
<li>انتبه للوحدة: <span class="ltr">10 bar = 1.00 MN/m²</span>.</li>
<li>الشرح الكامل ويا تمارين بصفحة <a href="#/tables"><b>شلون أستعمل جداول البخار</b></a>.</li>
</ul>
<div data-model="tbl8"></div>

<h2>خطة الليلة (حوالي 4 ساعات)</h2>
${E.table(['الوقت', 'شنو', 'وين'], [
  ['30 د', '<b>الجداول أول</b>: جرّب جدول C<sub>p</sub> فوق على 5 مواد، و 5 تمارين من جدول البخار', 'فوق ↑ + <a href="#/tables">صفحة الجداول</a>'],
  ['45 د', '<b>برنولي</b>: الوصفة + المسائل B1–B7', 'هاي الصفحة ↓'],
  ['15 د', 'برنولي من الكتاب: مثال 1.13 (الجناح)', '<a href="#/s13">1.3 برنولي</a>'],
  ['60 د', '<b>C<sub>p</sub></b>: الوصفة + المسائل C1–C6 + أمثلة 1.14 و 1.16 و 1.19', 'هاي الصفحة ↓ + <a href="#/s14">1.4</a> + <a href="#/s15">1.5</a>'],
  ['45 د', '<b>الخلط</b>: M1–M3 + مثال 1.20 + سؤال كوز 2026 + فاينل 2024 Q4', 'هاي الصفحة ↓ + <a href="#/exams">أسئلة السنين</a>'],
  ['15 د', 'تحويل وحدات C<sub>p</sub> (فاينل 2025) — احتمال', '<a href="#/exams">أسئلة السنين ← نوع 11</a>']
])}
<p>الطريقة: <b>غطي الحل، وحل على ورقة، بعدين قارن.</b> المسائل هنا مرتبة من الأسهل للأصعب.</p>

<!-- ===================== BERNOULLI ===================== -->
<h2 id="mp-bern">السؤال الأول: برنولي</h2>
${E.eq(R`\frac{P_2 - P_1}{\rho} + \frac{\upsilon_2^2 - \upsilon_1^2}{2} + g\,(z_2 - z_1) = 0`, {
  name: 'Bernoulli (frictionless, no pump)',
  mean: 'بين أي نقطتين على نفس خط الجريان: مجموع طاقة الضغط والحركة والارتفاع ثابت.',
  sym: [['P', 'الضغط (Pa)', 'Pa = N/m²'], [R`\upsilon`, 'السرعة', 'm/s'], ['z', 'الارتفاع', 'm'], [R`\rho`, 'الكثافة (ماء 1000)', 'kg/m³']],
  when: 'ماكو مضخة وماكو احتكاك. إذا السؤال بيه مضخة أو "friction" → استخدم MEB.',
  trick: 'كل حد وحدته J/kg. إذا ضربت المعادلة كلها بـ ρ تصير بالـ Pa: ΔP + ½ρΔυ² + ρgΔz = 0.'
})}
${E.eq(R`\dot V = A_1\upsilon_1 = A_2\upsilon_2 \quad\Rightarrow\quad \upsilon_2 = \upsilon_1\left(\frac{D_1}{D_2}\right)^2`, {
  name: 'Continuity (incompressible)',
  mean: 'نفس التدفق يمر بكل مقطع: إذا الأنبوب ضاق السرعة تزيد.',
  when: 'كل ما يعطيك قطرين — هاي المعادلة الثانية اللي تحتاجها ويا برنولي.',
  trick: 'القطر نصّ → السرعة ×4 (لأن المساحة بالتربيع).'
})}
<div class="box tip"><strong>🧠 وصفة برنولي (5 خطوات)</strong>
<ol>
<li><b>اختار النقطتين</b> 1 و 2: وين تعرف أغلب الأشياء (سطح خزان، مخرج نافورة، قبل وبعد التضيق).</li>
<li><b>اكتب اللي تعرفه:</b> مفتوح للجو → <b>P = 0 gauge</b> (أو كلاهما atm فينطرحون). خزان كبير → <b>υ ≈ 0</b>.</li>
<li><b>Continuity</b> إذا عندك قطرين: υ = V̇/A.</li>
<li><b>عوّض ببرنولي</b> وعزل المجهول.</li>
<li><b>تأكد:</b> وين السرعة أكبر، الضغط أقل.</li>
</ol>
⚠️ استخدم gauge بالنقطتين أو absolute بالنقطتين — لا تخلطهم. والضغط بالـ <b>Pa</b> (kPa × 1000).</div>

${E.ex({
  id: 'mp-b1', scope: 'mid', title: 'B1 — Draining a tank (Torricelli)', src: 'مسألة تدريب (أسلوب المصادر)',
  statement: 'Water flows out of a large open tank through a small hole located 4.0 m below the free surface of the water. Assuming frictionless flow, calculate the velocity of the water jet leaving the hole. If the hole diameter is 2 cm, find the volumetric flow rate.',
  diagram: tank(951, 'Δz = 4 m'),
  given: [['z₁ − z₂', '4.0 m', '4.0 m'], ['D (hole)', '2 cm', '0.02 m'], ['P₁, P₂', 'both atmospheric', 'ΔP = 0']],
  find: 'υ₂ and V̇',
  assume: [['P_1 = P_2 = P_{atm}', 'السطح والنافورة الاثنين مفتوحين للجو.'], [R`\upsilon_1 \approx 0`, 'الخزان كبير، سطحه ينزل ببطء كلش.']],
  steps: [
    [R`0 + \frac{\upsilon_2^2 - 0}{2} + g(z_2 - z_1) = 0`, 'برنولي بعد حذف ΔP و υ₁.'],
    [R`\upsilon_2 = \sqrt{2g(z_1-z_2)} = \sqrt{2(9.81)(4.0)} = 8.86\ \text{m/s}`, 'هذا قانون توريشيلي.'],
    [R`\dot V = \upsilon_2 A = 8.86\times\frac{\pi(0.02)^2}{4} = 2.78\times10^{-3}\ \text{m}^3/\text{s}\ (10.0\ \text{m}^3/\text{h})`, '']
  ],
  answer: R`\[\upsilon_2 \approx 8.86\ \text{m/s},\qquad \dot V \approx 2.78\times10^{-3}\ \text{m}^3/\text{s}\]`,
  check: 'نفس سرعة جسم يطيح من 4 m ✓.',
  trap: 'z₂ − z₁ = −4 (النافورة أوطى). إذا خليتها +4 يطلع الجذر سالب.'
})}

${E.ex({
  id: 'mp-b2', scope: 'mid', title: 'B2 — Horizontal pipe contraction', src: 'مسألة تدريب',
  statement: 'Water (ρ = 1000 kg/m³) flows at 0.02 m³/s through a horizontal pipe that contracts from 10 cm to 5 cm inside diameter. If the pressure in the larger section is 200 kPa, calculate the pressure in the smaller section. Neglect friction.',
  diagram: pipe(952, 'D = 10 cm, P₁ = 200 kPa', 'D = 5 cm, P₂ = ?'),
  given: [[R`\(\dot V\)`, '0.02 m³/s', ''], ['D₁, D₂', '10 cm, 5 cm', '0.10, 0.05 m'], ['P₁', '200 kPa', '200 000 Pa'], ['Δz', 'horizontal', '0']],
  find: 'P₂',
  steps: [
    [R`\upsilon_1 = \frac{0.02}{\pi(0.10)^2/4} = 2.55\ \text{m/s},\qquad \upsilon_2 = \frac{0.02}{\pi(0.05)^2/4} = 10.19\ \text{m/s}`, 'Continuity.'],
    [R`P_2 = P_1 - \frac{\rho}{2}(\upsilon_2^2-\upsilon_1^2) = 200\,000 - 500\,(10.19^2 - 2.55^2)`, 'برنولي مضروب بـ ρ، و Δz = 0.'],
    [R`P_2 = 200\,000 - 48\,630 = 151\,370\ \text{Pa} \approx 151.4\ \text{kPa}`, '']
  ],
  answer: R`\[P_2 \approx 151\ \text{kPa}\]`,
  check: 'السرعة زادت ×4 فالضغط نقص ✓.',
  trap: 'لا تنسى تربع السرعات. و ρ/2 = 500.'
})}

${E.ex({
  id: 'mp-b3', scope: 'mid', title: 'B3 — Contraction with elevation change', src: 'مسألة تدريب',
  statement: 'Water flows at a rate of 0.05 m³/s from point 1 (inside diameter 15 cm, pressure 300 kPa, elevation 0 m) to point 2 (inside diameter 10 cm, elevation 8 m). Assuming frictionless flow, find the pressure at point 2.',
  given: [[R`\(\dot V\)`, '0.05 m³/s', ''], ['Point 1', 'D = 15 cm, P = 300 kPa, z = 0', ''], ['Point 2', 'D = 10 cm, z = 8 m', '']],
  find: 'P₂',
  steps: [
    [R`\upsilon_1 = \frac{0.05}{\pi(0.15)^2/4} = 2.83\ \text{m/s},\qquad \upsilon_2 = \frac{0.05}{\pi(0.10)^2/4} = 6.37\ \text{m/s}`, ''],
    [R`\frac{\upsilon_2^2-\upsilon_1^2}{2} = \frac{40.53 - 8.01}{2} = 16.26\ \text{J/kg};\qquad g\Delta z = 9.81(8) = 78.48\ \text{J/kg}`, 'نحسب كل حد لوحده — أسهل وأقل غلط.'],
    [R`\frac{P_2 - P_1}{\rho} = -(16.26 + 78.48) = -94.74\ \text{J/kg}`, ''],
    [R`P_2 = 300\,000 - 1000(94.74) = 205\,260\ \text{Pa} \approx 205\ \text{kPa}`, '']
  ],
  answer: R`\[P_2 \approx 205\ \text{kPa}\]`,
  check: 'الماي صعد وسرعته زادت — الاثنين ياكلون من الضغط ✓.',
  trap: 'gΔz بالـ J/kg — اضربه بـ ρ حتى يصير Pa (78.48 × 1000 = 78 480 Pa).'
})}

${E.ex({
  id: 'mp-b4', scope: 'mid', title: 'B4 — Venturi meter', src: 'مسألة تدريب (مشهورة بالمصادر)',
  statement: 'A horizontal venturi meter has an inlet diameter of 8 cm and a throat diameter of 4 cm. Water flows through it and the measured pressure difference between the inlet and the throat is 30 kPa. Neglecting friction, calculate the volumetric flow rate of water.',
  diagram: pipe(954, 'inlet D = 8 cm', 'throat D = 4 cm'),
  given: [['D₁, D₂', '8 cm, 4 cm', '0.08, 0.04 m'], ['P₁ − P₂', '30 kPa', '30 000 Pa']],
  find: 'V̇',
  steps: [
    [R`\upsilon_2 = \upsilon_1\left(\frac{D_1}{D_2}\right)^2 = 4\,\upsilon_1`, 'Continuity — القطر نص فالسرعة ×4.'],
    [R`\frac{P_1-P_2}{\rho} = \frac{\upsilon_2^2-\upsilon_1^2}{2} = \frac{16\upsilon_1^2 - \upsilon_1^2}{2} = 7.5\,\upsilon_1^2`, 'برنولي بين المدخل والعنق.'],
    [R`\frac{30\,000}{1000} = 7.5\,\upsilon_1^2 \Rightarrow \upsilon_1 = 2.0\ \text{m/s},\ \ \upsilon_2 = 8.0\ \text{m/s}`, ''],
    [R`\dot V = \upsilon_1 A_1 = 2.0\times\frac{\pi(0.08)^2}{4} = 1.005\times10^{-2}\ \text{m}^3/\text{s}`, '']
  ],
  answer: R`\[\dot V \approx 0.0101\ \text{m}^3/\text{s} = 10.05\ \text{L/s}\]`,
  check: 'الفنتوري يقيس التدفق من فرق الضغط — كل ما زاد ΔP زاد التدفق ✓.',
  trap: 'هنا مجهولين (υ₁ و υ₂) — لازم تعوض continuity داخل برنولي قبل الحل.'
})}

${E.ex({
  id: 'mp-b5', scope: 'mid', title: 'B5 — Aircraft wing (Example 1.13 with new numbers)', src: 'مسألة تدريب — نفس مثال 1.13',
  statement: 'The pressure difference between the underside and the top of the wing needed to lift an aircraft is 0.05 atm. The aircraft velocity is 250 m/s and the air density is 0.41 kg/m³. Assuming the velocity of the air on the underside of the wing equals the plane velocity, find the velocity of the air on the topside of the wing.',
  given: [['P_under − P_top', '0.05 atm', '5066 Pa'], ['υ_under', '250 m/s', ''], ['ρ', '0.41 kg/m³', '']],
  find: 'υ_top',
  steps: [
    [R`\upsilon_{top}^2 = \upsilon_{under}^2 + \frac{2(P_{under}-P_{top})}{\rho} = 250^2 + \frac{2(5066)}{0.41}`, 'نفس ترتيب مثال 1.13.'],
    [R`\upsilon_{top}^2 = 62\,500 + 24\,713 = 87\,213 \Rightarrow \upsilon_{top} = 295\ \text{m/s}`, '']
  ],
  answer: R`\[\upsilon_{top} \approx 295\ \text{m/s}\]`,
  check: 'فوق الجناح أسرع → ضغطه أقل → الطيارة ترتفع ✓.',
  trap: 'atm → Pa: × 101 325.'
})}

${E.ex({
  id: 'mp-b6', scope: 'mid', title: 'B6 — Fire-hose nozzle', src: 'مسألة تدريب',
  statement: 'Water flows through a horizontal fire hose of 5 cm inside diameter at a gauge pressure of 400 kPa and leaves to the atmosphere through a nozzle of 2 cm diameter. Neglecting friction, calculate the exit velocity and the volumetric flow rate.',
  given: [['D₁ (hose)', '5 cm', '0.05 m'], ['D₂ (nozzle)', '2 cm', '0.02 m'], ['P₁', '400 kPa gauge', '400 000 Pa (gauge)'], ['P₂', 'atmosphere', '0 gauge']],
  find: 'υ₂, V̇',
  steps: [
    [R`\upsilon_1 = \upsilon_2\left(\frac{0.02}{0.05}\right)^2 = 0.16\,\upsilon_2`, 'Continuity.'],
    [R`\frac{P_1 - P_2}{\rho} = \frac{\upsilon_2^2 - \upsilon_1^2}{2} \Rightarrow 400 = \frac{\upsilon_2^2(1 - 0.0256)}{2}`, '400 000 / 1000 = 400 J/kg. والاثنين gauge.'],
    [R`\upsilon_2 = \sqrt{\frac{800}{0.9744}} = 28.7\ \text{m/s}`, ''],
    [R`\dot V = 28.7\times\frac{\pi(0.02)^2}{4} = 9.0\times10^{-3}\ \text{m}^3/\text{s}`, '']
  ],
  answer: R`\[\upsilon_2 \approx 28.7\ \text{m/s},\qquad \dot V \approx 9.0\times10^{-3}\ \text{m}^3/\text{s}\]`,
  check: 'ضغط عالي ← سرعة نافورة عالية ✓.',
  trap: 'P₂ للجو = 0 gauge لأن P₁ معطى gauge. لا تجمع atm لوحدة بس.'
})}

${E.ex({
  id: 'mp-b7', scope: 'mid', title: 'B7 — Pressurized tank', src: 'مسألة تدريب',
  statement: 'A closed tank contains water with air above it at 150 kPa (gauge). Water discharges to the atmosphere through a small opening located 3 m below the water surface. Assuming frictionless flow and a large tank, find the discharge velocity.',
  given: [['P₁ (air above water)', '150 kPa gauge', '150 000 Pa'], ['P₂', 'atmosphere', '0 gauge'], ['z₁ − z₂', '3 m', '']],
  find: 'υ₂',
  steps: [
    [R`\frac{0 - 150\,000}{1000} + \frac{\upsilon_2^2}{2} + 9.81(0 - 3) = 0`, 'النقطة 1 = سطح الماي بالخزان (υ₁ ≈ 0)، النقطة 2 = الفتحة.'],
    [R`\frac{\upsilon_2^2}{2} = 150 + 29.43 = 179.43 \Rightarrow \upsilon_2 = 18.9\ \text{m/s}`, 'الضغط والارتفاع الاثنين يدفعون الماي.']
  ],
  answer: R`\[\upsilon_2 \approx 18.9\ \text{m/s}\]`,
  check: 'أكبر من B1 (8.86 m/s) لأن الضغط فوق الماي يضيف دفع ✓.',
  trap: 'خلي ΔP و gΔz بإشاراتهم الصحيحة: (P₂ − P₁) سالب و (z₂ − z₁) سالب.'
})}
<div class="box info"><strong>إذا السؤال بيه مضخة أو احتكاك</strong> فهو MEB مو برنولي: <span class="ltr">−Ws/ṁ = ΔP/ρ + Δυ²/2 + gΔz + F</span>. راجع <a href="#/s12">مثال 1.11 و 1.12</a> (10 دقايق).</div>

<!-- ===================== Cp ===================== -->
<h2 id="mp-cp">السؤال الثاني: C<sub>p</sub></h2>
<div class="box tip"><strong>🧠 وصفة C<sub>p</sub> (6 خطوات) — الجدول أول</strong>
<ol>
<li><b>افتح جدول السعات الحرارية</b>: لگّي المادة وحالتها (l أو g)، واكتب a, b, c, d و Form ووحدة T. <a href="#mp-tables">(الجدول فوق ↑)</a></li>
<li><b>شوف وحدة T</b> بالسطر (°C أو K) — وحوّل حرارتك لنفس الوحدة.</li>
<li>إذا C<sub>p</sub> <b>ثابت</b>: <span class="ltr">Δh = C<sub>p</sub>(T₂ − T₁)</span>.</li>
<li>إذا <b>معادلة</b>: كامل حد بحد: <span class="ltr">aΔT + (b/2)(T₂² − T₁²) + (c/3)(T₂³ − T₁³) + (d/4)(T₂⁴ − T₁⁴)</span>.</li>
<li>إذا <b>خليط</b>: <span class="ltr">C<sub>p,mix</sub> = Σ y<sub>i</sub> C<sub>p,i</sub></span> — ادمج المعاملات أول.</li>
<li>اضرب بالتدفق (<b>انتبه mol و kmol و J و kJ</b>). وعاء مسدود → C<sub>v</sub> و Q = ΔU.</li>
</ol></div>

${E.ex({
  id: 'mp-c1', scope: 'mid', title: 'C1 — Constant heat capacity', src: 'مسألة تدريب — مثل مثال 1.16',
  statement: 'Oil flowing at 500 kg/h is heated from 20°C to 120°C in a heat exchanger. The average heat capacity of the oil is 2.1 kJ/kg·°C. Calculate the rate of heat required.',
  given: [['ṁ', '500 kg/h', ''], ['Cp', '2.1 kJ/kg·°C (constant)', ''], ['T₁ → T₂', '20 → 120°C', 'ΔT = 100°C']],
  find: 'Q',
  assume: [[R`W_s = 0,\ \Delta KE = \Delta PE = 0`, 'مبادل حراري → Q = ΔḢ.']],
  steps: [[R`Q = \dot m\,C_p\,(T_2-T_1) = 500\times2.1\times100 = 1.05\times10^{5}\ \text{kJ/h}`, ''], [R`Q = \frac{1.05\times10^5}{3600} = 29.2\ \text{kW}`, '']],
  answer: R`\[Q = 1.05\times10^{5}\ \text{kJ/h} \approx 29.2\ \text{kW}\]`,
  check: 'موجب = حرارة داخلة للزيت ✓.', trap: 'ΔT بالـ °C = ΔT بالـ K — ما يفرق إذا C<sub>p</sub> ثابت.'
})}

${E.ex({
  id: 'mp-c2', scope: 'mid', title: 'C2 — Heating CO₂ with a Cp polynomial', src: 'مسألة تدريب (Appendix A.2)',
  statement: 'Calculate the heat required to raise the temperature of 100 mol/s of carbon dioxide gas from 25°C to 500°C at constant pressure. Use the heat capacity table in the appendix.',
  given: [['ṅ', '100 mol/s', ''], ['T₁ → T₂', '25 → 500°C', ''], ['Cp', 'from the table', '']],
  find: 'Q',
  steps: [
    [R`\text{Table: CO}_2,\ \text{state g, Form 1, } T\ \text{in }^\circ\text{C}:\ a = 36.11,\ b = 0.04233,\ c = -2.887\times10^{-5},\ d = 7.464\times10^{-9}`, '<b>الخطوة الأولى: الجدول.</b> سطر 15 (Carbon dioxide). وحدة T بالسطر °C، والحرارة بالسؤال °C — فنعوض مباشرة.'],
    [R`a(T_2-T_1) = 36.11(500-25) = 17\,152\ \text{J/mol}`, 'كل حد لوحده — أسهل تتابعه بالحاسبة.'],
    [R`\tfrac{b}{2}(T_2^2-T_1^2) = \tfrac{4.233\times10^{-2}}{2}(500^2-25^2) = 5\,278`, ''],
    [R`\tfrac{c}{3}(T_2^3-T_1^3) = \tfrac{-2.887\times10^{-5}}{3}(500^3-25^3) = -1\,203`, 'c سالب فالحد سالب.'],
    [R`\tfrac{d}{4}(T_2^4-T_1^4) = \tfrac{7.464\times10^{-9}}{4}(500^4-25^4) = 117`, ''],
    [R`\Delta h = 17\,152 + 5\,278 - 1\,203 + 117 = 21\,344\ \text{J/mol}`, ''],
    [R`Q = \dot n\,\Delta h = 100\times21\,344 = 2.134\times10^{6}\ \text{J/s} = 2134\ \text{kW}`, '']
  ],
  answer: R`\[Q \approx 2.13\times10^{3}\ \text{kW}\]`,
  check: 'متوسط C<sub>p</sub> = 21 344/475 = 44.9 J/mol·°C — بين C<sub>p</sub>(25) = 37.2 و C<sub>p</sub>(500) = 51.0 ✓.',
  trap: 'لا تعوض بالكلفن — المعادلة بالـ °C. وانتبه لإشارة c.'
})}

${E.ex({
  id: 'mp-c3', scope: 'mid', title: 'C3 — Air with the Kelvin form', src: 'مسألة تدريب (Appendix A.2 — سطر الهوا بالـ K)',
  statement: 'Air is heated from 300 K to 600 K. Using the heat capacity table in the appendix, calculate Δh per mole of air.',
  given: [['T₁ → T₂', '300 → 600 K', 'K'], ['Cp', 'from the table', '']],
  find: 'Δh',
  steps: [
    [R`\text{Table: Air, g, Form 1, } T\ \text{in K}:\ a = 28.09,\ b = 0.001965,\ c = 0.4799\times10^{-5},\ d = -1.965\times10^{-9}`, '<b>الجدول أول.</b> الهوا إله سطرين (°C و K). حرارتنا بالـ K فناخذ سطر K ونعوض مباشرة.'],
    [R`a\Delta T = 28.09(300) = 8427`, ''],
    [R`\tfrac{b}{2}(600^2-300^2) = 0.9825\times10^{-3}(270\,000) = 265.3`, ''],
    [R`\tfrac{c}{3}(600^3-300^3) = 1.600\times10^{-6}(1.89\times10^{8}) = 302.3`, ''],
    [R`\tfrac{d}{4}(600^4-300^4) = -4.913\times10^{-10}(1.215\times10^{11}) = -59.7`, ''],
    [R`\Delta h = 8427 + 265.3 + 302.3 - 59.7 = 8935\ \text{J/mol}`, '']
  ],
  answer: R`\[\Delta h \approx 8.93\ \text{kJ/mol}\]`,
  check: 'لو استخدمت سطر الهوا بالـ °C (26.85 → 326.85°C) يطلع 8934 J/mol — نفس الجواب ✓. يعني المهم تطابق الوحدة ويا السطر.',
  trap: 'الهوا إله سطرين بالجدول (°C و K) بمعاملات مختلفة. اختار السطر حسب وحدة حرارتك.'
})}

${E.ex({
  id: 'mp-c4', scope: 'mid', title: 'C4 — Closed rigid tank with Cv', src: 'مسألة تدريب — مثل مثال 1.14',
  statement: 'A closed rigid tank contains 50 kg of a fluid that is heated from 25°C to 100°C. The constant-volume heat capacity is C<sub>v</sub> (kJ/kg·°C) = 0.75 + 1.2×10⁻³T. Calculate the heat added.',
  given: [['m', '50 kg', ''], ['T', '25 → 100°C', ''], ['Cv', '0.75 + 1.2×10⁻³T', 'kJ/kg·°C']],
  find: 'Q',
  assume: [['W = 0', 'وعاء صلب.'], [R`\Delta KE = \Delta PE = 0`, '']],
  steps: [
    [R`Q = \Delta U = m\left[0.75(T_2-T_1) + \tfrac{1.2\times10^{-3}}{2}(T_2^2-T_1^2)\right]`, 'مغلق → C<sub>v</sub> و ΔU.'],
    [R`= 50\left[0.75(75) + 0.6\times10^{-3}(100^2-25^2)\right] = 50\,[56.25 + 5.625]`, ''],
    [R`Q = 3094\ \text{kJ}`, '']
  ],
  answer: R`\[Q \approx 3.09\times10^{3}\ \text{kJ}\]`,
  check: 'C<sub>v</sub> معدل ≈ 0.825 × 50 × 75 ≈ 3094 ✓.', trap: 'وعاء مسدود → C<sub>v</sub> مو C<sub>p</sub>، والجواب kJ (مو kJ/s).'
})}

${E.ex({
  id: 'mp-c5', scope: 'mid', title: 'C5 — Gas mixture (Σ yᵢCpᵢ)', src: 'مسألة تدريب — فكرة مثال 1.19 من المصادر',
  statement: 'A gas mixture of 60 mol% CO₂ and 40 mol% CO flowing at 200 mol/min is heated from 100°C to 400°C. Using the heat capacity table in the appendix, calculate the heat required (kW).',
  given: [['ṅ', '200 mol/min', ''], ['y', '0.6 CO₂, 0.4 CO', ''], ['T', '100 → 400°C', ''], ['Cp', 'from the table', '']],
  find: 'Q',
  steps: [
    [R`\text{CO}_2\ (\text{g},\ ^\circ\text{C}):\ 36.11,\ 0.04233,\ -2.887\times10^{-5},\ 7.464\times10^{-9}`, '<b>الجدول أول:</b> سطر 15 (Carbon dioxide).'],
    [R`\text{CO}\ (\text{g},\ ^\circ\text{C}):\ 28.95,\ 0.00411,\ 0.3548\times10^{-5},\ -2.220\times10^{-9}`, 'سطر 16 (Carbon monoxide). الاثنين بالـ °C فنكدر ندمجهم.'],
    [R`a_{mix} = 0.6(36.11) + 0.4(28.95) = 33.25`, 'ادمج كل معامل بالكسور المولية.'],
    [R`b_{mix} = 0.6(4.233\times10^{-2}) + 0.4(0.411\times10^{-2}) = 2.704\times10^{-2}`, ''],
    [R`c_{mix} = -1.590\times10^{-5},\qquad d_{mix} = 3.590\times10^{-9}`, ''],
    [R`\Delta h = 33.25(300) + \tfrac{2.704\times10^{-2}}{2}(400^2-100^2) - \tfrac{1.590\times10^{-5}}{3}(400^3-100^3) + \tfrac{3.590\times10^{-9}}{4}(400^4-100^4)`, ''],
    [R`\Delta h = 9974 + 2028 - 334 + 23 = 11\,691\ \text{J/mol}`, ''],
    [R`Q = 200\times11\,691 = 2.338\times10^{6}\ \text{J/min} = 39.0\ \text{kW}`, '÷60 للدقيقة و ÷1000 للـ kW.']
  ],
  answer: R`\[Q \approx 2.34\times10^{3}\ \text{kJ/min} \approx 39.0\ \text{kW}\]`,
  check: 'لو حسبت كل غاز لوحده وجمعت 0.6Δh<sub>CO₂</sub> + 0.4Δh<sub>CO</sub> يطلع نفس الرقم (11 691) ✓.',
  trap: 'الكسور مولية فالتدفق لازم بالمول. ولا تنسى J/min → kW.'
})}

${E.ex({
  id: 'mp-c6', scope: 'mid', title: 'C6 — Cp + steam tables (heating with condensing steam)', src: 'مسألة تدريب — نفس فكرة مثال 1.19 بس أبسط',
  statement: 'Liquid benzene flowing at 2000 mol/h is heated from 20°C to 60°C in a heat exchanger using saturated steam at 5 bar, which leaves as saturated liquid at the same pressure. Using the heat capacity table and the steam tables, calculate the steam flow rate required.',
  diagram: E.dev({ kind: 'hx', name: 'HX', ins: [['benzene 2000 mol/h', '20°C']], outs: [['benzene 60°C']], cold: { in: ['sat. steam 5 bar'], out: ['sat. liquid 5 bar'] } }),
  given: [['ṅ benzene', '2000 mol/h', ''], ['T', '20 → 60°C', ''], ['Steam', 'sat. vapour → sat. liquid, 5 bar', 'Δh = −h_fg']],
  find: 'ṁ_steam',
  assume: [['Q = 0', 'المبادل كله معزول.'], [R`W_s = 0,\ \Delta KE=\Delta PE=0`, '']],
  steps: [
    [R`\text{Table: Benzene, state } \textbf{l}\text{, } ^\circ\text{C}:\ a = 126.5,\ b = 0.234\ (c = d = 0)`, '<b>الجدول أول:</b> البنزين إله سطرين — <b>سائل (l)</b> وغاز (g). السؤال يكول liquid فناخذ سطر l. والمدى 6–67°C يغطي 20–60 ✓.'],
    [R`\text{Steam table (Table 8, 0.50 MN/m}^2):\ h_{fg} = 2107.4\ \text{kJ/kg}`, 'والقراءة الثانية من جدول البخار قبل الحساب.'],
    [R`\Delta h_{benz} = 126.5(40) + \tfrac{0.234}{2}(60^2-20^2) = 5060 + 374 = 5434\ \text{J/mol}`, ''],
    [R`\dot Q_{benz} = 2000\times5.434 = 10\,869\ \text{kJ/h}`, ''],
    [R`\dot m_s = \frac{10\,869}{2107.4} = 5.16\ \text{kg/h}`, 'البخار يتكثف بس فيعطي h<sub>fg</sub> لكل kg. الحرارة اللي يعطيها البخار = اللي ياخذها البنزين.']
  ],
  answer: R`\[\dot m_s \approx 5.16\ \text{kg/h}\]`,
  check: 'نفس منطق مثال 1.19 ✓ (هناك x = 0.9 فـ Δh<sub>s</sub> = 0.9h<sub>fg</sub>).',
  trap: '"saturated steam" بدون x يعني x = 1 فـ Δh<sub>s</sub> = −h<sub>fg</sub> بالضبط.'
})}

${E.ex({
  id: 'mp-c7', scope: 'mid', title: 'C7 — Methane: choosing the right table row', src: 'مسألة تدريب — تعلم تختار السطر',
  statement: 'Methane gas flowing at 50 mol/s is heated from 25°C to 300°C. Using the heat capacity table in the appendix, calculate the rate of heat transfer required.',
  given: [['ṅ', '50 mol/s', ''], ['T', '25 → 300°C', ''], ['Cp', 'from the table', '']],
  find: 'Q',
  steps: [
    [R`\text{Table: Methane (g) has two rows: }^\circ\text{C row and K row}`, '<b>الجدول أول.</b> الميثان إله سطرين. حرارتنا بالـ °C، فأسهل شي ناخذ سطر °C.'],
    [R`^\circ\text{C row: } a = 34.31,\ b = 0.05469,\ c = 0.3661\times10^{-5},\ d = -1.100\times10^{-8}`, ''],
    [R`a\Delta T = 34.31(275) = 9435;\quad \tfrac{b}{2}(300^2-25^2) = 2444`, ''],
    [R`\tfrac{c}{3}(300^3-25^3) = 32.9;\quad \tfrac{d}{4}(300^4-25^4) = -22.3`, ''],
    [R`\Delta h = 9435 + 2444 + 32.9 - 22.3 = 11\,890\ \text{J/mol}`, ''],
    [R`Q = 50\times11\,890 = 5.945\times10^{5}\ \text{J/s} = 594.5\ \text{kW}`, '']
  ],
  answer: R`\[Q \approx 595\ \text{kW}\]`,
  check: 'لو استخدمت سطر K (298.15 → 573.15 K) يطلع 11 888 J/mol — نفس الجواب ✓.',
  trap: 'إذا عوضت 298 و 573 بسطر °C يطلع 15 910 J/mol — غلط بـ 34%! الوحدة لازم تطابق السطر.'
})}

<!-- ===================== MIXING ===================== -->
<h2 id="mp-mix">الخلط (Mixing) — الدكتورة أكدت عليه</h2>
${E.eq(R`\underbrace{\dot m_3 = \dot m_1 + \dot m_2}_{\text{mass}} \qquad \underbrace{\dot m_1 h_1 + \dot m_2 h_2 = \dot m_3 h_3}_{\text{energy (adiabatic)}}`, {
  name: 'Adiabatic mixing',
  mean: 'معادلتين: الكتلة الداخلة = الطالعة، والطاقة الداخلة = الطالعة.',
  when: 'خلط بخار ويا بخار، أو ماي ويا ماي، أو desuperheater (رش ماي على بخار محمص).',
  trick: 'إذا C<sub>p</sub> ثابت ونفس المادة: <span class="ltr">T₃ = (ṁ₁T₁ + ṁ₂T₂)/(ṁ₁ + ṁ₂)</span> — معدل موزون.'
})}
${E.ex({
  id: 'mp-m1', scope: 'mid', title: 'M1 — Mixing two water streams', src: 'مسألة تدريب',
  statement: 'A stream of water at 20°C flowing at 100 kg/min is mixed adiabatically with a stream of water at 80°C flowing at 50 kg/min. Find the temperature of the mixed stream (a) assuming constant C<sub>p</sub>, and (b) using the steam tables.',
  given: [['Stream 1', '100 kg/min, 20°C', ''], ['Stream 2', '50 kg/min, 80°C', '']],
  find: 'T₃',
  steps: [
    [R`\text{(a) } T_3 = \frac{100(20) + 50(80)}{150} = 40^\circ\text{C}`, 'C<sub>p</sub> ثابت ينشطب من الطرفين.'],
    [R`\text{(b) } h_1 = h_f(20^\circ\text{C}) = 83.9,\quad h_2 = h_f(80^\circ\text{C}) = 334.9\ \text{kJ/kg}`, 'ماي سائل → h<sub>f</sub> بنفس الحرارة.'],
    [R`h_3 = \frac{100(83.9) + 50(334.9)}{150} = 167.6\ \text{kJ/kg} \Rightarrow T_3 \approx 40^\circ\text{C}`, 'ندور 167.6 بعمود h<sub>f</sub> فنلگى ~40°C.']
  ],
  answer: R`\[T_3 \approx 40^\circ\text{C}\]`,
  check: '40°C أقرب للبارد لأن كميته ضعف الحار ✓.', trap: 'لا تاخذ المعدل البسيط (50°C) — لازم موزون بالكتلة.'
})}
${E.ex({
  id: 'mp-m2', scope: 'mid', title: 'M2 — Desuperheater (steam + water)', src: 'مسألة تدريب — خلط بخار ويا ماي',
  statement: 'Superheated steam at 10 bar and 300°C flowing at 1000 kg/h is mixed adiabatically with liquid water at 10 bar and 25°C to produce saturated vapour at 10 bar. Calculate the mass flow rate of water required and the flow rate of the product steam.',
  diagram: E.dev({ kind: 'mixer', name: 'Mix', ins: [['(1) 1000 kg/h', '10 bar, 300°C'], ['(2) water ṁ₂ = ?', '10 bar, 25°C']], outs: [['(3) sat. vapour', '10 bar']] }),
  given: [['h₁', 'Table 9, 1 MN/m², 300°C', '3052 kJ/kg'], ['h₂', 'Table 9, 1 MN/m², 25°C (liquid)', '105.7 kJ/kg'], ['h₃', 'Table 8, 1.00 MN/m², h_g', '2776.2 kJ/kg']],
  find: 'ṁ₂, ṁ₃',
  steps: [
    [R`1000(3052) + \dot m_2(105.7) = (1000 + \dot m_2)(2776.2)`, 'الطاقة ويا تعويض الكتلة.'],
    [R`\dot m_2 = \frac{1000(3052 - 2776.2)}{2776.2 - 105.7} = \frac{275\,800}{2670.5} = 103.3\ \text{kg/h}`, ''],
    [R`\dot m_3 = 1000 + 103.3 = 1103\ \text{kg/h}`, '']
  ],
  answer: R`\[\dot m_2 \approx 103\ \text{kg/h},\qquad \dot m_3 \approx 1103\ \text{kg/h}\]`,
  check: 'شوية ماي بارد يكفي يبرد البخار للتشبع لأن الماي يحتاج حرارة كامنة كبيرة حتى يتبخر ✓.',
  trap: 'h للماي السائل من خانة زرقاء بـ Table 9 (أو h<sub>f</sub> عند 25°C ≈ 104.8) — الفرق صغير.'
})}
<div class="box info"><strong>مسائل خلط ثانية محلولة بالموقع</strong>
<ul>
<li><a href="#/s15">مثال 1.20</a> — خلط بخار مشبع ويا محمص.</li>
<li><a href="#/exams">كوز 2026</a> — صمامين خنق + خلط (اللي امتحنو بيه أصدقائك).</li>
<li><a href="#/exams">فاينل 2024 Q4</a> — خلط تيارين ماي + بويلر.</li>
</ul></div>

<h2 id="mp-steam">أشياء بسيطة من جداول البخار</h2>
<p>الدكتورة كالت "أشياء بسيطة". هذني أكثر شي محتمل — كلها بصفحة <a href="#/tables">شلون أستعمل جداول البخار</a>:</p>
<ul>
<li>T<sub>sat</sub> و h<sub>f</sub> و h<sub>fg</sub> و h<sub>g</sub> عند ضغط معين (Table 8).</li>
<li>h لبخار رطب: <span class="ltr">h = h<sub>f</sub> + x·h<sub>fg</sub></span>.</li>
<li>h لبخار محمص عند P و T (Table 9)، ويمكن ويا استيفاء.</li>
<li>h لماي سائل ≈ h<sub>f</sub> عند نفس الحرارة.</li>
</ul>
<div class="box tip"><strong>قبل الامتحان بساعة</strong> افتح <a href="#/review">ورقة القوانين</a>، واقرا الوصفات الثلاث بهاي الصفحة (برنولي، C<sub>p</sub>، الخلط). بالتوفيق 💪</div>
`
  });
})();
