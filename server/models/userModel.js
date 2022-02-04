const toCamelCase = require('../utils/toCamelCase');
const pool = require('../utils/db');

class userModel {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users;');
    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users where id = $1', [
      id,
    ]);
    return toCamelCase(rows)[0];
  }

  static async insert(name, email, password) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES($1,$2,$3) RETURNING *;',
      [name, email, password]
    );
    return toCamelCase(rows)[0];
  }

  static async update(name, email, id) {
    const { rows } = await pool.query(
      'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING*',
      [name, email, id]
    );

    return toCamelCase(rows)[0];
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id=$1 RETURNING*',
      [id]
    );
    return toCamelCase(rows)[0];
  }
}

module.exports = userModel;
