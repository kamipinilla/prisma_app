import React from "react"
import { CompanyId, FullCompany } from "../../../../../server/types"
import List from "../../../widgets/List"
import CompanyRow from "./CompanyRow"
import HeaderRow from "./HeaderRow"



interface Props {
  companies: FullCompany[]
  onCompanyClick?: (companyId: CompanyId) => void
}

const CompaniesTable: React.FC<Props> = props => {
  const {
    companies,
    onCompanyClick,
  } = props

  const rows = companies.map(company => (
    <CompanyRow
      key={company.id}
      company={company}
      onClick={onCompanyClick ? () => onCompanyClick(company.id) : undefined} />
  ))

  return (
    <div className="border-2 border-gray-200 rounded-md">
      <List>
        <HeaderRow />
        {rows}
      </List>
    </div>
  )
}

export default CompaniesTable