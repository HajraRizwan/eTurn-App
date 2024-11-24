import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as WebBrowser from 'expo-web-browser'; // Ensure you import WebBrowser

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params; // Receive the book data passed from GenresScreen
  const [selectedTab, setSelectedTab] = useState('Overview'); // Track the selected tab

  // Function to handle opening the PDF for The Adventures of Sherlock Holmes
  const handleStartReading = () => {
    WebBrowser.openBrowserAsync('https://www.gutenberg.org/cache/epub/1661/pg1661-images.html'); // Link to The Adventures of Sherlock Holmes PDF on Project Gutenberg
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return (
          <Text style={styles.description}>
            Sherlock Holmes, a brilliant detective, and his companion, Dr. Watson, solve various mysteries in 12 short stories, each more thrilling than the last.
            With sharp logic and keen observation, Holmes confronts crime, deceit, and danger in London and beyond.
          </Text>
        );
      case 'Book Detail':
        return (
          <View>
            <Text style={styles.description}>Publisher: George Newnes Ltd.</Text>
            <Text style={styles.description}>Published: 1892</Text>
            <Text style={styles.description}>Genre: Detective Fiction, Mystery</Text>
          </View>
        );
      case 'Review':
        return (
          <Text style={styles.description}>
            “A masterpiece of detective fiction that has stood the test of time. Holmes and Watson remain among the most iconic duos in literary history.” - User123
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FF4081" />
        </TouchableOpacity>
        <Text style={styles.heading}></Text>
      </View>

      {/* Top Image */}
      <Image
        source={{ uri: 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg' }}
        style={styles.image}
      />

      {/* Book Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>The Adventures of Sherlock Holmes</Text>
        <Text style={styles.subtitle}>Novel, Detective Fiction</Text>
        <Text style={styles.author}>Arthur Conan Doyle</Text>
        <Text style={styles.pageCount}>317 Pages</Text>

        {/* Star Rating */}
        <View style={styles.starContainer}>
          {Array(5).fill().map((_, i) => (
            <Text key={i} style={styles.star}>⭐</Text>
          ))}
        </View>

        {/* Start Reading Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartReading}>
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['Overview', 'Book Detail', 'Review'].map(tab => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text style={[styles.tab, selectedTab === tab && styles.activeTab]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conditionally Rendered Content */}
        {renderContent()}

        {/* You May Also Like Section */}
        <Text style={styles.sectionTitle}>You May Also Like</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions}>
          {/* Book 1 */}
          <TouchableOpacity 
            style={styles.book}
            onPress={() => navigation.navigate("JurassicScreen", { book: { title: "Jurassic Park" } })} // Ensure proper navigation
          >
            <Image source={{ uri: 'https://readings.com.pk/images/books/9780345538987.jpg' }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>Jurassic Park</Text>
            <Text style={styles.bookAuthor}>Michael Crichton</Text>
          </TouchableOpacity>

          {/* Book 2 */}
          <TouchableOpacity 
            style={styles.book}
            onPress={() => navigation.navigate("TimeMachineDetailScreen", { book: { title: "The Time Machine" } })} // Ensure proper navigation
          >
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Time_machine.jpg' }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>The Time Machine</Text>
            <Text style={styles.bookAuthor}>Timothy Zahn</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    marginTop: 40,
  },
  backButton: { marginRight: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#FF4081' },
  image: { width: '100%', height: 450 },
  infoContainer: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 4 },
  subtitle: { fontSize: 16, color: 'gray' },
  author: { fontSize: 16, color: 'gray', marginVertical: 2 },
  pageCount: { fontSize: 14, color: 'gray', marginBottom: 8 },
  starContainer: { flexDirection: 'row', marginBottom: 16 },
  star: { fontSize: 18, color: '#FFD700' },
  startButton: { backgroundColor: '#6200EE', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  tab: { fontSize: 16, fontWeight: 'bold', color: 'gray' },
  activeTab: { color: '#6200EE', borderBottomWidth: 2, borderBottomColor: '#6200EE' },
  description: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  suggestions: { flexDirection: 'row' },
  book: { marginRight: 16, alignItems: 'center' },
  bookImage: { width: 80, height: 120, borderRadius: 8 },
  bookTitle: { fontSize: 14, fontWeight:'bold', marginTop :8},
   bookAuthor:{fontSize :12,color:'gray'}
});

export default BookDetailScreen;