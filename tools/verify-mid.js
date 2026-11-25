// Practice problems for the midterm page (Bernoulli, Cp, mixing). Run: node tools/verify-mid.js
const S = require('../js/steam.js');
const K = t => t + 273.15, A = d => Math.PI * d * d / 4, g = 9.81;
const p = (n, v, u) => console.log(n.padEnd(28), (+v.toPrecision(6)).toString().padStart(14), u || '');
const integ = (k, a, b) => k.reduce((s, c, i) => s + c / (i + 1) * (b ** (i + 1) - a ** (i + 1)), 0);
// B1 Torricelli
{ const u = Math.sqrt(2 * g * 4), Q = u * A(0.02); p('B1 v', u, 'm/s'); p('B1 Q', Q, 'm3/s'); p('B1 Q m3/h', Q * 3600); }
// B2 horizontal contraction
{ const Q = 0.02, u1 = Q / A(0.10), u2 = Q / A(0.05); p('B2 u1', u1); p('B2 u2', u2); p('B2 P2 kPa', (200000 - 1000 * (u2 ** 2 - u1 ** 2) / 2) / 1000); }
// B3 contraction + elevation
{ const Q = 0.05, u1 = Q / A(0.15), u2 = Q / A(0.10); p('B3 u1', u1); p('B3 u2', u2); p('B3 KE term', (u2 ** 2 - u1 ** 2) / 2); p('B3 P2 kPa', (300000 - 1000 * ((u2 ** 2 - u1 ** 2) / 2 + g * 8)) / 1000); }
// B4 venturi
{ const r = (0.08 / 0.04) ** 2, u1 = Math.sqrt(2 * 30000 / 1000 / (r * r - 1)); p('B4 u1', u1); p('B4 u2', u1 * r); p('B4 Q L/s', u1 * A(0.08) * 1000); }
// B5 wing
{ const dP = 0.05 * 101325, u = Math.sqrt(250 ** 2 + 2 * dP / 0.41); p('B5 dP', dP); p('B5 u_top', u); }
// B6 nozzle
{ const r = (0.05 / 0.02) ** 2, u2 = Math.sqrt(2 * 400000 / 1000 / (1 - 1 / r ** 2)); p('B6 u2', u2); p('B6 u1', u2 / r); p('B6 Q', u2 * A(0.02), 'm3/s'); }
// B7 tank exit with pressure on top: closed tank P = 150 kPa gauge, h = 3 m
{ const u = Math.sqrt(2 * (150000 / 1000 + g * 3)); p('B7 u', u); }
// C1
p('C1 Q kJ/h', 500 * 2.1 * 100); p('C1 kW', 500 * 2.1 * 100 / 3600);
// C2 CO2 25->500 C, 100 mol/s
{ const k = [36.11, 4.233e-2, -2.887e-5, 7.464e-9]; const t = k.map((c, i) => c / (i + 1) * (500 ** (i + 1) - 25 ** (i + 1)));
  t.forEach((x, i) => p('C2 term ' + i, x)); const dh = integ(k, 25, 500); p('C2 dh J/mol', dh); p('C2 Q kW', 100 * dh / 1000); }
// C3 air K-form 300->600 K
{ const k = [28.09, 0.1965e-2, 0.4799e-5, -1.965e-9]; const t = k.map((c, i) => c / (i + 1) * (600 ** (i + 1) - 300 ** (i + 1))); t.forEach((x, i) => p('C3 term ' + i, x)); p('C3 dh J/mol', integ(k, 300, 600));
  const kc = [28.94, 0.4147e-2, 0.3191e-5, -1.965e-9]; p('C3 check C-form 26.85->326.85', integ(kc, 26.85, 326.85)); }
// C4 Cv closed
p('C4 Q kJ', 50 * (0.75 * 75 + 1.2e-3 / 2 * (100 ** 2 - 25 ** 2)));
// C5 mixture 60% CO2 40% CO 200 mol/min 100->400C
{ const co2 = [36.11, 4.233e-2, -2.887e-5, 7.464e-9], co = [28.95, 0.4110e-2, 0.3548e-5, -2.220e-9];
  const mix = co2.map((c, i) => 0.6 * c + 0.4 * co[i]); mix.forEach((c, i) => p('C5 mix coef ' + i, c));
  const dh = integ(mix, 100, 400); p('C5 dh J/mol', dh); p('C5 Q kJ/min', 200 * dh / 1000); p('C5 Q kW', 200 * dh / 1000 / 60);
  p('C5 check separate', 0.6 * integ(co2, 100, 400) + 0.4 * integ(co, 100, 400)); }
// C6 benzene heated by steam 5 bar
{ const dh = 126.5 * 40 + 0.234 / 2 * (60 ** 2 - 20 ** 2); p('C6 dh J/mol', dh); const Q = 2000 * dh / 1000; p('C6 Q kJ/h', Q); p('C6 ms kg/h', Q / 2107.4); }
// M1 mixing water streams
{ const T = (100 * 20 + 50 * 80) / 150; p('M1 T (Cp const)', T); const hA = S.satByT(K(20)).f.h, hB = S.satByT(K(80)).f.h; const h3 = (100 * hA + 50 * hB) / 150;
  p('M1 hA', hA); p('M1 hB', hB); p('M1 h3', h3); let lo = 0, hi = 100; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (S.satByT(K(m)).f.h < h3) lo = m; else hi = m; } p('M1 T from tables', lo); }
// M2 mixing air streams constant Cp
{ p('M2 T', (10 * 300 + 5 * 50) / 15); }
// M3 steam mixing: 200 kg/h sat steam 10 bar + water 25C liquid at 10 bar -> sat steam? -> desuperheater: 1000 kg/h superheated 10 bar 300C mixed with water 10 bar 25C to give sat vapor 10 bar
{ const h1 = 3052, hw = 105.7, h3 = 2776.2, m1 = 1000; const mw = m1 * (h1 - h3) / (h3 - hw); p('M3 mw kg/h', mw); p('M3 m3', m1 + mw); }
