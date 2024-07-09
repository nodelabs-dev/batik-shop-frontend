import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Login({navigation}: any): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.API_URL}/user/login`, {
        Email: data.email,
        Password: data.password,
      });
      await AsyncStorage.setItem('auth', JSON.stringify(response.data));
      console.log(response.data);
      navigation.navigate('MainTabs');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      loginErrorAlert();
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('auth');
      console.log('INI LOGIN ASYNC ==== ', userData);
    };

    getUserData();
  }, []);

  const loginErrorAlert = () =>
    Alert.alert('Gagal Masuk', 'Email atau password Anda salah.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  return (
    <SafeAreaView className="p-5">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-4">
        <View className="mt-10 w-full flex-1 items-center justify-center">
          <Image
            source={require('../../assets/images/login-ill.png')}
            className="flex-row items-center justify-center"
          />
          <Text className="text-2xl font-semibold">Selamat datang!</Text>
        </View>
        <View className="mt-10">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="rounded-full border border-slate-300 p-4"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="mt-2 pl-4 text-red-500">Email wajib diisi</Text>
          )}

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View className="relative mt-6">
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="rounded-full border border-slate-300 p-4 pr-12"
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-6 top-3">
                  {isPasswordVisible ? (
                    <FeatherIcon name="eye" size={24} color={'orange'} />
                  ) : (
                    <FeatherIcon name="eye-off" size={24} color={'orange'} />
                  )}
                </Pressable>
              </View>
            )}
            name="password"
          />
          <View
            className={`flex flex-row items-center ${errors.password ? 'justify-between' : 'justify-end'}`}>
            {errors.password && (
              <Text className="mt-2 pl-4 text-red-500">
                Password wajib diisi
              </Text>
            )}
            <Pressable
              onPress={() => navigation.navigate('ForgetPassword')}
              className="mt-1">
              <Text className="text-right text-lg text-amber-600">
                Lupa password?
              </Text>
            </Pressable>
          </View>
        </View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-10 flex flex-row items-center justify-center space-x-3 rounded-full bg-amber-500 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="text-center text-xl font-semibold text-white">
              Masuk
            </Text>
          )}
        </TouchableOpacity>
        <View className="mt-5 flex-row items-center justify-center">
          <Text className="h-14 text-lg">Belum punya akun?</Text>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            className="h-14">
            <Text className="text-lg text-amber-600"> Daftar disini</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
