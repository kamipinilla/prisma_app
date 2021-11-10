import express, { json } from 'express'
import { getCities } from '../db/city'
import { RestItems } from '../types'

const router = express.Router()

router.get('/', async (req, res) => {
  const cities = await getCities()
  const response: RestItems = { items: cities }
  res.json(response)
})

export default router