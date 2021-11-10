import { City, Company, CompanyId, FullCompany, RestError, RestItems, Specialty, SpecialtyId, UpdateCompany } from '../../../server/types'
import { apiPath, fullParamName } from './config'
import { get, post, put } from './rest'

const entryName = 'companies'

export async function getCompanies(): Promise<Company[]> {
  const response = await get(`${apiPath}/${entryName}`)
  const json = await response.json()
  if (response.ok) {
    const companies = (json as RestItems).items
    return companies
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}

export async function getFullCompanies(): Promise<FullCompany[]> {
  const response = await get(`${apiPath}/${entryName}?${fullParamName}=${true}`)
  const json = await response.json()
  if (response.ok) {
    const companies = (json as RestItems).items
    return companies
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}

export async function getCompany(id: CompanyId): Promise<Company> {
  const response = await get(`${apiPath}/${entryName}/${id}`)
  const json = await response.json()
  if (response.ok) {
    const company = json as Company
    return company
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}

export async function getFullCompany(id: CompanyId): Promise<FullCompany> {
  const response = await get(`${apiPath}/${entryName}/${id}?${fullParamName}=${true}`)
  const json = await response.json()
  if (response.ok) {
    const company = json as FullCompany
    return company
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}

export async function getCompanySpecialties(id: CompanyId): Promise<Specialty[]> {
  const response = await get(`${apiPath}/${entryName}/${id}/specialties`)
  const json = await response.json()
  if (response.ok) {
    const specialties = (json as RestItems).items
    return specialties
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}

export async function setCompanySpecialties(id: CompanyId, specialtiesIds: SpecialtyId[]) {
  const request: RestItems = { items: specialtiesIds }
  const response = await post(`${apiPath}/${entryName}/${id}/specialties`, request)
  if (!response.ok) {
    const error: RestError = await response.json()
    throw Error(error.err)
  }
}

export async function updateCompany(id: CompanyId, update: UpdateCompany) {
  const response = await put(`${apiPath}/${entryName}/${id}`, update)
  if (!response.ok) {
    const error: RestError = await response.json()
    throw Error(error.err)
  }
}

export async function getCompanyCity(id: CompanyId): Promise<City> {
  const response = await get(`${apiPath}/${entryName}/${id}/city`)
  const json = await response.json()
  if (response.ok) {
    const city = json as City
    return city
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}