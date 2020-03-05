const { runQuery } = require('../config/db')

exports.GetRestaurants = (id, params) => {
  return new Promise((resolve, reject) => {
    if (id) {
      runQuery(`SELECT * FROM restaurants WHERE _id =${id}`, (err, results, fields) => {
        if (err) {
          reject(new Error(err))
        }
        resolve(results[1][0])
      })
    } else {
      runQuery('SELECT * from restaurants', (err, results, fields) => {
        if (err) {
          reject(new Error(err))
        }
        resolve(results[1])
      })
    }
  })
}

exports.CreateRestaurant = (data) => {
  return new Promise((resolve, reject) => {
    let columns = []
    let values = []
    Object.keys(data).forEach((v) => {
      if (v && ['id_owner', 'name', 'logo', 'location', 'decription'].includes(v) && data[v]) {
        columns.push(v)
        values.push(data[v])
      }
    })
    runQuery(`SELECT COUNT(*) AS total FROM users WHERE _id=${data.id_owner}`, (err, results, fields) => {
      if (err || !results[1][0].total) {
        resolve(err || 'Owner id Not Registered')
      }
      runQuery(`
      INSERT INTO restaurants(${columns.map(v => v).join(',')}) VALUES(${values.map(v => `'${v}'`).join(',')});
      UPDATE users SET is_admin = 1 WHERE _id=${data.id_owner}
    `, (err, results, fields) => {
        if (err) {
          reject(new Error(err))
        }
        console.log(results[1])
        resolve(results[1].insertId)
      })
    })
  })
}