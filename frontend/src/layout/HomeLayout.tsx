import CHeader from "@/components/etc/CHeader"
import React from "react"
import { Outlet } from "react-router-dom"

export default function HomeLayout() {
    return (
        <div>
            <CHeader />
            <Outlet />
        </div>
    )
}
