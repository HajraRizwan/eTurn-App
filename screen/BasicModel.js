import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BasicModel() {
  const [modelOpen, setModelOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && email && suggestion) {
      setSubmitted(true);
      Alert.alert('Success', 'Your suggestion has been submitted!');
      setModelOpen(false); // Close modal
      setName('');
      setEmail('');
      setSuggestion('');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <>
      <Modal visible={modelOpen} animationType="slide">
        <View style={styles.modalContainer}>
          <Icon name="close" size={30} style={styles.closeIcon} onPress={() => setModelOpen(false)} />
          <Image
            source={{
              uri: 'https://i0.wp.com/printex.co.za/wp-content/uploads/2023/10/Medium-Acrylic-Clear-Suggestion-Box.jpg?fit=500%2C500&ssl=1',
            }}
            style={styles.image}
          />
          {!submitted ? (
            <View>
              <Text style={styles.heading}>Submit a Suggestion</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={(val) => setName(val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={(val) => setEmail(val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Your Suggestion"
                value={suggestion}
                onChangeText={(val) => setSuggestion(val)}
                multiline
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.thankYouText}>Thank you for your suggestion!</Text>
          )}
        </View>
      </Modal>
      <View style={styles.iconContainer}>
        <Text style={styles.text}>Want to add Suggestions?</Text>
        <Icon name="add" size={30} style={styles.addIcon} onPress={() => setModelOpen(true)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#000',
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
  },
  addIcon: {
    marginTop: 10,
    color: '#FF4081',
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF4081',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});