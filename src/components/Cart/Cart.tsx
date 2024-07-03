import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Cart({navigation}: any) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-4">
        <View className="flex max-w-sm flex-row flex-wrap gap-5 px-2">
          <View className="rounded-lg bg-white p-2">
            <Image
              source={require('../../assets/images/batik/batik-3.png')}
              className="mx-auto h-36 w-36 rounded-xl border-4 border-white"
            />
            <View className="p-2">
              <Text className="mt-2">Batik Gajah Oling</Text>
              <Text className="mt-2 font-semibold">Rp175.000</Text>
            </View>
            <View className="flex flex-row items-center justify-between p-2">
              <View className="flex flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() => {
                    // Add product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>
                <Text className="text-md">2</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Subtract product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <AntDesign name="delete" size={18} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="rounded-lg bg-white p-2">
            <Image
              source={require('../../assets/images/batik/batik-2.png')}
              className="mx-auto h-36 w-36 rounded-xl border-4 border-white"
            />
            <View className="p-2">
              <Text className="mt-2">Batik Gudeng</Text>
              <Text className="mt-2 font-semibold">Rp200.000</Text>
            </View>
            <View className="flex flex-row items-center justify-between p-2">
              <View className="flex flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() => {
                    // Add product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>
                <Text className="text-md">2</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Subtract product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <AntDesign name="delete" size={18} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="rounded-lg bg-white p-2">
            <Image
              source={require('../../assets/images/batik/batik-5.png')}
              className="mx-auto h-36 w-36 rounded-xl border-4 border-white"
            />
            <View className="p-2">
              <Text className="mt-2">Batik Gudeng</Text>
              <Text className="mt-2 font-semibold">Rp200.000</Text>
            </View>
            <View className="flex flex-row items-center justify-between p-2">
              <View className="flex flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() => {
                    // Add product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>
                <Text className="text-md">2</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Subtract product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <AntDesign name="delete" size={18} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="rounded-lg bg-white p-2">
            <Image
              source={require('../../assets/images/batik/batik-4.png')}
              className="mx-auto h-36 w-36 rounded-xl border-4 border-white"
            />
            <View className="p-2">
              <Text className="mt-2">Batik Gudeng</Text>
              <Text className="mt-2 font-semibold">Rp200.000</Text>
            </View>
            <View className="flex flex-row items-center justify-between p-2">
              <View className="flex flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() => {
                    // Add product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>
                <Text className="text-md">2</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Subtract product quantity logic here
                  }}
                  className="flex items-center justify-center rounded-lg p-1">
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <AntDesign name="delete" size={18} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="mb-3 px-2">
        <TouchableOpacity
          onPress={() => navigation.navigate('Order')}
          className="mt-5 rounded-xl bg-stone-800 py-3">
          <Text className="text-center text-lg font-medium text-white">
            Bayar Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
