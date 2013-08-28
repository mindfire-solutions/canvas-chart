# canvas-chart

Use Canvas Chart  with rails aplication.

## Installation

This gem vendors jquery canvas chart for Rails 3.1 and greater. The files
will be added to the asset pipeline and available for you to use.

First add the following lines to your applications `Gemfile`:

``` ruby
gem 'canvas-chart'
```

Then run `bundle install` to update your application's bundle.

Now you need to edit your `app/assets/javascripts/application.js`
file and add the following line:

``` javascript
//= require jquery
//= require canvas-chart
```

And then edit your `app/assets/stylesheets/application.css` file to
look something like:

``` css
/*
 *= require_self
 *= require canvas-chart
 *= require_tree .
 */
```

## Usage

With the gem installed and included in your asset manifests, you can now
use fancybox as you normally would.

``` javascript
jQuery(function() {
  $("canvas.line-chart").lineChart();
});
```

If you're using [CoffeeScript](http://coffeescript.org/) you can use the
plugin in the same way.

```coffeescript
jQuery ->
  $("canvas.line-chart").lineChart()
```

## Sample Code for Using it 
```html
<body>
    <div class="line-chart-container">
        <table class="my-data-table">                     
            <tbody>
                <tr>
                    <th>Subject</th>
                    <th>Tution Fee($)</th>
                </tr>
                <tr>
                    <td style="color:#0DA068" class="">Math</td>
                    <td style="color:#0DA068" class="">1862.12</td>
                </tr>
                <tr>
                    <td style="color:#194E9C" class="highlight">History</td>
                    <td style="color:#194E9C" class="highlight">1316.00</td>
                </tr>
                <tr>
                    <td style="color:#5F91DC">English</td>
                    <td style="color:#5F91DC">100.00</td>
                </tr>
                <tr>
                    <td style="color:#000000">odia</td>
                    <td style="color:#000000">40</td>
                </tr>
            </tbody>

        </table>
    </div>
    <div class="line-chart-container">                    
        <canvas class="line-chart" height="500" width="650"                    
                data-chart-data-points='{ "x": 1790, "y": 3.9 }, 
                { "x": 1810, "y": 7.2 },
                { "x": 1970, "y": 203.2 },
                { "x": 1990, "y": 248.7 }, 
                { "x": 2010, "y": 308.7}'
                data-chart-title ="US Population Chart" 
                data-chart-x-label="Year"
                data-chart-y-label="Population (millions)" data-chart-label-font="19pt Arial" 
                data-chart-point-font="10pt Arial" data-chart-render-types="lines,points">
        </canvas>
    </div>
    <div class="line-chart-container">                    
        <canvas class="line-chart" height="500" width="650" data-chart-data-type="table"
                data-chart-data-table="line-chart-table"                   
                data-chart-title ="US Population Chart" 
                data-chart-x-label="Year"
                data-chart-y-label="Population (millions)" data-chart-label-font="19pt Arial" 
                data-chart-point-font="10pt Arial" data-chart-render-types="lines,points">
        </canvas>
        <table id="line-chart-table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Population (millions)</th>
                </tr>
            </thead>
            <tbody>                  
                <tr>
                    <td>1790</td> 
                    <td>3.9</td>
                </tr>
                <tr>
                    <td>1810</td> 
                    <td>7.2</td>
                </tr>                                       
                <tr>
                    <td>1970</td> 
                    <td>203.2</td>
                </tr>
                <tr>
                    <td>1990</td> 
                    <td>248.7</td>
                </tr>
                <tr>
                    <td>2010</td> 
                    <td>308.7</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="line-chart-container">                    
        <canvas class="bar-chart" height="500" width="650" 
                data-chart-data-points='{ "x": 1790, "y": 3.9 }, 
                { "x": 1810, "y": 7.2 },
                { "x": 1850, "y": 39.2 },
                { "x": 1900, "y": 100 },
                { "x": 1970, "y": 203.2 },
                { "x": 1990, "y": 248.7 }, 
                { "x": 2010, "y": 308.7}'                   
                data-chart-x-label="Year"                  
                data-chart-y-label="Population (millions)"
                data-chart-label-font="22pt Arial" >
        </canvas>
    </div>
     <div class="line-chart-container">                    
        <canvas class="bar-chart" height="500" width="650" data-chart-data-type="table"
                data-chart-data-table="bar-chart-table"                   
                data-chart-title ="US Population Chart" 
                data-chart-x-label="Year"
                data-chart-y-label="Population (millions)" 
                data-chart-label-font="19pt Arial">
        </canvas>
        <table id="bar-chart-table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Population (millions)</th>
                </tr>
            </thead>
            <tbody>                  
                <tr>
                    <td>1790</td> 
                    <td>3.9</td>
                </tr>
                <tr>
                    <td>1810</td> 
                    <td>7.2</td>
                </tr>  
                <tr>
                    <td>1850</td> 
                    <td>39.2</td>
                </tr>  
                <tr>
                    <td>1900</td> 
                    <td>100</td>
                </tr>  
                <tr>
                    <td>1970</td> 
                    <td>203.2</td>
                </tr>
                <tr>
                    <td>1990</td> 
                    <td>248.7</td>
                </tr>
                <tr>
                    <td>2010</td> 
                    <td>308.7</td>
                </tr>
            </tbody>
        </table>
    </div>
     <div class="line-chart-container">                    
        <canvas class="bell-curve" height="500" width="650"
                data-chart-mean="10" 
                data-chart-standard-dev="29">
        </canvas>
     </div>   
</body>
<script type="text/javascript">
	$(document).ready(function() {
		$(".my-data-table").pieChart();
		$(".line-chart").lineChart();
		$(".bar-chart").barChart();
		$(".bell-curve").bellCurve();
	});
</script>
```



## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


