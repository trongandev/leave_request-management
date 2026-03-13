import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import { KeyRoundIcon, LockIcon, MailIcon, VerifiedIcon } from "lucide-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import InputField from "@/components/etc/InputField"
import authService from "@/services/authService"
import { toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"
export default function LoginPage() {
    const { setUser } = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: async (values) => {
            await handleLogin(values)
        },
    })

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const res = await authService.login(values)
            if (res.success) {
                setUser(res.data.user)
                toast.success("Đăng nhập thành công")
                if (location.state?.from) {
                    navigate(location.state.from.pathname)
                } else {
                    navigate("/")
                }
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Đăng nhập thất bại", {
                description: error?.response?.data?.message,
            })
        }
        // if (res.success) {
        //     toast.success("Đăng nhập thành công")
        // } else {
        //     toast.error("Đăng nhập thất bại")
        // }
    }

    return (
        <div className="flex w-full h-screen overflow-hidden bg-white shadow-2xl dark:bg-background-dark">
            <div className="relative flex-col justify-between hidden p-12 text-white lg:flex lg:w-1/2 bg-primary">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Modern corporate office interior with glass walls"
                        className="object-cover w-full h-full opacity-20 mix-blend-overlay"
                        data-alt="Modern corporate office interior with glass walls"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9fmS1un0GHek6JsuRl5RvwyrMh7B73-tMnvhO_43FQ5ZsdJHhfOUmlwzGnDjDKFSsDQjvtRAsAcGVJw8i_P__nphFQsVsgjD7v-mfIhklhBJHiyfxcz2Xx1mwVWIsmYDdYIIbcoYN44-Zr8Gh9XlxY9JVomkMStOb-YjMrFdlzVZ5EqzEU_iS6RVLVyqPu4xrrAYbng5tclUFEM460aTvnT9NeTrrmdwkmq8Tj4iAhnW9e3y_XSmY3I6Thx5B61aFY90Xr8GF8N8"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-blue-900 opacity-90 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 flex items-center space-x-3">
                    <div className="p-2 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                        <span className="text-3xl text-white material-icons">corporate_fare</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">LRM Enterprise</span>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center py-12 grow">
                    <div className="relative w-80 h-80">
                        <div className="absolute top-0 w-64 h-64 rounded-full left-10 bg-white/5 blur-3xl animate-pulse"></div>
                        <div className="absolute w-48 h-48 rounded-full bottom-10 right-10 bg-blue-400/20 blur-2xl"></div>
                        <div className="absolute p-6 transform -translate-x-1/2 -translate-y-1/2 border shadow-2xl top-1/2 left-1/2 w-72 bg-white/10 backdrop-blur-md rounded-xl border-white/20">
                            <div className="flex items-center mb-4 space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                                    <span className="text-sm text-white material-icons">person</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-24 h-2 rounded bg-white/40"></div>
                                    <div className="w-16 h-2 rounded bg-white/20"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="w-full h-2 rounded bg-white/10"></div>
                                <div className="w-5/6 h-2 rounded bg-white/10"></div>
                                <div className="w-4/6 h-2 rounded bg-white/10"></div>
                            </div>
                            <div className="flex mt-6 space-x-2">
                                <div className="w-20 h-8 border rounded bg-primary border-white/30"></div>
                                <div className="w-8 h-8 border rounded bg-white/10 border-white/30"></div>
                            </div>
                        </div>
                        <div className="absolute -right-4 top-20 bg-white text-primary px-4 py-2 rounded-lg shadow-lg text-sm font-semibold flex items-center gap-2 animate-[bounce_3s_infinite]">
                            <VerifiedIcon />
                            Secure Access
                        </div>
                    </div>
                </div>
                <div className="relative z-10 max-w-md">
                    <h2 className="mb-4 text-3xl font-bold leading-snug">Streamline your workforce management.</h2>
                    <p className="text-lg font-light leading-relaxed text-blue-100">
                        Access your LRM tools, leave management, and payroll in one secure, unified platform designed for the modern enterprise.
                    </p>
                    <div className="flex gap-2 mt-8">
                        <div className="w-8 h-1 bg-white rounded-full"></div>
                        <div className="w-2 h-1 rounded-full bg-white/30"></div>
                        <div className="w-2 h-1 rounded-full bg-white/30"></div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-center w-full p-8 bg-white lg:w-1/2 dark:bg-background-dark lg:p-16">
                <div className="absolute flex items-center space-x-2 lg:hidden top-8 left-8">
                    <span className="text-3xl material-icons text-primary">corporate_fare</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">HR Enterprise</span>
                </div>
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back</h1>
                        <p className="text-base text-neutral-text dark:text-gray-400">Please enter your details to sign in.</p>
                    </div>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <InputField iconLeft={MailIcon} label="Work Email" name="email" placeholder="name@example.com" type="email" formik={formik} />
                        <InputField iconLeft={LockIcon} label="Password" name="password" placeholder="••••••••" type="password" formik={formik} />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary focus:ring-primary" id="remember-me" name="remember-me" type="checkbox" />
                                <label className="block ml-2 text-sm text-gray-600 cursor-pointer dark:text-gray-400" htmlFor="remember-me">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a className="font-medium text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-white" href="#">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <Button className="w-full h-12" type="submit">
                            Sign in
                        </Button>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 bg-white dark:bg-background-dark dark:text-gray-400">Or continue with</span>
                        </div>
                    </div>
                    <Button className="w-full h-12" variant={"outline"}>
                        <KeyRoundIcon /> Single Sign-On (SSO)
                    </Button>

                    <div className="pt-8 text-xs text-center text-gray-400 dark:text-gray-500">
                        <p className="mb-2">© 2026 BOS. All rights reserved.</p>
                        <div className="flex justify-center space-x-4">
                            <a className="transition-colors hover:text-primary" href="#">
                                Privacy Policy
                            </a>
                            <span>•</span>
                            <a className="transition-colors hover:text-primary" href="#">
                                Terms of Service
                            </a>
                            <span>•</span>
                            <a className="transition-colors hover:text-primary" href="#">
                                Help Center
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
