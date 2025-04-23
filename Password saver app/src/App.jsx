
import './App.css'
import Footer from './Component/Footer'
import Navbar from './Component/Navbar'
import Manager from './Component/manager'

function App() {

  return (
    <>
      <Navbar />
      <div className='min-h-[87vh]' >
      <Manager />
      </div>
      <Footer/>
    </>
  )
}

export default App
