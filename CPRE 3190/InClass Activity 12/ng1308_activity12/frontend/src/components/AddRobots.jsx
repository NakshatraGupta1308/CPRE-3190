/*
  Author: Nakshatra Gupta
  ISU Netid: ng1308@iastate.edu
  Date: November 17th, 2026
  AddRobots.jsx - POST /addRobots
*/
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddRobots = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:8080/addRobots";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add new Robot: ${errorText}`);
      }
      const result = await response.json();
      console.log("Success:", result);
      alert("Robot added successfully!");
      setFormData({
        id: "",
        name: "",
        price: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert(`Error adding Robot: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Add Robot</h1>
      <Form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <Form.Control className="mb-3" type="number" name="id" value={formData.id}
          onChange={handleChange} placeholder="ID" required />
        <Form.Control className="mb-3" type="text" name="name" value={formData.name}
          onChange={handleChange} placeholder="Robot Name" required />
        <Form.Control className="mb-3" type="number" step="0.01" name="price" value={formData.price}
          onChange={handleChange} placeholder="Robot Price" required />
        <Form.Control className="mb-3" type="text" name="description" value={formData.description}
          onChange={handleChange} placeholder="Robot Description" required />
        <Form.Control className="mb-3" as="textarea" name="imageUrl" value={formData.imageUrl}
          onChange={handleChange} placeholder="Robot Image URL (e.g. https://robohash.org/yourname)" required />
        <Button type="submit" variant="success">Add Robot</Button>
      </Form>
    </>
  );
};

export default AddRobots;
