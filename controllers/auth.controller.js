const User = require('../models/user.model');
const { generateUsernameSuffix } = require('../utils/nanoid');

const generateUniqueUsername = async name => {
  const base = name.replace(/\s+/g, '-').toLowerCase();
  let username = `${base}_${generateUsernameSuffix()}`;

  let doc = await User.findOne({ username }).select('id').lean();
  while (doc) {
    let username = `${base}_${generateUsernameSuffix()}`;
    doc = await User.findOne({ username }).select('id').lean();
  }

  return username;
};

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const username = await generateUniqueUsername(name);
    const user = await User.create({ name, email, password, passwordConfirm, username });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully. Welcome aboard!',
      requestedAt: new Date().toISOString(),
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { signup };
