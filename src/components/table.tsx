import { DataTableProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Spinner
} from "@heroui/react";
import { EyeIcon, EditIcon, DeleteIcon } from "lucide-react";
import _ from "lodash";

export default function Table({
  columns,
  data,
  isLoading,
  onDelete,
  onEdit,
  onView,
  emptyText = "No Data Available",
}: DataTableProps) {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = _.get(user, columnKey, ""); // Safely get the value

    const customRenderers = {
      actions: () => (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    };

    return customRenderers[columnKey]?.() ?? cellValue;
  }, []);

  return (
    <Table aria-label="Data Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={emptyText}
        items={data}
        isLoading={isLoading}
        loadingContent={
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            label="Loading ..."
            variant="wave"
          />
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
