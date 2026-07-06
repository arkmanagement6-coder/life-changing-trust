import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Award, Heart, CheckCircle2, Star, Download, ChevronRight, UserPlus, Users, Sparkles, MapPin, Calendar, CircleDot } from 'lucide-react';

// Counter component for animating numbers from zero
const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) return;
    if (start === end) {
      setCount(end);
      return;
    }
    
    let totalDuration = 1200;
    let stepTime = 25;
    let steps = totalDuration / stepTime;
    let increment = end / steps;
    
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
};

export default function LandingPage({ onDonateClick, onCampaignClick }) {
  const { campaigns, volunteers, submitCsrProposal, cmsBanners } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Interactive Map State
  const [activeState, setActiveState] = useState('Maharashtra');
  const stateData = {
    'Delhi': { projects: 8, raised: 3200000, lives: 1400, description: "Running 4 rural tuition classes and supporting 4 pediatric surgeries at Max Hospital." },
    'Maharashtra': { projects: 15, raised: 6400000, lives: 3200, description: "Supporting girl child school tuitions in Pune and chemotherapy setups in Mumbai TMH." },
    'Bihar': { projects: 12, raised: 2800000, lives: 4500, description: "Setting up 5 solar powered computer learning labs in Gaya district." },
    'Karnataka': { projects: 9, raised: 4100000, lives: 1900, description: "Providing higher education scholarships to meritorious girl children in Bangalore." },
    'West Bengal': { projects: 7, raised: 1900000, lives: 1200, description: "Supporting primary school textbook collections and malnutrition health drives." }
  };

  // Interactive Transparency Chart State
  const [activeChartTab, setActiveChartTab] = useState('expenses'); // 'expenses', 'income'

  // CSR proposal modal simulator
  const [csrCompany, setCsrCompany] = useState('');
  const [csrEmail, setCsrEmail] = useState('');
  const [csrMessage, setCsrMessage] = useState('');
  const [csrSubmitted, setCsrSubmitted] = useState(false);

  const handleCsrSubmit = (e) => {
    e.preventDefault();
    if (!csrCompany || !csrEmail) return;
    submitCsrProposal({
      companyName: csrCompany,
      projectTitle: "Corporate Alliance Program",
      budgetRequested: 1000000,
      description: csrMessage
    });
    setCsrSubmitted(true);
    setTimeout(() => {
      setCsrSubmitted(false);
      setCsrCompany('');
      setCsrEmail('');
      setCsrMessage('');
    }, 4000);
  };

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(c => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  // Featured Campaign (Aarav's heart transplant)
  const featured = campaigns.find(c => c.id === 1) || campaigns[0];
  const featuredProgress = (featured.raised / featured.goal) * 100;

  return (
    <div style={{ width: '100%' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        background: 'linear-gradient(rgba(15, 138, 95, 0.07), rgba(255, 138, 0, 0.05)), url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: '#1e293b'
      }}>
        {/* Shadow Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95) 40%, rgba(255, 255, 255, 0.2) 100%)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '60px 24px', width: '100%' }}>
          <div style={{ maxWidth: '650px', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 138, 95, 0.1)', padding: '8px 16px', borderRadius: '50px', marginBottom: '24px', border: '1px solid rgba(15, 138, 95, 0.2)' }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                India's AI-Powered Fundraising Ecosystem
              </span>
            </div>
            
            <h1 style={{ fontSize: '54px', fontWeight: '800', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-1px', fontFamily: 'var(--font-title)' }}>
              {cmsBanners?.headline || "Together We Can Change Lives"}
            </h1>
            
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '36px' }}>
              {cmsBanners?.subheading || "Changing Lives Through Education, Healthcare and Compassion."}
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <button onClick={onDonateClick} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Donate Now
              </button>
              <button onClick={() => {
                const element = document.getElementById('campaigns-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} className="btn btn-outline" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Explore Campaigns
              </button>
            </div>

            {/* Live Counters */}
            <div className="grid-3" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>
                  <AnimatedCounter value="24500000" prefix="₹" />
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>
                  Total Donations Raised
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--secondary)' }}>
                  <AnimatedCounter value="14200" suffix="+" />
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>
                  Lives Impacted
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text)' }}>
                  <AnimatedCounter value="120" suffix="+" />
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>
                  Verified Campaigns
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section style={{ backgroundColor: 'white', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} color="var(--primary)" />
              <span style={{ fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>80G Tax Benefit Exemption</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={24} color="var(--secondary)" />
              <span style={{ fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>12A Certified NGO Trust</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={24} color="var(--success)" />
              <span style={{ fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>100% Transparent Financials</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>RAZORPAY SECURE</div>
              <span style={{ fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Safe & encrypted payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CAMPAIGN (Emergency Healthcare) */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--emergency)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Critical Case Alert</span>
            <h2 style={{ fontSize: '36px', marginTop: '10px' }}>Featured Emergency Fundraiser</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
              This patient requires immediate surgery. We audit all donations to settle directly with the hospital billers.
            </p>
          </div>

          <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', padding: '40px', background: 'white' }}>
            
            {/* Left: Image and details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '350px' }}>
                <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge badge-emergency" style={{ position: 'absolute', top: '20px', left: '20px', padding: '8px 16px', fontSize: '13px' }}>
                  Doctor Verified
                </span>
              </div>
              <h3 style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => onCampaignClick(featured.id)}>
                {featured.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {featured.story.substring(0, 220)}...
              </p>
              <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                <div>
                  <strong>Hospital:</strong> {featured.hospitalName}
                </div>
                <div>
                  <strong>Doctor:</strong> {featured.doctorName}
                </div>
              </div>
            </div>

            {/* Right: Funding Progress Indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              
              {/* SVG circular progress representation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '30px' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="var(--primary)" strokeWidth="8" fill="transparent" 
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * featuredProgress) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)" />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontWeight: '750', fontSize: '16px', color: 'var(--primary)' }}>
                    {Math.floor(featuredProgress)}%
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '18px' }}>Funding Goal Reached</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {featured.donorsCount} compassionate donors have contributed.
                  </p>
                </div>
              </div>

              {/* Progress bar details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600' }}>
                <span>Raised: ₹{featured.raised.toLocaleString('en-IN')}</span>
                <span style={{ color: 'var(--text-muted)' }}>Goal: ₹{featured.goal.toLocaleString('en-IN')}</span>
              </div>
              
              <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{ width: `${featuredProgress}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '10px' }}></div>
              </div>

              <div className="grid-3" style={{ marginBottom: '30px', textAlign: 'center' }}>
                <div style={{ background: 'white', padding: '12px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Days Left</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)', marginTop: '4px' }}>{featured.daysLeft}</div>
                </div>
                <div style={{ background: 'white', padding: '12px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Tax Savings</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginTop: '4px' }}>50%</div>
                </div>
                <div style={{ background: 'white', padding: '12px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Safety</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--success)', marginTop: '4px' }}>100%</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={() => onCampaignClick(featured.id)} className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  Sponsor Case Treatment
                </button>
                <button onClick={onDonateClick} className="btn btn-outline" style={{ width: '100%', padding: '14px' }}>
                  Quick Donate ₹1,000
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CAMPAIGNS GRID SECTION */}
      <section id="campaigns-section" style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Support Active Causes</span>
              <h2 style={{ fontSize: '32px', marginTop: '8px' }}>Empower Health & Education</h2>
            </div>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '50px', marginTop: '20px' }}>
              {['All', 'Healthcare', 'Education'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    border: 'none',
                    padding: '8px 24px',
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                    color: selectedCategory === cat ? 'white' : 'var(--text)',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid-3">
            {filteredCampaigns.map(c => {
              const progress = (c.raised / c.goal) * 100;
              return (
                <div key={c.id} className="glass-panel" style={{ background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge badge-primary" style={{ position: 'absolute', top: '16px', left: '16px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                      {c.category}
                    </span>
                  </div>
                  
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'left' }}>
                    <h4 
                      style={{ fontSize: '18px', lineHeight: '1.4', marginBottom: '10px', height: '50px', overflow: 'hidden', cursor: 'pointer' }}
                      onClick={() => onCampaignClick(c.id)}
                    >
                      {c.title}
                    </h4>
                    
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', height: '40px', overflow: 'hidden' }}>
                      {c.tagline}
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                      {/* Progress Bar */}
                      <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>
                        <span style={{ color: 'var(--primary)' }}>₹{c.raised.toLocaleString('en-IN')} Raised</span>
                        <span style={{ color: 'var(--text-muted)' }}>Goal: ₹{c.goal.toLocaleString('en-IN')}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          <strong>{c.daysLeft}</strong> days left
                        </span>
                        <button onClick={() => onCampaignClick(c.id)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
                          Sponsor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. IMPACT SECTION (Interactive India Map) */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>National Impact Index</span>
            <h2 style={{ fontSize: '32px', marginTop: '8px' }}>Project LIFE Footprint in India</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
              Click on the active states to review total funds deployed, lives impacted, and ongoing relief projects.
            </p>
          </div>

          <div className="grid-2" style={{ alignItems: 'center' }}>
            
            {/* Interactive SVG representation of India map */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="400" height="420" viewBox="0 0 400 450" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }}>
                {/* Background outline grid */}
                <rect x="0" y="0" width="400" height="450" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                
                {/* Stylized Node Coordinates for India States */}
                {/* Delhi */}
                <g onClick={() => setActiveState('Delhi')} style={{ cursor: 'pointer' }}>
                  <circle cx="160" cy="140" r={activeState === 'Delhi' ? '28' : '22'} fill={activeState === 'Delhi' ? 'var(--primary)' : 'rgba(15, 138, 95, 0.15)'} stroke="var(--primary)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                  <text x="160" y="144" textAnchor="middle" fill={activeState === 'Delhi' ? 'white' : 'var(--text)'} fontWeight="700" fontSize="12">DL</text>
                  <line x1="160" y1="140" x2="190" y2="100" stroke="#94a3b8" strokeDasharray="3,3" />
                </g>

                {/* Maharashtra */}
                <g onClick={() => setActiveState('Maharashtra')} style={{ cursor: 'pointer' }}>
                  <circle cx="150" cy="260" r={activeState === 'Maharashtra' ? '28' : '22'} fill={activeState === 'Maharashtra' ? 'var(--primary)' : 'rgba(15, 138, 95, 0.15)'} stroke="var(--primary)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                  <text x="150" y="264" textAnchor="middle" fill={activeState === 'Maharashtra' ? 'white' : 'var(--text)'} fontWeight="700" fontSize="12">MH</text>
                </g>

                {/* Bihar */}
                <g onClick={() => setActiveState('Bihar')} style={{ cursor: 'pointer' }}>
                  <circle cx="260" cy="180" r={activeState === 'Bihar' ? '28' : '22'} fill={activeState === 'Bihar' ? 'var(--primary)' : 'rgba(15, 138, 95, 0.15)'} stroke="var(--primary)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                  <text x="260" y="184" textAnchor="middle" fill={activeState === 'Bihar' ? 'white' : 'var(--text)'} fontWeight="700" fontSize="12">BR</text>
                </g>

                {/* West Bengal */}
                <g onClick={() => setActiveState('West Bengal')} style={{ cursor: 'pointer' }}>
                  <circle cx="290" cy="220" r={activeState === 'West Bengal' ? '28' : '22'} fill={activeState === 'West Bengal' ? 'var(--primary)' : 'rgba(15, 138, 95, 0.15)'} stroke="var(--primary)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                  <text x="290" y="224" textAnchor="middle" fill={activeState === 'West Bengal' ? 'white' : 'var(--text)'} fontWeight="700" fontSize="12">WB</text>
                </g>

                {/* Karnataka */}
                <g onClick={() => setActiveState('Karnataka')} style={{ cursor: 'pointer' }}>
                  <circle cx="170" cy="350" r={activeState === 'Karnataka' ? '28' : '22'} fill={activeState === 'Karnataka' ? 'var(--primary)' : 'rgba(15, 138, 95, 0.15)'} stroke="var(--primary)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                  <text x="170" y="354" textAnchor="middle" fill={activeState === 'Karnataka' ? 'white' : 'var(--text)'} fontWeight="700" fontSize="12">KA</text>
                </g>

                <text x="200" y="30" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">Schematic Map: Select State for Active Reports</text>
              </svg>
            </div>

            {/* State details */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '20px' }}>
                <span style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '750' }}>Region Statistics</span>
                <h3 style={{ fontSize: '32px', color: 'var(--text)', marginTop: '4px' }}>{activeState} State</h3>
              </div>

              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {stateData[activeState].description}
              </p>

              <div className="grid-3" style={{ marginTop: '10px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '22px' }}>
                    <AnimatedCounter value={stateData[activeState].projects} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '600' }}>Active Projects</div>
                </div>
                
                <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '22px' }}>
                    <AnimatedCounter value={stateData[activeState].lives} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '600' }}>Lives Impacted</div>
                </div>

                <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ color: 'var(--text)', fontWeight: '700', fontSize: '18px' }}>
                    <AnimatedCounter value={stateData[activeState].raised} prefix="₹" />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: '600' }}>Funds Deployed</div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button onClick={onDonateClick} className="btn btn-primary">
                  Sponsor Projects in {activeState}
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TIMELINE */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Historical Legacy</span>
            <h2 style={{ fontSize: '32px', marginTop: '8px' }}>Our Journey of Impact</h2>
          </div>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
            {/* Center Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '4px', backgroundColor: '#e2e8f0', transform: 'translateX(-50%)' }}></div>

            {/* Timeline nodes */}
            {[
              { year: "2013", title: "Trust Incorporation", desc: "Life Changing Educational & Charitable Trust registered in Mumbai to provide primary school books to 50 children." },
              { year: "2016", title: "80G & 12A Exemptions", desc: "Received income tax exemptions enabling high-net-worth individuals and corporate donors to fund critical surgeries." },
              { year: "2020", title: "COVID Relief Response", desc: "Deployed ₹1.2 Crore in dry ration kits and oxygen concentrators across Maharashtra and Pune." },
              { year: "2025", title: "AI-Powered Launch", desc: "Redesigned the trust ecosystem to include automated 80G tax receipt, blockchain ledgers, and AI fraud monitoring." },
              { year: "Future Vision", title: "Zero Child Dropout", desc: "Initiating digital high school learning platforms in 250 districts across India by 2030." }
            ].map((node, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  marginBottom: '50px',
                  width: '100%'
                }}>
                  {/* Bullet center dot */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: '4px solid var(--primary)',
                    zIndex: 10
                  }}></div>

                  {/* Card Container */}
                  <div style={{
                    width: '45%',
                    textAlign: 'left'
                  }}>
                    <div className="glass-panel" style={{ padding: '24px', background: '#f8fafc' }}>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>{node.year}</span>
                      <h4 style={{ fontSize: '16px', margin: '4px 0 10px' }}>{node.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>{node.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. FINANCIAL TRANSPARENCY (Interactive Charts) */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Trust Financials</span>
            <h2 style={{ fontSize: '32px', marginTop: '8px' }}>Where Does Your Money Go?</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
              We dedicate 85% of all donations directly to child healthcare and school resources. Explore our transparent expense charts.
            </p>
          </div>

          <div className="glass-panel" style={{ background: 'white', padding: '40px' }}>
            
            {/* Chart toggle tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
              <button 
                onClick={() => setActiveChartTab('expenses')}
                style={{
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: activeChartTab === 'expenses' ? 'var(--primary)' : '#f1f5f9',
                  color: activeChartTab === 'expenses' ? 'white' : 'var(--text)'
                }}
              >
                Expense Allocation
              </button>
              <button 
                onClick={() => setActiveChartTab('income')}
                style={{
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: activeChartTab === 'income' ? 'var(--primary)' : '#f1f5f9',
                  color: activeChartTab === 'income' ? 'white' : 'var(--text)'
                }}
              >
                Annual Audit Receipts
              </button>
            </div>

            <div className="grid-2" style={{ alignItems: 'center' }}>
              
              {/* Left: Custom SVG chart */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {activeChartTab === 'expenses' ? (
                  // Donut Chart
                  <svg width="250" height="250" viewBox="0 0 200 200">
                    {/* Circle sectors: Stroke dasharray calculations */}
                    {/* Pediatric Treatment (55%): Dasharray 55 * 3.6 = 198, offset 0 */}
                    <circle cx="100" cy="100" r="70" stroke="var(--primary)" strokeWidth="25" fill="transparent" 
                      strokeDasharray="242 440" strokeDashoffset="0" />
                    
                    {/* Child Education (30%): Dasharray 30 * 4.4 = 132, offset -242 */}
                    <circle cx="100" cy="100" r="70" stroke="var(--secondary)" strokeWidth="25" fill="transparent" 
                      strokeDasharray="132 440" strokeDashoffset="-242" />

                    {/* Operational expenses (10%): Dasharray 44, offset -374 */}
                    <circle cx="100" cy="100" r="70" stroke="var(--text-muted)" strokeWidth="25" fill="transparent" 
                      strokeDasharray="44 440" strokeDashoffset="-374" />

                    {/* Tech/Fundraising (5%): Dasharray 22, offset -418 */}
                    <circle cx="100" cy="100" r="70" stroke="var(--warning)" strokeWidth="25" fill="transparent" 
                      strokeDasharray="22 440" strokeDashoffset="-418" />

                    <circle cx="100" cy="100" r="55" fill="white" />
                    <text x="100" y="95" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--text)">Rs. Deployed</text>
                    <text x="100" y="115" textAnchor="middle" fontWeight="800" fontSize="18" fill="var(--primary)">85% Direct</text>
                  </svg>
                ) : (
                  // Bar Chart
                  <svg width="300" height="200" viewBox="0 0 300 200">
                    <line x1="40" y1="160" x2="280" y2="160" stroke="#e2e8f0" strokeWidth="2" />
                    <line x1="40" y1="20" x2="40" y2="160" stroke="#e2e8f0" strokeWidth="2" />
                    
                    {/* Bars */}
                    {/* 2023 */}
                    <rect x="60" y="110" width="30" height="50" fill="rgba(15, 138, 95, 0.4)" rx="4" />
                    <text x="75" y="180" textAnchor="middle" fontSize="11" fill="var(--text-muted)">2023</text>
                    <text x="75" y="100" textAnchor="middle" fontSize="10" fontWeight="600">₹45L</text>

                    {/* 2024 */}
                    <rect x="110" y="80" width="30" height="80" fill="rgba(15, 138, 95, 0.6)" rx="4" />
                    <text x="125" y="180" textAnchor="middle" fontSize="11" fill="var(--text-muted)">2024</text>
                    <text x="125" y="70" textAnchor="middle" fontSize="10" fontWeight="600">₹82L</text>

                    {/* 2025 */}
                    <rect x="160" y="50" width="30" height="110" fill="rgba(15, 138, 95, 0.8)" rx="4" />
                    <text x="175" y="180" textAnchor="middle" fontSize="11" fill="var(--text-muted)">2025</text>
                    <text x="175" y="40" textAnchor="middle" fontSize="10" fontWeight="600">₹1.2C</text>

                    {/* 2026 */}
                    <rect x="210" y="20" width="30" height="140" fill="var(--primary)" rx="4" />
                    <text x="225" y="180" textAnchor="middle" fontSize="11" fill="var(--text-muted)">2026</text>
                    <text x="225" y="12" textAnchor="middle" fontSize="10" fontWeight="700">₹1.7C</text>
                  </svg>
                )}
              </div>

              {/* Right: Explanatory indicators */}
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '22px' }}>
                  {activeChartTab === 'expenses' ? 'Allocation Breakdowns' : 'Year-on-Year Growth Audited'}
                </h3>
                
                {activeChartTab === 'expenses' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <CircleDot size={14} color="var(--primary)" />
                        <strong>Pediatric Surgeries & Medicine</strong>
                      </span>
                      <span>55%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <CircleDot size={14} color="var(--secondary)" />
                        <strong>Child Tuition & School Labs</strong>
                      </span>
                      <span>30%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <CircleDot size={14} color="var(--text-muted)" />
                        <strong>Operations & Compliance auditing</strong>
                      </span>
                      <span>10%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <CircleDot size={14} color="var(--warning)" />
                        <strong>Fundraising campaigns & Tech</strong>
                      </span>
                      <span>5%</span>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>
                    Project LIFE operates on strict compliance codes. Our fundraising margins are kept below 5% to channel maximum capital to grassroots beneficiaries. Annual audit statements are verified by independent chartered accountants.
                  </p>
                )}

                <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                  <button className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <Download size={14} />
                    <span>Download Annual Audit PDF</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. CSR PARTNERS SECTION */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          
          <div className="grid-2" style={{ alignItems: 'center' }}>
            
            {/* Left: Proposal Request Form */}
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Corporate Partnerships</span>
              <h2 style={{ fontSize: '32px', marginTop: '8px', marginBottom: '20px' }}>Become a CSR Alliance Partner</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                Join forces with us to establish scalable digital labs or pediatric funding schemes. We coordinate complete CSR filings (CSR-1, audited receipts, board reports) for seamless tax filing.
              </p>
              
              <form onSubmit={handleCsrSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={csrCompany}
                    onChange={(e) => setCsrCompany(e.target.value)}
                    required
                    className="form-control" 
                  />
                  <input 
                    type="email" 
                    placeholder="Corporate Email" 
                    value={csrEmail}
                    onChange={(e) => setCsrEmail(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
                <textarea 
                  rows="3" 
                  placeholder="Tell us about your target CSR focus (e.g. Health, Education, Location)" 
                  value={csrMessage}
                  onChange={(e) => setCsrMessage(e.target.value)}
                  className="form-control"
                  style={{ resize: 'none' }}
                />
                
                {csrSubmitted ? (
                  <div style={{ color: 'var(--success)', fontWeight: '600', fontSize: '14px' }}>
                    ✔ CSR Inquiry registered! Our Board Directors will email you a proposal in 24 hours.
                  </div>
                ) : (
                  <button type="submit" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
                    Download Partnership Proposal
                  </button>
                )}
              </form>
            </div>

            {/* Right: Scrolling logos strip & achievements list */}
            <div style={{ paddingLeft: '40px' }}>
              <div className="glass-panel" style={{ padding: '30px', background: '#f8fafc', textAlign: 'left' }}>
                <h4 style={{ marginBottom: '20px' }}>Our Trusted Corporate Partners</h4>
                
                {/* Logo Carousel Placeholder */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
                  {['TCS', 'Infosys', 'HDFC Bank', 'Reliance', 'ICICI Foundation', 'Tata Trust'].map((partner, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      height: '60px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      color: 'var(--text-muted)',
                      fontSize: '13px'
                    }}>
                      {partner}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '13.5px' }}>Compliant with MCA CSR Guidelines (Section 135)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '13.5px' }}>Form CSR-1 Registration: CSR00012345</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '13.5px' }}>Detailed micro-project milestone tracking dashboard</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. VOLUNTEER SECTION */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div className="grid-2" style={{ alignItems: 'center' }}>
            
            {/* Left: Achievements Leaderboard */}
            <div className="glass-panel" style={{ background: 'white', padding: '30px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="var(--primary)" />
                <span>Volunteer Top Leaderboard</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {volunteers.slice(0, 3).map((v, index) => (
                  <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: index === 0 ? 'var(--secondary)' : index === 1 ? '#94a3b8' : '#cd7f32',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {index + 1}
                      </span>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '13.5px' }}>{v.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Location: {v.location}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '13.5px' }}>{v.points} pts</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{v.tasksCompleted} Tasks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Volunteer program CTA */}
            <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>On-Ground Impact</span>
              <h2 style={{ fontSize: '32px', marginTop: '8px', marginBottom: '16px' }}>Become a Certified LIFE Volunteer</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                No contribution is small. Translate campaigns, coordinate textbook collection runs, or audit documents online. Accumulate points, climb our leaderboard, and earn official Trust certificates.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => {
                    alert("Please switch your Role to 'Volunteer' in the header to access the Volunteer Dashboard and check out active tasks!");
                  }}
                  className="btn btn-primary" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <UserPlus size={16} />
                  <span>Join Volunteer Force</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="glass-panel" style={{
            background: 'linear-gradient(135deg, rgba(15, 138, 95, 0.9) 0%, rgba(255, 138, 0, 0.8) 100%)',
            padding: '60px 40px',
            borderRadius: '24px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '12px', fontFamily: 'var(--font-title)' }}>
              Subscribe to Impact Updates
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '500px', margin: '0 auto 30px', fontSize: '15px', lineHeight: '1.6' }}>
              No spam. Only monthly auditable charts showing how funds were spent and stories of children studying and recovering.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscription successful! You'll receive our monthly transparency digest."); }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '500px', margin: '0 auto' }}>
              <input 
                type="email" 
                placeholder="Enter your personal email" 
                required 
                style={{
                  padding: '14px 20px',
                  borderRadius: '50px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  flexGrow: 1,
                  fontFamily: 'var(--font-body)'
                }} 
              />
              <button type="submit" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '14px 28px', fontWeight: '700' }}>
                Join Newsletter
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
