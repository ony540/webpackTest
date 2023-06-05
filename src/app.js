import {plus} from './plus.js'
import './style.css';
import rabbit from './images/rabbit.png';

console.log(plus(2,4));

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src="${rabbit}"/>`;
})

let env;
if (process.env.NODE_ENV === 'development') {
    env = dev;
} else {
    env = pro;
}

console.log(env);