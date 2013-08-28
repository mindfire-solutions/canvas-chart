/*
   Document   : jquery.canvasBellCurve.js
   Created on : 16 Aug, 2013, 3:57:48 PM
   Author     : hareror
   Description: Plugin for draw bell curve using canvas

   */
(function($) {
    $.fn.bellCurve = function() {
        this.each(function(elementIndex) {

            var canvasElement = $(this);
            var canvas, context, points = [];
            var NormalDensityZx = function(x, Mean, StdDev){
                var a = x - Mean;
                var b = Math.exp(-(a * a) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
                return b;
            };

            var getMousePos = function (canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                return [evt.clientX - rect.left, evt.clientY - rect.top]
            };

            var drawBellCurve = function (mean, standard_dev){

                context.fillStyle = "#000000";
                var height = canvas.height - 50;
                var width = canvas.width;
                var min_x = parseFloat(mean - (4*standard_dev));
                var max_x = parseFloat(mean + (4*standard_dev));
                var min_y = 0;
                var max_y = 1;
                var range_x = max_x - min_x;
                var range_y = max_y - min_y;
                var per_pixel_to_point_ratio_y = height / range_y ;
                var per_pixel_to_point_ratio_x = width / range_x ;

                function get_co_ordinate_x(value){
                    return (per_pixel_to_point_ratio_x * (value - mean + 4*standard_dev));
                }

                function get_co_ordinate_y(value){
                    return (height - 60*per_pixel_to_point_ratio_y * NormalDensityZx(value, mean, standard_dev ));
                }

                function plot_point(x_value, y_value, color){
                    context.beginPath();
                    context.moveTo(x_value, y_value);
                    context.arc(x_value, y_value , 5, 0, 2 * 3.14, false);
                    context.strokeStyle = color;
                    context.fillStyle = color;
                    context.fill();
                    context.lineWidth = 0;
                    context.stroke();
                    context.closePath();
                }

                // X and Y AXIS
                context.beginPath();
                context.strokeStyle = '#000';
                context.lineWidth = 2;
                context.moveTo(0, 0);
                context.lineTo(0,height);
                context.lineTo(width, height);
                context.stroke();

                // Mean value division line
                context.beginPath();
                context.moveTo(width/2, height);
                context.lineTo(width/2,40);
                context.lineWidth = 2;
                context.strokeStyle = '#aaa'
                context.stroke();
                
                //Markers on x-axis
                for (i = min_x + standard_dev ; i < max_x; i = i + standard_dev ){
                    if (i == mean){
                        context.fillText(mean.toFixed(2) + "%", get_co_ordinate_x(i) -15, height + 15);
                        context.fillText("Mean Percentage ...", get_co_ordinate_x(i) -55, height + 35 );
                    }
                    else{
                        context.beginPath();
                        context.moveTo(get_co_ordinate_x(i), height + 10);
                        context.lineTo(get_co_ordinate_x(i), height - 10);
                        context.lineWidth = 2;
                        context.strokeStyle = '#aaa'
                        context.stroke();
                    }
                }


                // Graph Plotting
                context.beginPath();
                context.moveTo(40, height);
                context.strokeStyle = 'orange';
                context.lineWidth = 2;

                for (i = min_x ; i < max_x; i++ ){
                    x =  get_co_ordinate_x(i);
                    y = get_co_ordinate_y(i);
                    context.lineTo(x,y);
                }
                context.stroke();

                canvas.addEventListener('mousemove', function(evt) {
                    check_and_show_pop_up(getMousePos(canvas, evt));
                }, false);


                var popup_shown = true;


                var previousPoint = null;

                function check_and_show_pop_up(event_xy){
                    if ($('#tooltip').length == 0){
                        $.each(points, function(index, value) {
                            x_true = Math.abs(value[0] - event_xy[0]) < 10
                            y_true = Math.abs(value[1] - event_xy[1]) < 10
                            if ( x_true && y_true  ){
                                showTooltip(value[0], value[1], value[2], value[3]);
                            }
                        });
                    }else{
                        x_out_of_range = Math.abs(event_xy[0] - $('#tooltip').attr("x")) > 10;
                        y_out_of_range = Math.abs(event_xy[1] - $('#tooltip').attr("y")) > 10;
                        if ( x_out_of_range || y_out_of_range  ){
                            $.each(points, function(index, value) {
                                x_true = Math.abs(value[0] - event_xy[0]) < 10
                                y_true = Math.abs(value[1] - event_xy[1]) < 10
                                if ( x_true && y_true  ){
                                    $("#tooltip").remove();
                                    showTooltip(value[0], value[1], value[2], value[3]);
                                }else{
                                    $("#tooltip").remove();
                                }
                            });
                        }
                    }
                }



                function showTooltip(x, y, proposer, content) {

                    var formattedMoney =  parseFloat(content.offer_amount).formatMoney(2, ',' , '.'); // "$3,543.76"

                    var tipHtml =  '<strong>Offer Amount - </strong>$' + formattedMoney;

                    tipHtml += '<br /><strong>Proposed By -</strong> '+ proposer;
                    tipHtml += '<br><strong>Accepted - </strong>' + (content.accepted ? 'Yes' : 'No');

                    if (content.accepted){
                        tipHtml +=  '<br><strong>Accepted Date - </strong>' + dateFormatString(content.accepted_date, "mm / dd / yyyy");
                    }

                    tipHtml +=  '<br><strong>Issue Date - </strong>' + dateFormatString(content.issue_date, "mm / dd / yyyy");

                    $('<div id="tooltip" x="'+ x +'" y="' + y + '">'+ tipHtml + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 10,
                        left: x + 70,
                        border: '2px solid #4572A7',
                        padding: '2px',
                        size: '10',
                        'background-color': '#fff',
                        opacity: 0.80
                    }).appendTo(".iChart3").fadeIn(200);
                }
            }

            var init = function() {

                //initialize the variable with values
                canvas = canvasElement.get(0);
                context = canvas.getContext('2d');
                canvasElement.addClass("chart-canvas");
                var mean = parseFloat(canvasElement.data("chart-mean"));
                var standard_dev = parseFloat(canvasElement.data("chart-standard-dev"));
                var array = [];        
                $.each(array, function(index, value) {
                    x_value = get_co_ordinate_x(value[0]);
                    y_value = get_co_ordinate_y(value[0]);
                    plot_point(x_value, y_value, 'red'); // green,blue
                    points.push([x_value, y_value, value[1], value[2]]);
                });
                
                if(isNaN(mean) || isNaN(standard_dev)){
                    alert("Mean or Standard Deviation is missing");   
                }
                else{
                    drawBellCurve(mean,standard_dev);    
                }
                

            };

            init();
        });
    };

}(jQuery));
