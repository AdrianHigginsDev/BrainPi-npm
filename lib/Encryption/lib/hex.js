var hex = function(len) {
    var maxlen = 8,
        min = Math.pow(16,Math.min(len,maxlen)-1)
        max = Math.pow(16,Math.min(len,maxlen)) - 1,
        n   = Math.floor( Math.random() * (max-min+1) ) + min,
        r   = n.toString(16);
    while ( r.length < len ) {
       r = r + hex( len - maxlen );
    }
    return r;
  };
  
  module.exports = hex;