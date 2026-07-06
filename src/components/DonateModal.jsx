import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { X, Heart, Shield, Check, CreditCard, Send, Share2 } from 'lucide-react';

export default function DonateModal({ isOpen, onClose, selectedCampaignId }) {
  const { campaigns, addDonation } = useContext(AppContext);

  // Steps: 'amount' | 'details' | 'payment' | 'success'
  const [step, setStep] = useState('amount');
  
  // Form States
  const [campaignId, setCampaignId] = useState(selectedCampaignId || (campaigns[0] ? campaigns[0].id : ''));
  const [amount, setAmount] = useState('1001');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  
  // Payment card info
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  
  // Loading & Success States
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTxn, setGeneratedTxn] = useState(null);

  if (!isOpen) return null;

  const activeCampaign = campaigns.find(c => c.id === parseInt(campaignId)) || campaigns[0];

  const handleNextToDetails = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('details');
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setStep('payment');
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway delay (Razorpay / Cashfree)
    setTimeout(() => {
      setIsProcessing(false);
      const txn = addDonation({
        campaignId: activeCampaign.id,
        campaignTitle: activeCampaign.title,
        amount,
        name: isAnonymous ? "Anonymous" : name,
        email,
        pan,
        isAnonymous,
        isMonthly
      });
      setGeneratedTxn(txn);
      setStep('success');
    }, 1500);
  };

  const handlePrintReceipt = () => {
    // Print window action for print-styled receipts
    const printContent = document.getElementById('receipt-print-section');
    if (!printContent) {
      alert("Receipt content loading. Please wait or trigger download from the donor dashboard.");
      return;
    }
    const pri = window.open('', '_blank');
    pri.document.write(printContent.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.close();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      
      {/* Modal Container */}
      <div className="glass-panel" style={{
        background: 'white',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(15, 138, 95, 0.15)',
        position: 'relative',
        padding: '30px'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px', right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text)'
          }}
        >
          <X size={18} />
        </button>

        {/* STEP 1: CHOOSE AMOUNT & CAUSE */}
        {step === 'amount' && (
          <form onSubmit={handleNextToDetails} style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Heart size={24} color="var(--primary)" fill="var(--primary)" />
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Sponsor a Cause</h3>
            </div>

            {/* Cause Select */}
            <div className="form-group">
              <label>Select Campaign</label>
              <select 
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="form-control"
                style={{ fontWeight: '600' }}
              >
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>
                    [{c.category}] {c.title.substring(0, 45)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Amounts */}
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Choose Donation Amount</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
                {['501', '1001', '2501', '5000'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    style={{
                      padding: '10px 0',
                      border: amount === val ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '750',
                      background: amount === val ? 'rgba(15, 138, 95, 0.05)' : 'white',
                      color: amount === val ? 'var(--primary)' : 'var(--text)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
              <input 
                type="number" 
                placeholder="Enter Custom Amount (₹)" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: '16px', fontWeight: '700' }}
              />
            </div>

            {/* Monthly toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', margin: '20px 0', border: '1px solid #e2e8f0' }}>
              <div>
                <strong style={{ fontSize: '13.5px', display: 'block' }}>Make this a monthly donation</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Help children recover with regular support.</span>
              </div>
              <input 
                type="checkbox" 
                checked={isMonthly}
                onChange={(e) => setIsMonthly(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Next: Enter Details
            </button>
          </form>
        )}

        {/* STEP 2: DONOR DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleNextToPayment} style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>Donor Information</h3>
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            <div className="form-group">
              <label>PAN Card Number (Required for 80G tax benefit)</label>
              <input 
                type="text" 
                placeholder="e.g. ABCDE1234F" 
                value={pan} 
                onChange={(e) => setPan(e.target.value.toUpperCase())} 
                className="form-control" 
                maxLength="10"
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Required to claim 50% tax deductions on income tax portals.</span>
            </div>

            {/* Anonymous toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0' }}>
              <input 
                type="checkbox" 
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="anon" style={{ fontSize: '13.5px', color: 'var(--text)', cursor: 'pointer' }}>
                Keep my donation anonymous on the public leaderboard.
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => setStep('amount')} className="btn btn-outline" style={{ flexGrow: 1 }}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                Next: Payment
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: MOCK PAYMENT OVERLAY */}
        {step === 'payment' && (
          <form onSubmit={handleProcessPayment} style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Razorpay Secure Checkout</h3>
              <span style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '15px' }}>₹{parseFloat(amount).toLocaleString('en-IN')}</span>
            </div>

            {isProcessing ? (
              <div style={{ padding: '40px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid var(--primary)',
                  borderRadius: '50%',
                  width: '40px', height: '40px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <div>
                  <strong>Processing Secure Transaction...</strong>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Communicating with Razorpay merchant nodes.</p>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={20} color="var(--primary)" />
                  <div>
                    <strong style={{ fontSize: '13.5px', display: 'block' }}>Credit / Debit Card Payment</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Direct PCI-compliant integration</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                    required 
                    className="form-control" 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      value={cardExpiry} 
                      onChange={(e) => setCardExpiry(e.target.value)} 
                      required 
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>CVV</label>
                    <input 
                      type="password" 
                      value={cardCvv} 
                      onChange={(e) => setCardCvv(e.target.value)} 
                      required 
                      className="form-control" 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                  <button type="button" onClick={() => setStep('details')} className="btn btn-outline" style={{ flexGrow: 1 }}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                    Authorize Payment
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* STEP 4: DONATION SUCCESS AND RECEIPT */}
        {step === 'success' && generatedTxn && (
          <div style={{ textAlign: 'center' }}>
            
            {/* CONFETTI CSS OVERLAYS */}
            <div style={{ position: 'relative', height: '10px', overflow: 'hidden' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  left: `${15 + i * 15}%`,
                  backgroundColor: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                  animationDelay: `${i * 0.2}s`
                }}></div>
              ))}
            </div>

            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              backgroundColor: 'rgba(22, 163, 74, 0.1)',
              color: 'var(--success)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '20px auto 16px'
            }}>
              <Check size={32} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>Thank You for Giving!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
              Your donation of <strong>₹{parseFloat(amount).toLocaleString('en-IN')}</strong> has been successfully settled to: <br />
              <strong>{activeCampaign.title}</strong>
            </p>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', margin: '24px 0', textAlign: 'left', fontSize: '13px' }}>
              <div><strong>Receipt Number:</strong> {generatedTxn.receiptNo}</div>
              <div style={{ marginTop: '4px' }}><strong>Transaction ID:</strong> {generatedTxn.id}</div>
              <div style={{ marginTop: '4px' }}><strong>80G Tax Benefit:</strong> {pan ? `Registered under PAN: ${pan}` : "Not claimed (No PAN provided)"}</div>
            </div>

            {/* MOCK WHATSAPP NOTIFICATION INDICATOR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(22, 163, 74, 0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(22, 163, 74, 0.15)', marginBottom: '24px', textAlign: 'left', fontSize: '12.5px' }}>
              <Send size={18} color="var(--success)" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: '700', color: 'var(--success)' }}>WhatsApp Dispatch Alert:</span>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>Automated receipt and treatment updates sent to your phone.</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={handlePrintReceipt} className="btn btn-primary" style={{ width: '100%' }}>
                Print / Download 80G Tax Receipt
              </button>
              <button 
                onClick={() => alert("Sharing link copied: Spread this campaign on WhatsApp/Facebook!")}
                className="btn btn-outline" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Share2 size={14} />
                <span>Share Campaign</span>
              </button>
            </div>

            {/* INVISIBLE PRINT BLOCK FOR RECEIPT */}
            <div id="receipt-print-section" style={{ display: 'none' }}>
              <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#1e293b', border: '2px solid #cbd5e1', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0F8A5F', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ color: '#0F8A5F', margin: 0 }}>Project LIFE</h2>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Life Changing Educational & Charitable Trust</span>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '12px' }}>
                    <strong>Reg No:</strong> E/31940/MUM <br />
                    80G Approved Exemption Receipt
                  </div>
                </div>

                <h3 style={{ textAlign: 'center', color: '#1e293b', textTransform: 'uppercase', marginBottom: '30px' }}>Donation Receipt (Form 58G)</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px', marginBottom: '30px' }}>
                  <div>
                    <strong>Donor Name:</strong> {name || "Anonymous"} <br />
                    <strong>Donor Email:</strong> {email} <br />
                    <strong>Donor PAN:</strong> {pan || "N/A"}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>Receipt No:</strong> {generatedTxn.receiptNo} <br />
                    <strong>Date:</strong> {generatedTxn.date} <br />
                    <strong>Txn ID:</strong> {generatedTxn.id}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', padding: '16px 0', marginBottom: '30px', fontSize: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Contribution to: {activeCampaign.title}</span>
                    <span>₹{parseFloat(amount).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5' }}>
                  * This receipt is generated by the Life Changing Educational & Charitable Trust. Donations are eligible for deduction under Section 80G of the Income Tax Act, 1961. The benefit will automatically register under your income tax profile based on the PAN card number provided above.
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontSize: '12px', borderTop: '1px dashed #cbd5e1', paddingTop: '20px' }}>
                  <div>
                    <strong>Audited System Seal</strong> <br />
                    <span style={{ color: '#10b981' }}>Verified PCI Gateway</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>Authorized Trustee Sign</strong> <br />
                    Dr. Shalini Deshmukh
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
