import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function History({navigation}: any) {
  const [history, setHistory] = useState<any>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const getHistoryHandler = async () => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/pesanan`);
      const sortedHistory = response?.data?.data?.sort(
        (a: any, b: any) =>
          (new Date(b?.created_at) as any) - (new Date(a?.created_at) as any),
      );
      setHistory(sortedHistory);
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
    <SafeAreaView className="flex flex-1 justify-center">
      {isHistoryLoading ? (
        <View className="flex flex-1 items-center justify-center">
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <>
          {history ? (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              className="px-2">
              <View>
                {history?.map((order: any) => (
                  <View
                    className="mt-3 flex space-y-4 rounded-xl border border-slate-300 bg-white px-6 py-4"
                    key={order.ID}>
                    {order?.Keranjang?.map((product: any) => (
                      <View
                        className="flex flex-row space-x-4"
                        key={product.ID}>
                        <View className="rounded-lg bg-slate-100">
                          <Image
                            className="h-20 w-20"
                            source={{
                              uri:
                                process.env.API_URL +
                                product?.UrlImage1?.replace('./', '/'),
                            }}
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
                            {order?.status === 'Proses'
                              ? 'Belum Dibayar'
                              : 'Sudah Dibayar'}
                          </Text>
                        </View>
                        {order?.status === 'Proses' ? (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('HistoryOrder', {order})
                            }
                            className="rounded-lg bg-stone-800 px-6 py-3">
                            <Text className="text-center font-medium text-white">
                              Bayar
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL('https://wa.me/6285157711068');
                            }}
                            className="flex flex-row items-center space-x-2 rounded-lg bg-stone-800 px-6 py-3">
                            <FontAwesome
                              name="whatsapp"
                              size={18}
                              color={'white'}
                            />
                            <Text className="text-center font-medium text-white">
                              Chat Penjual
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View className="">
              <Text className="text-center text-lg">Riwayat Kosong</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
