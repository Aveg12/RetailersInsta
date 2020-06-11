import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './css/screenStyles';
import * as Font from 'expo-font';


export default class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            fontLoaded: false
        }
    }

    static navigationOptions = {
        title: 'Home',
    };

    // async componentDidMount() {
    //     await Font.loadAsync({
    //         'PatrickHand-Regular': require('../assets/fonts/PatrickHand-Regular.ttf')
    //     });
    //     this.setState({fontLoaded:true});
    // }

    render() {
        return (
            // <View style={styles.container}>
            //<ScrollView style={styles.container}>
            <ImageBackground source={require('./image/Inventory.jpg')} style={styles.container}>
                <View>
                    <Text style={{ color: 'blue', fontSize: 50, marginLeft: 30, marginTop: -30 }}> Retailers Insta </Text>
                </View>
                <View style={{ marginTop: 250 }}>
                    <View style={styles.button} >
                        <Button title="User" onPress={() => this.props.navigation.navigate('User')}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button style={styles.buttonStyle} title="Shop Keeper" onPress={() => this.props.navigation.navigate('Shopkeeper')}></Button>
                    </View>
                </View>
            </ImageBackground>
            //</ScrollView>
            // </View>
        );
    }
}