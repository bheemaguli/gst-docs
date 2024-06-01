import apiJson from "@/../../backend/apis.json";
import { columns } from "@/components/api-data-table/columns";
import { DataTable } from "@/components/api-data-table/data-table";
import { CommonApiSpec } from "@/components/api-data-table/spec";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const Route = createFileRoute("/taxpayer/returns/")({
  beforeLoad: () => ({ getTitle: () => "Returns" }),
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>;
  },
  component: () => {
    return (
      <Fragment>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Returns</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Tabs defaultValue="default">
          <TabsList className="w-full">
            <TabsTrigger value="default" className="ml-auto">
              Default
            </TabsTrigger>
            <TabsTrigger value="swagger">Swagger UI</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            {apiJson ? <DataTable columns={columns} data={apiJson} /> : null}
          </TabsContent>
          <TabsContent value="swagger">
            <SwaggerUI spec={CommonApiSpec} />
          </TabsContent>
        </Tabs>
      </Fragment>
    );
  },
});
