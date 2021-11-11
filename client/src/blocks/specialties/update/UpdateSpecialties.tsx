import { useCallback, useEffect, useState } from 'react'
import { Specialty } from '../../../../../server/types'
import Button from '../../../widgets/Button'
import AddSpecialty from './AddSpecialty'
import DeleteSpecialty from './DeleteSpecialty'

enum EditionKind {
  Adding = 1,
  Deleting,
}

interface Props {
  specialties: Specialty[]
  hasDeleted: boolean
  onSpecialtyAdded: () => void
  onExitedDeleting: () => void
  onIsDeletingChange: (isDeleting: boolean) => void
}

const UpdateSpecialties: React.FC<Props> = props => {
  const {
    specialties,
    hasDeleted,
    onSpecialtyAdded,
    onExitedDeleting,
    onIsDeletingChange,
  } = props

  const [editionKind, setEditionKind] = useState<EditionKind | null>(null)
  useEffect(function updateIsDeleting() {
    onIsDeletingChange(editionKind === EditionKind.Deleting)
  }, [editionKind, onIsDeletingChange])

  const handleExitAddition = useCallback(() => {
    setEditionKind(null)
  }, [])

  const handleExitDeletion = useCallback(() => {
    setEditionKind(null)
    onExitedDeleting()
  }, [onExitedDeleting])

  let content
  switch (editionKind) {
    case null: {
      content = (
        <div className="flex space-x-2">
          <Button onClick={() => setEditionKind(EditionKind.Adding)}>Add</Button>
          {!!specialties.length && <Button onClick={() => setEditionKind(EditionKind.Deleting)}>Delete...</Button>}
        </div>
      )
      break
    }
    case EditionKind.Adding: {
      content = (
        <AddSpecialty
          specialties={specialties}
          onSpecialtyAdded={onSpecialtyAdded}
          onExit={handleExitAddition} />
      )
      break
    }
    case EditionKind.Deleting: {
      content = (
        <DeleteSpecialty
          specialties={specialties}
          hasDeleted={hasDeleted}
          onExit={handleExitDeletion} />
      )
      break
    }
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default UpdateSpecialties