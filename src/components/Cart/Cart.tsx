import React, {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Cart({navigation}: any) {
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCartHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/keranjang`);
      const processedCart = response?.data?.data?.map((product: any) => ({
        ...product,
        image: product?.UrlImage1.replace('./', `${process.env.API_URL}/`),
      }));
      console.log('DATA DI KERANJANG ==== ', processedCart);
      setCart(processedCart);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCartHandler();
    }, []),
  );

  const deleteProductHandler = async (id: any) => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/keranjang/delete/${id}`,
      );
      console.log(response.data);
      setCart((prevCart: any) =>
        prevCart.filter((item: any) => item.id !== id),
      );
      deleteProductAlert();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductAlert = () =>
    Alert.alert('Sukses', 'Produk berhasil dihapus.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  return (
    <SafeAreaView className="flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            className="px-2 py-4">
            <View className="flex flex-row flex-wrap justify-between px-2">
              {cart?.map((product: any) => (
                <View
                  className="mb-4 rounded-lg bg-white p-2"
                  style={{width: '48%'}}
                  key={product?.id}>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm text-slate-700">
                      {product?.total_produk} pcs
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        deleteProductHandler(product?.id);
                      }}>
                      <AntDesign name="delete" size={22} color={'red'} />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: product?.image}}
                    className="mx-auto h-28 w-28"
                  />
                  <View className="p-2">
                    <Text className="mt-2">{product?.nama_produk}</Text>
                    <Text className="mt-2 font-semibold">{product?.harga}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View className="mb-3 px-2">
            <TouchableOpacity
              onPress={() => navigation.navigate('Order')}
              className="mt-5 w-96 rounded-xl bg-stone-800 py-3">
              <Text className="text-center text-lg font-medium text-white">
                Bayar Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
