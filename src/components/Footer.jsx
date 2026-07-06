import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, Mail, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';

export default function Footer({ onDonateClick }) {
  const { setActiveTab, setCurrentCampaignId } = useContext(AppContext);

  const navigateTo = (tabName) => {
    setActiveTab(tabName);
    setCurrentCampaignId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid #1e293b', fontSize: '14px' }}>
      <div className="container">
        
        {/* Top Segment */}
        <div className="grid-4" style={{ marginBottom: '60px' }}>
          
          {/* Logo & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={18} color="white" fill="white" />
              </div>
              <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-title)', color: 'white' }}>
                Life Changing <span style={{ color: 'var(--secondary)' }}>Trust</span>
              </span>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '13px' }}>
              Life Changing Educational Charitable Trust represents India's most advanced transparency-first healthcare and rural education fundraising platform.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc', fontSize: '13px' }}>
                <Shield size={16} color="var(--primary)" />
                <span>80G tax benefit receipt (Exempted)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc', fontSize: '13px' }}>
                <CheckCircle size={16} color="var(--secondary)" />
                <span>12A Reg No: E/31940/MUM</span>
              </div>
            </div>
          </div>

          {/* Quick links: Causes */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '15px', fontFamily: 'var(--font-title)' }}>Public Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ hover: { color: 'white' } }}>Healthcare Crowdfund</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Rural Girl Education</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Trust Board Members</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('transparency'); }}>Income & Audits</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('transparency'); }}>Annual Action Plans</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Trust Registration Info</a></li>
            </ul>
          </div>

          {/* Dashboards & Portals */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '15px', fontFamily: 'var(--font-title)' }}>Ecosystem Portals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Donor Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Volunteer Center</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>CSR Partnership Hub</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Hospital Verification System</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>School Sponsorship Reports</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Administrative Command CRM</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '15px', fontFamily: 'var(--font-title)' }}>Emergency Assistance</h4>
            <p style={{ marginBottom: '16px', fontSize: '13px' }}>
              Need help launching a campaign or transferring funds? Get in touch with our helpdesk.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--primary)" />
                <span style={{ color: 'white', fontWeight: '600' }}>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--secondary)" />
                <span>support@lifechangingtrust.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--emergency)" />
                <span>102, Hiranandani Business Park, Powai, Mumbai, MH - 400076</span>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Segment - 40 Legal & Navigation Links */}
        <div style={{ borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '30px 0', marginBottom: '30px', fontSize: '12px', lineHeight: '1.8' }}>
          <div style={{ color: '#64748b', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px', fontSize: '11px', letterSpacing: '0.5px' }}>
            Quick Directory Links (40+ Sitemap Links)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 15px' }}>
            <a href="#" onClick={(e) => e.preventDefault()}>Home</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>About Us</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Our Core Vision</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Board Members</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Medical Campaigns</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>School Infrastructure</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Girls Scholarship</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Digital Education Hub</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Volunteer Community</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Referral Rewards</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>CSR Registration</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Corporate Proposals</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Income Statement</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Audit Reports 2025</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Transparency Index</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Hospital Onboarding</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>School Sponsorship Form</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Press Newsroom</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>NGO Impact Stories</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Media Gallery</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Emergency Helplines</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>FAQs</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Terms & Conditions</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Refund & Cancellation</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Careers</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Internships Program</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>80G Certificates Download</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>12A Registration Paper</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Annual Budgets</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>NGO Darpan ID</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>FCRA Approvals</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>CSR-1 Filings</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>AI Campaign Guidelines</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Fraud Detection Framework</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>WhatsApp Notification Settings</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Donor Wall of Fame</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Volunteer Taskboard</a> • 
            <a href="#" onClick={(e) => e.preventDefault()}>Partner Portal Login</a>
          </div>
        </div>

        {/* Bottom Segment */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
          <div>
            © {new Date().getFullYear()} Life Changing Educational & Charitable Trust. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
              Server Status: 99.98% Uptime (Fast Gateway)
            </span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('transparency'); }} style={{ color: 'white', textDecoration: 'underline' }}>View Legal Docs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
