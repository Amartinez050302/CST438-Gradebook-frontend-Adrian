import React, { useState, useEffect } from 'react';

function EditAssignment(props) {
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAssignmentName(props.assignment.name);
    setAssignmentDueDate(props.assignment.dueDate);
  }, [props.assignment]);

  const handleEditAssignment = (e) => {
    e.preventDefault();

    const updatedAssignment = {
      id: props.assignment.id,
      name: assignmentName,
      dueDate: assignmentDueDate,
    };

    
    fetch(`${SERVER_URL}/assignment/${props.assignment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then((response) => response.json())
      .then((data) => {
        
        setMessage('Assignment updated successfully');
        props.onEditAssignmentSuccess(data); 
      })
      .catch((error) => {
        
        setMessage('Error updating assignment');
        console.error('Edit assignment error:', error);
      });
  };
 // displays relevant information correctly and uses labels. Needs to implement a dialogue box to display information.
  return (
    <div>
      <h2>Edit Assignment</h2>
      <form onSubmit={handleEditAssignment}>
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
          <button type="submit">Update Assignment</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditAssignment;
