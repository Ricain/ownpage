/**
* Ownpage
* by Jean Mercadier - http://jmercadier.fr/
*
* License http://creativecommons.org/licenses/by/2.5/
* - Free for use in both personal and commercial projects
* - Attribution requires leaving author name, author link, and the license info intact
*/

(function () {
	var draw, edit;

	draw = (function () {
		$.getJSON("ownpage.json",function($pages){
			$("#edition").hide();
			$("#marquespages").empty();
			$("#marquespages").show();
			$.each($pages,function($i,$range){
				$ligne = $("<tr></tr>");
				$j = 0;
				$.each($range,function($nom,$cont){
					$cell = $("<td id='t" + $i + $j + "'>" + $nom + "</td>");
					$cell.click(function(){
						$(location).attr('href',$cont[0]);
					});
					$cell.css({ "background-color": $cont[1] });
					$cell.appendTo($ligne);
					$j += 1;
				});
				$ligne.appendTo("#marquespages");
			});
			$("#edit").html("EDIT");
			$("#edit").click(function(){
				edit.call(this);
			});
		});
	});

	edit = (function () {
		$.getJSON("ownpage.json",function($pages){
			$("#marquespages").hide();
			$("#edition").empty();
			$("#edition").show();
			$.each($pages,function($i,$range){
				$ligne = $("<tr></tr>");
				$j = 0;
				$.each($range,function($nom,$cont){
					$cell  = $("<td id='e" + $i + $j + "'></td>");
					$cell.appendTo($ligne);
					$inom  = $("<input type='text' value='" + $nom + "' />");
					$inom.change(function(){
						alert("coucou");
					});
					$inom.appendTo($cell);
					$ihref = $("<input type='text' value='" + $cont[0] + "' />");
					$ihref.change(function(){
						alert("coucou");
					});
					$ihref.appendTo($cell);
					$j += 1;
				});
				$ligne.appendTo("#edition");
			});
			$("#edit").html("DONE");
			$("#edit").click(function(){
				draw.call(this);
			});
		});
		// $("#marquespages td").css({
		// 	"background-color": "white",
		// 	"border": "3px dashed #3a3a3a",
		// 	"color": "#3a3a3a"
		// });
	});

	draw.call(this);
}).call(this);
