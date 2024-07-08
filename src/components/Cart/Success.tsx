import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Success({navigation}: any) {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View className="p-4">
        <View className="mx-auto mb-7 flex h-44 w-44 items-center justify-center rounded-full bg-yellow-400">
          <AntDesign name="check" size={100} color={'green'} />
        </View>
        <Text className="max-w-[350px] text-center text-lg text-slate-800">
          Pesanan mu sudah kami terima dan akan segera dipersiapkan, silakan cek
          email Anda untuk detail pembayaran!
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HistoryStack')}
            className="mt-5 rounded-lg bg-stone-800 py-3">
            <Text className="text-center text-lg text-white">
              Lihat Riwayat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
