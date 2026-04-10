import { Route, Routes } from "react-router-dom"
import PortalHubPage from "./features/general/pages/PortalHubPage"
import CreateNewRequestFormPage from "./features/requests/pages/CreateNewRequestFormPage"
import MyRequestHistoryListPage from "./features/requests/pages/MyRequestHistoryListPage"
import EmployeeDashboardOverviewPage from "./features/requests/pages/EmployeeDashboardOverviewPage"
import RequestLayout from "./features/requests/pages/RequestLayout"
import AuthLayout from "./features/auth/pages/AuthLayout"
import NotFoundPage from "./features/general/pages/NotFoundPage"
import ApprovalLayout from "./features/approvals/pages/ApprovalLayout"
import PendingApprovalsListPage from "./features/approvals/pages/PendingApprovalsListPage"
import RequestDetailAndApprovalPage from "./features/approvals/pages/RequestDetailAndApprovalPage"
import TeamLeaveCalendarViewPage from "./features/approvals/pages/TeamLeaveCalendarViewPage"
import AdminLayout from "./features/admin/pages/AdminLayout"
import GeneralLayout from "./features/general/pages/GeneralLayout"
import ProfilePage from "./features/general/pages/ProfilePage"
import PreferenceLayout from "./features/preferences/pages/PreferenceLayout"
import CAppearancePage from "./features/preferences/components/CAppearancePage"
import CMyAccountPage from "./features/preferences/components/CMyAccountPage"
import CSecurityPage from "./features/preferences/components/CSecurityPage"
import CNotificationPage from "./features/preferences/components/CNotificationPage"
import CLocalizationPage from "./features/preferences/components/CLocalizationPage"
import AdminDashboardPage from "./features/admin/pages/main/AdminDashboardPage"
import AttendanceTrackingPage from "./features/admin/pages/main/AttendanceTrackingPage"
import GlobalRequestPage from "./features/admin/pages/main/GlobalRequestPage"
import PayrollAndHolidayPage from "./features/admin/pages/configuration/PayrollAndHolidayPage"
import ShiftPatternsPage from "./features/admin/pages/configuration/ShiftPatternsPage"
import ApprovalWorkflowConfigPage from "./features/admin/pages/configuration/ApprovalWorkflowConfigPage"
import ReportAndAnalyticsPage from "./features/admin/pages/system/ReportAndAnalyticsPage"
import AccessControlPage from "./features/admin/pages/system/AccessControlPage"
import DashboardHomePage from "./features/general/pages/DashboardHomePage"
import LeaveBalanceEmployeePage from "./features/admin/pages/main/LeaveBalanceEmployeePage"
import EmployeeManagementPage from "./features/admin/pages/main/EmployeeManagementPage"
import PositionManagementPage from "./features/admin/pages/main/PositionManagementPage"
import DepartmentManagementPage from "./features/admin/pages/main/DepartmentManagementPage"
import AssignManager from "./features/approvals/pages/AssignManager"
import CreateFormBuilderPage from "./features/approvals/pages/CreateFormBuilderPage"
import FormTemplateDetailPage from "./features/approvals/pages/FormTemplateDetailPage"
import FormManagerPage from "./features/approvals/pages/FormManagerPage"
import AdjustLeaveBalance from "./features/approvals/pages/AdjustLeaveBalance"
import LoginPage from "./features/auth/pages/LoginPage"
import ViewDetailRequestPage from "./features/requests/pages/ViewDetailRequestPage"
import ProfileAnotherPage from "./features/general/pages/ProfileAnotherPage"
import EditDetailRequestPage from "./features/requests/pages/EditDetailRequestPage"
import TeamRequests from "./features/approvals/pages/TeamRequests"
import TeamManagement from "./features/approvals/pages/TeamManagement"
import TeamRequestDetailPage from "./features/approvals/pages/TeamRequestDetailPage"
import ErrorRequestLogPage from "./features/admin/pages/system/ErrorRequestLogPage"
import AuditLogPage from "./features/admin/pages/system/AuditLogPage"

function App() {
    return (
        <Routes>
            <Route path="/portal" index element={<PortalHubPage />} />
            <Route element={<GeneralLayout />}>
                <Route index element={<DashboardHomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:id" element={<ProfileAnotherPage />} />
                {/* request layout: dành cho nhân viên khi truy cập vào */}
                <Route path="/employee" element={<RequestLayout />}>
                    <Route index element={<EmployeeDashboardOverviewPage />} />
                    <Route path="/employee/create-new-request-form" element={<CreateNewRequestFormPage />} />
                    <Route path="/employee/my-request-history-list" element={<MyRequestHistoryListPage />} />
                    <Route path="/employee/view-detail-request/:id" element={<ViewDetailRequestPage />} />
                    <Route path="/employee/view-detail-request/:id/edit" element={<EditDetailRequestPage />} />
                </Route>
                <Route path="/approvals" element={<ApprovalLayout />}>
                    <Route index element={<PendingApprovalsListPage />} />
                    <Route path="/approvals/request-detail-and-approval" element={<RequestDetailAndApprovalPage />} />
                    <Route path="/approvals/team-calendar" element={<TeamLeaveCalendarViewPage />} />
                    <Route path="/approvals/leave-balances" element={<LeaveBalanceEmployeePage />} />
                    <Route path="/approvals/assign-manager" element={<AssignManager />} />
                    <Route path="/approvals/form-manager" element={<FormManagerPage />} />
                    <Route path="/approvals/create-form-builder" element={<CreateFormBuilderPage />} />
                    <Route path="/approvals/form-manager/:id" element={<FormTemplateDetailPage />} />
                    <Route path="/approvals/form-manager/:id/edit" element={<CreateFormBuilderPage />} />
                    <Route path="/approvals/adjust-leave-balances" element={<AdjustLeaveBalance />} />
                    <Route path="/approvals/team-requests" element={<TeamRequests />} />
                    <Route path="/approvals/team-requests/:id" element={<TeamRequestDetailPage />} />
                    <Route path="/approvals/team-management" element={<TeamManagement />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    {/* START MAIN GROUP*/}
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="/admin/employee-management" element={<EmployeeManagementPage />} />
                    <Route path="/admin/position-management" element={<PositionManagementPage />} />
                    <Route path="/admin/department-management" element={<DepartmentManagementPage />} />
                    <Route path="/admin/attendance-tracking" element={<AttendanceTrackingPage />} />
                    {/* END MAIN GROUP */}

                    {/* START CONFIGURATION GROUP */}
                    <Route path="/admin/global-request" element={<GlobalRequestPage />} />
                    <Route path="/admin/shift-patterns" element={<ShiftPatternsPage />} />
                    <Route path="/admin/payroll-and-holiday" element={<PayrollAndHolidayPage />} />
                    <Route path="/admin/approval-workflow" element={<ApprovalWorkflowConfigPage />} />
                    {/* END CONFIGURATION GROUP */}

                    {/* START SYSTEM GROUP */}
                    <Route path="/admin/reports-analytics" element={<ReportAndAnalyticsPage />} />
                    <Route path="/admin/error-logs" element={<ErrorRequestLogPage />} />
                    <Route path="/admin/audit-logs" element={<AuditLogPage />} />
                    <Route path="/admin/access-control" element={<AccessControlPage />} />
                    {/* END SYSTEM GROUP */}
                </Route>

                <Route path="/preferences" element={<PreferenceLayout />}>
                    <Route index path="/preferences" element={<CAppearancePage />} />
                    <Route path="/preferences/appearance" element={<CAppearancePage />} />
                    <Route path="/preferences/my-account" element={<CMyAccountPage />} />
                    <Route path="/preferences/security" element={<CSecurityPage />} />
                    <Route path="/preferences/notifications" element={<CNotificationPage />} />
                    <Route path="/preferences/localization" element={<CLocalizationPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    )
}

export default App
