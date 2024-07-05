import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
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
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData || ''));
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.API_URL}/logout`);
      await AsyncStorage.removeItem('user');
      console.log(response.data);
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  console.log('INI USER DATA DI PROFILE USESTATE ==== ', user?.data?.Fullname);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-0">
        <View className="flex items-center justify-center rounded-b-3xl bg-stone-800 px-6 py-8">
          <AntDesign name={'user'} size={128} color={'white'} />
          <Text className="mt-4 text-center text-2xl font-semibold text-white">
            {user?.data?.Fullname}
          </Text>
          <Text className="text-center text-lg text-white">
            {user?.data?.Email}
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
              onPress={handleLogout}>
              <AntDesign name={'logout'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
