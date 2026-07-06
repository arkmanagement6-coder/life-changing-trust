const crypto = require('crypto');

/**
 * Verifies the signature header sent by Razorpay webhook using HMAC SHA256.
 * @param {Object} rawBodyPayload - The raw JSON body object received from webhook.
 * @param {string} signatureHeader - The signature header ('x-razorpay-signature').
 * @param {string} webhookSecretSecret - The configured webhook secret key.
 * @returns {boolean} - True if signature is valid, false otherwise.
 */
function verifyRazorpaySignature(rawBodyPayload, signatureHeader, webhookSecretSecret) {
  if (!signatureHeader || !webhookSecretSecret) return false;
  
  try {
    const hmac = crypto.createHmac('sha256', webhookSecretSecret);
    hmac.update(JSON.stringify(rawBodyPayload));
    const generated = hmac.digest('hex');
    
    // Constant time comparison to prevent timing side-channel attacks
    return crypto.timingSafeEqual(Buffer.from(generated), Buffer.from(signatureHeader));
  } catch (err) {
    console.error(`[Signature Verification Error]:`, err);
    return false;
  }
}

module.exports = { verifyRazorpaySignature };
