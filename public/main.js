window.addEventListener('load', () => {
    register()
})

async function register(){
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('./sw.js')
        }catch(error) {
            console.error('SW registration failed')
        }
    }
}