import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
// Assumindo que você também tem uma tela para isso

const InfoStack = createStackNavigator();

function RoutesPolitic() {
    return (
        <View>
            <div> Ícones feitos por <a href="https://www.flaticon.com/br/autores/culmbio" title="Culmbio"> Culmbio </a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com'</a></div>
        </View>
    );
}
export default RoutesPolitic;
