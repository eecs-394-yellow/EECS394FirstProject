/**
 * Cross-Browser HTML5 Placeholder Text
 * 
 * Inspired by Nico Hagenburger:
 * http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
 */

$('[placeholder]')
  .focus(function() {
    var $input = $(this);
    if ($input.val() == $input.attr('placeholder')) {
      $input
        .val('')
        .removeClass('placeholder');
    }
  })
  .blur(function() {
    var $input = $(this);
    if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
      $input
        .addClass('placeholder')
        .val( $input.attr('placeholder') );
    }
  })
  .blur();

// Ensure the placeholder text is never submitted to the server

$('[placeholder]')
  .parents('form')
    .submit(function() {
      $(this).find('[placeholder]').each(function() {
        var $input = $(this);
        if ($input.val() == $input.attr('placeholder')) {
          $input.val('');
        }
      })
    });