let header, layer1, layer2, layer3, observer, aboutInterval, aboutpanel, projectspanel, aboutsection, skillz, skillzInterval, footer

function openurl(url, absolute=false){
    if(absolute){
        window.open(url,'_blank')
    }else{
        window.open(`https://blog.peterferencz.me/${url}`,'_blank')
    }
}

function load() {
    document.body.style.overflow = "auto"
    const loader = document.querySelector('#loader')
    const landingSection = document.querySelector('#landing')
    header = document.querySelector('#heading')
    layer1 = document.querySelectorAll(".layer1")
    layer2 = document.querySelectorAll(".layer2")
    layer3 = document.querySelectorAll(".layer3")
    fullscreenproject = document.querySelector('#fullscreenproject')
    projectspanel = document.querySelector('#projects')
    aboutsection = document.querySelector('#about')
    aboutpanel = document.querySelector('#aboutpanel')
    skillz = document.querySelector('#skillz')
    footer = document.querySelector('#footer')
    links = document.querySelector("#links")
    linksStartOffset = links.offsetTop
    
    setTimeout(() => {
        landingSection.classList.add('loaded')
        loader.remove()
        new TextScramble(header).setText("Hello I'm")
    }, 1000);
    
    //particlesJS.load('particlesjs', 'particlesjsconfig.json');
    
    const intersectobjects = document.querySelectorAll('.intersect')
    observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            
            if(entry.target.id == "aboutpanel"){
                new TextScramble(entry.target.querySelector('h1')).setText("About")
                if(aboutInterval == null){
                    aboutInterval = setInterval(() => {
                        new TextScramble(entry.target.querySelector('h1')).setText("About")
                    }, 10000)
                }
            } else if(entry.target.id == "projectstitle"){
                new TextScramble(entry.target).setText("Projects")
            } else if(entry.target.id == "skillz"){
                new TextScramble(entry.target.querySelector('h1')).setText("My skills")
                if(skillzInterval == null){
                    skillzInterval = setInterval(() => {
                        new TextScramble(entry.target.querySelector('h1')).setText("My skills")
                    }, 6000)
                }
            }
            entry.target.classList.add('visible')
            
        });
    }, {
        threshold: 0.1
    })
    intersectobjects.forEach(obj => {
        observer.observe(obj)
    });
    
    scroll()

    loader.classList.add('done')
}
window.onload = () => {
    load()
}
window.addEventListener('scroll', scroll)
window.addEventListener('resize', scroll)
function scroll(){
    if(!layer1) return;
    const scroll = window.scrollY
    layer1.forEach(element => {
        element.style.transform = `translateY(-${scroll * 2}px)`
    });
    layer2.forEach(element => {
        element.style.transform = `translateY(-${scroll}px)`
    });
    layer3.forEach(element => {
        if(element.id == "projects"){
            element.style.transform = `translateY(-${scroll / 2 - 200}px)`
        }else{
            element.style.transform = `translateY(-${scroll / 2}px)`
        }
    });

    const bounding = skillz.getBoundingClientRect()
    projectspanel.style.top = `${scroll + bounding.top + bounding.height + 50}px`
    const bounding2 = projectspanel.getBoundingClientRect()
    footer.style.top = `${scroll + bounding2.top + bounding2.height + 10}px`
}

async function writeOut(str){
    let i = 0;
    for (let i = 1; i <= str.length; i++) {
        await wait(100)
        header.textContent = str.slice(0, i)
    }
}

const wait = async (time) => new Promise((resolve) => setTimeout(resolve, time))