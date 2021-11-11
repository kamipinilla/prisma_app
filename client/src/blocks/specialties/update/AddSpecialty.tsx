import { useCallback, useState } from "react"
import { CreateSpecialty, Specialty } from "../../../../../server/types"
import { createSpecialty } from "../../../api/specialties"
import SubmitInput from "../../../widgets/SubmitInput"

interface Props {
  specialties: Specialty[]
  onSpecialtyAdded: () => void
  onExit: () => void
}

const AddSpecialty: React.FC<Props> = props => {
  const {
    specialties,
    onSpecialtyAdded,
    onExit,
  } = props

  const [addSpecialtyError, setAddSpecialtyError] = useState<string | null>(null)

  const addSpecialty = useCallback((name: string) => {
    const newSpecialty: CreateSpecialty = {
      name,
    }

    createSpecialty(newSpecialty).then(onSpecialtyAdded)
  }, [onSpecialtyAdded])

  const validateSpecialtyExists = useCallback((value: string | null) => {
    if (value && specialties!.some(specialty => specialty.name === value)) {
      setAddSpecialtyError(`Specialty "${value}" already exists`)
    } else {
      setAddSpecialtyError(null)
    }
  }, [specialties])

  return (
    <SubmitInput
      onSubmit={addSpecialty}
      onCancel={onExit}
      errorMessage={addSpecialtyError ?? undefined}
      onValueChangeInfo={validateSpecialtyExists}
      autofocus
      placeholder="Add specialty"
      showHowTo />
  )
}

export default AddSpecialty