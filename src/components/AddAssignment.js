import React, { useState } from 'react';

function AddAssignment(props) {
  
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');

  
  const handleAddAssignment = (e) => {
    e.preventDefault();

  

   
    const newAssignment = {
      name: assignmentName,
      dueDate: assignmentDueDate,
    };

    
    props.onAddAssignment(newAssignment);


    setAssignmentName('');
    setAssignmentDueDate('');
  };
 // Displays and adds functionality to add a new assignment. 
  return (
    <div>
      <h2>Add Assignment</h2>
      <form onSubmit={handleAddAssignment}>
        <div>
          <label htmlFor="assignmentName">Assignment Name:</label>
          <input
            type="text"
            id="assignmentName"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="assignmentDueDate">Due Date:</label>
          <input
            type="date"
            id="assignmentDueDate"
            value={assignmentDueDate}
            onChange={(e) => setAssignmentDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Add Assignment</button>
        </div>
      </form>
    </div>
  );
}

export default AddAssignment;
