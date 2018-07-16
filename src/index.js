import _ from 'lodash';
import './scss/style.scss'
function component() {
    var element = document.createElement('div');
    
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    element.classList.add('helloImg');
    element.onclick = function(){
        this.classList.toggle('hoho')
    }
    return element;
}
  
document.body.appendChild(component());