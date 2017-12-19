$(document).ready(function(){

  var apiKey = "&api-key=f9f247ec-fe5f-40ab-bc45-ba83ec34f82d" //api key variable to be used in the ajax url
  var url = "https://content.guardianapis.com/" //guardian url variable to be used in the ajax url

  $("#clearSearch").click(function(e){    //clear results from search bar
    e.preventDefault();
    $("#search").val("");
    $(".list-group-item").hide();
  });

  $('[data-toggle="tooltip"]').tooltip();   //formatting tooltip for search help

  //retrieving data for the most popular news
  $.ajax(
    {
    type: "GET",
    url: url + "world?show-most-viewed=true&show-fields=byline%2Cthumbnail%2CwebTitle%2Cbody" + apiKey,
    dataType: "jsonp",
    cache: false,
    success: function(data)
    {
      for(var i = 0; i < 5; i++)
      {
        $(".carousel-inner").append(          //Inserts news data into a carousel
        "<div class='carousel-item'>" +
        "<img class='d-block img-fluid w-100' src=" + data.response.mostViewed[i].fields.thumbnail + ">" +    //carousel image
        "<div class='carousel-caption d-none d-md-block'>" +
        "<h1 style=background-color:black>" + data.response.mostViewed[i].webTitle + "</h1>" +    //carousel title
        "<button id='modalBtn'type='button' class='btn btn-primary' data-toggle='modal' data-target='#newsModal"+i+"'>Read More</button>" +   //button to open modal
        "</div></div>");

        //Creates modal to view more info of most viewed news article
        $(".modalPlaceholder").append(
          "<div class='modal fade' id='newsModal"+i+"'><div class='modal-dialog'><div class='modal-content'>" +
          "<div class='modal-header'>" +
          "<div class='modal-title'><h4>" + data.response.mostViewed[i].webTitle + "</h4>" +    //insets titles to modal
          "<h6>" + data.response.mostViewed[i].fields.byline + "</h6><p>" + data.response.mostViewed[i].webPublicationDate + "</p>" +   //adds suthor and dae to title
          "</div></div>" +
          "<div class='modal-body'><p>" + data.response.mostViewed[i].fields.body + "</p>" +    //main text of aritcles
          "</div></div></div></div>");

        $(".carousel-item:first-child").addClass("active");
        $(".carousel").carousel({   //sets time for carousel to slide between images
          interval: 2500
        })
      }
    },
    error: function(){    //Error message if data fails to load
      alert('Failed to load page content - Please check internet connection!');
    }
  })


  //retrieves most recent data for each tab
  $(".tab-pane").each(function (){
  var content = $(this).nextAll().attr("id");     //retrieves id name for each tab
  $.ajax(
    {
    type: "GET",
    url: url + "search?section=" + content + "&order-by=newest&show-fields=thumbnail%2Cbyline" + apiKey,
    dataType: "jsonp",
    cache: false,
    success: function(data)
    {
      for(var i = 0; i < 9; i++)
      {
        $("#" + content + "Card").append(   //adds data into cards
        "<div class='card border-primary'>" +
        "<img class='img-top img-fluid' src=" + data.response.results[i].fields.thumbnail + ">" +   //image for each card
        "<div class='card-body text-center'>" +
        "<h2>" + data.response.results[i].webTitle + "</h2>" +    //title for each card
        "<a class='btn btn-primary' target='_blank' href=" + data.response.results[i].webUrl + ">Read More</a>" +   //button link to articles on website
        "</div></div>");
      }
    },
    error: function(){    //Error message if data fails to load
      alert('Failed to load page content - Please check internet connection!');
    }
  })
  })

  //retrieving data for search
  $("#searchBtn").on("click", function(e){
  e.preventDefault();
  var searchContent = $("#search").val();
  $.ajax(
    {
      type: "GET",
      url: url + "search?q=" + searchContent + apiKey,
      dataType: "jsonp",
      cache: false,
      success: function(data)
      {
        for(var i=0; i<10; i++)
        {
          if(searchContent != "")
          {
          $(".listPlaceholder").append(
            "<li class='list-group-item'><a target='_blank' href=" + data.response.results[i].webUrl+ ">"
            + data.response.results[i].webTitle + "</li>");
          }
        }

      },
      error: function(){
        alert('Could not find a related search!');
      }
  });
  })

    //weather for side bar
    $.ajax(
    {
      type: "GET",
      url : "https://api.openweathermap.org/data/2.5/weather?q=Belfast&APPID=bbb010a66345fd1b347da1c33b835a28&units=metric",
      dataType : "jsonp",
      cache: false,
      success : function(data)
      {
        $(".weather").append(
          "<div class='weatherContent'><b>" + data.name + ': ' + "</b>" + data.weather[0].main + ', ' + data.main.temp + '°C' + "</div>"
        )
      }
    });
});
