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
      const processedProducts = response?.data?.data?.map((product: any) => ({
        ...product,
        image: product.image[0].url_image1.replace(
          './',
          `${process.env.API_URL}/`,
        ),
      }));
      setProducts(processedProducts);
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
      <ScrollView>
        <View className="p-2">
          <Text className="text-xl font-bold text-stone-800">
            👉 Pilih Kategori
          </Text>
          <View className="mt-4 flex flex-row justify-evenly space-x-2">
            <TouchableOpacity
              className={`flex w-44 flex-row items-center justify-between rounded-lg px-4 py-4 ${
                genderFilter === 'L' ? 'bg-lime-200' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleFilter('L')}>
              <Text className="text-lg font-semibold">Laki-laki</Text>
              <Image
                source={require('../../assets/images/men.png')}
                className="rounded-full"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex w-44 flex-row items-center justify-between rounded-lg px-4 py-4 ${
                genderFilter === 'P' ? 'bg-pink-200' : 'bg-[#ECCD5F]'
              }`}
              onPress={() => toggleFilter('P')}>
              <Text className="text-lg font-semibold">Perempuan</Text>
              <Image
                source={require('../../assets/images/women.png')}
                className="rounded-full"
              />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal className="mt-2 flex space-x-3 py-2">
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
            <View className="gap-y-4">
              <Text className="text-xl font-bold text-stone-800">
                🙌 Yuk Beli Batik Pilihanmu
              </Text>
              {filteredProducts?.map((product: any) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {product})
                  }
                  key={product?.ID}
                  className="flex-row items-center justify-between rounded-2xl bg-gray-200 px-6 py-4">
                  <View>
                    <View className="mb-8 max-w-[100px] rounded-full border border-stone-300 bg-stone-300 py-1">
                      <Text className="text-center text-xs text-stone-800">
                        {product?.category_general === 'P'
                          ? 'Perempuan 👩'
                          : 'Laki-laki 👨'}
                      </Text>
                    </View>
                    <Text className="max-w-[200px] text-2xl font-bold text-stone-800">
                      {product?.product_name}
                    </Text>

                    <View className="mt-1">
                      <Text className="text-md text-left font-semibold text-stone-800">
                        {product?.price?.replace('RP ', 'Rp')}
                      </Text>
                    </View>
                  </View>

                  <Image source={{uri: product?.image}} className="h-40 w-40" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
