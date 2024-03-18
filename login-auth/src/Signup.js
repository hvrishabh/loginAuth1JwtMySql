import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2 className="mb-3">Sign-Up Form</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="fw-bold">
              UserName
            </label>
            <input
              className="form-control rounded-0"
              type="text"
              placeholder="UserName"
              name="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="fw-bold">
              Email
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              placeholder="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              placeholder="Password"
              name="password"
            />
          </div>
          <button className="btn btn-success w-100">Sign Up</button>
          <p>You are agreed to our terms and condition</p>
          <Link
            to="/signup"
            className=" bg-light w-100 btn btn-default border rounded-0
            text-decoration-none"
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
