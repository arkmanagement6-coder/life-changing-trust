import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Check, ShieldCheck, Mail, Send, Sparkles, AlertTriangle, 
  Play, RefreshCw, Search, Filter, Download, UserCheck, 
  TrendingUp, ShieldAlert, Users, FolderPlus, CreditCard, 
  Settings, Layers, Ban, CheckCircle, Edit3, X, FileText, ArrowRight
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    donations, 
    hospitalCases, 
    schoolCases, 
    approveHospitalCase, 
    approveSchoolCase,
    runAiCampaignGenerator,
    campaigns,
    getDonorSegment,
    getCrmAnalytics,
    auditLogs,
    userRegistry,
    toggleBlockUser,
    changeUserRole,
    editUser,
    refundDonation,
    cmsBanners,
    setCmsBanners,
    cmsBlogs,
    setCmsBlogs
  } = useContext(AppContext);

  // Left Sidebar Module Navigation
  // 'overview' | 'users' | 'campaigns' | 'donations' | 'crm' | 'cms' | 'security'
  const [activeModule, setActiveModule] = useState('overview');

  // CMS Form States
  const [bannerHeadline, setBannerHeadline] = useState(cmsBanners?.headline || '');
  const [bannerSubheading, setBannerSubheading] = useState(cmsBanners?.subheading || '');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('Chairperson Shalini');

  // User Profile Editing States
  const [editingUserEmail, setEditingUserEmail] = useState(null);
  const [editingUserName, setEditingUserName] = useState('');

  // Campaign Builder States
  const [newCampTitle, setNewCampTitle] = useState('');
  const [newCampCategory, setNewCampCategory] = useState('Healthcare');
  const [newCampTagline, setNewCampTagline] = useState('');
  const [newCampGoal, setNewCampGoal] = useState('');
  const [newCampStory, setNewCampStory] = useState('');
  const [newCampBudgetItems, setNewCampBudgetItems] = useState([
    { item: "Operations & Logistics", cost: 100000 },
    { item: "Direct Supplies delivery", cost: 100000 }
  ]);

  // AI Campaign Studio states
  const [aiCause, setAiCause] = useState('Pediatric Leukemia treatment');
  const [aiAmount, setAiAmount] = useState('500000');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Filters & Search Terms
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  
  const [donSearch, setDonSearch] = useState('');
  const [donCampFilter, setDonCampFilter] = useState('All');
  const [donStatusFilter, setDonStatusFilter] = useState('All');

  const crmStats = getCrmAnalytics();

  // CSV Exporter for Users Directory
  const handleExportUsersCsv = () => {
    const headers = ["Name", "Email", "Role", "Organization", "Status", "Creation Date", "Activity Count"];
    const rows = userRegistry.map(u => [
      u.name,
      u.email,
      u.role,
      u.organization || 'N/A',
      u.blocked ? "Blocked" : "Active",
      u.creationDate || 'N/A',
      u.activityCount || 0
    ].map(field => `"${field}"`).join(","));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")].concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Project_LIFE_User_Directory.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Exporter for Donations
  const handleExportDonationsCsv = () => {
    const headers = ["Txn ID", "Donor Name", "Email", "Amount", "Date", "Campaign", "Status", "Receipt No"];
    const rows = donations.map(d => [
      d.id,
      d.donorName,
      d.email,
      d.amount,
      d.date,
      d.campaignTitle,
      d.status || 'Success',
      d.receiptNo
    ].map(field => `"${field}"`).join(","));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")].concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Project_LIFE_Donations_Ledger.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CMS Handlers
  const handleUpdateBanners = (e) => {
    e.preventDefault();
    setCmsBanners({
      headline: bannerHeadline,
      subheading: bannerSubheading
    });
    alert("✔ Homepage banner content updated in CMS! Head over to 'Home' to check it out.");
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;
    const newPost = {
      id: cmsBlogs.length + 1,
      title: newBlogTitle,
      content: newBlogContent,
      author: newBlogAuthor,
      date: new Date().toISOString().split('T')[0]
    };
    setCmsBlogs([newPost, ...cmsBlogs]);
    setNewBlogTitle('');
    setNewBlogContent('');
    alert("✔ Blog post published successfully!");
  };

  // User Profile Modifier
  const handleStartEditUser = (u) => {
    setEditingUserEmail(u.email);
    setEditingUserName(u.name);
  };

  const handleSaveEditUser = (email) => {
    editUser(email, { name: editingUserName });
    setEditingUserEmail(null);
    alert("✔ Profile name updated successfully!");
  };

  // Campaign Builder submit handler
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampTitle || !newCampGoal) return;

    campaigns.push({
      id: campaigns.length + 1,
      title: newCampTitle,
      category: newCampCategory,
      tagline: newCampTagline,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      goal: parseFloat(newCampGoal),
      raised: 0,
      donorsCount: 0,
      daysLeft: 30,
      verified: true,
      budget: newCampBudgetItems,
      story: newCampStory || newCampTagline,
      faqs: [],
      updates: []
    });

    setNewCampTitle('');
    setNewCampGoal('');
    setNewCampTagline('');
    setNewCampStory('');
    alert("✔ New campaign published successfully in active grids!");
  };

  const handleAiWrite = async () => {
    setIsAiLoading(true);
    const result = await runAiCampaignGenerator(aiCause, aiAmount);
    setAiResult(result);
    setIsAiLoading(false);
  };

  const handlePublishAiCampaign = () => {
    if (!aiResult) return;
    campaigns.push({
      id: campaigns.length + 1,
      title: aiResult.title,
      category: "Healthcare",
      tagline: aiResult.title,
      image: "https://images.unsplash.com/photo-1504813184591-01592f2409bc?auto=format&fit=crop&q=80&w=800",
      goal: parseFloat(aiAmount),
      raised: 0,
      donorsCount: 0,
      daysLeft: 30,
      verified: true,
      budget: aiResult.budget,
      story: aiResult.story,
      faqs: [],
      updates: []
    });
    alert("✔ AI-generated campaign published live in active grids!");
  };

  // Filtered Users List
  const filteredUsers = userRegistry.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Filtered Donations List
  const filteredDonations = donations.filter(d => {
    const matchesSearch = d.donorName.toLowerCase().includes(donSearch.toLowerCase()) || d.email.toLowerCase().includes(donSearch.toLowerCase());
    const matchesCamp = donCampFilter === 'All' || d.campaignTitle.includes(donCampFilter);
    const matchesStatus = donStatusFilter === 'All' || (d.status || 'Success') === donStatusFilter;
    return matchesSearch && matchesCamp && matchesStatus;
  });

  // CRM Segment Groups
  const highValueDonors = donations.filter(d => getDonorSegment(d.email) === 'High Value');
  const loyalDonors = donations.filter(d => getDonorSegment(d.email) === 'Loyal');
  const lapsedDonors = donations.filter(d => {
    // Mock Lapsed: last transaction was months ago
    return d.date.includes("2026-06") || d.date.includes("2026-05");
  });

  return (
    <div style={{ display: 'flex', gap: '30px', minHeight: '75vh' }}>
      
      {/* 1. LEFT SIDEBAR NAVIGATION (Salesforce / HubSpot command hub style) */}
      <div className="glass-panel" style={{
        background: '#0f172a',
        width: '240px',
        borderRadius: '20px',
        padding: '24px 16px',
        color: '#94a3b8',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexShrink: 0
      }}>
        <div style={{ padding: '0 12px 16px', borderBottom: '1px solid #1e293b', marginBottom: '12px' }}>
          <strong style={{ color: 'white', fontSize: '15px', fontFamily: 'var(--font-title)', display: 'block' }}>Ecosystem CRM</strong>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Operations Command Center</span>
        </div>

        {[
          { id: 'overview', label: "Admin Dashboard", icon: <TrendingUp size={16} /> },
          { id: 'users', label: "User Management", icon: <Users size={16} /> },
          { id: 'campaigns', label: "Campaign Studio", icon: <FolderPlus size={16} /> },
          { id: 'donations', label: "Donation Ledger", icon: <CreditCard size={16} /> },
          { id: 'crm', label: "CRM Segmentation", icon: <Layers size={16} /> },
          { id: 'cms', label: "CMS Website Editor", icon: <Settings size={16} /> },
          { id: 'security', label: "Security & Fraud Logs", icon: <ShieldAlert size={16} /> }
        ].map(mod => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeModule === mod.id ? 'var(--primary)' : 'transparent',
              color: activeModule === mod.id ? 'white' : '#94a3b8',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            {mod.icon}
            <span>{mod.label}</span>
          </button>
        ))}
      </div>

      {/* 2. MAIN MODULE DISPLAY SCREEN */}
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        
        {/* MODULE 1: ADMIN DASHBOARD OVERVIEW */}
        {activeModule === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Visual SVG Trend line (HubSpot Analytics style) */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '18px' }}>Weekly Donation Settlement Volume</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time payment gateway transaction trend indexes.</span>
                </div>
                <span className="badge badge-success">✔ Gateway Online</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {/* SVG Line Chart */}
                <svg width="100%" height="160" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="70" x2="480" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="120" x2="480" y2="120" stroke="#f8fafc" strokeWidth="1.5" />
                  
                  {/* Chart Line Path */}
                  <path 
                    d="M 50 120 Q 120 70 200 90 T 350 40 T 480 20" 
                    fill="none" 
                    stroke="var(--primary)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />

                  {/* Nodes dots */}
                  <circle cx="50" cy="120" r="4" fill="var(--primary)" />
                  <circle cx="120" cy="70" r="4" fill="var(--primary)" />
                  <circle cx="200" cy="90" r="4" fill="var(--primary)" />
                  <circle cx="350" cy="40" r="4" fill="var(--primary)" />
                  <circle cx="480" cy="20" r="6" fill="var(--secondary)" stroke="white" strokeWidth="2" />
                  
                  <text x="50" y="140" fontSize="9" fill="var(--text-muted)">Mon</text>
                  <text x="120" y="140" fontSize="9" fill="var(--text-muted)">Wed</text>
                  <text x="200" y="140" fontSize="9" fill="var(--text-muted)">Fri</text>
                  <text x="350" y="140" fontSize="9" fill="var(--text-muted)">Sun</text>
                  <text x="480" y="140" fontSize="9" fill="var(--text-muted)">Today</text>
                </svg>
              </div>
            </div>

            {/* Campaign conversion stats */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Top Active Campaigns Rank</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {campaigns.slice(0, 3).map(c => {
                  const percent = Math.floor((c.raised / c.goal) * 100);
                  return (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <strong>{c.title}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Category: {c.category} • Donors: {c.donorsCount}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '14.5px', fontWeight: '750', color: 'var(--primary)' }}>₹{c.raised.toLocaleString('en-IN')}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{percent}% of Goal</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* MODULE 2: USER MANAGEMENT */}
        {activeModule === 'users' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '18px' }}>Ecosystem Users Directory</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Audit trust permissions, roles, and profiles.</span>
              </div>
              <button onClick={handleExportUsersCsv} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Download size={14} />
                <span>Export Users Directory CSV</span>
              </button>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input 
                  type="text" 
                  placeholder="Search user profiles by name, email..." 
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <Filter size={14} color="var(--text-muted)" />
                <select 
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: '600', fontSize: '13px' }}
                >
                  <option value="All">All User Roles</option>
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="csr">CSR Corporate Partner</option>
                  <option value="hospital">Hospital Partner</option>
                  <option value="school">School Partner</option>
                  <option value="admin">NGO Admin</option>
                </select>
              </div>
            </div>

            {/* Grid Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>User Details</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Role Type</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Registration Date</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Session Status</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>
                        {editingUserEmail === u.email ? (
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              value={editingUserName} 
                              onChange={(e) => setEditingUserName(e.target.value)}
                              className="form-control"
                              style={{ padding: '4px 8px', fontSize: '12.5px', width: '150px' }}
                            />
                            <button onClick={() => handleSaveEditUser(u.email)} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '11px' }}>Save</button>
                            <button onClick={() => setEditingUserEmail(null)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>Cancel</button>
                          </div>
                        ) : (
                          <div>
                            <strong>{u.name}</strong>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{u.email}</div>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={u.role}
                          onChange={(e) => changeUserRole(u.email, e.target.value)}
                          style={{
                            padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1',
                            fontSize: '12px', fontWeight: '600', color: 'var(--text)'
                          }}
                        >
                          <option value="donor">Donor</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="csr">CSR Partner</option>
                          <option value="hospital">Hospital Partner</option>
                          <option value="school">School Partner</option>
                          <option value="admin">NGO Admin</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{u.creationDate || '2026-03-01'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span className={`badge ${u.blocked ? 'badge-emergency' : 'badge-success'}`} style={{ fontSize: '9px' }}>
                          {u.blocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleStartEditUser(u)} 
                          className="btn btn-outline" 
                          style={{ padding: '4px 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Edit3 size={10} />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => toggleBlockUser(u.email)} 
                          className="btn btn-outline" 
                          style={{ 
                            padding: '4px 8px', fontSize: '11px', 
                            color: u.blocked ? 'var(--success)' : 'var(--emergency)',
                            borderColor: u.blocked ? 'var(--success)' : 'var(--emergency)',
                            display: 'inline-flex', alignItems: 'center', gap: '4px'
                          }}
                        >
                          <Ban size={10} />
                          <span>{u.blocked ? "Unblock" : "Block"}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 3: CAMPAIGN STUDIO */}
        {activeModule === 'campaigns' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Pending Approvals Widget */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Pending Approvals Stack</h4>
              
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Hospital Patient Proposals</h5>
                {hospitalCases.filter(c => c.status === 'Pending Approval').length > 0 ? (
                  hospitalCases.filter(c => c.status === 'Pending Approval').map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', background: '#f8fafc', marginBottom: '10px' }}>
                      <div>
                        <strong>[Hospital Case] Patient {c.patientName} - {c.condition}</strong>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Center: {c.hospital} • Doctor: {c.doctor} • Budget: ₹{c.budgetNeeded.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <button onClick={() => approveHospitalCase(c.id)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                        <Check size={14} />
                        <span>Approve & Launch</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No pending hospital cases.</p>
                )}
              </div>

              <div>
                <h5 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>School Infrastructure Proposals</h5>
                {schoolCases.filter(c => c.status === 'Pending Approval').map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', background: '#f8fafc' }}>
                    <div>
                      <strong>[School Case] {c.schoolName} - {c.requirements}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Enrollment: {c.studentCount} children • Budget: ₹{c.budgetNeeded.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button onClick={() => approveSchoolCase(c.id)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                      <Check size={14} />
                      <span>Approve & Launch</span>
                    </button>
                  </div>
                ))}
                {schoolCases.filter(c => c.status === 'Pending Approval').length === 0 && (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No pending school cases.</p>
                )}
              </div>
            </div>

            {/* Campaign Creator Form */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Create New Campaign Initiative</h4>
              <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Campaign Title</label>
                    <input 
                      type="text" 
                      value={newCampTitle} 
                      onChange={(e) => setNewCampTitle(e.target.value)} 
                      placeholder="e.g. Higher Education Sponsorships Pune"
                      required 
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Focus Category</label>
                    <select 
                      value={newCampCategory} 
                      onChange={(e) => setNewCampCategory(e.target.value)} 
                      className="form-control"
                      style={{ fontWeight: '600' }}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Tagline Description</label>
                    <input 
                      type="text" 
                      value={newCampTagline} 
                      onChange={(e) => setNewCampTagline(e.target.value)} 
                      placeholder="e.g. Support secondary tuition for underprivileged girls."
                      required 
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Goal Amount (₹)</label>
                    <input 
                      type="number" 
                      value={newCampGoal} 
                      onChange={(e) => setNewCampGoal(e.target.value)} 
                      placeholder="e.g. 500000"
                      required 
                      className="form-control" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Complete Campaign narrative description</label>
                  <textarea 
                    rows="4" 
                    value={newCampStory} 
                    onChange={(e) => setNewCampStory(e.target.value)} 
                    className="form-control"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Publish Live Campaign
                </button>
              </form>
            </div>

            {/* AI Copywriting tool */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--primary)" />
                <span>AI Campaign Writer Studio</span>
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Generate professional templates for hospital patient stories or school book drives using AI.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label>Medical/Educational Cause Focus</label>
                  <input 
                    type="text" 
                    value={aiCause} 
                    onChange={(e) => setAiCause(e.target.value)} 
                    className="form-control" 
                  />
                </div>
                
                <div className="form-group">
                  <label>Target Funding Goal (₹)</label>
                  <input 
                    type="number" 
                    value={aiAmount} 
                    onChange={(e) => setAiAmount(e.target.value)} 
                    className="form-control" 
                  />
                </div>

                <button onClick={handleAiWrite} className="btn btn-primary" disabled={isAiLoading} style={{ alignSelf: 'flex-start' }}>
                  {isAiLoading ? 'AI writing script running...' : 'Generate Copy Draft'}
                </button>

                {aiResult && (
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '16px', fontSize: '13px' }}>
                    <strong style={{ display: 'block', marginBottom: '6px' }}>Generated Headline:</strong>
                    <p style={{ fontWeight: '600', color: 'var(--primary)' }}>{aiResult.title}</p>
                    <strong style={{ display: 'block', margin: '12px 0 6px' }}>Generated Narrative Copy:</strong>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{aiResult.story}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* MODULE 4: DONATION MANAGEMENT & REFUNDS */}
        {activeModule === 'donations' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '18px' }}>Donation Transaction Ledger</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Monitor payment gateways, receipts dispatches, and refunds.</span>
              </div>
              <button onClick={handleExportDonationsCsv} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Download size={14} />
                <span>Export Ledger CSV</span>
              </button>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input 
                  type="text" 
                  placeholder="Search donor contact names, emails..." 
                  value={donSearch}
                  onChange={(e) => setDonSearch(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '36px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <Filter size={14} color="var(--text-muted)" />
                <select 
                  value={donCampFilter}
                  onChange={(e) => setDonCampFilter(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: '600', fontSize: '13px' }}
                >
                  <option value="All">All Campaigns</option>
                  <option value="Aarav">Aarav Heart Transplant</option>
                  <option value="Priya">Priya Chemotherapy</option>
                  <option value="Girls">Girls Education Pune</option>
                  <option value="Learning">Digital Labs Bihar</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <Filter size={14} color="var(--text-muted)" />
                <select 
                  value={donStatusFilter}
                  onChange={(e) => setDonStatusFilter(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: '600', fontSize: '13px' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Success">Success (Settled)</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            {/* Donation List grid */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Txn Date & ID</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Donor Contact</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Target Campaign</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Amount</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Gateway Status</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((d, idx) => {
                    const status = d.status || 'Success';
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px' }}>
                          <strong>{d.id}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{d.date}</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <strong>{d.donorName}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{d.email}</div>
                        </td>
                        <td style={{ padding: '12px' }}>{d.campaignTitle.substring(0, 40)}...</td>
                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: '750', color: 'var(--primary)' }}>₹{d.amount.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span className={`badge ${status === 'Refunded' ? 'badge-emergency' : 'badge-success'}`} style={{ fontSize: '9px' }}>
                            {status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          {status === 'Success' ? (
                            <button 
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to refund ₹${d.amount.toLocaleString('en-IN')} to ${d.donorName}?`)) {
                                  refundDonation(d.id);
                                }
                              }}
                              className="btn btn-outline" 
                              style={{ 
                                padding: '4px 8px', fontSize: '11px', 
                                color: 'var(--emergency)', borderColor: 'var(--emergency)'
                              }}
                            >
                              Refund
                            </button>
                          ) : (
                            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600' }}>Settled</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 5: CRM SEGMENTATION */}
        {activeModule === 'crm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Ecosystem CRM Segmentation Analysis</h4>
              
              <div className="grid-3">
                {/* High Value */}
                <div style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', background: '#f8fafc' }}>
                  <span className="badge badge-emergency" style={{ fontSize: '9px', marginBottom: '8px' }}>High Value Donors</span>
                  <strong style={{ display: 'block', fontSize: '24px' }}>₹{highValueDonors.reduce((sum, d) => sum + d.amount, 0).toLocaleString('en-IN')}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Driven by {highValueDonors.length} high value donors.
                  </span>
                </div>
                
                {/* Loyal */}
                <div style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', background: '#f8fafc' }}>
                  <span className="badge badge-primary" style={{ fontSize: '9px', marginBottom: '8px' }}>Loyal Recurring</span>
                  <strong style={{ display: 'block', fontSize: '24px' }}>{loyalDonors.length} Donors</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Giving monthly recurring subscriptions.
                  </span>
                </div>

                {/* Lapsed */}
                <div style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', background: '#f8fafc' }}>
                  <span className="badge badge-warning" style={{ fontSize: '9px', marginBottom: '8px' }}>Lapsed Donors</span>
                  <strong style={{ display: 'block', fontSize: '24px' }}>{lapsedDonors.length} Accounts</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    No donations generated since last 30 days.
                  </span>
                </div>
              </div>
            </div>

            {/* Lapsed Donors Retargeting tool */}
            {lapsedDonors.length > 0 && (
              <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
                <h4 style={{ fontSize: '17px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} color="var(--primary)" />
                  <span>Retarget Lapsed Accounts Sequence</span>
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Simulate launching a retargeting sequence to invite lapsed accounts to check out our new solar panel or girls education programs.
                </p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <button onClick={handleMarketingSend} className="btn btn-secondary">
                    Launch Retargeting Sequence
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* MODULE 6: CMS EDITOR */}
        {activeModule === 'cms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Banner Content Editor */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Manage Website Homepage Banners</h4>
              
              <form onSubmit={handleUpdateBanners} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label>Hero Title Headline</label>
                  <input 
                    type="text" 
                    value={bannerHeadline} 
                    onChange={(e) => setBannerHeadline(e.target.value)} 
                    required 
                    className="form-control" 
                  />
                </div>

                <div className="form-group">
                  <label>Hero Subheading Narrative</label>
                  <textarea 
                    rows="3" 
                    value={bannerSubheading} 
                    onChange={(e) => setBannerSubheading(e.target.value)} 
                    required 
                    className="form-control" 
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Update Homepage Banner
                </button>
              </form>
            </div>

            {/* Blog Post Writer */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Publish News & Blogs Updates</h4>
              
              <form onSubmit={handleCreateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Blog Post Title</label>
                    <input 
                      type="text" 
                      value={newBlogTitle} 
                      onChange={(e) => setNewBlogTitle(e.target.value)} 
                      placeholder="e.g. 5 Impact milestones achieved in Gaya, Bihar"
                      required 
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input 
                      type="text" 
                      value={newBlogAuthor} 
                      onChange={(e) => setNewBlogAuthor(e.target.value)} 
                      required 
                      className="form-control" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Blog post content content</label>
                  <textarea 
                    rows="4" 
                    value={newBlogContent} 
                    onChange={(e) => setNewBlogContent(e.target.value)} 
                    required 
                    className="form-control" 
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
                  Publish Newsroom Update
                </button>
              </form>
            </div>

          </div>
        )}

        {/* MODULE 7: SECURITY & AUDIT LOGS */}
        {activeModule === 'security' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="var(--primary)" />
              <span>Gateway Transaction Audits & Fraud Logs</span>
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Timestamp</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Event Log</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Severity</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Audit Checkpoint Action</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{log.date}</td>
                      <td style={{ padding: '12px' }}>
                        <strong>{log.eventType}</strong>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{log.message}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span className={`badge ${log.severity === 'High' || log.severity === 'Medium' ? 'badge-emergency' : 'badge-success'}`} style={{ fontSize: '9px' }}>
                          {log.severity}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontWeight: '600', color: 'var(--primary)' }}>{log.flags}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
