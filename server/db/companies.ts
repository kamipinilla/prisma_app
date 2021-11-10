import { PrismaClient } from '@prisma/client'
import { City, Company, CompanyId, FullCompany, Specialty, SpecialtyId, UpdateCompany } from "../types"
import { toCity, toCompany, toFullCompany, toSpecialty } from './transformType'

const prisma = new PrismaClient()

export async function getCompanies(): Promise<Company[]> {
  const dbCompanies = await prisma.company.findMany()
  const companies = dbCompanies.map(toCompany)
  return companies
}

export async function getFullCompanies(): Promise<FullCompany[]> {
  const dbCompanies = await prisma.company.findMany({
    include: {
      specialties: true,
      city: true,
    }
  })
  const fullCompanies = dbCompanies.map(toFullCompany)
  return fullCompanies
}

export async function getCompany(id: CompanyId): Promise<Company | null> {
  const dbCompany = await prisma.company.findUnique({
    where: {
      id,
    }
  })
  
  if (dbCompany) {
    const company = toCompany(dbCompany)
    return company
  } else {
    return null
  }
}

export async function getFullCompany(id: CompanyId): Promise<FullCompany | null> {
  const fullDbCompany = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      specialties: true,
      city: true,
    }
  })
  
  if (fullDbCompany) {
    const company = toFullCompany(fullDbCompany)
    return company
  } else {
    return null
  }
}

export async function getCompanySpecialties(id: CompanyId): Promise<Specialty[] | null> {
  const dbCompany = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      specialties: true,
    }
  })

  if (dbCompany) {
    const dbSpecialties = dbCompany.specialties
    const specialties = dbSpecialties.map(toSpecialty)
    return specialties
  } else {
    return null
  }
}

export async function updateCompany(id: CompanyId, update: UpdateCompany) {
  await prisma.company.update({
    where: {
      id,
    },
    data: update
  })
}

export async function setCompanySpecialties(id: CompanyId, specialtiesIds: SpecialtyId[]) {
  const specialtiesIdObjs = specialtiesIds.map(specialtyId => ({ id: specialtyId }))
  await prisma.company.update({
    where: {
      id,
    },
    data: {
      specialties: {
        set: specialtiesIdObjs
      }
    }
  })
}

export async function getCompanyCity(id: CompanyId): Promise<City | null> {
  const dbCompany = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      city: true,
    }
  })

  if (dbCompany) {
    const dbCity = dbCompany.city
    const city = toCity(dbCity)
    return city
  } else {
    return null
  }
}