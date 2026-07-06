const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'LIFE_WEBHOOK_SECRET_2026';

// Seed mock donations database
const mockDonations = [
  { id: "TX1001", donor_id: "usr-donor", campaign_id: "c1", amount: 5000.00, payment_status: "success", payment_gateway: "razorpay", transaction_id: "pay_AaravSuccess123", is_anonymous: false, created_at: new Date() }
];

// POST /api/donations/create
router.post('/create', (req, res) => {
  const { campaign_id, amount, is_anonymous, payment_gateway } = req.body;

  if (!campaign_id || !amount) {
    return res.status(400).json({ error: "Campaign ID and amount are required" });
  }

  const newDonation = {
    id: "txn-" + Math.floor(1000 + Math.random()*9000),
    donor_id: req.user ? req.user.id : null,
    campaign_id,
    amount: parseFloat(amount),
    payment_status: "pending",
    payment_gateway: payment_gateway || "razorpay",
    transaction_id: "pay_pending_" + Math.floor(100000 + Math.random()*900000),
    is_anonymous: is_anonymous || false,
    created_at: new Date()
  };

  mockDonations.push(newDonation);
  
  res.status(201).json({
    message: "Checkout donation transaction created",
    donation: newDonation,
    checkoutUrl: "https://api.razorpay.com/v1/checkout/simulate"
  });
});

// GET /api/donations/:id
router.get('/:id', (req, res) => {
  const donation = mockDonations.find(d => d.id === req.params.id);
  if (!donation) {
    return res.status(404).json({ error: "Donation record not found" });
  }
  res.status(200).json(donation);
});

// GET /api/user/donations
router.get('/user/donations', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Access token validation failed" });
  }
  const userDonations = mockDonations.filter(d => d.donor_id === req.user.id);
  res.status(200).json(userDonations);
});

// POST /api/donations/webhook (CRITICAL Razorpay HMAC Signature verification)
router.post('/webhook', (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    
    if (!signature) {
      return res.status(400).json({ error: "Signature header not found" });
    }

    // Verify HMAC SHA256 signature
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    hmac.update(JSON.stringify(req.body));
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== signature) {
      console.warn(`[Security Alert]: Webhook signature mismatch check failed.`);
      return res.status(400).json({ error: "Invalid webhook HMAC signature" });
    }

    // Webhook actions logic
    const { event, payload } = req.body;
    if (event === 'payment.captured') {
      const paymentId = payload.payment.entity.id;
      const orderId = payload.payment.entity.order_id;
      const amount = payload.payment.entity.amount / 100; // in Rupees

      // Find pending transaction and update to success
      const donationIndex = mockDonations.findIndex(d => d.transaction_id === orderId || d.transaction_id.includes(paymentId));
      if (donationIndex !== -1) {
        mockDonations[donationIndex].payment_status = 'success';
        console.log(`[Webhook success]: Updated transaction ${mockDonations[donationIndex].id} status to success.`);
      }
    }

    res.status(200).json({ status: "processed", verified: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
export { mockDonations }; // Export database mock for CRM modules
