import _ from "lodash";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
} from "@heroui/react";
import { DataTableProps } from "@/types";

export default function DataTable({
  columns,
  data,
  isLoading,
  emptyText = "No Data Available",
}: DataTableProps) {
  return (
    <Table isStriped aria-label="Data Table">
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      {isLoading ? (
        <TableBody emptyContent="">
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex justify-center py-6">
                <Spinner
                  classNames={{ label: "text-foreground mt-4" }}
                  label="simple"
                  variant="simple"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody emptyContent={emptyText} items={data}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                const cellData = _.get(item, columnKey);

                if (_.isArray(cellData)) {
                  const first = cellData[0];
                  const rest = cellData.slice(1);
                  const tooltipContent = (
                    <ul className="text-left space-y-1">
                      {cellData.map((val, i) => (
                        <li key={i}>• {val}</li>
                      ))}
                    </ul>
                  );

                  return (
                    <TableCell>
                      <Tooltip showArrow content={tooltipContent}>
                        <span className="cursor-pointer underline">
                          {first}
                          {rest.length > 0 && ` +${rest.length} more`}
                        </span>
                      </Tooltip>
                    </TableCell>
                  );
                }

                return <TableCell>{String(cellData ?? "")}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}
