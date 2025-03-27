interface IProduto {
    nome: string;
    restantes: string;
    validade: string;
    codigoDeBarras: string;
    codigoDoMercado: string;
};

interface IProdutoView extends IProduto {
    id: string;
};

export { IProduto, IProdutoView };