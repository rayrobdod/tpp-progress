function toggleSetting(e){var t=e.id;settings[t]=e.checked,localStorage.setItem("settings",JSON.stringify(settings)),$.when((baseSettings[t].extraAction||function(){})()).always(updatePage)}function toggleGroup(e){var t=e.id.split("-").pop(),n=e.checked;showGroups[t]=n,localStorage.setItem("showGroups",JSON.stringify(showGroups)),$("."+t.replace(/[^A-Z0-9]/gi,"")).toggleClass("hidden",!n),updatePage()}function SerializeQueryString(){return Object.keys(QueryString).filter(function(e){return QueryString[e]}).length?"?"+Object.keys(QueryString).filter(function(e){return QueryString[e]}).map(function(e){return e+("true"==QueryString[e]?"":"="+encodeURI(QueryString[e]))}).join("&"):""}function updateGroups(){if(groups&&groupList){var e=$find([groupList],"input").pop().map(function(e){return e.id.split("-").pop()})||[];Object.keys(groups).filter(function(t){return e.indexOf(t)<0}).forEach(function(e){var t=document.createElement("li"),n=document.createElement("input"),o=document.createElement("label");t.appendChild(n),t.appendChild(o),groupList.appendChild(t),n.type="checkbox",o.htmlFor=n.id="group-"+e,n.checked=showGroups[e]!==!1,o.innerText=groups[e],n.onchange=function(){return toggleGroup(n)}})}}function icon(e,t,n){var o=document.createElement("i");return o.classList.add("fa",e),o.title=t,n&&(o.onclick=n),o}function listControl(e,t){var n=document.createElement("li");n.appendChild(icon(e,t));var o=document.createElement("ul");return n.appendChild(o),{controlElement:n,listElement:o}}function qsListMenu(e,t,n,o,r,a){void 0===r&&(r="All"),void 0===a&&(a="");var i=listControl(e,t),s=QueryString[n];return QueryString[n]=null,o.forEach(function(e){var t=document.createElement("li"),o=document.createElement("a");e?o.innerText=o.innerHTML=a+(QueryString[n]=e):o.innerText=o.innerHTML=r,o.href=window.location.href.split("?").shift()+SerializeQueryString(),i.listElement.appendChild(t),t.appendChild(o),s==e&&t.classList.add("selected")}),QueryString[n]=s,i.controlElement}function qsOptionsMenu(e,t,n){var o=listControl(e,t);return Object.keys(n).forEach(function(e){var t=document.createElement("li"),r=document.createElement("a"),a=QueryString[e];QueryString[e]=a?null:"true",r.innerText=r.innerHTML=n[e],r.href=window.location.href.split("?").shift()+SerializeQueryString(),o.listElement.appendChild(t),t.appendChild(r),QueryString[e]=a,a&&t.classList.add("selected")}),o.controlElement}function zoomButtons(){var e=document.createElement("li"),t=document.createElement("li");return e.appendChild(icon("fa-search-plus","Zoom In",function(){return zoomIn()})),t.appendChild(icon("fa-search-minus","Zoom Out",function(){return zoomOut()})),[e,t]}function settingsMenu(){var e=listControl("fa-gear","Settings");return Object.keys(baseSettings).forEach(function(t){var n=document.createElement("li"),o=document.createElement("input");o.type="checkbox",o.id=t,o.checked=settings[t],o.onchange=function(){return toggleSetting(o)},n.appendChild(o);var r=document.createElement("label");r.htmlFor=o.id,r.innerText=r.innerHTML=baseSettings[t].displayName,n.appendChild(r),e.listElement.appendChild(n)}),e.controlElement.classList.add("settings"),e.controlElement}function groupsMenu(){var e=listControl("fa-eye","Groups");return groupList=e.listElement,e.controlElement.classList.add("groups"),updateGroups(),e.controlElement}function dayMenu(e){void 0===e&&(e=40);var t=0,n=parseInt(QueryString.day||"0")||0;Array.isArray(e)?e.forEach(function(e){return e.Runs.forEach(function(o){return t=Math.max(t,Math.ceil(TPP.Duration.parse(o.Duration,o.StartTime).TotalTime(e.Scale)+(e.Offset||0)+n))})}):t=e;var o=listControl("fa-calendar","Day"),r=document.createElement("li"),a=document.createElement("select");a.id="day";for(var i=0;i<t+1;i++){var s=document.createElement("option");i?s.value=s.innerText=s.innerHTML=i.toFixed(0):s.innerText=s.innerHTML="All",n==i&&(s.selected=!0),a.appendChild(s)}var u=document.createElement("label");return u.htmlFor=a.id,u.innerHTML="Day:&nbsp;",r.appendChild(u),r.appendChild(a),o.listElement.appendChild(r),a.onchange=function(){QueryString.day="All"==a.value?null:a.value,window.location.href=window.location.href.split("?").shift()+SerializeQueryString()},o.controlElement}function regionMenu(e){var t;if(e[0]&&e[0].Name){var n=e;t=[],n.forEach(function(e){e.Runs.forEach(function(e){e.Unfinished||(e.Region&&t.indexOf(e.Region)<0&&t.push(e.Region),(e.AdditionalRegions||[]).forEach(function(e){e.Name&&t.indexOf(e.Name)<0&&t.push(e.Name)}))})})}else t=e;return qsListMenu("fa-globe","Region","region",t)}function twitchButton(){var e=document.createElement("li");return e.appendChild(icon("fa-twitch","Twitch Videos",function(){return getTwitchVideos()})),e}function defaultControls(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=zoomButtons();return n.push(settingsMenu()),n.push(groupsMenu()),e.forEach(function(e){return n.push(e)}),n.push(twitchButton()),n}function drawControls(e,t){t=t||(document.currentScript||Array.prototype.concat.apply([],document.getElementsByTagName("script")).pop()).parentElement,e.forEach(function(e){t.appendChild(e),t.appendChild(document.createTextNode("\n"))})}var fakeQuery=function(e){return Array.prototype.slice.call(document.querySelectorAll(e))},$find=function(e,t){return e.map(function(e){return e?Array.prototype.slice.call(e.querySelectorAll(t)):[]})},updatePage=updatePage||function(){},reprocessCharts=reprocessCharts||function(){},baseSettings={explode:{displayName:"Stagger Clumps",defaultValue:!0},hideUnfinished:{displayName:"Hide Runs Left Unfinished",defaultValue:!0,extraAction:reprocessCharts}},settings=JSON.parse(localStorage.getItem("settings")||"{}");Object.keys(baseSettings).forEach(function(e){return settings[e]="boolean"==typeof settings[e]?settings[e]:baseSettings[e].defaultValue});var showGroups=JSON.parse(localStorage.getItem("showGroups")||"{}"),TPP;!function(e){var t;!function(e){e[e.Weeks=0]="Weeks",e[e.Days=1]="Days",e[e.Hours=2]="Hours",e[e.Minutes=3]="Minutes"}(t=e.Scale||(e.Scale={}))}(TPP||(TPP={}));var Twitch;!function(e){function t(e,t){void 0===t&&(t=!0);var o=[],a=function(e){return e.videos.length&&(o=o.concat.apply(o,e.videos.map(function(e){return new r(e.recorded_at,e.length,e.url,"Twitch")})),t&&e._total)?n(e._links.next).then(a):o};return $.when(n("https://api.twitch.tv/kraken/channels/"+e+"/videos?broadcasts=true&limit=100").then(a),n("https://api.twitch.tv/kraken/channels/"+e+"/videos?limit=100").then(a))}function n(e){return $.get(e+(e.indexOf("?")>0?"&":"?")+"client_id="+o)}var o="l6ejgsj101ymei0f6v4a6nkjw9upml9",r=function(){function e(e,t,n,o){this.recorded_at=e,this.length=t,this.url=n,this.source=o,this.StartTime=new Date(e).valueOf()/1e3,this.EndTime=this.StartTime+t}return e}();e.Video=r,e.GetVideos=t}(Twitch||(Twitch={}));var TPP;!function(e){var t=function(){function t(e,n,o,r,a){if(void 0===n&&(n=0),void 0===o&&(o=0),void 0===r&&(r=0),void 0===a&&(a=0),this.days=n,this.hours=o,this.minutes=r,this.seconds=a,"string"==typeof e){var i=t.parse(e);this.days=i.days,this.hours=i.hours,this.minutes=i.minutes,this.seconds=i.seconds}else this.days+=7*e}return Object.defineProperty(t.prototype,"TotalSeconds",{get:function(){return this.seconds+60*this.minutes+60*this.hours*60+60*this.days*60*24},set:function(e){this.seconds=Math.floor(e%60),this.minutes=Math.floor(e/60)%60,this.hours=Math.floor(e/60/60)%24,this.days=Math.floor(e/60/60/24)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"TotalHours",{get:function(){return this.TotalSeconds/60/60},set:function(e){this.TotalSeconds=60*e*60},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"TotalDays",{get:function(){return this.TotalHours/24},set:function(e){this.TotalHours=24*e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"TotalWeeks",{get:function(){return this.TotalDays/7},set:function(e){this.TotalDays=7*e},enumerable:!0,configurable:!0}),t.prototype.TotalTime=function(t){switch(t){case e.Scale.Weeks:return this.TotalWeeks;case e.Scale.Hours:return this.TotalHours/4;case e.Scale.Minutes:return 6*this.TotalHours}return this.TotalDays},t.prototype.toString=function(t){return void 0===t&&(t=e.Scale.Days),(t==e.Scale.Minutes?60*(24*this.days+this.hours)+this.minutes:(t==e.Scale.Hours?24*this.days+this.hours:(t==e.Scale.Weeks?Math.floor(this.days/7)+"w "+this.days%7:this.days)+"d "+this.hours)+"h "+this.minutes)+"m"+(this.seconds?" "+this.seconds+"s":"")},t.parse=function(e,n){var o=new t(0,0,0,0);if(e){if(this.canParse(e))try{var r=this.parseReg.exec(e);return new t(parseInt(r[1])||0,parseInt(r[2])||0,parseInt(r[3])||0,parseInt(r[4])||0,parseInt(r[5])||0)}catch(e){}n&&(o.TotalSeconds=Date.parse(e)/1e3-n)}return o},t.canParse=function(e){return this.parseReg.test(e)},t}();t.parseReg=/^\s*(?:(\d*)w)?\s*(?:(\d*)d)?\s*(?:(\d*)h)?\s*(?:(\d*)m)?\s*(?:(\d*)s)?\s*$/i,e.Duration=t}(TPP||(TPP={}));var QueryString=function(){var e={};return window.location.search.substring(1).split("&").forEach(function(t){if(t.indexOf("=")>0){var n=t.split("=");e[n.shift()]=decodeURI(n.join("="))}else e[t]="true"}),e}(),TPP;!function(e){var t;!function(e){var t=function(){function e(){this.OwnedDict={},this.HallOfFame=[]}return e}();e.RunSummaryBase=t;var n=function(){function e(){this.Summary=[],this.HallOfFame=[]}return e}();e.CollectionSummaryBase=n;var o=function(){function e(){this.Owners=[],this.HallOfFame=[]}return Object.defineProperty(e.prototype,"IsOwned",{get:function(){return this.Owners&&this.Owners.length>0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"FirstOwnedRun",{get:function(){return this.IsOwned?this.Owners[0].Run:{}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"FirstCaughtDate",{get:function(){return!!this.IsOwned&&this.Owners[0].CaughtOn},enumerable:!0,configurable:!0}),e}();e.DexEntryBase=o;var r;!function(e){e[e["Pokédex Number"]=0]="Pokédex Number",e[e.Alphabetical=1]="Alphabetical",e[e["First Owned"]=2]="First Owned"}(r=e.DexSorting||(e.DexSorting={}));var a=function(){function e(){this.Entries=[]}return Object.defineProperty(e.prototype,"NoGlitchMon",{get:function(){return this.Entries.filter(function(e){return!(0==e.Number&&"MissingNo."==e.Pokemon)})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"TotalOwned",{get:function(){return this.NoGlitchMon.filter(function(e){return e.IsOwned}).length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"TotalInDex",{get:function(){return this.NoGlitchMon.length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"OwnedPercentage",{get:function(){return this.TotalOwned/this.TotalInDex*100},enumerable:!0,configurable:!0}),e.prototype.TotalOwnedBy=function(e){return this.NoGlitchMon.filter(function(t){return t.Owners.filter(function(t){return t.Run.RunName==e.RunName}).length>0}).length},e.prototype.SortDex=function(e){switch(void 0===e&&(e=0),e){case 0:case r[0]:default:this.Entries=this.Entries.sort(function(e,t){return e.Number-t.Number});break;case 1:case r[1]:this.Entries=this.Entries.sort(function(e,t){return e.Pokemon.localeCompare(t.Pokemon)});break;case 2:case r[2]:this.Entries=this.Entries.sort(function(e,t){return(e.FirstCaughtDate||Date.now())-(t.FirstCaughtDate||Date.now())})}},e.prototype.FilterDexToOwned=function(){this.Entries=this.Entries.filter(function(e){return e.IsOwned})},e.prototype.FilterDexToUnowned=function(){this.Entries=this.Entries.filter(function(e){return!e.IsOwned})},e.prototype.FilterDexRuns=function(e){var t=e.map(function(e){return"string"==typeof e?e.toLowerCase().trim():e});this.Entries=this.Entries.filter(function(e){return e.Owners.filter(function(e){return t.filter(function(t){return"string"==typeof t?e.Run.RunName.toLowerCase().indexOf(t)>=0:e.Run.RunName==t.RunName}).length>0}).length>0})},e.prototype.FilterDexPokemon=function(e){e=e.map(function(e){return e.toLowerCase().trim()}),this.Entries=this.Entries.filter(function(t){return e.indexOf(t.Pokemon.toLowerCase())>=0})},e.prototype.FilterDexToHallOfFame=function(){this.Entries=this.Entries.filter(function(e){return e.HallOfFame.length>0})},e}();e.GlobalDexBase=a}(t=e.Pokedex||(e.Pokedex={}))}(TPP||(TPP={}));var groupList,groups,zoomIn=zoomIn||function(){},zoomOut=zoomOut||zoomIn,pokedexGenerationsMenu=function(){return qsListMenu("fa-gamepad","Generations","g",Pokedex.GenSlice.map(function(e,t){return t?t.toFixed(0):null}),"All","Generation ")},pokedexRegionsMenu=function(){return qsListMenu("fa-globe","Region","dex",Object.keys(Pokedex.Regional).map(function(e,t){return t?e:null}),"National")},pokedexSortMenu=function(){return qsListMenu("fa-sort","Sort","sort",Object.keys(TPP.Pokedex.DexSorting).filter(function(e){return!isNaN(e)}).map(function(e){return parseInt(e)?TPP.Pokedex.DexSorting[e]:null}),TPP.Pokedex.DexSorting[0])},getTwitchVideos=getTwitchVideos||function(){},TPP;!function(e){var t;!function(e){e.cleanString=function(e){return e.replace(/[^A-Z0-9]/gi,"").toLowerCase()}}(t=e.Display||(e.Display={}))}(TPP||(TPP={}));var TPP;!function(e){var t;!function(e){var t;!function(t){function n(e){return $("<h2 class='total'>Owned: <span>"+e.TotalOwned+"/"+e.TotalInDex+" ("+e.OwnedPercentage.toFixed(2)+"%)</span></div>")}function o(t,n){void 0===n&&(n=!0);var o=t.Number.toString(),r=("000"+o).substring(o.length),a=e.cleanString(t.Pokemon)||"unidentified",i=$("<div class='dexEntry'>").append("<h3>"+r+"</h3>").append("<h4>"+t.Pokemon+"</h4>").append("<div class='pokesprite "+a+"'><img src='img/missingno.png'></div>");if(n){var s=t.HallOfFame;if(s.length){var u=$("<div>").addClass("hofRibbon").appendTo(i);s.forEach(function(e){var t=e.HostName+"'s "+e.Nickname+" ("+e.RunName+")";u.append($("<img>").attr("src",e.Ribbon).attr("alt",t).attr("title",t))})}t.IsOwned?i.addClass("owned").attr("title","Owned by:\n"+t.Owners.map(function(e){return e.Run.HostName+" ("+e.Run.RunName+")"}).join("\n")).css("background-color",t.Owners[0].Run.ColorPrimary):i.attr("title","Didn't Catch")}else i.addClass("owned");return i}function r(e,t){void 0===t&&(t=!0);var r=$("<div class='pokedex'>");return r.append(n(e)),r.append(e.Entries.map(function(e){return o(e,t)})),r}t.DrawOwnedCount=n,t.DrawDexEntry=o,t.DrawPokedex=r}(t=e.Pokedex||(e.Pokedex={}))}(t=e.Display||(e.Display={}))}(TPP||(TPP={}));var TPP;!function(e){var t;!function(t){var n;!function(n){function o(){return $.get("https://twitchplayspokemon.tv/api/run_status")}function r(e){return e.filter(function(e){return 0==e.Name.indexOf("Season")}).map(function(e){return e.Runs[e.Runs.length-1]}).pop()}function a(e,t){return t=t.trim(),e.map(function(e){return e.Runs.filter(function(e){return e.RunName==t}).shift()}).filter(function(e){return!!e}).shift()||e.map(function(e){return e.Runs.filter(function(e){return e.RunName.indexOf(t)>=0}).shift()}).filter(function(e){return!!e}).shift()||r(e)}function i(e){return $.get("http://thatswhatyouget.github.io/tpp-progress/bin/tpp-data.json").then(function(t){for(var n=0;n<e.length;n++)for(var o=0;o<e[n].Runs.length;o++)e[n].Runs[o].Events=t[n].Runs[o].Events;return e},function(t){return e})}function s(e){return e=e.replace(/'l/gi,"|"),e=e.replace(/'m/gi,"~"),e=e.replace(/'r/gi,"%"),e=e.replace(/'s/gi,"&"),e=e.replace(/'t/gi,"}"),e=e.replace(/'v/gi,"@"),e=e.replace(/#/gi,"#.")}function u(e,t){void 0===t&&(t=null);var n=$("<div>");return n.append($("<i class='fa fa-spinner fa-pulse'>")),e.Ongoing?o().then(function(o){return d(e,t,o,n)},function(e){n.children().remove(),n.append($("<h1 class='error'>").text("Run Status is not currently available."))}):d(e,t,{},n),n}function l(e,t,n,r){void 0===r&&(r=function(){return null}),t.find("h1").first().css("position","relative").append($('<i class="fa fa-refresh fa-spin">').css({position:"absolute",right:"1em"}));var a=o();return i(n).then(function(o){return a.then(function(o){return d(e,r(n),o,t)},function(e){t.find(".fa-refresh").remove(),console.log("Could not update run status.")})})}function d(n,o,r,a){if(n.Duration=(new Date).toISOString(),a.children().remove(),a.append($("<h1>").text(n.RunName)),r.party?a.append(P(n,r)):n.Events.filter(function(e){return e.Party}).length>0&&a.append(R(n,n.Events.filter(function(e){return e.Party}).pop())),r.map_id&&a.append(S(n,r)),g(n).length>0&&a.append(C(n,g(n))),h(n).length>0&&a.append(C(n,h(n))),y(n).length>0&&a.append(C(n,y(n))),m(n).length>0&&a.append(C(n,m(n))),f(n).length>0&&a.append(C(n)),r.items&&a.append(p(r.items,void 0,w[n.BaseGame],M[n.BaseGame])),r.pc_items&&a.append(p(r.pc_items,n.HostName+"'s PC",w[n.BaseGame],M[n.BaseGame])),o&&o.TotalOwnedBy(n)>0){var i=o.Entries.filter(function(e){return e.Owners.filter(function(e){return e.Run==n}).length>0});o.Entries=o.Entries.map(function(e){return i.indexOf(e)<0&&(e.Owners=[]),e}),a.append(c().addClass("pokedex").addClass(t.cleanString(n.RunName)).append(T()).append($("<h3>").text("Pokédex")).append(i.length<r.caught?$("<h6>").text("(Outdated)"):"").append(e.Display.Pokedex.DrawOwnedCount(o)).append(i.map(function(t){return e.Display.Pokedex.DrawDexEntry(t)})).append($("<a>").addClass("plug").attr("href","pokedex.html").text("See Global Pokédex")))}}function c(){return $("<div>").addClass("pokeBorder").append($("<div class='border'>")).append($("<div class='border'>"))}function p(e,t,n,o){void 0===t&&(t="Items"),void 0===n&&(n={}),void 0===o&&(o=[]),e=e||[];var r=c().addClass("itemsList");r.append(T()),r.append($("<h3>").text(s(t+" ("+e.length+")")));var a=$("<ul>").appendTo(r);return e.map(function(e){return o.indexOf(e.name.toUpperCase())>=0&&e.count<2&&(e.count=null),n[e.name.toUpperCase()]&&(e.name+=" "+n[e.name.toUpperCase()]),e}).forEach(function(e){return a.append($("<li>").text(s(e.name)).attr("data-quantity",e.count))}),r}function f(e){return e.Events.filter(function(e){return"Badges"==e.Group||"Bosses"==e.Group||"Kingdoms"==e.Group})}function m(e){return e.Events.filter(function(e){return"Elite Four"==e.Group||"Final Bosses"==e.Group||"Champions"==e.Group&&e.Image.indexOf("rematch")<0&&e.Image.indexOf("hosts")<0})}function h(e){return e.Events.filter(function(e){return"Elite Four Rematch"==e.Group||"Champions"==e.Group&&e.Image.indexOf("rematch")>0})}function g(e){return e.Events.filter(function(e){return"Past Hosts"==e.Group||"Champions"==e.Group&&e.Image.indexOf("hosts")>0})}function y(e){return e.Events.filter(function(e){return"Rematch Badges"==e.Group})}function C(t,n){void 0===n&&(n=f(t));var o=c().addClass("badgeList");o.append(T()),o.append($("<h3>").text(s(n[0].Group)));var r=$("<ul>").appendTo(o);return n.forEach(function(n){var o=$("<li>").appendTo(r);o.append($("<h3>").text(n.Name)),o.append($("<img>").attr("src",n.Image)),o.append($("<h4>").text(e.Duration.parse(n.Time,t.StartTime).toString(e.Scale.Days).replace(/m.*/,"m"))),n.Attempts&&o.append($("<h5>").text(n.Attempts.toString()+" Attempt"+(n.Attempts>1?"s":"")))}),o}function S(e,t){var n=$("<div class='location'>");return k[e.BaseGame]&&"number"==typeof t.map_id&&n.append($("<h2>").text("Current Location: "+k[e.BaseGame][t.map_id])),n}function v(e){switch(e){case 1:return"SLP";case 2:return"FRZ";case 4:return"BRN";case 8:return"PSN";case 32:return"PSN";case 64:return"PAR"}return""}function T(){return $("<i>").addClass("fa fa-window-restore window-shade").click(function(){$(this).parent().children("*:not(h1,h2,h3,h4,h5,h6,.border,.window-shade)").slideToggle()})}function P(n,o){var r=c().addClass("hallOfFameDisplay");r.append(T()),r.addClass(t.cleanString(n.RunName)+" "+(n.Class||"")+" "+(n.BaseGame||"")),r.append($("<h3>").text("Current Party")),r.append($("<h4>").text(e.Duration.parse(n.Duration,n.StartTime).toString(e.Scale.Days)));var a=$("<tr>").appendTo($("<table>").appendTo(r)),i=$("<div class='entry host'>").appendTo($("<td>").appendTo(a)),s=$("<img>").attr("src",n.HostImage).attr("alt",n.HostName).attr("title",n.HostName);n.HostImageSource&&(s=$("<a>").attr("href",n.HostImageSource).append(s)),i.append(s);var u=$('<div class="info">').append($('<div class="name">').text(n.HostName)).appendTo(i);if(o.money&&u.append($('<div data-entry="Money">').text("$"+o.money.toString())),o.coins&&u.append($('<div data-entry="Coins">').text(o.coins.toString())),o.badges){var l=o.badges.toString(2).match(/1/g).length;u.append($('<div data-entry="Badges">').text(l))}o.caught&&u.append($('<div data-entry="Owned">').text(o.caught.toString())),o.seen&&u.append($('<div data-entry="Seen">').text(o.seen.toString())),o.party.forEach(function(e){var n=(e.name||e.species.name).replace(/\s/g,"&nbsp;").replace(/Ë/g,"µ").replace(/Ê/g,"π"),o=$("<div class='entry'>");e.health&&!e.health[0]?o.addClass("fainted"):o.addClass(v(e.status)),o.append($("<span class='level'>").text(e.level)),o.append($("<div class='pokesprite'><img src='img/missingno.png'/></div>").addClass(t.cleanString(e.species.name)).attr("title",e.species.name));var r=$("<div class='info'>").append($("<div class='name'>").html(n)).appendTo(o);if(e.species.id){var i=e.species.id.toString(),s=("000"+i).substring(i.length);r.append($("<div data-entry='"+s+"'>").text(e.species.name))}(e.moves||[]).forEach(function(e,t){return r.append($("<div data-entry='Move "+(t+1).toString()+"'>").text(e.name))}),a.append($("<td>").append(o))});for(var d=o.party.length;d<6;d++)$("<div class='entry'>").appendTo($("<td>").appendTo(a));return r.get(0)}function R(n,o,r){void 0===r&&(r=e.Scale.Days);var a=c().addClass("hallOfFameDisplay");a.append(T()),a.addClass(t.cleanString(n.RunName)+" "+(n.Class||"")+" "+(n.BaseGame||""));var i=new Date(1e3*(e.Duration.parse(o.Time,n.StartTime).TotalSeconds+n.StartTime));a.append($("<h3>").text(s(o.Name+" - "+i.toLocaleDateString()))),a.append($("<h4>").text(e.Duration.parse(o.Time,n.StartTime).toString(r))),o.Attempts&&a.append($("<h5>").text(o.Attempts+" Attempts")),a.append($("<img>").attr("src",o.Image));var u=$("<tr>").appendTo($("<table>").appendTo(a)),l=$("<div class='entry host'>").appendTo($("<td>").appendTo(u)),d=$("<img>").attr("src",n.HostImage).attr("alt",n.HostName).attr("title",n.HostName);n.HostImageSource&&(d=$("<a>").attr("href",n.HostImageSource).append(d)),l.append(d);var p=$('<div class="info">').append($('<div class="name">').text(n.HostName)).appendTo(l);o.IDNo&&p.append($('<div data-entry="IDNo">').text(o.IDNo)),o.Party.forEach(function(e){var n=(e.Nickname||e.Pokemon).replace(/\s/g,"&nbsp;"),o=$("<div class='entry'>").addClass((e.Gender||"").toLowerCase());o.append($("<span class='level'>").text(e.Level)),o.append($("<div class='pokesprite'><img src='img/missingno.png'/></div>").addClass(t.cleanString(e.Pokemon)).addClass(e.Shiny?"shiny":"").addClass((e.Gender||"").toLowerCase()).addClass(e.Class).addClass(t.cleanString(e.Form||"")).attr("title",e.Pokemon));var r=$("<div class='info'>").append($("<div class='name'>").html(n)).appendTo(o);if(e.Number){var a=e.Number.toString(),i=("000"+a).substring(a.length);r.append($("<div data-entry='"+i+"'>").text(e.Pokemon))}e.Met&&r.append($("<div data-entry='Met'>").text(e.Met)),e.Type1&&r.append($("<div data-entry='Type 1'>").text(e.Type1)),e.Type2&&r.append($("<div data-entry='Type 2'>").text(e.Type2)),e.OT&&r.append($("<div data-entry='OT'>").text(e.OT)),e.IDNo&&r.append($("<div data-entry='IDNo'>").text(e.IDNo)),u.append($("<td>").append(o))});for(var f=o.Party.length;f<6;f++)$("<div class='entry'>").appendTo($("<td>").appendTo(u));return a.get(0)}var k={},w={},M={};k.Red=k.Blue=k.Yellow=["Pallet Town","Viridian City","Pewter City","Cerulean City","Lavender Town","Vermilion City","Celadon City","Fuchsia City","Cinnabar Island","Pokémon League","Saffron City","Unused Fly location","Route 1","Route 2","Route 3","Route 4","Route 5","Route 6","Route 7","Route 8","Route 9","Route 10","Route 11","Route 12","Route 13","Route 14","Route 15","Route 16","Route 17","Route 18","Sea Route 19","Sea Route 20","Sea Route 21","Route 22","Route 23","Route 24","Route 25","Red's house (first floor)","Red's house (second floor)","Blue's house","Professor Oak's Lab","Pokémon Center (Viridian City)","Poké Mart (Viridian City)","School (Viridian City)","House 1 (Viridian City)","Pokémon Gym (Viridian City)","Diglett's Cave (Route 2 entrance)","Gate (Viridian City/Pewter City) (Route 2)","Oak's Aide House 1 (Route 2)","Gate (Route 2)","Gate (Route 2/Viridian Forest) (Route 2)","Viridian Forest","Pewter Museum (floor 1)","Pewter Museum (floor 2)","Pokémon Gym (Pewter City)","House with disobedient Nidoran♂ (Pewter City)","Poké Mart (Pewter City)","House with two Trainers (Pewter City)","Pokémon Center (Pewter City)","Mt. Moon (Route 3 entrance)","Mt. Moon","Mt. Moon","Invaded house (Cerulean City)","Poliwhirl for Jynx trade house (Red/Blue)Bulbasaur adoption house (Pokémon Yellow)","Pokémon Center (Cerulean City)","Pokémon Gym (Cerulean City)","Bike Shop (Cerulean City)","Poké Mart (Cerulean City)","Pokémon Center (Route 4)","Invaded house - alternative music (Cerulean City)","Saffron City Gate (Route 5)","Entrance to Underground Path (Kanto Routes 5-6) (Route 5)","Daycare Center (Route 5)","Saffron City Gate (Route 6)","Entrance to Underground Path (Route 6)","Entrance to Underground Path 2 (Route 6)","Saffron City Gate (Route 7)","Entrance to Underground Path (Route 7)","Entrance to Underground Path 2 (Route 7)","Saffron City Gate (Route 8)","Entrance to Underground Path (Route 8)","Pokémon Center (Rock Tunnel)","Rock Tunnel","Power Plant","Gate 1F (Route 11-Route 12)","Diglett's Cave (Vermilion City entrance)","Gate 2F (Route 11-Route 12)","Gate (Route 12-Route 13)","Sea Cottage","Pokémon Center (Vermilion City)","Pokémon Fan Club (Vermilion City)","Poké Mart (Vermilion City)","Pokémon Gym (Vermilion City)","House with Pidgey (Vermilion City)","Vermilion Harbor (Vermilion City)","S.S. Anne 1F","S.S. Anne 2F","S.S. Anne 3F","S.S. Anne B1F","S.S. Anne (Deck)","S.S. Anne (Kitchen)","S.S. Anne (Captain's room)","S.S. Anne 1F (Gentleman's room)","S.S. Anne 2F (Gentleman's room)","S.S. Anne B1F (Sailor/Fisherman's room)","Unused (Victory Road)","Unused (Victory Road)","Unused (Victory Road)","Victory Road (Route 23 entrance)","Unused (Pokémon League)","Unused (Pokémon League)","Unused (Pokémon League)","Unused (Pokémon League)","Lance's Elite Four room","Unused (Pokémon League)","Unused (Pokémon League)","Unused (Pokémon League)","Unused (Pokémon League)","Hall of Fame","Underground Path (Route 5-Route 6)","Blue's room","Underground Path (Route 7-Route 8)","Celadon Department Store 1F","Celadon Department Store 2F","Celadon Department Store 3F","Celadon Department Store 4F","Celadon Department Store Rooftop Square","Celadon Department Store Lift","Celadon Mansion 1F","Celadon Mansion 2F","Celadon Mansion 3F","Celadon Mansion 4F","Celadon Mansion 4F (Eevee building)","Pokémon Center (Celadon City)","Pokémon Gym (Celadon City)","Rocket Game Corner (Celadon City)","Celadon Department Store 5F","Prize corner (Celadon City)","Restaurant (Celadon City)","House with Team Rocket members (Celadon City)","Hotel (Celadon City)","Pokémon Center (Lavender Town)","Pokémon Tower F1","Pokémon Tower F2","Pokémon Tower F3","Pokémon Tower F4","Pokémon Tower F5","Pokémon Tower F6","Pokémon Tower F7","Mr. Fuji's house (Lavender Town)","Poké Mart (Lavender Town)","House with NPC discussing Cubone's mother","Poké Mart (Fuchsia City)","House with NPCs discussing Bill (Fuchsia City)","Pokémon Center (Fuchsia City)","Warden's house (Fuchsia City)","Safari Zone gate (Fuchsia City)","Pokémon Gym (Fuchsia City)","House with NPCs discussing Baoba (Fuchsia City)","Seafoam Islands","Seafoam Islands","Seafoam Islands","Seafoam Islands","Vermilion City Fishing Brother","Fuchsia City Fishing Brother","Pokémon Mansion (1F)","Pokémon Gym (Cinnabar Island)","Pokémon Lab (Cinnabar Island)","Pokémon Lab - Trade room (Cinnabar Island)","Pokémon Lab - Room with scientists (Cinnabar Island)","Pokémon Lab - Fossil resurrection room (Cinnabar Island)","Pokémon Center (Cinnabar Island)","Poké Mart (Cinnabar Island)","Poké Mart - alternative music (Cinnabar Island)","Pokémon Center (Indigo Plateau)","Copycat's house 1F (Saffron City)","Copycat's house 2F (Saffron City)","Fighting Dojo (Saffron City)","Pokémon Gym (Saffron City)","House with Pidgey (Saffron City)","Poké Mart (Saffron City)","Silph Co. 1F","Pokémon Center (Saffron City)","Mr. Psychic's house (Saffron City)","Gate 1F (Route 15)","Gate 2F (Route 15)","Gate 1F (Cycling Road (Route 16)","Gate 2F (Cycling Road (Route 16)","Secret house (Cycling Road) (Route 16)","Route 12 Fishing Brother","Gate 1F (Route 18)","Gate 2F (Route 18)","Seafoam Islands","Badges check gate (Route 22)","Victory Road","Gate 2F (Route 12)","House with NPC and HM moves advice Vermilion City","Diglett's Cave","Victory Road","Team Rocket Hideout (B1F)","Team Rocket Hideout (B2F)","Team Rocket Hideout (B3F)","Team Rocket Hideout (B4F)","Team Rocket Hideout (Lift)","Unused (Team Rocket Hideout)","Unused (Team Rocket Hideout)","Unused (Team Rocket Hideout)","Silph Co. (2F)","Silph Co. (3F)","Silph Co. (4F)","Silph Co. (5F)","Silph Co. (6F)","Silph Co. (7F)","Silph Co. (8F)","Pokémon Mansion (2F)","Pokémon Mansion (3F)","Pokémon Mansion (B1F)","Safari Zone (Area 1)","Safari Zone (Area 2)","Safari Zone (Area 3)","Safari Zone (Entrance)","Safari Zone (Rest house 1)","Safari Zone (Prize house)","Safari Zone (Rest house 2)","Safari Zone (Rest house 3)","Safari Zone (Rest house 4)","Unknown Dungeon","Unknown Dungeon 1F","Unknown Dungeon B1F","Name Rater's house (Lavender Town)","Cerulean City (Gym Badge man)","Unused (Rock Tunnel)","Rock Tunnel","Silph Co. 9F","Silph Co. 10F","Silph Co. 11F","Silph Co. Lift","(Invalid)","(Invalid)","Cable Club Trade Center(*)","Cable Club Colosseum(*)","(Invalid)","(Invalid)","(Invalid)","(Invalid)","Lorelei's room","Bruno's room","Agatha's room","Summer Beach House (Pokémon Yellow)","(Invalid)","(Invalid)","(Invalid)","(Invalid)","(Invalid)","(Invalid)","?"],w.Red=w.Blue=w.Yellow={TM01:"Mega Punch",TM02:"Razor Wind",TM03:"Swords Dance",TM04:"Whirlwind",TM05:"Mega Kick",TM06:"Toxic",TM07:"Horn Drill",TM08:"Body Slam",TM09:"Take Down",TM10:"Double-Edge",TM11:"BubbleBeam",TM12:"Water Gun",TM13:"Ice Beam",TM14:"Blizzard",TM15:"Hyper Beam",TM16:"Pay Day",TM17:"Submission",TM18:"Counter",TM19:"Seismic Toss",TM20:"Rage",TM21:"Mega Drain",TM22:"SolarBeam",TM23:"Dragon Rage",TM24:"Thunderbolt",TM25:"Thunder",TM26:"Earthquake",TM27:"Fissure",TM28:"Dig",TM29:"Psychic",TM30:"Teleport",TM31:"Mimic",TM32:"Double Team",TM33:"Reflect",TM34:"Bide",TM35:"Metronome",TM36:"Selfdestruct",TM37:"Egg Bomb",TM38:"Fire Blast",TM39:"Swift",TM40:"Skull Bash",TM41:"Softboiled",TM42:"Dream Eater",TM43:"Sky Attack",TM44:"Rest",TM45:"Thunder Wave",TM46:"Psywave",TM47:"Explosion",TM48:"Rock Slide",TM49:"Tri Attack",TM50:"Substitute",HM01:"Cut",HM02:"Fly",HM03:"Surf",HM04:"Strength",HM05:"Flash"},M.Red=M.Blue=M.Yellow=["Bicycle","Bike Voucher","Card Key","Coin Case","Dome Fossil","Gold Teeth","Good Rod","Helix Fossil","Itemfinder","Lift Key","Oak's Parcel","Old Amber","Old Rod","Poké Flute","Secret Key","Silph Scope","S.S.Ticket","Super Rod","Town Map","HM01","HM02","HM03","HM04","HM05"].map(function(e){return e.toUpperCase()}),n.GetCurrentRun=r,n.GetSpecifiedRun=a,n.RenderRunStatus=u,n.UpdateRunStatus=l}(n=t.RunStatus||(t.RunStatus={}))}(t=e.Display||(e.Display={}))}(TPP||(TPP={}));