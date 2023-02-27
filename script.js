const gBtn = document.querySelector('.btn');
const form = document.querySelector('.form');
const eror = document.querySelector('.eror');
const formBox = document.querySelector('.form-box');
const loader =document.querySelector('.loader');
const profile = document.querySelector('.profile');

gBtn.addEventListener('click' , ()=> {
  const inpt = document.querySelector('#username');
  formBox.style.display = 'none';
  loader.style.display = 'block';
  setTimeout(() => {
    if(inpt.value == ''){
      eror.style.display = 'block'
      eror.textContent = '*Please enter your username.';
      formBox.style.display = 'block';
      loader.style.display = 'none';
    } if(inpt.value[0] == '@'){
      eror.style.display = 'block'
      eror.textContent = '*Don\'t use @';
      formBox.style.display = 'block';
      loader.style.display = 'none';
    } if(!(inpt.value =='') && !(inpt.value[0]=='@')){
      let username = inpt.value; 
      github(username);
    }
  }, 1000);
})

function github(username){
  let xhr = new XMLHttpRequest();
  xhr.open('GET' , `https://api.github.com/users/${username}` , true);
  xhr.onload = function(){
    if(this.status === 200){
      eror.style.display = 'none';
      let jsn = JSON.parse(this.responseText);
      let fName = jsn.name;
      let pic = jsn.avatar_url;
      let bio = jsn.bio;
      let followers =  jsn.followers;
      let following = jsn.following;
      let id = `@${jsn.login}`;

      document.querySelector('#pic').src = pic;
      document.querySelector('#fname').textContent = fName;
      document.querySelector('.id').textContent = id;
      document.querySelector('.fols').textContent = followers;
      document.querySelector('.folg').textContent = following;
      document.querySelector('#bio').textContent = bio;

      const githubUrl = document.querySelector('#github-url');
      githubUrl.href = 'https://github.com/'+jsn.login;
      

      profile.style.display = 'flex'
      form.style.display = 'none'
      loader.style.display = 'none';
    } else {
      formBox.style.display = 'block';
      loader.style.display = 'none';
      eror.style.display = 'block';
      eror.textContent = 'Username Not Found! try again.';
    }
  }
  xhr.send();
}
