import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { Toaster } from "sonner"
import { BrowserRouter } from "react-router-dom"
import SidebarProvider from "./contexts/sidebarContext.tsx"
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <TooltipProvider>
                <SidebarProvider>
                    <App />
                    <Toaster position="top-center" richColors />
                </SidebarProvider>
            </TooltipProvider>
        </BrowserRouter>
    </StrictMode>,
)
