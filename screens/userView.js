import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from 'react-native-elements';
import styles from './css/screenStyles';

const list = [
  {
    shopid: 1234,
    name: 'G-store',
    km: '1.2 km',
    zone: 'Green',
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
      {
        name: 'deo',
        count: 10
      },
      {
        name: 'sanitizer',
        count: 5
      },
    ]
  },
  {
    shopid: 1234,
    name: 'Sai-store',
    km: '3 km',
    zone: 'Orange',
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
  },
  {
    shopid: 1234,
    name: 'Medicine-store',
    km: '3 km',
    zone: 'Red',
    products: [
      {
        name: 'crocin',
        count: 2,
      },
      {
        name: 'mask',
        count: 20,
      },
      {
        name: 'glucose',
        count: 10, 
      }
    ]
  }
];

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  static navigationOptions = {
    title: 'User',
  };

  _onChangeSearch = query => {
    this.setState({ search: query });
  }

  render() {
    const { search } = this.state;

    return (
      <ImageBackground source={require('./image/Inventory.jpg')} style={styles.container}>
        <SearchBar placeholder="Type here..." value={search} onChangeText={this._onChangeSearch} />
        <ScrollView>
          {search == '' && <View>
            {
              list.map((shopList, i) => (
                <ListItem
                  key={i}
                  title={shopList.name}
                  subtitle={shopList.zone}
                  badge={{value : shopList.km, textStyle: { fontSize: 15 }}}
                  titleStyle={{ color: 'blue', fontSize: 20 }}
                  subtitleStyle={{ color: shopList.zone.toLowerCase() }}
                  bottomDivider
                />
              ))
            }
          </View>
          }
          {search != '' && <View>
            {
              list.filter(shopList => shopList.products.some(productList => productList.name === search.toLowerCase() && productList.count > 0)).map((filteredList, i) => (<ListItem
                key={i}
                title={filteredList.name}
                subtitle={filteredList.zone}
                titleStyle={{ color: 'blue', fontSize: 20 }}
                subtitleStyle={{ color: filteredList.zone.toLowerCase() }}
                badge={{value : filteredList.km, textStyle: { fontSize: 15 }}}
                bottomDivider
              >
              </ListItem>
              ))
            }
          </View>
          }
        </ScrollView>
      </ImageBackground>
    );
  }
}