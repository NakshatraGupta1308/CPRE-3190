/*
  Author: Nakshatra Gupta
  ISU Netid: ng1308@iastate.edu
  Date: November 17th, 2026
  Robots.jsx - GET /listRobots (all robots) and GET /:id (one robot)
*/
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Form, Button, Alert } from "react-bootstrap";

const API = "http://127.0.0.1:8080";

const RobotCard = ({ robot }) => (
  <Card className="h-100">
    <Card.Img
      variant="top"
      src={robot.imageUrl}
      style={{ height: "350px", objectFit: "contain" }}
      alt={robot.name}
    />
    <Card.Body>
      <Card.Title style={{ fontSize: "18px" }}>
        {robot.name} <small className="text-muted">(id: {robot.id})</small>
      </Card.Title>
      <Card.Text style={{ color: "#000000" }}>
        <strong>Price:</strong> ${Number(robot.price).toFixed(2)}
      </Card.Text>
      <Card.Text style={{ color: "#000000" }}>
        <strong>Description:</strong> {robot.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

const Robots = () => {
  const [robots, setRobots] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [oneRobot, setOneRobot] = useState(null);
  const [message, setMessage] = useState("");

  // GET all robots
  function getRobots() {
    fetch(`${API}/listRobots`)
      .then((response) => response.json())
      .then((data) => {
        setRobots(data);
      })
      .catch((error) => {
        console.error("Error fetching Robots:", error);
        setMessage("Could not reach the backend. Is it running on port 8080?");
      });
  }

  // GET one robot by id
  function getRobotById(event) {
    event.preventDefault();
    setOneRobot(null);
    setMessage("");
    fetch(`${API}/${searchId}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Robot with id ${searchId} not found`);
        return response.json();
      })
      .then((data) => setOneRobot(data))
      .catch((error) => {
        console.error("Error fetching Robot:", error);
        setMessage(error.message);
      });
  }

  useEffect(() => {
    getRobots();
  }, []);

  return (
    <>
      <Container>
        <h1>Robots</h1>

        <Form onSubmit={getRobotById} className="d-flex gap-2 mb-3" style={{ maxWidth: 360 }}>
          <Form.Control
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Find robot by ID"
            required
          />
          <Button type="submit">Find</Button>
          {(oneRobot || message) && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                setOneRobot(null);
                setMessage("");
                setSearchId("");
              }}
            >
              Clear
            </Button>
          )}
        </Form>

        {message && <Alert variant="warning">{message}</Alert>}

        {oneRobot ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            <Col>
              <RobotCard robot={oneRobot} />
            </Col>
          </Row>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4 d-flex flex-row align-items-stretch">
            {robots.map((robot) => (
              <Col key={robot.id}>
                <RobotCard robot={robot} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Robots;
