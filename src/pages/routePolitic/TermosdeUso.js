import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, ScrollView, StyleSheet } from 'react-native';

const TermosdeUso = () => {
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                    Termos de Uso {'\n'}</Text>
                <Text style={{ color: '#FFF' }}>1. Aceitação dos Termos.{'\n'} Ao acessar e usar o EtiqueOnline, você aceita e concorda em estar vinculado pelos termos e disposições deste acordo. Além disso, ao usar estes serviços particulares, você estará sujeito a quaisquer regras ou diretrizes aplicáveis que tenham sido publicadas para esses serviços. Todas as diretrizes ou regras são incorporadas por referência nos Termos de Uso.{'\n'}</Text>

                <Text style={{ color: '#FFF' }}>2.Modificações nos Termos.{'\n'} O EtiqueOnline reserva-se o direito de modificar estes termos de uso a qualquer momento. Tais modificações serão efetivas imediatamente após a publicação da versão modificada no app. Seu uso continuado do app será considerado como aceitação dessas modificações. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>3. Política de Privacidade.{'\n'} Nossa Política de Privacidade, que estabelece como tratamos suas informações pessoais, pode ser encontrada na seção de Política de Privacidade deste app. Ao usar este app, você concorda também com os termos da Política de Privacidade. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>4. Uso do Serviço.{'\n'} Você concorda em usar o EtiqueOnline apenas para os propósitos permitidos pela lei, pelos termos de uso e por qualquer legislação aplicável, regulamentos ou práticas ou diretrizes geralmente aceitas nas jurisdições relevantes. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>5. Comportamento Proibido.{'\n'} Você é responsável por todo e qualquer ato e omissão que ocorra devido ao uso do app em seu dispositivo. Você não deve usar o EtiqueOnline para: {'\n'}
                    Transmissão de qualquer conteúdo ilegal, ameaçador, difamatório, obsceno ou que viole direitos de privacidade.{'\n'}
                    Manipular ou interferir no app ou nos servidores ou redes conectadas ao app. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>6. Propriedade Intelectual.{'\n'} O conteúdo, layout, design, dados, algoritmos e tecnologia do EtiqueOnline são propriedade exclusiva da EtiqueOnline e estão protegidos por direitos autorais, patentes, marcas registradas e outras leis de propriedade intelectual. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>7. Limitação de Responsabilidade.{'\n'} Em nenhum caso o EtiqueOnline será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou exemplares decorrentes do uso ou da incapacidade de usar o serviço. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>8. Indenização.{'\n'} Você concorda em indenizar e isentar o EtiqueOnline e seus afiliados, parceiros, fornecedores e funcionários de qualquer reivindicação ou demanda, incluindo honorários advocatícios razoáveis, feitos por qualquer terceiro devido ao seu uso do app, sua violação dos Termos de Uso ou sua violação de qualquer direito de outra pessoa. {'\n'}</Text>

                <Text style={{ color: '#FFF' }}>9. Rescisão.{'\n'} O EtiqueOnline pode suspender ou encerrar seu acesso ao app a qualquer momento, sem aviso prévio, por qualquer motivo, incluindo o uso não autorizado deste app ou sua violação destes Termos. {'\n'}</Text>

                <Text style={{ color: '#FFF', marginBottom: 40 }}>10. Disputas.{'\n'} Qualquer disputa relacionada a estes Termos de Uso será regida pelas leis do país/jurisdição em que o EtiqueOnline está baseado, sem considerar conflitos de disposições legais. {'\n'}</Text>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#1b376f'
    },
    scrollView: {
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    }
});

export default TermosdeUso;
