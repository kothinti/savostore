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
	  
      $('.cost-calc input').on('input', function() {
        $('#actual-weight').val() ? $('#actual-weight').css({'border-color': '#737373'}) : $('#actual-weight').css({'border-color': 'red'});
      	 $('#dimensions-length').val() ? $('#dimensions-length').css({'border-color': '#737373'}) : $('#dimensions-length').css({'border-color': 'red'});
      	 $('#dimensions-width').val() ? $('#dimensions-width').css({'border-color': '#737373'}) : $('#dimensions-width').css({'border-color': 'red'});
      	 $('#dimensions-height').val() ? $('#dimensions-height').css({'border-color': '#737373'}) : $('#dimensions-height').css({'border-color': 'red'});
				
        if($('#dimensions-length').val() && $('#dimensions-width').val() && $('#dimensions-height').val() && $('#actual-weight').val()){
          var weight1 = ($('#dimensions-length').val() * $('#dimensions-width').val() * $('#dimensions-height').val()) / 366;
          var weight2 = $('#actual-weight').val();
          $("#total-cost-v1").html((weight1 > weight2) ? formatter.format(weight1*rateperkg) : formatter.format(weight2*rateperkg) );
          $('.form-actual-weight').html(weight2 + " KG");
          $('.form-volumetric-weight').html(formatter.format(weight1)  + " KG" );
          $('.note__about-cost-v1').show();
          td_costv1 = (weight1 > weight2) ? (weight1*0.60) : (weight2*0.60);
          intcustv1 = (weight1 > weight2) ? (weight1*15) : (weight2*15);
          $('.intcustom-v1').text("$"+parseFloat(intcustv1).toFixed(2));
          
          if(td_costv1 > 3){
          	$('.chk-home-delivery-val-v1').text("$"+parseFloat(td_costv1).toFixed(2));
          }else{
          	td_costv1 = 3;
          	$('.chk-home-delivery-val-v1').text("$3.00");
          }
          
          if ($('[name="home-delivery-v1"]').is(':checked')) {
           $("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)+parseFloat(td_costv1)+parseFloat(shipprotectionv1)));
          }else{
             $("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)+parseFloat(shipprotectionv1)));
          }
        }else{
            $('.note__about-cost-v1').hide();
        }
      });
    
    $(function()
    {
      $('[name="check-shipment-v1"]').change(function()
      {
        shipprotectionv1 = 0;
        
	if ($(this).is(':checked')) {
		$('.shipment-div-v1').show();
        }else{
		$('.shipment-div-v1').hide();
		$('.chk-shipment-protection-val-v1').text('');
		$('.shipping-amount-v1').val('');

		if($('[name="home-delivery-v1"]').is(':checked')) {
		   $("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)+parseFloat(shipprotectionv1)+parseFloat(td_costv1)));
		}else{
		   $("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)));
		}
        };

      });
    });
    
    $('.chk-home-delivery-val-v1').hide();
	  
    $(function(){
      $('[name="home-delivery-v1"]').change(function(){
        if ($(this).is(':checked')) {
           $('.chk-home-delivery-val-v1').show();
           console.log(parseFloat(intcustv1) +"/"+ td_cost +"/"+parseFloat(shipprotectionv1));
           $("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)+parseFloat(td_costv1)+parseFloat(shipprotectionv1)));
        }else{
		$('.chk-home-delivery-val-v1').hide();
		$("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)+parseFloat(shipprotectionv1)));
        }
      });
    });
    
  $('.shipping-amount-v1').on('input', function() {
    	shipprotectionv1 = ($(this).val() < 100) ? 0 : ($(this).val()*5)/100;
       $('.chk-shipment-protection-val-v1').text("$"+formatter.format(parseFloat(shipprotectionv1)));
	  
	if($('[name="home-delivery-v1"]').is(':checked')) {
	   $("#total-cost-v1").html(formatter.format(parseFloat(shipprotectionv1)+parseFloat(intcustv1)+parseFloat(td_costv1)));
	}else{
	   $("#total-cost-v1").html(formatter.format(parseFloat(shipprotectionv1)+parseFloat(intcustv1)));
	}
    });
    
    $(function()
    {
      $('[name="check-shipment"]').change(function()
      {
        shipprotection = 0;
        if ($(this).is(':checked')) {
           $('.shipment-div').show();
        }else{
        	$('.shipment-div').hide();
		$('.chk-shipment-protection-val').text('');
         	$('.shipping-amount').val('');
		
		if($('[name="home-delivery"]').is(':checked')) {
          	   $("#total-cost-1").html(formatter.format(parseFloat(intcust)+parseFloat(shipprotection)+parseFloat(td_cost)));
		}else{
		   $("#total-cost-1").html(formatter.format(parseFloat(intcust)));
		}
        };
      });
    });
    $('.chk-home-delivery-val').hide();
    $(function(){
      $('[name="home-delivery"]').change(function(){
        if ($(this).is(':checked')) {
           $('.chk-home-delivery-val').show();
           console.log(parseFloat(intcust) +"/"+ td_cost +"/"+parseFloat(shipprotection));
           $("#total-cost-1").html(formatter.format(parseFloat(intcust)+parseFloat(td_cost)+parseFloat(shipprotection)));
        }else{
       		 $('.chk-home-delivery-val').hide();
           $("#total-cost-1").html(formatter.format(parseFloat(intcust)+parseFloat(shipprotection)));
        }
      });
    });
    
  $('.shipping-amount').on('input', function() {
    	shipprotection = ($(this).val() < 100) ? 0 : ($(this).val()*5)/100;
       $('.chk-shipment-protection-val').text("$"+formatter.format(parseFloat(shipprotection)));
	
	if($('[name="home-delivery"]').is(':checked')) {
	   $("#total-cost-1").html(formatter.format(parseFloat(shipprotection)+parseFloat(intcust)+parseFloat(td_cost)));
	}else{
	   $("#total-cost-1").html(formatter.format(parseFloat(shipprotection)+parseFloat(intcust)));
	}
    });
    
      $('.cost-calc-1 input').on('input', function() {
        td_cost = 3;
        intcust = 0;
        $('#actual-weight-2').val() ? $('#actual-weight-2').css({'border-color': '#737373'}) : $('#actual-weight-2').css({'border-color': 'red'});
      	$('#dimensions-length-2').val() ? $('#dimensions-length-2').css({'border-color': '#737373'}) : $('#dimensions-length-1').css({'border-color': 'red'});
      	$('#dimensions-width-2').val() ? $('#dimensions-width-2').css({'border-color': '#737373'}) : $('#dimensions-width-1').css({'border-color': 'red'});
      	$('#dimensions-height-2').val() ? $('#dimensions-height-2').css({'border-color': '#737373'}) : $('#dimensions-height-1').css({'border-color': 'red'});

        if($('#dimensions-length-2').val() && $('#dimensions-width-2').val() && $('#dimensions-height-2').val() && $('#actual-weight-2').val()){
          var weight1 = ($('#dimensions-length-2').val() * $('#dimensions-width-2').val() * $('#dimensions-height-2').val()) / 366;
          var weight2 = $('#actual-weight-2').val();
          totalcost = (weight1 > weight2) ? (weight1*rateperkg) : (weight2*rateperkg);
          
          $('.form-actual-weight-1').html(weight2 + " KG");
          $('.form-volumetric-weight-1').html(formatter.format(weight1)  + " KG" );
          $('.note__about-cost').show();

          td_cost = (weight1 > weight2) ? (weight1*0.60) : (weight2*0.60);
          intcust = (weight1 > weight2) ? (weight1*15) : (weight2*15);
          $('.intcustom').text("$"+parseFloat(intcust).toFixed(2));
          
          if(td_cost > 3){
          	$('.chk-home-delivery-val').text("$"+parseFloat(td_cost).toFixed(2));
          }else{
          	td_cost = 3;
          	$('.chk-home-delivery-val').text("$3.00");
          }
          
          if ($('[name="home-delivery"]').is(':checked')) {
           $("#total-cost-1").html(formatter.format(parseFloat(intcust)+parseFloat(td_cost)+parseFloat(shipprotection)));
          }else{
             $("#total-cost-1").html(formatter.format(parseFloat(intcust)+parseFloat(shipprotection)));
          }
        
        }else{
          $('.note__about-cost').hide();
        }
        
      });
  });
