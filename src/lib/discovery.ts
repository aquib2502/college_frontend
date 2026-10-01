// Deterministic natural-language interpreter for the prototype.
// There is no AI backend: queries are parsed with local rules and matched
// against the demo college records in mockData.

import { COLLEGES, type College } from './mockData';

export type ConstraintKind =
  | 'degree'
  | 'branch'
  | 'location'
  | 'budget'
  | 'placement'
  | 'median'
  | 'hostel'
  | 'roi'
  | 'ownership';

export interface Constraint {
  kind: ConstraintKind;
  label: string; // field name, e.g. "Budget"
  value: string; // display value, e.g. "≤ ₹8L / yr"
  test?: (c: College) => boolean;
}

export interface Interpretation {
  query: string;
  constraints: Constraint[];
  sort: 'realityScore' | 'roi' | 'placementPercent' | 'medianPackage';
}

const STATES = ['Maharashtra', 'Rajasthan', 'Karnataka'];
const CITIES = ['Mumbai', 'Pune', 'Pilani', 'Manipal'];

const hasCourse = (c: College, re: RegExp) => c.courses.some(co => re.test(co.name) || (co.branch ? re.test(co.branch) : false));

export function roiOf(c: College) {
  return c.medianPackage / c.totalFees;
}

export function interpretQuery(raw: string): Interpretation {
  const query = raw.trim();
  const q = query.toLowerCase();
  const constraints: Constraint[] = [];
  let sort: Interpretation['sort'] = 'realityScore';

  // Degree
  if (/\b(b\.?\s?tech|b\.?e\.?|engineering)\b/.test(q)) {
    constraints.push({ kind: 'degree', label: 'Degree', value: 'B.Tech / B.E.', test: c => hasCourse(c, /B\.Tech|B\.E\./) });
  } else if (/\b(mba|management|pgdm)\b/.test(q)) {
    constraints.push({ kind: 'degree', label: 'Degree', value: 'MBA', test: c => hasCourse(c, /MBA/) });
  }

  // Branch
  if (/\b(cse|computer|cs|software|ai|data science)\b/.test(q)) {
    constraints.push({ kind: 'branch', label: 'Branch', value: 'Computer Science', test: c => hasCourse(c, /Computer|CSE/) });
  } else if (/\b(mechanical|mech|robotics)\b/.test(q)) {
    constraints.push({ kind: 'branch', label: 'Branch', value: 'Mechanical', test: c => hasCourse(c, /Mechanical/) });
  } else if (/\b(electrical|electronics|ece|vlsi)\b/.test(q)) {
    constraints.push({ kind: 'branch', label: 'Branch', value: 'Electrical / Electronics', test: c => hasCourse(c, /Electrical|Electronics/) });
  }

  // Location — city wins over state when both are present
  const city = CITIES.find(n => q.includes(n.toLowerCase()));
  const state = STATES.find(n => q.includes(n.toLowerCase()));
  if (city) {
    constraints.push({ kind: 'location', label: 'Location', value: /near/.test(q) ? `Near ${city}` : city, test: c => c.city === city });
  } else if (state) {
    constraints.push({ kind: 'location', label: 'Location', value: state, test: c => c.state === state });
  }

  // Budget: "under ₹8L", "below 5 lakh", "< 8L" (annual fee unless "total" is mentioned)
  const budget = q.match(/(?:under|below|less than|within|upto|up to|<|≤|budget(?: of)?)\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:l\b|lakh|lakhs|lac|lpa)/);
  if (budget) {
    const amount = parseFloat(budget[1]);
    const total = /\btotal\b/.test(q);
    constraints.push(
      total
        ? { kind: 'budget', label: 'Budget', value: `≤ ₹${amount}L total`, test: c => Math.min(...c.courses.map(co => co.totalCost)) <= amount }
        : { kind: 'budget', label: 'Budget', value: `≤ ₹${amount}L / yr`, test: c => c.totalFees <= amount },
    );
  } else if (/\b(affordable|cheap|low fee|budget)\b/.test(q)) {
    constraints.push({ kind: 'budget', label: 'Budget', value: '≤ ₹2L / yr', test: c => c.totalFees <= 2 });
  }

  // Placement
  const placementPct = q.match(/placements?\s*(?:above|over|>|of)?\s*(\d{2})\s*%|(\d{2})\s*%\+?\s*placements?/);
  if (placementPct) {
    const pct = parseInt(placementPct[1] ?? placementPct[2], 10);
    constraints.push({ kind: 'placement', label: 'Placement', value: `≥ ${pct}%`, test: c => c.placementPercent >= pct });
  } else if (/(strong|good|excellent|high|best|great)\s+placements?|placement power/.test(q)) {
    constraints.push({ kind: 'placement', label: 'Placement', value: 'Strong (≥ 85%)', test: c => c.placementPercent >= 85 });
    sort = 'placementPercent';
  }

  // Median CTC: "median ctc > ₹18L"
  const median = q.match(/(?:median|ctc|package)[^\d₹]{0,12}₹?\s*(\d+(?:\.\d+)?)\s*(?:l\b|lakh|lpa)/);
  if (median && !budget) {
    const m = parseFloat(median[1]);
    constraints.push({ kind: 'median', label: 'Median CTC', value: `≥ ₹${m}L`, test: c => c.medianPackage >= m });
    sort = 'medianPackage';
  }

  if (/\bhostel/.test(q)) {
    constraints.push({ kind: 'hostel', label: 'Hostel', value: 'On campus', test: c => c.hasHostel });
  }

  if (/\broi\b|return on investment|value for money|high value/.test(q)) {
    constraints.push({ kind: 'roi', label: 'Priority', value: 'Best ROI' });
    sort = 'roi';
  }

  if (/\b(government|govt|public)\b/.test(q)) {
    constraints.push({ kind: 'ownership', label: 'Type', value: 'Government / Autonomous', test: c => c.type === 'Government' || c.type === 'Autonomous' });
  } else if (/\bprivate\b/.test(q)) {
    constraints.push({ kind: 'ownership', label: 'Type', value: 'Private / Deemed', test: c => c.type === 'Private' || c.type === 'Deemed' });
  }

  return { query, constraints, sort };
}

export function matchColleges(constraints: Constraint[], sort: Interpretation['sort'] = 'realityScore'): College[] {
  const results = COLLEGES.filter(c => constraints.every(k => (k.test ? k.test(c) : true)));
  return sortColleges(results, sort);
}

export function sortColleges(list: College[], sort: Interpretation['sort']) {
  return [...list].sort((a, b) => {
    if (sort === 'roi') return roiOf(b) - roiOf(a);
    return b[sort] - a[sort];
  });
}

/** Why a college satisfies the interpreted constraints, in plain words. */
export function explainMatch(c: College, constraints: Constraint[]): string[] {
  const out: string[] = [];
  for (const k of constraints) {
    switch (k.kind) {
      case 'budget': out.push(`₹${c.totalFees}L / yr fee`); break;
      case 'location': out.push(`${c.city}, ${c.state}`); break;
      case 'placement': out.push(`${c.placementPercent}% placed`); break;
      case 'median': out.push(`₹${c.medianPackage}L median`); break;
      case 'hostel': out.push('Hostel on campus'); break;
      case 'roi': out.push(`${roiOf(c).toFixed(1)}× median-to-fee`); break;
      case 'branch': out.push(`Offers ${k.value}`); break;
      default: break;
    }
  }
  return out.slice(0, 3);
}

/** For an empty result set: which single constraint, if removed, brings results back. */
export function relaxationHints(constraints: Constraint[], sort: Interpretation['sort']) {
  return constraints
    .map((k, i) => {
      const rest = constraints.filter((_, j) => j !== i);
      return { constraint: k, index: i, count: matchColleges(rest, sort).length };
    })
    .filter(h => h.count > 0)
    .sort((a, b) => b.count - a.count);
}

export const EXAMPLE_QUERIES = [
  { label: 'B.Tech under ₹8L', query: 'I want a B.Tech college in Maharashtra under ₹8L' },
  { label: 'Near Mumbai', query: 'Best ROI college near Mumbai' },
  { label: 'Strong placements', query: 'Engineering with strong placements and hostel' },
  { label: 'Affordable with hostel & ROI', query: 'Affordable colleges with hostel and good ROI' },
];
