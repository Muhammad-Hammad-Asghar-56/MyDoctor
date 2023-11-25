import React, { useState } from 'react';
import UserContext from '../context/UserContext';


const UserState = (props) => {
      const [currentUser , setCurrentUser] = useState(null)

  return (
    <UserContext.Provider value={{}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState