// Counselling schedule and document checklist used across admissions surfaces.
// Prototype/demo schedule — always confirm dates on the official portal.

export type CounsellingSystem = 'JoSAA / CSAB' | 'MHT-CET CAP' | 'NEET MCC' | 'Direct Institutional';

export interface CounsellingRound {
  id: string;
  system: CounsellingSystem;
  shortName: string;
  roundName: string;
  dates: string;
  startDate: string; // ISO
  endDate: string; // ISO
  action: string;
  description: string;
  actionUrl: string;
}

export const COUNSELLING_SCHEDULE: CounsellingRound[] = [
  {
    id: 'c1',
    system: 'JoSAA / CSAB',
    shortName: 'JoSAA Round 5',
    roundName: 'JoSAA Round 5 Seat Allotment & Fee Submission',
    dates: 'Oct 12 – Oct 16, 2026',
    startDate: '2026-10-12',
    endDate: '2026-10-16',
    action: 'Accept seat, pay acceptance fee, upload documents',
    description: 'Mandatory online reporting, seat acceptance fee payment, and document upload for candidates allocated seats across 23 IITs and 31 NITs.',
    actionUrl: 'https://josaa.nic.in',
  },
  {
    id: 'c2',
    system: 'MHT-CET CAP',
    shortName: 'MHT-CET CAP Round 3',
    roundName: 'MHT-CET CAP Round 3 Choice Filling & Verification',
    dates: 'Oct 18 – Oct 22, 2026',
    startDate: '2026-10-18',
    endDate: '2026-10-22',
    action: 'Submit choices, then Freeze or Float',
    description: 'Final centralized admission round for autonomous and affiliated engineering colleges across Maharashtra state. Freeze or Float choice submission.',
    actionUrl: 'https://cetcell.mahacet.org',
  },
  {
    id: 'c4',
    system: 'Direct Institutional',
    shortName: 'BITS Iteration IV',
    roundName: 'BITS Pilani Iteration IV Seat Confirmation',
    dates: 'Oct 20 – Oct 23, 2026',
    startDate: '2026-10-20',
    endDate: '2026-10-23',
    action: 'Pay balance fees and confirm campus reporting',
    description: 'Payment of balance fees and campus reporting for candidates selected across Pilani, Goa, and Hyderabad campuses.',
    actionUrl: 'https://bitsadmission.com',
  },
  {
    id: 'c3',
    system: 'JoSAA / CSAB',
    shortName: 'CSAB Special Round 1',
    roundName: 'CSAB Special Round 1 Registration Opens',
    dates: 'Oct 25 – Oct 28, 2026',
    startDate: '2026-10-25',
    endDate: '2026-10-28',
    action: 'Register for vacant NIT / IIIT / GFTI seats',
    description: 'Special counseling rounds for vacant seats in NITs, IIITs, and other GFTIs after completion of JoSAA rounds.',
    actionUrl: 'https://csab.nic.in',
  },
];

export interface RequiredDocument {
  id: string;
  title: string;
  desc: string;
  essential: boolean;
}

export const REQUIRED_DOCUMENTS: RequiredDocument[] = [
  { id: 'marksheets', title: 'Class 10th & 12th Marks Sheets', desc: 'Original + 3 attested photocopies showing minimum qualifying marks in PCM/PCB.', essential: true },
  { id: 'scorecard', title: 'Valid Entrance Scorecard & Admit Card', desc: 'Official NTA / State CET score printout with verified percentile breakdown.', essential: true },
  { id: 'domicile', title: 'Domicile / Nationality Certificate', desc: 'Mandatory for State Quota seats (e.g. 85% Maharashtra State Quota).', essential: true },
  { id: 'category', title: 'Category / Caste Certificate & Validity', desc: 'Required for OBC-NCL, SC, ST, EWS candidates with non-creamy layer certificate valid for 2026-27.', essential: true },
  { id: 'migration', title: 'Migration & School Leaving Certificate', desc: 'Issued by junior college / high school showing conduct and completion.', essential: false },
  { id: 'medical', title: 'Medical Fitness Certificate', desc: 'Signed by registered medical practitioner (MBBS) as per standard format.', essential: false },
];

export const ADMISSION_STEPS = [
  { step: '01', title: 'Portal Registration', desc: 'Submit candidate details and entrance roll number on centralized portal.' },
  { step: '02', title: 'Document Verification', desc: 'Online scrutiny or physical reporting at designated facilitation centers.' },
  { step: '03', title: 'Merit List Publication', desc: 'State / All-India provisional and final merit rank generation.' },
  { step: '04', title: 'Option Form (Choices)', desc: 'Prioritize colleges and branch preference sequence.' },
  { step: '05', title: 'Seat Allotment Result', desc: 'Algorithm allocates seat matching rank and preferred choices.' },
  { step: '06', title: 'Freeze / Float & Reporting', desc: 'Accept seat, pay acceptance fee, or opt for higher preference in next round.' },
];

const DAY = 86_400_000;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export type RoundStatus = 'open' | 'upcoming' | 'closed';

export function getRoundStatus(round: CounsellingRound, now = new Date()): { status: RoundStatus; days: number } {
  const today = startOfDay(now);
  const start = startOfDay(new Date(round.startDate + 'T00:00:00'));
  const end = startOfDay(new Date(round.endDate + 'T00:00:00'));
  if (today < start) return { status: 'upcoming', days: Math.round((start - today) / DAY) };
  if (today <= end) return { status: 'open', days: Math.round((end - today) / DAY) };
  return { status: 'closed', days: Math.round((today - end) / DAY) };
}

export function sortedSchedule() {
  return [...COUNSELLING_SCHEDULE].sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/** First round that is open or upcoming, by start date. */
export function getNextRound(now = new Date()) {
  return sortedSchedule().find(r => getRoundStatus(r, now).status !== 'closed') ?? null;
}

export function formatShortDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleString('en-IN', { month: 'short' }).toUpperCase(),
  };
}
