import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Modal, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoItem from './InfoItens';
import StorageManager from './StorageManager';
import * as Notifications from 'expo-notifications';
import '../music/mixkit-clear-announce-tones-2861.wav';
import { FontAwesome5 } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';




const StartScreen = () => {
    const [kmMain, setKmMain] = useState('00000')
    const [nextRepair, setNextRepair] = useState(null);
    const [nextRepair20000, setNextRepair20000] = useState(null);
    const [nextRepair24000, setNextRepair24000] = useState(null);
    const [nextRepair40000, setNextRepair40000] = useState(null);
    const [nextRepair50000, setNextRepair50000] = useState(null);
    const [nextRepair80000, setNextRepair80000] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [maintenanceInterval10000, setMaintenanceInterval10000] = useState(10000);
    const [maintenanceInterval20000, setMaintenanceInterval20000] = useState(20000);
    const [maintenanceInterval24000, setMaintenanceInterval24000] = useState(24000);
    const [maintenanceInterval40000, setMaintenanceInterval40000] = useState(40000);
    const [maintenanceInterval50000, setMaintenanceInterval50000] = useState(50000);
    const [maintenanceInterval80000, setMaintenanceInterval80000] = useState(80000);
    const [filteredRepairItems, setFilteredRepairItems] = useState([]);

    const resetApp = () => {
        setKmMain('0');
        setNextRepair(null);
        setNextRepair20000(null);
        setNextRepair24000(null);
        setNextRepair40000(null);
        setNextRepair50000(null);
        setNextRepair80000(null);
    };
    // Função para lidar com o pressionamento do botão de reset
    const handleResetPress = () => {
        Alert.alert(
            'Reiniciar os Dados',
            'Você quer Reiniciar o App?',
            [
                { text: 'CANCELAR', style: 'cancel' },
                { text: 'Sim', onPress: () => resetApp() }
            ],
            { cancelable: false }
        );
    };


    const repairItems = [
        { id:'1', iconType: 'image', icon: require('../images/indicador-de-oleo.png'), title: 'Óleo do Motor', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '2', iconType: 'image', icon: require('../images/filtro-de-oleo.png'), title: 'Filtro de Óleo', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '3', iconType: 'image', icon: require('../images/filtro.png'), title: 'Filtro de Combustível', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '4', iconType: 'image', icon: require('../images/filtro-de-ar.png'), title: 'Filtro de Ar', subtitle: `Próxima Revisão: ${nextRepair20000} km` },
        { id: '5', iconType: 'image', icon: require('../images/filtro-de-ar (1).png'), title: 'Filtro de Cabine', subtitle: `Próxima Revisão: ${nextRepair20000} km` },
        { id: '6', iconType: 'image', icon: require('../images/mudanca-de-marcha.png'), title: 'Fluído de Transmissão', subtitle: `Próxima Revisão: ${nextRepair50000} km` },
        { id: '7', iconType: 'image', icon: require('../images/car-service.png'), title: 'Geometria', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '8', iconType: 'image', icon: require('../images/car.png'), title: 'Balanceamento', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '9', iconType: 'image', icon: require('../images/pressao-do-pneu.png'), title: 'Verificação dos Pneus', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '10', iconType: 'image', icon: require('../images/vela-de-ignicao.png'), title: 'Velas de Ignição', subtitle: `Próxima Revisão: ${nextRepair40000} km` },
        { id: '11', iconType: 'image', icon: require('../images/motor-de-carro.png'), title: 'Verif/Ajuste das Válvulas', subtitle: `Próxima Revisão: ${nextRepair24000} km` },
        { id: '12', iconType: 'image', icon: require('../images/suspensao.png'), title: 'Suspensão', subtitle: `Próxima Revisão: ${nextRepair} km` },
        { id: '13', iconType: 'image', icon: require('../images/freio-de-disco.png'), title: 'Fluído de Freio', subtitle: `Próxima Revisão: ${nextRepair24000} km` },
        { id: '14', iconType: 'image', icon: require('../images/radiador.png'), title: 'Fluído de Arrefecimento', subtitle: `Próxima Revisão: ${nextRepair80000} km` }


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
        let subtitle;
        switch (item.title) {
            case 'Óleo do Motor':
            case 'Filtro de Óleo':
            case 'Filtro de Combustível':
            case 'Geometria':
            case 'Balanceamento':
            case 'Verificação dos Pneus':
            case 'Suspensão':
                repairValue = nextRepair;
                subtitle = `Próxima Revisão: ${nextRepair} km`;
                break;
            case 'Filtro de Cabine':
            case 'Filtro de Ar':
                repairValue = nextRepair20000;
                subtitle = `Próxima Revisão: ${nextRepair20000} km`;
                break;
            case 'Verif/Ajuste das Válvulas':
            case 'Fluído de Freio':
                repairValue = nextRepair24000;
                subtitle = `Próxima Revisão: ${nextRepair24000} km`;
                break;
            case 'Fluído de Transmissão':
                repairValue = nextRepair50000;
                subtitle = `Próxima Revisão: ${nextRepair50000} km`;
                break;
            case 'Velas de Ignição':
                repairValue = nextRepair40000;
                subtitle = `Próxima Revisão: ${nextRepair40000} km`;
                break;
            case 'Fluído de Arrefecimento':
                repairValue = nextRepair80000;
                subtitle = `Próxima Revisão: ${nextRepair80000} km`;
                break;
        }
        if (repairKm >= repairValue) {
            borderColor = { borderWidth: 2, borderColor: '#F44F28' };
            sendNotification(item.title);
        }
        return (
            <InfoItem
                key={item.id.toString()}
                icon={item.icon}
                title={item.title}
                subtitle={subtitle}
                iconType={item.iconType}
                style={borderColor}
                onReset={() => resetItem(item.title)}
            />
        )
    }
    const resetItem = (title) => {
        const newKmMain = parseInt(kmMain, 10);

        if (['Óleo do Motor', 'Filtro de Óleo', 'Filtro de Combustível', 'Geometria', 'Balanceamento', 'Verificação dos Pneus', 'Suspensão'].includes(title) && newKmMain >= nextRepair) {
            setNextRepair(newKmMain + maintenanceInterval10000);
        } else if (['Filtro de Ar', 'Filtro de Cabine'].includes(title) && newKmMain >= nextRepair20000) {
            setNextRepair20000(newKmMain + maintenanceInterval20000);
        } else if (['Verif/Ajuste das Válvulas', 'Fluído de Freio'].includes(title) && newKmMain >= nextRepair24000) {
            setNextRepair24000(newKmMain + maintenanceInterval24000);
        } else if (title === 'Velas de Ignição' && newKmMain >= nextRepair40000) {
            setNextRepair40000(newKmMain + maintenanceInterval40000);
        } else if (title === 'Fluído de Transmissão' && newKmMain >= nextRepair50000) {
            setNextRepair50000(newKmMain + maintenanceInterval50000);
        } else if (title === 'Fluído de Arrefecimento' && newKmMain >= nextRepair80000) {
            setNextRepair80000(newKmMain + maintenanceInterval80000);
        } else {
            Alert.alert(
                'Confirmar Revisão?',
                'O novo valor do Hodômetro é inferior ao atual. Você quer Redefinir?',
                [
                    { text: 'CANCELAR', style: 'cancel' },
                    { text: 'Sim', onPress: () => handleResetConfirmation(title) }
                ],
                { cancelable: false }
            );
        }
    };
    const handleResetConfirmation = (title) => {
        const newKmMain = parseInt(kmMain, 10);

        if (['Óleo do Motor', 'Filtro de Óleo', 'Filtro de Combustível', 'Geometria', 'Balanceamento'].includes(title)) {
            setNextRepair(newKmMain + maintenanceInterval10000);
        } else if (['Filtro de Ar', 'Filtro de Cabine'].includes(title)) {
            setNextRepair20000(newKmMain + maintenanceInterval20000);
        } else if (['Verif/Ajuste das Válvulas', 'Óleo da Transmissão/Embregem', 'Fluído de Freio'].includes(title) && newKmMain >= nextRepair24000) {
            setNextRepair24000(newKmMain + maintenanceInterval24000);
        } else if (title === 'Velas de Ignição' && newKmMain >= nextRepair40000) {
            setNextRepair40000(newKmMain + maintenanceInterval40000);
        } else if (title === 'Fluído de Transmissão' && newKmMain >= nextRepair50000) {
            setNextRepair50000(newKmMain + maintenanceInterval50000);
        } else if (title === 'Fluído de Arrefecimento' && newKmMain >= nextRepair80000) {
            setNextRepair80000(newKmMain + maintenanceInterval80000);
        }
    };

    useEffect(() => {
        onDataRetrieved(kmMain);
    }, [kmMain, nextRepair, nextRepair20000, nextRepair24000, nextRepair40000, nextRepair50000, nextRepair80000]);

    useEffect(() => {
        const loadMaintenanceInterval = async () => {
            try {
                const interval10000 = await AsyncStorage.getItem('maintenanceInterval10000');
                const interval20000 = await AsyncStorage.getItem('maintenanceInterval20000');
                const interval24000 = await AsyncStorage.getItem('maintenanceInterval24000');
                const interval40000 = await AsyncStorage.getItem('maintenanceInterval40000');
                const interval80000 = await AsyncStorage.getItem('maintenanceInterval80000');
                const interval50000 = await AsyncStorage.getItem('maintenanceInterval50000');

                if (interval10000 !== null) {
                    const intervalNumber10000 = parseInt(interval10000, 10);
                    setMaintenanceInterval10000(intervalNumber10000);
                }
                else if (interval20000 !== null) {
                    const intervalNumber20000 = parseInt(interval20000, 10);
                    setMaintenanceInterval20000(intervalNumber20000);
                }
                else if (interval24000 !== null) {
                    const intervalNumber24000 = parseInt(interval24000, 10);
                    setMaintenanceInterval24000(intervalNumber24000);
                }
                else if (interval40000 !== null) {
                    const intervalNumber40000 = parseInt(interval40000, 10);
                    setMaintenanceInterval40000(intervalNumber40000);
                }
                else if (interval50000 !== null) {
                    const intervalNumber50000 = parseInt(interval50000, 10);
                    setMaintenanceInterval50000(intervalNumber50000);
                }
                else if (interval80000 !== null) {
                    const intervalNumber80000 = parseInt(interval80000, 10);
                    setMaintenanceInterval80000(intervalNumber80000);
                }
            } catch (e) {
                alert('Falha ao carregar o intervalo de manutenção');
            }
        };

        loadMaintenanceInterval();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const loadMaintenanceInterval = async () => {
                try {
                    const interval10000 = await AsyncStorage.getItem('maintenanceInterval10000');
                    const interval20000 = await AsyncStorage.getItem('maintenanceInterval20000');
                    const interval24000 = await AsyncStorage.getItem('maintenanceInterval24000');
                    const interval40000 = await AsyncStorage.getItem('maintenanceInterval40000');
                    const interval80000 = await AsyncStorage.getItem('maintenanceInterval80000');
                    const interval50000 = await AsyncStorage.getItem('maintenanceInterval50000');

                    setMaintenanceInterval10000(interval10000 ? parseInt(interval10000, 10) : 10000);
                    setMaintenanceInterval20000(interval20000 ? parseInt(interval20000, 10) : 20000);
                    setMaintenanceInterval50000(interval24000 ? parseInt(interval24000, 10) : 24000);
                    setMaintenanceInterval50000(interval40000 ? parseInt(interval40000, 10) : 40000);
                    setMaintenanceInterval50000(interval50000 ? parseInt(interval50000, 10) : 50000);
                    setMaintenanceInterval50000(interval80000 ? parseInt(interval80000, 10) : 80000);
                } catch (e) {
                    alert('Falha ao carregar o intervalo de manutenção');
                }

            };
            loadMaintenanceInterval()
        }, []));

    const onDataRetrieved = (data) => {
        setKmMain(data);
        if (nextRepair === null) {
            setNextRepair(parseInt(data) + maintenanceInterval10000);
        }
        if (nextRepair20000 === null) {
            setNextRepair20000(parseInt(data) + maintenanceInterval20000);
        }
        if (nextRepair24000 === null) {
            setNextRepair24000(parseInt(data) + maintenanceInterval24000);
        }
        if (nextRepair40000 === null) {
            setNextRepair40000(parseInt(data) + maintenanceInterval40000);
        }
        if (nextRepair50000 === null) {
            setNextRepair50000(parseInt(data) + maintenanceInterval50000);
        }
        if (nextRepair80000 === null) {
            setNextRepair80000(parseInt(data) + maintenanceInterval80000);
        }

        //console.log('Os dados em onDataRetrieved é: ', data);
        //console.log('Os dados em NextRepair é: ', nextRepair);
    };

    const OdometroUpdate = async () => {
        let newData = inputValue;
        setModalVisible(false);
        setInputValue("");
        setKmMain(newData);
        await AsyncStorage.setItem('myKey', newData);
        onDataRetrieved(newData);
    }

    const renderDigits = () => {
        return kmMain ? kmMain.split('').map((digit, index, array) => {
            const isLastDigit = index === array.length - 1; // Verifica se é o último dígito
            return (
                <>
                    <StorageManager onDataRetrieved={onDataRetrieved} />
                    <Text
                        key={index}
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

    useFocusEffect(
        React.useCallback(() => {
            const loadSelectedItems = async () => {
                try {
                    const storedSelectedItems = await AsyncStorage.getItem('visibleItemIds');
                    const selectedItems = storedSelectedItems ? JSON.parse(storedSelectedItems) : [];
                    setFilteredRepairItems(repairItems.filter(item => selectedItems.includes(item.id.toString())));
                    //setFilteredRepairItems(filteredItems);
                } catch (error) {
                    console.log("Erro ao carregar itens selecionados:", error);
                }
            };

            loadSelectedItems();
        }, [])
    );

    
    


    //<Text style={{ color: '#FFF', marginBottom: 1, }}>Etiqueta Online</Text>
    return (
        <>
            
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
                    <Image source={require('../images/EtiquetaOnline_.png')} style={{ width: 150, height: 150, marginTop: 10 }} />
                    <View style={styles.backgroundOdometer}>
                        <TouchableOpacity onPress={showModal}>
                            <View style={styles.odometer}>
                                {renderDigits()}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnReset} onPress={handleResetPress}>
                        <FontAwesome5 name="sync" size={13} color={'#f44f24'} />
                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 8 }}>Reset</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#FFF', fontSize: 12, marginBottom: '1%' }}>Hodômetro</Text>
                </View>
                <FlatList
                    data={filteredRepairItems}
                    keyExtractor={(item) => item.id.toString()}
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
        width: '90%',
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
    btnReset: {
        position: 'absolute',
        right: 10,
        bottom: 40,
        textAlign: 'center',
        alignItems: 'center'
    }
});

export default StartScreen;
