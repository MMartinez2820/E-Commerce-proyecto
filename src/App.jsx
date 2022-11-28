import NavBar from './components/NavBar'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import IsLoading from './components/IsLoading'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'
import Container from 'react-bootstrap/Container'


function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (

    <HashRouter>
      <NavBar />
      {isLoading &&
        <IsLoading />}
      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/purchases' element={<Purchases />}></Route>
          <Route path='/products/:id' element={<ProductsDetail />}></Route>
        </Routes>
      </Container>

    </HashRouter>
  )
}

export default App
