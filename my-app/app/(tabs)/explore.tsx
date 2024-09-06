import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";

export default function TabTwoScreen() {
  const webViewRef = useRef<any>();

  const handleMessage = (message: any) => {
    if (message) {
      let parsedMessage = null;
      try {
        parsedMessage = JSON.parse(message?.nativeEvent?.data);
      } catch (error) {
        parsedMessage = null;
      }

      if (parsedMessage) {
        if (parsedMessage.type === "GO_HOME") {
          router.push("/(tabs)/");
        }
      }
    }
  };

  const incrementCount = () => {
    webViewRef.current?.postMessage(JSON.stringify({ type: "INCREMENT" }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: "http://localhost:5173/" }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        ref={webViewRef}
      />
      <TouchableOpacity
        style={styles.floatAction}
        onPress={() => incrementCount()}
      >
        <AntDesign name="plus" size={30} color={"white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatAction: {
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: "#ff5000",
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
