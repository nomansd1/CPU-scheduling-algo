import React, { useState } from "react";
import './App.css'

function Fcfs() {
  const [processes, setProcesses] = useState([]);
  const [avgWaitTime, setAvgWaitTime] = useState(0);
  const [avgTurnAroundTime, setAvgTurnAroundTime] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();

    let currentTime = 0;
    let turnAroundTime = 0;
    let waitingTime = 0;

    for (var i = 0; i < processes.length; i++) {
      if (i == 0) {
        currentTime = Number(processes[i].arrivalTime);
      } else {
      currentTime += Number(processes[i-1].burstTime);
      }
      console.log(currentTime);
      waitingTime += currentTime - Number(processes[i].arrivalTime);
      turnAroundTime += currentTime - Number(processes[i].arrivalTime) + Number(processes[i].burstTime);
    }
    console.log(waitingTime);
    console.log(processes);
    setAvgWaitTime(waitingTime / processes.length);
    setAvgTurnAroundTime(turnAroundTime / processes.length);
  };

  const handleChange = (e) => {
    const updatedProcesses = [...processes];
    updatedProcesses[e.target.dataset.idx][e.target.className] = Number(e.target.value);
    setProcesses(updatedProcesses);
  };
  const handleAddProcess = () => {
    setProcesses([...processes, { processId: "", burstTime: "", arrivalTime: ""}]);
  };

  return (
    <div className="App">
      <h1>Let's Perform FCFS Algorithm</h1>
      <form onSubmit={handleSubmit}>
        {processes.map((val, idx) => {
          const processId = `processId-${idx}`;
          const burstTime = `burstTime-${idx}`;
          const arrivalTime = `arrivalTime-${idx}`;
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
              <label htmlFor={arrivalTime} className='inputs_label'>Arrival Time:</label>
              <input
                type="text"
                name={arrivalTime}
                data-idx={idx}
                className="arrivalTime"
                onChange={handleChange}
                value={processes[idx].arrivalTime}
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
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((val, idx) => {  
              return (
                <tr key={`process-${idx}`}>
                  <td>{val.processId}</td>
                  <td>{val.burstTime}</td>
                  <td>{val.arrivalTime}</td>
                </tr>)})}
          </tbody>
        </table>
        <h2>Average Wait Time: {avgWaitTime}</h2>
        <h2>Average Turnaround Time: {avgTurnAroundTime}</h2>
      </div>
    </div>
  );
}

export default Fcfs

