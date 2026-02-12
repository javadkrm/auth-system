import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Props {
    children: React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {

    const user = useSelector((state: RootState) => state.auth.currentUser)

    if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoute