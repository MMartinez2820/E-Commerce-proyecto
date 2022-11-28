import React, { useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  const productList = useSelector(state => state.products);
  const { id } = useParams(); // jala del app.jsx Del rutas del app.jsx

  const productDetail = productList.find(product => product.id === Number(id))
  //me devuelve la primera coincidencia el find, con esto queda mejor, pues el filter me devuleve todas las coincidencias.

  // console.log(productList)
  // console.log(productDetail)

  //creando variables para mostrar los productos similares:
  const similarProduct = productList.filter(product => product.category.id === productDetail.category.id)
  // console.log(similarProduct);


  return (
    <div >
      <h1>{productDetail?.title}</h1>

      <Row>
        <Col lg={9}>
          <p>{productDetail?.description}</p>
          <img src={productDetail?.productImgs
          [0]} alt="img" className='img-fluid' />
        </Col>
        <Col lg={3}>
          <h2>Relative Products</h2>
          <ListGroup variant>
            {similarProduct.map(prod => (

              <ListGroup.Item key={prod.id}>
                <Link to={`/products/${prod?.id}`}>
                  {prod.id !== productDetail.id &&
                    <div>
                      <p>{prod?.title}</p>
                      <img src={prod.productImgs[0]} alt="imgs" style={{ width: 200 }} />
                    </div>
                  }
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>


  )
}

export default ProductsDetail

// hacer el useeffect para traer el arreglo lo que se creo en productacs tank