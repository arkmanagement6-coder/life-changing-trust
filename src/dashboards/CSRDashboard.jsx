import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Briefcase, FileText, CheckCircle, Download, Send, Plus, DollarSign, Award, Users, ShieldAlert, BarChart } from 'lucide-react';

export default function CSRDashboard() {
  const { csrProposals, submitCsrProposal } = useContext(AppContext);
  
  // Tabs: 'proposals' | 'allocations' | 'impact' | 'compliance'
  const [activeTab, setActiveTab] = useState('proposals');

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
      description,
      industry: "Technology",
      contact: "CSR Program Director",
      cause: "Education",
      beneficiaries: 850
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
          <strong>Initiative Focus:</strong> ${proposal.projectTitle} <br/>
          <strong>Proposal Date:</strong> ${proposal.date} <br/>
          <strong>Proposed Budget:</strong> ₹${proposal.budgetRequested.toLocaleString('en-IN')} <br/>
          <strong>Current Status:</strong> ${proposal.status}
        </div>
        <div style="background-color:#f8fafc; padding:20px; border-radius:8px; border:1px solid #e2e8f0; font-size:13.5px; line-height:1.6; margin-bottom:30px;">
          <strong>Scope of Work:</strong> <br/>
          ${proposal.description}
        </div>
        <div style="border-top:1px solid #cbd5e1; padding-top:20px; margin-bottom:30px; font-size:12px;">
          <strong>Trust Regulatory Credentials:</strong> <br/>
          • 80G Approval Code: CIT(E)/80G/12345/2016-17 <br/>
          • 12A Registration Code: E/31940/MUM <br/>
          • MCA Form CSR-1 Registration: CSR00012345
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

  const corporateProjects = [
    { title: "Gaya Digital Education Hubs", budget: 2500000, utilized: 1800000, beneficiaries: 4500, cause: "Education", timeline: "12 Months", score: 92 },
    { title: "Narayana Pediatric Cardiology co-funding", budget: 1500000, utilized: 1500000, beneficiaries: 15, cause: "Healthcare", timeline: "6 Months", score: 98 },
    { title: "Rural Solar Panel Installations Wardha", budget: 800000, utilized: 450000, beneficiaries: 1200, cause: "Rural Development", timeline: "18 Months", score: 87 },
    { title: "Pune Women Tailoring & Skill Labs", budget: 600000, utilized: 550000, beneficiaries: 350, cause: "Women Empowerment", timeline: "8 Months", score: 95 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Overview stats */}
      <div className="grid-3">
        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            CSR Grants Deployed
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginTop: '8px' }}>
            ₹54,00,000
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Allocated across 4 active rural initiatives.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            CSR Impact Rating
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--secondary)', marginTop: '8px' }}>
            93% Score
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Audited based on beneficiary health logs.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            MCA Compliance Status
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--text)', marginTop: '8px' }}>
            MCA CSR-1 Active
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Utilization statements filed successfully.
          </p>
        </div>
      </div>

      {/* CSR Sections Toggle Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '24px' }}>
        {[
          { tab: 'proposals', label: "CSR Proposals" },
          { tab: 'allocations', label: "Project Allocations" },
          { tab: 'impact', label: "Impact & Employee engagement" },
          { tab: 'compliance', label: "MCA Compliance Center" }
        ].map(item => (
          <button 
            key={item.tab}
            onClick={() => { setActiveTab(item.tab); setShowAddForm(false); }}
            style={{
              background: 'transparent', border: 'none', padding: '12px 0',
              fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-title)',
              color: activeTab === item.tab ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === item.tab ? '3px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Subsections Content */}
      
      {/* 1. CSR Proposals */}
      {activeTab === 'proposals' && (
        <div style={{ display: 'grid', gridTemplateColumns: showAddForm ? '1fr' : '1.5fr 1fr', gap: '30px' }}>
          
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
                        <span>Print Proposal</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!showAddForm && (
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>CSR Utilizations summary</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                All corporate grants are audited by independent CAs and directly disbursed to schools and hospital billers.
              </p>
              <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <strong>Authorized Trust Seal:</strong> <br/>
                MCA Reg: CSR00012345
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Project Allocations */}
      {activeTab === 'allocations' && (
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Corporate Budget & Utilization Tracker</h4>
          <div className="grid-2">
            {corporateProjects.map((p, idx) => {
              const utilRate = (p.utilized / p.budget) * 100;
              return (
                <div key={idx} style={{ padding: '20px', border: '1px solid #cbd5e1', borderRadius: '16px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '9px' }}>{p.cause}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Timeline: {p.timeline}</span>
                  </div>
                  <h5 style={{ fontSize: '16px', margin: '4px 0 12px' }}>{p.title}</h5>
                  
                  {/* Utilization Progress Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                    <span>Utilized: ₹{p.utilized.toLocaleString('en-IN')}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Budget: ₹{p.budget.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ width: `${utilRate}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    <span>Impact Score: <strong>{p.score}%</strong></span>
                    <span>Beneficiaries: <strong>{p.beneficiaries}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Impact & Engagement */}
      {activeTab === 'impact' && (
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Employee Engagement & Impact Metric Log</h4>
          <div className="grid-3" style={{ marginBottom: '30px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <Users size={32} color="var(--primary)" style={{ margin: '0 auto 10px' }} />
              <strong style={{ display: 'block', fontSize: '24px' }}>420 Hours</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Employee Volunteering</span>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <Award size={32} color="var(--secondary)" style={{ margin: '0 auto 10px' }} />
              <strong style={{ display: 'block', fontSize: '24px' }}>6,065 Lives</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Direct Beneficiaries</span>
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <BarChart size={32} color="var(--emergency)" style={{ margin: '0 auto 10px' }} />
              <strong style={{ display: 'block', fontSize: '24px' }}>93.5%</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Project Efficiency ROI</span>
            </div>
          </div>

          <h5 style={{ fontSize: '16px', marginBottom: '12px' }}>Quarterly Field Engagement Photos & Videos</h5>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            As a CSR partner, we provide your HR teams with direct media kits (photos, video testimonies from pediatric wards and smart schools) to share internally on corporate newsletters.
          </p>
        </div>
      )}

      {/* 4. Compliance Center */}
      {activeTab === 'compliance' && (
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} color="var(--primary)" />
            <span>Ministry of Corporate Affairs CSR Filings</span>
          </h4>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            Download signed Trust compliance documents required for Section 135 tax exemptions.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {['Form_CSR-1_MCA_Registration.pdf', 'Trust_12A_Tax_Registration.pdf', 'CA_Signed_Utilization_Certificate_FY25.pdf', 'Project_LIFE_80G_Tax_Exemption_Order.pdf'].map((doc, idx) => (
              <div key={idx} onClick={() => alert(`Downloading ${doc}`)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', background: '#f8fafc', fontSize: '13px' }}>
                <span style={{ fontWeight: '600' }}>{doc}</span>
                <Download size={14} color="var(--primary)" />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
