import { useEffect, useState } from 'react'
import { FullCompany } from '../../../../../server/types'
import Button from '../../../widgets/Button'
import FilterByName from './FilterByName'
import FilterBySpecialties from './FilterBySpecialties'

enum FilterKind {
  Name = 1,
  Specialties,
}

interface Props {
  companies: FullCompany[]
  onFilterCompaniesChange: (companies: FullCompany[]) => void
}

const FilterCompanies: React.FC<Props> = props => {
  const {
    companies,
    onFilterCompaniesChange,
  } = props

  const [filter, setFilter] = useState<FilterKind | null>(null)

  useEffect(function updateFilteredCompanies() {
    if (!filter) {
      onFilterCompaniesChange(companies)
    }
  }, [filter, companies, onFilterCompaniesChange])

  let content
  switch (filter) {
    case null: {
      content = (
        <div className="flex space-x-2">
          <Button onClick={() => setFilter(FilterKind.Name)}>Filter by name</Button>
          <Button onClick={() => setFilter(FilterKind.Specialties)}>Filter by specialties</Button>
        </div>
      )
      break
    }
    case FilterKind.Name: {
      content = (
        <FilterByName
          onCancel={() => setFilter(null)}
          companies={companies}
          onFilterCompaniesChange={onFilterCompaniesChange} />
      )
      break
    }
    case FilterKind.Specialties: {
      content = (
        <FilterBySpecialties
          onCancel={() => setFilter(null)}
          companies={companies}
          onFilterCompaniesChange={onFilterCompaniesChange} />
      )
      break
    }
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default FilterCompanies