import { FullApiProps, commonApis } from "@/components/commonapis/data";
import { getApiData } from "@/lib/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ApiDetails } from "./$apiVersion.$apiEndpoint";

export const Route = createFileRoute(
  "/commonapi/$apiVersion/$apiSubType/$apiEndpoint",
)({
  beforeLoad: () => ({
    getTitle: () => Route.useParams().apiEndpoint,
  }),
  component: () => {
    const { apiVersion, apiSubType, apiEndpoint } = Route.useParams();
    const apiData: FullApiProps = getApiData(
      commonApis,
      apiVersion,
      apiSubType,
      apiEndpoint,
    );
    if (apiData) {
      return <ApiDetails apiData={apiData} />;
    } else {
      redirect({
        to: "/",
        throw: true,
      });
    }
  },
});
