"use strict";

$(function(){

    //
    // load template
    //
    //  <div class="load" rel="template_header"></div>
    //      => template_header.html
    //
    $(".load").each(function(){
        var template = $(this).attr('rel');
        $(this).load( template + ".html" );
    });

});

