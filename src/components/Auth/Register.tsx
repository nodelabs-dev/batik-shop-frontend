import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

export default function Register({navigation}: any): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Login');
  };
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
                placeholder="Nama Lengkap"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-full border border-slate-300 p-4"
              />
            )}
            name="username"
          />
          {errors.username && (
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
          onPress={handleSubmit(onSubmit)}
          className="mt-5 rounded-full bg-amber-500 p-3">
          <Text className="text-center text-xl font-semibold text-white">
            Daftar
          </Text>
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
