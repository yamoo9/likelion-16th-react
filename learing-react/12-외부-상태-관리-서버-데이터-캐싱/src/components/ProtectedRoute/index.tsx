import { Navigate } from 'react-router-dom'

import { useIsAuthenticated } from '@/stores/authStore'

type Props = React.PropsWithChildren

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.href }} replace />
  }

  return children
}
