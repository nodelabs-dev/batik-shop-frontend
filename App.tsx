import React, {useContext, useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
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
import {AuthContext, AuthProvider} from './src/contexts/AuthContext';

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
        name="ProductDetail"
        component={ProductDetail}
        options={({route}: any) => ({title: route.params.product.name})}
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
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'CartStack') {
            iconName = 'shoppingcart';
          } else if (route.name === 'History') {
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
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{headerShown: false, title: 'Keranjang'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Riwayat'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const {auth}: any = useContext(AuthContext);
  console.log('INI AUTH === ', auth);
  useEffect(() => {
    const init = async () => {
      console.log('splash screen');
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
