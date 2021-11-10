import { CreateSpecialty, RestError, RestItems, Specialty, SpecialtyId } from "../../../server/types"
import { apiPath } from "./config"
import { del, get, post } from "./rest"

const entryName = 'specialties'

export async function getSpecialties(): Promise<Specialty[]> {
  const response = await get(`${apiPath}/${entryName}`)
  const json = await response.json()
  if (response.ok) {
    const specialties = (json as RestItems).items
    return specialties
  } else {
    const error = json as RestError
    throw Error(error.err)
  }
}

export async function createSpecialty(createSpecialty: CreateSpecialty) {
  const response = await post(`${apiPath}/${entryName}`, createSpecialty)
  if (!response.ok) {
    const error: RestError = await response.json()
    throw Error(error.err)
  }
}

export async function deleteSpecialty(id: SpecialtyId) {
  const response = await del(`${apiPath}/${entryName}/${id}`)
  if (!response.ok) {
    const error: RestError = await response.json()
    throw Error(error.err)
  }
}