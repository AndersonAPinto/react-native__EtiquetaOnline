import { createStackNavigator } from '@react-navigation/stack';
// Assumindo que você também tem uma tela para isso

const InfoStack = createStackNavigator();

function RoutesPolitic() {
    return (
        <InfoStack.Navigator>
            <InfoStack.Screen
                name="Política de Privacidade"
                component={PoliticadePrivacidade}
                options={{ headerShown: false }}
            />
            <InfoStack.Screen
                name="Termos de Uso"
                component={TermosdeUso}
                options={{ headerShown: false }}
            />
            {/* Adicione outras telas relacionadas a informações aqui se necessário */}
        </InfoStack.Navigator>
    );
}
export default RoutesPolitic;
