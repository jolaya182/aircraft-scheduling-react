import {Form, Button } from "react-bootstrap";

const DepartureForm = ({ editDepartureTime }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="hour"> hour </Form.Label>
        <Form.Control id={"hour"} type="text"></Form.Control>
        <Form.Label htmlFor="minutes"> minutes </Form.Label>
        <Form.Control id={"minutes"} type="text"></Form.Control>
        <Form.Label htmlFor="amPm"> Select </Form.Label>
        <Form.Control id={"amPm"} as="select">
          <option value={"am"}>am</option>
          <option value={"pm"}> pm</option>
        </Form.Control>
        <Button onClick={editDepartureTime}>change</Button>
      </Form.Group>
    </Form>
  );
};

export default DepartureForm;
