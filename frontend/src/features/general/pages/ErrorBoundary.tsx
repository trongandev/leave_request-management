/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 */

import { Component, type ReactNode } from "react"
import { ChevronsLeftRightEllipsis, CircleQuestionMark, HomeIcon, OctagonAlert, RotateCcw, SquareTerminal } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export interface ErrorBoundaryProps {
    /** Child components */
    children: ReactNode
    /** Fallback UI to show on error */
    fallback?: ReactNode
    /** Callback when error occurs */
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    progress: number
}

/**
 * Error Boundary component
 * Catches JavaScript errors in child components and displays fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    private progressInterval: ReturnType<typeof setInterval> | null = null

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            progress: 0,
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
            progress: 0,
        }
    }

    startProgressVisualization = () => {
        if (this.progressInterval) return

        this.progressInterval = setInterval(() => {
            this.setState((prev) => {
                const nextProgress = Math.min(100, prev.progress + (Math.floor(Math.random() * 20) + 8))
                return { ...prev, progress: nextProgress }
            })
        }, 800)
    }

    stopProgressVisualization = () => {
        if (!this.progressInterval) return
        clearInterval(this.progressInterval)
        this.progressInterval = null
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.props.onError?.(error, errorInfo)
        this.setState({ progress: 5 }, this.startProgressVisualization)
        // Gửi lỗi lên server để ghi log
        // if (import.meta.env.VITE_NODE_ENV === 'production') {
        //     etcService
        //         .createLogError({
        //             type: 'client',
        //             path: window.location.pathname,
        //             error: error.toString(),
        //             stack: errorInfo.componentStack || '',
        //         })
        //         .catch(console.error)
        // }
    }

    componentDidUpdate(_: ErrorBoundaryProps, prevState: ErrorBoundaryState): void {
        if (this.state.hasError && this.state.progress >= 100 && prevState.progress < 100) {
            this.stopProgressVisualization()
        }
    }

    componentWillUnmount(): void {
        this.stopProgressVisualization()
    }

    handleReset = (): void => {
        localStorage.setItem("user", "")
        this.stopProgressVisualization()
        this.setState({
            hasError: false,
            error: null,
            progress: 0,
        })
        window.location.reload()
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <main className="h-screen flex items-center justify-center">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-primary font-bold tracking-tighter text-2xl">Leave Request Management</div>
                                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 dark:text-red-200 dark:bg-red-800 text-error px-3 py-1 rounded-full w-fit">
                                    <OctagonAlert size={20} />
                                    <span className="text-[11px] uppercase tracking-wider font-semibold">System Alert</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <div className="">
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">Something went wrong on our end</h2>
                                    <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed">
                                        Our technical suite is experiencing an internal hiccup. The engineering team has been notified and is architecting a fix.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to={"/"}>
                                    <Button className="h-12">
                                        <HomeIcon /> Back to Home
                                    </Button>
                                </Link>
                                <Button onClick={this.handleReset} variant={"outline-primary"} className="h-12">
                                    <RotateCcw /> Try Again
                                </Button>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative hidden lg:block">
                            <div className="relative z-10  rounded-[2rem] p-8 shadow-[0_12px_32px_rgba(25,28,30,0.08)] bg-white/50 backdrop-blur-sm">
                                <div className="absolute inset-0  opacity-50"></div>
                                <div className="relative z-20 flex flex-col gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="h-1.5 w-1/3 bg-primary/10 rounded-full"></div>
                                        <div className="h-1.5 w-1/2 bg-primary/10 rounded-full"></div>
                                        <div className="h-1.5 w-1/4 bg-primary/10 rounded-full"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex flex-col gap-2 border">
                                            <SquareTerminal />
                                            <div className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant">Error Log</div>
                                            <div className="text-xs font-mono text-red-500">#ERR_500_SRV_TO</div>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex flex-col gap-2 border">
                                            <ChevronsLeftRightEllipsis />
                                            <div className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant">API Status</div>
                                            <div className="text-xs font-mono text-error/70">DEGRADED</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border ">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-bold text-on-surface">System Recovery Progress</span>
                                            <span className="text-[10px] font-bold text-primary">{this.state.progress}%</span>
                                        </div>
                                        <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: this.state.progress + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 opacity-10 blur-xl">
                                    <div className="w-64 h-64 bg-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="absolute -top-6 -right-6  p-5 rounded-2xl shadow-xl z-30 bg-white/20 backdrop-blur-sm border border-white/40">
                                <div className="flex items-center gap-3">
                                    <CircleQuestionMark />

                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-on-surface">Need help?</span>
                                        <span className="text-[10px] text-on-surface-variant">Contact Tech Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )
        }

        return this.props.children
    }
}
