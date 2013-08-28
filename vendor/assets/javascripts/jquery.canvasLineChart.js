/*
 Document   : jquery.canvasLineChat.js
 Created on : 1 May, 2013, 3:50:48 PM
 Author     : hareror
 Description: Plugin for draw line chart using canvas
 
 */
(function($) {

    $.fn.lineChart = function() {

        this.each(function(elementIndex) {

            var margin = {top: 40, left: 75, right: 0, bottom: 75};
            var maxYValue = 0;
            var ratio = 0;
            var data;
            var chartHeight;
            var chartWidth;
            var xMax;
            var yMax;
            var ratio;
            var canvasElement = $(this);
            var canvas;
            var title, xLabel, yLabel, labelFont, dataPointFont;
            var dataPoints;
            var dataPointsTable;
            var chartDataType;
            var dataRenderTypes;
            var context;
            var renderType = {lines: 'lines', points: 'points'};

            var renderChart = function() {

                renderBackground();
                renderText();
                renderLinesAndLabels();

                //render data based upon type of renderType(s) that client supplies
                if (dataRenderTypes == undefined || dataRenderTypes == null)
                    dataRenderTypes = [renderType.lines];
                for (var i = 0; i < dataRenderTypes.length; i++) {
                    renderData(dataRenderTypes[i]);
                }

            };

            var getMaxDataYValue = function() {
                for (var i = 0; i < dataPoints.length; i++) {
                    if (dataPoints[i].y > maxYValue)
                        maxYValue = dataPoints[i].y;
                }               
            };

            var renderBackground = function() {

                var lingrad = context.createLinearGradient(margin.left, margin.top,
                        xMax - margin.right, yMax);
                lingrad.addColorStop(0.0, '#D4D4D4');
                lingrad.addColorStop(0.2, '#fff');
                lingrad.addColorStop(0.8, '#fff');
                lingrad.addColorStop(1, '#D4D4D4');
                context.fillStyle = lingrad;
                context.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
                context.fillStyle = 'black';
            };

            var renderText = function() {

                labelFont = (labelFont != null) ? labelFont : '20pt Arial';
                context.font = labelFont;
                context.textAlign = "center";

                //Title
                var txtSize = context.measureText(title);
                context.fillText(title, (chartWidth / 2), (margin.top / 2));

                //X-axis text
                txtSize = context.measureText(xLabel);
                context.fillText(xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

                //Y-axis text
                context.save();
                context.rotate(-Math.PI / 2);
                context.font = labelFont;
                context.fillText(yLabel, (yMax / 2) * -1, margin.left / 4);
                context.restore();
            };

            var renderLinesAndLabels = function() {
                //Vertical guide lines
                var yInc = yMax / dataPoints.length;
                var yPos = 0;
                var yLabelInc = (maxYValue * ratio) / dataPoints.length;
                var xInc = getXInc();
                var xPos = margin.left;
                for (var i = 0; i < dataPoints.length; i++) {
                    yPos += (i == 0) ? margin.top : yInc;
                    //Draw horizontal lines
                    drawLine(margin.left, yPos, xMax, yPos, '#E8E8E8');

                    //y axis labels
                    context.font = (dataPointFont != null) ? dataPointFont : '10pt Calibri';
                    var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
                    var txtSize = context.measureText(txt);
                    context.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);

                    //x axis labels
                    txt = dataPoints[i].x;
                    txtSize = context.measureText(txt);
                    context.fillText(txt, xPos, yMax + (margin.bottom / 3));
                    xPos += xInc;
                }

                //Vertical line
                drawLine(margin.left, margin.top, margin.left, yMax, 'black');

                //Horizontal Line
                drawLine(margin.left, yMax, xMax, yMax, 'black');
            };

            var renderData = function(type) {
                var xInc = getXInc();
                var prevX = 0,
                        prevY = 0;

                for (var i = 0; i < dataPoints.length; i++) {
                    var pt = dataPoints[i];
                    var ptY = (maxYValue - pt.y) * ratio;
                    if (ptY < margin.top)
                        ptY = margin.top;
                    var ptX = (i * xInc) + margin.left;

                    if (i > 0 && type == renderType.lines) {
                        //Draw connecting lines
                        drawLine(ptX, ptY, prevX, prevY, 'black', 2);
                    }

                    if (type == renderType.points) {
                        var radgrad = context.createRadialGradient(ptX, ptY, 8, ptX - 5, ptY - 5, 0);
                        radgrad.addColorStop(0, 'Green');
                        radgrad.addColorStop(0.9, 'White');
                        context.beginPath();
                        context.fillStyle = radgrad;
                        //Render circle
                        context.arc(ptX, ptY, 8, 0, 2 * Math.PI, false)
                        context.fill();
                        context.lineWidth = 1;
                        context.strokeStyle = '#000';
                        context.stroke();
                        context.closePath();
                    }

                    prevX = ptX;
                    prevY = ptY;
                }
            };

            var getXInc = function() {
                return Math.round(xMax / dataPoints.length) - 1;
            };

            var drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
                if (strokeStyle != null)
                    context.strokeStyle = strokeStyle;
                if (lineWidth != null)
                    context.lineWidth = lineWidth;
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(endX, endY);
                context.stroke();
                context.closePath();
            };

            var init = function() {

                //initialize the variable with values                                                
                canvas = canvasElement.get(0);
                context = canvas.getContext('2d');
                canvasElement.addClass("chart-canvas");
                title = canvasElement.data("chart-title");
                xLabel = canvasElement.data("chart-x-label");
                yLabel = canvasElement.data("chart-y-label");
                labelFont = canvasElement.data("chart-label-font");
                dataPointFont = canvasElement.data("chart-point-font");
                dataRenderTypes = canvasElement.data("chart-render-types").split(",");
                chartHeight = canvas.getAttribute('height');
                chartWidth = canvas.getAttribute('width');
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
                            dataPoints.push({x:temp[0], y:temp[1]});
                        }
                    });

                }               
                
                getMaxDataYValue();

                xMax = chartWidth - (margin.left + margin.right);
                yMax = chartHeight - (margin.top + margin.bottom);
                ratio = yMax / maxYValue;

                renderChart();
            };

            init();

        });

    };

})(jQuery);