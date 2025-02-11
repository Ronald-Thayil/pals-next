import { logoImg, parseStandardNumber } from "@/helper/common";
export const BillingTemplate = (props) => {
  return `<!DOCTYPE html>
<html>
   <head>
      <title>Invoice</title>
      <style>
          @page {
         size: A4;
         margin: 10mm;
         }
         body {
         font-family: Arial, sans-serif;
         font-size: 12px;
         }
         .header {
         text-align: center;
         margin-bottom: 10px;
         }
         .header h1 {
         margin: 0;
         font-size: 18px;
         }
         .header p {
         margin: 5px 0;
         }
         .header .gst {
         font-weight: 600;
         }
         table {
         width: 100%;
         border-collapse: collapse;
         font-size: 11px;
         }
         th, td {
         border: 1px solid black;
         padding: 6px;
         text-align: left;
         }
         th {
         background-color: #f2f2f2;
         }
         .small-text {
         font-size: 10px;
         }
      </style>
   </head>
   <body>
      <div class="header">
         <div style="text-align: center; padding: 5px 0;">
            <img src=${logoImg} height="80" width="80" style="margin: 0 auto;" />
         </div>
         <h1>Fourpals Ventures Pvt Ltd.</h1>
         <p>
            E-202 VANDE MATRAM ICON, OPP SUKAN RESIDENCY,<br />GOTA, Gandhinagar,
            Ahmedabad- 382481, Gujarat
         </p>
         <p>Email: sales@fourpalsventures.com</p>
         <p class="gst">GSTIN: 24AAFCF7472F1ZM | MO: +91 76238 64429</p>
      </div>
      <table>
         <tr>
            <th width="10%" he>PARTICULAR</th>
            <th width="10%">SUPPLIER</th>
            <th width="20%">BUYER/SOLD TO PARTY</th>
            <th width="20%">SHIP TO PARTY/ADDRESS OF DELIVERY</th>
            <th colspan="2" width="20%">INVOICE NO.</th>
         </tr>
         <tr>
            <td>PAN No.</td>
            <td>AAFCF7472F</td>
            <td>${props.buyerPanNo}</td>
            <td>${props.shipPanNo}</td>
            <td colspan="2">${props.invoiceNo}</td>
         </tr>
         <tr>
            <td>STATE</td>
            <td>Gujarat</td>
            <td>${props.buyerState}</td>
            <td>${props.shipState}</td>
            <td colspan="2">INVOICE DATE</td>
         </tr>
         <tr>
            <td>STATE CODE</td>
            <td>24</td>
            <td>${props.buyerStateCode}</td>
            <td>${props.shipStateCode}</td>
            <td colspan="2">${props.invoiceDate}</td>
         </tr>
         <tr>
            <td colspan="3">NATURE OF DOCUMENT: Bill of Supply as per GST Law.</td>
            <td colspan="3">Whether tax is payable on Reverse Charge basis: NO</td>
         </tr>
         <tr>
            <td colspan="6">SHIPMENT DETAILS:</td>
         </tr>
         <tr>
            <td colspan="2">SOLD TO PARTY / BUYER'S NAME & ADDRESS</td>
            <td colspan="2">SHIP TO PARTY / DELIVERY ADDRESS</td>
            <td colspan="2"></td>
         </tr>
         <tr>
            <td rowspan="4" colspan="2">
               ${props.buyerInfo}
            </td>
            <td rowspan="4" colspan="2">
               ${props.shipInfo}
            </td>
            <td rowspan="2" colspan="2"></td>
         </tr>
         <tr></tr>
         <tr></tr>
         <tr></tr>
         <tr></tr>
         <tr>
            <th>Components</th>
            <th>Quantity</th>
            <th>HSN CODE</th>
            <th>Rate</th>
            <th>Unit</th>
            <th>Amount(INR)</th>
         </tr>
         ${props.productList
           .map((product, key) => {
             return `
         <tr>
            <td class="text-left">${product.description}</td>
            <td>${product.quantity}</td>
            <td>${product.hnsCode}</td>
            <td>${product.rate}</td>
            <td>${product[`unit-${key}`]}</td>
            <td class="text-right">₹${parseStandardNumber(product.Amount)}
            </td>
         </tr>
         `;
           })
           .join("")}
        
         <tr>
            <td colspan="2" rowspan="7">
               Bank Details: Banificiry Name: Fourpals Ventures Private Limited Bank
               Name: Kotak Mahindra Bank Limited Account No: 1947673609 IFSC:
               KKBK0002609 Branch: Gota, Ahmedabad
            </td>
            <td colspan="3">TAXABLE AMOUNT</td>
            <td class="text-right">₹${parseStandardNumber(
              props.totalAmount
            )}</td>
         </tr>
         <tr>
            <td colspan="4"></td>
         </tr>
         <tr>
            <td>GST</td>
            <td>18</td>
            <td>%</td>
            <td class="text-right">₹${parseStandardNumber(props.gstAmount)}</td>
         </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
         </tr>
         <tr>
            <td colspan="3">TOTAL INVOICE VALUE</td>
            <td class="text-right">₹${parseStandardNumber(props.netBasicAmount)}
            </td>
         </tr>
         <tr>
            <td colspan="3">GRAND TOTAL</td>
            <td class="text-right">₹${parseStandardNumber(props.netBasicAmount)}
            </td>
         </tr>
         <tr>
            <td colspan="4">GRAND TOTAL (Rounded Off) Rs. ${parseStandardNumber(
              props.roundNetBasicAmount
            )}
            </td>
         </tr>
         <tr>
            <td colspan="3"  width="150" height="50">
               Grand Total (In Words) : ${props.amountToWords}
            </td>
            <td colspan="3">FOR FOURPALS VENTURES PRIVATE LIMITED</td>
         </tr>
         <tr>
            <td colspan="3" rowspan="2" >
               DECLARATION: CERTIFIED THAT THE PARTICULARS GIVEN ABOVE ARE TRUE &
               CORRECT AND THE AMOUNT INDICATED REPRESENTS THE PRICE ACTUALLY CHARGED
               AND THAT THERE IS NO FLOW OF ADDITIONAL CONSIDERATION DIRECTLY OR
               INDIRECTLY FROM THE BUYER.
            </td>
            <td colspan="3" rowspan="4">sign</td>
         </tr>
         <tr></tr>
         <tr>
            <td>PLACE : Ahmedabad</td>
            <td>E-Mail ID</td>
            <td>sdfsdfs@gmail.com</td>
         </tr>
         <tr>
            <td>DATE : ${props.invoiceDate}</td>
            <td></td>
            <td></td>
         </tr>
         <tr>
            <td colspan="3">
               REGD. OFFICE: E-202, VANDE MATRAM ICON, OPP SUKAN RESIDENCY, GOTA,
               Gota, Gandhinagar, Ahmedabad- 382481, Gujarat
            </td>
            <td colspan="3"></td>
         </tr>
      </table>
   </body>
</html>
`;
};
