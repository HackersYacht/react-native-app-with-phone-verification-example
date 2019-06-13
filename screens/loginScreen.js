import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner
} from "native-base";

import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    message: ""
  };

  login() {
    const { phone } = this.state;
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithPhoneNumber(phone)
      .then(confirmRes => {
        this.props.navigation.navigate("Verify", {
          confirmRes: confirmRes
        });
      })
      .catch(err => {
        this.setState({ loading: false, message: err.message });
      });
  }

  moveToSignUp() {
    //move to the signUpScreen
    this.props.navigation.navigate("SignUp");
  }

  render() {
    const { loading, message } = this.state;

    return (
      <Container>
        <Content
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}
        >
          {/*this will be the place to this the spinner and the error message*/}
          {loading ? <Spinner color="blue" /> : <Text>{message}</Text>}

          <Form>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input
                onChangeText={phone => this.setState({ phone })}
                autoFocus
              />
            </Item>
          </Form>

          <Button
            block
            style={{ marginVertical: 20 }}
            onPress={() => this.login()}
          >
            <Text>Login</Text>
          </Button>

          <Text style={{ alignSelf: "center" }}>Or</Text>

          <Button
            block
            light
            style={{ marginVertical: 10 }}
            onPress={() => this.moveToSignUp()}
          >
            <Text>Create an account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
