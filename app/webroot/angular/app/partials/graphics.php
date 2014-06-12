<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div id='headerContainer' class='headerContainer'></div>
<div align='center'>
    <table style='width: auto'>
        <tr>
            <td>
                <fieldset>
	                <legend>Weight</legend>
            		<img ng-if="currentFile().Sex == 207" id='stats_graph_weight' src='/amd/cryptomedic/img/graphics/weight-m.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":0,"vright":20,"vtop":89,"vbottom":2}' width='600px' height='360px'/>
                	<img ng-if="currentFile().Sex == 208" id='stats_graph_weight' src='/amd/cryptomedic/img/graphics/weight-f.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":0,"vright":20,"vtop":75,"vbottom":2}' width='600px' height='360px'/>
        			<img ng-if="currentFile().Sex == 0"   id='stats_graph_weight' src='/amd/cryptomedic/img/graphics/weight-u.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":0,"vright":20,"vtop":89,"vbottom":2}' width='600px' height='360px'/>
	                <table datafor='stats_graph_weight' class='colorize datalegend'>
                        <thead>
                            <th>Date</th>
                            <th>Age</th>
                            <th>Weight</th>
                            <th>Validity</th>
                        </thead>
	                </table>
            </fieldset>
            </td>
            <td><br/></td>
            <td>
                <fieldset>
	                <legend>Height</legend>
	    			<img ng-if="currentFile().Sex == 207" id='stats_graph_height' src='/amd/cryptomedic/img/graphics/height-m.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":0,"vright":20,"vtop":186,"vbottom":47}' width='600px' height='360px'/>
	    			<img ng-if="currentFile().Sex == 208" id='stats_graph_height' src='/amd/cryptomedic/img/graphics/height-f.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":0,"vright":20,"vtop":172,"vbottom":46}' width='600px' height='360px'/>
	            	<img ng-if="currentFile().Sex == 0"   id='stats_graph_height' src='/amd/cryptomedic/img/graphics/height-u.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":0,"vright":20,"vtop":186,"vbottom":46}' width='600px' height='360px'/>
	                <table datafor='stats_graph_height' class='colorize datalegend'>
                        <thead>
                            <th>Date</th>
                            <th>Age</th>
                            <th>Height</th>
                            <th>Validity</th>
                        </thead>
	                </table>
                </fieldset>
            </td>
            <td><br /></td>
        </tr>
        <tr>
            <td>
                <fieldset>
	                <legend>W/H</legend>
                	<img ng-if="currentFile().Sex == 207" id='stats_graph_wh' src='/amd/cryptomedic/img/graphics/wh-m.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":80,"vright":120,"vtop":26,"vbottom":10}' width='600px' height='360px'/>
                	<img ng-if="currentFile().Sex == 208" id='stats_graph_wh' src='/amd/cryptomedic/img/graphics/wh-f.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":80,"vright":120,"vtop":26,"vbottom":9 }' width='600px' height='360px'/>
                	<img ng-if="currentFile().Sex == 0"   id='stats_graph_wh' src='/amd/cryptomedic/img/graphics/wh-u.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":80,"vright":120,"vtop":26,"vbottom":9 }' width='600px' height='360px'/>
	                <table datafor='stats_graph_wh' class='colorize datalegend'>
                        <thead>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Heigth</th>
                            <th>Validity</th>
                        </thead>
	                </table>
                </fieldset>
            </td>
            <td><br /></td>
            <td>
                <fieldset>
	                <legend>BMI</legend>
                	<img ng-if="currentFile().Sex == 207" id='stats_graph_BMI' src='/amd/cryptomedic/img/graphics/bmi-m.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":2,"vright":20,"vtop":31,"vbottom":14}' width='600px' height='360px'/>
                	<img ng-if="currentFile().Sex == 208" id='stats_graph_BMI' src='/amd/cryptomedic/img/graphics/bmi-f.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":2,"vright":20,"vtop":32,"vbottom":13}' width='600px' height='360px'/>
                	<img ng-if="currentFile().Sex == 0"   id='stats_graph_BMI' src='/amd/cryptomedic/img/graphics/bmi-u.jpg' mymargins='{"top":0.05,"bottom":0.95,"left":0.03,"right":0.97,"vleft":2,"vright":20,"vtop":31,"vbottom":13}' width='600px' height='360px'/>
	                <table datafor='stats_graph_BMI' class='colorize datalegend'>
	                	<thead>
	                		<th>Date</th>
                            <th>Age</th>
                            <th>BMI</th>
                            <th>Validity</th>
	                	</thead>
	                </table>
                </fieldset>
            </td>
            <td><br /></td>
        </tr>
    </table>
</div>
