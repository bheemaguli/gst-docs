import { FullApiProps, commonApis } from "@/components/commonapis/data";
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
      localStorage.setItem("apiData", JSON.stringify(apiData))
      if (apiData) {
        return apiData.title
      }
    },
  }),
  component: () => {
    let localData = localStorage.getItem("apiData")
    if (localData && JSON.parse(localData)) {
      let apiData: FullApiProps = JSON.parse(localData)
      return <ApiDetails apiData={apiData} />;
    } else {
      redirect({ to: "/commonapi", throw: true })
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
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>HTTP METHOD</TableCell>
                <TableCell>{props.apiData.httpMethod}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
