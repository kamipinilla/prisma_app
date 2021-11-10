import { useCallback, useEffect, useState } from "react"
import { CreateSpecialty, Specialty, SpecialtyId } from "../../../../server/types"
import { createSpecialty, deleteSpecialty, getSpecialties } from "../../api/specialties"
import Button from "../../widgets/Button"
import H from "../../widgets/H"
import Header from "../../widgets/Header"
import List from "../../widgets/List"
import ListItem from "../../widgets/ListItem"
import SubmitInput from "../../widgets/SubmitInput"

enum EditionKind {
  Adding = 1,
  Deleting,
}

const Specialties: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[] | null>(null)

  const updateSpecialties = useCallback(() => {
    getSpecialties().then(setSpecialties)
  }, [])
  useEffect(updateSpecialties, [updateSpecialties])
  
  const [editionKind, setEditionKind] = useState<EditionKind | null>(null)
  
  const [hasDeleted, setHasDeleted] = useState<boolean>(false)

  const [addSpecialtyError, setAddSpecialtyError] = useState<string | null>(null)

  const addSpecialty = useCallback((name: string) => {
    const newSpecialty: CreateSpecialty = {
      name,
    }

    createSpecialty(newSpecialty).then(updateSpecialties)
  }, [updateSpecialties])

  const exitAddition = useCallback(() => {
    setEditionKind(null)
    setAddSpecialtyError(null)
  }, [])

  const removeSpecialty = useCallback((specialtyId: SpecialtyId) => {
    deleteSpecialty(specialtyId).then(updateSpecialties)
    setHasDeleted(true)
  }, [updateSpecialties])

  const exitDeletion = useCallback(() => {
    setEditionKind(null)
    setHasDeleted(false)
  }, [])

  const validateSpecialtyExists = useCallback((value: string | null) => {
    if (value && specialties!.some(specialty => specialty.name === value)) {
      setAddSpecialtyError(`Specialty "${value}" already exists`)
    } else {
      setAddSpecialtyError(null)
    }
  }, [specialties])

  useEffect(function exitDeletionIfNoMoreSpecialties() {
    if (editionKind === EditionKind.Deleting && specialties!.length === 0) {
      exitDeletion()
    }
  }, [editionKind, specialties, exitDeletion])

  if (!specialties) return null

  const specialtiesListItems = specialties.map(specialty => (
    <ListItem
      key={specialty.id}
      onClick={editionKind === EditionKind.Deleting ? () => removeSpecialty(specialty.id) : undefined}>{specialty.name}</ListItem>
  ))

  let bottomDisplay
  switch (editionKind) {
    case null: {
      bottomDisplay = (
        <div className="flex space-x-2">
          <Button onClick={() => setEditionKind(EditionKind.Adding)}>Add</Button>
          {!!specialties.length && <Button onClick={() => setEditionKind(EditionKind.Deleting)}>Delete...</Button>}
        </div>
      )
      break
    }
    case EditionKind.Adding: {
      bottomDisplay = (
        <SubmitInput
          onSubmit={addSpecialty}
          onCancel={exitAddition}
          errorMessage={addSpecialtyError ?? undefined}
          onValueChangeInfo={validateSpecialtyExists}
          autofocus
          placeholder="Add specialty"
          showHowTo />
      )
      break
    }
    case EditionKind.Deleting: {
      bottomDisplay = (
        <div className="flex flex-col space-y-4">
          <Button onClick={exitDeletion}>{hasDeleted ? 'Done' : 'Cancel'}</Button>
          <div>Click a specialty to delete it</div>
        </div>
      )
      break
    }
  }

  return (
    <div className="space-y-8">
      <Header>
        <H>Specialties</H>
      </Header>
      {!!specialties.length &&
        <div className="border-2 border-gray-200 rounded-md">
          <List>
            {specialtiesListItems}
          </List>
        </div>
      }
      {bottomDisplay}
    </div>
  )
}

export default Specialties