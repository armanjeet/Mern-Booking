const router = require('express').Router()
const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/usersController')
const { verifyToken, verifyUser,verifyAdmin } = require('../utils/verifyToken')

router.get('/checkUser', verifyToken, (req, res, next) => {
    res.send('hello user you are logged in')
})

//UPDATE
router.put("/:id", verifyUser, updateUser)

//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id", verifyUser, getUser)

//GET ALL
router.get("/", verifyAdmin, getUsers)

module.exports = router