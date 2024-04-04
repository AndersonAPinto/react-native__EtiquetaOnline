import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/pages/HomeScreen";
import SettingsScreen from "./src/pages/SettingsScreen";
import StartScreen from "./src/pages/StartScreen";
import { Image } from "react-native";
import { FontAwesomeIcon } from "@expo/vector-icons";
import ScreenImages from "./src/pages/ScreenImages";

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <Tab.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                tabBarActiveTintColor: '#F44F28',
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#171626',
                    borderTopWidth: 0,
                    height: 60

                }
                
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? <Image source={require('./src/images/caminhao-de-reboque.png')} style={{ width: 45, height: 45, borderRadius: 10, borderWidth: 2, borderColor: '#F44f24'}}/>
                            : <Image source={require('./src/images/caminhao-de-reboque.png')} style={{ width: 45, height: 45}}/>;
                    }
                }}
            />
            <Tab.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size, focused }) => {
                        return focused ? <Image source={require('./src/images/servico.png')} style={{ width: 45, height: 45, borderRadius: 10, borderWidth: 2, borderColor: 'yellow'}}/>
                            : <Image source={require('./src/images/servico.png')} style={{ width: 45, height: 45, }}/>;
                    }
            
                }}
                
                    
                
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? <ScreenImages source={require('./src/images/manutencao (1).png')} style={{ width: 45, height: 45, borderRadius: 10, borderWidth: 2, borderColor: '#F44f24'}} />
                            :<ScreenImages source={require('./src/images/manutencao (1).png')} /> ;
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default Routes;