import { Form, Button } from 'react-bootstrap';
const DepartureForm = ({ editDepartureTime }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="hour"> Hour </Form.Label>
        <Form.Control id={"hour"} type="text"></Form.Control>
        <Form.Label htmlFor="minutes"> Minutes </Form.Label>
        <Form.Control id={"minutes"} type="text"></Form.Control>
        <Form.Label htmlFor="Select"> Select  </Form.Label>
        <Form.Control id={"amPm"} as={"select"}>
          <option value={"am"}>Am</option>
          <option value={"pm"}>Pm</option>
        </Form.Control>
        <Button onClick={editDepartureTime}>change</Button>
      </Form.Group>
    </Form>
  );
};

export default DepartureForm;
