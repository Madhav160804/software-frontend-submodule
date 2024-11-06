// import React, { useEffect, useState } from 'react';

// const PreferenceViewingPagemajor = () => {
//   const clusters = {
//     cluster1: [
//       { name: 'Aryan', roll: '232IT005', cg: 9.2 },
//     ],
//     cluster2: [
//       { name: 'Tushar', roll: '232IT008', cg: 9.0 },
//       { name: 'Ashish', roll: '232IT090', cg: 8.9 },
//     ],
//     cluster3: [
//       { name: 'Anurag', roll: '232IT044', cg: 8.1 },
//       { name: 'Mansi', roll: '232IT041', cg: 7.5 },
//       { name: 'Manasa', roll: '232IT031', cg: 7.7 },
//     ],
//     cluster4: [
//       { name: 'Abhay', roll: '232IT087', cg: 7.6 },
//       { name: 'Ajay', roll: '232IT088', cg: 7.5 },
//       { name: 'Vivek', roll: '232IT055', cg: 7.4 },
//     ],
//   };

//   const [selectedStudents, setSelectedStudents] = useState({});
//   const [assignedStudents, setAssignedStudents] = useState([]);
//   const [timeRemaining, setTimeRemaining] = useState('');
//   const deadline = new Date('2024-10-15T22:17:00');

//   const formatTime = (ms) => {
//     const totalSeconds = Math.floor(ms / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   const handleSelect = (clusterName, studentName) => {
//     if (selectedStudents[clusterName]) {
//       alert(`Only one student can be selected from ${clusterName}!`);
//       return;
//     }

//     const now = new Date();
//     if (now > deadline) {
//       alert('The deadline has passed. Students have been assigned.'); // Simple alert
//       assignStudents(); // Automatically assign when deadline is crossed
//       return;
//     }

//     setSelectedStudents((prev) => ({ ...prev, [clusterName]: studentName }));
//   };

//   const removeSelectedStudent = (cluster) => {
//     setSelectedStudents((prev) => {
//       const updated = { ...prev };
//       delete updated[cluster];
//       return updated;
//     });
//   };

//   const assignStudents = () => {
//     const newAssigned = [];
//     Object.entries(clusters).forEach(([key, students]) => {
//       const highestCGStudent = students.reduce((prev, curr) =>
//         prev.cg > curr.cg ? prev : curr
//       );

//       // Check if the student is selected or automatically assign if there’s only one
//       if (!selectedStudents[key] && students.length > 1) {
//         newAssigned.push({
//           cluster: key,
//           student: highestCGStudent,
//         });
//       } else if (students.length === 1) {
//         newAssigned.push({
//           cluster: key,
//           student: highestCGStudent, // Automatically assign the only student
//         });
//       } else {
//         const selectedStudent = students.find(s => s.name === selectedStudents[key]);
//         newAssigned.push({
//           cluster: key,
//           student: selectedStudent,
//         });
//       }
//     });
//     setAssignedStudents(newAssigned);
//   };

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       const now = new Date();
//       const timeDiff = deadline - now;
//       if (timeDiff <= 0) {
//         clearInterval(countdown);
//         alert('The deadline has passed. Students have been assigned.'); // Simple alert when deadline is crossed
//         assignStudents();
//         return;
//       }
//       setTimeRemaining(formatTime(timeDiff));
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, [selectedStudents]);

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f5ff, #ebe2ff)' }}>
//       {/* Preferences Viewing */}
//       <section className="flex justify-center items-start pt-10 pb-40">
//         <div className="bg-white p-10 rounded shadow-lg w-full max-w-3xl">
//           <h1 className="text-3xl font-semibold mb-8">Review Student Preferences</h1>

//           {Object.entries(clusters).map(([key, students]) => (
//             <div key={key} className="mb-6">
//               <h2 className="text-xl font-semibold">{key}</h2>
//               {students.length > 0 ? (
//                 <table className="min-w-full bg-white border border-gray-300">
//                   <tbody>
//                     {students.map((student) => (
//                       <tr key={student.roll} className="hover:bg-gray-100 cursor-pointer">
//                         <td className="border border-gray-300 p-2">{student.name}</td>
//                         <td className="border border-gray-300 p-2">{student.roll}</td>
//                         <td className="border border-gray-300 p-2">{student.cg}</td>
//                         <td className="border border-gray-300 p-2">
//                           {assignedStudents.find(a => a.student.roll === student.roll) ? (
//                             <button className="bg-green-500 text-white py-1 px-2 rounded" disabled>
//                               Assigned
//                             </button>
//                           ) : selectedStudents[key] === student.name ? (
//                             <button
//                               className="bg-green-500 text-white py-1 px-2 rounded"
//                             >
//                               Selected
//                               <span
//                                 className="ml-2 cursor-pointer text-red-600"
//                                 onClick={() => removeSelectedStudent(key)}
//                               >
//                                 ✖
//                               </span>
//                             </button>
//                           ) : (
//                             <button
//                               className="bg-blue-500 text-white py-1 px-2 rounded"
//                               onClick={() => handleSelect(key, student.name)}
//                             >
//                               Select
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div>No Student in this Cluster</div>
//               )}
//             </div>
//           ))}

//           <div className="font-bold text-xl">{timeRemaining}</div>

//           {/* Assigned Students Table */}
//           <h2 className="text-xl font-semibold mt-4">Assigned Students</h2>
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Roll</th>
//                 <th className="border border-gray-300 p-2">CGPA</th>
//                 <th className="border border-gray-300 p-2">Cluster</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignedStudents.map(({ cluster, student }) => (
//                 <tr key={student.roll}>
//                   <td className="border border-gray-300 p-2">{student.name}</td>
//                   <td className="border border-gray-300 p-2">{student.roll}</td>
//                   <td className="border border-gray-300 p-2">{student.cg}</td>
//                   <td className="border border-gray-300 p-2">{cluster}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PreferenceViewingPagemajor;


import React, { useEffect, useState } from 'react';

const PreferenceViewingPagemajor = () => {
  const clusters = {
    cluster1: [
      { name: 'Aryan', roll: '232IT005', cg: 9.2 },
    ],
    cluster2: [
      { name: 'Tushar', roll: '232IT008', cg: 9.0 },
      { name: 'Ashish', roll: '232IT090', cg: 8.9 },
    ],
    cluster3: [
      { name: 'Anurag', roll: '232IT044', cg: 8.1 },
      { name: 'Mansi', roll: '232IT041', cg: 7.5 },
      { name: 'Manasa', roll: '232IT031', cg: 7.7 },
    ],
    cluster4: [
      { name: 'Abhay', roll: '232IT087', cg: 7.6 },
      { name: 'Ajay', roll: '232IT088', cg: 7.5 },
      { name: 'Vivek', roll: '232IT055', cg: 7.4 },
    ],
  };

  const [selectedStudents, setSelectedStudents] = useState({});
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const deadline = new Date('2024-10-16T14:17:00');

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Deadline Alert!', {
        body: 'Resolve clashes before Deadline!',
      });
    }
  };

  const handleSelect = (clusterName, studentName) => {
    if (selectedStudents[clusterName]) {
      alert(`Only one student can be selected from ${clusterName}!`);
      return;
    }

    const now = new Date();
    if (now > deadline) {
      alert('The deadline has passed. Students have been assigned.');
      assignStudents();
      return;
    }

    setSelectedStudents((prev) => ({ ...prev, [clusterName]: studentName }));
  };

  const removeSelectedStudent = (cluster) => {
    setSelectedStudents((prev) => {
      const updated = { ...prev };
      delete updated[cluster];
      return updated;
    });
  };

  const assignStudents = () => {
    const newAssigned = [];
    Object.entries(clusters).forEach(([key, students]) => {
      const highestCGStudent = students.reduce((prev, curr) =>
        prev.cg > curr.cg ? prev : curr
      );

      if (!selectedStudents[key] && students.length > 1) {
        newAssigned.push({
          cluster: key,
          student: highestCGStudent,
        });
      } else if (students.length === 1) {
        newAssigned.push({
          cluster: key,
          student: highestCGStudent,
        });
      } else {
        const selectedStudent = students.find(s => s.name === selectedStudents[key]);
        newAssigned.push({
          cluster: key,
          student: selectedStudent,
        });
      }
    });
    setAssignedStudents(newAssigned);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date();
      const timeDiff = deadline - now;
      if (timeDiff <= 0) {
        clearInterval(countdown);
        alert('The deadline has passed. Students have been assigned.');
        assignStudents();
        return;
      }

      if (timeDiff <= 24 * 60 * 60 * 1000) {
        showNotification();
      }

      setTimeRemaining(formatTime(timeDiff));
    }, 1000);

    return () => clearInterval(countdown);
  }, [selectedStudents]);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f5ff, #ebe2ff)' }}>
      {/* Preferences Viewing */}
      <section className="flex justify-center items-start pt-10 pb-40">
        <div className="bg-white p-10 rounded shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-semibold mb-8">Review Student Preferences</h1>

          {Object.entries(clusters).map(([key, students]) => (
            <div key={key} className="mb-6">
              <h2 className="text-xl font-semibold">{key}</h2>
              {students.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.roll} className="hover:bg-gray-100 cursor-pointer">
                        <td className="border border-gray-300 p-2">{student.name}</td>
                        <td className="border border-gray-300 p-2">{student.roll}</td>
                        <td className="border border-gray-300 p-2">{student.cg}</td>
                        <td className="border border-gray-300 p-2">
                          {assignedStudents.find(a => a.student.roll === student.roll) ? (
                            <button className="bg-gray-400 text-white py-1 px-2 rounded" disabled>
                              Assigned
                            </button>
                          ) : selectedStudents[key] === student.name ? (
                            <button className="bg-green-500 text-white py-1 px-2 rounded">
                              Selected
                              <span
                                className="ml-2 cursor-pointer text-red-600"
                                onClick={() => removeSelectedStudent(key)}
                              >
                                ✖
                              </span>
                            </button>
                          ) : (
                            <button
                              className="bg-blue-500 text-white py-1 px-2 rounded"
                              onClick={() => handleSelect(key, student.name)}
                            >
                              Select
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No Student in this Cluster</div>
              )}
            </div>
          ))}

          <div className="font-bold text-xl">{timeRemaining}</div>

          {/* Assigned Students Table */}
          <h2 className="text-xl font-semibold mt-4">Assigned Students</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Roll</th>
                <th className="border border-gray-300 p-2">CGPA</th>
                <th className="border border-gray-300 p-2">Cluster</th>
              </tr>
            </thead>
            <tbody>
              {assignedStudents.map(({ cluster, student }) => (
                <tr key={student.roll}>
                  <td className="border border-gray-300 p-2">{student.name}</td>
                  <td className="border border-gray-300 p-2">{student.roll}</td>
                  <td className="border border-gray-300 p-2">{student.cg}</td>
                  <td className="border border-gray-300 p-2">{cluster}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PreferenceViewingPagemajor;