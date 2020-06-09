import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import UserView from './screens/userView';


const Stack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    User: { screen: UserView },
  },
  {
    initialRouteName: 'Home',
  }
);

export default AppStack = createAppContainer(Stack);

// export class App extends Component {
//   render(){
//     return (
//       <AppStack/>
//       // <View style={styles.container}>
//       //   {/* {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />} */}
//       //   <NavigationContainer linking={LinkingConfiguration}>
//       //     <Stack.Navigator>
//       //       <Stack.Screen name="Root" component={BottomTabNavigator} />
//       //     </Stack.Navigator>
//       //   </NavigationContainer>
//       // </View>
//     );
//   }  
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
