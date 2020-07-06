import React, { Component } from 'react';
import { View, Button, Image, Alert, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import * as ImagePicker  from 'expo-image-picker';
import * as  Permissions from 'expo-permissions';
import { sendEmail } from './sendEmail';
import styles from './css/screenStyles';

const list = [
  {
    shopid: 1234,
    name: 'G-store',
    km: '1.2 km',
    zone: 'Green',
    products: [
      {
        name: 'Toothpaste',
        count: 5,
        threshold : 1,
      },
      {
        name: 'Mask',
        count: 22,
        threshold : 4.4,
      },
      {
        name: 'Sanitizer',
        count: 5,
        threshold : 1,
      },
      {
        name: 'Deo',
        count: 10,
        threshold : 2,
      },
      {
        name: 'Shop',
        count: 5,
        threshold : 1,
      },
    ]
  }
];

const resNew = {
    "images": [
      {
        "source": {
          "type": "file",
          "filename": "Dettol_soap.jpg"
        },
        "dimensions": {
          "height": 224,
          "width": 224
        },
        "objects": {
          "collections": [
            {
              "collection_id": "9fa44f8f-79ad-4d2f-b3eb-5ba527d85675",
              "objects": [
                {
                  "object": "Sanitizer",
                  "location": {
                    "left": 0,
                    "top": 29,
                    "width": 224,
                    "height": 154
                  },
                  "score": 0.9378766
                },
                {
                  "object": "Sanitizer",
                  "location": {
                    "left": 16,
                    "top": 38,
                    "width": 196,
                    "height": 140
                  },
                  "score": 0.30192587
                }
              ]
            }
          ]
        }
      }
    ]
  }

export default class ShopKeeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: null,
        responseProduct: '',
        data: list,
    }
    this.threshold = 0.9;
  }

  static navigationOptions = {
    title: 'G-Store',
  };

  selectPicture = async() => {
    //  await Permissions.askAsync(Permissions.CAMERA_ROLL);
      let result = await ImagePicker.launchCameraAsync();
      this.setState({ image:result.uri });
      this.callWatson(result.uri);
  }

  callWatson (imageUri) {
    fetch(`https://gateway.watsonplatform.net/visual-recognition/api/v4/analyze?collection_id=32370a17-5f06-4072-82cc-6cee542d9b43&images_file=${imageUri}`,{
        method: 'POST'
    }).then(response => {
        if(resNew.images.length > 0) {
            resNew.images.map(images => images.objects.collections.map(collection => 
                collection.objects.map(object => {
                    if(object.score > this.threshold) {
                        this.setState({responseProduct:object.object});
                        this.setState({ image:null});
                    }
                })))
        }
        if(this.state.responseProduct !='') {
            this.state.data.map(productList => productList.products.map((productName,j) => {
                if(this.state.responseProduct === productName.name) {
                  //  alert(JSON.stringify(this.state.data));
                    let tempData = this.state.data;
                    tempData[0].products[j].count = productName.count - 1;
                    this.setState({ data: tempData});
                    this.checkProductThreshold(productList.shopid, productList.name, productName.name, productName.count, productName.threshold);
                }
            }))
        }
    })
  }

  checkProductThreshold (shopid, shopname, productname, productcount, productthreshold) {
      if (productcount <= productthreshold){
          this.showAlert(productname, shopid, shopname);          
      }
  }

  showAlert(productname, shopid, shopname) {  
    Alert.alert(  
        'Warning',  
        `Product ${productname} is going to finish, send email to wholesaler`,  
        [   
            {text: 'OK', onPress: () => 
            sendEmail(
                'avegnagar12@gmail.com',
                `Alert mail from ShopName- ${shopname} and ShopId- ${shopid}`,
                `Product ${productname} is going to finish. Refill the required item.`
            ).then(() => {
                alert(' Our email successful provided to device mail ');
            })},  
        ]  
    );  
}  

  render() {

    return (
      <ImageBackground source={require('./image/Inventory.jpg')} style={styles.container}>
        <ScrollView>
         <View>
            {
              this.state.data.map(productList => productList.products.map((productName, j) => (
                <ListItem
                  key={j}
                  title={productName.name}
                  badge={{value : productName.count, textStyle: { fontSize: 18 }}}
                  titleStyle={{ color: 'blue', fontSize: 20 }}
                  bottomDivider
                />
              )))
            }
          </View>
          <Button title='Sell Product' onPress={this.selectPicture}/>
          {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }}/> }
        </ScrollView>
      </ImageBackground>
    );
  }
}
