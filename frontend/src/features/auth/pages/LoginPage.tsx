import React from "react"

export default function LoginPage() {
    return (
        <div className="w-full h-screen flex overflow-hidden bg-white dark:bg-background-dark shadow-2xl">
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modern corporate office interior with glass walls"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                        data-alt="Modern corporate office interior with glass walls"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9fmS1un0GHek6JsuRl5RvwyrMh7B73-tMnvhO_43FQ5ZsdJHhfOUmlwzGnDjDKFSsDQjvtRAsAcGVJw8i_P__nphFQsVsgjD7v-mfIhklhBJHiyfxcz2Xx1mwVWIsmYDdYIIbcoYN44-Zr8Gh9XlxY9JVomkMStOb-YjMrFdlzVZ5EqzEU_iS6RVLVyqPu4xrrAYbng5tclUFEM460aTvnT9NeTrrmdwkmq8Tj4iAhnW9e3y_XSmY3I6Thx5B61aFY90Xr8GF8N8"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-900 opacity-90 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                        <span className="material-icons text-white text-3xl">corporate_fare</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">HR Enterprise</span>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center flex-grow py-12">
                    <div className="relative w-80 h-80">
                        <div className="absolute top-0 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-2xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="material-icons text-white text-sm">person</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="h-2 w-24 bg-white/40 rounded"></div>
                                    <div className="h-2 w-16 bg-white/20 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-white/10 rounded"></div>
                                <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                                <div className="h-2 w-4/6 bg-white/10 rounded"></div>
                            </div>
                            <div className="mt-6 flex space-x-2">
                                <div className="h-8 w-20 bg-primary rounded border border-white/30"></div>
                                <div className="h-8 w-8 bg-white/10 rounded border border-white/30"></div>
                            </div>
                        </div>
                        <div className="absolute -right-4 top-20 bg-white text-primary px-4 py-2 rounded-lg shadow-lg text-sm font-semibold flex items-center gap-2 animate-[bounce_3s_infinite]">
                            <span className="material-icons text-base">verified</span>
                            Secure Access
                        </div>
                    </div>
                </div>
                <div className="relative z-10 max-w-md">
                    <h2 className="text-3xl font-bold mb-4 leading-snug">Streamline your workforce management.</h2>
                    <p className="text-blue-100 text-lg font-light leading-relaxed">
                        Access your HR tools, leave management, and payroll in one secure, unified platform designed for the modern enterprise.
                    </p>
                    <div className="mt-8 flex gap-2">
                        <div className="h-1 w-8 bg-white rounded-full"></div>
                        <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                        <div className="h-1 w-2 bg-white/30 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-white dark:bg-background-dark flex flex-col justify-center items-center p-8 lg:p-16 relative">
                <div className="lg:hidden absolute top-8 left-8 flex items-center space-x-2">
                    <span className="material-icons text-primary text-3xl">corporate_fare</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">HR Enterprise</span>
                </div>
                <div className="w-full max-w-md space-y-8">
                    <div className="text-left space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome back</h1>
                        <p className="text-neutral-text dark:text-gray-400 text-base">Please enter your details to sign in.</p>
                    </div>
                    <form action="#" className="space-y-6" method="POST">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                Work Email
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons text-gray-400 text-xl">mail_outline</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 border-neutral-border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                    id="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                Password
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons text-gray-400 text-xl">lock_outline</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-10 py-3 border-neutral-border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    type="password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                    <span className="material-icons text-gray-400 text-xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors">visibility_off</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" id="remember-me" name="remember-me" type="checkbox" />
                                <label className="ml-2 block text-sm text-gray-600 dark:text-gray-400 cursor-pointer" htmlFor="remember-me">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a className="font-medium text-gray-500 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-white" href="#">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-background-dark text-gray-500 dark:text-gray-400">Or continue with</span>
                        </div>
                    </div>
                    <div>
                        <button
                            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 gap-2"
                            type="button"
                        >
                            <span className="material-icons text-gray-500 text-xl">vpn_key</span>
                            <span>Single Sign-On (SSO)</span>
                        </button>
                    </div>
                    <div className="pt-8 text-center text-xs text-gray-400 dark:text-gray-500">
                        <p className="mb-2">© 2023 Enterprise HR Systems. All rights reserved.</p>
                        <div className="flex justify-center space-x-4">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <span>•</span>
                            <a className="hover:text-primary transition-colors" href="#">
                                Terms of Service
                            </a>
                            <span>•</span>
                            <a className="hover:text-primary transition-colors" href="#">
                                Help Center
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
