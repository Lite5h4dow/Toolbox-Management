import { Component } from "react";
import { Container, Segment, Header } from "semantic-ui-react";
import FrontLayout from "../components/frontLayout";

const Index = (props) => {
  return (
    <FrontLayout activeItem="home">
      <Segment>
        <Header textAlign="center">Welcome to Your Toolbox</Header>
      </Segment>
    </FrontLayout>
  );
}


export default Index;
