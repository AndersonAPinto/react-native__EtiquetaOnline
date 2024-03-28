import React from "react";
import { Image, StyleSheet } from "react-native";

const ScreenImages = ({source, style}) => {
    return <Image source={source} style={[styles.image, style]} />;
}


const styles = StyleSheet.create({
    image: {
      width: 30, 
      height: 30,
      padding: 20,
    },
  });
export default ScreenImages
