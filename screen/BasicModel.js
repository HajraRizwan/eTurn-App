import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { firebaseDatabase } from "../firebase";
import { ref, push } from "firebase/database";
import { Formik } from "formik";
import * as Yup from "yup";

export default function BasicModel() {
  const [modelOpen, setModelOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigation = useNavigation();

  // Validation schema for Formik
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    suggestion: Yup.string().required("Suggestion is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const suggestionsRef = ref(firebaseDatabase, "suggestions");
    const newSuggestion = {
      ...values,
      timestamp: Date.now(),
    };

    push(suggestionsRef, newSuggestion)
      .then(() => {
        setSubmitted(true);
        Alert.alert("Success", "Your suggestion has been submitted!");
        setModelOpen(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Firebase Error:", error);
        Alert.alert("Error", "Failed to submit suggestion. Please try again.");
      });
  };

  return (
    <>
      <Modal visible={modelOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Icon name="close" size={30} style={styles.closeIcon} onPress={() => setModelOpen(false)} />
            <Image
              source={{
                uri: "https://i0.wp.com/printex.co.za/wp-content/uploads/2023/10/Medium-Acrylic-Clear-Suggestion-Box.jpg?fit=500%2C500&ssl=1",
              }}
              style={styles.image}
            />
            {!submitted ? (
              <Formik
                initialValues={{ name: "", email: "", suggestion: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <Text style={styles.heading}>Submit a Suggestion</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Your Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                    {touched.name && errors.name && (
                      <Text style={{ color: "red", marginBottom: 10 }}>{errors.name}</Text>
                    )}
                    <TextInput
                      style={styles.input}
                      placeholder="Your Email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                    />
                    {touched.email && errors.email && (
                      <Text style={{ color: "red", marginBottom: 10 }}>{errors.email}</Text>
                    )}
                    <TextInput
                      style={styles.input}
                      placeholder="Your Suggestion"
                      value={values.suggestion}
                      onChangeText={handleChange("suggestion")}
                      onBlur={handleBlur("suggestion")}
                      multiline
                    />
                    {touched.suggestion && errors.suggestion && (
                      <Text style={{ color: "red", marginBottom: 10 }}>{errors.suggestion}</Text>
                    )}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            ) : (
              <Text style={styles.thankYouText}>Thank you for your suggestion!</Text>
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.screenContainer}>
        {/* Back Icon */}
        <Icon
          name="arrow-back"
          size={30}
          style={styles.backIcon}
          onPress={() => navigation.goBack()} // Navigate back to the previous screen
        />
        <View style={styles.iconContainer}>
          <Text style={styles.text}>Want to add Suggestions?</Text>
          <Icon name="add" size={30} style={styles.addIcon} onPress={() => setModelOpen(true)} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: 300,
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "#000",
  },
  text: {
    fontSize: 16,
    marginTop: 340,
  },
  screenContainer: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
  },
  backIcon: {
    marginTop: 30,
    marginLeft: 10,
    color: "#FF4081",
  },
  addIcon: {
    marginTop: 10,
    color: "#FF4081",
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#73004d",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
