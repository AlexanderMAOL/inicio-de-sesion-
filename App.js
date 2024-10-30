import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImageUri, setSelectedImageUri] = useState(require('./assets/ini.jpg'));

    const selectImageFromGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permisos son requeridos');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImageUri({ uri: result.assets[0].uri });
        } else {
            Alert.alert('No se seleccionó ninguna imagen.');
        }
    };

    const takePhotoWithCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permisos son requeridos');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImageUri({ uri: result.assets[0].uri });
        } else {
            Alert.alert('No se tomó ninguna foto.');
        }
    };

    const handleLogin = () => {
        Alert.alert('Inicio de sesión exitoso :)');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>INICIAR SESIÓN</Text>
            <Image source={selectedImageUri} style={styles.image} />
            <Text style={styles.title}>Usuario</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholderTextColor="#fff"
            />
            <Text style={styles.title}>Contraseña</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#fff"
            />
            <TouchableOpacity style={styles.button} onPress={selectImageFromGallery}>
                <Text style={styles.buttonText}>Seleccionar Imagen de la Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
                <Text style={styles.buttonText}>Tomar Foto con la Cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 30,
        color: '#fff',
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#000', // Color del texto ingresado
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#8a2be2',
        padding: 10,
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default App;
