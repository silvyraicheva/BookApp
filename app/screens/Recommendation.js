import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Linking,
} from "react-native";
import axios from "axios";
import { Google_Books_URL, GET_BOOKS_name, KEY_HEADER } from "./APIConfig";

const Recommendation = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch books only if the search query is not empty
        if (searchQuery.trim() !== "") {
            fetchBooks();
        }
    }, [searchQuery]); // Add searchQuery as a dependency

    const fetchBooks = async () => {
        try {
            let url = `${Google_Books_URL}${GET_BOOKS_name}`;
            if (searchQuery.trim() !== "") {
                url += `=${searchQuery}`;
            }
            url += KEY_HEADER;

            const response = await axios.get(url);
            setBooks(response.data.items);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            fetchBooks();
        }
    };
    const openBookLink = (link) => {
        Linking.openURL(link);
    };
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Find your next read..."
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                >
                    <Text style={styles.buttonText}>Go</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                {books.map((book, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={{
                                uri:
                                    book.volumeInfo.imageLinks?.thumbnail ||
                                    "https://via.placeholder.com/150", // Use a placeholder image if thumbnail is not available
                            }}
                            style={styles.image}
                        />
                        <View style={styles.details}>
                            <Text style={styles.title}>
                                {book.volumeInfo.title}
                            </Text>
                            {book.volumeInfo.authors && (
                                <Text style={styles.description}>
                                    {book.volumeInfo.authors.join(", ")}
                                </Text>
                            )}
                            <Text style={styles.date}>
                                Published: {book.volumeInfo.publishedDate}
                            </Text>
                            <TouchableOpacity
                                key={index}
                                style={styles.moreInfoButton} // Apply the custom style here
                                onPress={() =>
                                    openBookLink(book.volumeInfo.infoLink)
                                }
                            >
                                <Text style={styles.moreInfoButtonText}>
                                    Read book
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FF",
        padding: 20,
    },
    searchContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center", // Align items vertically
    },
    input: {
        flex: 1, // Take up remaining space
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    searchButton: {
        width: 60, // Adjust width as needed
        height: 40,

        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10, // Add margin between input and button
        backgroundColor: "#55BCF6",
        borderRadius: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    scrollView: {
        height: "60%", // Set a fixed height for ScrollView
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: "#889CB6",
    },
    moreInfoButton: {
        backgroundColor: "#28a745",
        borderRadius: 10,
        paddingVertical: 6, // Reduce the vertical padding to make the button smaller
        paddingHorizontal: 10, // Adjust the horizontal padding if needed
        marginTop: 10,
        alignItems: "center",
        maxWidth: 120, // Set a maximum width for the button
    },

    moreInfoButtonText: {
        color: "#fff",
        fontSize: 14, // Decrease the font size
        fontWeight: "bold",
    },
});

export default Recommendation;
