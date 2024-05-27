import React from 'react'
import Routine from './Components/Routine'
import Stat from './Components/Stat'

const Graphs = () => {
  return (
    <div className="container my-3">
    <div className="row">
      <div className="col-md-6">
        <Routine/>
      </div>
      <div className="col-md-6">
        <Stat/>
      </div>
    </div>
    </div>
  )
}

export default Graphs
