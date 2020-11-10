import {TimelineLite} from 'gsap';
const tl= new TimelineLite();

export function cardContent(number){
  if(document.getElementById('card_container') !==null){
    return 0;
  }else{
    let parent = document.getElementById('content');
    let container = document.createElement('div');


    let image = document.createElement('img');

    let desc_container = document.createElement('div');
    desc_container.setAttribute('id','d_container');

    let desc = document.createElement('p');
    desc.setAttribute('id','c_desc');

    let link = document.createElement('a');
    link.setAttribute('id','c_link');

    let siteLink = document.createElement('a');
    siteLink.setAttribute('id','c_slink');

    let linkBundle = document.createElement('div');

    let githubicon = document.createElement('i');
    let webicon = document.createElement('i');

    let exit_button = document.createElement('button');
    let exit_icon = document.createElement('i');

    container.setAttribute('id','card_container');
    image.setAttribute('id','card_image');

    exit_button.setAttribute('id','card_exit');

    exit_icon.setAttribute('class', 'fa fa-close fa-2x');


    githubicon.setAttribute('class', 'fa fa-github fa-2x');
    webicon.setAttribute('class', 'fas fa-globe-americas fa-2x');

    parent.appendChild(container);
    container.appendChild(exit_button);
    exit_button.appendChild(exit_icon);


    container.appendChild(image);
    container.appendChild(desc_container);

    desc_container.appendChild(desc);

    desc_container.appendChild(linkBundle)
    linkBundle.appendChild(link);
    linkBundle.appendChild(siteLink);

    link.appendChild(githubicon);
    siteLink.appendChild(webicon);

    addContent(number);
  }

}

function addContent(number){
  if(document.getElementById('card_container') !==null){
    let image = document.getElementById('card_image');
    let desc = document.getElementById('c_desc');
    let link = document.getElementById('c_link');
    let site_link = document.getElementById('c_slink');

    if(number=="1"){
      image.src = 'https://i.redd.it/pc00y2gufgb01.jpg';
      desc.innerHTML = 'Laravel Ecommerce Simulator';
      link.href = "https://github.com/zydricDev/ecom";
      site_link.href = "http://ecom-example.zdev-devsite.com/";
    }
    if(number=="2"){
      image.src = 'https://i.imgur.com/X30bDWy.jpeg';
      desc.innerHTML = 'Three.js Card Display';
      link.href = "https://github.com/zydricDev/Three_JS";
      site_link.href = "http://zdev-devsite.com/work.html";
    }
    if(number=="3"){
      image.src = 'https://gameranx.com/wp-content/uploads/2016/06/Dishonored-2-394P-Wallpaper-3-700x394.jpg';
      desc.innerHTML = 'Canvas Landing Page';
      link.href = "https://github.com/zydricDev/Home_canvas_testing";
      site_link.href = "http://zdev-devsite.com";
    }
    if(number=="4"){
      image.src = 'https://images2.alphacoders.com/678/678024.png';
      desc.innerHTML = 'TBA';
      link.href = "http://zdev-devsite.com";
      site_link.href = "http://zdev-devsite.com";
    }
    if(number=="5"){
      image.src = 'https://images8.alphacoders.com/678/678023.jpg';
      desc.innerHTML = 'TBA';
      link.href = "http://zdev-devsite.com";
      site_link.href = "http://zdev-devsite.com";
    }
    link.target = "_blank";
    site_link.target = "_blank";

    tl.fromTo(image, 0.5, {opacity: 0, top: "-1000px"},{opacity: 1, top: "0px"})
    .fromTo(desc.parentNode, 0.5, {opacity: 0, bottom: "-1000px"},{opacity: 1, bottom: "0px"},"-=0.5")
    .fromTo(desc, 0.5, {opacity: 0, bottom: "-1000px"},{opacity: 1, bottom: "0px"},"-=0.5");
  }

}

export function switchContent(number){
  addContent(number);
}


export function closeContent(e){
  let exit_btn = document.getElementById('card_exit');
  exit_btn.removeEventListener('click',closeContent);

  let container = document.getElementById('card_container');
  //let parent_of_container = container.parentNode;

  container.remove();
}
