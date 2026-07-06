import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, BookOpen, CheckCircle, Users, ExternalLink, Play, AlertTriangle, QrCode, Share2, Sparkles, TrendingUp } from 'lucide-react';

export default function VolunteerDashboard() {
  const { 
    volunteers, 
    volunteerTasks, 
    claimVolunteerTask, 
    completeVolunteerTask 
  } = useContext(AppContext);

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
    // Simulate someone clicking the referral link
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Selector to choose volunteer context */}
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

      {/* Referral Engine Metrics Row */}
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

        <div className="grid-4" style={{ marginTop: '24px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Referral Clicks</span>
            <strong style={{ display: 'block', fontSize: '22px', marginTop: '4px' }}>{activeVolunteer.clicks || 0} Clicks</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Donations Generated</span>
            <strong style={{ display: 'block', fontSize: '22px', marginTop: '4px', color: 'var(--primary)' }}>₹{(activeVolunteer.donationsGenerated || 0).toLocaleString('en-IN')}</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase' }}>Conversion Rate</span>
            <strong style={{ display: 'block', fontSize: '22px', marginTop: '4px', color: 'var(--secondary)' }}>{activeVolunteer.conversionRate || 0}%</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '750', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>My Referral Code</span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>{activeVolunteer.referralCode}</span>
          </div>
        </div>

        {/* QR Code Container */}
        {showQr && (
          <div style={{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center', background: '#f1f5f9', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
            {/* Custom SVG QR Code */}
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ background: 'white', padding: '6px', borderRadius: '10px' }}>
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

              {/* Random block dots */}
              <rect x="35" y="10" width="10" height="5" fill="var(--text)" />
              <rect x="55" y="15" width="5" height="15" fill="var(--text)" />
              <rect x="40" y="75" width="15" height="5" fill="var(--text)" />
              <rect x="75" y="45" width="10" height="10" fill="var(--text)" />
              <rect x="15" y="40" width="15" height="5" fill="var(--text)" />
            </svg>
            <div>
              <strong style={{ display: 'block', fontSize: '14.5px' }}>Download QR Share Card</strong>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Print or download this QR card. Donors can scan it to launch campaigns directly with your referral code auto-applied!
              </p>
              <button onClick={() => alert("Downloading Referral QR image card")} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11.5px', marginTop: '10px' }}>
                Download QR (PNG)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid-3">
        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Earned Points
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginTop: '8px' }}>
            {activeVolunteer.points} pts
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Tasks completed count: {activeVolunteer.tasksCompleted}
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Skills Registered
          </span>
          <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginTop: '12px', fontWeight: '700' }}>
            {activeVolunteer.skills}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Matches tasks updates.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Advocacy Rank
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--text)', marginTop: '8px' }}>
            Silver Tier
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Climb to Gold at 2,000 points score.
          </p>
        </div>
      </div>

      {/* Gamified Badges Panel (Volunteer specific) */}
      <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
        <h4 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--primary)" />
          <span>My Gamification Badges</span>
        </h4>
        <div className="grid-3">
          {[
            { name: "Impact Starter", desc: "Awarded on completing the first dashboard task verification.", completed: activeVolunteer.tasksCompleted >= 1 },
            { name: "Community Hero", desc: "Awarded on generating over 5 referral clicks.", completed: activeVolunteer.clicks >= 5 },
            { name: "Fundraising Champion", desc: "Awarded on generating ₹10,000+ total donor contributions.", completed: activeVolunteer.donationsGenerated >= 10000 }
          ].map((badge, idx) => (
            <div key={idx} style={{
              border: '1px solid #cbd5e1',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: badge.completed ? 'rgba(15, 138, 95, 0.05)' : 'white',
              opacity: badge.completed ? 1 : 0.6
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: badge.completed ? 'var(--primary)' : '#e2e8f0',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', fontSize: '20px'
              }}>
                🏆
              </div>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text)' }}>{badge.name}</strong>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>{badge.desc}</p>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '750', color: badge.completed ? 'var(--primary)' : 'var(--text-muted)', marginTop: '10px' }}>
                {badge.completed ? "UNLOCKED" : "LOCKED"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Tasks Grid */}
      <div className="grid-2">
        
        {/* Task Board */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Volunteer Task Board</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {volunteerTasks.map(t => (
              <div key={t.id} style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
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

        {/* Certificate and Leaderboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Certificates downloads */}
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--primary)" />
              <span>Official Certificates</span>
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              Complete at least 5 tasks and score 500+ points to generate and print your official Trust appreciation certificate signed by Board Members.
            </p>
            
            {activeVolunteer.points >= 500 ? (
              <button onClick={handleDownloadCertificate} className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle size={16} />
                <span>Print Excellence Certificate</span>
              </button>
            ) : (
              <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.15)', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', color: 'var(--warning)' }}>
                <AlertTriangle size={16} />
                <span>Requires 500 points to unlock certificate. Gather points by claiming tasks.</span>
              </div>
            )}
          </div>

          {/* Leaderboard panel preview */}
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Trust Leaderboard</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {volunteers.map((v, index) => (
                <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 12px', backgroundColor: v.name === activeVolunteer.name ? 'rgba(15, 138, 95, 0.05)' : 'transparent', borderRadius: '8px', border: v.name === activeVolunteer.name ? '1px solid rgba(15, 138, 95, 0.15)' : 'none' }}>
                  <span style={{ fontWeight: '600' }}>#{index + 1} {v.name}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: '750' }}>{v.points} pts</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
