import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';


const Infos = () => {
    const navigation = useNavigation();
    const Acesswebsite = () => {
        const url = 'https://www.aaspdesenvolvimentodesites.com.br';

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Não é possível abrir o URL: " + url);
                }
            })
            .catch((err) => console.error('Ocorreu um erro ao tentar abrir o URL:', err));
    };

return (
    <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex:1, backgroundColor: '#10214e' }}>
            <View style={styles.container}>
                <Text style={styles.text}> Informações {'\n'}</Text>
                <View style={{ flex: 1, color: '#FFF' }}>
                    <TouchableOpacity onPress={() => navigation.navigate( 'Política')} >
                        <Text style={styles.link}>Política de privacidade {'\n'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Termos')} >
                        <Text style={styles.link}>Termos de Uso</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={Acesswebsite}>
                    <Text style={{ textAlign: 'center', color: "#FFF", marginBottom: 50, fontSize: 12 }}> from AASP</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    </>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b376f',
        padding: 10,
        justifyContent: 'space-between'
    },
    link: {
        color: '#FFF'
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    }
});

export default Infos;
