import { StyleSheet } from "react-native";

const produtoCss = StyleSheet.create({
    productWindow: {
        maxWidth: '100%',
        padding: 10,
        // marginBottom: 10,
        marginTop: 10,
    },
    productContent: {
        padding: 12,
        backgroundColor: '#121212',
        borderRadius: 10
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 32,
        padding: 2,
        color: '#fff',
    },
    textContent: {
        fontSize: 20,
        marginLeft: 5,
        padding: 2,
        color: '#fff'
    },
    textDesc: {
        fontSize: 16,
        padding: 2,
        color: '#fff'
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12
    }
})

export default produtoCss;