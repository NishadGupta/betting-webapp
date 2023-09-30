import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LandingPage } from './components/LandingPage'
import { Tournament } from './components/Tournament'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LandingPage /> */}
      <Tournament B={100} N={3} />
    </>
  )
}

export default App
