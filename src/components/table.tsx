import React from "react";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Spinner,
} from "@heroui/react";
import { EyeIcon, EditIcon, Trash2Icon } from "lucide-react";
import type { DataTableProps } from "@/types";

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  isLoading,
  emptyText = "No Data Available",
}: DataTableProps) {
  return (
    <Table aria-label="Data Table" isStriped>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={emptyText}
        items={data || []}
        isLoading={isLoading}
        loadingContent={
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            label="Loading ..."
            variant="wave"
          />
        }
      >
        {(item) => {
          const renderCell = (columnKey: string) => {
            const cellValue = _.get(item, columnKey, "");

            if (columnKey === "actions") {
              return (
                <div className="relative flex items-center gap-2">
                  <Tooltip content="View">
                    <span
                      onClick={() => onView?.(item)}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <span
                      onClick={() => onEdit?.(item)}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
                    <span
                      onClick={() => onDelete?.(item)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <Trash2Icon />
                    </span>
                  </Tooltip>
                </div>
              );
            }

            return cellValue;
          };

          return (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(String(columnKey))}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
