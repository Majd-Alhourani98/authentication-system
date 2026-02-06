const getExpiryDate = ttlMs => {
  return new Date(Date.now() + ttlMs);
};

module.exports = { getExpiryDate };
