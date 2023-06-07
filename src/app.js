import {plus} from './plus.js'
import './style.css';
import rabbit from './images/rabbit.png';
import rabbit2 from './images/rabbit2.png';
//dist 폴더에 있는 이미지의 용량이 작다! 1.5mb 1mb

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

