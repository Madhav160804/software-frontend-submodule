import GuideAllocationPage from './components/guide-allocation-page'
import ReportSubmissionPage from './report_submission';
import GuideSubmission from './report_submission/guide/GuideSubmission'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useAdminContext } from './context/AdminContext';
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import { MajorAllocation } from './components/MajorAllocation';
import {MinorAllocation} from './components/MinorAllocation';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
 import Tw from './components/Tw'
import Guide from './components/Guide'
import Examiner from './components/Examiner'
import Student from './components/Student'
import StudentStatus from './components/StudentStatus'
import TwoFactorAuthentication from './components/2FactorAuth'
import ForgotPassword from './components/ForgotPassword'
import CourseSelectionPage from './components/CourseSelectionPage'; // Import CourseSelectionPage
import ProjectSelectionPage from './components/ProjectSelectionPage'; // Import ProjectSelectionPage
import PreferenceViewingPage from './components/PreferenceViewingPage';// Import PreferenceViewingPage
import PreferenceViewingPagemajor from './components/PreferenceViewingPagemajor';
import PreferenceViewingPageminor from './components/PreferenceViewingPageminor';

function App() {
  const {adminUser,setAdminUser} = useAdminContext();
  // setAdminUser('student');
  // setAdminUser('faculty');
  const user = {
    name: "Geetha V",
    status: "Admin",
    branch: "IT Dept",
  };
  return (
    <div>
      {adminUser ? <Navbar user={user}/> : <></>}
    <Routes>
      <Route path='/' element={adminUser ? <Home /> : <Navigate to= '/login'/>}></Route>
      <Route path='/2fa' element={adminUser ? <Navigate to='/' />:<TwoFactorAuthentication />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/login' element={adminUser ? <Navigate to='/' />:<Login />}></Route>
      <Route path='/signup' element={adminUser ? <Navigate to='/' />:<Signup />}></Route>
      <Route path='/btech-guide-allotment' element={adminUser ? <GuideAllocationPage /> : <Login />}></Route>
      <Route path='/mtech-major-guide-allotment' element={adminUser ? <MajorAllocation /> : <Login />}></Route>
      <Route path='/mtech-minor-guide-allotment' element={adminUser ? <MinorAllocation /> : <Login />}></Route>
      <Route path='/report' element={adminUser ? <ReportSubmissionPage /> : <Login />}></Route>
      <Route path='/report/guide/:studentID' element={adminUser ? <GuideSubmission /> : <Login />}></Route>
      <Route path='*' element={adminUser?<Navigate to='/'/>:<Navigate to='/login'/>}/>
      <Route path="/b/Tw" element={<Tw />} /> {/* Replace component with element */}
      <Route path="/b/guide" element={<Guide />} />
      <Route path="/b/examiner" element={<Examiner />} />
      <Route path="/b/student" element={<Student />} />
      <Route path="/b/studentstatus" element={<StudentStatus />} />
     <Route path="/course-selection" element={<CourseSelectionPage />} />
        <Route path="/project-selection" element={<ProjectSelectionPage />} />
        <Route path="/preference-viewing" element={<PreferenceViewingPage />} />
        <Route path="/preference-viewing-minor" element={<PreferenceViewingPageminor />} />
        <Route path="/preference-viewing-major" element={<PreferenceViewingPagemajor />} />
    </Routes>
      {adminUser ? <Footer user={user}/> : <></>}
    </div>
  )

}
 export default App

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import BtechGuideAllotment from './pages/BtechGuideAllotment';
// import BtechStudentAllotment from './pages/BtechStudentAllotment';
// import BtechGradesSubmissions from './pages/BtechGradesSubmissions';
// import MtechGuideAllotment from './pages/MtechGuideAllotment';
// import MtechStudentAllotment from './pages/MtechStudentAllotment';
// import MtechGradesSubmissions from './pages/MtechGradesSubmissions';
// import Feedback from './pages/Feedback';
// import LoginContainerBox from './components/LoginContainerBox';
// import SignupBox from './components/SignupContainerBox';
// import { useNavigate } from 'react-router-dom'; 



// function App() {
//     const [isLogin, setIsLogin] = useState(true);  
//     const [isAuthenticated, setIsAuthenticated] = useState(false); 
//     // const navigate = useNavigate(); 

//     const handleSwitch = () => {
//         setIsLogin(!isLogin);
//     };

//     const handleLogin = () => {
//         setIsAuthenticated(true); 
//         // navigate('/');
//     };

//     return (
//           <div>
//             {!isAuthenticated ? (
//                 <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: "100vh",
//                 }}>
//                     {isLogin ? (
//                         <LoginContainerBox onSwitch={handleSwitch} onLogin={handleLogin} />
//                     ) : (
//                         <SignupBox onSwitch={handleSwitch} />
//                     )}
//                 </div>
//             ) : ( 
//                 <div className="min-h-screen flex flex-col">
//                     <Navbar />
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/btech/guide-allotment" element={<BtechGuideAllotment />} />
//                         <Route path="/btech/student-allotment" element={<BtechStudentAllotment />} />
//                         <Route path="/btech/grades-submissions" element={<BtechGradesSubmissions />} />
//                         <Route path="/mtech/guide-allotment" element={<MtechGuideAllotment />} />
//                         <Route path="/mtech/student-allotment" element={<MtechStudentAllotment />} />
//                         <Route path="/mtech/grades-submissions" element={<MtechGradesSubmissions />} />
//                         <Route path="/feedback" element={<Feedback />} />
//                         
//                     </Routes>
//                     <Footer />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;
