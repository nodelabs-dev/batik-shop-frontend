import {SafeAreaView, ScrollView, Text, View} from 'react-native';

export default function History() {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-4 ">
        <View className="">
          <Text className="text-center ">Riwayat Pembayaran Kosong</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
