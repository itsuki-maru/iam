interface HeadChild {
    title: string,
    isShow: boolean,
}

interface Headers {
    head1: HeadChild,
    head2: HeadChild,
    head3: HeadChild,
    head4: HeadChild,
    head5: HeadChild,
}

interface Home {
    title: string,
    imageUrl: string,
    productLinkText: string,
    message: string[],
}

interface ProductChild {
    productName: string;
    imageUrl: string;
    productDetail: string;
    productDetailMessage: string[];
    productLink: string | null,
    productLinkText: string | null,
    productLinkIsBlank: boolean,
}

interface Product {
    title: string,
    imageUrl: string,
    productLinkText: string,
    message: string[],
    products: ProductChild[],
}

interface ListChild {
    name: string,
    items: string[],
}

interface List {
    title: string,
    lists: ListChild[],
}

interface AboutChild {
    key: string,
    value: string,
}

interface About {
    title: string,
    abouts: AboutChild[],
}

interface Form {
    name: string,
    label: string,
    placeholder: string;
    type: "textbox" | "textarea" | "select" | "number" | "email",
    selects?: string[],
}

interface Contact {
    title: string,
    postUrl: string,
    postcomplateMessage: string,
    form: Form[],
}

interface JsonConfig {
    appTitle: string,
    appLogo: string,
    contactEmailAddress: string,
    headers: Headers,
    home: Home,
    product: Product,
    list: List,
    about: About,
    contact: Contact,
}

declare const __APP_CONFIG__: JsonConfig;
export const jsonConfig: JsonConfig = __APP_CONFIG__;