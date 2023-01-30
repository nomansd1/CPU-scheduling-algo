import React, { useState } from "react";
import './App.css'
import { Link } from "react-router-dom"


function Priority() {

  const [processes, setProcesses] = useState([]);
  const [averageWaitingTime, setAverageWaitingTime] = useState(0);
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(0);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let waitingTimes = [0];
    let turnaroundTimes = [Number(processes[0].burstTime)];
    let wtavg = 0;
    let tatavg = turnaroundTimes[0];

    for (let i = 1; i < processes.length; i++) {
      waitingTimes[i] = waitingTimes[i - 1] + Number(processes[i - 1].burstTime);
      turnaroundTimes[i] = turnaroundTimes[i - 1] + Number(processes[i].burstTime);
      wtavg += waitingTimes[i];
      tatavg += turnaroundTimes[i];
    }
    setAverageWaitingTime(wtavg / processes.length);
    setAverageTurnaroundTime(tatavg / processes.length);
  };

  const handleChange = (e) => {
    const updatedProcesses = [...processes];
    updatedProcesses[e.target.dataset.idx][e.target.className] = Number(e.target.value);
    setProcesses(updatedProcesses);
  };
  const handleAddProcess = () => {
    setProcesses([...processes, { processId: "", burstTime: "", priority: "" }]);
  };


  return (
    <div className="App">
      <Link to="/"><button className="go_back">Go Back</button></Link>
      <h1>Let's Perform Priority Algorithm</h1>
      <form onSubmit={handleSubmit}>
        {processes.map((val, idx) => {
          const processId = `processId-${idx}`;
          const burstTime = `burstTime-${idx}`;
          const priority = `priority-${idx}`;
          return (
            <div key={`process-${idx}`} className='process_inputs'>
              <label htmlFor={processId} className='inputs_label' >Process ID:</label>
              <input
                type="text"
                name={processId}
                data-idx={idx}
                className="processId"
                onChange={handleChange}
                value={processes[idx].processId}
              />
              <label htmlFor={burstTime} className='inputs_label'>Burst Time:</label>
              <input
                type="text"
                name={burstTime}
                data-idx={idx}
                className="burstTime"
                onChange={handleChange}
                value={processes[idx].burstTime}
              />
              <label htmlFor={priority} className='inputs_label'>Priority:</label>
              <input
                type="text"
                name={priority}
                data-idx={idx}
                className="priority"
                onChange={handleChange}
                value={processes[idx].priority}
              />
            </div>
          );
        })}
        <div className="buttons_calc">
          <button type="button" onClick={handleAddProcess}>Add Process</button>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="process_table">
        <table>
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Burst Time</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((val, idx) => {
              return (
                <tr key={`process-${idx}`}>
                  <td>{val.processId}</td>
                  <td>{val.burstTime}</td>
                  <td>{val.priority}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h2>Average Wait Time: {averageWaitingTime}</h2>
        <h2>Average Turnaround Time: {averageTurnaroundTime}</h2>
      </div>
    </div>
  );
}

export default Priority