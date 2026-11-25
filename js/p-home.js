(function () {
  const R = String.raw, E = window.EB;
  E.page({
    id: 'home', group: 'البداية', title: 'الرئيسية', scope: 'quiz',
    render: () => R`
<h1>موازنة الطاقة — الفصل الأول</h1>
<p>دليل دراسة كامل من كتاب د. شيماء البزاز + دفتر الملخص + أسئلة السنين. <b>الشرح عربي</b>، و<b>نص الأسئلة والمعادلات إنكليزي</b> مثل الامتحان بالضبط.</p>

<div class="card">
  <div class="row" style="align-items:flex-start">
    <div>
      <b>اختار امتحانك:</b>
      <p style="margin:4px 0">بـ <b>وضع الكوز</b> تشوف بس المادة لحد مثال 1.13. بـ <b>وضع الميد</b> تنضاف 1.4 و 1.5 (لحد مثال 1.21) معلّمة <span class="tag new">جديد للميد</span>.</p>
      <div class="row" style="gap:8px">
        <button class="btn" data-setmode="quiz">وضع الكوز</button>
        <button class="btn mid" data-setmode="mid">وضع الميد</button>
      </div>
    </div>
  </div>
  <div id="homeProgress" style="margin-top:12px"></div>
</div>

<h2>خريطة الامتحان (حسب الأولوية)</h2>
<p><span class="tag hot">أكيد يجي</span> <span class="tag med">احتمال كبير</span> <span class="tag low">مهم للفهم</span></p>
<div class="map">
  <a href="#/s11"><b>1.1 الأنظمة + القانون الأول + KE/PE</b><small>الإشارات، متى الحد = صفر، أمثلة 1.1–1.4</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('quiz')}</a>
  <a href="#/s11open"><b>النظام المفتوح + جدول الأجهزة</b><small>Q − Ws = ΔH + ΔKE + ΔPE، مثال 1.5</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('quiz')}</a>
  <a href="#/s11steam"><b>جداول البخار + الجودة + الاستيفاء</b><small>حالة البخار، x، مثال 1.6 + أداة الجداول</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('quiz')}</a>
  <a href="#/tables"><b>شلون أستعمل جداول البخار</b><small>Table 8 و 9 تفاعلية + استيفاء + تمارين</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('quiz')}</a>
  <a href="#/s11dev"><b>توربين، مبادل، كمبريسر</b><small>أمثلة 1.7–1.10 (انعادت بالامتحانات)</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('quiz')}</a>
  <a href="#/s12"><b>1.2 موازنة الطاقة الميكانيكية</b><small>المضخة، الكفاءة، hp — أمثلة 1.11، 1.12</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('quiz')}</a>
  <a href="#/s13"><b>1.3 برنولي</b><small>مثال 1.13 (الجناح)</small><br><span class="tag med">احتمال كبير</span> ${E.tag('quiz')}</a>
  <a href="#/siso"><b>إضافي: الشغل الأيزوثيرمي</b><small>سؤال الأوكسجين من الكوزات</small><br><span class="tag med">احتمال كبير</span> ${E.tag('quiz')}</a>
  <a href="#/s14" data-scope="mid"><b>1.4 الإنثالبي بالـ Cp</b><small>Cp ثابت، متعددة حدود، تحويل وحدات Cp — أمثلة 1.14–1.17</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('mid')}</a>
  <a href="#/s15" data-scope="mid"><b>1.5 تغير الطور والخلط</b><small>المسار الافتراضي، الخلائط، خلط البخار — أمثلة 1.18–1.21</small><br><span class="tag hot">أكيد يجي</span> ${E.tag('mid')}</a>
  <a href="#/exams"><b>أسئلة السنين محلولة</b><small>مرتبة حسب النوع</small><br><span class="tag hot">ذهب!</span></a>
  <a href="#/quizbank"><b>بنك الأسئلة (MCQ + فراغات)</b><small>عشوائي مع تصحيح فوري</small><br><span class="tag hot">أكيد يجي</span></a>
  <a href="#/review"><b>المراجعة النهائية</b><small>ورقة القوانين، الوحدات، الفخاخ</small><br><span class="tag low">ليلة الامتحان</span></a>
</div>

<h2>أي معادلة؟ وأي فرضيات؟ (مخطط القرار)</h2>
<div class="flow">
  <div class="q">س1: المادة تعبر حدود النظام؟</div>
  <div class="opts">
    <div class="opt"><b>لا → نظام مغلق</b> (سلندر، وعاء مسدود، طيارة)
      <div class="math">\[Q - W = \Delta U + \Delta KE + \Delta PE\]</div>
      غاز مثالي + isothermal؟ → \(W = nRT\ln\frac{P_1}{P_2}\) و ΔU = 0</div>
    <div class="opt"><b>نعم → نظام مفتوح</b>
      <div class="math">\[Q - W_s = \Delta\dot H + \Delta KE + \Delta PE\]</div></div>
  </div>
  <div class="q">س2 (للمفتوح): المائع سائل والسؤال عن مضخة/أنابيب وما بيه حرارة؟</div>
  <div class="opts">
    <div class="opt"><b>نعم → MEB</b><div class="math">\[-\frac{W_s}{\dot m} = \frac{\Delta P}{\rho}+\frac{\Delta\upsilon^2}{2}+g\Delta z+F\]</div>ماكو مضخة وماكو احتكاك؟ → <b>برنولي</b> (Ws = F = 0)</div>
    <div class="opt"><b>لا → المعادلة العامة</b> وطلع h من:
      <ul><li>جداول البخار (ماي/بخار)</li><li data-scope="mid">\(\Delta h=\int C_p\,dT\) (مواد ثانية) <span class="tag new">ميد</span></li><li data-scope="mid">تغير طور → مسار افتراضي <span class="tag new">ميد</span></li></ul></div>
  </div>
  <div class="q">س3: شنو يصير صفر؟</div>
  <div class="opts">
    <div class="opt"><b>Q = 0</b>: adiabatic / insulated / توربين عادةً</div>
    <div class="opt"><b>Ws = 0</b>: ماكو أجزاء متحركة (مبادل، بويلر، خلاط، صمام)</div>
    <div class="opt"><b>ΔKE = 0</b>: نفس القطر / ما معطي سرعات</div>
    <div class="opt"><b>ΔPE = 0</b>: نفس المستوى / ما معطي ارتفاعات</div>
  </div>
</div>

<div class="box tip"><strong>طريقة الدراسة المقترحة</strong>
<ol>
<li>اقرا الشرح العربي لكل قسم، وافهم "متى أستخدمه؟" تحت كل معادلة.</li>
<li>بكل مثال: غطي الحل وجرب بنفسك، بعدين اكشف الحل وقارن.</li>
<li>علّم ✓ "فهمته" — شريط التقدم فوق يتحدث.</li>
<li>حل أسئلة السنين، بعدين بنك الأسئلة لحد ما توصل 90%+.</li>
<li>ليلة الامتحان: ورقة القوانين + الفخاخ الشائعة.</li>
</ol></div>
`
  });
})();
