var timeoutCounter = 0;
jQuery(function() {
    jQuery('.buy').on('click', function() {
        jQuery('#purchase_wrapper').fadeIn();
        product_id = jQuery(this).attr('id').slice(-1);
        jQuery('#product').val(product_id);
    });
    jQuery('#step1next').on('click', function() {
        jQuery('.step1').fadeOut('400','swing', function() {
            jQuery('.step2').fadeIn();
        });
    });
    jQuery('.quit').on('click', function() {
        jQuery('#purchase_wrapper').fadeOut('400','swing', function() {
            if (request != null) {
                request.abort("progStopped");
                request = null;
            }
            jQuery('.purchase').fadeOut();
            jQuery('.step1').fadeIn();
        });
    });
    jQuery('#timeoutnext').on('click', function() {
        jQuery('.timeout').fadeOut('400','swing', function() {
            jQuery('.step3').fadeIn('400','swing', function() {
                doAjax(); 
            });
        });
    });
    jQuery('#apinext').on('click', function() {
        jQuery('.apierror').fadeOut('400','swing', function() {
            jQuery('.step1').fadeIn();
        });
    });
    jQuery('#step2next').on('click', function() {
        jQuery('.step2 input').each(function() {
            validateInput(jQuery(this));
        });
        if (jQuery('.has-error').length == 0) {
            jQuery('.step2').fadeOut('400','swing', function() {
                jQuery('.step3').fadeIn('400','swing', function() {
                    doAjax();            
                });
            });
        } else {
            jQuery('.step2 h2').text("1. Please complete all fields");
            jQuery('.step2 h2').css('color','red');
        }
    });
    jQuery(".step2").on('input', "input", function (e) {
        validateInput(jQuery(e.target));
    });

    document.addEventListener('invalid', (function () {
        return function (e) {
            e.preventDefault();
        };
    })(), true);
    
});
var request;
function doAjax() {
    product_id = jQuery('#product').val();
    console.log(product_id);
    if (request != null) {
        request.abort("progStopped");
        request = null;
    }
    request = jQuery.ajax({
        type: "GET",
        url: 'https://cdielts.gelielts.cn/fusion',
        data: { action: "buy", product:  product_id},
        xhrFields: { withCredentials: true },
        success: function (result) {
            console.log(result);
            jQuery('#qrcode').empty();
            new QRCode(document.getElementById("qrcode"), result);
            console.log("waiting");
            firstname = jQuery('#firstname').val();
            lastname = jQuery('#lastname').val();
            email = jQuery('#email').val();
            jQuery('.step3').fadeOut('400','swing', function() {
                jQuery('.step4').fadeIn();
            });
            jQuery.ajax({
                url: 'https://cdielts.gelielts.cn/fusion',
                data: { action: "check", firstname: firstname, lastname: lastname, email: email },
                dataType: 'json',
                xhrFields: { withCredentials: true },
                type: 'GET',
                success: function(data) { 
                    switch (data) {
                        case "TIMEOUT":
                            jQuery('.step4').fadeOut('400','swing', function() {
                                jQuery('.timeout').fadeIn();
                            });
                            break;
                        case "ERROR":
                            //generating user error
                            jQuery('.step4').fadeOut('400','swing', function() {
                                jQuery('.support').fadeIn();
                            });
                            break;
                        default:
                            jQuery('#startlink').attr('href',data);
                            jQuery('#emailSpan').text(email);
                            jQuery('.step4').fadeOut('400','swing', function() {
                                jQuery('.step5').fadeIn();
                            });
                            break;
                    }
                },
                error: function() {
                    if (status != "progStopped") {
                        jQuery('.step4').fadeOut('400','swing', function() {
                            jQuery('.timeout').fadeIn();
                        });
                    }
                }
            });
        },
        error: function(jqXHR, status, errorThrown) {
            if (status != "progStopped") {
                jQuery('.step3').css("display","none");
                jQuery('.apierror').fadeIn();
            }
            
        }
    });
}
function isValid(el) {
console.log(el.attr);
    switch (el.attr('type')) {
        case 'text':
        case 'textarea':
        case 'password':
            return el.val().length > 0;
        case 'checkbox':
        case 'radio':
            return el.is(':checked'); // Stupid jQuery
        case 'email':
            if (el.val().length > 0) {
                var ret = typeof el[0].checkValidity === 'function' ? el[0].checkValidity() : /\S+@\S+\.\S+/.test(el.val());
            } else {
                var ret = false;
            }
            return ret;
    }
}
function validateInput(el) {
        if (isValid(el)) {
            el.removeClass('has-error');
        } else {
            el.addClass('has-error');
        }
}
        