import { logoImg, parseStandardNumber } from "../../helper/common";
export const QuotationTemplate = (props) => {
  return `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
         .header {
         text-align: center;
         margin-bottom: 20px;
         }
         .header h1 {
         margin: 0;
         font-size: 24px;
         }
         .header p {
         margin: 5px 0;
         }
         .header .gst {
         font-weight: 600;
         }
         .quotation {
         text-align: center;
         font-size: 18px;
         font-weight: 600;
         margin: 20px 0;
         padding: 5px 0;
         border-top: 1px solid #ccc;
         border-bottom: 1px solid #ccc;
         }
         table {
         width: 100%;
         border-collapse: collapse;
         margin-bottom: 0;
         font-size: 14px;
         }
         table th,
         table td {
         border: 1px solid #ccc;
         padding: 8px;
         text-align: center;
         }
         table th {
         background-color: #f2f2f2;
         }
         .note {
         font-size: 12px;
         text-align: center;
         margin-top: 20px;
         }
         .details {
         width: 350px;
         display: inline-block;
         font-size: 14px;
         }
         .details .to {
         margin-top: 10px;
         max-width: 400px;
         }
         .bank-details {
         display: inline-block;
         width: 400px;
         margin-top: 30px;
         font-size: 14px;
         text-align: left;
         }
         .bank-details h3 {
         text-align: center;
         border-bottom: 1px solid #ccc;
         background-color: #f5f5f5;
         font-size: 16px;
         padding: 5px 0;
         }
         .text-right {
         text-align: right;
         }
         .text-left {
         text-align: left;
         }
      </style>
   </head>
   <div class="main-board">
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
         <p class="gst">GSTIN: 24AAFCF7472F1ZM</p>
      </div>
      <div class="quotation">QUOTATION ORDER</div>
      <div style="display: flex; justify-content: space-between;">
         <p><strong>QO No.:</strong> ${props.qoNo}</p>
         <p><strong>Date:</strong> ${props.date}</p>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
         <div class="details">
            <div class="to">
               <strong>To:</strong><br />
               ${props.name}<br />
               ${props.companyName ? `${props.companyName}<br/>` : ""}
               ${props.address}
            </div>
         </div>
         <div class="bank-details">
            <div>
               <p><strong>Beneficiary Name:</strong> Fourpals Ventures Private Limited</p>
               <p><strong>Bank Name:</strong> Kotak Mahindra Bank Limited</p>
               <p><strong>Account No.:</strong> 1947673609</p>
               <p><strong>IFSC:</strong> KKBK0002609</p>
               <p><strong>Branch Name:</strong> Gota, Ahmedabad</p>
            </div>
         </div>
      </div>
      <table>
         <thead>
            <tr>
               <th class="text-left">Sr. No.</th>
               <th class="text-left">Description</th>
               <th>Rate</th>
               <th>Qty</th>
               <th>Unit</th>
               <th class="text-right">Total Amount (INR)</th>
            </tr>
         </thead>
         <tbody>
            ${props.productList
              .map((product, key) => {
                return `
            <tr>
               <td class="text-left">${key + 1}</td>
               <td class="text-left">${product.description}</td>
               <td>${product.rate}</td>
               <td>${product.quantity}</td>
               <td>${product[`unit-${key}`]}</td>
               <td class="text-right">₹${parseStandardNumber(
                 product.Amount
               )}</td>
            </tr>
            `;
              })
              .join("")}
            <tr>
               <td colspan="5" style="text-align: right">GST 18%</td>
               <td class="text-right">₹${parseStandardNumber(
                 props.gstAmount
               )}</td>
            </tr>
            <!--<tr>
               <td colspan="5" style="text-align: right">Total</td>
               <td>₹${parseStandardNumber(props.netBasicAmount)}</td>
               </tr> -->
            <tr>
               <td colspan="5" style="text-align: right; font-weight: 600">
                  Net Basic Amount in INR
               </td>
               <td class="text-right" style="font-weight: 600;">₹${parseStandardNumber(
                 props.netBasicAmount
               )}
               </td>
            </tr>
         </tbody>
      </table>
      <div class="footer">
         <p style="font-size: 12px;">
            *Transportation charges will be applicable as per actuals and added to
            the final invoice.
         </p>
      </div>
      <div class="note">
         [This being a computer-generated document, it does not require any
         signature]
      </div>
   </div>
</html>
`;
};
