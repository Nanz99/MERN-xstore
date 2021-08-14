/** @format */

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from './components/AdminRoute';
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";


export default function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/" component={HomePage} exact />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/shipping" component={ShippingAddressPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/orderhistory" component={OrderHistoryPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route path="/product/:id" component={SingleProductPage} exact/>
          <Route path="/product/:id/edit" component={ProductEditPage} exact/>

          <AdminRoute path="/productlist" component={ProductListPage} exact />
          <AdminRoute path="/orderlist" component={OrderListPage} exact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


