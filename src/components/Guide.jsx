import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './styles.css';
emailjs.init("PCF_pjb2Ugr7vdxEU");


const Guide = () => {
  const [students, setStudents] = useState([
    { registerNumber: '011', name: 'John', projectType: 'MAJOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete' },
    { registerNumber: '012', name: 'Jane', projectType: 'MINOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete' },
    { registerNumber: '013', name: 'Ria D', projectType: 'MAJOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete' },
    { registerNumber: '044', name: 'Brown', projectType: 'MAJOR', midSemStatus: 'Inomplete' , endSemStatus: 'Incomplete' },
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
      attendance: '',
    },
    endSem: {
      depth: '',
      workDone: '',
      exceptionalWork: '',
      viva: '',
      presentation: '',
      report: '',
      attendance: '',
    },
  });

  const fieldDisplayNames = {
    depth: 'Depth of Understanding',
    workDone: 'Work done and Results',
    exceptionalWork: 'Exceptional Work',
    viva: 'Viva-Voce',
    presentation: 'Presentation',
    report: 'Report',
    attendance: 'Attendance',
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
      const savedMidSemMarks = localStorage.getItem(`guide_${currentStudent.registerNumber}_midSem`);
      const savedEndSemMarks = localStorage.getItem(`guide_${currentStudent.registerNumber}_endSem`);

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
      setModalOpen(type);  // Store which type of marks are being entered
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
    if (depth > 12) {
      alert('Maximum marks for "Depth of Understanding" is 12.');
      return;
    }
    if (workDone > 18) {
      alert('Maximum marks for "Work done and Results" is 18.');
      return;
    }
    if (exceptionalWork > 6) {
      alert('Maximum marks for "Exceptional Work" is 6.');
      return;
    }
    if (viva > 12) {
      alert('Maximum marks for "Viva-Voce" is 12.');
      return;
    }
    if (presentation > 6) {
      alert('Maximum marks for "Presentation" is 6.');
      return;
    }
    if (report > 3) {
      alert('Maximum marks for "Report" is 3.');
      return;
    }
    if (attendance > 3) {
      alert('Maximum marks for "Attendance" is 3.');
      return;
    }

    const totalMarksMidSem = depth + workDone + exceptionalWork + viva + presentation + report + attendance;
    if (totalMarksMidSem > 60) {
      alert('Total mid-sem marks cannot exceed 60. Please adjust the marks.');
      return;
    }

    if (currentStudent) {
      localStorage.setItem(`guide_${currentStudent.registerNumber}_${modalOpen}`, JSON.stringify(currentMarks));
      alert('Marks have been successfully submitted!');
      closeModal();
    }
  };

  // Function to calculate total marks for each student
  const calculateTotalMarks = (student) => {
    const midSemMarks = JSON.parse(localStorage.getItem(`guide_${student.registerNumber}_midSem`)) || {};
    const endSemMarks = JSON.parse(localStorage.getItem(`guide_${student.registerNumber}_endSem`)) || {};

    const totalMidSem = Object.values(midSemMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    const totalEndSem = Object.values(endSemMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    
    return totalMidSem + totalEndSem;
  };
  
  /*// Function to change the evaluation status of a student to "Complete"
  const toggleEvaluationStatus = (student) => {
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

  const calculateCurrentTotal = () => {
    const currentMarks = marks[modalOpen];
    return Object.values(currentMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
  };
  
const submitAllMarks = () => {
  const allMarks = students.map((student) => {
    const midSemMarks = JSON.parse(localStorage.getItem(`guide_${student.registerNumber}_midSem`)) || {};
    const endSemMarks = JSON.parse(localStorage.getItem(`guide_${student.registerNumber}_endSem`)) || {};
    
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

  // Sending email using EmailJS
  emailjs.send('service_2httliq', 'template_tqb9dri', {
    message: emailContent,
    to_email: 'amane.eken@gmail.com' // replace with recipient's email
  })
  .then((response) => {
    console.log('Email sent successfully!', response.status, response.text);
    alert('All marks have been emailed successfully!');
  })
  .catch((error) => {
    console.error('Failed to send email:', error);
    alert('Failed to send email. Please try again later.');
  });
};


  return (
    <div className="examiner-container">
      {/* Header */}
      <div className="header">
        GUIDE MODE
      </div>

      {/* Image Section */}
      <div className="image-container">
        <img src="guidesc.png" alt="Guide Screenshot" />
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
                    className={localStorage.getItem(`guide_${student.registerNumber}_midSem`) ? 'button-edit' : ''}>
                    {localStorage.getItem(`guide_${student.registerNumber}_midSem`) ? 'Edit Marks' : 'Enter Marks'}
                  </button>
                </td>
                <td>
                  <button onClick={() => openModal(student, 'endSem')} 
                    className={localStorage.getItem(`guide_${student.registerNumber}_endSem`) ? 'button-edit' : ''}>
                    {localStorage.getItem(`guide_${student.registerNumber}_endSem`) ? 'Edit Marks' : 'Enter Marks'}
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
      <div className="submit-button-container">
        <button onClick={submitAllMarks}>
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
  Total Marks: {calculateCurrentTotal()} / {modalOpen === 'midSem' ? 60 : 60}
  
</div>

  <div className="button-group">
    <button onClick={submitMarks}>Submit Marks</button>
    <button onClick={closeModal}>Close</button>
  </div>
</div>

        </div>
      )}
    </div>
  );
};

export default Guide;
