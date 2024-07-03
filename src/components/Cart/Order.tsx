import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Order({navigation}: any) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-4">
        <View className="flex flex-row justify-between space-x-10 rounded-lg border border-slate-300 bg-white px-6 py-4">
          <View className="flex space-y-3">
            <Text className="text-slate-700">Nama Pemesan</Text>
            <Text className="text-slate-700">Nomor Hp</Text>
            <Text className="text-slate-700">Alamat</Text>
          </View>
          <View className="flex w-1/2 space-y-3">
            <Text className="font-medium">Sincan Maulana</Text>
            <Text className="font-medium">085157711068</Text>
            <Text className="font-medium">
              Jl. Suyudono No.59 Badegan, Ponorogo
            </Text>
          </View>
        </View>
        <View className="mt-3 flex space-y-4 rounded-lg border border-slate-300 bg-white px-6 py-4">
          <View className="flex flex-row space-x-4">
            <View className="rounded-lg bg-slate-100">
              <Image
                className="h-28 w-28"
                source={require('../../assets/images/batik/batik-2.png')}
              />
            </View>
            <View className="flex flex-1">
              <Text className="text-lg font-semibold text-slate-800">
                Batik Gajah Oleng
              </Text>
              <Text className="mt-2">Rp150.000</Text>
              <Text className="mt-2">1x</Text>
            </View>
          </View>
          <View className="flex flex-row space-x-4">
            <View className="rounded-lg bg-slate-100">
              <Image
                className="h-28 w-28"
                source={require('../../assets/images/batik/batik-5.png')}
              />
            </View>
            <View className="flex flex-1">
              <Text className="text-lg font-semibold text-slate-800">
                Batik Gajah Duduk
              </Text>
              <Text className="mt-2">Rp100.000</Text>
              <Text className="mt-2">3x</Text>
            </View>
          </View>
        </View>
        <View className="mt-3 flex flex-row justify-between space-x-10 rounded-lg border border-slate-300 bg-white px-6 py-4">
          <View className="flex space-y-3">
            <Text className="text-slate-700">Jumlah item</Text>
            <Text className="text-slate-700">Total harga barang</Text>
            <Text className="text-slate-700">Ongkir</Text>
            <Text className="font-bold text-slate-700">Total pesanan</Text>
          </View>
          <View className="flex w-1/2 space-y-3">
            <Text className="font-normal">4 item</Text>
            <Text className="font-normal">Rp450.000</Text>
            <Text className="font-normal">Rp11.000</Text>
            <Text className="font-bold">Rp461.000</Text>
          </View>
        </View>
      </ScrollView>
      <View className="mb-3 px-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          className="mt-5 rounded-xl bg-stone-800 py-3">
          <Text className="text-center text-lg font-medium text-white">
            Buat Pesanan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
