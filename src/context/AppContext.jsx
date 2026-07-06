import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialCampaigns = [
  {
    id: 1,
    title: "Support Little Aarav's Critical Heart Transplant Surgery",
    category: "Healthcare",
    tagline: "Aarav is only 4 years old and needs a heart transplant to survive.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=800",
    goal: 1200000,
    raised: 845000,
    donorsCount: 342,
    daysLeft: 12,
    hospitalName: "Apollo Hospital, Delhi",
    doctorName: "Dr. K. M. Cherian (Cardiologist)",
    verified: true,
    documentUrl: "#",
    documentName: "Apollo_Medical_Certificate_Aarav.pdf",
    budget: [
      { item: "Donor Heart Harvesting & Transport", cost: 350000 },
      { item: "Surgical Team Fee & OT Charges", cost: 450000 },
      { item: "ICU Stay & Post-Op Medications", cost: 300000 },
      { item: "Post-transplant Rehab", cost: 100000 }
    ],
    story: "Four-year-old Aarav has been diagnosed with end-stage dilated cardiomyopathy. His heart is functioning at only 15% capacity. Doctors at Apollo Hospital have stated that an immediate heart transplant is his only chance of survival. Aarav's father works as a delivery partner and has exhausted all his savings on initial diagnostics and hospitalization. The cost of the transplant surgery is ₹12 Lakhs, an amount far beyond the family's reach. Your contribution can give this young child a second lease on life.",
    faqs: [
      { q: "Is the case genuine?", a: "Yes, this case is fully verified by Apollo Hospital Delhi. All medical documents are uploaded and reviewed by our clinical panel." },
      { q: "Where will my donation go?", a: "100% of your donation is transferred directly to the Apollo Hospital account specifically created for Aarav's surgery under audit." }
    ],
    updates: [
      { date: "2026-07-04", title: "Aarav admitted to pre-op ICU", content: "Aarav has been moved to the cardiac ICU to stabilize his vitals while we await a matching donor heart. Thank you for your support!" },
      { date: "2026-06-28", title: "Campaign Launched", content: "Campaign was launched to raise ₹12,0,000. Let's join hands to save Aarav." }
    ]
  },
  {
    id: 2,
    title: "Sponsor Digital Learning Labs for 5 Rural Schools",
    category: "Education",
    tagline: "Bridging the digital divide for 1,200 rural students in Bihar.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    goal: 600000,
    raised: 240000,
    donorsCount: 118,
    daysLeft: 25,
    schoolName: "Life Trust Rural Academies, Bihar",
    verified: true,
    documentUrl: "#",
    documentName: "Bihar_Rural_School_Approvals.pdf",
    budget: [
      { item: "25 Laptops & Keyboards", cost: 375000 },
      { item: "High-Speed Internet Router & Setup", cost: 50000 },
      { item: "Solar Power Backup (Inverters & Panels)", cost: 120000 },
      { item: "Digital Literacy Tutor Salary (6 Months)", cost: 55000 }
    ],
    story: "In the digital age, computer education is a basic right. However, children in the rural blocks of Gaya, Bihar, have never even touched a computer. Project LIFE is setting up digital classrooms equipped with computers, internet, and solar power in 5 rural schools. This project will enable 1,200+ students from grades 5 to 10 to learn coding, basic digital tools, and access online learning resources. We have partnered with local tutors to ensure regular classes. Help us prepare these children for a brighter future.",
    faqs: [
      { q: "How will progress be tracked?", a: "We will post monthly reports on attendance, computer literacy scores, and school videos on the dashboard." }
    ],
    updates: [
      { date: "2026-07-01", title: "Solar panels ordered", content: "Thanks to the initial ₹2.4 Lakhs raised, we have ordered the solar power backups for the first school." }
    ]
  },
  {
    id: 3,
    title: "Emergency Care for Priya's Cancer Chemotherapy",
    category: "Healthcare",
    tagline: "Help Priya fight Stage 3 Breast Cancer and support her young kids.",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800",
    goal: 800000,
    raised: 310000,
    donorsCount: 154,
    daysLeft: 18,
    hospitalName: "Tata Memorial Hospital, Mumbai",
    doctorName: "Dr. S. Banavali (Oncologist)",
    verified: true,
    documentUrl: "#",
    documentName: "Tata_Memorial_Priya_Chemo.pdf",
    budget: [
      { item: "Chemotherapy Cycles (6 cycles)", cost: 360000 },
      { item: "Targeted Immunotherapy Drugs", cost: 240000 },
      { item: "Hospital Bed, Nurse & Diagnostic Labs", cost: 200000 }
    ],
    story: "Priya (32) is a single mother of two young school-going children. Six months ago, she noticed a lump which was later diagnosed as Stage 3 Breast Cancer. She has already undergone surgery, but to prevent recurrence, she urgently needs 6 cycles of chemotherapy followed by targeted immunotherapy. Her medical bills have already wiped out their meager savings. The cost of chemotherapy drugs and targeted therapy at Tata Memorial Hospital is ₹8 Lakhs. She needs our support to finish her treatment and return home to her kids.",
    faqs: [],
    updates: []
  },
  {
    id: 4,
    title: "Send 50 Underprivileged Girls to High School",
    category: "Education",
    tagline: "Provide scholarships, boarding, and textbooks for girl child education.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    goal: 450000,
    raised: 390000,
    donorsCount: 205,
    daysLeft: 15,
    schoolName: "Life Trust Academy, Pune",
    verified: true,
    documentUrl: "#",
    documentName: "Scholarship_Beneficiaries_List.pdf",
    budget: [
      { item: "Annual Tuition Fee for 50 Girls", cost: 250000 },
      { item: "Textbooks, Stationeries & Uniforms", cost: 100000 },
      { item: "Sanitary Kits & Health Checkups", cost: 50000 },
      { item: "Mentorship & Career Counselling Camps", cost: 50000 }
    ],
    story: "In many rural and semi-urban households near Pune, financial hardships force parents to stop their daughters' education after primary school. Project LIFE has identified 50 meritorious girls from marginalized families who are at risk of dropping out. We are providing a comprehensive 1-year scholarship that covers school fees, books, uniforms, and mentorship. By educating a girl, we empower a whole family. Support our mission to keep these girls in school.",
    faqs: [],
    updates: []
  },
  {
    id: 5,
    title: "Reconstructive Surgery for Accident Survivor Rajesh",
    category: "Healthcare",
    tagline: "Rajesh needs urgent orthopaedic implant surgery to walk again.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    goal: 500000,
    raised: 480000,
    donorsCount: 220,
    daysLeft: 4,
    hospitalName: "AIIMS, New Delhi",
    doctorName: "Dr. Rajesh Malhotra (Orthopedics)",
    verified: true,
    documentUrl: "#",
    documentName: "AIIMS_AdmitCard_Rajesh.pdf",
    budget: [
      { item: "Titanium Implants & Bone Grafting", cost: 280000 },
      { item: "Surgical Fees & Anesthesia", cost: 120000 },
      { item: "Post-Op Physiotherapy (3 Months)", cost: 100000 }
    ],
    story: "Rajesh (24), a sole breadwinner for his family, met with a severe road accident that shattered his pelvic bone and right femur. He has been bedridden for three months. Doctors at AIIMS have suggested a complex reconstructive surgery with titanium implants. Without this surgery, he might remain permanently disabled. The target is ₹5,00,000, and we have raised ₹4,80,000. Just ₹20,000 more can put Rajesh back on his feet and help him earn for his family again.",
    faqs: [],
    updates: []
  }
];

const initialDonations = [
  { id: "TXN1001", donorName: "Amit Sharma", email: "amit.sharma@gmail.com", pan: "ABCPS1234K", amount: 5000, date: "2026-07-05", campaignId: 1, campaignTitle: "Support Little Aarav's Critical Heart Transplant Surgery", isAnonymous: false, isMonthly: false, receiptNo: "80G-2026-0123" },
  { id: "TXN1002", donorName: "Sneha Patel", email: "sneha.p@yahoo.com", pan: "XYZPD9876J", amount: 2501, date: "2026-07-04", campaignId: 3, campaignTitle: "Emergency Care for Priya's Cancer Chemotherapy", isAnonymous: false, isMonthly: true, receiptNo: "80G-2026-0124" },
  { id: "TXN1003", donorName: "Anonymous", email: "anonymous@life.org", pan: "", amount: 10000, date: "2026-07-03", campaignId: 2, campaignTitle: "Sponsor Digital Learning Labs for 5 Rural Schools", isAnonymous: true, isMonthly: false, receiptNo: "80G-2026-0125" },
  { id: "TXN1004", donorName: "Rohan Verma", email: "rohan.v@gmail.com", pan: "DEFTR4567M", amount: 1001, date: "2026-07-02", campaignId: 4, campaignTitle: "Send 50 Underprivileged Girls to High School", isAnonymous: false, isMonthly: false, receiptNo: "80G-2026-0126" },
  { id: "TXN1005", donorName: "Vikram Malhotra", email: "vikram@malhotragroup.in", pan: "AAACM9090L", amount: 50000, date: "2026-06-30", campaignId: 1, campaignTitle: "Support Little Aarav's Critical Heart Transplant Surgery", isAnonymous: false, isMonthly: false, receiptNo: "80G-2026-0127" }
];

const initialVolunteers = [
  { id: 1, name: "Kunal Gupta", tasksCompleted: 14, points: 1400, referralCount: 8, location: "Delhi" },
  { id: 2, name: "Ananya Iyer", tasksCompleted: 11, points: 1100, referralCount: 12, location: "Mumbai" },
  { id: 3, name: "Rahul Deshmukh", tasksCompleted: 9, points: 900, referralCount: 5, location: "Pune" },
  { id: 4, name: "Pooja Reddy", tasksCompleted: 8, points: 800, referralCount: 9, location: "Hyderabad" }
];

const initialTasks = [
  { id: 1, title: "Translate Aarav's Story into Hindi", points: 100, category: "Translation", status: "Pending", desc: "Translate the heart transplant campaign description into Hindi for wider reach." },
  { id: 2, title: "Organize Book Collection Drive in Pune", points: 300, category: "Ground Event", status: "Pending", desc: "Coordinate with local housing societies to collect textbooks and uniforms." },
  { id: 3, title: "Verify documents for new school case", points: 150, category: "Online Verification", status: "In Progress", desc: "Review scholarship and board certification papers for Life Trust School, Nagpur." },
  { id: 4, title: "Create WhatsApp flyers for Girls Education", points: 100, category: "Social Media", status: "Completed", desc: "Design a striking mobile poster sharing success stories of girls sponsored." }
];

const initialCsrProposals = [
  { id: 1, companyName: "Tata Consultancy Services (TCS)", projectTitle: "Digital India Literacy Hubs", budgetRequested: 2500000, status: "Under Review", date: "2026-06-25", description: "Requesting CSR grant to fund complete computer labs, networking, and teachers for 25 schools across rural Maharashtra." },
  { id: 2, companyName: "Infosys Foundation", projectTitle: "Pediatric Heart Surgeries", budgetRequested: 1500000, status: "Approved", date: "2026-06-20", description: "Co-funding critical open heart surgeries for 15 children from low-income families at Narayana Health." }
];

const initialHospitalCases = [
  { id: "HOS001", patientName: "Sumit (6m)", condition: "Congenital Heart Disease", hospital: "Max Healthcare, Gurgaon", doctor: "Dr. Neeraj Awasthy", budgetNeeded: 450000, status: "Pending Approval", date: "2026-07-05", docName: "Max_Sumit_VSD_Case.pdf" }
];

const initialSchoolCases = [
  { id: "SCH001", schoolName: "Gramin Shiksha Kendra, Wardha", studentCount: 85, requirements: "Desks, Blackboards & Science Kits", budgetNeeded: 180000, status: "Pending Approval", date: "2026-07-04", docName: "Gramin_Wardha_Proposal.pdf" }
];

// Pre-registered users for all 6 roles
const initialUsers = [
  { email: "donor@projectlife.org", password: "password", name: "Sneha Patel", role: "donor" },
  { email: "volunteer@projectlife.org", password: "password", name: "Kunal Gupta", role: "volunteer" },
  { email: "csr@projectlife.org", password: "password", name: "Vikram Malhotra", role: "csr", organization: "Tata Consultancy Services (TCS)" },
  { email: "hospital@projectlife.org", password: "password", name: "Dr. Amit Verma", role: "hospital", organization: "Max Healthcare, Gurgaon" },
  { email: "school@projectlife.org", password: "password", name: "Sister Mary", role: "school", organization: "Gramin Shiksha Kendra, Wardha" },
  { email: "admin@projectlife.org", password: "password", name: "Chairperson Shalini", role: "admin" }
];

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'about', 'transparency', 'dashboard'
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  
  // Auth Session States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('life_session_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [userRegistry, setUserRegistry] = useState(() => {
    const saved = localStorage.getItem('life_user_registry');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Database States
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('life_campaigns');
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('life_donations');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('life_volunteers');
    return saved ? JSON.parse(saved) : initialVolunteers;
  });

  const [volunteerTasks, setVolunteerTasks] = useState(() => {
    const saved = localStorage.getItem('life_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [csrProposals, setCsrProposals] = useState(() => {
    const saved = localStorage.getItem('life_csr');
    return saved ? JSON.parse(saved) : initialCsrProposals;
  });

  const [hospitalCases, setHospitalCases] = useState(() => {
    const saved = localStorage.getItem('life_hospital_cases');
    return saved ? JSON.parse(saved) : initialHospitalCases;
  });

  const [schoolCases, setSchoolCases] = useState(() => {
    const saved = localStorage.getItem('life_school_cases');
    return saved ? JSON.parse(saved) : initialSchoolCases;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New donation received", message: "Amit Sharma donated ₹5,000 to Aarav's Surgery.", time: "10 mins ago", read: false },
    { id: 2, title: "Campaign verified", message: "Campaign 'Send 50 Underprivileged Girls to High School' is now live.", time: "1 day ago", read: true }
  ]);

  // Sync to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('life_session_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('life_session_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('life_user_registry', JSON.stringify(userRegistry));
  }, [userRegistry]);

  useEffect(() => {
    localStorage.setItem('life_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('life_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('life_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('life_tasks', JSON.stringify(volunteerTasks));
  }, [volunteerTasks]);

  useEffect(() => {
    localStorage.setItem('life_csr', JSON.stringify(csrProposals));
  }, [csrProposals]);

  useEffect(() => {
    localStorage.setItem('life_hospital_cases', JSON.stringify(hospitalCases));
  }, [hospitalCases]);

  useEffect(() => {
    localStorage.setItem('life_school_cases', JSON.stringify(schoolCases));
  }, [schoolCases]);

  // Auth Operations
  const loginUser = (email, password) => {
    const user = userRegistry.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      setCurrentUser({
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || null,
        isLoggedIn: true
      });
      setActiveTab('dashboard');
      return { success: true };
    }
    return { success: false, message: "Invalid email credentials or password." };
  };

  const signupUser = (details) => {
    // Check if email already exists
    const exists = userRegistry.some(u => u.email.toLowerCase() === details.email.toLowerCase());
    if (exists) {
      return { success: false, message: "A profile with this email address already exists." };
    }

    const newUser = {
      email: details.email,
      password: details.password,
      name: details.name,
      role: details.role,
      organization: details.organization || ""
    };

    // Add to local database
    setUserRegistry(prev => [...prev, newUser]);
    
    // Automatically log in
    setCurrentUser({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      organization: newUser.organization || null,
      isLoggedIn: true
    });

    // If signed up as volunteer, add to volunteers list
    if (details.role === 'volunteer') {
      const vExists = volunteers.some(v => v.name.toLowerCase() === details.name.toLowerCase());
      if (!vExists) {
        setVolunteers(prev => [...prev, {
          id: prev.length + 1,
          name: details.name,
          tasksCompleted: 0,
          points: 0,
          referralCount: 0,
          location: details.location || "Online"
        }]);
      }
    }

    setActiveTab('dashboard');
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const resetPasswordUser = (email, newPassword) => {
    const exists = userRegistry.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      return { success: false, message: "Email not found in our database." };
    }

    setUserRegistry(prev => 
      prev.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, password: newPassword } : u)
    );
    return { success: true };
  };

  // Actions
  const addDonation = (donationDetails) => {
    const txnId = "TXN" + Math.floor(1000 + Math.random() * 9000);
    const receiptNo = "80G-2026-" + Math.floor(1000 + Math.random() * 9000);
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newTxn = {
      id: txnId,
      donorName: donationDetails.isAnonymous ? "Anonymous" : donationDetails.name,
      email: donationDetails.email,
      pan: donationDetails.pan || "",
      amount: parseFloat(donationDetails.amount),
      date: currentDate,
      campaignId: donationDetails.campaignId,
      campaignTitle: donationDetails.campaignTitle,
      isAnonymous: donationDetails.isAnonymous,
      isMonthly: donationDetails.isMonthly,
      receiptNo
    };

    // Update donations array
    setDonations(prev => [newTxn, ...prev]);

    // Update campaigns raised amount
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(c => {
        if (c.id === donationDetails.campaignId) {
          return {
            ...c,
            raised: c.raised + parseFloat(donationDetails.amount),
            donorsCount: c.donorsCount + 1
          };
        }
        return c;
      })
    );

    // Add push notification
    const donorDisplay = donationDetails.isAnonymous ? "An anonymous donor" : donationDetails.name;
    const newNotif = {
      id: Date.now(),
      title: "New Donation Received!",
      message: `${donorDisplay} donated ₹${parseFloat(donationDetails.amount).toLocaleString('en-IN')} to "${donationDetails.campaignTitle}"`,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Return txn info for receipt generation
    return newTxn;
  };

  const submitHospitalCase = (newCase) => {
    const newRecord = {
      ...newCase,
      id: "HOS" + Math.floor(100 + Math.random() * 900),
      status: "Pending Approval",
      date: new Date().toISOString().split('T')[0]
    };
    setHospitalCases(prev => [newRecord, ...prev]);
    
    setNotifications(prev => [
      {
        id: Date.now(),
        title: "Medical Case Submitted",
        message: `Case for ${newCase.patientName} (${newCase.condition}) has been submitted for verification.`,
        time: "Just now",
        read: false
      },
      ...prev
    ]);
  };

  const submitSchoolCase = (newCase) => {
    const newRecord = {
      ...newCase,
      id: "SCH" + Math.floor(100 + Math.random() * 900),
      status: "Pending Approval",
      date: new Date().toISOString().split('T')[0]
    };
    setSchoolCases(prev => [newRecord, ...prev]);
    
    setNotifications(prev => [
      {
        id: Date.now(),
        title: "Educational Proposal Submitted",
        message: `School request for "${newCase.schoolName}" has been submitted for verification.`,
        time: "Just now",
        read: false
      },
      ...prev
    ]);
  };

  const submitCsrProposal = (proposal) => {
    const newProposal = {
      ...proposal,
      id: csrProposals.length + 1,
      status: "Under Review",
      date: new Date().toISOString().split('T')[0]
    };
    setCsrProposals(prev => [newProposal, ...prev]);
  };

  const approveHospitalCase = (caseId) => {
    const caseToApprove = hospitalCases.find(c => c.id === caseId);
    if (!caseToApprove) return;

    // Create a new campaign from the approved case
    const newCampaign = {
      id: campaigns.length + 1,
      title: `Urgent Medical Treatment for ${caseToApprove.patientName}`,
      category: "Healthcare",
      tagline: `Help fund the ${caseToApprove.condition} treatment at ${caseToApprove.hospital}.`,
      image: "https://images.unsplash.com/photo-1504813184591-01592f2409bc?auto=format&fit=crop&q=80&w=800",
      goal: caseToApprove.budgetNeeded,
      raised: 0,
      donorsCount: 0,
      daysLeft: 30,
      hospitalName: caseToApprove.hospital,
      doctorName: caseToApprove.doctor,
      verified: true,
      documentUrl: "#",
      documentName: caseToApprove.docName,
      budget: [
        { item: "Operation and Anesthetic charges", cost: Math.floor(caseToApprove.budgetNeeded * 0.6) },
        { item: "Medicines & Hospital Stay", cost: Math.floor(caseToApprove.budgetNeeded * 0.4) }
      ],
      story: `Medical Case approved by Admin. Patient ${caseToApprove.patientName} is undergoing treatment for ${caseToApprove.condition} under ${caseToApprove.doctor} at ${caseToApprove.hospital}. The family requires funding support of ₹${caseToApprove.budgetNeeded.toLocaleString('en-IN')}. Please support.`,
      faqs: [],
      updates: []
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setHospitalCases(prev => prev.map(c => c.id === caseId ? { ...c, status: "Approved" } : c));
  };

  const approveSchoolCase = (caseId) => {
    const caseToApprove = schoolCases.find(c => c.id === caseId);
    if (!caseToApprove) return;

    // Create a new campaign
    const newCampaign = {
      id: campaigns.length + 1,
      title: `Educational Infrastructure for ${caseToApprove.schoolName}`,
      category: "Education",
      tagline: `Help fund ${caseToApprove.requirements} for ${caseToApprove.studentCount} students.`,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
      goal: caseToApprove.budgetNeeded,
      raised: 0,
      donorsCount: 0,
      daysLeft: 45,
      schoolName: caseToApprove.schoolName,
      verified: true,
      documentUrl: "#",
      documentName: caseToApprove.docName,
      budget: [
        { item: "Equipment Purchase & Setup", cost: Math.floor(caseToApprove.budgetNeeded * 0.7) },
        { item: "Logistics & Teacher training", cost: Math.floor(caseToApprove.budgetNeeded * 0.3) }
      ],
      story: `Educational infrastructure request approved by Admin. ${caseToApprove.schoolName} is in urgent need of funding support for ${caseToApprove.requirements}. This initiative directly impacts ${caseToApprove.studentCount} children. Please sponsor.`,
      faqs: [],
      updates: []
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setSchoolCases(prev => prev.map(c => c.id === caseId ? { ...c, status: "Approved" } : c));
  };

  const claimVolunteerTask = (taskId, volunteerName) => {
    setVolunteerTasks(prev => 
      prev.map(t => t.id === taskId ? { ...t, status: "In Progress" } : t)
    );
    setNotifications(prev => [
      {
        id: Date.now(),
        title: "Task Claimed",
        message: `${volunteerName} is now working on: "${volunteerTasks.find(t => t.id === taskId)?.title}"`,
        time: "Just now",
        read: false
      },
      ...prev
    ]);
  };

  const completeVolunteerTask = (taskId, volunteerName) => {
    const task = volunteerTasks.find(t => t.id === taskId);
    if (!task) return;

    setVolunteerTasks(prev => 
      prev.map(t => t.id === taskId ? { ...t, status: "Completed" } : t)
    );

    // Add points to volunteer leaderboard
    setVolunteers(prev => 
      prev.map(v => {
        if (v.name === volunteerName) {
          return {
            ...v,
            tasksCompleted: v.tasksCompleted + 1,
            points: v.points + task.points
          };
        }
        return v;
      })
    );

    setNotifications(prev => [
      {
        id: Date.now(),
        title: "Task Completed!",
        message: `${volunteerName} completed "${task.title}" and earned ${task.points} points.`,
        time: "Just now",
        read: false
      },
      ...prev
    ]);
  };

  // Mock AI Generator
  const runAiCampaignGenerator = (cause, amount) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const title = cause.toLowerCase().includes("cancer") 
          ? `Fight Cancer: Support chemotherapy treatments for underprivileged children`
          : `Empower education: Support books, bags and benches for rural classrooms`;
        
        const story = `Every child deserves a healthy life and a fair chance to learn. Today, we are launching an urgent fundraising initiative to bridge the gap for children who face economic barriers. Under this campaign, we aim to cover medical and study materials to relieve the burden on struggling families. The target of ₹${parseInt(amount).toLocaleString('en-IN')} has been audited down to core essential items to ensure 100% efficiency. Every rupee raised is tracked transparently on the Project LIFE blockchain ledger. Your micro-donation can spark a massive wave of hope.`;
        
        const budget = [
          { item: "Primary medical/educational kits supply", cost: Math.floor(amount * 0.5) },
          { item: "Logistics and on-ground deployment by volunteers", cost: Math.floor(amount * 0.3) },
          { item: "Emergency reserve fund & audit reporting", cost: Math.floor(amount * 0.2) }
        ];

        resolve({ title, story, budget });
      }, 800);
    });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      userRegistry,
      currentCampaignId,
      activeTab,
      campaigns,
      donations,
      volunteers,
      volunteerTasks,
      csrProposals,
      hospitalCases,
      schoolCases,
      notifications,
      setCurrentCampaignId,
      setActiveTab,
      loginUser,
      signupUser,
      logoutUser,
      resetPasswordUser,
      addDonation,
      submitHospitalCase,
      submitSchoolCase,
      submitCsrProposal,
      approveHospitalCase,
      approveSchoolCase,
      claimVolunteerTask,
      completeVolunteerTask,
      runAiCampaignGenerator
    }}>
      {children}
    </AppContext.Provider>
  );
};
