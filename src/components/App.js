import React from "react";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import InvoiceForm from "./InvoiceForm";
import CustomerList from "./CustomerList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='customer' element={<CustomerList />} />
        <Route path='invoice' element={<InvoiceForm />} />
      </Routes>
    </Router>
  );
};

export default App;
