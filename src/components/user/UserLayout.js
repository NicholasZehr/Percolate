import React from 'react'
import { Outlet } from "react-router"

const UserLayout = (props) => {
return (<>
    <div className='box'>{`This is your UserLayout Component`} </div>
    <Outlet/>
</>
)}

export default UserLayout