import { City, RestError, RestItems } from '../../../server/types'
import { apiPath } from './config'
import { get } from './rest'

const entryName = 'cities'

export async function getCities(): Promise<City[]> {
  const response = await get(`${apiPath}/${entryName}`)
  const json = await response.json()
  if (response.ok) {
    const cities: City[] = (json as RestItems).items
    return cities
  } else {
    const error = json as RestError
    throw Error(error.message)
  }
}