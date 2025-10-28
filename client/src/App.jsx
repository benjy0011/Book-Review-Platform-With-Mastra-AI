import { Toaster } from 'sonner'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors theme='light' closeButton />
    </>
  )
}

export default App
