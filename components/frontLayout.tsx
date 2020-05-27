import { Component } from "react";
import { Segment, Menu, Container } from "semantic-ui-react";
import Router from "next/router";

interface LayoutProps {
  activeItem: string;
}

class FrontLayout extends Component<LayoutProps> {
  constructor(props) {
    super(props);
  }

  handleClick = (page: any) => {
    Router.push(page);
  };

  render() {
    return (
      <>
        <Segment basic inverted attached="bottom">
          <Container>
            <Menu inverted secondary pointing>
              <Menu.Item
                onClick={() => {
                  this.handleClick("/");
                }}
                active={this.props.activeItem == "home"}
              >
                Home
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  this.handleClick("/about");
                }}
                active={this.props.activeItem == "about"}
              >
                About
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item
                  onClick={() => {
                    this.handleClick("/login");
                  }}
                  active={this.props.activeItem == "login"}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  onclick={() => {
                    this.handleClick("/register");
                  }}
                  active={this.props.activeItem == "register"}
                >
                  Register
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </Segment>
        <Container>{this.props.children}</Container>
      </>
    );
  }
}

export default FrontLayout;
