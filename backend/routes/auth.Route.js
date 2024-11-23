import {Router} from 'express'
import { getUserProfile, login, logout, signUp, updateProfile } from '../controller/authController.js'
import isAuthenticate from '../middlewares/Authenticate.js'

const router=Router()

router.post('/signup',signUp)
router.post('/login',login)
router.get('/getme',isAuthenticate,getUserProfile)
router.get('/logout',logout)
router.put('/updateprofile',isAuthenticate,updateProfile)


export default router