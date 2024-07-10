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
import LinearGradient from 'react-native-linear-gradient';

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

  const popularProducts = products
    ? [...products].sort((a, b) => b.count - a.count)
    : [];

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        className="p-2">
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

        <View className="mt-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-bold">Rekomendasi</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Products')}
              className="rounded-lg bg-stone-800 px-4 py-1.5">
              <Text className="text-sm text-white">Lainnya</Text>
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
              className="mt-4 flex space-x-3">
              {products?.map((product: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}>
                  <LinearGradient
                    colors={['#ECCD5F', '#C5FF7B']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    className="flex-row items-center justify-between rounded-2xl px-5 py-2">
                    <View>
                      <View className="mb-4 max-w-[100px] rounded-full border border-lime-100 bg-lime-100 py-1">
                        <Text className="text-center text-xs text-stone-800">
                          🏠 {product?.nama_toko}
                        </Text>
                      </View>

                      <Text className="max-w-[180px] text-xl font-bold text-stone-800">
                        {product?.product_name}
                      </Text>

                      <View className="mt-3">
                        <Text className="text-md text-left font-semibold text-stone-800">
                          {product?.price?.replace('RP ', 'Rp')}
                        </Text>
                      </View>
                    </View>

                    <Image
                      source={{uri: product?.image}}
                      className="h-44 w-44"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View className="mt-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-bold">Batik Terpopuler</Text>
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
              className="mt-4 flex space-x-3">
              {popularProducts?.map((product: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}>
                  <LinearGradient
                    colors={['#ECCD5F', '#C5FF7B']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    className="flex-row items-center justify-between rounded-2xl px-5 py-2">
                    <View>
                      <View className="mb-4 max-w-[100px] rounded-full border border-lime-100 bg-lime-100 py-1">
                        <Text className="text-center text-xs text-stone-800">
                          🏠 {product?.nama_toko}
                        </Text>
                      </View>

                      <Text className="max-w-[180px] text-xl font-bold text-stone-800">
                        {product?.product_name}
                      </Text>

                      <View className="mt-3">
                        <Text className="text-md text-left font-semibold text-stone-800">
                          {product?.price?.replace('RP ', 'Rp')}
                        </Text>
                      </View>
                    </View>

                    <Image
                      source={{uri: product?.image}}
                      className="h-44 w-44"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
