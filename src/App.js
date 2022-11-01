import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import InvoiceListing from "./components/InvoiceListing";
import InvoiceCreate from "./components/InvoiceCreate";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    fetchAccessToken(); //Fetch App Access Token 
  }, []);

  useEffect(() => {
    getUserProfile(); //Get user profile details
  }, [accessToken]);


  const fetchAccessToken = async () => {
    await Axios.post(
      "https://sandbox.101digital.io/token?tenantDomain=carbon.super",
      {
        client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
        client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
        grant_type: "password",
        scope: "openid",
        username: "dung+octopus4@101digital.io",
        password: "Abc@123456",
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    ).then((response) => {
      setAccessToken(response.data.access_token);
      localStorage.setItem('access_token', JSON.stringify(response.data.access_token)); //Set org_token token to local storage
    }).catch((error) => {
      console.log("AXIOS ERROR ACCESS TOKEN: ", error);
    })
  };

  const getUserProfile = async () => {
    await Axios.get(
      "https://sandbox.101digital.io/membership-service/1.2.0/users/me",
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
      }
    ).then((response) => {
      localStorage.setItem('org_token', JSON.stringify(response.data.data.memberships[0].token)); //Set org_token token to local storage
    }).catch((error) => {
      console.log("AXIOS ERROR USER PROFILE: ", error);
    })
  }

  return (
    <div className="App">
      <h1>
        <b>SimpleInvoice Application</b>
        <br /> 
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InvoiceListing />}></Route>
          <Route path='/invoice/create' element={<InvoiceCreate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
