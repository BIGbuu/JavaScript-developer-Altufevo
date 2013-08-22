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
    "response":"Не найден оператор",
    "inputNode":"",
    "operatorNode":"",
    "caretPos":0,
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
    this.caretPos = this.getNextCaretPosition()-1;
    
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
        var posp = this.getPhoneCaretPosition();
        this.mask = mask;

        var    count = 0;
        var    pos = this.mask.indexOf(this.maskChar);
            while ( count < posp ) {
               count++;
               pos = (this.mask.indexOf(this.maskChar,pos)<(this.mask.length-1))?this.mask.indexOf(this.maskChar,pos+1):pos+1;
            }
        this.caretPos=pos;
        
        this.outPhone();
    },
    "outOperator":    function(){
        var response="";
            if (this.phone.length>=this.phoneCodeNumberCount) {
                this.code=this.phone.substr(0,this.phoneCodeNumberCount);
                response=this.response;
                if (this.operators[eval(this.code)]) {this.operator=this.operators[eval(this.code)];response=this.operator;}
                this.operatorNode.innerText=response;
        }
        this.operatorNode.innerText=response;
    },
    "checkPhone":     function(){
        var visibility="hidden";
        if ((!!this.operator)&&(this.phone.length===this.phoneNumberCount)) { visibility="visible";}
        else {visibility="hidden";}
        this.okNode.style.visibility=visibility;
    },
    "outPhone":       function(){
         this.phoneMasked=this.mask;
             
         for (var i=0, phonel=this.phone.length; i<phonel; i++) {
             this.phoneMasked=this.phoneMasked.replace(this.maskChar,this.phone.charAt(i));
         }
         this.inputNode.value=this.phoneMasked;
        
         this.setCaretPosition(this.caretPos);
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
        if (this.phone.length<this.phoneNumberCount) {
            this.phone=this.phone.substr(0,this.getPhoneCaretPosition())+String.fromCharCode(keycode)+this.phone.substr(this.getPhoneCaretPosition(),this.phone.length);
            this.caretPos = this.getNextCaretPosition();
        }
        this.outPhone();
             
    },
    "backspacePhoneChar": function (){
        var phoneCaretPos = this.getPhoneCaretPosition();
        this.phone = ( this.phone.substr(0,(phoneCaretPos-1)) ) +
                     ( this.phone.substr((phoneCaretPos),this.phone.length) )
        var prevCaretPos = (this.mask.substr(0,this.caretPos)).lastIndexOf(this.maskChar);
        this.caretPos = (phoneCaretPos>0)?prevCaretPos:this.caretPos;
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
       this.caretPos = caretPos;
     return this.caretPos;
   },
   "getNextCaretPosition": function() {
            var posp = (this.getPhoneCaretPosition()+1);

            count = 0;
            pos = this.mask.indexOf(this.maskChar);
            while ( count < posp ) {
               count++;
               pos = (this.mask.indexOf(this.maskChar,pos)<(this.mask.length-1))?this.mask.indexOf(this.maskChar,pos+1):pos+1;
            }
        return pos;
   },
   "getPhoneCaretPosition": function() {
       var caretPos = this.caretPos;
       var str = this.phoneMasked.substr(0,caretPos);
       var strsub = (str.indexOf(this.maskChar)>=0)?str.substr(0,str.indexOf(this.maskChar)):str;
       var strm = this.mask.substr(0,strsub.length);
       var caretPhonePos = strm.split(this.maskChar).length-1;
       return caretPhonePos;
   },
   "setCaretPosition": function(caretPos) {
        if(this.inputNode.setSelectionRange){
            this.inputNode.focus();
            this.inputNode.setSelectionRange(caretPos,caretPos);
        }
        else if (this.inputNode.createTextRange) {
            var range = this.inputNode.createTextRange();
            range.collapse(true);
            range.moveEnd('character', caretPos);
            range.moveStart('character', caretPos);
            range.select();
        }
             
    }
});


