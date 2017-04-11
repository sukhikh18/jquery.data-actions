/*!
 * Script name: data-actions
 * Script URI: https://github.com/nikolays93/jquery.data-actions/
 * Author: NikolayS93
 * Author URI: //vk.com/nikolays_93
 * Description: Common jQuery actions.
 * Version: 0.2
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

jQuery(function($){
  function replaceTextOnly($obj, from, to){
    var node = $obj.get(0);
    var childs = node.childNodes;
    for(var inc = 0; inc < childs.length; inc++) {
      if(childs[inc].nodeType == 3){ 
        if(childs[inc].textContent) {
          childs[inc].textContent = childs[inc].textContent.replace(from, to);
        } 
        else {
         childs[inc].nodeValue = childs[inc].nodeValue.replace(from, to);
        }
      }
    }
  }

  $('[data-target]').each(function(index, el) {
    var trigger = $(this).attr('data-trigger');
    var target = $(this).attr('data-target');
    var action = $(this).attr('data-action');
    var loadAction = $(this).attr('data-load-action');

    if( ! trigger ) trigger = 'click';
    target = ( target !== 'this' ) ? "'"+target+"'" : 'this';

    if( loadAction )
      eval( '$( ' + target + ' ).' + action + '();' );

    $(this).on(trigger, function(event) {
      var $target = $(this);

      if( action )
        eval( '$( ' + target + ' ).' + action + '();' );

      var toggleClass = $(this).attr('data-class-toggle');
      if( toggleClass ){
        $target.toggleClass(toggleClass);
      }

      var textReplace = $(this).attr('data-text-replace');
      var textReplaceTo = $(this).attr('data-text-replace-to');
      
      if( textReplace && textReplaceTo ){
        if( ! $(this).attr('data-text-replaced') ){
          replaceTextOnly($target, textReplace, textReplaceTo);
          $target.attr('data-text-replaced', 'true');
        }
        else {
          replaceTextOnly($target, textReplaceTo, textReplace);
          $(this).removeAttr('data-text-replaced');
        }
      }

      else if( textReplace ){
        $(this).attr('data-text-replace', $target.text());
        $target.text( textReplace );
      }
    });
  });
});