import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Modal, Image, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoItem from './InfoItens';
import StorageManager from './StorageManager';
import * as Notifications from 'expo-notifications';
import '../music/mixkit-clear-announce-tones-2861.wav';
import { FontAwesome5 } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';




const StartScreen = () => {
    const [kmMain, setKmMain] = useState('10000')
    const [nextRepair, setNextRepair] = useState(null);
    const [nextRepair20000, setNextRepair20000] = useState(null);
    const [nextRepair50000, setNextRepair50000] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [maintenanceInterval10000, setMaintenanceInterval10000] = useState(10000);
    const [maintenanceInterval20000, setMaintenanceInterval20000] = useState(20000);
    const [maintenanceInterval50000, setMaintenanceInterval50000] = useState(50000);

    const repairItems = [
        { id: '1', iconType: 'image', icon: require('../images/indicador-de-oleo.png'), title: 'Óleo do Motor', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '2', iconType: 'image', icon: require('../images/filtro-de-oleo.png'), title: 'Filtro de Óleo', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '3', iconType: 'image', icon: require('../images/filtro.png'), title: 'Filtro de Combustível', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '4', iconType: 'image', icon: require('../images/filtro-de-ar.png'), title: 'Filtro de Ar', subtitle: `Próxima Revisão: ${nextRepair20000} km` },
        { id: '5', iconType: 'image', icon: require('../images/filtro-de-ar (1).png'), title: 'Filtro de Cabine', subtitle: `Próxima Revisão: ${nextRepair20000} km` },
        { id: '6', iconType: 'image', icon: require('../images/mudanca-de-marcha.png'), title: 'Fluído de Transmissão', subtitle: `Próxima Revisão: ${nextRepair50000} km` },
        { id: '7', iconType: 'image', icon: require('../images/car-service.png'), title: 'Geometria', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '8', iconType: 'image', icon: require('../images/car.png'), title: 'Balanceamento', subtitle: `Próxima Revisão: ${nextRepair} km` },

    ];

    async function askNotificationPermission() {
        await Notifications.requestPermissionsAsync();
        //console.log('Status da permissão de notificação:', status);
        return true;
    }

    useEffect(() => {
        askNotificationPermission();
    }, []);

    async function sendNotification(itemName) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Manutenção Necessária!",
                body: `É hora de verificar: ${itemName}`,
            },
            trigger: { seconds: 10 }, // Envie imediatamente
        });
    }

    const renderItem = ({ item }) => {
        const repairKm = parseInt(kmMain, 10);
        let borderColor = {};
        let repairValue;
        switch (item.title) {
            case 'Óleo do Motor':
            case 'Filtro de Óleo':
            case 'Filtro de Combustível':
            case 'Geometria':
            case 'Balanceamento':
                repairValue = parseInt(nextRepair, 10);
                break;
            case 'Filtro de Cabine':
            case 'Filtro de Ar':
                repairValue = parseInt(nextRepair20000, 10);
                break;
            case 'Fluído de Transmissão':
                repairValue = parseInt(nextRepair50000, 10);
                break;
        }

        if (repairKm >= repairValue) {
            borderColor = { borderWidth: 2, borderColor: '#F44F28' };
            sendNotification(item.title);
        }

        const resetItem = () => {
            if (['Óleo do Motor', 'Filtro de Óleo', 'Filtro de Combustível', 'Geometria', 'Balanceamento'].includes(item.title)) {
                setNextRepair(null);
            }
            else if (['Filtro de Ar', 'Filtro de Cabine'].includes(item.title)) {
                setNextRepair20000(null);
            }
            else if (item.title === 'Fluído de Transmissão') {
                setNextRepair50000(null);
            }

        };

        return (
            <InfoItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                iconType={item.iconType}
                style={borderColor}
                onReset={resetItem}
            />
        )

    }

    useEffect(() => {
        onDataRetrieved(kmMain);
    }, [kmMain, nextRepair, nextRepair20000, nextRepair50000]);

    {/*useEffect(() => {
        const loadMaintenanceInterval = async () => {
            try {
                const interval10000 = await AsyncStorage.getItem('maintenanceInterval10000');
                const interval20000 = await AsyncStorage.getItem('maintenanceInterval20000');
                const interval50000 = await AsyncStorage.getItem('maintenanceInterval50000');

                if (interval10000 !== null) {
                    const intervalNumber10000 = parseInt(interval10000, 10);
                    setMaintenanceInterval10000(intervalNumber10000);
                }
                else if (interval20000 !== null) {
                    const intervalNumber20000 = parseInt(interval20000, 10);
                    setMaintenanceInterval20000(intervalNumber20000);
                }
                else if (interval50000 !== null) {
                    const intervalNumber50000 = parseInt(interval50000, 10);
                    setMaintenanceInterval50000(intervalNumber50000);
                }
            } catch (e) {
                alert('Falha ao carregar o intervalo de manutenção');
            }
        };

        loadMaintenanceInterval();
    }, []);*/}

    useFocusEffect(
        React.useCallback(() => {
        const loadMaintenanceInterval = async () => {
            try {
                const interval10000 = await AsyncStorage.getItem('maintenanceInterval10000');
                const interval20000 = await AsyncStorage.getItem('maintenanceInterval20000');
                const interval50000 = await AsyncStorage.getItem('maintenanceInterval50000');

                setMaintenanceInterval10000(interval10000 ? parseInt(interval10000, 10) : 10000);
                setMaintenanceInterval20000(interval20000 ? parseInt(interval20000, 10) : 20000);
                setMaintenanceInterval50000(interval50000 ? parseInt(interval50000, 10) : 50000);
            } catch (e) {
                alert('Falha ao carregar o intervalo de manutenção');
            }
        };
        loadMaintenanceInterval()
        return () => {
        ;}
    }, []));

    const onDataRetrieved = (data) => {
        setKmMain(data);
        if (nextRepair === null) {
            setNextRepair(parseInt(data) + maintenanceInterval10000);
        }
        if (nextRepair20000 === null) {
            setNextRepair20000(parseInt(data) + maintenanceInterval20000);
        }
        if (nextRepair50000 === null) {
            setNextRepair50000(parseInt(data) + maintenanceInterval50000);
        }

        //console.log('Os dados em onDataRetrieved é: ', data);
    };

    const renderDigits = () => {
        return kmMain ? kmMain.split('').map((digit, index, array) => {
            const isLastDigit = index === array.length - 1; // Verifica se é o último dígito
            return (
                <>
                    <StorageManager onDataRetrieved={onDataRetrieved} />
                    <Text
                        key={index.toString()}
                        style={[
                            styles.digit,
                            isLastDigit ? styles.lastDigit : styles.regularDigit,
                        ]}>
                        {digit}
                    </Text>
                </>
            );
        }) : null;
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const OdometroUpdate = async () => {
        let newData = inputValue;
        setModalVisible(false);
        setInputValue("");
        setKmMain(newData);
        await AsyncStorage.setItem('myKey', newData);
        onDataRetrieved(newData);
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.modalText}
                                onChangeText={setInputValue}
                                value={inputValue}
                                keyboardType="numeric"
                                selectionColor="#F44F28"
                                placeholder='Altere Km'
                                placeholderTextColor="#424242"
                            />
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={OdometroUpdate}>
                                <FontAwesome5 name='sync' size={30} color={'#F44F28'} />
                                <Text style={{ color: '#FFF', fontSize: 12 }}>Atualizar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.painel}>
                    <Text style={{ color: '#FFF', marginBottom: 1, }}>Etiqueta Online</Text>
                    <Image source={require('../images/oil (1).png')} style={{ width: 100, height: 100, }} />
                    <View style={styles.backgroundOdometer}>
                        <TouchableOpacity onPress={showModal}>
                            <View style={styles.odometer}>
                                {renderDigits()}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#FFF', fontSize: 12, marginBottom: '1%' }}>hodômetro</Text>
                </View>
                <FlatList
                    data={repairItems}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
                <View
                    style={{
                        width: '93%',
                        height: 62,
                        backgroundColor: '#1b376f'
                    }}>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1b376f',
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'start',
        alignItems: "center",
        backgroundColor: 'rgba(3, 3, 3, 0.6)',
        paddingVertical: '70%',
    },
    modalView: {
        backgroundColor: "#1C1C1C",
        borderRadius: 20,
        padding: 20,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
    },
    modalText: {
        width: 90,
        borderWidth: 1,
        borderColor: '#F44F28',
        padding: 3,
        marginBottom: 10,
        color: '#FFF',
        textAlign: 'center',
        borderRadius: 10,
        height: 40,
    },
    painel: {
        width: '93%',
        height: '35%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#10214e',
        marginBottom: '1%',
        marginTop: '1%',
    },
    backgroundOdometer: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: '33%',
        borderRadius: 20
    },
    odometer: {
        flexDirection: 'row',
        padding: 10,
    },
    digit: {
        fontSize: 34,
        color: '#FFF',
        borderRadius: 5,
    },
    regularDigit: {
        backgroundColor: '#313138',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 3,
        color: '#FFF',
    },
    lastDigit: {
        backgroundColor: '#313138',
        //backgroundColor: 'red',
        padding: 5,
        paddingHorizontal: 10,
        marginLeft: 3,
    },
});

export default StartScreen;
