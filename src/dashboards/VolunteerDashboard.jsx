import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, BookOpen, CheckCircle, Users, Layout, Play, AlertTriangle, QrCode, Sparkles, TrendingUp, ChevronRight, FileText } from 'lucide-react';

export default function VolunteerDashboard() {
  const { 
    volunteers, 
    volunteerTasks, 
    claimVolunteerTask, 
    completeVolunteerTask 
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('referral'); // 'referral' | 'tasks' | 'leaderboard' | 'cert'
  const [volunteerName, setVolunteerName] = useState('Kunal Gupta');
  const [showQr, setShowQr] = useState(false);

  const activeVolunteer = volunteers.find(v => v.name === volunteerName) || volunteers[0];

  const handleClaim = (taskId) => {
    claimVolunteerTask(taskId, activeVolunteer.name);
  };

  const handleComplete = (taskId) => {
    completeVolunteerTask(taskId, activeVolunteer.name);
  };

  const handleSimulateReferralClick = () => {
    alert("Simulation: A friend clicked your referral link! Clicks increased.");
    activeVolunteer.clicks += 1;
  };

  const handleDownloadCertificate = () => {
    const certHTML = `
      <div style="padding:50px; font-family:sans-serif; text-align:center; border:15px double #0F8A5F; max-width:700px; margin:20px auto; background-color:#fff; color:#1e293b;">
        <h1 style="color:#0F8A5F; font-size:36px; margin-bottom:10px;">Certificate of Appreciation</h1>
        <h3 style="color:#FF8A00; text-transform:uppercase; letter-spacing:1px; margin-bottom:30px;">Volunteer Force Excellence</h3>
        <p style="font-size:16px; line-height:1.8;">
          This certificate is proudly awarded to
        </p>
        <h2 style="font-size:28px; border-bottom:2px solid #cbd5e1; display:inline-block; padding-bottom:5px; margin:15px 0;">
          ${activeVolunteer.name}
        </h2>
        <p style="font-size:15px; line-height:1.8; max-width:550px; margin:20px auto;">
          for outstanding contribution to our rural education drives, pediatric patient logistics coordination, and community advocacy programs. Active points score recorded: <strong>${activeVolunteer.points} Points</strong>.
        </p>
        <div style="margin-top:60px; display:flex; justify-content:space-between; font-size:14px; border-top:1px dashed #cbd5e1; padding-top:20px;">
          <div>
            <strong>NGO Registrar</strong> <br/>
            Life Changing Trust
          </div>
          <div>
            <strong>Trustee Signature</strong> <br/>
            Dr. Shalini Deshmukh
          </div>
        </div>
      </div>
    `;
    const pri = window.open('', '_blank');
    pri.document.write(certHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.close();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
      
      {/* Active profile selector */}
      <div style={{ background: 'white', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Active Volunteer Profile:</span>
        <select 
          value={volunteerName} 
          onChange={(e) => setVolunteerName(e.target.value)}
          className="form-control"
          style={{ width: '200px', padding: '6px 12px' }}
        >
          {volunteers.map(v => (
            <option key={v.id} value={v.name}>{v.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '30px', minHeight: '65vh' }}>
        
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
            <strong style={{ color: 'white', fontSize: '15px', fontFamily: 'var(--font-title)', display: 'block' }}>Volunteer Portal</strong>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Advocacy Workspace</span>
          </div>

          {[
            { id: 'referral', label: "Referral Engine", icon: <TrendingUp size={16} /> },
            { id: 'tasks', label: "Tasks Board", icon: <FileText size={16} /> },
            { id: 'leaderboard', label: "Leaderboard", icon: <Users size={16} /> },
            { id: 'cert', label: "Certificates", icon: <Award size={16} /> }
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
          
          {/* TAB 1: REFERRAL ENGINE */}
          {activeTab === 'referral' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={20} color="var(--primary)" />
                      <span>Advocacy Referral Engine</span>
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Track donation metrics, clicks, and conversion rates driven by your custom referral sharing links.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleSimulateReferralClick} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>
                      Simulate Clicks
                    </button>
                    <button onClick={() => setShowQr(!showQr)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <QrCode size={14} />
                      <span>{showQr ? "Hide QR" : "Show QR Code"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid-3" style={{ marginTop: '24px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Referral Clicks</span>
                    <strong style={{ display: 'block', fontSize: '20px', marginTop: '4px' }}>{activeVolunteer.clicks || 0} Clicks</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Donations Generated</span>
                    <strong style={{ display: 'block', fontSize: '20px', marginTop: '4px', color: 'var(--primary)' }}>₹{(activeVolunteer.donationsGenerated || 0).toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>My Referral Code</span>
                    <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>{activeVolunteer.referralCode}</span>
                  </div>
                </div>

                {showQr && (
                  <div style={{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center', background: '#f1f5f9', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" style={{ background: 'white', padding: '6px', borderRadius: '10px' }}>
                      <rect x="5" y="5" width="25" height="25" fill="var(--text)" />
                      <rect x="10" y="10" width="15" height="15" fill="white" />
                      <rect x="13" y="13" width="9" height="9" fill="var(--text)" />
                      <rect x="70" y="5" width="25" height="25" fill="var(--text)" />
                      <rect x="75" y="10" width="15" height="15" fill="white" />
                      <rect x="78" y="78" width="9" height="9" fill="var(--text)" />
                      <rect x="5" y="70" width="25" height="25" fill="var(--text)" />
                      <rect x="10" y="75" width="15" height="15" fill="white" />
                      <rect x="13" y="78" width="9" height="9" fill="var(--text)" />
                      <rect x="40" y="40" width="20" height="20" fill="var(--primary)" />
                      <rect x="45" y="45" width="10" height="10" fill="white" />
                      <rect x="35" y="10" width="10" height="5" fill="var(--text)" />
                      <rect x="55" y="15" width="5" height="15" fill="var(--text)" />
                      <rect x="40" y="75" width="15" height="5" fill="var(--text)" />
                    </svg>
                    <div>
                      <strong style={{ display: 'block', fontSize: '14.5px' }}>Download QR Share Card</strong>
                      <button onClick={() => alert("Downloading QR PNG image")} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11.5px', marginTop: '10px' }}>
                        Download PNG
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid-3">
                <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Points Balance</span>
                  <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginTop: '8px' }}>{activeVolunteer.points} pts</h3>
                </div>
                <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Completed Tasks</span>
                  <h3 style={{ fontSize: '24px', color: 'var(--secondary)', marginTop: '8px' }}>{activeVolunteer.tasksCompleted}</h3>
                </div>
                <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Skills Tracked</span>
                  <h3 style={{ fontSize: '16px', color: 'var(--text)', marginTop: '12px', fontWeight: '700' }}>{activeVolunteer.skills}</h3>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TASKS BOARD */}
          {activeTab === 'tasks' && (
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Volunteer Task Board</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {volunteerTasks.map(t => (
                  <div key={t.id} style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flexGrow: 1 }}>
                        <span className="badge badge-primary" style={{ fontSize: '10px', marginBottom: '8px' }}>{t.category}</span>
                        <h5 style={{ fontSize: '15px', color: 'var(--text)', fontWeight: '600' }}>{t.title}</h5>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '750' }}>+{t.points} pts</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '8px 0 12px' }}>{t.desc}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: t.status === 'Completed' ? 'var(--success)' : t.status === 'In Progress' ? 'var(--secondary)' : 'var(--text-muted)' }}>
                        Status: {t.status}
                      </span>
                      
                      {t.status === 'Pending' && (
                        <button onClick={() => handleClaim(t.id)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          Claim Task
                        </button>
                      )}
                      {t.status === 'In Progress' && (
                        <button onClick={() => handleComplete(t.id)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          Mark Complete
                        </button>
                      )}
                      {t.status === 'Completed' && (
                        <span style={{ color: 'var(--success)', fontSize: '12px', fontWeight: '600' }}>✔ Completed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Community Leaderboard</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {volunteers.map((v, index) => (
                  <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 12px', backgroundColor: v.name === activeVolunteer.name ? 'rgba(15, 138, 95, 0.05)' : 'transparent', borderRadius: '8px', border: v.name === activeVolunteer.name ? '1px solid rgba(15, 138, 95, 0.15)' : 'none' }}>
                    <span style={{ fontWeight: '600' }}>#{index + 1} {v.name}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: '750' }}>{v.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === 'cert' && (
            <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>Appreciation Certificates</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                Earn 500+ points by completing claimed tasks to download your certificate.
              </p>
              {activeVolunteer.points >= 500 ? (
                <button onClick={handleDownloadCertificate} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} />
                  <span>Print Appreciation Certificate</span>
                </button>
              ) : (
                <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.15)', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', color: 'var(--warning)' }}>
                  <AlertTriangle size={16} />
                  <span>Requires 500 points to unlock. Claim tasks to gather points!</span>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
