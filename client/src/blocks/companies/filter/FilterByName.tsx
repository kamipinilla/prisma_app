import { useCallback, useEffect, useState } from 'react'
import { FullCompany } from '../../../../../server/types'
import { Key } from '../../../types'
import ExitKeyMessage from '../../../widgets/ExitKeyMessage'
import Input from '../../../widgets/Input'
import { FilterProps } from './types'

const FilterByName: React.FC<FilterProps> = props => {
  const {
    companies,
    onFilterCompaniesChange,
    onCancel,
  } = props

  const [searchName, setSearchName] = useState<string | null>(null)

  const filterCompaniesByName = useCallback((searchName: string): FullCompany[] => {
    const searchNameLower = searchName.toLowerCase()
    return companies.filter(company => {
      const companyNameLower = company.name.toLowerCase()
      return companyNameLower.includes(searchNameLower)
    })
  }, [companies])

  const handleKeyDown = useCallback((inputKey: string) => {
    const key = inputKey as Key
    if (key === 'Escape') {
      onCancel()
    }
  }, [onCancel])

  useEffect(function updateCompaniesWithSpecialties() {
    if (searchName) {
      const filteredCompanies = filterCompaniesByName(searchName)
      onFilterCompaniesChange(filteredCompanies)
    } else {
      onFilterCompaniesChange(companies)
    }
  }, [searchName, companies, onFilterCompaniesChange, filterCompaniesByName])

  return (
    <div className="flex-col space-y-4">
      <Input
        value={searchName}
        onChange={setSearchName}
        placeholder="Filter by name..."
        onKeyDown={handleKeyDown}
        autofocus />
        <ExitKeyMessage />
    </div>
  )
}

export default FilterByName