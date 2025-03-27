import * as SQLite from 'expo-sqlite';
import produtoCss from '@/customs/produtoCss';
import React from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import removerProduto from '@/customs/crud/removerProduto';
import formatData from '@/customs/functions/formatData';

export default function MeusProdutos() {

  const vencimento = ({ vencimento }: { vencimento: string }) => {
    const data = Math.ceil((new Date(vencimento).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (data <= 0) {
      return <Text style={{ color: '#ffaa00' }}>Vencido</Text>
    } else {
      return <Text style={{ color: 'lightgreen' }}>Vence em {data} dias</Text>;
    };
  };

  const [showDetails, setShowDetails] = React.useState<any>();

  const [products, setProducts] = React.useState<any>([]);

  const [showRemoverProduto, setShowRemoverProduto] = React.useState<any>();

  async function loadProducts() {
    const db = await SQLite.openDatabaseAsync('produtos');
    const produtos = await db.getAllAsync('SELECT * FROM produtos;');
    const produtosOrdenados = produtos.sort((a: any, b: any) => new Date(a.dataDeVencimento).getTime() - new Date(b.dataDeVencimento).getTime());
    setProducts(produtosOrdenados);
  };
  loadProducts();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.scrollView}>
          {/* <View style={produtoCss.productWindow}>
            <View style={produtoCss.productContent}>
              <Text style={produtoCss.textTitle}>Meus Produtos</Text>
            </View>
          </View> */}

          {
            products.map((produto: any) => (
              <View key={produto.id} style={produtoCss.productWindow}>
                <View style={produtoCss.productContent}>
                  <Text style={styles.produtoText}>Nome: {produto.nome}</Text>
                  <Text style={styles.produtoText}>
                    Vence em: {vencimento({ vencimento: produto.dataDeVencimento })}
                  </Text>
                  <Text style={styles.produtoText}>Validade: {formatData({ data: produto.dataDeVencimento })}</Text>

                  <View style={{
                    display: showDetails === produto.id ? 'block' : 'none' as any, padding: 10
                  }}>
                    <View style={{
                      borderColor: '#ccc',
                      borderWidth: 1,
                      padding: 5,
                      backgroundColor: '#212121',
                      borderRadius: 10
                    }}>
                      <Text style={styles.produtoText}>Restantes: {produto.restantes || '0'}</Text>
                      <Text style={styles.produtoText}>Código: {produto.codigoDeBarras}</Text>
                      <Text style={styles.produtoText}>Código MC: {produto.codigoDoMercado}</Text>
                    </View>
                  </View>

                  <View style={{ padding: 5 }}>
                    <Button onPress={() => {
                      setShowDetails(produto.id);
                      if (showDetails === produto.id) {
                        setShowDetails(null);
                      }
                    }} color={ showDetails === produto.id ? '#902020' : '#306030'} title={ showDetails === produto.id ? 'Ocultar Detalhes' : 'Mostrar Detalhes'} />
                  </View>

                  <View style={{ padding: 5, display: showRemoverProduto === produto.id ? 'none' : 'flex' }}>
                    <Button onPress={() => {
                      setShowRemoverProduto(produto.id);
                    }} color='#206090' title='Remover Produto' />
                  </View>

                  <View style={{
                    padding: 5, display: showRemoverProduto === produto.id ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row'
                  }}>
                    <View >
                      <Button onPress={() => {
                        setShowRemoverProduto(null);
                      }} color='#902020' title='Cancelar' />
                    </View>

                    <View >
                      <Button onPress={() => {
                        setShowRemoverProduto(null);
                        removerProduto({ id: produto.id });
                        loadProducts();
                      }} color='#206090' title='Confirmar' />
                    </View>
                  </View>

                </View>

              </View>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider >
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
  produtoText: {
    fontSize: 20,
    marginLeft: 5,
    padding: 2,
    color: '#fff'
  },
});