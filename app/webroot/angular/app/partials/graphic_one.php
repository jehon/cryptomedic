<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "getcurrentFile().");
	t::setDefaultOption("readOnly");
?>
<fieldset>
	<legend>{{getVariableY()}} / {{getVariableX()}}</legend>
	<div class='markContainer'>
		<img ng-src="img/stats_{{getImageName()}}.jpg" width='600px' height='360px'>
<!-- 		<img ng-if="currentFile().Sex == 207" src='/amd/cryptomedic/img/graphics/weight-m.jpg' width='600px' height='360px'/>
		<img ng-if="currentFile().Sex == 208" src='/amd/cryptomedic/img/graphics/weight-f.jpg' width='600px' height='360px'/>
		<img ng-if="currentFile().Sex == 0"   src='/amd/cryptomedic/img/graphics/weight-u.jpg' width='600px' height='360px'/>
 -->	    <span ng-repeat="f in folder.getSubFiles()"
	        ng-if="getValidity($index) == 'v'"
	        ng-mouseover="hover($index)"
	    	ng-class="{ hovered: hovered == $index }"
	        class="mark"
	        style="left: {{getAbscisse($index)}}%; top: {{getOrdonnee($index)}}%"
	        >
		        <span id="stat_{{$index}}">+</span>
		    </span>
		</img>
	</div>
	<table class='colorize datalegend'>
	    <thead>
	        <th>Date</th>
	        <th>{{getVariableX()}}</th>
	        <th>{{getVariableY()}}</th>
	        <th>Validity</th>
	    </thead>
	    <tr ng-repeat="f in folder.getSubFiles()" tag="stat_{{$index}}"
	    	ng-mouseover="hover($index)"
	    	ng-class="{ hovered: hovered == $index }"
			>
	        <td>{{getValue($index, "Date")}}</td>
	        <td>{{getValue($index, getVariableX())}}</td>
	        <td>{{getValue($index, getVariableY())}}</td>
	        <td>{{getValidity($index)}}</td>
	    </tr>
	</table>
</fieldset>
