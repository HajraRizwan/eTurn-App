import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Book2Detail1 = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  const renderContent = () => {
    switch (selectedTab) {
      case "Overview":
        return (
          <Text style={styles.description}>
            "The Hound of the Baskervilles" is a gripping mystery that follows Sherlock Holmes and Dr. Watson as they investigate the mysterious death of Sir Charles Baskerville and the legend of a supernatural hound haunting the Baskerville family.
          </Text>
        );
      case "Book Detail":
        return (
          <View>
            <Text style={styles.description}>Publisher: George Newnes</Text>
            <Text style={styles.description}>Published: 1902</Text>
            <Text style={styles.description}>Genre: Mystery, Crime Fiction</Text>
          </View>
        );
      case "Review":
        return (
          <Text style={styles.description}>
            "An exceptional novel that perfectly blends suspense, atmosphere, and the unmatched intellect of Sherlock Holmes. A must-read for mystery lovers." - UserReview
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FF4081" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Details</Text>
      </View>

      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37i30KyFiIpnzi-21Ni25rdTnLO_kKBa-lcvs3zmPKmSgsFbwnrzcr5g2CWQvuTrA50Q&usqp=CAU",
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>The Hound of the Baskervilles</Text>
        <Text style={styles.subtitle}>Mystery, Crime Fiction</Text>
        <Text style={styles.author}>Arthur Conan Doyle</Text>
        <Text style={styles.pageCount}>300 Pages</Text>
        <View style={styles.starContainer}>
          {Array(5)
            .fill()
            .map((_, i) => (
              <Text key={i} style={styles.star}>
                ⭐
              </Text>
            ))}
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            Linking.openURL(
              "https://www.google.com/search?q=The+Hound+of+the+Baskervilles"
            )
          }
        >
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        {["Overview", "Book Detail", "Review"].map((tab) => (
          <TouchableOpacity key={tab} style={styles.tab} onPress={() => setSelectedTab(tab)}>
            <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tabContent}>{renderContent()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF4081",
  },
  image: { height: 250, width: "100%" },
  infoContainer: { padding: 10, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, color: "#757575" },
  author: { fontSize: 14, color: "#757575" },
  pageCount: { fontSize: 14, color: "#757575" },
  starContainer: { flexDirection: "row", marginVertical: 10 },
  star: { fontSize: 18, color: "#FF4081" },
  startButton: {
    backgroundColor: "#FF4081",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  startButtonText: { color: "#FFF", fontWeight: "bold" },
  tabContainer: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 },
  tab: { paddingHorizontal: 20, paddingVertical: 5 },
  activeTabText: { fontSize: 16, fontWeight: "bold", color: "#FF4081" },
  tabText: { fontSize: 16, color: "#757575" },
  tabContent: { paddingHorizontal: 20, paddingTop: 10 },
  description: { fontSize: 16, color: "#333" },
});

export default Book2Detail1;
