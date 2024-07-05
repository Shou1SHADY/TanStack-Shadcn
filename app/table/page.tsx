"use client"

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import TanStackTable from "./table";
import { useVirtualizer } from '@tanstack/react-virtual';
import React from "react";

const Home = () => {
    const parentRef = React.useRef<HTMLInputElement>(null)


    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count: 10000,
        getScrollElement: () => parentRef.current!,
        estimateSize: () => 35,
    })


    const columns: ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                cell: info => info.getValue(),
                enableSorting: true,
            },
            {
                accessorKey: 'title',
                header: 'Title',
                cell: info => info.getValue(),
                enableSorting: true,
            },
            {
                accessorKey: 'body',
                header: 'Body',
                cell: info => info.getValue(),
                enableSorting: true,
            },
        ],
        []
    );

    return (
        <div
            ref={parentRef} style={{

                height: `400px`,
                overflow: 'auto', // Make it scroll!
            }}>

            <h1>TanStack Table with Pagination, Sorting, Filtering, and Sticky Columns</h1>
            <TanStackTable columns={columns} rowVirtualizer={rowVirtualizer} />
        </div>
    );
};

export default Home;
