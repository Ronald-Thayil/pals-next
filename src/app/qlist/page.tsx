"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";
import FooterAdmin from "@/components/FooterAdmin";
import QuotationFormPage from "@/components/QuotationForm";

// Define the correct type
type Quotation = {
  _id: string;
  quotationId: string;
  date: string;
  name: string;
  address: string;
  productList: {
    description: string;
    rate: number;
    quantity: number;
    unit: string;
    Amount: number;
    _id: string;
  }[];
  gstAmount: number;
  netBasicAmount: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const qlistData = [
  {
    _id: "6803b91733e7ea400b4d7599",
    quotationId: "FVPL/Q/24-25/018",
    date: "09/04/2025",
    name: "fdgd",
    address: "sdfsdfs",
    productList: [
      {
        description: "dfs",
        rate: 3,
        quantity: 39,
        unit: "Piece",
        Amount: 117,
        _id: "6803b91733e7ea400b4d759a",
      },
    ],
    gstAmount: 21.06,
    netBasicAmount: 138.06,
    timestamp: "2025-04-19T14:54:15.985Z",
    createdAt: "2025-04-19T14:54:15.996Z",
    updatedAt: "2025-04-19T14:54:15.996Z",
    __v: 0,
  },
  {
    _id: "6803a1c94128d303078d2a21",
    quotationId: "FVPL/Q/24-25/017",
    date: "16/04/2025",
    name: "dfd",
    address: "vbvbn",
    productList: [
      {
        description: "cvc",
        rate: 44,
        quantity: 4,
        unit: "Piece",
        Amount: 176,
        _id: "6803a1c94128d303078d2a22",
      },
    ],
    gstAmount: 31.68,
    netBasicAmount: 207.68,
    timestamp: "2025-04-19T13:14:49.821Z",
    createdAt: "2025-04-19T13:14:49.822Z",
    updatedAt: "2025-04-19T13:14:49.822Z",
    __v: 0,
  },
  {
    _id: "6803a14743df4304c0cfbb4c",
    quotationId: "FVPL/Q/24-25/016",
    date: "10/04/2025",
    name: "John",
    address: "knkjnknkj",
    productList: [
      {
        description: "Desc 1",
        rate: 65,
        quantity: 89,
        unit: "Piece",
        Amount: 5785,
        _id: "6803a14743df4304c0cfbb4d",
      },
    ],
    gstAmount: 1041.3,
    netBasicAmount: 6826.3,
    timestamp: "2025-04-19T13:12:39.122Z",
    createdAt: "2025-04-19T13:12:39.127Z",
    updatedAt: "2025-04-19T13:12:39.127Z",
    __v: 0,
  },
  {
    _id: "68039fa40ceffb30f7e61a5e",
    quotationId: "FVPL/Q/24-25/015",
    date: "10/04/2025",
    name: "JJJJJ",
    address: "knj,oujoo",
    productList: [
      {
        description: "Desc 1",
        rate: 24,
        quantity: 54,
        unit: "KG",
        Amount: 1296,
        _id: "68039fa40ceffb30f7e61a5f",
      },
    ],
    gstAmount: 233.28,
    netBasicAmount: 1529.28,
    timestamp: "2025-04-19T13:05:40.619Z",
    createdAt: "2025-04-19T13:05:40.626Z",
    updatedAt: "2025-04-19T13:05:40.626Z",
    __v: 0,
  },
  {
    _id: "68039e900ceffb30f7e61a5a",
    quotationId: "FVPL/Q/24-25/014",
    date: "10/04/2025",
    name: "ehk",
    address: "hbnjl",
    productList: [
      {
        description: "hbn",
        rate: 78,
        quantity: 90,
        unit: "KG",
        Amount: 7020,
        _id: "68039e900ceffb30f7e61a5b",
      },
    ],
    gstAmount: 1263.6,
    netBasicAmount: 8283.6,
    timestamp: "2025-04-19T13:01:04.115Z",
    createdAt: "2025-04-19T13:01:04.117Z",
    updatedAt: "2025-04-19T13:01:04.117Z",
    __v: 0,
  },
  {
    _id: "68039e700ceffb30f7e61a56",
    quotationId: "FVPL/Q/24-25/013",
    date: "10/04/2025",
    name: "ehk",
    address: "hbnjl",
    productList: [
      {
        description: "hbn",
        rate: 78,
        quantity: 90,
        unit: "KG",
        Amount: 7020,
        _id: "68039e700ceffb30f7e61a57",
      },
    ],
    gstAmount: 1263.6,
    netBasicAmount: 8283.6,
    timestamp: "2025-04-19T13:00:32.807Z",
    createdAt: "2025-04-19T13:00:32.818Z",
    updatedAt: "2025-04-19T13:00:32.818Z",
    __v: 0,
  },
  {
    _id: "68039c51e275fbcf24d1c6ec",
    quotationId: "FVPL/Q/24-25/012",
    date: "17/04/2025",
    name: "tyr",
    address: "fdgdf",
    productList: [
      {
        description: "fd",
        rate: 4,
        quantity: 76,
        unit: "KG",
        Amount: 304,
        _id: "68039c51e275fbcf24d1c6ed",
      },
    ],
    gstAmount: 54.72,
    netBasicAmount: 358.72,
    timestamp: "2025-04-19T12:51:29.475Z",
    createdAt: "2025-04-19T12:51:29.477Z",
    updatedAt: "2025-04-19T12:51:29.477Z",
    __v: 0,
  },
  {
    _id: "68039befe275fbcf24d1c6e8",
    quotationId: "FVPL/Q/24-25/011",
    date: "09/04/2025",
    name: "JJJJJ",
    address: "fdgdfgdf",
    productList: [
      {
        description: "Desc 1",
        rate: 44,
        quantity: 7,
        unit: "Piece",
        Amount: 308,
        _id: "68039befe275fbcf24d1c6e9",
      },
    ],
    gstAmount: 55.44,
    netBasicAmount: 363.44,
    timestamp: "2025-04-19T12:49:51.187Z",
    createdAt: "2025-04-19T12:49:51.196Z",
    updatedAt: "2025-04-19T12:49:51.196Z",
    __v: 0,
  },
  {
    _id: "68039a8aeb7885cf57ae98d3",
    quotationId: "FVPL/Q/24-25/010",
    date: "09/04/2025",
    name: "JJJ",
    address: "sdfsdfsd",
    productList: [
      {
        description: "Desc 2",
        rate: 65,
        quantity: 22,
        unit: "Piece",
        Amount: 1430,
        _id: "68039a8aeb7885cf57ae98d4",
      },
    ],
    gstAmount: 257.4,
    netBasicAmount: 1687.4,
    timestamp: "2025-04-19T12:43:54.971Z",
    createdAt: "2025-04-19T12:43:54.975Z",
    updatedAt: "2025-04-19T12:43:54.975Z",
    __v: 0,
  },
  {
    _id: "680398a7a3665c0bcf95bc90",
    quotationId: "FVPL/Q/24-25/009",
    date: "16/04/2025",
    name: "John",
    address: "ewrewrwe",
    productList: [
      {
        description: "Desc 2",
        rate: 3,
        quantity: 90,
        unit: "KG",
        Amount: 270,
        _id: "680398a7a3665c0bcf95bc91",
      },
    ],
    gstAmount: 48.6,
    netBasicAmount: 318.6,
    timestamp: "2025-04-19T12:35:51.188Z",
    createdAt: "2025-04-19T12:35:51.190Z",
    updatedAt: "2025-04-19T12:35:51.190Z",
    __v: 0,
  },
  {
    _id: "68039875a3665c0bcf95bc8b",
    quotationId: "FVPL/Q/24-25/008",
    date: "24/04/2025",
    name: "John",
    address: "Sola Scien",
    productList: [
      {
        description: "Desc 1",
        rate: 40,
        quantity: 20,
        unit: "Piece",
        Amount: 800,
        _id: "68039875a3665c0bcf95bc8c",
      },
      {
        description: "Desc 2",
        rate: 99,
        quantity: 88,
        unit: "KG",
        Amount: 8712,
        _id: "68039875a3665c0bcf95bc8d",
      },
    ],
    gstAmount: 1712.1599999999999,
    netBasicAmount: 11224.16,
    timestamp: "2025-04-19T12:35:01.560Z",
    createdAt: "2025-04-19T12:35:01.567Z",
    updatedAt: "2025-04-19T12:35:01.567Z",
    __v: 0,
  },
  {
    _id: "680397bea3665c0bcf95bc86",
    quotationId: "FVPL/Q/24-25/007",
    date: "24/04/2025",
    name: "John",
    address: "Sola Scien",
    productList: [
      {
        description: "Desc 1",
        rate: 40,
        quantity: 20,
        unit: "Piece",
        Amount: 800,
        _id: "680397bea3665c0bcf95bc87",
      },
      {
        description: "Desc 2",
        rate: 99,
        quantity: 88,
        unit: "KG",
        Amount: 8712,
        _id: "680397bea3665c0bcf95bc88",
      },
    ],
    gstAmount: 1712.1599999999999,
    netBasicAmount: 11224.16,
    timestamp: "2025-04-19T12:31:58.866Z",
    createdAt: "2025-04-19T12:31:58.874Z",
    updatedAt: "2025-04-19T12:31:58.874Z",
    __v: 0,
  },
  {
    _id: "68039736a3665c0bcf95bc81",
    quotationId: "FVPL/Q/24-25/006",
    date: "24/04/2025",
    name: "John",
    address: "Sola Scien",
    productList: [
      {
        description: "Desc 1",
        rate: 40,
        quantity: 20,
        unit: "Piece",
        Amount: 800,
        _id: "68039736a3665c0bcf95bc82",
      },
      {
        description: "Desc 2",
        rate: 99,
        quantity: 88,
        unit: "KG",
        Amount: 8712,
        _id: "68039736a3665c0bcf95bc83",
      },
    ],
    gstAmount: 1712.1599999999999,
    netBasicAmount: 11224.16,
    timestamp: "2025-04-19T12:29:42.743Z",
    createdAt: "2025-04-19T12:29:42.750Z",
    updatedAt: "2025-04-19T12:29:42.750Z",
    __v: 0,
  },
  {
    _id: "6803928ba3665c0bcf95bc71",
    quotationId: "FVPL/Q/24-25/005",
    date: "07-02-2025",
    name: "Mr. John Doe",
    address:
      "1001 - 1009 10th floor City Center 2, Near Heer Party Plot, Sukan Mall Cross Road, Science City Rd, Sola, Ahmedabad, Gujarat 380060",
    productList: [
      {
        description: "Product A",
        rate: 100,
        quantity: 2,
        unit: "pcs",
        Amount: 200,
        _id: "6803928ba3665c0bcf95bc72",
      },
      {
        description: "Product B",
        rate: 150,
        quantity: 1,
        unit: "pcs",
        Amount: 150,
        _id: "6803928ba3665c0bcf95bc73",
      },
    ],
    gstAmount: 63,
    netBasicAmount: 413,
    timestamp: "2025-04-19T12:09:47.343Z",
    createdAt: "2025-04-19T12:09:47.362Z",
    updatedAt: "2025-04-19T12:09:47.362Z",
    __v: 0,
  },
  {
    _id: "68038a868b7eb6d080d7031f",
    quotationId: "FVPL/Q/24-25/004",
    date: "07-02-2025",
    name: "Mr. John Doe",
    address:
      "1001 - 1009 10th floor City Center 2, Near Heer Party Plot, Sukan Mall Cross Road, Science City Rd, Sola, Ahmedabad, Gujarat 380060",
    productList: [
      {
        description: "Product A",
        rate: 100,
        quantity: 2,
        unit: "pcs",
        Amount: 200,
        _id: "68038a868b7eb6d080d70320",
      },
      {
        description: "Product B",
        rate: 150,
        quantity: 1,
        unit: "pcs",
        Amount: 150,
        _id: "68038a868b7eb6d080d70321",
      },
    ],
    gstAmount: 63,
    netBasicAmount: 413,
    timestamp: "2025-04-19T11:35:34.028Z",
    createdAt: "2025-04-19T11:35:34.032Z",
    updatedAt: "2025-04-19T11:35:34.032Z",
    __v: 0,
  },
  {
    _id: "68038a818b7eb6d080d7031a",
    quotationId: "FVPL/Q/24-25/003",
    date: "07-02-2025",
    name: "Mr. John Doe",
    address:
      "1001 - 1009 10th floor City Center 2, Near Heer Party Plot, Sukan Mall Cross Road, Science City Rd, Sola, Ahmedabad, Gujarat 380060",
    productList: [
      {
        description: "Product A",
        rate: 100,
        quantity: 2,
        unit: "pcs",
        Amount: 200,
        _id: "68038a818b7eb6d080d7031b",
      },
      {
        description: "Product B",
        rate: 150,
        quantity: 1,
        unit: "pcs",
        Amount: 150,
        _id: "68038a818b7eb6d080d7031c",
      },
    ],
    gstAmount: 63,
    netBasicAmount: 413,
    timestamp: "2025-04-19T11:35:29.502Z",
    createdAt: "2025-04-19T11:35:29.504Z",
    updatedAt: "2025-04-19T11:35:29.504Z",
    __v: 0,
  },
  {
    _id: "68038a808b7eb6d080d70315",
    quotationId: "FVPL/Q/24-25/002",
    date: "07-02-2025",
    name: "Mr. John Doe",
    address:
      "1001 - 1009 10th floor City Center 2, Near Heer Party Plot, Sukan Mall Cross Road, Science City Rd, Sola, Ahmedabad, Gujarat 380060",
    productList: [
      {
        description: "Product A",
        rate: 100,
        quantity: 2,
        unit: "pcs",
        Amount: 200,
        _id: "68038a808b7eb6d080d70316",
      },
      {
        description: "Product B",
        rate: 150,
        quantity: 1,
        unit: "pcs",
        Amount: 150,
        _id: "68038a808b7eb6d080d70317",
      },
    ],
    gstAmount: 63,
    netBasicAmount: 413,
    timestamp: "2025-04-19T11:35:28.135Z",
    createdAt: "2025-04-19T11:35:28.138Z",
    updatedAt: "2025-04-19T11:35:28.138Z",
    __v: 0,
  },
  {
    _id: "68038a678b7eb6d080d70310",
    quotationId: "FVPL/Q/24-25/001",
    date: "07-02-2025",
    name: "Mr. John Doe",
    address:
      "1001 - 1009 10th floor City Center 2, Near Heer Party Plot, Sukan Mall Cross Road, Science City Rd, Sola, Ahmedabad, Gujarat 380060",
    productList: [
      {
        description: "Product A",
        rate: 100,
        quantity: 2,
        unit: "pcs",
        Amount: 200,
        _id: "68038a678b7eb6d080d70311",
      },
      {
        description: "Product B",
        rate: 150,
        quantity: 1,
        unit: "pcs",
        Amount: 150,
        _id: "68038a678b7eb6d080d70312",
      },
    ],
    gstAmount: 63,
    netBasicAmount: 413,
    timestamp: "2025-04-19T11:35:03.090Z",
    createdAt: "2025-04-19T11:35:03.103Z",
    updatedAt: "2025-04-19T11:35:03.103Z",
    __v: 0,
  },
];

export default function QuotationPage() {
  const [loading, setLoading] = useState(false);
  const [quotationList, setQuotationList] = useState<Quotation[]>(qlistData);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Quotation | "">("");
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Quotation | null>(null);

  const filteredData = quotationList
    .filter((item) =>
      [item.quotationId, item.date, item.name]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      if (a[sortColumn] < b[sortColumn]) return asc ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return asc ? 1 : -1;
      return 0;
    });

  const handleSort = (column: keyof Quotation) => {
    if (sortColumn === column) {
      setAsc(!asc);
    } else {
      setSortColumn(column);
      setAsc(true);
    }
  };

  // const fetchQuotationList = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("/api/quotations", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await response.json();
  //     if (result.success && result?.quotations) {
  //       setQuotationList(result.quotations);
  //     }
  //   } catch (error) {
  //     console.log("Error Message", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchQuotationList();
  // }, [fetchQuotationList]);

  return (
    <>
      <HeaderAdmin />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Quotation List
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button onClick={() => {}} className="primary-btn">
            Add Quotation
          </button>
        </div>

        <div
          className="overflow-x-auto bg-white shadow rounded-lg"
          style={{ height: "calc(100vh - 287px)" }}
        >
          <div className="h-full overflow-y-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="sticky top-0 bg-slate-800 text-white z-10">
                <tr className="border-b border-gray-200">
                  {[
                    { key: "quotationId", label: "Quotation ID" },
                    { key: "date", label: "Date" },
                    { key: "name", label: "Name" },
                    { key: "netBasicAmount", label: "Amount" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key as keyof Quotation)}
                      className="px-5 py-3 text-left cursor-pointer"
                    >
                      <span className="inline-block">{col.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="inline-block ml-2 h-4 w-4 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </th>
                  ))}
                  <th className="px-5 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.quotationId}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3">{item.quotationId}</td>
                      <td className="px-5 py-3">{item.date}</td>
                      <td className="px-5 py-3">{item.name}</td>
                      <td className="px-5 py-3">₹ {item.netBasicAmount}</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setSelected(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No quotations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white max-w-5xl w-full max-h-[90vh] rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute right-3 top-4 transition-transform duration-500 hover:rotate-[180deg]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <QuotationFormPage />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <FooterAdmin />
    </>
  );
}
