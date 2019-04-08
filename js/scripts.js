
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
};

AddressBook.prototype.addContact = function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
};
AddressBook.prototype.assignId = function(){
  this.currentId++;
  return this.currentId;
};
AddressBook.prototype.findContact = function(id){
  for(var i = 0; i < this.contacts.length; i++){
    if(this.contacts[i]){
      if(this.contacts[i].id == id){
        return this.contacts[i];
      }
    }
  };
  return false;
};
AddressBook.prototype.deleteContact = function(id){
  for(var c = 0; c < this.contacts.length; c++){
    if(this.contacts[c]){
      if(this.contacts[c].id == id){
        delete this.contacts[c];

        return true;
      }
    }
  };
  return false;
};

function Contact(firstName, lastName, phoneNumber){
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
};

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");

}



function printContact (printAddress){
  var contactList  = $("ul#contacts");
  var htmlForContactInfo = "";
  printAddress.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id =" + contact.id + ">" +contact.firstName + " " + contact.lastName + "</li>";
  });
  contactList.html(htmlForContactInfo);
};

function attachContactListeners() {
  // $("ul#contacts").on("click", "li", function() {
  //    addressBook.deleteContact(this.id);
  //    console.log(addressBook);
  //  });
  $("#buttons").on("click", ".deleteButton", function() {
   addressBook.deleteContact(this.id);
   $("#show-contact").hide();
   printContact(addressBook);
 });
  $("ul#contacts").on("click", "li", function() {
   showContact(this.id);     // <--- This is new!
  });

};


var addressBook = new AddressBook();


$(function () {
    attachContactListeners();
    $("form#new-contact").submit(function (event) {
        event.preventDefault();

        var inputtedFirstName = $('input#new-first-name').val();
        var inputtedLastName = $('input#new-last-name').val();
        var inputtedPhoneNumber = $('input#new-phone-number').val();
        var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
        addressBook.addContact(newContact);
        // console.log(newContact);
        printContact(addressBook);




    });
});
