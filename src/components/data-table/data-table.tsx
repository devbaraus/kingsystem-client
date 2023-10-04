"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table as TableCore } from "@tanstack/table-core";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  page: number;
  sortedBy: string;
  defaultPageSize?: number;
  onPageChange: (page: number) => void;
  onSortChange: (sorting: SortingState) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  page,
  sortedBy,
  onPageChange,
  onSortChange,
  defaultPageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([{ id: sortedBy, desc: false }]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: defaultPageSize,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  useEffect(() => {
    if (onPageChange) {
      onPageChange(pageIndex);
    }
  }, [pageIndex]);

  useEffect(() => {
    if (onSortChange) {
      onSortChange(sorting);
    }
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <ScrollArea className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() ? "selected" : null}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <ScrollArea>
        <DataTablePagination
          currentPage={page}
          table={table as TableCore<unknown>}
          totalPages={pageCount}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

type Props = {
  currentPage: number;
  totalPages: number;
  table: TableCore<unknown>;
};

function DataTablePagination({ currentPage, totalPages, table }: Props) {
  const pagesToShow = 10;

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <ul className="flex justify-center gap-1">
      <li>
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          type="button"
          variant="outline"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </li>
      {pageNumbers.map((page) => (
        <li key={page}>
          <Button
            asChild
            size="sm"
            type="button"
            variant={page - 1 === currentPage ? "default" : "outline"}
          >
            <Link href={`?page=${page - 1}`}>{page}</Link>
          </Button>
        </li>
      ))}
      <li>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          type="button"
          variant="outline"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </li>
    </ul>
  );
}
