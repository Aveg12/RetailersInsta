import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './css/screenStyles';

export default class UserView extends Component {
    static navigationOptions = {
        title: 'User',
        };
    render(){
        return (
            <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View> 
                    <Text>Welcome User</Text>
                </View>
              </ScrollView>
            </View>
          );
    }
}