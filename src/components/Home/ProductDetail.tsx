import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import images from '../../assets/images/batik/image';

export default function ProductDetail({route, navigation}: any) {
  const {product} = route.params;
  console.log(product);
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="pt-5">
        <View className="px-6">
          <Image
            source={images[product.image as keyof typeof images]}
            className="mx-auto"
          />
          <Text className="mt-4 text-center text-2xl font-semibold text-slate-800">
            {product.name}
          </Text>
        </View>
        <View className="p-4">
          <View className="mt-4 flex space-y-6 rounded-lg bg-white px-6 py-5">
            <View className="flex flex-row justify-between">
              <Text className="text-xl font-semibold text-slate-800">
                {product.price}
              </Text>
              <Text className="text-md rounded-lg bg-lime-300 px-4 py-2 font-semibold text-slate-800">
                Tersedia
              </Text>
            </View>
            <View>
              <Text className="mb-2 font-semibold text-slate-500">
                Deskripsi
              </Text>
              <Text className="">{product.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="px-2 py-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          className="mt-5 rounded-lg bg-stone-800 py-3">
          <Text className="text-center text-lg font-medium text-white">
            Masukkan ke Keranjang
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
