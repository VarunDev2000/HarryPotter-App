import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, StyleSheet, StatusBar,Text, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

import CharacterList from '../components/CharacterList';
import colors from '../config/colors';


class HomeScreen extends Component {

    state = {
        height: Dimensions.get("screen").height,
        activityIndicatorVisible : true,
        data : []
    }

    componentDidMount(){
        this.getDataFromApi();
    }

    getDataFromApi = async () => {
        try {
          let response = await fetch(
            'https://hp-api.herokuapp.com/api/characters'
          );
          let json = await response.json();
          //console.log(json);
          this.setState({ data: json, activityIndicatorVisible: false })
        } catch (error) {
           console.error(error);
        }
      };
    
  render() {
    return (

        <SafeAreaView style={{ height: this.state.height }}>
        <StatusBar backgroundColor="black" />

        <View style={{flex:1, backgroundColor: colors.bgColor}}>
          <View style={styles.topLayout}>
            <Icon name="flash" size={23} color={colors.flashIconColor}/>
            <Text style={styles.pageTitle}>CHARACTER  BIO </Text>
            <Icon name="flash" size={23} color={colors.flashIconColor}/>
          </View>

          <View style={styles.bottomLayout}>  
              <CharacterList data = {this.state.data} navigate = {this.props.navigation.navigate}/>
          </View>
        </View>

        {
          this.state.activityIndicatorVisible ? (
          <View style={styles.loadingStyle}>  
            <ActivityIndicator size={40} color="black" />
            <Text style={styles.loadingTextStyle}>Loading</Text>
          </View>
          ) : (null)
        }

        </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
    topLayout: {
      flexDirection:"row",
      height:"7%",
      width:"100%",
      backgroundColor: "black",
      alignItems:"center",
      justifyContent:"center",
      elevation : 15
    },
    bottomLayout: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    loadingStyle: {
      flex: 1,
      position:"absolute",
      backgroundColor: colors.bgColor,
      justifyContent:"center",
      alignItems:"center",
      alignSelf:"center",
      top:"40%",
    },
    loadingTextStyle: {
      fontWeight:"bold",
      width:"200%",
      textAlign:"center",
      alignSelf:"center",
      marginTop:10
    },
    pageTitle: {
      fontSize:15,
      fontWeight:"bold",
      color:colors.secondary,
      marginLeft:10,
      marginRight:5
    },
  });

export default HomeScreen;