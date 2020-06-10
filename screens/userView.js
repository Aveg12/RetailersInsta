import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button, FlatList } from 'react-native';
//import Search from 'react-native-search-box';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './css/screenStyles';
import { ListItem, SearchBar } from 'react-native-elements';
//import { SearchBar } from 'react-native-paper';
//import { Ionicons } from '@expo/vector-icons/Fontisto';

const list = [
  {
    shopid: 1234,
    name: 'G-store',
    km: '1.2 km',
    products: [
      {
        name: 'toothpaste',
        count: 5
      },
      {
        name: 'mask',
        count: 22
      },
      {
        name: 'soap',
        count: 12
      },
    ]
  },
  {
    shopid: 1234,
    name: 'Sai-store',
    km: '3 km',
    products: [
      {
        name: 'toothpaste',
        count: 2,
      },
      {
        name: 'mask',
        count: 0
      }
    ]
  }
];

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.test = 'Welcome';
    this.dataTest = [];
    this.state = {
      search: '',
    }
  }

  // componentDidMount() {
  //  // this.getData();
  // }

  // getData = () => {
  //   const data = {
  //     shopid: 1234,
  //     name: "G-store",
  //     products": {
  //       "toothpaste": {
  //         "count": 5
  //       },
  //       "mask": {
  //         "count": 10
  //       },
  //     "soap": {
  //       "count": 20
  //       },
  //     },
  //   };
  //   this.setState({loading:true});
  //   this.dataTest = {"soap": "test"};
  //   try {
  //     this.dataTest = data;
  //     this.setResult(dataTest);
  //   } catch(e){
  //     this.setState({loading:false, error: 'Error'});
  //   }
  // }

  // setResult = (res) => {
  //   this.setState({
  //     data: [...this.state.data, ...res],
  //     temp: [...this.state.temp, ...res],
  //     error: res.error || null,
  //     loading: false,
  //   })
  // }

  // onSearch = async () => {
  //   this.setState({ searchItem });
  // };

  static navigationOptions = {
    title: 'User',
  };

  _onChangeSearch = query => {
    this.setState({ search: query });
  }

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar placeholder="Type here..." value={search} onChangeText={this._onChangeSearch} />
        <ScrollView>
          {search == '' && <View>
            {
              list.map((shopList, i) => (
                <ListItem
                  key={i}
                  title={shopList.name}
                  bottomDivider
                />
              ))
            }
          </View>
          }
          {search != '' && <View>
            {
              list.filter(shopList => shopList.products.some(productList => productList.name === search && productList.count > 0)).map((filteredList, i) => (<ListItem
                key={i}
                title={filteredList.name}
                subtitle={filteredList.km}
                bottomDivider
              >
                <Text>{filteredList.km} away</Text>
              </ListItem>
              ))
            }
          </View>
          }
        </ScrollView>
      </View>
    );
  }
}