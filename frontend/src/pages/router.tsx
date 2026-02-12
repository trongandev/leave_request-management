import AuthLayout from "@/layout/AuthLayout"
import HomeLayout from "@/layout/HomeLayout"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./LoginPage"
import HomePage from "./HomePage"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/teacher/assignments" element={<div>TeacherAssignmentManagementPage</div>} />
                <Route path="/submit-tracking" element={<div>SubmitTrackingPage</div>} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    )
}
