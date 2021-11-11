import { useCallback } from 'react'
import { FullCompany, Specialty, SpecialtyId } from '../../../../server/types'
import { setCompanySpecialties } from '../../api/companies'
import { getSpecialties } from '../../api/specialties'
import SelectMultiple from '../../widgets/SelectMultiple'

interface Props {
  company: FullCompany
  onCompanyUpdated: () => void
}

const CompanySpecialties: React.FC<Props> = props => {
  const {
    company,
    onCompanyUpdated,
  } = props

  const handleSpecialtiesChange = useCallback((selectedSpecialtiesIds: SpecialtyId[]) => {
    setCompanySpecialties(company.id, selectedSpecialtiesIds).then(onCompanyUpdated)
  }, [company, onCompanyUpdated])

  const getSpecialtyId = useCallback((specialty: Specialty) => specialty.id, [])
  const getSpecialtyName = useCallback((specialty: Specialty) => specialty.name, [])

  const selectedSpecialtiesIds = company.specialties.map(specialty => specialty.id)

  return (
    <div>
      <SelectMultiple
        selectedItemsIds={selectedSpecialtiesIds}
        onSelectedItemsIdsChange={handleSpecialtiesChange}
        
        getItems={getSpecialties}
        getItemId={getSpecialtyId}
        getItemDisplayName={getSpecialtyName}
        
        autofocus
        placeholder="Select..." />
    </div>
  )
}

export default CompanySpecialties