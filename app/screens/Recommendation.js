import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const Rocommendation = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require("../assets/book1.jpg")}
                    style={styles.image}
                />
                <View style={styles.details}>
                    <Text style={styles.title}>The Great Gatsby</Text>
                    <Text style={styles.description}>
                        A novel by F. Scott Fitzgerald
                    </Text>
                    <Text style={styles.date}>Start Date: 2024-04-15</Text>
                    <Text style={styles.date}>End Date: 2024-04-30</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FF",
        padding: 20,
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
});

export default BookList;
