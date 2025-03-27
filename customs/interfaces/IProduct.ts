import React from "react";

export {
    IProduct,
    IProductView,
    IProductPreview,
    IProductPreviewChildren,
    IExpiredProduct,
    ISearchForProductUsingWeb,
    IUseExistingProductAsModel,
};

interface IProduct {
    nome: string;
    restantes: string;
    validade: string;
    codigoDeBarras: string;
    codigoDoMercado: string;
};

interface IProductPreview extends IProduct {
    children: React.JSX.Element;
};

interface IProductPreviewChildren extends IProduct {
    clearFields: () => void;
    setRestantes: (restantes: number) => void;
};

interface IProductView extends IProduct {
    id: string;
};

interface IExpiredProduct {
    setProducts: (products: any) => void;
    setShowRemoveProduct: (showRemoveProdut: boolean) => void;
};

interface ISearchForProductUsingWeb {
    codigo: string;
    setNome: (nome: string) => void;
    setCodigo: (codigo: string) => void;
};

interface IUseExistingProductAsModel {
    foundProducts: Array<any>;
    setFoundProducts: (products: []) => void;
    setNome: (nome: string) => void;
    setRestantes: (restantes: number) => void;
    setValidade: (validade: string) => void;
    setCodigo: (codigo: string) => void;
    setCodigoDoMercado: (codigoDoMercado: string) => void;
};