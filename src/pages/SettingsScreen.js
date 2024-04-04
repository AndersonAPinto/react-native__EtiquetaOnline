import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch, FlatList, ScrollView } from 'react-native';
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
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const loadVisibleItemIds = async () => {
            try {
                const visibleItemIdsString = await AsyncStorage.getItem('visibleItemIds');
                const visibleItemIds = visibleItemIdsString ? JSON.parse(visibleItemIdsString) : [];
                setSelectedItems(visibleItemIds);
            } catch (error) {
                console.log('Erro ao carregar IDs visíveis', error);
            }
        };

        loadVisibleItemIds();
    }, []);

    const handleCheckboxChange = (itemId) => {
        setSelectedItems(currentSelectedItems =>
            currentSelectedItems.includes(itemId)
                ? currentSelectedItems.filter(id => id !== itemId)
                : [...currentSelectedItems, itemId]
        );
    };

    const handleKmChange = async () => {
        try {
            await AsyncStorage.setItem('myKey', kmMain);
            await AsyncStorage.setItem('maintenanceInterval10000', maintenanceInterval10000.toString());
            await AsyncStorage.setItem('maintenanceInterval20000', maintenanceInterval20000.toString());
            await AsyncStorage.setItem('maintenanceInterval50000', maintenanceInterval50000.toString());
            console.log('Dado salvo!');
            //navigation.navigate('StartScreen', { kmMain });
        } catch (error) {
            console.log('Erro ao salvar o dado', error);
            alert('Erro ao salvar os dados');
        }
        console.log(kmMain)
        setKmMain('')
    };

    const repairItems = [
        { id: '1', iconType: 'image', icon: require('../images/indicador-de-oleo.png'), title: 'Óleo do Motor', subtitle: `Próxima Revisão` },
        { id: '2', iconType: 'image', icon: require('../images/filtro-de-oleo.png'), title: 'Filtro de Óleo', subtitle: `Próxima Revisão:` },
        { id: '3', iconType: 'image', icon: require('../images/filtro.png'), title: 'Filtro de Combustível', subtitle: `Próxima Revisão:` },
        { id: '4', iconType: 'image', icon: require('../images/filtro-de-ar.png'), title: 'Filtro de Ar', subtitle: `Próxima Revisão: ` },
        { id: '5', iconType: 'image', icon: require('../images/filtro-de-ar (1).png'), title: 'Filtro de Cabine', subtitle: `Próxima Revisão:` },
        { id: '6', iconType: 'image', icon: require('../images/mudanca-de-marcha.png'), title: 'Fluído de Transmissão', subtitle: `Próxima Revisão: ` },
        { id: '7', iconType: 'image', icon: require('../images/car-service.png'), title: 'Geometria', subtitle: `Próxima Revisão: ` },
        { id: '8', iconType: 'image', icon: require('../images/car.png'), title: 'Balanceamento', subtitle: `Próxima Revisão: ` },

    ];


    const savePreferences = async () => {
        try {
            await AsyncStorage.setItem('visibleItemIds', JSON.stringify(selectedItems));
            console.log('Preferências salvas com sucesso!');
            // Navegar de volta para a StartScreen ou mostrar um feedback
        } catch (error) {
            console.log('Erro ao salvar preferências', error);
        }
    };
    const updatePress = async () => {
        try {
            await handleKmChange();
            await savePreferences();
            //navigation.navigate('StartScreen');//, { selectedItems }
        } catch (error) {
            console.log('Erro ao atualizar e salvar dados:', error);
        }
    };

    const renderRepairItem = (item) => (
        <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Switch
                value={selectedItems.includes(item.id)}
                onValueChange={() => handleCheckboxChange(item.id)}
            />
        </View>
    );
    

    return (
        <SafeAreaView style={{ flex: 1 }}> 
            <View style={styles.container}>
                {/*<View style={styles.painelInput}>
                    <Text style={{ fontSize: 15, color: '#FFF' }}>Quilometragem Atual: </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={kmMain}
                        onChangeText={setKmMain}
                    />
                </View>*/}
               <ScrollView>
                <View>
                    {/*{repairItems.map(item => renderRepairItem(item)(
                        <View key={item.id}>
                            <Text>{item.title}</Text>
                            <Switch
                                value={selectedItems.includes(item.id)}
                                onValueChange={() => handleCheckboxChange(item.id)}
                            />
                        </View>
                    ))}*/}
                    {repairItems.map(item => renderRepairItem(item))} 
                </View>
                {/*<View style={styles.painelInput}>
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
                    />*/}
                <TouchableOpacity
                    style={styles.btn}
                    onPress={updatePress}
                    
                >
                    <FontAwesome5 name='sync' size={20} color={'#FFF'} />
                    <Text style={{ color: '#FFF', fontSize: 12 }}>Atualizar</Text>
                </TouchableOpacity></ScrollView>
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
    inputPeriodo: {
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
