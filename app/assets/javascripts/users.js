/* global $, Stripe */
// Document Ready - wait until page and form has fully loaded.
$(document).on('turbolinks:load', function () {
  
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  // Set Stripe Public Key - needs to be done prior to sending CC info.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit button, 
  submitBtn.click(function(event){
    //  prevent default submission behavior.
    event.preventDefault();
    
    // Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    // Send the card fields to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  
  });
  

  // Stripe will return a card token.
  // Inject card token as hidden field into form.
  // Submit form to our Rails app.

});

