const formatDate = ({ data }: { data: string }) => {
    const stage1 = String(data).replaceAll('-', '/');
    const dataFormatada = stage1.split('/').reverse().join('/');
    return dataFormatada;
};

export default formatDate;