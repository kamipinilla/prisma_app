import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyId, FullCompany } from '../../../../server/types'
import { getFullCompany } from '../../api/companies'
import H from '../../widgets/H'
import Header from '../../widgets/Header'
import CompanyCity from './CompanyCity'
import CompanyName from './CompanyName'
import CompanySpecialties from './CompanySpecialties'

interface MatchParams {
  companyId: string
}

const CompanyComp: React.FC = () => {
  const params = useParams<MatchParams>()
  const companyId: CompanyId = parseInt(params.companyId)

  const [company, setCompany] = useState<FullCompany | null>(null)

  const updateCompany = useCallback(() => {
    getFullCompany(companyId).then(setCompany)
  }, [companyId])
  useEffect(updateCompany, [updateCompany])

  if (!company) return null

  return (
    <div className="space-y-8">
      <Header>
        <div className="flex justify-between items-center">
          <CompanyName
            company={company}
            onCompanyUpdated={updateCompany} />
          <CompanyCity
            company={company}
            onCompanyUpdated={updateCompany} />
        </div>
      </Header>
      <div className="space-y-4">
        <H size="md">Specialties</H>
        <CompanySpecialties
          company={company}
          onCompanyUpdated={updateCompany} />
      </div>
    </div>
  )
}

export default CompanyComp