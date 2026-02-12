import React from "react"

export default function HomePage() {
    return (
        <main className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#101419] dark:text-white tracking-tight">Aloha, Lilo! 👋</h1>
                    <p className="text-[#5a6e8c] dark:text-gray-400 text-base">
                        You have <span className="text-primary font-bold">4 active tasks</span> waiting for you today.
                    </p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/30 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    New Project
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-full items-start">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="flex items-center gap-2 text-[#101419] dark:text-white font-bold text-lg">
                            <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg material-symbols-outlined text-[20px]">surfing</span>
                            New Assignments
                        </h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold px-2 py-1 rounded-md">2</span>
                    </div>
                    <div className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-md flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">Python Basics</span>
                            <button className="text-gray-300 hover:text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">Intro to Loops</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Master the 'for' and 'while' loops.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>Due Tomorrow</span>
                        </div>
                        <button className="w-full mt-2 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                            Start Coding
                        </button>
                    </div>
                    <div className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-md flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">Web Design</span>
                            <button className="text-gray-300 hover:text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">Flexbox Surfboard</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Build a responsive layout using Flexbox.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>Due Friday</span>
                        </div>
                        <button className="w-full mt-2 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                            Start Coding
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="flex items-center gap-2 text-[#101419] dark:text-white font-bold text-lg">
                            <span className="p-1.5 bg-yellow-100 text-yellow-600 rounded-lg material-symbols-outlined text-[20px]">waves</span>
                            In Progress
                        </h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold px-2 py-1 rounded-md">1</span>
                    </div>
                    <div className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-transparent hover:border-yellow-200 dark:hover:border-yellow-900 transition-all hover:shadow-md flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">JS Fundamentals</span>
                            <button className="text-gray-300 hover:text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">JavaScript Functions</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Understanding scope and closures.</p>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>40%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                        </div>
                        <button className="w-full mt-2 py-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 font-bold text-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors">
                            Continue
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="flex items-center gap-2 text-[#101419] dark:text-white font-bold text-lg">
                            <span className="p-1.5 bg-green-100 text-green-600 rounded-lg material-symbols-outlined text-[20px]">event</span>
                            Upcoming
                        </h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold px-2 py-1 rounded-md">2</span>
                    </div>
                    <div className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-transparent hover:border-green-200 dark:hover:border-green-900 transition-all hover:shadow-md flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">Final Project</span>
                            <button className="text-gray-300 hover:text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute -right-4 -top-4 w-12 h-12 bg-green-100 rounded-full blur-xl opacity-50 pointer-events-none"></div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 relative z-10">Ohana Website</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">Create a multi-page site.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>Due Next Week</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center">
                        <span className="material-symbols-outlined text-gray-300 text-4xl mb-2">local_florist</span>
                        <p className="text-sm text-gray-400 font-medium">Relax, you're ahead of schedule!</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="flex items-center gap-2 text-[#101419] dark:text-white font-bold text-lg">
                            <span className="p-1.5 bg-red-100 text-red-600 rounded-lg material-symbols-outlined text-[20px]">hourglass_empty</span>
                            Overdue
                        </h3>
                        <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-1 rounded-md border border-red-100">1</span>
                    </div>
                    <div className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-l-4 border-l-red-500 border-y-transparent border-r-transparent hover:shadow-md flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-50 dark:bg-red-900/10 opacity-30 pointer-events-none"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <span className="bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">HTML Basics</span>
                            <span className="material-symbols-outlined text-red-400 text-[20px]">warning</span>
                        </div>
                        <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">HTML Basics Quiz</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Review tags and attributes.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-red-500 font-semibold mt-2 relative z-10">
                            <span className="material-symbols-outlined text-[16px]">error</span>
                            <span>Due Yesterday</span>
                        </div>
                        <button className="w-full mt-2 py-2 rounded-lg bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors relative z-10 shadow-md shadow-red-200 dark:shadow-none">
                            Take Quiz Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
