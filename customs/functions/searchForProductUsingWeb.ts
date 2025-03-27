import axios from "axios";
import { ISearchForProductUsingWeb } from "../interfaces/IProduct";

export default async function searchForProductUsingWeb({ codigo, setNome, setCodigo }: ISearchForProductUsingWeb) {
    await axios.get(`https://world.openfoodfacts.org/api/v2/product/${codigo}.json`).then((response) => {
        if (response.status == 200 && response.data) {
            const foundProduct = response.data.product;
            let name;
            if (foundProduct.brands) {
                name = `${foundProduct.brands} - ${foundProduct.product_name}`
            } else {
                name = foundProduct.product_name;
            };
            if (name) {
                setNome(name);
            };
        };
    }).catch(err => {
        if (err) {
            setNome('Produto não encontrado!');
            setTimeout(() => {
                setNome('');
                setCodigo('');
            }, 3000);
            return;
        };
    });
};