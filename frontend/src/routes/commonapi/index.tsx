import { columns } from "@/components/commonapis/columns";
import { commonApis } from "@/components/commonapis/data";
import { DataTable } from "@/components/commonapis/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { CommonApiSpec } from "@/components/commonapis/spec";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/commonapi/")({
  beforeLoad: () => ({ getTitle: () => "Common Apis" }),
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>
  },
  component: () => (
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
            <BreadcrumbPage>Common Apis</BreadcrumbPage>
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
          <DataTable columns={columns} data={commonApis} />
        </TabsContent>
        <TabsContent value="swagger">
          <SwaggerUI spec={CommonApiSpec} />
        </TabsContent>
      </Tabs>
    </Fragment>
  ),
});
