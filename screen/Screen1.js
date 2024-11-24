import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    {
      
      id: 1,
      title: 'Find the book you like the most',
      description: 'We read the best books, highlight key ideas, and create summaries for you.',
    },
    {
      id: 2,
      title: 'Give feedback',
      description: 'Get recommendations based on your preferences and interests.',
      image: require('./feedback.png'),
    },
    {
      id: 3,
      title: 'Track Your Favourite Books',
      description: 'Keep track of your favorite books and what you’ve read so far.',

    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate('Screen2');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./logo.jpg')} // Ensure the image path is correct
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>{pages[currentPage - 1].title}</Text>
      <Text style={styles.description}>{pages[currentPage - 1].description}</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbedf2', // Pink background color
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150, // Adjust the size as needed
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'pink', // White text color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#73004d', // White text color
  },
  nextButton: {
    backgroundColor: '#73004d',  
      padding: 15,
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white', // Purple text color for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Screen1;
