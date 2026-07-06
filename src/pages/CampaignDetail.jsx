import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldAlert, FileText, Calendar, DollarSign, Users, Clock, AlertTriangle } from 'lucide-react';

export default function CampaignDetail({ onBackClick, onDonateClick }) {
  const { currentCampaignId, campaigns, donations } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('story');

  const campaign = campaigns.find(c => c.id === currentCampaignId);

  if (!campaign) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Campaign not found</h2>
        <button onClick={onBackClick} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const progress = (campaign.raised / campaign.goal) * 100;
  
  // Get donor history specific to this campaign
  const campaignDonations = donations.filter(d => d.campaignId === campaign.id);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      
      {/* Back Button */}
      <button 
        onClick={onBackClick} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontFamily: 'var(--font-title)',
          fontWeight: '600',
          fontSize: '15px',
          marginBottom: '30px'
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Campaigns</span>
      </button>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px', textAlign: 'left' }}>
        
        {/* Left Side: Campaign Media and Info Tabs */}
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.3', marginBottom: '20px' }}>
            {campaign.title}
          </h1>

          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '400px', marginBottom: '30px' }}>
            <img src={campaign.image} alt={campaign.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              display: 'flex',
              gap: '10px'
            }}>
              <span className="badge badge-primary" style={{ background: 'white', color: 'var(--primary)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {campaign.category}
              </span>
              {campaign.verified && (
                <span className="badge badge-success" style={{ background: 'white', color: 'var(--success)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  ✔ Hospital & Trust Verified
                </span>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '24px', gap: '24px' }}>
            {['story', 'verification', 'budget', 'updates', 'faqs'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-title)',
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  position: 'relative',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'faqs' ? 'FAQs' : tab}
                {activeTab === tab && (
                  <span style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%', height: '3px', backgroundColor: 'var(--primary)', borderRadius: '20px' }}></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div style={{ fontSize: '15.5px', lineHeight: '1.7', color: 'var(--text)' }}>
            
            {/* Story Tab */}
            {activeTab === 'story' && (
              <div>
                <p style={{ whiteSpace: 'pre-line', marginBottom: '24px' }}>
                  {campaign.story}
                </p>
                
                {/* Visual quote/callout */}
                <div style={{ background: 'rgba(15, 138, 95, 0.05)', borderLeft: '4px solid var(--primary)', padding: '20px', borderRadius: '0 12px 12px 0', marginBottom: '30px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Trust Direct-Disbursal Code</h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                    Donations to this campaign are securely logged. Receipts are automatically dispatched within 5 seconds of transaction completion. Funds will settle directly with medical center accounts under independent CA auditing.
                  </p>
                </div>
              </div>
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <CheckCircle2 size={24} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>Official Verification Seal</h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                      Our compliance officers have audited the hospital registration certs, pediatric prescription bills, and identity proofs. All information matches regulatory frameworks.
                    </p>
                  </div>
                </div>

                <div style={{ border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <FileText size={48} color="var(--text-muted)" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px' }}>{campaign.documentName || "Verification_Docs.pdf"}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>File Size: 1.4 MB • Audit Checked</span>
                  </div>
                  <button 
                    onClick={() => alert("Mock PDF Viewer: This triggers a download of the verified medical/school certificate proof.")}
                    className="btn btn-outline" 
                    style={{ padding: '8px 20px', fontSize: '13px', marginTop: '10px' }}
                  >
                    Download Verification Document
                  </button>
                </div>
              </div>
            )}

            {/* Budget Tab */}
            {activeTab === 'budget' && (
              <div>
                <h4 style={{ marginBottom: '16px' }}>Fund Allocation Breakdown</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Item Expense Allocation</th>
                      <th style={{ textAlign: 'right', padding: '12px' }}>Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaign.budget?.map((b, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', fontWeight: '500' }}>{b.item}</td>
                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700', color: 'var(--text)' }}>₹{b.cost.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#f8fafc', fontWeight: '700', borderTop: '2px solid #cbd5e1' }}>
                      <td style={{ padding: '12px' }}>Total Target Budget</td>
                      <td style={{ padding: '12px', textAlign: 'right', color: 'var(--primary)' }}>₹{campaign.goal.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Updates Tab */}
            {activeTab === 'updates' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {campaign.updates && campaign.updates.length > 0 ? (
                  campaign.updates.map((upd, idx) => (
                    <div key={idx} style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--primary)' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-7px',
                        top: '4px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)'
                      }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        <Calendar size={12} />
                        <span>{upd.date}</span>
                      </div>
                      <h4 style={{ fontSize: '16px', margin: '4px 0 8px' }}>{upd.title}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{upd.content}</p>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                    <AlertTriangle size={32} style={{ marginBottom: '10px' }} />
                    <p>No campaign updates posted yet. We will log medical logs here once treatment starts.</p>
                  </div>
                )}
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(campaign.faqs || []).map((faq, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text)', marginBottom: '8px' }}>Q: {faq.q}</strong>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>A: {faq.a}</p>
                  </div>
                ))}
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text)', marginBottom: '8px' }}>Q: How do I claim the 80G tax benefit certificate?</strong>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>A: Once you complete your donation and provide your PAN card details, the receipt is automatically generated. You can print or download the PDF immediately, and we also log it directly under your PAN for income tax filing.</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Side: Sticky Checkout Box */}
        <div>
          <div className="glass-panel" style={{
            position: 'sticky',
            top: '100px',
            background: 'white',
            padding: '30px',
            borderRadius: '24px',
            border: '1px solid rgba(15, 138, 95, 0.15)',
            boxShadow: '0 10px 30px rgba(15, 138, 95, 0.05)'
          }}>
            <span className="badge badge-emergency" style={{ marginBottom: '16px' }}>
              Urgent Support Needed
            </span>

            {/* Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
              <span style={{ fontSize: '32px', fontWeight: '850', color: 'var(--text)' }}>
                ₹{campaign.raised.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                raised of <strong>₹{campaign.goal.toLocaleString('en-IN')}</strong> goal
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '10px' }}></div>
            </div>

            {/* Sub details */}
            <div className="grid-3" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ borderRight: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-muted)', marginBottom: '4px' }}><Users size={14} /></div>
                <strong style={{ fontSize: '16px', display: 'block' }}>{campaign.donorsCount}</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Donors</span>
              </div>
              <div style={{ borderRight: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-muted)', marginBottom: '4px' }}><Clock size={14} /></div>
                <strong style={{ fontSize: '16px', display: 'block' }}>{campaign.daysLeft}</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Days Left</span>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-muted)', marginBottom: '4px' }}><DollarSign size={14} /></div>
                <strong style={{ fontSize: '16px', color: 'var(--primary)', display: 'block' }}>50%</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Tax Save</span>
              </div>
            </div>

            <button 
              onClick={() => onDonateClick(campaign.id, campaign.title)}
              className="btn btn-primary animate-pulse" 
              style={{ width: '100%', padding: '16px', fontSize: '16px', marginBottom: '20px' }}
            >
              Make Secure Donation
            </button>

            {/* Donor Wall list preview */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Recent Contributors</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {campaignDonations.length > 0 ? (
                  campaignDonations.slice(0, 3).map((d, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: 'var(--text)', fontWeight: '500' }}>{d.donorName}</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '700' }}>₹{d.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Be the first to support this emergency case.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
