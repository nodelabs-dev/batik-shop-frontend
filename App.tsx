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
        options={({route}: any) => ({title: route.params.product.product_name})}
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
        options={{title: 'Keranjang'}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{title: 'Detail Pesanan'}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailCart"
        component={ProductDetailCart}
        options={({route}: any) => ({title: route.params.product.nama_produk})}
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
        options={{title: 'Riwayat'}}
      />
      <Stack.Screen
        name="HistoryOrder"
        component={HistoryOrder}
        options={{title: 'Detail Pesanan'}}
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
        options={{title: 'Edit Profile'}}
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

  console.log('APP USER FROM APPTSX === ', user);

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

  console.log('AUTH CONTEXT ==== ', auth);
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
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
