import React from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';

const Screen2 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./library.jpg')} // Use a themed image related to books
      style={styles.container}
      imageStyle={{ opacity: 0.4 }} // Apply 40% opacity to the background image for readability
    >
      {/* Title and Tagline positioned just above the logo */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to E-Turn App</Text>
        <Text style={styles.tagline}>Your Gateway to Endless Stories</Text>
      </View>

      {/* Logo centered in the middle */}
      <Image
        source={require('./logo.jpg')} // Use the uploaded logo
        style={styles.logo}
      />

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.darkButton]} // Dark background for Log In
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, { color: 'pink' }]}>Log In</Text> {/* Text inside Text component */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.lightButton]} // Light background for Sign Up
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Sign Up</Text> {/* Text inside Text component */}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ensure content is spaced between top and bottom
    alignItems: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 100, // Move the title and tagline just above the logo
    alignItems: 'center',
    zIndex: 1, // Ensure the title is above other elements
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'purple', // Light color for title to stand out against the background
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 15,
  },
  tagline: {
    fontSize: 20,
    color: 'purple', // Light color for tagline
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow effect for tagline
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  logo: {
    width: 250,
    height: 250,
    zIndex: 1, // Ensure the logo appears above other elements
    marginTop: 250, // Center the logo vertically
  },
  buttonContainer: {
    width: '100%', // Buttons will take the full width
    paddingHorizontal: 20, // Space between buttons and screen edges
    justifyContent: 'flex-end', // Place buttons at the bottom
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 70, // Ensure buttons are above other elements
  },
  button: {
    paddingVertical: 18,
    borderRadius: 10,
    width: '100%', // Increase button width to full screen width
    marginBottom: 10, // Space between buttons
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#73004d', // Dark background for Log In button
  },
  lightButton: {
    backgroundColor: '#fbedf2', // Light background for Sign Up button
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase text for buttons
  },
});

export default Screen2;
