import { z } from "zod";
const ApiProps = z.object({
  version: z.string(),
  subType: z.string().optional(),
  apiEndpoint: z.string(),
  publishedOn: z.string(),
  status: z.enum(["Draft", "Final"]),
  url: z.string(),
  response: z.any().optional(),
  responseSchema: z.any().optional(),
  errorCodes: z.record(z.string(), z.string()).optional(),
});
export type ApiProps = z.infer<typeof ApiProps>;

const FullApiProps = ApiProps.extend({
  title: z.string(),
  description: z.string(),
  httpMethod: z.enum(["GET", "POST"]),
  apiAction: z.string(),
});
export type FullApiProps = z.infer<typeof FullApiProps>;

const CommonApiProps = z.object({
  title: z.string(),
  description: z.string(),
  httpMethod: z.enum(["GET", "POST"]),
  apiAction: z.string(),
  apis: z.array(ApiProps),
});
export type CommonApiProps = z.infer<typeof CommonApiProps>;

export const einvoiceSearchIRNAPI: CommonApiProps = {
  title: "Einvoice - Search IRN API",
  description: "API call for searching IRN details",
  httpMethod: "GET",
  apiAction: "EINV",
  apis: [
    {
      version: "v1.0",
      subType: "irn",
      apiEndpoint: "search",
      publishedOn: "16-04-2021",
      status: "Draft",
      url: "https://<domain-name>/commonapi/v1.0/irn/search",
      response: {
        irn: "11f8ef701fe294d4a14aad0b12457e62775d0fdc41a0acf05b74fbb2ddc49ac8",
        regirp: "NIC",
        cnclirp: "NIC",
        status: "CNL",
        regtime: "2020-05-23 12:30:30",
        cncltime: "2020-05-29 15:30:30",
      },
      responseSchema: {
        type: "object",
        title: "Search irn response schema model",
        additionalProperties: false,
        properties: {
          irn: {
            description: "IRN number",
            $ref: "#/definitions/irn",
          },
          regirp: {
            description: "IRP Code",
            $ref: "#/definitions/irp",
          },
          cnclirp: {
            description: "IRP Code",
            $ref: "#/definitions/irp",
          },
          status: {
            description: "IRN status",
            $ref: "#/definitions/status",
          },
          regtime: {
            description: "Registration time",
            $ref: "#/definitions/time",
          },
          cncltime: {
            description: "Cancellation time",
            $ref: "#/definitions/time",
          },
        },
        anyOf: [
          {
            required: ["irn", "regirp", "status", "regtime"],
          },
          {
            required: [
              "irn",
              "regirp",
              "cnclirp",
              "status",
              "regtime",
              "cncltime",
            ],
          },
        ],
        definitions: {
          irn: {
            type: "string",
            minLength: 64,
            maxLength: 64,
          },
          irp: {
            type: "string",
            minLength: 1,
          },
          status: {
            type: "string",
            minLength: 3,
            maxLength: 3,
          },
          time: {
            type: "string",
            pattern:
              "^([0-9]{4})[-/\\s]?((((0[13578])|(1[02]))[-/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[-/\\s]?(([0-2][0-9])|(30)))|(02[-/\\s]?[0-2][0-9]))[\\s](2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$",
          },
        },
      },
      errorCodes: {
        EINV9001: "Request could not be processed",
        GEN5007: "Malformed Request",
        GEN5001: "Missing Mandatory Params",
        AUT4031: "Client ID is Null",
        AUT4032: "Client-Secret is Null",
        AUT4033: "Invalid Client ID",
        AUT4034: "Invalid Client-Secret",
        EINVAV9000: "Either auth-token or username is invalid.",
        EINVAV9003: "API Authorization Failed",
        EINVAV9004: "Invalid request parameters",
        EINVAV9005: "Invalid IRN",
        EINV9006: "IRN is not registered on Invoice Registration Portal (IRP)",
      },
    },
  ],
};
export const commonApis: Array<CommonApiProps> = [
  einvoiceSearchIRNAPI,
  {
    title: "Get API Permission details",
    description: "API call for getting list API Access details",
    httpMethod: "GET",
    apiAction: "ACCDL",
    apis: [
      {
        version: "v1.0",
        subType: "fip",
        apiEndpoint: "services",
        publishedOn: "31-03-2020",
        status: "Draft",
        url: "https://<domain-name>/commonapi/v1.0/fip/services",
      },
    ],
  },
  {
    title: "Get Day Wise Changed List of GSTINs",
    description:
      "GSPs will use this API to get day wise changed List of GSTINs (md5 hash to GSTINs)",
    httpMethod: "GET",
    apiAction: "INCLIST",
    apis: [
      {
        version: "v1.0",
        apiEndpoint: "inclist",
        publishedOn: "04-02-2021",
        status: "Draft",
        url: "https://<domain-name>/commonapi/v1.0/inclist",
      },
    ],
  },
  {
    title: "GET PREFERENCE",
    description: "API call to get preference for taxpayers",
    httpMethod: "GET",
    apiAction: "GETPREF",
    apis: [
      {
        version: "v1.0",
        apiEndpoint: "returns",
        publishedOn: "21-01-2021",
        status: "Draft",
        url: "https://<domain-name>/commonapi/v1.0/returns",
      },
    ],
  },
  {
    title: "Online Verification of GSTIN",
    description:
      "This API Service is used to validate GSTIN and send back required details in the response.",
    httpMethod: "GET",
    apiAction: "TP",
    apis: [
      {
        version: "v1.0",
        apiEndpoint: "tpstatus",
        publishedOn: "29-06-2021",
        status: "Final",
        url: "https://<domain-name>/commonapi/v1.0/tpstatus",
      },
    ],
  },
  {
    title: "PAN to GSTIN",
    description: "API call for getting all the list of GSTIN for a PAN",
    httpMethod: "GET",
    apiAction: "TPPAN",
    apis: [
      {
        version: "v1.0",
        subType: "fip",
        apiEndpoint: "searchbypan",
        publishedOn: "31-03-2020",
        status: "Draft",
        url: "https://<domain-name>/commonapi/v1.0/fip/searchbypan",
      },
    ],
  },
  {
    title: "Search Taxpayer",
    description: "This API will be used to search taxpayer details",
    httpMethod: "GET",
    apiAction: "TP",
    apis: [
      {
        version: "v1.3",
        apiEndpoint: "search",
        publishedOn: "18-08-2022",
        status: "Final",
        url: "https://<domain-name>/commonapi/v1.3/search",
      },
      {
        version: "v1.2",
        apiEndpoint: "search",
        publishedOn: "16-08-2022",
        status: "Final",
        url: "https://<domain-name>/commonapi/v1.2/search",
      },
      {
        version: "v1.1",
        apiEndpoint: "search",
        publishedOn: "21-03-2018",
        status: "Final",
        url: "https://<domain-name>/commonapi/v1.1/search",
      },
    ],
  },
  {
    title: "Updated Online Verification of GSTIN",
    description:
      "This API Service is used to validate GSTIN and send back required additional details in the response.",
    httpMethod: "GET",
    apiAction: "TP",
    apis: [
      {
        version: "v1.0",
        apiEndpoint: "tpaddtlstatus",
        publishedOn: "12-01-2022",
        status: "Final",
        url: "https://<domain-name>/commonapi/v1.0/tpaddtlstatus",
      },
    ],
  },
  {
    title: "View and Track Returns",
    description:
      "This API will be used to view e-filed returns details. Common authentication API should be invoked before accessing this API in order to get the authtoken.",
    httpMethod: "GET",
    apiAction: "RETTRACK",
    apis: [
      {
        version: "v1.0",
        apiEndpoint: "returns",
        publishedOn: "01-03-2018",
        status: "Draft",
        url: "https://<domain-name>/commonapi/v1.0/returns",
      },
    ],
  },
];
