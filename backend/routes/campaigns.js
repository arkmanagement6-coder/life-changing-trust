const express = require('express');
const router = express.Router();

// Seed initial campaigns matching AppContext models
const mockCampaigns = [
  { id: "c1", title: "Support Little Aarav's Critical Heart Transplant Surgery", slug: "aarav-heart-transplant", category: "healthcare", goal_amount: 1200000.00, raised_amount: 845000.00, status: "active", daysLeft: 12 },
  { id: "c2", title: "Sponsor Digital Learning Labs for 5 Rural Schools", slug: "digital-learning-labs-bihar", category: "education", goal_amount: 600000.00, raised_amount: 240000.00, status: "active", daysLeft: 25 }
];

// GET /api/campaigns
router.get('/', (req, res) => {
  const { category, status } = req.query;
  let results = [...mockCampaigns];

  if (category) {
    results = results.filter(c => c.category === category.toLowerCase());
  }
  if (status) {
    results = results.filter(c => c.status === status.toLowerCase());
  }

  res.status(200).json(results);
});

// GET /api/campaigns/:id
router.get('/:id', (req, res) => {
  const campaign = mockCampaigns.find(c => c.id === req.params.id || c.slug === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }
  res.status(200).json(campaign);
});

// POST /api/campaigns
router.post('/', (req, res) => {
  const { title, description, category, goal_amount, start_date, end_date } = req.body;

  if (!title || !goal_amount) {
    return res.status(400).json({ error: "Title and goal amount are required" });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const newCampaign = {
    id: "camp-" + Math.floor(1000 + Math.random()*9000),
    title,
    slug,
    description: description || "",
    category: category || "healthcare",
    goal_amount: parseFloat(goal_amount),
    raised_amount: 0.00,
    status: "draft",
    start_date: start_date || new Date(),
    end_date: end_date || null,
    created_at: new Date()
  };

  mockCampaigns.push(newCampaign);
  res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
});

// PUT /api/campaigns/:id
router.put('/:id', (req, res) => {
  const campaignIndex = mockCampaigns.findIndex(c => c.id === req.params.id);
  if (campaignIndex === -1) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const updatedCampaign = {
    ...mockCampaigns[campaignIndex],
    ...req.body,
    updated_at: new Date()
  };

  mockCampaigns[campaignIndex] = updatedCampaign;
  res.status(200).json({ message: "Campaign updated successfully", campaign: updatedCampaign });
});

// DELETE /api/campaigns/:id (Archive)
router.delete('/:id', (req, res) => {
  const campaignIndex = mockCampaigns.findIndex(c => c.id === req.params.id);
  if (campaignIndex === -1) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  mockCampaigns[campaignIndex].status = 'paused'; // Archiving or pausing
  res.status(200).json({ message: "Campaign archived successfully", campaign: mockCampaigns[campaignIndex] });
});

module.exports = router;
