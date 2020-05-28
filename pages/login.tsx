import { Component, SyntheticEvent } from "react";
import FrontLayout from "../components/frontLayout";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import axios from "axios"
import router from "next/router"
import { isNullOrUndefined } from "util";

class Login extends Component<{}> {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this)
  }

  componentDidMount() {
    console.log(localStorage.getItem("sessionID"));
  }

  userLogin(e: React.FormEvent<HTMLFormElement>) {
    var form = new FormData(e.currentTarget)

    axios.post("/api/login", {
      uname: form.get("uname"),
      pword: form.get("pword")
    }).then((response) => {
      window.localStorage.setItem

      if (form.get("remember")) {
        window.localStorage.setItem("uname", form.get("uname").toString())
      }
      router.push("/[user]", `/${response.data.userID}`)
    })


  }

  render() {
    return (
      <FrontLayout activeItem="login">
        <Header content="Login" />
        <Segment>
          <Form onSubmit={this.userLogin}>
            <Form.Field name="uname" control="input" required label="Username" />
            <Form.Field
              name="pword"
              control="input"
              required
              type="password"
              label="Password"
              Password
            />
            <Form.Group>
              <Form.Button content="Submit" />
              {/*<Form.Checkbox name="remember" label="Remember Me" />*/}
            </Form.Group>
          </Form>
        </Segment>
      </FrontLayout>
    );
  }
}

export default Login;
