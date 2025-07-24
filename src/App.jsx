import LoginPage from "./pages/LoginPage";
//import OpeningScreen from "./pages/OpeningScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
// import Dashboard from "./components/Dashboard/Dashboard";
import Courses from "./components/orgadmin-components/Courses";
import Assingments from "./components/student-components/Assingments";
import StudentHome from "./pages/student/StudentHome";
import StudentDashboard from "./pages/student/StudentDashboard";
import SuperAdminHome from "./pages/super-admin/SuperAdminHome";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import OrgAdminHome from "./pages/org-admin/OrgAdminHome";
import OrgAdminDashboard from "./pages/org-admin/OrgAdminDashboard";
import InstructorHome from "./pages/instructor/InstructorHome";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import ComingSoon from "./components/common-components/ComingSoon";
import Organizations from "./components/superadmin-components/Organizations";
//import ProtectedRoute from "./components/ProtectedRoute";
import AdminRequests from "./components/superadmin-components/AdminRequests";
import OrgAdmins from "./components/superadmin-components/AdminRequests";
import AdminManagement from "./components/superadmin-components/AdminManagement";
//import Orgs from "./components/Orgs";
// import AddOrg from "./components/AddOrg";
// import AdminReg from "./components/AdminReg";
import { ToastContainer } from "react-toastify";
import AdminBulkRegistration from "./components/superadmin-components/AdminBulkRegistration";
import Students from "./components/orgadmin-components/Students";
//import StudentData from "./components/orgadmin-components/StudentData";
import Leaderboard from "./components/student-components/Leaderboard";
import CourseData from "./components/orgadmin-components/CourseData";
// import AddContent from "./components/AddContent";
// import AddCourse from "./components/AddCourse";
import CoursePage from "./components/orgadmin-components/CoursePage";
import CourseModules from "./components/orgadmin-components/CourseModules";
// import CourseSyllabus from "./components/CourseSyllabus";
// import StudentLogin from "./components/StudentLogin";
import SuperAdminCourses from "./pages/super-admin/SuperAdminCourses";
import VideoLibrary from "./components/student-components/VideoLibrary";
import StudentData from "./components/student-components/StudentData";
import AddContent from "./components/orgadmin-components/AddContent";
import AddCourse from "./components/orgadmin-components/AddCourse";
import AddOrg from "./components/superadmin-components/AddOrg";
import AdminReg from "./components/superadmin-components/AdminReg";
import Orgs from "./components/superadmin-components/Orgs";
import CourseSyllabus from "./components/orgadmin-components/CourseSyllabus";
import StudentLogin from "./components/Login-Form/StudentLogin";
import ProtectedRoute from "./components/common-components/ProtectedRoute";
import OpeningScreen from "./pages/opening-window/OpeningScreen";
import InterviewPage from "./pages/student/InterviewPage";
import Home from "./pages/Home";
import HomeForOrg from "./pages/HomeForOrg";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeForOrg />} />
        <Route path="/open-screen" element={<OpeningScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/user" element={<StudentLogin />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/student" element={<StudentHome />}>
            <Route index element={<StudentDashboard />} />
            <Route path="assignments" element={<Assingments />} />
            <Route path="exams" element={<ComingSoon />} />
            <Route path="interviews" element={<InterviewPage />} />
            <Route path="courses" element={<ComingSoon />} />
            <Route path="profile" element={<ComingSoon />} />
            <Route path="calendar" element={<ComingSoon />} />
            <Route path="resume-builder" element={<ComingSoon />} />
            <Route path="certificates" element={<ComingSoon />} />
            <Route path="settings" element={<ComingSoon />} />
          </Route>
        </Route>


        {/* Super Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
          <Route path="/superadmin" element={<SuperAdminHome />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="org-admins" element={<AdminRequests />} />
            <Route path="courses" element={<SuperAdminCourses />} />
            <Route path="organizations" element={<Orgs />} />
            <Route path="organizations/addorg" element={<AddOrg />} />
            <Route path="organizations/addadmin/:orgId" element={<AdminReg />} />
            <Route path="organizations/addadmin-bulk/:orgId" element={<AdminBulkRegistration />} />
            <Route path="settings" element={<ComingSoon />} />
          </Route>
        </Route>

        

        {/* Org Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ORG_ADMIN"]} />}>
          <Route path="/orgadmin" element={<OrgAdminHome />}>
            <Route index element={<OrgAdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/:sId" element={<StudentData />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="transactions" element={<ComingSoon />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/addcourse" element={<AddCourse />} />
            <Route path="courses/:cId" element={<CoursePage />} />
            <Route path="update-course/:cId" element={<AddCourse />} />
            <Route path="courses/:cId/add-content" element={<AddContent />} />
            <Route path="courses/:cId/syllabus" element={<CourseSyllabus />} />
            <Route path="exams" element={<ComingSoon />} />
            <Route path="video-library" element={<VideoLibrary />} />
            <Route path="certificates" element={<ComingSoon />} />
            <Route path="support" element={<ComingSoon />} />
            <Route path="analytics" element={<ComingSoon />} />
            <Route path="settings" element={<ComingSoon />} />
          </Route>
        </Route>

        

        {/* Instructor Routes */}
        <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
          <Route path="/instructor" element={<InstructorHome />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="my-courses" element={<Courses />} />
            <Route path="students" element={<ComingSoon />} />
            <Route path="assessments" element={<ComingSoon />} />
            <Route path="live-class" element={<ComingSoon />} />
            <Route path="grades" element={<ComingSoon />} />
            <Route path="schedule" element={<ComingSoon />} />
            <Route path="settings" element={<ComingSoon />} />
          </Route>
        </Route>

      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
