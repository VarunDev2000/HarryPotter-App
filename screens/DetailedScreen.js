import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image, Text } from "react-native";
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/Ionicons';

import InfoTable from '../components/InfoTable';
import ImagePaths from './res/ImagePaths';
import colors  from "../config/colors";

class DetailedScreen extends Component {

  state = {
    height: Dimensions.get("screen").height,
    houseColour : {Gryffindor : '#740001',Slytherin : '#2A623D',Hufflepuff : '#ebaa00', Ravenclaw : '#222F5B'},
    houseSubColour : {Gryffindor : '#ebaa00',Slytherin : '#b8b8b8',Hufflepuff : '#000', Ravenclaw : '#946B2D'},

    data: {},

    otherInfoTableTitle: [],
    otherInfoTableData: [],

    wandInfoTableTitle: [],
    wandInfoTableData: []
  }

  componentDidMount(){
    this.prepareData();
  }

  prepareData = () => {
    //console.log(this.props.route.params.data);
    let data = this.props.route.params.data;
    let name = this.props.route.params.name;

    for(var i = 0; i < data.length; i++){
      if(data[i]['name'] === name){
        //console.log(data[i]);
        this.setState({data : data[i]})
        this.setTableData(data[i]);
      }
    }
  }

  setTableData = (tableData) => {
    this.setState({
      otherInfoTableTitle: ['SPECIES', 'GENDER', 'YEAR OF BIRTH','ANCESTRY','EYE COLOUR','HAIR COLOUR','HOGWARTS STUDENT','HOGWARTS STAFF','ALIVE'],
      otherInfoTableData: [[tableData.species != "" ? (tableData.species) : ("-")],[tableData.gender != "" ? (tableData.gender) : ("-")],[tableData.yearOfBirth != "" ? (tableData.yearOfBirth) : ("-")],[tableData.ancestry != "" ? (tableData.ancestry) : ("-")],[tableData.eyeColour != "" ? (tableData.eyeColour) : ("-")],[tableData.hairColour != "" ? (tableData.hairColour) : ("-")],[tableData.hogwartsStudent == true ? ("Yes") : (tableData.hogwartsStudent == false ? ("No") : ("-"))],[tableData.hogwartsStaff == true ? ("Yes") : (tableData.hogwartsStaff == false ? ("No") : ("-"))],[tableData.alive == true ? ("Yes") : (tableData.alive == false ? ("No") : ("-"))]],
      wandInfoTableTitle: ['WOOD', 'CORE', 'LENGTH'],
      wandInfoTableData: [[tableData.wand.wood != "" ? (tableData.wand.wood) : ("-")],[tableData.wand.core != "" ? (tableData.wand.core) : ("-")],[tableData.wand.length != "" ? (tableData.wand.length) : ("-")]],
    })
  }



  render() {
    return (
      <SafeAreaView style={{ height: this.state.height }}>
      <StatusBar backgroundColor="black" />

      <View style={{flex:1, backgroundColor: colors.bgColor}}>
        <View style={[styles.topLayout,{backgroundColor : this.state.data['house'] != "" ? (this.state.houseColour[this.state.data['house']]) : ("black")}]}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.goBack()}>
            <Icon name="md-arrow-back-sharp" size={30} color={this.state.data['house'] != "" ? (this.state.houseSubColour[this.state.data['house']]) : (colors.secondary)} style ={{marginLeft:20}}/>
          </TouchableOpacity>
          <Text style={[styles.pageTitle,{color:this.state.data['house'] != "" ? (this.state.houseSubColour[this.state.data['house']]) : (colors.secondary)}]}>{this.state.data['name']}</Text>
          <TouchableOpacity activeOpacity={1} onPress={null}>
            <Icon name="md-arrow-back-sharp" size={30} color={this.state.data['house'] != "" ? (this.state.houseColour[this.state.data['house']]) : ("black")} style ={{marginRight:20}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLayout}>
          <ScrollView showsVerticalScrollIndicator={true}>

            <CardView
            style = {{ backgroundColor: colors.white,marginBottom:5,marginTop:10 }}
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={2}>
              <Text style = {styles.houseAndPatronusHeadingTitle}>Personal Information</Text>
            </CardView>
            <CardView
            style={styles.tableCard}
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={2}>
              <InfoTable color={this.state.data['house'] != "" ? (this.state.houseColour[this.state.data['house']]) : ("black")} tableTitle = {this.state.otherInfoTableTitle} tableData = {this.state.otherInfoTableData}/>
            </CardView>

            <CardView
            style = {{ backgroundColor: colors.white,marginBottom:5,marginTop: 10 }}
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={2}>
              <Text style = {styles.houseAndPatronusHeadingTitle}>Wand Information</Text>
            </CardView>
            <CardView
            style={styles.tableCard}
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={2}
            ListFooterComponent={<View style={{height: 50}}/>}>
              <InfoTable color={this.state.data['house'] != "" ? (this.state.houseColour[this.state.data['house']]) : ("black")} tableTitle = {this.state.wandInfoTableTitle} tableData = {this.state.wandInfoTableData}/>
            </CardView>
            
            <CardView
            style = {{ backgroundColor: colors.white,marginBottom:5,marginTop:10 }}
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={2}>
              <Text style = {styles.houseAndPatronusHeadingTitle}>House and Patronus</Text>
            </CardView>
            <View style = {styles.houseAndPatronusLayout}>
              <CardView
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={2}
              style={styles.houseAndPatronusCard}>
                <Image style={styles.cardImage} source={this.state.data['house'] != "" ? (ImagePaths.house[String(this.state.data['house']).replace(/ /g, '')]) : (ImagePaths.house['unknown'])} />
                <Text numberOfLines={1} style={[styles.cardImageTitle,{color: this.state.data['house'] != "" ? (this.state.houseColour[this.state.data['house']]) : ("black")}]}>{this.state.data['house'] != "" ? (this.state.data['house']) : ("Unknown")}</Text>
              </CardView>
              <CardView
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={2}
              style={styles.houseAndPatronusCard}>
                <Image style={styles.cardImage} source={this.state.data['patronus'] != "" ? (ImagePaths.patronus[String(this.state.data['patronus']).replace(/ /g, '')]) : (ImagePaths.patronus['unknown'])} />
                <Text numberOfLines={1} style={styles.cardImageTitle}>{this.state.data['patronus'] != "" ? (this.state.data['patronus']) : ("Unknown")}</Text>
              </CardView>
            </View>

            <View style={{height: 50}}/>
          </ScrollView>  
        </View>
      </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topLayout: {
    flexDirection:"row",
    height:"7%",
    width:"100%",
    backgroundColor: colors.primary,
    alignItems:"center",
    justifyContent:"space-between",
    elevation : 15
  },
  bottomLayout: {
      flex: 1,
      backgroundColor: colors.bgColor,
  },
  houseAndPatronusHeadingTitle: {
    width: "90%",
    fontSize:14,
    fontWeight:"bold",
    textAlign:"center",
    alignSelf:"center",
    padding:10,
  },
  houseAndPatronusLayout: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: colors.bgColor,
  },
  houseAndPatronusCard: {
    width:"46%",
    margin:"2%",
    backgroundColor:colors.white,
  },
  cardImage: {
    width:"100%",
    height:180,
    resizeMode : "stretch"
  },
  cardImageTitle: {
    width:"90%",
    fontSize: 12,
    fontWeight:"bold",
    color:"#119bcf",
    padding:8,
    alignSelf:"center",
    textAlign:"center",
    textTransform:'uppercase',
  },
  tableCard: {
    width:"96%",
    margin:"2%",
    backgroundColor:colors.secondary,
    elevation:5,
    borderRadius:5,
  },
  pageTitle: {
    width:"60%",
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold",
    color:colors.secondary,
  },
});

export default DetailedScreen;