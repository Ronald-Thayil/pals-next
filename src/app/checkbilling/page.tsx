import React from "react";
import { BillingTemplate } from "../billing/billingTemplate";
const Page = () => {
  // Example data
  const props = {
    invoiceNo: "FVPL/24-25/002",
    invoiceDate: "14/02/2025",
    buyerInfo:
      "Sree Padma Aqua Flora \nAyakat Manakkapady, \nAshokapuram, \nAluva Kerala 683101",
    shipInfo:
      "Sree Padma Aqua \nFlora Ayakat \nManakkapady, Ashokapuram, \nAluva Kerala 683101",
    buyerPanNo: "IHERUI244",
    buyerState: "GOA",
    buyerStateCode: "74",
    shipPanNo: "NJSD234",
    shipState: "Kerala",
    shipStateCode: "36",
    productList: [
      {
        description: "Cap 63 mm",
        hnsCode: "85692",
        rate: "14.36",
        quantity: "1500",
        "unit-0": "Piece",
        Amount: 21540,
      },
      {
        description: "Cap 69 mm",
        hnsCode: "8452UBJ",
        rate: "85",
        quantity: "2684",
        "unit-1": "KG",
        Amount: 228140,
      },
    ],
    totalAmount: 249680,
    gstAmount: 44942.4,
    netBasicAmount: 294622.4,
    roundNetBasicAmount: 294622,
    amountToWords:
      "Two Hundred Ninety Four Thousand Six Hundred Twenty Two only",
  };

  return <div dangerouslySetInnerHTML={{ __html: BillingTemplate(props) }} />;
};

export default Page;
