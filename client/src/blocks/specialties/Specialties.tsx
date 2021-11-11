import { useCallback, useEffect, useState } from 'react'
import { Specialty } from '../../../../server/types'
import { getSpecialties } from '../../api/specialties'
import H from '../../widgets/H'
import Header from '../../widgets/Header'
import SpecialtiesList from './list/SpecialtiesList'
import UpdateSpecialties from './update/UpdateSpecialties'

const Specialties: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[] | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [hasDeleted, setHasDeleted] = useState<boolean>(false)

  const updateSpecialties = useCallback(() => {
    getSpecialties().then(setSpecialties)
  }, [])
  useEffect(updateSpecialties, [updateSpecialties])

  const handleSpecialtyAdded = useCallback(() => {
    updateSpecialties()
  }, [updateSpecialties])

  const handleSpecialtyDeleted = useCallback(() => {
    updateSpecialties()
    setHasDeleted(true)
  }, [updateSpecialties])

  if (!specialties) return null

  return (
    <div className="space-y-8">
      <Header>
        <H>Specialties</H>
      </Header>
      {!!specialties.length &&
        <SpecialtiesList
          specialties={specialties}
          isDeleting={isDeleting}
          onSpecialtyDeleted={handleSpecialtyDeleted} />
      }
      <UpdateSpecialties
        specialties={specialties}
        hasDeleted={hasDeleted}
        onSpecialtyAdded={handleSpecialtyAdded}
        onExitedDeleting={() => setHasDeleted(false)}
        onIsDeletingChange={setIsDeleting} />
    </div>
  )
}

export default Specialties