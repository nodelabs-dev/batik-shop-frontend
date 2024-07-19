import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function ProductDetail({route, navigation}: any) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
  const {product} = route.params;

  const [user, setUser] = useState<any>(null);

  const getUserData = async () => {
    setIsScreenLoading(true);
    try {
      const userData = await AsyncStorage.getItem('auth');
      setUser(JSON.parse(userData || ''));
      setIsScreenLoading(false);
    } catch (error) {
      console.log(error);
      setIsScreenLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, []),
  );

  const postCartHandler = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.API_URL}/keranjang/create`, {
        id_produk: `${product?.ID}`,
        total: `${quantity}`,
      });
      setIsLoading(false);
      navigation.navigate('CartStack');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const filteredImages = product?.image
    ?.filter((img: any) => img && img?.trim() !== '')
    ?.map((img: any) => `${process.env.API_URL}/${img?.replace('./', '')}`);

  return (
    <SafeAreaView className="flex-1">
      {isScreenLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            className="pt-">
            <View className="mx-auto">
              <SliderBox
                autoplay={true}
                images={filteredImages}
                sliderBoxHeight={300}
                onCurrentImagePressed={(index: any) =>
                  console.log(`image ${index} pressed`)
                }
              />
            </View>
            <View className="p-4">
              <View className="mt-4 flex rounded-lg bg-white px-6 py-5">
                <Text className="mt-2 text-center text-2xl font-semibold text-slate-800">
                  {product?.product_name}
                </Text>
                <View className="mx-auto mt-2 w-20 rounded-full bg-yellow-300 px-2 py-2">
                  <Text className="text-center text-xs font-semibold text-slate-800">
                    Tersedia
                  </Text>
                </View>
                <View className="mt-6 flex flex-row justify-between">
                  <Text className="text-xl font-semibold text-slate-800">
                    {product?.price}
                  </Text>
                  <Text className="text-md rounded-lg bg-lime-300 px-4 py-2 font-semibold text-slate-800">
                    {product?.nama_toko}
                  </Text>
                </View>
                <View className="mt-4">
                  <Text className="mb-2 font-semibold text-slate-500">
                    Deskripsi
                  </Text>
                  <Text className="">{product?.deskripsi}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {user ? (
            <View className="flex flex-row items-center justify-around px-2 py-2">
              <View className="flex w-[80%] flex-row items-center justify-center space-x-4 rounded-lg bg-stone-800">
                <TouchableOpacity
                  disabled={quantity === 1}
                  onPress={() => setQuantity(quantity - 1)}
                  className="flex flex-row items-center justify-center rounded-lg px-6 py-4">
                  <AntDesign name="minus" size={20} color={'white'} />
                </TouchableOpacity>
                <Text className="ext-center text-lg font-semibold text-slate-100">
                  {quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  className="flex flex-row items-center justify-center rounded-lg px-6 py-4">
                  <AntDesign name="plus" size={20} color={'white'} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={postCartHandler}
                className="flex items-center justify-center rounded-lg bg-stone-800 p-3">
                {isLoading ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                  <AntDesign name="shoppingcart" size={30} color={'white'} />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View className="mx-3 mb-3">
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className="mt-5 w-full rounded-lg bg-stone-800 py-3">
                <Text className="text-center text-lg font-medium text-white">
                  Masuk terlebih dahulu
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
