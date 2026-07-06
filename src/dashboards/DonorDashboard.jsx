import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, Heart, Shield, Download, RefreshCw, Star, Users, ExternalLink, Calendar, Flame } from 'lucide-react';

export default function DonorDashboard() {
  const { donations, currentUser } = useContext(AppContext);

  // We show Sneha's or general list representing the active donor
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* 1. Donor Journey Lifecycle Timeline (HubSpot/Salesforce model) */}
      <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '18px' }}>My Donor Lifecycle Journey</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Automated engagement updates matching trust audit schedules.</span>
          </div>
          <span className="badge badge-primary" style={{ fontSize: '10px' }}>Status: Warm Donor</span>
        </div>

        {/* Timeline Stepper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '20px', flexWrap: 'wrap', gap: '20px 10px' }}>
          {/* Connector Line */}
          <div style={{
            position: 'absolute', top: '15px', left: '10%', right: '10%', height: '3px',
            backgroundColor: '#cbd5e1', zIndex: 1
          }}></div>
          
          {[
            { step: 1, name: "1st Donation", sub: "Thank You sent", completed: true },
            { step: 2, name: "Day 3 Impact", sub: "Story Dispatched", completed: true },
            { step: 3, name: "Day 7 Suggest", sub: "New Campaign suggestion", completed: true },
            { step: 4, name: "Day 30 Sub", sub: "Monthly Toggle", completed: false, active: true },
            { step: 5, name: "Day 60 Audit", sub: "Utilization Report", completed: false }
          ].map((item, idx) => (
            <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px', flex: '1 1 0px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: item.completed ? 'var(--primary)' : item.active ? 'var(--secondary)' : '#e2e8f0',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700', fontSize: '12px', border: '4px solid white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                {item.step}
              </div>
              <strong style={{ fontSize: '13px', marginTop: '8px', color: item.completed || item.active ? 'var(--text)' : 'var(--text-muted)', textAlign: 'center' }}>
                {item.name}
              </strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '2px' }}>
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4">
        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            My Total Giving
          </span>
          <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginTop: '8px' }}>
            ₹{totalDonated.toLocaleString('en-IN')}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {myDonations.length} transactions audited
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Monthly Subscriptions
          </span>
          <h3 style={{ fontSize: '24px', color: 'var(--secondary)', marginTop: '8px' }}>
            {myDonations.filter(d => d.isMonthly).length} Active
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Recurring grants toggle
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
              My Referral Share Link
            </span>
            <input 
              type="text" 
              readOnly 
              value={`https://projectlife.org/ref/${currentUser ? currentUser.name.split(' ')[0].toLowerCase() : 'donor'}10`} 
              onClick={() => { navigator.clipboard.writeText(`https://projectlife.org/ref/${currentUser ? currentUser.name.split(' ')[0].toLowerCase() : 'donor'}10`); alert("Referral link copied!"); }}
              style={{
                border: '1px solid #cbd5e1',
                padding: '6px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                width: '100%',
                backgroundColor: '#f8fafc',
                cursor: 'pointer',
                marginTop: '6px'
              }} 
            />
          </div>
        </div>

        {/* Donation Streak */}
        <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            backgroundColor: 'rgba(255, 138, 0, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--secondary)'
          }}>
            <Flame size={24} fill="var(--secondary)" />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Giving Streak</span>
            <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)' }}>🔥 3 Months</strong>
            <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: '600' }}>Active Donating Partner</span>
          </div>
        </div>
      </div>

      {/* Gamified Badges and Leaderboards */}
      <div className="grid-2">
        
        {/* Badges Column */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--primary)" />
            <span>My Achievement Badges</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {badges.map((b, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #e2e8f0'
                }}>
                  {b.icon}
                </div>
                <div>
                  <strong style={{ fontSize: '14.5px', display: 'block' }}>{b.name}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Saving details */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="var(--primary)" />
            <span>80G Tax Exemption Registry</span>
          </h4>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            All your contributions matching PAN entries are logged directly with the NITI Aayog NGO Darpan server. The IT Department retrieves this automatically during file assessment.
          </p>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
              <span>Registered PAN:</span>
              <strong style={{ color: 'var(--text)' }}>ABCPSXXXXK</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Exemption claimed:</span>
              <strong style={{ color: 'var(--primary)' }}>₹{Math.floor(totalDonated * 0.5).toLocaleString('en-IN')} (50% Exemption)</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Donation logs */}
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

    </div>
  );
}
