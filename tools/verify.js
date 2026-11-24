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
