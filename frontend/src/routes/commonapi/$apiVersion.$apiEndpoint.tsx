import { FullApiProps, commonApis } from "@/components/api-data-table/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getApiData } from "@/lib/utils";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/commonapi/$apiVersion/$apiEndpoint")({
  beforeLoad: () => ({
    getTitle: () => {
      const { apiVersion, apiEndpoint } = Route.useParams();
      const apiData: FullApiProps = getApiData(
        commonApis,
        apiVersion,
        null,
        apiEndpoint,
      );
      localStorage.setItem("apiData", JSON.stringify(apiData));
      if (apiData) {
        return apiData.title;
      }
    },
  }),
  component: () => {
    let localData = localStorage.getItem("apiData");
    if (localData && JSON.parse(localData)) {
      let apiData: FullApiProps = JSON.parse(localData);
      return <ApiDetails apiData={apiData} />;
    } else {
      redirect({ to: "/commonapi", throw: true });
    }
  },
});

interface ApiDetailsProps {
  apiData: FullApiProps;
}

export function ApiDetails(props: ApiDetailsProps) {
  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/commonapi">
              <BreadcrumbLink>Common Apis</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{props.apiData.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <CardTitle>{props.apiData.title}</CardTitle>
            <div className="ml-auto">{props.apiData.version}</div>
          </div>
          <CardDescription>{props.apiData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="h-8 rounded bg-green-600 px-4 text-xl text-white">
                    {props.apiData.httpMethod}
                  </span>
                </TableCell>
                <TableCell>{props.apiData.url}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Content Type</TableCell>
                <TableCell>application/json</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>URL Parameters</TableCell>
                <TableCell>irn={"{}"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Encription</TableCell>
                <TableCell>No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>API Action</TableCell>
                <TableCell>{props.apiData.apiAction}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {props.apiData.response ? (
            <div className="space-y-2">
              <CardTitle>Response Example</CardTitle>
              <span className="!my-0 flex h-0">
                <Button
                  size={"sm"}
                  className="relative -bottom-4 right-3 z-10 ml-auto"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(props.apiData.response, null, 2),
                    )
                  }
                >
                  Copy
                </Button>
              </span>
              <ScrollArea className="max-h-96 overflow-y-auto whitespace-pre rounded bg-cyan-200 p-4 font-mono text-sm">
                {JSON.stringify(props.apiData.response, null, 2)}
              </ScrollArea>
            </div>
          ) : null}
          {props.apiData.errorCodes ? (
            <div className="space-y-2">
              <CardTitle>Error Codes</CardTitle>
              <Table>
                <TableBody>
                  {Object.keys(props.apiData.errorCodes).map((key) => (
                    <TableRow id={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                        {props.apiData.errorCodes
                          ? props.apiData.errorCodes[key]
                          : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
