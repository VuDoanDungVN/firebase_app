import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthenticatedScreen from "./app/screens/Home";
import UserScreen from "./app/screens/UserScreen";
import SearchScreen from "./app/screens/Search";
import LocationScreen from "./app/screens/Location";
import CalendarScreen from "./app/screens/Calendar";

const firebaseConfig = {
  apiKey: "AIzaSyC8hj9ZODCcvbBsDPxknRiAmcP4zFZgBvo",
  authDomain: "loginapp-6447a.firebaseapp.com",
  projectId: "loginapp-6447a",
  storageBucket: "loginapp-6447a.appspot.com",
  messagingSenderId: "849150971302",
  appId: "1:849150971302:web:b5042d823c23c5f1ee9367",
};

const app = initializeApp(firebaseConfig);
const Tab = createBottomTabNavigator();

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
  errorMessage,
}: any) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#3498db" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={30} color="#3498db" style={styles.iconPass} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={handleAuthentication}>
        <View style={styles.buttonContainer}>
          <Text style={{ color: "#fff", fontSize: 20 }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<user | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      setErrorMessage(""); // Clear previous error messages
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created successfully!");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/email-already-in-use")) {
          setErrorMessage(
            "The email address is already in use by another account."
          );
        } else {
          setErrorMessage(error.message);
        }
        console.error("Authentication error:", error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "dashboard";
              } else if (route.name === "User") {
                iconName = "person";
              } else if (route.name === "Search") {
                iconName = "search";
              } else if (route.name === "Location") {
                iconName = "add-location-alt";
              } else if (route.name === "Calendar") {
                iconName = "calendar-month";
              }
              return <MaterialIcons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: "#456FE8",
            tabBarInactiveTintColor: "#c0c6d7",
          })}
        >
          <Tab.Screen name="Home" component={AuthenticatedScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Location" component={LocationScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.container}>
            <AuthScreen
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              handleAuthentication={handleAuthentication}
              errorMessage={errorMessage}
            />
          </View>
        </ScrollView>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  authContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
  },
  icon: {
    marginRight: 8,
    color: "#5F5F5F",
    fontSize: 16,
  },
  iconPass: {
    marginRight: 8,
    color: "#5F5F5F",
    fontSize: 25,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    height: 50,
    marginBottom: 16,
    borderRadius: 10,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default App;
