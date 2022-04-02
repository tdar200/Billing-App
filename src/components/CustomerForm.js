import React from 'react'
import { Container, Form, Button, Alert } from "react-bootstrap";

function CustomerForm() {
  return (
    <Container>
      <Navbar />
      <Form onSubmit={submitHandler}>
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

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CustomerForm