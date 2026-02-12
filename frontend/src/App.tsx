import { Route, Routes } from "react-router-dom"
import PortalHubPage from "./features/general/pages/PortalHubPage"
import CreateNewRequestFormPage from "./features/requests/pages/CreateNewRequestFormPage"
import MyRequestHistoryListPage from "./features/requests/pages/MyRequestHistoryListPage"
import EmployeeDashboardOverviewPage from "./features/requests/pages/EmployeeDashboardOverviewPage"
import RequestLayout from "./features/requests/pages/RequestLayout"
import AuthLayout from "./features/auth/pages/AuthLayout"
import LoginPage from "./features/auth/pages/LoginPage"
import NotFoundPage from "./features/general/pages/NotFoundPage"
import ApprovalLayout from "./features/approvals/pages/ApprovalLayout"
import PendingApprovalsListPage from "./features/approvals/pages/PendingApprovalsListPage"
import RequestDetailAndApprovalPage from "./features/approvals/pages/RequestDetailAndApprovalPage"
import TeamLeaveCalendarViewPage from "./features/approvals/pages/TeamLeaveCalendarViewPage"
import AdminLayout from "./features/admin/pages/AdminLayout"
import RequestTypeConfigPage from "./features/admin/pages/RequestTypeConfigPage"
import EmployeeBalanceManagementPage from "./features/admin/pages/EmployeeBalanceManagementPage"

function App() {
    return (
        <Routes>
            {/* request layout: dành cho nhân viên khi truy cập vào */}
            <Route path="/" index element={<PortalHubPage />} />
            <Route path="/employee" element={<RequestLayout />}>
                <Route index element={<EmployeeDashboardOverviewPage />} />
                <Route path="/employee/create-new-request-form" element={<CreateNewRequestFormPage />} />
                <Route path="/employee/my-request-history-list" element={<MyRequestHistoryListPage />} />
            </Route>
            <Route path="/approvals" element={<ApprovalLayout />}>
                <Route index element={<PendingApprovalsListPage />} />
                <Route path="/approvals/request-detail-and-approval" element={<RequestDetailAndApprovalPage />} />
                <Route path="/approvals/team-leave-calendar-view" element={<TeamLeaveCalendarViewPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<RequestTypeConfigPage />} />
                <Route path="/admin/employee-balance-management" element={<EmployeeBalanceManagementPage />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
