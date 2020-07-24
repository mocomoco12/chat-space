$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message__box" data-message-id=${message.id}>
          <div class="Message__info">
            <div class="Message__info-name">
              ${message.user_name}
            </div>
            <div class="Message__info-date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message__content">
            <p class="Message__content-text">
              ${message.content}
            </p>
            <img class="Message__content-image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Message__box" data-message-id=${message.id}>
        <div class="Message__info">
          <div class="Message__info-name">
            ${message.user_name}
          </div>
          <div class="Message__info-date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message__content">
          <p class="Message__content-text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Message').append(html);      
      $('form')[0].reset();
      $('.Message').animate({ scrollTop: $('.Message')[0].scrollHeight});
      $('.Form__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});