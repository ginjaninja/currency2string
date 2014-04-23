/**
currency2string
author: Shannon McAvoy (Raymond)
currency2string allows you to convert a numerical value into a currency string. See qunit tests for examples.
Use num2String.valid to check the validity of the input.
**/
function num2String(input){
  //setup functions
  number = input;
  valid = validInput(number);
  numArr = splitCents(number);
  dollars = numArr[0];
  cents = numArr[1];
  
  //externally accessible functions/members
  this.dollars = dollars;
  this.cents = cents;
  this.fCents = fCents;
  this.output = output;
  this.valid = valid;
  
  function splitCents(number){
    return number.toString().replace(/,/g, "").split(".");
  }
  function fCents(){
    if(cents){
      return cents.toString() +"/" + 100;
    }
    return "";
  }
  
	function validInput(input){
		input = input.replace(/,/g, "");
        if(input.toString().length <= 15 && input.match(/^\d{1,15}(\.\d{2}){0,1}$/gm)){
          return true;
        }else{
          return false;
        }
    }
	  
  function transNum(){
    var str = "";
    
    //start with the end of the number
    var dArr = dollars.split("").reverse();
    
    //i is the position of the current digit rtl
    for(var i=0; i<dArr.length; i++){
      if(i === 0 || i%3 === 0){
        //this is ones
        var o = oNum[parseInt(dArr[i], 0)];
        //is this is an order of magnitude?
        if(i/3 > 0 && o != ""){
          o = o + " " + mNum[i/3];
        }
        //remove spaces
        if(o != ""){
          str = o + " " + str;
        }
      }else if((i-1) === 0 || (i-1)%3 === 0){
        //this is tens
        var t = tNum[dArr[i]];
        if(t.position == "suffix"){
          var prevNum = str.split(" ");
          //is this number special?
          var v = dArr[i] + dArr[i-1];

          if(ooNum[v]){
            str = ooNum[v];
          }else{
            str = prevNum[0] + t.label;
          }
          //rebuild rest of string
          for(var j=1; j<prevNum.length;j++){
            str += " " + prevNum[j];
          }
        }else{
          if(t.label != ""){
            if(str != ""){
              str = t.label + "-" + str;
            }else{
              str = t.label;
            }
          }
        }
      }else{
        //this is hundreds
        var n = oNum[parseInt(dArr[i], 0)];
        if(n){
          if(str !== ""){
            str = n + " " + hNum + " " + str;
          }else{
            str = n + " " + hNum;
          }
        }
      }
    }
    return str;
  }
  
  /** Object that stores position of label and label when converting **/
  function tTrans(position, label){
    this.position = position;
    this.label = label;
  }

  /** Outputs final string **/
  function output(){
    if(fCents()){
      return transNum() + "and " + fCents() + " " + currency;  
    }else{
      return transNum() + " " + currency;
    }
  }

  //localization
  currency = "dollars";

  //one's
  oNum = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  //special numbers where the one's and ten's needs to be replaced with a word
  ooNum = {
    "10" : "ten", 
    "11" : "eleven", 
    "12" : "twelve", 
    "13" : "thirteen",
    "15" : "fifteen"
  };

  //ten's labels and their position with the one's label
  tNum = {
    "0" : new tTrans("", ""),
    "1" : new tTrans("suffix", "teen"),
    "2" : new tTrans("prefix", "twenty"),
    "3" : new tTrans("prefix", "thirty"),
    "4" : new tTrans("prefix", "forty"),
    "5" : new tTrans("prefix", "fifty"),
    "6" : new tTrans("prefix", "sixty"),
    "7" : new tTrans("prefix", "seventy"),
    "8" : new tTrans("prefix", "eighty"),
    "9" : new tTrans("prefix", "ninety")
  };

  //hundred's label
  hNum = "hundred";

  //orders of magnitude labels 
  mNum = {
    "1" : "thousand",
    "2" : "million",
    "3" : "billion",
    "4" : "trillion"
  };
}

