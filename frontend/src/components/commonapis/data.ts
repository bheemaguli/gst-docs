import { z } from "zod";
const ApiProps = z.object({
  version: z.string(),
  publishedOn: z.string(),
  status: z.enum(["Draft", "Final"]),
  domainUrl: z.string(),
  routerUrl: z.string(),
});

const CommonApiProps = z.object({
  title: z.string(),
  description: z.string(),
  httpMethod: z.enum(["GET", "POST"]),
  apiAction: z.string(),
  apis: z.array(ApiProps),
});
export type CommonApiProps = z.infer<typeof CommonApiProps>;

export const commonApis: Array<CommonApiProps> = [
  {
    title: "Einvoice - Search IRN API",
    description: "API call for searching IRN details",
    httpMethod: "GET",
    apiAction: "EINV",
    apis: [
      {
        version: "v1.0",
        publishedOn: "16-04-2021",
        status: "Draft",
        domainUrl: "https://<domain-name>/commonapi/v1.0/irn/search",
        routerUrl: "/commonapi/v10/irn/search",
      },
    ],
  },
  {
    title: "Get API Permission details",
    description: "API call for getting list API Access details",
    httpMethod: "GET",
    apiAction: "ACCDL",
    apis: [
      {
        version: "v1.0",
        publishedOn: "31-03-2020",
        status: "Draft",
        domainUrl: "https://<domain-name>/commonapi/v1.0/fip/services",
        routerUrl: "/commonapi/v10/fip/services",
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
        publishedOn: "04-02-2021",
        status: "Draft",
        domainUrl: "https://<domain-name>/commonapi/v1.0/inclist",
        routerUrl: "/commonapi/v10/inclist",
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
        publishedOn: "21-01-2021",
        status: "Draft",
        domainUrl: "https://<domain-name>/commonapi/v1.0/returns",
        routerUrl: "/commonapi/v10/returns",
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
        publishedOn: "29-06-2021",
        status: "Final",
        domainUrl: "https://<domain-name>/commonapi/v1.0/tpstatus",
        routerUrl: "/commonapi/v10/tpstatus",
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
        publishedOn: "31-03-2020",
        status: "Draft",
        domainUrl: "https://<domain-name>/commonapi/v1.0/fip/searchbypan",
        routerUrl: "/commonapi/v10/fip/searchbypan",
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
        publishedOn: "18-08-2022",
        status: "Final",
        domainUrl: "https://<domain-name>/commonapi/v1.3/search",
        routerUrl: "/commonapi/v13/search",
      },
      {
        version: "v1.2",
        publishedOn: "16-08-2022",
        status: "Final",
        domainUrl: "https://<domain-name>/commonapi/v1.2/search",
        routerUrl: "/commonapi/v12/search",
      },
      {
        version: "v1.1",
        publishedOn: "21-03-2018",
        status: "Final",
        domainUrl: "https://<domain-name>/commonapi/v1.1/search",
        routerUrl: "/commonapi/v11/search",
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
        publishedOn: "12-01-2022",
        status: "Final",
        domainUrl: "https://<domain-name>/commonapi/v1.0/tpaddtlstatus",
        routerUrl: "/commonapi/v10/tpaddtlstatus",
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
        publishedOn: "01-03-2018",
        status: "Draft",
        domainUrl: "https://<domain-name>/commonapi/v1.0/returns",
        routerUrl: "/commonapi/v10/returns",
      },
    ],
  },
];
