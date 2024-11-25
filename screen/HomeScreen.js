import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BasicModel from './BasicModel';
import Screen2 from './Screen2';
import GenresScreen from './GenresScreen';


// Drawer Navigator
const Drawer = createDrawerNavigator();

const MainComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const genreImages = [
    { genre: 'Fiction', imageUrl: 'https://img.freepik.com/free-photo/open-book-concept-fiction-storytelling_23-2150793803.jpg' },
    { genre: 'Non-fiction', imageUrl: 'https://media.licdn.com/dms/image/v2/C4D12AQFwd6aXpolI6g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1643197965018?e=2147483647&v=beta&t=5DKaSfghooQ0Ql-gJBdnVp7UONtnEUnxMsRa464wPUY' },
    { genre: 'Adventure', imageUrl: 'https://pics.craiyon.com/2023-07-12/9a2c7b98a9664580a12006146cd72dcd.webp' },
    { genre: 'Romantic', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mtnsaR2PtoTxczEb9wsPCu7XsX8QwcNPYIdur4I-NCBamI6P9fxqPBELE4lU1YOWcI4&usqp=CAU' },
    { genre: 'Art', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6LIvr7ft9OYk2bRU1i6ukiy9GoaUZmS8vQ&s' },
    { genre: 'Mystery', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMypF2Ses8UOIv0ox3LMysx7pcUOny3tqKQ&s' },
    { genre: 'Science', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvCnzt1lsHvefZDJW4ANSPCxroZS9N6ZpuIA&s' },
    { genre: 'History', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCXjC-CtWqYPdOrqGSI_ZOdXzKyIQs5zmIJw&s' },
  ];

  const toggleNotification = () => {
    setIsNotificationOn((prev) => !prev);
    Alert.alert(
      'Notifications',
      isNotificationOn ? 'Notifications turned off' : 'Notifications turned on'
    );
  };

  const filteredGenres = genreImages.filter((item) =>
    item.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HomeScreen = ({ navigation }) => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#333" style={styles.searchIcon} />
          <TextInput
            placeholder="Search books"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.featuredContainer}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmbnpMzr0ZgCS1BngsOmn3znLKiy7v-gq_g&s',
            }}
            style={styles.featuredImage}
          />
          <Text style={styles.featuredText}>SEARCH INSTRUCTIVE BOOKS</Text>
        </View>

        <View style={styles.genresContainer}>
          <View style={styles.genresHeader}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ViewAll')}>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredGenres.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.genreWrapper}
                onPress={() => {
                  if (item.genre === 'Fiction') {
                    navigation.navigate('GenresScreen');
                  }
                }}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.genreImage} />
                <Text style={styles.genreText}>{item.genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );


  const DrawerContent = ({ navigation }) => (
    <View style={styles.drawerContent}>
      <Image
        source={require('./logo.jpg')}
      style={styles.drawerLogo}
      />
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Welcome to eTurn')}>
        <Ionicons name="home" size={22} color="#000" />
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BasicModel')}>
        <Ionicons name="chatbubble-ellipses" size={22} color="#000" />
        <Text style={styles.drawerText}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Screen2')}>
        <Ionicons name="log-out" size={22} color="#000" />
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={toggleNotification}>
            <Ionicons
              name={isNotificationOn ? 'notifications' : 'notifications-off'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Welcome to eTurn" component={HomeScreen} />
      <Drawer.Screen name="Feedback" component={BasicModel} />
      <Drawer.Screen
        name="HiddenScreen"
        component={Screen2}
        options={{ drawerLabel: () => null }} 
      />
      <Drawer.Screen
  name="GenresScreen"
  component={GenresScreen}
  options={{
    drawerLabel: () => null, // This hides the name from the drawer
    headerShown: false, // Optionally hide the header for a cleaner look
  }}
/>
    </Drawer.Navigator>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 20 },
  searchContainer: { 
    padding: 8, 
    backgroundColor: '#f5f5f5', 
    marginTop: 10, 
    borderRadius: 25, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  searchInput: { 
    fontSize: 16, 
    color: '#333',
    marginStart: 10, 
    flex: 1,
  },
  searchIcon: { 
    marginLeft: 10, 
  },
  featuredContainer: { alignItems: 'center', marginVertical: 10 },
  featuredImage: { width: '160%', height: 320, borderRadius: 8 },
  featuredText: { position: 'absolute', fontSize: 20, fontWeight: 'bold', color: '#ffffff', top: 16, left: 16, backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 8, borderRadius: 5 },
  genresHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
  genresContainer: { marginBottom: 3 , marginTop: 6},
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8  },
  viewMore:{ color:'#007bff' , fontSize :16},
  genreWrapper: { marginRight: 16, alignItems: 'center' },
  genreImage: { width: 130, height: 180, borderRadius: 8 },
  genreText: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 8 },


  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerLogo: {
    width: 80,
    height: 80,
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center', 
    borderRadius: 10,
  },
  
  drawerText: {
    marginLeft: 10,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 10,
},


  promoBanner:{ position:'absolute', bottom :0 , left :0 , right :0 , backgroundColor:'#FF4081',
    paddingVertical :15 , paddingHorizontal :10 , alignItems:'center',
    borderTopLeftRadius :12 , borderTopRightRadius :12 ,
    shadowColor:'#000' , shadowOffset:{ width :0 , height :-2 } ,
    shadowOpacity :0.3 , shadowRadius :5 , elevation :5},
    
  promoTitle:{ color:'#ffffff' , fontSize :18 , fontWeight :'bold' , marginBottom :5},
  
  promoText:{ color:'#ffffff' , fontSize :14 , textAlign :'center'},
  
});