import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';

function ListAssignment(props) {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    fetch(`${SERVER_URL}/assignment`)
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
      })
      .catch((err) => {
        setMessage('Error fetching assignments');
        console.error(err);
      });
  };

  const handleDeleteAssignment = (assignmentId) => {
    
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
        
          setMessage('Assignment deleted successfully');
          props.onDeleteAssignmentSuccess(assignmentId); 
        } else {
        
          setMessage('Error deleting assignment');
          console.error('Delete assignment error:', response.status);
        }
      })
      .catch((error) => {
       
        setMessage('Error deleting assignment');
        console.error('Delete assignment error:', error);
      });
  };

  const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];

  return (
    <div>
      <h3>Assignments</h3>
      <div margin="auto">
        <h4>{message}&nbsp;</h4>
        <table className="Center">
          <thead>
            <tr>
              {headers.map((title, idx) => (
                <th key={idx}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((row, idx) => (
              <tr key={idx}>
                <td>{row.assignmentName}</td>
                <td>{row.courseTitle}</td>
                <td>{row.dueDate}</td>
                <td>
                  <Link to={`/gradeAssignment/${assignments[idx].id}`}>Grade</Link>
                </td>
                <td>
                  <Link to={`/editAssignment/${assignments[idx].id}`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => handleDeleteAssignment(assignments[idx].id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListAssignment;