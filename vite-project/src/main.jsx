import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 
import GoBoard from './Components/GoBoard'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoBoard/>
  </StrictMode>,
)
