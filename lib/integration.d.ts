export declare enum IntegrationDomain {
    Other = "Other",
    PeopleSoft = "PeopleSoft",
    Workday = "Workday",
}
export declare enum OtherType {
    Direct = "Direct Database",
    File = "File-Based Integration",
    Web = "Web Service",
}
export declare enum PeopleSoftType {
    Business = "Business Interlink",
    Database = "Database Link",
    Component = "Component Interface",
    Message = "Messaging",
}
export declare enum WorkdayType {
    Connector = "Connector",
    Document = "Document Transformation",
    EIB = "EIB",
    Template = "EIB Template",
    Studio = "Studio",
    Web = "Web Service",
}
export declare type IntegrationType = "Direct Database" | "File-Based Integration" | "Web Service" | "Business Interlink" | "Database Link" | "Component Interface" | "Messaging" | "Connector" | "Document Transformation" | "EIB" | "EIB Template" | "Studio";
export declare const Workstream: {
    ba: string;
    bs: string;
    ca: string;
    em: string;
    en: string;
    fa: string;
    gm: string;
    p2p_in: string;
    p2p_pc: string;
    p2p_sm: string;
    pr: string;
    tn: string;
};
export declare const Module: {
    ba: string;
    ch: string;
    st: string;
    cs: string;
    ex: string;
    ea: string;
    bp: string;
    fa: string;
    gt: string;
    in: string;
    pc: string;
    sm: string;
    pj: string;
    ad: string;
    dw: string;
    id: string;
    sc: string;
};
export declare enum RestrictedData {
    S1 = "S1 - Public",
    S2 = "S2 - Internal",
    S3 = "S3 - Private",
    S4 = "S4 - Restricted",
}
export declare function flatMap(obj: any): Array<{
    key: string;
    value: any;
}>;
export declare type TMeta = {
    [key: string]: {
        type: string;
        required: boolean;
        options?: Array<{
            key: string;
            value: any;
        }> | string[];
    };
};
export interface IDisplayable {
    forDisplay(): any;
}
export declare class Integration implements IDisplayable {
    static _meta: TMeta;
    name: string;
    domain: IntegrationDomain;
    type: IntegrationType;
    desc_short: string;
    desc: string;
    refID: string;
    sysName: string;
    sysDept: string;
    workstream: string;
    module: string;
    restricted: RestrictedData;
    dept: string;
    realtime: boolean;
    data_interchanges: DataInterchange[];
    webservices: WebService[];
    eips: EIP[];
    batches: Batch[];
    relationships: Relationship[];
    contacts: Contact[];
    notes: string;
    constructor(obj: any, parse?: boolean);
    getScroller(): string;
    serialize(): string;
    isValid(): boolean;
    invalidities(): Array<{
        field: string;
        error: string;
    }>;
    forDisplay(): any;
}
export declare enum DataInterchangeFormat {
    TXT = "Text",
    CSV = "CSV",
    JSON = "JSON",
    XML = "XML",
    XMLWD = "XML - Workday",
}
export declare enum EncryptionMethod {
    GPG = "GPG",
    PGP = "PGP",
}
export declare enum AuthorizationMethod {
    NONE = "None",
}
export declare enum Protocol {
    SFTP = "SFTP",
    FTP = "FTP",
    FTPS = "FTPS",
    HTTPS = "HTTPS",
}
export declare class DataInterchange implements IDisplayable {
    static _meta: TMeta;
    source: string;
    target: string;
    restricted: RestrictedData;
    format: DataInterchangeFormat;
    transformation: string;
    encryption: EncryptionMethod;
    authorization: AuthorizationMethod;
    inbound: boolean;
    protocol: Protocol;
    account: string;
    directory: string;
    filename: string;
    constructor(obj: any);
    forDisplay(): any;
}
export declare class WebService implements IDisplayable {
    static _meta: TMeta;
    endpoint: string;
    desc: string;
    version: string;
    reusable: boolean;
    enterprise: boolean;
    constructor(obj: any);
    forDisplay(): any;
}
export declare class EIP implements IDisplayable {
    static _meta: TMeta;
    endpoint: string;
    version: string;
    registered: boolean;
    account: string;
    constructor(obj: any);
    forDisplay(): any;
}
export declare class Batch implements IDisplayable {
    static _meta: TMeta;
    name: string;
    desc: string;
    constructor(obj: any);
    forDisplay(): any;
}
export declare class Relationship implements IDisplayable {
    webservice: string;
    version: string;
    desc: string;
    constructor(obj: any);
    forDisplay(): any;
}
export declare class Decomission implements IDisplayable {
    date: Date;
    version: string;
    reason: string;
    comment: string;
    constructor(obj: any);
    forDisplay(): any;
}
export declare enum DocType {
    Design = "Design",
    Swagger = "Swagger",
    UCR = "UCR",
    Other = "Other",
}
export declare class Reference {
    type: DocType;
    desc: string;
    link: string;
    constructor(obj: any);
}
export declare enum ContactType {
    Technical = "Technical",
    Business = "Business",
    Functional = "Functional",
    Vendor = "Vendor",
}
export declare enum ContactClassification {
    Primary = "Primary",
    Secondary = "Secondary",
    Emergency = "Emergency",
}
export declare class Contact implements IDisplayable {
    static _meta: TMeta;
    type: ContactType;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    classification: ContactClassification;
    addresses: Address[];
    osu_dotnum: string;
    osu_dept: string;
    constructor(obj: any, parse?: boolean);
    forDisplay(): any;
}
export declare class Address implements IDisplayable {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: number;
    phone: string;
    constructor(obj: any);
    forDisplay(): any;
}
