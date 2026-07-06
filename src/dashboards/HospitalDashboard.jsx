import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Layout, Plus, FileText, CheckCircle, Upload, ShieldCheck, Heart } from 'lucide-react';

export default function HospitalDashboard() {
  const { hospitalCases, submitHospitalCase } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('cases'); // 'metrics' | 'cases' | 'submit'

  // Form states
  const [patientName, setPatientName] = useState('');
  const [condition, setCondition] = useState('');
  const [budgetNeeded, setBudgetNeeded] = useState('');
  const [doctor, setDoctor] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !condition || !budgetNeeded) return;

    submitHospitalCase({
      patientName,
      condition,
      hospital: "Max Healthcare, Gurgaon",
      doctor: doctor || "Dr. Amit Verma",
      budgetNeeded: parseFloat(budgetNeeded),
      docName: "Max_Patient_Report_" + patientName.replace(/\s+/g, '') + ".pdf"
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setPatientName('');
      setCondition('');
      setBudgetNeeded('');
      setDoctor('');
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
          <strong style={{ color: 'white', fontSize: '15px', fontFamily: 'var(--font-title)', display: 'block' }}>Hospital Portal</strong>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Clinical Workspace</span>
        </div>

        {[
          { id: 'metrics', label: "Registry Metrics", icon: <Layout size={16} /> },
          { id: 'cases', label: "Case Manager", icon: <FileText size={16} /> },
          { id: 'submit', label: "Submit New Case", icon: <Plus size={16} /> }
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
        
        {/* TAB 1: REGISTRY METRICS */}
        {activeTab === 'metrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="grid-3">
              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Registry Cases</span>
                <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginTop: '8px' }}>{hospitalCases.length} Patients</h3>
              </div>
              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Funding Completed</span>
                <h3 style={{ fontSize: '24px', color: 'var(--secondary)', marginTop: '8px' }}>{hospitalCases.filter(c => c.status === 'Approved').length} Cases</h3>
              </div>
              <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Heart size={24} color="var(--primary)" />
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Hospital Partner</span>
                  <strong style={{ display: 'block', fontSize: '14.5px' }}>Max Healthcare</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CASE MANAGER */}
        {activeTab === 'cases' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Clinical Case Registry</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Patient Name</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Clinical Condition</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Required Budget</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalCases.map((c, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>{c.date}</td>
                      <td style={{ padding: '12px', fontWeight: '600' }}>{c.patientName}</td>
                      <td style={{ padding: '12px' }}>{c.condition}</td>
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

        {/* TAB 3: SUBMIT NEW CASE */}
        {activeTab === 'submit' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Register New Patient Case</h4>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Patient Name & Age</label>
                  <input 
                    type="text" 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                    placeholder="e.g. Sumit (6 months)" 
                    required 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Surgeon / Attending Doctor</label>
                  <input 
                    type="text" 
                    value={doctor} 
                    onChange={(e) => setDoctor(e.target.value)} 
                    placeholder="Dr. Neeraj Awasthy" 
                    className="form-control" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Medical Condition</label>
                  <input 
                    type="text" 
                    value={condition} 
                    onChange={(e) => setCondition(e.target.value)} 
                    placeholder="e.g. Congenital Heart Disease" 
                    required 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Audited Treatment Cost (₹)</label>
                  <input 
                    type="number" 
                    value={budgetNeeded} 
                    onChange={(e) => setBudgetNeeded(e.target.value)} 
                    placeholder="e.g. 450000" 
                    required 
                    className="form-control" 
                  />
                </div>
              </div>

              <div className="form-group" style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '2px dashed #cbd5e1', textAlign: 'center' }}>
                <input 
                  type="file" 
                  id="file-upload" 
                  style={{ display: 'none' }} 
                  onChange={() => setFileUploaded(true)} 
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Upload size={24} color="var(--primary)" />
                  <span style={{ fontSize: '13.5px', color: 'var(--text)', fontWeight: '600' }}>
                    {fileUploaded ? "✔ Medical Certification PDF Attached" : "Upload Doctor Diagnostics & Hospital Estimate PDF"}
                  </span>
                </label>
              </div>

              {successMsg ? (
                <div style={{ color: 'var(--success)', fontWeight: '600' }}>✔ Patient case submitted for Admin verification approval!</div>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Submit Case
                </button>
              )}
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
