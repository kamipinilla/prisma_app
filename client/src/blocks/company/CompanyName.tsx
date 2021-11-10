import { useCallback, useState } from "react"
import { FullCompany } from "../../../../server/types"
import { updateCompany } from "../../api/companies"
import H from "../../widgets/H"
import SubmitInput from "../../widgets/SubmitInput"

interface Props {
  company: FullCompany
  onCompanyUpdated: () => void
}

const CompanyName: React.FC<Props> = props => {
  const {
    company,
    onCompanyUpdated,
  } = props

  const [isEditingName, setIsEditingName] = useState<boolean>(false)

  const handleSubmit = useCallback((name: string) => {
    if (name !== company.name) {
      updateCompany(company.id, { name }).then(onCompanyUpdated)
    }
    setIsEditingName(false)
  }, [company, onCompanyUpdated])

  let content
  if (isEditingName) {
    content = (
      <div>
        <SubmitInput
        onSubmit={handleSubmit}
        onCancel={() => setIsEditingName(false)}
        initialValue={company.name}
        autofocus
        showHowTo />
      </div>
    )
  } else {
    const logoRadius = 45
    content = (
      <div className="flex space-x-3 items-center">
        <img src={company.logo} width={logoRadius} height={logoRadius} alt="Logo" />
        <H>
          <span className="cursor-pointer" title="Edit name" onClick={() => setIsEditingName(true)}>
            {company.name}
          </span>
        </H>
      </div>
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default CompanyName