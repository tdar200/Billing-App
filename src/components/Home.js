import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { Container, Table, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./NavbarComponent";
import CustomerForm from "./CustomerForm";

function Home() {
  const [data, setData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    ipcRenderer.send("logs:load");

    ipcRenderer.send("customer:load");

    ipcRenderer.on("customer:get", (e, logs) => {
      setCustomerData(logs);
    });

    ipcRenderer.on("logs:get", (e, logs) => {
      setData(logs);
    });
  }, []);

  console.log(data);
  console.log(customerData);

  return (
    <Container>
      <Navbar />
      <Form className='d-flex flex-row mt-2 mb-2'>
        <FormControl
          className='mr-2'
          aria-label='Search'
          placeholder='Search'
        />
        <Button
          className='ml-1'
          type='submit'
          variant='danger'
          id='button-addon2'
        >
          Search
        </Button>
      </Form>
      <CustomerForm />
      <Table className="mt-3" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Bill Issue Date</th>
            <th>Due Date</th>
            <th>Billing Month</th>
            <th>Name</th>
            <th>Email</th>
            <th>CNIC</th>
            <th>Phone No.</th>
            <th>Internet Speed</th>
            <th>Monthly Bill</th>
            <th>Remainder Balance</th>
            <th>Total Balance</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, idx) => {
              const {
                invoiceNumber,
                issueDate,
                dueDate,
                billingMonth,
                name,
                email,
                id,
                phone,
                internetSpeed,
                cost,
                prevBalance,
                total,
              } = item;

              return (
                <tr key={idx}>
                  <td>{invoiceNumber}</td>
                  <td>{new Date(issueDate).toISOString().slice(0, 10)}</td>
                  <td>{new Date(dueDate).toISOString().slice(0, 10)}</td>
                  <td>{billingMonth}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{id}</td>
                  <td>{phone}</td>
                  <td>{internetSpeed}</td>
                  <td>{cost}</td>
                  <td>{prevBalance}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
