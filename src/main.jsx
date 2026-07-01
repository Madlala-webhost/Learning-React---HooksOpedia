import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SampleDemo from './Components/Hooks/SampleDemo'


const root = createRoot(document.getElementById('root'))


 
 root.render(
   //react strict mode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants. Strict mode checks are run in development mode only; they do not impact the production build
   
    <SampleDemo/>
  
 
 )
