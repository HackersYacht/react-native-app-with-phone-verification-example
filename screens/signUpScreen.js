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
  Spinner,
  Left,
  Header,
  Icon,
  Body
} from "native-base";

import firebase from "react-native-firebase";

export default class SignUpScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    loading: false,
    message: ""
  };

  signUp() {
    const { email, password, name } = this.state;

    this.setState({ loading: true, message: "" });

    //call the createUser method
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        //when signUp sucess, update the user profile with his name
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name
          })
          .then(() => {
            //if the user profile has been successfully update
            //move to home
            this.props.navigation.navigate("Home");
          })
          .catch(err => {
            alert(JSON.stringify(err));
            this.props.navigation.navigate("Home", { user });
          });
      })
      .catch(err => {
        //if failure, stop the spinner and show the error message
        this.setState({ loading: false, message: err.message });
      });
  }

  render() {
    const { loading, message } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
        </Header>
        <Content
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}
        >
          {/*this will be the place to this the spinner and the error message*/}
          {loading ? <Spinner color="blue" /> : <Text>{message}</Text>}

          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={name => this.setState({ name })} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({ email })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </Item>
          </Form>

          <Button
            block
            style={{ marginVertical: 20 }}
            onPress={() => this.signUp()}
          >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
