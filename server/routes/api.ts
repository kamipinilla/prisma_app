import express from 'express'
import companies from './companies'
import specialties from './specialties'
import cities from './cities'

const router = express.Router()
router.use('/companies', companies)
router.use('/specialties', specialties)
router.use('/cities', cities)

router.all('*', (req, res) => {
  const errorMsg = 'Invalid API URL: ' + req.url
  res.status(404).json({ err: errorMsg })
})

export default router