// for inserting text node befor element
var text = document.createTextNode('the text');
var child = document.getElementById('childDiv');
child.parentNode.insertBefore(text, child);


// parsing html
var parser = new DOMParser();
var htmlDoc = parser.parseFromString(txt, 'text/html');
// do whatever you want with htmlDoc.getElementsByTagName('a');


// getting next sibling
document.getElementById('foo2').nextSibling; // #foo3
document.getElementById('foo2').previousSibling; // 


// appending next child
var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode("Water");         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"




function addElement () { 
    // create a new div element 
    const newDiv = document.createElement("div"); 
    
    // and give it some content 
    const newContent = document.createTextNode("Hi there and greetings!"); 
    
    // add the text node to the newly created div
    newDiv.appendChild(newContent);  
  
    // add the newly created element and its content into the DOM 
    const currentDiv = document.getElementById("div1"); 
    document.body.insertBefore(newDiv, currentDiv);
};