import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';


import SettingsScreen from "./src/pages/SettingsScreen";
import StartScreen from "./src/pages/StartScreen";
import { Image } from "react-native";
import ScreenImages from "./src/pages/ScreenImages";
import Infos from "./src/pages/Infos";
import PoliticadePrivacidade from "./src/pages/routePolitic/PoliticadePrivacidade";
import TermosdeUso from "./src/pages/routePolitic/TermosdeUso";
import { NavigationContainer } from "@react-navigation/native";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Política"
                component={PoliticadePrivacidade}
            />
            <Stack.Screen
                name="Termos"
                component={TermosdeUso}
            />
        </Stack.Navigator>
    );
}

function TabNavigator() {
    return(
        <Tab.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
            tabBarActiveTintColor: '#F44F28',
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#171626',
                borderTopWidth: 0,
                height: Platform.OS === 'ios'? 80 : 60,
            }
        }}>

        <Tab.Screen
            name="Infos"
            component={Infos}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return focused ? <Image source={require('./src/images/simbolo-de-informacao.png')} style={{ width: 45, height: 45, borderRadius: 10, borderWidth: 2, borderColor: 'yellow' }} />
                        : <Image source={require('./src/images/simbolo-de-informacao.png')} style={{ width: 45, height: 45, }} />;
                }
            }}
        />
        <Tab.Screen
            name="StartScreen"
            component={StartScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return focused ? <Image source={require('./src/images/servico.png')} style={{ width: 45, height: 45, borderRadius: 10, borderWidth: 2, borderColor: 'yellow' }} />
                        : <Image source={require('./src/images/servico.png')} style={{ width: 45, height: 45, }} />;
                }
            }}
        />
        <Tab.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    return focused ? <ScreenImages source={require('./src/images/manutencao (1).png')} style={{ width: 45, height: 45, borderRadius: 10, borderWidth: 2, borderColor: 'yellow' }} />
                        : <ScreenImages source={require('./src/images/manutencao (1).png')} />;
                }
            }}
        />
       <Tab.Screen
            name="Stack"
            component={StackNavigator} 
            options={{ 
                tabBarButton: () => null,
                headerShown: false, }} 
        />
    </Tab.Navigator>
    )
    
}

export default function Routes() {
    return (
       <NavigationContainer>
        <TabNavigator/>
       </NavigationContainer>
    );
}