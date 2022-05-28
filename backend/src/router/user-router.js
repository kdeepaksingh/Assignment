const express = require('express');
const router = express.Router();
const userModel = require('../modal/user-model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// //base url path: http://localhost:8000/userapi/add


// GET ALL Users 

router.get('/find', async (req, res) => {
    try {
        const userList = await userModel.find({}).sort({ "fullName": 1 });
        console.log(userList);
        const recordCount = userList.length;
        res.status(200).send({ status: 200, message: "Fetched All Users Records!", recordCount: recordCount, results: userList });
    } catch (err) {
        res.status(500).send(`Unable To Fetch Users Details ${err}`);
    }
});

// GET Specific Users

router.get('/find/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const specificUser = await userModel.find({ _id }).sort({ "fullName": 1 });
        recordCount = specificUser.length;
        res.status(200).send({ status: 200, message: "Fetched Perticular User!", recordCount: recordCount, results: specificUser });
    } catch (err) {
        res.status(500).send(`Unable to find this User ${err}`);
    }
});

// post User Details

//for single image uploading   upload.single('userImg')
//for multiple image loading   upload.array('userImg',12)

router.post('/add', upload.single('userImg'), async (req, res) => {
    try {
        console.log(req.file);
        const addUser = new userModel(req.body);
        // fullName: req.body.fullName,
            // email: req.body.email,
            // mobileNo: req.body.mobileNo,
            // address: req.body.address,
            // image: req.file.path,
        console.log(addUser);
        const insertUser = await addUser.save();
        const recordCount = insertUser.length;
        res.status(200).send({ status: 200, message: "User Added Successfully!!", recordCount: recordCount, results: insertUser });
    } catch (err) {
        res.status(500).send(`Unable To Register User ${err}`);
    }
});

// Update perticular User  Deatils

router.patch('/update/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUser = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
        const recordCount = updateUser.length;
        res.status(200).send({ status: 200, message: "User Updated Successfully!", recordCount: recordCount, result: updateUser })
    } catch (err) {
        res.status(500).send(`Error in Updated User ${err}`);
    }
});

// Remove perticular User  Deatils

router.delete('/remove/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const removeUser = await userModel.findByIdAndDelete({ _id });
        const recordCount = removeUser.length;
        res.status(200).send({ status: 200, message: "User Is Deleted Successfully!", recordCount: recordCount, result: removeUser });
    } catch (err) {
        res.status(500).send(`Error in User Deletion ${err}`);
    }
});

module.exports = router;

