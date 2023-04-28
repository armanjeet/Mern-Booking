const router = require('express').Router()
const {createRoom, updateRoom, deleteRoom, getRoom, getRooms} =require('../controllers/roomsController')
const { verifyAdmin } = require('../utils/verifyToken')

//create
router.post('/:hotelid', verifyAdmin, createRoom)
//update
router.put('/:id', verifyAdmin, updateRoom)
//delete
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)
//getHotel
router.get('/:id', getRoom)
//getAllhotels
router.get('/', getRooms)
module.exports = router