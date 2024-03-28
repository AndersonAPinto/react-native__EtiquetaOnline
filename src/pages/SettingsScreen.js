import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {

    const [kmMain, setKmMain] = useState('');
    const navigation = useNavigation();
    const [maintenanceInterval10000, setMaintenanceInterval10000] = useState('');
    const [maintenanceInterval20000, setMaintenanceInterval20000] = useState('');
    const [maintenanceInterval50000, setMaintenanceInterval50000] = useState('');

    const handleKmChange = async () => {
        try {
            await AsyncStorage.setItem('myKey', kmMain);
            await AsyncStorage.setItem('maintenanceInterval10000', maintenanceInterval10000.toString());
            await AsyncStorage.setItem('maintenanceInterval20000', maintenanceInterval20000.toString());
            await AsyncStorage.setItem('maintenanceInterval50000', maintenanceInterval50000.toString());
            console.log('Dado salvo!');
            navigation.navigate('StartScreen', { kmMain });
        } catch (error) {
            console.log('Erro ao salvar o dado', error);
            alert('Erro ao salvar os dados');
        }
        console.log(kmMain)
        setKmMain('')
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.painelInput}>
                    <Text style={{ fontSize: 15, color: '#FFF' }}>Quilometragem Atual: </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={kmMain}
                        onChangeText={setKmMain}
                    />
                </View>
                <View style={styles.painelInput}>
                    <Text style={{ color: '#FFF', fontSize: 15 }}> Ajuste o intervalo de Revisão </Text>
                </View>
                
                <TextInput
                    style={styles.inputPeriodo}
                    placeholder="Informe o novo intervalo de manutenção dos 10000"
                    value={maintenanceInterval10000}
                    onChangeText={setMaintenanceInterval10000}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.inputPeriodo}
                    placeholder="Informe o novo intervalo de manutenção dos 20000"
                    value={maintenanceInterval20000}
                    onChangeText={setMaintenanceInterval20000}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.inputPeriodo}
                    placeholder="Informe o novo intervalo de manutenção dos 50000"
                    value={maintenanceInterval50000}
                    onChangeText={setMaintenanceInterval50000}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleKmChange}
                >
                    <FontAwesome5 name='sync' size={20} color={'#FFF'} />
                    <Text style={{ color: '#FFF', fontSize: 12 }}>Atualizar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#1b376f',
        height: 'auto'
    },
    painelInput: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 15,
        backgroundColor: '#10214e',
        width: '93%',
        justifyContent: 'space-around',
        height: 50,

    },
    input: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#F44F28',
        padding: 5,
        margin: 0,
        color: '#FFF',
        borderRadius: 10,
    },
    btn: {
        width: '93%',
        height: 55,
        backgroundColor: '#F44F28',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    inputPeriodo:{
        width: '95%',
        borderWidth: 1,
        borderColor: '#F44F28',
        padding: 5,
        margin: 0,
        color: '#FFF',
        borderRadius: 10,
    },
});
export default SettingsScreen
