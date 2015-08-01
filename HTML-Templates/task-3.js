function solve(){
  return function(){
    $.fn.listview = function(data){
    	var templateHolderId = this.attr('data-template'),
    		template = $('#' + templateHolderId).html(),
    		compiledHTML = handlebars.compile(template),
    		i,
    		len;

    	for(i = 0, len = data.length; i < len; i += 1){
    		this.append(compiledHTML(data[i]));
    	}
    };
  };
}

module.exports = solve;