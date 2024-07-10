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
import {priceTotalWithoutOngkir} from '../../lib';

export default function Order({route, navigation}: any) {
  const {order} = route.params;
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  console.log('ORDER DATA ===== ', order);

  const postPaymentTransaction = async (id: any) => {
    setIsPaymentLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/send/${id}`);
      console.log(response.data);
      navigation.replace('SuccessHistory');
      setIsPaymentLoading(false);
    } catch (error) {
      console.error(error);
      setIsPaymentLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        className="p-4">
        <View className="flex flex-row justify-between space-x-10 rounded-lg border border-slate-300 bg-white px-6 py-4">
          <View className="flex space-y-3">
            <Text className="text-slate-700">Nama Pemesan</Text>
            <Text className="text-slate-700">Nomor Hp</Text>
            <Text className="text-slate-700">Alamat</Text>
          </View>
          <View className="flex w-1/2 space-y-3">
            <Text className="font-medium">{order?.fullname}</Text>
            <Text className="font-medium">{order?.phone_number}</Text>
            <Text className="font-medium">{order?.address}</Text>
          </View>
        </View>
        <View className="mt-3 flex space-y-4 rounded-lg border border-slate-300 bg-white px-6 py-4">
          {order?.Keranjang?.map((product: any) => (
            <View className="flex flex-row space-x-4" key={product.ID}>
              <View className="rounded-lg bg-slate-100">
                <Image
                  className="h-20 w-20"
                  source={require('../../assets/images/batik/batik-2.png')}
                />
              </View>
              <View className="flex flex-1">
                <Text className="text-lg font-bold text-slate-800">
                  {product?.NamaProduk}
                </Text>
                <Text className="">{product?.harga?.replace('RP ', 'Rp')}</Text>
                <Text className="mt-3">{product?.total_produk} Pcs</Text>
              </View>
            </View>
          ))}
        </View>
        <View className="mt-3 flex flex-row justify-between space-x-10 rounded-lg border border-slate-300 bg-white px-6 py-4">
          <View className="flex space-y-3">
            <Text className="text-slate-700">Jumlah item</Text>
            <Text className="text-slate-700">Total harga barang</Text>
            <Text className="text-slate-700">Ongkos kirim</Text>
            <Text className="font-bold text-slate-700">Total pesanan</Text>
          </View>
          <View className="flex w-1/2 space-y-3">
            <Text className="font-normal">{order?.total_produk} Item</Text>
            <Text className="font-normal">
              {priceTotalWithoutOngkir(order?.ongkir, order?.total_harga)}
            </Text>
            <Text className="font-normal">
              {order?.ongkir?.replace('RP ', 'Rp')}
            </Text>
            <Text className="font-bold">
              {order?.total_harga?.replace('RP ', 'Rp')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="mb-3 px-2">
        <TouchableOpacity
          disabled={isPaymentLoading}
          onPress={() => {
            postPaymentTransaction(order?.ID);
          }}
          className="mt-5 flex items-center justify-center rounded-xl bg-stone-800 py-3">
          {isPaymentLoading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text className="text-center text-lg font-medium text-white">
              Buat Pesanan
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
