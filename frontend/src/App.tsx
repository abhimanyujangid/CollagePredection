import { ThemeProvider } from "@/components/theme-provider"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App