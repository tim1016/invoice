const formatNumber = require('numeral');

const daysOfWork = (dates) => {
  let dates1 = dates.map(date=>date.split("T")[0]);
  dates1=dates1.sort();
  let dates2 = dates1.map(date=>{
    const temp = date.split("-");
    return `${temp[1]}/${temp[2]}/${temp[0]}`;
  });
  return dates2; 
};

const workDaysString = (dates) =>{
  if(dates.length > 1){
    return `${dates[0]} to ${dates[dates.length-1]}`;
  } else{
    return dates.join('<br>');
  }
}

module.exports = ({ clientName,
  clientAddress,
  clientEmail,
  clientPhone,
  po,
  jobDescription1,
  jobDescription2,
  dayRate,
  quantity,
  selectedDays
  }) => {
  const today = new Date();
  const workDays = daysOfWork(selectedDays);
  const workString = workDaysString(workDays);

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
         padding: 20px; }
       
       .i3 {
         background-color: greenyellow;
         height: 200px; }
       
       .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
         font-size: 10px;
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
       
        span#bold{
          font-weight:bold;
        }
        
        .invoice-box tr.item td:nth-child(4n) {
          width:15%; text-align:right;} 

          .invoice-box tr.item td:nth-child(3n) {
            width:15%; text-align:right;}   

        .invoice-box tr.item td:nth-child(2n) {
          width:15%} 
         
          .invoice-box tr.item td:last-child {
            width:15%}   

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
                        <td class="title"> Youa Awasthi <br> Photography</td>
                        <td>
                          Billing Date: ${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}  
                        </td>
                    </tr>

                    <tr>
                        <td class="information">
                            Bokeh Photography LLC., <br>
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
                        Receipt number: ${workDays[0]} <br> Due date:  30 days from billing
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
                <td></td>
            </tr>


            <tr class="item">
                <td>Dates: ${workString} <br> <span id="bold"> ${jobDescription1} </span>  <br> ${ po === '' ? '': `Purchase Order - ${po}` } </td>
                <td>${formatNumber(dayRate).format('0.00')}</td>
                <td>${formatNumber(workDays.length).format('0')}</td>
                <td>${formatNumber(workDays.length * dayRate).format('0.00')}</td>
            </tr>

            
            <tr class="heading">
                <td colspan="3">Total</td>
                <td>${formatNumber(workDays.length * dayRate).format('0.00')}</td>
            </tr>
        </table>


        </div>
    <script type="text/javascript" src="main.js"></script></body>
</html>    

    `;
};
