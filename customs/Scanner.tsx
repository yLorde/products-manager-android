import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Clipboard,
    Linking,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';


export function ScannerScreen({ navigation }: any) {
    const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);

    const {
        hasPermission: cameraHasPermission,
        requestPermission: requestCameraPermission,
    } = useCameraPermission();

    const device = useCameraDevice('back');

    const [nome, setNome] = useState<any>('');
    const [restantes, setRestantes] = useState<any>('1');
    const [validade, setValidade] = useState<any>('2025-01-01');
    const [codigo, setCodigo] = useState<any>('');
    const [codigoDoMercado, setCodigoDoMercado] = useState<any>('');

    useEffect(() => {
        handleCameraPermission();
    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes: any) => {

            if (enableOnCodeScanned) {
                let value = codes[0]?.value;
                let type = codes[0]?.type;

                if (type === 'qr') {
                    return showAlert('Escaneie um código de barras válido');
                } else {
                    setCodigo(value);
                    showAlert(value);
                }
                setEnableOnCodeScanned(false);
            }
        },
    });

    const handleCameraPermission = async () => {
        const granted = await requestCameraPermission();

        if (!granted) {
            alert(
                'A permissão de câmera foi negada! Permita o uso de câmera nas configurações para poder usar esta função!'
            );
            Linking.openSettings();
        };
    };

    const showAlert = (
        value = '',
    ) => {
        Alert.alert(
            'Código de barras copiado',
            value,
            [
                {
                    text: 'ok',
                    onPress: () => {
                        Clipboard.setString(value);
                        // router.navigate(`/(tabs)/adicionarProduto`);
                        // router.setParams({ codigo: value });
                    },
                    style: 'default',
                }
            ],
            { cancelable: false }
        );
    };

    if (device == null)
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ margin: 10 }}>Camera Not Found</Text>
            </View>
        );

    return (
        <View>
            <SafeAreaView style={{ minWidth: 200, minHeight: 200 }}>
                <Camera
                    codeScanner={codeScanner}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    onTouchEnd={() => setEnableOnCodeScanned(true)}
                />
            </SafeAreaView>
            <View style={{ padding: 10 }}>
                <Button onPress={() => {
                    setEnableOnCodeScanned(true)
                }} title='Escanear Produto'></Button>
            </View>

        </View >
    );
};