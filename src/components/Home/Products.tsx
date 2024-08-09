import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {capitalizeFirstLetter} from '../../lib';
import AntDesign from 'react-native-vector-icons/AntDesign';

const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

export default function Products({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>(null);
  const [productTypes, setProductTypes] = useState<any>(null);
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [jenisBatikFilter, setJenisBatikFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getProductsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/produk`);
      setProducts(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getProductTypesHandler = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/jenisbatik`);
      setProductTypes(response?.data?.data);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getProductTypesHandler();
      getProductsHandler();
    }, []),
  );

  const toggleGenderFilter = (gender: string) => {
    setGenderFilter(prevGender => (prevGender === gender ? '' : gender));
  };

  const toggleJenisBatikFilter = (jenis: string) => {
    setJenisBatikFilter(prevJenis => (prevJenis === jenis ? '' : jenis));
  };

  const filteredProducts = products?.filter(
    (product: any) =>
      (!genderFilter || product?.category_general === genderFilter) &&
      (!jenisBatikFilter || product?.jenis_batik === jenisBatikFilter) &&
      (!searchQuery ||
        product?.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())),
  );

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-1.5">
          <Text className="font-jakarta text-xl font-bold text-stone-800">
            👉 Pilih Kategori
          </Text>
          <View className="mt-3 flex flex-row justify-evenly space-x-2">
            <TouchableOpacity
              className={`flex w-1/2 flex-row items-center justify-center rounded-lg px-4 py-4 ${
                genderFilter === 'batik' ? 'bg-lime-300' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleGenderFilter('batik')}>
              <Text className="text-center font-jakarta text-lg font-bold text-stone-800">
                BATIK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex w-1/2 flex-row items-center justify-center rounded-lg px-4 py-4 ${
                genderFilter === 'tenun' ? 'bg-lime-300' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleGenderFilter('tenun')}>
              <Text className="text-center font-jakarta text-lg font-bold text-stone-800">
                TENUN
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 flex space-x-1.5 py-1.5">
            {productTypes?.map((category: any) => (
              <TouchableOpacity
                key={category?.ID}
                className={`rounded-full bg-stone-800 px-5 py-3 ${
                  jenisBatikFilter === category?.NamaJenis
                    ? 'bg-amber-400'
                    : 'bg-stone-800'
                }`}
                onPress={() => toggleJenisBatikFilter(category?.NamaJenis)}>
                <Text className="font-jakarta text-lg font-medium text-white">
                  {capitalizeFirstLetter(category?.NamaJenis)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="relative mt-2 flex flex-row items-center px-1.5">
          <TextInput
            className="w-full rounded-full border border-stone-300 p-3"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            placeholder="Search products"
          />
          <TouchableOpacity className="absolute right-6">
            <AntDesign name="search1" size={20} color={'gray'} />
          </TouchableOpacity>
        </View>
        <View className="mt-5 px-1.5 pb-3">
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'black'}
              className="h-44"
            />
          ) : (
            <View className="gap-y-2">
              <Text className="font-jakarta text-xl font-bold text-stone-800">
                🙌 Yuk Beli Batik Pilihanmu
              </Text>
              {filteredProducts?.map((product: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}>
                  <LinearGradient
                    colors={['#ECCD5F', '#C5FF7B']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    className="flex-row items-center justify-between rounded-2xl p-5">
                    <View>
                      <View className="mb-3">
                        <View className="flex flex-row space-x-1.5">
                          <View className="mb-2 w-16 rounded-full border border-yellow-100 bg-yellow-100 px-2 py-1">
                            <Text className="text-center font-jakarta text-xs text-stone-800">
                              {capitalizeFirstLetter(product?.category_general)}
                            </Text>
                          </View>
                          <View className="mb-2 w-auto rounded-full border border-yellow-100 bg-yellow-100 px-2 py-1">
                            <Text className="text-center font-jakarta text-xs text-stone-800">
                              {capitalizeFirstLetter(product?.jenis_batik)}
                            </Text>
                          </View>
                        </View>
                        <View className="w-36 rounded-full border border-lime-100 bg-lime-100 px-2 py-1">
                          <Text className="text-left font-jakarta text-xs text-stone-800">
                            🏠 {truncateText(product?.nama_toko, 17)}
                          </Text>
                        </View>
                      </View>
                      <Text className="max-w-[160px] font-jakarta text-xl font-bold text-stone-700">
                        {truncateText(product?.product_name, 30)}
                      </Text>

                      <View className="mt-3">
                        <Text className="text-md text-left font-jakarta font-semibold text-stone-700">
                          {product?.price?.replace('RP ', 'Rp')}
                        </Text>
                      </View>
                    </View>

                    <Image
                      source={{
                        uri: product.image[0]?.replace(
                          './',
                          `${process.env.API_URL}/`,
                        ),
                      }}
                      className="h-36 w-36 rounded-xl"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
