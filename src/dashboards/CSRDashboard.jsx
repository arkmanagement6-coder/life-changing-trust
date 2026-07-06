import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Briefcase, FileText, CheckCircle, Download, Send, Plus, DollarSign } from 'lucide-react';

export default function CSRDashboard() {
  const { csrProposals, submitCsrProposal } = useContext(AppContext);
  
  // Proposal submission form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [companyName, setCompanyName] = useState('Google India Corp');
  const [projectTitle, setProjectTitle] = useState('Digital Learning Centres');
  const [budgetRequested, setBudgetRequested] = useState('2000000');
  const [description, setDescription] = useState('Funding smart digital classrooms with internet and solar battery packs for primary schools in rural Karnataka.');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !projectTitle || !budgetRequested) return;
    
    submitCsrProposal({
      companyName,
      projectTitle,
      budgetRequested: parseFloat(budgetRequested),
      description
    });
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddForm(false);
      setProjectTitle('');
      setBudgetRequested('');
      setDescription('');
    }, 2000);
  };

  const handlePrintProposal = (proposal) => {
    const propHTML = `
      <div style="padding:40px; font-family:sans-serif; border:1px solid #cbd5e1; border-radius:10px; max-width:650px; margin:20px auto; color:#1e293b;">
        <div style="display:flex; justify-content:space-between; border-bottom:2px solid #FF8A00; padding-bottom:15px; margin-bottom:15px;">
          <div>
            <h2 style="color:#0F8A5F; margin:0;">Project LIFE</h2>
            <span style="font-size:12px; color:#64748b;">CSR Alliance Proposal Package</span>
          </div>
          <div style="text-align:right; font-size:12px;">
            <strong>MCA Reg ID:</strong> CSR00012345 <br/>
            Compliant under Section 135
          </div>
        </div>
        <h3 style="text-align:center;">CSR PARTNERSHIP PROPOSAL</h3>
        <div style="margin:25px 0; font-size:14px; line-height:1.7;">
          <strong>Corporate Entity:</strong> ${proposal.companyName} <br/>
          <strong>Initiative Title:</strong> ${proposal.projectTitle} <br/>
          <strong>Proposal Date:</strong> ${proposal.date} <br/>
          <strong>Proposed Budget:</strong> ₹${proposal.budgetRequested.toLocaleString('en-IN')} <br/>
          <strong>Current Status:</strong> ${proposal.status}
        </div>
        <div style="background-color:#f8fafc; padding:20px; border-radius:8px; border:1px solid #e2e8f0; font-size:13.5px; line-height:1.6; margin-bottom:30px;">
          <strong>Scope of Work:</strong> <br/>
          ${proposal.description}
        </div>
        <p style="font-size:11px; color:#64748b;">
          * Audited and submitted to the MCA CSR desk. Includes comprehensive quarterly site videos and ledger updates for corporate boards.
        </p>
      </div>
    `;
    const pri = window.open('', '_blank');
    pri.document.write(propHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.close();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Overview stats */}
      <div className="grid-3">
        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            CSR Grants Funded
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginTop: '8px' }}>
            ₹1.5 Crores
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Allocated to 15 rural development schools.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Active Projects Status
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--secondary)', marginTop: '8px' }}>
            4 Active Hubs
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Undergoing quarterly compliance audits.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            MCA Compliance Files
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--text)', marginTop: '8px' }}>
            Form CSR-1 Filed
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Verified on Ministry corporate portals.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div style={{ display: 'grid', gridTemplateColumns: showAddForm ? '1fr' : '1.5fr 1fr', gap: '30px' }}>
        
        {/* Left Column: Proposals List */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '18px' }}>My CSR Proposals & Grants</h4>
            {!showAddForm && (
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Plus size={14} />
                <span>Submit CSR Proposal</span>
              </button>
            )}
          </div>

          {showAddForm ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h5 style={{ fontSize: '16px', fontWeight: '700' }}>Submit New Grant Proposal</h5>
              
              <div className="form-group">
                <label>Company Entity Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label>Project Title / Cause Focus</label>
                <input 
                  type="text" 
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Pediatric Surgery Fund, Solar Labs"
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label>Proposed Grant Budget (₹)</label>
                <input 
                  type="number" 
                  value={budgetRequested}
                  onChange={(e) => setBudgetRequested(e.target.value)}
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label>Scope description & timeline details</label>
                <textarea 
                  rows="4" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  style={{ resize: 'none' }}
                />
              </div>

              {formSubmitted ? (
                <div style={{ color: 'var(--success)', fontWeight: '600' }}>✔ CSR Proposal successfully submitted! Directing back...</div>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline" style={{ flexGrow: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                    Submit Proposal Document
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {csrProposals.map(p => (
                <div key={p.id} style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className={`badge ${p.status === 'Approved' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '10px', marginBottom: '8px' }}>
                      {p.status}
                    </span>
                    <h5 style={{ fontSize: '16px', color: 'var(--text)' }}>{p.projectTitle}</h5>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Entity: <strong>{p.companyName}</strong> • Submitted: {p.date}
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '10px' }}>{p.description}</p>
                  </div>
                  
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
                    <strong style={{ fontSize: '16px', color: 'var(--primary)' }}>₹{p.budgetRequested.toLocaleString('en-IN')}</strong>
                    <button 
                      onClick={() => handlePrintProposal(p)}
                      className="btn btn-outline" 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <Download size={12} />
                      <span>Print PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Corporate MCA details */}
        {!showAddForm && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--primary)" />
              <span>CSR MCA Compliance Files</span>
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              All grants are settled directly in trust accounts matching MCA guidelines. We provide quarterly utilization statements (Form CSR-2 audit reports).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Project_LIFE_MCA_CSR-1_Registration.pdf', 'Audited_CSR-2_Report_FY25.pdf', 'Corporate_Utilization_Framework.pdf'].map((doc, idx) => (
                <div key={idx} onClick={() => alert(`Downloading ${doc}`)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px' }}>
                  <span style={{ fontWeight: '500' }}>{doc}</span>
                  <Download size={14} color="var(--primary)" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
