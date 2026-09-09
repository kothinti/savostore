$( document ).ready(function() {
      var rateperkg=15,totalcost,td_cost,intcust,shipprotection=0;
      var td_costv1,intcustv1,shipprotectionv1=0,os_totalcost,os_intcust,os_shipprotection=0;
      var cm_divider = 61023.80;
      var cf_divider = 1728;
  
      const formatter = new Intl.NumberFormat('en-US', {
         minimumFractionDigits: 2,      
         maximumFractionDigits: 2,
      });

    $('.ocean-shipping-calc input').on('input', function() {
        $('#os-dimensions-length').val() ? $('#os-dimensions-length').css({'border-color': '#737373'}) : $('#os-dimensions-length').css({'border-color': 'red'});
      	$('#os-dimensions-width').val() ? $('#os-dimensions-width').css({'border-color': '#737373'}) : $('#os-dimensions-width').css({'border-color': 'red'});
      	$('#os-dimensions-height').val() ? $('#os-dimensions-height').css({'border-color': '#737373'}) : $('#os-dimensions-height').css({'border-color': 'red'});
				
        if($('#os-dimensions-length').val() && $('#os-dimensions-width').val() && $('#os-dimensions-height').val()){
          var CBM = ($('#os-dimensions-length').val() * $('#os-dimensions-width').val() * $('#os-dimensions-height').val()) / cm_divider;
          var CBF = ($('#os-dimensions-length').val() * $('#os-dimensions-width').val() * $('#os-dimensions-height').val()) / cf_divider;
          
          os_totalcost = CBF*30;
          os_totalcost = (os_totalcost < 90) ? 90 : os_totalcost;
          os_intcust = os_totalcost;
          os_home_delivery = CBF*2.5;
		
          $("#os-form-cbm-v1").html(parseFloat(CBM).toFixed(2));
          $("#os-form-cbf-v1").html(parseFloat(CBF).toFixed(2));
	
          $('.os-note__about-cost').show();

          $("#os-total-cost").text(formatter.format(os_totalcost));
          $('.os-intcustom-v1').text("$"+parseFloat(os_intcust).toFixed(2));
	  
          $('.os-chk-home-delivery-val').text("$"+parseFloat(os_home_delivery).toFixed(2));

          if ($('[name="os-home-delivery-v1"]').is(':checked')) {
            $("#os-total-cost").html(formatter.format(parseFloat(os_totalcost)+parseFloat(os_shipprotection)+parseFloat(os_home_delivery)));
          }else{
             $("#os-total-cost").html(formatter.format(parseFloat(os_totalcost)+parseFloat(os_shipprotection)));
          }
        }else{
            $('.os-note__about-cost').hide();
        }
    });
  
  $(function()
    {
      $('[name="os-check-shipment-v1"]').change(function()
      {
        os_shipprotection = 0;
        if ($(this).is(':checked')) {
          $('.os-shipment-div').show();
        }else{
            $('.os-shipment-div').hide();
            $('.os-chk-shipment-protection-val').text('');
            $('.os-shipping-amount').val('');

          if($('[name="os-home-delivery-v1"]').is(':checked')) {
            $("#os-total-cost").html(formatter.format(parseFloat(shipprotectionv1+os_totalcost+os_home_delivery)));
          }else{
            $("#os-total-cost").html(formatter.format(parseFloat(os_totalcost+os_shipprotection)));
          }
        };
      });
    });
    $('.os-chk-home-delivery-val').hide();
	  
    $(function(){
  	  $('[name="os-home-delivery-v1"]').change(function(){
  	    if ($(this).is(':checked')) {
  	       $('.os-chk-home-delivery-val').show();
  	       $("#os-total-cost").html(formatter.format(parseFloat(os_totalcost)+parseFloat(os_shipprotection)+os_home_delivery));
  	    }else{
  		$('.os-chk-home-delivery-val').hide();
  		$("#os-total-cost").html(formatter.format(parseFloat(os_totalcost)+parseFloat(os_shipprotection)));
  	    }
  	  });
     });
    
    $('.os-shipping-amount').on('input', function() {
    	os_shipprotection = ($(this).val() < 100) ? 0 : ($(this).val()*5)/100;
	  
       $('.os-chk-shipment-protection-val').text("$"+formatter.format(parseFloat(os_shipprotection)));
	
	if($('[name="os-home-delivery-v1"]').is(':checked')) {
	   $("#os-total-cost").html(formatter.format(parseFloat(os_shipprotection+os_home_delivery+os_totalcost)));
	}else{
	   $("#os-total-cost").html(formatter.format(parseFloat(os_shipprotection+os_totalcost)));
	}
    });
  });
