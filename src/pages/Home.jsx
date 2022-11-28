import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk, thunkFilterType, thunkInputName } from '../store/slices/products.slice';
import { Button, Card, Col, InputGroup, ListGroup, Row } from 'react-bootstrap'
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products)


  useEffect(() => {
    dispatch(getProductsThunk())
    axios
      .get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategory(res.data.data.categories))
  }, [])

  // console.log(products);

  //creo un useState para tener la lista de las categorias:
  const [category, setCategory] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  // console.log(category);
  return (
    <div >
      <Row>
        <Col lg={5}>
          <ListGroup>
            {category.map((cat) => (
              <ListGroup.Item
                style={{ cursor: 'pointer' }}
                key={cat.id}
                onClick={() => dispatch(thunkFilterType(cat.id))}>{cat.name}</ListGroup.Item>
              // <Button
              //   key={cat.id}
              //   onClick={() => dispatch(thunkFilterType(cat.id))}
              // >
              //   {cat.name}
              // </Button>
            ))}
          </ListGroup>

        </Col>
        <Col lg={7}>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button
              variant='outline-secondary'
              onClick={() => dispatch(thunkInputName(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={2} className='g-4'>
            {products?.map((product) => (
              <Col key={product.id}>
                <Card>
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card.Body>
                      <Card.Img variant='top'
                        src={product.productImgs[0]}
                        style={{ height: 200, width: 200 }}
                      />
                      <Card.Title>
                        <h2>{product.title}</h2>
                      </Card.Title>
                      <Card.Text className='' style={{ fontSize: 25 }}>
                        {product.price}


                      </Card.Text>
                    </Card.Body>
                  </Link>
                  <Card.Text>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home