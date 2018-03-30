var emailsTab = [];
var queriesTab = [];
$(document).ready(function(){
    $.get('http://localhost:3000/getqueries', queries => {
      queriesTab = queries;
      var idx = 0;
      queries.forEach(function(query){
        $('#selectQuery').append("<option class=\"queryAdmin\" value="+idx+">"+query.sender+"</option>")
        idx++;
      })
    })


    $('#form').change(function(){
      if($('#form option:selected').val() == 'sender'){
        $('#query').html('<form><div class="form-group"><label for="inpuSender">Sender</label><input type="text" class="form-control" id="inputSender" placeholder="Search by Sender"></div></form>')
      }
      else if($('#form option:selected').val() == 'subject'){
        $('#query').html('<form><div class="form-group"><label for="inputSubject">Subject</label><input type="text" class="form-control" id="inputSubject" placeholder="Search by Subject"></div></form>')
      }
      else if($('#form option:selected').val() == 'date'){
        $('#query').html('<form><div class="form-group"><label for="inputDate">Date</label><input type="text" class="form-control" id="inputDate" placeholder="Enter a Date"></div></form>')
      }

      else if($('#form option:selected').hasClass('queryAdmin')){
        console.log($('#form option:selected').val())
        $('#query').html('<form><div class="form-group"><label for="inputQuery">Query body</label><textarea class="form-control" id="inputQuery" rows="5">'+JSON.stringify(JSON.parse(queriesTab[$('#form option:selected').val()].query), null, 2)  +'</textarea><medium id="inputQueryHelp" class="form-text text-muted">Replace *** by the parameters</medium></div></form>');
      }
    });

    $('#search').click(function(){
      if($('#form option:selected').val() == 'sender'){
        $.post('http://localhost:3000/email/query', {
          sender: {
            $regex: $('#inputSender').val()
          }
        }, emails => showResult(emails))
      }
      else if($('#form option:selected').val() == 'subject'){
        $.post('http://localhost:3000/email/query', {
          title: {
            $regex: $('#inputSubject').val()
          }
        }, emails => showResult(emails))
      }
      else if($('#form option:selected').val() == 'date'){
        $.post('http://localhost:3000/email/query', {
          year: $('#inputDate').val()
        }, emails => showResult(emails))
      }

      else if($('#form option:selected').hasClass('queryAdmin')){
        $.post('http://localhost:3000/email/query', JSON.parse($('#inputQuery').val()), email => showResult(movies))
      }

    })
});

function showResult(emails){
  console.log(emails)
  emailsTab = emails;
  $("#grid").html("");
  if(emails.length > 0 && emails.length < 50) {
    $("#grid").append("<div class='col-12'>"+emails.length+" emails founds</div>")
  }
  else if (emails.length == 50) {
    $("#grid").append("<div class='col-12'>Max results reached: 50 emails displayed</div>")
  }
  else {
    $("#grid").append("<div class='col-12'>No result.</div>")
  }

  emails.forEach(function(email){
    $("#grid").append('<div class="mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--8dp" id='+email['_id']+'" alt=""/></figure><div class="mdl-card__title"><h2 class="mdl-card__title-text">'+email.sender+' ('+email.date+')</h2></div><div class="mdl-card__supporting-text bold">'+email.recipients+'</div><div class="mdl-card__supporting-text"></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="button'+email['_id']+'">More information</a><div class="mdl-layout-spacer"></div><button class="mdl-button mdl-button--icon mdl-button--colored"><i class="material-icons">favorite</i></button></div></div>');
    $('#button'+emaiil['_id']).click(function(event){
      var id = event.target.id.replace('button','');
      var myemail = emailsTab.find(function(m){
        return m['_id'] === id;
      })
      height = 400;
      width = 600;
      var top=(screen.height-height)/2;
      var left=(screen.width-width)/2;
      w = open("",'popup','top='+top+',left='+left+',width='+width+',height='+height+',toolbar=no,scrollbars=no,resizable=yes');
      w.document.write('<head>')
      w.document.write('<title>'+myemail.subject+'</title>')
      w.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">')
      w.document.write('</head>')
      w.document.write('<body>');
      w.document.write('<p><strong>Title: </strong>'+mymovie.subject+'</p>');
      w.document.write('<p><strong>Sender(s): </strong>'+myemail.sender+'</p>');
      w.document.write('<p><strong>Text: </strong>'+myemail.recipients+'</p>');
      w.document.write('<p><strong>Date: </strong>'+myemail.date+'</p>');
      w.document.write('</body>');
    });
  })
}
