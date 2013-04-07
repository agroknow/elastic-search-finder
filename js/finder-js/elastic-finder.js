/*
 * Copyright ARIADNE Foundation
 *
 * The Finder can be customised by providing a javascript function 'customizeFinder()'
 * that returns an object with parameters. See example below.
 * The parameters that can be specifies are:
 *
 * externalSources: an Array. Default is ["eur","wp","scr","ss","gb"]
 * 		eur: Europeana
 * 		wp: Wikipedia
 * 		scr: Scribd
 * 		ss: Slideshare
 * 		gb: Google Books
 * 		They are rendered in the order given
 * facets: an Array. Default is ["provider","language","format","context","lrt"]
 * 		'lrt' means Learning resource typef
 * 		They are rendered in the order given
 * facetIncludes: an Object with facets as possible members.
 * 		For example {"language":["en","fr","nl","de"],"provider":["ARIADNE","OERcommons"]}
 * limitFacetDisplay:an Object with facets as possible members.
 * 		For example {"language":["en","fr","nl","de"]},
 * maxLengthDescription:  Default is 650
 * pageContainers: an Array. Default is ["bottom"]. Available options are ["bottom","top"]
 * pageSize: Default is 10
 * repositoryName: Default is "ARIADNE"
 * serviceUrl: the URL of the repository services. Default is "http://ariadne.cs.kuleuven.be/GlobeFinderF1/servlet/search"
 * selectedProviders: in case we want to limit the collections we add here the selected providers. If none is listed all collections will be imported
 *      For example "selectedProviders":["aglraims","digitalgreen","traglor"]
 *
 * function customizeFinder() {
 return {
 "repositoryName": "AgLR",
 "pageContainers":["top","bottom"],
 "facets":["provider","lrt","language","context"]
 }}
 * All global variables are now capitalised.
 * All local variables should be declared with a 'var' in the respective function, and should not be capitalised.
 */


/* In order to target your repository you need to change values REPOSITORY_NAME and SERVICE_URL
 * and also the same values inside the index.jsp at customizeFinder() function !
 */


/*limit collections|providers*/
var SELECTED_PROVIDERS = [];
/**/
var SERVICE_URL = 'http://ariadne.cs.kuleuven.be/GlobeFinderF1/servlet/search';
var EXT_SOURCE_URL = 'http://ariadne.cs.kuleuven.be/GlobeFinderF1/servlet/search';
var SERVICE_URL = 'http://ariadne.cs.kuleuven.be/globe-ws/api/ariadne/restp';
var ROOT_URL = 'http://ariadne.cs.kuleuven.be/finder/';
var START_DESCRIPTION = 0;
var END_DESCRIPTION = 650;
var REPOSITORY_NAME = "ARIADNE"; 
var THOUSAND_SEP = ',';
var FACET_TOKENS = ['provider','language','format','context','lrt','tagr'];
var FACET_INCLUDES = [];

/*FACETS MAPPING*/
var FACET_LABELS = {};
FACET_LABELS['provider'] = 'Collection';
FACET_LABELS['language'] = 'Language';
FACET_LABELS['format'] = 'Format';
FACET_LABELS['keyword'] = 'Keyword';
FACET_LABELS['context'] = 'Educational Context';
FACET_LABELS['lrt'] = 'Resource Type';
FACET_LABELS['rights'] = 'Rights';
FACET_LABELS['tagr'] = 'Typical Age Range';
FACET_LABELS['iur'] = 'Intended Audience';
FACET_LABELS['il'] = 'Interactivity type level';
FACET_LABELS['lom.classification.taxonpath.taxon.entry.string'] = 'Classification';
FACET_LABELS['contribute'] = 'Contributor'; // added in order to check the field
/*--end mapping*/

var LIMIT_FACET_DISPLAY = {};
var PAGE_CONTAINERS = [];
var EXT_SOURCES = ['eur','wp','scr','ss','gb'];
var AVAILABLE_ES = {};
AVAILABLE_ES['eur'] = {"engine":"Europeana","name":"Europeana"};
AVAILABLE_ES['wp']  = {"engine":"Wikipedia","name":"Wikipedia"};
AVAILABLE_ES['scr'] = {"engine":"Scribd","name":"Scribd"};
AVAILABLE_ES['ss']  = {"engine":"SlideShare","name":"Slide Share"};
AVAILABLE_ES['gb']  = {"engine":"GoogleBooks","name":"Google Books"};
var PAGE;
var PAGE_SIZE = 10;
var NR_RESULTS = 0;
var FINDER_INITIALIZED = false;


var CHECK = 0;
var langName = {};
var iter = 0;
/*LANGUAGE MAPPING*/
langName['n/a']='Other';

langName['en']='English';
langName['eng;']='English';
langName['eng']='English';
langName['eng; eng']='English';
langName['fr']= 'French';
langName['fre']= 'French';
langName['el']= 'Greek';
langName['hun']= 'Hungarian';
langName['hu']= 'Hungarian';
langName['et']= 'Estonian';
langName['est']= 'Estonian';
langName['nl']= 'Dutch';
langName['ro']= 'Romanian';
langName['de']= 'German';
langName['deu']= 'German';
langName['tr']= 'Turkish';
langName['pt']= 'Portuguese';
langName['por']= 'Portuguese';
langName['es']= 'Spanish';
langName['sv']= 'Swedish';
langName['ell']= 'Greek';
langName ['lat'] = 'Latin';
langName['rus'] = 'Russian';

langName['ori']= 'Oriya';
langName['hin']='Hindi';
langName['sat']='Santhali';
langName['unr']='Mundari';
langName['sck']='Sadri';
langName['hok']='Ho';
langName['ben']='Bengali';
langName['kan']='Kannada';
langName['noe']='Neemadi';
langName['sat']='Santhali';
langName['gon']='Gondi';
langName['bns']='Narsinghpuria';
langName['bhb']='Bhili';
langName['mup']='Malvi';
langName['mai']='Maithili';
langName['bho']='Bhojpuri';
langName['tel']='Telugu';
langName['gaz']='Oromifa';
langName['twi']='Twi';
/*--end language mapping*/


/*PROVIDERS MAPPING*/
var providerName = {};
providerName['greenoer']='Green OER';
providerName['digitalgreen']='Digital Green';
providerName['oerafrica']='OER Africa';
providerName['sercmicro']='SERCMICRO';
providerName['faocapacityportal']='FAO capacity portal';
providerName['traglor']='Traglor';
providerName['nsdlbeyond']='NSDL Beyond';
providerName['edunhmc']='Educational National Europe';
providerName['aglreol']='Encyclopedia of Life';
providerName['aglrnb']='Natural Bridge';
providerName['cgiar']='CGIAR';
providerName['ruforum']='RuForum';
providerName['gfar']='Global Forum on Agricultural Research';
providerName['aglrgsg']='Great School Gardens';
providerName['access']='Access Agricultural';
providerName['aglrllb']='Life Lab';
providerName['rurinc']='Rural Inclusion';
providerName['aglraims']='AIMS';
providerName['aglrslowfood']='Slow Food';
providerName['oeagroasis']='AGROASIS/NOVA';
providerName['oeenoat']='ENOAT';
providerName['oebioagro']='BioAgro';
providerName['oeecologiga']='Ecologica';
providerName['oeintute']='Intute';
providerName['oeaua']='AUA';
providerName['oeeulsesthonian']='EULS/Estonian';
providerName['oebmlfuwaustrian']='BMLFUW/Austrian';
providerName['oefao']='FAO';
providerName['oeellinogermaniki']='Ellinogermaniki Agogi';
providerName['oeorganiceprints']='Organic e-prints';
providerName['oespanish']='Spanish';
providerName['oemiksike']='MIKSIKE';

providerName['aglrfaocdx']='FAO Codex';
providerName['aglrfskn']='Food Safety Knowledge Network';
providerName['aglrfoodsafety']='Food Safety OER';

/*--end providers mapping*/

google.load("language", "1");

Event.observe(window, 'load', function() {
              initialSearch();
              });

function initialSearch(){
	initializeFinder();
	var qs = location.search.substring(1);
	var parms = qs.toQueryParams();
	if(parms.query != undefined && parms.query != ''){
		$('query').value = parms.query;
	}
	if($F('query').blank()){
		resetFacets();
		findMaterials(0,PAGE_SIZE,true,true);
	} else {
		doSearch();
	}
}

function initializeFinder(){
	if (!FINDER_INITIALIZED) {
		if(typeof customizeFinder == 'function') {
			var customParams = customizeFinder();
            var urlSelectedProviders = getUrlVars()["providers"];
			if(customParams) {
                /*limit collection|providers*/
                if(urlSelectedProviders){
                    SELECTED_PROVIDERS = urlSelectedProviders;
                    alert(urlSelectedProviders);
                }
                if (!urlSelectedProviders && customParams.selectedProviders) SELECTED_PROVIDERS = customParams.selectedProviders;
                //alert(SELECTED_PROVIDERS);
                /*---*/
                
				if (customParams.serviceUrl) SERVICE_URL = customParams.serviceUrl;
				if (customParams.repositoryName) REPOSITORY_NAME = customParams.repositoryName;
				if (customParams.facets) FACET_TOKENS = customParams.facets;
				if (customParams.facetIncludes) {
					var ff = [];
					for (key in customParams.facetIncludes) {
						ff.push(key + ":" + customParams.facetIncludes[key]);
					};
					FACET_INCLUDES = ff;
				}
				if (customParams.limitFacetDisplay) LIMIT_FACET_DISPLAY = customParams.limitFacetDisplay;
				if (customParams.maxLengthDescription) END_DESCRIPTION = customParams.maxLengthDescription;
				if (customParams.pageSize) PAGE_SIZE = customParams.pageSize;
				if (customParams.pageContainers) {
					PAGE_CONTAINERS =[];
					for (var i=0;i<customParams.pageContainers.length;i++) {
						PAGE_CONTAINERS.push('pagination_'+customParams.pageContainers[i]);
					}
				}
				if (customParams.externalSources) EXT_SOURCES = customParams.externalSources;
			}
		}
        
        		if (PAGE_CONTAINERS.indexOf('pagination_top')>=0) {
        			if (!$('insert_pagination_top')) {
        				$('body').insert('<div id="insert_pagination_top" style="display:none"></div>');
        
        			}
        			$('insert_pagination_top').update('<DIV id="pagination_top"></DIV>');
        		}
        
		if (PAGE_CONTAINERS.indexOf('pagination_bottom')>=0) {
			if (!$('insert_pagination_bottom')) {
				$('body').insert('<div id="insert_pagination_bottom" style="display:none"></div>');
			}
			$('insert_pagination_bottom').update('<div id="pagination_bottom"></div>');
		}
        
        
		if (!$('insert_summary')) {
			$('body').insert('<div id="insert_summary" style="display:none"></div>');
		}
		$('insert_summary').update('<div id="summary"><div id="search_title" ><span id="search_terms"></span> <strong><span id="search_results_index"></span></strong></div></div>');
        
		if (!$('insert_facets')) {
			$('body').insert('<div id="insert_facets" style="display:none"></div>');
		}
		var div = [];
        
		for (var i=0;i<FACET_TOKENS.length;i++)
        {
			var fn = FACET_TOKENS[i];
			div.push('<a href="#" id="'+fn+'" onclick="return false;" class="filter_parent opened"><span>'+FACET_LABELS[fn]+'</span></a><div id="'+fn+'_rbo" class="filter_child" style="display: block; overflow: hidden;height:auto;"></div>');
			
		}
        
        
		div.push('</DIV>');
        
        $('insert_facets').update(div.join(''));
        
        
        
        
		if (!$('insert_results')) {
			$('body').insert('<div id="insert_results" style="display:none"></div>');
		}
		var div = [];
		var msg = 'Search the Elastic Search Repository';
       
		div.push('<DIV id="results">');
		div.push('<div id="searchMessage"><h3 align="center">'+msg+'</h3></div>');
		div.push('<div id="noResults" style="display:none"><h3 align="center">No Results Found</h3></div>');
		div.push('<div id="search_results"></div>');
		div.push('</div>');
		$('insert_results').update(div.join(''));
        //		if (!$('insert_moreResults')) {
        //			$('body').insert('<div id="insert_moreResults" style="display:none"></div>');
        //		}
        //		var div = [];
        //		div.push('<div id="moreResults"><h3>More Results</h3>');
        //		for (var i=0;i<EXT_SOURCES.length;i++){
        //			var es = EXT_SOURCES[i];
        //			var esn = AVAILABLE_ES[es]['name'];
        //			div.push('<div id="'+es+'_search" class="ext-res-div">');
        //			div.push('<a class="ext-res" onclick="getExternalSourceResult(\''+es+'\');" href="javascript:void(0)" title="'+esn+'">'+esn+'</a>');
        //			div.push('<span id="'+es+'_indicator" style="display:none"><img src="'+ROOT_URL+'common/images/indicator.gif"></span>');
        //			div.push('<span id="'+es+'_results"></span>');
        //			div.push('</DIV>');
        //		}
        //		div.push('</DIV>');
        // 		$('insert_moreResults').update(div.join(''));
        
        
        
        
		initializeJamlTemplates();
		PAGE = new YAHOO.widget.Paginator({
                                          rowsPerPage : PAGE_SIZE,
                                          totalRecords: NR_RESULTS,
                                          containers  : PAGE_CONTAINERS,
                                          template : "{PreviousPageLink} {PageLinks} {NextPageLink}"
                                          });
		PAGE.render();
		PAGE.subscribe('changeRequest',handlePagination);
		pagination_hide();
        
		FINDER_INITIALIZED = true;
	}
}

//function toggleFacet(el){
//	$(el).toggleClassName('rbOpen');
//}

function pagination_hide(){
	if($('pagination_top'))$('pagination_top').hide();
	if($('pagination_bottom'))$('pagination_bottom').hide();
}

function pagination_show(){
	if($('pagination_top'))$('pagination_top').show();
	if($('pagination_bottom'))$('pagination_bottom').show();
}

function resetFacets()
{
	if($('facets')){
		var facets = $('facets').select('ul.rbList');
		$$('.ws_label').each(function(el){el.removeClassName('parent-selected');});
		facets.each(function(item,index){
                    $(item.id).update('');
                    });
        
	}
}








function getExternalSourceResult(prefix,engine){
	if($(prefix+'_results').empty()) {
		if($F('query').blank()){
			alert('Please enter a search string');
		} else {
			searchExternalSource(prefix,engine);
		}
	} else {
		$(prefix+'_results').update();
	}
}

//function searchExternalSource(prefix){
//	var es_query = prepareQueryString();
//	var res = $(prefix+'_results');
//	$(prefix+'_indicator').show();
//	res.update('');
//    var clauses = [{language:'VSQL',expression:es_query}];
//	var request = {clause: clauses,
//    resultFormat:'json'
//	};
//	
//	new Ajax.JSONRequest(EXT_SOURCE_URL, {
//                         callbackParamName: "callback",
//                         method: 'get',
//                         parameters: {
//                         json: Object.toJSON(request),
//                         engine: AVAILABLE_ES[prefix]['engine']
//                         },
//                         onSuccess: function(transport) {
//                         var result = transport.responseText.evalJSON(true).result;
//                         
//                         result['title'] = 'Search '+ AVAILABLE_ES[prefix]['name'];
//                         res.insert(Jaml.render(prefix+'_field',result));
//                         },
//                         onComplete: function(transport){
//                         $(prefix+'_indicator').hide();
//                         }
//                         });
//}

function doSearch(){
    if($F('query').blank()){
        alert('Please enter a search string');
        return;
    }
    $('searchMessage').hide();
    
    //showFacets();
    resetFacets();
    findMaterials(0,PAGE_SIZE,true,false);
  
    //searchExternalSources();
}

function externalSourceSelected(prefix){
	return !$(prefix+'_results').empty();
}

function searchExternalSources(){
	for (var i=0;i<EXT_SOURCES.length;i++){
		if(externalSourceSelected(EXT_SOURCES[i])) searchExternalSource(EXT_SOURCES[i]);
	}
}

function prepareQueryString(){
    var spq = $F('query').split('keyword:');
    var text = spq[0];
    if(text.blank()){
        if(spq.length > 1){
            text = spq[1];
        }
    }
    text = text.strip();
    return text;
}

function searchByKeyword(key){
    $('query').value = "keyword:" + key;
    doSearch();
}

function parseQueryString(initUpdate){
    var spq = $F('query').split('keyword:');
    //var spq = $F('context').split('context:');
    var plainText = spq[0];
    var clauses = [];
    
    var selectedProviders;
    
    if(typeof customizeFinder == 'function')
    {
        var customParams = customizeFinder();
        if(customParams.selectedProviders) selectedProviders = customParams.selectedProviders;
         
    }

    
    
    if(!plainText.blank()){
        clauses.push({language:'VSQL',expression:plainText});
        // add the below to github
        var lrt = getUrlVars()["lrt"];
        var key = getUrlVars()["keyword"];
        var context = getUrlVars()["context"];
        var urlSelectedProviders = getUrlVars()["providers"];
        
        if (lrt) {
            clauses.push({language:'anyOf',expression:'lrt:'+ lrt});
        }
        if (key) {
            clauses.push({language:'anyOf',expression:'keyword:' + key});
        }
        if (context) {
            clauses.push({language:'anyOf',expression:'context:' + context});
        }
        if (urlSelectedProviders){
            clauses.push({language:'anyOf',expression:'provider:'+urlSelectedProviders});
        }
        
        if (!urlSelectedProviders && selectedProviders) clauses.push({language:'anyOf',expression:'provider:'+selectedProviders});
        //clauses.push({language:'anyOf',expression:'keyword:' + key});
        //clauses.push({language:'anyOf',expression:'lrt:image'});
        // add the below to code @ github. It is to limit the results only for OE collection //
        
    }
    if(spq.length > 1){
        var keyword = spq[1];
        clauses.push({language:'anyOf',expression:'keyword:' + keyword});
    }
    if(plainText.blank()){
        //clauses.push({language:'anyOf',expression:'provider:organicedunet'});
    }
    return clauses;
}

// Get the parameters of the url
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value) {
                                             vars[key] = value;
                                             });
	return vars;
}


//Example use formatInteger(12345678,',')
function formatInteger(number, com) {
	var num = number.toString();
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(num)) {
		num = num.replace(rgx, '$1' + com + '$2');
	}
	return num;
}

function findMaterials(start,numberResults,needsUpdate,initUpdate){
    
	var selectedFacets = $('insert_facets').select('a.facet-selected');
	
    //    document.getElementById("searchQuery").innerHTML=
    //        "start: <br/><h3>"+start+"</h3>"
    //        +"numberResults: <br/><h3>"+numberResults+"</h3>"
    //        +"needsUpdate: <br/><h3>"+needsUpdate+"</h3>"
    //        +"initUpdate: <br/><h3>"+initUpdate+"</h3>";
	
    
    
    var facetExpressions = $H();
    selectedFacets.each(function(item,index)
                        {
                        var pos = item.id.indexOf(':');
                        var facet = item.id.substring(0,pos);
                        var facetValue = item.id.substring(pos+1);
                        facetValue = facetValue.replace(/\"/g,"'");
                                                        
            facetExpressions.set(facet,(facetExpressions.get(facet) == undefined) ? facetValue : facetExpressions.get(facet) + " OR " + facetValue);
            });
                        
                        var clauses = parseQueryString(initUpdate);
                        // alert(JSON.stringify(clauses));

                        var filteringLRT =  "";
                        var request = "";
                        facetExpressions.each(function(pair)
                                              {
                                              
                                              //clauses.push({language:'anyOfFacet',expression:pair.key + ":" + pair.value});
                                              
                                              filteringLRT = "\"filter\" : {\"term\" : {\"learningResourceTypes\" : \""+pair.value+"\" }},"
                                              
                                              });
                        
//                        FACET_INCLUDES.each(function(exp)
//                                            {
//                                            alert(exp);
//                                            clauses.push({language:'anyOfFacet',expression:exp});
//                                            
//                                            });
                        
                        
                        
                        if($F('query').blank)
                        request = "{\"query\" : {\"query_string\" : {\"query\" : \"*\" }},"+filteringLRT+"\"facets\" : {\"lrt\": {\"terms\": {\"field\": \"learningResourceTypes\",\"all_terms\": true}}}};";
                        
                        
                        
                        if(!$F('query').blank())
                        request = "{\"query\" : {\"query_string\" : {\"query\" :\""+$F('query')+"\" }},"+filteringLRT+"\"facets\" : {\"lrt\": {\"terms\": {\"field\": \"learningResourceTypes\",\"all_terms\": true}}}};";
                        
                        
                        $('search_terms').update($F('query'));
                        
                        $('search_status').update('Searching...');
                        $('noResults').hide();

                        //alert(request);
                        
jQuery.ajax({
       url: "http://83.212.100.142:9200/exp/jsons/_search",
       type: 'POST',
       dataType: "json",
       data:request,
       success: function(response)
                     {
                    
                     
 //var result = transport.responseText.evalJSON(true).result;

           
                    
 var elasticResponse = response;
                     
 //document.getElementById("elastic_response").innerHTML="Response: <br/><h3>"+JSON.stringify(elasticResponse)+"</h3>";
 //document.getElementById("elastic_response").innerHTML="Response: <br/><h3>"+elasticResponse.facets+"</h3>";
 
                     //alert(Object.keys(elasticResponse.facets));
                    
                     
 $('search_results').update('');
 $('noResults').hide();
  
                     
 $('search_status').update('Processing time: <br> <span class="left_details">' + (elasticResponse.took/1000).toFixed(3) + ' seconds</span>');
 
 if(initUpdate)
 {
 $('searchMessage').insert('<h3 align="center">Available: '+formatInteger(elasticResponse.hits.total,',')+' learning resources</h3>');
 } else {
 $('search_terms').update('Results: ');
 $('searchMessage').update('');
 if(elasticResponse.hits.total == 0){
 $('noResults').show();
 }
 
                    
                     
  
 
 /*----------------------------------------------------------------------------------------------*/
 /*--------------------CREATE EVERY ITEM BEFORE CALL RENDERING WITH JAML-------------------------*/
 var oddCtr = 0; /*counter to add the odd style in listing*/
 //result.metadata.each(function(item,index){
 elasticResponse.hits.hits.each(function(item,index){
                      oddCtr++;
                                
                                var stringed = JSON.stringify(item);
                                var tmp = item._source;
                                tmp.elasticID = item._id;
                    
                      if (tmp.expressions[0].manifestations[0].parameter.indexOf('pdf') != -1)
                      tmp.expressions[0].manifestations[0].parameter='images/icons/pdf.png';
                      else if (tmp.expressions[0].manifestations[0].parameter.indexOf('powerpoint') != -1)
                      tmp.expressions[0].manifestations[0].parameter='images/icons/ppt.png';
                      else if (tmp.expressions[0].manifestations[0].parameter.indexOf('video') != -1)
                      tmp.expressions[0].manifestations[0].parameter='images/icons/video.png';
                      else if (tmp.expressions[0].manifestations[0].parameter.indexOf('zip') != -1)
                      tmp.expressions[0].manifestations[0].parameter='images/icons/zip.png';
                      else if (tmp.expressions[0].manifestations[0].parameter.indexOf('audio') != -1)
                      tmp.expressions[0].manifestations[0].parameter='images/icons/audio.png';
                      else if ((tmp.expressions[0].manifestations[0].parameter.indexOf('text') != -1) ||(tmp.expressions[0].manifestations[0].parameter.indexOf('multipart') != -1) )
                      tmp.expressions[0].manifestations[0].parameter='images/icons/url.png';
                      //tmp.expressions[0].manifestations[0].parameter='http://open.thumbshots.org/image.aspx?url='+'tmp.location';
                      else if ((tmp.expressions[0].manifestations[0].parameter.indexOf('xml') != -1 || tmp.expressions[0].manifestations[0].parameter.indexOf('XML') != -1) )
                      tmp.expressions[0].manifestations[0].parameter='images/icons/xml.png';
                      else if (tmp.expressions[0].manifestations[0].parameter.indexOf('image') != -1)
                      tmp.expressions[0].manifestations[0].parameter='images/icons/image.png';
                      else if ((tmp.expressions[0].manifestations[0].parameter.indexOf('word')!= -1) || (tmp.expressions[0].manifestations[0].parameter.indexOf('wordprocessingml')!= -1))
                      tmp.expressions[0].manifestations[0].parameter='images/icons/word.png';
                      else if ((tmp.expressions[0].manifestations[0].parameter.indexOf('application')!= -1))
                      tmp.expressions[0].manifestations[0].parameter='images/icons/application.png';
                      else if ((tmp.expressions[0].manifestations[0].parameter == ''))
                      tmp.expressions[0].manifestations[0].parameter='images/icons/application.png';
                      else
                      tmp.expressions[0].manifestations[0].parameter='images/icons/url.png';

                      ///example of mdPath : home/workflow/repository/LOM/DIGITALGREEN/1455.xml
                      
                      //var spliter1 = tmp.mdPath.split("/");
                      
                      //var spliter2 = spliter1[spliter1.length-1].split(".");
                      //tmp.identifier = spliter2[0];

                      
                      tmp.isOdd = oddCtr;
                      
                      
                      if(tmp.languageBlocks.en.keywords == undefined || tmp.languageBlocks.en.keywords == '')
                      $('search_results').insert(Jaml.render('resultwithoutkeywords', tmp)); //changed resultWITHOUTkeywords to result
                      else {
                      try {tmp.languageBlocks.en.keywords = tmp.languageBlocks.en.split(",");} catch(e){}
                      
                      var spt = tmp.languageBlocks.en.title.split(",",1);
                      tmp.languageBlocks.en.title = spt[0];
                      var length = spt[0].length;
                      
                      if (tmp.languageBlocks.en.title[0] == '[')
                      tmp.languageBlocks.en.title = tmp.languageBlocks.en.title.substring(1,length);
                      else
                      tmp.languageBlocks.en.title = tmp.languageBlocks.en.title.substring(0,length);
                      
                      //spt = tmp.description.split(",",1);
                      //tmp.description=spt[0];
                      //length = spt[0].length;
                      length=END_DESCRIPTION;
                      
                      if (tmp.languageBlocks.en.description[0] == '[')
                      tmp.languageBlocks.en.description = tmp.languageBlocks.en.description.substring(1,length);
                      else
                      tmp.languageBlocks.en.description =tmp.languageBlocks.en.description.substring(0,length);
                      
                      if (tmp.languageBlocks.en.description.indexOf(']') != -1)
                      {
                      spt = tmp.languageBlocks.en.description.split("]");
                      tmp.languageBlocks.en.description=spt[0];
                      }

                      
                      
                      
                      $('search_results').insert(Jaml.render( 'result',  tmp ));
                      
                      
                      // alert(tmp.metaMetadataId);
                      iter++;
                      }
                      });
                     
                     
 
 $('search_results_index').show();
 
 var finalNumberResults = ((start + numberResults) < elasticResponse.hits.total)?(start + numberResults):elasticResponse.hits.total;
 if(elasticResponse.hits.total > 0) {
 $('search_results_index').update('<br> <span class="left_details">(#{start} - #{end} of #{total})</span>'.interpolate({start: formatInteger(start + 1,THOUSAND_SEP), end: formatInteger(finalNumberResults,THOUSAND_SEP), total: formatInteger(elasticResponse.hits.total,THOUSAND_SEP)}));
 pagination_show();
 }
 else {
 $('search_results_index').update('(No Results Found)');
 pagination_hide();
 }
 
 //for facet presentation
 //                                 result.facets.each(function(item,index){
 //
 //                                     item.title = item.title.substring(0,length);
 //
 //                                    $('search_results').insert(Jaml.render('result2',item));
 //
 //                                 });
 
 
 }
 
 
 /*if(!keyword.blank()){
  $('keywords_filter').show();
  $('kwv').update(keyword);
  }
  else{
  $('keywords_filter').hide();
  }*/
 
 if(needsUpdate){
 updatePaginator(elasticResponse.hits.total);
            
 //alert(Object.keys(elasticResponse.facets));
 //elasticResponse.facets.
            var facets = Object.keys(elasticResponse.facets);
            facets.each(function(item,index)
                    {
                        
                    //alert(elasticResponse.facets[item])
                    ///var fld = item.field;
                        
                    var fld = item;
                    //rbkey = facetKeys[fld];
                    var facetHasNoLimit = true;
                    var limitValues = [];
                    if (LIMIT_FACET_DISPLAY[fld])
                    {
                    limitValues = LIMIT_FACET_DISPLAY[fld];
                    facetHasNoLimit = false;
                    }
                    var rbkey = fld;
                    var element = $(rbkey + '_rbo');
                    if(element && facetExpressions.get(fld) == undefined)
                    {
                    element.update('');
                        
                    if(elasticResponse.facets[item].terms != undefined)
                    {
                    elasticResponse.facets[item].terms.each(function(it2,idx2)
                                      {
                                                            
                                      if (facetHasNoLimit || limitValues.indexOf(it2.count) >= 0)
                                      {
                                                            
                                      it2.field = fld;
                                                            
                                      it2.val=it2.term.replace(/\'/g, "&#34;");
                                      it2.count = formatInteger(it2.count,THOUSAND_SEP);
                                                              //element.insert(Jaml.render('rbcriteria',it2));
                                                              if (fld!= "language")
                                                              {
                                                              element.insert(Jaml.render('rbcriteria',it2));
                                                            
                                                              }
                                                              else
                                                              {// check first if langName[it2.val] exists already in rbList
                                                              
                                                              checkLang(it2.val,it2.count);
                                                              if (CHECK==0){element.insert(Jaml.render('rbcriteria2',it2));}
                                                              }
                                                              }
                                                              });
                                      
                                      
                                      }}
                                      
                                      });
                 
                    //bind and triggers the function for sliding in facets!
                    facetSlide();
                    
                    selectedFacets.each(function(item,index)
                                        {
                                        $(item.id).addClassName('facet-selected');
                                      
                                        });
                    }
                    //webSnapr.init();
                    //$('header').scrollTo();
                    //loadTranslator();
                    },
                    onComplete: function(transport)
                    {
                    // $('search_status').update('');
                    },
                    onLoading: function()
                        {
                    $('search_results').update('');
                    $('search_terms').update('');
                    $('search_results_index').update('');
                    }
                    });
                     
                     
                     
 }
 
 function checkLang(name,counter){
 
 CHECK=0;
 $$('#language_rbo li').each(function(item) {
                             
                             //  alert(item.innerHTML);
                             
                             var pos = item.id.indexOf(':');
                             
                             var langValue = item.id.substring(pos+1);
                             
                             if (langName[langValue]== langName[name])
                             {
                             //   pos = item.name.indexOf('/a');
                             var count = item.innerHTML;
                             pos = count.indexOf('/a');
                             var length = count.length;
                             count = item.innerHTML.substring(pos+5,length-1);
                             
                             count=count.replace("," ,"");
                             var num = count*1;
                             
                             num = Number(num) + Number(counter);
                             num = formatInteger(num,THOUSAND_SEP);
                             
                             item.update(item.innerHTML.substring(0,pos+4) + '(#{count})'.interpolate({count: num}));
                             CHECK=1;
                             
                             return;
                             }
                             
                             });
 
 
 }
 
 
                  
 
 
 //function loadTranslator() {
 //
 //  var script = new Element('script',{'type':'text/javascript','src':'http://translate.google.com/translate_a/element.js?cb=googleSectionalElementInit&ug=section&hl=auto'});
 //
 //  $('script-translator').childElements().each(function(el){el.remove();});
 //  $('script-translator').appendChild(script);
 //  
 //  if(google.translate) {
 //	new google.translate.SectionalElement({
 //	sectionalNodeClassName: 'lodescription',
 //	controlNodeClassName: 'control',
 //	background: '#ffffcc'
 //	}, 'google_sectional_element');
 //  }
 //  
 //  $$('.lodescription').each(function(data){
 //	var toTranslate = data.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g, ' ').replace('Translate','');
 //	google.language.detect(toTranslate,function(result){
 //		if (!result.error) {
 //			if(result.language == 'en') {
 //				data.descendants()[0].hide();
 //			}
 //			
 //		}
 //	});
 //  });
 //  
 //  
 //}
 
 
 
 
 
 
 
 
 function addEndingDescription(data){
 if(data.length ==  0 )
 return "";
 return (data.length<END_DESCRIPTION)?data:(data.substr(START_DESCRIPTION,END_DESCRIPTION)).concat(""," <span class='suspension-points'>...</span>");
 }
 
 function removeHtmlTags(data) {
 var strInputCode = data.replace(/&(lt|gt);/g, function (strMatch, p1){
                                 return (p1 == "lt")? "<" : ">";
                                 });
 var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, " ");
 return strTagStrippedText;
 }
 
 function stripUrl(data) {
 
 var strTagStrippedText = data.replace(/<\/?[^>]:+(>|$)/g, "_");
 return strTagStrippedText;
 
 
 }
 
 
 
 
 function initializeJamlTemplates(){
 
 Jaml.register('thumb_pres', function(data) {
               //  img({src:'./icons/'+ data.format +'.png'})
               //img({src:'http://SnapCasa.com/Get.aspx?url='+data.identifier})
               //img({src:data.format});
               a({href: data.location,title: data.title , target: '_blank'}, img({src:data.format, height:"48", width:"48" }))
               // img({src:'http://open.thumbshots.org/image.aspx?url='+'http://edis.ifas.ufl.edu/topic_ag_peanuts'})
               });
 
 
 Jaml.register('keyword', function(data) {
               a({href:'javascript:void(0);', onclick: "searchByKeyword('#{key}')".interpolate({key: data})}, data);
               });
 
    /*
     Jaml.render('first_title',function(data){
     a({href:data.location,title: data.title, target: '_blank'},data.title)
     }); */
 
 
 /*---------------------------------------------------------------------------------------------*/
 /*-----------------------------RENDER RESULT LISTING ITEMS--------------------------------*/
 
 
 Jaml.register('result', function(data){
               
               var keywordsToEmbed = "";

               
               var odd = "";
               if(data.isOdd%2===1){odd="odd"}
               
               for(var i=0 , length=data.languageBlocks.en.keywords.length; i<length;i++)
               {
               if(i!==length-1)
               {
               keywordsToEmbed +="<a class=\"secondary\" href=\"elastic-listing.html?query="+data.languageBlocks.en.keywords[i]+"\">&nbsp"+data.languageBlocks.en.keywords[i]+"</a>"
               }
               else
               {
               keywordsToEmbed +="<a class=\"secondary last\" href=\"elastic-listing.html?query="+data.languageBlocks.en.keywords[i].split(" ")[0]+"\">&nbsp"+data.languageBlocks.en.keywords[i]+"</a>"
               }
               }
               
               article({class:'item-intro '+odd},
                       header(
                              h2(img({src:data.expressions[0].manifestations[0].parameter}),
                                 a({href:data.location,title: data.languageBlocks.en.title, target: '_blank'},data.languageBlocks.en.title)),
                              section(p({cls:'item-intro-desc'}, data.languageBlocks.en.description),
                                      aside({cls:'clearfix'},
                                            div({cls:'floatleft'},
    div({cls:'line keywords'}, span("Keywords:"), keywordsToEmbed /*item.keywords*/)),
                                            div({cls:'floatright'},
    div({cls:'line alignright'}, a({href:"elastic-item.html?id="+data.elasticID, cls:'moreinfo'}, "More Info")))))))});
                 
                     

    Jaml.register('resultwithoutkeywords', function(data){
                                   
                                   //               odd++;
                                   //               var backgroundClass = ""
                                   //               if(odd%2===0){backgroundClass = "odd";}
                                   var keywordsToEmbed = "";

                  var odd = "";
                  if(data.isOdd%2===1){odd="odd"}
                                   
                                   for(var i=0 , length=data.languageBlocks.en.keywords.length; i<length;i++)
                                   {
                                   if(i!==length-1)
                                   {
                                   keywordsToEmbed +="<a class=\"secondary\" href=\"elastic-listing.html?query="+data.languageBlocks.en.keywords[i]+"\">&nbsp"+data.languageBlocks.en.keywords[i]+"</a>"
                                   }
                                   else
                                   {
                                   keywordsToEmbed +="<a class=\"secondary last\" href=\"elastic-listing.html?query="+data.languageBlocks.en.keywords[i].split(" ")[0]+"\">&nbsp"+data.languageBlocks.en.keywords[i]+"</a>"
                                   }
                                   }
                                   
                                   article({class:'item-intro ' +odd },
                                           header(
                                                  h2(img({src:data.expressions[0].manifestations[0].parameter}),
                                                     a({href:data.location,title: data.languageBlocks.en.title, target: '_blank'},data.languageBlocks.en.title)),
                                                  section(p({cls:'item-intro-desc'}, data.languageBlocks.en.description),
                                                          aside({cls:'clearfix'},
                                                                div({cls:'floatright'},
                                                                    div({cls:'line alignright'}, a({href:"elastic-item.html?id="+data.elasticID, cls:'moreinfo'}, "More Info")))))))});
                     
 
 
 /*---------------------------------------------------------------------------------------------*/
 /*-----------------------------RENDER FACETS--------------------------------*/
 

                     
 Jaml.register('rbcriteria', function(data)
               {
              
               
               //###
               var label = data.val;
               if(providerName[data.val])
               {label = providerName[data.val];}
               
               a({href:'#', id: data.field + ':' + data.val, title: data.val, onclick:"toggleFacetValue('#{id}','#{parent}')".interpolate({id: data.field + ':' + data.val,parent: data.field})}, span(label), span({cls:'total'}, data.count));
               
    
               });
 
 
 Jaml.register('rbcriteria2', function(data)
               {
               a({href:'#', id: data.field + ':' + data.val, title: data.val, onclick: "toggleFacetValue('#{id}','#{parent}')".interpolate({id: data.field + ':' + data.val, parent: data.field})}, span(langName[data.val]), span({cls:'total'}, data.count ));
               
               //              li({id: data.field + ':' + data.val},
               //         a({href:'javascript:void(0);', title: data.val,onclick: "toggleFacetValue('#{id}','#{parent}')".interpolate({id: data.field + ':' + data.val,parent: data.field}),},
               //           span(langName[data.val]), span({cls:'total'}, data.count )));
               });
 
 
 
 
 for (var i=0;i<EXT_SOURCES.length;i++){
 
 Jaml.register(EXT_SOURCES[i]+'_field', function(data) {
               a({href: data.apiurl, title: data.title, target: '_blank'},
                 "<br>(" + formatInteger(data.nrOfResults,THOUSAND_SEP) + " results)"
                 );
               });
 }
 }
 
function facetSlide(){
                     
                     jQuery(document).ready(function(){

                                            jQuery('.filter_parent').each(function() {
                                                                          if(jQuery(this).hasClass("opened")) jQuery(this).next().css("display","block");
                                                                          });
                                            jQuery('.filter_parent').click(function(event){
                                                                           event.preventDefault();
                                                                           jQuery(this).toggleClass("opened");
                                                                           jQuery(this).next().slideToggle("slow");
                                                                           });
                                            exit();
                                            
                                            });
}
                     
                     

 
 
 function updatePaginator(NR_RESULTS){
 PAGE.set('totalRecords',NR_RESULTS);
 PAGE.set('recordOffset',0);
 }
 
 
 function handlePagination(newState){
 // Collect page data using the requested page number
 //newState.
 findMaterials(newState.recordOffset,newState.rowsPerPage,false,false);
 // Update the Paginator's state
 PAGE.setState(newState);
 
 }
 
 function selectParent(parent){
 var childSelected = false;
 
 $(parent+'_rbo').childElements().each(function(el){
                                       if(el.hasClassName('facet-selected')) {
                                       $(parent).addClassName('parent-selected');
                                       childSelected = true;
                                       }
                                       });
 
 if(!childSelected)
 $(parent).removeClassName('parent-selected');
 }
 
 function toggleFacetValue(elem,parent)
{
 $(elem).toggleClassName('facet-selected');
 //$(elem).toggleClassName('active');
 selectParent(parent);
 findMaterials(0,PAGE_SIZE,true,false);
 }
 
 function html_entity_decode(str) {
 var ta=document.createElement("textarea");
 ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
 var val = ta.value;
 ta.parentNode.removeChild(ta);
 return val;
 }
 
 function fullLangName(iso)
 {
 
 var fullName = "";
 
 if (iso == "en")
 fullName = langName["en"];
 else if  (iso == "fr")
 fullName = langName["fr"];
 
 
 return fullName;
 }
 
