import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { firebaseDatabase } from "../firebase"; // Import Firebase methods
import { ref, set, get } from "firebase/database";

const GenresScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookCovers, setBookCovers] = useState({});

  const books = [
    { id: 1, title: "The Adventures of Sherlock Holmes", author: "Lena Williams", pages: 320 },
    { id: 2, title: "Jurassic Park", author: "David Hartman", pages: 290 },
    { id: 3, title: "The Time Machine", author: "Ella Turner", pages: 270 },
    { id: 4, title: "Frankenstein", author: "Michael Adams", pages: 380 },
    { id: 5, title: "Shadows of Yesterday", author: "Sophia Green", pages: 310 },
    { id: 6, title: "Beyond the Sea", author: "James Sullivan", pages: 225 },
    { id: 7, title: "Echoes of the Forgotten", author: "Rebecca Hayes", pages: 240 },
    { id: 8, title: "The Twilight King", author: "Henry Parker", pages: 400 },
    { id: 9, title: "Moonlit Dreams", author: "Isabella Clarke", pages: 215 },
  ];

  useEffect(() => {
    // Fetch book covers from Google Books API
    books.forEach((book) => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${book.title}`)
        .then((response) => {
          const bookData = response.data.items?.[0];
          if (bookData?.volumeInfo.imageLinks?.thumbnail) {
            setBookCovers((prev) => ({
              ...prev,
              [book.title]: bookData.volumeInfo.imageLinks.thumbnail,
            }));
          }
        })
        .catch((error) => console.error("Error fetching book cover:", error));
    });

    // Fetch favorites from Firebase
    const favoritesRef = ref(firebaseDatabase, "/favorites");
    get(favoritesRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoritesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFavorites(favoritesList);
      }
    });
  }, []);

  // Filter books by search text
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to book detail screen on image press
  // Navigate to book detail screen on image press
  const handleBookPress = (book) => {
    if (book.title === "The Adventures of Sherlock Holmes") {
      navigation.navigate("BookDetailScreen", { book });
    } else if (book.title === "Jurassic Park") {
      navigation.navigate("JurassicScreen", { book });
    } else if (book.title === "The Time Machine") {
      navigation.navigate("TimeMachineDetailScreen", { book });
    } else if (book.title === "Frankenstein") {
      navigation.navigate("FictionBookDetailScreen", { book });
    } else if (book.title === "Shadows of Yesterday") {
      navigation.navigate("ShadowsScreen", { book });
    } else if (book.title === "Beyond the Sea") {
      navigation.navigate("BeyondSeaScreen", { book });
    } else if (book.title === "Echoes of the Forgotten") {
      navigation.navigate("EchoesScreen", { book });
    } else if (book.title === "The Twilight King") {
      navigation.navigate("TwilightKingScreen", { book });
    } else if (book.title === "Moonlit Dreams") {
      navigation.navigate("MoonlitDreamsScreen", { book });
    } else {
      alert("Details screen not available for this book.");
    }
  };
  

  // Handle favorites toggle and update Firebase
  const handleFavorite = (book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
      alert(`${book.title} removed from favorites`);
      const favoriteRef = ref(firebaseDatabase, `/favorites/${book.id}`);
      set(favoriteRef, null); // Remove from Firebase
    } else {
      setFavorites([
        ...favorites,
        { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" },
      ]);
      alert(`${book.title} added to favorites`);
      const favoriteRef = ref(firebaseDatabase, `/favorites/${book.id}`);
      set(favoriteRef, { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" });
    }
  };

  // Update the favorites list when a book is removed from the favorites screen
  const updateFavorites = (bookId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((book) => book.id !== bookId));
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.bookCard}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleFavorite(item)}>
        <Icon
          name={favorites.some((fav) => fav.id === item.id) ? "heart" : "heart-o"}
          size={20}
          color={favorites.some((fav) => fav.id === item.id) ? "#FF4081" : "#757575"}
        />
      </TouchableOpacity>
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
        <Text style={styles.heading}>Fiction Books</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#333" style={styles.searchIcon} />
        <TextInput
          placeholder="Search books"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {filteredBooks.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <TouchableOpacity
              onPress={() => handleBookPress(book)} // Navigate on image press
              style={styles.bookImageContainer}
            >
              <Image
                source={{ uri: bookCovers[book.title] || "https://via.placeholder.com/150" }}
                style={styles.bookCoverImage}
              />
            </TouchableOpacity>
            <View style={styles.bookDetailsContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>Author: {book.author}</Text>
              <Text style={styles.bookPages}>Pages: {book.pages}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFavorite(book)} style={styles.favoriteIconContainer}>
              <Icon
                name={favorites.some((fav) => fav.id === book.id) ? "heart" : "heart-o"}
                size={25}
                style={favorites.some((fav) => fav.id === book.id) ? styles.iconFilled : styles.iconEmpty}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.viewFavButton}
        onPress={() => navigation.navigate("Fav", { updateFavorites })}
      >
        <Text style={styles.viewFavText}>View Favorites</Text>
      </TouchableOpacity>
      
    </View>
  );
};




const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  // Header styling
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
  searchContainer: { 
    padding: 2, 
    backgroundColor: '#f5f5f5', 
    marginTop: 10, 
    borderRadius: 25, 
    flexDirection: 'row', 
    alignItems: 'center' ,
    marginStart:20,
    marginEnd:20,
  },
  searchInput: { 
    fontSize: 16, 
    color: '#333',
    marginStart: 10, 
    flex: 1,
  },
  searchIcon: { 
    marginLeft: 10, 
  },
  scrollContainer: { flex: 1 },
  scrollContent: { alignItems: "center" },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    width: "90%",
  },
  bookImageContainer: { marginRight: 10 },
  bookCoverImage: { width: 60, height: 90, borderRadius: 4 },
  bookDetailsContainer: { flex: 1 },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "#757575" },
  bookPages: { fontSize: 14, color: "#757575" },
  favoriteIconContainer: { marginLeft: 10 },
  iconFilled: { color: "#FF4081" },
  iconEmpty: { color: "#757575" },
  viewFavButton: { backgroundColor: "#73004d", padding: 10, borderRadius: 8, margin: 10 },
  viewFavText: { color: "#FFF", textAlign: "center", fontWeight: "bold" },
});

export default GenresScreen;
