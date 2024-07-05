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
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}: any): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      phoneNumber: '',
      fullname: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/user/register`,
        {
          Email: data.email,
          Fullname: data.fullname,
          PhoneNumber: data.phoneNumber,
          Password: data.password,
        },
      );
      console.log('REGISTER RESPONSE === ', response.data);
      navigation.navigate('Login');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      console.log('INI REGISTER ASYNC ==== ', userData);
    };

    getUserData();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-4">
        <View className="mt-10 w-full flex-1 items-center justify-center">
          <Image
            source={require('../../assets/images/logo.png')}
            className="mb-3 h-28 w-28 flex-row items-center justify-center rounded-full"
          />
          <Text className="text-2xl font-semibold">Selamat datang!</Text>
        </View>
        <View className="mt-10">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
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
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Nama Lengkap"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border border-slate-300 p-4"
              />
            )}
            name="fullname"
          />
          {errors.fullname && (
            <Text className="mt-2 pl-4 text-red-500">
              Nama lengkap wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Nomor WhatsApp"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border border-slate-300 p-4"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text className="mt-2 pl-4 text-red-500">
              Nomor WhatsApp wajib diisi
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Buat Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border border-slate-300 p-4"
              />
            )}
            name="password"
          />
        </View>
        {errors.password && (
          <Text className="mt-2 pl-4 text-red-500">Password wajib diisi</Text>
        )}
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-5 flex flex-row items-center justify-center space-x-3 rounded-full bg-amber-500 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="text-center text-xl font-semibold text-white">
              Daftar
            </Text>
          )}
        </TouchableOpacity>
        <View className="mt-5 flex-row justify-center">
          <Text>Sudah punya akun?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-amber-600"> Masuk disini</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
