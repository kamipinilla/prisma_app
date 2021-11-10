import { useCallback, useState } from "react"
import { City, CityId, FullCompany } from "../../../../server/types"
import { getCities } from "../../api/cities"
import { updateCompany } from "../../api/companies"
import ExitKeyMessage from "../../widgets/ExitKeyMessage"
import Select from "../../widgets/Select"

interface Props {
  company: FullCompany
  onCompanyUpdated: () => void
}

const CompanyCity: React.FC<Props> = props => {
  const {
    company,
    onCompanyUpdated,
  } = props

  const [isEditingCity, setIsEditingCity] = useState<boolean>(false)

  const handleCityIdChange = useCallback((cityId: CityId) => {
    if (cityId !== company.city.id) {
      updateCompany(company.id, { cityId }).then(onCompanyUpdated)
    }
    setIsEditingCity(false)
  }, [company, onCompanyUpdated])

  const handleKeyDown = useCallback((key: string) => {
    if (key === 'Escape') {
      setIsEditingCity(false)
    }
  }, [])

  const getCityId = useCallback((city: City) => city.id, [])
  const getCityName = useCallback((city: City) => city.name, [])

  let content
  if (isEditingCity) {
    content = (
      <div className="flex-col space-y-4">
        <Select
          selectedItemId={company.city.id}
          onSelectedItemIdChange={handleCityIdChange}
          
          getItems={getCities}
          getItemId={getCityId}
          getItemDisplayName={getCityName}
          
          onKeyDown={handleKeyDown}
          autofocus />
          <ExitKeyMessage />
      </div>
    )
  } else {
    content = (
      <div className="cursor-pointer text-2xl font-light" title="Edit city" onClick={() => setIsEditingCity(true)} >
        {company.city.name}
      </div>
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default CompanyCity