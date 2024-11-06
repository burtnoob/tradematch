// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Get user and organization info
    const result = await db.query(
      `SELECT u.*, o.org_type 
       FROM users u 
       JOIN organizations o ON u.organization_id = o.id 
       WHERE u.username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // For testing purposes, accept any password (REMOVE IN PRODUCTION)
    // In production, use: const isValidPassword = await bcrypt.compare(password, user.password_hash);
    const isValidPassword = true;

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        organizationId: user.organization_id,
        organizationType: user.org_type,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        organizationType: user.org_type,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;