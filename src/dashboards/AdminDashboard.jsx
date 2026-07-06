import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Check, ShieldCheck, Mail, Send, Sparkles, AlertTriangle, Play, RefreshCw, Search, Filter, Download, UserCheck, TrendingUp, ShieldAlert } from 'lucide-react';

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
    auditLogs
  } = useContext(AppContext);

  // Active Admin Tabs: 'approvals' | 'crm' | 'analytics' | 'audit'
  const [activeAdminTab, setActiveAdminTab] = useState('crm');

  // AI Campaign Studio states
  const [aiCause, setAiCause] = useState('Pediatric Leukemia treatment');
  const [aiAmount, setAiAmount] = useState('500000');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Marketing dispatch states
  const [marketingMsgType, setMarketingMsgType] = useState('thank_you');
  const [marketingLog, setMarketingLog] = useState('');

  // CRM States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSegment, setFilterSegment] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const crmStats = getCrmAnalytics();

  // CSV Exporter
  const handleExportCsv = () => {
    const headers = ["Txn ID", "Donor Name", "Email", "Phone", "Location", "Amount", "Segment", "Frequency", "Acquisition Channel", "Device Source"];
    const rows = donations.map(d => {
      const segment = getDonorSegment(d.email);
      return [
        d.id,
        d.donorName,
        d.email,
        d.phone || 'N/A',
        d.location || 'N/A',
        d.amount,
        segment,
        d.frequency || 'One-time',
        d.channel || 'Organic',
        d.device || 'Mobile'
      ].map(field => `"${field}"`).join(",");
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")].concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Project_LIFE_CRM_Donors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMarketingSend = () => {
    setMarketingLog('Broadcasting messages...');
    setTimeout(() => {
      setMarketingLog(`✔ Successfully dispatched ${marketingMsgType.toUpperCase()} auto-alerts to ${donations.length} registered donors via Twilio WhatsApp API!`);
    }, 1200);
  };

  const handleAiWrite = async () => {
    setIsAiLoading(true);
    const result = await runAiCampaignGenerator(aiCause, aiAmount);
    setAiResult(result);
    setIsAiLoading(false);
  };

  // Filtered CRM Donors list
  const filteredDonors = donations.filter(d => {
    const segment = getDonorSegment(d.email);
    const matchesSearch = d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || d.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = filterSegment === 'All' || segment === filterSegment;
    const matchesLocation = filterLocation === 'All' || d.location.includes(filterLocation);
    return matchesSearch && matchesSegment && matchesLocation;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Overview Cards */}
      <div className="grid-4">
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>CRM Lifetime Value (LTV)</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px', color: 'var(--primary)' }}>₹{crmStats.ltv.toLocaleString('en-IN')}</h3>
        </div>
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Donor Repeat Rate</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px', color: 'var(--secondary)' }}>{crmStats.repeatRate}%</h3>
        </div>
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Total CRM Accounts</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px' }}>{crmStats.totalDonorsCount} Donors</h3>
        </div>
        <div className="glass-panel" style={{ background: 'white', padding: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Total Funds Audited</span>
          <h3 style={{ fontSize: '24px', marginTop: '6px' }}>₹{crmStats.totalReceipts.toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', gap: '24px' }}>
        {[
          { tab: 'crm', label: "Salesforce CRM Index" },
          { tab: 'approvals', label: "Pending Approvals Stack" },
          { tab: 'analytics', label: "Campaign & CSR Analytics" },
          { tab: 'audit', label: "Security & Fraud Logs" }
        ].map(item => (
          <button 
            key={item.tab}
            onClick={() => setActiveAdminTab(item.tab)}
            style={{
              background: 'transparent', border: 'none', padding: '12px 0',
              fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-title)',
              color: activeAdminTab === item.tab ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeAdminTab === item.tab ? '3px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* SUBSECTION CONTENTS */}

      {/* 1. SALESFORCE CRM INDEX */}
      {activeAdminTab === 'crm' && (
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <h4 style={{ fontSize: '18px' }}>Ecosystem CRM Registry (Airtable-style Data Grid)</h4>
            <button onClick={handleExportCsv} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <Download size={14} />
              <span>Export CSV Database</span>
            </button>
          </div>

          {/* CRM Search and Filter Tools */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input 
                type="text" 
                placeholder="Search donors by name, email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '36px' }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <Filter size={14} color="var(--text-muted)" />
              <select 
                value={filterSegment}
                onChange={(e) => setFilterSegment(e.target.value)}
                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                <option value="All">All CRM Segments</option>
                <option value="Cold">Cold Donors (1 donation)</option>
                <option value="Warm">Warm Donors (2-3 donations)</option>
                <option value="Loyal">Loyal Donors (recurring)</option>
                <option value="High Value">High Value (₹10,000+)</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <Filter size={14} color="var(--text-muted)" />
              <select 
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: '600', fontSize: '13px' }}
              >
                <option value="All">All Locations</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          {/* CRM Data Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Donor Contact</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Location</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}>CRM Segment</th>
                  <th style={{ textAlign: 'right', padding: '12px' }}>Audited Donations</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Acquisition Channel</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}>Device</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((d, idx) => {
                  const segment = getDonorSegment(d.email);
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>
                        <strong>{d.donorName}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{d.email} • {d.phone || 'N/A'}</div>
                      </td>
                      <td style={{ padding: '12px' }}>{d.location || 'N/A'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span className={`badge ${
                          segment === 'High Value' ? 'badge-emergency' : segment === 'Loyal' ? 'badge-primary' : segment === 'Warm' ? 'badge-warning' : 'badge-success'
                        }`} style={{ fontSize: '10px' }}>
                          {segment}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: '750', color: 'var(--primary)' }}>₹{d.amount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px' }}>{d.channel || 'Organic'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{d.device || 'Mobile'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. PENDING APPROVALS STACK */}
      {activeAdminTab === 'approvals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
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
        </div>
      )}

      {/* 3. CAMPAIGN & CSR ANALYTICS */}
      {activeAdminTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Campaign Analytics details */}
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--primary)" />
              <span>Crowdfunding Campaign Analytics Index</span>
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Campaign Title</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>CTR</th>
                    <th style={{ textAlign: 'center', padding: '12px' }}>Conversion</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Cost Per Donation</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>ROI (Return)</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', fontWeight: '600' }}>{c.title.substring(0, 50)}...</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{(4.2 + idx * 0.5).toFixed(1)}%</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{(12.4 + idx * 1.2).toFixed(1)}%</td>
                      <td style={{ padding: '12px', textAlign: 'right', color: 'var(--emergency)' }}>₹140</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: '750', color: 'var(--success)' }}>{(8.4 + idx * 2).toFixed(1)}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* HubSpot style automated messages simulator */}
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} color="var(--secondary)" />
              <span>HubSpot Messaging Dispatch Automation</span>
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Simulate outreach sequences based on donor tags. Automated sequences keep donors engaged across Day 1, Day 30, and Day 60 logs.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <select 
                value={marketingMsgType} 
                onChange={(e) => setMarketingMsgType(e.target.value)}
                className="form-control"
                style={{ width: '280px' }}
              >
                <option value="thank_you">Day 1 Sequence: Instant Thank You receipt</option>
                <option value="monthly_update">Day 30 Sequence: Financial utilization audit</option>
                <option value="critical_alert">Day 60 Sequence: Re-engagement Healthcare request</option>
              </select>
              <button onClick={handleMarketingSend} className="btn btn-secondary">
                Dispatch Broadcast
              </button>
            </div>
            {marketingLog && (
              <div style={{ padding: '12px', background: 'rgba(22, 163, 74, 0.05)', border: '1px solid rgba(22, 163, 74, 0.15)', borderRadius: '8px', fontSize: '13px', color: 'var(--success)', fontWeight: '600' }}>
                {marketingLog}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SECURITY & FRAUD AUDITS */}
      {activeTab === 'audit' || activeAdminTab === 'audit' && (
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
  );
}
