import React from 'react'

const CalorieTab = () => {
  return (
    <>
      <div className="container">
          <table className=" table my-3 table-responsive py-2">
            <thead>
              <tr className="text-light text-center bg-info">
                <th>#</th>
                <th>Calorie Intake</th>
                <th>Calorie Burn</th>
                <th>Time</th>
                <th>Delete</th>{" "}
              </tr>
            </thead>
          </table>
        </div> 
    </>
  )
}

export default CalorieTab
