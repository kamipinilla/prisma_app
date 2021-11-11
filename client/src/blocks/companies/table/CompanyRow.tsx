import { FullCompany } from '../../../../../server/types'
import Row from './Row'

interface CompanyRowProps {
  company: FullCompany
  onClick?: () => void
}

const CompanyRow: React.FC<CompanyRowProps> = props => {
  const {
    company,
    onClick,
  } = props

  const specialtiesDisplay = company
    .specialties
    .map(specialty => specialty.name)
    .sort()
    .join(', ')

  return (
    <Row
      firstCol={company.name}
      secondCol={specialtiesDisplay}
      onClick={onClick} />
  )
}

export default CompanyRow