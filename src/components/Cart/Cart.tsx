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
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const getCartHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/keranjang`);
      const processedCart = response?.data?.data?.map((product: any) => ({
        ...product,
        image: product?.UrlImage1?.replace('./', `${process.env.API_URL}/`),
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
      getCartHandler();
    } catch (error) {
      console.error(error);
    }
  };

  const postOrderHandler = async () => {
    setIsOrderLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/pesanan/create`,
      );
      console.log(response.data);
      const orderId = response.data.id;
      setIsOrderLoading(false);
      navigation.navigate('Order', {orderId});
    } catch (error) {
      console.error(error);
      setIsOrderLoading(false);
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
    <SafeAreaView className="flex flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <>
          {cart ? (
            <>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                className="px-2 py-2">
                <View className="flex flex-row flex-wrap justify-between gap-2">
                  {cart?.map((product: any) => (
                    <View
                      className="rounded-lg bg-white p-2"
                      style={{width: '47.5%'}}
                      key={product?.id}>
                      <View className="flex flex-row items-center justify-between">
                        <Text className="text-sm text-slate-700">
                          {product?.total_produk} Pcs
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
                        <Text className="mt-1 font-semibold">
                          {product?.harga?.replace('RP ', 'Rp')}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <View className="mb-3 px-2">
                <TouchableOpacity
                  disabled={isOrderLoading}
                  onPress={postOrderHandler}
                  className="mt-5 w-96 rounded-xl bg-stone-800 py-3">
                  {isOrderLoading ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    <Text className="text-center text-lg font-medium text-white">
                      Pesan Sekarang
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View>
              <Text className="text-center text-lg">Keranjang Kosong</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
