import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { firebaseDatabase } from "../firebase"; // Import Firebase methods
import { ref, set, get } from "firebase/database";

const Genre2Screen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [bookCovers, setBookCovers] = useState({});

  const books = [
    { id: 1, title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", pages: 300 },
    { id: 2, title: "Gone Girl", author: "Gillian Flynn", pages: 400 },
    { id: 3, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", pages: 450 },
    { id: 4, title: "Big Little Lies", author: "Liane Moriarty", pages: 500 },
    { id: 5, title: "The Silent Patient", author: "Alex Michaelides", pages: 320 },
    { id: 6, title: "The Woman in the Window", author: "A.J. Finn", pages: 380 },
  ];

  useEffect(() => {
    // Fetch book covers using Google Books API
    books.forEach((book) => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${book.title}`)
        .then((response) => {
          const bookData = response.data.items && response.data.items[0];
          // Check if thumbnail exists before setting the book cover
          if (bookData?.volumeInfo?.imageLinks?.thumbnail) {
            setBookCovers((prev) => ({
              ...prev,
              [book.title]: bookData.volumeInfo.imageLinks.thumbnail,
            }));
          } else {
            console.warn(`No thumbnail for book: ${book.title}`);
          }
        })
        .catch((error) => console.error("Error fetching book cover:", error));
    });

    // Fetch favorites from Firebase
    const favoritesRef = ref(firebaseDatabase, "/favorites2");
    get(favoritesRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const favoritesList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setFavorites(favoritesList);
        }
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBookPress = (book) => {
    if (book.title === "The Hound of the Baskervilles") {
      navigation.navigate("Book2Detail1");
    } else if (book.title === "Gone Girl") {
      navigation.navigate("Book2Detail2");
    } else if (book.title === "The Girl with the Dragon Tattoo") {
      navigation.navigate("Book2Detail3");
    } else if (book.title === "Big Little Lies") {
      navigation.navigate("Book2Detail4");
    } else if (book.title === "The Silent Patient") {
      navigation.navigate("Book2Detail5");
    } else if (book.title === "The Woman in the Window") {
      navigation.navigate("Book2Detail6");
    }
  };

  const handleFavorite = (book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
      alert(`${book.title} removed from favorites`);
      // Remove from Firebase
      const favoriteRef = ref(firebaseDatabase, `/favorites2/${book.id}`);
      set(favoriteRef, null);
    } else {
      setFavorites([
        ...favorites,
        { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" },
      ]);
      alert(`${book.title} added to favorites`);
      // Add to Firebase
      const favoriteRef = ref(firebaseDatabase, `/favorites2/${book.id}`);
      set(favoriteRef, { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#FF4081" />
        </TouchableOpacity>
        <Text style={styles.heading}>Mystery Books</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          placeholderTextColor="#9E9E9E"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {filteredBooks.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <TouchableOpacity
              onPress={() => handleBookPress(book)}
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
            <TouchableOpacity
              onPress={() => handleFavorite(book)}
              style={styles.favoriteIconContainer}
            >
              <Icon
                name={favorites.some((fav) => fav.id === book.id) ? "heart" : "heart-o"}
                size={25}
                style={
                  favorites.some((fav) => fav.id === book.id) ? styles.iconFilled : styles.iconEmpty
                }
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.viewFavButton}
        onPress={() => navigation.navigate("Fav2", { favorites })}
      >
        <Text style={styles.viewFavText}>View Favorites</Text>
      </TouchableOpacity>
    </View>
  );
  
  // StyleSheet remains the same and is declared here
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF", marginTop: 40 },
    header: { flexDirection: "row", alignItems: "center", padding: 20, backgroundColor: "#F5F5F5" },
    heading: { fontSize: 24, fontWeight: "bold", color: "#FF4081", marginLeft: 10 },
    searchContainer: { margin: 10 },
    searchInput: {
      height: 40,
      backgroundColor: "#FFF",
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: 10,
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
    viewFavButton: { backgroundColor: "#FF4081", padding: 10, borderRadius: 8, margin: 10 },
    viewFavText: { color: "#FFF", textAlign: "center", fontWeight: "bold" },
  });}
  
  export default Genre2Screen;

