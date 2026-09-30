// Detailed Courses Data for CollegeIQ
export interface ProgramDetail {
  id: string;
  name: string;
  shortCode: string;
  level: 'UG' | 'PG' | 'PhD';
  duration: string;
  stream: 'Engineering' | 'Computer Science & AI' | 'Management' | 'Medical & Applied Sciences';
  tuitionPerYear: number; // in Lakhs
  hostelPerYear: number;
  eligibility: string;
  entranceExams: string[];
  medianPackage: number; // in Lakhs
  highestPackage: number;
  offeringCollegesCount: number;
  sampleColleges: { name: string; id: string; fees: number; medianSalary: number; location: string }[];
  description: string;
  keySubjects: string[];
  careerRoles: string[];
  semesters: { sem: string; subjects: string[] }[];
  keyHighlights: string[];
}

export const COURSES_DATA: ProgramDetail[] = [
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science & Engineering',
    shortCode: 'B.Tech CSE',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Computer Science & AI',
    tuitionPerYear: 1.8,
    hostelPerYear: 0.9,
    eligibility: '10+2 with Physics, Mathematics & Chemistry (Min 75% for JEE Advanced, 50% for state CET)',
    entranceExams: ['JEE Main', 'JEE Advanced', 'MHT-CET', 'BITSAT'],
    medianPackage: 18.5,
    highestPackage: 200,
    offeringCollegesCount: 1420,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 1.1, medianSalary: 28, location: 'Mumbai' },
      { name: 'COEP Pune', id: 'coep', fees: 1.4, medianSalary: 8.4, location: 'Pune' },
      { name: 'VJTI Mumbai', id: 'vjti', fees: 0.9, medianSalary: 7.2, location: 'Mumbai' },
      { name: 'BITS Pilani', id: 'bits-pilani', fees: 5.8, medianSalary: 18.2, location: 'Pilani' },
    ],
    description:
      'The flagship undergraduate engineering discipline focusing on algorithms, software architecture, operating systems, cloud systems, and modern AI engineering foundations. Students gain deep theoretical grounding along with modern industrial application development expertise.',
    keySubjects: [
      'Data Structures & Algorithms',
      'Computer Networks & Protocols',
      'Operating Systems & Kernel Dev',
      'Artificial Intelligence & ML',
      'Database Management Systems',
      'Distributed Systems & Cloud Computing'
    ],
    careerRoles: [
      'Software Development Engineer (SDE I/II)',
      'Cloud Architect & DevOps Engineer',
      'Systems Software Engineer',
      'AI/ML Applications Developer',
      'Quantitative Tech Analyst'
    ],
    semesters: [
      { sem: 'Semester 1-2', subjects: ['Engineering Mathematics', 'Physics & Electronics', 'C/C++ Programming & Data Structures', 'Digital Logic Design'] },
      { sem: 'Semester 3-4', subjects: ['Design & Analysis of Algorithms', 'Object-Oriented Programming (Java/Python)', 'Computer Organization & Architecture', 'Theory of Computation'] },
      { sem: 'Semester 5-6', subjects: ['Operating Systems', 'Database Management Systems', 'Computer Networks', 'Software Engineering & Microservices'] },
      { sem: 'Semester 7-8', subjects: ['Machine Learning & Deep Learning', 'Distributed Systems & Cloud', 'Information Security & Cryptography', 'Capstone Industry Project'] },
    ],
    keyHighlights: [
      'Highest placement percentage across engineering branches (92-98% in top institutes)',
      'Direct pipeline to global tech firms (Google, Microsoft, Goldman Sachs, Uber)',
      'Strong research opportunities in AI, cryptography, and systems software',
      'Flexible career paths into fintech, software startups, and product management'
    ]
  },
  {
    id: 'btech-ai-ml',
    name: 'B.Tech in Artificial Intelligence & Machine Learning',
    shortCode: 'B.Tech AI & ML',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Computer Science & AI',
    tuitionPerYear: 2.1,
    hostelPerYear: 0.9,
    eligibility: '10+2 with PCM (Min 60% aggregate)',
    entranceExams: ['JEE Main', 'MHT-CET', 'MET', 'COMEDK'],
    medianPackage: 16.8,
    highestPackage: 85,
    offeringCollegesCount: 480,
    sampleColleges: [
      { name: 'COEP Pune', id: 'coep', fees: 1.4, medianSalary: 11.2, location: 'Pune' },
      { name: 'Manipal Institute of Technology', id: 'manipal', fees: 4.8, medianSalary: 9.5, location: 'Manipal' },
      { name: 'NMIMS MPSTME', id: 'nmims', fees: 4.2, medianSalary: 8.8, location: 'Mumbai' },
    ],
    description:
      'Specialized curriculum focused on neural networks, deep learning architectures, natural language processing, computer vision, and high-performance computing on GPU clusters.',
    keySubjects: [
      'Applied Mathematics for Machine Learning',
      'Deep Neural Networks & Transformers',
      'Natural Language Processing & LLMs',
      'Computer Vision & Generative AI',
      'MLOps & Production Deployment'
    ],
    careerRoles: [
      'AI Research Engineer',
      'Machine Learning Scientist',
      'Data Scientist & NLP Specialist',
      'Robotics & Computer Vision Engineer'
    ],
    semesters: [
      { sem: 'Semester 1-2', subjects: ['Linear Algebra & Probability for AI', 'Python for Scientific Computing', 'Discrete Mathematics', 'Digital Logic'] },
      { sem: 'Semester 3-4', subjects: ['Statistical Inference', 'Data Structures & Algorithms', 'Foundations of Machine Learning', 'Big Data Engineering'] },
      { sem: 'Semester 5-6', subjects: ['Deep Learning & PyTorch', 'Computer Vision & CNNs', 'Natural Language Processing', 'MLOps & Model Optimization'] },
      { sem: 'Semester 7-8', subjects: ['Generative AI & LLM Fine-Tuning', 'Reinforcement Learning', 'AI Ethics & Explainability', 'Industrial Capstone AI Project'] },
    ],
    keyHighlights: [
      'Rapidly surging industry demand with high starting compensation',
      'Specialized labs with NVIDIA DGX systems in Tier-1 institutes',
      'High overlap with computer science core foundations'
    ]
  },
  {
    id: 'btech-ece',
    name: 'B.Tech in Electronics & Communication Engineering',
    shortCode: 'B.Tech ECE',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Engineering',
    tuitionPerYear: 1.6,
    hostelPerYear: 0.85,
    eligibility: '10+2 with Physics & Math (Min 65%)',
    entranceExams: ['JEE Main', 'JEE Advanced', 'MHT-CET', 'BITSAT'],
    medianPackage: 14.2,
    highestPackage: 65,
    offeringCollegesCount: 1200,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 1.1, medianSalary: 24, location: 'Mumbai' },
      { name: 'COEP Pune', id: 'coep', fees: 1.35, medianSalary: 8.2, location: 'Pune' },
      { name: 'VJTI Mumbai', id: 'vjti', fees: 0.88, medianSalary: 7.0, location: 'Mumbai' },
      { name: 'BITS Pilani', id: 'bits-pilani', fees: 5.8, medianSalary: 16.5, location: 'Pilani' },
    ],
    description:
      'Interdisciplinary branch bridging electronic circuits, semiconductor hardware, VLSI design, wireless communications, embedded systems, and IoT.',
    keySubjects: [
      'Analog & Digital Circuit Design',
      'VLSI & Semiconductor Physics',
      'Digital Signal Processing (DSP)',
      'Microcontrollers & Embedded Systems',
      'Wireless & Satellite Communication'
    ],
    careerRoles: [
      'VLSI Physical Design Engineer',
      'Embedded Software Engineer',
      'RF & Communications Systems Engineer',
      'Hardware Firmware Specialist'
    ],
    semesters: [
      { sem: 'Semester 1-2', subjects: ['Engineering Physics', 'Basic Electrical & Electronics', 'Calculus & Vector Spaces', 'Computer Programming'] },
      { sem: 'Semester 3-4', subjects: ['Electronic Devices & Circuits', 'Digital System Design (Verilog)', 'Network Theory', 'Signals and Systems'] },
      { sem: 'Semester 5-6', subjects: ['Microprocessors & Microcontrollers', 'Analog & Digital Communication', 'VLSI Design', 'Control Systems'] },
      { sem: 'Semester 7-8', subjects: ['Antenna Theory & Wireless Tech', 'Embedded RTOS', 'Optical Communication', 'Major Industry Project'] },
    ],
    keyHighlights: [
      'Dual eligibility for hardware semiconductor giants (Qualcomm, Intel, TI) and software firms',
      'Boosted by national semiconductor manufacturing initiatives (India Semiconductor Mission)',
      'Strong international postgraduate research opportunities'
    ]
  },
  {
    id: 'btech-mech',
    name: 'B.Tech in Mechanical Engineering',
    shortCode: 'B.Tech Mechanical',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Engineering',
    tuitionPerYear: 1.3,
    hostelPerYear: 0.8,
    eligibility: '10+2 with PCM (Min 60%)',
    entranceExams: ['JEE Main', 'JEE Advanced', 'MHT-CET'],
    medianPackage: 9.2,
    highestPackage: 45,
    offeringCollegesCount: 1600,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 1.1, medianSalary: 18, location: 'Mumbai' },
      { name: 'COEP Pune', id: 'coep', fees: 1.2, medianSalary: 7.2, location: 'Pune' },
      { name: 'VJTI Mumbai', id: 'vjti', fees: 0.85, medianSalary: 6.8, location: 'Mumbai' },
    ],
    description:
      'Classic engineering discipline dealing with thermodynamics, fluid mechanics, structural analysis, CAD/CAM, automotive engineering, robotics, and industrial manufacturing.',
    keySubjects: [
      'Thermodynamics & Heat Transfer',
      'Fluid Mechanics & Turbo Machinery',
      'Strength of Materials & FEA',
      'CAD/CAM & Digital Manufacturing',
      'Robotics & Automation'
    ],
    careerRoles: [
      'Design & Simulation Engineer (FEA/CFD)',
      'Automotive Product Engineer',
      'Manufacturing & Quality Lead',
      'Robotics Systems Engineer'
    ],
    semesters: [
      { sem: 'Semester 1-2', subjects: ['Engineering Mechanics', 'Material Science', 'Basic Electronics', 'Workshop Practice'] },
      { sem: 'Semester 3-4', subjects: ['Thermodynamics', 'Fluid Mechanics', 'Kinematics of Machinery', 'Manufacturing Technology'] },
      { sem: 'Semester 5-6', subjects: ['Heat and Mass Transfer', 'Dynamics of Machinery', 'Machine Design', 'CAD/CAM'] },
      { sem: 'Semester 7-8', subjects: ['Automobile Engineering', 'Robotics & Mechatronics', 'Operations Research', 'Industrial Project'] },
    ],
    keyHighlights: [
      'Evergreen engineering discipline with core recruiters like Tata Motors, L&T, Bajaj, Mahindra',
      'Evolving quickly into EV engineering and robotic automation',
      'Strong foundation for MBA or MS abroad'
    ]
  },
  {
    id: 'mba-tech',
    name: 'Master of Business Administration (MBA)',
    shortCode: 'MBA',
    level: 'PG',
    duration: '2 Years (4 Semesters)',
    stream: 'Management',
    tuitionPerYear: 6.5,
    hostelPerYear: 1.4,
    eligibility: 'Graduation in any discipline with Min 50% + Entrance Score',
    entranceExams: ['CAT', 'XAT', 'NMAT', 'SNAP', 'MAH-CET', 'GMAT'],
    medianPackage: 21.5,
    highestPackage: 70,
    offeringCollegesCount: 950,
    sampleColleges: [
      { name: 'NMIMS School of Business', id: 'nmims', fees: 11.5, medianSalary: 19.5, location: 'Mumbai' },
      { name: 'Symbiosis Institute of Business', id: 'symbiosis', fees: 10.2, medianSalary: 18.2, location: 'Pune' },
      { name: 'IIT Bombay (SJMSOM)', id: 'iit-bombay', fees: 5.5, medianSalary: 28.5, location: 'Mumbai' },
    ],
    description:
      'Premier postgraduate management education developing leaders in Finance, Marketing, Operations, Product Management, Strategy, and Business Analytics.',
    keySubjects: [
      'Managerial Economics & Strategy',
      'Financial Management & Valuation',
      'Marketing Analytics & Consumer Behavior',
      'Supply Chain & Operations Strategy',
      'Product Management & Technology Strategy'
    ],
    careerRoles: [
      'Product Manager',
      'Management Consultant (McKinsey, BCG, Bain)',
      'Investment Banking Analyst',
      'Brand & Marketing Manager',
      'Corporate Strategy Lead'
    ],
    semesters: [
      { sem: 'Semester 1', subjects: ['Financial Accounting', 'Organizational Behavior', 'Quantitative Methods', 'Marketing Management I'] },
      { sem: 'Semester 2', subjects: ['Corporate Finance', 'Operations Management', 'Business Analytics', 'Strategic Management'] },
      { sem: 'Semester 3 (Electives)', subjects: ['Advanced Corporate Valuation / Product Management', 'Supply Chain Analytics', 'Digital Marketing'] },
      { sem: 'Semester 4', subjects: ['Global Business Strategy', 'Mergers & Acquisitions', 'Leadership & Ethics', 'Dissertation Project'] },
    ],
    keyHighlights: [
      'Top-tier return on investment with rapid career escalation',
      'Extensive corporate internships between Year 1 and 2',
      'Extremely strong alumni networks across executive boards'
    ]
  },
  {
    id: 'mbbs',
    name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    shortCode: 'MBBS',
    level: 'UG',
    duration: '5.5 Years (including 1-yr Internship)',
    stream: 'Medical & Applied Sciences',
    tuitionPerYear: 1.2,
    hostelPerYear: 0.6,
    eligibility: '10+2 with Physics, Chemistry, Biology (Min 50% aggregate) + NEET UG Qualified',
    entranceExams: ['NEET UG'],
    medianPackage: 12.0,
    highestPackage: 30,
    offeringCollegesCount: 680,
    sampleColleges: [
      { name: 'All India Institute of Medical Sciences', id: 'aiims-delhi', fees: 0.05, medianSalary: 18, location: 'New Delhi' },
      { name: 'Grant Government Medical College', id: 'ggmc-mumbai', fees: 1.3, medianSalary: 12, location: 'Mumbai' },
      { name: 'Kasturba Medical College Manipal', id: 'manipal', fees: 16.5, medianSalary: 14, location: 'Manipal' },
    ],
    description:
      'The premier clinical undergraduate medical degree conferring registration to practice modern medicine and surgery. Combines rigorous pre-clinical, para-clinical, and clinical hospital rotations.',
    keySubjects: [
      'Human Anatomy & Histology',
      'Human Physiology & Biochemistry',
      'Pharmacology & Therapeutics',
      'Pathology & Microbiology',
      'General Medicine & General Surgery',
      'Obstetrics & Gynaecology'
    ],
    careerRoles: [
      'Resident Medical Officer (RMO)',
      'Primary Care Physician',
      'Clinical Research Associate',
      'Specialist PG Aspirant (MD/MS)'
    ],
    semesters: [
      { sem: 'Phase 1 (1 yr)', subjects: ['Anatomy', 'Physiology', 'Biochemistry'] },
      { sem: 'Phase 2 (1.5 yr)', subjects: ['Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine'] },
      { sem: 'Phase 3 Part 1 (1 yr)', subjects: ['Ophthalmology', 'ENT', 'Community Medicine'] },
      { sem: 'Phase 3 Part 2 (1 yr)', subjects: ['Medicine', 'Surgery', 'Obstetrics & Gynaecology', 'Pediatrics'] },
    ],
    keyHighlights: [
      'Prestige, high societal impact, and long-term career security',
      'NEET UG is single nationwide mandatory entrance exam',
      '1 year compulsory rotating paid clinical internship'
    ]
  }
];

export function getCourseById(id: string): ProgramDetail | undefined {
  return COURSES_DATA.find(c => c.id === id);
}
