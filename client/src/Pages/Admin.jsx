import React from 'react'
import UserListAdmin from './UserListAdmin'
import { useState } from 'react'
const Admin = () => {
    const [page,setPage]=useState(true)
  return (
    <>
    <UserListAdmin />
    </>
  )
}

export default Admin