(function () {
  const R = String.raw, E = window.EB;

  // ---------------- formula sheet (used by FAB modal + review page)
  E.sheetHTML = () => R`
<div class="sheet-sec"><h3>1) القانون الأول</h3>
${E.m(R`\text{Closed: } Q - W = \Delta U + \Delta KE + \Delta PE \qquad \text{Open (steady): } Q - W_s = \Delta\dot H + \Delta KE + \Delta PE`)}
<p>Q (+) داخلة للنظام · W (+) النظام يسويه · توربين Ws+ · مضخة/كمبريسر Ws−</p></div>
<div class="sheet-sec"><h3>2) الطاقة الحركية والكامنة والتدفق</h3>
${E.m(R`\Delta KE = \tfrac12\dot m(\upsilon_2^2-\upsilon_1^2)\quad \Delta PE = \dot m g(z_2-z_1)\quad \dot m=\rho\dot V\quad \upsilon=\frac{\dot V}{\pi D^2/4}`)}
<p>J/s → kW: ÷1000 قبل الجمع ويا ΔH</p></div>
<div class="sheet-sec"><h3>3) الإنثالبي</h3>
${E.m(R`h = u + Pv\qquad \dot H = \dot m h = \dot n h\qquad \Delta\dot H=\dot m(h_{out}-h_{in})\qquad \text{kPa}\cdot\text{m}^3 = \text{kJ}`)}</div>
<div class="sheet-sec"><h3>4) البخار</h3>
${E.m(R`h = h_f + x\,h_{fg}\quad v = v_f + x(v_g-v_f)\quad u = u_f + x(u_g-u_f)\quad x=\frac{h-h_f}{h_g-h_f}`)}
${E.m(R`y = y_1 + \frac{x-x_1}{x_2-x_1}(y_2-y_1)\qquad \text{superheat} = T - T_{sat}`)}
<p>T &lt; T<sub>sat</sub> سائل · T = T<sub>sat</sub> مشبع · T &gt; T<sub>sat</sub> محمص · h بين h<sub>f</sub> و h<sub>g</sub> = رطب</p></div>
<div class="sheet-sec"><h3>5) MEB وبرنولي</h3>
${E.m(R`-\frac{W_s}{\dot m} = \frac{\Delta P}{\rho} + \frac{\Delta\upsilon^2}{2} + g\Delta z + F\qquad \text{Bernoulli: } \frac{\Delta P}{\rho}+\frac{\Delta\upsilon^2}{2}+g\Delta z = 0`)}
${E.m(R`W_{actual} = \frac{W_{ideal}}{\eta}\qquad 1\ \text{hp} = 0.7457\ \text{kW}\qquad P_{abs}=P_{gauge}+P_{atm}`)}
<p>فرضيات MEB: steady · single inlet/outlet · incompressible</p></div>
<div class="sheet-sec"><h3>6) أيزوثيرمي (غاز مثالي، مغلق)</h3>
${E.m(R`W = nRT\ln\frac{V_2}{V_1} = P_1V_1\ln\frac{P_1}{P_2}\qquad \Delta U = 0 \Rightarrow Q = W`)}</div>
<div class="sheet-sec" data-scope="mid"><h3>7) السعة الحرارية <span class="tag new">ميد</span></h3>
${E.m(R`\Delta U = m\int C_v\,dT\qquad \Delta H = \int_{T_1}^{T_2} C_p\,dT \approx C_p\Delta T`)}
${E.m(R`C_p = a + bT + cT^2 + dT^3 \Rightarrow \Delta h = a\Delta T + \tfrac b2(T_2^2-T_1^2) + \tfrac c3(T_2^3-T_1^3) + \tfrac d4(T_2^4-T_1^4)`)}
<p>انتبه: T بنفس وحدة الجدول (°C أو K) · ideal gas: C<sub>p</sub> = C<sub>v</sub> + R · سوائل/صلب: C<sub>p</sub> ≈ C<sub>v</sub></p></div>
<div class="sheet-sec" data-scope="mid"><h3>8) تغير الطور والخلائط <span class="tag new">ميد</span></h3>
${E.m(R`\Delta h = \int_{T_1}^{T_b}C_{p,l}\,dT + \Delta h_v(T_b) + \int_{T_b}^{T_2}C_{p,v}\,dT`)}
${E.m(R`C_{p,mix} = \sum x_i C_{p,i}\qquad \sum \dot m_{in}h_{in} = \sum\dot m_{out}h_{out}\ (\text{adiabatic mixer})`)}</div>
<div class="sheet-sec"><h3>9) جدول الأجهزة</h3>
${E.table(['جهاز', 'يصير صفر', 'يبقى'], [
  ['Turbine', 'Q, ΔKE, ΔPE', 'Ws = ṁ(h<sub>in</sub> − h<sub>out</sub>)'],
  ['Compressor', 'ΔPE', '−Ws = ΔH + ΔKE − Q'],
  ['Pump (liquid)', 'Q', 'MEB'],
  ['Heat exchanger / boiler', 'Ws, ΔKE, ΔPE', 'Q = ṁΔh'],
  ['Valve', 'Q, Ws, ΔKE, ΔPE', 'h<sub>in</sub> = h<sub>out</sub>'],
  ['Mixer', 'Q, Ws, ΔKE, ΔPE', 'Σṁh<sub>in</sub> = Σṁh<sub>out</sub>']
])}</div>`;

  const ladder = [
    ['الطاقة', ['1 kcal = 4.184 kJ = 1000 cal', '1 Btu = 1.05506 kJ = 778.16 ft·lbf', '1 ft·lbf = 1.3558 J', '1 kWh = 3600 kJ', '1 L·atm = 101.325 J']],
    ['القدرة', ['1 hp = 0.7457 kW = 745.7 W', '1 kW = 1.341 hp', '1 kW = 1 kJ/s', '1 Btu/h = 0.2931 W']],
    ['الطول والمساحة', ['1 ft = 0.3048 m = 12 in', '1 in = 2.54 cm', '1 m = 3.2808 ft', '1 cm² = 10⁻⁴ m²', '1 ft² = 0.0929 m²']],
    ['الكتلة والمولات', ['1 lbm = 0.45359 kg', '1 kg = 2.2046 lbm', '1 kmol = 1000 mol', '1 lbmol = 453.59 mol']],
    ['درجة الحرارة', ['K = °C + 273.15', '°R = °F + 459.67', '°F = 1.8 °C + 32', '°C = (°F − 32)/1.8', 'ΔT(K) = ΔT(°C)', 'ΔT(°F) = ΔT(°R) = 1.8 ΔT(K)']],
    ['الضغط', ['1 atm = 101.325 kPa = 1.01325 bar', '1 atm = 14.696 psi = 760 mmHg', '1 bar = 100 kPa = 0.1 MPa (MN/m²)', '1 kN/m² = 1 kPa', 'P_abs = P_gauge + P_atm']],
    ['الحجم والتدفق', ['1 L = 10⁻³ m³', '1 ft³ = 28.317 L', 'm³/h ÷ 3600 = m³/s', 'L/min ÷ 60 000 = m³/s', 'km/h ÷ 3.6 = m/s', 'kg/h ÷ 3600 = kg/s']],
    ['السعة الحرارية', ['1 cal/(g·°C) = 4.184 J/(g·K)', '1 Btu/(lbm·°F) = 4.184 kJ/(kg·K)', '1 Btu/(lbmol·°F) = 4.184 J/(mol·K)', 'R = 8.314 J/(mol·K) = 0.08206 L·atm/(mol·K)']]
  ];

  E.page({
    id: 'review', group: 'المراجعة', title: 'المراجعة النهائية', scope: 'quiz', prio: 'low',
    render: () => R`
<h1>المراجعة النهائية</h1>
<p>كلشي هنا يتفلتر حسب الوضع (كوز/ميد). اطبع ورقة القوانين من الزر الأخضر.</p>
<div class="row"><button class="btn" id="openSheet2">افتح ورقة القوانين للطباعة</button><a class="btn ghost" href="#/quizbank" style="text-align:center;text-decoration:none">روح لبنك الأسئلة</a></div>

<h2>ورقة القوانين</h2>
${E.sheetHTML()}

<h2>سلّم تحويل الوحدات</h2>
<div class="ladder">${ladder.map(([t, items]) => `<div class="rung"><b>${t}</b>${items.map(i => `<div>${i}</div>`).join('')}</div>`).join('')}</div>
<div class="box tip"><strong>🧠 حيلة الحفظ</strong> "<b>4184</b>" تحفظ الكالوري (4.184 J/cal، 4.184 kJ/kcal، وحتى 4.184 لتحويل Btu/lbm·°F). و "<b>0.7457</b>" للحصان. و "<b>3600</b>" لكل شي بالساعة.</div>
<div data-model="unitconv"></div>

<h2>الفخاخ الشائعة</h2>
<ol>
<li><b>÷1000</b>: ΔKE و ΔPE تطلع بالـ W (J/s)، وΔH بالـ kW. اقسم على 1000 قبل الجمع.</li>
<li><b>kg/h → kg/s</b> (÷3600)، <b>m³/h</b> و <b>L/min</b> و <b>km/h</b>.</li>
<li><b>إشارة Q</b>: heat loss = سالب. <b>إشارة W</b>: توربين +، مضخة/كمبريسر −. "Work done on the system" = W سالب.</li>
<li><b>Gauge vs absolute</b>: P<sub>abs</sub> = P<sub>gauge</sub> + 1.013 bar. خزان مفتوح للجو + مخرج gauge → ΔP = قيمة الـ gauge.</li>
<li><b>hp</b>: kW ÷ 0.7457 (مو × 0.7457).</li>
<li><b>الكفاءة</b>: الشغل الفعلي = النظري ÷ η (يكبر).</li>
<li><b>"10% liquid"</b> → x = 0.9. <b>"saturated steam"</b> → h<sub>g</sub>. <b>"saturated liquid"</b> → h<sub>f</sub>.</li>
<li><b>Haywood</b>: 10 bar = سطر 1.00 MN/m² (مو 10 kN/m²).</li>
<li><b>Degree of superheat</b> مو درجة الحرارة: T = T<sub>sat</sub> + superheat.</li>
<li><b>تحت الأرض</b>: z سالب، و Δz = z₂ − z₁. وانتبه لعمق سحب الماي (مثال 1.11).</li>
<li><b>Specific</b> = لكل kg (J/kg أو kJ/kg). <b>Rate</b> = لكل ثانية.</li>
<li><b>Isothermal ≠ adiabatic</b>. والغاز المثالي: T بالكلفن دائماً.</li>
<li>صياغة غريبة ("gains heat to the surroundings", "consumes shaft work") → اكتب فرضيتك بالإشارة بوضوح.</li>
<li data-scope="mid"><b>°C vs K داخل متعددة حدود Cp</b>: استخدم نفس الوحدة اللي بالجدول (عمود Form/T). <span class="tag new">ميد</span></li>
<li data-scope="mid"><b>التكامل</b>: b/2، c/3، d/4 — ولا تنسى ترفع الأسس (T², T³, T⁴). <span class="tag new">ميد</span></li>
<li data-scope="mid"><b>تحويل معادلة Cp</b>: عوض T(°F) = T(°R) − 459.67 أو T(°F) = 1.8T(K) − 459.67 داخل المعادلة، وبعدين اضرب كل المعادلة بمعامل وحدة Cp. <span class="tag new">ميد</span></li>
<li data-scope="mid"><b>الخليط</b>: C<sub>p,mix</sub> = Σ x<sub>i</sub>C<sub>p,i</sub> بالكسور المولية والتدفق بالمول. <span class="tag new">ميد</span></li>
<li data-scope="mid"><b>تغير الطور</b>: لا تنسى الحرارة الكامنة Δh<sub>v</sub> بالمسار. <span class="tag new">ميد</span></li>
</ol>
`
  });

  // ---------------- quiz bank data
  E.mcq = [
    { q: 'What is considered as the surroundings of a system?', c: ['All energy and material within the system', 'The analysis carried out on the system', 'Objects that are not part of the system', 'The system boundary'], a: 2, why: 'المحيط = كل شي خارج حدود النظام.', src: 'Final 2023' },
    { q: 'In which of the following cases is a system considered adiabatic?', c: ['When there is no motion along the system boundary.', 'When the system has no internal energy.', 'When the system and surroundings are at the same temperature.', 'When there is no significant heat exchange with the surroundings'], a: 3, why: 'Adiabatic = Q = 0 (ماكو تبادل حرارة يُذكر). خيار c هو <b>سبب</b> ممكن، بس التعريف هو d.', src: 'Final 2023' },
    { q: 'Which of the following devices could contribute to the work done in a chemical process?', c: ['Pumps', 'Insulation', 'Temperature sensors', 'Heat exchangers'], a: 0, why: 'الشغل يجي من pumps, compressors, moving pistons, turbines.', src: 'Final 2023' },
    { q: 'What happens to the internal energy in a system if there is no displacement in the direction of the gravitational field?', c: ['It increases.', 'It decreases.', 'It remains constant.', 'It becomes zero'], a: 3, why: 'جواب الدكتورة (وملف الحلول) هو <b>d</b> لأن جملة الكتاب تنتهي بـ "= 0". بس انتبه: اللي يصير صفر علمياً هو <b>ΔPE</b> مو الطاقة الداخلية — السؤال مصاغ غلط. بالامتحان اختار d.', src: 'Final 2023' },
    { q: 'In a closed system, what is exchanged across its boundary?', c: ['Heat and work', 'Heat and material', 'Work and material', 'Heat, work, and material'], a: 0, why: 'المغلق: طاقة (حرارة وشغل) بس، ماكو مادة.', src: 'Final 2023' },
    { q: 'What is a system in thermodynamic analysis?', c: ['The surroundings of an object', 'The boundary of an object', 'An object or collection of objects under analysis', 'The energy transfer between objects'], a: 2, why: 'تعريف الكتاب حرفياً.', src: 'Homework 1' },
    { q: 'How is a system boundary defined?', c: ['It is always a physical barrier', 'It is chosen and specified at the beginning of the analysis', 'It is determined by the surroundings', 'It changes throughout the analysis'], a: 1, why: '"chosen and specified at the beginning of the analysis".', src: 'Homework 1' },
    { q: 'What are the surroundings in a thermodynamic system?', c: ['Everything within the system boundary', 'The boundary itself', 'Everything external to the system boundary', 'Only the objects directly touching the system'], a: 2, why: '"everything external to it is called the surroundings".', src: 'Homework 1' },
    { q: 'Which of the following is true about an isolated system?', c: ['It exchanges only heat with the surroundings', 'It exchanges only work with the surroundings', 'It exchanges heat, work, and material with the surroundings', 'It does not exchange heat, work, or material with the surroundings'], a: 3, why: 'معزول = ولا شي يعبر.', src: 'Homework 1' },
    { q: 'What characterizes a closed system?', c: ['It exchanges heat and work, but not material, with the surroundings', 'It exchanges only material with the surroundings', 'It does not exchange anything with the surroundings', 'It exchanges heat, work, and material with the surroundings'], a: 0, why: 'طاقة نعم، مادة لا.', src: 'Homework 1' },
    { q: 'In an open system, what can be exchanged with the surroundings?', c: ['Only heat', 'Heat and work, but not material', 'Only material', 'Heat, work, and material'], a: 3, why: 'المفتوح: كلشي يعبر.', src: 'Homework 1' },
    { q: 'Which type of system allows for the exchange of material?', c: ['Isolated system', 'Closed system', 'Open system', 'None of the above'], a: 2, why: 'بس المفتوح.', src: 'Homework 1' },
    { q: 'What happens to energy and material transferred out of a system?', c: ['They disappear', 'They enter the surroundings', 'They remain within the system boundary', 'They create a new system'], a: 1, why: '"transferred out of the system enter the surroundings, and vice versa".', src: 'Homework 1' },
    { q: 'How does an open system differ from a closed system?', c: ['An open system exchanges less energy', 'An open system has a fixed boundary', 'An open system allows material exchange', 'An open system is always in equilibrium'], a: 2, why: 'الفرق الوحيد: المادة.', src: 'Homework 1' },
    { q: 'Which statement about system boundaries is correct?', c: ['They are always physical barriers', 'They are determined by the laws of thermodynamics', 'They can be conceptual or physical', 'They must allow heat transfer'], a: 2, why: 'الحدود ممكن حقيقية أو تخيلية.', src: 'Homework 1' },
    { q: 'A system with no significant heat exchange with the surroundings (Q = 0) is said to be:', c: ['isothermal', 'adiabatic', 'isolated', 'steady'], a: 1, why: 'جملة الكتاب: "Such a system is said to be adiabatic".', src: 'جمل الكتاب' },
    { q: 'An isothermal system is one where:', c: ['no heat crosses the boundary', 'the temperature does not change with time and in space', 'W = 0', 'the pressure is constant'], a: 1, why: 'والكتاب يكول: "This does not mean that no heat crosses the boundaries".', src: 'جمل الكتاب' },
    { q: 'By convention, work is positive if:', c: ['it is done on the system', 'it flows from the system (done by the system)', 'heat is added', 'the system accelerates'], a: 1, why: 'W موجب = by the system.', src: 'جمل الكتاب' },
    { q: 'The exit pressure of a turbine is ____ the inlet pressure.', c: ['higher than', 'equal to', 'lower than', 'unrelated to'], a: 2, why: 'التوربين يخفض الضغط ويطلع شغل؛ الكمبريسر العكس.', src: 'جمل الكتاب' },
    { q: 'Which of the following is NOT an assumption of the mechanical energy balance?', c: ['Steady state', 'Single inlet and single outlet', 'Incompressible fluid', 'Adiabatic operation'], a: 3, why: 'الثلاث: steady، مدخل/مخرج واحد، ما ينضغط. Q مدموجة بـ F.', src: 'جمل الكتاب' },
    { q: 'Bernoulli’s equation is obtained from the mechanical energy balance when:', c: ['ΔP = 0 and Δz = 0', 'Ws = 0 and F = 0', 'Q = 0 and Ws = 0', 'Δυ = 0'], a: 1, why: 'frictionless flow with no shaft work.', src: 'جمل الكتاب' },
    { q: 'In the MEB, the term (Δu − Q/ṁ) represents:', c: ['shaft work', 'flow work', 'friction loss F', 'kinetic energy'], a: 2, why: 'الحرارة المتولدة من الاحتكاك اللزج.', src: 'جمل الكتاب' },
    { q: 'Shaft work is the rate of work done by the fluid on:', c: ['the surroundings at the outlet', 'a moving part within the system (piston, turbine, rotor)', 'the system boundary only', 'the inlet stream'], a: 1, why: 'Shaft = عمود/جزء متحرك.', src: 'جمل الكتاب' },
    { q: 'Steam at 10 bar and 400°C is:', c: ['compressed liquid', 'wet steam', 'saturated vapor', 'superheated steam'], a: 3, why: 'T<sub>sat</sub>(10 bar) = 179.9°C < 400°C.', src: 'مثال 1.6' },
    { q: 'At a given pressure, if h > h_g the steam is:', c: ['compressed liquid', 'wet', 'saturated', 'superheated'], a: 3, why: 'فوق g = محمص.', src: 'جداول البخار' },
    { q: 'Steam of "90% quality" has x equal to:', c: ['0.1', '0.9', '90', '0.09'], a: 1, why: 'x = كسر البخار = 0.9.', src: 'مثال 1.8' },
    { q: 'Steam turbines cannot tolerate:', c: ['high pressure', 'small amounts of liquid water', 'superheated steam', 'adiabatic operation'], a: 1, why: 'قطرات الماي تخرب الريش.', src: 'جمل الكتاب' },
    { q: 'For an ideal gas compressed reversibly and isothermally in a closed system:', c: ['Q = 0', 'ΔU = 0 so Q = W', 'W = 0', 'ΔH = Q'], a: 1, why: 'الطاقة الداخلية للغاز المثالي تعتمد على T بس.', src: 'كوز الأوكسجين' },
    { q: 'Heat capacity at constant pressure for ideal gases is related to Cv by:', c: ['Cp = Cv', 'Cp = Cv − R', 'Cp = Cv + R', 'Cp = R/Cv'], a: 2, why: 'ولسوائل وصلبة Cp ≈ Cv.', src: 'الكتاب 1.5', scope: 'mid' },
    { q: 'Heat transferred causing a change of phase at constant T and P is called:', c: ['sensible heat', 'latent heat', 'shaft work', 'heat of reaction'], a: 1, why: 'Latent = كامنة؛ Sensible = تغير الحرارة بدون تغير طور.', src: 'الكتاب 1.5', scope: 'mid' },
    { q: 'Sensible heat is the heat transferred to:', c: ['change the phase', 'raise or lower the temperature without phase change', 'do shaft work', 'mix solutions'], a: 1, why: 'تعريف الكتاب 1.4.1.', src: 'الكتاب 1.4', scope: 'mid' },
    { q: 'In a Cp polynomial from Appendix A.2 whose "Form" column says °C, you must substitute T in:', c: ['K always', '°C', '°F', 'any unit'], a: 1, why: 'استخدم نفس الوحدة المكتوبة بالجدول — التعويض بالكلفن بمعادلة °C يعطي غلط كبير.', src: 'Final 2025', scope: 'mid' },
    { q: 'When integrating Cp = a + bT + cT² + dT³ from T1 to T2, the c-term becomes:', c: ['c(T2 − T1)', 'c/2 (T2² − T1²)', 'c/3 (T2³ − T1³)', '3c (T2² − T1²)'], a: 2, why: 'الأس يزيد واحد ونقسم عليه.', src: 'الكتاب 1.4', scope: 'mid' },
    { q: 'Steam that condenses at constant pressure from quality x to saturated liquid has Δh equal to:', c: ['+x·hfg', '−x·hfg', '−hg', 'hf − hg'], a: 1, why: 'h = hf + x·hfg → hf، فالفرق −x·hfg (مثال 1.18 و 1.19).', src: 'مثال 1.18', scope: 'mid' },
    { q: 'Properties whose change depends only on the initial and final states are called:', c: ['path functions', 'state properties', 'extensive properties', 'latent properties'], a: 1, why: 'h و u state properties — ما تعتمد على المسار، لهذا نكدر نسوي مسار افتراضي.', src: 'الكتاب 1.5', scope: 'mid' }
  ];

  E.blanks = [
    { q: 'The energy balance equation for a closed system includes heat, work, ___ energy, kinetic energy, and potential energy.', a: [['internal']], src: 'Homework 1' },
    { q: 'Heat always flows from regions of ___ temperature to regions of ___ temperature.', a: [['high', 'higher'], ['low', 'lower']], src: 'Homework 1 / Final 2025' },
    { q: 'The system is termed ___ if both the surroundings and the system are at the same temperature.', a: [['adiabatic']], src: 'Midterm 2023' },
    { q: 'If the system is not accelerating then ___ equal zero.', a: [['δke', 'ke', 'deltake', 'kinetic energy', 'change in kinetic energy', 'Δke']], src: 'Midterm 2023' },
    { q: 'If energy is not transmitted across the system boundary by a moving part such as a piston, an impeller, or a rotor then ___ equal zero.', a: [['w', 'work', 'ws', 'shaft work']], src: 'Midterm 2023' },
    { q: 'In an open system, work must be done to ___ into the system.', a: [['push input fluid streams', 'push the input fluid streams', 'push input fluid', 'push the fluid', 'push fluid', 'push input streams', 'push']], src: 'Midterm 2023' },
    { q: 'If the system is not rising or falling then ___ equal zero.', a: [['δpe', 'pe', 'deltape', 'potential energy', 'Δpe', 'change in potential energy']], src: 'Midterm 2023' },
    { q: 'Work is the energy that flows in response to a ___ force other than temperature and is defined as positive if it flows ___ the system.', a: [['driving'], ['from', 'out of']], src: 'Final 2024 / 2025' },
    { q: 'By convention, heat is positive if it ___ the system, meaning it is ___ by the system.', a: [['flows to', 'flows into', 'enters', 'to'], ['gained', 'absorbed']], src: 'Final 2024' },
    { q: 'Heat is the energy that flows due to a ___ difference between the system and its surroundings.', a: [['temperature']], src: 'Final 2025' },
    { q: 'An ___ system does not exchange heat, work, or material with the surroundings.', a: [['isolated']], src: 'جمل الكتاب' },
    { q: 'If there is no motion along the system boundary, then ___ = 0.', a: [['w', 'work']], src: 'جمل الكتاب' },
    { q: 'Turbines produce work; by contrast, work should be provided to a ___ or a ___.', a: [['compressor', 'pump'], ['pump', 'compressor']], src: 'جمل الكتاب' },
    { q: 'The exit pressure of a compressor is ___ than the inlet pressure.', a: [['higher', 'greater']], src: 'جمل الكتاب' },
    { q: 'In most cases, the steam turbine operates ___.', a: [['adiabatically', 'adiabatic']], src: 'جمل الكتاب' },
    { q: 'For frictionless flows with no ___ work, the mechanical energy balance simplifies to Bernoulli’s equation.', a: [['shaft']], src: 'جمل الكتاب' },
    { q: 'Enthalpy is the sum of the ___ energy plus the flow work ___.', a: [['internal'], ['pv', 'p v', 'pressure volume', 'pressure times volume']], src: 'جمل الكتاب' },
    { q: 'Heat transferred to change the phase at constant temperature and pressure is known as ___ heat.', a: [['latent']], src: 'الكتاب 1.5', scope: 'mid' },
    { q: 'For most incompressible liquids and solids Cp ≈ ___, and for ideal gases Cp = Cv + ___.', a: [['cv'], ['r']], src: 'الكتاب 1.5', scope: 'mid' },
    { q: 'Sensible heat is the heat transferred to raise or lower the temperature of a material in the absence of ___ change.', a: [['phase']], src: 'الكتاب 1.4', scope: 'mid' },
    { q: 'h and u are ___ properties; their values depend only on the state of the species and not on the ___ taken.', a: [['state'], ['path']], src: 'الكتاب 1.4', scope: 'mid' },
    { q: 'Heat is ___ during condensation, and heat is required to vaporize a liquid or melt a solid.', a: [['released']], src: 'الكتاب 1.5', scope: 'mid' },
    { q: 'The thermodynamic property of an ideal mixture is the ___ of the contributions from the individual compounds.', a: [['sum']], src: 'الكتاب 1.5.2', scope: 'mid' }
  ];

  E.page({
    id: 'quizbank', group: 'المراجعة', title: 'بنك الأسئلة + بطاقات', scope: 'quiz', prio: 'hot',
    render: () => R`
<h1>بنك الأسئلة (MCQ + فراغات)</h1>
<p>الأسئلة عشوائية ومتفلترة حسب الوضع. التصحيح فوري، وأعلى نتيجة تنحفظ.</p>
<div data-model="quizbank"></div>
<h2>بطاقات الحفظ (اضغط على البطاقة)</h2>
<p>جمل الفراغات من أسئلة السنين — اقرا الجملة، تذكر الكلمة، بعدين اقلب.</p>
<div data-model="flash"></div>
`
  });
})();
