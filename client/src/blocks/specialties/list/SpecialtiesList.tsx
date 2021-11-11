import { Specialty } from "../../../../../server/types"
import { deleteSpecialty } from "../../../api/specialties"
import List from "../../../widgets/List"
import ListItem from "../../../widgets/ListItem"

interface Props {
  specialties: Specialty[]
  isDeleting: boolean
  onSpecialtyDeleted: () => void
}

const SpecialtiesList: React.FC<Props> = props => {
  const {
    specialties,
    isDeleting,
    onSpecialtyDeleted,
  } = props
  
  const specialtiesListItems = specialties.map(specialty => (
    <ListItem
      key={specialty.id}
      onClick={isDeleting ? () => deleteSpecialty(specialty.id).then(onSpecialtyDeleted) : undefined}>{specialty.name}</ListItem>
  ))

  return (
    <div className="border-2 border-gray-200 rounded-md">
      <List>
        {specialtiesListItems}
      </List>
    </div>
  )
}

export default SpecialtiesList