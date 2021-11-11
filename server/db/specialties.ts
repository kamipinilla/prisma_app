import { PrismaClient } from '.prisma/client'
import { CreateSpecialty, Specialty, SpecialtyId } from '../types'
import { toSpecialty } from './transformType'

const prisma = new PrismaClient()

export async function getSpecialties(): Promise<Specialty[]> {
  const dbSpecialties = await prisma.specialty.findMany()
  const specialties = dbSpecialties.map(toSpecialty)
  return specialties
}

export async function createSpecialty(specialty: CreateSpecialty): Promise<Specialty> {
  const { name } = specialty
  const dbSpecialty = await prisma.specialty.create({
    data: {
      name,
    }
  })
  const createdSpecialty = toSpecialty(dbSpecialty)
  return createdSpecialty
}

export async function deleteSpecialty(id: SpecialtyId) {
  await prisma.specialty.delete({
    where: {
      id,
    }
  })
}

export async function specialtyExists(name: string): Promise<boolean> {
  const count = await prisma.specialty.count({
    where: {
      name,
    }
  })

  return count !== 0
}