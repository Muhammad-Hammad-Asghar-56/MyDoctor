import React from 'react'
import NurseHeader from './NurseHeader'
const NurseMainPage = () => {

  const nurseData = JSON.parse(localStorage.getItem("nurseData"));

  return (
    <div>
      <NurseHeader/>
      <h2 className='nameHeadingOfNurse'>
         Welcome back <span className='spanName'> {nurseData.fName+ ' ' + nurseData.lName}</span>
        </h2>      
    </div>
  )
}

export default NurseMainPage