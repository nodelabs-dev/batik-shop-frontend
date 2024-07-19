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

const tabCategories = [
  {
    id: 1,

    name: 'Batik Solo',
  },

  {
    id: 2,

    name: 'Batik Yogyakarta',
  },

  {
    id: 3,

    name: 'Batik Ngawi',
  },

  {
    id: 4,

    name: 'Batik Ponorogo',
  },

  {
    id: 5,

    name: 'Batik Magetan',
  },
];

export default function Products({navigation}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>(null);
  const [genderFilter, setGenderFilter] = useState<string>('');

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

  useFocusEffect(
    useCallback(() => {
      getProductsHandler();
    }, []),
  );

  const toggleFilter = (gender: string) => {
    setGenderFilter(prevGender => (prevGender === gender ? '' : gender));
  };

  const filteredProducts = genderFilter
    ? products?.filter(
        (product: any) => product.category_general === genderFilter,
      )
    : products;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-2">
          <Text className="text-xl font-bold text-stone-800">
            👉 Pilih Kategori
          </Text>
          <View className="mt-4 flex flex-row justify-evenly space-x-2">
            <TouchableOpacity
              className={`flex w-44 flex-row items-center justify-center rounded-lg px-4 py-4 ${
                genderFilter === 'batik' ? 'bg-lime-200' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleFilter('batik')}>
              <Text className="text-center text-lg font-bold text-stone-800">
                BATIK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex w-44 flex-row items-center justify-center rounded-lg px-4 py-4 ${
                genderFilter === 'tenun' ? 'bg-pink-200' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleFilter('tenun')}>
              <Text className="text-center text-lg font-bold text-stone-800">
                TENUN
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 flex space-x-3 py-2">
            {tabCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                className="rounded-full bg-stone-800 px-5 py-3">
                <Text className="text-lg font-medium text-white">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="mt-5 px-2">
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              color={'black'}
              className="h-44"
            />
          ) : (
            <View className="gap-y-3">
              <Text className="text-xl font-bold text-stone-800">
                🙌 Yuk Beli Batik Pilihanmu
              </Text>
              {filteredProducts?.map((product: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}>
                  <View className="flex-row items-center justify-between rounded-2xl bg-lime-500 px-6 py-4">
                    <View className="pl-3">
                      <View className="mb-3">
                        <View className="mb-2 w-16 rounded-full border border-yellow-100 bg-yellow-100 px-2 py-1">
                          <Text className="text-center text-xs text-stone-800">
                            {product?.category_general === 'batik'
                              ? 'Batik'
                              : 'Tenun'}
                          </Text>
                        </View>
                        <View className="w-28 rounded-full border border-lime-100 bg-lime-100 px-2 py-1">
                          <Text className="text-left text-xs text-stone-800">
                            🏠 {product?.nama_toko}
                          </Text>
                        </View>
                      </View>
                      <Text className="max-w-[200px] text-2xl font-bold text-white">
                        {product?.product_name}
                      </Text>

                      <View className="mt-1">
                        <Text className="text-md text-left font-semibold text-white">
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
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
