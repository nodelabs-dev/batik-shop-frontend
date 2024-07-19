import axios from 'axios';
import {useEffect, useState} from 'react';
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

export default function ProductDetail({route, navigation}: any) {
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
  const {product} = route.params;

  useEffect(() => {
    const getProductOnCartById = async () => {
      setIsScreenLoading(true);
      try {
        const totalProduct = Number(product?.total_produk);
        console.log(totalProduct);
        setQuantity(totalProduct);
        setIsScreenLoading(false);
      } catch (error) {
        console.error(error);
        setIsScreenLoading(false);
      }
    };

    getProductOnCartById();
  }, []);

  const putCartHandler = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `${process.env.API_URL}/keranjang/update/${product?.id}`,
        {
          TotalProduk: quantity,
        },
      );
      setIsLoading(false);
      navigation.navigate('Cart');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log('CART ID ===== ', product?.id);

  const filteredImages = product?.image
    ?.filter((img: any) => img && img?.trim() !== '')
    ?.map((img: any) => `${process.env.API_URL}/${img?.replace('./', '')}`);

  return (
    <SafeAreaView className="flex-1">
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
              {product?.nama_produk}
            </Text>
            <View className="mx-auto mt-2 w-20 rounded-full bg-yellow-300 px-2 py-2">
              <Text className="text-center text-xs font-semibold text-slate-800">
                Tersedia
              </Text>
            </View>
            <View className="mt-6 flex flex-row justify-between">
              <Text className="text-xl font-semibold text-slate-800">
                {product?.harga}
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
          onPress={putCartHandler}
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
