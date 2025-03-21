type OnlyOneTrue<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? T[P] & { isHome: true } : T[P] & { isHome: false };
};

interface HeadChild {
    title: string,
    isShow: boolean,
    isHome?: boolean,
}

interface HeadersBase {
    head1: HeadChild,
    head2: HeadChild,
    head3: HeadChild,
    head4: HeadChild,
    head5: HeadChild,
    head6: HeadChild,
    head7: HeadChild,
}

type Headers = OnlyOneTrue<HeadersBase, keyof HeadersBase>;

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

interface BlogItems {
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

interface DownloadItems {
    title: string,
    link: string,
}

interface DownloadItem {
    title: string,
    items: DownloadItems[],
}

interface JsonConfig {
    appTitle: string,
    appLogo: string,
    contactEmailAddress: string,
    theme: "dark" | "light" | "user",
    headers: Headers,
    home: Home,
    product: Product,
    list: List,
    about: About,
    blog: Blog,
    contact: Contact,
    download: DownloadItem,
}

declare const __APP_CONFIG__: JsonConfig;
export const jsonConfig: JsonConfig = __APP_CONFIG__;