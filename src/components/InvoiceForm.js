import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { ipcRenderer, ipcMain } from "electron";
import Navbar from "./NavbarComponent";

const InvoiceForm = () => {

  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [billingMonth, setBillingMonth] = useState(new Date());
  const [internetSpeed, setInternetSpeed] = useState(0);
  const [cost, setCost] = useState(0);
  const [prevBalance, setPrevBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });


  function showAlert(message, variant = "success", seconds = 3000) {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  }

  useEffect(() => {
    ipcRenderer.send("logs:load");

    ipcRenderer.on("logs:get", (e, logs) => {
      console.log(logs);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const item = {
      invoiceNumber,
      issueDate,
      dueDate,
      name,
      email,
      id,
      phone,
      billingMonth,
      internetSpeed,
      cost,
      prevBalance,
      total,
    };

    ipcRenderer.send("logs:add", item);
    showAlert("Log Added");
    console.log(item);
  };

  return (
    <Container>
      <Navbar />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='formBasicInvoice'>
          <Form.Label>Invoice Number</Form.Label>
          <Form.Control
            disabled
            value={invoiceNumber}
            type='text'
            placeholder='Invoice Number'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicIssueDate'>
          <Form.Label>Issue Date</Form.Label>
          <Form.Control
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            type='date'
            placeholder='Issue Date'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicDueDate'>
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type='date'
            placeholder='Due Date'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            type='text'
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Full Name'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicId'>
          <Form.Label>Identication Number</Form.Label>
          <Form.Control
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            type='number'
            placeholder='Enter ID Card Number'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            value={phone}
            maxLength='11'
            minLength='11'
            onChange={(e) => setPhone(e.target.value)}
            type='number'
            placeholder='Enter Phone Number'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicBillingMonth'>
          <Form.Label>Billing Month</Form.Label>
          <Form.Control
            required
            value={billingMonth}
            onChange={(e) => setBillingMonth(e.target.value)}
            type='date'
            placeholder='Enter Billing Month'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicInternetSpeed'>
          <Form.Label>Internet Speed</Form.Label>
          <Form.Control
            disabled
            value={internetSpeed}
            onChange={(e) => setInternetSpeed(e.target.value)}
            type='number'
            placeholder='Enter Internet Speed'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCost'>
          <Form.Label>Cost</Form.Label>
          <Form.Control
            required
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            type='number'
            placeholder='Cost'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPrevBalance'>
          <Form.Label>Previous Balance</Form.Label>
          <Form.Control
            disabled
            required
            value={prevBalance}
            type='number'
            placeholder='Previous Balance'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicTotal'>
          <Form.Label>Total</Form.Label>
          <Form.Control
            disabled
            required
            value={total}
            type='number'
            placeholder='Total'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default InvoiceForm;
