import React from 'react';
import { Text } from "react-native";

export default function ExpireOn({ vencimento }: { vencimento: string }) {
    const data = Math.ceil((new Date(vencimento).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (data <= 0) {
        return <Text style={{ color: '#ffaa00' }}> Vencido </Text>
    } else {
        return <Text style={{ color: 'lightgreen' }}> Vence em {data} dias </Text>;
    };
};