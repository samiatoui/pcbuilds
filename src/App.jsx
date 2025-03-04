import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Components/Header'
import Contact from './Pages/Contact'
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Prebuilts from './Pages/Prebuilts';
import Service from './Pages/Service';
import Admin from './Pages/Admin';
import ProductDetail from './Components/ProductDetails';
import { AddToCart } from './Components/AddToCart';
function App() {

  return (
    <>
      <div>
        <Header />
      </div>
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="prebuilts" element={<Prebuilts />} />
        <Route path="services" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cms" element={<Admin />} />
        <Route path="/prebuilts/:id" element={<ProductDetail />} />
        <Route path="/checkout"  element={<AddToCart />} />

      </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
