(function () {
  const EB = window.EB = { pages: [], examples: {}, models: {} };

  EB.store = {
    get(k, d) { try { const v = localStorage.getItem('eb_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('eb_' + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };

  EB.page = p => { EB.pages.push(p); };
  EB.model = (id, fn) => { EB.models[id] = fn; };

  const tagHTML = s => s === 'mid' ? '<span class="tag new">جديد للميد</span>' : '<span class="tag quiz">كوز + ميد</span>';
  EB.tag = tagHTML;

  // Equation card with the Arabic explanation box
  EB.eq = function (tex, o) {
    o = o || {};
    const sym = (o.sym || []).map(r => `<tr><td>\\(${r[0]}\\)</td><td>${r[1]}</td><td class="ltr">${r[2] || '—'}</td></tr>`).join('');
    return `<div class="eq"${o.scope ? ` data-scope="${o.scope}"` : ''}>
      ${o.name ? `<div class="eqname">${o.name}</div>` : ''}
      <div class="math">\\[${tex}\\]</div>
      <div class="arbox">
        ${o.mean ? `<div><span class="lbl">المعنى: </span>${o.mean}</div>` : ''}
        ${sym ? `<div class="tblwrap"><table class="symtbl"><tr><th>الرمز</th><th>بالعربي</th><th>الوحدة</th></tr>${sym}</table></div>` : ''}
        ${o.when ? `<div><span class="lbl">متى أستخدمه؟ </span>${o.when}</div>` : ''}
        ${o.trick ? `<div class="trick">🧠 <b>حيلة الحفظ:</b> ${o.trick}</div>` : ''}
      </div></div>`;
  };

  EB.m = tex => `<div class="math">\\[${tex}\\]</div>`;

  // Worked example / exam question template
  EB.ex = function (o) {
    const scope = o.scope || 'quiz';
    EB.examples[o.id] = { id: o.id, scope, title: o.title };
    const given = (o.given || []).map(g => `<tr><td class="ltr">${g[0]}</td><td class="ltr">${g[1]}</td><td class="ltr">${g[2] || g[1]}</td></tr>`).join('');
    const assume = (o.assume || []).map(a => `<li><span class="num">\\(${a[0]}\\)</span> — ${a[1]}</li>`).join('');
    const steps = (o.steps || []).map(s => `<div class="step"><div class="math">\\[${s[0]}\\]</div>${s[1] ? `<div class="why">❓ <b>ليش سوينا هيج؟</b> ${s[1]}</div>` : ''}</div>`).join('');
    const done = (EB.store.get('done', {}))[o.id];
    return `<article class="ex" id="ex-${o.id}" data-scope="${scope}">
      <div class="ex-head">
        <span class="ex-title">${o.title}</span>
        ${tagHTML(scope)}
        ${o.tags ? o.tags : ''}
        ${o.src ? `<span class="ex-src">${o.src}</span>` : ''}
      </div>
      <div class="ex-body">
        ${o.intro ? `<p>${o.intro}</p>` : ''}
        <div class="statement">${o.statement}</div>
        ${o.diagram ? `<h4>1) رسم العملية وحدود النظام</h4><div class="diagram">${o.diagram}</div>` : ''}
        ${given ? `<h4>2) المعطيات (Given) — حوّلها للـ SI</h4><div class="tblwrap"><table class="given"><tr><th>Quantity</th><th>As given</th><th>SI</th></tr>${given}</table></div>` : ''}
        ${o.find ? `<h4>3) المطلوب (Find)</h4><p class="ltr">${o.find}</p>` : ''}
        <details class="sol">
          <summary><span class="closed-t">جرّب تحلها بنفسك أول… بعدين اكشف الحل</span><span class="open-t">اخفِ الحل</span></summary>
          ${assume ? `<h4>4) الفرضيات (Assumptions) — شنو يصير صفر وليش</h4><ul>${assume}</ul>` : ''}
          <h4>5) خطوات الحل</h4>
          ${steps}
          <h4>6) الجواب النهائي</h4>
          <div class="answer"><div class="math">${o.answer}</div></div>
          ${o.check ? `<h4>7) تأكد من المنطق (Sanity check)</h4><p>${o.check}</p>` : ''}
          ${o.trap ? `<div class="box warn"><strong>⚠️ الفخ الشائع</strong>${o.trap}</div>` : ''}
          ${o.note ? `<div class="box info"><strong>ملاحظة تصحيح</strong>${o.note}</div>` : ''}
        </details>
        <label class="donebox"><input type="checkbox" data-done="${o.id}" ${done ? 'checked' : ''}> فهمته وحليته ✓</label>
      </div></article>`;
  };

  EB.table = function (head, rows, cls) {
    return `<div class="tblwrap"><table class="${cls || ''}"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
  };

  // ---------- Process diagrams (inline SVG)
  let uid = 0;
  const lines = (arr, x, y, anchor, cls) => {
    arr = [].concat(arr || []);
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls || 'lb'}">${arr.map((t, i) => `<tspan x="${x}" dy="${i ? 14 : 0}">${t}</tspan>`).join('')}</text>`;
  };
  const style = id => `<defs>
      <marker id="ah${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
    </defs>
    <style>
      .lb{font:12px Cairo,Arial,sans-serif;fill:var(--fg)}
      .lbs{font:11px Cairo,Arial,sans-serif;fill:var(--muted)}
      .nm{font:bold 14px Cairo,Arial,sans-serif;fill:var(--fg)}
      .dev{fill:var(--accent-soft);stroke:var(--fg);stroke-width:1.6}
      .bd{fill:none;stroke:var(--mid);stroke-width:1.5;stroke-dasharray:6 5}
      .st{stroke:var(--fg);stroke-width:2;fill:none}
      .qa{stroke:var(--q);stroke-width:2.2;fill:none;color:var(--q)}
      .wa{stroke:var(--w);stroke-width:2.2;fill:none;color:var(--w)}
      .ql{font:bold 13px Cairo,Arial,sans-serif;fill:var(--q)}
      .wl{font:bold 13px Cairo,Arial,sans-serif;fill:var(--w)}
      .water{fill:var(--w);opacity:.25}
    </style>`;

  EB.dev = function (o) {
    const id = ++uid, W = 560, H = 240;
    const x0 = 200, x1 = 360, y0 = 75, y1 = 165, cy = 120;
    let shape = '';
    switch (o.kind) {
      case 'turbine': shape = `<path class="dev" d="M${x0} ${cy - 25} L${x1} ${y0 - 5} L${x1} ${y1 + 5} L${x0} ${cy + 25} Z"/>`; break;
      case 'compressor': shape = `<path class="dev" d="M${x0} ${y0 - 5} L${x1} ${cy - 25} L${x1} ${cy + 25} L${x0} ${y1 + 5} Z"/>`; break;
      case 'pump': shape = `<circle class="dev" cx="280" cy="${cy}" r="42"/><path class="st" d="M280 ${cy - 42} L322 ${cy - 42}"/>`; break;
      case 'mixer': shape = `<circle class="dev" cx="280" cy="${cy}" r="40"/>`; break;
      case 'valve': shape = `<path class="dev" d="M230 95 L330 145 L330 95 L230 145 Z"/>`; break;
      case 'nozzle': shape = `<path class="dev" d="M${x0} ${y0} L${x1} ${cy - 14} L${x1} ${cy + 14} L${x0} ${y1} Z"/>`; break;
      case 'hx': shape = `<rect class="dev" x="${x0}" y="${y0}" width="160" height="90" rx="14"/><path class="st" d="M${x0} ${cy} L${x1} ${cy}" stroke-dasharray="3 3"/>`; break;
      case 'piston': shape = `<path class="st" d="M220 70 L220 175 L340 175 L340 70"/><rect x="221" y="98" width="118" height="14" fill="var(--muted)"/><path class="st" d="M280 98 L280 55"/><rect x="221" y="112" width="118" height="62" fill="var(--accent-soft)"/><text x="280" y="150" text-anchor="middle" class="nm">${o.name || 'Gas'}</text>`; break;
      default: shape = `<rect class="dev" x="${x0}" y="${y0}" width="160" height="90" rx="10"/>`;
    }
    const nameTxt = o.kind === 'piston' ? '' : `<text x="280" y="${cy + 5}" text-anchor="middle" class="nm">${o.name || ''}</text>`;
    let flows = '';
    const ins = o.ins || [], outs = o.outs || [];
    const ys = n => n === 1 ? [cy] : n === 2 ? [95, 145] : [85, 120, 155];
    ys(ins.length).forEach((y, i) => {
      const xe = o.kind === 'pump' || o.kind === 'mixer' ? 280 - Math.sqrt(Math.max(0, 1600 - (y - cy) ** 2)) - 2 : x0;
      flows += `<path class="st" d="M20 ${y} L${xe} ${y}" marker-end="url(#ah${id})" color="var(--fg)"/>` + lines(ins[i], 22, y - 8 - 14 * ([].concat(ins[i]).length - 1), 'start');
    });
    ys(outs.length).forEach((y, i) => {
      const xs = o.kind === 'pump' || o.kind === 'mixer' ? 280 + Math.sqrt(Math.max(0, 1600 - (y - cy) ** 2)) + 2 : x1;
      flows += `<path class="st" d="M${xs} ${y} L540 ${y}" marker-end="url(#ah${id})" color="var(--fg)"/>` + lines(outs[i], 538, y - 8 - 14 * ([].concat(outs[i]).length - 1), 'end');
    });
    if (o.cold) {
      flows += `<path class="st" d="M300 5 L300 ${y0}" marker-end="url(#ah${id})" color="var(--fg)" stroke-dasharray="5 3"/>` + lines(o.cold.in, 306, 18, 'start', 'lbs');
      flows += `<path class="st" d="M260 ${y1} L260 235" marker-end="url(#ah${id})" color="var(--fg)" stroke-dasharray="5 3"/>` + lines(o.cold.out, 254, 205, 'end', 'lbs');
    }
    let qw = '';
    if (o.Q) {
      const into = o.Qdir !== 'out';
      qw += `<path class="qa" d="${into ? 'M330 232 L330 ' + (y1 + 18) : 'M330 ' + (y1 + 18) + ' L330 232'}" marker-end="url(#ah${id})"/><text x="338" y="222" class="ql">${o.Q}</text>`;
    }
    if (o.W) {
      const out = o.Wdir !== 'in';
      qw += `<path class="wa" d="${out ? 'M230 ' + (y0 - 18) + ' L230 8' : 'M230 8 L230 ' + (y0 - 18)}" marker-end="url(#ah${id})"/><text x="222" y="22" text-anchor="end" class="wl">${o.W}</text>`;
    }
    const bd = `<rect class="bd" x="${x0 - 16}" y="${y0 - 16}" width="192" height="122" rx="12"/><text x="${x1 + 14}" y="${y0 - 21}" text-anchor="end" class="lbs">system boundary</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.name || ''}">${style(id)}${bd}${shape}${nameTxt}${flows}${qw}</svg>`;
  };

  EB.svgStyle = style;
  EB.uid = () => ++uid;

  // Inline-math helper for numbers inside Arabic prose
  EB.n = t => `<span class="num">\\(${t}\\)</span>`;
})();
