import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

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
  }, []);

  const getProductsHandler = async () => {
    setIsRecommendationLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/produk`);
      setProducts(response?.data?.data);
      setIsRecommendationLoading(false);
    } catch (error) {
      setIsRecommendationLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProductsHandler();
    }, []),
  );

  useEffect(() => {
    if (auth) {
      console.log('INI AUTH HOME === ', JSON.stringify(auth));
    }

    const getUserData = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/verify/user`);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        console.log('INI DATA USERR === ', response);
      } catch (error) {
        console.error(error);
        await AsyncStorage.removeItem('auth');
        await AsyncStorage.removeItem('user');
      }
    };

    getUserData();
  }, [auth]);

  const popularProducts = products
    ? [...products].sort((a, b) => b.count - a.count).slice(0, 10)
    : [];

  const newestProducts = products
    ? [...products]
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
        .slice(0, 10)
    : [];

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        className="p-0">
        <View className="px-1.5 pt-1.5">
          <ImageBackground
            source={require('../../assets/images/border.png')}
            resizeMode="cover"
            imageStyle={{borderRadius: 20}}
            className="flex-row items-center justify-between rounded-2xl bg-stone-800 px-4 py-2">
            <View>
              <Text className="max-w-[120px] font-jakarta text-2xl font-bold text-white">
                Batik Asli Indonesia
              </Text>

              <View className="mt-2 rounded-full bg-orange-400 p-3">
                <Text className="text-md text-center font-jakarta font-semibold text-white">
                  Original
                </Text>
              </View>
            </View>

            <Image
              source={require('../../assets/images/batik/batik-1.png')}
              className="h-52 w-52"
            />
          </ImageBackground>
        </View>

        <View className="mt-5">
          <View className="flex flex-row items-center justify-between px-1.5">
            <Text className="font-jakarta text-xl font-bold">Rekomendasi</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Products')}
              className="rounded-lg bg-stone-800 px-4 py-1.5">
              <Text className="font-jakarta text-sm text-white">Lainnya</Text>
            </TouchableOpacity>
          </View>

          {isRecommendationLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'black'}
              className="h-44"
            />
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              className="mt-4 flex space-x-2 pl-1.5">
              {newestProducts?.map((product: any, index: number) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}>
                  <View
                    className={`flex-row items-center justify-between 
                    rounded-2xl bg-amber-400 p-4 ${
                      index === products.length - 1 ? 'mr-3' : ''
                    }`}>
                    <View className="pr-5">
                      <View className="mb-4 max-w-[100px] rounded-full border border-lime-100 bg-lime-100 py-1.5">
                        <Text className="text-center font-jakarta text-xs text-stone-800">
                          🏠 {truncateText(product?.nama_toko, 10)}
                        </Text>
                      </View>

                      <Text className="max-w-[160px] font-jakarta text-xl font-bold text-white">
                        {truncateText(product?.product_name, 26)}
                      </Text>

                      <View className="mt-3">
                        <Text className="text-md text-left font-jakarta font-semibold text-white">
                          {product?.price?.replace('RP ', 'Rp')}
                        </Text>
                      </View>
                    </View>

                    {product?.image && (
                      <Image
                        source={{
                          uri: product.image[0]?.replace(
                            './',
                            `${process.env.API_URL}/`,
                          ),
                        }}
                        className="h-36 w-36 rounded-xl"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View className="mt-5">
          <View className="flex flex-row items-center justify-between pl-1.5">
            <Text className="font-jakarta text-xl font-bold">
              Batik Terpopuler
            </Text>
          </View>

          {isRecommendationLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'black'}
              className="h-44"
            />
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              className="mt-4 flex space-x-2 pb-5 pl-1.5">
              {popularProducts?.map((product: any, index: number) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}
                  className={
                    index === popularProducts.length - 1 ? 'mr-3' : ''
                  }>
                  <View
                    className={`flex-row items-center justify-between 
                    rounded-2xl bg-lime-500 p-4 ${
                      index === products.length - 1 ? 'mr-3' : ''
                    }`}>
                    <View className="pr-4">
                      <View className="mb-4 max-w-[100px] rounded-full border border-lime-100 bg-lime-100 py-1.5">
                        <Text className="text-center font-jakarta text-xs text-stone-800">
                          🏠 {truncateText(product?.nama_toko, 10)}
                        </Text>
                      </View>

                      <Text className="max-w-[160px] font-jakarta text-xl font-bold text-white">
                        {truncateText(product?.product_name, 26)}
                      </Text>

                      <View className="mt-3">
                        <Text className="text-md text-left font-jakarta font-semibold text-white">
                          {product?.price?.replace('RP ', 'Rp')}
                        </Text>
                      </View>
                    </View>

                    {product?.image && (
                      <Image
                        source={{
                          uri: product.image[0]?.replace(
                            './',
                            `${process.env.API_URL}/`,
                          ),
                        }}
                        className="h-36 w-36 rounded-xl"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
