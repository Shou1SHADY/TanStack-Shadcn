import { User, columns } from "./columns"
import { DataTable } from "./data-table"
import MOCK_DATA from "../components/MOCK_DATA.json"
async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    return MOCK_DATA
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
