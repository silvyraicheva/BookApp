// import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    View,
    Dimensions,
    Text,
} from "react-native";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import BookList from "./app/screens/BookList";
import Recommendation from "./app/screens/Recommendation";
// import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { setupDatabase } from "./database";
const Drawer = createDrawerNavigator();
export default function App() {
    useEffect(() => {
        setupDatabase();
    }, []);

    // const db = SQLite.openDatabase("books.db");
    // const [isLoading, setIsLoading] = useState(true);
    // const [books, setBooks] = useState([]);
    // const [currentBook, setCurrentBook] = useState(undefined);
    // if (isLoading) {
    //     return (
    //         <View>
    //             <Text>Loading books...</Text>
    //         </View>
    //     );
    // }
    // return <WelcomeScreen />;
    return (
        // <View style={styles.container}>
        //     <BookList />
        // </View>
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Books Read" component={BookList} />

                <Drawer.Screen
                    name="Recommendations"
                    component={Recommendation}
                />
            </Drawer.Navigator>
        </NavigationContainer>
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
