import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PoliticadePrivacidade = () => {
    return (

        <SafeAreaView style={styles.container}>
            <View >
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>
                        Política de Privacidade de EtiqueOnline {'\n'}</Text>
                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>1. Compromisso com a Segurança.{'\n'} No EtiqueOnline, respeitamos a privacidade de nossos usuários e estamos comprometidos em protegê-la. Coletamos informações pessoais apenas quando necessário para fornecer nossos serviços, de forma justa e com o seu consentimento, explicando claramente os motivos da coleta e como as informações serão utilizadas.{'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>2. Coleta e Uso de Dados.{'\n'} Coletamos as seguintes categorias de dados pessoais: Informações de contato como nome e e-mail. Dados de desempenho do dispositivo para aprimorar a funcionalidade do app. Informações de localização, se relevante para a funcionalidade do app. {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>3. Armazenamento e Proteção de Dados.{'\n'} Retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Utilizamos medidas de proteção comercialmente aceitáveis para prevenir perda, roubo, acesso não autorizado, divulgação, cópia, uso ou modificação dos dados. {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>4. Compartilhamento de Informações.{'\n'} Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>5. Links para Sites Externos.{'\n'} Nosso app pode conter links para sites externos que não são operados por nós. Não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas políticas de privacidade. {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>6. Cookies e Publicidade.{'\n'} Utilizamos cookies e tecnologias similares para fornecer anúncios relevantes e melhorar a experiência no app. Nossos parceiros de publicidade podem também utilizar cookies para rastrear seus interesses e apresentar anúncios mais pertinentes. {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>7. Compromisso do Usuário.{'\n'} O usuário se compromete a não se envolver em atividades ilegais ou que prejudiquem a boa fé e a ordem pública, não disseminar conteúdo prejudicial ou mal-intencionado, e não causar danos aos sistemas ou dados. {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>8.Contato.{'\n'} Para qualquer dúvida sobre esta política ou nossas práticas de privacidade, por favor entre em contato conosco através de email: contato@aaspdesenvolvimentodesites.com.br . {'\n'}</Text>

                    <Text style={{ color: '#FFF', textAlign: 'justify' }}>9. Alterações na Política de Privacidade.{'\n'} Podemos atualizar nossa política de privacidade de tempos em tempos. Qualquer alteração será comunicada através de nosso app ou por e-mail. {'\n'}</Text>

                    <Text style={{ color: '#FFF', marginBottom: 40 , textAlign: 'justify'}}>10. Aceitação desta Política.{'\n'} O uso continuado de nosso app será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. {'\n'}</Text>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
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

export default PoliticadePrivacidade;
