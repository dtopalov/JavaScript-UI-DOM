function solve() {
  return function (selector, isCaseSensitive) {
    isCaseSensitive = isCaseSensitive || false;
    var element = document.querySelector(selector);
    element.className += " items-control";
    
    //-------------ADDING ELEMENTS
    var addingElementsPart = document.createElement('div');
    addingElementsPart.className += " add-controls";
    var label = document.createElement('label');
    label.setAttribute('for', 'the-input');
    label.innerHTML = 'Enter text';
    var input = document.createElement('input');
    input.id = 'the-input';
    var button = document.createElement('button');
    button.className += " button";
    button.innerHTML = 'Add';
    
    addingElementsPart.appendChild(label);
    addingElementsPart.appendChild(input);
    addingElementsPart.appendChild(button);
    
    element.appendChild(addingElementsPart);
    
    //----------------SEARCH
    
    var searchElementsPart = document.createElement('div');
    searchElementsPart.className += " search-controls";
    
    var label2 = document.createElement('label');
    label2.setAttribute('for', 'the-search');
    label2.innerHTML = 'Search:';
    var searchInput = document.createElement('input');
    searchInput.id = 'the-search';
    
    searchElementsPart.appendChild(label2);
    searchElementsPart.appendChild(searchInput);
    
    element.appendChild(searchElementsPart);
    
    //---------------RESULTS
    var resultsPart = document.createElement('div');
    resultsPart.className += " result-controls";
    
    var itemsList = document.createElement('ul');
    itemsList.className += " items-list";
    
    resultsPart.appendChild(itemsList);
    element.appendChild(resultsPart);
    //-------------------------
   //var resultsList = document.getElementsByClassName('items-list')[0];
    button.addEventListener('click', function(){
     
      itemsList.appendChild(createNewListItem());
      // input.value = '';
    });
    
    
    
    searchInput.addEventListener('input', function(){
      var items = document.getElementsByClassName('list-item');
      for(var i = 0; i < items.length; i += 1){
          if (isCaseSensitive) {
            if(items[i].firstElementChild.innerHTML.indexOf(searchInput.value) >= 0){
              items[i].style.display = '';
            } else{
              items[i].style.display = 'none';
            }
          } else {
            if(items[i].firstElementChild.innerHTML.toLowerCase().indexOf(searchInput.value.toLowerCase()) >= 0){
              items[i].style.display = '';
            } else{
              items[i].style.display = 'none';
            }
          }  
        }
    });
      
    function createNewListItem(){ 
      var listItem = document.createElement('li');
      listItem.className += ' list-item';
      var text = document.createElement('strong');
      text.innerHTML = input.value;
      listItem.appendChild(text);
      var uglyButton = document.createElement('button');
      uglyButton.className += ' button';
      uglyButton.innerHTML = 'X';
      listItem.appendChild(uglyButton);

      return listItem;
    }
    
    itemsList.addEventListener('click', function(ev){
      if (ev.target.className.indexOf('button') >= 0) {
        this.removeChild(ev.target.parentNode);
      }
    });
    
  };
}

module.exports = solve;