import express from 'express'
import { getCompanies, getCompany, getCompanyCity, getCompanySpecialties, getFullCompanies, getFullCompany, setCompanySpecialties, updateCompany } from '../db/companies'
import { Company, CompanyId, RestError, RestItems, RestSuccess, SpecialtyId, UpdateCompany } from '../types'

const router = express.Router()

const TRUE_VALUE = 'true'
const FULL_PARAM_NAME = 'full'

router.get('/', async (req, res) => {
  const fullParam = req.query[FULL_PARAM_NAME] === TRUE_VALUE
  const getCompaniesFunc = fullParam ? getFullCompanies : getCompanies
  const companies = await getCompaniesFunc()
  const response: RestItems = { items: companies }
  res.json(response)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const fullParam = req.query[FULL_PARAM_NAME] === TRUE_VALUE
  const getCompanyFunc = fullParam ? getFullCompany : getCompany
  const company = await getCompanyFunc(id)
  if (company) {
    res.json(company)
  } else {
    const error: RestError = {
      err: notFoundMessage(id),
    }
    res.status(400).json(error)
  }
})

router.get('/:id/specialties', async (req, res) => {
  const id = parseInt(req.params.id)
  const specialties = await getCompanySpecialties(id)
  if (specialties) {
    const response: RestItems = {
      items: specialties,
    }
    res.json(response)
  } else {
    const error: RestError = {
      err: notFoundMessage(id),
    }
    res.status(400).json(error)
  }
})

router.post('/:id/specialties', async (req, res) => {
  const id = parseInt(req.params.id)
  if (await getCompany(id)) {
    const specialiesIds: SpecialtyId[] = (req.body as RestItems).items
    await setCompanySpecialties(id, specialiesIds)
    const success: RestSuccess = {
      msg: 'Specialties updated.'
    }
    res.json(success)
  } else {
    const error: RestError = {
      err: notFoundMessage(id),
    }
    res.status(400).json(error)
  }
})

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (await getCompany(id)) {
    const update = req.body as UpdateCompany

    await updateCompany(id, update)
    const success: RestSuccess = {
      msg: 'Specialties updated.'
    }
    res.json(success)
  } else {
    const error: RestError = {
      err: notFoundMessage(id),
    }
    res.status(400).json(error)
  }
})

router.get('/:id/city', async (req, res) => {
  const id = parseInt(req.params.id)
  const city = await getCompanyCity(id)
  if (city) {
    res.json(city)
  } else {
    const error: RestError = {
      err: notFoundMessage(id),
    }
    res.status(400).json(error)
  }
})

function notFoundMessage(id: CompanyId): string {
  return `Company with id "${id}" not found.`
}

export default router