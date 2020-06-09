import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './css/screenStyles';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Retailers Insta',
        };
        
    render(){
        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.buttonContainer}> 
                    <View style={styles.button}>
                        <Button title="User" onPress={()=> this.props.navigation.navigate('User')}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button title="Shop Keeper"></Button>
                    </View>
                </View>
              </ScrollView>
            </View>
          );
    }
}