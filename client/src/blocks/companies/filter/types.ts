import { FullCompany } from '../../../../../server/types'

export interface FilterProps {
  companies: FullCompany[]
  onFilterCompaniesChange: (companies: FullCompany[]) => void
  onCancel: () => void
}