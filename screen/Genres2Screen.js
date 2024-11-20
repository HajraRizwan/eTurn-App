import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const Genres2Screen = ({ navigation }) => {
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
    const fetchBookCovers = async () => {
      try {
        const newBookCovers = {};
        const requests = books.map((book) =>
          axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book.title)}`)
        );

        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
          const bookData = response.data.items?.[0];
          if (bookData?.volumeInfo.imageLinks?.thumbnail) {
            newBookCovers[books[index].title] = bookData.volumeInfo.imageLinks.thumbnail;
          }
        });

        setBookCovers(newBookCovers);
      } catch (error) {
        console.error("Error fetching book covers:", error);
      }
    };

    fetchBookCovers();
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
    }
  };

  const handleFavorite = (book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
      alert(`${book.title} removed from favorites`);
    } else {
      setFavorites([...favorites, { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" }]);
      alert(`${book.title} added to favorites`);
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
            <TouchableOpacity onPress={() => handleBookPress(book)} style={styles.bookImageContainer}>
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
                color={favorites.some((fav) => fav.id === book.id) ? "#FF4081" : "#B0B0B0"}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", marginTop: 40 },
  header: { flexDirection: "row", alignItems: "center", padding: 20, backgroundColor: "#F5F5F5" },
  backButton: { marginRight: 10 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#FF4081" },
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
    justifyContent: "space-between",
  },
  bookImageContainer: { marginRight: 10 },
  bookCoverImage: { width: 60, height: 90, borderRadius: 4 },
  bookDetailsContainer: { flex: 1 },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "#757575" },
  bookPages: { fontSize: 14, color: "#757575" },
  favoriteIconContainer: { padding: 5, justifyContent: "center", alignItems: "center" },
});

export default Genres2Screen;
