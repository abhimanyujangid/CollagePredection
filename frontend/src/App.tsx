import { ThemeProvider } from "@/components/theme-provider"
import AppRoutes from "./routes/AppRoutes"
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme ">
      <AppRoutes />
      <Toaster />
    </ThemeProvider>
  )
}

export default App