import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {capitalizeFirstLetter} from '../../lib';

export default function Products({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>(null);
  const [productTypes, setProductTypes] = useState<any>(null);
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [jenisBatikFilter, setJenisBatikFilter] = useState<string>('');

  const getProductsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.API_URL}/produk`);
      setProducts(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getProductTypesHandler = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/jenisbatik`);
      console.log('JENIS BATIK === ', response?.data?.data);
      setProductTypes(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
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
      (!jenisBatikFilter || product?.jenis_batik === jenisBatikFilter),
  );

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-2">
          <Text className="font-jakarta text-xl font-bold text-stone-800">
            👉 Pilih Kategori
          </Text>
          <View className="mt-4 flex flex-row justify-evenly space-x-2">
            <TouchableOpacity
              className={`flex w-44 flex-row items-center justify-center rounded-lg px-4 py-4 ${
                genderFilter === 'batik' ? 'bg-lime-300' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleGenderFilter('batik')}>
              <Text className="font-jakarta text-center text-lg font-bold text-stone-800">
                BATIK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex w-44 flex-row items-center justify-center rounded-lg px-4 py-4 ${
                genderFilter === 'tenun' ? 'bg-lime-300' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleGenderFilter('tenun')}>
              <Text className="font-jakarta text-center text-lg font-bold text-stone-800">
                TENUN
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 flex space-x-3 py-2">
            {productTypes?.map((category: any) => (
              <TouchableOpacity
                key={category?.ID}
                className={`rounded-full bg-stone-800 px-5 py-3 ${
                  jenisBatikFilter === category?.NamaJenis
                    ? 'bg-lime-300'
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
        <View className="mt-5 px-2 pb-3">
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'black'}
              className="h-44"
            />
          ) : (
            <View className="gap-y-3">
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
                    className="flex-row items-center justify-between rounded-2xl px-6 py-4">
                    <View>
                      <View className="mb-3">
                        <View className="flex flex-row space-x-1.5">
                          <View className="mb-2 w-16 rounded-full border border-yellow-100 bg-yellow-100 px-2 py-1">
                            <Text className="font-jakarta text-center text-xs text-stone-800">
                              {capitalizeFirstLetter(product?.category_general)}
                            </Text>
                          </View>
                          <View className="mb-2 w-auto rounded-full border border-yellow-100 bg-yellow-100 px-2 py-1">
                            <Text className="font-jakarta text-center text-xs text-stone-800">
                              {capitalizeFirstLetter(product?.jenis_batik)}
                            </Text>
                          </View>
                        </View>
                        <View className="w-28 rounded-full border border-lime-100 bg-lime-100 px-2 py-1">
                          <Text className="font-jakarta text-left text-xs text-stone-800">
                            🏠 {product?.nama_toko}
                          </Text>
                        </View>
                      </View>
                      <Text className="font-jakarta max-w-[200px] text-2xl font-bold text-stone-700">
                        {product?.product_name}
                      </Text>

                      <View className="mt-1">
                        <Text className="font-jakarta text-md text-left font-semibold text-stone-700">
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
                      className="h-44 w-44"
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
