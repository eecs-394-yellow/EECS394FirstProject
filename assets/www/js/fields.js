/**
 * Fields Module 
 * 
 * By Ethan Romba
 * 
 * A module for adding fields to a profile section.
 */ 

(function( window, $ ) {


Fields = function( $element ) {

  // Private members

    var $this = $element,
    settings = {
      classPrefix: 'field'
    };

  function getClassName( fieldName ) {
    return settings.classPrefix + '-' + fieldName.replace( ' ', '-' );
  }

  // Public members

  return {
    add: function( name, value ) {
      if (name !== '') {
        var className = getClassName( name );
        $this.append( '<div class="' + className + ' field">' +
          '<span class="name">' + name + '</span>' +
          '<span class="value">' + value + '</span></div>' );
      }
    },
    update: function( name, value ) {
      $this.find( '.' + getClassName( name ) + ' .value' ).text( value );
    },
    remove: function( name ) {
      $this.find( '.' + getClassName( name ) ).remove();
    }
  };

};


})( window, jQuery );
