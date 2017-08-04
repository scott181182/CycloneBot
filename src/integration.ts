

export enum IntegrationDomain
{
  Other = "Other",
  PeopleSoft = "PeopleSoft",
  Workday = "Workday"
}

export enum OtherType
{
  Direct = "Direct Database",
  File = "File-Based Integration",
  Web = "Web Service"
}
export enum PeopleSoftType
{
  Business = "Business Interlink",
  Database = "Database Link",
  Component = "Component Interface",
  Message = "Messaging"
}
export enum WorkdayType
{
  Connector = "Connector",
  Document = "Document Transformation",
  EIB = "EIB",
  Template = "EIB Template",
  Studio = "Studio",
  Web = "Web Service"
}

export type IntegrationType =
  "Direct Database" |
  "File-Based Integration" |
  "Web Service" |
  "Business Interlink" |
  "Database Link" |
  "Component Interface" |
  "Messaging" |
  "Connector" |
  "Document Transformation" |
  "EIB" |
  "EIB Template" |
  "Studio";



// TODO: add HR and SIS workstreams
export const Workstream = {
  ba: "Business Assets",
  bs: "Banking and Settlement",
  ca: "Customer Accounts",
  em: "Expense Management",
  en: "Endowments",
  fa: "Financial Accounting",
  gm: "Grants Management",
  p2p_in: "Procure to Pay - Inventory",
  p2p_pc: "Procure to Pay - Procurement",
  p2p_sm: "Procure to Pay - Supplier Management",
  pr: "Projects",
  tn: "Technology"
};

// TODO: add HR and SIS modules
export const Module = {
  ba: "Business Assets",
  ch: "Cash",
  st: "Settlement",
  cs: "Customers",
  ex: "Expenses",
  ea: "Endowment Accounting",
  bp: "Budget & Planning",
  fa: "Financial Accounting",
  gt: "Grants",
  in: "Inventory",
  pc: "Procurement",
  sm: "Supplier Management",
  pj: "Projects",
  ad: "Audit",
  dw: "Data Warehouse",
  id: "Identity Management",
  sc: "Security"
};

export enum RestrictedData
{
  S1 = "S1 - Public",
  S2 = "S2 - Internal",
  S3 = "S3 - Private",
  S4 = "S4 - Restricted"
}

export function flatMap(obj: any): Array<{ key: string, value: any }> {
  return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
}

export type TMeta = {
  [key: string]: {
    type: string,
    required: boolean,
    options?: Array<{ key: string, value: any }> | string[]
  }
};

export interface IDisplayable { forDisplay(): any; }



export class Integration implements IDisplayable
{
  public static _meta: TMeta = {
    name: {
      type: "text",
      required: true
    },
    domain: {
      type: "select",
      required: true,
      options: flatMap(IntegrationDomain)
    },
    type: {
      type: "select",
      required: true,
      options: flatMap(OtherType).concat(flatMap(PeopleSoftType)).concat(flatMap(WorkdayType))
    },
    desc_short: {
      type: "string",
      required: true
    },
    desc: {
      type: "text",
      required: true
    },
    refID: {
      type: "string",
      required: false
    },
    sysName: {
      type: "string",
      required: false
    },
    sysDept: {
      type: "string",
      required: false
    },
    workstream: {
      type: "select",
      required: false,
      options: flatMap(Workstream)
    },
    module: {
      type: "select",
      required: false,
      options: flatMap(Module)
    },
    restricted: {
      type: "select",
      required: true,
      options: flatMap(RestrictedData)
    },
    dept: {
      type: "string",
      required: true // While the specification doesn't require them, sysDept does
    },
    notes: {
      type: "text",
      required: false
    }
  };



  /** Integration Name. @type {string} freeform */
  public name: string;
  /**
   * Integration Domain.
   * Meant to subdivide the Integration Type
   * @type {string} of IntegrationDomain
   */
  public domain: IntegrationDomain;
  /** Integration Type. @type {string} of IntegrationType */
  public type: IntegrationType;
  /** Short Description. @type {string} freeform */
  public desc_short: string;
  /** Description. @type {string} freeform */
  public desc: string;

  /**
   * Reference ID
   * For the Workday project, this can contain the Integration ID
   * @type {string}
   * @nonrequired
   */
  public refID: string;

  /**
   * Owning System Name
   * Should default to the Department/Org name
   * @type {string} from ServiceNow
   */
  public sysName: string;
  /**
   * Owning System Department
   * Should default to the Department/Org name
   * @type {string} from ServiceNow
   * @nonrequired
   */
  public sysDept: string;

  /**
   * Workstream
   * @type {string} of Workstream
   * @nonrequired
   */
  public workstream: string;
  /**
   * Modules
   * @type {string} of Module
   * @nonrequired
   */
  public module: string;

  /** Restricted Data. @type {string} of RestrictedData */
  public restricted: RestrictedData;

  /**
   * Owning Department
   * @type {string}
   * TODO: Required?
   */
  public dept: string;

  /** Real Time. @type {boolean}. @nonrequired */
  public realtime: boolean;


  public data_interchanges: DataInterchange[] = [  ];
  public webservices: WebService[] = [  ];
  public eips: EIP[] = [  ];
  public batches: Batch[] = [  ];

  public relationships: Relationship[] = [  ];
  public contacts: Contact[] = [  ];
  public notes: string;



  constructor(obj: any, parse = true) {
    this.name       = obj.name;
    this.domain     = obj.domain;
    this.type       = obj.type;
    this.desc_short = obj.desc_short;
    this.desc       = obj.desc;

    this.refID = obj.refID;

    this.sysName    = obj.sysName;
    this.sysDept    = obj.sysDept;
    this.workstream = obj.workstream;
    this.module     = obj.module;

    this.restricted = obj.restricted;
    this.dept       = obj.dept;
    this.realtime   = obj.realtime;


    this.data_interchanges = parse && obj.data_interchanges ?
      obj.data_interchanges.map((di: any) => new DataInterchange(di)) :
      obj.data_interchanges;
    this.webservices       = parse && obj.webservices ?
      obj.webservices.map((ws: any) => new WebService(ws)) :
      obj.webservices;
    this.eips              = parse && obj.eips ?
      obj.eips.map((eip: any) => new EIP(eip)) :
      obj.eips;
    this.batches           = parse && obj.batches ?
      obj.batches.map((batch: any) => new Batch(batch)) :
      obj.batches;

    this.relationships     = parse && obj.relationships ?
      obj.relationships.map((rel: any) => new Relationship(rel)) :
      obj.relationships;
    this.contacts          = parse && obj.contacts ?
      obj.contacts.map((con: any) => new Contact(con, true)) :
      obj.contacts;

    this.notes = obj.notes;
  }

  public getScroller(): string {
    const attrs: string[] = [  ];
    attrs.push(this.type);
    if(this.restricted) { attrs.push(`Restricted: ${this.restricted}`); }

    return attrs.join(" | ");
  }

  public serialize(): string {
    if(this.isValid()) { return JSON.stringify(this); }
    else { return "null"; }
  }

  public isValid(): boolean {
    for(const key in Integration._meta) {
      if(Integration._meta[key].required) {
        if(!this[key as keyof Integration]) { return false; }
      }
    }
    return true;
  }
  public invalidities(): Array<{ field: string, error: string }>
  {
    const errs = [  ];
    for(const key in Integration._meta) {
      if(Integration._meta[key].required) {
        if(!this[key as keyof Integration]) {
          errs.push({
            field: key,
            error: "This field must have a value"
          });
        }
      }
    }
    return errs;
  }

  public forDisplay(): any { return forDisplay(this, Integration._meta); }

}

export enum DataInterchangeFormat
{
  TXT = "Text",
  CSV = "CSV",
  JSON = "JSON",
  XML = "XML",
  XMLWD = "XML - Workday"
}
export enum EncryptionMethod
{
  GPG = "GPG",
  PGP = "PGP"
}
export enum AuthorizationMethod
{
  // TODO: make a list
  NONE = "None"
}
export enum Protocol
{
  SFTP = "SFTP",
  FTP = "FTP",
  FTPS = "FTPS",
  HTTPS = "HTTPS"
}

export class DataInterchange implements IDisplayable
{
  public static _meta: TMeta = {
    source: {
      type: "string",
      required: true
    },
    target: {
      type: "string",
      required: true
    },
    restricted: {
      type: "select",
      required: true,
      options: flatMap(RestrictedData)
    },
    format: {
      type: "select",
      required: true,
      options: flatMap(DataInterchangeFormat)
    },
    transformation: {
      type: "string",
      required: false
    },
    encryption: {
      type: "select",
      required: false,
      options: flatMap(EncryptionMethod)
    },
    authorization: {
      type: "select",
      required: false,
      options: flatMap(AuthorizationMethod)
    },
    inbound: {
      type: "boolean",
      options: [ "Inbound", "Outbound" ],
      required: true
    },
    protocol: {
      type: "select",
      required: false,
      options: flatMap(Protocol)
    },
    account: {
      type: "string",
      required: false
    },
    directory: {
      type: "string",
      required: false
    },
    filename: {
      type: "string",
      required: false
    }
  };



  /**
   * Integration Source(s)
   * @type {string}
   */
  public source: string;
  /**
   * Integration Target(s)
   * @type {string}
   */
  public target: string;

  /** Restricted Data. @type {string} of RestrictedData */
  public restricted: RestrictedData;
  /** Data Interchange Format. @type {string} of DataInterchangeFormat */
  public format: DataInterchangeFormat;

  /** Transformation Description.
   *  Required when data is being transformed.
   *  @type {string} freeform
   *  @nonrequired
   */
  public transformation: string;

  /** Encryption Method.
   *  @type {string} of EncryptionMethod
   *  @nonrequired
   */
  public encryption: EncryptionMethod;
  /** Authorization Method.
   *  @type {string} of AuthorizationMethod
   *  @nonrequired
   */
  public authorization: AuthorizationMethod;

  /**
   * Integration Direction.
   * true iff direction is "inbound"
   * @type {boolean}
   */
  public inbound: boolean;

  /**
   * Protocol
   * @type {string} of Protocol
   * @nonrequired
   */
  public protocol: Protocol;

  /**
   * Account Name.
   * @type {string} freeform
   * @nonrequired
   */
  public account: string;
  /**
   * Transmission Directory.
   * @type {string} freeform
   * @nonrequired
   */
  public directory: string;
  /**
   * Filename.
   * "Any component could be decommissoned.  (i.e. Integration, EIP, Web Service/Version, Batch, etc.)"
   * @type {string} freeform
   * @nonrequired
   */
  public filename: string;



  constructor(obj: any) {
    this.source = obj.source;
    this.target = obj.target;

    this.restricted = obj.restricted;
    this.format = obj.format;
    this.transformation = obj.transformation;
    this.encryption = obj.encryption;
    this.authorization = obj.authorization;

    this.inbound = obj.inbound;
    this.protocol = obj.protocol;
    this.account = obj.account;
    this.directory = obj.directory;
    this.filename = obj.filename;
  }

  public forDisplay(): any { return forDisplay(this, DataInterchange._meta); }

}

export class WebService implements IDisplayable
{
  public static _meta: TMeta = {
    endpoint: {
      type: "string",
      required: false
    },
    desc: {
      type: "text",
      required: false
    },
    version: {
      type: "text",
      required: false
    },
    reusable: {
      type: "boolean",
      required: true
    },
    enterprise: {
      type: "boolean",
      required: true
    }
  };



  /**
   * Integration Endpoint
   * @type {string} freeform
   * @nonrequired
   */
  public endpoint: string;
  /**
   * Description
   * @type {string} freeform
   * @nonrequired
   */
  public desc: string;
  /**
   * Version
   * @type {string} freeform
   * @nonrequired
   */
  public version: string;
  /**
   * Is Service Reusable?
   * @type {boolean}
   * @nonrequired
   */
  public reusable: boolean;
  /**
   * Is Enterprise Service?
   * @type {boolean}
   * @nonrequired
   */
  public enterprise: boolean;



  constructor(obj: any) {
    this.endpoint = obj.endpoint;
    this.desc = obj.desc;
    this.version = obj.version;
    this.reusable = obj.reusable;
    this.enterprise = obj.enterprise;
  }

  public forDisplay(): any { return forDisplay(this, WebService._meta); }

}

export class EIP implements IDisplayable
{
  public static _meta: TMeta = {
    endpoint: {
      type: "string",
      required: false
    },
    version: {
      type: "string",
      required: false
    },
    registered: {
      type: "boolean",
      required: true
    },
    account: {
      type: "string",
      required: false
    }
  };



  /**
   * EIP Endpoint
   * @type {string} freeform
   * @nonrequired
   */
  public endpoint: string;
  /**
   * Version
   * @type {string} freeform
   * @nonrequired
   */
  public version: string;
  /**
   * In Service Registry?
   * @type {boolean}
   * @nonrequired
   */
  public registered: boolean;
  /**
   * Service Account Name
   * "Do we need to call out Workday Account Used?  An account ID is already on the Data Interchange Information."
   * @type {string} freeform
   * @nonrequired
   */
  public account: string;



  constructor(obj: any) {
    this.endpoint = obj.endpoint;
    this.version = obj.version;
    this.registered = obj.registered;
    this.account = obj.account;
  }

  public forDisplay(): any { return forDisplay(this, EIP._meta); }

}

export class Batch implements IDisplayable
{
  public static _meta: TMeta = {
    name: {
      type: "string",
      required: false
    },
    desc: {
      type: "text",
      required: false
    }
  };



  /**
   * Batch Job Name
   * @type {string} freeform or from AutoSys
   * @nonrequired
   */
  public name: string;
  /**
   * Batch Job Description
   * @type {string} freeform or from AutoSys
   * @nonrequired
   */
  public desc: string;



  constructor(obj: any) {
    this.name = obj.name;
    this.desc = obj.desc;
  }

  public forDisplay(): any { return forDisplay(this, Batch._meta); }

}

export class Relationship implements IDisplayable
{
  /**
   * Webservice
   * @type {string} freeform
   */
  public webservice: string;
  /**
   * Version
   * @type {string} freeform
   * @nonrequired
   */
  public version: string;
  /**
   * Description
   * @type {string} freeform
   * @nonrequired
   */
  public desc: string;



  constructor(obj: any) {
    this.webservice = obj.webservice;
    this.version = obj.version;
    this.desc = obj.desc;
  }

  public forDisplay(): any {
    return {
      webservice: this.webservice,
      version: this.version || "none",
      desc: this.desc || "none"
    };
  }

}

export class Decomission implements IDisplayable
{
  /**
   * Date.
   * @type {Date}
   * @nonrequired
   */
  public date: Date;
  /**
   * Version.
   * @type {string} freeform
   * @nonrequired
   */
  public version: string;
  /**
   * Reason.
   * @type {string} freeform
   * @nonrequired
   */
  public reason: string;
  /**
   * Comment
   * @type {string} freeform
   * @nonrequired
   */
  public comment: string;



  constructor(obj: any) {
    this.date = obj.date;
    this.version = obj.version;
    this.reason = obj.reason;
    this.comment = obj.comment;
  }

  public forDisplay(): any {
    return {
      date: this.date || "unknown",
      version: this.version || "none",
      reason: this.reason || "none",
      comment: this.comment || "none",
    };
  }

}

export enum DocType
{
  Design = "Design",
  Swagger = "Swagger",
  UCR = "UCR",
  Other = "Other"
}

export class Reference
{
  /**
   * Document Type.
   * @type {string} of DocType
   * @nonrequired
   */
  public type: DocType;
  /**
   * Description
   * @type {string} freeform
   * @nonrequired unless type == DocType.OTHER
   */
  public desc: string;
  /**
   * Link
   * @type {string} freeform
   * @nonrequired
   */
  public link: string;

  constructor(obj: any) {
    this.type = obj.type;
    this.desc = obj.desc;
    this.link = obj.link;
  }
}

export enum ContactType
{
  Technical = "Technical",
  Business = "Business",
  Functional = "Functional",
  Vendor = "Vendor"
}
export enum ContactClassification
{
  Primary = "Primary",
  Secondary = "Secondary",
  Emergency = "Emergency"
}

export class Contact implements IDisplayable
{
  public static _meta: TMeta = {
    type: {
      type: "select",
      required: false,
      options: flatMap(ContactType)
    },
    firstname: {
      type: "text",
      required: false
    },
    lastname: {
      type: "text",
      required: false
    },
    email: {
      type: "text",
      required: false
    },
    phone: {
      type: "text",
      required: false
    },
    classification: {
      type: "select",
      required: false,
      options: flatMap(ContactClassification)
    },
    osu_dotnum: {
      type: "text",
      required: false
    },
    osu_dept: {
      type: "text",
      required: false
    }
  };



  /**
   * Contact Type
   * @type {string} of ContactType
   * @nonrequired
   */
  public type: ContactType;
  public firstname: string;
  public lastname: string;

  public email: string;
  public phone: string;
  /**
   * Contact Classification.
   * @type {string} of ContactClassification
   */
  public classification: ContactClassification;

  public addresses: Address[] = [  ];

  /**
   * OSU Name.#
   * @type {string}
   * @nonrequired
   */
  public osu_dotnum: string;
  /**
   * OSU Home Department
   * @type {string}
   * @nonrequired
   */
  public osu_dept: string;



  constructor(obj: any, parse = false) {
    this.type = obj.type;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.phone = obj.phone;
    this.classification = obj.classification;
    this.osu_dotnum = obj.osu_dotnum;
    this.osu_dept = obj.osu_dept;

    this.addresses = parse && obj.addresses ?
      obj.addresses.map((addr: any) => new Address(addr)) :
      obj.addresses;
  }

  public forDisplay() { return forDisplay(this, Contact._meta); }

}

export class Address implements IDisplayable
{
    public street: string;
    public city: string;
    public state: string;
    public country: string;
    public zip: number;

    public phone: string;

    constructor(obj: any) {
        this.street = obj.street;
        this.city = obj.city;
        this.state = obj.state;
        this.country = obj.country;
        this.zip = obj.zip;
        this.phone = obj.phone;
    }

    public forDisplay(): any {
      return {
        street: this.street || "unknown",
        city: this.city || "unknown",
        state: this.state || "unknown",
        country: this.country || "unknown",
        zip: this.zip || "unknown",
        phone: this.phone || "unknown",
      };
    }

}

/* tslint:disable:prefer-conditional-expression */
function forDisplay(obj: any, meta: TMeta): any
{
  const ret: any = {  };
  Object.keys(obj).forEach((key) => {
    if(meta[key] && meta[key].type === "select" && obj[key]) {
      ret[key] = (meta[key].options as Array<{ key: string, value: any; }>)
        .filter((val) => val.key === obj[key])[0].value;
    }
    else if(meta[key] && !meta[key].required) { ret[key] = obj[key] || "none"; }
    else if(typeof obj[key] === "object" && obj[key]) {
      if(Array.isArray(obj[key])) {
        ret[key] = obj[key].map((thing: any) => thing.forDisplay ? thing.forDisplay() : thing);
      }
      else if(obj[key].forDisplay) { ret[key] = obj[key].forDisplay(); }
      else { ret[key] = obj[key]; }
    }
    else { ret[key] = obj[key]; }
  });
  return ret;
}
