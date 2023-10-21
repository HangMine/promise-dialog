import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Demo1View from './views/Demo1View'
import { DialogProvider } from 'promise-dialog-react'
import { Modal } from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DialogProvider ModalComponent={Modal}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <Demo1View></Demo1View>
      </DialogProvider>
    </>
  )
}

export default App
