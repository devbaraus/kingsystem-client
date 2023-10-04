"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FilterSystemDto, FindSystemSchema, System } from "@/types/system";
import { zodResolver } from "@hookform/resolvers/zod";
import SystemService from "@/services/system";
import FilterFormSystem from "@/components/system/filter-form-system";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { EraserIcon, PlusSquareIcon, SearchIcon } from "lucide-react";
import { FormFieldSet, FormLegend } from "@/components/ui/form";
import DataTable from "@/components/data-table/data-table";
import { Pagination } from "@/types/pagination";
import { SortingState } from "@tanstack/react-table";
import { dataColumnsSystem } from "@/components/system/data-columns-systems";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const [systemsPagination, setSystemsPagination] = useState<Pagination<System>>(); // [1

  const page = Number(searchParams.get("page") || "0");
  const orderBy = searchParams.get("orderBy") || "id";
  const description = searchParams.get("description") || undefined;
  const acronym = searchParams.get("acronym") || undefined;
  const email = searchParams.get("email") || undefined;

  const form = useForm<FilterSystemDto>({
    resolver: zodResolver(FindSystemSchema),
    defaultValues: {
      description,
      acronym,
      email,
    },
  });

  const fetchSystems = useCallback(
    async (page: number, orderBy: string | undefined, data: FilterSystemDto) => {
      return SystemService.list(page, orderBy, data, {
        signal: abortControllerRef.current.signal,
      }).then((response) => {
        setSystemsPagination(response as Pagination<System>);
      });
    },
    [],
  );

  function replaceUrlParams(page: number, orderBy: string | undefined, data: FilterSystemDto) {
    const searchParams = new URLSearchParams();
    page && searchParams.set("page", page.toString());
    orderBy && searchParams.set("orderBy", orderBy);
    data.description && searchParams.set("description", data.description);
    data.acronym && searchParams.set("acronym", data.acronym);
    data.email && searchParams.set("email", data.email);

    form.reset({});
    router.replace(`${pathname}?${searchParams.toString()}`, {
      scroll: false,
    });
  }

  function onSubmit(data: FilterSystemDto) {
    return replaceUrlParams(page, orderBy, data);
  }

  async function onPageChange(currentPage: number) {
    return replaceUrlParams(currentPage, orderBy, {
      description,
      acronym,
      email,
    });
  }

  async function onSortChange(sorting: SortingState) {
    if (!sorting.length) return;

    const firstSort = sorting[0];
    const orderBy = `${firstSort.desc ? "-" : ""}${firstSort.id}`;

    replaceUrlParams(0, orderBy, {
      description,
      acronym,
      email,
    });
  }

  useEffect(() => {
    fetchSystems(page, orderBy, {
      description,
      acronym,
      email,
    });

    return () => {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
    };
  }, [fetchSystems, page, orderBy, description, acronym, email]);

  return (
    <FilterFormSystem
      form={form}
      onSubmit={onSubmit}
    >
      <FormFieldSet className="w-full @container">
        <FormLegend>Resultados da Consulta</FormLegend>
        <DataTable
          columns={dataColumnsSystem}
          data={systemsPagination?.data || []}
          onPageChange={onPageChange}
          onSortChange={onSortChange}
          page={page}
          pageCount={systemsPagination?.pages || 0}
          sortedBy={orderBy?.replace("-", "")}
        />
      </FormFieldSet>

      <div className="flex flex-col-reverse justify-end gap-4 md:flex-row">
        <Button
          asChild
          className="gap-1"
          type="button"
          variant="secondary"
        >
          <Link href="/system/create">
            Novo Sistema
            <PlusSquareIcon className="inline-block h-5 w-5" />
          </Link>
        </Button>

        <Button
          asChild
          className="gap-1"
          type="button"
          variant="destructive"
        >
          <Link
            className=" gap-1"
            href={pathname}
          >
            Limpar
            <EraserIcon className="inline-block h-5 w-5" />
          </Link>
        </Button>
        <Button
          className="gap-1"
          type="submit"
        >
          Pesquisar
          <SearchIcon className="inline-block h-5 w-5" />
        </Button>
      </div>
    </FilterFormSystem>
  );
}
