import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Routes/AppRouter'
import { ThemeProvider } from './Context/ThemeContext'



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
