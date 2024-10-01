import React from "react";
import { View, TextInput, Button, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const SearchScreen = ({ inactiveStyle }: any) => {
  const [text, setText] = React.useState<string>("");

  return (
    <View style={{ padding: 5 }}>
      <TextInput
        placeholder="Enter your keyword..."
        value={text}
        onChangeText={(text) => setText(text)}
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderRadius: 10,
        }}
      />
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#456FE8",
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            marginVertical: 10,
            borderRadius: 5,
          }}
        >
          <Button title="Search" color={"#fff"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchScreen;
