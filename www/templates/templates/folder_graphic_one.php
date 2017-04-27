<fieldset>
	<legend>{{getVariableY()}} / {{getVariableX()}}</legend>
	<div class='markContainer'>
		<img ng-src="/static/img/stats_{{getImageName()}}.jpg" width='100%'>
		    <span ng-repeat="f in folder.getFilesRelatedToPatient()"
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
	    <tr ng-repeat="f in folder.getFilesRelatedToPatient()" tag="stat_{{$index}}"
	    	ng-mouseover="hover($index)"
	    	ng-class="{ hovered: hovered == $index }"
	    	ng-click="go('/folder/' + folder.id + '/file/' + folder.getSubFile($index).getModel() + '/' + folder.getSubFile($index).id)"
			>
	        <td>{{getValue($index, "Date") }}</td>
	        <td>{{getValue($index, getVariableX()) | number:0}}</td>
	        <td>{{getValue($index, getVariableY()) | number:0}}</td>
	        <td>{{getValidity($index)}}</td>
	    </tr>
	</table>
</fieldset>
