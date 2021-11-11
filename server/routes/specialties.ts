import express, { json } from 'express'
import { createSpecialty, deleteSpecialty, getSpecialties, specialtyExists } from '../db/specialties'
import { CreateSpecialty, RestError, RestItems, RestSuccess } from '../types'

const router = express.Router()

router.get('/', async (req, res) => {
  const specialties = await getSpecialties()
  const response: RestItems = { items: specialties }
  res.json(response)
})

router.post('/', async (req, res) => {
  const createSpecialtyReq: CreateSpecialty = req.body
  const { name } = createSpecialtyReq
  if (!await specialtyExists(name)) {
    const createdSpecialty = await createSpecialty(createSpecialtyReq)
    const success: RestSuccess = {
      message: `Specialty with id "${createdSpecialty.id}" created`
    }
    res.json(success)
  } else {
    const error: RestError = {
      message: `Specialty with name "${name}" already exists.`
    }
    res.status(400).json(error)
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  await deleteSpecialty(id)
  const success: RestSuccess = {
    message: `Specialty with id "${id}" deleted`
  }
  res.json(success)
})

export default router