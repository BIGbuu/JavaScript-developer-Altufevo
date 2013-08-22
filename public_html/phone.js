var Phone = NewClass( {
    "mask" :'+7 (XXX) XXX-XX-XX',   /*'+8 XXX XXX XXXX'*/
    "maskChar":'X',
    "phone":"", /*var phone="9688917764";*/
    "phoneMasked":"",
    "code":"",
    "phoneNumberCount":10,
    "phoneCodeNumberCount":3,
    "operators":{"916":"МТС", "903":"Билайн", "926":"Мегафон"},
    "operator":"",
    "inputNode":"",
    "operatorNode":"",
    "okNode":""
    
}, function( mask, maskChar, phoneNumberCount, phoneCodeNumberCount, inputId, operatorId, okId ){ /*constructor*/
    this.mask = mask;
    this.maskChar = maskChar;
    this.phoneNumberCount = phoneNumberCount;
    this.phoneCodeNumberCount = phoneCodeNumberCount;
    this.inputNode = document.getElementById(inputId);
    this.operatorNode = document.getElementById(operatorId);
    this.okNode = document.getElementById(okId);

    this.inputNode.focus();
    
},{/*metods*/
    "getPhone":       function(){
        return this.phone;
    },
    "getPhoneMasked": function(){
        return this.phoneMasked;
    },
    "getCode":        function(){
        return this.code;
    },
    "setMask":        function(mask){
        this.mask = mask;
        this.outPhone();
    },
    "outOperator":    function(){
        this.code=this.phone.substr(0,this.phoneCodeNumberCount);
        var response="Не найден оператор";
        if (this.operators[eval(this.code)]) {this.operator=this.operators[eval(this.code)];response=this.operator;}
        this.operatorNode.innerText=response;
    },
    "checkPhone":     function(){
        var visibility="hidden";
        if ((!!this.operator)&&(this.phone.length===this.phoneNumberCount)) { visibility="visible";}
        else {visibility="hidden";}
        this.okNode.style.visibility=visibility;
    },
    "outPhone":       function(){
        var caretPos = this.getCaretPosition();
         this.phoneMasked=this.mask;
             
         for (var i=0, phonel=this.phone.length; i<phonel; i++) {
             this.phoneMasked=this.phoneMasked.replace(this.maskChar,this.phone.charAt(i));
         }
         this.inputNode.value=this.phoneMasked;
         document.getElementById("phoneout").innerText=this.phone;

        
       var sel = document.selection.createRange ();
       sel.moveStart ('character', -this.inputNode.value.length);
       sel.moveStart ('character', 5);
       sel.moveEnd ('character', 0);
       sel.select ();
        
//         this.setCaretPosition(caretPos);
         this.outOperator();
         this.checkPhone();
    },
    "unMaskPhone":    function(){
         this.phoneMasked=this.inputNode.value;
         this.phone="";
         pos = this.mask.indexOf(this.maskChar);
            while ( pos != -1 ) {
               this.phone+=(this.phoneMasked.charAt(pos)!=this.maskChar)?parseInt(this.phoneMasked.charAt(pos)).toString().replace("NaN",""):"";
               pos = this.mask.indexOf(this.maskChar,pos+1);
            }
         
    },
    "addPhoneChar":    function(keycode){
             if (this.phone.length<this.phoneNumberCount) {this.phone=this.phone+String.fromCharCode(keycode);}
             this.outPhone();
    },
    "backspacePhoneChar": function (){
        var phoneCaretPos = this.getPhoneCaretPosition();
        this.phone = ( this.phone.substr(0,(phoneCaretPos-1)) ) +
                     ( this.phone.substr((phoneCaretPos),this.phone.length) )

        this.outPhone();
    },
    "deletePhoneChar": function (){
        var phoneCaretPos = this.getPhoneCaretPosition();
        this.phone = ( this.phone.substr(0,(phoneCaretPos)) ) +
                     ( this.phone.substr((phoneCaretPos+1),this.phone.length) )
    
        this.outPhone();
    },
    "inputPhone":      function(keycode){
        var returnValue=false;
        switch(keycode){
                 case 8:  case 46:  returnValue=true; break;
                 case 48: case 96:  this.addPhoneChar(48); break; //0
                 case 49: case 97:  this.addPhoneChar(49); break; //1
                 case 50: case 98:  this.addPhoneChar(50); break; //2
                 case 51: case 99:  this.addPhoneChar(51); break; //3
                 case 52: case 100: this.addPhoneChar(52); break; //4
                 case 53: case 101: this.addPhoneChar(53); break; //5
                 case 54: case 102: this.addPhoneChar(54); break; //6
                 case 55: case 103: this.addPhoneChar(55); break; //7
                 case 56: case 104: this.addPhoneChar(56); break; //8
                 case 57: case 105: this.addPhoneChar(57); break; //9
             }
             e = event || window.event;
             e.returnValue = returnValue;
             return false;
     },
   "getCaretPosition":  function(){
     var caretPos = 0;
     if (document.selection) { 
       this.inputNode.focus();
       var sel = document.selection.createRange();
       sel.moveStart ('character', -this.inputNode.value.length);
       caretPos = sel.text.length;
     }
     else if (this.inputNode.selectionStart || this.inputNode.selectionStart == '0')
       caretPos = this.inputNode.selectionStart;
     return caretPos;
   },
   "getPhoneCaretPosition": function() {
       var caretPos = this.getCaretPosition();
       var str = this.phoneMasked.substr(0,caretPos);
       var strsub = (str.indexOf(this.maskChar)>=0)?str.substr(0,str.indexOf(this.maskChar)):str;
       var strm = this.mask.substr(0,strsub.length);
       var caretPhonePos = strm.split(this.maskChar).length-1;
       return caretPhonePos;
   },
   "setCaretPosition": function(caretPos) {
     if (document.selection) { 
       this.inputNode.focus ();
       var sel = document.selection.createRange ();
       sel.moveStart ('character', -this.inputNode.value.length);
       sel.moveStart ('character', caretPos);
       sel.moveEnd ('character', caretPos);
       sel.select ();
     }
     else if (this.inputNode.selectionStart || this.inputNode.selectionStart == '0') {
       this.inputNode.selectionStart = caretPos;
       this.inputNode.selectionEnd = caretPos;
       this.inputNode.focus ();
     }
   }
             
    
});


