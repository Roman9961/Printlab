import jQuery from 'jquery';



export function initPopup () {
    const data = [
        {
            username: jQuery('.sendmessage').clone()
        }
    ];
    jQuery('.btn-form-contact').magnificPopup({

        inline: {
            // Define markup. Class names should match key names.
            markup:
            '<div id="txt-lamination-popup1">'+
            '<div class="bg-popup" style="background-color:white;">'+
            '<div class="wrapepper-popup-content">'+
            '<div class="mfp-username"></div>'+
            '</div>'+
            '</div>'+
            '</div>'
        },
        items: data
    });

    jQuery('.txt-popup').magnificPopup({
        type:'inline',
        //closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><i class="icon-cross"></i></button>',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
}
