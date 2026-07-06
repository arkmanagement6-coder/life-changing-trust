import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, BookOpen, CheckCircle, Users, ExternalLink, Play, AlertTriangle } from 'lucide-react';

export default function VolunteerDashboard() {
  const { 
    volunteers, 
    volunteerTasks, 
    claimVolunteerTask, 
    completeVolunteerTask 
  } = useContext(AppContext);

  const [volunteerName, setVolunteerName] = useState('Kunal Gupta');

  const activeVolunteer = volunteers.find(v => v.name === volunteerName) || volunteers[0];

  const handleClaim = (taskId) => {
    claimVolunteerTask(taskId, activeVolunteer.name);
  };

  const handleComplete = (taskId) => {
    completeVolunteerTask(taskId, activeVolunteer.name);
  };

  const handleDownloadCertificate = () => {
    const certHTML = `
      <div style="padding:50px; font-family:sans-serif; text-align:center; border:15px double var(--primary); max-width:700px; margin:20px auto; background-color:#fff; color:#1e293b; border-color:#0F8A5F;">
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
        <div style="margin-top:60px; display:flex; justify-content:space-between; font-size:14px; border-top:1px dashed #cbd5e1; paddingTop:20px;">
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
            Climb the leaderboard to earn medals.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Tasks Completed
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--secondary)', marginTop: '8px' }}>
            {activeVolunteer.tasksCompleted} Tasks
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Active on-ground and digital help.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Referral Signups
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--text)', marginTop: '8px' }}>
            {activeVolunteer.referralCount} Friends
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Referred via custom advocacy link.
          </p>
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
