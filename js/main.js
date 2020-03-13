const dailyMenuFi = document.querySelector("#dailyMenuFi");
const dailyMenuEn = document.querySelector("#dailyMenuEn");
const coursesFi = [];
const coursesEn = [];

const sodexoRuoka = async () => {
    let response;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    if(month < 10){
      month = "0"+ (date.getMonth()+1);
    }else{
      month = date.getMonth()+1;
    }
    console.log(month);
    //let url=`https://www.sodexo.fi/ruokalistat/output/weekly_json/152`;
    let url = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${year}-${month}-${day}`;
    try {
      response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);

      }
    } catch (error) {
      console.error('getGithubReposOfUser error', error.message);
    }
    let data = await response.json();
    console.log(data);
    noFood(data);
    return data;
  };
sodexoRuoka()
.then(data => todaysCourses(data));



const todaysCourses = (data) =>{
  /*
  let date = new Date();
  let weekday = getDay();
  const courses = Object.values(data.mealdates[${weekday}].courses);
   */
  //console.log(data.mealdates[0].courses);
  console.log(data.courses);
  const courses = Object.values(data.courses);
  //const courses = Object.values(data.mealdates[0].courses);
  for (let course of courses) {
      coursesFi.push(course.category + ": " +  course.title_fi + " \n " + course.properties + " \n " + course.price );
      coursesEn.push(course.title_en + " \n " + course.properties + " \n " + course.price );

  }
  console.log(coursesFi[0]);
  menuListFi(coursesFi);
  menuListEn(coursesEn);
};

const menuListFi = (menu) => {
  dailyMenuFi.innerHTML = "";
  const ul = document.createElement('ul');
  ul.setAttribute("id","menuListFi");
  console.log("courses",coursesFi);
    for(const courses of menu){
      const li = document.createElement('li');
      li.setAttribute("class","listItemsFi");
      li.textContent = courses;
      ul.appendChild(li);

    }
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  if(month < 10){
    month = "0"+ (date.getMonth()+1);
  }else{
    month = date.getMonth()+1;
  }
  dailyMenuFi.innerHTML = `<h3 class="menuHeader">Sodexo Suomi: ${day}-${month}-${year}</h3>`;
   dailyMenuFi.appendChild(ul);
};
const menuListEn = (menu) => {
  dailyMenuEn.innerHTML = "";
  const ul = document.createElement('ul');
  ul.setAttribute("id","menuListEn");
  console.log("coursesEn",coursesEn);
  for(let courses of menu){
    const li = document.createElement('li');
    li.setAttribute("class","listItemsEn");
    ul.appendChild(li);
    li.textContent =courses;
  }
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  if(month < 10){
    month = "0"+ (date.getMonth()+1);
  }else{
    month = date.getMonth()+1;
  }

  dailyMenuEn.innerHTML = `<h3 class="menuHeader">Sodexo English:  ${day}-${month}-${year}</h3>
   `;
  dailyMenuEn.appendChild(ul);
};



const noFood = (data) => {

  if (data.courses === null) {
    dailyMenuFi.innerHTML = `<h3>Ei ruokalistaa saatavilla!</h3><br>
    <h5>Auki vain arkisin.</h5>
`;
    dailyMenuEn.innerHTML = `<h3>No menu available!</h3><br>
    <h5>Only open weekdays.</h5>`;
  }

};

const displayTimer = () => {
  setTimeout(() => {
    dailyMenuFi.style.display = "none";
    dailyMenuEn.style.display= "block";
  }, 20000);

};

displayTimer();

const locationSwapTimer = () =>{
  setTimeout(() => {
    window.location.replace("http://users.metropolia.fi/~samulili/testi/tiedote");
  }, 40000);
};
locationSwapTimer();
/*


let lang = 'fi';
const parseDailyMenu = (sodexoDailyMenu, lang) => {
  const courses = Object.values(sodexoDailyMenu);
  let dailyMenu = [];
  for (const course of courses) {
    if (lang === 'fi') {
      dailyMenu.push(course.category + ": " +  course.title_fi);
    } else {
      dailyMenu.push(course.title_en);
    }
  }
  return dailyMenu;
};

const getDailyMenu = (lang, weekDay = 0) => {
  return parseDailyMenu(SodexoLunchMenu.courses, lang);
};




const menuLanguage = (lang) => {
  document.getElementById('ravintolat1').innerHTML = "";
  console.log(document.getElementById('ravintolat1'));
  const ul = document.createElement('ul');
  if(lang === 'en'){
    for(const courses of coursesEn){
      const li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML +=courses;
    }
  }else if(lang === 'fi'){
    for(const courses of coursesFi){
      const li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML +=courses;
    }
  }
  document.getElementById('ravintolat1').appendChild(ul);
};

 */