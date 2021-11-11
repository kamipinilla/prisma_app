import { useEffect } from 'react'
import { Specialty } from '../../../../../server/types'
import Button from '../../../widgets/Button'

interface Props {
  specialties: Specialty[]
  hasDeleted: boolean
  onExit: () => void
}

const DeleteSpecialty: React.FC<Props> = props => {
  const {
    specialties,
    hasDeleted,
    onExit,
  } = props

  useEffect(function exitDeletionIfNoMoreSpecialties() {
    if (specialties!.length === 0) {
      onExit()
    }
  }, [specialties, onExit])

  return (
    <div className="flex flex-col space-y-4">
      <Button onClick={onExit}>{hasDeleted ? 'Done' : 'Cancel'}</Button>
      <div>Click a specialty to delete it</div>
    </div>
  )
}

export default DeleteSpecialty