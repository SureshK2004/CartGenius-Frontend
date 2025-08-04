import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductDetails from './pages/Products/ProductDetail';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import { VerifyEmail, ForgotPassword, Profile } from './pages/index';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './pages/Auth/ResetPassword';
import CategoryProducts from './pages/Categories/CategoryProducts';
import Cart from './pages/Products/Cart';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/otp/verify" element={<VerifyEmail />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/password-reset-confirm/:uidb64/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
