import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Image
} from "react-native";
import { debounce } from "lodash";
import request from "../utils/request";

export default class main extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this.searchMovies = this.searchMovies.bind(this);
  }

  searchMovies = debounce(text => {
    request(
      "https://www.omdbapi.com/?i=tt3896198&apikey=41728bf6&s=" + text,
      "GET"
    )
      .then(responseData => {
        if ("Search" in responseData) {
          console.log(responseData.Search);
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          console.log(this);
          this.setState({
            dataSource: ds.cloneWithRows(responseData.Search)
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    //console.log("http://www.omdbapi.com/?i=tt3896198&apikey=41728bf6&s=" + text);
    /*
    fetch("https://www.omdbapi.com/?i=tt3896198&apikey=41728bf6&s=" + text)
      .then((response) => response.json())
      .then(responseData => {
        if ("Search" in responseData) {
          console.log(responseData.Search);
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          console.log(this);
          this.setState({
            dataSource: ds.cloneWithRows(responseData.Search)
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
      */
  }, 500);

  renderRow(row) {
    return (
      <View style={styles.listItem}>
        <Image source={{ uri: row.Poster }} style={styles.poster} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{row.Title}</Text>
          <Text style={styles.subHeading}>
            {row.Type} - {row.Year}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.listItem}
          onChangeText={this.searchMovies}
          placeholder="Enter search keyword"
        />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  inputer: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  listItem: {
    margin: 10
  },
  poster: {
    height: 75,
    width: 50
  },
  title: {
    margin: 5,
    fontSize: 15
  },
  subHeading: {
    margin: 5,
    fontSize: 12
  }
});
