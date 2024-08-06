import './App.css'
import Downloader from './components/Downloader'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <div>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <Header />
        <Downloader/>
      </div>
    </>
  )
}

export default App
