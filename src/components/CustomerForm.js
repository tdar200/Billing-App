import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { ipcRenderer } from "electron";

function CustomerForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();

    const item = {
      name,
      id,
      phone,
    };

    ipcRenderer.send("customer:add", item);
    showAlert("Customer Added");
    console.log(item);
  };

  return (
    <>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Form className='border' onSubmit={submitHandler}>
        <Container>
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

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Container>
      </Form>
    </>
  );
}

export default CustomerForm;
