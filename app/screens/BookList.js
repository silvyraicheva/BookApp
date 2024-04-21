import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    Modal,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { insertBook, getAllBooks } from "../../database";
import * as ImagePicker from "expo-image-picker";

import placeholder from "./../assets/placeholder-book.png";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const BookList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [books, setBooks] = useState([]);
    const [image, setImage] = useState();
    const [loaded] = useFonts({
        ...MaterialIcons.font,
    });
    useEffect(() => {
        fetchBooks();
    }, []);
    const fetchBooks = () => {
        getAllBooks(setBooks);
    };

    const addBook = () => {
        // Perform validation and gather book information
        insertBook(title, author, startDate, endDate, image);
        fetchBooks(); // Update books list
        setModalVisible(false); // Close modal
        // Clear input fields
        setTitle("");
        setAuthor("");
        setStartDate("");
        setEndDate("");
    };

    const takePhoto = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
                // const fileName = `book_${Date.now()}.jpg`; // Generate a unique filename
                // const newPath = `${FileSystem.documentDirectory}${fileName}`;
                // await FileSystem.moveAsync({
                //     from: result.assets[0].uri,
                //     to: newPath,
                // });
                // await saveImage(newPath);
            }
        } catch (error) {
            alert("Error uploading image");
        }
    };

    const saveImage = async (image) => {
        try {
            setImage(image);
        } catch (error) {
            throw error;
        }
    };
    const closeModal = () => {
        setModalVisible(false);
        setImage(null); // Reset the image state
    };

    return (
        <View style={styles.container}>
            {/* Button to open modal for adding a new book */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.addButton}
                onPress={clearBooksDatabase}
            >
                <Text style={styles.buttonText}>delete</Text>
            </TouchableOpacity> */}
            {/* Modal for adding a new book */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeModal}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
                            <Image
                                source={image ? { uri: image } : placeholder}
                                style={styles.bookImage}
                            />
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={takePhoto}
                            >
                                <MaterialIcons
                                    name="photo-camera"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            onChangeText={setTitle}
                            value={title}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Author"
                            onChangeText={setAuthor}
                            value={author}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Start Date"
                            onChangeText={setStartDate}
                            value={startDate}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="End Date"
                            onChangeText={setEndDate}
                            value={endDate}
                        />

                        <TouchableOpacity
                            style={[styles.modalButton, styles.addButton]}
                            onPress={addBook}
                        >
                            <Text style={styles.buttonText}>Add Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.scrollView}>
                {books.map((book) => (
                    <View key={book.id} style={styles.bookCard}>
                        <Image
                            // source={require("../assets/placeholder-book.png")}
                            source={image ? { uri: image } : placeholder}
                            style={styles.bookImage}
                        />
                        <View style={styles.bookDetails}>
                            <Text style={styles.bookTitle}>{book.title}</Text>
                            <Text style={styles.bookDescription}>
                                {book.author}
                            </Text>
                            <Text style={styles.bookDate}>
                                Start Date: {book.start_date}
                            </Text>
                            <Text style={styles.bookDate}>
                                End Date: {book.end_date}
                            </Text>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 999, // Ensure it's above other elements
    },
    closeButtonText: {
        fontSize: 20,
        color: "#FF5A5F",
    },
    addButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#55BCF6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5, // Add border radius
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    imageContainer: {
        position: "relative",
        width: 100,
        height: 150,
        borderRadius: 10,
        overflow: "hidden", // Clip child components to the container's bounds
    },
    cameraButton: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        padding: 10,
    },
    bookCard: {
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
    bookImage: {
        width: 100,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
    bookDetails: {
        flex: 1,
        marginLeft: 10,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    bookDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    bookDate: {
        fontSize: 14,
        color: "#889CB6",
    },
    scrollView: {
        flex: 1,
    },
});

export default BookList;
