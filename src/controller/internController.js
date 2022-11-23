const mongoose = require('mongoose')
const InternModel = require('../model/internModel')

//--------------------------[regex]----------------------------//

const nameRegex = /[a-zA-Z]{3,20}/

const emailRegex = /[a-zA-Z0-9\.\_\-]+@[a-z]+\.[a-z]{2,3}/

const mobileRegex = /[6789][0-9]{9}/

//------------------------------[create interns Api]----------------------------------------//

const createInterns = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeId } = data

        if (!Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "Please provide all the Details!" })
        }

        if (!name || name == "") {
            return res.status(400).send({ status: false, msg: "Please provide name!" })
        }
        name = name.trim()
        if (!nameRegex.test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter valid name!" })
        }

        if (!email || email == "") {
            return res.status(400).send({ status: false, msg: "Please provide email!" })
        }
        email = email.trim()
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, msg: "Please provide correct email!" })
        }

        if (!mobile || mobile == "") {
            return res.status(400).send({ status: false, msg: "Please provide mobile number!" })
        }
        mobile = mobile.trim()
        if (!mobileRegex.test(mobile)) {
            return res.status(400).send({ status: false, msg: "Please provide correct mobile number!" })
        }

        if(!collegeId || collegeId == "") {
            return res.status(400).send({status: false, msg: "Please provide college id!"})
        }
        collegeId = collegeId.trim()
        if (!mongoose.Types.ObjectId.isValid(collegeId)) {
            return res.status(400).send({ status: false, msg: "Please provide valid collegeId!"})
        }

        let savedData = await InternModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        console.log('This is an error', err.message)
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports.createInterns = createInterns 