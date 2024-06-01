import { FullApiProps, commonApis } from "@/components/commonapis/data";
import { getApiData } from "@/lib/utils";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ApiDetails } from "./$apiVersion.$apiEndpoint";

export const Route = createFileRoute(
  "/commonapi/$apiVersion/$apiSubType/$apiEndpoint",
)({
  beforeLoad: () => ({
    getTitle: () => {
      const { apiVersion, apiSubType, apiEndpoint } = Route.useParams();
      const apiData: FullApiProps = getApiData(
        commonApis,
        apiVersion,
        apiSubType,
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
      throw notFound()
    }
  },
  notFoundComponent: () => <div>I'm the Not found page</div>,
});
