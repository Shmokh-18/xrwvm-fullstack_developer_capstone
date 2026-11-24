import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    setError("");

    const register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      setError("The user with the same username is already registered");
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "5% auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Sign Up</h2>
        <a href="/" onClick={() => { gohome(); }} style={{ fontSize: "1.5rem" }}>×</a>
      </div>
      <form onSubmit={register}>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" className="form-control" placeholder="Username"
                 onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" className="form-control" placeholder="First Name"
                 onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" className="form-control" placeholder="Last Name"
                 onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="form-control" placeholder="Email"
                 onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="form-control" placeholder="Password"
                 onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={gohome}>Cancel</button>
      </form>
    </div>
  );
};

export default Register;
