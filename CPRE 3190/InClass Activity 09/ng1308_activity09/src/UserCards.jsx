import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card } from 'react-bootstrap';

export function UserCard(props) {
  return (
    <Container className="p-4">
      <Card style={{ width: "22rem" }} className="mx-auto shadow-sm">
        <Card.Img
          variant="top"
          src={props.picture}
          alt={props.name}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text className="mb-1">Salary: $ {props.amount}</Card.Text>
          <Card.Text className="mb-1">Married: {props.married ? "Yes" : "No"}</Card.Text>
          <Card.Text>
            Address: {props.address.street}, {props.address.city}, {props.address.state}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
