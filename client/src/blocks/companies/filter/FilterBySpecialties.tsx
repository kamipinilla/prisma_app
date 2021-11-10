import { useCallback, useEffect, useState } from "react"
import { FullCompany, Specialty, SpecialtyId } from "../../../../../server/types"
import { getSpecialties } from "../../../api/specialties"
import { Key } from "../../../types"
import CheckboxSwitch from "../../../widgets/CheckboxSwitch"
import ExitKeyMessage from "../../../widgets/ExitKeyMessage"
import SelectMultiple from "../../../widgets/SelectMultiple"
import { FilterProps } from "./types"

const FilterBySpecialties: React.FC<FilterProps> = props => {
  const {
    companies,
    onFilterCompaniesChange,
    onCancel,
  } = props

  const [isRequireAll, setIsRequireAll] = useState<boolean>(true)
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState<SpecialtyId[]>([])

  const [triggerFocus, setTriggerFocus] = useState<boolean>(false)
  useEffect(function recoverFilterFocus() {
    setTriggerFocus(true)
  }, [isRequireAll])

  const filterCompaniesBySpecialties = useCallback((): FullCompany[] => {
    const filterFunction = isRequireAll ? 'every' : 'some'
    return companies.filter(company => {
      const companySpecialtiesIds = company.specialties.map(specialty => specialty.id)
      return selectedSpecialtiesIds[filterFunction](specialtyId => companySpecialtiesIds.includes(specialtyId))
    })
  }, [companies, selectedSpecialtiesIds, isRequireAll])

  const handleKeyDown = useCallback((inputKey: string) => {
    const key = inputKey as Key
    if (key === 'Escape') {
      onCancel()
    }
  }, [onCancel])

  useEffect(function updateCompaniesWithSpecialties() {
    if (selectedSpecialtiesIds.length) {
      const filteredCompanies = filterCompaniesBySpecialties()
      onFilterCompaniesChange(filteredCompanies)
    } else {
      onFilterCompaniesChange(companies)
    }
  }, [selectedSpecialtiesIds, isRequireAll, companies, onFilterCompaniesChange, filterCompaniesBySpecialties])

  const getSpecialtyId = useCallback((specialty: Specialty) => specialty.id, [])
  const getSpecialtyName = useCallback((specialty: Specialty) => specialty.name, [])

  return (
    <div className="flex-col space-y-4">
      <SelectMultiple
        selectedItemsIds={selectedSpecialtiesIds}
        onSelectedItemsIdsChange={setSelectedSpecialtiesIds}

        getItems={getSpecialties}
        getItemId={getSpecialtyId}
        getItemDisplayName={getSpecialtyName}

        triggerFocus={triggerFocus}
        onTriggeredFocusDone={() => setTriggerFocus(false)}
        onKeyDown={handleKeyDown}
        autofocus
        placeholder="Filter by specialties..." />
        {selectedSpecialtiesIds.length < 2 ?
          <ExitKeyMessage />
        : <CheckboxSwitch
            checked={isRequireAll}
            onChange={setIsRequireAll}
            checkedLabel={<div>Require <b>all</b></div>}
            unCheckedLabel={<div>Require <b>any</b></div>} />}
    </div>
  )
}

export default FilterBySpecialties