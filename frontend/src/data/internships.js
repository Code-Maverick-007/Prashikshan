// Import all the logo images from your assets folder
import internshalaLogo from './img/internshala_og_image.jpg';
import digitalIndiaLogo from './img/digital_india_logo.png';
import ibmLogo from './img/IBM_logo.svg.png';
import infosysLogo from './img/Infosys_logo.svg.png';
import nasaLogo from './img/nasa logo.webp';
import nitiAayogLogo from './img/NITI_Aayog_logo.svg';
import qualcommLogo from './img/Qualcomm-Logo.wine.png';
import tcsLogo from './img/tcs logo.png';
import unicefLogo from './img/unicef logo.jpg';

export const mockInternships = [
  // --- Existing 9 Entries ---
  { 
    id: 1, 
    title: 'Digital India Internship Scheme', 
    company: 'Govt. of India', 
    logo: digitalIndiaLogo,
    location: 'Delhi', 
    stipend: 10000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '5 days ago', 
    skills: ['Policy Research', 'Data Analysis', 'Documentation'], 
    duration: '2 months', 
    description: 'An opportunity to work with the Ministry of Electronics and Information Technology on key Digital India initiatives.', 
    applyLink: '#'
  },
  { 
    id: 2, 
    title: 'AI Research Intern', 
    company: 'IBM', 
    logo: ibmLogo,
    location: 'Bangalore', 
    stipend: 45000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '2 days ago', 
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Research'], 
    duration: '6 months', 
    description: 'Contribute to IBM\'s leading AI research projects, working on novel algorithms and models.', 
    applyLink: '#'
  },
  { 
    id: 3, 
    title: 'Systems Engineer Intern', 
    company: 'Infosys', 
    logo: infosysLogo,
    location: 'Pune', 
    stipend: 25000, 
    type: 'Internship+PPO', 
    status: 'Registration Closed', 
    deadlinePassed: true, 
    postedAgo: '18 days ago', 
    skills: ['Java', 'SQL', 'SDLC', 'Problem Solving'], 
    duration: '3 months', 
    description: 'Part of the Infosys Instep internship program, working on real-world client projects and software development.', 
    applyLink: '#'
  },
  { 
    id: 4, 
    title: 'Web Development Work From Home', 
    company: 'Internshala', 
    logo: internshalaLogo,
    location: 'Remote', 
    stipend: 12000, 
    type: 'Remote', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: 'Updated daily', 
    skills: ['React', 'Node.js', 'MongoDB', 'Web Development'], 
    duration: '3 months', 
    description: 'Flexible remote internships in web development, perfect for students to gain practical skills.', 
    applyLink: '#'
  },
  { 
    id: 5, 
    title: 'Aerospace Engineering Intern', 
    company: 'NASA', 
    logo: nasaLogo,
    location: 'Remote Collaboration', 
    stipend: 0, 
    type: 'Research', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '1 month ago', 
    skills: ['Aerodynamics', 'MATLAB', 'CFD', 'Physics'], 
    duration: '4 months', 
    description: 'Participate in a virtual NASA internship program, contributing to ongoing aerospace research and data analysis projects.', 
    applyLink: '#'
  },
  
  { 
    id: 7, 
    title: 'Wireless R&D Intern (5G)', 
    company: 'Qualcomm', 
    logo: qualcommLogo,
    location: 'Hyderabad', 
    stipend: 50000, 
    type: 'Internship', 
    status: 'Position Closed', 
    deadlinePassed: true, 
    postedAgo: '22 days ago', 
    skills: ['C++', 'Wireless Communication', '5G', 'LTE'], 
    duration: '6 months', 
    description: 'Join the world leader in wireless technology to work on the future of 5G and beyond.', 
    applyLink: '#'
  },
  { 
    id: 8, 
    title: 'Software Development Intern', 
    company: 'Tata Consultancy Services', 
    logo: tcsLogo,
    location: 'Mumbai', 
    stipend: 20000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '8 days ago', 
    skills: ['Java', 'Spring Boot', 'Angular', 'SQL'], 
    duration: '4 months', 
    description: 'Gain experience in a large-scale enterprise environment, working on diverse software projects for global clients.', 
    applyLink: '#'
  },
  { 
    id: 9, 
    title: 'Data for Good Intern', 
    company: 'UNICEF', 
    logo: unicefLogo,
    location: 'Remote', 
    stipend: 0, 
    type: 'Volunteer', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '3 days ago', 
    skills: ['Data Analysis', 'R', 'Statistics', 'Tableau'], 
    duration: '3 months', 
    description: 'Use your data analysis skills to contribute to UNICEF projects that aim to improve the lives of children worldwide.', 
    applyLink: '#'
  },
  
  // --- 10 NEW ENTRIES (Renumbered to start from 10) ---
  { 
    id: 10,
    title: 'Software Engineering Intern', 
    company: 'Google', 
    logo: infosysLogo, // Using placeholder logo
    location: 'Bengaluru', 
    stipend: 80000, 
    type: 'Internship+PPO', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '1 day ago', 
    skills: ['Data Structures', 'Algorithms', 'C++', 'Python'], 
    duration: '3 months', 
    description: 'Join the Google STEP program to work on core products and services. Open to 2nd year students.', 
    applyLink: '#'
  },
  { 
    id: 11,
    title: 'Cloud Support Associate Intern', 
    company: 'Amazon Web Services', 
    logo: tcsLogo, // Using placeholder logo
    location: 'Hyderabad', 
    stipend: 40000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '4 days ago', 
    skills: ['Cloud Computing', 'Networking', 'Linux', 'AWS'], 
    duration: '6 months', 
    description: 'Provide technical support to AWS customers, helping them resolve complex cloud infrastructure issues.', 
    applyLink: '#'
  },
  { 
    id: 12,
    title: 'Research Fellow Intern', 
    company: 'Microsoft Research', 
    logo: ibmLogo, // Using placeholder logo
    location: 'Remote', 
    stipend: 65000, 
    type: 'Research', 
    status: 'Position Closed', 
    deadlinePassed: true, 
    postedAgo: '1 month ago', 
    skills: ['Machine Learning', 'Research', 'PyTorch', 'Academic Writing'], 
    duration: '6 months', 
    description: 'Collaborate with world-class researchers on cutting-edge projects in artificial intelligence and systems.', 
    applyLink: '#'
  },
  { 
    id: 13,
    title: 'Product Design Intern', 
    company: 'Zomato', 
    logo: internshalaLogo, // Using placeholder logo
    location: 'Gurgaon', 
    stipend: 22000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '9 days ago', 
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'], 
    duration: '4 months', 
    description: 'Design intuitive and delightful user experiences for one of India\'s leading food delivery platforms.', 
    applyLink: '#'
  },
  { 
    id: 14,
    title: 'Data Analyst Intern', 
    company: 'Swiggy', 
    logo: qualcommLogo, // Using placeholder logo
    location: 'Bengaluru', 
    stipend: 30000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '6 days ago', 
    skills: ['SQL', 'Tableau', 'Excel', 'Data Analysis', 'Python'], 
    duration: '6 months', 
    description: 'Analyze user behavior, logistics data, and market trends to derive actionable insights for Swiggy\'s operations.', 
    applyLink: '#'
  },
  { 
    id: 15,
    title: 'SDE Intern', 
    company: 'Flipkart', 
    logo: nasaLogo, // Using placeholder logo
    location: 'Bengaluru', 
    stipend: 55000, 
    type: 'Internship+PPO', 
    status: 'Position Closed', 
    deadlinePassed: true, 
    postedAgo: '25 days ago', 
    skills: ['Java', 'Data Structures', 'Backend', 'System Design'], 
    duration: '2 months', 
    description: 'Work in a fast-paced e-commerce environment, building scalable backend systems and services.', 
    applyLink: '#'
  },
  { 
    id: 16,
    title: 'Network Engineering Intern', 
    company: 'Reliance Jio', 
    logo: digitalIndiaLogo, // Using placeholder logo
    location: 'Mumbai', 
    stipend: 18000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '11 days ago', 
    skills: ['Networking', 'TCP/IP', 'Routing', 'Switching'], 
    duration: '6 months', 
    description: 'Get hands-on experience with one of the largest telecom networks in the world.', 
    applyLink: '#'
  },
  { 
    id: 17,
    title: 'UI/UX Design Intern', 
    company: 'Adobe', 
    logo: nitiAayogLogo, // Using placeholder logo
    location: 'Noida', 
    stipend: 70000, 
    type: 'Internship', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '7 days ago', 
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'], 
    duration: '3 months', 
    description: 'Join the Adobe Design team to work on creative tools used by millions of professionals worldwide.', 
    applyLink: '#'
  },
  { 
    id: 18,
    title: 'Finance Technology Intern', 
    company: 'Goldman Sachs', 
    logo: unicefLogo, // Using placeholder logo
    location: 'Bengaluru', 
    stipend: 90000, 
    type: 'Internship+PPO', 
    status: 'ACTIVE', 
    deadlinePassed: false, 
    postedAgo: '14 days ago', 
    skills: ['Java', 'Python', 'Financial Markets', 'Algorithms'], 
    duration: '3 months', 
    description: 'Develop and support the software that powers global financial markets. A high-impact role for quantitative minds.', 
    applyLink: '#'
  },
  { 
    id: 19,
    title: 'Database Management Intern', 
    company: 'Oracle', 
    logo: ibmLogo, // Using placeholder logo
    location: 'Remote', 
    stipend: 45000, 
    type: 'Remote', 
    status: 'Registration Closed', 
    deadlinePassed: true, 
    postedAgo: '3 weeks ago', 
    skills: ['SQL', 'Oracle DB', 'Database Administration', 'PL/SQL'], 
    duration: '6 months', 
    description: 'Learn to manage and optimize large-scale Oracle databases in a remote, flexible environment.', 
    applyLink: '#'
  }
];