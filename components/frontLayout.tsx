import React, { useState } from "react";
import { Segment, Menu, Container } from "semantic-ui-react";
import Router from "next/router";

const FrontLayout = (props) => {

  const handleClick = (page: any) => {
    Router.push(page);
  };

  return (
    <>
      <Segment basic inverted attached="bottom">
        <Container>
          <Menu inverted secondary pointing>
            <Menu.Item
              onClick={() => {
                handleClick("/");
              }}
              active={props.activeItem == "home"}
            >
              Home
              </Menu.Item>
            <Menu.Item
              onClick={() => {
                handleClick("/about");
              }}
              active={props.activeItem == "about"}
            >
              About
              </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                onClick={() => {
                  handleClick("/login");
                }}
                active={props.activeItem == "login"}
              >
                Login
                </Menu.Item>
              <Menu.Item
                onClick={() => {
                  handleClick("/register");
                }}
                active={props.activeItem == "register"}
              >
                Register
                </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
      <Container>{props.children}</Container>
    </>
  );
}

export default FrontLayout;
