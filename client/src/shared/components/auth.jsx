// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { USER_AUTH } from '../../constant/constant'
// import { apiGet } from '../../services/services';


// function Auth() {
//   const nav = useNavigate()
//   const checkToken = async () => {

   
//     try {
//       const { data } = await apiGet(USER_AUTH)
//       console.log(data);

//     } catch (error) {
//       console.log(error.response);
//       alert("Token is invalid!");
//       nav("/logout");

//     }
//   }
//   useEffect(() => {
//     checkToken()
//   }, [])

//   return (
//     <>

//     </>
//   )
// }

// export default Auth