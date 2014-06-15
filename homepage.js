$(document).ready(function() {
	$.getJSON("homepage.json",function($pages){
		$("#marquespages").empty();
		$.each($pages,function($i,$range){
			$ligne = $("<tr></tr>");
			$.each($range,function($nom,$cont){
				$cell = $("<td>" + $nom + "</td>");
				$cell.click(function(){
					$(location).attr('href',$cont[0]);
				});
				$cell.css({ "background-color": $cont[1] });
				$cell.appendTo($ligne);
			});
			$ligne.appendTo("#marquespages");
		});
	});
});
