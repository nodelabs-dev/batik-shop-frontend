import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Profile({navigation}: any) {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-0">
        <View className="rounded-b-3xl bg-stone-800 px-6 py-8">
          <Image
            source={require('../../assets/images/profile.jpeg')}
            className="mx-auto h-32 w-32 rounded-full border-4 border-white"
          />
          <Text className="mt-4 text-center text-2xl font-semibold text-white">
            Sincan Maulana
          </Text>
        </View>
        <View className="mt-6 p-4">
          <Text className="text-2xl font-semibold text-slate-800">Akun</Text>
          <View className="mt-4 flex space-y-6 rounded-lg bg-white p-4">
            <TouchableOpacity className="flex flex-row items-center space-x-3">
              <AntDesign name={'user'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center space-x-3">
              <AntDesign name={'infocirlceo'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Kebijakan Privasi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center space-x-3">
              <AntDesign name={'shoppingcart'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Daftarkan Toko
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-4">
          <Text className="text-2xl font-semibold text-slate-800">Aksi</Text>
          <View className="mt-4 flex space-y-6 rounded-lg bg-white p-4">
            <TouchableOpacity className="flex flex-row items-center space-x-3">
              <AntDesign name={'warning'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Laporkan Masalah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center space-x-3"
              onPress={() => navigation.navigate('Login')}>
              <AntDesign name={'logout'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
