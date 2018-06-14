import jQuery from 'jquery';
const $ = jQuery;

export const updateTooltip = (selector)=> {

    var element =  $(`.info--${selector}`);
    var data = element[0].dataset;

    var description = $("<div>").addClass("tooltip__description").html(element.data('description'));
    var parameters = $("<div>").addClass("tooltip__parameters");
    var parametersBasis = $("<div>").addClass("tooltip__parameters__basis").html(`<span><b>Основа:</b> ${data.basis}</span>`);
    ;
    var parametersSizes = $("<div>").addClass("tooltip__parameters__sizes").html(`<span><b>Размер:</b> ${data.sizes}</span>`);
    var parametersAmount = $("<div>").addClass("tooltip__parameters__amount").html(`<span><b>Количество:</b> ${data.amount}</span>`);


    var tooltip1 = $("<div>").addClass("tooltip__description");

    tooltip1.append(description).append(parametersBasis).append(parametersSizes).append(parametersAmount)

        element.tooltip({
                position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: function (position, feedback) {
                        $(this).css(position);
                        $("<div>")
                            .addClass("arrow")
                            .addClass(feedback.vertical)
                            .addClass(feedback.horizontal)
                            .appendTo(this);
                    }
                },
                content: tooltip1
            }
        );
}