/*
 Document   : jquery.canvasBarChat.js
 Created on : 27 May, 2013, 6:57:48 PM
 Author     : hareror
 Description: Plugin for draw bar chart using canvas
 
 */
(function($) {

    $.fn.barChart = function() {

        this.each(function(elementIndex) {

            var dataPoints;
            var dataPointsTable;
            var chartDataType;
            var canvasElement = $(this);
            var canvas;
            var context;
            // chart properties
            var cWidth, cHeight, cMargin, cSpace;
            var cMarginSpace, cMarginHeight;
            // bar properties
            var bWidth, bMargin, totalBars, maxDataValue;
            var bWidthMargin;
            // bar animation
            var ctr, numctr, speed;
            // axis property
            var totLabelsOnYAxis;
            var yLabel;
            var xLabel;
            var labelFont;

            // initialize the chart and bar values
            var chartSettings = function() {
                // chart properties
                cMargin = 25;
                cSpace = 60;
                cHeight = canvas.height - 2 * cMargin - cSpace;
                cWidth = canvas.width - 2 * cMargin - cSpace;
                cMarginSpace = cMargin + cSpace;
                cMarginHeight = cMargin + cHeight;
                // bar properties
                bMargin = 15;
                totalBars = dataPoints.length;
                bWidth = (cWidth / totalBars) - bMargin;


                // find maximum value to plot on chart
                maxDataValue = 0;
                for (var i = 0; i < totalBars; i++) {
                    var arrVal = dataPoints[i];
                    var barVal = parseInt(arrVal.y);
                    if (parseInt(barVal) > parseInt(maxDataValue))
                        maxDataValue = barVal;
                }

                totLabelsOnYAxis = 10;
                context.font = "10pt Garamond";

                // initialize Animation variables
                ctr = 0;
                numctr = 100;
                speed = 10;
            };

            // draw chart axis, labels and markers
            var drawAxisLabelMarkers = function() {
                context.lineWidth = "2.0";
                // draw y axis
                drawAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
                // draw x axis
                drawAxis(cMarginSpace, cMarginHeight, cMarginSpace + cWidth, cMarginHeight);
                context.lineWidth = "1.0";
                drawMarkers();
            };

            // draw X and Y axis
            var drawAxis = function(x, y, X, Y) {
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(X, Y);
                context.closePath();
                context.stroke();
            };

            // draw chart markers on X and Y Axis
            var drawMarkers = function() {
                var numMarkers = parseInt(maxDataValue / totLabelsOnYAxis);
                context.textAlign = "right";
                context.fillStyle = "#000";
                ;

                // Y Axis
                for (var i = 0; i <= totLabelsOnYAxis; i++) {
                    markerVal = i * numMarkers;
                    markerValHt = i * numMarkers * cHeight;
                    var xMarkers = cMarginSpace - 5;
                    var yMarkers = cMarginHeight - (markerValHt / maxDataValue);
                    context.fillText(markerVal, xMarkers, yMarkers, cSpace);
                }

                // X Axis
                context.textAlign = 'center';
                for (var i = 0; i < totalBars; i++) {
                    arrval = dataPoints[i];
                    name = arrval.x;

                    markerXPos = cMarginSpace + bMargin + (i * (bWidth + bMargin)) + (bWidth / 2);
                    markerYPos = cMarginHeight + 10;
                    context.fillText(name, markerXPos, markerYPos, bWidth);
                }

                context.save();

                // Add Y Axis title
                labelFont = (labelFont != null) ? labelFont : '20pt Arial';
                context.font = labelFont;

                context.translate(cMargin + 10, cHeight / 2);
                context.rotate(Math.PI * -90 / 180);
                context.fillText(yLabel, 0, 0);

                context.restore();

                // Add X Axis Title
                labelFont = (labelFont != null) ? labelFont : '20pt Arial';
                context.font = labelFont;
                context.fillText(xLabel, cMarginSpace + (cWidth / 2), cMarginHeight + 30);
            };

            var drawChartWithAnimation = function() {
                // Loop through the total bars and draw
                for (var i = 0; i < totalBars; i++) {
                    var arrVal = dataPoints[i];
                    bVal = parseInt(arrVal.y);
                    bHt = (bVal * cHeight / maxDataValue) / numctr * ctr;
                    bX = cMarginSpace + (i * (bWidth + bMargin)) + bMargin;
                    bY = cMarginHeight - bHt - 2;
                    drawRectangle(bX, bY, bWidth, bHt, true);
                }

                // timeout runs and checks if bars have reached the desired height
                // if not, keep growing
                if (ctr < numctr) {
                    ctr = ctr + 1;
                    setTimeout(arguments.callee, speed);
                }
            };

            var drawRectangle = function(x, y, w, h, fill) {
                context.beginPath();
                context.rect(x, y, w, h);
                context.closePath();
                context.stroke();

                if (fill) {
                    var gradient = context.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'green');
                    gradient.addColorStop(1, 'rgba(67,203,36,.15)');
                    context.fillStyle = gradient;
                    context.strokeStyle = gradient;
                    context.fill();
                }
            };

            var init = function() {

                //initialize the variable with values                                
                canvas = canvasElement.get(0);
                context = canvas.getContext('2d');
                canvasElement.addClass("chart-canvas");
                labelFont = canvasElement.data("chart-label-font");
                xLabel = canvasElement.data("chart-x-label");
                yLabel = canvasElement.data("chart-y-label");

                chartDataType = canvasElement.data("chart-data-type");

                if (chartDataType == null || chartDataType == undefined) {
                    dataPoints = $.parseJSON('[' + canvasElement.data("chart-data-points") + ']');
                }
                else {

                    dataPointsTable = $("#" + canvasElement.data("chart-data-table"));
                    dataPointsTable.addClass("chart-data-table");
                    var currentRow = -1;
                    var currentCell = 0;
                    // Get a drawing context                    
                    dataPoints = []
                    var temp = [];
                    dataPointsTable.find("td").each(function() {

                        currentCell++;
                        if (currentCell % 2 != 0) {
                            currentRow++;
                            temp[0] = parseFloat($(this).text());
                        } else {
                            var value = parseFloat($(this).text());
                            temp[1] = value;
                            dataPoints.push({x: temp[0], y: temp[1]});
                        }
                    });

                }

                chartSettings();
                drawAxisLabelMarkers();
                drawChartWithAnimation();
            };

            init();

        });
    };

}(jQuery));