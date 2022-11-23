const CollegeModel = require('../model/collegeModel')
const InternModel = require('../model/internModel')

//---------------------[regex]-----------------------//

let nameRegex = /[a-zA-Z]{3,}/

let fullNameRegex = /[a-zA-Z0-9]{10,100}/

let logoLinkRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

//----------------------------[create college Api]---------------------------//

const createColleges = async function (req, res) {

    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "Please provide all the details!" })
        }

        if (!name || name == "") {
            return res.status(400).send({ status: false, msg: "Please provide name!" })
        }
        name = name.trim()
        if (!nameRegex.test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter valid name" })
        }

        if (!fullName || fullName == "") {
            return res.status(400).send({ status: false, msg: "Please provide fullName!" })
        }
        fullName = fullName.trim()
        if (!fullNameRegex.test(fullName)) {
            return res.status(400).send({ status: false, msg: "Please enter valid fullName" })
        }

        if (!logoLink || logoLink == "") {
            return res.status(400).send({ status: false, msg: "Please provide logoLink!" })
        }
        logoLink = logoLink.trim()
        if (!logoLinkRegex.test(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please enter valid logoLink" })
        }

        let savedData = await CollegeModel.create(data)
        res.status(201).send({ status: true, data: savedData })

    }
    catch (err) {
        console.log('This is an error', err.message)
        res.status(500).send({ status: false, error: err.message })
    }
}

//-------------------------[get college details Api]------------------------//

const getCollegeDetails = async function (req, res) {

    try {
        let collegeName = req.query.name

        if (!collegeName || collegeName == "") {
            return res.status(400).send({ status: false, msg: "Please provide name in query" })
        }

        let collegeData = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeData) {
            return res.status(404).send({ status: false, msg: `data is not found ${collegeData} college` })
        }

        let id = collegeData._id

        let internsData = await InternModel.find({ collegeId: id, isDeleted: false })
        if (internsData.length === 0) {
            return res.status(404).send({ status: false, msg: "Interns data are not found" })
        }

        res.status(200).send({ status: true, data: collegeData, interns: internsData })

    } catch (err) {
        console.log("This is an error", err.message)
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createColleges = createColleges
module.exports.getCollegeDetails = getCollegeDetails