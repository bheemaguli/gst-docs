import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/taxpayer-api-overview")({
  component: TaxpayerApiOverview,
});

const ErrorPayload = `{
  "status_cd": " 0",
  "error": {
    "error_cd": "error code",
    "message": "customized error message",
  },
}`;

const ResponsePayloadWithoutSign = `{
  "status_cd": "Response status code",
  "data": "AES 256 (AES/ECB/PKCS5Padding) encrypted string of Base64 of Response payload JSON",
  "rek": "AES 256 Secure key, encrypted by sek key (shared during authentication)",
  "hmac": "HMAC-SHA256 of Base64 data using AES key (rek) as HMAC Key",
}`;

const ResponsePayloadWithSign = `{
  "status_cd": "Response status code",
  "data": "AES 256 (AES/ECB/PKCS5Padding) encrypted string of Base64 of Response payload JSON",
  "sek": "AES 256 Secure key, encrypted by EK (shared during authentication) used as AES key ",
  "sign": "PKCS#7 signature of SHA 256 hash of Base64 of response payload using private key of GST",
}`;

const RequestPayloadWithoutSign = `{
  "action"	:"Action key specific to the request",
  "data" 	: :"AES 256 (AES/ECB/PKCS5Padding) encrypted string of Base64 of Request payload JSON. EK (shared during authentication) used as AES key",
  "hmac"	:"HMAC-SHA256 of Base64 data using EK (shared during authentication) as HMAC Key",
  "hdr"	:"Header values containing Client id, Username, State_cd, Ip-usr, Txn, Api version, User Role, rtn_typ, ret_period, gstin, auth-token in json structure"
}`;

const RequestPayloadWithSign = `{ 
  "action"	:"Action key specific to the request",
  "data" 	:"AES 256 (AES/ECB/PKCS5Padding) encrypted string of Base64 of Request payload JSON. EK (shared during authentication) used as AES key",
  "sign"	:"PKCS#7 signature of SHA-256 hash of Base64 of Request payload JSON using private key of Tax Payer (Authorized signatory)",
  "st"	:"Type of signature - DSC or ESIGN",
  "sid"	:"PAN of authorized representative if st = DSC  or AADHAR no. of authorized representative if st=ESIGN or 'PAN|OTP' in case of st=EVC",
  "hdr"	:"Header values containing Client id, Username, State_cd, Ip-usr, Txn, Api version, User Role, rtn_typ, ret_period, gstin, auth-token in json structure"
}`;

const RequestPayloadWithFile = `{  
  "action"	: "Action key specific to the request",
  "doc_ty" 	: "Type of document - PAN, AADHAR, etc. which are linked with reference data in GST SYSTEM",
  "doc_ct"	: "Content type of document. Allowed are application/pdf, image/jpeg, image/png",
  "hash"	:"SHA256 of Base64 data", 
  "data"	: "Base64 encoded document" 
}`;

const ApiFormat = ({ id, number }: { id: string; number: number }) => {
  return (
    <section id={id} className="space-y-2">
      <h4>{number}. API Format</h4>
      <p>
        GST System APIs will be published as stateless REST web service over
        HTTPS.
      </p>
      <p>
        Below table depicts the URI pattern to be used while defining API end
        points:
      </p>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow>
            <TableHead>API URI :</TableHead>
            <TableHead>
              https://domain-name/access-group/version/mod-name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">HTTP Method</TableCell>
            <TableCell>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button className="w-24">GET</Button>
                    </TableCell>
                    <TableCell>To fetch data from GST</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button className="w-24">PUT</Button>
                    </TableCell>
                    <TableCell>To update changes to GST</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button className="w-24">POST</Button>
                    </TableCell>
                    <TableCell>To submit data to GST</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button className="w-24">DELETE</Button>
                    </TableCell>
                    <TableCell>To delete data from GST</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Content Type</TableCell>
            <TableCell>
              <span className="font-mono">
                application/json, text/plain, application/x-gzip
              </span>{" "}
              etc. specific to API and depending on type of data exchanged
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>URL Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">https</TableCell>
            <TableCell>
              All API will be published through HTTPS channel only.
              <br />
              HTTP protocol will be used in non-production environments
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">domain-name</TableCell>
            <TableCell>Domain name of API gateway</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">version</TableCell>
            <TableCell>
              Version of the API published by GST System. Version no. will be
              prefixed by "v" in lowercase and is always mandatory. E.g. v0.1
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">access-group</TableCell>
            <TableCell>
              Name related to primary group of API consumer accessing the API.
              <div className="clearfix05"></div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button className="w-24">/taxpayerapi</Button>
                    </TableCell>
                    <TableCell>APIs accessible to GSP</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              Access to all API will require API Key and API Secret
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">mod-name</TableCell>
            <TableCell>
              Module name will be in lower case and will be a noun. E.g.
              "Return" to upload and file return related data
              /v0.1/taxpayerapi/returns (Method: POST/PUT/GET)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

const ApiVersioning = ({ id, number }: { id: string; number: number }) => {
  return (
    <section id={id} className="space-y-2">
      <h4>{number}. API Versioning</h4>
      <p>
        API published by GST System will be versioned to accommodate for future
        change. Version number will be in X.Y format, where X is major version
        number and Y is minor version number.
      </p>
      <p>Below table depicts guideline of version number usage:</p>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>Definition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>0.x</TableCell>
            <TableCell>Draft version not published to production</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1.0</TableCell>
            <TableCell>First major version published to production</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1.x</TableCell>
            <TableCell>
              Minor change in API which does not break client code using
              previous version. In such case, previous version can be kept
              active.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2.0</TableCell>
            <TableCell>
              Major change in API which can break client code using previous
              version. In such case, previous version should be expired.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

const ApiRequest = ({ id, number }: { id: string; number: number }) => {
  return (
    <section id={id} className="space-y-2">
      <h4>{number}. API Request Payload</h4>
      <p>
        Below section defines possible types of request payload. Applicability
        of the request payload will depend on individual use case.
      </p>
      <p>REQ1: Request with GET Method</p>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">HTTP Method</TableHead>
            <TableCell>GET</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">URL Parameter</TableCell>
            <TableCell className="font-mono">
              {
                "?action={Action key specific to the request } &amp; param1={value1}&amp;"
              }
            </TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <p>This is applicable to all API with GET HTTP method.</p>

      <p>REQ2: Request Payload with POST / PUT method</p>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow>
            <TableCell className="font-medium">HTTP Method</TableCell>
            <TableCell>POST or PUT</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Content-Type</TableCell>
            <TableCell className="font-mono">application/json</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="space-y-4">
        <div>
          <p>Request Payload with encryption and without signature</p>
          <pre className="overflow-auto rounded-md bg-cyan-100 p-3">
            {RequestPayloadWithoutSign}
          </pre>
        </div>
        <div>
          <p>Request Payload with encryption and with signature</p>
          <pre className="overflow-auto rounded-md bg-cyan-100 p-3">
            {RequestPayloadWithSign}
          </pre>
        </div>
      </div>

      <p>
        Note : "hdr" values are mandatory and applicable only for common filing,
        proceed to file, GSTR7, GSTR8 and TDSTCSCredit Save api. This is
        optional for other forms.
      </p>
      <p>REQ3: Request Payload with file</p>

      <div className="space-y-2">
        <p>
          File submitted to GST system will be generated as per below steps:
        </p>
        <ul className="list-inside list-decimal">
          <li>File will be Base64 encoded</li>
          <li>Base64 encoded content will be part of data</li>
          <li>
            Base64 encoded content will be hashed using HMAC-SHA256 using EK as
            HMAC Key
          </li>
          <li>Request will be submitted with other meta data listed below</li>
        </ul>
      </div>

      <p>
        Encrypted content might bypass anti-virus check and hence these APIs are
        not suggested to be encrypted.
      </p>

      <pre className="overflow-auto rounded-md bg-cyan-100 p-3">
        {RequestPayloadWithFile}
      </pre>
      {/* <p className="mar-t-10 mar-t-15">Validity of the certificate will be checked along with expiry date. Certificate will not be matched against any registered user since identity of Model 1 user will not be captured in GST system. Signature details will be saved for future audit.</p> */}
      <p className="mar-t-10 bold">Request Header</p>
      <p>
        REST uses HTTP standard and hence metadata for a transaction can be
        embedded in HTTP headers. HTTP header should be limited to 8kB per
        field, and 100 fields per message.
      </p>
      <div>
        The following are the list of attribute that will be passed in the HTTP
        Header to invoke API post authentication.
      </div>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow>
            <TableHead className="border">Attribute</TableHead>
            <TableHead className="border">Description</TableHead>
            <TableHead className="border">Usage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">
              clientid
            </TableCell>
            <TableCell>
              This is the client identifier issued by GST System to register
              with API Gateway. This is also called API Key and API usage is
              monitored at API key level
            </TableCell>
            <TableCell rowSpan={2}>
              GST System will use these credentials to verify access to API
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">
              client-secret
            </TableCell>
            <TableCell>
              This is the client password used to register client with API
              Gateway. GST System can be requested to change this password or
              GST System can change password to prevent access.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">
              username
            </TableCell>
            <TableCell>
              Upon registraion with GST, every taxpayer/company will get an
              userid for accesing GST Portal. Same userid will be used as
              "Username" for accessing APIs.
            </TableCell>
            <TableCell>
              Every entity having GSTIN will get this userid at the time of
              registration and it will be the same as used for GST portal
              access.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">
              {/* <a href="auth/staticmasters/states"> */}
              state-cd
              {/* </a> */}
            </TableCell>
            <TableCell>State code of GST State. 99 for CBEC</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">
              auth-token
            </TableCell>
            <TableCell>
              Access token will be returned by G2B Authentication API after user
              credential is verified
            </TableCell>
            <TableCell>
              Access token to be used to access all G2B APIs
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">
              ip-usr
            </TableCell>
            <TableCell>
              This should have ip of the calling application server to trace
              back request in case of issues. This attribute value should be
              same in all the request as sent in the authentication request
              until the validity of authtoken.
            </TableCell>
            <TableCell>137.232.3.35</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">txn</TableCell>
            <TableCell>
              Unique Transaction Id of the request. Every request should be sent
              with a unique transaction id by calling application. Uniqueness of
              the txn can be achieved by prefixing initials of ASP/GSP at start.
              Txn should be Alphanumeric and 32 character long. Purpose of this
              id to track a request and response end to end. This will also help
              GSP to keep tab of request/response. Calling application will get
              back same txn back in response.
            </TableCell>
            <TableCell>LAPN24235325555</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

const ApiResponse = ({ id, number }: { id: string; number: number }) => {
  const ErrorCodes = [
    {
      code: 200,
      description:
        "Successful response. To be used when request is processed successfully or system returns Ack. No.",
    },
    {
      code: 202,
      description:
        "Request accepted. To be used when request is accepted but system might process request offline and hence will return a token.",
    },
    {
      code: 400,
      description:
        "Bad Request. When system detects issue in the input data (request payload) submitting.",
    },
    {
      code: 401,
      description:
        "Unauthorized. When system detects access to resource which is not authorized by role based access control and access to data (GSTIN).",
    },
    {
      code: 403,
      description: "Forbidden. If Auth token expires or invalid.",
    },
    {
      code: 404,
      description:
        "Not Found. If requested entity is not found or if requested API is not found.",
    },
    {
      code: 405,
      description:
        "Method not found. If requested HTTP Method is not available",
    },
    {
      code: 408,
      description:
        "Request time out. If request takes more than 15 seconds to process (configurable time), system can throw this error.",
    },
    {
      code: 412,
      description:
        "Precondition failed. If mandatory header information missing",
    },
    {
      code: 415,
      description:
        "Unsupported media type. For file upload, if incorrect mime type is used. For other request, if any content-type is used which is not supported by GST API System",
    },
    {
      code: 500,
      description:
        "Exception. If GST system fails to process request due to exceptions in the system.",
    },
    {
      code: 503,
      description:
        "Service unavailable. If certain service is down for maintenance or overloading.",
    },
  ];

  return (
    <section id={id} className="space-y-2">
      <h4>{number}. API Response Payload</h4>
      <p>
        Below section defines format of response payload. All the JSON data part
        of response will be Base64 encoded. Format of response payload is as
        follows.
      </p>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="border">Content-type</TableHead>
            <TableHead className="font-mono">application/json</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="space-y-4">
        <div>
          <p>RES5: Response Payload with encryption and without sign</p>
          <div>
            <pre className="overflow-auto rounded-md bg-cyan-100 p-3">
              {ResponsePayloadWithoutSign}
            </pre>
          </div>
        </div>
        <div>
          <p>RES6: Response Payload with encryption and with sign</p>
          <div>
            <pre className="overflow-auto rounded-md bg-cyan-100 p-3">
              {ResponsePayloadWithSign}
            </pre>
          </div>
        </div>
        <div>
          <p>RES3: Error Payload</p>
          <div>
            <pre className="overflow-auto rounded-md bg-cyan-100 p-3">
              {ErrorPayload}
            </pre>
          </div>
        </div>
      </div>
      <p className="mar-t-15">Response HTTP Status Code</p>
      <Table className="border-collapse [&_td]:border [&_th]:border">
        <TableHeader>
          <TableRow>
            <TableHead className="border">HTTP Status Code</TableHead>
            <TableHead className="border">Status Code Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ErrorCodes.map((code) => (
            <TableRow key={code.code}>
              <TableCell>{code.code}</TableCell>
              <TableCell>{code.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

function TaxpayerApiOverview() {
  return (
    <div className="space-y-6">
      {/* <h4 className="text-center">API Specifications</h4> */}
      <h3>API Overview</h3>
      <div>
        All Taxpayer related functionalities (Registration, Filling of Returns,
        Information on Payment, Viewing of ledgers etc.) will be available as
        G2B APIs. This section describes standards and formats used in these
        APIs. Content in this section should help application developers in
        understanding general API format &nbsp; Standard and in turn help in
        consumption of these APIs in their application. All G2B APIs will be
        RESTFul services.
        <p>
          Please post your queries and issues related to APIs on{" "}
          <Button variant={"link"} className="p-0 text-base" asChild>
            <a
              href="https://groups.google.com/forum/#!forum/gst-suvidha-provider-gsp-discussion-group"
              target="_blank"
              className="flex items-center gap-1"
            >
              GSP Discussion Group
              <i className="fa fa-external-link-square"></i>
            </a>
          </Button>
        </p>
      </div>
      <ul className="list-inside list-decimal">
        <li>
          <Button className="p-0 text-base" variant={"link"} asChild>
            <a href="#apiformat">API Format</a>
          </Button>
        </li>
        <li>
          <Button className="p-0 text-base" variant={"link"} asChild>
            <a href="#apiversion">API Versioning</a>
          </Button>
        </li>
        <li>
          <Button className="p-0 text-base" variant={"link"} asChild>
            <a href="#apirequest">API Request Headers &amp; Payload</a>
          </Button>
        </li>
        <li>
          <Button className="p-0 text-base" variant={"link"} asChild>
            <a href="#apiresponse">API Response Payload</a>
          </Button>
        </li>
        {/* <li ><a href="#apirequest">Error Codes</a></li> */}
      </ul>
      <div className="space-y-6">
        <ApiFormat id="apiformat" number={1} />
        <ApiVersioning id="apiversion" number={2} />
        <ApiRequest id="apirequest" number={3} />
        <ApiResponse id="apiresponse" number={4} />
      </div>
    </div>
  );
}
