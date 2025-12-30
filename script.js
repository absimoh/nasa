const app = {

    init(){
        this.updateClock()
        this.stars()

        // Hide system loader
        setTimeout(()=>{
            document.getElementById('loader').style.display='none'
        },1000)

        // Map loader (لو موجود)
        const iframe = document.getElementById('nasaMap')
        const mapLoader = document.getElementById('mapLoader')
        if(iframe && mapLoader){
            iframe.onload = () => {
                mapLoader.style.display='none'
            }
        }

        setInterval(()=>this.updateClock(),1000)
    },

    updateClock(){
        const time = new Date().toISOString().split('T')[1].split('.')[0]
        document.getElementById('clock').innerText = time + ' UTC'

        const mapClock = document.getElementById('mapClock')
        if(mapClock) mapClock.innerText = time
    },

    navigate(id){
        document.querySelectorAll('.section').forEach(s=>{
            s.classList.remove('active')
        })

        const target = document.getElementById(id)
        if(!target) return

        target.classList.add('active')
        document.body.style.overflow = id === 'solar' ? 'hidden' : 'auto'
        window.scrollTo(0,0)
    },

    /* 🔍 SEARCH PLANET */
    searchPlanet(e){
        if(e.key !== 'Enter') return

        let planet = e.target.value.trim().toLowerCase()
        if(!planet) return
    
        // 🌍 تحويل عربي → إنجليزي
        const planetsMap = {
            "عطارد": "mercury",
            "الزهرة": "venus",
            "ارض": "earth",
            "الأرض": "earth",
            "المريخ": "mars",
            "المشتري": "jupiter",
            "زحل": "saturn",
            "اورانوس": "uranus",
            "أورانوس": "uranus",
            "نبتون": "neptune",
            "القمر": "moon",
            "الشمس": "sun"
    }

    // لو كتب عربي
    if(planetsMap[planet]){
        planet = planetsMap[planet]
    }

    const map = document.getElementById('nasaMap')
    map.src = `https://eyes.nasa.gov/apps/solar-system/#/${planet}`

    e.target.value = ''
}


    /* ⭐ STARS BACKGROUND */
    stars(){
        const canvas = document.getElementById('star-canvas')
        const ctx = canvas.getContext('2d')

        let w,h
        const resize = ()=>{
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize',resize)

        const stars = Array.from({length:120},()=>({
            x:Math.random()*w,
            y:Math.random()*h,
            r:Math.random()*1.5,
            s:Math.random()*.4+.2
        }))

        function animate(){
            ctx.clearRect(0,0,w,h)
            stars.forEach(s=>{
                s.y -= s.s
                if(s.y < 0){
                    s.y = h
                    s.x = Math.random()*w
                }
                ctx.fillStyle = 'rgba(0,240,255,.8)'
                ctx.beginPath()
                ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
                ctx.fill()
            })
            requestAnimationFrame(animate)
        }
        animate()
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    app.init()
    app.navigate('home')
})
