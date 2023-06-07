let projectsCont = document.getElementById("projects_cont");
let techsImgs = document.getElementById("techs_imgs");
const techListElement = document.getElementById("techList");
const contactForm = document.getElementById("contact-form");

function getData() {
  fetch("/db.json")
    .then((res) => res.json())
    .then((data) => {
      formatData(data.projects);
      getTechs(data.techs);
    });
}

function formatData(data) {
  let formattedData = [];
  const names = data.name;
  const descriptions = data.description;
  const technologies = data.technologies;
  const github = data.github;
  const links = data.links;

  for (let i = 0; i < names.length; i++) {
    formattedData = formattedData.concat({
      name: names[i],
      descriptions: descriptions[i],
      technologies: technologies[i],
      github: github[i],
      links: links[i],
    });
  }

  showData(formattedData);
}

function showData(data) {
  data.map(function (project) {
    let div = document.createElement("div");
    let name = document.createElement("h3");
    let description = document.createElement("p");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let link = document.createElement("a");
    let visit = document.createElement("span");

    name.innerHTML = `${project.name}`;
    description.innerHTML = `${project.descriptions}`;
    link.href = project.github;
    visit.innerHTML = " arrow_forward ";

    ul.className = "tech_list";
    div.className = "project-box";
    link.className = "project-link";
    visit.className = "material-symbols-outlined";

    project.technologies.map(function (i) {
      let img = document.createElement("img");
      img.className = "tech_icons_img";
      li.className = "tech_icons";
      img.src = `./${i}.png`;
      li.appendChild(img);
      ul.append(li);
    });

    div.appendChild(name);
    div.appendChild(description);
    div.appendChild(ul);
    div.appendChild(link);
    link.appendChild(visit);
    projectsCont.appendChild(div);
  });
}

function getTechs(data) {
  for (const k in data) {
    const techCategory = document.createElement("div");
    const techCategoryTitle = document.createElement("h3");
    techCategory.className = "techCategory";
    techCategoryTitle.innerHTML = k;
    techCategory.append(techCategoryTitle);

    data[k].map((i) => {
      const techCard = document.createElement("div");
      const techImg = document.createElement("img");
      const techName = document.createElement("p");
      techCard.className = "techCard";

      techName.innerHTML = i;
      techImg.src = `./${i}.png`;
      techImg.id = `${k.replace(/\s/g, "")}T${data[k].indexOf(i)}`;

      techCard.append(techImg);
      techCard.append(techName);

      techCategory.append(techCard);
    });

    techListElement.append(techCategory);
  }
}

async function getLinks() {
  let links;

  await fetch("./db.json")
    .then((res) => res.json())
    .then((data) => (links = data.user));

  for (const key in links) {
    if (key === "profile_photo") {
      document.getElementById(key).src = links[key];
    }

    for (const k in document.getElementsByClassName(`${key}_link`)) {
      if (!isNaN(parseInt(k))) {
        document.getElementsByClassName(`${key}_link`)[k].href = links[key];
      }
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(this);
  const subject = encodeURIComponent(`You received a mail from ${data.get("name")} ${data.get("lastname")}`)
  const body = encodeURIComponent(data.get("comments"))
  console.log(body)
  window.location.href = `mailto:${import.meta.env.VITE_MAIL}?subject=${subject}&body=${body}`
}

contactForm.addEventListener("submit", handleSubmit);

getData();
getLinks();
