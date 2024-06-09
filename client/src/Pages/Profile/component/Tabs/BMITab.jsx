import React from 'react'

const BMITab = () => {
  return (
    <>
       <div className="container">
          <table className=" table my-3 table-responsive py-2">
            <thead>
              <tr className="text-light text-center bg-primary">
                <th>#</th>
                <th>BMI</th>
                <th>Time</th>
                <th>Delete</th>{" "}
              </tr>
            </thead>
          </table>
        </div>
    </>
  )
}

export default BMITab
