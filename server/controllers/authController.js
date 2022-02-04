const bcrypt = require('bcryptjs');
const asyncErrors = require('../utils/asyncErrors');
const AppError = require('../utils/appError');
const pool = require('../utils/db');
const jwt = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');

exports.signup = asyncErrors(async (req, res, next) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = await pool.query(
    'INSERT INTO users (name, email, password) VALUES($1,$2,$3) RETURNING *',
    [req.body.name, req.body.email, encryptedPassword]
  );

  res.status(200).json({
    user: newUser.rows[0],
  });
});

exports.login = asyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const users = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (users.rows.length === 0) {
    return res.status(401).json('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, users.rows[0].password);

  if (!validPassword) {
    return res.status(401).json('Invalid email or password');
  }
  const jwtToken = jwtGenerator(users.rows[0].id);
  const rows = users.rows[0];
  return res.json({ jwtToken, rows });
});

exports.protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next(new AppError('Please login to gain access'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.adminRoute = asyncErrors(async (req, res, next) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE is_admin=true');
  console.log(rows);
  if (req.rows) {
    next();
  }
  return next(
    new AppError('You do not have permission to perform this action', 403)
  );
});
