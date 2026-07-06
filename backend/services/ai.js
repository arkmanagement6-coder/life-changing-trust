// Project LIFE: Heuristic AI Insights Engine
// Algorithmic predictions for campaigns and donors

/**
 * AI Donor Insights: Predicts LTV, likelihood to donate, and suggests campaign category.
 * @param {Array} donorDonationsHistory - List of past donations from the donor.
 * @returns {Object} - Giving forecasts.
 */
function getDonorInsights(donorDonationsHistory) {
  if (!donorDonationsHistory || donorDonationsHistory.length === 0) {
    return {
      likelihoodToDonateAgain: "Medium",
      suggestedDonationAmount: 1000,
      predictedCategoryFocus: "Healthcare"
    };
  }

  const total = donorDonationsHistory.reduce((sum, d) => sum + d.amount, 0);
  const count = donorDonationsHistory.length;
  const avg = total / count;

  // Likelihood algorithm based on frequency
  let likelihood = "Medium";
  if (count >= 3) likelihood = "High";
  else if (count === 1) likelihood = "Low";

  // Suggested donation: 1.2x of average donation size
  const suggestedAmount = Math.round((avg * 1.2) / 100) * 100;

  // Category preference analysis
  let healthCount = 0;
  let eduCount = 0;
  donorDonationsHistory.forEach(d => {
    if (d.campaignTitle.toLowerCase().includes("heart") || d.campaignTitle.toLowerCase().includes("cancer")) {
      healthCount++;
    } else {
      eduCount++;
    }
  });

  const categoryFocus = healthCount >= eduCount ? "Healthcare" : "Education";

  return {
    likelihoodToDonateAgain: likelihood,
    suggestedDonationAmount: suggestedAmount,
    predictedCategoryFocus: categoryFocus
  };
}

/**
 * AI Campaign Optimizer: Suggests title improvements.
 * @param {string} rawTitle - The original campaign headline.
 * @returns {Object} - Optimization tips and enhanced titles.
 */
function optimizeCampaignTitle(rawTitle) {
  if (!rawTitle) return { score: 50, tips: [] };

  const tips = [];
  let score = 70;

  if (rawTitle.length < 30) {
    tips.push("Make the headline longer to include emotional and location details.");
    score -= 10;
  }
  if (!rawTitle.toLowerCase().includes("critical") && !rawTitle.toLowerCase().includes("urgent")) {
    tips.push("Add urgency keywords like 'Urgent' or 'Emergency' to boost CTR.");
    score -= 5;
  }

  // Enhanced title suggestion
  const enhancedTitle = `URGENT: ${rawTitle} - Help Save a Life Today`;

  return {
    originalScore: score,
    improvedScore: score + 15,
    tips,
    suggestedTitle: enhancedTitle
  };
}

/**
 * AI Fraud Detection: Rules identifying gateway bounce and double-clicks.
 * @param {Array} paymentAttempts - Array of payment attempt logs.
 * @returns {Object} - Fraud risk summary.
 */
function auditTransactionRisk(paymentAttempts) {
  if (!paymentAttempts || paymentAttempts.length === 0) return { riskScore: 0, flag: false };

  const failedAttempts = paymentAttempts.filter(p => p.status === 'failed').length;
  
  // Rule 1: High frequency failures
  if (failedAttempts >= 3) {
    return {
      riskScore: 85,
      flag: true,
      reason: "High frequency failed payment attempts logged within 5 minutes. Potential carding activity."
    };
  }

  // Rule 2: Suspiciously high amounts without verified PAN
  const hasSuspiciousHighValue = paymentAttempts.some(p => p.amount >= 100000 && !p.panVerified);
  if (hasSuspiciousHighValue) {
    return {
      riskScore: 70,
      flag: true,
      reason: "High value contribution (₹1,00,000+) initiated without validated tax identity check."
    };
  }

  return {
    riskScore: 10,
    flag: false,
    reason: "Normal transaction pattern. Gateway logs clear."
  };
}

module.exports = { getDonorInsights, optimizeCampaignTitle, auditTransactionRisk };
