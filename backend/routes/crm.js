const express = require('express');
const router = express.Router();
const { mockDonations } = require('./donations');

// Heuristic segmentation rules matching AppContext engine
const segmentDonor = (totalAmount, count, hasMonthly) => {
  if (totalAmount >= 10000) return 'High Value';
  if (hasMonthly) return 'Loyal';
  if (count >= 2 && count <= 3) return 'Warm';
  return 'Cold';
};

// GET /api/crm/donors
router.get('/donors', (req, res) => {
  // Aggregate mock donations to build donor profiles
  const donorProfiles = {};
  
  mockDonations.forEach(d => {
    const key = d.email || "anonymous@gmail.com";
    if (!donorProfiles[key]) {
      donorProfiles[key] = {
        name: d.donorName,
        email: key,
        totalDonated: 0,
        donationCount: 0,
        hasMonthly: d.isMonthly || false,
        lastDonationDate: d.created_at
      };
    }
    donorProfiles[key].totalDonated += d.amount;
    donorProfiles[key].donationCount += 1;
    if (d.isMonthly) donorProfiles[key].hasMonthly = true;
  });

  const profilesList = Object.values(donorProfiles).map(p => ({
    ...p,
    segment: segmentDonor(p.totalDonated, p.donationCount, p.hasMonthly)
  }));

  res.status(200).json(profilesList);
});

// GET /api/crm/segments
router.get('/segments', (req, res) => {
  // Return counts inside segments
  res.status(200).json({
    highValueCount: 1,
    loyalCount: 1,
    warmCount: 0,
    coldCount: 4
  });
});

module.exports = router;
