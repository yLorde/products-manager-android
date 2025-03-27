import { ScannerScreen } from '@/customs/Scanner';
import { StyleSheet, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function EscanearUsandoCamera() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView>

                    <View>
                        <ScannerScreen />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
});