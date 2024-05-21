import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Navbar from "./components/ui/navbar/navbar"
import Register from "./pages/register"
import Login from "./pages/login"
import Properties from "./pages/properties"
import NewProperty from "./pages/new-property"
import Footer from "./components/ui/footer/footer"
import Property from "./pages/property"


function App() {

  return (
    <>
      
      <main className="flex-shrink-0">
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/new-property" element={<NewProperty />}/>
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<Property />} />
        </Routes>

      </main>

      <Footer />
    </>
  )
}

export default App