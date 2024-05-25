import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

const Signup = () => {
  const [passwordvisible,setPasswordVisible] = useState(false);

  return (
    <div className={`d-lg-flex half`}>
    <div className={`bg order-1 order-md-2 loginimg`} ></div>
    <div className={`contents order-2 order-md-1`}>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7">
            <h3>Welcome to <strong>FTracker 📋🏋️‍♀️</strong></h3>
            <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore doloribus, assumenda provident .</p>
            <form action="#" method="post">
            <div className={`form-group first`
              }>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" id="fullname"/>
              </div>
              <div className={`form-group mb-2`
              }>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" placeholder="Enter a username" id="username"/>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" placeholder="your-email@gmail.com" id="email"/>
              </div>
              <div className="form-group last mb-4">
              <label htmlFor="password">Password</label>

                <input type={passwordvisible?'text':'password'} className="form-control" placeholder="Your Password" id="password"/>
               <div className="toggle-icon">
               <i className={`fa-solid ${passwordvisible?'fa-eye':'fa-eye-slash'}`} onClick={()=>setPasswordVisible(!passwordvisible)}></i> 

              </div>
              </div>
          
              <div className='d-grid gap-2 mb-2 mt-2'>

           <button className='btn btn-primary btn-lg'>Sign up</button>
              </div>

            <p className='link-text'>Already Have an Account? <NavLink to={'/'}>Sign in .</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
  )
}

export default Signup
