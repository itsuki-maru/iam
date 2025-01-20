interface Product {
    id: number;
    productName: string;
    imageUrl: string;
    productDetail: string;
    productDetailMessage: string[];
    productLink: string | null,
    productLinkText: string | null,
    productLinkIsBlank: boolean,
};

interface List {
    id: number,
    name: string,
    items: string[],
}

interface About {
    id: number,
    key: string,
    value: string,
}

export type { Product, List, About };