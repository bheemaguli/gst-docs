import { ApiProps, CommonApiProps } from "@/components/commonapis/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHttpMethodWithStyle(httpMethod: string) {
  if (httpMethod == "GET") {
    return <span className="text-blue-600">GET</span>;
  } else if (httpMethod == "HEAD") {
    return <span>HEAD</span>;
  } else if (httpMethod == "POST") {
    return <span className="text-green-600">POST</span>;
  } else if (httpMethod == "PUT") {
    return <span>PUT</span>;
  } else if (httpMethod == "DELETE") {
    return <span>DELETE</span>;
  } else if (httpMethod == "CONNECT") {
    return <span>CONNECT</span>;
  } else if (httpMethod == "OPTIONS") {
    return <span>OPTIONS</span>;
  } else if (httpMethod == "TRACE") {
    return <span>TRACE</span>;
  } else if (httpMethod == "PATCH") {
    return <span>PATCH</span>;
  }

  se;
}

export function getApiData(
  data: Array<CommonApiProps>,
  apiVersion: string,
  apiSubSection: string | null,
  apiEndpoint: string,
) {
  let fullApi: any = null;

  data.forEach((api: CommonApiProps) => {
    api.apis.forEach((version: ApiProps) => {
      if (
        version.version == apiVersion &&
        version.subType == apiSubSection &&
        version.apiEndpoint == apiEndpoint
      ) {
        fullApi = version;
        fullApi.title = api.title;
        fullApi.description = api.description;
        fullApi.httpMethod = api.httpMethod;
        fullApi.apiAction = api.apiAction;
      }
    });
  });
  return fullApi;
}
