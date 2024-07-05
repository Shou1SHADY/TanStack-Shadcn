"use client"
import React, { useMemo, useState } from 'react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Virtualizer } from '@tanstack/react-virtual';

// Define Table Columns





// Mock Data Fetching Function
const fetchData = async (pageIndex: number, pageSize: number) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}&_limit=${pageSize}`
    );
    const data = await res.json();
    const total = Number(res.headers.get('X-Total-Count'));
    return { data, total };
};

// Define Table Columns


const TanStackTable = ({ columns, rowVirtualizer }: { columns: ColumnDef<any>[], rowVirtualizer: Virtualizer<HTMLInputElement, Element> }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { data, error, isLoading } = useQuery({
        queryKey: ['data', pageIndex, pageSize],
        queryFn: () => fetchData(pageIndex, pageSize),
    });

    const table = useReactTable({
        data: data?.data || [],
        columns,
        pageCount: data ? Math.ceil(data.total / pageSize) : -1,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: updater => {
            if (typeof updater === 'function') {
                const newState = updater({
                    pageIndex,
                    pageSize,
                });
                setPageIndex(newState.pageIndex);
                setPageSize(newState.pageSize);
            } else {
                setPageIndex(updater.pageIndex);
                setPageSize(updater.pageSize);
            }
        },
    });

    const parentRef = React.useRef<HTMLDivElement>(null);



    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div>
            <TableContainer ref={parentRef} style={{ height: `400px`, overflow: 'auto' }}>
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <table>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <div>
                                                {header.column.getCanSort() && (
                                                    <button
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽') : ' ↕'}
                                                    </button>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                                const row = table.getRowModel().rows[virtualItem.index];
                                return (
                                    <tr key={row.id} style={{ transform: `translateY(${virtualItem.start}px)` }}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </TableContainer>
            <div className="pagination">
                <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    {'<<'}
                </button>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    {'<'}
                </button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {'>'}
                </button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                    {'>>'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

// Styled Components for Table
const TableContainer = styled.div`
  overflow: auto;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border: solid 1px gray;
    background: white;
    position: sticky;
    top: 0;
  }
  thead th {
    background: #f0f0f0;
    z-index: 1;
  }
`;

export default TanStackTable;
