import { getHttpMethodWithStyle } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { CommonApiProps } from "./data";

export const columns: ColumnDef<CommonApiProps>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          Api Types
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start justify-start pl-4">
          <div className="flex items-center">
            <h4 className="text-base">{row.getValue("title")}</h4>
            {row.original.apiAction ? (
              <div className="ml-2 font-light">[{row.original.apiAction}]</div>
            ) : null}
          </div>
          <p className="!mt-0 text-muted-foreground">
            {row.original.description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "apis",
    header: () => <div className="text-center">Available APIs</div>,
    cell: ({ row }) => {
      return (
        <Table>
          <TableBody>
            {row.original.apis.map((api) => (
              <TableRow className="hover:bg-inherit">
                <TableCell>{api.version}</TableCell>
                <TableCell>{api.publishedOn}</TableCell>
                <TableCell>{api.status}</TableCell>
                <TableCell className="w-96 whitespace-nowrap text-left font-mono">
                  {getHttpMethodWithStyle(row.original.httpMethod)}
                  <span className="ml-2">
                    {api.url
                      ? api.url.replace("https://<domain-name>", "")
                      : ""}
                  </span>
                </TableCell>
                <TableCell>
                  {api.apiEndpoint ? (
                    <>
                      {api.subType ? (
                        <Link
                          to="/commonapi/$apiVersion/$apiSubType/$apiEndpoint"
                          params={{
                            apiVersion: api.version,
                            apiSubType: api.subType,
                            apiEndpoint: api.apiEndpoint,
                          }}
                        >
                          <Button>Show More</Button>
                        </Link>
                      ) : (
                        <Link
                          to="/commonapi/$apiVersion/$apiEndpoint"
                          params={{
                            apiVersion: api.version,
                            apiEndpoint: api.apiEndpoint,
                          }}
                        >
                          <Button>Show More</Button>
                        </Link>
                      )}
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    },
  },
];
