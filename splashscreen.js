import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Screen1 after 10 seconds
      navigation.replace('Screen1');
    }, 3000); // 10 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./first.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to Our App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',      // Center the content horizontally
    backgroundColor: '#73004d', // Background color of splash screen
  },
  logo: {
    width: 400, // Adjust the size of the logo as needed
    height: 400,
    resizeMode: 'contain', // Ensures the image fits within the given width/height
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'pink', // Title color
    textAlign: 'center', // Center the text horizontally
  },
});

export default SplashScreen;
