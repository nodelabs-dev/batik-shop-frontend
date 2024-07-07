import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function History({navigation}: any) {
  const [history, setHistory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const getHistoryHandler = async () => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/pesanan`);
      setHistory(response?.data?.data);
      setIsHistoryLoading(false);
    } catch (error) {
      console.error(error);
      setIsHistoryLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getHistoryHandler();
    }, []),
  );

  console.log('RESPONSE HISTORY === ', history);
  return (
    <SafeAreaView className="flex flex-1">
      {isHistoryLoading ? (
        <View className="flex flex-1 items-center justify-center">
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" className="px-3">
          {history ? (
            <View>
              {history?.map((order: any) => (
                <View
                  className="mt-3 flex space-y-4 rounded-xl border border-slate-300 bg-white px-6 py-4"
                  key={order.ID}>
                  {order?.Keranjang?.map((product: any) => (
                    <View className="flex flex-row space-x-4" key={product.ID}>
                      <View className="rounded-lg bg-slate-100">
                        <Image
                          className="h-20 w-20"
                          source={require('../../assets/images/batik/batik-2.png')}
                        />
                      </View>
                      <View className="flex flex-1">
                        <Text className="text-md font-bold text-slate-800">
                          {product?.NamaProduk}
                        </Text>
                        <Text className="">
                          {product?.harga?.replace('RP ', 'Rp')}
                        </Text>
                        <Text className="mt-3">
                          {product?.total_produk} Pcs
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View className="rounded-lg bg-slate-100 p-4">
                    <View className="flex flex-row items-start justify-between">
                      <View className="flex space-y-2">
                        <Text className="text-slate-700">Jumlah Item</Text>
                        <Text className="text-slate-700">Ongkos Kirim</Text>
                      </View>
                      <View className="flex space-y-2">
                        <Text className="font-medium">
                          {order?.total_produk} Pcs
                        </Text>
                        <Text className="font-medium">{order?.ongkir}</Text>
                      </View>
                    </View>
                    <View className="mt-6 flex flex-row items-center justify-between">
                      <View>
                        <Text className="text-lg font-semibold">
                          {order?.total_harga?.replace('RP ', 'Rp')}
                        </Text>
                        <Text className="text-xs text-slate-700">
                          Belum dibayar
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Order', {order})}
                        className="rounded-lg bg-stone-800 px-6 py-3">
                        <Text className="text-center font-medium text-white">
                          Bayar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="">
              <Text className="text-center ">Riwayat Pembayaran Kosong</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
