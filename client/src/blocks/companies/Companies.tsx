import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CompanyId, FullCompany } from '../../../../server/types'
import { getFullCompanies } from '../../api/companies'
import Button from '../../widgets/Button'
import H from '../../widgets/H'
import Header from '../../widgets/Header'
import CompaniesTable from './table/CompaniesTable'
import FilterCompanies from './filter/FilterCompanies'

const Companies: React.FC = () => {
  const history = useHistory()
  
  const [companies, setCompanies] = useState<FullCompany[] | null>(null)
  useEffect(function loadCompanies() {
    getFullCompanies().then(setCompanies)
  }, [])

  const [filteredCompanies, setFilteredCompanies] = useState<FullCompany[]>([])

  const goToSpecialties = useCallback(() => {
    history.push('/specialties')
  }, [history])

  const goToCompany = useCallback((companyId: CompanyId) => {
    history.push(`/companies/${companyId}`)
  }, [history])

  if (!companies) return null

  return (
    <div className="space-y-7">
      <Header>
        <div className="flex justify-between items-center">
          <H>Companies</H>
          <Button onClick={goToSpecialties} type='dark'>Specialties</Button>
        </div>
      </Header>
      {!!companies.length &&
        <div className="space-y-8">
          <FilterCompanies
            companies={companies}
            onFilterCompaniesChange={setFilteredCompanies} />
          <CompaniesTable
            companies={filteredCompanies}
            onCompanyClick={goToCompany} />
        </div>
      }
    </div>
  )
}

export default Companies