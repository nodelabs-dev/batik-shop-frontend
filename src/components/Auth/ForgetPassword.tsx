import axios from 'axios';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ForgetPassword({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/email/reset-password`,
        {
          Email: data.email,
        },
      );
      console.log(response.data);
      setIsLoading(false);
      resetSuccessAlert();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      resetErrorAlert();
    }
  };

  const resetSuccessAlert = () =>
    Alert.alert('Berhasil Terkirim', 'Cek email Anda untuk reset password.', [
      {
        text: 'Oke',
        onPress: () => navigation.navigate('Login'),
      },
    ]);

  const resetErrorAlert = () =>
    Alert.alert('Gagal Terkirim', 'Email yang Anda masukkan tidak terdaftar.', [
      {
        text: 'Oke',
        onPress: () => console.log('oke'),
      },
    ]);
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View className="px-4">
        <Text className="mb-3 text-center text-lg font-bold text-stone-800">
          Reset Password
        </Text>
        <View className="mt-2">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="w-72 rounded-full border border-slate-300 p-4"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="mt-2 pl-4 text-red-500">Email wajib diisi</Text>
          )}
        </View>
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="mt-3 flex flex-row items-center justify-center space-x-3 rounded-full bg-amber-500 p-3">
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-center text-xl font-semibold text-white">
                Tunggu sebentar
              </Text>
            </>
          ) : (
            <Text className="text-center text-xl font-semibold text-white">
              Reset
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
