import { logoImg, parseStandardNumber } from "../../helper/common";
export const QuotationTemplate = (props) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quotation Order</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        line-height: 1.5;
      }
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
        font-weight: bold;
      }
      .quotation {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0;
        text-decoration: underline;
      }
      .details {
        margin-bottom: 20px;
      }
      .details .to {
        margin-bottom: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      table th,
      table td {
        border: 1px solid #000;
        padding: 8px;
        text-align: center;
      }
      table th {
        background-color: #f2f2f2;
      }
      .footer {
        font-size: 14px;
      }
      .note {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src=${logoImg} height="40" width="40"/>
      <h1>Fourpals Ventures Pvt Ltd.</h1>
      <p>
        E-202 VANDE MATRAM ICON, OPP SUKAN RESIDENCY,<br />GOTA, Gandhinagar,
        Ahmedabad- 382481, Gujarat
       
      </p>
      <p>Email: sales@fourpalsventures.com</p>
      <p class="gst">GSTIN: 24AAFCF7472F1ZM</p>
    </div>

    <div class="quotation">QUOTATION ORDER</div>

    <div class="details">
      <p><strong>QO No.:</strong> FVPL/SOFT/0302/2025</p>
      <p><strong>Date:</strong> ${props.date}</p>
      <div class="to">
        <strong>To:</strong><br />
${props.name}<br />
${props.address}
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Description</th>
          <th>Rate</th>
          <th>Qty</th>
          <th>Unit</th>
          <th>Total Amount (INR)</th>
        </tr>
      </thead>
      <tbody>
      ${props.productList.map((product, key) => {
        return `
        <tr>
          <td>${key + 1}</td>
          <td>${product.description}</td>
          <td>${product.rate}</td>
          <td>${product.quantity}</td>
          <td>${product[`unit-${key}`]}</td>
          <td>₹${parseStandardNumber(product.Amount)}</td>
        </tr>
        `;
      })}
      <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
        </tr>
        <tr>
          <td colspan="5" style="text-align: right">GST 18%</td>
          <td>₹${parseStandardNumber(props.gstAmount)}</td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: right">Total</td>
          <td>₹${parseStandardNumber(props.netBasicAmount)}</td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: right; font-weight: bold">
            Net Basic Amount in INR
          </td>
          <td>₹${parseStandardNumber(props.netBasicAmount)}</td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <p>
        *Transportation charges will be applicable as per actuals and added to
        the final invoice.
      </p>
    </div>

    <div class="note">
      [This being a computer-generated document, it does not require any
      signature]
    </div>
  </body>
</html>
`;
};
