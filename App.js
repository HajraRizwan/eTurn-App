import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import Screen1 from './screen/Screen1';
import Screen2 from './screen/Screen2';
import HomeScreen from './screen/HomeScreen';
import GenresScreen from './screen/GenresScreen';
import FavScreen from './screen/Fav';
import ViewAll from './screen/Viewall';
import SplashScreen from './screen/splashscreen';
<<<<<<< HEAD
import Book2Detail1 from './screen/Mystrydet1';
import Book2Detail2 from './screen/gonegirl';
import JurassicScreen from './screen/JurassicScreen';
import BookDetailScreen from './screen/BookDetailScreen';
import TimeMachineDetailScreen from'./screen/TimeMachineDetailScreen'
import FictionBookDetailScreen from'./screen/FictionBookDetailScreen'
import BasicModel from'./screen/BasicModel'
import Genere2Screen from'./screen/Genere2Screen'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Genres" component={GenresScreen} />
      <Drawer.Screen name="Genere2" component={Genere2Screen}/>
     <Drawer.Screen name="Favorites" component={FavScreen} />
    </Drawer.Navigator>
  );
};

=======
import Genre2Screen from './screen/Genere2Screen';
import Book2Detail1 from './screen/Mystrydet1';
import Book2Detail2 from './screen/gonegirl';
import Fav2 from './screen/Fav2';
import JurassicScreen from './screen/JurassicScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Genres" component={GenresScreen} />
      <Drawer.Screen name="Fav" component={FavScreen} />
      <Drawer.Screen name="ViewAll" component={ViewAll} />
    </Drawer.Navigator>
  );
};
>>>>>>> d16b1910b2258df04850da7b97164c69c124485a

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
<<<<<<< HEAD
        <Stack.Screen name="Home" component={HomeScreen} />
=======
>>>>>>> d16b1910b2258df04850da7b97164c69c124485a
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="Fav" component={FavScreen} />
<<<<<<< HEAD
        <Stack.Screen name="Genere2Screen" component={Genere2Screen} />
        <Stack.Screen name="GenresScreen" component={GenresScreen} />
        <Stack.Screen name="Book2Detail1" component={Book2Detail1} />
        <Stack.Screen name="Book2Detail2" component={Book2Detail2} />
        <Stack.Screen name="JurassicScreen" component={JurassicScreen} />
        <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} />
        <Stack.Screen name="TimeMachineDetailScreen" component={TimeMachineDetailScreen} />
        <Stack.Screen name="FictionBookDetailScreen" component={FictionBookDetailScreen} />
        <Stack.Screen name="BasicModel" component={BasicModel} />
=======
        <Stack.Screen name="GenresScreen" component={GenresScreen} />
        <Stack.Screen name="Genres2Screen" component={Genre2Screen} />
        <Stack.Screen name="Book2Detail1" component={Book2Detail1} />
        <Stack.Screen name="Book2Detail2" component={Book2Detail2} />
        <Stack.Screen name="Fav2" component={Fav2} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="JurassicScreen" component={JurassicScreen} />
>>>>>>> d16b1910b2258df04850da7b97164c69c124485a
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
