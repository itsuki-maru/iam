interface Headers {
    head1: HeadChild,
    head2: HeadChild,
    head3: HeadChild,
    head4: HeadChild,
    head5: HeadChild,
}

interface HeadChild {
    title: string,
    isShow: boolean,
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

export type { Headers, Product, List, About, Checks, ContactFormField };