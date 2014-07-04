/**
* Ownpage
* by Jean Mercadier - http://jmercadier.fr/
*
* License http://creativecommons.org/licenses/by/2.5/
* - Free for use in both personal and commercial projects
* - Attribution requires leaving author name, author link, and the license info intact
*/

$(document).ready(function () {
	if($(location).attr('hash') == "#clear"){
		if(confirm("Are you sure to erase your local data?\nSaves will be lost.")){
			localStorage.clear();
		}
		$(location).attr('hash',"")
	}

	var draw, edit, urls;

	try {
		if(!('localStorage' in window && window['localStorage'] !== null)){
			alert("Your browser does not support local storage (HTML5). :(");
			return;
		}
	} catch (e) {
		alert("Your browser does not support local storage (HTML5). :(");
		return;
	}
	if(localStorage.getItem("urls")){
		urls = JSON.parse(localStorage.getItem("urls"));
	}
	else {
		$.getJSON("ownpage.json",function($content){
			urls = $content["urls"];
			localStorage.setItem("urls", JSON.stringify($content["urls"]));
		});
	}

	draw = (function () {
		$("#edition").hide();
		$("#marquespages").empty();
		$("#marquespages").show();
		$.each(urls,function($row,$range){
			$ligne = $("<tr></tr>");
			$col = 0;
			$.each($range,function($nom,$cont){
				$cell = $("<td id='t" + $row + $col + "'>" + $nom + "</td>");
				$cell.click(function(){
					$(location).attr('href',$cont[0]);
				});
				$cell.css({ "background-color": $cont[1] });
				$cell.appendTo($ligne);
				$col += 1;
			});
			$ligne.appendTo("#marquespages");
		});
		$("#edit").html("EDIT");
		$("#edit").click(function(){
			edit.call(this);
		});
	});

	edit = (function () {
		$("#marquespages").hide();
		$("#edition").empty();
		$("#edition").show();
		$.each(urls,function($row,$range){
			$ligne = $("<tr></tr>");
			$col = 0;
			$.each($range,function($nom,$cont){
				$cell  = $("<td id='e" + $row + $col + "'></td>");
				$cell.appendTo($ligne);
				$inom  = $("<input type='text' placeholder='Name' value='" + $nom + "' />");
				$inom.change(function(){
					$old = urls[$row][$nom];
					alert($old.ID);
				});
				$inom.appendTo($cell);
				$ihref = $("<input type='text' placeholder='URL' value='" + $cont[0] + "' />");
				$ihref.change(function(){
					alert("coucou");
				});
				$ihref.appendTo($cell);
				$colpick = $("<div class='color-box'></div>");
				$colpick.colpick({
					colorScheme : 'light',
					layout      : 'rgbhex',
					color       : $cont[1],
					onSubmit:function(hsb,hex,rgb,el) {
						$(el).css('background-color', '#'+hex);
						$(el).colpickHide();
					}
				}).css('background-color', $cont[1]);
				$colpick.appendTo($cell);
				$col += 1;
			});
			$ligne.appendTo("#edition");
		});
		$("#edit").html("DONE");
		$("#edit").click(function(){
			draw.call(this);
		});
	});

	draw.call(this);
}).call(this);
