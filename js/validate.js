$(document).ready(function(){


		$('#registration-form').validate({
	    rules: {
	       name: {
	        required: true,
	       required: true
	      },

		    username: {
	        minlength: 6,
	        required: true
	      },

	      email: {
	        required: true,
	        email: true
	      },

		   address: {
	      	minlength: 10,
	        required: true
	      },


	    },
			highlight: function(element) {
				$(element).closest('.control-group').removeClass('success').addClass('error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.control-group').removeClass('error').addClass('success');
			}
	  });

}); // end document.ready
