import React from "react";
import NavbarComponent from "./NavbarComponent";

function CustomerList() {
  return (
    <div>
      <NavbarComponent />
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
    </div>
  );
}

export default CustomerList;
