import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as WebBrowser from 'expo-web-browser';

const FictionBookDetailScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Overview');

  const handleStartReading = () => {
    WebBrowser.openBrowserAsync('https://www.gutenberg.org/files/84/84-h/84-h.htm'); // Link to Frankenstein PDF on Project Gutenberg
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return (
          <Text style={styles.description}>
            Frankenstein is a story of ambition and creation that follows Victor Frankenstein as he creates life and faces its tragic consequences.
            A timeless tale exploring themes of humanity and morality.
          </Text>
        );
      case 'Book Detail':
        return (
          <View>
            <Text style={styles.description}>Publisher: Lackington, Hughes, Harding, Mavor & Jones</Text>
            <Text style={styles.description}>Published: 1818</Text>
            <Text style={styles.description}>Genre: Gothic Fiction</Text>
          </View>
        );
      case 'Review':
        return (
          <Text style={styles.description}>
            “An enduring classic of gothic literature that challenges us to consider the ethics of science and the true nature of monstrosity.” - User456
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FF4081" />
        </TouchableOpacity>
        <Text style={styles.heading}></Text>
      </View>

      {/* Top Image */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-IVGCsDY5dfvcfqDJKlBMxrHImSAaLThbY3h12tKPfWs1FpWTJRJqSK2uWw6MPuM0AoQ&usqp=CAU' }}
        style={styles.image}
      />

      {/* Book Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Frankenstein</Text>
        <Text style={styles.subtitle}>Novel, Gothic Fiction</Text>
        <Text style={styles.author}>Mary Shelley</Text>
        <Text style={styles.pageCount}>280 Pages</Text>

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
          {/* Book Suggestions */}
          <TouchableOpacity 
            style={[ styles.book]} 
            onPress={() => navigation.navigate('BookDetailScreen', { title: "The Adventures of Sherlock Holmes", author: "Bram Stoker" })}
          >
            <Image 
              source={{ uri: 'https://www.gutenberg.org/files/1661/1661-h/images/cover.jpg' }} 
              style={[ styles.bookImage]}
            />
            <Text style={[ styles.bookTitle]}>The Adventures of Sherlock Holmes</Text> 
            <Text style={[ styles.bookAuthor]}>Bram Stoker</Text> 
          </TouchableOpacity>

          {/* Book Suggestions */}
          <TouchableOpacity 
            style={[ styles.book]} 
            onPress={() => navigation.navigate('TimeMachineDetailScreen', { title: "The Time Machine", author: "H.G. Wells" })}
          >
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Time_machine.jpg' }} 
              style={[ styles.bookImage]}
            />
            <Text style={[ styles.bookTitle]}>The Time Machine</Text> 
            <Text style={[ styles.bookAuthor]}>H.G. Wells</Text> 
          </TouchableOpacity>

        </ScrollView> 

      </View> 

    </ScrollView> 

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' , marginTop: 40},
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
  activeTab: { color:'#6200EE', borderBottomWidth :2, borderBottomColor:'#6200EE' },
  description:{ fontSize :14,color :'#333',lineHeight :20 ,marginBottom :16},
  sectionTitle:{ fontSize :18,fontWeight :'bold' ,marginVertical :8},
  suggestions:{ flexDirection :'row'},
  book:{ marginRight :16 ,alignItems :'center'},
  bookImage:{ width :80 ,height :120 ,borderRadius :8},
  bookTitle:{ fontSize :14,fontWeight :'bold' ,marginTop :8},
  bookAuthor:{ fontSize :12,color :'gray'},
  
});

export default FictionBookDetailScreen;