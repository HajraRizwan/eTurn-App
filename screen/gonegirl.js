import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Book2Detail2 = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  const renderContent = () => {
    switch (selectedTab) {
      case "Overview":
        return (
          <Text style={styles.description}>
            "Gone Girl" is a psychological thriller about the mysterious disappearance of Amy Dunne.
          </Text>
        );
      case "Book Detail":
        return (
          <View>
            <Text style={styles.description}>Publisher: Crown Publishing Group</Text>
            <Text style={styles.description}>Published: 2012</Text>
            <Text style={styles.description}>Genre: Thriller, Mystery, Psychological Fiction</Text>
          </View>
        );
      case "Review":
        return (
          <Text style={styles.description}>
            "A dark, suspenseful, and brilliantly crafted novel that keeps readers on the edge of their seats. Flynn
            masterfully weaves a tale of deception and intrigue." - UserReview
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#FF4081" />
      </TouchableOpacity>

      {/* Top Image */}
      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYy8AE1X2Pke2zIhtwaLddRZ23e3CLSQEMug&s" }}
        style={styles.image}
      />

      {/* Book Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Gone Girl</Text>
        <Text style={styles.subtitle}>Thriller, Mystery</Text>
        <Text style={styles.author}>Gillian Flynn</Text>
        <Text style={styles.pageCount}>400 Pages</Text>

        {/* Star Rating */}
        <View style={styles.starContainer}>
          {Array(5)
            .fill()
            .map((_, i) => (
              <Text key={i} style={styles.star}>
                ⭐
              </Text>
            ))}
        </View>

        {/* Start Reading Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            Linking.openURL("https://icrrd.com/public/media/15-05-2021-082725Gone-Girl-Gillian-Flynn.pdf")
          }
        >
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Overview", "Book Detail", "Review"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text style={[styles.tab, selectedTab === tab && styles.activeTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conditionally Rendered Content */}
        {renderContent()}

        {/* You May Also Like Section */}
        <Text style={styles.sectionTitle}>You May Also Like</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions}>
          <View style={styles.book}>
            <Image
              source={{
                uri: "https://m.media-amazon.com/images/M/MV5BYTY4OTQ0N2EtMDExMC00NTYzLTk0NmItYTRjNDYxOWU5ZDY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
              }}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>Sharp Objects</Text>
            <Text style={styles.bookAuthor}>Gillian Flynn</Text>
          </View>
          <View style={styles.book}>
            <Image
              source={{
                uri: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562761513i/2459785.jpg",
              }}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>In the Woods</Text>
            <Text style={styles.bookAuthor}>Tana French</Text>
          </View>
          <View style={styles.book}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37i30KyFiIpnzi-21Ni25rdTnLO_kKBa-lcvs3zmPKmSgsFbwnrzcr5g2CWQvuTrA50Q&usqp=CAU",
              }}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>Hound Baskervilles</Text>
            <Text style={styles.bookAuthor}>Arthur Conan Doyle</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  backButton: { position: "absolute", top: 20, left: 20, zIndex: 1 },
  image: { height: 250, width: "100%" },
  infoContainer: { padding: 10 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, color: "#757575" },
  author: { fontSize: 14, color: "#757575", marginVertical: 10 },
  description: { fontSize: 16, color: "#333" },
  pageCount: { fontSize: 14, color: "#757575", marginVertical: 5 },
  starContainer: { flexDirection: "row", marginVertical: 10 },
  star: { fontSize: 18, color: "#FFD700" },
  startButton: {
    backgroundColor: "#FF4081",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  startButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  tabContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  tab: { fontSize: 16, color: "#757575", padding: 5 },
  activeTab: { fontWeight: "bold", color: "#FF4081" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  suggestions: { marginVertical: 10 },
  book: { marginRight: 15, alignItems: "center" },
  bookImage: { width: 100, height: 150, borderRadius: 5 },
  bookTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center", marginVertical: 5 },
  bookAuthor: { fontSize: 12, color: "#757575", textAlign: "center" },
});

export default Book2Detail2;
