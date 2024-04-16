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
} from "react-native";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import BookList from "./app/screens/BookList";
import Recommendation from "./app/screens/Recommendation";

const Drawer = createDrawerNavigator();
export default function App() {
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
