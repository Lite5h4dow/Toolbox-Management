import { Component } from "react";
import FrontLayout from "../components/frontLayout";
import { Segment, Form } from "semantic-ui-react";

class Login extends Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(localStorage.getItem("sessionID"));
  }

  render() {
    return (
      <FrontLayout activeItem="login">
        <Segment>
          <Form>
            <Form.Field control="input" required label="Username" />
            <Form.Field
              control="input"
              required
              type="password"
              label="Password"
              Password
            />
            <Form.Group>
              <Form.Field control={"Button"} content="Login" type="submit" />
              <Form.Field
                name="rememberMe"
                control="Checkbox"
                label="Remember Me"
              />
            </Form.Group>
          </Form>
        </Segment>
      </FrontLayout>
    );
  }
}

export default Login;
