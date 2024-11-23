import {Router} from 'express'
import isAuthenticate from '../middlewares/Authenticate.js'
import { getMessages, getUsers, sendMessage } from '../controller/messageController.js'

const router=Router()

router.get('/users',isAuthenticate,getUsers)
router.get('/:id',isAuthenticate,getMessages)
router.post('/send/:id',isAuthenticate,sendMessage)



export default router