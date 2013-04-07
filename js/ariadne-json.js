///elastic-experiment
function getElasticJSON(urlTemp)
{
    $.ajax({
           url: urlTemp,
           dataType: "json",
           success: function(data)
           {
           var item = JSON.stringify(data);
           var thisItem = JSON.parse(item);
           var item = thisItem._source;
           
           //alert(thisItem.hits.hits[0]._source.set);
           
           //document.getElementById('elastic_response').innerHTML = thisItem._source.set;
           
           var item = thisItem._source;
           
           if(item.languageBlocks.length!==undefined && item.languageBlocks!==undefined )
           {
           for(var i = 0; i<item.languageBlocks.length; i++)//run all different languages version of this item
           {
           var language = Object.keys(item.languageBlocks[i]); //keys for different language versions of this item. (i.e en, gr, no,)
           
           languageBlock = item.languageBlocks[i][language[0]]; // We always get language[0] as key
           
           //jQuery('#stage').append('<p> languageBlocks.title: ' + language[0] + '</p>'); // language code
           //document.getElementById('itemTitle').innerHTML = languageBlock.title ;
           //document.getElementById('itemDescription').innerHTML = languageBlock.description;
           if(languageBlock.title!==undefined)
           {
           document.getElementById('itemTitle').innerHTML = languageBlock.title ;
           }
           if(languageBlock.description!==undefined)
           {
           document.getElementById('itemDescription').innerHTML = languageBlock.description;
           }
           
           if(item.expressions[0].manifestations[0].items[0].url!==undefined)
           {
           jQuery('#itemAccess').append('<a target="_blank" href="'+item.expressions[0].manifestations[0].items[0].url+'" class="access  secondary">Access to the resource</a>');
           if(item.expressions[0].manifestations[0].parameter!==undefined)
           {
           if(item.expressions[0].manifestations[0].parameter=='text/html'){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="http://open.thumbshots.org/image.aspx?url='+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           }else if(item.expressions[0].manifestations[0].parameter=='text/xml'){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/xml.png" /> </a>');
           
           }else if(item.expressions[0].manifestations[0].parameter.search("/pdf")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/pdf.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("excel")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/x-applix-spreadsheet.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("word")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/word.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("ppt")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/ppt.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("application")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/application.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("audio")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/audio.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("video")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/video.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("image")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="'+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           
           }else{
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="http://open.thumbshots.org/image.aspx?url='+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           }
           
           }else{
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="http://open.thumbshots.org/image.aspx?url='+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           }
           }
           if(item.expressions[0].manifestations[0].parameter!==undefined)
           {
           jQuery('#itemMediaFormat').append('<span class="forKomma last">'+item.expressions[0].manifestations[0].parameter+'</span>');
           
           }
           
           if(item.tokenBlock.ageRange!==undefined){
           jQuery('#ageRange').append('<span class="forKomma last">'+item.tokenBlock.ageRange+'</span>');
           jQuery('#itemAgeRange').append('<span class="forKomma last">'+item.tokenBlock.ageRange+'</span>');
           }
           if(item.rights.url!==undefined){
           if(item.rights.url.search("licenses/by-nc-sa")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc-sa.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-nc-nd")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc-nd.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-nd")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nd.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-sa")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-sa.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-nc")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by.png"></a></nav>');
           
           }else{
           jQuery('#itemRights').append('<span>Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank">'+item.rights.url+'</a></nav>');
           }
           
           }else if(item.rights.description!==undefined ){
           if(item.rights.description['en']!==undefined ){
           jQuery('#itemRights').append('<span>Rights: </span><nav  class="itemRights">'+item.rights.description['en']+'</nav>');
           }
           }
           if(item.set!==undefined){
           jQuery('#itemCollection').append('<span class="forKomma last">'+item.set+'</span>');
           }
           if(item.expressions[0].language!==undefined)
           {
           jQuery('#itemLanguage').append('<span class="flag '+item.expressions[0].language+'flag">'+item.expressions[0].language+'</span>');
           
           }
           
           
           if(item.tokenBlock.endUserRoles.length!==undefined)
           {
           for(var j=0; j<item.tokenBlock.endUserRoles.length;j++)//*ARRAY of keywords in current version
           {
           if(j==item.tokenBlock.endUserRoles.length-1){
           jQuery('#itemIntendedAudience').append('<span class="forKomma last">'+item.tokenBlock.endUserRoles[j]+'<span>');
           
           }else{
           jQuery('#itemIntendedAudience').append('<span class="forKomma">'+item.tokenBlock.endUserRoles[j]+'<span>');
           
           }
           }
           }
           if(item.tokenBlock.learningResourceTypes.length!==undefined)
           {
           for(var j=0; j<item.tokenBlock.learningResourceTypes.length;j++)//*ARRAY of keywords in current version
           {
           if(j==item.tokenBlock.learningResourceTypes.length-1){
           jQuery('#itemResourceType').append('<span class="forKomma last">'+item.tokenBlock.learningResourceTypes[j]+'<span>');
           
           }else{
           jQuery('#itemResourceType').append('<span class="forKomma">'+item.tokenBlock.learningResourceTypes[j]+'<span>');
           
           }
           
           }
           }
           if(item.tokenBlock.contexts.length!==undefined)
           {
           for(var j=0; j<item.tokenBlock.contexts.length;j++)//*ARRAY of keywords in current version
           {
           if(j==item.tokenBlock.contexts.length-1){
           jQuery('#itemEducationalContext').append('<span class="forKomma last">'+item.tokenBlock.contexts[j]+'<span>');
           
           }else{
           jQuery('#itemEducationalContext').append('<span class="forKomma">'+item.tokenBlock.contexts[j]+'<span>');
           
           }
           
           }
           }
           
           
           if(languageBlock.keywords.length!==undefined)
           {
           //                jQuery('#keywords').append('<div><ul class="itemKeywords"><li><span>Keywords:</span><nav id="itemKeywords" class="inline-nav clearfix"> <!--auto-generated--></nav></li></ul></div>');
           
           for(var j=0; j<languageBlock.keywords.length;j++)//*ARRAY of keywords in current version
           {
           if(j==languageBlock.keywords.length-1){
           jQuery('#itemKeywords').append('<a  href="elastic-listing.html?query='+languageBlock.keywords[j]+'" class="forKomma link last">'+languageBlock.keywords[j]+'</a>');
           
           }else{
           jQuery('#itemKeywords').append('<a  href="elastic-listing.html?query='+languageBlock.keywords[j]+'" class="forKomma link">'+languageBlock.keywords[j]+'</a>');
           
           }
           
           }
           }
           
           }
           }
           
           
           
           
           //--
           //if languageBlocks has ONLY one value => not array
           if(item.languageBlocks.length==undefined && item.languageBlocks!==undefined )
           {
           var language = Object.keys(item.languageBlocks); //keys for different language versions of this item. (i.e en, gr, no,)
           
           /////get always language "en" else the first one
           if(item.languageBlocks['en']==undefined){
           languageBlock = item.languageBlocks[language[0]]; // We always get language[0] as key
           }else{
           languageBlock = item.languageBlocks['en']; // We always get language['en'] as key
           }
           
           //jQuery('#stage').append('<p> languageBlocks.title: ' + language[0] + '</p>'); // language code
           //document.getElementById('itemTitle').innerHTML = languageBlock.title ;
           //document.getElementById('itemDescription').innerHTML = languageBlock.description;
           if(languageBlock.title!==undefined)
           {
           document.getElementById('itemTitle').innerHTML = languageBlock.title ;
           }
           if(languageBlock.description!==undefined)
           {
           document.getElementById('itemDescription').innerHTML = languageBlock.description;
           }
           
           
           if(item.expressions[0].manifestations[0].items[0].url!==undefined)
           {
           jQuery('#itemAccess').append('<a target="_blank" href="'+item.expressions[0].manifestations[0].items[0].url+'" class="access  secondary">Access to the resource</a>');
           if(item.expressions[0].manifestations[0].parameter!==undefined)
           {
           if(item.expressions[0].manifestations[0].parameter=='text/html'){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="http://open.thumbshots.org/image.aspx?url='+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           }else if(item.expressions[0].manifestations[0].parameter=='text/xml'){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/xml.png" /> </a>');
           
           }else if(item.expressions[0].manifestations[0].parameter.search("/pdf")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/pdf.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("excel")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/x-applix-spreadsheet.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("word")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/word.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("ppt")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/ppt.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("application")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/application.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("audio")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/audio.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("video")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img  src="images/icons/video.png" /> </a>');
           }else if(item.expressions[0].manifestations[0].parameter.search("image")>=0){
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="'+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           
           }else{
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="http://open.thumbshots.org/image.aspx?url='+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           }
           
           }else{
           jQuery('#itemThumb').append('<a href="'+item.expressions[0].manifestations[0].items[0].url+'"><img class="itemsMedia" src="http://open.thumbshots.org/image.aspx?url='+item.expressions[0].manifestations[0].items[0].url+'" /> </a>');
           
           }
           }
           if(item.expressions[0].manifestations[0].parameter!==undefined)
           {
           jQuery('#itemMediaFormat').append('<span class="forKomma last">'+item.expressions[0].manifestations[0].parameter+'</span>');
           
           }
           
           if(item.tokenBlock.ageRange!==undefined){
           jQuery('#ageRange').append('<span class="forKomma last">'+item.tokenBlock.ageRange+'</span>');
           jQuery('#itemAgeRange').append('<span class="forKomma last">'+item.tokenBlock.ageRange+'</span>');
           }
           if(item.rights.url!==undefined){
           if(item.rights.url.search("licenses/by-nc-sa")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc-sa.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-nc-nd")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc-nd.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-nd")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nd.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-sa")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-sa.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by-nc")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc.png"></a></nav>');
           }else if(item.rights.url.search("licenses/by")>=0){
           jQuery('#itemRights').append('<span style="position:relative;top:-10px;">Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by.png"></a></nav>');
           
           }else{
           jQuery('#itemRights').append('<span>Rights: </span><nav  class="itemRights"><a href="'+item.rights.url+'" class="secondary" target="_blank">'+item.rights.url+'</a></nav>');
           }
           
           }else if(item.rights.description!==undefined ){
           if(item.rights.description['en']!==undefined ){
           jQuery('#itemRights').append('<span>Rights: </span><nav  class="itemRights">'+item.rights.description['en']+'</nav>');
           }
           }
           if(item.set!==undefined){
           jQuery('#itemCollection').append('<span class="forKomma last">'+item.set+'</span>');
           }
           if(item.expressions[0].language!==undefined)
           {
           jQuery('#itemLanguage').append('<span class="flag '+item.expressions[0].language+'flag">'+item.expressions[0].language+'</span>');
           
           }
           
           
           if(item.tokenBlock.endUserRoles.length!==undefined)
           {
           for(var j=0; j<item.tokenBlock.endUserRoles.length;j++)//*ARRAY of keywords in current version
           {
           if(j==item.tokenBlock.endUserRoles.length-1){
           jQuery('#itemIntendedAudience').append('<span class="forKomma last">'+item.tokenBlock.endUserRoles[j]+'<span>');
           
           }else{
           jQuery('#itemIntendedAudience').append('<span class="forKomma">'+item.tokenBlock.endUserRoles[j]+'<span>');
           
           }
           }
           }
           if(item.tokenBlock.learningResourceTypes.length!==undefined)
           {
           for(var j=0; j<item.tokenBlock.learningResourceTypes.length;j++)//*ARRAY of keywords in current version
           {
           if(j==item.tokenBlock.learningResourceTypes.length-1){
           jQuery('#itemResourceType').append('<span class="forKomma last">'+item.tokenBlock.learningResourceTypes[j]+'<span>');
           
           }else{
           jQuery('#itemResourceType').append('<span class="forKomma">'+item.tokenBlock.learningResourceTypes[j]+'<span>');
           
           }
           
           }
           }
           if(item.tokenBlock.contexts.length!==undefined)
           {
           for(var j=0; j<item.tokenBlock.contexts.length;j++)//*ARRAY of keywords in current version
           {
           if(j==item.tokenBlock.contexts.length-1){
           jQuery('#itemEducationalContext').append('<span class="forKomma last">'+item.tokenBlock.contexts[j]+'<span>');
           
           }else{
           jQuery('#itemEducationalContext').append('<span class="forKomma">'+item.tokenBlock.contexts[j]+'<span>');
           
           }
           
           }
           }
           
           
           if(languageBlock.keywords.length!==undefined)
           {
           //                jQuery('#keywords').append('<div><ul class="itemKeywords"><li><span>Keywords:</span><nav id="itemKeywords" class="inline-nav clearfix"> <!--auto-generated--></nav></li></ul></div>');
           //
           
           for(var j=0; j<languageBlock.keywords.length;j++)//*ARRAY of keywords in current version
           {
           if(j==languageBlock.keywords.length-1){
           jQuery('#itemKeywords').append('<a  href="elastic-listing.html?query='+languageBlock.keywords[j]+'" class="forKomma link last">'+languageBlock.keywords[j]+'</a>');
           
           }else{
           jQuery('#itemKeywords').append('<a  href="elastic-listing.html?query='+languageBlock.keywords[j]+'" class="forKomma link">'+languageBlock.keywords[j]+'</a>');
           
           }
           
           }
           }
           
           }
           
           //-------------
           
           
           
           
           
           
           //end of -success- of getElasticJSON
           }})};

