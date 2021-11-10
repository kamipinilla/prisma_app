import { Company as DbCompany, Specialty as DbSpecialty, City as DbCity } from '.prisma/client'
import { City, Company, FullCompany, Specialty } from '../types'

interface FullDbCompany extends DbCompany {
  specialties: DbSpecialty[]
  city: DbCity
}

export function toCompany(dbCompany: DbCompany): Company {
  const { id, name, logo } = dbCompany
  return { id, name, logo }
}

export function toFullCompany(fullDbCompany: FullDbCompany): FullCompany {
  return {
    id: fullDbCompany.id,
    name: fullDbCompany.name,
    logo: fullDbCompany.logo,
    specialties: fullDbCompany.specialties.map(toSpecialty),
    city: toCity(fullDbCompany.city)
  }
}

export function toSpecialty(dbSpecialty: DbSpecialty): Specialty {
  const { id, name } = dbSpecialty
  return { id, name }
}

export function toCity(dbCity: DbCity): City {
  const { id, name } = dbCity
  return { id, name }
}