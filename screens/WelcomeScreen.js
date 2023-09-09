import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// Image

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/app_bg.jpeg')} 
        style={styles.logo}
      />
      <Text style={styles.appName}>crust</Text>
      <Text style={styles.description}>
        Stay organized and boost your productivity with this amazing Task Manager app.
      </Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={handleGetStarted}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#702F02",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 24,
  },
  description: {
    fontSize: 20,
    color: '#fffaf6',
    marginTop: 10,
    textAlign: 'center',
    padding: 20,
   
  },
  getStartedButton: {
    backgroundColor: 'white', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 24,
  },
  getStartedButtonText: {
    color: '#702F02',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
