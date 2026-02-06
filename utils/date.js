const getExpiryDate = ttlMs => {
  return new Date(Date.now() + ttlMs);
};

const currentTime = () => {
  return new Date(Date.now());
};

module.exports = { getExpiryDate, currentTime };
