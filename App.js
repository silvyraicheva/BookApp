// import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    View,
    Dimensions,
} from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import BookList from "./app/screens/BookList";
export default function App() {
    // return <WelcomeScreen />;
    return (
        <View style={styles.container}>
            <BookList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FF",
        // alignItems: "center",
        // justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 2 : 0,
    },
});
