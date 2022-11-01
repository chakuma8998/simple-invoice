import "../App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function InvoiceCreate() {

  const accessToken = JSON.parse(localStorage.getItem('access_token')); //Get access_token from local storage
  const orgToken = JSON.parse(localStorage.getItem('org_token')); //Get org_token from local storage

  const [invoiceReference, setInvoiceReference] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const [itemReference, setItemReference] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemUOM, setItemUOM] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalAmont, setTotalAmont] = useState("");


  useEffect(() => {
    getTotal(); //get Total amount
  }, [quantity, rate]);

  const getTotal =  () => {
    //calculate total amount based on rate and quantity
    const total = rate * quantity;
    setTotalAmont(total);
  }

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    const ItemData = [{ itemReference, itemName, itemUOM, rate, quantity }]; //Item details array
    const invoiceData = { invoiceReference, invoiceNumber, currency, invoiceDate, dueDate, description, ItemData }; //Invoice related details

    const invoiceDataList = { //Invoice data list
      "listOfInvoices": [invoiceData]
    }

    //Calling create invoice API
    Axios.post(
      "/invoice-service/1.0.0/invoices",
      invoiceDataList,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
          'Operation-Mode': 'SYNC',
          'org-token': orgToken,
        },
      }

    ).then((response) => {
      alert('Saved successfully.'); //Showing successful message 
      navigate('/');
    }).catch((error) => {
      console.log("AXIOS ERROR ADD INVOICE: ", error);
    })

  }

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ "textAlign": "left" }}>
              <div className="card-title text-center">
                <h2>Create Invoice</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="form-group">
                      <label>Invoice Reference</label>
                      <input value={invoiceReference} onChange={e => setInvoiceReference(e.target.value)} required className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Invoice Number</label>
                      <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Currency</label>
                      <input value={currency} onChange={e => setCurrency(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Invoice Date</label>
                      <input value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Due Date</label>
                      <input value={dueDate} onChange={e => setDueDate(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <input value={description} onChange={e => setDescription(e.target.value)} className="form-control"></input>
                    </div>
                  </div>
                  <div className="card-title mt-3">
                    <h3>Item Details</h3>
                  </div>
                  <div className="card-title mt-3">
                    <table className="table table-bordered">
                      <thead className="bg-dark text-white">
                        <tr className="text-center">
                          <td>Item Reference</td>
                          <td>Item Name</td>
                          <td>UOM</td>
                          <td>Rate</td>
                          <td>Quantity</td>
                          <td>Total Amont</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td><input className="form-control" value={itemReference} onChange={e => setItemReference(e.target.value)} ></input></td>
                          <td><input className="form-control" value={itemName} onChange={e => setItemName(e.target.value)} ></input></td>
                          <td><input className="form-control" value={itemUOM} onChange={e => setItemUOM(e.target.value)} ></input></td>
                          <td><input className="form-control" name="rate" value={rate} onChange={e => setRate(e.target.value)} type="number"></input></td>
                          <td><input className="form-control" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} type="number"></input></td>
                          <td><input className="form-control" value={totalAmont} onChange={e => setTotalAmont(e.target.value)} type="number"></input></td>
                        </tr>
                      </tbody>

                    </table>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">Save</button>
                      <Link to="/" className="btn btn-danger">Back</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCreate;
