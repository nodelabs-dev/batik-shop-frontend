import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const tabCategories = [
  {
    id: 1,

    name: 'Batik Solo',
  },

  {
    id: 2,

    name: 'Batik Yogyakarta',
  },

  {
    id: 3,

    name: 'Batik Ngawi',
  },

  {
    id: 4,

    name: 'Batik Ponorogo',
  },

  {
    id: 5,

    name: 'Batik Magetan',
  },
];

const latestBatik = [
  {
    id: 1,

    name: 'Batik Jodeg',

    price: 'Rp200.000',

    image: require('../../assets/images/batik/batik-3.png'),
  },

  {
    id: 2,

    name: 'Batik Jodeg',

    price: 'Rp200.000',

    image: require('../../assets/images/batik/batik-1.png'),
  },

  {
    id: 3,

    name: 'Batik Jodeg',

    price: 'Rp200.000',

    image: require('../../assets/images/batik/batik-2.png'),
  },

  {
    id: 4,

    name: 'Batik Jodeg',

    price: 'Rp200.000',

    image: require('../../assets/images/batik/batik-4.png'),
  },
];

export default function Home({navigation}: any) {
  const [auth, setAuth] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);

  useEffect(() => {
    const getUserLogin = async () => {
      const data = await AsyncStorage.getItem('auth');

      if (data) {
        setAuth(JSON.parse(data));
      }
    };

    getUserLogin();

    const getProductsHandler = async () => {
      setIsRecommendationLoading(true);
      try {
        const response = await axios.get(`${process.env.API_URL}/produk`);
        const processedProducts = response?.data?.data?.map((product: any) => ({
          ...product,
          image: product.image[0].url_image1.replace(
            './',
            `${process.env.API_URL}/`,
          ),
        }));
        setProducts(processedProducts);
        setIsRecommendationLoading(false);
      } catch (error) {
        console.error(error);
        setIsRecommendationLoading(false);
      }
    };

    getProductsHandler();
  }, []);

  useEffect(() => {
    if (auth) {
      console.log('INI AUTH HOME === ', JSON.stringify(auth));
    }

    const getUserData = async () => {
      const response = await axios.get(`${process.env.API_URL}/verify/user`);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      console.log('INI DATA USER === ', response.data);
    };

    getUserData();
  }, [auth]);

  console.log('INI HOME PRODUCTS === ', products);
  console.log(`${process.env.API_URL}`);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-2">
        <View className="flex-row items-center justify-between rounded-2xl bg-stone-800 px-4 py-2">
          <View>
            <Text className="max-w-[120px] text-2xl font-bold text-white">
              Batik Asli Indonesia
            </Text>

            <View className="mt-2 rounded-full bg-orange-400 p-3">
              <Text className="text-md text-center font-semibold text-white">
                Original
              </Text>
            </View>
          </View>

          <Image
            source={require('../../assets/images/batik/batik-1.png')}
            className="h-52 w-52"
          />
        </View>

        <ScrollView horizontal className="flex space-x-3 py-2">
          {tabCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              className="rounded-full bg-stone-800 px-5 py-3">
              <Text className="text-lg font-medium text-white">
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="mt-10">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-bold">Rekomendasi</Text>

            {/* <TouchableOpacity className="rounded-lg bg-stone-800 px-4 py-1.5">
              <Text className="text-sm text-white">Lainnya</Text>
            </TouchableOpacity> */}
          </View>

          {isRecommendationLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'black'}
              className="h-44"
            />
          ) : (
            <ScrollView horizontal className="mt-4 flex space-x-3">
              {products?.map((product: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}
                  className="flex-row items-center justify-between rounded-2xl bg-gray-200 px-6 py-2">
                  <View>
                    <Text className="max-w-[120px] text-2xl font-bold text-stone-800">
                      {product?.product_name}
                    </Text>

                    <View className="mt-3">
                      <Text className="text-md text-left font-semibold text-stone-800">
                        {product?.price?.replace('RP ', 'Rp')}
                      </Text>
                    </View>
                  </View>

                  <Image source={{uri: product?.image}} className="h-44 w-44" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View className="mt-10">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-bold">Batik Terpopuler</Text>

            {/* <TouchableOpacity className="rounded-lg bg-stone-800 px-4 py-1.5">
              <Text className="text-sm text-white">Lainnya</Text>
            </TouchableOpacity> */}
          </View>

          <ScrollView horizontal className="mt-4 flex space-x-3">
            {latestBatik.map(product => (
              <View
                key={product.id}
                className="flex-row items-center justify-between rounded-2xl bg-gray-200 px-6 py-2">
                <View>
                  <Text className="max-w-[120px] text-2xl font-bold text-stone-800">
                    {product.name}
                  </Text>

                  <View className="mt-3">
                    <Text className="text-md text-center font-semibold text-stone-800">
                      {product.price}
                    </Text>
                  </View>
                </View>

                <Image source={product.image} className="h-44 w-44" />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
