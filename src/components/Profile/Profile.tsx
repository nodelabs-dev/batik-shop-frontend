import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Profile({navigation}: any) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/verify/user`);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      setUser(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
      await AsyncStorage.removeItem('auth');
      navigation.replace('Login');
    } catch (error) {}
  };

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          className="p-0">
          <View className="flex items-center justify-center rounded-b-3xl bg-stone-800 px-6 py-8">
            <AntDesign name={'user'} size={90} color={'white'} />
            <Text className="mt-4 text-center font-jakarta text-2xl font-semibold text-white">
              {!user ? 'Tamu' : user.data?.Fullname}
            </Text>
            <Text className="text-center font-jakarta text-lg text-white">
              {!user ? '-' : user.data?.Email}
            </Text>
          </View>
          <View className="mt-5 p-0">
            <Text className="pl-1.5 font-jakarta text-xl font-semibold text-slate-800">
              Akun
            </Text>
            <View className="mt-4 flex space-y-6 rounded-none bg-white p-4">
              {user?.data ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit')}
                  className="flex flex-row items-center space-x-3">
                  <AntDesign name={'user'} size={20} color={'grey'} />
                  <Text className="font-jakarta text-lg font-medium text-stone-700">
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://www.termsfeed.com/live/5e1fdee7-d342-4aae-b990-74bad531c599',
                  );
                }}
                className="flex flex-row items-center space-x-3">
                <AntDesign name={'infocirlceo'} size={20} color={'grey'} />
                <Text className="font-jakarta text-lg font-medium text-stone-700">
                  Kebijakan Privasi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://forms.gle/6sRwSQCYy9Ggm9cs8');
                }}
                className="flex flex-row items-center space-x-3">
                <AntDesign name={'shoppingcart'} size={20} color={'grey'} />
                <Text className="font-jakarta text-lg font-medium text-stone-700">
                  Daftarkan Toko
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4">
            <Text className="pl-1.5 font-jakarta text-xl font-semibold text-slate-800">
              Aksi
            </Text>
            <View className="mt-4 flex space-y-6 bg-white p-4">
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://wa.me/6285157711068');
                }}
                className="flex flex-row items-center space-x-3">
                <AntDesign name={'warning'} size={20} color={'orange'} />
                <Text className="font-jakarta text-lg font-medium text-orange-400">
                  Laporkan Masalah
                </Text>
              </TouchableOpacity>
              {user?.data ? (
                <TouchableOpacity
                  className="flex flex-row items-center space-x-3"
                  onPress={handleLogout}>
                  <AntDesign name={'logout'} size={20} color={'red'} />
                  <Text className="font-jakarta text-lg font-medium text-red-500">
                    Keluar
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="flex flex-row items-center space-x-3"
                  onPress={() => navigation.navigate('Login')}>
                  <AntDesign name={'login'} size={20} color={'green'} />
                  <Text className="font-jakarta text-lg font-medium text-green-700">
                    Masuk
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="mx-auto mt-2">
            <Image
              source={require('../../assets/images/unmuh.png')}
              className="h-14 w-14"
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
