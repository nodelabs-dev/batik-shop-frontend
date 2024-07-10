import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Edit() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      Fullname: '',
      PhoneNumber: '',
      Password: '',
      Role: '',
      Address: '',
    },
  });

  const fetchtUserData = async () => {
    const response = await axios.get(`${process.env.API_URL}/verify/user`);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));

    console.log('INI DATA USER === ', response.data);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.API_URL}/verify/user/update`,
        {
          Fullname: data.Fullname,
          Email: user?.data?.Email,
          PhoneNumber: data.PhoneNumber,
          Password: user?.data?.Password,
          Address: data.Address,
        },
      );

      console.log('EDIT DATA RESPONSE ====', response.data);
      setIsLoading(false);
      fetchtUserData();
      editSuccessAlert();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const editSuccessAlert = () =>
    Alert.alert('Berhasil', 'Sukses mengubah profil pengguna.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await AsyncStorage.getItem('user');
      const userData = JSON.parse(response ?? '');
      console.log('USER DATA EDIT ====', userData);
      setUser(userData);
      reset({
        Fullname: userData?.data?.Fullname,
        PhoneNumber: userData?.data?.PhoneNumber || '',
        Password: userData?.data?.Password,
        Role: userData?.data?.Role || '',
        Address: userData?.data?.Address || '',
      });
    };

    getUserProfile();
  }, [reset]);

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <View className="mt-1">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Nama Lengkap"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="rounded-lg border border-slate-300 p-4"
              />
            )}
            name="Fullname"
          />
          {errors.Fullname && (
            <Text className="mt-2 pl-4 text-red-500">Nomor hp wajib diisi</Text>
          )}
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Nomor Telepon"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-lg border border-slate-300 p-4"
              />
            )}
            name="PhoneNumber"
          />
          {errors.PhoneNumber && (
            <Text className="mt-2 pl-4 text-red-500">Nomor hp wajib diisi</Text>
          )}

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Alamat"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mt-6 rounded-lg border border-slate-300 p-4"
              />
            )}
            name="Address"
          />
          {errors.Address && (
            <Text className="mt-2 pl-4 text-red-500">Alamat wajib diisi</Text>
          )}
        </View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-5 flex flex-row items-center justify-center space-x-3 rounded-lg bg-amber-500 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="text-center text-xl font-semibold text-white">
              Simpan
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
