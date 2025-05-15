import { DataTableProps } from "@/types";

export default function Table({
  columns,
  data,
  renderRow,
  isLoading,
  emptyText = "No Data Available",
}: DataTableProps) {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.key} className={col.className}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length}>loading</td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>{emptyText}</td>
          </tr>
        ) : (
          <tr>
            <td> ({data.map((item) => renderRow(item))})</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
