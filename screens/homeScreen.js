import React from "react";
import { Container, Content, Text, Card, CardItem } from "native-base";
import { FlatList, Image } from "react-native";

//import firebase from "react-native-firebase";

export default class extends React.Component {
  state = {
    data: [1, 2, 3, 4]
  };

  // componentDidMount() {
  //   let db = firebase.firestore();
  //
  //   //here we are going to get all the documents
  //   db.collection("places")
  //     .get()
  //     .then(snapshot => {
  //       let data = [];
  //
  //       snapshot.forEach(doc => {
  //         data = [...data, { ...doc.data(), id: doc.id }];
  //         this.setState({ data: data });
  //       });
  //     });
  // }

  render() {
    let { data } = this.state;
    return (
      <Container>
        <Content>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri:
                        "https://i.ytimg.com/vi/XuJwETp1axs/maxresdefault.jpg"
                    }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            )}
          />
        </Content>
      </Container>
    );
  }
}
