import * as SQLite from 'expo-sqlite';
import produtoCss from '@/customs/produtoCss';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, Button, useColorScheme } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import removerProduto from '@/customs/crud/removerProduto';
import formatData from '@/customs/functions/formatData';

export default function ProdutosVencidos() {

  const [products, setProducts] = React.useState<any>([]);
  const [showRemoverProduto, setShowRemoverProduto] = React.useState(false);

  async function loadProducts() {
    const db = await SQLite.openDatabaseAsync('produtos');
    const produtos = await db.getAllAsync('SELECT * FROM produtos;');
    const produtosVencidos = produtos.filter((produto: any) => produto.dataDeVencimento < new Date().toISOString());

    setProducts(produtosVencidos);
    if (produtosVencidos.length > 0) setShowRemoverProduto(true);

    if (produtosVencidos.length < 1) {
      setShowRemoverProduto(false);
      setProducts([{
        id: 'IDTotalmenteAleatorio',
        nome: 'Nenhum produto está vencido!',
        restantes: '0.00',
        dataDeVencimento: '2099-12-31',
        codigoDeBarras: '0000000000000',
        codigoDoMercado: '1'
      }])
    };

  };
  loadProducts();

  const vencimento = ({ vencimento }: { vencimento: string }) => {
    const data = Math.ceil((new Date(vencimento).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (data <= 0) {
      return <Text style={{ color: '#ffaa00' }}>Vencido há {data * -1} dias</Text>
    } else {
      return <Text style={{ color: 'lightgreen' }}>{data > 365 ? `${String(data / 365)?.split('.')[0]} anos` : `vence em ${data} dias`}</Text>;
    }
  };

  return (
    <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView style={styles.scrollView}>
            <View>
              <View>
                {products?.map((produto: any) => (
                  <View key={produto.id} style={produtoCss.productWindow}>
                    <View style={produtoCss.productContent}>
                      <Text style={produtoCss.textContent}>Nome: {produto.nome}</Text>
                      {/* <Text style={produtoCss.textContent}>
                        Vence em: {vencimento({ vencimento: produto.dataDeVencimento })}
                      </Text> */}
                      <Text style={produtoCss.textContent}>Validade: {formatData({ data: produto.dataDeVencimento })}</Text>
                      <View style={{ padding: 10 }}>
                        <View style={{
                          borderColor: '#ccc',
                          borderWidth: 1,
                          padding: 5,
                          backgroundColor: '#212121',
                          borderRadius: 10
                        }}>
                          <Text style={produtoCss.textContent}>Restantes: {produto.restantes || '0'}</Text>
                          <Text style={produtoCss.textContent}>Código: {produto.codigoDeBarras}</Text>
                          <Text style={produtoCss.textContent}>Código MC: {produto.codigoDoMercado}</Text>
                        </View>
                      </View>
                      <View style={{ padding: 5, display: showRemoverProduto ? 'flex' : 'none' }}>
                        <Button onPress={() => {
                          removerProduto({ id: produto.id });
                          loadProducts();
                        }} title="Remover Produto" color='#902020' />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider >
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {

  },
  produtos: {
    padding: 20,
    backgroundColor: '#ccc',
    marginBottom: 12
  },
  text: {
    fontSize: 32,
    padding: 2,
  },
});