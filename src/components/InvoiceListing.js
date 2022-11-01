import "../App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

function InvoiceListing() {

  const accessToken = JSON.parse(localStorage.getItem('access_token')); //Get access_token from local storage
  const orgToken = JSON.parse(localStorage.getItem('org_token')); //Get org_token from local storage
  const [invoiceData, setInvoiceData] = useState([]);

  //Set table columns
  const columns = [
    {
      dataField: "referenceNo",
      text: "Reference No",
      sort: true,
    },
    {
      dataField: "invoiceNumber",
      text: "Invoice Number",
      sort: true,
    },
    {
      dataField: "currency",
      text: "Currency",
      sort: true,
    },
    {
      dataField: "invoiceDate",
      text: "Invoice Date",
      sort: true,
    },
    {
      dataField: "dueDate",
      text: "Due Date",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
  ];

  useEffect(() => {
    fetchInvoices(); //Fetch Invoices
  }, []);

  const fetchInvoices = async () => {
    //Calling Fetch Invoices API
    await Axios.get(
      "https://sandbox.101digital.io/invoice-service/1.0.0/invoices",
      {
        params: {
          pageNum: 1,
          pageSize: 100,
          sortBy: 'CREATED_DATE',
          ordering: 'DESCENDING'
        },
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'org-token': orgToken,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      setInvoiceData(response.data.data);
    }).catch((error) => {
      console.log("AXIOS ERROR INVOICES: ", error);
    })
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Invoice Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="invoice/create" className="btn btn-success">Add New Invoice (+)</Link>
          </div>
          <BootstrapTable
            bootstrap4
            keyField="invoiceId"
            columns={columns}
            data={invoiceData}
            pagination={paginationFactory({ sizePerPage: 10 })} />
        </div>
      </div>
    </div>
  );
}

export default InvoiceListing;
