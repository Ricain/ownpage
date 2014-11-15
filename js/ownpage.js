/******************************************************************************
*                                                                             *
*    Ownpage - Your own homepage.                                             *
*    Copyright (C) 2014  Jean Mercadier <http://jmercadier.fr>                *
*                                                                             *
*    This program is free software: you can redistribute it and/or modify     *
*    it under the terms of the GNU General Public License as published by     *
*    the Free Software Foundation, either version 3 of the License, or        *
*    (at your option) any later version.                                      *
*                                                                             *
*    This program is distributed in the hope that it will be useful,          *
*    but WITHOUT ANY WARRANTY; without even the implied warranty of           *
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            *
*    GNU General Public License for more details.                             *
*                                                                             *
*    You should have received a copy of the GNU General Public License        *
*    along with this program.  If not, see:                                   *
*    <https://github.com/Ricain/ownpage/blob/master/LICENSE.md>.              *
*                                                                             *
*******************************************************************************/

$ownpage = {
	version: [2,2,'dev'],
	// Default urls, overwritted when custumized by user.
	urls : [
		[
			["Google",    "https://www.google.com/",   "#3b97e8"],
			["GitHub",    "https://github.com/",       "#e6a100"],
			["Twitter",   "https://twitter.com/",      "#465ca6"]
		],
		[
			["Owncloud",  "https://owncloud.org/",     "#c91271"],
			["Selfoss",   "http://selfoss.aditu.de/",  "#44b198"],
			["YouTube",   "https://www.youtube.com/",  "#c73535"]
		]
	],
	// Mem as memory. Save and load urls from local storage.
	mem : {
		load : function () {
			$ownpage.urls = JSON.parse(localStorage.getItem("urls"));
		},
		save : function () {
			localStorage.setItem("urls",JSON.stringify($ownpage.urls));
		}
	},
	// Clear all view in HTML.
	clear : function () {
		$("body").empty();
		$("<div id='googleBar'><FORM method=GET action='http://www.google.fr/search'><INPUT TYPE='text' name='q'><button class='boutonGoogle' name='btnG'>Recherche Google</button></FORM></div>").appendTo("body");
		$("<div id='center'><div id='marquespages'></div><div id='edition' style='display:none'></div></div>").appendTo("body");
		$("<div id='edit'></div><ul id='extra' class='extra'><a id='ownpage' href='https://github.com/Ricain/ownpage'>Ownpage</a></ul>").appendTo("body");
		$("#marquespages").hide();
		$ownpage.box.editor.hide();
		$("#edition").hide();
	},
	// Build the main view.
	draw : function (){

		$("#marquespages").empty();
		$("#marquespages").show();
		$.each($ownpage.urls,function($row,$range){
			$ligne = $("<div class='row'></div>");
			$.each($range,function($col,$box){
				$nb   = $row*3+$col+1;
				$cell = $("<a class='box' tabindex='" + $nb + "' href='" + $box[1] + "' id='t" + $row + $col + "'><span>" + $box[0] + "</span></a>");
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
		$ownpage.resize();
	},
	// Adjust components in function of the window height and width.
	resize : function() {
		$newidth   = 250;
		$newheight = 150;
		if($(window).width() - (($(window).width()*2/100)*$ownpage.urls[0].length*2) - $ownpage.urls[0].length*$newidth -100 < 0){
			$newidth = parseInt(($(window).width() - 100 - (($(window).width()*2/100)*$ownpage.urls[0].length*2))/$ownpage.urls[0].length);
		}
		if($(window).height() - 200 - (($(window).height()*2/100)*$ownpage.urls.length*2) - $ownpage.urls.length*$newheight <0){
			$newheight = parseInt(($(window).height() - 200 - (($(window).height()*2/100)*$ownpage.urls.length*2))/$ownpage.urls.length);
		}
		$(".box").css("width",$newidth + "px");
		$(".box_edit").css("width",$newidth + "px");
		$(".box").css("height",$newheight + "px");
		$(".box").css("line-height",$newheight + "px");
		$(".box_edit").css("height",$newheight + "px");
		//$("#center").css("margin-top", parseInt(($(window).height() - $("#center").height())/2 -15) + "px");
	},
	// Add number of clicks in bottom left corner.
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
	// Build the edit view.
	edit : function (){
		$("#edition").empty();
		$("#edition").show();
		$.each($ownpage.urls,function($row,$range){
			$ligne    = $("<div class='row'></div>");
			$.each($range,function($col,$box){
				$cell = $("<div class='box_edit'></div>");
				$cell.appendTo($ligne);
				$inom = $("<input type='text' placeholder='Name' value='" + $box[0] + "' />");
				$inom.change(function(){
					$ownpage.urls[$row][$col][0] = $(this).val();
					$ownpage.mem.save();
				});
				$inom.appendTo($cell);
				$ihref = $("<input type='text' placeholder='URL' value='" + $box[1] + "' />");
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
		$ownpage.resize();
	},
	// Everything about adding and removing a line or a column.
	box : {
		row : {
			add : function () {
				$nb = $ownpage.urls.length;
				$nb += 1;
				$("#row_count").html($nb);
				$new_row = [];
				$.each($ownpage.urls[0],function(){
					$new_row.push(["Ownpage", "https://github.com/Ricain/ownpage", "#363636"]);
				});
				$ownpage.urls.push($new_row);
				$ownpage.mem.save();
				$ownpage.clear();
				$ownpage.edit();
			},
			del : function () {
				$nb = $ownpage.urls.length;
				if($nb <= 1) return;
				$nb -= 1;
				$("#row_count").html($nb);
				$ownpage.urls.splice(-1,1);
				$ownpage.mem.save();
				$ownpage.clear();
				$ownpage.edit();
			}
		},
		col : {
			add : function () {
				$nb = $ownpage.urls[0].length;
				$nb += 1;
				$("#col_count").html($nb);
				$.each($ownpage.urls,function($i,$row){
					$row.push(["Ownpage", "https://github.com/Ricain/ownpage", "#363636"]);
				});
				$ownpage.mem.save();
				$ownpage.clear();
				$ownpage.edit();
				$ownpage.stat();
			},
			del : function () {
				$nb = $ownpage.urls[0].length;
				if($nb <= 1) return;
				$nb -= 1;
				$("#col_count").html($nb);
				$.each($ownpage.urls,function($i,$row){
					$row.splice(-1,1);
				});
				$ownpage.mem.save();
				$ownpage.clear();
				$ownpage.edit();
				$ownpage.stat();
			}
		},
		// Editor to show and hide columns and lines.
		editor : {
			show : function () {
				$editor = $("<div id='size_editor'></div>").appendTo("body");
				$("<span id='row_part'><table><tr><td id='add_row'>&#9650;</td></tr><tr><td id='del_row'>&#9660;</td></tr></table><span id='row_count'>" + $ownpage.urls.length + "</span></span>").appendTo($editor);
				$("#add_row").click($ownpage.box.row.add);
				$("#del_row").click($ownpage.box.row.del);
				$("<span> x </span>").appendTo($editor);
				$("<span id='col_part'><span id='col_count'>" + $ownpage.urls[0].length +  "</span><table><tr><td id='add_col'>&#9650;</td></tr><tr><td id='del_col'>&#9660;</td></tr></table></span>").appendTo($editor);
				$("#add_col").click($ownpage.box.col.add);
				$("#del_col").click($ownpage.box.col.del);
			},
			hide : function () {
				$("#size_editor").remove();
			}
		}
	},
	// Delete local storage.
	reset : function (ask) {
		ask = typeof ask !== 'undefined' ? ask : false;
		if(ask || confirm("This will erase all your links. Do you want to continue?")){
			localStorage.clear();
			location.reload();
		}
	},
	// Update data from local storage depending on version.
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
	// Initializes Ownpage.
	init : function (){
		if(window.location.hash == "#reset") $ownpage.reset();
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
		$(window).resize($ownpage.resize);
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
