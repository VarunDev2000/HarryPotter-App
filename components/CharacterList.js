import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CardView from 'react-native-cardview';

import colors  from "../config/colors";


class CharacterList extends Component {

  state = {
    houseColour : {Gryffindor : '#740001',Slytherin : '#2A623D',Hufflepuff : '#ebaa00', Ravenclaw : '#222F5B'},
  }

render(){
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      style={{ width: "100%",alignSelf:"center"}}
      data={this.props.data}
      ListFooterComponent={<View style={{height: 50}}/>}
      renderItem={({ item }) => (

      <CardView
      style={[styles.cardOuterLayout, { backgroundColor: this.state.houseColour[item.house] }]}
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={7}>
        <View style={{ margin: 0 }}>
          <View style={[styles.cardInnerLayout, {marginBottom: item.house != "" ? (3) : (0),}]}>
            <Image style={styles.cardImage} source={{uri: item.image}} />
            <View style={styles.cardInfoLayout}>
              <Text style={styles.cardHeading}>{item.name}</Text>
              <Text style={{marginTop:10}}>{item.dateOfBirth === "" ? ('-') : (item.dateOfBirth)}</Text>
              <Text numberOfLines={1} style={styles.cardPlayedBy}>Played by {item.actor}</Text>
              <TouchableOpacity activeOpacity={.4} onPress={() => this.props.navigate('DetailedScreen', {data: this.props.data,name: item.name})}>
                <Text style={styles.moreInfo}>Click for more info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CardView>

      )}
    />
  );
}
};

const styles = StyleSheet.create({
  cardOuterLayout:{
    width:"94%",
    alignSelf:"center",
    borderRadius: 7,
    margin: 5,
    marginTop:10,
    marginBottom: 0,
    elevation: 20,
    backgroundColor: "white",
  },
  cardInnerLayout: {
    flex: 0,
    padding: 0,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 3
  },
  cardInfoLayout: {
    flex:1,
    padding:15,
  },
  cardHeading: {
    fontSize:16,
    fontWeight:"bold",
    width:"95%",
  },
  cardPlayedBy:{
    marginTop:10,
    width:"95%",
    fontSize:12,
    fontStyle:"italic",
  },
  cardImage: {
    width:"25%",
    height:"100%",
    resizeMode : "stretch"
  },
  moreInfo: {
    fontSize:12,
    fontWeight:"normal",
    width:"100%",
    textAlign:"right",
    alignSelf:"flex-end",
    marginRight:5,
    marginTop:10,
    color:colors.linkColor
  },
});

export default CharacterList;