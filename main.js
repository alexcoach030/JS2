let text = 'One: \'Hi Mary.\' Two: \'Oh, hi.\'\n' +
    'One: \'How are you doing?\'\n' +
    'Two: \'I\'m doing alright. How about you?\'\n' +
    '    One: \'Not too bad. The weather is great isn\'t it?\'\n' +
    '    Two: \'Yes. It\'s absolutely beautiful today.\'\n' +
    'One: \'I wish it was like this more frequently.\'\n' +
    'Two: \'Me too.\'\n' +
    'One: \'So where are you going now?\'\n' +
    'Two: \'I\'m going to meet a friend of mine at the department store.\'\n' +
    'One: \'Going to do a little shopping?\'\n' +
    'Two: \'Yeah, I have to buy some presents for my parents.\'\n' +
    'One: \'What\'s the occasion?\'\n' +
    '    Two: \'It\'s their anniversary.\'\n' +
    'One: \'That\'s great. Well, you better get going. You don\'t want to be late.\'\n' +
    'Two: \'I\'ll see you next time.\'\n' +
    'One: \'Sure. Bye.\'';


let editText = text.replace(/'/igm,'"');
let editText2 = editText.replace(/\b[a-z]+"[a-z]+\b/ig, (str) => str.replace(/"/, '\''));
console.log(editText2);
alert(editText2);

document.querySelector('.btn-join').addEventListener('click', getForm);
function getForm () {
    let form = document.forms.registration;
    if(!(form.name.value.match(/^[a-z]{1,16}$/i))) {
        form.name.insertAdjacentHTML('afterend', `Введено некорректное имя`);
        document.querySelector('.input-name').style.backgroundColor = '#ff4455';
    }
    if(!(form.telephone.value.match(/\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}/g))) {
        form.telephone.insertAdjacentHTML('afterend', `Введён некорректный номер`);
        document.querySelector('.input-tel').style.backgroundColor = '#ff4455';
    }
    if(!(form.mail.value.match(/^[a-z0-9._-]{1,10}[ .-]?[a-z0-9._-]{1,10}@[a-z0-9._-]{1,10}\.[a-z0-9._-]{2,4}$/iu))) {
        form.mail.insertAdjacentHTML('afterend', `Введён некорректный майл`);
        document.querySelector('.input-mail').style.backgroundColor = '#ff4455';
    }
}