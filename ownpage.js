/**
* Ownpage
* by Jean Mercadier - http://jmercadier.fr/
*
* @license http://creativecommons.org/licenses/by/2.5/
* - Free for use in both personal and commercial projects
* - Attribution requires leaving author name, author link, and the license info intact
*/

$(document).ready(function() {
	$editing = false;
	$.getJSON("ownpage.json",function($pages){
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
		$edit = $("<div id='edit'>EDIT</div>");
		$edit.click(function(){
			if($editing){
				$editing = false;
				$edit.html("EDIT");
			}
			else {
				$editing = true;
				$edit.html("DONE");
			}
		});
		$edit.appendTo("body");
	});
});
