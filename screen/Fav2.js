import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebaseDatabase } from '../firebase'; // Import Firebase database instance
import { ref, onValue, remove, update } from "firebase/database"; // Import Firebase methods

const Fav2= ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from Firebase Realtime Database when navigating to the screen
  useEffect(() => {
    const favoritesRef = ref(firebaseDatabase, '/favorites2'); // Updated to use 'favorites2' table

    const onValueChange = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoritesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFavorites(favoritesList);
      } else {
        setFavorites([]); // If no favorites found, set empty array
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      onValueChange(); // Unsubscribe from the database updates
    };
  }, []);
 b   
  const handleRemove = (bookId) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this book from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => removeFavorite(bookId) },
      ]
    );
  };

  const removeFavorite = (bookId) => {
    const favoriteRef = ref(firebaseDatabase, `/favorites2/${bookId}`); // Updated to use 'favorites2' table
    remove(favoriteRef)
      .then(() => {
        setFavorites(favorites.filter((book) => book.id !== bookId));
        Alert.alert("Success", "Book removed from favorites.");
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred while removing the book.");
      });
  };

  const handleUpdate = (bookId, newTitle) => {
    const favoriteRef = ref(firebaseDatabase, `/favorites2/${bookId}`); // Updated to use 'favorites2' table
    update(favoriteRef, { title: newTitle })
      .then(() => {
        setFavorites(favorites.map((book) => (book.id === bookId ? { ...book, title: newTitle } : book)));
        Alert.alert("Success", "Book title updated.");
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred while updating the book title.");
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.bookCoverImage} />
      <View style={styles.bookDetailsContainer}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>Author: {item.author}</Text>
        <Text style={styles.bookPages}>Pages: {item.pages}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => {
            // Navigate to update screen or show an alert to update title
            Alert.prompt("Update Book Title", "Enter new title", [
              { text: "Cancel" },
              { text: "Update", onPress: (text) => handleUpdate(item.id, text) },
            ]);
          }}
        >
          <Icon name="edit" size={20} color="#FF4081" style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Icon name="trash" size={20} color="red" style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Navigate back
        >
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.heading}>My Favorites</Text>
      </View>

      {/* Data Display */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorite books added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8F9FA",
  },

  // Header styling
  header: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center vertically
    backgroundColor: "#FF4081",
    paddingVertical: 40,
    paddingHorizontal: 20,
    elevation: 5,
  },

  // Back button
  backButton: {
    marginRight: 20, // Add space between the button and text
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },

  // Header text
  heading: { 
    fontSize: 25, 
    fontWeight: "bold", 
    color: "#FFF",
    marginTop: 10,
  },

  flatList: { 
    paddingHorizontal: 20, 
    paddingTop: 20,
  },

  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Image styling
  bookCoverImage: {
    width: 90,
    height: 130,
    borderRadius: 8,
    marginRight: 15,
  },

  bookDetailsContainer: { 
    flex: 1,
  },
  bookTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333",
    marginBottom: 5,
  },
  bookAuthor: { 
    fontSize: 14, 
    color: "#757575", 
    marginBottom: 3, 
  },
  bookPages: { 
    fontSize: 14, 
    color: "#757575",
  },

  noFavoritesText: { 
    fontSize: 18, 
    textAlign: "center", 
    color: "#757575", 
    marginTop: 30,
  },
});export default Fav2;