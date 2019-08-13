const formatNumber = require('numeral');

module.exports = ({ clientName,
   clientAddress,
   clientEmail,
   clientPhone,
   po,
   jobDescription1,
   jobDescription2,
   dayRate,
   quantity,
   }) => {
   const today = new Date();
  //  const dueDate = today.setMonth(today.getMonth()+1);

   console.log(clientName);

return `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        * {
         margin: 0;
         padding: 0;
         box-sizing: border-box; }
       
       .container {
         max-width: 1200px;
         background-color: #ccc;
         display: flex;
         justify-content: space-around;
         align-items: baseline; }
       
       .item {
         padding: 40px; }
       
       .i3 {
         background-color: greenyellow;
         height: 200px; }
       
       .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
         font-size: 12px;
         line-height: 18px;
         font-family: 'Helvetica', 'Open Sans';
         color: #555; }
       
       .margin-top {
         margin-top: 50px; }
       
       .justify-center {
         text-align: center; }
       
       .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left; }
         .invoice-box table td {
           padding: 5px;
           vertical-align: top; }
       
       .invoice-box tr td:first-child {
         width: 50%; }
       
       .invoice-box tr td:last-child {
         text-align: right; }
       
       .invoice-box tr.top table td {
         padding-bottom: 20px; }
         .invoice-box tr.top table td.title {
           font-size: 45px;
           line-height: 45px;
           color: #333; }
       
       .invoice-box tr.information table td {
         padding-bottom: 40px; }
       
       .invoice-box tr table td.addressee {
        background-color: #eee;
         padding-bottom: 40px;
         text-align: left; }
         .invoice-box tr table td.addressee span {
           font-weight: bold;
}
       
       .invoice-box tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold; }
       
       .invoice-box tr.details td {
         padding-bottom: 20px; }
       
       .invoice-box tr.item td {
         border-bottom: 1px solid #eee; }
      
         .invoice-box tr.item-description td {
          font-size:90%;
        font-style: italic;
        text-align:left;
        padding: -5px;
       }

       .invoice-box tr.item.last td {
         border-bottom: none; }
       
       .invoice-box tr.total td:last-child {
         border-top: 2px solid #eee;
         font-weight: bold; }
       
       @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
           width: 100%;
           display: block;
           text-align: center; }
         .invoice-box table tr.information table td {
           width: 100%;
           display: block;
           text-align: center; } }
       
       
        </style>
    </head>
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                    <tr>
                        <td class="title"><img  src="data:image/jpeg;base64,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"
                            style="width:100%; max-width:156px;"></td>
                        <td>
                           Date: ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}  
                        </td>
                    </tr>

                    <tr>
                        <td class="information">
                            BokehTum Photography LLC., <br>
                            7402 Timberlake Trail, <br>
                            Apt 402 <br>
                            Madison WI 53719
                        </td>
                        <td class="addressee">
                        <span>Addressee</span> <br>
                        ${clientName} <br> 
                        ${clientAddress}<br>
                        ${clientEmail}<br>
                        ${clientPhone}
                        </td>
                    </tr>
                    </table>
                </td>
            </tr>
            <tr class="information">
                <td colspan="2">
                    <table>
                    <tr>
                        <td>
                        Receipt number: ${today.getTime()} <br> Due date:  30 days from billing
                        </td>
                        
                    </tr>
                    </table>
                </td>
            </tr>
        </table>



        <table>
            <tr class="heading">
                <td>Description</td>
                <td>Rate</td>
                <td>Quantity</td>
                <td>Price</td>
            </tr>


            <tr class="item">
                <td>${jobDescription1}</td>
                <td>${formatNumber(dayRate).format('0.00')}</td>
                <td>${formatNumber(quantity).format('0')}</td>
                <td>${formatNumber(quantity * dayRate).format('0.00')}</td>
            </tr>

            <tr class="item-description">
               <td colspan="4">${jobDescription2}</td>
           </tr>

           <tr class="item-description">
               <td colspan="4">Purchase Order - ${po}</td>
           </tr>

            <tr class="heading">
                <td colspan="3">Total</td>
                <td>${formatNumber(quantity * dayRate).format('0.00')}</td>
            </tr>
        </table>


        </div>
    <script type="text/javascript" src="main.js"></script></body>
</html>    

    `;
};
