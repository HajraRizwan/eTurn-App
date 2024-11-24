import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

const TimeMachineDetailScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Overview');

  const handleStartReading = () => {
    WebBrowser.openBrowserAsync('https://www.gutenberg.org/files/35/35-h/35-h.htm');
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return (
          <Text style={styles.description}>
            "The Time Machine," a pioneering science fiction novel by H.G. Wells, explores the concept of time travel through the adventures of its protagonist.
          </Text>
        );
      case 'Book Detail':
        return (
          <View>
            <Text style={styles.description}>Publisher: William Heinemann</Text>
            <Text style={styles.description}>Published: 1895</Text>
            <Text style={styles.description}>Genre: Science Fiction</Text>
          </View>
        );
      case 'Review':
        return (
          <Text style={styles.description}>
            “A masterpiece of speculative fiction that examines the dangers of technological advancement and social inequality.” - User789
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={30} color="#FF4081" marginTop={20} marginLeft={20} marginVertical={20}/>
      </TouchableOpacity>

      {/* Header */}
      
      {/* Top Image */}
      <Image
        source={{ uri: 'https://m.media-amazon.com/images/M/MV5BZjRiMTdjNmEtOGJjNy00ZjA1LTlkNzktNzc0NzMxNTY0OGE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' }}
        style={styles.image}
      />

      {/* Book Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>The Time Machine</Text>
        <Text style={styles.subtitle}>Novel, Science Fiction</Text>
        <Text style={styles.author}>H.G. Wells</Text>
        <Text style={styles.pageCount}>104 Pages</Text>

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
            onPress={() => navigation.navigate("FictionBookDetailScreen", { book: { title: "Frankenstein" } })}
          >
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-IVGCsDY5dfvcfqDJKlBMxrHImSAaLThbY3h12tKPfWs1FpWTJRJqSK2uWw6MPuM0AoQ&usqp=CAU' }}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>Frankenstein</Text>
            <Text style={styles.bookAuthor}>Mary Shelley</Text>
          </TouchableOpacity>

          {/* Book 2 */}
          <TouchableOpacity
            style={styles.book}
            onPress={() => navigation.navigate("JurassicScreen", { book: { title: "Jurassic Park" } })}
          >
            <Image
              source={{ uri: 'https://readings.com.pk/images/books/9780345538987.jpg' }}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>Jurassic Park</Text>
            <Text style={styles.bookAuthor}>Michael Crichton</Text>
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
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
  },
  
  backButton: {
    paddingRight: 10,
  
  },
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
  tabContainer: { flexDirection: 'row', justifyContent:'space-around', marginVertical :16 },
  tab:{ fontSize :16,fontWeight:'bold',color:'gray' },
  activeTab:{ color:'#6200EE',borderBottomWidth :2,borderBottomColor:'#6200EE'},
   description:{fontSize :14,color:'#333',lineHeight :20,marginBottom :16},
   sectionTitle:{fontSize :18,fontWeight:'bold',marginVertical :8},
   suggestions:{flexDirection:'row'},
   book:{marginRight :16,alignItems:'center'},
   bookImage:{width :80,height :120,borderRadius :8},
   bookTitle:{fontSize :14,fontWeight:'bold',marginTop :8},
   bookAuthor:{fontSize :12,color:'gray'},
});

export default TimeMachineDetailScreen;