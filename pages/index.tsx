import { Component } from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import FrontLayout from "../components/frontLayout";

class Index extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FrontLayout activeItem="home">
        <Segment>
          <Header textAlign="center">Welcome to Your Toolbox</Header>
        </Segment>
      </FrontLayout>
    );
  }
}

export default Index;
