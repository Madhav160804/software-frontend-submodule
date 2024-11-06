import React, { useEffect, useState } from 'react';

const PreferenceViewing = () => {
  const clusters = {
    cluster1: [
      { name: 'Sanjana', roll: '221IT041', cg: 9.2 },
    ],
    cluster2: [
      { name: 'Sonali', roll: '221IT065', cg: 9.0 },
      { name: 'Mahitha', roll: '221IT036', cg: 8.9 },
    ],
    cluster3: [
      { name: 'Akshitha', roll: '221IT039', cg: 8.1 },
      { name: 'Upasana', roll: '221IT075', cg: 8.0 },
      { name: 'Anshah', roll: '221IT009', cg: 7.7 },
    ],
    cluster4: [
      { name: 'Bhoomika', roll: '221IT018', cg: 7.6 },
      { name: 'Prajna', roll: '221IT051', cg: 7.5 },
    ],
  };

  const [selectedStudents, setSelectedStudents] = useState({});
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const deadline = new Date('2024-10-15T23:33:00');

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleSelect = (clusterName, studentName) => {
    if (selectedStudents[clusterName]) {
      alert(`Only one student can be selected from ${clusterName}!`);
      return;
    }

    const now = new Date();
    if (now > deadline) {
      alert('The deadline has passed. Students have been assigned.'); // Simple alert
      assignStudents(); // Automatically assign when deadline is crossed
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

      // Check if the student is selected or automatically assign if there’s only one
      if (!selectedStudents[key] && students.length > 1) {
        newAssigned.push({
          cluster: key,
          student: highestCGStudent,
        });
      } else if (students.length === 1) {
        newAssigned.push({
          cluster: key,
          student: highestCGStudent, // Automatically assign the only student
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
        alert('The deadline has passed. Students have been assigned.'); // Simple alert when deadline is crossed
        assignStudents();
        return;
      }
      setTimeRemaining(formatTime(timeDiff));
    }, 1000);

    return () => clearInterval(countdown);
  }, [selectedStudents]);

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
                            <button className="bg-green-500 text-white py-1 px-2 rounded" disabled>
                              Assigned
                            </button>
                          ) : selectedStudents[key] === student.name ? (
                            <button
                              className="bg-green-500 text-white py-1 px-2 rounded"
                            >
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

export default PreferenceViewing;
