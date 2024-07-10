import axios from 'axios';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ProductDetail({route, navigation}: any) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {product} = route.params;
  console.log('INI DETAIL PRODUCT ==== ', product);

  const postCartHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/keranjang/create`,
        {
          id_produk: `${product?.ID}`,
          total: `${quantity}`,
        },
      );
      console.log('POST CART RESPONSE ---- ', response?.data);
      setIsLoading(false);
      navigation.navigate('CartStack');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        className="pt-5">
        <View className="px-6">
          <Image
            source={{uri: product?.image}}
            style={{width: '100%', height: 300}}
            className="mx-auto"
          />
          <Text className="mt-4 text-center text-2xl font-semibold text-slate-800">
            {product?.product_name}
          </Text>
        </View>
        <View className="p-4">
          <View className="mt-4 flex space-y-6 rounded-lg bg-white px-6 py-5">
            <View className="flex flex-row justify-between">
              <Text className="text-xl font-semibold text-slate-800">
                {product?.price}
              </Text>
              <Text className="text-md rounded-lg bg-lime-300 px-4 py-2 font-semibold text-slate-800">
                Tersedia
              </Text>
            </View>
            <View>
              <Text className="mb-2 font-semibold text-slate-500">
                Deskripsi
              </Text>
              <Text className="">{product?.deskripsi}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex flex-row items-center justify-around px-2 py-2">
        <View className="flex w-[80%] flex-row items-center justify-center space-x-4 rounded-lg bg-stone-800">
          <TouchableOpacity
            disabled={quantity === 1 ? true : false}
            onPress={() => {
              setQuantity(quantity - 1);
            }}
            className="flex flex-row items-center justify-center rounded-lg px-6 py-4">
            <AntDesign name="minus" size={20} color={'white'} />
          </TouchableOpacity>
          <Text className="ext-center text-lg font-semibold text-slate-100">
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
            }}
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
    </SafeAreaView>
  );
}
