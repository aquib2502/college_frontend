// Mock Data — AI-Powered College Discovery Portal
// These are prototype/demo records only — not real current institutional data

export interface College {
  id: string;
  name: string;
  shortName: string;
  logo: string; // emoji placeholder
  location: string;
  city: string;
  state: string;
  type: 'Government' | 'Deemed' | 'Private' | 'Autonomous';
  ownership: 'Central' | 'State' | 'Private';
  accreditation: string;
  naacGrade: string;
  verified: boolean;
  realityScore: number;
  studentRating: number;
  totalReviews: number;
  placementPercent: number;
  medianPackage: number; // in lakhs
  averagePackage: number;
  highestPackage: number;
  totalFees: number; // per year in lakhs
  hostelFees: number;
  hasHostel: boolean;
  hasWifi: boolean;
  hasSports: boolean;
  hasLibrary: boolean;
  hasTransport: boolean;
  courses: Course[];
  placements: PlacementData;
  rankings: Ranking[];
  reviews: Review[];
  admissionProbability?: number;
  aiMatchPercent?: number;
  whyItMatches?: string[];
  potentialConcerns?: string[];
  overviewSummary: string;
  strengths: string[];
  concerns: string[];
  bestFor: string[];
  notIdealFor: string[];
  established: number;
  campus: string; // acres
  topRecruiters: string[];
  cutoffs: Cutoff[];
  scholarships: Scholarship[];
}

export interface Course {
  id: string;
  name: string;
  level: 'UG' | 'PG' | 'PhD';
  duration: string;
  tuition: number; // per year in lakhs
  hostelFees: number;
  totalCost: number;
  eligibility: string;
  entranceExam: string;
  seats: number;
  branch?: string;
}

export interface PlacementData {
  placementPercent: number;
  averagePackage: number;
  medianPackage: number;
  highestPackage: number;
  studentsPlaced: number;
  totalStudents: number;
  topRecruiters: string[];
  yearWise: { year: string; percent: number; avg: number; median: number }[];
  branchWise: { branch: string; avg: number; placed: number }[];
  aiInsights: AIInsight[];
}

export interface AIInsight {
  question: string;
  answer: string;
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
}

export interface Review {
  id: string;
  studentType: 'Current Student' | 'Alumni' | 'Verified Alumnus';
  course: string;
  batch: string;
  verified: boolean;
  overallRating: number;
  facultyRating: number;
  placementRating: number;
  infrastructureRating: number;
  hostelRating: number;
  campusRating: number;
  roiRating: number;
  pros: string[];
  cons: string[];
  experience: string;
  helpfulCount: number;
  reportCount: number;
  date: string;
}

export interface Ranking {
  body: string;
  category: string;
  rank: number;
  year: string;
}

export interface Cutoff {
  exam: string;
  course: string;
  category: string;
  year: string;
  cutoff: string;
}

export interface Scholarship {
  name: string;
  amount: string;
  eligibility: string;
  type: string;
}

export const COLLEGES: College[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    logo: '🏛️',
    location: 'Powai, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    ownership: 'Central',
    accreditation: 'NBA & NAAC',
    naacGrade: 'A++',
    verified: true,
    realityScore: 97,
    studentRating: 4.6,
    totalReviews: 3842,
    placementPercent: 96,
    medianPackage: 28,
    averagePackage: 34,
    highestPackage: 2.0,
    totalFees: 1.1,
    hostelFees: 0.8,
    hasHostel: true,
    hasWifi: true,
    hasSports: true,
    hasLibrary: true,
    hasTransport: true,
    established: 1958,
    campus: '550 acres',
    overviewSummary: 'IIT Bombay is India\'s premier engineering institution, consistently ranked among the top 2 IITs nationally and top 200 globally. The institute is known for exceptional research output, industry connections, and career outcomes.',
    strengths: [
      'Consistently #1 or #2 in national engineering rankings',
      'Median package ₹28L with global opportunities',
      'World-class research infrastructure',
      'Strong alumni network across Fortune 500 companies',
      'JEE Advanced admission ensures highly competitive peer group',
    ],
    concerns: [
      'Extremely competitive admission (JEE Advanced top 2,000)',
      'High academic pressure environment',
      'Limited seats per branch',
    ],
    bestFor: ['Top JEE performers', 'Research-oriented students', 'Global career aspirants'],
    notIdealFor: ['Students seeking lower competition', 'Budget-constrained families (despite low fees, cost of living in Mumbai is high)'],
    topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'DE Shaw', 'Uber', 'Amazon'],
    courses: [
      {
        id: 'btech-cs-iitb',
        name: 'B.Tech Computer Science & Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 1.1,
        hostelFees: 0.8,
        totalCost: 7.6,
        eligibility: 'JEE Advanced rank < 100',
        entranceExam: 'JEE Advanced',
        seats: 120,
        branch: 'CSE',
      },
      {
        id: 'btech-ee-iitb',
        name: 'B.Tech Electrical Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 1.1,
        hostelFees: 0.8,
        totalCost: 7.6,
        eligibility: 'JEE Advanced rank < 300',
        entranceExam: 'JEE Advanced',
        seats: 90,
        branch: 'EE',
      },
      {
        id: 'mtech-cs-iitb',
        name: 'M.Tech Computer Science',
        level: 'PG',
        duration: '2 years',
        tuition: 0.5,
        hostelFees: 0.6,
        totalCost: 2.2,
        eligibility: 'GATE score > 750',
        entranceExam: 'GATE',
        seats: 60,
        branch: 'CSE',
      },
    ],
    placements: {
      placementPercent: 96,
      averagePackage: 34,
      medianPackage: 28,
      highestPackage: 200,
      studentsPlaced: 1152,
      totalStudents: 1200,
      topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'DE Shaw'],
      yearWise: [
        { year: '2022', percent: 93, avg: 28, median: 22 },
        { year: '2023', percent: 94, avg: 30, median: 24 },
        { year: '2024', percent: 95, avg: 32, median: 26 },
        { year: '2025', percent: 96, avg: 34, median: 28 },
      ],
      branchWise: [
        { branch: 'CSE', avg: 52, placed: 97 },
        { branch: 'EE', avg: 38, placed: 96 },
        { branch: 'ME', avg: 24, placed: 94 },
        { branch: 'Chemical', avg: 22, placed: 92 },
        { branch: 'Civil', avg: 18, placed: 88 },
      ],
      aiInsights: [
        {
          question: 'How good are placements for CSE?',
          answer: 'CSE placements at IIT Bombay are exceptional. The average package for CSE students is ₹52L with top offers reaching ₹1.5Cr+ (international roles). 97% of CSE students are placed. Companies like Google, Microsoft, Uber, and Goldman Sachs are regular recruiters. Data Analytics and AI/ML roles have seen 40% growth in the last 2 years.',
          confidence: 'high',
          sources: ['IIT Bombay Placement Report 2025', 'NIRF Data 2024'],
        },
        {
          question: 'Has placement performance improved?',
          answer: 'Yes — placement performance has steadily improved from 93% in 2022 to 96% in 2025. Average packages have grown from ₹28L to ₹34L, representing a ~21% increase over 3 years. This growth is driven by increasing international offers and expansion of product-based companies on campus.',
          confidence: 'high',
          sources: ['IIT Bombay Annual Report 2025'],
        },
      ],
    },
    rankings: [
      { body: 'NIRF', category: 'Engineering', rank: 3, year: '2024' },
      { body: 'QS World', category: 'Overall', rank: 118, year: '2024' },
      { body: 'Times Higher Education', category: 'Engineering', rank: 301, year: '2024' },
    ],
    reviews: [
      {
        id: 'r1',
        studentType: 'Verified Alumnus',
        course: 'B.Tech CSE',
        batch: '2021',
        verified: true,
        overallRating: 4.8,
        facultyRating: 4.7,
        placementRating: 5.0,
        infrastructureRating: 4.5,
        hostelRating: 4.2,
        campusRating: 4.9,
        roiRating: 5.0,
        pros: ['World-class faculty and research opportunities', 'Incredible alumni network', 'Top placement record'],
        cons: ['Extremely stressful academic environment', 'Mumbai cost of living is high'],
        experience: 'Four years at IIT Bombay were transformative. The peer group is exceptional, and the exposure to top companies during placement season was unmatched. The campus itself is beautiful. Academically demanding but worth every bit.',
        helpfulCount: 284,
        reportCount: 0,
        date: '2024-03-15',
      },
    ],
    cutoffs: [
      { exam: 'JEE Advanced', course: 'B.Tech CSE', category: 'General', year: '2024', cutoff: 'Rank < 63' },
      { exam: 'JEE Advanced', course: 'B.Tech EE', category: 'General', year: '2024', cutoff: 'Rank < 280' },
    ],
    scholarships: [
      { name: 'MCM Scholarship', amount: '₹1,000/month', eligibility: 'Family income < ₹4.5L', type: 'Need-based' },
      { name: 'Institute Free Studentship', amount: 'Full fee waiver', eligibility: 'Family income < ₹1L', type: 'Need-based' },
    ],
  },
  {
    id: 'coep',
    name: 'College of Engineering Pune',
    shortName: 'COEP Pune',
    logo: '🎓',
    location: 'Shivajinagar, Pune, Maharashtra',
    city: 'Pune',
    state: 'Maharashtra',
    type: 'Autonomous',
    ownership: 'State',
    accreditation: 'NAAC & NBA',
    naacGrade: 'A+',
    verified: true,
    realityScore: 87,
    studentRating: 4.2,
    totalReviews: 1284,
    placementPercent: 88,
    medianPackage: 8.4,
    averagePackage: 10.2,
    highestPackage: 42,
    totalFees: 1.4,
    hostelFees: 0.6,
    hasHostel: true,
    hasWifi: true,
    hasSports: true,
    hasLibrary: true,
    hasTransport: true,
    established: 1854,
    campus: '36 acres',
    overviewSummary: 'COEP is one of India\'s oldest and most prestigious autonomous engineering colleges, with a strong legacy in Maharashtra. Newly upgraded to Technological University status, offering excellent engineering education at very affordable fees.',
    strengths: [
      'India\'s 3rd oldest engineering college — 170+ year legacy',
      'Excellent ROI — affordable fees with strong placement outcomes',
      'Strong industry connections in Pune tech ecosystem',
      'Newly granted Technological University status (2020)',
      'MH-CET admission makes it accessible for Maharashtra students',
    ],
    concerns: [
      'Limited campus space compared to IITs',
      'Higher-paying roles concentrated in CSE/IT branches',
      'Infrastructure upgrades still ongoing in some departments',
    ],
    bestFor: ['Maharashtra students seeking excellent ROI', 'Students with MH-CET scores 95+ percentile', 'Cost-conscious students'],
    notIdealFor: ['Students seeking global campus experience', 'Students prioritizing research over placements'],
    topRecruiters: ['Infosys', 'TCS', 'Cognizant', 'Persistent', 'KPIT', 'Capgemini', 'Wipro'],
    courses: [
      {
        id: 'btech-cs-coep',
        name: 'B.Tech Computer Science & Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 1.4,
        hostelFees: 0.6,
        totalCost: 8.0,
        eligibility: 'MH-CET / JEE Main 97+ percentile',
        entranceExam: 'MH-CET / JEE Main',
        seats: 120,
        branch: 'CSE',
      },
      {
        id: 'btech-mech-coep',
        name: 'B.Tech Mechanical Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 1.2,
        hostelFees: 0.6,
        totalCost: 7.2,
        eligibility: 'MH-CET 90+ percentile',
        entranceExam: 'MH-CET',
        seats: 120,
        branch: 'Mechanical',
      },
    ],
    placements: {
      placementPercent: 88,
      averagePackage: 10.2,
      medianPackage: 8.4,
      highestPackage: 42,
      studentsPlaced: 528,
      totalStudents: 600,
      topRecruiters: ['Infosys', 'TCS', 'Persistent', 'KPIT', 'Capgemini'],
      yearWise: [
        { year: '2022', percent: 82, avg: 7.8, median: 6.5 },
        { year: '2023', percent: 84, avg: 8.5, median: 7.2 },
        { year: '2024', percent: 86, avg: 9.4, median: 8.0 },
        { year: '2025', percent: 88, avg: 10.2, median: 8.4 },
      ],
      branchWise: [
        { branch: 'CSE', avg: 15.4, placed: 94 },
        { branch: 'IT', avg: 12.8, placed: 92 },
        { branch: 'Mechanical', avg: 7.2, placed: 84 },
        { branch: 'Civil', avg: 5.6, placed: 78 },
        { branch: 'E&TC', avg: 9.8, placed: 88 },
      ],
      aiInsights: [
        {
          question: 'How good are placements for CSE?',
          answer: 'CSE placements at COEP are strong for a state college. The average package for CSE students is ₹15.4L, with 94% placement rate. Product-based companies like Persistent, KPIT, and Capgemini are regular recruiters. Additionally, Pune\'s proximity to major tech companies creates excellent off-campus opportunities.',
          confidence: 'high',
          sources: ['COEP Placement Report 2025'],
        },
      ],
    },
    rankings: [
      { body: 'NIRF', category: 'Engineering', rank: 42, year: '2024' },
      { body: 'India Today', category: 'Engineering', rank: 28, year: '2024' },
    ],
    reviews: [
      {
        id: 'r2',
        studentType: 'Alumni',
        course: 'B.Tech CSE',
        batch: '2023',
        verified: true,
        overallRating: 4.3,
        facultyRating: 4.0,
        placementRating: 4.4,
        infrastructureRating: 3.8,
        hostelRating: 3.5,
        campusRating: 4.2,
        roiRating: 4.8,
        pros: ['Excellent ROI for fees paid', 'Strong alumni network in Pune', 'Good industry exposure'],
        cons: ['Hostel facilities need improvement', 'Administrative processes can be slow'],
        experience: 'COEP gave me excellent value for the fees paid. Placement cell is active and companies genuinely consider COEP students for good roles. The legacy of the college opens many doors.',
        helpfulCount: 142,
        reportCount: 0,
        date: '2024-05-20',
      },
    ],
    cutoffs: [
      { exam: 'MH-CET', course: 'B.Tech CSE', category: 'General', year: '2024', cutoff: '99.2+ percentile' },
      { exam: 'JEE Main', course: 'B.Tech CSE', category: 'General', year: '2024', cutoff: '97+ percentile' },
    ],
    scholarships: [
      { name: 'Maharashtra State Scholarship', amount: '₹5,000/year', eligibility: 'Income < ₹2.5L', type: 'Need-based' },
      { name: 'Merit Scholarship', amount: '₹10,000/year', eligibility: 'Top 10 in class', type: 'Merit-based' },
    ],
  },
  {
    id: 'vjti',
    name: 'Veermata Jijabai Technological Institute',
    shortName: 'VJTI Mumbai',
    logo: '⚙️',
    location: 'Matunga, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Autonomous',
    ownership: 'State',
    accreditation: 'NAAC & NBA',
    naacGrade: 'A',
    verified: true,
    realityScore: 84,
    studentRating: 4.0,
    totalReviews: 892,
    placementPercent: 85,
    medianPackage: 7.2,
    averagePackage: 9.0,
    highestPackage: 38,
    totalFees: 1.3,
    hostelFees: 0.5,
    hasHostel: true,
    hasWifi: true,
    hasSports: true,
    hasLibrary: true,
    hasTransport: false,
    established: 1887,
    campus: '14 acres',
    overviewSummary: 'VJTI is one of Mumbai\'s premier autonomous engineering colleges. Strong in Mechanical and Electrical engineering with excellent industry connections in Mumbai\'s industrial belt.',
    strengths: [
      'Mumbai location — access to India\'s commercial capital',
      'Strong legacy and alumni network',
      'Affordable fees with strong technical education',
      'Good industry exposure through Mumbai ecosystem',
    ],
    concerns: [
      'Limited campus size (14 acres)',
      'Hostel accommodation scarce due to campus size',
      'CSE-specific placement data limited compared to specialized colleges',
    ],
    bestFor: ['Maharashtra students seeking Mumbai exposure', 'Mechanical/Electrical engineering aspirants'],
    notIdealFor: ['Students requiring extensive hostel facilities', 'Students focused purely on software roles'],
    topRecruiters: ['L&T', 'Tata Motors', 'Infosys', 'TCS', 'Mahindra', 'Forbes Marshall'],
    courses: [
      {
        id: 'btech-cs-vjti',
        name: 'B.Tech Computer Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 1.3,
        hostelFees: 0.5,
        totalCost: 7.2,
        eligibility: 'MH-CET 96+ percentile',
        entranceExam: 'MH-CET',
        seats: 60,
        branch: 'CE',
      },
      {
        id: 'btech-mech-vjti',
        name: 'B.Tech Mechanical Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 1.2,
        hostelFees: 0.5,
        totalCost: 6.8,
        eligibility: 'MH-CET 90+ percentile',
        entranceExam: 'MH-CET',
        seats: 120,
        branch: 'Mechanical',
      },
    ],
    placements: {
      placementPercent: 85,
      averagePackage: 9.0,
      medianPackage: 7.2,
      highestPackage: 38,
      studentsPlaced: 425,
      totalStudents: 500,
      topRecruiters: ['L&T', 'Tata Motors', 'Infosys', 'TCS', 'Mahindra'],
      yearWise: [
        { year: '2022', percent: 80, avg: 7.2, median: 5.8 },
        { year: '2023', percent: 82, avg: 8.0, median: 6.4 },
        { year: '2024', percent: 84, avg: 8.6, median: 7.0 },
        { year: '2025', percent: 85, avg: 9.0, median: 7.2 },
      ],
      branchWise: [
        { branch: 'CSE/CE', avg: 13.2, placed: 92 },
        { branch: 'IT', avg: 11.0, placed: 90 },
        { branch: 'Mechanical', avg: 7.8, placed: 82 },
        { branch: 'Electrical', avg: 8.4, placed: 84 },
      ],
      aiInsights: [
        {
          question: 'How good are placements for CSE?',
          answer: 'CSE/CE placements at VJTI are solid, especially given Mumbai location. Average for CSE is ₹13.2L with 92% placement. Being in Mumbai gives excellent off-campus opportunities beyond the formal placement season.',
          confidence: 'medium',
          sources: ['VJTI Placement Office 2025'],
        },
      ],
    },
    rankings: [
      { body: 'NIRF', category: 'Engineering', rank: 61, year: '2024' },
      { body: 'India Today', category: 'Engineering', rank: 45, year: '2024' },
    ],
    reviews: [
      {
        id: 'r3',
        studentType: 'Current Student',
        course: 'B.Tech Mechanical',
        batch: '2025',
        verified: true,
        overallRating: 4.0,
        facultyRating: 3.9,
        placementRating: 4.1,
        infrastructureRating: 3.6,
        hostelRating: 3.0,
        campusRating: 3.8,
        roiRating: 4.5,
        pros: ['Mumbai location is a huge advantage', 'Strong core engineering focus', 'Good alumni network'],
        cons: ['Campus too small for hostel needs', 'Limited sports infrastructure'],
        experience: 'Being in Mumbai is VJTI\'s biggest advantage. Internship and placement opportunities are abundant. The technical education quality is very good.',
        helpfulCount: 98,
        reportCount: 0,
        date: '2024-11-10',
      },
    ],
    cutoffs: [
      { exam: 'MH-CET', course: 'B.Tech CE', category: 'General', year: '2024', cutoff: '98.5+ percentile' },
    ],
    scholarships: [
      { name: 'State Government Scholarship', amount: '₹5,000/year', eligibility: 'Income < ₹2.5L', type: 'Need-based' },
    ],
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    shortName: 'BITS Pilani',
    logo: '🔬',
    location: 'Pilani, Rajasthan',
    city: 'Pilani',
    state: 'Rajasthan',
    type: 'Deemed',
    ownership: 'Private',
    accreditation: 'NAAC',
    naacGrade: 'A',
    verified: true,
    realityScore: 92,
    studentRating: 4.5,
    totalReviews: 2156,
    placementPercent: 90,
    medianPackage: 18,
    averagePackage: 22,
    highestPackage: 120,
    totalFees: 5.8,
    hostelFees: 1.2,
    hasHostel: true,
    hasWifi: true,
    hasSports: true,
    hasLibrary: true,
    hasTransport: true,
    established: 1964,
    campus: '328 acres',
    overviewSummary: 'BITS Pilani is India\'s top private engineering university, renowned for its BITSAT entrance and unique dual-degree programs. Excellent placements, vibrant campus life, and strong research programs.',
    strengths: [
      'Top private engineering institution in India',
      'Unique Practice School (PS) program for industry internships',
      'Exceptional campus life and student culture',
      'Strong alumni network globally',
      'BITSAT admission — nationally recognized entrance',
    ],
    concerns: [
      'High fees (₹5.8L/year) compared to government colleges',
      'Remote campus location (Pilani)',
      'Limited branch diversity compared to IITs',
    ],
    bestFor: ['Students with BITSAT 300+ score', 'Students who value campus life and culture', 'Students seeking private university with IIT-like outcomes'],
    notIdealFor: ['Budget-sensitive students', 'Students preferring urban campus', 'Students who scored in JEE Advanced top 1000 (IIT is better)'],
    topRecruiters: ['Microsoft', 'Goldman Sachs', 'Samsung', 'HSBC', 'Qualcomm', 'Texas Instruments'],
    courses: [
      {
        id: 'be-cs-bits',
        name: 'B.E. Computer Science',
        level: 'UG',
        duration: '4 years',
        tuition: 5.8,
        hostelFees: 1.2,
        totalCost: 28,
        eligibility: 'BITSAT 340+',
        entranceExam: 'BITSAT',
        seats: 180,
        branch: 'CSE',
      },
    ],
    placements: {
      placementPercent: 90,
      averagePackage: 22,
      medianPackage: 18,
      highestPackage: 120,
      studentsPlaced: 1620,
      totalStudents: 1800,
      topRecruiters: ['Microsoft', 'Goldman Sachs', 'Samsung', 'Qualcomm', 'Texas Instruments'],
      yearWise: [
        { year: '2022', percent: 86, avg: 18, median: 14 },
        { year: '2023', percent: 87, avg: 20, median: 16 },
        { year: '2024', percent: 89, avg: 21, median: 17 },
        { year: '2025', percent: 90, avg: 22, median: 18 },
      ],
      branchWise: [
        { branch: 'CSE', avg: 32, placed: 94 },
        { branch: 'ECE', avg: 24, placed: 92 },
        { branch: 'Mechanical', avg: 14, placed: 88 },
        { branch: 'Chemical', avg: 16, placed: 87 },
      ],
      aiInsights: [
        {
          question: 'How good are placements for CSE?',
          answer: 'BITS Pilani CSE placements are excellent for a private university. Average package is ₹32L with 94% placement rate. The Practice School program provides guaranteed industry internship, which often converts to pre-placement offers (PPOs). Qualcomm, Texas Instruments, and Samsung have strong hiring pipelines.',
          confidence: 'high',
          sources: ['BITS Pilani Career Development Centre 2025'],
        },
      ],
    },
    rankings: [
      { body: 'NIRF', category: 'Engineering', rank: 26, year: '2024' },
      { body: 'QS India', category: 'Overall', rank: 12, year: '2024' },
    ],
    reviews: [
      {
        id: 'r4',
        studentType: 'Verified Alumnus',
        course: 'B.E. CSE',
        batch: '2022',
        verified: true,
        overallRating: 4.6,
        facultyRating: 4.4,
        placementRating: 4.7,
        infrastructureRating: 4.5,
        hostelRating: 4.3,
        campusRating: 5.0,
        roiRating: 4.2,
        pros: ['Incredible campus culture and events', 'Practice School internship is unique', 'Diverse student body from across India'],
        cons: ['Fees are high — not ideal for budget-conscious families', 'Remote location means limited city exposure'],
        experience: 'BITS Pilani gave me the best 4 years of my life. The culture, the autonomy, the internship through Practice School — all of it made me industry-ready in a way no textbook could.',
        helpfulCount: 312,
        reportCount: 0,
        date: '2024-02-08',
      },
    ],
    cutoffs: [
      { exam: 'BITSAT', course: 'B.E. CSE', category: 'General', year: '2024', cutoff: '356+' },
    ],
    scholarships: [
      { name: 'BITS Merit Scholarship', amount: 'Up to 50% fee waiver', eligibility: 'BITSAT 380+', type: 'Merit-based' },
    ],
  },
  {
    id: 'nmims',
    name: 'Narsee Monjee Institute of Management Studies',
    shortName: 'NMIMS Mumbai',
    logo: '🏢',
    location: 'Vile Parle West, Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Deemed',
    ownership: 'Private',
    accreditation: 'NAAC & AACSB',
    naacGrade: 'A+',
    verified: true,
    realityScore: 82,
    studentRating: 4.1,
    totalReviews: 1642,
    placementPercent: 94,
    medianPackage: 12,
    averagePackage: 16,
    highestPackage: 60,
    totalFees: 7.5,
    hostelFees: 1.8,
    hasHostel: true,
    hasWifi: true,
    hasSports: false,
    hasLibrary: true,
    hasTransport: false,
    established: 1981,
    campus: '6 acres',
    overviewSummary: 'NMIMS is one of India\'s top business and management schools, with excellent MBA and BBA programs. Located in Mumbai\'s commercial heart, offering strong industry connections and placement outcomes.',
    strengths: [
      'Top 10 MBA institution in India',
      '94% placement rate with strong Mumbai industry connections',
      'AACSB accreditation (global business school recognition)',
      'Strong for Finance, Marketing, and Operations roles',
      'Mumbai location — Dalal Street and Bandra-Kurla Complex access',
    ],
    concerns: [
      'High fees (₹7.5L/year for MBA)',
      'Very small campus',
      'Limited research opportunities',
      'Sports infrastructure minimal',
    ],
    bestFor: ['MBA aspirants', 'Finance and consulting career seekers', 'Students leveraging Mumbai location'],
    notIdealFor: ['Students seeking large campuses', 'Budget-sensitive students', 'Engineering-focused students'],
    topRecruiters: ['HDFC Bank', 'Deloitte', 'BCG', 'Amazon', 'Myntra', 'JPMorgan', 'Goldman Sachs'],
    courses: [
      {
        id: 'mba-nmims',
        name: 'MBA (Full Time)',
        level: 'PG',
        duration: '2 years',
        tuition: 7.5,
        hostelFees: 1.8,
        totalCost: 18.6,
        eligibility: 'NMAT by GMAC',
        entranceExam: 'NMAT',
        seats: 480,
        branch: 'Management',
      },
    ],
    placements: {
      placementPercent: 94,
      averagePackage: 16,
      medianPackage: 12,
      highestPackage: 60,
      studentsPlaced: 451,
      totalStudents: 480,
      topRecruiters: ['HDFC Bank', 'Deloitte', 'BCG', 'Amazon', 'JPMorgan'],
      yearWise: [
        { year: '2022', percent: 91, avg: 13, median: 10 },
        { year: '2023', percent: 92, avg: 14, median: 11 },
        { year: '2024', percent: 93, avg: 15, median: 11.5 },
        { year: '2025', percent: 94, avg: 16, median: 12 },
      ],
      branchWise: [
        { branch: 'Finance', avg: 22, placed: 96 },
        { branch: 'Marketing', avg: 14, placed: 93 },
        { branch: 'Operations', avg: 12, placed: 92 },
        { branch: 'HR', avg: 10, placed: 90 },
      ],
      aiInsights: [
        {
          question: 'How good are placements for MBA Finance?',
          answer: 'MBA Finance placements at NMIMS are strong — average ₹22L with 96% placement. Being in Mumbai gives direct access to financial institutions on Dalal Street and BKC. JPMorgan, Goldman Sachs, and Deloitte are consistent recruiters. CFA candidates from NMIMS have a strong track record.',
          confidence: 'high',
          sources: ['NMIMS Placement Cell 2025'],
        },
      ],
    },
    rankings: [
      { body: 'NIRF', category: 'Management', rank: 8, year: '2024' },
      { body: 'India Today', category: 'MBA', rank: 6, year: '2024' },
    ],
    reviews: [
      {
        id: 'r5',
        studentType: 'Alumni',
        course: 'MBA Finance',
        batch: '2023',
        verified: true,
        overallRating: 4.2,
        facultyRating: 4.1,
        placementRating: 4.5,
        infrastructureRating: 3.5,
        hostelRating: 3.8,
        campusRating: 3.2,
        roiRating: 4.0,
        pros: ['Mumbai location is unbeatable for finance', 'Strong alumni in top banks', 'Excellent industry speaker series'],
        cons: ['Small campus', 'Fees are high relative to some peers', 'Sports and recreation facilities lacking'],
        experience: 'NMIMS MBA gave me exactly what I came for — a strong finance career in Mumbai. The alumni network is very active and my college name opened many doors in the banking sector.',
        helpfulCount: 167,
        reportCount: 0,
        date: '2024-07-14',
      },
    ],
    cutoffs: [
      { exam: 'NMAT', course: 'MBA', category: 'General', year: '2024', cutoff: '215+' },
    ],
    scholarships: [
      { name: 'NMIMS Merit Scholarship', amount: '₹50,000/year', eligibility: 'NMAT 235+', type: 'Merit-based' },
    ],
  },
  {
    id: 'manipal',
    name: 'Manipal Institute of Technology',
    shortName: 'MIT Manipal',
    logo: '🌐',
    location: 'Manipal, Udupi, Karnataka',
    city: 'Manipal',
    state: 'Karnataka',
    type: 'Deemed',
    ownership: 'Private',
    accreditation: 'NAAC & NBA',
    naacGrade: 'A+',
    verified: true,
    realityScore: 79,
    studentRating: 4.0,
    totalReviews: 3240,
    placementPercent: 82,
    medianPackage: 7.0,
    averagePackage: 9.5,
    highestPackage: 55,
    totalFees: 4.8,
    hostelFees: 1.1,
    hasHostel: true,
    hasWifi: true,
    hasSports: true,
    hasLibrary: true,
    hasTransport: true,
    established: 1957,
    campus: '550 acres',
    overviewSummary: 'MIT Manipal is one of India\'s largest private engineering universities with a vibrant international campus. Strong in diverse engineering disciplines with growing placement outcomes.',
    strengths: [
      'Large integrated campus with world-class infrastructure',
      'Diverse student community from 30+ countries',
      'Growing tech company presence on campus',
      'Strong campus life and extracurricular opportunities',
    ],
    concerns: [
      'Placement quality varies significantly by branch',
      'High fees for outcomes relative to top government colleges',
      'Located in a tier-3 city with limited off-campus opportunities',
      'Some placement data transparency issues reported',
    ],
    bestFor: ['Students who value campus life and facilities', 'Students seeking a diverse college experience'],
    notIdealFor: ['Students who prioritize placement outcomes over experience', 'Cost-sensitive students'],
    topRecruiters: ['Infosys', 'TCS', 'Wipro', 'Accenture', 'Cisco', 'Amazon'],
    courses: [
      {
        id: 'btech-cs-manipal',
        name: 'B.Tech Computer Science & Engineering',
        level: 'UG',
        duration: '4 years',
        tuition: 4.8,
        hostelFees: 1.1,
        totalCost: 23.6,
        eligibility: 'MU OET / JEE Main',
        entranceExam: 'MU OET',
        seats: 300,
        branch: 'CSE',
      },
    ],
    placements: {
      placementPercent: 82,
      averagePackage: 9.5,
      medianPackage: 7.0,
      highestPackage: 55,
      studentsPlaced: 2460,
      totalStudents: 3000,
      topRecruiters: ['Infosys', 'TCS', 'Wipro', 'Accenture', 'Cisco'],
      yearWise: [
        { year: '2022', percent: 78, avg: 7.8, median: 5.8 },
        { year: '2023', percent: 80, avg: 8.5, median: 6.2 },
        { year: '2024', percent: 81, avg: 9.0, median: 6.8 },
        { year: '2025', percent: 82, avg: 9.5, median: 7.0 },
      ],
      branchWise: [
        { branch: 'CSE', avg: 14.2, placed: 88 },
        { branch: 'ECE', avg: 9.8, placed: 84 },
        { branch: 'Mechanical', avg: 6.4, placed: 76 },
        { branch: 'Civil', avg: 4.8, placed: 68 },
      ],
      aiInsights: [
        {
          question: 'Is Manipal good for CSE placements?',
          answer: 'CSE placements at MIT Manipal have been improving. Average package is ₹14.2L with 88% placement. However, there is a wide distribution — top students get excellent offers while some students at the bottom take longer. Off-campus placements supplement on-campus significantly.',
          confidence: 'medium',
          sources: ['MIT Manipal Placement Cell 2025'],
        },
      ],
    },
    rankings: [
      { body: 'NIRF', category: 'Engineering', rank: 51, year: '2024' },
      { body: 'India Today', category: 'Engineering', rank: 22, year: '2024' },
    ],
    reviews: [
      {
        id: 'r6',
        studentType: 'Current Student',
        course: 'B.Tech CSE',
        batch: '2026',
        verified: true,
        overallRating: 4.0,
        facultyRating: 3.8,
        placementRating: 3.9,
        infrastructureRating: 4.6,
        hostelRating: 4.4,
        campusRating: 4.8,
        roiRating: 3.5,
        pros: ['Beautiful campus with amazing facilities', 'Great extracurricular scene', 'International student environment'],
        cons: ['Fees are high for the outcomes', 'Placement data could be more transparent'],
        experience: 'The campus experience at MIT Manipal is second to none. The infrastructure, sports, cultural events — everything is top class. Placements are improving but still not comparable to IITs for the fees paid.',
        helpfulCount: 203,
        reportCount: 0,
        date: '2024-09-22',
      },
    ],
    cutoffs: [
      { exam: 'MU OET', course: 'B.Tech CSE', category: 'General', year: '2024', cutoff: 'Score 120+' },
    ],
    scholarships: [
      { name: 'Manipal Merit Scholarship', amount: 'Up to 75% tuition waiver', eligibility: 'JEE Main 95+ percentile', type: 'Merit-based' },
    ],
  },
];

export const AI_SEARCH_PROMPTS = [
  'Best colleges for B.Tech CSE under ₹8L total fees',
  'Colleges with strong placements in Maharashtra',
  'Affordable MBA colleges with good ROI in Mumbai',
  'Colleges with hostel and campus facilities for B.Tech',
  'B.Tech CSE colleges accepting MH-CET in Pune',
  'Private engineering colleges with placement above 85%',
];

export const POPULAR_SEARCHES = [
  { label: 'B.Tech CSE', icon: '💻', count: '48,293 searches' },
  { label: 'MBA', icon: '📊', count: '32,841 searches' },
  { label: 'MBBS', icon: '🏥', count: '28,102 searches' },
  { label: 'Engineering', icon: '⚙️', count: '61,487 searches' },
  { label: 'Computer Science', icon: '🖥️', count: '41,209 searches' },
  { label: 'Affordable Colleges', icon: '💰', count: '19,384 searches' },
  { label: 'B.Arch', icon: '🏗️', count: '12,847 searches' },
  { label: 'Law (LLB)', icon: '⚖️', count: '15,623 searches' },
];

export const ADMISSION_UPDATES = [
  {
    id: 'au1',
    type: 'deadline',
    college: 'IIT Bombay',
    title: 'JoSAA Round 5 Seat Allotment',
    date: '2026-10-15',
    daysLeft: 15,
    urgent: true,
  },
  {
    id: 'au2',
    type: 'opening',
    college: 'COEP Pune',
    title: 'MHT-CET Cap Round 3 Registration Opens',
    date: '2026-10-18',
    daysLeft: 18,
    urgent: false,
  },
  {
    id: 'au3',
    type: 'cutoff',
    college: 'BITS Pilani',
    title: 'BITSAT 2026 Expected Cutoff Released',
    date: '2026-10-10',
    daysLeft: 10,
    urgent: true,
  },
  {
    id: 'au4',
    type: 'notification',
    college: 'NMIMS Mumbai',
    title: 'NMAT 2026 Registration Deadline',
    date: '2026-10-20',
    daysLeft: 20,
    urgent: false,
  },
];

export const STUDENT_PROFILE = {
  name: 'Arjun Mehta',
  avatar: 'AM',
  course: 'B.Tech CSE',
  exam: 'JEE Main',
  percentile: 87,
  budget: '₹6–8L',
  location: 'Maharashtra',
  hostel: true,
  priorities: ['Placements', 'ROI', 'Location'],
  searchProgress: 72,
  savedColleges: ['coep', 'vjti', 'bits-pilani'],
  compareList: ['coep', 'vjti', 'manipal'],
};

export const RANKINGS_DATA = COLLEGES.map((c, i) => ({
  ...c,
  overallRank: i + 1,
  roiRank: i + 2,
  placementRank: i + 1,
}));

export function getCollegeById(id: string): College | undefined {
  return COLLEGES.find(c => c.id === id);
}

export function searchColleges(query: string, filters?: {
  state?: string;
  minFees?: number;
  maxFees?: number;
  minPlacement?: number;
  type?: string;
}): College[] {
  let results = [...COLLEGES];
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.courses.some(co => co.branch?.toLowerCase().includes(q) || co.name.toLowerCase().includes(q))
    );
  }
  if (filters?.state) results = results.filter(c => c.state === filters.state);
  if (filters?.maxFees) results = results.filter(c => c.totalFees <= filters.maxFees!);
  if (filters?.minPlacement) results = results.filter(c => c.placementPercent >= filters.minPlacement!);
  if (filters?.type) results = results.filter(c => c.ownership === filters.type);
  return results;
}

export function simulateAIMatch(collegeId: string, profile: typeof STUDENT_PROFILE): {
  matchPercent: number;
  admissionProbability: number;
  whyMatches: string[];
  concerns: string[];
} {
  const matchMap: Record<string, number> = {
    'coep': 94,
    'vjti': 89,
    'bits-pilani': 78,
    'manipal': 71,
    'iit-bombay': 62,
    'nmims': 55,
  };
  const probMap: Record<string, number> = {
    'coep': 78,
    'vjti': 82,
    'bits-pilani': 45,
    'manipal': 88,
    'iit-bombay': 12,
    'nmims': 65,
  };
  return {
    matchPercent: matchMap[collegeId] ?? 70,
    admissionProbability: probMap[collegeId] ?? 60,
    whyMatches: ['Matches budget', 'In Maharashtra', 'Strong placements', 'Hostel available'],
    concerns: ['Limited CSE-specific data', 'Admission is competitive'],
  };
}
