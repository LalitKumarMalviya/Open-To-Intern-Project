const express = require('express')
const router = express.Router()
const CollegeController = require('../controller/collegeController')
const InternController = require('../controller/internController')


//--------------------------college APIs----------------------------\\
router.post('/xyzCompany/colleges', CollegeController.createColleges)
router.get('/xyzCompany/collegeDetails', CollegeController.getCollegeDetails)

//--------------------------Intern APIs------------------------------\\
router.post('/xyzCompany/interns', InternController.createInterns)




module.exports = router