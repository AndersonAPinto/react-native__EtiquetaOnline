import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';


const InfoItem = ({ iconType, icon, title, subtitle, style, onReset }) => {
    return (
        <View style={[styles.painelItem, style]} >
            <View style={styles.detail}>
                <FontAwesome5 name="bars" size={10} color="#1d3a88" />
            </View>
            {iconType === 'image' && (
                <Image
                    source={icon}
                    style={{ width: 40, height: 40, position: 'absolute', left: 35 }}
                />
            )}
            <View style={{ marginLeft: 60 }}>
                <Text style={{ color: '#FFF', fontSize: 20 }}>{title}</Text>
                <Text style={{ color: '#868b99', fontSize: 15 }}>{subtitle}</Text>
            </View>
            <TouchableOpacity style={styles.btnInfo} onPress={onReset}>
                <FontAwesome5 name="sync" size={15} color={'#f44f24'}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    painelItem: {
        width: '100%',
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#10214e',
        flexDirection: 'row',
        marginBottom: 1,

    },
    detail: {
        position: 'absolute',
        width: 15,
        height: 75,
        backgroundColor: '#081020',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginRight: 0,
        left: 10
    },
    btnInfo: {
        marginLeft: 20,
    },
})

export default InfoItem;
