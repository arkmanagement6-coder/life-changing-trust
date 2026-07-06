import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Award, FileText } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '60px 24px', textAlign: 'left' }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Trust Overview</span>
        <h1 style={{ fontSize: '42px', marginTop: '10px', fontWeight: '800' }}>Life Changing Educational & Charitable Trust</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '650px', margin: '16px auto 0', lineHeight: '1.6' }}>
          Changing lives through affordable education, emergency healthcare, and absolute operational transparency.
        </p>
      </div>

      {/* Mission & Vision cards */}
      <div className="grid-2" style={{ marginBottom: '60px' }}>
        <div className="glass-panel" style={{ padding: '40px', background: 'white' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            backgroundColor: 'rgba(15, 138, 95, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Target size={24} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Our Mission</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px' }}>
            To mobilize crowdfunding resource pools to fund expensive pediatric surgeries and establish digital literacy tools in underserved Indian rural schools, ensuring zero overhead leaks.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '40px', background: 'white' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            backgroundColor: 'rgba(255, 138, 0, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Eye size={24} color="var(--secondary)" />
          </div>
          <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Our Vision</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px' }}>
            To engineer India's first fully auditable, blockchain-grade donation verification engine that builds total trust and fosters micro-philanthropy for a healthier, educated nation.
          </p>
        </div>
      </div>

      {/* Founder Story */}
      <div className="glass-panel" style={{ background: 'white', padding: '40px', marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '300px' }}>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="Founder Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>Founder's Vision</span>
            <h3 style={{ fontSize: '28px', margin: '8px 0 16px' }}>Dr. Shalini Deshmukh</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '15px', marginBottom: '16px' }}>
              "After serving as a pediatrician at municipal hospitals for 15 years, I saw hundreds of families sell their assets or stop their children's education to fund organ surgeries. It broke my heart. I realized that resources existed in the community, but there was a massive deficit of trust. We started the Life Changing Educational & Charitable Trust to build a bridge of absolute transparency."
            </p>
            <p style={{ fontWeight: '600', color: 'var(--text)' }}>
              Dr. Shalini Deshmukh • Founder & Chairperson
            </p>
          </div>
        </div>
      </div>

      {/* Board Members Section */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>Our Trust Board Directors</h3>
        <div className="grid-3">
          {[
            { name: "Dr. Shalini Deshmukh", role: "Chairperson & Medical Auditor", school: "MD Pediatrics (KEM Mumbai)" },
            { name: "Mr. Rajeev Chandrasekhar", role: "Treasurer & Financial Auditor", school: "Chartered Accountant (ex-PwC)" },
            { name: "Mrs. Meera Sen", role: "Director of Education Outreach", school: "MA Education (TISS Mumbai)" }
          ].map((board, idx) => (
            <div key={idx} className="glass-panel" style={{ background: 'white', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                {board.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>{board.name}</h4>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '8px' }}>{board.role}</div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{board.school}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Accreditation Gallery */}
      <div>
        <h3 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>Trust Registration & Legal Approvals</h3>
        <div className="grid-3">
          
          <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
            <Award size={40} color="var(--primary)" />
            <h4 style={{ fontSize: '16px' }}>80G Tax Exemption</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', height: '40px' }}>
              Approval Code: CIT(E)/80G/12345/2016-17. Enables 50% tax deduction for Indian donors.
            </p>
            <button onClick={() => alert("Previewing 80G Certificate")} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '12px' }}>View Certificate</button>
          </div>

          <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
            <Award size={40} color="var(--secondary)" />
            <h4 style={{ fontSize: '16px' }}>12A Registration</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', height: '40px' }}>
              Registration Number: E/31940/MUM. Establishes the trust as a non-profit entity.
            </p>
            <button onClick={() => alert("Previewing 12A Document")} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '12px' }}>View Document</button>
          </div>

          <div className="glass-panel" style={{ background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
            <Award size={40} color="var(--success)" />
            <h4 style={{ fontSize: '16px' }}>NGO Darpan (NITI Aayog)</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', height: '40px' }}>
              Unique ID: MH/2016/0102345. Registered on NITI Aayog portal for transparency auditing.
            </p>
            <button onClick={() => alert("Previewing NGO Darpan Profile")} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '12px' }}>View Profile</button>
          </div>

        </div>
      </div>

    </div>
  );
}
