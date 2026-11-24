// IAPWS-IF97 regions 1, 2 and 4. Units: P in kPa, T in K, v m3/kg, u/h kJ/kg, s kJ/kg.K
(function (root) {
  const R = 0.461526;

  const I1 = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,4,5,8,8,21,23,29,30,31,32];
  const J1 = [-2,-1,0,1,2,3,4,5,-9,-7,-1,0,1,3,-3,0,1,3,17,-4,0,6,-5,-2,10,-8,-11,-6,-29,-31,-38,-39,-40,-41];
  const N1 = [0.14632971213167,-0.84548187169114,-0.37563603672040e1,0.33855169168385e1,-0.95791963387872,0.15772038513228,-0.16616417199501e-1,0.81214629983568e-3,0.28319080123804e-3,-0.60706301565874e-3,-0.18990068218419e-1,-0.32529748770505e-1,-0.21841717175414e-1,-0.52838357969930e-4,-0.47184321073267e-3,-0.30001780793026e-3,0.47661393906987e-4,-0.44141845330846e-5,-0.72694996297594e-15,-0.31679644845054e-4,-0.28270797985312e-5,-0.85205128120103e-9,-0.22425281908000e-5,-0.65171222895601e-6,-0.14341729937924e-12,-0.40516996860117e-6,-0.12734301741641e-8,-0.17424871230634e-9,-0.68762131295531e-18,0.14478307828521e-19,0.26335781662795e-22,-0.11947622640071e-22,0.18228094581404e-23,-0.93537087292458e-25];

  const J0 = [0,1,-5,-4,-3,-2,-1,2,3];
  const N0 = [-0.96927686500217e1,0.10086655968018e2,-0.56087911283020e-2,0.71452738081455e-1,-0.40710498223928,0.14240819171444e1,-0.43839511319450e1,-0.28408632460772,0.21268463753307e-1];
  const IR = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,5,6,6,6,7,7,7,8,8,9,10,10,10,16,16,18,20,20,20,21,22,23,24,24,24];
  const JR = [0,1,2,3,6,1,2,4,7,36,0,1,3,6,35,1,2,3,7,3,16,35,0,11,25,8,36,13,4,10,14,29,50,57,20,35,48,21,53,39,26,40,58];
  const NR = [-0.17731742473213e-2,-0.17834862292358e-1,-0.45996013696365e-1,-0.57581259083432e-1,-0.50325278727930e-1,-0.33032641670203e-4,-0.18948987516315e-3,-0.39392777243355e-2,-0.43797295650573e-1,-0.26674547914087e-4,0.20481737692309e-7,0.43870667284435e-6,-0.32277677238570e-4,-0.15033924542148e-2,-0.40668253562649e-1,-0.78847309559367e-9,0.12790717852285e-7,0.48225372718507e-6,0.22922076337661e-5,-0.16714766451061e-10,-0.21171472321355e-2,-0.23895741934104e2,-0.59059564324270e-15,-0.12621808899101e-5,-0.38946842435739e-1,0.11256211360459e-10,-0.82311340897998e1,0.19809712802088e-7,0.10406965210174e-18,-0.10234747095929e-12,-0.10018179379511e-8,-0.80882908646985e-10,0.10693031879409,-0.33662250574171,0.89185845355421e-24,0.30629316876232e-12,-0.42002467698208e-5,-0.59056029685639e-25,0.37826947613457e-5,-0.12768608934681e-14,0.73087610595061e-28,0.55414715350778e-16,-0.94369707241210e-6];

  const N4 = [0.11670521452767e4,-0.72421316703206e6,-0.17073846940092e2,0.12020824702470e5,-0.32325550322333e7,0.14915108613530e2,-0.48232657361591e4,0.40511340542057e6,-0.23855557567849,0.65017534844798e3];

  function region1(P, T) {
    const pi = P / 16530, tau = 1386 / T;
    let g = 0, gp = 0, gt = 0;
    for (let i = 0; i < 34; i++) {
      const a = Math.pow(7.1 - pi, I1[i]), b = Math.pow(tau - 1.222, J1[i]);
      g += N1[i] * a * b;
      gp += -N1[i] * I1[i] * Math.pow(7.1 - pi, I1[i] - 1) * b;
      gt += N1[i] * a * J1[i] * Math.pow(tau - 1.222, J1[i] - 1);
    }
    return {
      v: R * T / P * pi * gp,
      h: R * T * tau * gt,
      u: R * T * (tau * gt - pi * gp),
      s: R * (tau * gt - g)
    };
  }

  function region2(P, T) {
    const pi = P / 1000, tau = 540 / T;
    let g0 = Math.log(pi), g0t = 0;
    for (let i = 0; i < 9; i++) { g0 += N0[i] * Math.pow(tau, J0[i]); g0t += N0[i] * J0[i] * Math.pow(tau, J0[i] - 1); }
    const g0p = 1 / pi;
    let gr = 0, grp = 0, grt = 0;
    for (let i = 0; i < 43; i++) {
      const a = Math.pow(pi, IR[i]), b = Math.pow(tau - 0.5, JR[i]);
      gr += NR[i] * a * b;
      grp += NR[i] * IR[i] * Math.pow(pi, IR[i] - 1) * b;
      grt += NR[i] * a * JR[i] * Math.pow(tau - 0.5, JR[i] - 1);
    }
    return {
      v: R * T / P * pi * (g0p + grp),
      h: R * T * tau * (g0t + grt),
      u: R * T * (tau * (g0t + grt) - pi * (g0p + grp)),
      s: R * (tau * (g0t + grt) - (g0 + gr))
    };
  }

  function psat(T) { // K -> kPa
    const th = T + N4[8] / (T - N4[9]);
    const A = th * th + N4[0] * th + N4[1], B = N4[2] * th * th + N4[3] * th + N4[4], C = N4[5] * th * th + N4[6] * th + N4[7];
    return Math.pow(2 * C / (-B + Math.sqrt(B * B - 4 * A * C)), 4) * 1000;
  }

  function tsat(P) { // kPa -> K
    const b = Math.pow(P / 1000, 0.25);
    const E = b * b + N4[2] * b + N4[5], F = N4[0] * b * b + N4[3] * b + N4[6], G = N4[1] * b * b + N4[4] * b + N4[7];
    const D = 2 * G / (-F - Math.sqrt(F * F - 4 * E * G));
    return (N4[9] + D - Math.sqrt((N4[9] + D) * (N4[9] + D) - 4 * (N4[8] + N4[9] * D))) / 2;
  }

  const TC = 647.096, PC = 22064;

  function satByP(P) {
    const T = tsat(P);
    return { P, T, f: region1(P, T), g: region2(P, T) };
  }

  function mix(sat, x) {
    const o = {};
    ['v', 'u', 'h', 's'].forEach(k => { o[k] = sat.f[k] + x * (sat.g[k] - sat.f[k]); });
    return o;
  }

  function bisect(fn, a, b, it) {
    let fa = fn(a);
    for (let i = 0; i < (it || 80); i++) {
      const m = (a + b) / 2, fm = fn(m);
      if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else { b = m; }
    }
    return (a + b) / 2;
  }

  function stateFromPT(P, T) {
    const Ts = P < PC ? tsat(P) : Infinity;
    if (Math.abs(T - Ts) < 1e-6) return Object.assign({ P, T, phase: 'sat', x: null }, region2(P, T));
    if (T < Ts) return Object.assign({ P, T, phase: 'liquid', x: null, Tsat: Ts }, region1(P, T));
    return Object.assign({ P, T, phase: 'superheated', x: null, Tsat: Ts }, region2(P, T));
  }

  function stateFromPProp(P, key, val) {
    const sat = satByP(P);
    const lo = sat.f[key], hi = sat.g[key];
    if (val >= lo && val <= hi) {
      const x = (val - lo) / (hi - lo);
      return Object.assign({ P, T: sat.T, phase: 'wet', x, Tsat: sat.T, sat }, mix(sat, x));
    }
    if (val > hi) {
      const T = bisect(t => region2(P, t)[key] - val, sat.T, 1073.15);
      return Object.assign({ P, T, phase: 'superheated', x: null, Tsat: sat.T, sat }, region2(P, T));
    }
    const T = bisect(t => region1(P, t)[key] - val, 273.16, sat.T);
    return Object.assign({ P, T, phase: 'liquid', x: null, Tsat: sat.T, sat }, region1(P, T));
  }

  function stateFromTProp(T, key, val) {
    const P0 = psat(T), sat = { P: P0, T, f: region1(P0, T), g: region2(P0, T) };
    const lo = sat.f[key], hi = sat.g[key];
    if (val >= lo && val <= hi) {
      const x = (val - lo) / (hi - lo);
      return Object.assign({ P: P0, T, phase: 'wet', x, Tsat: T, sat }, mix(sat, x));
    }
    if (key === 'v' && val > hi) {
      const P = Math.exp(bisect(lp => region2(Math.exp(lp), T).v - val, Math.log(0.611), Math.log(P0)));
      return Object.assign({ P, T, phase: 'superheated', x: null, Tsat: tsat(P), sat }, region2(P, T));
    }
    if (key === 'h' && val > hi) {
      const P = Math.exp(bisect(lp => region2(Math.exp(lp), T).h - val, Math.log(0.611), Math.log(P0)));
      return Object.assign({ P, T, phase: 'superheated', x: null, Tsat: tsat(P), sat }, region2(P, T));
    }
    return { error: 'liquid-ambiguous', T, sat };
  }

  function satWithX(P, x) {
    const sat = satByP(P);
    return Object.assign({ P, T: sat.T, phase: 'wet', x, Tsat: sat.T, sat }, mix(sat, x));
  }

  function solve(given) {
    const k = Object.keys(given).filter(q => given[q] !== null && given[q] !== '' && !isNaN(given[q]));
    if (k.length !== 2) return { error: 'need-two' };
    const g = {};
    k.forEach(q => { g[q] = +given[q]; });
    if ('P' in g && 'T' in g) return stateFromPT(g.P, g.T);
    if ('P' in g && 'x' in g) return satWithX(g.P, g.x);
    if ('T' in g && 'x' in g) return satWithX(psat(g.T), g.x);
    if ('P' in g) { const o = k.find(q => q !== 'P'); return stateFromPProp(g.P, o, g[o]); }
    if ('T' in g) { const o = k.find(q => q !== 'T'); return stateFromTProp(g.T, o, g[o]); }
    if ('x' in g) {
      const o = k.find(q => q !== 'x');
      const lp = bisect(l => satWithX(Math.exp(l), g.x)[o] - g[o], Math.log(0.7), Math.log(22000));
      return satWithX(Math.exp(lp), g.x);
    }
    return { error: 'need-P-or-T' };
  }

  function satByT(T) { const P = psat(T); return { P, T, f: region1(P, T), g: region2(P, T) }; }

  root.Steam = { region1, region2, psat, tsat, satByP, satByT, stateFromPT, stateFromPProp, solve, TC, PC };
  if (typeof module !== 'undefined') module.exports = root.Steam;
})(typeof window !== 'undefined' ? window : globalThis);
