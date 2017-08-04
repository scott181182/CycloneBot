"use strict";
exports.__esModule = true;
var IntegrationDomain;
(function (IntegrationDomain) {
    IntegrationDomain["Other"] = "Other";
    IntegrationDomain["PeopleSoft"] = "PeopleSoft";
    IntegrationDomain["Workday"] = "Workday";
})(IntegrationDomain = exports.IntegrationDomain || (exports.IntegrationDomain = {}));
var OtherType;
(function (OtherType) {
    OtherType["Direct"] = "Direct Database";
    OtherType["File"] = "File-Based Integration";
    OtherType["Web"] = "Web Service";
})(OtherType = exports.OtherType || (exports.OtherType = {}));
var PeopleSoftType;
(function (PeopleSoftType) {
    PeopleSoftType["Business"] = "Business Interlink";
    PeopleSoftType["Database"] = "Database Link";
    PeopleSoftType["Component"] = "Component Interface";
    PeopleSoftType["Message"] = "Messaging";
})(PeopleSoftType = exports.PeopleSoftType || (exports.PeopleSoftType = {}));
var WorkdayType;
(function (WorkdayType) {
    WorkdayType["Connector"] = "Connector";
    WorkdayType["Document"] = "Document Transformation";
    WorkdayType["EIB"] = "EIB";
    WorkdayType["Template"] = "EIB Template";
    WorkdayType["Studio"] = "Studio";
    WorkdayType["Web"] = "Web Service";
})(WorkdayType = exports.WorkdayType || (exports.WorkdayType = {}));
exports.Workstream = {
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
exports.Module = {
    ba: "Business Assets",
    ch: "Cash",
    st: "Settlement",
    cs: "Customers",
    ex: "Expenses",
    ea: "Endowment Accounting",
    bp: "Budget & Planning",
    fa: "Financial Accounting",
    gt: "Grants",
    "in": "Inventory",
    pc: "Procurement",
    sm: "Supplier Management",
    pj: "Projects",
    ad: "Audit",
    dw: "Data Warehouse",
    id: "Identity Management",
    sc: "Security"
};
var RestrictedData;
(function (RestrictedData) {
    RestrictedData["S1"] = "S1 - Public";
    RestrictedData["S2"] = "S2 - Internal";
    RestrictedData["S3"] = "S3 - Private";
    RestrictedData["S4"] = "S4 - Restricted";
})(RestrictedData = exports.RestrictedData || (exports.RestrictedData = {}));
function flatMap(obj) {
    return Object.keys(obj).map(function (key) { return ({ key: key, value: obj[key] }); });
}
exports.flatMap = flatMap;
var Integration = (function () {
    function Integration(obj, parse) {
        if (parse === void 0) { parse = true; }
        this.data_interchanges = [];
        this.webservices = [];
        this.eips = [];
        this.batches = [];
        this.relationships = [];
        this.contacts = [];
        this.name = obj.name;
        this.domain = obj.domain;
        this.type = obj.type;
        this.desc_short = obj.desc_short;
        this.desc = obj.desc;
        this.refID = obj.refID;
        this.sysName = obj.sysName;
        this.sysDept = obj.sysDept;
        this.workstream = obj.workstream;
        this.module = obj.module;
        this.restricted = obj.restricted;
        this.dept = obj.dept;
        this.realtime = obj.realtime;
        this.data_interchanges = parse && obj.data_interchanges ?
            obj.data_interchanges.map(function (di) { return new DataInterchange(di); }) :
            obj.data_interchanges;
        this.webservices = parse && obj.webservices ?
            obj.webservices.map(function (ws) { return new WebService(ws); }) :
            obj.webservices;
        this.eips = parse && obj.eips ?
            obj.eips.map(function (eip) { return new EIP(eip); }) :
            obj.eips;
        this.batches = parse && obj.batches ?
            obj.batches.map(function (batch) { return new Batch(batch); }) :
            obj.batches;
        this.relationships = parse && obj.relationships ?
            obj.relationships.map(function (rel) { return new Relationship(rel); }) :
            obj.relationships;
        this.contacts = parse && obj.contacts ?
            obj.contacts.map(function (con) { return new Contact(con, true); }) :
            obj.contacts;
        this.notes = obj.notes;
    }
    Integration.prototype.getScroller = function () {
        var attrs = [];
        attrs.push(this.type);
        if (this.restricted) {
            attrs.push("Restricted: " + this.restricted);
        }
        return attrs.join(" | ");
    };
    Integration.prototype.serialize = function () {
        if (this.isValid()) {
            return JSON.stringify(this);
        }
        else {
            return "null";
        }
    };
    Integration.prototype.isValid = function () {
        for (var key in Integration._meta) {
            if (Integration._meta[key].required) {
                if (!this[key]) {
                    return false;
                }
            }
        }
        return true;
    };
    Integration.prototype.invalidities = function () {
        var errs = [];
        for (var key in Integration._meta) {
            if (Integration._meta[key].required) {
                if (!this[key]) {
                    errs.push({
                        field: key,
                        error: "This field must have a value"
                    });
                }
            }
        }
        return errs;
    };
    Integration.prototype.forDisplay = function () { return forDisplay(this, Integration._meta); };
    Integration._meta = {
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
            options: flatMap(exports.Workstream)
        },
        module: {
            type: "select",
            required: false,
            options: flatMap(exports.Module)
        },
        restricted: {
            type: "select",
            required: true,
            options: flatMap(RestrictedData)
        },
        dept: {
            type: "string",
            required: true
        },
        notes: {
            type: "text",
            required: false
        }
    };
    return Integration;
}());
exports.Integration = Integration;
var DataInterchangeFormat;
(function (DataInterchangeFormat) {
    DataInterchangeFormat["TXT"] = "Text";
    DataInterchangeFormat["CSV"] = "CSV";
    DataInterchangeFormat["JSON"] = "JSON";
    DataInterchangeFormat["XML"] = "XML";
    DataInterchangeFormat["XMLWD"] = "XML - Workday";
})(DataInterchangeFormat = exports.DataInterchangeFormat || (exports.DataInterchangeFormat = {}));
var EncryptionMethod;
(function (EncryptionMethod) {
    EncryptionMethod["GPG"] = "GPG";
    EncryptionMethod["PGP"] = "PGP";
})(EncryptionMethod = exports.EncryptionMethod || (exports.EncryptionMethod = {}));
var AuthorizationMethod;
(function (AuthorizationMethod) {
    AuthorizationMethod["NONE"] = "None";
})(AuthorizationMethod = exports.AuthorizationMethod || (exports.AuthorizationMethod = {}));
var Protocol;
(function (Protocol) {
    Protocol["SFTP"] = "SFTP";
    Protocol["FTP"] = "FTP";
    Protocol["FTPS"] = "FTPS";
    Protocol["HTTPS"] = "HTTPS";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
var DataInterchange = (function () {
    function DataInterchange(obj) {
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
    DataInterchange.prototype.forDisplay = function () { return forDisplay(this, DataInterchange._meta); };
    DataInterchange._meta = {
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
            options: ["Inbound", "Outbound"],
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
    return DataInterchange;
}());
exports.DataInterchange = DataInterchange;
var WebService = (function () {
    function WebService(obj) {
        this.endpoint = obj.endpoint;
        this.desc = obj.desc;
        this.version = obj.version;
        this.reusable = obj.reusable;
        this.enterprise = obj.enterprise;
    }
    WebService.prototype.forDisplay = function () { return forDisplay(this, WebService._meta); };
    WebService._meta = {
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
    return WebService;
}());
exports.WebService = WebService;
var EIP = (function () {
    function EIP(obj) {
        this.endpoint = obj.endpoint;
        this.version = obj.version;
        this.registered = obj.registered;
        this.account = obj.account;
    }
    EIP.prototype.forDisplay = function () { return forDisplay(this, EIP._meta); };
    EIP._meta = {
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
    return EIP;
}());
exports.EIP = EIP;
var Batch = (function () {
    function Batch(obj) {
        this.name = obj.name;
        this.desc = obj.desc;
    }
    Batch.prototype.forDisplay = function () { return forDisplay(this, Batch._meta); };
    Batch._meta = {
        name: {
            type: "string",
            required: false
        },
        desc: {
            type: "text",
            required: false
        }
    };
    return Batch;
}());
exports.Batch = Batch;
var Relationship = (function () {
    function Relationship(obj) {
        this.webservice = obj.webservice;
        this.version = obj.version;
        this.desc = obj.desc;
    }
    Relationship.prototype.forDisplay = function () {
        return {
            webservice: this.webservice,
            version: this.version || "none",
            desc: this.desc || "none"
        };
    };
    return Relationship;
}());
exports.Relationship = Relationship;
var Decomission = (function () {
    function Decomission(obj) {
        this.date = obj.date;
        this.version = obj.version;
        this.reason = obj.reason;
        this.comment = obj.comment;
    }
    Decomission.prototype.forDisplay = function () {
        return {
            date: this.date || "unknown",
            version: this.version || "none",
            reason: this.reason || "none",
            comment: this.comment || "none"
        };
    };
    return Decomission;
}());
exports.Decomission = Decomission;
var DocType;
(function (DocType) {
    DocType["Design"] = "Design";
    DocType["Swagger"] = "Swagger";
    DocType["UCR"] = "UCR";
    DocType["Other"] = "Other";
})(DocType = exports.DocType || (exports.DocType = {}));
var Reference = (function () {
    function Reference(obj) {
        this.type = obj.type;
        this.desc = obj.desc;
        this.link = obj.link;
    }
    return Reference;
}());
exports.Reference = Reference;
var ContactType;
(function (ContactType) {
    ContactType["Technical"] = "Technical";
    ContactType["Business"] = "Business";
    ContactType["Functional"] = "Functional";
    ContactType["Vendor"] = "Vendor";
})(ContactType = exports.ContactType || (exports.ContactType = {}));
var ContactClassification;
(function (ContactClassification) {
    ContactClassification["Primary"] = "Primary";
    ContactClassification["Secondary"] = "Secondary";
    ContactClassification["Emergency"] = "Emergency";
})(ContactClassification = exports.ContactClassification || (exports.ContactClassification = {}));
var Contact = (function () {
    function Contact(obj, parse) {
        if (parse === void 0) { parse = false; }
        this.addresses = [];
        this.type = obj.type;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.email = obj.email;
        this.phone = obj.phone;
        this.classification = obj.classification;
        this.osu_dotnum = obj.osu_dotnum;
        this.osu_dept = obj.osu_dept;
        this.addresses = parse && obj.addresses ?
            obj.addresses.map(function (addr) { return new Address(addr); }) :
            obj.addresses;
    }
    Contact.prototype.forDisplay = function () { return forDisplay(this, Contact._meta); };
    Contact._meta = {
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
    return Contact;
}());
exports.Contact = Contact;
var Address = (function () {
    function Address(obj) {
        this.street = obj.street;
        this.city = obj.city;
        this.state = obj.state;
        this.country = obj.country;
        this.zip = obj.zip;
        this.phone = obj.phone;
    }
    Address.prototype.forDisplay = function () {
        return {
            street: this.street || "unknown",
            city: this.city || "unknown",
            state: this.state || "unknown",
            country: this.country || "unknown",
            zip: this.zip || "unknown",
            phone: this.phone || "unknown"
        };
    };
    return Address;
}());
exports.Address = Address;
function forDisplay(obj, meta) {
    var ret = {};
    Object.keys(obj).forEach(function (key) {
        if (meta[key] && meta[key].type === "select" && obj[key]) {
            ret[key] = meta[key].options
                .filter(function (val) { return val.key === obj[key]; })[0].value;
        }
        else if (meta[key] && !meta[key].required) {
            ret[key] = obj[key] || "none";
        }
        else if (typeof obj[key] === "object" && obj[key]) {
            if (Array.isArray(obj[key])) {
                ret[key] = obj[key].map(function (thing) { return thing.forDisplay ? thing.forDisplay() : thing; });
            }
            else if (obj[key].forDisplay) {
                ret[key] = obj[key].forDisplay();
            }
            else {
                ret[key] = obj[key];
            }
        }
        else {
            ret[key] = obj[key];
        }
    });
    return ret;
}
