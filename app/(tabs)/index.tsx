import loadDataBase from '@/customs/crud/loadDataBase';
import { Text, View } from 'react-native';

export default function HomeScreen() {

  async function loadDb() {
    try {
      await loadDataBase();
    } catch (err) {
      if (err) { console.log(err) };
    };
  };

  loadDb();

  return (
    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' }}>
      <View style={{ marginTop: 50, marginBottom: 25, backgroundColor: '#121212', width: '90%', height: 1, borderColor: '#121212' }}></View>

      <View style={{ display: 'flex' }}>
        <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Products Manager</Text>
        <Text style={{ fontSize: 18, color: 'lightgreen', textAlign: 'center' }}>Powered by Technext Apps</Text>
      </View>

      <View style={{ marginTop: 25, marginBottom: 25, backgroundColor: '#121212', width: '90%', height: 1, borderColor: '#121212' }}></View>

      <View style={{ display: 'flex' }}>
        <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Versão de testes</Text>
        <Text style={{ fontSize: 18, color: 'lightgreen', textAlign: 'center' }}>Sua licenca expira em: </Text>
        <Text style={{ fontSize: 16, color: 'yellowgreen', textAlign: 'center' }}>Licença Vitalicia</Text>
        {/* Adicionar logica de verificacao de data pra expirar a licença */}
      </View>

      <View style={{ marginTop: 25, marginBottom: 120, backgroundColor: '#121212', width: '90%', height: 1, borderColor: '#121212' }}></View>


      <View style={{ display: 'flex', bottom: 0 }}>
        <Text style={{ fontSize: 20, color: 'lightgreen', textAlign: 'center' }}>Número de compilação</Text>
        <Text style={{ fontSize: 18, color: 'yellow', textAlign: 'center' }}>v1.2.4-12_0327-ALPHA</Text>
        <Text style={{ fontSize: 18, color: 'yellow', textAlign: 'center' }}>jts6h-L2NA5-nuz-AIcsG</Text>
      </View>

    </View>
  );
};