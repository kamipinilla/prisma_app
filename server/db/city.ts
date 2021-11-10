import { PrismaClient } from ".prisma/client"
import { City } from "../types"
import { toCity } from "./transformType"

const prisma = new PrismaClient()

export async function getCities(): Promise<City[]> {
  const dbCities = await prisma.city.findMany()
  const cities = dbCities.map(toCity)
  return cities
}