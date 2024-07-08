import axios from 'axios';
import {useEffect, useState} from 'react';
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

export default function EmailVerification({route, navigation}: any) {
  const {email} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  console.log(email);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);
    const userEmail = email;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/email/verify-code`,
        {
          email: userEmail,
          code: data.code,
        },
      );
      console.log('REGISTER RESPONSE === ', response.data);
      const email = data?.email;
      navigation.navigate('EmailVerification', {email});
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      verifyErrorAlert();
    }
  };

  const verifyErrorAlert = () =>
    Alert.alert('Gagal Verifikasi', 'Kode yang Anda masukkan tidak valid.', [
      {
        text: 'Oke',
        onPress: () => console.log('Oke pressed'),
      },
    ]);

  useEffect(() => {
    const sendRequestCodeVerification = async () => {
      try {
        const response = await axios.post(
          `${process.env.API_URL}/email/request-verification`,
          {email},
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    sendRequestCodeVerification();
  }, []);
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View>
        <View className="mb-8 max-w-[250px]">
          <Text className="text-center text-lg font-semibold text-slate-800">
            Verifikasi Email
          </Text>
          <Text className="text-center">
            Kami telah mengirimkan kode verifikasi, cek email Anda!
          </Text>
        </View>
        <View>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Kode verifikasi"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="rounded-full border border-slate-300 p-4"
              />
            )}
            name="code"
          />
          {errors.code && (
            <Text className="mt-2 pl-4 text-red-500">
              Kode verifikasi wajib diisi
            </Text>
          )}
        </View>
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
              Kirim
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
