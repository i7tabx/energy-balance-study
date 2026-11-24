(function () {
  const R = String.raw, E = window.EB;
  E.examTypes = [];
  E.examples['f25-q1a'] = { id: 'f25-q1a', scope: 'quiz', title: 'Final 2025 Q1 A' };
  const T = (id, title, scope) => { E.examTypes.push({ id, title, scope }); return `<h2 id="t-${id}"${scope === 'mid' ? ' data-scope="mid"' : ''}>${title} ${scope === 'mid' ? '<span class="tag new">جديد للميد</span>' : ''}</h2>`; };

  const windmill = R`<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(931)}
    <rect class="bd" x="60" y="10" width="150" height="180" rx="10"/>
    <path class="st" d="M135 70 L135 185"/><circle cx="135" cy="70" r="6" fill="var(--fg)"/>
    <path d="M135 70 L120 15 L140 15 Z M135 70 L185 95 L180 75 Z M135 70 L90 100 L100 115 Z" fill="var(--accent-soft)" stroke="var(--fg)"/>
    <path class="st" d="M5 60 L58 60" marker-end="url(#ah931)" color="var(--fg)"/><text x="5" y="52" class="lbs">air in</text>
    <path class="st" d="M212 60 L255 60" marker-end="url(#ah931)" color="var(--fg)"/><text x="215" y="52" class="lbs">air out</text>
    <path class="wa" d="M140 170 L250 170" marker-end="url(#ah931)"/><text x="215" y="162" class="wl">W</text>
    <text x="135" y="198" text-anchor="middle" class="lbs">OPEN</text></svg>`;
  const engine = R`<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">${E.svgStyle(932)}
    <rect class="bd" x="60" y="15" width="150" height="160" rx="10"/>
    <rect x="95" y="45" width="80" height="100" fill="var(--accent-soft)" stroke="var(--fg)"/><text x="135" y="100" text-anchor="middle" class="nm">engine</text>
    <path class="st" d="M5 70 L93 70" marker-end="url(#ah932)" color="var(--fg)"/><text x="5" y="62" class="lbs">air + fuel</text>
    <path class="st" d="M177 70 L255 70" marker-end="url(#ah932)" color="var(--fg)"/><text x="205" y="62" class="lbs">exhaust</text>
    <path class="wa" d="M177 125 L255 125" marker-end="url(#ah932)"/><text x="225" y="118" class="wl">W</text>
    <path class="qa" d="M135 147 L135 195" marker-end="url(#ah932)"/><text x="143" y="190" class="ql">Q</text>
    <text x="70" y="190" class="lbs">OPEN</text></svg>`;

  E.page({
    id: 'exams', group: 'أسئلة السنين', title: 'أسئلة السنين محلولة', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>أسئلة السنين — محلولة ومرتبة حسب النوع</h1>
<p>كل سؤال عليه تاگ <span class="tag quiz">كوز + ميد</span> أو <span class="tag new">جديد للميد</span> حسب آخر قسم يحتاجه. نص السؤال مثل ما انكتب بالورقة بالضبط (بالإنكليزي) حتى تتعود على صيغة الدكتورة.</p>
<div class="box info"><strong>شنو نتعلم من أسئلة السنين؟</strong>
<ul>
<li>الدكتورة تاخذ <b>أمثلة الكتاب نفسها</b> وتغير الأرقام أو الوحدات (°F، km/hr، atm، kcal/h) — مثال 1.7 و 1.10 و 1.12 و 1.19 و 1.21 كلهم انعادوا.</li>
<li>دائماً أكو <b>فراغات / MCQ</b> من جمل الكتاب حرفياً.</li>
<li>الميد: سؤال KE/PE صغير + سؤال توربين/كمبريسر + سؤال بخار.</li>
</ul></div>
<div class="map" id="examTypeMap"></div>

${T('keep', 'نوع 1: الطاقة الحركية والكامنة (KE / PE)', 'quiz')}
${E.ex({
  id: 'mt24-q1', title: 'Midterm 9/11/2024 — Q1 (2.5 Marks)', src: 'Midterm 2024', scope: 'quiz',
  statement: 'Water is pumped from a storage tank into a tube of 3 cm inner diameter at the rate of 0.001 m³/s as shown in the Figure below. What is the specific kinetic energy of water?',
  diagram: E.dev({ kind: 'pump', name: 'Pump', ins: [['storage tank']], outs: [['3 cm ID', '0.001 m³/s']] }),
  given: [['D', '3 cm', '0.03 m'], [R`\(\dot V\)`, '0.001 m³/s', '0.001 m³/s']],
  find: 'specific KE (J/kg)',
  assume: [[R`\upsilon \text{ in tube}`, '"specific" = لكل kg، فما نحتاج ṁ.']],
  steps: [
    [R`A = \frac{\pi(0.03)^2}{4} = 7.069\times10^{-4}\ \text{m}^2`, 'cm → m أول شي.'],
    [R`\upsilon = \frac{0.001}{7.069\times10^{-4}} = 1.415\ \text{m/s}`, 'السرعة = التدفق ÷ المساحة.'],
    [R`\widehat{KE} = \frac{\upsilon^2}{2} = \frac{1.415^2}{2} = 1.00\ \text{J/kg}`, 'Specific = مقسومة على الكتلة، فتبقى υ²/2.']
  ],
  answer: R`\[\widehat{KE} \approx 1.0\ \text{J/kg}\]`,
  check: 'سرعة ~1.4 m/s → طاقة نوعية صغيرة ✓. (لو طلب rate: ṁ = 1 kg/s فـ KE = 1.0 W)',
  trap: 'كلمة <b>specific</b> = لكل kg (J/kg) مو J/s. والقطر 3 cm = 0.03 m مو 0.3.'
})}
${E.ex({
  id: 'mt24-q2', title: 'Midterm 9/11/2024 — Q2 (2.5 Marks)', src: 'Midterm 2024 · مثل Example 1.2', scope: 'quiz',
  statement: 'Crude oil is pumped at a rate of 1.5 kg/s from a well 220 m deep to a tank 20 m above the ground, calculate ΔPE.',
  given: [['ṁ', '1.5 kg/s', '1.5 kg/s'], ['z₁', '220 m deep', '−220 m'], ['z₂', '20 m above', '+20 m']],
  find: 'ΔPE',
  steps: [
    [R`\Delta z = 20 - (-220) = 240\ \text{m}`, 'تحت الأرض سالب.'],
    [R`\Delta PE = \dot m g\Delta z = 1.5\times9.81\times240 = 3532\ \text{W}`, 'التعويض.']
  ],
  answer: R`\[\Delta PE = 3.53\ \text{kW}\]`,
  check: 'النفط صعد 240 m فـ ΔPE موجب ✓.',
  trap: 'Δz = 240 مو 200 ولا 220.'
})}
${E.ex({
  id: 'f25-q1b', title: 'Final 28/12/2025 — Q1 B', src: 'Final 2025 · KE + first law (closed) + English units', scope: 'quiz',
  statement: 'An aircraft of total weight 1134 kg is moving along the runway at a constant speed of 80.7 ft/s. The braking system is abruptly engaged, bringing the aircraft to a complete stop. Consider the aircraft as a closed system during the braking process. Neglecting any changes in potential energy and assuming no external work interactions other than braking, the entire decrease in the aircraft’s kinetic energy is converted into thermal energy due to friction within the brakes. After the braking process is completed and the brakes have cooled back to the ambient temperature, this thermal energy is fully transferred to the surrounding environment. Using the first law of thermodynamics, determine the total amount of heat transferred from the aircraft brakes to the surroundings, expressed in Btu.',
  given: [['m', '1134 kg', '1134 kg (= 2500 lbm)'], ['υ₁', '80.7 ft/s', '24.60 m/s'], ['υ₂', '0 (complete stop)', '0']],
  find: 'Q in Btu',
  assume: [['W = 0', 'ماكو شغل خارجي.'], [R`\Delta PE = 0`, 'مذكور بالسؤال.'], [R`\Delta U = 0`, 'الفرامل بردت ورجعت لنفس حرارة المحيط → الحالة النهائية = الابتدائية بالطاقة الداخلية.']],
  steps: [
    [R`Q - W = \Delta U + \Delta KE + \Delta PE \;\Rightarrow\; Q = \Delta KE`, 'شلنا كل الأصفار.'],
    [R`\upsilon_1 = 80.7\ \tfrac{\text{ft}}{\text{s}}\times0.3048\ \tfrac{\text{m}}{\text{ft}} = 24.60\ \text{m/s}`, 'نحول لـ SI أول.'],
    [R`\Delta KE = \tfrac12 m(\upsilon_2^2-\upsilon_1^2) = \tfrac12(1134)(0-24.60^2) = -3.431\times10^{5}\ \text{J}`, 'الطيارة وقفت فـ KE نقصت.'],
    [R`Q = \frac{-3.431\times10^{5}\ \text{J}}{1055.06\ \text{J/Btu}} = -325\ \text{Btu}`, '1 Btu = 1055.06 J.'],
    [R`\text{(English check: } \tfrac12\cdot\tfrac{2500\ \text{lbm}\,(80.7)^2}{32.174}\cdot\tfrac{1}{778.16} = 325\ \text{Btu)}`, 'نفس الجواب بالوحدات الإنكليزية (g<sub>c</sub> = 32.174 lbm·ft/lbf·s² و 778.16 ft·lbf/Btu).']
  ],
  answer: R`\[Q = -325\ \text{Btu}\quad(325\ \text{Btu transferred to the surroundings})\]`,
  check: 'الإشارة سالبة لأن الحرارة طلعت من النظام للمحيط ✓. وكل الطاقة الحركية صارت حرارة بالنهاية.',
  trap: 'الكلمة "weight 1134 kg" المقصود الكتلة. وبالإنكليزي لازم تقسم على g<sub>c</sub> = 32.174 حتى تطلع ft·lbf.'
})}

${T('turb', 'نوع 2: التوربين (Turbine)', 'quiz')}
${E.ex({
  id: 'f24-q1', title: 'Final 26/12/2024 — Q1 (12.5 Marks)', src: 'Final 2024', scope: 'quiz',
  statement: 'Steam at 10 bar absolute with 190 °C of superheat is fed to a turbine at a rate 2000 kg/h. The turbine operation is adiabatic, and the effluent is saturated steam at 1 bar. Calculate the work output of the turbine in kilowatts, neglecting kinetic and potential energy changes.',
  diagram: E.dev({ kind: 'turbine', name: 'Turbine', ins: [['2000 kg/h', '10 bar, 190°C superheat']], outs: [['sat. steam', '1 bar']], W: 'Ws = ?', Wdir: 'out' }),
  given: [['ṁ', '2000 kg/h', '0.5556 kg/s'], ['P₁', '10 bar abs', '1.0 MN/m²'], ['Superheat', '190°C', 'T₁ = 179.9 + 190 = 369.9°C'], ['Outlet', 'saturated steam, 1 bar', 'h = h_g at 0.1 MN/m²']],
  find: 'Ws (kW)',
  assume: [['Q = 0', 'adiabatic.'], [R`\Delta KE=\Delta PE=0`, 'مذكور.']],
  steps: [
    [R`T_{sat}(10\ \text{bar}) = 179.9^\circ\text{C} \Rightarrow T_1 = 179.9 + 190 = 369.9^\circ\text{C}`, '"190°C of superheat" يعني أعلى من T<sub>sat</sub> بـ 190.'],
    [R`\text{Table 9, 1 MN/m}^2:\ 350^\circ\text{C} \to 3159,\ \ 375^\circ\text{C} \to 3211`, '369.9 مو موجودة، فنستوفي بين 350 و 375.'],
    [R`h_1 = 3159 + \frac{369.9-350}{375-350}(3211-3159) = 3200.4\ \text{kJ/kg}`, 'Linear interpolation.'],
    [R`h_2 = h_g(1\ \text{bar}) = 2675.4\ \text{kJ/kg}`, '"saturated steam" = h<sub>g</sub>.'],
    [R`W_s = \dot m(h_1 - h_2) = \frac{2000}{3600}(3200.4 - 2675.4) = 291.7\ \text{kW}`, 'من Q − Ws = ΔH مع Q = 0.']
  ],
  answer: R`\[W_s \approx 292\ \text{kW}\]`,
  check: 'Ws موجب لأن التوربين ينتج شغل ✓. كل kg يعطي ~525 kJ — رقم طبيعي للتوربين.',
  trap: 'لا تاخذ T = 190°C! هذا الـ superheat مو الحرارة. و kg/h → kg/s.'
})}
${E.ex({
  id: 'mt23b-q1', title: 'Midterm 23/11/2023 — Q1 (10 Marks)', src: 'Midterm 2023 (b) · مثل Example 1.5 بوحدات مختلفة', scope: 'quiz',
  statement: 'The turbine delivers shaft work at a rate of 93.8 hp by 5×10² kg/hr of steam, with (10⁴ kcal/h) heat loss. The steam enters the turbine at 44 atm and 450 °C with linear velocity of 60 m/s and leaves at atmospheric pressure and a velocity of equals six times the inlet velocity. Calculate the specific enthalpy change associated with the process if the difference between inlet point of the steam and bottom outlet point = 5 m.',
  diagram: E.dev({ kind: 'turbine', name: 'Turbine', ins: [['500 kg/h, 44 atm, 450°C', 'υ₁ = 60 m/s']], outs: [['1 atm, υ₂ = 360 m/s', '5 m below']], Q: 'Q = −10⁴ kcal/h', Qdir: 'out', W: 'Ws = +93.8 hp', Wdir: 'out' }),
  given: [['Ws', '93.8 hp', '69.95 kW'], ['ṁ', '5×10² kg/h', '0.1389 kg/s'], ['Q', '10⁴ kcal/h loss', '−11.62 kW'], ['υ₁', '60 m/s', '60 m/s'], ['υ₂', '6 × 60', '360 m/s'], ['Δz', 'outlet 5 m below', '−5 m']],
  find: 'Δh (kJ/kg)',
  steps: [
    [R`W_s = 93.8\times0.7457 = 69.95\ \text{kW};\quad Q = -\frac{10^4\times4.184}{3600} = -11.62\ \text{kW}`, 'نوحد كل شي بالـ kW.'],
    [R`\Delta KE = \tfrac12(0.1389)(360^2-60^2)/1000 = 8.75\ \text{kW}`, 'سرعة المخرج 6 أضعاف.'],
    [R`\Delta PE = (0.1389)(9.81)(-5)/1000 = -0.0068\ \text{kW}`, 'المخرج أوطى.'],
    [R`\Delta\dot H = Q - W_s - \Delta KE - \Delta PE = -11.62 - 69.95 - 8.75 + 0.0068 = -90.31\ \text{kW}`, 'المعادلة العامة.'],
    [R`\Delta h = \frac{\Delta\dot H}{\dot m} = \frac{-90.31}{0.1389} = -650\ \text{kJ/kg}`, 'المطلوب specific → نقسم على ṁ.']
  ],
  answer: R`\[\Delta h \approx -650\ \text{kJ/kg}\]`,
  check: 'من الجداول h<sub>in</sub> (44 atm, 450°C) ≈ 3325 kJ/kg → h<sub>out</sub> ≈ 3325 − 650 = 2675 ≈ h<sub>g</sub> عند 1 atm (2676) — يعني البخار يطلع مشبع تقريباً ✓ منطقي جداً.',
  trap: 'ثلاث تحويلات: hp → kW، kcal/h → kW، و "six times" = 360 m/s. ودرجة 450°C و 44 atm ما تحتاجها للحل (بس للتحقق).'
})}
${E.ex({
  id: 'mt23a-q2', title: 'Midterm 20/11/2023 — Q2 (3 Marks)', src: 'Midterm 2023 (a) · Example 1.5 بأرقام مختلفة', scope: 'quiz',
  statement: 'Steam flows into a steam turbine at a rate of 20 kg/h with an inlet velocity of 60 m/s, and leaves the turbine with a velocity of 300 m/s at a point that is 7 meters lower than the inlet. The turbine gains 10 kW of heat to the surroundings and consumes 80 kW of shaft work. Calculate the rate of change of enthalpy transport.',
  given: [['ṁ', '20 kg/h', '0.005556 kg/s'], ['υ₁, υ₂', '60, 300 m/s', ''], ['Δz', '7 m lower', '−7 m'], ['Q', '"gains 10 kW to the surroundings"', '−10 kW (lost)'], ['Ws', '"consumes 80 kW"', '+80 kW (delivered)']],
  find: 'ΔḢ',
  assume: [['Q = -10\\ \\text{kW}', 'الصياغة غريبة: "gains … <b>to the surroundings</b>" = الحرارة رايحة للمحيط، يعني loss (طالب كاتب بالورقة −Q).'], ['W_s = +80\\ \\text{kW}', 'التوربين ينتج شغل (مثل مثال 1.5)، كلمة consumes مقصود بيها "يستهلك من البخار".']],
  steps: [
    [R`\Delta KE = \tfrac12\left(\tfrac{20}{3600}\right)(300^2-60^2)/1000 = 0.240\ \text{kW}`, ''],
    [R`\Delta PE = \left(\tfrac{20}{3600}\right)(9.81)(-7)/1000 = -3.8\times10^{-4}\ \text{kW}`, ''],
    [R`\Delta\dot H = -10 - 80 - 0.240 + 0.0004 = -90.24\ \text{kW}`, 'نفس خطوات مثال 1.5.']
  ],
  answer: R`\[\Delta\dot H \approx -90.24\ \text{kW}\]`,
  check: 'نفس منطق مثال 1.5: التوربين ياخذ طاقة من البخار فـ ΔH سالب ✓.',
  trap: 'اكتب فرضياتك بالإشارات بوضوح بالامتحان. لو أخذتها حرفياً (Ws = −80) يطلع +69.76 kW — بس هذا ما يصير بالتوربين.'
})}
<div class="card"><b>Midterm 23/11/2023 — Q2 (10 Marks):</b> "1000 MW … 54×10⁵ kg/hr … 40 bar superheated … outlet = 10% of inlet … T(°C) = P<sub>in</sub>(bar) × 10".<br>
هذا <b>مثال 1.7 نفسه</b>: ṁ = 54×10⁵/3600 = 1500 kg/s، P<sub>out</sub> = 0.1 × 40 = 4 bar، و <b>الفرضية:</b> T<sub>in</sub> = 40 × 10 = 400°C (السؤال ما يكول درجة الحرارة مباشرة، فنستخدم المعادلة المعطاة). الجواب: <b>T<sub>out</sub> = 143.6°C و x = 0.912</b>. <a href="#/s11dev">← شوف الحل الكامل بمثال 1.7</a></div>

${T('comp', 'نوع 3: الكمبريسر (Compressor)', 'quiz')}
${E.ex({
  id: 'mt24-q3', title: 'Midterm 9/11/2024 — Q3 (5 Marks)', src: 'Midterm 2024 · Example 1.10 بوحدات مختلفة', scope: 'quiz',
  statement: '72 km/hr of the superheated steam enters to the compressor pipe (Tube area = 0.785 cm²) at 572°F and 20 bar absolute pressure. The superheated steam discharges the compressor at 662°F, 60 bar absolute and the velocity is 612 km/hr. Heat loss from the compressor to the surroundings is 5 kW. Determine the compressor power?',
  diagram: E.dev({ kind: 'compressor', name: 'Compressor', ins: [['20 bar, 572°F', '72 km/h, A = 0.785 cm²']], outs: [['60 bar, 662°F', '612 km/h']], Q: 'Q = −5 kW', Qdir: 'out', W: 'Ws = ?', Wdir: 'in' }),
  given: [['υ₁', '72 km/hr', '20 m/s'], ['υ₂', '612 km/hr', '170 m/s'], ['T₁', '572°F', '300°C'], ['T₂', '662°F', '350°C'], ['A₁', '0.785 cm²', R`\(0.785\times10^{-4}\) m²`], ['Q', '5 kW loss', '−5 kW']],
  find: 'Ws',
  assume: [[R`\Delta PE = 0`, 'أفقي.'], [R`A = 0.785\ \text{cm}^2`, 'نحل بالرقم المكتوب. (ملاحظة تحت إذا المقصود 0.785 dm²)']],
  steps: [
    [R`T(^\circ\text{C}) = \frac{T(^\circ\text{F})-32}{1.8}:\ \frac{572-32}{1.8} = 300^\circ\text{C},\ \frac{662-32}{1.8} = 350^\circ\text{C}`, 'الدكتورة غيرت الوحدات بس — هي نفس أرقام مثال 1.10.'],
    [R`\upsilon:\ 72\ \tfrac{\text{km}}{\text{h}}\times\tfrac{1000}{3600} = 20\ \text{m/s},\quad 612\times\tfrac{1000}{3600} = 170\ \text{m/s}`, 'km/h ÷ 3.6 = m/s.'],
    [R`h_1 = 3025,\ v_1 = 0.125;\quad h_2 = 3046\ \text{kJ/kg}`, 'Table 9 (و الكثافة).'],
    [R`\dot m = \frac{\upsilon_1A_1}{v_1} = \frac{20\times0.785\times10^{-4}}{0.125} = 0.01256\ \text{kg/s}`, 'ṁ = ρυA = υA/v.'],
    [R`\Delta\dot H = 0.01256(21) = 0.264\ \text{kW},\quad \Delta KE = \tfrac12(0.01256)(170^2-20^2)/1000 = 0.179\ \text{kW}`, ''],
    [R`W_s = Q - \Delta\dot H - \Delta KE = -5 - 0.264 - 0.179 = -5.44\ \text{kW}\ (7.3\ \text{hp})`, '']
  ],
  answer: R`\[W_s \approx -5.44\ \text{kW}\ (\approx 7.3\ \text{hp, work input})\]`,
  check: 'سالب = شغل داخل للكمبريسر ✓.',
  trap: 'تحويل °F → °C و km/hr → m/s هو كل صعوبة السؤال.',
  note: 'المساحة 0.785 cm² تعني قطر 1 cm فقط. إذا قصد الدكتورة نفس مثال 1.10 (القطر 0.1 m → المساحة <b>78.5 cm²</b> = 0.00785 m²) فالجواب يصير <b>Ws = −49.3 kW ≈ 66 hp</b>. بالامتحان اكتب الفرضية واضحة.'
})}
${E.ex({
  id: 'f24-q3', title: 'Final 26/12/2024 — Q3 (12.5 Marks)', src: 'Final 2024', scope: 'quiz',
  statement: 'Air is being compressed from 100 kPa and 255 K (H = 489 kJ/kg) to 100 kPa and 278 K (H = 509 kJ/kg). The exist velocity of air from compressor is 60 m/s. What is the power required in kW for the compressor of the load is 100 kg/hr of air.',
  diagram: E.dev({ kind: 'compressor', name: 'Compressor', ins: [['100 kPa, 255 K', 'h = 489 kJ/kg']], outs: [['278 K, h = 509', 'υ₂ = 60 m/s']], W: 'Ws = ?', Wdir: 'in' }),
  given: [['ṁ', '100 kg/hr', '0.02778 kg/s'], ['h₁, h₂', '489, 509 kJ/kg', ''], ['υ₂', '60 m/s', '60 m/s']],
  find: 'Power (kW)',
  assume: [['Q = 0', 'ما مذكور انتقال حرارة → adiabatic.'], [R`\upsilon_1 \approx 0`, 'سرعة الدخول ما معطاة → نهملها.'], [R`\Delta PE = 0`, '']],
  steps: [
    [R`\Delta\dot H = \dot m(h_2-h_1) = 0.02778(509-489) = 0.556\ \text{kW}`, ''],
    [R`\Delta KE = \tfrac12(0.02778)(60^2-0)/1000 = 0.050\ \text{kW}`, ''],
    [R`-W_s = \Delta\dot H + \Delta KE = 0.606\ \text{kW}`, 'Q − Ws = ΔH + ΔKE مع Q = 0.']
  ],
  answer: R`\[W_s = -0.606\ \text{kW}\ \Rightarrow\ \text{Power required} \approx 0.61\ \text{kW}\]`,
  check: 'الإنثالبي زاد والسرعة زادت، فلازم ندفع شغل ✓.',
  trap: 'الضغط النهائي مكتوب "100 kPa" — غلط مطبعي (الأصل 1000 kPa) بس ما يأثر لأن H معطاة.'
})}

${T('pump', 'نوع 4: المضخة / MEB', 'quiz')}
${E.ex({
  id: 'f23-q1', title: 'Final 8/1/2023 — Q1 (20 Marks)', src: 'Final 2023 · Example 1.12 بالـ CO₂', scope: 'quiz',
  statement: 'In an Ethyl Benzene production factory, a sizable Carbon dioxide tank that is sealed off from the atmosphere is utilized to put out fires. After being removed from the tank and going via a pump, the Carbon dioxide is sent to the hoses. Delivering 113.4 cubic meter of Carbon dioxide per hour at a gauge pressure of 16 bar is the targeted outcome. If the Carbon dioxide level in the tank changes by a little amount in height considering the pump’s discharge, no modifications to the pipe and hose diameters, how much effort needs in hp to be given to the pump to achieve the requirements for pressure and discharge rate? Density CO₂ = 1.98 kg/m³',
  given: [[R`\(\dot V\)`, '113.4 m³/h', '0.0315 m³/s'], ['ρ', '1.98 kg/m³', '1.98 kg/m³'], ['P₂', '16 bar gauge', 'ΔP = 16×10⁵ Pa'], ['Δz, Δυ', 'little / same diameters', '0']],
  find: 'Pump power (hp)',
  assume: [[R`\Delta z = 0,\ \Delta\upsilon = 0,\ F = 0`, 'مذكور تغير الارتفاع قليل ونفس الأقطار، وما معطى احتكاك.'], [R`P_1 = P_{atm}`, 'نفترض ضغط الخزان جوي مثل مثال 1.12، فـ ΔP = قيمة الـ gauge = 16 bar.'], [R`\rho = \text{const}`, 'السؤال معطي كثافة ثابتة (فرضية MEB).'], [R`\eta = 100\%`, 'ما معطاة كفاءة.']],
  steps: [
    [R`\dot m = \rho\dot V = 1.98\times\frac{113.4}{3600} = 0.06237\ \text{kg/s}`, ''],
    [R`-\frac{W_s}{\dot m} = \frac{\Delta P}{\rho} = \frac{16\times10^{5}}{1.98} = 8.081\times10^{5}\ \text{J/kg}`, 'بقى بس حد الضغط.'],
    [R`-W_s = 0.06237\times8.081\times10^{5} = 5.04\times10^{4}\ \text{W} = 50.4\ \text{kW}`, 'لاحظ: = V̇·ΔP مباشرة.'],
    [R`\text{hp} = \frac{50.4}{0.7457} = 67.6\ \text{hp}`, '']
  ],
  answer: R`\[W_s = -50.4\ \text{kW} \approx -67.6\ \text{hp}\]`,
  check: 'لاحظ 113.4 m³/h = 1890 L/min بالضبط (نفس مثال 1.12)، والجواب = V̇×ΔP ما يعتمد على الكثافة ✓.',
  trap: 'إذا حولت ΔP لـ absolute (17 bar) وطرحت 0 تطلع غلط. فرق الضغط = 16 bar لأن الخزان جوي.'
})}

${T('steam', 'نوع 5: حالة البخار والجودة (Steam state & quality)', 'quiz')}
${E.ex({
  id: 'mt23a-q1a', title: 'Midterm 20/11/2023 — Q1 A (7 Marks)', src: 'Midterm 2023 (a)', scope: 'quiz',
  statement: 'Ten kg of water 45 °C is heated at a constant pressure of 10 bar until it becomes superheated vapour at 300°C. Find the change in volume, enthalpy, internal energy and entropy.',
  diagram: E.dev({ kind: 'box', name: 'Heater (P = 10 bar)', ins: [['10 kg water', '45°C']], outs: [['superheated', '300°C']], Q: 'Q', Qdir: 'in' }),
  given: [['m', '10 kg', '10 kg'], ['State 1', '45°C, 10 bar', 'compressed liquid (45 < 179.9)'], ['State 2', '300°C, 10 bar', 'superheated (300 > 179.9)']],
  find: 'ΔV, ΔH, ΔU, ΔS',
  assume: [[R`\text{state 1} \approx \text{sat. liquid at } 45^\circ\text{C}`, 'خواص السائل المضغوط تقريباً = السائل المشبع بنفس الحرارة (الضغط تأثيره قليل على السوائل).']],
  steps: [
    [R`\text{State 1 (Table 7, 45}^\circ\text{C)}:\ v_f = 0.00101,\ h_f = 188.4,\ u_f = 188.4,\ s_f = 0.638`, '45°C < T<sub>sat</sub>(10 bar) = 179.9 → سائل.'],
    [R`\text{State 2 (Tables 9–12, 1 MN/m}^2, 300^\circ\text{C)}:\ v = 0.258,\ h = 3052,\ u = 2794,\ s = 7.124`, '300 > 179.9 → superheated.'],
    [R`\Delta V = 10(0.258 - 0.00101) = 2.57\ \text{m}^3`, 'كل التغيرات × الكتلة.'],
    [R`\Delta H = 10(3052 - 188.4) = 2.864\times10^{4}\ \text{kJ}`, ''],
    [R`\Delta U = 10(2794 - 188.4) = 2.606\times10^{4}\ \text{kJ}`, ''],
    [R`\Delta S = 10(7.124 - 0.638) = 64.9\ \text{kJ/K}`, '']
  ],
  answer: R`\[\Delta V \approx 2.57\ \text{m}^3,\ \Delta H \approx 28\,640\ \text{kJ},\ \Delta U \approx 26\,060\ \text{kJ},\ \Delta S \approx 64.9\ \text{kJ/K}\]`,
  check: 'ΔH − ΔU = PΔV = 1000 kPa × 2.57 m³ = 2570 kJ ✓ (28 640 − 26 060 ≈ 2580). تطابق ممتاز!',
  trap: 'لا تاخذ h<sub>g</sub> للحالة الأولى — الماي سائل. وجدول 9 يعطي h للسائل المضغوط مباشرة إذا تريد دقة أكثر.'
})}
${E.ex({
  id: 'qz-220', title: 'Midterm 20/11/2023 Q1 B  &  Morning Quiz B Q2', src: 'تكرر مرتين!', scope: 'quiz',
  statement: 'Determine the condition of steam at a temperature of 220°C and enthalpy of 2750 kJ/kg.',
  given: [['T', '220°C', '220°C'], ['h', '2750 kJ/kg', '2750 kJ/kg']],
  find: 'state (and x if wet)',
  steps: [
    [R`\text{Saturation at }220^\circ\text{C}:\ P_{sat} \approx 23.2\ \text{bar},\ h_f = 943.6,\ h_g = 2801.1\ \text{kJ/kg}`, 'نقارن h بالـ h<sub>f</sub> و h<sub>g</sub> عند نفس T. (بـ Haywood Table 8 أقرب سطر 2.3 MN/m² = 219.6°C: h<sub>f</sub> = 941.6، h<sub>fg</sub> = 1858.2)'],
    [R`h_f < 2750 < h_g \Rightarrow \text{wet steam}`, 'بين f و g → رطب.'],
    [R`x = \frac{2750 - 943.6}{2801.1 - 943.6} = 0.973`, 'قانون الجودة.']
  ],
  answer: R`\[\text{Wet steam},\ x \approx 0.97\ (97\%\ \text{dry}),\ P \approx 23.2\ \text{bar}\]`,
  check: 'h قريب من h<sub>g</sub> فـ x قريب من 1 ✓.',
  trap: 'لا تكول superheated بس لأن 2750 رقم كبير — لازم تقارن ويا h<sub>g</sub> بنفس الحرارة.'
})}
${E.ex({
  id: 'qz-a1', title: 'Morning Quiz A — Q1', src: 'كوز صباحي A', scope: 'quiz',
  statement: 'Calculate the specific volume and the specific enthalpy of a 35% quality steam at a pressure of 20 kPa.',
  given: [['P', '20 kPa', '20 kN/m² (0.2 bar)'], ['x', '35%', '0.35']],
  find: 'v, h',
  steps: [
    [R`\text{Table 8, } p = 20\ \text{kN/m}^2:\ v_f = 0.001017,\ v_g = 7.65,\ h_f = 251.5,\ h_{fg} = 2358.4`, 'الصفحة الأولى من Table 8 (kN/m²).'],
    [R`v = v_f + x(v_g - v_f) = 0.001017 + 0.35(7.65 - 0.001017) = 2.678\ \text{m}^3/\text{kg}`, ''],
    [R`h = h_f + x\,h_{fg} = 251.5 + 0.35(2358.4) = 1076.9\ \text{kJ/kg}`, '']
  ],
  answer: R`\[v \approx 2.68\ \text{m}^3/\text{kg},\qquad h \approx 1077\ \text{kJ/kg}\]`,
  check: 'v ≈ x·v<sub>g</sub> = 2.6775 ✓ (v<sub>f</sub> مهمل تقريباً).',
  trap: '20 kPa = 0.2 bar — ابحث بصفحة kN/m² مو MN/m².'
})}
${E.ex({
  id: 'qz-a2', title: 'Morning Quiz A — Q2', src: 'كوز صباحي A', scope: 'quiz',
  statement: 'Determine the state of steam at a pressure of 12 bar with its specific volume of 0.175 m³/kg.',
  given: [['P', '12 bar', '1.2 MN/m²'], ['v', '0.175 m³/kg', '']],
  find: 'state',
  steps: [
    [R`\text{Table 8, 1.20 MN/m}^2:\ T_{sat} = 188.0^\circ\text{C},\ v_g = 0.1632\ \text{m}^3/\text{kg}`, ''],
    [R`v = 0.175 > v_g = 0.1632 \Rightarrow \text{superheated}`, 'أكبر من g → محمص.'],
    [R`T \approx T_{sat}\frac{v}{v_g} = 461.15\times\frac{0.175}{0.1632} = 494.5\ \text{K} \approx 221^\circ\text{C}\ (\text{rough})`, 'تقدير سريع بقانون شارل (غاز مثالي). القيمة الدقيقة من الجداول/الأداة ≈ 212°C.']
  ],
  answer: R`\[\text{Superheated steam }(T \approx 212^\circ\text{C},\ \approx 24^\circ\text{C of superheat})\]`,
  check: 'v أكبر من v<sub>g</sub> بـ 7% بس، فالـ superheat قليل ✓.',
  trap: 'السؤال يطلب "state" بس — الجواب الأساسي: superheated لأن v > v<sub>g</sub>.'
})}
${E.ex({
  id: 'qz-b1', title: 'Morning Quiz B — Q1', src: 'كوز صباحي B', scope: 'quiz',
  statement: 'A closed rigid vessel contains 125 g of liquid and 7.5 g of water vapor in equilibrium at 0.5 MPa. Determine the volume of the mixture.',
  given: [['m_liquid', '125 g', '0.125 kg'], ['m_vapor', '7.5 g', '0.0075 kg'], ['P', '0.5 MPa', '0.50 MN/m² (5 bar)']],
  find: 'V',
  steps: [
    [R`\text{Table 8, 0.50 MN/m}^2:\ v_f = 0.001093,\ v_g = 0.375\ \text{m}^3/\text{kg}`, '"in equilibrium" = مشبع.'],
    [R`V = m_f v_f + m_g v_g = 0.125(0.001093) + 0.0075(0.375)`, 'كل طور ياخذ حجمه.'],
    [R`V = 1.37\times10^{-4} + 2.81\times10^{-3} = 2.95\times10^{-3}\ \text{m}^3`, '']
  ],
  answer: R`\[V \approx 2.95\times10^{-3}\ \text{m}^3 = 2.95\ \text{L}\quad (x = 7.5/132.5 = 0.057)\]`,
  check: 'البخار (7.5 g بس) ياخذ 95% من الحجم — لأن v<sub>g</sub> أكبر من v<sub>f</sub> بـ 343 مرة ✓.',
  trap: 'g → kg. وتكدر تحلها بطريقة x: v = v<sub>f</sub> + x(v<sub>g</sub> − v<sub>f</sub>) ثم V = m·v — نفس الجواب.'
})}
${E.ex({
  id: 'qz-e1', title: 'Evening Quiz B — Q1', src: 'كوز مسائي B', scope: 'quiz',
  statement: 'Find the internal energy of unit mass of steam at a pressure of 7 bar (i) when its quality is 0.8 (ii) when it is dry and saturated and (iii) superheated, the degree of superheat being 65°C. The specific heat of superheated steam at constant pressure is 2.277 kJ/kg K.',
  given: [['P', '7 bar', '0.70 MN/m²'], ['(i) x', '0.8', ''], ['(iii) superheat', '65°C', 'T = 165.0 + 65 = 230°C'], ['cp', '2.277 kJ/kg·K', '']],
  find: 'u in each case',
  steps: [
    [R`\text{Table 8, 0.70 MN/m}^2:\ T_{sat}=165.0,\ v_g=0.273,\ u_f=696.3,\ u_g=2571.1,\ h_g=2762.0`, ''],
    [R`\text{(i) } u = u_f + x(u_g-u_f) = 696.3 + 0.8(2571.1-696.3) = 2196.1\ \text{kJ/kg}`, 'قانون الجودة على u.'],
    [R`\text{(ii) } u = u_g = 2571.1\ \text{kJ/kg}`, 'dry saturated = x = 1.'],
    [R`\text{(iii) } h = h_g + c_p(T_{sup}-T_{sat}) = 2762.0 + 2.277(65) = 2910.0\ \text{kJ/kg}`, 'نستخدم c<sub>p</sub> المعطى لأن هذا قصد السؤال.'],
    [R`v_{sup} \approx v_g\frac{T_{sup}}{T_{sat}} = 0.273\times\frac{503.15}{438.15} = 0.3135\ \text{m}^3/\text{kg}`, 'قانون شارل (البخار المحمص يتصرف تقريباً كغاز مثالي) — بالكلفن!'],
    [R`u = h - Pv = 2910.0 - 700(0.3135) = 2690.5\ \text{kJ/kg}`, 'kPa × m³/kg = kJ/kg.']
  ],
  answer: R`\[\text{(i) } 2196\quad \text{(ii) } 2571\quad \text{(iii) } \approx 2690\ \text{kJ/kg}\]`,
  check: 'u يزيد من (i) إلى (iii) ✓. وجداول البخار الدقيقة تعطي u ≈ 2686 kJ/kg عند 7 bar و 230°C — قريب جداً.',
  trap: 'بالـ (iii) لا تنسى تطرح Pv — السؤال يطلب u مو h. وقانون شارل بالكلفن مو °C.'
})}
${E.ex({
  id: 'qz-12bar', title: 'Quiz — v and h at 12 bar (and the 11 bar version)', src: 'كوزات (نسختين)', scope: 'quiz',
  statement: 'Find the specific volume and enthalpy of steam at 12 bar when the condition of steam is (a) wet with dryness fraction 0.98 (b) dry saturated and (c) superheated and the temperature of steam 240°C.',
  given: [['P', '12 bar', '1.2 MN/m²'], ['(a) x', '0.98', ''], ['(c) T', '240°C', '']],
  find: 'v, h for (a), (b), (c)',
  steps: [
    [R`\text{Table 8, 1.20 MN/m}^2:\ T_{sat}=188.0,\ v_f=0.001139,\ v_g=0.1632,\ h_f=798.4,\ h_{fg}=1984.3,\ h_g=2782.7`, ''],
    [R`\text{(a) } v = 0.001139 + 0.98(0.1632-0.001139) = 0.1600;\ \ h = 798.4 + 0.98(1984.3) = 2743.0`, ''],
    [R`\text{(b) } v = v_g = 0.1632\ \text{m}^3/\text{kg},\ \ h = h_g = 2782.7\ \text{kJ/kg}`, ''],
    [R`\text{(c) Table 9: } 225^\circ\text{C}: 2886\,(1\,\text{MN}),\,2834\,(2\,\text{MN});\ 250^\circ\text{C}: 2943,\,2902`, '240 > 188 → superheated. ما عندنا 1.2 MN ولا 240°C → استيفاء مزدوج.'],
    [R`h(1\,\text{MN},240) = 2886 + 0.6(57) = 2920.2;\quad h(2\,\text{MN},240) = 2834 + 0.6(68) = 2874.8`, 'أول شي على T (الكسر 15/25 = 0.6).'],
    [R`h(1.2\,\text{MN},240) = 2920.2 + 0.2(2874.8-2920.2) = 2911.1\ \text{kJ/kg}`, 'بعدين على P (الكسر 0.2/1 = 0.2).'],
    [R`v \approx v_g\frac{T}{T_{sat}} = 0.1632\times\frac{513.15}{461.15} = 0.182\ \text{m}^3/\text{kg}\ \ (\text{tables: } 0.188)`, 'تقدير بقانون شارل؛ من جدول الكثافة ρ ≈ 5.32 kg/m³ → v ≈ 0.188.']
  ],
  answer: R`\[\text{(a) } 0.160,\ 2743\quad \text{(b) } 0.1632,\ 2782.7\quad \text{(c) } \approx 0.188,\ \approx 2911\]`,
  check: 'h يزيد (a) < (b) < (c) ✓.',
  trap: 'نسخة 11 bar: نفس الطريقة بسطر 1.10 MN/m²: T<sub>sat</sub> = 184.1، v<sub>g</sub> = 0.1774، h<sub>f</sub> = 781.1، h<sub>fg</sub> = 1998.5، h<sub>g</sub> = 2779.7 → (a) v = 0.174، h = 2739.6 (b) 0.1774، 2779.7 (c) h ≈ 2915.7، v ≈ 0.206.'
})}

${T('hx', 'نوع 6: مبادل حراري بالبخار', 'quiz')}
<div class="card">بأسئلة السنين المبادل الحراري يجي دائماً ويا <b>Cp</b> (مزيج أسيتون/بنزين أو تبريد دهن) — هذا مادة الميد <span class="tag new">جديد للميد</span>. للكوز راجع <a href="#/s11dev">مثال 1.9</a> (بخار يتكثف) — نفس الفكرة: <b>Q = ṁ(h<sub>out</sub> − h<sub>in</sub>)</b>.</div>
<div data-scope="mid" id="mid-hx-slot"></div>

${T('units', 'نوع 7: تحويل وحدات — التوصيل الحراري Q = kAΔT/Δx', 'quiz')}
${E.ex({
  id: 'f25-q3b', title: 'Final 28/12/2025 — Q3 (2)', src: 'Final 2025 · تمرين وحدات إنكليزية', scope: 'quiz',
  statement: 'A wall of an annealing oven is made of 10 inch thick forebrick. If the interior of the wall is at 2550°F and the exterior of the wall is at 392°F, what is the heat loss per hour? The relation for heat transfer is Q = kA (T2 − T1)/Δx where k is the thermal conductivity (assume an average value of 0.81 Btu/(hr)(ft²)(°F)/ft.), T is the temperature in °F, and Δx is the wall thickness.',
  given: [['Δx', '10 in', '0.8333 ft'], ['T₁ (inside)', '2550°F', ''], ['T₂ (outside)', '392°F', ''], ['k', '0.81 Btu/(h·ft²·°F/ft)', '']],
  find: 'heat loss per hour (per ft² of wall — A not given)',
  assume: [['A = 1\\ \\text{ft}^2', 'المساحة ما معطاة، فنطلع الجواب لكل ft².']],
  steps: [
    [R`\Delta x = \frac{10\ \text{in}}{12\ \text{in/ft}} = 0.8333\ \text{ft}`, 'وحدة k فيها ft فلازم السمك بالـ ft.'],
    [R`\frac{Q}{A} = k\frac{T_2-T_1}{\Delta x} = 0.81\times\frac{392-2550}{0.8333} = -2098\ \frac{\text{Btu}}{\text{h}\cdot\text{ft}^2}`, 'الوحدات: (Btu/h·ft²·°F/ft) × °F / ft = Btu/(h·ft²).'],
    [R`\text{SI: } 2098\times3.1546 = 6.62\times10^{3}\ \text{W/m}^2`, '1 Btu/(h·ft²) = 3.1546 W/m² (للتمرين).']
  ],
  answer: R`\[\text{Heat loss} \approx 2.10\times10^{3}\ \text{Btu/h per ft}^2\ \text{of wall}\]`,
  check: 'الإشارة السالبة = الحرارة طالعة من الداخل للخارج ✓.',
  trap: 'inch → ft (÷12). وفرق الحرارة بالـ °F يساوي فرقها بالـ °R (ما نضيف 460 للفروقات).'
})}

${T('theory', 'نوع 8: نظري — رسم الأنظمة، فراغات، MCQ', 'quiz')}
<article class="ex" data-scope="quiz" id="ex-f25-q1a"><div class="ex-head"><span class="ex-title">Final 28/12/2025 — Q1 A</span>${E.tag('quiz')}</div><div class="ex-body">
<div class="statement">Make a rough sketch of each of the following processes. Show the system boundary, and classify the system as open or closed. 1. windmill 2. internal combustion engine</div>
<div class="grid"><div class="diagram">${windmill}<p><b>Windmill → Open</b>: الهوا (مادة) يعبر حدود النظام ويطلع شغل من العمود.</p></div>
<div class="diagram">${engine}<p><b>Internal combustion engine → Open</b>: هوا + وقود يدخل، عادم يطلع، شغل وحرارة يطلعون.</p></div></div>
<div class="box tip"><strong>🧠 القاعدة</strong> إذا <b>أي مادة</b> تعبر الخط المنقط → Open. إذا بس طاقة → Closed. ارسم الخط المنقط دائماً وسمِّه "system boundary".</div>
<label class="donebox"><input type="checkbox" data-done="f25-q1a"> فهمته وحليته ✓</label></div></article>
<div class="card"><b>Homework 1 — Q1:</b> <span class="ltr">Explain the first law of thermodynamics… How does it relate to energy conservation?</span><br>
<b>الجواب:</b> <span class="ltr">The first law is a statement of energy conservation: energy cannot be created or destroyed, only converted from one form to another or transferred (by heat, work, or mass flow). Accumulation = Input − Output; for a closed system Q − W = ΔU + ΔKE + ΔPE.</span></div>
<div class="card"><b>Homework 1 — Q2:</b> <span class="ltr">Describe what is meant by internal energy and give examples.</span><br>
<b>الجواب:</b> <span class="ltr">Internal energy is all the energy of a system that is not kinetic or potential energy — energy due to all molecular, atomic, and subatomic motions and interactions (e.g. translation, rotation and vibration of molecules, intermolecular attractions, chemical bonds, nuclear energy).</span></div>
<div class="box info"><strong>كل الـ MCQ والفراغات</strong> موجودة ببنك الأسئلة التفاعلي — <a href="#/quizbank">روح للبنك ←</a></div>

<div data-scope="mid" id="mid-exams-slot"></div>

<h2 id="t-out">خارج المادة (ما نحلها)</h2>
${E.table(['الورقة', 'السؤال', 'ليش خارج'], [
  ['Final 8/1/2023', 'Q2 MCQ 5, 6 (wet-bulb), 7 (humidity ratio)', 'Psychrometric chart (1.6)'],
  ['Final 8/1/2023', 'Q2 MCQ 7′, 8, 9 (bioprocesses)', 'Bioprocesses'],
  ['Final 26/12/2024', 'Q5 blanks 4, 5, 6, 7, 10 (humidity, dew point, specific volume of air, wet-bulb, RH)', 'Psychrometric chart'],
  ['Final 26/12/2024', 'Q5 blanks 1, 2, 3 (cell death, energy accounting, biological catalysts)', 'Bioprocesses'],
  ['Final 28/12/2025', 'Q4 blanks 1, 5 (specific volume of air)', 'Psychrometric chart'],
  ['Final 28/12/2025', 'Q4 blanks 3, 4 (biochemical heat, energy accounting)', 'Bioprocesses']
])}
<div class="box warn"><strong>تنبيه صغير</strong> جمل الـ bioprocesses موجودة بالكتاب بالصفحة قبل مثال 1.21 مباشرة. إذا عندك وقت قبل الميد اقراها مرة وحدة بسرعة — قصيرة.</div>
`
  });
})();
