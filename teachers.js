const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 123,
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT cohorts.name as cohort, teachers.name as teacher
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
  ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(data => {
    console.log(`${data.cohort}: ${data.teacher} `);
  })
  
})
.catch(err => console.log(err));