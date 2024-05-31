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
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/commonapi/" as never)({
  component: () => (
    <div className="container mx-auto py-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Common Apis</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="swagger">
        <TabsList>
          <TabsTrigger value="default">Default</TabsTrigger>
          <TabsTrigger value="swagger">Swagger UI</TabsTrigger>
        </TabsList>
        <TabsContent value="default">
          <DataTable columns={columns} data={commonApis} />
        </TabsContent>
        <TabsContent value="swagger"><SwaggerUI spec={CommonApiSpec} /></TabsContent>
      </Tabs>
    </div>
  ),
});
