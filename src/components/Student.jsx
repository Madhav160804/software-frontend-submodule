import React from 'react';

const Student = () => {
    // Data for the table with guide and examiner marks
    const data = [
        { criteria: 'Depth of Understanding', midSemGuideMarks: 10, midSemExaminerMarks: 7, endSemGuideMarks: 12, endSemExaminerMarks: 8 },
        { criteria: 'Results and Work Done', midSemGuideMarks: 15, midSemExaminerMarks: 10, endSemGuideMarks: 10, endSemExaminerMarks: 12 },
        { criteria: 'Exceptional Work', midSemGuideMarks: 5, midSemExaminerMarks: 5, endSemGuideMarks: 5, endSemExaminerMarks: 5 },
        { criteria: 'Viva-Voce', midSemGuideMarks: 9, midSemExaminerMarks: 6, endSemGuideMarks: 8, endSemExaminerMarks: 7 },
        { criteria: 'Presentation', midSemGuideMarks: 5, midSemExaminerMarks: 3, endSemGuideMarks: 3, endSemExaminerMarks: 3 },
        { criteria: 'Report', midSemGuideMarks: 2, midSemExaminerMarks: 2, endSemGuideMarks: 2, endSemExaminerMarks: 2 },
        { criteria: 'Attendance', midSemGuideMarks: 3, midSemExaminerMarks: '-', endSemGuideMarks: 2, endSemExaminerMarks: '-' }
    ];

    // Calculate total mid-sem and end-sem marks
    const totalMidSem = data.reduce((sum, row) => {
        const midSemMarks = (row.midSemGuideMarks !== '-' ? row.midSemGuideMarks : 0) + 
                            (row.midSemExaminerMarks !== '-' ? row.midSemExaminerMarks : 0);
        return sum + midSemMarks;
    }, 0);

    const totalEndSem = data.reduce((sum, row) => {
        const endSemMarks = (row.endSemGuideMarks !== '-' ? row.endSemGuideMarks : 0) + 
                            (row.endSemExaminerMarks !== '-' ? row.endSemExaminerMarks : 0);
        return sum + endSemMarks;
    }, 0);

    // Calculate scaled marks based on the weightage
    const scaledMidSem = (totalMidSem / 100) * 40; // Assuming max total mid-sem marks = 100
    const scaledEndSem = (totalEndSem / 100) * 60; // Assuming max total end-sem marks = 100

    // Table structure with total mid-sem and end-sem marks
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#E5E7EB' }}>
            <div style={{ backgroundColor: '#F3F4F6', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '800px' }}>
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: 'white', padding: '8px', borderRadius: '4px', backgroundColor: '#6366F1' }}>
                        Student: Anshah
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>Guide Name: Dr. Amit Kumar</p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ minWidth: '100%', backgroundColor: '#E5E7EB', border: '1px solid #9CA3AF' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#6366F1', color: 'white' }}>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Exam Name</th>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Obtained / Maximum</th>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Scaled / Weightage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ backgroundColor: '#F9FAFB' }}>
                                <td style={{ padding: '8px 16px', border: '1px solid' }}>Mid-semester</td>
                                <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{totalMidSem} / 100</td>
                                <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{scaledMidSem.toFixed(2)} / 40</td>
                            </tr>
                            <tr style={{ backgroundColor: '#FFFFFF' }}>
                                <td style={{ padding: '8px 16px', border: '1px solid' }}>End-semester</td>
                                <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{totalEndSem} / 100</td>
                                <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{scaledEndSem.toFixed(2)} / 60</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ textAlign: 'right', marginTop: '24px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Total Marks: {(scaledMidSem + scaledEndSem).toFixed(2)} / 100
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Student;
