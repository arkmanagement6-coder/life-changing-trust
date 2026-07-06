import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, Heart, Shield, Download, Layout, FileText, Activity, Flame, Users, ChevronRight } from 'lucide-react';

export default function DonorDashboard() {
  const { donations, currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'ledger' | 'journey' | 'badges'

  const myDonations = donations; 
  const totalDonated = myDonations.reduce((sum, d) => sum + d.amount, 0);

  const badges = [
    { name: "Child Champion", desc: "Sponsored rural girl education schemes.", icon: <Award size={20} color="var(--primary)" /> },
    { name: "First Responder", desc: "Funded an emergency pediatric cardiac surgery.", icon: <Heart size={20} color="var(--emergency)" /> },
    { name: "Transparency Advocate", desc: "Uploaded PAN card to claim 80G tax credits.", icon: <Shield size={20} color="var(--secondary)" /> }
  ];

  const handlePrint = (d) => {
    const receiptHTML = `
      <div style="padding:40px; font-family:sans-serif; border:1px solid #cbd5e1; border-radius:10px; max-width:600px; margin:20px auto; color:#1e293b;">
        <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0F8A5F; padding-bottom:15px; margin-bottom:15px;">
          <div>
            <h2 style="color:#0F8A5F; margin:0;">Project LIFE</h2>
            <span style="font-size:12px; color:#64748b;">Life Changing Educational & Charitable Trust</span>
          </div>
          <div style="text-align:right; font-size:12px;">
            <strong>Reg No:</strong> E/31940/MUM <br/>
            80G Exempted Tax Certificate
          </div>
        </div>
        <h3 style="text-align:center;">DONATION RECEIPTS</h3>
        <div style="margin:20px 0; font-size:13.5px; line-height:1.6;">
          <strong>Donor Name:</strong> ${d.donorName} <br/>
          <strong>Donor PAN:</strong> ${d.pan || "Not Provided"} <br/>
          <strong>Date:</strong> ${d.date} <br/>
          <strong>Transaction ID:</strong> ${d.id} <br/>
          <strong>Receipt Number:</strong> ${d.receiptNo}
        </div>
        <div style="border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:10px 0; font-size:15px; font-weight:700;">
          Contribution: ${d.campaignTitle} - ₹${d.amount.toLocaleString('en-IN')}
        </div>
        <p style="font-size:11px; color:#64748b; margin-top:20px;">
          * Eligible for tax deductions under Section 80G of the Indian Income Tax Act. Verified merchant settlement.
        </p>
      </div>
    `;
    const pri = window.open('', '_blank');
    pri.document.write(receiptHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.close();
  };

  return (
    <div style={{ display: 'flex', gap: '30px', minHeight: '70vh', textAlign: 'left' }}>
      
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
          <strong style={{ color: 'white', fontSize: '15px', fontFamily: 'var(--font-title)', display: 'block' }}>Donor Portal</strong>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Account Management</span>
        </div>

        {[
          { id: 'overview', label: "Overview Metrics", icon: <Layout size={16} /> },
          { id: 'ledger', label: "Donation Ledger", icon: <FileText size={16} /> },
          { id: 'journey', label: "Lifecycle Journey", icon: <Activity size={16} /> },
          { id: 'badges', label: "Achievements", icon: <Award size={16} /> }
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
        
        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="grid-3">
              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>My Total Giving</span>
                <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginTop: '8px' }}>₹{totalDonated.toLocaleString('en-IN')}</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{myDonations.length} transactions audited</p>
              </div>

              <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly Subscriptions</span>
                <h3 style={{ fontSize: '24px', color: 'var(--secondary)', marginTop: '8px' }}>{myDonations.filter(d => d.isMonthly).length} Active</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Recurring grants status</p>
              </div>

              <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: 'rgba(255, 138, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--secondary)'
                }}>
                  <Flame size={24} fill="var(--secondary)" />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Giving Streak</span>
                  <strong style={{ display: 'block', fontSize: '20px' }}>🔥 3 Months</strong>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '17px', marginBottom: '12px' }}>Copy My Referral Code</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Share this unique referral URL with friends. Every contribution they make registers on your streak logs!</p>
              <div style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={`https://projectlife.org/ref/${currentUser ? currentUser.name.split(' ')[0].toLowerCase() : 'donor'}10`} 
                  style={{
                    border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '8px',
                    fontSize: '12.5px', width: '100%', backgroundColor: '#f8fafc'
                  }} 
                />
                <button 
                  onClick={() => { navigator.clipboard.writeText(`https://projectlife.org/ref/${currentUser ? currentUser.name.split(' ')[0].toLowerCase() : 'donor'}10`); alert("Referral link copied!"); }}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '12.5px', whiteSpace: 'nowrap' }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DONATION LEDGER */}
        {activeTab === 'ledger' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Donation Transaction Ledger</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Txn Date</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Campaign Title</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Amount</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Type</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myDonations.map((d, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{d.date}</td>
                      <td style={{ padding: '12px', fontWeight: '500' }}>{d.campaignTitle}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: '750', color: 'var(--primary)' }}>₹{d.amount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span className={`badge ${d.isMonthly ? 'badge-primary' : 'badge-success'}`} style={{ fontSize: '10px' }}>
                          {d.isMonthly ? 'Monthly' : 'One-Time'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handlePrint(d)}
                          className="btn btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '11.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Download size={12} />
                          <span>80G Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LIFECYCLE JOURNEY */}
        {activeTab === 'journey' && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>My Donor Lifecycle Journey</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '30px' }}>Engagement pipeline syncing to trust balance sheet releases.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {[
                { step: 1, name: "First Contribution Secured", sub: "Instant CA audited 80G receipt dispatched to tax ledger.", completed: true },
                { step: 2, name: "Impact Narrative update (Day 3)", sub: "Verified hospital/classroom diagnostic files sent via guide chat.", completed: true },
                { step: 3, name: "Dynamic Campaign suggestion (Day 7)", sub: "AI matches category preferences to launch active cases.", completed: true },
                { step: 4, name: "Monthly Subscription offer (Day 30)", sub: "Switch on monthly micro-donations to automate giving.", active: true },
                { step: 5, name: "Quarterly Audit utilization ledger (Day 60)", sub: "Download bank disbursement statements.", completed: false }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: item.completed ? 'var(--primary)' : item.active ? 'var(--secondary)' : '#cbd5e1',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '12px', flexShrink: 0
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <strong style={{ fontSize: '14.5px', color: 'var(--text)', display: 'block' }}>{item.name}</strong>
                    <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS */}
        {activeTab === 'badges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>My Earned Badges</h4>
              <div className="grid-3">
                {badges.map((b, idx) => (
                  <div key={idx} style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: '#f8fafc', border: '1px solid #cbd5e1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
                    }}>
                      {b.icon}
                    </div>
                    <strong style={{ fontSize: '14.5px', display: 'block' }}>{b.name}</strong>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'block', marginTop: '4px', lineHeight: '1.4' }}>{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>80G Tax Exemption Registry</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Project LIFE files 100% of donations under Section 80G. Download logs directly from the IT portal using your registered PAN details.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
