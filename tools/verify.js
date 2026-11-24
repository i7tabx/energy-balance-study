// Recomputes every numerical answer shown on the site. Run: node tools/verify.js
const S = require('../js/steam.js');
const K = t => t + 273.15;
const HP = 0.7457; // kW per hp
const out = [];
const r = (name, val, unit, ref) => out.push([name, +val.toPrecision(6), unit, ref === undefined ? '' : ref]);

// Ex 1.1
{ const V = 2 / 3600, A = Math.PI * 0.02 ** 2 / 4, v = V / A, m = 1000 * V;
  r('1.1 A', A, 'm2'); r('1.1 v2', v, 'm/s'); r('1.1 m', m, 'kg/s'); r('1.1 dKE', 0.5 * m * v * v, 'W', 0.87); }
// Ex 1.2
r('1.2 dPE', 10 * 9.81 * 300 / 1000, 'kW', 29.43);
// Ex 1.3
{ const Q = 2 * 4184; r('1.3 Q', Q, 'J'); r('1.3 dU', (Q - 68) / 1000, 'kJ', 8.30); }
// Ex 1.4
{ const Pv = 101.325 * 25 / 1000; const h = 3.80 + Pv; r('1.4 Pv', Pv, 'kJ/mol'); r('1.4 h', h, 'kJ/mol', 6.33);
  r('1.4 H', 250e3 * h / 3600, 'kW (kJ/s)', 440); r('1.4 H kJ/h', 250e3 * h, 'kJ/h'); }
// Ex 1.5
{ const m = 10 / 3600, dKE = 0.5 * m * (300 ** 2 - 50 ** 2) / 1000, dPE = m * 9.81 * (-5) / 1000;
  r('1.5 dKE', dKE, 'kW'); r('1.5 dPE', dPE, 'kW'); r('1.5 dH', -10 - 70 - dKE - dPE, 'kW', -80.12); }
// Ex 1.7
{ const hout = 3216 - 1000e3 / 1500; r('1.7 hout', hout, 'kJ/kg', 2549.3); r('1.7 x', (hout - 604.7) / (2737.6 - 604.7), '-', 0.912); }
// Ex 1.8
{ const hout = 419.1 + 0.9 * (2676.0 - 419.1); r('1.8 hout', hout, 'kJ/kg', 2450.3); r('1.8 m', 1.5e6 / (3697 - hout), 'kg/s', 1200); }
// Ex 1.9
{ const Q = 60 * (417.5 - 2875); r('1.9 Q', Q, 'kJ/h', -147450); r('1.9 Q kW', Q / 3600, 'kW'); }
// Ex 1.10
{ const A = Math.PI * 0.1 ** 2 / 4, m = 20 * A / 0.125, dH = m * (3046 - 3025), dKE = 0.5 * m * (170 ** 2 - 20 ** 2) / 1000, Ws = -5 - dH - dKE;
  r('1.10 A', A, 'm2'); r('1.10 m', m, 'kg/s', 1.25); r('1.10 dH', dH, 'kW', 26.25); r('1.10 dKE', dKE, 'kW', 18); r('1.10 Ws', Ws, 'kW', -49.25); r('1.10 hp', -Ws / HP, 'hp', 66); }
// Ex 1.11
{ const A = Math.PI * 0.15 ** 2 / 4, v2 = 0.3 / A, m = 300, dz = 852 - 700, F = 0.01 * 8000;
  const e = v2 ** 2 / 2 + 9.81 * dz + F; r('1.11 v2', v2, 'm/s', 17); r('1.11 KE term', v2 ** 2 / 2, 'J/kg'); r('1.11 PE term', 9.81 * dz, 'J/kg'); r('1.11 -Ws/m', e, 'J/kg');
  r('1.11 -Ws', m * e / 1000, 'kW', 514.686); r('1.11 hp', m * e / 1000 / HP, 'hp', 690); }
// Ex 1.12
{ const m = 1890 / 60, dP = 15e5, w = dP / 1000; const Ws = m * w / 1000; r('1.12 m', m, 'kg/s', 31.5); r('1.12 -Ws ideal', Ws, 'kW', 47.25);
  r('1.12 ideal hp', Ws / HP, 'hp'); r('1.12 actual', Ws / 0.7, 'kW'); r('1.12 actual hp', Ws / 0.7 / HP, 'hp', 89.5); }
// Ex 1.13
{ const dP = 0.08 * 101325, v1 = Math.sqrt(275 ** 2 + 2 * dP / 0.45); r('1.13 dP', dP, 'Pa'); r('1.13 v_top', v1, 'm/s', 334); }

// ---------- past exams (quiz scope)
{ const v = 0.001 / (Math.PI * 0.03 ** 2 / 4); r('MT24 Q1 v', v, 'm/s'); r('MT24 Q1 KE/m', v * v / 2, 'J/kg'); }
r('MT24 Q2 dPE', 1.5 * 9.81 * 240, 'W');
{ const A = 0.785e-4, m = 20 * A / 0.125, dH = m * 21, dKE = 0.5 * m * (170 ** 2 - 20 ** 2) / 1000, Ws = -5 - dH - dKE;
  r('MT24 Q3 m', m, 'kg/s'); r('MT24 Q3 dH', dH, 'kW'); r('MT24 Q3 dKE', dKE, 'kW'); r('MT24 Q3 Ws', Ws, 'kW'); r('MT24 Q3 hp', -Ws / HP, 'hp'); }
{ const m = 500 / 3600, Ws = 93.8 * HP, Q = -1e4 * 4.184 / 3600, dKE = 0.5 * m * (360 ** 2 - 60 ** 2) / 1000, dPE = m * 9.81 * (-5) / 1000;
  const dH = Q - Ws - dKE - dPE; r('MT23b Q1 Ws', Ws, 'kW'); r('MT23b Q1 Q', Q, 'kW'); r('MT23b Q1 dKE', dKE, 'kW'); r('MT23b Q1 dPE', dPE, 'kW'); r('MT23b Q1 dH', dH, 'kW'); r('MT23b Q1 dh', dH / m, 'kJ/kg');
  const hin = S.stateFromPT(44 * 101.325, K(450)).h; r('MT23b Q1 check hin IF97', hin, 'kJ/kg'); r('MT23b Q1 check hout', hin + dH / m, 'kJ/kg'); }
{ const m = 20 / 3600, dKE = 0.5 * m * (300 ** 2 - 60 ** 2) / 1000, dPE = m * 9.81 * (-7) / 1000; r('MT23a Q2 dKE', dKE, 'kW'); r('MT23a Q2 dPE', dPE, 'kW'); r('MT23a Q2 dH', -10 - 80 - dKE - dPE, 'kW'); }
{ // MT23a Q1A
  const a = S.stateFromPT(1000, K(45)), b = S.stateFromPT(1000, K(300));
  r('MT23a Q1A v1', a.v, 'm3/kg'); r('MT23a Q1A h1', a.h, 'kJ/kg'); r('MT23a Q1A u1', a.u, 'kJ/kg'); r('MT23a Q1A s1', a.s, 'kJ/kgK');
  r('MT23a Q1A v2', b.v, 'm3/kg'); r('MT23a Q1A h2', b.h, 'kJ/kg'); r('MT23a Q1A u2', b.u, 'kJ/kg'); r('MT23a Q1A s2', b.s, 'kJ/kgK');
  const s45 = S.satByT(K(45)); r('sat 45C hf', s45.f.h, ''); r('sat 45C vf', s45.f.v, ''); r('sat 45C sf', s45.f.s, ''); r('sat 45C uf', s45.f.u, '');
  r('MT23a dV (book vals)', 10 * (b.v - 0.00101), 'm3'); r('MT23a dH (3052,188.4)', 10 * (3052 - 188.4), 'kJ'); }
{ const s = S.satByT(K(220)); r('220C P', s.P, 'kPa'); r('220C hf', s.f.h, ''); r('220C hg', s.g.h, ''); r('220C x', (2750 - s.f.h) / (s.g.h - s.f.h), '-');
  r('220C x (23bar tbl)', (2750 - 941.6) / 1858.2, '-'); }
{ r('E24 Q1 T', 179.9 + 190, 'C'); const h1 = 3159 + (369.9 - 350) / 25 * (3211 - 3159); r('E24 Q1 h1 interp', h1, 'kJ/kg');
  r('E24 Q1 h1 IF97', S.stateFromPT(1000, K(369.9)).h, ''); r('E24 Q1 W', 2000 / 3600 * (h1 - 2675.4), 'kW'); }
{ const m = 100 / 3600; r('E24 Q3 dH', m * 20, 'kW'); r('E24 Q3 dKE', 0.5 * m * 3600 / 1000, 'kW'); r('E24 Q3 Ws', -(m * 20 + 0.5 * m * 3600 / 1000), 'kW'); }
{ const V = 113.4 / 3600, m = 1.98 * V, W = V * 16e5 / 1000; r('E23 Q1 V', V, 'm3/s'); r('E23 Q1 m', m, 'kg/s'); r('E23 Q1 -Ws', W, 'kW'); r('E23 Q1 hp', W / HP, 'hp'); }
{ const v = 80.7 * 0.3048, KE = 0.5 * 1134 * v * v; r('E25 Q1B v', v, 'm/s'); r('E25 Q1B KE', KE, 'J'); r('E25 Q1B Btu', KE / 1055.06, 'Btu');
  const lbm = 1134 / 0.45359237; r('E25 lbm', lbm, 'lbm'); r('E25 ftlbf', 0.5 * lbm * 80.7 ** 2 / 32.174, 'ft.lbf'); }
{ const q = 0.81 * (2550 - 392) / (10 / 12); r('E25 Q3-2 q', q, 'Btu/h.ft2'); r('E25 Q3-2 SI', q * 3.15459, 'W/m2'); }
{ r('QzA1 v', 0.001017 + 0.35 * (7.65 - 0.001017), 'm3/kg'); r('QzA1 h', 251.5 + 0.35 * 2358.4, 'kJ/kg');
  const s = S.stateFromPProp(1200, 'v', 0.175); r('QzA2 T', s.T - 273.15, 'C'); r('QzA2 h', s.h, 'kJ/kg');
  r('QzB1 V', 0.125 * 0.001093 + 0.0075 * 0.375, 'm3');
  r('QzE i u', 696.3 + 0.8 * (2571.1 - 696.3), 'kJ/kg');
  const h3 = 2762.0 + 2.277 * 65, v3 = 0.273 * (165 + 65 + 273) / (165 + 273); r('QzE iii h', h3, ''); r('QzE iii v (Charles)', v3, ''); r('QzE iii u', h3 - 700 * v3, '');
  const t = S.stateFromPT(700, K(230)); r('QzE iii IF97 h v u', t.h, '' + t.v.toFixed(4) + ' ' + t.u.toFixed(1));
  r('Qz12 a v', 0.001139 + 0.98 * (0.1632 - 0.001139), ''); r('Qz12 a h', 798.4 + 0.98 * 1984.3, '');
  const h1 = 2886 + 0.6 * (2943 - 2886), h2 = 2834 + 0.6 * (2902 - 2834); r('Qz12 c h 1MPa', h1, ''); r('Qz12 c h 2MPa', h2, ''); r('Qz12 c h 1.2MPa', h1 + 0.2 * (h2 - h1), '');
  const q = S.stateFromPT(1200, K(240)); r('Qz12 c IF97 h', q.h, 'v=' + q.v.toFixed(4));
  r('Qz11 a v', 0.001133 + 0.98 * (0.1774 - 0.001133), ''); r('Qz11 a h', 781.1 + 0.98 * 1998.5, '');
  r('Qz11 c h 1.1MPa', h1 + 0.1 * (h2 - h1), ''); const q2 = S.stateFromPT(1100, K(240)); r('Qz11 c IF97 h', q2.h, 'v=' + q2.v.toFixed(4)); }
{ const atm = 101325; const WA = 1.5 * atm * 0.1 * Math.log(1.5 / 6.5), WB = 2.5 * atm * 0.2 * Math.log(2.5 / 8.5);
  r('O2 A n', 1.5 * atm * 0.1 / (8.314 * 400), 'mol'); r('O2 A W', WA, 'J'); r('O2 B n', 2.5 * atm * 0.2 / (8.314 * 500), 'mol'); r('O2 B W', WB, 'J');
  r('O2 A V2', 100 * 1.5 / 6.5, 'L'); r('O2 B V2', 200 * 2.5 / 8.5, 'L'); }

for (const [n, v, u, ref] of out) console.log(n.padEnd(26), String(v).padStart(14), u.padEnd(12), ref === '' ? '' : 'book: ' + ref);

// ================= Phase 2 (midterm: 1.4–1.5)
const P2 = [];
const q = (n, v, u, ref) => P2.push([n, +v.toPrecision(6), u, ref === undefined ? '' : ref]);
q('1.14 Q', 200 * (0.855 * 130 + 9.42e-4 * (150 ** 2 - 20 ** 2) / 2), 'kJ', 24312);
q('1.15 dh', 456 - 470, 'kJ/kg', -14);
q('1.15 d(Pv) table', (1.30 * 0.310 - 3.54 * 0.120) * 101.325, 'kJ/kg');
q('1.15 du table', -14 - (1.30 * 0.310 - 3.54 * 0.120) * 101.325, 'kJ/kg', -12);
q('1.15 du book 0.312', -14 - (1.30 * 0.312 - 3.54 * 0.120) * 101.325, 'kJ/kg');
q('1.16 dH', 100 * 0.5 * 60 / 1000, 'kcal/s', 3.0); q('1.16 dH kW', 100 * 0.5 * 60 * 4.184 / 1000, 'kW');
{ const m = 15000 / 3600 / 0.1943, u2 = 15000 / 3600 / (Math.PI * 0.15 ** 2 / 4); q('1.17 m', m, 'kg/s', 21.45); q('1.17 v2', u2, 'm/s', 235.79);
  q('1.17 hf23 IF97', S.satByT(K(23)).f.h, 'kJ/kg', 96.2); q('1.17 dh', 2776.2 - 96.2, 'kJ/kg', 2680); q('1.17 Q', m * 2680 + 0.5 * m * u2 * u2 / 1000, 'kW', 58082); q('1.17 dKE', 0.5 * m * u2 * u2 / 1000, 'kW'); }
{ const h1 = 762.6 + 0.9 * 2013.6; q('1.18 h1', h1, 'kJ/kg', 2574.84); q('1.18 Q', 100 / 3600 * (762.6 - h1), 'kW', -50.34); }
{ const a = 0.7 * 123 + 0.3 * 126.5, b = 0.7 * 0.186 + 0.3 * 0.234; q('1.19 a', a, ''); q('1.19 b', b, '');
  const dh = a * 40 + b / 2 * (50 ** 2 - 10 ** 2), dhb = 124 * 40 + 0.1 * 2400; q('1.19 dhmix exact', dh, 'J/mol'); q('1.19 dhmix book', dhb, 'J/mol', 5200);
  const dhs = 858.6 + 0.9 * 1933.2 - 858.6; q('1.19 hs1', 858.6 + 0.9 * 1933.2, 'kJ/kg', 2598.5); q('1.19 ms', 1e6 * dhb / 1000 / dhs, 'kg/h', 2990);
  q('F25 Q2 ms kg/s', 1e6 * dhb / 1000 / dhs / 3600, 'kg/s');
  const hfg17 = 1921.5; q('F23 Q3 ms (17 bar abs)', 1e6 * dhb / 1000 / (0.9 * hfg17), 'kg/h'); }
{ const m3 = 100 * (2675.4 - 3278) / (3074 - 3278); q('1.20 m3', m3, 'kg/h', 295); q('1.20 m2', m3 - 100, 'kg/h', 195); }
{ const hw90 = 376.8, hw7 = 29.3; const c = 2700 / 3600 * (209.5 - 8.124), wBook = 2000 / 3600 * (hw7 - hw90), w = 1600 / 3600 * (hw7 - hw90), ac = 400 / 3600 * 1.463 * (7 - 90);
  q('1.21 coolant', c, 'kW', 151); q('1.21 water (book 2000)', wBook, 'kW', -193); q('1.21 water (1600)', w, 'kW'); q('1.21 acid', ac, 'kW', -13.49);
  q('1.21 Q book', c + wBook + ac, 'kW', -55.49); q('1.21 Q correct', c + w + ac, 'kW');
  q('hf 90C IF97', S.satByT(K(90)).f.h, ''); q('hf 7C IF97', S.satByT(K(7)).f.h, ''); q('hf 2C', S.satByT(K(2)).f.h, ''); q('hf 50C', S.satByT(K(50)).f.h, ''); }
{ const m = 295 / 60, v = 0.1166, A = Math.PI * 0.06 ** 2 / 4, u = m * v / A; const dH = 295 * 2793 - 120 * 125.7 - 175 * 217, dKE = 0.5 * 295 * u * u / 1000;
  q('F24 Q4 u2', u, 'm/s'); q('F24 Q4 dH', dH, 'kJ/min'); q('F24 Q4 dKE', dKE, 'kJ/min'); q('F24 Q4 Q', dH + dKE, 'kJ/min'); }
{ // Cp conversion acetylene
  const a = 9.89, b = 0.8273e-2, c = -0.3783e-5, o = 459.67;
  const aR = a - b * o + c * o * o, bR = b - 2 * c * o, cR = c; q('F25 R a', aR, ''); q('F25 R b', bR, ''); q('F25 R c', cR, '');
  const aK = aR, bK = 1.8 * (b - 2 * c * o), cK = c * 3.24; q('F25 K a(Btu)', aK, ''); q('F25 K b', bK, ''); q('F25 K c', cK, '');
  q('F25 K a J', aK * 4.184, 'J/molK'); q('F25 K b J', bK * 4.184, ''); q('F25 K c J', cK * 4.184, '');
  const TF = 100, TR = TF + o, TK = (TF + o) / 1.8; q('check F', a + b * TF + c * TF * TF, ''); q('check R', aR + bR * TR + cR * TR * TR, ''); q('check K (Btu)', aK + bK * TK + cK * TK * TK, ''); }
{ // hypothetical path demo: water 25C liquid -> 150C vapor at 1 atm, per kg
  const l = 4.19 * 75, v = 2256.9, g = 2.0 * 50; q('path liquid', l, 'kJ/kg'); q('path total', l + v + g, 'kJ/kg'); q('table h(150,1atm)-hf(25)', S.stateFromPT(101.325, K(150)).h - S.satByT(K(25)).f.h, 'kJ/kg'); }
for (const [n, v, u, ref] of P2) console.log(n.padEnd(26), String(v).padStart(14), u.padEnd(12), ref === '' ? '' : 'book: ' + ref);

// Quiz 2026 (photos)
{ const m2 = 1500 * (3074 - 2706.3) / (3377 - 3074); console.log('Qz26 m2', m2.toFixed(1), 'm3', (1500 + m2).toFixed(1), 'V2 m3/h', (m2 * S.stateFromPT(500, K(450)).v).toFixed(1));
  const dP = 200 * 6894.757; console.log('Qz26 pump per 1 ft3/s actual kW', (0.3048 ** 3 * dP / 0.65 / 1000).toFixed(2)); }
