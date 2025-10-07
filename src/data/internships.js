// This file contains all internship data for the application.

export const internshipsData = [
    { 
      id: 1, title: 'Backend Developer', company: 'Wipro', mode: 'Onsite', location: 'Pune', 
      duration: 6, stipend: 20000, nepEligible: false, 
      skills: ['Java', 'Spring Boot', 'MySQL', 'APIs', 'Finance'],
      status: 'Available',
      overview: 'This role focuses on server-side web application logic and integration of the work front-end developers do.',
      responsibilities: ['Build robust backend services', 'Design and implement RESTful APIs', 'Work with databases'],
      deadline: '2025-12-10', facultyApproval: true,
    },
    { 
      id: 2, title: 'Frontend Developer', company: 'TechSolutions', mode: 'Remote', location: 'Remote', 
      duration: 3, stipend: 8000, nepEligible: true, 
      skills: ['React.js', 'HTML', 'CSS', 'Communication', 'IT'],
      status: 'Ongoing',
      overview: 'Join our dynamic team to build and maintain user-facing features.',
      responsibilities: ['Develop new user-facing features using React.js', 'Build reusable components', 'Optimize applications for speed'],
      deadline: '2025-11-30', facultyApproval: true,
    },
    { 
      id: 3, title: 'AI/ML Intern', company: 'TCS', mode: 'Remote', location: 'Remote', 
      duration: 4, stipend: 22000, nepEligible: true, 
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'IT'],
      status: 'Available',
      overview: 'Explore the exciting field of Artificial Intelligence and develop models that solve complex challenges.',
      responsibilities: ['Train and deploy machine learning models', 'Perform data preprocessing', 'Research and implement AI/ML algorithms'],
      deadline: '2025-11-20', facultyApproval: false,
    },
    { 
      id: 4, title: 'Data Analyst Intern', company: 'Deloitte', mode: 'Hybrid', location: 'Bengaluru', 
      duration: 6, stipend: 15000, nepEligible: true, 
      skills: ['SQL', 'Python', 'Data Visualization', 'Tableau', 'Finance'],
      status: 'Pending Approval',
      overview: 'Work with large datasets to extract meaningful insights and create visualizations.',
      responsibilities: ['Interpret data and analyze results', 'Develop databases and data collection systems', 'Maintain data sources'],
      deadline: '2025-10-15', facultyApproval: false,
    },
];


// Focused list for dashboard widget (reuse details from internshipsData where sensible)
export const activeInternshipsData = [
  { id: 'web-dev-123', title: 'Web Developer - TechSolutions', dates: 'Jan 2026 - Jun 2026', mentor: 'Riya Sharma', status: 'Ongoing' },
  { id: 'data-analyst-456', title: 'Data Analyst - FinCorp', dates: 'Sep 2025 - Dec 2025', mentor: 'Amit Singh', status: 'Pending Approval' }
];