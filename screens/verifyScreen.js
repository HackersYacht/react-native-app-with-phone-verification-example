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

export default class VerifyScreen extends Component {
  state = {
    code: "",
    loading: false,
    message: ""
  };

  verify() {
    const { code } = this.state;
    this.setState({ loading: true });

    const { confirmRes } = this.props.navigation.getParam("confirmRes");

    confirmRes
      .confirm(code)
      .then(user => {
        this.props.navigation.navigate("Home");
      })
      .catch(err => this.setState({ loading: false, message: err.message }));
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
              <Label>Code</Label>
              <Input onChangeText={code => this.setState({ code })} autoFocus />
            </Item>
          </Form>

          <Button
            block
            style={{ marginVertical: 20 }}
            onPress={() => this.login()}
          >
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
