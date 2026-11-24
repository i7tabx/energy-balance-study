(function () {
  const R = String.raw, E = window.EB;

  const lakeSvg = R`<svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(911)}
    <path d="M10 150 Q60 140 130 150 L130 225 L10 225 Z" class="water"/><line x1="10" y1="150" x2="130" y2="150" stroke="var(--w)" stroke-width="2"/>
    <text x="14" y="143" class="lbs">lake surface z = 800 m</text>
    <path class="st" d="M70 205 L70 120 L200 120"/><circle cx="70" cy="205" r="4" fill="var(--q)"/><text x="78" y="212" class="lb">intake z₁ = 700 m</text>
    <circle cx="220" cy="120" r="18" fill="var(--accent-soft)" stroke="var(--fg)"/><text x="220" y="125" text-anchor="middle" class="nm">P</text>
    <path class="st" d="M238 120 L430 50 L470 50" marker-end="url(#ah911)" color="var(--fg)"/>
    <text x="300" y="72" class="lb">L = 8000 m, D = 0.15 m</text>
    <rect x="470" y="20" width="76" height="60" fill="var(--accent-soft)" stroke="var(--fg)"/><text x="508" y="55" text-anchor="middle" class="lb">factory</text>
    <text x="470" y="98" class="lb">z₂ = 852 m</text>
    <path class="wa" d="M220 60 L220 98" marker-end="url(#ah911)"/><text x="228" y="62" class="wl">Ws (in)</text>
    <rect class="bd" x="40" y="10" width="512" height="210" rx="12"/>
  </svg>`;

  const fireSvg = R`<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(912)}
    <path class="st" d="M20 40 L20 170 L150 170 L150 40"/><rect x="21" y="70" width="128" height="99" class="water"/>
    <text x="85" y="62" text-anchor="middle" class="lbs">open to atm</text><text x="85" y="125" text-anchor="middle" class="lb">P₁ = 1 atm</text>
    <path class="st" d="M150 150 L260 150"/><circle cx="280" cy="150" r="20" fill="var(--accent-soft)" stroke="var(--fg)"/><text x="280" y="155" text-anchor="middle" class="nm">P</text>
    <path class="st" d="M300 150 L530 150" marker-end="url(#ah912)" color="var(--fg)"/>
    <text x="330" y="140" class="lb">1890 L/min, P₂ = 15 bar (gauge)</text><text x="330" y="175" class="lb">to hoses</text>
    <path class="wa" d="M280 70 L280 128" marker-end="url(#ah912)"/><text x="288" y="80" class="wl">Ws = ? (η = 70%)</text>
  </svg>`;

  const wingSvg = R`<svg viewBox="0 0 560 190" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(913)}
    <path d="M120 100 Q260 40 450 95 Q260 120 120 100 Z" fill="var(--accent-soft)" stroke="var(--fg)" stroke-width="2"/>
    <path class="st" d="M20 60 L520 60" marker-end="url(#ah913)" color="var(--q)" stroke="var(--q)"/><text x="30" y="50" class="ql">(1) top: υ₁ = ? , P₁ lower</text>
    <path class="st" d="M20 140 L520 140" marker-end="url(#ah913)" color="var(--w)" stroke="var(--w)"/><text x="30" y="165" class="wl">(2) underside: υ₂ = 275 m/s , P₂ = P₁ + 0.08 atm</text>
    <text x="280" y="95" text-anchor="middle" class="nm">wing</text>
  </svg>`;

  E.page({
    id: 's12', group: 'كوز + ميد', title: '1.2 موازنة الطاقة الميكانيكية', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>1.2 موازنة الطاقة الميكانيكية (MEB)</h1>
<p class="ltr"><b>Mechanical Energy Balance</b> — book pp. 25–30</p>
<p>تستخدم للمسائل الميكانيكية البحتة: ضخ ماي، جريان بالأنابيب — <b>ماكو</b> انتقال حرارة كبير، ولا تفاعلات، ولا تغير طور. التركيز على الطاقة الحركية والكامنة والضغط، مو على U و Q.</p>

<h2>الاشتقاق بسطور</h2>
<div class="step"><div class="math">\[Q - W_s = \dot m\left[\left(u+\tfrac{\upsilon^2}{2}+gz+Pv\right)_{out}-\left(u+\tfrac{\upsilon^2}{2}+gz+Pv\right)_{in}\right]\]</div><div class="why">❓ <b>ليش؟</b> كتبنا الطاقة الكلية الطالعة ناقص الداخلة وأخذنا ṁ عامل مشترك (لأن ṁ<sub>in</sub> = ṁ<sub>out</sub>).</div></div>
<div class="step"><div class="math">\[-\frac{W_s}{\dot m} = \frac{\Delta P}{\rho} + \frac{\Delta\upsilon^2}{2} + g\Delta z + \left(\Delta u - \frac{Q}{\dot m}\right)\]</div><div class="why">❓ <b>ليش؟</b> قسمنا على ṁ، والمائع ما ينضغط فـ v = 1/ρ ثابت.</div></div>
<div class="step"><div class="math">\[\Delta u - \frac{Q}{\dot m} \equiv F \quad(\text{friction loss})\]</div><div class="why">❓ <b>ليش؟</b> بدون تفاعلات أو تغير طور، هذا الحد يمثل الحرارة المتولدة من <b>الاحتكاك اللزج</b> بالمائع، فنسميه F.</div></div>

${E.eq(R`-\frac{W_s}{\dot m} = \frac{\Delta P}{\rho} + \frac{\Delta \upsilon^2}{2} + g\,\Delta z + F`, {
  name: 'Eq. (1.20) — Mechanical Energy Balance',
  mean: 'الشغل اللي تعطيه المضخة لكل kg = طاقة الضغط + الحركة + الارتفاع + خسائر الاحتكاك.',
  sym: [[R`W_s/\dot m`, 'الشغل لكل kg مائع', 'J/kg'], [R`\Delta P`, 'فرق الضغط (P₂ − P₁)', 'Pa = N/m²'], [R`\rho`, 'الكثافة', 'kg/m³'], [R`\Delta\upsilon^2`, 'υ₂² − υ₁²', 'm²/s²'], [R`g\Delta z`, 'طاقة الارتفاع', 'J/kg'], ['F', 'خسائر الاحتكاك', 'J/kg']],
  when: 'مضخات ماي، خطوط أنابيب، ضخ من بحيرة/خزان، مطفأة حريق — أي سؤال يطلب "pump hp" لسائل.',
  trick: '"P-υ-z-F": <b>P</b>ressure، <b>υ</b>elocity، <b>z</b> height، <b>F</b>riction. كلهم بالـ J/kg — وPa/(kg/m³) = J/kg تلقائياً.'
})}
<div class="box info"><strong>الفرضيات الثلاث للـ MEB (تجي سؤال!)</strong>
<ol>
<li><b class="ltr">Steady state</b> — حالة مستقرة (التراكم = صفر).</li>
<li><b class="ltr">Single inlet and single outlet</b> — مدخل واحد ومخرج واحد، فـ ṁ<sub>in</sub> = ṁ<sub>out</sub>.</li>
<li><b class="ltr">Incompressible fluid</b> — المائع غير قابل للانضغاط، ρ ثابتة (v<sub>in</sub> = v<sub>out</sub> = 1/ρ).</li>
</ol>
🧠 <b>حيلة:</b> "<b>ثابت، واحد، ما ينضغط</b>".</div>

${E.eq(R`\eta = \frac{W_{s,\,ideal}}{W_{s,\,actual}} \;\Rightarrow\; W_{s,\,actual} = \frac{W_{s,\,ideal}}{\eta} \qquad 1\ \text{hp} = 0.7457\ \text{kW}`, {
  name: 'Pump efficiency & horsepower',
  mean: 'المضخة الحقيقية تحتاج شغل أكثر من النظري، فنقسم على الكفاءة (الجواب يكبر).',
  sym: [[R`\eta`, 'الكفاءة', '— (0.70 = 70%)'], ['hp', 'قدرة حصانية', '1 hp = 745.7 W']],
  when: 'كل ما يذكر efficiency أو يطلب الجواب بالـ hp.',
  trick: 'الكفاءة دائماً "تخسرك" — فالفعلي <b>أكبر</b>: اقسم على η مو اضرب. kW → hp: ×1.341 أو ÷0.7457.'
})}
<div class="box warn"><strong>⚠️ Gauge vs Absolute</strong>
${E.n(R`P_{abs} = P_{gauge} + P_{atm}`)} (P<sub>atm</sub> = 1.01325 bar). إذا الخزان مفتوح للجو والمخرج مكتوب gauge، فرق الضغط = قيمة الـ gauge نفسها (لأن الـ atm ينطرح).</div>

${E.ex({
  id: 'e1-11', title: 'Example 1.11 Mechanical Energy Balance Equation', src: 'الكتاب ص 27', scope: 'quiz',
  statement: 'A water supply tank is capable of delivering 0.3 m³/s of water for firefighting purposes in a chemical plant. The water supply is to come from a lake, the elevation of the surface of the lake is 800 m and the elevation of the factory is 852 m from sea level. The water discharge pipe is located at a depth of 100 m from the surface of the lake. The frictional losses in the water line to the plant are given by the relation (0.01 m/s²) L, where L is the length of the pipe line. The water line to the supply tank has an inner diameter of 0.15 m and a length of 8000 m. How much energy must a pump deliver to the water?',
  diagram: lakeSvg,
  given: [[R`\(\dot V\)`, '0.3 m³/s', '0.3 m³/s'], ['z₁ (intake)', '800 − 100 m', '700 m'], ['z₂ (factory)', '852 m', '852 m'], ['F', '(0.01 m/s²)·L, L = 8000 m', '80 J/kg'], ['D', '0.15 m', '0.15 m']],
  find: 'Pump work (kW and hp)',
  assume: [[R`\Delta P = 0`, 'الضغط بالطرفين جوي (atmospheric).'], [R`\upsilon_1 = 0`, 'الماي بالبحيرة واقف.']],
  steps: [
    [R`\upsilon_2 = \frac{\dot V}{\pi D^2/4} = \frac{0.3}{\pi(0.15)^2/4} = 16.98\ \text{m/s}`, 'السرعة بنهاية الأنبوب.'],
    [R`\dot m = \rho\dot V = 1000\times0.3 = 300\ \text{kg/s}`, 'كثافة الماء 1000.'],
    [R`\Delta z = 852 - 700 = 152\ \text{m},\qquad F = 0.01\times8000 = 80\ \text{J/kg}`, 'الماي ينسحب من عمق 100 m تحت السطح، فنقطة البداية 700 مو 800.'],
    [R`-\frac{W_s}{\dot m} = \frac{16.98^2}{2} + 9.81(152) + 80 = 144.1 + 1491.1 + 80 = 1715.2\ \text{J/kg}`, 'MEB بعد حذف ΔP.'],
    [R`-W_s = 300\times1715.2 = 5.146\times10^{5}\ \text{W} = 514.6\ \text{kW}`, 'ضربنا بـ ṁ حتى نطلع القدرة.'],
    [R`\text{hp} = \frac{514.6}{0.7457} = 690\ \text{hp}`, 'تحويل للحصان.']
  ],
  answer: R`\[W_s = -514.6\ \text{kW} \approx -690\ \text{hp}\quad(\text{energy into the water})\]`,
  check: 'أكبر حد هو gΔz (1491 من 1715) — منطقي لأن الماي يصعد 152 m. والإشارة السالبة = الشغل داخل للنظام.',
  trap: 'Δz = 852 − 800 = 52 غلط! الأنبوب يسحب من عمق 100 m، فـ z₁ = 700 m و Δz = 152 m. ووحدة F: (m/s²)×m = m²/s² = J/kg.'
})}

${E.ex({
  id: 'e1-12', title: 'Example 1.12 Fire Extinguishment Process', src: 'الكتاب ص 28 · نفس فكرة Final 2023 Q1 (CO₂)', scope: 'quiz',
  statement: 'A large tank filled with water and open to atmosphere is used for fire extinguishment in an ethylene production plant. The water is taken from the tank, passed through a pump, and then delivered to hoses. It is desired to deliver 1890 L of water per minute at a pressure of 15 bar (gauge). If there is a negligible elevation change between the water level in the tank and the discharge of the pump, no changes in the diameter of the pipes and hoses, and if the pump has an efficiency of 70.0%, how much work must be supplied to the pump in order to meet the pressure and discharge rate specifications?',
  diagram: fireSvg,
  given: [[R`\(\dot V\)`, '1890 L/min', '0.0315 m³/s'], ['ṁ', '—', '31.5 kg/s'], ['P₁', 'tank open to atm', '1.01325 bar abs'], ['P₂', '15 bar (gauge)', '16.01 bar abs'], ['η', '70.0%', '0.70']],
  find: 'Actual pump work (kW, hp)',
  assume: [[R`\Delta z = 0`, 'فرق الارتفاع مهمل.'], [R`\Delta\upsilon^2 = 0`, 'نفس قطر الأنابيب والخراطيم.'], ['F = 0', 'ما معطاة خسائر احتكاك.']],
  steps: [
    [R`-\frac{W_s}{\dot m} = \frac{\Delta P}{\rho}`, 'بقى بس حد الضغط.'],
    [R`\dot m = 1890\ \tfrac{\text{L}}{\text{min}}\times\tfrac{1\ \text{kg}}{1\ \text{L}}\times\tfrac{1\ \text{min}}{60\ \text{s}} = 31.5\ \text{kg/s}`, 'لتر ماي = 1 kg.'],
    [R`\Delta P = (15 + 1.013) - 1.013 = 15\ \text{bar} = 15\times10^{5}\ \text{Pa}`, 'المخرج gauge والخزان جوي، فالـ atm ينطرح.'],
    [R`-W_s = \dot m\frac{\Delta P}{\rho} = 31.5\times\frac{15\times10^{5}}{1000} = 47250\ \text{W} = 47.25\ \text{kW}\ (63.4\ \text{hp})`, 'هذا الشغل النظري (ideal).'],
    [R`W_{s,actual} = \frac{47.25}{0.70} = 67.5\ \text{kW} = \frac{67.5}{0.7457} = 90.5\ \text{hp}`, 'المضخة الحقيقية تحتاج أكثر — نقسم على الكفاءة.']
  ],
  answer: R`\[W_{s,actual} = -67.5\ \text{kW} \approx -90.5\ \text{hp}\]`,
  check: 'الفعلي (67.5) > النظري (47.25) ✓. والإشارة سالبة = شغل منعمل على الماي.',
  trap: 'تحويل bar → Pa (×10⁵) و L/min → kg/s. ولا تضرب بالكفاءة — اقسم.',
  note: 'بالدفتر مكتوب 62.7 hp ثم 89.5 hp — الصحيح 47.25/0.7457 = <b>63.4 hp</b> نظري و <b>90.5 hp</b> فعلي. (وبالكتاب جملة "Known quantities… friction losses, length" منقولة غلط من مثال 1.11 — تجاهلها.)'
})}
<div data-model="meb"></div>
`
  });

  E.page({
    id: 's13', group: 'كوز + ميد', title: '1.3 معادلة برنولي', scope: 'quiz', prio: 'med',
    render: () => R`
<h1>1.3 معادلة برنولي (Bernoulli’s Equation)</h1>
<p class="ltr">book pp. 30–32</p>
<p>إذا خسائر الاحتكاك صغيرة (<b>F = 0</b>) وماكو مضخة أو توربين (<b>Ws = 0</b>)، الـ MEB تصير برنولي:</p>
${E.eq(R`\frac{\Delta P}{\rho} + \frac{\Delta \upsilon^2}{2} + g\,\Delta z = 0`, {
  name: 'Eq. (1.21) — Bernoulli',
  mean: 'مجموع طاقة الضغط والحركة والارتفاع ثابت على طول خط الجريان. إذا السرعة زادت، الضغط ينقص.',
  sym: [[R`\Delta P`, 'P₂ − P₁', 'Pa'], [R`\Delta\upsilon^2`, 'υ₂² − υ₁²', 'm²/s²'], [R`\Delta z`, 'z₂ − z₁', 'm']],
  when: 'جريان بدون مضخة وبدون احتكاك: جناح طيارة، فنتوري، ماي يطلع من فتحة خزان.',
  trick: 'برنولي = MEB "بدون مضخة وبدون احتكاك": احذف Ws و F وخلي الباقي = صفر. "السرعة تاكل الضغط".'
})}
${E.ex({
  id: 'e1-13', title: 'Example 1.13 Bernoulli’s Equation', src: 'الكتاب ص 31', scope: 'quiz',
  statement: 'The pressure difference between the underside of the wing and the top of the wing that is necessary to lift the weight of an aircraft is 0.08 atm. At an elevation of approximately 10,000 m, the aircraft velocity is 275 m/s and the density of air is 0.45 kg/m³. Assume that the velocity of the air on the underside of the wing is the plane velocity of 275 m/s. What is the velocity of the air on the topside of the wing, which is necessary to generate the pressure difference needed to lift the plane?',
  diagram: wingSvg,
  given: [['ΔP (under − top)', '0.08 atm', '8106 Pa'], ['υ₂ (under)', '275 m/s', '275 m/s'], ['ρ air', '0.45 kg/m³', '0.45 kg/m³']],
  find: 'υ₁ (top)',
  assume: [[R`\Delta z = 0`, 'نهمل سمك الجناح.'], [R`W_s = 0,\ F = 0`, 'شروط برنولي.']],
  steps: [
    [R`\frac{P_2-P_1}{\rho} + \frac{\upsilon_2^2-\upsilon_1^2}{2} = 0`, 'برنولي بين الأعلى (1) والأسفل (2).'],
    [R`P_2 - P_1 = 0.08\times101325 = 8106\ \text{Pa}`, 'نحول atm إلى Pa.'],
    [R`\upsilon_1^2 = \upsilon_2^2 + \frac{2(P_2-P_1)}{\rho} = 275^2 + \frac{2(8106)}{0.45} = 75625 + 36027 = 111652`, 'رتبنا المعادلة لـ υ₁.'],
    [R`\upsilon_1 = \sqrt{111652} = 334\ \text{m/s}`, 'الجذر.']
  ],
  answer: R`\[\upsilon_{top} \approx 334\ \text{m/s}\]`,
  check: 'السرعة فوق (334) أكبر من تحت (275) ✓ — لهذا الضغط فوق أقل فالطيارة ترتفع.',
  trap: 'الترتيب: الضغط الأعلى تحت والسرعة الأعلى فوق. إذا قلبت الإشارة يطلع جذر سالب!'
})}
`
  });

  E.page({
    id: 'siso', group: 'كوز + ميد', title: 'إضافي: الشغل الأيزوثيرمي', scope: 'quiz', prio: 'med',
    render: () => R`
<h1>إضافي من الكوزات: الشغل الانعكاسي الأيزوثيرمي لغاز مثالي</h1>
<div class="box warn"><strong>مو موجود بالكتاب</strong> بس جه بكوز الصباحي/المسائي (سؤال الأوكسجين A و B). نظام مغلق (سلندر وبستن)، الغاز ينضغط ببطء (reversibly) وبدرجة حرارة ثابتة.</div>
${E.eq(R`W = \int_{V_1}^{V_2} P\,dV = nRT\ln\frac{V_2}{V_1} = nRT\ln\frac{P_1}{P_2} = P_1V_1\ln\frac{P_1}{P_2}`, {
  name: 'Reversible isothermal work — ideal gas, closed system',
  mean: 'نعوض P = nRT/V ونكامل. ولأن T ثابتة: P₁V₁ = P₂V₂ (قانون بويل) فـ V₂/V₁ = P₁/P₂. وnRT = P₁V₁ فما نحتاج n أصلاً!',
  sym: [['n', 'عدد المولات', 'mol'], ['R', 'ثابت الغازات = 8.314', 'J/(mol·K)'], ['T', 'درجة الحرارة المطلقة', 'K'], [R`P_1V_1`, 'نفس nRT', 'L·atm → J (×101.325)']],
  when: 'غاز مثالي، نظام مغلق، انضغاط أو تمدد "reversibly and isothermally".',
  trick: 'انضغاط (P₂ > P₁) → ln سالب → W سالب = شغل على النظام. وبما أن ΔU = 0 (أيزوثيرمي لغاز مثالي) → Q = W.'
})}
<div class="box info"><strong>القانون الأول هنا</strong>
${E.n(R`\Delta U = 0 \Rightarrow Q = W`)} — يعني الحرارة اللي تطلع من الغاز تساوي الشغل اللي ينعمل عليه.</div>

${E.ex({
  id: 'iso-a', title: 'Quiz A — O₂ isothermal compression', src: 'كوز (صباحي/مسائي) — نسخة A', scope: 'quiz',
  statement: 'Oxygen is placed into a closed system fitted with a piston capable of compressing the gas. The initial state is 100 L of O₂ at 1.5 atm pressure and 400 K. The gas is compressed reversibly and isothermally until the pressure reaches 6.5 atm. Calculate the work done on the system.',
  diagram: E.dev({ kind: 'piston', name: 'O₂', Q: 'Q (out)', Qdir: 'out', W: 'W on gas', Wdir: 'in' }),
  given: [['V₁', '100 L', '0.100 m³'], ['P₁', '1.5 atm', '151 987.5 Pa'], ['P₂', '6.5 atm', '658 612.5 Pa'], ['T', '400 K (constant)', '400 K']],
  find: 'W (work done on the system)',
  assume: [['T = \\text{const}', 'isothermal.'], ['\\text{ideal gas}', 'O₂ عند هذي الظروف يتصرف كغاز مثالي.'], ['\\text{closed}', 'سلندر وبستن.']],
  steps: [
    [R`nRT = P_1V_1 = 1.5\times101325\times0.100 = 15199\ \text{J}`, 'ما نحتاج نحسب n — P₁V₁ يساوي nRT مباشرة. (n = 15199/(8.314×400) = 4.57 mol)'],
    [R`W = P_1V_1\ln\frac{P_1}{P_2} = 15199\ln\frac{1.5}{6.5} = 15199\times(-1.4663)`, 'قانون الشغل الأيزوثيرمي بدلالة الضغوط.'],
    [R`W = -2.229\times10^{4}\ \text{J} = -22.3\ \text{kJ}`, 'الإشارة سالبة = الشغل على النظام.'],
    [R`V_2 = V_1\frac{P_1}{P_2} = 100\times\frac{1.5}{6.5} = 23.1\ \text{L}`, 'تحقق إضافي: الحجم صغر.']
  ],
  answer: R`\[W = -22.3\ \text{kJ}\ \Rightarrow\ \text{work done ON the system} = +22.3\ \text{kJ}\]`,
  check: 'الحجم نقص من 100 إلى 23.1 L فلازم الشغل على الغاز ✓. ومن القانون الأول Q = W = −22.3 kJ (الغاز طلع حرارة حتى تبقى T ثابتة).',
  trap: 'لا تستخدم °C — T بالكلفن. وL·atm مو J: اضرب ×101.325. وإذا السؤال يكول "on the system" اكتب القيمة موجبة ووضح الإشارة.'
})}
${E.ex({
  id: 'iso-b', title: 'Quiz B — O₂ isothermal compression', src: 'كوز — نسخة B', scope: 'quiz',
  statement: 'Oxygen is placed into a closed system fitted with a piston capable of compressing the gas. The initial state is 200 L of O₂ at 2.5 atm pressure and 500 K. The gas is compressed reversibly and isothermally until the pressure reaches 8.5 atm. Calculate the work done on the system.',
  given: [['V₁', '200 L', '0.200 m³'], ['P₁', '2.5 atm', '253 312.5 Pa'], ['P₂', '8.5 atm', '861 262.5 Pa'], ['T', '500 K', '500 K']],
  find: 'W',
  assume: [['T = \\text{const}', 'isothermal.'], ['\\text{ideal gas}', '']],
  steps: [
    [R`nRT = P_1V_1 = 2.5\times101325\times0.200 = 50663\ \text{J}\quad(n = 12.19\ \text{mol})`, 'نفس الطريقة.'],
    [R`W = 50663\,\ln\frac{2.5}{8.5} = 50663\times(-1.2238) = -6.20\times10^{4}\ \text{J}`, 'التعويض.'],
    [R`V_2 = 200\times\frac{2.5}{8.5} = 58.8\ \text{L}`, 'تحقق.']
  ],
  answer: R`\[W = -62.0\ \text{kJ}\ \Rightarrow\ \text{work done ON the system} = +62.0\ \text{kJ}\]`,
  check: 'نسبة الضغط هنا (3.4) أصغر من A (4.33) بس P₁V₁ أكبر بثلاث مرات، فالشغل أكبر ✓.',
  trap: 'ln(P₁/P₂) مو ln(P₂/P₁) — إذا قلبتها تطلع الإشارة معكوسة.'
})}
`
  });
})();
