import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebaseDatabase } from "../firebase"; // Import Firebase database instance
import { ref, onValue, remove, update } from "firebase/database"; // Import Firebase methods

const Fav = ({ route, navigation }) => {
  const { updateFavorites } = route.params; // Get the callback function from route.params
  const [favorites, setFavorites] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Fetch favorites from Firebase Realtime Database
  useEffect(() => {
    const favoritesRef = ref(firebaseDatabase, "/favorites"); // Use 'favorites2' table if required

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
      onValueChange(); // Unsubscribe from database updates
    };
  }, []);

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
    const favoriteRef = ref(firebaseDatabase, `/favorites/${bookId}`); // Use 'favorites2' table if required
    remove(favoriteRef)
      .then(() => {
        setFavorites(favorites.filter((book) => book.id !== bookId));
        if (updateFavorites) {
          updateFavorites(bookId); // Call the callback function to update favorites on GenresScreen
        }
        Alert.alert("Success", "Book removed from favorites.");
      })
      .catch(() => {
        Alert.alert("Error", "An error occurred while removing the book.");
      });
  };

  const handleUpdate = (bookId, newTitle) => {
    const favoriteRef = ref(firebaseDatabase, `/favorites/${bookId}`); // Use 'favorites2' table if required
    update(favoriteRef, { title: newTitle })
      .then(() => {
        setFavorites(
          favorites.map((book) => (book.id === bookId ? { ...book, title: newTitle } : book))
        );
        Alert.alert("Success", "Book title updated.");
        setModalVisible(false); // Close the modal
      })
      .catch(() => {
        Alert.alert("Error", "An error occurred while updating the book title.");
      });
  };

  const openEditModal = (bookId, currentTitle) => {
    setCurrentBookId(bookId);
    setNewTitle(currentTitle);
    setModalVisible(true);
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
        <TouchableOpacity onPress={() => openEditModal(item.id, item.title)}>
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

      {/* Modal for editing */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Book Title</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.modalInput}
              placeholder="Enter new title"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUpdate(currentBookId, newTitle)}
                style={[styles.modalButton, styles.modalButtonUpdate]}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8F9FA",
  },

  header: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center vertically
    backgroundColor: "#FF4081",
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    width:550,
    marginStart:0,
  },

  // Back button
  backButton: {
    marginRight: 20, // Add space between the button and text
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editIcon: {
    marginLeft: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    height: 40,
    borderColor: "#73004d",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#73004d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  modalButtonUpdate: {
    backgroundColor: "#FF4081", // A distinct color for the update button
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Fav;