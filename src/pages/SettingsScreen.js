import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {

    const [kmMain, setKmMain] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const navigation = useNavigation();
    const [maintenanceInterval10000, setMaintenanceInterval10000] = useState('10000km');
    const [maintenanceInterval20000, setMaintenanceInterval20000] = useState('20000km');
    const [maintenanceInterval24000, setMaintenanceInterval24000] = useState('24000km');
    const [maintenanceInterval40000, setMaintenanceInterval40000] = useState('40000km');
    const [maintenanceInterval50000, setMaintenanceInterval50000] = useState('50000km');
    const [maintenanceInterval80000, setMaintenanceInterval80000] = useState('80000km');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const loadVisibleItemIds = async () => {
            try {
                const visibleItemIdsString = await AsyncStorage.getItem('visibleItemIds');
                const visibleItemIds = visibleItemIdsString ? JSON.parse(visibleItemIdsString) : [];
                setSelectedItems(visibleItemIds);
            } catch (error) {
                //console.log('Erro ao carregar IDs visíveis', error);
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
            const kmMainValue = kmMain.toString();
            await AsyncStorage.setItem('myKey', kmMainValue);
            await AsyncStorage.setItem('maintenanceInterval10000', maintenanceInterval10000.toString());
            await AsyncStorage.setItem('maintenanceInterval20000', maintenanceInterval20000.toString());
            await AsyncStorage.setItem('maintenanceInterval50000', maintenanceInterval50000.toString());
            //console.log('Dado salvo!');
            //navigation.navigate('StartScreen', { kmMain });
            setKmMain('')
        } catch (error) {
            //console.log('Erro ao salvar o dado', error);
            alert('Erro ao salvar os dados');
        }
        //console.log(kmMainValue)

    };

    const repairItems = [
        { id: '1', title: 'Óleo do Motor' },
        { id: '2', title: 'Filtro de Óleo' },
        { id: '3', title: 'Filtro de Combustível' },
        { id: '4', title: 'Filtro de Ar' },
        { id: '5', title: 'Filtro de Cabine' },
        { id: '6', title: 'Fluído de Transmissão' },
        { id: '7', title: 'Geometria' },
        { id: '8', title: 'Balanceamento' },
        { id: '9', title: 'Verificação dos Pneus' },
        { id: '10', title: 'Velas de Ignição' },
        { id: '11', title: 'Verif/ Ajuste das Válvulas' },
        { id: '12', title: 'Suspensão' },
        { id: '13', title: 'Fluído de Freio' },
        { id: '14', title: 'Fluído de Arrefecimento' },
    ];

    const savePreferences = async () => {
        try {
            await AsyncStorage.setItem('visibleItemIds', JSON.stringify(selectedItems));
            //console.log('Preferências salvas com sucesso!');
            navigation.navigate('StartScreen', { updated: true })
            // Navegar de volta para a StartScreen ou mostrar um feedback
        } catch (error) {
            //console.log('Erro ao salvar preferências', error);
        }
    };

    const updatePress = async () => {
        try {
            await handleKmChange();
            await savePreferences();
            //;//, { selectedItems }
        } catch (error) {
            //console.log('Erro ao atualizar e salvar dados:', error);
        }
    };

    const renderRepairItem = (item) => (
        <View key={item.id.toString()} style={styles.containerRender}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Switch
                trackColor={{ false: "gray", true: "#861D05" }}
                style={{ alignItems: 'center' }}
                value={selectedItems.includes(item.id)}
                onValueChange={() => handleCheckboxChange(item.id)}
                thumbColor={isEnabled ? "#f44f28" : "#f44f28"}
            />
        </View>
    );


    return (
        <>
            <StatusBar barStyle="light-content"  />
            <SafeAreaView style={{backgroundColor: '#10214e'}}>
                <View style={styles.container}>
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: 2, padding: 10 }}>Itens Visualizados</Text>
                        {repairItems.map(item => renderRepairItem(item))}
                        <Text style={{ color: '#FFF', fontSize: 17, fontWeight: 'bold', marginLeft: 10, marginBottom: 2, padding: 10 }}> Ajuste o intervalo de Revisão </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, marginLeft: 12, marginRight: 12, marginBottom: 10, }}>
                            {/*<Text style={{ color: '#FFF'}}>10000km</Text>*/}
                            <TextInput
                                style={styles.inputPeriodo}
                                placeholder="Ex:.10000km"
                                value={maintenanceInterval10000}
                                onChangeText={setMaintenanceInterval10000}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.inputPeriodo}
                                placeholder="Ex:.20000km"
                                value={maintenanceInterval20000}
                                onChangeText={setMaintenanceInterval20000}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.inputPeriodo}
                                placeholder="Ex:.24000km"
                                value={maintenanceInterval24000}
                                onChangeText={setMaintenanceInterval24000}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', fontSize: 12, marginLeft: 12, marginRight: 12, marginBottom: 5, }}>
                            <TextInput
                                style={styles.inputPeriodo}
                                placeholder="Ex:.40000km"
                                value={maintenanceInterval40000}
                                onChangeText={setMaintenanceInterval40000}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.inputPeriodo}
                                placeholder="Ex:.50000km"
                                value={maintenanceInterval50000}
                                onChangeText={setMaintenanceInterval50000}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.inputPeriodo}
                                placeholder="Ex:.80000km"
                                value={maintenanceInterval80000}
                                onChangeText={setMaintenanceInterval80000}
                                keyboardType="numeric"
                            />

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5, }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={updatePress}
                            >
                                <FontAwesome5 name='sync' size={20} color={'#FFF'} />
                                <Text style={{ color: '#FFF', fontSize: 10 }}>Atualizar</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#1b376f',
        height: 'auto',
        flexDirection: 'row',
        marginBottom: 50

    },
    containerRender: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#10214e',
        height: 50,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        width: 'auto',
        borderRadius: 10,
        marginBottom: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    btn: {
        width: '15%',
        height: 55,
        backgroundColor: '#F44F28',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputPeriodo: {
        width: '30%',
        borderWidth: 1,
        borderColor: '#F44F28',
        padding: 5,
        borderRadius: 50,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#81715B',
    },
    itemText: {
        color: '#FFF',
    },
    link: {
        color: '#FFF',
        marginTop: 2,
        fontSize: 12,
        marginBottom: 10,
    }
});
export default SettingsScreen
