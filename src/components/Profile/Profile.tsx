import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Profile({navigation}: any) {
  const [user, setUser] = useState<any>({});

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    setUser(JSON.parse(userData || ''));
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, []),
  );

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
        <View className="mt-6 p-2">
          <Text className="text-2xl font-semibold text-slate-800">Akun</Text>
          <View className="mt-4 flex space-y-6 rounded-lg bg-white p-4">
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit')}
              className="flex flex-row items-center space-x-3">
              <AntDesign name={'user'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.termsfeed.com/live/5e1fdee7-d342-4aae-b990-74bad531c599',
                );
              }}
              className="flex flex-row items-center space-x-3">
              <AntDesign name={'infocirlceo'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Kebijakan Privasi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://nodelabs.my.id');
              }}
              className="flex flex-row items-center space-x-3">
              <AntDesign name={'shoppingcart'} size={20} color={'grey'} />
              <Text className="text-lg font-medium text-stone-700">
                Daftarkan Toko
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4 p-2">
          <Text className="text-2xl font-semibold text-slate-800">Aksi</Text>
          <View className="mt-4 flex space-y-6 rounded-lg bg-white p-4">
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://wa.me/6285157711068');
              }}
              className="flex flex-row items-center space-x-3">
              <AntDesign name={'warning'} size={20} color={'orange'} />
              <Text className="text-lg font-medium text-orange-400">
                Laporkan Masalah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center space-x-3"
              onPress={handleLogout}>
              <AntDesign name={'logout'} size={20} color={'red'} />
              <Text className="text-lg font-medium text-red-500">Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
