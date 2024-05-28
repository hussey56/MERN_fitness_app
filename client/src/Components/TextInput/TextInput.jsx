import React from 'react'

const TextInput = (props) => {
  return (
    <>
    <div className={`form-group`}>
                 {props.label == true &&<label htmlFor={props.name}>{props.inputname}</label>}
                  <input
                     {...props}
                  />
      {props.error &&  <p className="text-danger">{props.errormessage}</p>}

                  </div>
      
    </>
  )
}

export default TextInput
