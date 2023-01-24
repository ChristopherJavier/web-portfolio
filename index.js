let projectsCont = document.getElementById('projects_cont');

function getData() {
    fetch('./db.json')
        .then(res => res.json())
        .then(data => formatData(data.projects));
}

function formatData(data) {
    let formattedData = []
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
            links: links[i]
        })
    }

    showData(formattedData)
}

function showData(data) {
    console.log(data)
    data.map(function (project) {
        let div = document.createElement('div')
        let name = document.createElement('h3')
        let description = document.createElement('p')
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        name.innerHTML = `${project.name}`
        description.innerHTML = `${project.descriptions}`
        ul.className = "tech_list"
        div.className = "project-box"

        project.technologies.map(function (i) {
            let img = document.createElement('img')
            img.className = "tech_icons_img"
            li.className = "tech_icons"
            img.src = `./assets/${i}.png`
            li.appendChild(img)
            ul.append(li)
        })

        div.appendChild(name)
        div.appendChild(description)
        div.appendChild(ul)
        projectsCont.appendChild(div)
    })
}

getData();