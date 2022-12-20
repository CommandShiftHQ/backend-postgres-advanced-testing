const db = require('../db')

exports.create = async (req, res) => {
  const { email, password } = req.body

  try {
    const { rows: [ user ] } = await db.query('INSERT INTO Users(email, password) VALUES ($1, $2) RETURNING *', [email, password])
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json(err.message)
  }
}