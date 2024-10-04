import { View, Text, Image, StyleSheet, Button, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { TouchableOpacity } from "react-native";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8hj9ZODCcvbBsDPxknRiAmcP4zFZgBvo",
  authDomain: "loginapp-6447a.firebaseapp.com",
  projectId: "loginapp-6447a",
  storageBucket: "loginapp-6447a.appspot.com",
  messagingSenderId: "849150971302",
  appId: "1:849150971302:web:b5042d823c23c5f1ee9367",
};

const app = initializeApp(firebaseConfig);

export default function UserScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/slide/6.jpg")}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>{user ? user.email : "Guest"}</Text>
          <Text style={styles.userSubText}>Developer </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Ionicons name="notifications" size={24} color="#90939D" />
        <View>
          <Text style={styles.userName}>Notifications</Text>
          <Text style={styles.userSubText}>Change Notification Settings</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Fontisto name="key" size={24} color="#90939D" />
        <View>
          <Text style={styles.userName}>Password</Text>
          <Text style={styles.userSubText}>Change Password Settings</Text>
        </View>
      </View>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleAuthentication}>
          <View style={styles.authButton}>
            <Button title={isLogin ? "Login" : "Sign Up"} color={"#fff"} />
          </View>
        </TouchableOpacity>
      </View> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.editProfileButton}>
            <Button title="Edit Profile" color={"#fff"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.editProfileButton}>
            <Button title="Logout" color={"#fff"} />
          </View>
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    backgroundColor: "#f9f9f9",
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: "#c0c6d7",
    marginVertical: 5,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 100,
    padding: 10,
    margin: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#25272B",
  },
  userSubText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#90939D",
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "#c0c6d7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  authButton: {
    backgroundColor: "#456FE8",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 5,
  },
  editProfileButton: {
    backgroundColor: "#456FE8",
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 5,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
