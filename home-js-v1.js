<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
<script type="text/javascript">

var app=document.getElementById("dynamic-text"),typewriter=new Typewriter(app,{loop:!0});typewriter.typeString("Mombasa").pauseFor(2500).deleteAll().typeString("Nanyuki").pauseFor(2500).deleteAll().typeString("Nairobi").pauseFor(2500).deleteAll().typeString("Kisumu").pauseFor(2500).deleteAll().typeString("Kitale").pauseFor(2500).deleteAll().typeString("Nyeri").pauseFor(2500).start();
  
  $( document ).ready(function() {
  		var rateperkg=15,totalcost,td_cost,intcust,shipprotection=0;
      var td_costv1,intcustv1,shipprotectionv1=0;
      const formatter = new Intl.NumberFormat('en-US', {
         minimumFractionDigits: 2,      
         maximumFractionDigits: 2,
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
          
          if(td_cost > 3){
          	$('.chk-home-delivery-val-v1').text("$"+parseFloat(td_costv1).toFixed(2));
          }else{
          	td_cost = 3;
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
        shipprotection = 0;
        if ($(this).is(':checked')) {
           $('.shipment-div-v1').show();
        }else{
        	$('.shipment-div-v1').hide();
					$('.chk-shipment-protection-val-v1').text('');
          $('.shipping-amount-v1').val('');
          $("#total-cost-v1").html(parseFloat(intcustv1)+parseFloat(shipprotectionv1)+parseFloat(td_costv1));
        };
      });
    });
    
    $('.chk-home-delivery-val').hide();
    $(function(){
      $('[name="home-delivery"]').change(function(){
        if ($(this).is(':checked')) {
           $('.chk-home-delivery-val').show();
           console.log(parseFloat(intcust) +"/"+ td_cost +"/"+parseFloat(shipprotection));
           $("#total-cost-1").html(parseFloat(intcust)+parseFloat(td_cost)+parseFloat(shipprotection));
        }else{
       		 $('.chk-home-delivery-val').hide();
           $("#total-cost-1").html(parseFloat(intcust)+parseFloat(shipprotection));
        }
      });
    });
    
  	$('.shipping-amount').on('input', function() {
    	shipprotection = ($(this).val() < 100) ? 0 : ($(this).val()*5)/100;
       $('.chk-shipment-protection-val').text("$"+formatter.format(parseFloat(shipprotection)));
       $("#total-cost-1").html(formatter.format(parseFloat(shipprotection)+parseFloat(intcust)+parseFloat(td_cost)));
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
          $("#total-cost-1").html(parseFloat(intcust)+parseFloat(shipprotection)+parseFloat(td_cost));
        };
      });
    });
    $('.chk-home-delivery-val').hide();
    $(function(){
      $('[name="home-delivery"]').change(function(){
        if ($(this).is(':checked')) {
           $('.chk-home-delivery-val').show();
           console.log(parseFloat(intcust) +"/"+ td_cost +"/"+parseFloat(shipprotection));
           $("#total-cost-1").html(parseFloat(intcust)+parseFloat(td_cost)+parseFloat(shipprotection));
        }else{
       		 $('.chk-home-delivery-val').hide();
           $("#total-cost-1").html(parseFloat(intcust)+parseFloat(shipprotection));
        }
      });
    });
    
  	$('.shipping-amount').on('input', function() {
    	shipprotection = ($(this).val() < 100) ? 0 : ($(this).val()*5)/100;
       $('.chk-shipment-protection-val').text("$"+formatter.format(parseFloat(shipprotection)));
       $("#total-cost-1").html(formatter.format(parseFloat(shipprotection)+parseFloat(intcust)+parseFloat(td_cost)));
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
</script>
<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
<script type="text/javascript">$(document).ready(function(){const r=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});$("#items-dropdown").on("change",function(){var t=Number($("#item-cost-input").val()),m=10*t/100,o=Number($("#items-dropdown").val()),s=16*(m+o)/100,i=t+m+o+s,a=109.32*i;$("#item-cost").html("$"+r.format(t)),$("#service-cost").html("$"+r.format(m)),$("#shipping-cost").html("$"+r.format(o)),t&&0!=m&&($("#vat").html("$"+r.format(s)),$("#total-cost-usd").html("$ "+r.format(i)),$("#total-cost-ksh").html("Ksh "+r.format(a))),0==t&&$("#item-cost").html("$ 0"),0==m&&$("#service-cost").html("$ 0"),0==t&&0==m&&$("#vat").html("$ 0")}),$("#item-cost-input").on("input",function(){var t=Number($("#item-cost-input").val()),m=10*t/100,o=Number($("#items-dropdown").val()),s=16*(m+o)/100,i=t+m+o+s,a=109.32*i;$("#item-cost").html("$"+r.format(t)),$("#service-cost").html("$"+r.format(m)),$("#shipping-cost").html("$"+r.format(o)),t&&0!=m&&($("#vat").html("$"+r.format(s)),$("#total-cost-usd").html("$ "+r.format(i)),$("#total-cost-ksh").html("Ksh "+r.format(a))),0==t&&$("#item-cost").html("$ 0"),0==m&&$("#service-cost").html("$ 0"),0==t&&0==m&&$("#vat").html("$ 0")})});</script>
<script>let registration_url;$(".btn-get-started-hero").click(function(e){e.preventDefault();e=new RegExp("^[a-zA-Z ]+$");$(".f-fullname-hero,.f-emailid-hero").focus(function(){$(".fname-error-hero,.email-error-hero").addClass("hide")}),0==$(".f-fullname-hero").val().length&&0==$(".f-emailid-hero").val().length?$(".fname-error-hero,.email-error-hero").removeClass("hide"):e.test($(".f-fullname-hero").val())&&0!=$(".f-fullname-hero").val().length?/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".f-emailid-hero").val())&&0!=$(".f-emailid-hero").val().length?(registration_url=encodeURI("https://app.savostore.com/#/register?first_name="+$(".f-fullname-hero").val()+"&email_address="+$(".f-emailid-hero").val()),$(".form-start-shipping").submit()):$(".email-error-hero").removeClass("hide"):$(".fname-error-hero").removeClass("hide")}),$(".btn-form-finish").click(function(e){window.open(registration_url,"_self")});</script>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script>var swiper=new Swiper(".quick-price",{centeredSlides:!0,slidesPerView:1,spaceBetween:15,mousewheel:!1,keyboard:!1,loop:!0,freeMode:!1,navigation:{nextEl:".hero-swiper-arrow-next",prevEl:".hero-swiper-arrow-prev"},breakpoints:{768:{slidesPerView:1,spaceBetween:30},1024:{slidesPerView:1,spaceBetween:40,freeMode:!0,mousewheel:!0,keyboard:!0}},on:{slideChange:function(){$("#items-dropdown-hero option[data-id='"+this.realIndex+"']").prop("selected",!0)}}});$("#items-dropdown-hero").on("change",function(){let e=$(this).find("option:selected");var r=e.data("id");swiper.slideTo(r+1)});</script>
