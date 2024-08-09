import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Login from './src/components/Auth/Login';
import Register from './src/components/Auth/Register';
import Home from './src/components/Home/Home';
import ProductDetail from './src/components/Home/ProductDetail';
import Profile from './src/components/Profile/Profile';
import Cart from './src/components/Cart/Cart';
import Order from './src/components/Cart/Order';
import History from './src/components/History/History';
import {AuthContext} from './src/contexts/AuthContext';
import Success from './src/components/Cart/Success';
import SuccessHistory from './src/components/History/Success';
import HistoryOrder from './src/components/History/Order';
import EmailVerification from './src/components/Auth/EmailVerification';
import Edit from './src/components/Profile/Edit';
import Products from './src/components/Home/Products';
import ForgetPassword from './src/components/Auth/ForgetPassword';
import ProductDetailCart from './src/components/Cart/ProductDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{headerShown: false, title: 'Produk'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({route}: any) => ({
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              {route.params.product.product_name}
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Keranjang',
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              Keranjang
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'Detail Pesanan',
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              Detail Pesanan
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailCart"
        component={ProductDetailCart}
        options={({route}: any) => ({
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              {route.params.product.nama_produk}
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Riwayat',
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              Riwayat
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="HistoryOrder"
        component={HistoryOrder}
        options={{
          title: 'Detail Pesanan',
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              Detail Pesanan
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="SuccessHistory"
        component={SuccessHistory}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          title: 'Edit Profile',
          headerTitle: props => (
            <Text className="font-jakarta text-lg font-medium" {...props}>
              Edit Profile
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const [user, setUser] = useState<any>(null);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('auth');
    setUser(JSON.parse(userData || ''));
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, []),
  );

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'ProfileStack') {
            iconName = 'user';
          } else if (route.name === 'CartStack') {
            iconName = 'shoppingcart';
          } else if (route.name === 'HistoryStack') {
            iconName = 'reload1';
          } else {
            iconName = '';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontFamily: 'Plus Jakarta Sans'},
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false, title: 'Home'}}
      />
      {user ? (
        <>
          <Tab.Screen
            name="CartStack"
            component={CartStack}
            options={{headerShown: false, title: 'Keranjang'}}
          />
          <Tab.Screen
            name="HistoryStack"
            component={HistoryStack}
            options={{headerShown: false, title: 'Riwayat'}}
          />
        </>
      ) : null}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{headerShown: false, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const {auth}: any = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{
            title: 'Verifikasi Email',
            headerTitle: props => (
              <Text className="font-jakarta text-lg font-medium" {...props}>
                Verifikasi Email
              </Text>
            ),
          }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            title: 'Reset Password',
            headerTitle: props => (
              <Text className="font-jakarta text-lg font-medium" {...props}>
                Reset Password
              </Text>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
