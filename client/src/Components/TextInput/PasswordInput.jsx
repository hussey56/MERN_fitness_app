import React from 'react'

const PasswordInput = (props) => {
  return (
    <>
         <div className="form-group mb-2">
                  <label htmlFor={props.name}>{props.inputname}</label>

                  <input
                  className="form-control"
                    type={props.passwordvisible ? "text" : "password"}
                   name={props.name}
                   value={props.value}
                   onChange={props.onChange}
                   onBlur={props.onBlur}
                   placeholder={props.placeholder}
                  />
                  <div className="toggle-icon">
                    <i
                      className={`fa-solid ${
                        props.passwordvisible ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={props.tooglepassword}
                    ></i>
                  </div>
                  {props.error &&  <p className="text-danger">{props.errormessage}</p>}
                </div>
    </>
  )
}

export default PasswordInput
