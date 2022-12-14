import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    data["phone"] = "1234567890";
    data["role"] = "admin";
    axios
      .post(`https://e-commerce-api.academlo.tech/api/v1/users`, data)
      .catch((error) => {
          alert(error.response?.data.message);
      })
      .then((res) => 
      {
        if(res?.status === 201) {
          alert("User successfully created!")
          navigate("/login")
        }
      })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formPlainTextName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            {...register("firstName")}
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPlainTextLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("lastName")}
            type="text"
            placeholder="Enter last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" className="btn btn-dark">
          Submit
        </Button>
      </Form>
      <div style={{ marginTop: "25px" }}>
        Have an account? <Link to={`/login/`}>Sign In</Link>
      </div>
    </motion.div>
  );
};

export default Register;
