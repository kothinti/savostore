$( document ).ready(function() {
      var rateperkg=30,totalcost,td_cost,intcust,shipprotection=0;
      var td_costv1,intcustv1,shipprotectionv1=0,homedelivery=0;
      var cm_divider = 61023.80;
      var cf_divider = 1728;

      const formatter = new Intl.NumberFormat('en-US', {
         minimumFractionDigits: 2,      
         maximumFractionDigits: 2,
      });
	  
      $('.cost-calc input').on('input', function() {
        
	$('#dimensions-length').val() ? $('#dimensions-length').css({'border-color': '#737373'}) : $('#dimensions-length').css({'border-color': 'red'});
      	$('#dimensions-width').val() ? $('#dimensions-width').css({'border-color': '#737373'}) : $('#dimensions-width').css({'border-color': 'red'});
      	$('#dimensions-height').val() ? $('#dimensions-height').css({'border-color': '#737373'}) : $('#dimensions-height').css({'border-color': 'red'});
				
        if($('#dimensions-length').val() && $('#dimensions-width').val() && $('#dimensions-height').val()){
          var CBM = ($('#dimensions-length').val() * $('#dimensions-width').val() * $('#dimensions-height').val()) / cm_divider;
          var CBF = ($('#dimensions-length').val() * $('#dimensions-width').val() * $('#dimensions-height').val()) / cf_divider;
		
          $("#total-cost-v1").text(formatter.format(CBF*rateperkg));
	  
          $("#form-cbm-v1").html(parseFloat(CBM).toFixed(2));
          $("#form-cbf-v1").html(parseFloat(CBF).toFixed(2));
          $('.note__about-cost-v1').show();
          
		
          td_costv1 = (CBM > CBF) ? (CBM*0.60) : (CBF*0.60);
          intcustv1 = (CBM > CBF) ? (CBM*15) : (CBF*15);
          
          $('.intcustom-v1').text("$"+parseFloat(intcustv1).toFixed(2));
          
          if(td_costv1 > 3){
          	$('.chk-home-delivery-val-v1').text("$"+parseFloat(td_costv1).toFixed(2));
          }else{
          	td_costv1 = 3;
          	$('.chk-home-delivery-val-v1').text("$3.00");
          }
          
          if ($('[name="home-delivery-v1"]').is(':checked')) {
           $("#total-cost-v1").html(formatter.format(parseFloat(intcust)+parseFloat(td_costv1)+parseFloat(shipprotection)));
          }else{
             $("#total-cost-v1").html(formatter.format(parseFloat(intcustv1)+parseFloat(shipprotection)));
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
		   $("#total-cost-1").html(formatter.format(parseFloat(shipprotection+td_cost+homedelivery)));
		}else{
		   $("#total-cost-1").html(formatter.format(parseFloat(td_cost+shipprotection)));
		}
        };
      });
    });
    $('.chk-home-delivery-val').hide();
    
   $(function(){
      $('[name="home-delivery"]').change(function(){
        if ($(this).is(':checked')) {
           $('.chk-home-delivery-val').show();
           $("#total-cost-1").html(formatter.format(parseFloat(td_cost)+parseFloat(shipprotection)+homedelivery));
        }else{
       	   $('.chk-home-delivery-val').hide();
           $("#total-cost-1").html(formatter.format(parseFloat(td_cost)+parseFloat(shipprotection)));
        }
      });
    });
    
  $('.shipping-amount').on('input', function() {
    	shipprotection = ($(this).val() < 100) ? 0 : ($(this).val()*5)/100;
	  
       $('.chk-shipment-protection-val').text("$"+formatter.format(parseFloat(shipprotection)));
	
	if($('[name="home-delivery"]').is(':checked')) {
	   $("#total-cost-1").html(formatter.format(parseFloat(shipprotection+homedelivery+td_cost)));
	}else{
	   $("#total-cost-1").html(formatter.format(parseFloat(shipprotection+td_cost)));
	}
    });
    
      $('.cost-calc-1 input').on('input', function() {
        $('#dimensions-length-2').val() ? $('#dimensions-length-2').css({'border-color': '#737373'}) : $('#dimensions-length-2').css({'border-color': 'red'});
      	$('#dimensions-width-2').val() ? $('#dimensions-width-2').css({'border-color': '#737373'}) : $('#dimensions-width-2').css({'border-color': 'red'});
      	$('#dimensions-height-2').val() ? $('#dimensions-height-2').css({'border-color': '#737373'}) : $('#dimensions-height-2').css({'border-color': 'red'});
				
        if($('#dimensions-length-2').val() && $('#dimensions-width-2').val() && $('#dimensions-height-2').val()){
          
	  var CBM = ($('#dimensions-length-2').val() * $('#dimensions-width-2').val() * $('#dimensions-height-2').val()) / cm_divider;
          var CBF = ($('#dimensions-length-2').val() * $('#dimensions-width-2').val() * $('#dimensions-height-2').val()) / cf_divider;
          
	  td_cost = CBF*30;
	  td_cost = (td_cost < 250) ? 250 : td_cost;
	  intcust = td_cost;
	  homedelivery = CBF*2.5;
		
          $("#form-cbm").html(parseFloat(CBM).toFixed(2));
          $("#form-cbf").html(parseFloat(CBF).toFixed(2));
	
          $('.note__about-cost').show();
	
	  $("#total-cost-1").text(formatter.format(td_cost));
         
          $('.intcustom').text("$"+parseFloat(intcust).toFixed(2));
	
          $('.chk-home-delivery-val').text("$"+parseFloat(CBF*2.5).toFixed(2));
          
          if ($('[name="home-delivery"]').is(':checked')) {
           $("#total-cost-1").html(formatter.format(parseFloat(td_cost)+parseFloat(shipprotection)));
          }else{
             $("#total-cost-1").html(formatter.format(parseFloat(td_cost)+parseFloat(shipprotection)));
          }
		
        }else{
            $('.note__about-cost-v1').hide();
        }
        
      });
  });
