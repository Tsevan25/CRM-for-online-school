import { useAppSelector } from '@/app/store'
import { StudentsList } from '@/widgets/students/StudentsList'

export const MyStudentsPage = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <StudentsList
      key={user?.id ?? 'my-students'} 
      teacherId={user?.id}
      canAdd={false}
      canEdit={false}
      canDelete={false}
    />
  )
}