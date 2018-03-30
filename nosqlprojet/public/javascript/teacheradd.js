$(document).ready(function(){
  $('.upload-btn').on('click', function (){
      $('#upload-input').click();
      $('.progress-bar').text('0%');
      $('.progress-bar').width('0%');
  });

  $('#upload-input').on('change', function(){

    var files = $(this).get(0).files;

    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // add the files to formData object for the data payload
        formData.append('uploads[]', file, file.name);
      }

      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          if(data == "success"){
              $("#result_form").html("" +
                  '<div class="alert alert-success alert-dismissible">\n' +
                  '  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
                  '  <strong>' + data + '</strong> You will be redirected...\n' +
                  '</div>' +
                  "");
                  setTimeout(function () {
                  window.location.replace("http://localhost:3000/");
              }, 2000);
            }
          else{
              $("#result_form").html("" +
                  '<div class="alert alert-warning alert-dismissible">\n' +
                  '  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
                  '  <strong>'+ data +'</strong> Please retry\n' +
                  '</div>' +
                  "");
            }
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update the Bootstrap progress bar with the new percentage
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                $('.progress-bar').html('Done');
              }

            }

          }, false);

          return xhr;
        }
      });

    }
  });

  $('#buttonAdd').click(function(){
    var name = $('#inputTitle').val();
    var query = $('#inputQuery').val();

    if(name !== "" && query !== "") {
      $.post('http://localhost:3000/addQuery', {
        name: $('#inputTitle').val(),
        query: $('#inputQuery').val()
      }, function(){
        alert("Your query has been added !")
      })
    }
    else {
      alert("Make sure query title and query body are not empty")
    }
  })


})
