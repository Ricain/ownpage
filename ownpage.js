/**
* Ownpage
* by Jean Mercadier - http://jmercadier.fr/
*
* License http://creativecommons.org/licenses/by/2.5/
* - Free for use in both personal and commercial projects
* - Attribution requires leaving author name, author link, and the license info intact
*/

$ownpage = {
	version: [2,0,'dev'],
	// urls : [
	// 	{
	// 		"Google":    ["https://www.google.com/",   "#3b97e8"],
	// 		"GitHub":    ["https://github.com/",       "#d4a20c"],
	// 		"Facebook":  ["https://www.facebook.com/", "#006699"],
	// 	},
	// 	{
	// 		"localhost": ["http://localhost/",         "#843fb2"],
	// 		"Selfoss":   ["http://selfoss.aditu.de/",  "#44b198"],
	// 		"YouTube":   ["https://www.youtube.com/",  "#c73535"]
	// 	},
	// 	{
	// 		"Gmail":     ["https://mail.google.com/",  "#ff7146"],
	// 		"Twitter":   ["https://twitter.com/",      "#b23f82"],
	// 		"Owncloud":  ["https://owncloud.org/",     "#42b13e"]
	// 	}
	// ],
	urls : [
		[
			["Google",   "https://www.google.com/",   "#3b97e8"],
			["GitHub",   "https://github.com/",       "#d4a20c"],
			["Facebook", "https://www.facebook.com/", "#006699"],
		],
		[
			["localhost", "http://localhost/",        "#843fb2"],
			["Selfoss", "http://selfoss.aditu.de/",   "#44b198"],
			["YouTube", "https://www.youtube.com/",   "#c73535"]
		],
		[
			["Gmail",    "https://mail.google.com/",  "#ff7146"],
			["Twitter",  "https://twitter.com/",      "#b23f82"],
			["Owncloud", "https://owncloud.org/",     "#42b13e"]
		]
	],
	mem : {
		load : function () {
			$ownpage.urls = JSON.parse(localStorage.getItem("urls"));
		},
		save : function () {
			localStorage.setItem("urls",JSON.stringify($ownpage.urls));
		}
	},
	clear : function () {
		$("body").empty();
		$("<div id='center'><table id='marquespages'></table><table id='edition' style='display:none'></table></div><div id='edit'></div><ul id='extra' class='extra'><a id='ownpage' href='https://github.com/Ricain/ownpage'>Ownpage</a></ul>").appendTo("body");
		$("#marquespages").hide();
		$ownpage.box.editor.hide();
		$("#edition").hide();
	},
	draw : function (){
		$("#marquespages").empty();
		$("#marquespages").show();
		$.each($ownpage.urls,function($row,$range){
			$ligne = $("<tr></tr>");
			$.each($range,function($col,$box){
				$nb   = $row*3+$col+1;
				$cell = $("<a tabindex='" + $nb + "' href='" + $box[1] + "' id='t" + $row + $col + "'>" + $box[0] + "</a>");
				$cell.click(function(e){
					e.preventDefault();
					if(!localStorage.getItem("click") || localStorage.getItem("click")=="NaN"){
						localStorage.setItem("click",1);
					}
					else {
						localStorage.setItem("click",parseInt(localStorage.getItem("click"))+1);
					}
					$(location).attr('href',$box[1]);
				});
				$cell.css({ "background-color": $box[2] });
				$cell.appendTo($ligne);
			});
			$ligne.appendTo("#marquespages");
		});
		$("#reset").remove();
		$("#edit").html("EDIT");
		$("#edit").off('click');
		$("#edit").click(function(){
			$("#marquespages").hide();
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
			$("#stat").html("You clicked " + $nb_click + " times on your own links.\nNice job! :)");
		}
	},
	edit : function (){
		$("#edition").empty();
		$("#edition").show();
		$.each($ownpage.urls,function($row,$range){
			$ligne    = $("<tr></tr>");
			$inputnom = [[],[],[]];
			$inputurl = [[],[],[]];
			$.each($range,function($col,$box){
				$cell = $("<td id='e" + $row + $col + "'></td>");
				$cell.appendTo($ligne);
				$inom = $("<input type='text' placeholder='Name' value='" + $box[0] + "' />");
				$inputnom[$row][$col] = $inom;
				$inom.change(function(){
					$ownpage.urls[$row][$col][0] = $(this).val();
					$ownpage.mem.save();
				});
				$inom.appendTo($cell);
				$ihref = $("<input type='text' placeholder='URL' value='" + $box[1] + "' />");
				$inputurl[$row][$col] = $ihref;
				$ihref.change(function(){
					$ownpage.urls[$row][$col][1] = $(this).val();
					$ownpage.mem.save();
				});
				$ihref.appendTo($cell);
				$colpick = $("<div class='color-box'></div>");
				$colpick.colpick({
					colorScheme : 'light',
					layout      : 'rgbhex',
					color       : $box[2],
					onSubmit:function(hsb,hex,rgb,el) {
						$(el).css('background-color','#'+hex);
						$(el).colpickHide();
						$ownpage.urls[$row][$col][2] = '#'+hex;
						$ownpage.mem.save();
					}
				}).css('background-color', $box[2]);
				$colpick.appendTo($cell);
			});
			$ligne.appendTo("#edition");
		});
		$ownpage.box.editor.show();
		$reset = $("<a href='#reset' id='reset' class='reset'>reset</a>");
		$reset.click(function (e){
			e.preventDefault();
			$ownpage.reset();
		});
		$reset.appendTo("#extra");
		$("#edit").html("DONE");
		$("#edit").off('click');
		$("#edit").click(function(){
			$ownpage.box.editor.hide();
			$("#edition").hide();
			$ownpage.draw();
		});
	},
	box : {
		row : {
			add : function () {
				$nb = parseInt($("#row_count").contents().text());
				$nb += 1;
				$("#row_count").html($nb);
			},
			del : function () {
				$nb = parseInt($("#row_count").contents().text());
				$nb -= 1;
				$("#row_count").html($nb);
			}
		},
		col : {
			add : function () {
				$nb = parseInt($("#col_count").contents().text());
				$nb += 1;
				$("#col_count").html($nb);
				$.each($ownpage.urls,function($i,$row){
					$row["TEST"] = ["https://www.youtube.com/",  "#c73535"];
				});
				$ownpage.mem.save();
				$ownpage.clear();
				$ownpage.edit();
			},
			del : function () {
				$nb = parseInt($("#col_count").contents().text());
				$nb -= 1;
				$("#col_count").html($nb);
				$.each($ownpage.urls,function($i,$row){
					pop($row);
				});
				$ownpage.mem.save();
				$ownpage.clear();
				$ownpage.edit();
			}
		},
		editor : {
			show : function () {
				$editor = $("<div id='size_editor'></div>").appendTo("body");
				$("<span id='row_part'><table><tr><td id='add_row'>+</td></tr><tr><td id='del_row'>-</td></tr></table><span id='row_count'>3</span></span>").appendTo($editor);
				$("#add_row").click($ownpage.box.row.add);
				$("#del_row").click($ownpage.box.row.del);
				$("<span> x </span>").appendTo($editor);
				$("<span id='col_part'><span id='col_count'>3</span><table><tr><td id='add_col'>+</td></tr><tr><td id='del_col'>-</td></tr></table></span>").appendTo($editor);
				$("#add_col").click($ownpage.box.col.add);
				$("#del_col").click($ownpage.box.col.del);
			},
			hide : function () {
				$("#size_editor").remove();
			}
		}
	},
	reset : function (ask) {
		ask = typeof ask !== 'undefined' ? ask : false;
		if(ask || confirm("This will erase all your links. Do you want to continue?")){
			localStorage.clear();
			location.reload();
		}
	},
	update : function () {
		$old = localStorage.getItem("version").split('.');
		if ($old[0] === ''){
			$old = [0];
			$odd = [0];
		}
		$old[0] = parseInt($old[0]);
		$old[1] = parseInt($old[1]);
		if ($old[0]==$ownpage.version[0] && $old[1]==$ownpage.version[1]) return false;
		if ($old[0]>$ownpage.version[0] ||  ($old[0]==$ownpage.version[0] && $old[1]>$ownpage.version[1])) {
			if(confirm("Your version of ownpage is to recent.\nDo you want to erase your data to make it work?")){
				$ownpage.reset(true);
				return true;
			}
			else {
				exit();
			}
		}
		if($old[0]<2){
			$newurl = [];
			$.each($ownpage.urls,function(l,ligne){
				$nligne = [];
				$.each(ligne,function(c,col){
					$nligne.push([c, col[0], col[1]]);
				});
				$newurl.push($nligne);
			});
			$ownpage.urls = $newurl;
		}
		// update future
		return true;
	},
	init : function (){
		if ($ownpage.version[2]!="stable") $(document).prop('title', 'Ownpage [' + $ownpage.version[2] + ']');
		if (localStorage.getItem("version") && localStorage.getItem("urls")) {
			$ownpage.mem.load();
			$ownpage.update();
		}
		localStorage.setItem("version",$ownpage.version[0].toString() + '.' + $ownpage.version[1].toString());
		$ownpage.mem.save();
		$ownpage.clear();
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
