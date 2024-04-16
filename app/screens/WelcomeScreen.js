import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

function WelcomeScreen(props) {
    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Lorem Ipsum</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Username" />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F8FF",
    },
    logoContainer: {
        marginBottom: 40,
    },
    logoText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    inputContainer: {
        width: "80%",
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    loginButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#889CB6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    registerButton: {
        width: "100%",
        height: 40,
        backgroundColor: "#DBD9DF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default WelcomeScreen;
