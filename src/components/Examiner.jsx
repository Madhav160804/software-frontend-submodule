import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './styles.css';
import examinersc from '../images/examinersc.png';
import examinersc2 from '../images/examinersc2.png';
import { Box } from "@chakra-ui/react";

emailjs.init("PCF_pjb2Ugr7vdxEU");


const Examiner = () => {
  const [students, setStudents] = useState([
    { registerNumber: '011', name: 'Anshah', projectType: 'MAJOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete' },
    { registerNumber: '012', name: 'Bhoomika', projectType: 'MINOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete'  },
    { registerNumber: '013', name: 'Alice', projectType: 'MAJOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete'  },
    { registerNumber: '044', name: 'Bob', projectType: 'MAJOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete'  },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [marks, setMarks] = useState({
    midSem: {
      depth: '',
      workDone: '',
      exceptionalWork: '',
      viva: '',
      presentation: '',
      report: '',
    },
    endSem: {
      depth: '',
      workDone: '',
      exceptionalWork: '',
      viva: '',
      presentation: '',
      report: '',
    },
  });

  const fieldDisplayNames = {
    depth: 'Depth of Understanding',
    workDone: 'Work done and Results',
    exceptionalWork: 'Exceptional Work',
    viva: 'Viva-Voce',
    presentation: 'Presentation',
    report: 'Report',
  };
  
  useEffect(() => {
    // Load stored students data, including status
    const storedStudents = localStorage.getItem('studentsData');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    if (currentStudent) {
      // Fetch stored mid-sem and end-sem marks for the current student from localStorage
      const savedMidSemMarks = localStorage.getItem(`examiner_${currentStudent.registerNumber}_midSem`);
      const savedEndSemMarks = localStorage.getItem(`examiner_${currentStudent.registerNumber}_endSem`);

      if (savedMidSemMarks) {
        setMarks((prev) => ({
          ...prev,
          midSem: JSON.parse(savedMidSemMarks),
        }));
      }

      if (savedEndSemMarks) {
        setMarks((prev) => ({
          ...prev,
          endSem: JSON.parse(savedEndSemMarks),
        }));
      }
    }
  }, [currentStudent]);
  
  const openModal = (student, type) => {
    if (type === 'midSem' && student.midSemStatus === 'Complete') {
      setCurrentStudent(student);
      setModalOpen(type);
    } else if (type === 'endSem' && student.endSemStatus === 'Complete') {
      setCurrentStudent(student);
      setModalOpen(type);
    } else {
      alert(`Evaluation not completed for ${type}. You cannot enter marks.`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStudent(null);
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [modalOpen]: {
        ...prevMarks[modalOpen],
        [name]: value,
      },
    }));
  };
  
  const handleDateTimeChange = (e, student) => {
    const updatedStudents = students.map((s) =>
      s.registerNumber === student.registerNumber ? { ...s, evaluationDateTime: e.target.value } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
  };

  const submitMarks = () => {
    const currentMarks = marks[modalOpen];

    if (Object.values(currentMarks).some((mark) => mark === '')) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate each field
    const depth = parseInt(currentMarks.depth);
    const workDone = parseInt(currentMarks.workDone);
    const exceptionalWork = parseInt(currentMarks.exceptionalWork);
    const viva = parseInt(currentMarks.viva);
    const presentation = parseInt(currentMarks.presentation);
    const report = parseInt(currentMarks.report);
    const attendance = parseInt(currentMarks.attendance);

    if (depth < 0 || workDone < 0 || exceptionalWork < 0 || viva < 0 || presentation < 0 || report < 0 || attendance < 0) {
      alert('Marks cannot be negative.');
      return;
    }
    if (depth > 8) {
      alert('Maximum marks for "Depth of Understanding" is 8.');
      return;
    }
    if (workDone > 12) {
      alert('Maximum marks for "Work done and Results" is 12.');
      return;
    }
    if (exceptionalWork > 6) {
      alert('Maximum marks for "Exceptional Work" is 6.');
      return;
    }
    if (viva > 8) {
      alert('Maximum marks for "Viva-Voce" is 8.');
      return;
    }
    if (presentation > 4) {
      alert('Maximum marks for "Presentation" is 4.');
      return;
    }
    if (report > 2) {
      alert('Maximum marks for "Report" is 2.');
      return;
    }

    const totalMarksMidSem = depth + workDone + exceptionalWork + viva + presentation + report;
    if (totalMarksMidSem > 40) {
      alert('Total marks cannot exceed 40. Please adjust the marks.');
      return;
    }

    if (currentStudent) {
      localStorage.setItem(`examiner_${currentStudent.registerNumber}_${modalOpen}`, JSON.stringify(currentMarks));
      alert('Marks have been successfully saved!');
      closeModal();
    }
  };

  // Function to calculate total marks for each student
  const calculateTotalMarks = (student) => {
    const midSemMarks = JSON.parse(localStorage.getItem(`examiner_${student.registerNumber}_midSem`)) || {};
    const endSemMarks = JSON.parse(localStorage.getItem(`examiner_${student.registerNumber}_endSem`)) || {};

    const totalMidSem = Object.values(midSemMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    const totalEndSem = Object.values(endSemMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    
    return totalMidSem + totalEndSem;
  };
  
 /* // Function to change the evaluation status of a student to "Complete"
  const toggleEvaluationStatus = (student, type) => {
  // Check if the current status is 'Incomplete'
  if (student.status === 'Incomplete') {
    const updatedStudents = students.map((s) =>
      s.registerNumber === student.registerNumber ? { ...s, status: 'Complete' } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
  } else {
    //alert('Status cannot be changed back to Incomplete once it is set to Complete.');
    const updatedStudents = students.map((s) =>
      s.registerNumber === student.registerNumber ? { ...s, status: 'Incomplete' } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));

  }
};*/

  const toggleEvaluationStatus = (student, type) => {
    const updatedStudents = students.map((s) => {
      if (s.registerNumber === student.registerNumber) {
        const newStatus = s[`${type}Status`] === 'Incomplete' ? 'Complete' : 'Incomplete';
        return { ...s, [`${type}Status`]: newStatus };
      }
      return s;
    });
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
  };

  // Function to calculate the current total marks based on input
const calculateCurrentTotal = () => {
  const currentMarks = marks[modalOpen];
  return Object.values(currentMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
};
let isEmailSent = false;
const submitAllMarks = () => {
  if (isEmailSent) {
    alert("Marks have already been submitted.");
    return; // Exit the function if the email is already sent
  }

  // Display a confirmation dialog
  const confirmSubmission = confirm("Are you sure you want to submit marks?");
  
  if (!confirmSubmission) {
    alert("Submission canceled. You can still submit marks.");
    return; // Exit function if user cancels submission
  }

  // Collect marks data
  const allMarks = students.map((student) => {
    const midSemMarks = JSON.parse(localStorage.getItem(`examiner_${student.registerNumber}_midSem`)) || {};
    const endSemMarks = JSON.parse(localStorage.getItem(`examiner_${student.registerNumber}_endSem`)) || {};
    
    return {
      registerNumber: student.registerNumber,
      name: student.name,
      midSem: midSemMarks,
      endSem: endSemMarks,
    };
  });

  // Prepare email content
  let emailContent = 'Marks Report:\n\n';

  allMarks.forEach(student => {
    emailContent += `Student: ${student.name} (${student.registerNumber})\n`;
    
    // Mid-Semester Marks
    emailContent += 'Mid-Sem Marks:\n';
    if (Object.keys(student.midSem).length === 0) {
      emailContent += `No marks entered for Mid-Sem\n`;
    } else {
      Object.keys(student.midSem).forEach(key => {
        emailContent += `${fieldDisplayNames[key]}: ${student.midSem[key] || 'Not Entered'}\n`;
      });
    }
    
    // End-Semester Marks
    emailContent += 'End-Sem Marks:\n';
    if (Object.keys(student.endSem).length === 0) {
      emailContent += `No marks entered for End-Sem\n`;
    } else {
      Object.keys(student.endSem).forEach(key => {
        emailContent += `${fieldDisplayNames[key]}: ${student.endSem[key] || 'Not Entered'}\n`;
      });
    }
    
    emailContent += '\n'; // Add space between students
  });

  // Send email using EmailJS
  emailjs.send('service_2httliq', 'template_tqb9dri', {
    message: emailContent,
    to_email: 'amane.eken@gmail.com' // replace with recipient's email
  })
  .then((response) => {
    console.log('Email sent successfully!', response.status, response.text);
    alert('All marks have been emailed successfully!');

    // Set the flag to true, indicating the email has been sent
    isEmailSent = true;

    // Disable the submit button after successful submission
    document.getElementById("submitMarksButton").disabled = true;
  })
};


  return (
     <Box minH="100vh" bgGradient="linear(to-b, blue.100, purple.100)">
    <div className="examiner-container">
      {/* Header */}
      <div className="header">
        EXAMINER MODE
      </div>

      {/* Image Section */}
      <div className="image-container">
        <img src={examinersc} alt="Examiner Screenshot 2" />
        <img src={examinersc2} alt="Examiner Screenshot" />
      </div>

      {/* Student List Title */}
      <h1 className="student-list-title">STUDENT LIST</h1>

      {/* Student Table */}
      <div className="table-container">
        <table id="studentsTable">
          <thead>
            <tr>
              <th>REGISTER NUMBER</th>
              <th>STUDENT NAME</th>
              <th>PROJECT TYPE</th>
              <th>MID-SEM EVALUATION STATUS</th>
              <th>END-SEM EVALUATION STATUS</th>
              <th>ENTER MID-SEM MARKS</th>
              <th>ENTER END-SEM MARKS</th>
              <th>TOTAL MARKS</th> 
              <th>EVALUATION DATE & TIME</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.registerNumber} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{student.registerNumber}</td>
                <td>{student.name}</td>
                <td>{student.projectType}</td>
                <td
                  className={student.midSemStatus === 'Complete' ? 'status-complete' : 'status-incomplete'}
                  onClick={() => toggleEvaluationStatus(student, 'midSem')} // Toggle status on click
                  style={{ cursor: 'pointer' }}
                >
                  {student.midSemStatus}
                </td>
                <td
                  className={student.endSemStatus === 'Complete' ? 'status-complete' : 'status-incomplete'}
                  onClick={() => toggleEvaluationStatus(student, 'endSem')} // Toggle status on click
                  style={{ cursor: 'pointer' }}
                >
                  {student.endSemStatus}
                </td>
                <td>
                  <button onClick={() => openModal(student, 'midSem')} 
                    className={localStorage.getItem(`examiner_${student.registerNumber}_midSem`) ? 'button-edit' : ''}>
                    {localStorage.getItem(`examiner_${student.registerNumber}_midSem`) ? 'Edit Marks' : 'Enter Marks'}
                  </button>
                </td>
                <td>
                  <button onClick={() => openModal(student, 'endSem')} 
                    className={localStorage.getItem(`examiner_${student.registerNumber}_endSem`) ? 'button-edit' : ''}>
                    {localStorage.getItem(`examiner_${student.registerNumber}_endSem`) ? 'Edit Marks' : 'Enter Marks'}
                  </button>
                </td>
                <td>{calculateTotalMarks(student)}</td> {/* Display total marks here */}
                <td>
                  <input
                    type="datetime-local"
                    value={student.evaluationDateTime}
                    onChange={(e) => handleDateTimeChange(e, student)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit All Marks Button */}
      <div 
  className="submit-button-container" 
  style={{
    display: 'flex', 
    justifyContent: 'center', 
    marginTop: '16px' // optional spacing above button
  }}
>
  <button
    onClick={submitAllMarks}
    style={{
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    }}
  >
    Submit All Marks
  </button>
</div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
      <h2 className="enter-marks">Enter {modalOpen === 'midSem' ? 'Mid-Sem' : 'End-Sem'} Marks for {currentStudent?.name}</h2>
      <div className="modal-form">
        {Object.keys(marks[modalOpen]).map((field) => (
          <div key={field} className="modal-field">
            <label className="modal-label">{fieldDisplayNames[field]}</label>
            <input
              type="number"
              name={field}
              value={marks[modalOpen][field]}
              onChange={handleMarksChange}
              className="modal-input"
            />
          </div>
        ))}
      </div>
      {/* Calculate total marks */}
      <div className="modal-total-container">
      <div
  className="modal-total"
  style={{
    fontSize: '16px',          // Adjust the font size
    fontWeight: 'bold',        // Make the text bold
    color: '#333',             // Set the text color
    margin: '10px 0',
    marginBottom: '20px',         // Add some margin around
    textAlign: 'center',       // Center the text
  }}
>
  Total Marks: {calculateCurrentTotal()} / {modalOpen === 'midSem' ? 40 : 40}
  
</div>

      </div>
      <div 
  className="button-group" 
  style={{
    display: 'flex', 
    justifyContent: 'center', 
    gap: '8px', // space between buttons
    marginTop: '16px' // optional spacing above buttons
  }}
>
  <button
    onClick={submitMarks}
    style={{
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    }}
  >
    Save Marks
  </button>
  <button
    onClick={closeModal}
    style={{
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    }}
  >
    Close
  </button>
</div>
    </div>
        </div>
      )}
    </div>
  </Box>
  );
};

export default Examiner;



