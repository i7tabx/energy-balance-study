(function () {
  const R = String.raw, E = window.EB;

  // ================= 1.1 A — Systems, first law, closed system
  E.page({
    id: 's11', group: 'كوز + ميد', title: '1.1 الأنظمة والقانون الأول', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>1.1 الأنظمة والقانون الأول للثرموداينمك</h1>
<p class="ltr"><b>Energy Balance for Closed and Open Systems</b> — book pp. 4–11</p>
<div class="box info"><strong>ليش هذا القسم مهم؟</strong>
كل سؤال بالامتحان يبدي بخطوة وحدة: <b>حدد النظام وحدوده</b>، بعدين <b>شوف شنو يصير صفر</b>. أسئلة الفراغات (Fill in the blank) والـ MCQ كلها من جمل هذا القسم حرفياً.</div>

<h2>1) النظام (System) والحدود والمحيط</h2>
<div class="grid">
  <div class="card"><b class="ltr">System</b><br>الجزء اللي نسوي عليه التحليل — جسم أو مجموعة أجسام.<br><small class="ltr">"an object or a collection of objects that an analysis is carried out on"</small></div>
  <div class="card"><b class="ltr">System boundary</b><br>حدود النظام — <b>نختارها ونحددها ببداية التحليل</b>، وممكن تكون حقيقية أو تخيلية (conceptual or physical).</div>
  <div class="card"><b class="ltr">Surroundings</b><br>المحيط = <b>كل شي خارج حدود النظام</b>. أي طاقة أو مادة تطلع من النظام تدخل للمحيط والعكس.</div>
</div>

<h3>أنواع الأنظمة الثلاثة</h3>
${E.table(['النوع', 'حرارة Q', 'شغل W', 'مادة (كتلة)', 'مثال'], [
  ['<b class="ltr">Isolated</b> معزول', '✗', '✗', '✗', 'ترمس مثالي مسدود'],
  ['<b class="ltr">Closed</b> مغلق', '✓', '✓', '✗', 'غاز داخل سلندر وبستن'],
  ['<b class="ltr">Open</b> مفتوح', '✓', '✓', '✓', 'توربين، مضخة، مبادل حراري']
])}
<div class="box tip"><strong>🧠 حيلة الحفظ</strong>
<b>معزول = ما يحچي ويا أحد</b> (لا حرارة ولا شغل ولا مادة). <b>مغلق = الباب مسدود بس الشبابيك مفتوحة</b> (الطاقة تعبر، المادة لا). <b>مفتوح = كلشي يعبر</b>.</div>

<div data-model="classifier"></div>

<h2>2) القانون الأول = حفظ الطاقة</h2>
<p>الطاقة <b>ما تُخلق ولا تفنى</b>، بس تتحول من شكل لشكل أو تنتقل. تنتقل بثلاث طرق: <b>حرارة</b>، <b>انتقال كتلة</b>، أو <b>شغل</b>.</p>
${E.eq(R`\text{Accumulation} = \text{Input} - \text{Output}`, {
  mean: 'التراكم داخل النظام = الداخل − الطالع. بالحالة المستقرة (steady state) التراكم = صفر، فيصير الداخل = الطالع.',
  when: 'هي الفكرة الأساسية ورا كل معادلات الفصل.',
  trick: 'مثل حسابك بالبنك: الرصيد يزيد بالإيداع وينقص بالسحب.'
})}

<h2>3) معادلة النظام المغلق</h2>
${E.eq(R`Q - W = \Delta U + \Delta KE + \Delta PE`, {
  name: 'Eq. (1.1) — closed system',
  mean: 'الحرارة الداخلة ناقص الشغل اللي يسويه النظام = التغير بالطاقة الداخلية + الحركية + الكامنة.',
  sym: [['Q', 'الحرارة (Heat)', 'J, kJ'], ['W', 'الشغل (Work)', 'J, kJ'], [R`\Delta U`, 'تغير الطاقة الداخلية', 'J, kJ'], [R`\Delta KE`, 'تغير الطاقة الحركية', 'J'], [R`\Delta PE`, 'تغير الطاقة الكامنة', 'J']],
  when: 'لما المادة ما تعبر الحدود: سلندر وبستن، وعاء مسدود (rigid vessel)، طيارة كنظام مغلق.',
  trick: 'اليسار = "اللي يدخل ويطلع" (Q و W)، اليمين = "اللي يتغير بالداخل" (ΔU، ΔKE، ΔPE). وQ قبل W مثل الأبجدية: Q ثم W.'
})}

<h3>إشارات Q و W (Sign convention) — مهمة جداً</h3>
<div class="grid">
  <div class="box" style="border-color:var(--q)"><b style="color:var(--q)">Q موجبة (+)</b> إذا <b>دخلت</b> للنظام (النظام امتصها — gained).<br><b style="color:var(--q)">Q سالبة (−)</b> إذا <b>طلعت</b> من النظام (heat loss).</div>
  <div class="box" style="border-color:var(--w)"><b style="color:var(--w)">W موجب (+)</b> إذا <b>النظام سوّاه</b> (work done BY the system) — مثل التوربين.<br><b style="color:var(--w)">W سالب (−)</b> إذا انعمل <b>على</b> النظام — مثل المضخة والكمبريسر.</div>
</div>
<div class="box tip"><strong>🧠 حيلة الحفظ</strong>
تخيل النظام <b>عامل بشركة</b>: الحرارة = <b>راتب يستلمه</b> (داخل = +)، والشغل = <b>الشغل اللي يسويه هو</b> (يطلع منه = +). التوربين "يشتغل" فـ Ws موجب، والمضخة "نشغّلها إحنا" فـ Ws سالب.</div>

<h3>متى يصير كل حد = صفر؟ (جمل الكتاب — تجي فراغات)</h3>
${E.table(['الحد', 'يصير صفر لما…', 'الجملة الإنكليزية (احفظها)'], [
  ['Q = 0', 'النظام <b>أديباتيك</b>: عزل حراري مثالي، أو النظام والمحيط <b>بنفس الحرارة</b>', '<span class="ltr">"Such a system is said to be <b>adiabatic</b> … perfect thermal insulation or the system and surroundings are at the same temperature."</span>'],
  ['W = 0', 'ماكو حركة على حدود النظام (ماكو بستن، مروحة، rotor)', '<span class="ltr">"If there is no <b>motion along the system boundary</b>, then W = 0."</span>'],
  ['ΔKE = 0', 'النظام ما يتسارع', '<span class="ltr">"If the system is <b>not accelerating</b>, then ΔKE = 0."</span>'],
  ['ΔPE = 0', 'النظام ما يصعد ولا ينزل', '<span class="ltr">"If the system is not experiencing a displacement in the direction of the gravitational field, then ΔPE = 0."</span>'],
  ['ΔU', 'للغاز المثالي بعملية <b>isothermal</b> ΔU = 0', '<span class="ltr">Isothermal: T does not change with time and in space — this does <b>not</b> mean no heat crosses the boundary.</span>']
])}
<div class="box warn"><strong>⚠️ فخ مشهور</strong>
<b class="ltr">Isothermal ≠ Adiabatic</b>. بالـ isothermal الحرارة <b>تعبر عادي</b> بس درجة الحرارة ثابتة. بالـ adiabatic ماكو حرارة تعبر (Q = 0) بس الحرارة ممكن تتغير.</div>

<h3>تعاريف الكتاب (احفظ الكلمات المفتاحية)</h3>
<ul>
<li><b class="ltr">Heat</b>: energy that flows due to a <b>temperature difference</b> … always from <b>high</b> temperature to <b>low</b> temperature.</li>
<li><b class="ltr">Work</b>: energy that flows in response to any <b>driving force</b> (applied force, torque) <b>other than temperature</b>; positive if it flows <b>from</b> the system. Comes from <b>pumps, compressors, moving pistons, turbines</b>.</li>
<li><b class="ltr">Internal energy</b>: energy due to all <b>molecular, atomic, and subatomic motions and interactions</b> — كل طاقة مو حركية ولا كامنة.</li>
<li><b class="ltr">Kinetic energy</b>: associated with <b>directed motion</b> (translation = straight-line motion).</li>
<li><b class="ltr">Potential energy</b>: due to <b>position</b> in a potential field — بهذا الكورس بس الجاذبية.</li>
</ul>

<div data-model="energybars"></div>

<h2>4) الطاقة الحركية (Kinetic Energy)</h2>
${E.eq(R`KE = \tfrac{1}{2}\,\dot m\,\upsilon^2 \qquad \Delta KE = \tfrac{1}{2}\,\dot m\left(\upsilon_2^2-\upsilon_1^2\right)`, {
  name: 'Eq. (1.2), (1.3)',
  mean: 'الطاقة اللي يحملها الجسم بسبب سرعته. بالأنظمة المستمرة نستخدم معدل الكتلة فتطلع النتيجة J/s = W.',
  sym: [[R`\dot m`, 'معدل تدفق الكتلة', 'kg/s'], [R`\upsilon`, 'السرعة', 'm/s'], [R`\dot V`, 'معدل التدفق الحجمي', 'm³/s'], ['A', 'مساحة مقطع الأنبوب', 'm²']],
  when: 'لما تتغير السرعة: أنبوب يتضيق، بخار يطلع بسرعة عالية من توربين، ماي يطلع من بحيرة (υ₁ = 0).',
  trick: 'السرعة من التدفق: υ = V̇/A و A = πD²/4. "الماي بالبحيرة واقف" ← υ₁ = 0.'
})}
${E.eq(R`\dot m = \rho\,\dot V \qquad \upsilon = \frac{\dot V}{A} = \frac{\dot V}{\pi D^2/4}`, {
  mean: 'نحوّل التدفق الحجمي لكتلي بالكثافة، ونطلع السرعة بقسمة التدفق على المساحة.',
  sym: [[R`\rho`, 'الكثافة (ماء = 1000)', 'kg/m³'], ['D', 'القطر الداخلي', 'm']],
  when: 'بكل سؤال يعطيك m³/h أو L/min وقطر أنبوب.',
  trick: 'kg/m³ × m³/s = kg/s — الوحدات تتشطب بنفسها.'
})}
${E.ex({
  id: 'e1-1', title: 'Example 1.1 Kinetic Energy Calculations', src: 'الكتاب ص 7', scope: 'quiz',
  statement: 'Water flows from a large lake into a process unit through a 0.02 m inside diameter pipe at a rate of 2.0 m³/h. Calculate the change in kinetic energy for this stream in joules per second.',
  diagram: E.dev({ kind: 'box', name: 'Pipe', ins: [['Lake (υ₁ ≈ 0)']], outs: [['υ₂ = ?', 'D = 0.02 m']] }),
  given: [['D', '0.02 m', '0.02 m'], [R`\(\dot V\)`, '2.0 m³/h', R`\(5.556\times10^{-4}\) m³/s`], ['ρ (water)', '1000 kg/m³', '1000 kg/m³']],
  find: 'ΔKE in J/s',
  assume: [[R`\upsilon_1 = 0`, 'البحيرة كبيرة فسطح الماي تقريباً واقف.'], [R`\rho = 1000\ \text{kg/m}^3`, 'كثافة الماء.']],
  steps: [
    [R`\dot m = \rho\dot V = 1000\times\frac{2.0}{3600} = 0.5556\ \text{kg/s}`, 'معادلة KE تحتاج كتلة مو حجم، وقسمنا على 3600 حتى نحول الساعة لثانية.'],
    [R`A = \frac{\pi D^2}{4} = \frac{\pi(0.02)^2}{4} = 3.142\times10^{-4}\ \text{m}^2`, 'نحتاج المساحة حتى نطلع السرعة.'],
    [R`\upsilon_2 = \frac{\dot V}{A} = \frac{5.556\times10^{-4}}{3.142\times10^{-4}} = 1.768\ \text{m/s}`, 'السرعة = التدفق الحجمي ÷ المساحة.'],
    [R`\Delta KE = \tfrac12\dot m(\upsilon_2^2-\upsilon_1^2) = \tfrac12(0.5556)(1.768^2-0) = 0.869\ \text{J/s}`, 'عوضنا بالمعادلة و υ₁ = 0.']
  ],
  answer: R`\[\Delta KE \approx 0.87\ \text{J/s} = 0.87\ \text{W}\]`,
  check: 'سرعة ~1.8 m/s قليلة، فطبيعي الطاقة الحركية صغيرة جداً (أقل من 1 W).',
  trap: 'نسيان القسمة على 3600 (m³/h → m³/s) يطلعك جواب أكبر بملايين المرات! وانتبه: القطر مو نصف القطر.',
  note: 'بالدفتر كاتب السرعة الوسطية "645.16 m/h" — هذا غلط بالحساب (استخدم 0.0031 بدل 0.00031)، الصحيح ≈ 6366 m/h = 1.77 m/s. الجواب النهائي بالدفتر (≈ 0.88 J/s) صحيح تقريباً.'
})}

<h2>5) الطاقة الكامنة (Potential Energy)</h2>
${E.eq(R`\Delta PE = \dot m\,g\,(z_2 - z_1)`, {
  name: 'Eq. (1.4)–(1.6)',
  mean: 'الطاقة بسبب الارتفاع. نختار سطح الأرض مرجع (z₀ = 0): فوق الأرض موجب وتحت الأرض سالب.',
  sym: [['g', 'التعجيل الأرضي', '9.81 m/s²'], ['z', 'الارتفاع عن المرجع', 'm']],
  when: 'ضخ من بئر لخزان، مدخل ومخرج بارتفاعات مختلفة (توربين يطلع 5 m أوطى).',
  trick: 'kg/s × m/s² × m = N·m/s = J/s = W. "تحت الأرض = سالب" وبعدين Δz = z₂ − z₁ (فوق ناقص تحت).'
})}
${E.ex({
  id: 'e1-2', title: 'Example 1.2 Potential Energy Calculation', src: 'الكتاب ص 9', scope: 'quiz',
  statement: 'Water is pumped at a rate of 10.0 kg/s from a point 200.0 m below the earth’s surface to a point 100.0 m above the ground level. Calculate the rate of change in potential energy.',
  diagram: R`<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(901)}<line x1="20" y1="100" x2="400" y2="100" stroke="var(--pe)" stroke-width="2"/><text x="395" y="94" text-anchor="end" class="lbs">ground z = 0</text><path class="st" d="M80 180 L80 30 L250 30" marker-end="url(#ah901)" color="var(--fg)"/><circle cx="80" cy="180" r="5" fill="var(--q)"/><text x="90" y="185" class="lb">z₁ = −200 m</text><text x="255" y="34" class="lb">z₂ = +100 m</text><text x="90" y="60" class="lb">ṁ = 10 kg/s</text></svg>`,
  given: [['ṁ', '10.0 kg/s', '10.0 kg/s'], ['z₁', '200 m below', '−200 m'], ['z₂', '100 m above', '+100 m']],
  find: 'ΔPE (rate)',
  assume: [[R`z_0 = 0`, 'سطح الأرض هو المرجع.']],
  steps: [
    [R`\Delta z = z_2 - z_1 = 100 - (-200) = 300\ \text{m}`, 'النقطة الأولى تحت الأرض فإشارتها سالبة.'],
    [R`\Delta PE = \dot m g\Delta z = 10.0\times9.81\times300 = 29430\ \text{J/s}`, 'عوضنا بالمعادلة.']
  ],
  answer: R`\[\Delta PE = 29.43\ \text{kJ/s} = 29.43\ \text{kW}\]`,
  check: 'الماي صعد 300 m فلازم ΔPE موجب (النظام كسب طاقة كامنة).',
  trap: 'أكثر غلطة: تكتب Δz = 100 − 200 = −100. المسافة الحقيقية 300 m لأن وحدة تحت الأرض!'
})}

<h2>6) الطاقة الداخلية والإنثالبي</h2>
${E.ex({
  id: 'e1-3', title: 'Example 1.3 Internal Energy Calculation', src: 'الكتاب ص 10', scope: 'quiz',
  statement: 'A cylinder fitted with a movable piston is filled with gas. An amount of 2.00 kcal of heat is transferred to the gas to raise the gas temperature 100°C higher. The gas does 68 J of work in moving the piston to its new equilibrium position. Calculate the change in internal energy of the system.',
  diagram: E.dev({ kind: 'piston', name: 'Gas', Q: 'Q = +2 kcal', Qdir: 'in', W: 'W = +68 J', Wdir: 'out' }),
  given: [['Q', '2.00 kcal (added)', '+8368 J'], ['W', '68 J (by gas)', '+68 J'], ['ΔT', '100°C', 'not needed']],
  find: 'ΔU',
  assume: [[R`\Delta KE = \Delta PE = 0`, 'الغاز داخل سلندر ثابت — ما يتحرك بسرعة ولا يتغير ارتفاعه.'], ['\\text{closed}', 'الغاز ما يطلع من السلندر (نظام مغلق).']],
  steps: [
    [R`\Delta U + \Delta KE + \Delta PE = Q - W \;\Rightarrow\; \Delta U = Q - W`, 'شلنا الحدود الصفرية.'],
    [R`Q = 2.00\ \text{kcal}\times\frac{1000\ \text{cal}}{1\ \text{kcal}}\times\frac{4.184\ \text{J}}{1\ \text{cal}} = 8368\ \text{J}`, 'لازم نوحد الوحدات قبل الطرح: W بالجول.'],
    [R`\Delta U = 8368 - 68 = 8300\ \text{J}`, 'Q موجبة (داخلة) و W موجب (الغاز سوّاه).']
  ],
  answer: R`\[\Delta U = 8300\ \text{J} = 8.30\ \text{kJ}\]`,
  check: 'الغاز أخذ 8368 J وصرف 68 J بس، فالباقي تخزن كطاقة داخلية (حرارته ارتفعت) — منطقي.',
  trap: 'معلومة "100°C" مو مطلوبة — موجودة بس للتشويش. وانتبه: 1 kcal = 4184 J (أو 1 J = 0.239 cal مثل الدفتر).'
})}
${E.eq(R`h = u + Pv \qquad H = U + PV \qquad \dot H = \dot m\,h \;\;(\text{or } \dot n\,h)`, {
  name: 'Eq. (1.7), (1.15)',
  mean: 'الإنثالبي = الطاقة الداخلية + شغل الجريان (الطاقة اللازمة لدفع المائع داخل/خارج النظام).',
  sym: [['h', 'الإنثالبي النوعي', 'kJ/kg أو kJ/mol'], ['u', 'الطاقة الداخلية النوعية', 'kJ/kg'], ['P', 'الضغط', 'kPa'], ['v', 'الحجم النوعي', 'm³/kg أو m³/mol'], [R`\dot H`, 'معدل نقل الإنثالبي', 'kJ/s = kW']],
  when: 'بأي نظام مفتوح، أو لما يعطيك u و P و v ويطلب h.',
  trick: 'kPa × m³/kg = kJ/kg مباشرة! (لأن kPa·m³ = kJ). فإذا الضغط بالـ kPa والحجم بالـ m³ ما تحتاج تحويل.'
})}
${E.ex({
  id: 'e1-4', title: 'Example 1.4 Enthalpy from Internal Energy', src: 'الكتاب ص 12', scope: 'quiz',
  statement: 'The specific internal energy of helium at 25°C and 1 atm is 3.80 kJ/mol, and the specific molar volume under the same conditions is 25 L/mol. Calculate the specific enthalpy of helium at this temperature and pressure, and the rate at which enthalpy is transported by a stream with a molar flow rate of 250 kmol/h.',
  diagram: E.dev({ kind: 'box', name: 'He stream', ins: [['ṅ = 250 kmol/h', 'u = 3.80 kJ/mol']], outs: [['h = ?', 'Ḣ = ?']] }),
  given: [['u', '3.80 kJ/mol', '3.80 kJ/mol'], ['P', '1 atm', '101.325 kPa'], ['v', '25 L/mol', '0.025 m³/mol'], ['ṅ', '250 kmol/h', R`\(2.5\times10^{5}\) mol/h`]],
  find: 'h (kJ/mol) and Ḣ',
  steps: [
    [R`Pv = 101.325\ \text{kPa}\times0.025\ \tfrac{\text{m}^3}{\text{mol}} = 2.533\ \text{kJ/mol}`, 'kPa × m³ = kJ، فحولنا اللتر لمتر مكعب (÷1000) والـ atm لـ kPa.'],
    [R`h = u + Pv = 3.80 + 2.53 = 6.33\ \text{kJ/mol}`, 'تعريف الإنثالبي.'],
    [R`\dot H = \dot n h = 250\ \tfrac{\text{kmol}}{\text{h}}\times\tfrac{1000\ \text{mol}}{\text{kmol}}\times6.33\ \tfrac{\text{kJ}}{\text{mol}} = 1.58\times10^{6}\ \text{kJ/h}`, 'معدل نقل الإنثالبي = التدفق × الإنثالبي النوعي.'],
    [R`\dot H = \frac{1.58\times10^6}{3600} = 440\ \text{kJ/s} = 440\ \text{kW}`, 'نحوله لـ kW حتى يصير أوضح.']
  ],
  answer: R`\[h = 6.33\ \text{kJ/mol},\qquad \dot H = 1.58\times10^{6}\ \text{kJ/h} \approx 440\ \text{kW}\]`,
  check: 'h أكبر من u دائماً للغازات (لأن Pv موجب) — 6.33 > 3.80 ✓.',
  trap: 'لا تضرب 1 atm × 25 L مباشرة وتسميها kJ! لازم: atm → kPa و L → m³. وkmol → mol (×1000).'
})}
`
  });

  // ================= 1.1 B — Open system
  E.page({
    id: 's11open', group: 'كوز + ميد', title: '1.1 النظام المفتوح', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>النظام المفتوح (Open System)</h1>
<p class="ltr"><b>1.1.3 Energy Balance for an Open System</b> — book pp. 13–17</p>
<p>بالنظام المفتوح المادة <b>تعبر</b> الحدود (عملية مستمرة steady state). المائع اللي يدخل لازم "ينطي دفعة" حتى يدخل، واللي يطلع "يدفع" المحيط حتى يطلع — هذا اسمه <b>شغل الجريان (flow work)</b>.</p>
${E.eq(R`W = W_s + W_{fl} \qquad W_{fl} = P_{out}\dot V_{out} - P_{in}\dot V_{in}`, {
  name: 'Eq. (1.8)–(1.10)',
  mean: 'الشغل الكلي = شغل العمود (الأجزاء المتحركة) + شغل الجريان (دفع المائع).',
  sym: [[R`W_s`, 'شغل العمود (shaft work): توربين، مضخة، rotor', 'kW'], [R`W_{fl}`, 'شغل الجريان (flow work)', 'kW']],
  when: 'حتى تفهم ليش يختفي PV من المعادلة — ينضم للـ U ويصير H.',
  trick: 'Shaft = عمود يدور (توربين/مضخة). Flow = دفع المائع. الـ flow work "يختبئ" داخل الإنثالبي.'
})}
${E.eq(R`Q - W_s = \Delta \dot H + \Delta KE + \Delta PE`, {
  name: 'Eq. (1.17) — open system, steady state',
  mean: 'المعادلة العامة للنظام المفتوح: نفس النظام المغلق بس U صارت H و W صار Ws.',
  sym: [[R`\Delta\dot H = \dot m(h_{out}-h_{in})`, 'تغير معدل نقل الإنثالبي', 'kW'], [R`W_s`, 'شغل العمود', 'kW']],
  when: 'كل الأجهزة: توربين، كمبريسر، مضخة، مبادل حراري، بويلر، خلاط.',
  trick: 'مغلق → U و W، مفتوح → H و Ws. "الباب مفتوح يدخل الـ H".'
})}
<div class="box warn"><strong>⚠️ انتبه للوحدات</strong>
ΔH بالـ kW (kJ/s) لأن h بالـ kJ/kg و ṁ بالـ kg/s. لكن ΔKE و ΔPE تطلع بالـ <b>W</b> (J/s) لأن υ² و gz وحدتها J/kg — <b>اقسم على 1000</b> قبل ما تجمعها ويا H.</div>

${E.ex({
  id: 'e1-5', title: 'Example 1.5 Energy Balance for an Open System: The Steam Turbine', src: 'الكتاب ص 15', scope: 'quiz',
  statement: 'Steam flowing at a rate of 10 kg/h enters a steam turbine at a velocity of 50 m/s and leaves at a point 5 m below the inlet at a velocity of 300 m/s. The heat loss from the turbine is estimated to be 10 kW, and the turbine delivers shaft work at a rate of 70 kW. Calculate the change in enthalpy transport rate of the process.',
  diagram: E.dev({ kind: 'turbine', name: 'Turbine', ins: [['ṁ = 10 kg/h', 'υ₁ = 50 m/s, z₁ = 0']], outs: [['υ₂ = 300 m/s', 'z₂ = −5 m']], Q: 'Q = −10 kW', Qdir: 'out', W: 'Ws = +70 kW', Wdir: 'out' }),
  given: [['ṁ', '10 kg/h', '0.002778 kg/s'], ['υ₁, υ₂', '50, 300 m/s', '50, 300 m/s'], ['z₂ − z₁', '5 m below', '−5 m'], ['Q', '10 kW lost', '−10 kW'], ['Ws', '70 kW delivered', '+70 kW']],
  find: 'ΔḢ',
  assume: [['Q < 0', 'حرارة مفقودة من التوربين للمحيط.'], ['W_s > 0', 'التوربين ينتج شغل (by the system).']],
  steps: [
    [R`\Delta KE = \tfrac12\dot m(\upsilon_2^2-\upsilon_1^2) = \tfrac12\left(\tfrac{10}{3600}\right)(300^2-50^2)\times\tfrac{1}{1000} = 0.1215\ \text{kW}`, 'حولنا kg/h إلى kg/s، وقسمنا على 1000 حتى J/s يصير kW.'],
    [R`\Delta PE = \dot m g\Delta z = \left(\tfrac{10}{3600}\right)(9.81)(-5)\times\tfrac{1}{1000} = -1.36\times10^{-4}\ \text{kW}`, 'المخرج أوطى بـ 5 m فـ Δz سالب.'],
    [R`\Delta\dot H = Q - W_s - \Delta KE - \Delta PE`, 'رتبنا المعادلة العامة حتى نعزل ΔḢ.'],
    [R`\Delta\dot H = -10 - 70 - 0.1215 + 0.000136 = -80.12\ \text{kW}`, 'عوضنا بالإشارات الصحيحة.']
  ],
  answer: R`\[\Delta\dot H = -80.12\ \text{kW}\]`,
  check: 'التوربين ياخذ طاقة من البخار (يطلع شغل وحرارة) فلازم إنثالبي البخار ينقص — ΔḢ سالب ✓. ولاحظ ΔPE صغير جداً مقارنة بـ Q و W.',
  trap: 'إشارة Q: "heat loss" = سالب. وإشارة Ws للتوربين = موجب. وننسى /1000 بالـ KE فيطلع 121.5 بدل 0.1215!'
})}

<h2>جدول الأجهزة — شنو يصير صفر بكل جهاز؟</h2>
<p>هذا أهم جدول بالمادة. احفظه وتعرف تبسط أي سؤال بثواني.</p>
<div class="tblwrap"><table class="cheat">
<tr><th>الجهاز</th><th>Q</th><th>Ws</th><th>ΔKE</th><th>ΔPE</th><th>المعادلة اللي تبقى</th></tr>
<tr><td><b>Turbine</b> توربين</td><td class="zero">≈0 (adiabatic)</td><td class="keep">+ (ينتج)</td><td class="zero">≈0 إلا إذا انطت سرعات</td><td class="zero">0</td><td class="ltr">\(W_s = -\dot m\,\Delta h = \dot m(h_{in}-h_{out})\)</td></tr>
<tr><td><b>Compressor</b> كمبريسر</td><td>غالباً heat loss</td><td class="keep">− (يحتاج)</td><td>انتبه للسرعات</td><td class="zero">0</td><td class="ltr">\(-W_s = \Delta\dot H + \Delta KE - Q\)</td></tr>
<tr><td><b>Pump</b> مضخة</td><td class="zero">0</td><td class="keep">− (يحتاج)</td><td>حسب القطر</td><td>حسب الارتفاع</td><td class="ltr">MEB: \(-\frac{W_s}{\dot m}=\frac{\Delta P}{\rho}+\frac{\Delta\upsilon^2}{2}+g\Delta z+F\)</td></tr>
<tr><td><b>Heat exchanger</b> مبادل</td><td class="keep">مطلوب</td><td class="zero">0</td><td class="zero">0</td><td class="zero">0</td><td class="ltr">\(Q = \Delta\dot H = \dot m(h_{out}-h_{in})\)</td></tr>
<tr><td><b>Boiler / Heater</b></td><td class="keep">+</td><td class="zero">0</td><td>أحياناً (سرعة المخرج)</td><td class="zero">0</td><td class="ltr">\(Q = \Delta\dot H + \Delta KE\)</td></tr>
<tr><td><b>Nozzle</b> فوهة</td><td class="zero">0</td><td class="zero">0</td><td class="keep">كبير</td><td class="zero">0</td><td class="ltr">\(\Delta\dot H = -\Delta KE\)</td></tr>
<tr><td><b>Throttling valve</b> صمام خنق</td><td class="zero">0</td><td class="zero">0</td><td class="zero">0</td><td class="zero">0</td><td class="ltr">\(h_{in} = h_{out}\)</td></tr>
<tr><td><b>Mixer</b> خلاط</td><td class="zero">0 (adiabatic)</td><td class="zero">0</td><td class="zero">0</td><td class="zero">0</td><td class="ltr">\(\sum \dot m_{in}h_{in} = \sum\dot m_{out}h_{out}\)</td></tr>
</table></div>
<div class="box tip"><strong>🧠 حيلة الحفظ: "تو-كم-مض يشتغلون، والباقي يسخنون"</strong>
<b>تو</b>ربين، <b>كم</b>بريسر، <b>مض</b>خة = عدهم <b>Ws</b>. المبادل والبويلر = عدهم <b>Q</b>. الصمام والفوهة والخلاط = <b>ولا واحد</b> (Q = Ws = 0).</div>

<div data-model="device"></div>
`
  });

  // ================= 1.1 C — Steam tables
  E.page({
    id: 's11steam', group: 'كوز + ميد', title: '1.1 جداول البخار', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>جداول البخار (Steam Tables)</h1>
<p class="ltr">Haywood, <i>Thermodynamic Tables in SI Units</i> — the table used in the exam. Book pp. 15–18.</p>
<div class="box info"><strong>الفكرة كلها بسطر</strong>
حتى تقرا أي خاصية للماء/البخار تحتاج <b>خاصيتين مستقلتين</b> (مثلاً P و T، أو P و x). أول خطوة دائماً: <b>شنو حالة البخار؟</b></div>

<h2>1) الجداول اللي بـ Haywood</h2>
${E.table(['رقم الجدول', 'شنو بيه', 'متى أستخدمه'], [
  ['<b>Table 7</b>', 'Saturated water & steam — حسب <b>درجة الحرارة</b> (من النقطة الثلاثية لحد 100°C)', 'لما تعرف T والحالة مشبعة'],
  ['<b>Table 8</b>', 'Saturated water & steam — حسب <b>الضغط</b> (من النقطة الثلاثية لحد النقطة الحرجة 22.12 MN/m²)', 'أكثر جدول تستخدمه: تعرف P → تطلع T<sub>sat</sub>, v<sub>f</sub>, v<sub>g</sub>, h<sub>f</sub>, h<sub>fg</sub>, h<sub>g</sub>…'],
  ['<b>Table 9</b>', 'Specific enthalpy of water and steam — h عند (P, T) يشمل <b>superheated</b> والسائل المضغوط', 'لما البخار superheated وتريد h'],
  ['<b>Table 10–12</b>', 'Entropy, density, internal energy عند (P, T)', 's، ρ = 1/v، u للبخار المحمص']
])}
<div class="box warn"><strong>⚠️ وحدة الضغط بـ Haywood</strong>
الضغط مكتوب بالـ <b>MN/m²</b> (= MPa) أو kN/m² (= kPa). تحويل سريع: <b class="num">1 bar = 0.1 MN/m² = 100 kN/m²</b>. يعني 10 bar تدورها بالسطر <b>1.00</b>، و 4 bar بالسطر <b>0.40</b>.</div>

<div class="box info"><strong>ما تعرف تقرا الجدول؟</strong> روح لصفحة <a href="#/tables"><b>شلون أستعمل جداول البخار</b></a> — بيها Table 8 و Table 9 من Haywood، تضغط على أي خانة ويشرحلك، ويا تمارين.</div>
<h2>2) شلون أعرف حالة البخار؟ (Steam state detective)</h2>
<div class="flow">
  <div class="q">إذا عندي P و T:</div>
  <div class="opts">
    <div class="opt">من Table 8 اطلع T<sub>sat</sub> عند هذا الضغط.</div>
    <div class="opt"><b class="phase-liquid">T &lt; T<sub>sat</sub></b> → سائل مضغوط (compressed / subcooled liquid)</div>
    <div class="opt"><b class="phase-wet">T = T<sub>sat</sub></b> → مشبع (تحتاج x)</div>
    <div class="opt"><b class="phase-superheated">T &gt; T<sub>sat</sub></b> → بخار محمص (superheated)</div>
  </div>
  <div class="q">إذا عندي P و h (أو v أو u):</div>
  <div class="opts">
    <div class="opt"><b class="phase-liquid">h &lt; h<sub>f</sub></b> → سائل مضغوط</div>
    <div class="opt"><b class="phase-wet">h<sub>f</sub> ≤ h ≤ h<sub>g</sub></b> → بخار رطب (wet)، احسب x</div>
    <div class="opt"><b class="phase-superheated">h &gt; h<sub>g</sub></b> → superheated</div>
  </div>
</div>
<div class="box tip"><strong>🧠 حيلة الحفظ: "تحت-وسط-فوق"</strong>
قارن رقمك بالـ <b>f</b> و <b>g</b>: تحت f = سائل، بين f و g = خليط رطب، فوق g = محمص. نفس القاعدة لـ T و h و v و u.</div>

<div data-model="detective"></div>

<h2>3) الجودة (Quality) — نسبة البخار بالخليط</h2>
${E.eq(R`x = \frac{m_{vapor}}{m_{total}} \qquad h = h_f + x\,h_{fg} = h_f + x\,(h_g - h_f)`, {
  name: 'Quality / dryness fraction',
  mean: 'x = كسر الكتلة اللي هي بخار. x = 0 سائل مشبع، x = 1 بخار مشبع جاف (dry saturated). نفس القانون لـ v و u و s.',
  sym: [['x', 'الجودة / dryness fraction', '— (0 إلى 1)'], [R`h_f`, 'إنثالبي السائل المشبع', 'kJ/kg'], [R`h_g`, 'إنثالبي البخار المشبع', 'kJ/kg'], [R`h_{fg}`, 'حرارة التبخر (evaporation)', 'kJ/kg']],
  when: 'كل ما يكلك wet steam أو "90% quality" أو "10% liquid" أو dryness fraction.',
  trick: '"10% liquid" يعني x = 0.9 مو 0.1! وبالـ Haywood عمود "Evaporation" هو h<sub>fg</sub> جاهز.'
})}
${E.eq(R`v = v_f + x(v_g - v_f) \approx x\,v_g \qquad u = u_f + x(u_g-u_f)`, {
  mean: 'نفس الفكرة للحجم والطاقة الداخلية. لأن v<sub>f</sub> صغير جداً (0.001)، تقريباً v ≈ x·v<sub>g</sub>.',
  sym: [[R`v_f, v_g`, 'الحجم النوعي للسائل والبخار', 'm³/kg'], [R`u_f, u_g`, 'الطاقة الداخلية', 'kJ/kg']],
  when: 'أسئلة الكوزات: احسب v و h لبخار جودته كذا.',
  trick: 'h<sub>fg</sub> موجود بالجدول، بس v<sub>fg</sub> و u<sub>fg</sub> لا — اطرحهم بنفسك.'
})}
${E.eq(R`\text{Degree of superheat} = T - T_{sat}`, {
  mean: 'كم درجة البخار أسخن من درجة غليانه عند نفس الضغط.',
  when: 'سؤال الكورس "190°C of superheat" يعني T = T<sub>sat</sub> + 190.',
  trick: 'كلمة Superheat تعني زيادة فوق الـ sat — اجمعها ويا T<sub>sat</sub>.'
})}

<h2>4) الاستيفاء الخطي (Linear interpolation)</h2>
<p>لما القيمة اللي تريدها بين سطرين بالجدول:</p>
${E.eq(R`y = y_1 + \frac{x - x_1}{x_2 - x_1}\,(y_2 - y_1)`, {
  mean: 'نفترض العلاقة خط مستقيم بين نقطتين بالجدول.',
  sym: [['x', 'القيمة المعروفة (مثلاً T)', ''], ['y', 'القيمة المطلوبة (مثلاً h)', ''], [R`(x_1,y_1),(x_2,y_2)`, 'السطرين المحيطين', '']],
  when: 'T أو P مو موجودة بالضبط بالجدول (مثلاً 370°C و الجدول بيه 350 و 375).',
  trick: '"الكسر × الفرق": كم صرت من المسافة بين السطرين (الكسر)، اضربه بفرق القيم وزيده على الأول.'
})}
<div class="card"><b>مثال تطبيقي (من Final 2024):</b> h عند 10 bar و 369.9°C.<br>
من Table 9 عمود 1 MN/m²: عند 350°C → 3159، عند 375°C → 3211.
${E.m(R`h = 3159 + \frac{369.9-350}{375-350}(3211-3159) = 3159 + 0.796\times52 = 3200.4\ \text{kJ/kg}`)}
</div>
<div data-model="interp"></div>

${E.ex({
  id: 'e1-6', title: 'Example 1.6 Use of a Steam Table', src: 'الكتاب ص 17', scope: 'quiz',
  statement: 'Use steam tables in the appendix to determine the temperature, specific internal energy and specific enthalpy of saturated steam at 3.0 bar. What is the state of the steam at 10 bar and 400°C? (i.e., is it saturated or superheated steam?)',
  given: [['Case 1', '3.0 bar, saturated', '0.30 MN/m²'], ['Case 2', '10 bar, 400°C', '1.0 MN/m², 400°C']],
  find: 'T, u, h at 3 bar sat; state + h, u, v at 10 bar & 400°C',
  steps: [
    [R`\textbf{Case 1: Table 8, row } p = 0.30\ \text{MN/m}^2`, 'مكتوب saturated فنروح لجدول التشبع حسب الضغط.'],
    [R`T_{sat}=133.5^\circ\text{C},\quad u_g = 2543.0,\quad h_g = 2724.7\ \text{kJ/kg},\quad v_g = 0.606\ \text{m}^3/\text{kg}`, '"saturated steam" = بخار مشبع جاف، فناخذ عمود Steam (g).'],
    [R`\textbf{Case 2: Table 8 at } 1.0\ \text{MN/m}^2:\ T_{sat} = 179.9^\circ\text{C} < 400^\circ\text{C}`, 'نقارن T بالـ T<sub>sat</sub> حتى نعرف الحالة.'],
    [R`\Rightarrow \text{superheated};\ \text{Table 9 } (1\ \text{MN/m}^2,\,400^\circ\text{C}):\ h = 3264\ \text{kJ/kg}`, 'البخار أسخن من درجة غليانه → محمص.'],
    [R`u = 2958\ \text{kJ/kg},\quad v = 0.307\ \text{m}^3/\text{kg}\ \ (\text{Tables 11, 12})`, 'u من جدول الطاقة الداخلية، v = 1/ρ من جدول الكثافة.']
  ],
  answer: R`\[\text{3 bar: } T=133.5^\circ\text{C},\ u=2543,\ h=2724.7\ \text{kJ/kg};\qquad \text{10 bar, 400}^\circ\text{C: superheated},\ h=3264\]`,
  check: 'h للمحمص (3264) أكبر من h<sub>g</sub> عند 10 bar (2776.2) ✓ — منطقي لأنه أسخن.',
  trap: 'تدور 10 bar بالسطر "10" من Table 8 الأولى (هذا 10 kN/m² = 0.1 bar!) — الصح السطر 1.00 MN/m².'
})}

<div data-model="steamtool"></div>
<div data-model="tvdome"></div>
`
  });

  // ================= 1.1 D — Turbines, HX, compressors
  E.page({
    id: 's11dev', group: 'كوز + ميد', title: '1.1 توربين، مبادل، كمبريسر', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>التوربين والمبادل الحراري والكمبريسر</h1>
<p class="ltr">1.1.4 Steam Turbine · 1.1.5 Heaters and Coolers · 1.1.6 Compressors — book pp. 18–25</p>
<div class="grid">
  <div class="card"><b>Turbine</b>: نظام مفتوح يولد كهرباء. غالباً <b>adiabatic</b>. ضغط المخرج <b>أقل</b> من المدخل. <b>ينتج شغل</b> (Ws +). ما يتحمل قطرات ماي كثيرة (تخرب الريش).</div>
  <div class="card"><b>Heat exchanger</b>: يسخن أو يبرد. السطح الخارجي معزول، الحرارة تنتقل بين الحار والبارد عبر جدران الأنابيب. <b>Ws = 0</b>.</div>
  <div class="card"><b>Compressor</b>: يرفع ضغط الغاز. ضغط المخرج <b>أعلى</b>. <b>يحتاج شغل</b> (Ws −).</div>
</div>

${E.ex({
  id: 'e1-7', title: 'Example 1.7 Steam Table and Turbine Work', src: 'الكتاب ص 18 · نفس سؤال Midterm 23/11/2023', scope: 'quiz',
  statement: 'Steam at a rate of 1500 kg/s enters a turbine at 40 bar and 400°C. It comes out of the turbine as wet steam at 4 bar. The turbine operates adiabatically and produces 1000 MW of work. What is the temperature of the steam leaving the turbine? What is the mass fraction of vapor in the stream leaving the turbine?',
  diagram: E.dev({ kind: 'turbine', name: 'Turbine', ins: [['ṁ = 1500 kg/s', '40 bar, 400°C']], outs: [['wet steam, 4 bar', 'T = ?, x = ?']], W: 'Ws = +1000 MW', Wdir: 'out' }),
  given: [['ṁ', '1500 kg/s', '1500 kg/s'], ['Inlet', '40 bar, 400°C', '4.0 MN/m², 400°C'], ['Outlet', 'wet, 4 bar', '0.40 MN/m²'], ['Ws', '1000 MW', R`\(1\times10^{6}\) kW`]],
  find: 'T_out and x',
  assume: [['Q = 0', 'adiabatic مذكورة بالسؤال.'], [R`\Delta KE = \Delta PE = 0`, 'ما معطي سرعات ولا ارتفاعات.']],
  steps: [
    [R`h_{in}:\ \text{Table 9},\ 4\ \text{MN/m}^2,\ 400^\circ\text{C} \Rightarrow h_{in} = 3216\ \text{kJ/kg}`, '400°C > T<sub>sat</sub>(40 bar) = 250.3°C فالمدخل superheated.'],
    [R`\text{Table 8},\ 0.40\ \text{MN/m}^2:\ T_{sat}=143.6^\circ\text{C},\ h_f=604.7,\ h_g=2737.6\ \text{kJ/kg}`, 'المخرج wet → يعني مشبع، فدرجة حرارته هي T<sub>sat</sub> عند 4 bar.'],
    [R`-W_s = \dot m(h_{out}-h_{in}) \Rightarrow -1\times10^{6} = 1500\,(h_{out}-3216)`, 'المعادلة العامة بعد الفرضيات، و Ws موجب لأن التوربين ينتج.'],
    [R`h_{out} = 3216 - \frac{10^{6}}{1500} = 2549.3\ \text{kJ/kg}`, 'عزلنا h<sub>out</sub>.'],
    [R`x = \frac{h_{out}-h_f}{h_g-h_f} = \frac{2549.3-604.7}{2737.6-604.7} = 0.912`, 'قانون الجودة.']
  ],
  answer: R`\[T_{out} = 143.6^\circ\text{C},\qquad x = 0.912\ (91.2\ \text{wt\% vapor},\ 8.8\%\ \text{liquid})\]`,
  check: 'h<sub>f</sub> (604.7) < h<sub>out</sub> (2549.3) < h<sub>g</sub> (2737.6) ✓ فعلاً رطب. وx قريب من 1 لأن التوربين ما يتحمل ماي كثير.',
  trap: 'MW → kW: 1000 MW = 10⁶ kW (مو 10³). وبالدفتر مكتوب "h<sub>g</sub> = 2133" — هذا رقم h<sub>fg</sub> (عمود Evaporation)، h<sub>g</sub> الصحيح 2737.6. ووحدة h<sub>out</sub> هي kJ/kg مو kJ/s.',
  note: 'نفس السؤال جه بالـ Midterm 23/11/2023 بصيغة: "54×10⁵ kg/hr" (= 1500 kg/s)، "outlet = 10% of inlet" (= 4 bar)، و T(°C) = P<sub>in</sub>(bar) × 10 (= 400°C).'
})}

${E.ex({
  id: 'e1-8', title: 'Example 1.8 Steam Turbine', src: 'الكتاب ص 19', scope: 'quiz',
  statement: 'Steam enters a turbine at a pressure of 10.0 bar (absolute) and a temperature of 600°C. The steam leaving the turbine is at 1 atm (absolute) pressure and is of 90% quality (90 wt% steam, 10 wt% liquid). How much steam has to go into the turbine to yield 1.5 × 10⁶ kW of shaft work?',
  diagram: E.dev({ kind: 'turbine', name: 'Turbine', ins: [['ṁ = ?', '10 bar, 600°C']], outs: [['1 atm, x = 0.90']], W: 'Ws = 1.5×10⁶ kW', Wdir: 'out' }),
  given: [['Inlet', '10 bar abs, 600°C', '1.0 MN/m², 600°C'], ['Outlet', '1 atm, x = 0.90', '101.325 kN/m², x = 0.9'], ['Ws', '1.5×10⁶ kW', '1.5×10⁶ kW']],
  find: 'ṁ',
  assume: [['Q = 0', 'التوربين adiabatic.'], [R`\Delta KE=\Delta PE=0`, 'ما معطاة.']],
  steps: [
    [R`h_{in}:\ \text{Table 9 } (1\ \text{MN/m}^2,\ 600^\circ\text{C}) = 3697\ \text{kJ/kg}`, '600°C أعلى بكثير من 179.9°C → superheated.'],
    [R`\text{Table 8, 1 atm (101.325 kN/m}^2):\ h_f = 419.1,\ h_g = 2676.0`, 'Haywood عنده سطر خاص لـ 1 atm.'],
    [R`h_{out} = h_f + x(h_g-h_f) = 419.1 + 0.9(2676.0-419.1) = 2450.3\ \text{kJ/kg}`, 'قانون الجودة.'],
    [R`\dot m(h_{out}-h_{in}) = -W_s \Rightarrow \dot m = \frac{1.5\times10^{6}}{3697-2450.3}`, 'Ws موجب للتوربين.'],
    [R`\dot m = \frac{1.5\times10^{6}}{1246.7} = 1203\ \text{kg/s}`, 'القسمة النهائية.']
  ],
  answer: R`\[\dot m \approx 1.20\times10^{3}\ \text{kg/s}\]`,
  check: 'كل kg يعطي ~1247 kJ، ونريد 1.5 مليون kJ/s → نحتاج ~1200 kg/s ✓.',
  trap: '"90% quality" = x = 0.9. وانتبه 1 atm مو 1 bar (h<sub>g</sub> = 2676.0 مو 2675.4).'
})}

${E.ex({
  id: 'e1-9', title: 'Example 1.9 Heat Exchanger', src: 'الكتاب ص 21', scope: 'quiz',
  statement: 'Steam at a rate of 60 kg/h, at 200°C, and 1 bar enters the tube side of a shell and tube heat exchanger. The steam is used to heat cold water flowing on the shell side; the steam leaves as saturated liquid. Neglect pressure drop of the steam on the tube side and the water on the shell side of the heat exchanger. How much heat must be transferred from the steam to the water side?',
  diagram: E.dev({ kind: 'hx', name: 'HX', ins: [['steam 60 kg/h', '200°C, 1 bar']], outs: [['sat. liquid', '1 bar']], cold: { in: ['cold water'], out: ['warm water'] }, Q: 'Q = ?', Qdir: 'out' }),
  given: [['ṁ', '60 kg/h', '60 kg/h (keep)'], ['Inlet', '200°C, 1 bar', '0.1 MN/m², 200°C'], ['Outlet', 'saturated liquid, 1 bar', 'h = h_f at 0.1 MN/m²']],
  find: 'Q',
  assume: [['W_s = 0', 'ماكو أجزاء متحركة.'], [R`\Delta PE = 0`, 'المدخل والمخرج بنفس المستوى.'], [R`\Delta KE = 0`, 'نفس قطر الأنابيب.'], [R`P_{out} = 1\ \text{bar}`, 'نهمل هبوط الضغط.']],
  steps: [
    [R`h_1:\ \text{Table 9 } (0.1\ \text{MN/m}^2,\ 200^\circ\text{C}) = 2875\ \text{kJ/kg}`, '200°C > 99.6°C → superheated.'],
    [R`h_2 = h_f\ (1\ \text{bar}) = 417.5\ \text{kJ/kg}`, '"saturated liquid" = h<sub>f</sub>.'],
    [R`Q = \Delta\dot H = \dot m(h_2-h_1) = 60\,(417.5-2875)`, 'بعد الفرضيات تبقى Q = ΔH.'],
    [R`Q = -147450\ \text{kJ/h} = -40.96\ \text{kW}`, 'نقسم على 3600 إذا نريد kW.']
  ],
  answer: R`\[Q = -1.47\times10^{5}\ \text{kJ/h}\ (\approx -41.0\ \text{kW})\]`,
  check: 'الإشارة سالبة لأن الحرارة طلعت من البخار (النظام) للماي البارد ✓.',
  trap: 'النظام هنا هو <b>البخار</b> مو المبادل كله؛ إذا أخذت المبادل كله (معزول) يطلع Q = 0!'
})}

${E.ex({
  id: 'e1-10', title: 'Example 1.10 Compressor', src: 'الكتاب ص 23 · ونفس فكرة Midterm 2024 Q3', scope: 'quiz',
  statement: 'The feed to a compressor is superheated steam at 300°C and 20 bar absolute pressure. It enters the compressor at a velocity of 20 m/s. The pipe inlet inside diameter is 0.10 m. The discharging pipe, after the compressor, has a smaller inside diameter and the discharge velocity is 170 m/s. The exit of the compressor is superheated steam at 350°C and 60 bar absolute. Heat loss from the compressor to the surroundings is 5 kW. Determine the compressor horsepower.',
  diagram: E.dev({ kind: 'compressor', name: 'Compressor', ins: [['20 bar, 300°C', 'υ₁ = 20 m/s, D = 0.1 m']], outs: [['60 bar, 350°C', 'υ₂ = 170 m/s']], Q: 'Q = −5 kW', Qdir: 'out', W: 'Ws = ?', Wdir: 'in' }),
  given: [['Inlet', '20 bar, 300°C, 20 m/s', '2 MN/m², 300°C'], ['D₁', '0.10 m', '0.10 m'], ['Outlet', '60 bar, 350°C, 170 m/s', '6 MN/m², 350°C'], ['Q', '5 kW loss', '−5 kW']],
  find: 'Ws in hp',
  assume: [[R`\Delta PE = 0`, 'الكمبريسر على مستوى أفقي.']],
  steps: [
    [R`h_1 = 3025\ \text{kJ/kg},\ v_1 = 0.125\ \text{m}^3/\text{kg};\quad h_2 = 3046\ \text{kJ/kg}`, 'Table 9: (2 MN/m², 300°C) و (6 MN/m², 350°C). v من جدول الكثافة (v = 1/ρ).'],
    [R`\dot m = \rho\upsilon_1A_1 = \frac{1}{0.125}\times20\times\frac{\pi(0.1)^2}{4} = 1.257\ \text{kg/s}`, 'ṁ ثابتة بالمدخل والمخرج، والمدخل عنده كل المعلومات (υ و D).'],
    [R`\Delta\dot H = \dot m(h_2-h_1) = 1.257(3046-3025) = 26.39\ \text{kW}`, 'تغير الإنثالبي.'],
    [R`\Delta KE = \tfrac12(1.257)(170^2-20^2)/1000 = 17.91\ \text{kW}`, 'السرعة تغيرت كثير فـ KE مهم هنا.'],
    [R`W_s = Q - \Delta\dot H - \Delta KE = -5 - 26.39 - 17.91 = -49.3\ \text{kW}`, 'رتبنا المعادلة العامة.'],
    [R`\text{hp} = \frac{49.3}{0.7457} = 66.1\ \text{hp}`, '1 hp = 0.7457 kW (أو kW × 1.341).']
  ],
  answer: R`\[W_s = -49.3\ \text{kW} \;\Rightarrow\; \text{Power} \approx 66\ \text{hp}\]`,
  check: 'Ws سالب لأن الشغل ينعمل على الغاز (by compressor blades) ✓.',
  trap: 'الكتاب قرّب ṁ = 1.25 فطلع ΔH = 26.25 و ΔKE = 18 و Ws = −49.25 kW → 66 hp. الفرق تقريب بس. لا تنسى /1000 بالـ KE!',
  note: 'بالدفتر الحل صحيح (66.04 hp باستخدام 1.341 hp/kW).'
})}
`
  });
})();
