/**
* Ownpage
* by Jean Mercadier - http://jmercadier.fr/
*
* License http://creativecommons.org/licenses/by/2.5/
* - Free for use in both personal and commercial projects
* - Attribution requires leaving author name, author link, and the license info intact
*/

$ownpage = {
	urls : [
		{
			"Google":    ["https://www.google.com/",   "#3b97e8"],
			"GitHub":    ["https://github.com/",       "#d4a20c"],
			"Facebook":  ["https://www.facebook.com/", "#006699"]
		},
		{
			"localhost": ["http://localhost/",         "#843fb2"],
			"Selfoss":   ["http://selfoss.aditu.de/",  "#44b198"],
			"YouTube":   ["https://www.youtube.com/",  "#c73535"]
		},
		{
			"Gmail":     ["https://mail.google.com/",  "#ff7146"],
			"Twitter":   ["https://twitter.com/",      "#b23f82"],
			"Owncloud":  ["https://owncloud.org/",     "#42b13e"]
		}
	],
	draw : function (){
		$("#edition").hide();
		$("#marquespages").empty();
		$("#marquespages").show();
		$.each($ownpage.urls,function($row,$range){
			$ligne = $("<tr></tr>");
			$col = 0;
			$.each($range,function($nom,$cont){
				$nb   = $row*3+$col+1;
				$cell = $("<a tabindex='" + $nb + "' href='" + $cont[0] + "' id='t" + $row + $col + "'>" + $nom + "</a>");
				$cell.click(function(e){
					e.preventDefault();
					if(!localStorage.getItem("click") || localStorage.getItem("click")=="NaN"){
						localStorage.setItem("click",1);
					}
					else {
						localStorage.setItem("click",parseInt(localStorage.getItem("click"))+1);
					}
					$(location).attr('href',$cont[0]);
				});
				$cell.css({ "background-color": $cont[1] });
				$cell.appendTo($ligne);
				$col += 1;
			});
			$ligne.appendTo("#marquespages");
		});
		$("#edit").html("EDIT");
		$("#edit").off('click');
		$("#edit").click(function(){
			$ownpage.edit();
		});
	},
	stat : function (){
		if(!localStorage.getItem("click") || localStorage.getItem("click")=="NaN"){
			return;
		}
		$nb_click = localStorage.getItem("click");
		if(!$("#stat").length){
			$count = $("<a id='stat' href='#'>" + $nb_click + " clicks</a>");
			$count.click(function(e){
				e.preventDefault();
				alert("You clicked " + $nb_click + " time on your own links.\nNice job! :)");
			});
			$count.appendTo("#extra");
		}
		else {
			$("#stat").html("You clicked " + $nb_click + " time on your own links.\nNice job! :)");
		}
	},
	edit : function (){
		$("#marquespages").hide();
		$("#edition").empty();
		$("#edition").show();
		$.each($ownpage.urls,function($row,$range){
			$ligne    = $("<tr></tr>");
			$col      = 0;
			$inputnom = [[],[],[]];
			$inputurl = [[],[],[]];
			$.each($range,function($nom,$cont){
				$cell = $("<td id='e" + $row + $col + "'></td>");
				$cell.appendTo($ligne);
				$inom = $("<input type='text' placeholder='Name' value='" + $nom + "' />");
				$inputnom[$row][$col] = $inom;
				$inom.change(function(){
					surls         = JSON.stringify($ownpage.urls);
					surls         = surls.replace("\"" + $nom + "\":", "\"" + $(this).val() + "\":");
					$ownpage.urls = JSON.parse(surls);
					$nom          = $(this).val();
					localStorage.setItem("urls",surls);
				});
				$inom.appendTo($cell);
				$ihref = $("<input type='text' placeholder='URL' value='" + $cont[0] + "' />");
				$inputurl[$row][$col] = $ihref;
				$ihref.change(function(){
					$ownpage.urls[$row][$nom][0] = $(this).val();
					localStorage.setItem("urls",JSON.stringify($ownpage.urls));
				});
				$ihref.appendTo($cell);
				$colpick = $("<div class='color-box'></div>");
				$colpick.colpick({
					colorScheme : 'light',
					layout      : 'rgbhex',
					color       : $cont[1],
					onSubmit:function(hsb,hex,rgb,el) {
						$(el).css('background-color','#'+hex);
						$(el).colpickHide();
						$ownpage.urls[$row][$nom][1] = '#'+hex;
						localStorage.setItem("urls",JSON.stringify($ownpage.urls));
					}
				}).css('background-color', $cont[1]);
				$colpick.appendTo($cell);
				$col += 1;
			});
			$ligne.appendTo("#edition");
		});
		$("#edit").html("DONE");
		$("#edit").off('click');
		$("#edit").click(function(){
			$ownpage.draw();
		});
	},
	init : function (){
		if($(location).attr('hash') == "#clear"){
			if(confirm("Are you sure to erase your local data?\nSaves will be lost.\n(You need internet for this)")){
				localStorage.clear();
			}
			$(location).attr('hash',"");
		}
		if(localStorage.getItem("urls")){
			$ownpage.urls = JSON.parse(localStorage.getItem("urls"));
		}
		else {
			localStorage.setItem("urls",JSON.stringify($ownpage.urls));
		}
		$ownpage.draw();
		$ownpage.stat();
	}
};

$(document).ready(function () {
	try {
		if(!('localStorage' in window && window.localStorage !== null)){
			alert("Your browser does not support local storage (HTML5). :(");
			return;
		}
	}
	catch (e) {
		alert("Your browser does not support local storage (HTML5). :(");
		return;
	}
	$ownpage.init();
});
