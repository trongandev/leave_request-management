import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"


const resources = {
    en: {
        translation: {
            general: {
                dashboard: {
                    greeting: {
                        morning: "Good morning",
                        afternoon: "Good afternoon",
                        evening: "Good evening",
                        hello: "Hello",
                        user: "User",
                        datePattern: "Today is {{date}}.",
                        pendingApprovals: "You have <1>{{count}} pending approvals</1> waiting for processing."
                    },
                    myWork: {
                        title: "My Work",
                        createLeave: {
                            title: "Create Leave Request",
                            desc: "Register for annual leave or personal leave"
                        },
                        viewBalance: {
                            title: "View Leave Balance",
                            desc: "You have {{days}} days left"
                        },
                        updateProfile: {
                            title: "Update Profile",
                            desc: "Edit personal information and bank account"
                        }
                    },
                    teamManagement: {
                        title: "Team Management",
                        approveRequests: {
                            title: "Approve Employee Requests",
                            desc: "You have {{count}} pending requests"
                        },
                        absenceReport: {
                            title: "Team Absence Report",
                            desc: "Overview of leave schedule for the week"
                        }
                    },
                    hrManagement: {
                        title: "HR Management",
                        employeeList: {
                            title: "Employee List",
                            desc: "Manage {{count}} personnel in the system",
                            viewDetails: "View Details"
                        },
                        policyConfig: {
                            title: "Policy Configuration",
                            desc: "Set up leave & benefit rules",
                            viewDetails: "View Details"
                        }
                    },
                    system: {
                        title: "System",
                        settings: "System Settings",
                        auditLogs: "Audit Logs",
                        rbac: "RBAC Permissions"
                    },
                    stats: {
                        title: "Personnel Status This Month",
                        newEmployees: "+{{count}} New Employees",
                        openPositions: "{{count}} Open Positions",
                        totalEmployees: {
                            label: "Total Personnel",
                            value: "1,284"
                        },
                        leavesToday: {
                            label: "Leaves Today",
                            value: "18"
                        },
                        turnoverRate: {
                            label: "Turnover Rate",
                            value: "2.4%"
                        },
                        pendingRequests: {
                            label: "Pending Requests",
                            value: "42"
                        }
                    }
                },
                header: {
                    overview: "Dashboard Overview"
                },
                sidebar: {
                    portals: {
                        employee: "Employee Portal",
                        approval: "Approval Portal",
                        admin: "Admin Portal"
                    }
                },
                notFound: {
                    title: "Page Not Found",
                    desc: "This page does not exist or you do not have permission to access this resource in the system.",
                    backToHome: "Back to Home",
                    contactSupport: "Contact Support",
                    quickLinks: "Quick Links",
                    links: {
                        dashboard: "Dashboard",
                        myLeaves: "My Leaves"
                    }
                },
                portalHub: {
                    welcomeTitle: "Welcome to the Hub",
                    welcomeDesc: "Select a module to continue your session.",
                    visit: "Visit",
                    helpCenter: "Help Center",
                    privacyPolicy: "Privacy Policy",
                    portals: {
                        employee: {
                            name: "Employee Portal",
                            desc: "View your payslips, request time off, manage your personal profile, and access your benefits information."
                        },
                        manager: {
                            name: "Manager Panel",
                            desc: "Approve leave requests, review team performance, manage schedules, and oversee departmental goals."
                        },
                        admin: {
                            name: "Admin Settings",
                            desc: "Configure system settings, manage user roles, update global policies, and view system audit logs."
                        },
                        login: {
                            name: "Login Page",
                            desc: "Login page for the application."
                        },
                        notFound: {
                            name: "NotFound Page",
                            desc: "Notfound page for the application."
                        }
                    }
                },
                profile: {
                    roles: {
                        seniorDeveloper: "Senior Frontend Developer"
                    },
                    info: {
                        empId: "Employee ID",
                        department: "Department",
                        workMode: "Work Mode",
                        remote: "Remote",
                        editProfile: "Edit Profile"
                    },
                    contact: {
                        title: "Contact Details",
                        workEmail: "Work Email",
                        phone: "Phone"
                    },
                    details: {
                        joinedDate: "Joined Date",
                        tenure: "Tenure: {{years}} years, {{months}} months",
                        lineManager: "Line Manager",
                        officeLocation: "Office Location",
                        floorInfo: "Floor 4, Wing B"
                    },
                    timeOff: {
                        title: "Time Off Balance",
                        request: "Request Time Off",
                        daysLeft: "{{days}} Days Left",
                        types: {
                            vacation: "Vacation",
                            sick: "Sick Leave",
                            personal: "Personal",
                            learning: "Learning"
                        }
                    },
                    activity: {
                        title: "Recent Activity",
                        viewLog: "View Full Log",
                        columns: {
                            type: "Type",
                            date: "Date",
                            duration: "Duration",
                            status: "Status"
                        },
                        types: {
                            vacation: "Vacation Leave",
                            sick: "Sick Leave",
                            workshop: "Workshop Attendance"
                        },
                        statuses: {
                            approved: "Approved",
                            processed: "Processed"
                        },
                        days: "{{count}} Days",
                        day: "{{count}} Day"
                    }
                }
            },
            requests: {
                header: {
                    overview: "Dashboard Overview"
                },
                sidebar: {
                    menus: {
                        mainMenu: "main menu",
                        settings: "settings"
                    },
                    items: {
                        dashboard: "Dashboard",
                        createNew: "Create New Request",
                        history: "My Request History",
                        teamCalendar: "Team Calendar",
                        profile: "My Profile",
                        preferences: "Preferences",
                        backToPortal: "Back to Portal"
                    },
                    portalName: "Request Portal",
                    userRoles: {
                        softwareEngineer: "Software Engineer"
                    }
                },
                create: {
                    breadcrumbs: {
                        requests: "Requests",
                        newRequest: "New Request"
                    },
                    title: "Create New Request",
                    subtitle: "Fill out the form below to submit a leave, overtime, or business trip request.",
                    form: {
                        requestType: "Request Type",
                        types: {
                            leave: "Leave Request",
                            overtime: "Overtime",
                            businessTrip: "Business Trip",
                            remoteWork: "Remote Work"
                        },
                        leaveCategory: "Leave Category",
                        categories: {
                            annual: "Annual Leave",
                            sick: "Sick Leave",
                            unpaid: "Unpaid Leave",
                            maternity: "Maternity/Paternity"
                        },
                        startDate: "Start Date",
                        endDate: "End Date",
                        durationInfo: "Total duration: <1>{{days}}</1>. Your remaining balance after this request will be <3>{{remaining}}</3>.",
                        reasonTitle: "Reason for Request",
                        reasonPlaceholder: "Please describe the reason for your leave request...",
                        reasonHint: "Provide sufficient details for your manager to review.",
                        approver: "Approver",
                        autoAssign: "Auto-assign",
                        attachments: "Attachments (Optional)",
                        uploadFile: "Upload a file",
                        orDragDrop: "or drag and drop",
                        fileLimits: "PNG, JPG, PDF up to 10MB",
                        cancel: "Cancel",
                        submit: "Submit Request"
                    },
                    footerText: "© 2023 Acme Corp HR Systems. Need help?",
                    contactSupport: "Contact Support"
                },
                dashboard: {
                    welcomeTitle: "Welcome back, {{name}}! 👋",
                    welcomeSubtitle: "Here's what's happening with your leave requests today.",
                    newRequestBtn: "New Leave Request",
                    stats: {
                        remainingLeave: "Remaining Leave",
                        days: "Days",
                        availableNow: "Available now",
                        pendingRequests: "Pending Requests",
                        awaitingApproval: "Awaiting approval",
                        approvedYTD: "Approved YTD",
                        takenThisYear: "Taken this year"
                    },
                    recentActivity: {
                        title: "Recent Activity",
                        viewAll: "View All History",
                        columns: {
                            type: "Type",
                            datesRequested: "Dates Requested",
                            duration: "Duration",
                            submitted: "Submitted",
                            status: "Status",
                            actions: "Actions"
                        },
                        showingLatest: "Showing latest {{count}} requests"
                    },
                    footerText: "© 2023 Acme Corp HR Systems. All rights reserved.",
                    privacyPolicy: "Privacy Policy"
                },
                history: {
                    stats: {
                        pending: "Pending",
                        approvedYTD: "Approved (YTD)",
                        leaveBalance: "Leave Balance"
                    },
                    searchPlaceholder: "Search requests...",
                    filters: {
                        status: "Status",
                        all: "All",
                        approved: "Approved",
                        pending: "Pending",
                        rejected: "Rejected",
                        dateRange: "Date Range",
                        lastDay: "Last Day",
                        lastWeek: "Last Week",
                        lastMonth: "Last Month"
                    },
                    downloadBtn: "Download",
                    columns: {
                        requestId: "Request ID",
                        groupType: "Group Type",
                        type: "Type",
                        submitted: "Submitted",
                        dates: "Dates",
                        duration: "Duration",
                        status: "Status",
                        action: "Action"
                    },
                    pagination: {
                        showing: "Showing <1>{{from}}</1> to <3>{{to}}</3> of <5>{{total}}</5> results",
                        previous: "Previous",
                        next: "Next"
                    },
                    footerText: "© 2023 Enterprise HR System. All rights reserved."
                }
            },
            auth: {
                login: {
                    success: "Login successful",
                    failed: "Login failed",
                    brandName: "LRM Enterprise",
                    secureAccess: "Secure Access",
                    slogan: "Streamline your workforce management.",
                    description: "Access your LRM tools, leave management, and payroll in one secure, unified platform designed for the modern enterprise.",
                    welcomeBack: "Welcome back",
                    enterDetails: "Please enter your details to sign in.",
                    email: "Work Email",
                    emailPlaceholder: "name@example.com",
                    password: "Password",
                    passwordPlaceholder: "••••••••",
                    rememberMe: "Remember me",
                    forgotPassword: "Forgot password?",
                    signIn: "Sign in",
                    orContinueWith: "Or continue with",
                    sso: "Single Sign-On (SSO)",
                    copyright: "© 2026 BOS. All rights reserved.",
                    privacyPolicy: "Privacy Policy",
                    termsOfService: "Terms of Service",
                    helpCenter: "Help Center",
                    invalidEmail: "Invalid email address",
                    emailRequired: "Email is required",
                    passwordMin: "Password must be at least 6 characters",
                    passwordRequired: "Password is required"
                }
            },
            sidebar: {
                mainMenu: "Main Menu",
                home: "Home",
                dashboard: "Dashboard",
                teamCalendar: "Team Calendar",
                setting: "Settings",
                profile: "My Profile",
                preference: "Preferences",
                leaveBalances: "Leave Balances",
                createNewRequest: "Create New Request",
                myRequestHistory: "My Request History",
                employee: "Employee Management",
                attendanceTracking: "Attendance Tracking",
                globalRequests: "Global Requests",
                configuration: "Configuration",
                requestTypes: "Request Types",
                shiftPatterns: "Shift Patterns",
                payrollAndHoliday: "Payroll & Holiday",
                approvalWorkflow: "Approval Workflow",
                system: "System",
                reportsAndAnalytics: "Reports & Analytics",
                systemAuditLogs: "System Audit Logs",
                accessControl: "Access Control"
            },
            approvals: {
                dashboard: {
                    title: "Team Approvals",
                    desc: "Manage and respond to team requests"
                },
                metrics: {
                    totalPending: "TOTAL PENDING",
                    dueThisWeek: "DUE THIS WEEK",
                    urgentRequests: "URGENT REQUESTS"
                },
                searchPlaceholder: "Search requests...",
                filterBtn: "Filter",
                queue: {
                    title: "Request Queue",
                    columns: {
                        employee: "Employee",
                        requestType: "Request Type",
                        dateRange: "Date Range",
                        requestedOn: "Requested On",
                        status: "Status",
                        action: "Action"
                    },
                    actions: {
                        review: "Review"
                    },
                    pagination: {
                        showing: "Showing <1>{{from}}</1> to <3>{{to}}</3> of <5>{{total}}</5> results"
                    }
                },
                details: {
                    header: {
                        portal: "HR Portal",
                        requests: "Requests",
                        print: "Print",
                        share: "Share"
                    },
                    title: "Leave Request Details",
                    status: {
                        pending: "Pending Approval"
                    },
                    submittedOn: "Submitted on {{date}} at {{time}}",
                    employeeInfo: {
                        currentBalance: "Current Balance",
                        days: "days"
                    },
                    requestInfo: {
                        title: "Request Information",
                        daysTotal: "{{count}} Days Total",
                        leaveType: "Leave Type",
                        dateRange: "Date Range",
                        reason: "Reason",
                        reasonText: "I need to take time off to attend a family wedding out of state. I have already handed over my pending tasks to Marcus for these three days. I will be available via email for urgent matters."
                    },
                    attachments: {
                        title: "Attachments"
                    },
                    action: {
                        title: "Approval Action",
                        commentsLabel: "Manager's Comments",
                        optional: "(Optional)",
                        commentsPlaceholder: "Add a note explaining your decision...",
                        rejectBtn: "Reject",
                        approveBtn: "Approve",
                        viewHistory: "View full history"
                    },
                    timeline: {
                        title: "Request Timeline",
                        submitted: "Request Submitted",
                        by: "By {{name}}",
                        reviewStarted: "Review Started",
                        autoAssign: "System Auto-Assign"
                    },
                    policy: {
                        title: "Company Policy",
                        desc: "Personal leave requests exceeding 3 days require at least 1 week notice. This request meets the notice period criteria."
                    }
                },
                calendar: {
                    filters: {
                        title: "Filters",
                        placeholder: "Find employee...",
                        legendTitle: "Legend",
                        approvedLeave: "Approved Leave",
                        overtime: "Overtime (OT)",
                        publicHoliday: "Public Holiday"
                    },
                    teamMembers: {
                        title: "Team Members",
                        selectAll: "Select All"
                    },
                    header: {
                        today: "Today",
                        month: "Month",
                        week: "Week",
                        day: "Day",
                        requestTimeOff: "Request Time Off"
                    },
                    days: {
                        sun: "Sun",
                        mon: "Mon",
                        tue: "Tue",
                        wed: "Wed",
                        thu: "Thu",
                        fri: "Fri",
                        sat: "Sat"
                    },
                    publicHolidayLabel: "Public Holiday",
                    companyDay: "Company Day",
                    more: "+{{count}} more"
                }
            },
            admin: {
                dashboard: {
                    title: "Admin Dashboard Overview",
                    subtitle: "Summary of enterprise leave management and manpower metrics.",
                    generateReport: "Generate Report",
                    leaveCalendar: "Leave Calendar",
                    currentlyOnLeave: {
                        title: "Currently on Leave",
                        subtitle: "{{count}} Returning Tomorrow"
                    },
                    pendingApprovals: {
                        title: "Pending Approvals",
                        subtitle: "Avg response time: 2h"
                    },
                    totalEmployees: {
                        title: "Total Employees",
                        subtitle: "+{{count}} New this month"
                    },
                    trends: {
                        title: "Manpower Trends (Last 6 Months)",
                        activeStaff: "Active Staff",
                        leaveBalance: "Leave Balance"
                    },
                    recentRequests: {
                        title: "Recent Requests",
                        viewAll: "View All",
                        columns: {
                            employee: "Employee",
                            type: "Type",
                            dates: "Dates",
                            status: "Status"
                        }
                    },
                    attendance: {
                        title: "Today's Attendance",
                        present: "Present",
                        onLeave: "On Leave",
                        lateIn: "Late In",
                        unaccounted: "Unaccounted",
                        checkLogs: "Check Detailed Logs"
                    }
                },
                attendance: {
                    title: "Attendance Tracking Log",
                    subtitle: "Review daily employee clock-in records and identify discrepancies.",
                    exportReport: "Export Report",
                    manualEntry: "Manual Entry",
                    filters: {
                        searchEmp: "Search Employee",
                        searchPlaceholder: "Name or ID...",
                        department: "Department",
                        allDepts: "All Departments",
                        engineering: "Engineering",
                        marketing: "Marketing",
                        sales: "Sales",
                        hr: "Human Resources",
                        dateRange: "Date Range",
                        to: "to",
                        apply: "Apply Filters"
                    },
                    table: {
                        date: "Date",
                        employee: "Employee Name",
                        clockIn: "Clock In",
                        clockOut: "Clock Out",
                        totalHours: "Total Hours",
                        discrepancy: "Discrepancy",
                        actions: "Actions"
                    },
                    status: {
                        onTime: "On Time",
                        lateArrival: "Late Arrival",
                        earlyLeave: "Early Leave",
                        regular: "Regular"
                    },
                    pagination: {
                        showing: "Showing",
                        to: "to",
                        of: "of",
                        results: "results",
                        previous: "Previous",
                        next: "Next"
                    },
                    summary: {
                        totalPresent: "Total Present",
                        totalPresentSub: "92% of total staff",
                        lateArrivals: "Late Arrivals",
                        lateArrivalsSub: "+3 since yesterday",
                        earlyDepartures: "Early Departures",
                        earlyDeparturesSub: "Normal daily average",
                        absent: "Absent",
                        absentSub: "On approved leave: 14"
                    }
                },
                employees: {
                    title: "Leave Balances",
                    subtitle: "Manage and audit employee leave entitlements and usage.",
                    exportReport: "Export Report",
                    newAdjustment: "New Adjustment",
                    searchPlaceholder: "Search by name, ID or email...",
                    filters: {
                        searchPlaceholder: "Search by name, ID or email...",
                        department: "Department",
                        allDepartments: "All Departments",
                        location: "Location",
                        allLocations: "All Locations",
                        newYork: "New York",
                        london: "London",
                        remote: "Remote",
                        leaveType: "Leave Type",
                        allAnnuals: "All Leave Types",
                        annual: "Annual Leave",
                        sick: "Sick Leave",
                        sickLeave: "Sick Leave",
                        parental: "Parental Leave",
                        unpaid: "Unpaid Leave",
                        personalLeave: "Personal Leave",
                        compensatoryLeave: "Compensatory Leave",
                        vacationLeave: "Vacation Leave"
                    },
                    table: {
                        employee: "Employee",
                        department: "Department",
                        leaveType: "Leave Type",
                        usedTotal: "Used / Total",
                        balance: "Balance",
                        actions: "Actions",
                        days: "days",
                        adjust: "Adjust"
                    },
                    pagination: {
                        showing: "Showing",
                        to: "to",
                        of: "of",
                        employees: "employees",
                        previous: "Previous",
                        next: "Next"
                    },
                    adjustModal: {
                        title: "Adjust Balance",
                        subtitle: "Edit leave details for selected employee.",
                        currentBalance: "Current Balance",
                        annualLimit: "Annual Limit",
                        days: "days",
                        system: "System",
                        adjType: "Adjustment Type",
                        addDays: "Add Days (+)",
                        deductDays: "Deduct Days (-)",
                        numDays: "Number of Days",
                        reason: "Reason for Adjustment",
                        reasonPlaceholder: "e.g., Correction of data entry error...",
                        preview: "New Balance Preview",
                        recentChanges: "Recent Changes",
                        cancel: "Cancel",
                        save: "Save Changes"
                    }
                },
                globalRequests: {
                    title: "Global Requests Management",
                    subtitle: "Review and manage all employee leave and administrative requests.",
                    export: "Export",
                    newRequest: "New Request",
                    searchPlaceholder: "Search employee...",
                    filters: {
                        searchPlaceholder: "Search employee...",
                        allDepartments: "All Departments",
                        allRequestTypes: "All Request Types",
                        allDepts: "All Departments",
                        allTypes: "All Request Types",
                        allStatus: "All Status",
                        engineering: "Engineering",
                        design: "Design",
                        sales: "Sales",
                        hr: "Human Resources",
                        annual: "Annual Leave",
                        sick: "Sick Leave",
                        emergency: "Emergency Leave",
                        remote: "Remote Work",
                        pending: "Pending",
                        approved: "Approved",
                        rejected: "Rejected"
                    },
                    table: {
                        employee: "Employee",
                        type: "Type",
                        duration: "Duration",
                        appliedDate: "Applied Date",
                        status: "Status",
                        actions: "Actions",
                        viewDetail: "View Detail",
                        days: "{{count}} Days",
                        day: "{{count}} Day"
                    },
                    pagination: {
                        showing: "Showing",
                        of: "of",
                        requests: "requests",
                        previous: "Previous",
                        next: "Next"
                    }
                },
                common: {
                    departments: {
                        engineering: "Engineering",
                        production: "Production",
                        rnd: "Research & Development",
                        hr: "Human Resources",
                        logistics: "Logistics",
                        qa: "Quality Assurance",
                        system: "System",
                        marketing: "Marketing",
                        sales: "Sales"
                    }
                },
                auditLogsPage: {
                    eyebrow: "System Monitoring",
                    title: "System Audit Logs History",
                    subtitle: "Detailed chronological record of all administrative and system actions for compliance review, transparency, and operational follow-up.",
                    export: "Export CSV",
                    refresh: "Refresh Logs",
                    searchPlaceholder: "Search by user, action, entity or IP address...",
                    dateRange: "Oct 24, 2023 - Oct 31, 2023",
                    filters: {
                        all: "All Action Types",
                        workflow: "Workflow Changes",
                        balance: "Balance Updates",
                        access: "User Access",
                        config: "System Config"
                    },
                    table: {
                        timestamp: "Timestamp",
                        user: "User",
                        action: "Action",
                        target: "Target Entity",
                        ip: "IP Address"
                    },
                    pagination: {
                        showing: "Showing",
                        to: "to",
                        of: "of",
                        entries: "entries"
                    },
                    stats: {
                        totalEvents: "Total Events (30d)",
                        criticalChanges: "Critical Changes",
                        compliance: "System Compliance"
                    }
                },
                reportsAnalyticsPage: {
                    breadcrumbSystem: "System",
                    breadcrumbCurrent: "Reports & Analytics",
                    title: "Reports & Analytics Overview",
                    subtitle: "Centralize report generation, monitor audit visibility, and keep operational insights aligned in one compact workspace.",
                    export: "Export Report",
                    generate: "Generate Report",
                    libraryTitle: "Report Library",
                    libraryDesc: "Balanced view of scheduled outputs, ownership, and delivery status.",
                    searchPlaceholder: "Search reports...",
                    teams: {
                        all: "All Teams",
                        hr: "HR Operations",
                        admin: "System Admin",
                        finance: "Finance",
                        operations: "Operations"
                    },
                    table: {
                        report: "Report",
                        owner: "Owner",
                        frequency: "Frequency",
                        updated: "Updated",
                        status: "Status"
                    },
                    summary: {
                        title: "Quick Summary",
                        desc: "Audit visibility and reporting cadence are now grouped into a tighter side panel for better balance with the main content area.",
                        compact: "Compact layout",
                        hierarchy: "Clearer hierarchy",
                        scanability: "Better scanability"
                    },
                    metrics: {
                        monthlyCompliance: "Monthly Compliance",
                        exceptions: "Open Exceptions",
                        exportedReports: "Exported Reports",
                        monthlyComplianceChange: "+2.1% vs last month",
                        exceptionsChange: "3 items need review today",
                        exportedReportsChange: "Last export 2 hours ago"
                    },
                    rows: {
                        leaveBalanceSummary: {
                            title: "Leave Balance Summary",
                            description: "Department-level leave usage, carry-over, and pending approvals.",
                            owner: "HR Operations",
                            frequency: "Weekly",
                            status: "Ready"
                        },
                        auditTrailSnapshot: {
                            title: "Audit Trail Snapshot",
                            description: "Security and configuration actions grouped by risk level and actor.",
                            owner: "System Admin",
                            frequency: "Daily",
                            status: "In Review"
                        },
                        attendanceVariance: {
                            title: "Attendance Variance",
                            description: "Late arrival, missing check-in, and shift anomaly breakdown.",
                            owner: "Operations",
                            frequency: "Weekly",
                            status: "Ready"
                        },
                        payrollReconciliation: {
                            title: "Payroll Reconciliation",
                            description: "Cross-check approved leave records against payroll deduction data.",
                            owner: "Finance",
                            frequency: "Monthly",
                            status: "Draft"
                        }
                    }
                },
                configuration: {
                    approvalWorkflow: {
                        title: "Approval Workflow Configuration",
                        subtitle: "Define and manage multi-level approval sequences for department requests.",
                        exportConfig: "Export Config",
                        createNew: "Create New Workflow",
                        filters: {
                            department: "Filter by Department",
                            requestType: "Request Type",
                            allDepts: "All Departments",
                            engineering: "Engineering",
                            hr: "Human Resources",
                            sales: "Sales & Marketing",
                            finance: "Finance",
                            allTypes: "All Types",
                            annualLeave: "Annual Leave",
                            sickLeave: "Sick Leave",
                            remoteWork: "Remote Work",
                            overtime: "Overtime"
                        },
                        infoMsg: "Changes apply to new requests only",
                        engineeringDept: {
                            title: "Engineering Department",
                            subtitle: "Standard Leave Approval Workflow",
                            step1: {
                                title: "Initial Review",
                                role: "Dept Manager",
                                desc: "Direct Supervisor"
                            },
                            step2: {
                                title: "Resource Check",
                                role: "HR Specialist",
                                desc: "Leave Coordinator"
                            },
                            step3: "Final Step"
                        },
                        financeDept: {
                            title: "Finance & Operations",
                            subtitle: "Executive Leave & Expense Workflow",
                            step1: {
                                title: "Dept Head Approval",
                                role: "Finance Director",
                                desc: "Primary Approver"
                            },
                            step2: {
                                title: "Executive Sanction",
                                role: "CFO",
                                desc: "Financial Oversight"
                            },
                            step3: {
                                title: "HR Compliance",
                                role: "HR Director",
                                desc: "Legal Verification"
                            }
                        },
                        addStep: "Add Approval Step",
                        configureAnother: "Configure Workflow for another Department"
                    },
                    payrollHoliday: {
                        title: "Payroll and Holiday Config",
                        subtitle: "Configure global payroll rules and manage official holiday schedules.",
                        discard: "Discard Changes",
                        save: "Save Configuration",
                        payroll: {
                            title: "Payroll Settings",
                            subtitle: "Salary Components & Rules",
                            baseRules: "Base Salary Rules",
                            payFreq: "Pay Frequency",
                            freqOptions: {
                                monthly: "Monthly",
                                biWeekly: "Bi-weekly",
                                weekly: "Weekly"
                            },
                            procDate: "Processing Date",
                            dateOptions: {
                                day25: "25th of Month",
                                lastDay: "Last Working Day",
                                firstDay: "1st of Next Month"
                            },
                            allowance: {
                                title: "Allowance Setup",
                                addNew: "+ Add New",
                                housing: "Housing Allowance",
                                housingDesc: "Fixed: $500.00 / month",
                                transport: "Transport Subsidy",
                                transportDesc: "Variable: Based on attendance"
                            },
                            deduction: {
                                title: "Standard Deductions",
                                addNew: "+ Add New",
                                health: "Health Insurance",
                                healthDesc: "Employee Share: 2.5%",
                                pension: "Pension Fund",
                                pensionDesc: "Mandatory: 8.0%"
                            }
                        },
                        holiday: {
                            title: "Holiday Calendar",
                            subtitle: "Scheduled Public Holidays 2024",
                            addHoliday: "Add Public Holiday",
                            datePicker: "Date Picker",
                            holidayName: "Holiday Name",
                            holidayPlaceholder: "e.g. Lunar New Year",
                            addToCalendar: "Add to Calendar",
                            importCSV: "Import Bulk Holiday CSV",
                            list: {
                                newYear: "New Year's Day",
                                newYearDesc: "Fixed Annual Holiday",
                                lunar: "Lunar New Year",
                                lunarDesc: "Public Holiday (Varies by Moon)",
                                labor: "Labor Day",
                                laborDesc: "International Celebration",
                                national: "National Day",
                                nationalDesc: "Statutory Holiday",
                                christmas: "Christmas Day",
                                christmasDesc: "Global Observed Holiday"
                            },
                            months: {
                                jan: "Jan",
                                feb: "Feb",
                                may: "May",
                                oct: "Oct",
                                dec: "Dec"
                            }
                        }
                    },
                    requestType: {
                        title: "Request Type Configuration",
                        subtitle: "Manage leave types, overtime rules, and approval workflows.",
                        export: "Export Rules",
                        newType: "New Request Type",
                        searchPlaceholder: "Search request types...",
                        filters: {
                            allStatus: "All Statuses",
                            active: "Active",
                            inactive: "Inactive"
                        },
                        table: {
                            requestType: "Request Type",
                            code: "Code",
                            approvalLevels: "Approval Levels",
                            requireAttachment: "Require Attachment",
                            status: "Status",
                            actions: "Actions"
                        },
                        types: {
                            annual: "Annual Leave",
                            annualDesc: "Paid Time Off",
                            sick: "Sick Leave",
                            sickDesc: "Medical Certificate",
                            overtime: "Overtime Request",
                            overtimeDesc: "Hourly Compensation",
                            expense: "Expense Claim",
                            expenseDesc: "Travel & Meals",
                            remote: "Remote Work",
                            remoteDesc: "WFH Request"
                        },
                        pagination: {
                            showing: "Showing",
                            to: "to",
                            of: "of",
                            results: "results",
                            previous: "Previous",
                            next: "Next"
                        },
                        saveAll: "Save All Changes"
                    },
                    shiftPattern: {
                        title: "Shift Pattern Management",
                        subtitle: "Configure working hours and repetitive shift cycles for your workforce.",
                        create: "Create New Shift",
                        cards: {
                            timeRange: "Time Range",
                            breakDuration: "Break Duration",
                            activeDays: "Active Days",
                            assignedEmployees: "Assigned Employees",
                            minutes: "Minutes"
                        },
                        shifts: {
                            office: {
                                title: "Office Hours",
                                desc: "Standard corporate headquarters working schedule."
                            },
                            morning: {
                                title: "Morning Shift",
                                desc: "Operations and logistics early team rotation."
                            },
                            night: {
                                title: "Night Shift",
                                desc: "Security and 24/7 monitoring facility shift."
                            }
                        },
                        days: {
                            mon: "M",
                            tue: "T",
                            wed: "W",
                            thu: "T",
                            fri: "F",
                            sat: "S",
                            sun: "S"
                        }
                    }
                },
                system: {
                    accessControl: {
                        title: "Access Control and Permissions",
                        subtitle: "Manage Role-Based Access Control (RBAC) and module-level security permissions.",
                        securityAudit: "Security Audit",
                        createRole: "Create New Role",
                        searchPlaceholder: "Search roles...",
                        roles: {
                            admin: { title: "Administrator", desc: "Full System Access" },
                            hr: { title: "HR Manager", desc: "Personnel & Operations" },
                            deptManager: { title: "Department Manager", desc: "Team Management" },
                            staff: { title: "General Staff", desc: "Self-Service Access" }
                        },
                        insight: {
                            title: "RBAC Insight",
                            desc: "Changes to role permissions take effect for users at their next login session."
                        },
                        roleDetails: {
                            title: "Role: Administrator",
                            desc: "Configure access level for each system module",
                            discard: "Discard Changes",
                            save: "Save Permissions"
                        },
                        table: {
                            module: "Module / Permission",
                            view: "View",
                            create: "Create",
                            edit: "Edit",
                            delete: "Delete",
                            export: "Export",
                            modules: {
                                dashboard: "Main Dashboard",
                                employee: "Employee Records",
                                leave: "Leave Requests",
                                payroll: "Payroll Processing",
                                config: "System Configuration"
                            }
                        },
                        advanced: {
                            title: "Advanced Permissions",
                            bulkImport: { title: "Bulk Data Import", desc: "Allow importing multiple employee records via CSV/XLSX." },
                            apiAccess: { title: "System API Access", desc: "Generate and manage API keys for external integrations." },
                            auditLogs: { title: "View Audit Logs", desc: "Access detailed history of all system activities and changes." },
                            workflows: { title: "Manage Approval Workflows", desc: "Define multi-level approval sequences for departments." }
                        }
                    }
                },
                changes: {
                    discard: "Discard",
                    save: "Save"
                }
            },
            preferences: {
                navbar: {
                    title: "Preferences",
                    desc: "Personalize your experience",
                },
                appearance: {
                    title: "Theme Engine",
                    desc: "Select how you want the system to look and feel.",
                    interface: {
                        title: "Interface",
                        desc: "Control the layout and density of the user interface.",
                        compact: {
                            title: "Compact Mode",
                            desc: "Display more information with less spacing.",
                        },
                        font: "Font System",
                        fontOptions: {
                            inter: "Inter",
                            roboto: "Roboto",
                            openSans: "Open Sans"
                        },
                        theme: {
                            label: {
                                light: "Light Mode",
                                dark: "Dark Mode",
                                system: "System Default"
                            },
                            accentColor: "Accent Color",
                            colors: {
                                blue: "Ocean Blue",
                                green: "Emerald Green",
                                purple: "Royal Purple"
                            }
                        },
                        sidebar: "Sidebar Position",
                        sidebarData: {
                            left: "Left",
                            right: "Right"
                        }
                    },
                },
                localization: {
                    title: "Localization",
                    desc: "Set your regional preferences for language and formatting.",
                    regional: {
                        title: "Regional Settings",
                        desc: "Set your regional preferences for language and formatting."
                    },
                    language: {
                        title: "Language",
                        desc: "Select the language you want to use for the interface.",
                        options: {
                            en: "English (US)",
                            vi: "Tiếng Việt (Vietnamese)"
                        }
                    },
                    timezone: {
                        title: "Time Zone",
                        defaultText: "Your current time is 09:41 AM",
                        options: {
                            sea: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
                            utc: "(GMT+00:00) UTC",
                            eastern: "(GMT-05:00) Eastern Time (US & Canada)",
                            singapore: "(GMT+08:00) Singapore, Kuala Lumpur"
                        }
                    },
                    format: {
                        title: "Formatting",
                        desc: "Set how dates, numbers, and currencies are displayed.",
                        date: "Date Format",
                        time: "Time Format",
                        dateOptions: {
                            dayMonthYear: "DD/MM/YYYY (31/12/2023)",
                            monthDayYear: "MM/DD/YYYY (12/31/2023)",
                            yearMonthDay: "YYYY-MM-DD (2023-12-31)"
                        },
                        timeOptions: {
                            twelveHour: "12-hour (09:30 PM)",
                            twentyFourHour: "24-hour (21:30)"
                        },
                        currency: {
                            title: "Primary Currency",
                            desc: "This currency will be used for all financial reports, salary displays, and expense reimbursements.",
                            options: {
                                usd: "USD ($)",
                                vnd: "VND (₫)",
                                eur: "EUR (€)"
                            }
                        },
                        preview: {
                            title: "Preview",
                            active: "Active Settings",
                            date: "Date",
                            time: "Time",
                            currency: "Currency",
                            number: "Numbers"
                        },
                        previewValues: {
                            date: "31/12/2023",
                            time: "09:41 AM",
                            currency: "$1,250.00",
                            number: "1,000,000.00"
                        }
                    },
                    en: "English",
                    vi: "Vietnamese",
                    date: "Date Format",
                },
                notification: {
                    title: "Notifications",
                    desc: "Manage how and when you receive system alerts.",
                    mail: {
                        title: "Email Notifications",
                        desc: "Receive summaries of pending tasks and approvals."
                    },
                    sound: {
                        title: "System Sounds",
                        desc: "Play a sound for new messages and status updates."
                    },
                    page: {
                        title: "Notification Preferences",
                        desc: "Control precisely what updates you receive and how."
                    },
                    actions: {
                        reset: "Reset to Default"
                    },
                    channels: {
                        email: "Email Notifications",
                        push: "In-app Push Notifications",
                        sms: "SMS Alerts"
                    },
                    sections: {
                        leaveRequests: {
                            title: "Leave Requests",
                            desc: "Updates on time-off requests, approvals, and balance changes."
                        },
                        announcements: {
                            title: "Announcements",
                            desc: "Company-wide news, policy updates, and HR announcements."
                        },
                        weeklySummary: {
                            title: "Weekly Summary",
                            desc: "A digest of your team's activity and upcoming deadlines sent every Monday.",
                            toggle: "Enable Weekly Digest"
                        }
                    },
                    general: {
                        title: "General Settings",
                        desc: "Global overrides for your notification experience.",
                        doNotDisturb: {
                            title: "Do Not Disturb",
                            desc: "Pause all notifications during non-working hours (6 PM - 8 AM)."
                        },
                        soundEffects: {
                            title: "Sound Effects",
                            desc: "Play a sound when a new in-app notification arrives."
                        }
                    }
                },
                security: {
                    password: {
                        title: "Change Password",
                        desc: "Update your password associated with your account.",
                        current: "Current Password",
                        new: "New Password",
                        confirm: "Confirm Password",
                        placeholder: "••••••••",
                        requirements: {
                            title: "Password requirements:",
                            minLength: "Minimum 8 characters long - the more, the better",
                            lowercase: "At least one lowercase character",
                            symbol: "At least one number, symbol, or whitespace character"
                        }
                    },
                    twoFactor: {
                        title: "Two-Factor Authentication",
                        enabled: "Enabled",
                        desc: "Add an extra layer of security to your account. We'll send a code to your mobile device when you log in.",
                        authenticator: {
                            title: "Authenticator App",
                            desc: "Google Authenticator, Microsoft Authenticator, etc."
                        },
                        configure: "Configure"
                    },
                    loginActivity: {
                        title: "Login Activity",
                        desc: "Recent devices that have logged into your account.",
                        signOutAll: "Sign out all devices",
                        current: "Current",
                        activeNow: "Active now",
                        devices: {
                            macbook: "San Francisco, CA, USA • Chrome 114.0",
                            iphone: "San Francisco, CA, USA • HR Connect App",
                            windows: "Austin, TX, USA • Edge Browser"
                        },
                        times: {
                            twoHoursAgo: "2 hours ago",
                            threeDaysAgo: "3 days ago"
                        }
                    },
                    actions: {
                        discard: "Discard",
                        update: "Update Security Settings"
                    }
                },
                accounts: {
                    title: "Basic Information",
                    desc: "Manage your personal details and public profile.",
                    avatarAlt: "Profile",
                    upload: {
                        title: "Allowed *.jpeg, *.jpg, *.png, *.gif",
                        subtitle: "max size of 3.1 MB"
                    },
                    personalization: {
                        firstname: "First Name",
                        lastname: "Last Name",
                        email: "Email Address",
                        bio: {
                            title: "Bio",
                            optional: "(Optional)",
                            placeholder: "Write a short bio about yourself..."
                        },
                        sample: {
                            firstName: "Sarah",
                            lastName: "Connor",
                            email: "sarah.connor@enterprise-hr.com"
                        },
                        profile: {
                            title: "Work Profile",
                            desc: "Company assigned role and department information.",
                            readonly: "Read Only",
                            jobTitle: "Job Title",
                            jobText: "Senior HR Manager",
                            department: "Department",
                            departmentText: "Human Resources",
                            employee: "Employee ID",
                            employeeText: "HR-2024-8921",
                            location: "Location",
                            locationText: "San Francisco HQ",
                            change: {
                                cancel: "Cancel",
                                save: "Save Changes"
                            }
                        }
                    }
                },
                changes: {
                    discard: "Discard Changes",
                    save: "Save Preferences"
                }
            },
        },
    },
    vi: {
        translation: {
            general: {
                dashboard: {
                    greeting: {
                        morning: "buổi sáng",
                        afternoon: "buổi chiều",
                        evening: "buổi tối",
                        hello: "Chào",
                        user: "Người dùng",
                        datePattern: "Hôm nay là {{date}}.",
                        pendingApprovals: "Bạn có <1>{{count}} phê duyệt</1> đang chờ xử lý."
                    },
                    myWork: {
                        title: "Công việc của tôi",
                        createLeave: {
                            title: "Tạo đơn nghỉ phép",
                            desc: "Đăng ký nghỉ phép năm hoặc việc riêng"
                        },
                        viewBalance: {
                            title: "Xem số dư phép",
                            desc: "Bạn còn {{days}} ngày phép"
                        },
                        updateProfile: {
                            title: "Cập nhật hồ sơ",
                            desc: "Chỉnh sửa thông tin cá nhân và tài khoản ngân hàng"
                        }
                    },
                    teamManagement: {
                        title: "Quản lý đội ngũ",
                        approveRequests: {
                            title: "Duyệt đơn nhân viên",
                            desc: "Bạn có {{count}} yêu cầu đang chờ"
                        },
                        absenceReport: {
                            title: "Báo cáo vắng mặt team",
                            desc: "Tổng quan lịch nghỉ phép trong tuần"
                        }
                    },
                    hrManagement: {
                        title: "Quản trị nhân sự",
                        employeeList: {
                            title: "Danh sách nhân viên",
                            desc: "Quản lý {{count}} nhân sự trong hệ thống",
                            viewDetails: "Xem chi tiết"
                        },
                        policyConfig: {
                            title: "Cấu hình chính sách",
                            desc: "Thiết lập quy định nghỉ phép & phúc lợi",
                            viewDetails: "Xem chi tiết"
                        }
                    },
                    system: {
                        title: "Hệ thống",
                        settings: "Cài đặt hệ thống",
                        auditLogs: "Audit Logs",
                        rbac: "Phân quyền RBAC"
                    },
                    stats: {
                        title: "Tình hình nhân sự tháng này",
                        newEmployees: "+{{count}} Nhân viên mới",
                        openPositions: "{{count}} Vị trí đang tuyển",
                        totalEmployees: {
                            label: "Tổng nhân sự",
                            value: "1,284"
                        },
                        leavesToday: {
                            label: "Nghỉ phép hôm nay",
                            value: "18"
                        },
                        turnoverRate: {
                            label: "Tỉ lệ biến động",
                            value: "2.4%"
                        },
                        pendingRequests: {
                            label: "Yêu cầu chờ duyệt",
                            value: "42"
                        }
                    }
                },
                header: {
                    overview: "Tổng quan Bảng điều khiển"
                },
                sidebar: {
                    portals: {
                        employee: "Cổng Nhân viên",
                        approval: "Cổng Phê duyệt",
                        admin: "Cổng Quản trị"
                    }
                },
                notFound: {
                    title: "Không tìm thấy trang",
                    desc: "Trang này không tồn tại hoặc bạn không có quyền truy cập vào tài nguyên này trong hệ thống.",
                    backToHome: "Quay lại trang chủ",
                    contactSupport: "Liên hệ hỗ trợ",
                    quickLinks: "Lối tắt nhanh",
                    links: {
                        dashboard: "Bảng điều khiển",
                        myLeaves: "Nghỉ phép của tôi"
                    }
                },
                portalHub: {
                    welcomeTitle: "Chào mừng đến với Trung tâm",
                    welcomeDesc: "Chọn một tính năng để tiếp tục phiên làm việc.",
                    visit: "Truy cập",
                    helpCenter: "Trung tâm trợ giúp",
                    privacyPolicy: "Chính sách bảo mật",
                    portals: {
                        employee: {
                            name: "Cổng Nhân viên",
                            desc: "Xem phiếu lương, yêu cầu nghỉ phép, quản lý hồ sơ cá nhân và xem thông tin phúc lợi."
                        },
                        manager: {
                            name: "Bảng Quản lý",
                            desc: "Phê duyệt yêu cầu nghỉ phép, đánh giá hiệu suất, quản lý lịch trình và mục tiêu phòng ban."
                        },
                        admin: {
                            name: "Cài đặt Hệ thống",
                            desc: "Cấu hình hệ thống, quản lý vai trò, cập nhật chính sách và xem nhật ký kiểm tra."
                        },
                        login: {
                            name: "Trang Đăng nhập",
                            desc: "Trang đăng nhập của ứng dụng."
                        },
                        notFound: {
                            name: "Trang Không tìm thấy",
                            desc: "Trang thông báo lỗi 404."
                        }
                    }
                },
                profile: {
                    roles: {
                        seniorDeveloper: "Lập trình viên Senior Frontend"
                    },
                    info: {
                        empId: "Mã NV",
                        department: "Phòng ban",
                        workMode: "Hình thức làm",
                        remote: "Từ xa",
                        editProfile: "Chỉnh sửa hồ sơ"
                    },
                    contact: {
                        title: "Chi tiết liên hệ",
                        workEmail: "Email công việc",
                        phone: "Điện thoại"
                    },
                    details: {
                        joinedDate: "Ngày gia nhập",
                        tenure: "Thâm niên: {{years}} năm, {{months}} tháng",
                        lineManager: "Quản lý trực tiếp",
                        officeLocation: "Địa điểm làm việc",
                        floorInfo: "Tầng 4, Khu B"
                    },
                    timeOff: {
                        title: "Số dư nghỉ phép",
                        request: "Đăng ký nghỉ phép",
                        daysLeft: "Còn {{days}} ngày",
                        types: {
                            vacation: "Nghỉ phép năm",
                            sick: "Nghỉ ốm",
                            personal: "Việc riêng",
                            learning: "Học tập"
                        }
                    },
                    activity: {
                        title: "Hoạt động gần đây",
                        viewLog: "Xem toàn bộ nhật ký",
                        columns: {
                            type: "Loại",
                            date: "Ngày",
                            duration: "Thời lượng",
                            status: "Trạng thái"
                        },
                        types: {
                            vacation: "Nghỉ phép năm",
                            sick: "Nghỉ ốm",
                            workshop: "Tham gia hội thảo"
                        },
                        statuses: {
                            approved: "Đã duyệt",
                            processed: "Đã xử lý"
                        },
                        days: "{{count}} Ngày",
                        day: "{{count}} Ngày"
                    }
                }
            },
            requests: {
                header: {
                    overview: "Tổng quan Bảng điều khiển"
                },
                sidebar: {
                    menus: {
                        mainMenu: "menu chính",
                        settings: "cài đặt"
                    },
                    items: {
                        dashboard: "Bảng điều khiển",
                        createNew: "Tạo Yêu Cầu Mới",
                        history: "Lịch Sử Yêu Cầu",
                        teamCalendar: "Lịch Nhóm",
                        profile: "Hồ Sơ Của Tôi",
                        preferences: "Tùy Chọn",
                        backToPortal: "Về Trang Chủ"
                    },
                    portalName: "Cổng Yêu Cầu",
                    userRoles: {
                        softwareEngineer: "Kỹ sư phần mềm"
                    }
                },
                create: {
                    breadcrumbs: {
                        requests: "Yêu Cầu",
                        newRequest: "Yêu Cầu Mới"
                    },
                    title: "Tạo Yêu Cầu Mới",
                    subtitle: "Điền vào biểu mẫu dưới đây để nộp yêu cầu nghỉ phép, làm thêm giờ hoặc công tác.",
                    form: {
                        requestType: "Loại Yêu Cầu",
                        types: {
                            leave: "Xin Nghỉ Phép",
                            overtime: "Làm Thêm Giờ",
                            businessTrip: "Đi Công Tác",
                            remoteWork: "Làm Việc Từ Xa"
                        },
                        leaveCategory: "Hạng Mục Nghỉ",
                        categories: {
                            annual: "Nghỉ Phép Năm",
                            sick: "Nghỉ Ốm",
                            unpaid: "Nghỉ Không Lương",
                            maternity: "Nghỉ Thai Sản"
                        },
                        startDate: "Ngày Bắt Đầu",
                        endDate: "Ngày Kết Thúc",
                        durationInfo: "Tổng thời gian: <1>{{days}}</1>. Số dư còn lại sau yêu cầu này sẽ là <3>{{remaining}}</3>.",
                        reasonTitle: "Lý Do Yêu Cầu",
                        reasonPlaceholder: "Vui lòng mô tả lý do cho yêu cầu nghỉ phép của bạn...",
                        reasonHint: "Cung cấp đủ thông tin để quản lý của bạn xem xét.",
                        approver: "Người Duyệt",
                        autoAssign: "Tự động gán",
                        attachments: "Tệp Đính Kèm (Không bắt buộc)",
                        uploadFile: "Tải lên tệp",
                        orDragDrop: "hoặc kéo và thả vào",
                        fileLimits: "PNG, JPG, PDF tối đa 10MB",
                        cancel: "Hủy",
                        submit: "Gửi Yêu Cầu"
                    },
                    footerText: "© 2023 Hệ thống Nhân sự Acme. Cần trợ giúp?",
                    contactSupport: "Liên hệ Hỗ trợ"
                },
                dashboard: {
                    welcomeTitle: "Chào mừng trở lại, {{name}}! 👋",
                    welcomeSubtitle: "Đây là tình hình yêu cầu nghỉ phép của bạn hôm nay.",
                    newRequestBtn: "Tạo Yêu Cầu Mới",
                    stats: {
                        remainingLeave: "Phép Còn Lại",
                        days: "Ngày",
                        availableNow: "Có sẵn ngay",
                        pendingRequests: "Yêu Cầu Đang Chờ",
                        awaitingApproval: "Đang chờ duyệt",
                        approvedYTD: "Đã Duyệt Trong Năm",
                        takenThisYear: "Đã nghỉ năm nay"
                    },
                    recentActivity: {
                        title: "Hoạt Động Gần Đây",
                        viewAll: "Xem Tất Cả Lịch Sử",
                        columns: {
                            type: "Loại",
                            datesRequested: "Ngày Yêu Cầu",
                            duration: "Thời Gian",
                            submitted: "Đã Gửi",
                            status: "Trạng Thái",
                            actions: "Thao Tác"
                        },
                        showingLatest: "Hiển thị {{count}} yêu cầu mới nhất"
                    },
                    footerText: "© 2023 Hệ thống Nhân sự Acme. Đã đăng ký bản quyền.",
                    privacyPolicy: "Chính sách bảo mật"
                },
                history: {
                    stats: {
                        pending: "Đang Chờ",
                        approvedYTD: "Đã Duyệt (Cả năm)",
                        leaveBalance: "Số Dư Phép"
                    },
                    searchPlaceholder: "Tìm kiếm yêu cầu...",
                    filters: {
                        status: "Trạng Thái",
                        all: "Tất Cả",
                        approved: "Đã Duyệt",
                        pending: "Đang Chờ",
                        rejected: "Từ Chối",
                        dateRange: "Khoảng Thời Gian",
                        lastDay: "Ngày Qua",
                        lastWeek: "Tuần Qua",
                        lastMonth: "Tháng Qua"
                    },
                    downloadBtn: "Tải xuống",
                    columns: {
                        requestId: "Mã Yêu Cầu",
                        groupType: "Loại Nhóm",
                        type: "Loại",
                        submitted: "Đã Gửi",
                        dates: "Ngày Nghỉ",
                        duration: "Thời Gian",
                        status: "Trạng Thái",
                        action: "Thao Tác"
                    },
                    pagination: {
                        showing: "Đang hiển thị từ <1>{{from}}</1> đến <3>{{to}}</3> của <5>{{total}}</5> kết quả",
                        previous: "Trước",
                        next: "Tiếp"
                    },
                    footerText: "© 2023 Hệ thống Nhân sự Enterprise. Đã đăng ký bản quyền."
                }
            },
            auth: {
                login: {
                    success: "Đăng nhập thành công",
                    failed: "Đăng nhập thất bại",
                    brandName: "LRM Enterprise",
                    secureAccess: "Truy cập bảo mật",
                    slogan: "Đơn giản hóa quản lý nhân sự.",
                    description: "Truy cập công cụ LRM, quản lý nghỉ phép và tính lương trên một nền tảng thống nhất, bảo mật, thiết kế cho doanh nghiệp hiện đại.",
                    welcomeBack: "Chào mừng trở lại",
                    enterDetails: "Vui lòng nhập thông tin chi tiết để đăng nhập.",
                    email: "Email công việc",
                    emailPlaceholder: "name@example.com",
                    password: "Mật khẩu",
                    passwordPlaceholder: "••••••••",
                    rememberMe: "Ghi nhớ đăng nhập",
                    forgotPassword: "Quên mật khẩu?",
                    signIn: "Đăng nhập",
                    orContinueWith: "Hoặc tiếp tục với",
                    sso: "Đăng nhập một lần (SSO)",
                    copyright: "© 2026 BOS. Đã đăng ký bản quyền.",
                    privacyPolicy: "Chính sách bảo mật",
                    termsOfService: "Điều khoản dịch vụ",
                    helpCenter: "Trung tâm trợ giúp",
                    invalidEmail: "Địa chỉ email không hợp lệ",
                    emailRequired: "Vui lòng nhập email",
                    passwordMin: "Mật khẩu tối thiểu 6 ký tự",
                    passwordRequired: "Vui lòng nhập mật khẩu"
                }
            },
            sidebar: {
                mainMenu: "Menu chính",
                home: "Trang chủ",
                dashboard: "Bảng điều khiển",
                teamCalendar: "Lịch nhóm",
                setting: "Cài đặt",
                profile: "Hồ sơ của tôi",
                preference: "Tùy chọn",
                leaveBalances: "Quản lý nghỉ phép",
                createNewRequest: "Tạo yêu cầu mới",
                myRequestHistory: "Lịch sử yêu cầu của tôi",
                employee: "Quản lý nhân viên",
                attendanceTracking: "Theo dõi chấm công",
                globalRequests: "Yêu cầu toàn cầu",
                configuration: "Cấu hình",
                requestTypes: "Loại yêu cầu",
                shiftPatterns: "Ca làm việc",
                payrollAndHoliday: "Lương và ngày lễ",
                approvalWorkflow: "Quy trình phê duyệt",
                system: "Hệ thống",
                reportsAndAnalytics: "Báo cáo và phân tích",
                systemAuditLogs: "Nhật ký kiểm toán hệ thống",
                accessControl: "Kiểm soát truy cập"
            },
            preferences: {
                navbar: {
                    title: "Tùy chọn",
                    desc: "Tùy chỉnh trải nghiệm của bạn",
                },
                appearance: {
                    title: "Theme Engine",
                    desc: "Chọn cách bạn muốn hệ thống trông và cảm nhận.",
                    interface: {
                        title: "Giao diện",
                        desc: "Kiểm soát bố cục và mật độ của giao diện người dùng.",
                        compact: {
                            title: "Chế độ gọn gàng",
                            desc: "Hiển thị nhiều thông tin hơn với khoảng cách ít hơn.",
                        },
                        theme: {
                            label: {
                                light: "Sáng",
                                dark: "Tối",
                                system: "Hệ thống"
                            },
                            accentColor: "Màu chủ đạo",
                            colors: {
                                blue: "Xanh đại dương",
                                green: "Xanh ngọc",
                                purple: "Tím hoàng gia"
                            }
                        },
                        font: "Hệ thống phông chữ",
                        fontOptions: {
                            inter: "Inter",
                            roboto: "Roboto",
                            openSans: "Open Sans"
                        },
                        sidebar: "Vị trí thanh bên",
                        sidebarData: {
                            left: "Trái",
                            right: "Phải"
                        }
                    },
                },
                localization: {
                    title: "Khu vực",
                    desc: "Đặt tùy chọn khu vực cho ngôn ngữ và định dạng.",
                    regional: {
                        title: "Thiết lập khu vực",
                        desc: "Đặt tùy chọn khu vực cho ngôn ngữ và định dạng."
                    },
                    language: {
                        title: "Ngôn ngữ",
                        desc: "Chọn ngôn ngữ hiển thị trên giao diện.",
                        options: {
                            en: "Tiếng Anh (US)",
                            vi: "Tiếng Việt (Vietnamese)"
                        }
                    },
                    timezone: {
                        title: "Múi giờ",
                        defaultText: "Bây giờ là 09:41 AM",
                        options: {
                            sea: "(GMT+07:00) Bangkok, Hà Nội, Jakarta",
                            utc: "(GMT+00:00) UTC",
                            eastern: "(GMT-05:00) Giờ Miền Đông (Mỹ & Canada)",
                            singapore: "(GMT+08:00) Singapore, Kuala Lumpur"
                        }
                    },
                    format: {
                        title: "Định dạng",
                        desc: "Điều chỉnh định dạng của ngày, giờ, tiền tệ, kiểu số.",
                        date: "Định dạng ngày",
                        time: "Định dạng giờ",
                        dateOptions: {
                            dayMonthYear: "DD/MM/YYYY (31/12/2023)",
                            monthDayYear: "MM/DD/YYYY (12/31/2023)",
                            yearMonthDay: "YYYY-MM-DD (2023-12-31)"
                        },
                        timeOptions: {
                            twelveHour: "12 giờ (09:30 PM)",
                            twentyFourHour: "24 giờ (21:30)"
                        },
                        currency: {
                            title: "Loại tiền tệ chính",
                            desc: "Loại tiền tệ này sẽ được sử dụng cho tất cả các báo cáo tài chính, bảng lương và các khoản hoàn trả chi phí.",
                            options: {
                                usd: "USD ($)",
                                vnd: "VND (₫)",
                                eur: "EUR (€)"
                            }
                        },
                        preview: {
                            title: "Xem trước",
                            active: "Cài đặt hoạt động",
                            date: "Ngày",
                            time: "Giờ",
                            currency: "Tiền tệ",
                            number: "Kiểu số"
                        },
                        previewValues: {
                            date: "31/12/2023",
                            time: "09:41 AM",
                            currency: "$1,250.00",
                            number: "1,000,000.00"
                        }
                    },
                    en: "Tiếng anh",
                    vi: "Tiếng Việt",
                    date: "Định dạng ngày",
                },
                notification: {
                    title: "Thông Báo",
                    desc: "Quản lý thông báo.",
                    mail: {
                        title: "Thông báo qua mail",
                        desc: "Nhận thống kê về các phê duyệt qua mail."
                    },
                    sound: {
                        title: "Âm thanh",
                        desc: "Phát âm thanh khi nhận thông báo mới."
                    },
                    page: {
                        title: "Tùy chọn thông báo",
                        desc: "Kiểm soát chính xác những cập nhật bạn nhận được và cách nhận chúng."
                    },
                    actions: {
                        reset: "Khôi phục mặc định"
                    },
                    channels: {
                        email: "Thông báo qua email",
                        push: "Thông báo đẩy trong ứng dụng",
                        sms: "Cảnh báo SMS"
                    },
                    sections: {
                        leaveRequests: {
                            title: "Yêu cầu nghỉ phép",
                            desc: "Cập nhật về yêu cầu nghỉ phép, phê duyệt và thay đổi số dư phép."
                        },
                        announcements: {
                            title: "Thông báo chung",
                            desc: "Tin tức toàn công ty, cập nhật chính sách và thông báo từ HR."
                        },
                        weeklySummary: {
                            title: "Tóm tắt hàng tuần",
                            desc: "Bản tổng hợp hoạt động của nhóm và các hạn sắp tới được gửi vào mỗi thứ Hai.",
                            toggle: "Bật bản tin hàng tuần"
                        }
                    },
                    general: {
                        title: "Cài đặt chung",
                        desc: "Các tùy chọn ghi đè toàn cục cho trải nghiệm thông báo của bạn.",
                        doNotDisturb: {
                            title: "Không làm phiền",
                            desc: "Tạm dừng mọi thông báo ngoài giờ làm việc (6 PM - 8 AM)."
                        },
                        soundEffects: {
                            title: "Hiệu ứng âm thanh",
                            desc: "Phát âm thanh khi có thông báo mới trong ứng dụng."
                        }
                    }
                },
                security: {
                    password: {
                        title: "Đổi mật khẩu",
                        desc: "Cập nhật mật khẩu được liên kết với tài khoản của bạn.",
                        current: "Mật khẩu hiện tại",
                        new: "Mật khẩu mới",
                        confirm: "Xác nhận mật khẩu",
                        placeholder: "••••••••",
                        requirements: {
                            title: "Yêu cầu mật khẩu:",
                            minLength: "Tối thiểu 8 ký tự, càng dài càng tốt",
                            lowercase: "Có ít nhất một ký tự viết thường",
                            symbol: "Có ít nhất một số, ký hiệu hoặc ký tự khoảng trắng"
                        }
                    },
                    twoFactor: {
                        title: "Xác thực hai lớp",
                        enabled: "Đã bật",
                        desc: "Thêm một lớp bảo mật cho tài khoản của bạn. Chúng tôi sẽ gửi mã đến thiết bị di động khi bạn đăng nhập.",
                        authenticator: {
                            title: "Ứng dụng xác thực",
                            desc: "Google Authenticator, Microsoft Authenticator, v.v."
                        },
                        configure: "Cấu hình"
                    },
                    loginActivity: {
                        title: "Hoạt động đăng nhập",
                        desc: "Các thiết bị gần đây đã đăng nhập vào tài khoản của bạn.",
                        signOutAll: "Đăng xuất khỏi tất cả thiết bị",
                        current: "Hiện tại",
                        activeNow: "Đang hoạt động",
                        devices: {
                            macbook: "San Francisco, CA, USA • Chrome 114.0",
                            iphone: "San Francisco, CA, USA • Ứng dụng HR Connect",
                            windows: "Austin, TX, USA • Trình duyệt Edge"
                        },
                        times: {
                            twoHoursAgo: "2 giờ trước",
                            threeDaysAgo: "3 ngày trước"
                        }
                    },
                    actions: {
                        discard: "Hủy",
                        update: "Cập nhật cài đặt bảo mật"
                    }
                },
                accounts: {
                    title: "Thông tin cơ bản",
                    desc: "Quản lý thông tin cá nhân và thông tin được công khai",
                    avatarAlt: "Hồ sơ",
                    upload: {
                        title: "Cho phép *.jpeg, *.jpg, *.png, *.gif",
                        subtitle: "tối đa 3.1MB"
                    },
                    personalization: {
                        firstname: "Tên",
                        lastname: "Họ",
                        email: "Địa chỉ email",
                        bio: {
                            title: "Tiểu sử",
                            optional: "(Tuỳ chọn)",
                            placeholder: "Hãy viết một đoạn giới thiệu ngắn về bản thân..."
                        },
                        sample: {
                            firstName: "Sarah",
                            lastName: "Connor",
                            email: "sarah.connor@enterprise-hr.com"
                        },
                        profile: {
                            title: "Hồ sơ công việc",
                            desc: "Thông tin về vai trò và bộ phận được công ty chỉ định.",
                            readonly: "Chỉ đọc",
                            jobTitle: "Chức vụ",
                            jobText: "Giám đốc nhân sự cấp cao",
                            department: "Phòng ban",
                            departmentText: "Quản lý nhân sự",
                            employee: "ID nhân viên",
                            employeeText: "HR-2024-8921",
                            location: "Vị trí",
                            locationText: "Trụ sở San Francisco",
                            change: {
                                cancel: "Huỷ",
                                save: "Lưu"
                            }
                        }
                    }
                },
                changes: {
                    discard: "Hủy thay đổi",
                    save: "Lưu tùy chọn"
                }
            },
            approvals: {
                dashboard: {
                    title: "Phê duyệt của nhóm",
                    desc: "Quản lý và phản hồi các yêu cầu của nhóm"
                },
                metrics: {
                    totalPending: "TỔNG ĐANG CHỜ",
                    dueThisWeek: "HẠN TRONG TUẦN",
                    urgentRequests: "YÊU CẦU KHẨN CẤP"
                },
                searchPlaceholder: "Tìm kiếm yêu cầu...",
                filterBtn: "Bộ lọc",
                queue: {
                    title: "Hàng đợi yêu cầu",
                    columns: {
                        employee: "Nhân viên",
                        requestType: "Loại yêu cầu",
                        dateRange: "Thời gian",
                        requestedOn: "Ngày gửi",
                        status: "Trạng thái",
                        action: "Hành động"
                    },
                    actions: {
                        review: "Xem xét"
                    },
                    pagination: {
                        showing: "Hiển thị từ <1>{{from}}</1> đến <3>{{to}}</3> của <5>{{total}}</5> kết quả"
                    }
                },
                details: {
                    header: {
                        portal: "Cổng nhân sự",
                        requests: "Yêu cầu",
                        print: "In",
                        share: "Chia sẻ"
                    },
                    title: "Chi tiết yêu cầu nghỉ phép",
                    status: {
                        pending: "Đang chờ phê duyệt"
                    },
                    submittedOn: "Đã gửi vào {{date}} lúc {{time}}",
                    employeeInfo: {
                        currentBalance: "Số dư hiện tại",
                        days: "ngày"
                    },
                    requestInfo: {
                        title: "Thông tin yêu cầu",
                        daysTotal: "Tổng cộng {{count}} ngày",
                        leaveType: "Loại nghỉ phép",
                        dateRange: "Thời gian",
                        reason: "Lý do",
                        reasonText: "Tôi cần nghỉ phép để tham dự đám cưới gia đình ở ngoại tỉnh. Tôi đã bàn giao công việc chưa hoàn thành cho Marcus trong ba ngày này. Tôi sẽ kiểm tra email cho các trường hợp khẩn cấp."
                    },
                    attachments: {
                        title: "Tệp đính kèm"
                    },
                    action: {
                        title: "Hành động phê duyệt",
                        commentsLabel: "Nhận xét của người quản lý",
                        optional: "(Tùy chọn)",
                        commentsPlaceholder: "Thêm ghi chú giải thích quyết định của bạn...",
                        rejectBtn: "Từ chối",
                        approveBtn: "Phê duyệt",
                        viewHistory: "Xem toàn bộ lịch sử"
                    },
                    timeline: {
                        title: "Dòng thời gian yêu cầu",
                        submitted: "Yêu cầu đã được gửi",
                        by: "Bởi {{name}}",
                        reviewStarted: "Đang xem xét",
                        autoAssign: "Hệ thống tự động giao"
                    },
                    policy: {
                        title: "Chính sách công ty",
                        desc: "Yêu cầu nghỉ việc riêng quá 3 ngày cần thông báo trước ít nhất 1 tuần. Yêu cầu này đáp ứng tiêu chí thời gian thông báo."
                    }
                },
                calendar: {
                    filters: {
                        title: "Bộ lọc",
                        placeholder: "Tìm nhân viên...",
                        legendTitle: "Chú giải",
                        approvedLeave: "Nghỉ phép đã được duyệt",
                        overtime: "Làm thêm giờ (OT)",
                        publicHoliday: "Ngày lễ"
                    },
                    teamMembers: {
                        title: "Thành viên nhóm",
                        selectAll: "Chọn tất cả"
                    },
                    header: {
                        today: "Hôm nay",
                        month: "Tháng",
                        week: "Tuần",
                        day: "Ngày",
                        requestTimeOff: "Yêu cầu nghỉ phép"
                    },
                    days: {
                        sun: "CN",
                        mon: "T2",
                        tue: "T3",
                        wed: "T4",
                        thu: "T5",
                        fri: "T6",
                        sat: "T7"
                    },
                    publicHolidayLabel: "Ngày lễ",
                    companyDay: "Ngày công ty",
                    more: "+{{count}} nữa"
                }
            },
        admin: {
            dashboard: {
                title: "Tổng quan bảng điều khiển",
                subtitle: "Tóm tắt các số liệu nhân sự và quản lý nghỉ phép của doanh nghiệp.",
                generateReport: "Tạo báo cáo",
                leaveCalendar: "Lịch nghỉ phép",
                currentlyOnLeave: {
                    title: "Đang nghỉ phép",
                    subtitle: "{{count}} người quay lại vào ngày mai"
                },
                pendingApprovals: {
                    title: "Chờ phê duyệt",
                    subtitle: "Thời gian phản hồi trung bình: 2h"
                },
                totalEmployees: {
                    title: "Tổng số nhân viên",
                    subtitle: "+{{count}} người mới trong tháng"
                },
                trends: {
                    title: "Xu hướng nhân sự (6 tháng qua)",
                    activeStaff: "Nhân viên đang làm việc",
                    leaveBalance: "Số dư phép"
                },
                recentRequests: {
                    title: "Yêu cầu gần đây",
                    viewAll: "Xem tất cả",
                    columns: {
                        employee: "Nhân viên",
                        type: "Loại",
                        dates: "Ngày tháng",
                        status: "Trạng thái"
                    }
                },
                attendance: {
                    title: "Điểm danh hôm nay",
                    present: "Có mặt",
                    onLeave: "Nghỉ phép",
                    lateIn: "Đi muộn",
                    unaccounted: "Không rõ lý do",
                    checkLogs: "Kiểm tra nhật ký chi tiết"
                }
            },
            attendance: {
                title: "Nhật ký điểm danh",
                subtitle: "Xem lại hồ sơ chấm công hàng ngày của nhân viên và xác định sai lệch.",
                exportReport: "Xuất báo cáo",
                manualEntry: "Nhập thủ công",
                filters: {
                    searchEmp: "Tìm kiếm nhân viên",
                    searchPlaceholder: "Tên hoặc ID...",
                    department: "Phòng ban",
                    allDepts: "Tất cả phòng ban",
                    engineering: "Kỹ thuật",
                    marketing: "Tiếp thị",
                    sales: "Kinh doanh",
                    hr: "Nhân sự",
                    dateRange: "Khoảng thời gian",
                    to: "đến",
                    apply: "Áp dụng bộ lọc"
                },
                table: {
                    date: "Ngày",
                    employee: "Tên nhân viên",
                    clockIn: "Giờ vào",
                    clockOut: "Giờ ra",
                    totalHours: "Tổng giờ",
                    discrepancy: "Chênh lệch",
                    actions: "Hành động"
                },
                status: {
                    onTime: "Đúng giờ",
                    lateArrival: "Đến muộn",
                    earlyLeave: "Về sớm",
                    regular: "Bình thường"
                },
                pagination: {
                    showing: "Hiển thị",
                    to: "đến",
                    of: "trong",
                    results: "kết quả",
                    previous: "Trước",
                    next: "Tiếp"
                },
                summary: {
                    totalPresent: "Tổng có mặt",
                    totalPresentSub: "92% tổng nhân sự",
                    lateArrivals: "Đến muộn",
                    lateArrivalsSub: "+3 kể từ hôm qua",
                    earlyDepartures: "Về sớm",
                    earlyDeparturesSub: "Trung bình hàng ngày",
                    absent: "Vắng mặt",
                    absentSub: "Nghỉ phép có phép: 14"
                }
            },
            employees: {
                title: "Số dư nghỉ phép",
                subtitle: "Quản lý và kiểm tra quyền hạn và việc sử dụng nghỉ phép của nhân viên.",
                exportReport: "Xuất báo cáo",
                newAdjustment: "Điều chỉnh mới",
                searchPlaceholder: "Tìm theo tên, ID hoặc email...",
                filters: {
                    searchPlaceholder: "Tìm theo tên, ID hoặc email...",
                    department: "Phòng ban",
                    allDepartments: "Tất cả phòng ban",
                    location: "Địa điểm",
                    allLocations: "Tất cả địa điểm",
                    newYork: "New York",
                    london: "London",
                    remote: "Từ xa",
                    leaveType: "Loại nghỉ phép",
                    allAnnuals: "Tất cả loại nghỉ",
                    annual: "Nghỉ phép năm",
                    sick: "Nghỉ ốm",
                    sickLeave: "Nghỉ ốm",
                    parental: "Nghỉ thai sản / phụ huynh",
                    unpaid: "Nghỉ không lương",
                    personalLeave: "Nghỉ cá nhân",
                    compensatoryLeave: "Nghỉ bù",
                    vacationLeave: "Nghỉ phép"
                },
                table: {
                    employee: "Nhân viên",
                    department: "Phòng ban",
                    leaveType: "Loại nghỉ phép",
                    usedTotal: "Đã dùng / Tổng",
                    balance: "Số dư",
                    actions: "Hành động",
                    days: "ngày",
                    adjust: "Điều chỉnh"
                },
                pagination: {
                    showing: "Hiển thị",
                    to: "đến",
                    of: "trong",
                    employees: "nhân viên",
                    previous: "Trước",
                    next: "Tiếp"
                },
                adjustModal: {
                    title: "Điều chỉnh số dư",
                    subtitle: "Chỉnh sửa chi tiết nghỉ phép cho nhân viên đã chọn.",
                    currentBalance: "Số dư hiện tại",
                    annualLimit: "Giới hạn hàng năm",
                    days: "ngày",
                    system: "Hệ thống",
                    adjType: "Loại điều chỉnh",
                    addDays: "Thêm ngày (+)",
                    deductDays: "Trừ ngày (-)",
                    numDays: "Số ngày",
                    reason: "Lý do điều chỉnh",
                    reasonPlaceholder: "VD: Sửa lỗi nhập dữ liệu...",
                    preview: "Số dư mới dự kiến",
                    recentChanges: "Thay đổi gần đây",
                    cancel: "Hủy",
                    save: "Lưu thay đổi"
                }
            },
            globalRequests: {
                title: "Quản lý yêu cầu",
                subtitle: "Xem xét và quản lý tất cả các yêu cầu hành chính và nghỉ phép của nhân viên.",
                export: "Xuất",
                newRequest: "Yêu cầu mới",
                searchPlaceholder: "Tìm kiếm nhân viên...",
                filters: {
                    searchPlaceholder: "Tìm kiếm nhân viên...",
                    allDepartments: "Tất cả phòng ban",
                    allRequestTypes: "Tất cả loại yêu cầu",
                    allDepts: "Tất cả phòng ban",
                    allTypes: "Tất cả loại yêu cầu",
                    allStatus: "Tất cả trạng thái",
                    engineering: "Kỹ thuật",
                    design: "Thiết kế",
                    sales: "Kinh doanh",
                    hr: "Nhân sự",
                    annual: "Nghỉ phép năm",
                    sick: "Nghỉ ốm",
                    emergency: "Nghỉ khẩn cấp",
                    remote: "Làm việc từ xa",
                    pending: "Chờ duyệt",
                    approved: "Đã duyệt",
                    rejected: "Từ chối"
                },
                table: {
                    employee: "Nhân viên",
                    type: "Loại",
                    duration: "Thời lượng",
                    appliedDate: "Ngày áp dụng",
                    status: "Trạng thái",
                    actions: "Hành động",
                    viewDetail: "Xem chi tiết",
                    days: "{{count}} Ngày",
                    day: "{{count}} Ngày"
                },
                pagination: {
                    showing: "Hiển thị",
                    of: "trong",
                    requests: "yêu cầu",
                    previous: "Trước",
                    next: "Tiếp"
                }
            },
            common: {
                departments: {
                    engineering: "Kỹ thuật",
                    production: "Sản xuất",
                    rnd: "Nghiên cứu & Phát triển",
                    hr: "Nhân sự",
                    logistics: "Hậu cần",
                    qa: "Đảm bảo chất lượng",
                    system: "Hệ thống",
                    marketing: "Tiếp thị",
                    sales: "Kinh doanh"
                }
            },
            auditLogsPage: {
                eyebrow: "Giám sát hệ thống",
                title: "Lịch sử nhật ký kiểm toán hệ thống",
                subtitle: "Bản ghi theo trình tự thời gian của toàn bộ hành động quản trị và hệ thống để phục vụ rà soát tuân thủ, minh bạch và theo dõi vận hành.",
                export: "Xuất CSV",
                refresh: "Làm mới nhật ký",
                searchPlaceholder: "Tìm theo người dùng, hành động, thực thể hoặc địa chỉ IP...",
                dateRange: "24 Th10, 2023 - 31 Th10, 2023",
                filters: {
                    all: "Tất cả loại hành động",
                    workflow: "Thay đổi quy trình",
                    balance: "Cập nhật số dư",
                    access: "Truy cập người dùng",
                    config: "Cấu hình hệ thống"
                },
                table: {
                    timestamp: "Thời gian",
                    user: "Người dùng",
                    action: "Hành động",
                    target: "Đối tượng tác động",
                    ip: "Địa chỉ IP"
                },
                pagination: {
                    showing: "Hiển thị",
                    to: "đến",
                    of: "trong",
                    entries: "bản ghi"
                },
                stats: {
                    totalEvents: "Tổng sự kiện (30 ngày)",
                    criticalChanges: "Thay đổi nghiêm trọng",
                    compliance: "Tuân thủ hệ thống"
                }
            },
            reportsAnalyticsPage: {
                breadcrumbSystem: "Hệ thống",
                breadcrumbCurrent: "Báo cáo & phân tích",
                title: "Tổng quan báo cáo & phân tích",
                subtitle: "Tập trung việc tạo báo cáo, theo dõi khả năng hiển thị kiểm toán và giữ cho thông tin vận hành nhất quán trong một không gian làm việc gọn gàng.",
                export: "Xuất báo cáo",
                generate: "Tạo báo cáo",
                libraryTitle: "Thư viện báo cáo",
                libraryDesc: "Góc nhìn cân bằng về các đầu ra định kỳ, người phụ trách và trạng thái bàn giao.",
                searchPlaceholder: "Tìm kiếm báo cáo...",
                teams: {
                    all: "Tất cả bộ phận",
                    hr: "Vận hành nhân sự",
                    admin: "Quản trị hệ thống",
                    finance: "Tài chính",
                    operations: "Vận hành"
                },
                table: {
                    report: "Báo cáo",
                    owner: "Phụ trách",
                    frequency: "Tần suất",
                    updated: "Cập nhật",
                    status: "Trạng thái"
                },
                summary: {
                    title: "Tóm tắt nhanh",
                    desc: "Khả năng hiển thị kiểm toán và nhịp độ báo cáo hiện đã được gom vào một cụm bên phải gọn hơn để cân bằng tốt hơn với khu vực nội dung chính.",
                    compact: "Bố cục gọn",
                    hierarchy: "Phân cấp rõ hơn",
                    scanability: "Dễ quét nội dung hơn"
                },
                metrics: {
                    monthlyCompliance: "Tuân thủ hàng tháng",
                    exceptions: "Ngoại lệ đang mở",
                    exportedReports: "Báo cáo đã xuất",
                    monthlyComplianceChange: "+2.1% so với tháng trước",
                    exceptionsChange: "3 mục cần rà soát hôm nay",
                    exportedReportsChange: "Lần xuất gần nhất 2 giờ trước"
                },
                rows: {
                    leaveBalanceSummary: {
                        title: "Tổng hợp số dư nghỉ phép",
                        description: "Mức sử dụng nghỉ phép theo phòng ban, chuyển kỳ và phê duyệt đang chờ.",
                        owner: "Vận hành nhân sự",
                        frequency: "Hàng tuần",
                        status: "Sẵn sàng"
                    },
                    auditTrailSnapshot: {
                        title: "Ảnh chụp nhật ký kiểm toán",
                        description: "Hành động bảo mật và cấu hình được nhóm theo mức rủi ro và tác nhân.",
                        owner: "Quản trị hệ thống",
                        frequency: "Hàng ngày",
                        status: "Đang rà soát"
                    },
                    attendanceVariance: {
                        title: "Biến động chấm công",
                        description: "Tổng hợp đi muộn, thiếu check-in và bất thường ca làm.",
                        owner: "Vận hành",
                        frequency: "Hàng tuần",
                        status: "Sẵn sàng"
                    },
                    payrollReconciliation: {
                        title: "Đối soát bảng lương",
                        description: "Đối chiếu hồ sơ nghỉ phép đã duyệt với dữ liệu khấu trừ lương.",
                        owner: "Tài chính",
                        frequency: "Hàng tháng",
                        status: "Bản nháp"
                    }
                }
            },
            configuration: {
                approvalWorkflow: {
                    title: "Cấu hình quy trình phê duyệt",
                    subtitle: "Xác định và quản lý các trình tự phê duyệt nhiều cấp độ cho các yêu cầu của phòng ban.",
                    exportConfig: "Xuất cấu hình",
                    createNew: "Tạo quy trình mới",
                    filters: {
                        department: "Lọc theo phòng ban",
                        requestType: "Loại yêu cầu",
                        allDepts: "Tất cả phòng ban",
                        engineering: "Kỹ thuật",
                        hr: "Nhân sự",
                        sales: "Kinh doanh & Tiếp thị",
                        finance: "Tài chính",
                        allTypes: "Tất cả loại",
                        annualLeave: "Nghỉ phép năm",
                        sickLeave: "Nghỉ ốm",
                        remoteWork: "Làm việc từ xa",
                        overtime: "Làm thêm giờ"
                    },
                    infoMsg: "Các thay đổi chỉ áp dụng cho yêu cầu mới",
                    engineeringDept: {
                        title: "Phòng Kỹ thuật",
                        subtitle: "Quy trình phê duyệt nghỉ phép tiêu chuẩn",
                        step1: {
                            title: "Đánh giá ban đầu",
                            role: "Quản lý phòng ban",
                            desc: "Người giám sát trực tiếp"
                        },
                        step2: {
                            title: "Kiểm tra nguồn lực",
                            role: "Chuyên viên nhân sự",
                            desc: "Điều phối viên nghỉ phép"
                        },
                        step3: "Bước cuối cùng"
                    },
                    financeDept: {
                        title: "Tài chính & Vận hành",
                        subtitle: "Quy trình phê duyệt nghỉ phép & chi phí điều hành",
                        step1: {
                            title: "Phê duyệt của Trưởng phòng",
                            role: "Giám đốc tài chính",
                            desc: "Người phê duyệt chính"
                        },
                        step2: {
                            title: "Phê duyệt của Ban điều hành",
                            role: "CFO",
                            desc: "Giám sát tài chính"
                        },
                        step3: {
                            title: "Tuân thủ nhân sự",
                            role: "Giám đốc nhân sự",
                            desc: "Xác minh pháp lý"
                        }
                    },
                    addStep: "Thêm bước phê duyệt",
                    configureAnother: "Cấu hình quy trình cho phòng ban khác"
                },
                payrollHoliday: {
                    title: "Cấu hình Lương và Ngày lễ",
                    subtitle: "Cấu hình các quy tắc trả lương toàn cầu và quản lý lịch nghỉ lễ chính thức.",
                    discard: "Hủy thay đổi",
                    save: "Lưu cấu hình",
                    payroll: {
                        title: "Cài đặt Lương",
                        subtitle: "Thành phần và Quy tắc tính lương",
                        baseRules: "Quy tắc Lương cơ bản",
                        payFreq: "Tần suất trả lương",
                        freqOptions: {
                            monthly: "Hàng tháng",
                            biWeekly: "Hai tuần một lần",
                            weekly: "Hàng tuần"
                        },
                        procDate: "Ngày xử lý",
                        dateOptions: {
                            day25: "Ngày 25 hàng tháng",
                            lastDay: "Ngày làm việc cuối cùng",
                            firstDay: "Ngày 1 tháng sau"
                        },
                        allowance: {
                            title: "Thiết lập Phụ cấp",
                            addNew: "+ Thêm mới",
                            housing: "Phụ cấp nhà ở",
                            housingDesc: "Cố định: $500.00 / tháng",
                            transport: "Phụ cấp đi lại",
                            transportDesc: "Biến đổi: Dựa trên chuyên cần"
                        },
                        deduction: {
                            title: "Khấu trừ Tiêu chuẩn",
                            addNew: "+ Thêm mới",
                            health: "Bảo hiểm Y tế",
                            healthDesc: "Phần của nhân viên: 2.5%",
                            pension: "Quỹ hưu trí",
                            pensionDesc: "Bắt buộc: 8.0%"
                        }
                    },
                    holiday: {
                        title: "Lịch nghỉ lễ",
                        subtitle: "Các ngày nghỉ lễ theo lịch năm 2024",
                        addHoliday: "Thêm Ngày lễ",
                        datePicker: "Chọn ngày",
                        holidayName: "Tên Ngày lễ",
                        holidayPlaceholder: "VD: Tết Nguyên Đán",
                        addToCalendar: "Thêm vào lịch",
                        importCSV: "Nhập hàng loạt Ngày lễ qua CSV",
                        list: {
                            newYear: "Tết Dương Lịch",
                            newYearDesc: "Ngày nghỉ lễ thường niên cố định",
                            lunar: "Tết Nguyên Đán",
                            lunarDesc: "Ngày nghỉ lễ (Thay đổi theo Âm lịch)",
                            labor: "Ngày Quốc tế Lao động",
                            laborDesc: "Ngày lễ kỷ niệm quốc tế",
                            national: "Quốc khánh",
                            nationalDesc: "Ngày nghỉ lễ theo quy định",
                            christmas: "Lễ Giáng Sinh",
                            christmasDesc: "Ngày lễ toàn cầu"
                        },
                        months: {
                            jan: "Thg 1",
                            feb: "Thg 2",
                            may: "Thg 5",
                            oct: "Thg 10",
                            dec: "Thg 12"
                        }
                    }
                },
                requestType: {
                    title: "Cấu hình loại yêu cầu",
                    subtitle: "Quản lý loại nghỉ phép, quy tắc làm thêm giờ và quy trình phê duyệt.",
                    export: "Xuất quy tắc",
                    newType: "Loại yêu cầu mới",
                    searchPlaceholder: "Tìm kiếm loại yêu cầu...",
                    filters: {
                        allStatus: "Tất cả trạng thái",
                        active: "Đang hoạt động",
                        inactive: "Ngừng hoạt động"
                    },
                    table: {
                        requestType: "Loại yêu cầu",
                        code: "Mã",
                        approvalLevels: "Cấp độ phê duyệt",
                        requireAttachment: "Cần đính kèm",
                        status: "Trạng thái",
                        actions: "Hành động"
                    },
                    types: {
                        annual: "Nghỉ phép năm",
                        annualDesc: "Theo quy định",
                        sick: "Nghỉ ốm",
                        sickDesc: "Yêu cầu Giấy chứng nhận",
                        overtime: "Yêu cầu làm thêm giờ",
                        overtimeDesc: "Lương theo giờ",
                        expense: "Thanh toán chi phí",
                        expenseDesc: "Đi lại & Ăn uống",
                        remote: "Làm việc từ xa",
                        remoteDesc: "Yêu cầu làm việc WFH"
                    },
                    pagination: {
                        showing: "Hiển thị",
                        to: "đến",
                        of: "trong",
                        results: "kết quả",
                        previous: "Trước",
                        next: "Sau"
                    },
                    saveAll: "Lưu tất cả thay đổi"
                },
                shiftPattern: {
                    title: "Quản lý ca làm việc",
                    subtitle: "Cấu hình giờ làm việc và chu kỳ ca làm việc lặp lại cho nhân sự.",
                    create: "Tạo ca Làm việc Mới",
                    cards: {
                        timeRange: "Khung giờ",
                        breakDuration: "Thời gian nghỉ",
                        activeDays: "Ngày làm việc",
                        assignedEmployees: "Nhân viên được phân công",
                        minutes: "Phút"
                    },
                    shifts: {
                        office: {
                            title: "Giờ hành chính",
                            desc: "Lịch làm việc tiêu chuẩn tại trụ sở chính."
                        },
                        morning: {
                            title: "Ca sáng",
                            desc: "Luân phiên đội ngũ sớm chi nhánh vận hành và hậu cần."
                        },
                        night: {
                            title: "Ca đêm",
                            desc: "Ca trực an ninh và trung tâm giám sát 24/7."
                        }
                    },
                    days: {
                        mon: "T2",
                        tue: "T3",
                        wed: "T4",
                        thu: "T5",
                        fri: "T6",
                        sat: "T7",
                        sun: "CN"
                    }
                }
            },
        system: {
            accessControl: {
                title: "Kiểm soát truy cập và Phân quyền",
                subtitle: "Quản lý Kiểm soát truy cập dựa trên vai trò (RBAC) và quyền bảo mật cấp mô-đun.",
                securityAudit: "Đánh giá bảo mật",
                createRole: "Tạo vai trò mới",
                searchPlaceholder: "Tìm kiếm vai trò...",
                roles: {
                    admin: { title: "Quản trị viên", desc: "Toàn quyền hệ thống" },
                    hr: { title: "Quản lý nhân sự", desc: "Nhân sự & Vận hành" },
                    deptManager: { title: "Quản lý phòng ban", desc: "Quản lý đội nhóm" },
                    staff: { title: "Nhân viên chung", desc: "Tự phục vụ" }
                },
                insight: {
                    title: "Thông tin RBAC",
                    desc: "Thay đổi quyền của vai trò sẽ có hiệu lực đối với người dùng trong lần đăng nhập tiếp theo."
                },
                roleDetails: {
                    title: "Vai trò: Quản trị viên",
                    desc: "Định cấu hình mức độ truy cập cho mỗi mô-đun hệ thống",
                    discard: "Hủy thay đổi",
                    save: "Lưu quyền"
                },
                table: {
                    module: "Mô-đun / Quyền",
                    view: "Xem",
                    create: "Tạo",
                    edit: "Sửa",
                    delete: "Xóa",
                    export: "Xuất",
                    modules: {
                        dashboard: "Bảng điều khiển chính",
                        employee: "Hồ sơ nhân viên",
                        leave: "Yêu cầu nghỉ phép",
                        payroll: "Xử lý bảng lương",
                        config: "Cấu hình hệ thống"
                    }
                },
                advanced: {
                    title: "Quyền nâng cao",
                    bulkImport: { title: "Nhập dữ liệu hàng loạt", desc: "Cho phép nhập hồ sơ nhiều nhân viên qua CSV/XLSX." },
                    apiAccess: { title: "Quyền truy cập API hệ thống", desc: "Tạo và quản lý khóa API cho các tích hợp hệ thống bên ngoài." },
                    auditLogs: { title: "Xem Nhật ký kiểm tra", desc: "Truy cập lịch sử chi tiết về mọi hoạt động và thay đổi hệ thống." },
                    workflows: { title: "Quản lý Quy trình phê duyệt", desc: "Xác định các trình tự phê duyệt nhiều cấp cho các phòng ban." }
                }
            }
        },
        },
    }
    }
}

i18n.use(LanguageDetector) // Tự động phát hiện ngôn ngữ người dùng
    .use(initReactI18next) // Gắn vào React
    .init({
        resources,
        fallbackLng: "vi", // Ngôn ngữ mặc định nếu không phát hiện được
        interpolation: {
            escapeValue: false, // React đã tự động chống XSS
        },
    })

export default i18n
