interface Headers {
    head1: HeadChild,
    head2: HeadChild,
    head3: HeadChild,
    head4: HeadChild,
    head5: HeadChild,
    head6: HeadChild,
}

interface HeadChild {
    title: string,
    isShow: boolean,
    isHome?: boolean,
}

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

interface Checks {
    name: string,
    id: string,
}

interface SelectList {
    name: string,
}

interface ContactFormField {
    name: string,
    label: string,
    placeholder: string;
    type: "textbox" | "textarea" | "select" | "number" | "email",
    selects: string[],
}

interface ProductLists {
    id: number,
    name: string,
}

interface BlogItems {
    id: number,
    title: string,
    date: string,
    link: string,
    thumbnailUrl: string,
    isExternal: boolean,
}

interface Blog {
    title: string,
    blogs: BlogItems[],
}

export type { Headers, HeadChild, Product, List, About, Checks, ContactFormField, ProductLists, Blog, BlogItems };