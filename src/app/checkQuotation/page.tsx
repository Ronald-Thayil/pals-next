import React from "react";
import { QuotationTemplate } from "../quotation/quotationTemplate";

const Page = () => {
  // Example data
  const props = {
    date: "07-02-2025",
    name: "Mr. John Doe",
    address:
      "1001 - 1009 10th floor City Center 2, Near Heer Party Plot, Sukan Mall Cross Road, Science City Rd, Sola, Ahmedabad, Gujarat 380060",
    productList: [
      {
        description: "Product A",
        rate: 100,
        quantity: 2,
        "unit-0": "pcs",
        Amount: 200,
      },
      {
        description: "Product B",
        rate: 150,
        quantity: 1,
        "unit-1": "pcs",
        Amount: 150,
      },
    ],
    gstAmount: 63, // Example GST amount
    netBasicAmount: 413, // Example total amount
  };

  return <div dangerouslySetInnerHTML={{ __html: QuotationTemplate(props) }} />;
};

export default Page;
