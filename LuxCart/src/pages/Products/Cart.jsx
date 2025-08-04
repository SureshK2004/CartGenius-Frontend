import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get('/api/cart/');
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, delta) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    try {
      await axiosInstance.patch(`/api/cart/items/${itemId}/update/`, {
        quantity: newQuantity,
      });
      fetchCart();
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

 const handleRemoveItem = async (productId) => {
  try {
    await axiosInstance.delete(`/api/cart/remove/${productId}/`);
    fetchCart();
  } catch (err) {
    console.error('Failed to remove item', err);
  }
};

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.product.price || 0) * item.quantity,
      0
    ).toFixed(2);
  };

  const handlePayment = (method) => {
    alert(`Its happy to see you select a ${method} This option is now unavailable, but great choices await! �✨ Thank you for your interest—explore more`);
  };

  if (loading) return <p className="text-center my-5">Loading cart...</p>;

  if (cartItems.length === 0) {
    return <Container className="text-center py-5"><h2>Your cart is empty 🛍️—Fill it with joy! Start shopping now!</h2>

    </Container>;
  }

  return (
    <Container className="py-5">
      <h1 className="text-center text-primary mb-4">🛒 Your Smart Cart</h1>
      <Table bordered hover responsive className="shadow-sm">
        <thead className="bg-light text-center">
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="align-middle">
              <td>{item.product.name}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, -1)}><FaMinus /></Button>
                  <span>{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, 1)}><FaPlus /></Button>
                </div>
              </td>
              <td>₹{Number(item.product.price || 0).toFixed(2)}</td>
              <td>₹{(Number(item.product.price || 0) * item.quantity).toFixed(2)}</td>
              <td className="text-center">
                <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="my-4">
        <Col md={6}>
          <h4 className="text-success">Total: ₹{getTotalPrice()}</h4>
        </Col>
        <Col md={6} className="text-end d-flex gap-3 justify-content-end">
          <Button variant="primary" size="lg" onClick={() => handlePayment('Online Payment')}>
            Pay Now
          </Button>
          <Button variant="warning" size="lg" onClick={() => handlePayment('Cash on Delivery')}>
            Cash on Delivery
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
