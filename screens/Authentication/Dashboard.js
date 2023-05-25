import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from 'expo-document-picker';

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync();
      if (doc.type === "success") {
        setUploadedFiles([...uploadedFiles, doc]);
      }
    } catch (err) {
      if (err.type === 'cancel') {
        console.log("User cancelled the upload");
      } else {
        console.log(err);
      }
    }
  };

  const deleteFile = (file) => {
    const updatedFiles = uploadedFiles.filter((uploadedFile) => uploadedFile.uri !== file.uri);
    setUploadedFiles(updatedFiles);
  };

  const renderItem = ({ item }) => (
    <View style={styles.fileItem}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteFile(item)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text style={{ color: 'black', fontSize: 28, textAlign: 'center', marginVertical: 40 }}>DOCUMENT PICKER</Text>
      <View style={{ marginHorizontal: 40 }}>
        <Button title="Select Document" onPress={selectDoc} />
      </View>
      <FlatList
        data={uploadedFiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteText: {
    color: 'red',
  },
});

export default Dashboard;
