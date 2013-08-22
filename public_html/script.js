var MakeClass = function(){
    return function( args ){
        if( this instanceof arguments.callee ){
            if( typeof this.__construct == "function" ) this.__construct.apply( this, args );
        }else return new arguments.callee( arguments );
    };
};
var NewClass = function( variables, constructor, functions ){
    var retn = MakeClass();
    for( var key in variables ){
        retn.prototype[key] = variables[key];
    }
    for( var key in functions ){
        retn.prototype[key] = functions[key];
    }
    retn.prototype.__construct = constructor;
    return retn;
};
