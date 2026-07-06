import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Check, ShieldCheck, Mail, Send, Sparkles, AlertTriangle, Play, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const { 
    donations, 
    hospitalCases, 
    schoolCases, 
    approveHospitalCase, 
    approveSchoolCase,
    runAiCampaignGenerator,
    campaigns
  } = useContext(AppContext);

  // AI Campaign Studio states
  const [aiCause, setAiCause] = useState('Pediatric Leukemia treatment');
  const [aiAmount, setAiAmount] = useState('500000');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Marketing dispatch states
  const [marketingMsgType, setMarketingMsgType] = useState('thank_you');
  const [marketingLog, setMarketingLog] = useState('');

  // AI Fraud audit check states
  const [fraudAuditActive, setFraudAuditActive] = useState(false);
  const [fraudChecks, setFraudChecks] = useState([
    { name: "Attending Doctor Registration GMC Check", status: "Verified", detail: "Active registry found in National Medical Council." },
    { name: "Hospital IPD Bed Billing Audit", status: "Verified", detail: "Billing invoice aligns with Standard Fortis tariff schedules." },
    { name: "Cross-platform Campaign Duplicate Index", status: "Verified", detail: "No matching Patient ID found on Ketto, Milaap, or ImpactGuru." },
    { name: "PAN Card Registration Database Validation", status: "Verified", detail: "Valid PAN entries verified for tax rebate compliance." }
  ]);

  const handleAiWrite = async () => {
    setIsAiLoading(true);
    const result = await runAiCampaignGenerator(aiCause, aiAmount);
    setAiResult(result);
    setIsAiLoading(false);
  };

  const handlePublishAiCampaign = () => {
    if (!aiResult) return;
    alert("Publish simulation successful! A new active campaign has been added to the public register.");
    setAiResult(null);
  };

  const handleMarketingSend = () => {
    setMarketingLog('Broadcasting messages...');
    setTimeout(() => {
      setMarketingLog(`✔ Successfully dispatched ${marketingMsgType.toUpperCase()} auto-alerts to ${donations.length} registered donors via Twilio WhatsApp API!`);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Overview Cards */}
      <div className="grid-4">
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Total CRM Transactions</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px' }}>₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString('en-IN')}</h3>
        </div>
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Active Public Campaigns</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px' }}>{campaigns.length} Cases</h3>
        </div>
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Hospital Request Stack</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px' }}>{hospitalCases.filter(c => c.status !== 'Approved').length} Pending</h3>
        </div>
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>School Request Stack</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px' }}>{schoolCases.filter(c => c.status !== 'Approved').length} Pending</h3>
        </div>
      </div>

      {/* Campaign Approvals Stack */}
      <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
        <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Pending Approvals Stack</h4>
        
        {/* Hospital Approvals */}
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

        {/* School Approvals */}
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

      {/* AI Campaign Studio and Fraud Auditing Grid */}
      <div className="grid-2">
        
        {/* AI Writer */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" />
            <span>AI Campaign Writer Studio</span>
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Draft comprehensive campaign headings, budget items and summaries instantly using our AI parser.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label>Campaign Focus Cause</label>
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

            <button onClick={handleAiWrite} className="btn btn-primary" disabled={isAiLoading}>
              {isAiLoading ? 'AI writing script running...' : 'Generate Campaign copy'}
            </button>

            {aiResult && (
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginTop: '16px', fontSize: '13px' }}>
                <strong style={{ display: 'block', marginBottom: '6px' }}>Generated Headline:</strong>
                <p style={{ fontWeight: '600', color: 'var(--primary)' }}>{aiResult.title}</p>
                <strong style={{ display: 'block', margin: '12px 0 6px' }}>Generated Narrative Copy:</strong>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{aiResult.story}</p>
                
                <button onClick={handlePublishAiCampaign} className="btn btn-secondary" style={{ width: '100%', padding: '8px', marginTop: '16px', fontSize: '12.5px' }}>
                  Publish Live Fundraiser
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AI Fraud checks */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="var(--primary)" />
            <span>AI Fraud Detection Audit Logs</span>
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Auditing patient case registration files against national database nodes to prevent duplicate or inflated claims.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fraudChecks.map((check, idx) => (
              <div key={idx} style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', background: '#f8fafc', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                  <span>{check.name}</span>
                  <span style={{ color: 'var(--success)' }}>{check.status}</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{check.detail}</p>
              </div>
            ))}
            <button onClick={() => {
              setFraudAuditActive(true);
              setTimeout(() => setFraudAuditActive(false), 1000);
            }} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={14} className={fraudAuditActive ? 'animate-spin' : ''} />
              <span>Force System Compliance Check</span>
            </button>
            <style>{`
              .animate-spin {
                animation: spin 1s linear infinite;
              }
            `}</style>
          </div>
        </div>

      </div>

      {/* Marketing Broadcast */}
      <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
        <h4 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={18} color="var(--secondary)" />
          <span>Marketing & Automated Dispatches</span>
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Select pre-defined outreach campaigns to notify all registered donors about tax benefits or matching grants.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <select 
            value={marketingMsgType} 
            onChange={(e) => setMarketingMsgType(e.target.value)}
            className="form-control"
            style={{ width: '250px' }}
          >
            <option value="thank_you">Template: 80G Tax Exemption Notice</option>
            <option value="monthly_update">Template: Monthly Impact Summary (Audit)</option>
            <option value="critical_alert">Template: Critical Healthcare Appeal</option>
          </select>
          <button onClick={handleMarketingSend} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Send size={14} />
            <span>Send Broadcast</span>
          </button>
        </div>

        {marketingLog && (
          <div style={{ padding: '12px', background: 'rgba(22, 163, 74, 0.05)', border: '1px solid rgba(22, 163, 74, 0.15)', borderRadius: '8px', fontSize: '13px', color: 'var(--success)', fontWeight: '600' }}>
            {marketingLog}
          </div>
        )}
      </div>

      {/* CRM Donor Database Table */}
      <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
        <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Ecosystem CRM Registry</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Donor</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Email Address</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>PAN Card</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Campaign Funded</th>
                <th style={{ textAlign: 'right', padding: '12px' }}>Amount</th>
                <th style={{ textAlign: 'center', padding: '12px' }}>Gateway Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{d.donorName}</td>
                  <td style={{ padding: '12px' }}>{d.email}</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace' }}>{d.pan || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{d.campaignTitle.substring(0, 45)}...</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '750', color: 'var(--primary)' }}>₹{d.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span className="badge badge-success" style={{ fontSize: '9px' }}>Settled (Secured)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
