(function(){

  'use strict';

  $(document).ready(initialize);
  //Opening balance
  var balance = 1000;

  function initialize(){
    $('#deposit').click(deposit);
    $('#withdraw').click(withdraw);
  }
  //Add a row to ledger
  function addRow(fee, dep, withd){
    var $tr = $('<tr>');
    var data = [fee, dep, withd, balance];
    var className = ['fee',
                      'deposit',
                      'withdraw',
                      'balance'];
    //Append values in array to table
    for(var i = 0; i < 4; ++i){
      var $td = $('<td>');
      $td.addClass(className[i]);
      $td.text('$' + numToFinancial(data[i]));
      $tr.append($td);
    }
    $('#ledgerBody').append($tr);
    updateBalance();
    roundTo2Dec();
  }
  //Deposit
  function deposit(){
    var amount = getAmountandSetBlank();

    if(amount > 0){
    balance += amount;
    addRow(0, amount, 0);
    }
  }
  //Withdraw
  function withdraw(){
    var amount = getAmountandSetBlank();
    if(amount > 0){
      balance -= amount;
      addRow(0, 0, amount);
      //add $50 NSF Fee
      if(balance < 0){
        var fee = 50;
        balance -= fee;
        addRow(fee, 0, 0);
      }
    }
  }
  //Get amount from input field and reset
  function getAmountandSetBlank(){
    var amount = Math.round($('#amount').val() * 100)/100;
    $('#amount').val('');
    return amount;
  }
  //Update balance
  function updateBalance(){
    $('#balance').text('$' + balance);
  }
  //Specify change if not entered
  function numToFinancial(num){
    num = roundTo2Dec(num);
    var numStr = Math.abs(num).toString();
    var decimalIndex = numStr.indexOf('.');
    if(numStr.indexOf('.') === -1){
      numStr += '.00';
    } else if((numStr.length - 1) -decimalIndex === 1){
      numStr += '0';

    }
    //Add parenthesis for negative balance
    if(num < 0){
      numStr = '(' + numStr + ')';
    }
    return numStr;
  }
  //Round to the nearest 2 decimal places
  function roundTo2Dec(num){
    return Math.round(num * 100)/ 100;
  }

})();
