import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 
// import GoBoard from './Components/GoBoard'
import Routing from './Components/Routing';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing/>
  </StrictMode>,
)
