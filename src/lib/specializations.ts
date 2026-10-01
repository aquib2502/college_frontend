// Specialization tracks shown on the homepage (prototype/demo figures).
export interface Specialization {
  id: string;
  title: string;
  short: string;
  description: string;
  medianPackage: number; // lakhs
  placementRate: number; // %
  collegesCount: number;
  image: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    id: 'cs',
    title: 'Computer Science & AI',
    short: 'CS & AI',
    description: 'System software, distributed infrastructure, and applied machine learning.',
    medianPackage: 9.4,
    placementRate: 91,
    collegesCount: 420,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'vlsi',
    title: 'Electronics & VLSI',
    short: 'Electronics',
    description: 'Semiconductor design, embedded systems, microcontrollers and silicon tapeout.',
    medianPackage: 8.1,
    placementRate: 86,
    collegesCount: 310,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'mech',
    title: 'Mechanical & Robotics',
    short: 'Robotics',
    description: 'Autonomous robotics, kinematics, thermal systems and precision automation.',
    medianPackage: 6.8,
    placementRate: 79,
    collegesCount: 280,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'mgmt',
    title: 'Management & Finance',
    short: 'Management',
    description: 'Quantitative finance, product strategy, consulting operations and analytics.',
    medianPackage: 11.2,
    placementRate: 88,
    collegesCount: 240,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=70',
  },
];
