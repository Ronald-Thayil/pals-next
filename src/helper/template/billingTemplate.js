import { logoImg, parseStandardNumber } from "@/helper/common";
export const BillingTemplate = (props) => {
  return `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style type="text/css">
         .ritz .waffle a {
         color: inherit;
         }
         .ritz .waffle .s42 {
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s31 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: right;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s8 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s26 {
         background-color: #efefef;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s19 {
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s11 {
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 10pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s15 {
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s30 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: right;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s3 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s10 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s0 {
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 28pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         width: 135px;
         }
         .ritz .waffle .s34 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 10pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s5 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: middle;
         direction: ltr;
         }
         .ritz .waffle .s23 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s37 {
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 12pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s38 {
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s20 {
         background-color: #ffffff;
         text-align: center;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s14 {
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 7pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s13 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 7pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s28 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s22 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s25 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s17 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 10pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s27 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s32 {
         background-color: #efefef;
         text-align: right;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s36 {
         background-color: #ffffff;
         text-align: right;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 10pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s9 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s16 {
         background-color: #ffffff;
         text-align: center;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 10pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s41 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s4 {
         background-color: #333333;
         text-align: center;
         font-weight: bold;
         color: #ffffff;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s7 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: center;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s24 {
         background-color: #efefef;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s29 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: bottom;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s35 {
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 10pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s12 {
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 10pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s40 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         text-decoration: underline;
         text-decoration-skip-ink: none;
         -webkit-text-decoration-skip: none;
         color: #0000ff;
         font-family: "Times New Roman";
         font-size: 10pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s21 {
         border-right: 1px SOLID #000000;
         background-color: #efefef;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s1 {
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: "Times New Roman";
         font-size: 28pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s6 {
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s33 {
         background-color: #ffffff;
         text-align: right;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         direction: ltr;
         }
         .ritz .waffle .s2 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: center;
         font-weight: bold;
         color: #000000;
         font-family: Arial;
         font-size: 8pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s39 {
         border-right: 1px SOLID #000000;
         background-color: #ffffff;
         text-align: left;
         color: #000000;
         font-family: Arial;
         font-size: 7pt;
         vertical-align: top;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .ritz .waffle .s18 {
         background-color: #ffffff;
         text-align: center;
         color: #000000;
         font-family: Arial;
         font-size: 10pt;
         vertical-align: middle;
         white-space: normal;
         overflow: hidden;
         word-wrap: break-word;
         direction: ltr;
         }
         .waffle {
         margin: 0 auto;
         border: 1px solid #000;
         width: 988px;
         font-size: 13px;
         table-layout: fixed;
         border-collapse: collapse;
         border-spacing: 0;
         }
         .waffle td {
         vertical-align: middle !important;
         padding: 3px !important;
         border: 1px solid #000;
         }
         @page {
         /* size: 7in 9.25in; */
         margin: 0.75in 0.25in;
         }
         body {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
         }
      </style>
   </head>
   <body>
      <div class="ritz grid-container" dir="ltr">
         <table class="waffle" cellspacing="0" cellpadding="0">
            <tbody>
               <tr>
                  <td class="s0" rowspan="5">
                     <div
                        style="
                        width: 90px;
                        height: 90px;
                        display: block;
                        margin: 0 auto;
                        "
                        >
                        <img
                           src="${logoImg}"
                           style="display: block"
                           height="90"
                           width="90"
                           />
                     </div>
                  </td>
                  <td class="s1" colspan="15">
                     <div style="font-size: 28pt; color: #000000">
                        FOURPALS VENTURES PRIVATE LIMITED
                     </div>
                     <div style="font-size: 11pt; color: #000000">
                        ADDRESS:- E-202, VANDE MATRAM ICON, OPP SUKAN RESIDENCY, GOTA,
                        Gota, Gandhinagar, Ahmedabad- 382481, Gujarat GSTIN:
                        24AAFCF7472F1ZM MO: +91 76238 64429
                     </div>
                  </td>
               </tr>
               <tr></tr>
               <tr></tr>
               <tr></tr>
               <tr></tr>
               <tr>
                  <td class="s2">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >PARTICULAR</span
                        >
                  </td>
                  <td class="s3" colspan="3">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >SUPPLIER</span
                        >
                  </td>
                  <td class="s3" colspan="3">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >BUYER/SOLD TO PARTY</span
                        >
                  </td>
                  <td class="s3" colspan="6">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >SHIP TO PARTY/ADDRESS OF DELIVERY</span
                        >
                  </td>
                  <td class="s4" colspan="3">INVOICE NO.</td>
               </tr>
               <tr>
                  <td class="s2">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >PAN No.</span
                        >
                  </td>
                  <td class="s5" colspan="3">AAFCF7472F</td>
                  <td class="s5" dir="ltr" colspan="3">${props.buyerPanNo}</td>
                  <td class="s5" colspan="6">${props.shipPanNo}</td>
                  <td class="s6" dir="ltr" colspan="3">${props.invoiceId}</td>
               </tr>
               <tr>
                  <td class="s7">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >STATE</span
                        >
                  </td>
                  <td class="s8" colspan="3">Gujarat</td>
                  <td class="s8" dir="ltr" colspan="3">${props.buyerState}</td>
                  <td class="s8" colspan="6">${props.shipState}</td>
                  <td class="s4" colspan="3">INVOICE DATE</td>
               </tr>
               <tr>
                  <td class="s2">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >STATE CODE</span
                        >
                  </td>
                  <td class="s9" colspan="3">24</td>
                  <td class="s9" dir="ltr" colspan="3">${
                    props.buyerStateCode
                  }</td>
                  <td class="s9" colspan="6">${props.shipStateCode}</td>
                  <td class="s6" dir="ltr" colspan="3">${props.invoiceDate}</td>
               </tr>
               <tr style="height: 20px">
                  <td class="s2"></td>
                  <td class="s10" colspan="3"></td>
                  <td class="s10" colspan="3"></td>
                  <td class="s10" colspan="6"></td>
                  <td class="s11"></td>
               </tr>
               <tr>
                  <td class="s13" colspan="6">
                     <span
                        style="
                        font-size: 7pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >NATURE OF DOCUMENT: Bill of Supply as per GST Law.</span
                        >
                  </td>
                  <td class="s14" colspan="10">
                     <span
                        style="
                        font-size: 7pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >Whether tax is payable on Reverse Charge basis: NO</span
                        >
                  </td>
               </tr>
               <tr>
                  <td class="s15" colspan="16">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >SHIPMENT DETAILS:</span
                        >
                  </td>
               </tr>
               <tr>
                  <td class="s3" colspan="4">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >SOLD TO PARTY / BUYER&#39;S NAME &amp; ADDRESS</span
                        >
                  </td>
                  <td class="s3" colspan="5">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >SHIP TO PARTY / DELIVERY ADDRESS</span
                        >
                  </td>
                  <td class="s16" colspan="7"></td>
               </tr>
               <tr>
                  <td class="s17" dir="ltr" colspan="4" rowspan="3">
                     ${props.buyerInfo}
                  </td>
                  <td class="s17" colspan="5" rowspan="3">${props.shipInfo}</td>
                  <td class="s18" colspan="7"></td>
               </tr>
               <tr>
                  <td class="s15" colspan="7"></td>
               </tr>
               <tr>
                  <td class="s19" colspan="7"></td>
               </tr>
               <tr>
                  <td class="s2" colspan="3">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >Components</span
                        >
                  </td>
                  <td class="s2" dir="ltr" colspan="2">Quantity</td>
                  <td class="s2" colspan="3">HSN CODE</td>
                  <td class="s2" colspan="3">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >Rate</span
                        >
                  </td>
                  <td class="s2" colspan="2">Unit</td>
                  <td class="s20" colspan="3">
                     <span
                        style="
                        font-size: 8pt;
                        font-family: Arial;
                        font-weight: bold;
                        color: #000000;
                        "
                        >Amount(INR)</span
                        >
                  </td>
               </tr>
               ${props.productList
                 .map((product) => {
                   return `
               <tr>
                  <td class="s21" dir="ltr" colspan="3">${
                    product.description
                  }</td>
                  <td class="s22" dir="ltr" colspan="2">${product.quantity}</td>
                  <td class="s23" dir="ltr" colspan="3">${product.hsnCode}</td>
                  <td class="s22" dir="ltr" colspan="3">${product.rate}</td>
                  <td class="s23" colspan="2">${product.unit}</td>
                  <td class="s24" colspan="3">
                     ₹${parseStandardNumber(product.Amount)}
                  </td>
               </tr>
               `;
                 })
                 .join("")}
               <tr style="height: 20px">
                  <td class="s21" dir="ltr" colspan="3"></td>
                  <td class="s22" dir="ltr" colspan="2"></td>
                  <td class="s23" dir="ltr" colspan="3"></td>
                  <td class="s22" dir="ltr" colspan="3"></td>
                  <td class="s23" colspan="2"></td>
                  <td class="s24" colspan="3"></td>
               </tr>
               <tr>
                  <td class="s29" colspan="5" rowspan="7">
                     Bank Details: <br />Banificiry Name: Fourpals Ventures Private
                     Limited<br />Bank Name: Kotak Mahindra Bank Limited<br />Account
                     No: 1947673609<br />IFSC: KKBK0002609<br />Branch: Gota,
                     Ahmedabad<br />
                  </td>
                  <td class="s30" colspan="8">TAXABLE AMOUNT</td>
                  <td class="s15" colspan="3" style="text-align: right">
                     ₹${parseStandardNumber(props.totalAmount)}
                  </td>
               </tr>
               <tr style="height: 20px">
                  <td class="s15" colspan="11"></td>
               </tr>
               <tr>
                  <td class="s21" dir="ltr" colspan="4">GST</td>
                  <td class="s31" dir="ltr" colspan="2">18</td>
                  <td class="s23" colspan="2">
                     <span style="font-size: 8pt; font-family: Arial; color: #000000"
                        >%</span
                        >
                  </td>
                  <td class="s32" colspan="3" style="text-align: right">
                     ₹${parseStandardNumber(props.gstAmount)}
                  </td>
               </tr>
               <tr style="height: 20px">
                  <td class="s21" colspan="4"></td>
                  <td class="s31" colspan="2"></td>
                  <td class="s23" colspan="2"></td>
                  <td class="s32" colspan="3"></td>
               </tr>
               <tr>
                  <td class="s3" colspan="8">TOTAL INVOICE VALUE</td>
                  <td class="s33" colspan="3" style="text-align: right">
                     ₹${parseStandardNumber(props.netBasicAmount)}
                  </td>
               </tr>
               <tr>
                  <td class="s34" colspan="6">GRAND TOTAL</td>
                  <td class="s34" colspan="2"></td>
                  <td class="s35" colspan="3" style="text-align: right">
                     ₹${parseStandardNumber(props.netBasicAmount)}
                  </td>
               </tr>
               <tr>
                  <td class="s36" dir="ltr" colspan="8">
                     GRAND TOTAL (Rounded Off) Rs.
                  </td>
                  <td class="s37" colspan="3" style="text-align: right">
                     ${parseStandardNumber(props.roundNetBasicAmount)}
                  </td>
               </tr>
               <tr>
                  <td class="s38">Grand Total (In Words) :</td>
                  <td class="s27" dir="ltr" colspan="11">${
                    props.amountToWords
                  }</td>
                  <td class="s20" colspan="4">
                     FOR FOURPALS VENTURES PRIVATE LIMITED
                  </td>
               </tr>
               <tr>
                  <td class="s39" colspan="12">
                     <span style="font-size: 7pt; font-family: Arial; color: #000000"
                        >DECLARATION: CERTIFIED THAT THE PARTICULARS GIVEN ABOVE ARE
                     TRUE &amp; CORRECT AND THE AMOUNT INDICATED REPRESENTS THE PRICE
                     ACTUALLY CHARGED AND THAT THERE IS NO FLOW OF ADDITIONAL
                     CONSIDERATION DIRECTLY OR INDIRECTLY FROM THE BUYER.</span
                        >
                  </td>
                  <td class="s12" colspan="4" rowspan="3">
                     <div
                        style="
                        width: 144px;
                        height: 53px;
                        display: block;
                        margin: 0 auto;
                        "
                        >
                        <img
                           src="https://lh7-rt.googleusercontent.com/sheetsz/AHOq17FyChsSyS1WnExgYSoaa6C0uxJk7Swy4OhZB8PB-cTpw55yE8b0I0DEsJBa4I5Zlh83Ry1YC1osGMnlfF4IP20XkNq90y-a_h8vNzpV0dAmxh5ratV5jK4hE2NdudpGKEosOmP7ew?key=GC1-3Htgtqb8vzw_48U5UA"
                           style="display: block"
                           height="53"
                           width="144"
                           />
                     </div>
                  </td>
               </tr>
               <tr>
                  <td class="s27" colspan="2">PLACE : Ahmedabad</td>
                  <td class="s27" colspan="3">
                     <span style="font-size: 8pt; font-family: Arial; color: #000000"
                        >E-Mail ID</span
                        >
                  </td>
                  <td class="s40" colspan="7">
                     <a target="_blank" href="mailto:Sales@fourpalsventures.com"
                        >Sales@fourpalsventures.com</a
                        >
                  </td>
               </tr>
               <tr>
                  <td class="s27" dir="ltr" colspan="2">
                     DATE : ${props.invoiceDate}
                  </td>
                  <td class="s27" colspan="3"></td>
                  <td class="s27" colspan="7"></td>
               </tr>
               <tr>
                  <td class="s41" colspan="12">
                     REGD. OFFICE: E-202, VANDE MATRAM ICON, OPP SUKAN RESIDENCY, GOTA,
                     Gota, Gandhinagar, Ahmedabad- 382481, Gujarat
                  </td>
                  <td class="s42" colspan="4"></td>
               </tr>
            </tbody>
         </table>
      </div>
   </body>
</html>
`;
};
