import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Layout, Plus, FileText, CheckCircle, Upload, BookOpen } from 'lucide-react';

export default function SchoolDashboard() {
  const { schoolCases, submitSchoolCase } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('cases'); // 'metrics' | 'cases' | 'submit'

  // Form states
  const [schoolName, setSchoolName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [budgetNeeded, setBudgetNeeded] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schoolName || !requirements || !budgetNeeded) return;

    submitSchoolCase({
      schoolName,
      requirements,
      studentCount: parseInt(studentCount) || 100,
      budgetNeeded: parseFloat(budgetNeeded),
      docName: "School_Proposal_" + schoolName.replace(/\s+/g, '') + ".pdf"
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSchoolName('');
      setRequirements('');
      setStudentCount('');
      setBudgetNeeded('');
      setFileUploaded(false);
      setActiveTab('cases'); // Redirect back to case logs
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '30px', minHeight: '65vh', textAlign: 'left' }}>
      
      {/* LEFT SIDEBAR NAVIGATION MENU */}
      <div className="glass-panel" style={{
        background: '#0f172a',
        width: '220px',
        borderRadius: '20px',
        padding: '24px 16px',
        color: '#94a3b8',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexShrink: 0
      }}>
        <div style={{ padding: '0 12px 16px', borderBottom: '1px solid #1e293b', marginBottom: '12px' }}>
          <strong style={{ color: 'white', fontSize: '15px', fontFamily: 'var(--font-title)', display: 'block' }}>School Portal</strong>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Academy Workspace</span>
        </div>

        {[
          { id: 'metrics', label: "Academy Overview", icon: <Layout size={16} /> },
          { id: 'cases', label: "Infrastructure Requests", icon: <FileText size={16} /> },
          { id: 'submit', label: "Submit Proposal", icon: <Plus size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#94a3b8',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* RIGHT CONTENT WORKSPACE */}
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        
        {/* TAB 1: ACADEMY OVERVIEW */}
        {activeTab === 'metrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="grid-3">
              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Grant Requests</span>
                <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginTop: '8px' }}>{schoolCases.length} Proposals</h3>
              </div>
              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Funding Completed</span>
                <h3 style={{ fontSize: '24px', color: 'var(--secondary)', marginTop: '8px' }}>{schoolCases.filter(c => c.status === 'Approved').length} Projects</h3>
              </div>
              <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <BookOpen size={24} color="var(--primary)" />
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>School Partner</span>
                  <strong style={{ display: 'block', fontSize: '14.5px' }}>Gramin Kendra</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INFRASTRUCTURE REQUESTS */}
        {activeTab === 'cases' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Infrastructure Grant Proposals</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>School Name</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Resource Requirements</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Students Impacted</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Required Budget</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolCases.map((c, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>{c.date}</td>
                      <td style={{ padding: '12px', fontWeight: '600' }}>{c.schoolName}</td>
                      <td style={{ padding: '12px' }}>{c.requirements}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{c.studentCount} children</td>
                      <td style={{ padding: '12px', textAlign: 'right', color: 'var(--primary)', fontWeight: '750' }}>₹{c.budgetNeeded.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span className={`badge ${c.status === 'Approved' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SUBMIT PROPOSAL */}
        {activeTab === 'submit' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Submit Educational Grant Proposal</h4>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>School Institution Name</label>
                  <input 
                    type="text" 
                    value={schoolName} 
                    onChange={(e) => setSchoolName(e.target.value)} 
                    placeholder="e.g. Gramin Shiksha Kendra, Wardha" 
                    required 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Total Student Strength</label>
                  <input 
                    type="number" 
                    value={studentCount} 
                    onChange={(e) => setStudentCount(e.target.value)} 
                    placeholder="e.g. 85" 
                    className="form-control" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Items Needed / Proposal Focus</label>
                  <input 
                    type="text" 
                    value={requirements} 
                    onChange={(e) => setRequirements(e.target.value)} 
                    placeholder="e.g. Desks, Blackboards & Science Kits" 
                    required 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Required Funding Budget (₹)</label>
                  <input 
                    type="number" 
                    value={budgetNeeded} 
                    onChange={(e) => setBudgetNeeded(e.target.value)} 
                    placeholder="e.g. 180000" 
                    required 
                    className="form-control" 
                  />
                </div>
              </div>

              <div className="form-group" style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '2px dashed #cbd5e1', textAlign: 'center' }}>
                <input 
                  type="file" 
                  id="school-file-upload" 
                  style={{ display: 'none' }} 
                  onChange={() => setFileUploaded(true)} 
                />
                <label htmlFor="school-file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Upload size={24} color="var(--primary)" />
                  <span style={{ fontSize: '13.5px', color: 'var(--text)', fontWeight: '600' }}>
                    {fileUploaded ? "✔ School Board Certification Attached" : "Upload Institutional Affiliation & Budget Breakdowns PDF"}
                  </span>
                </label>
              </div>

              {successMsg ? (
                <div style={{ color: 'var(--success)', fontWeight: '600' }}>✔ School proposal submitted for verification!</div>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Submit Proposal
                </button>
              )}
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
