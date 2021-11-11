export type CompanyId = number
export interface Company {
  id: CompanyId
  name: string
  logo: string
}

export interface FullCompany extends Company {
  specialties: Specialty[]
  city: City
}

export interface UpdateCompany {
  name?: string
  cityId?: CityId
}

export type SpecialtyId = number
export interface Specialty {
  id: SpecialtyId
  name: string
}

export interface CreateSpecialty {
  name: string
}

export type CityId = number
export interface City {
  id: CityId
  name: string
}

export interface RestError {
  message: string
}

export interface RestSuccess {
  message: string
}

export interface RestItems {
  items: any[]
}