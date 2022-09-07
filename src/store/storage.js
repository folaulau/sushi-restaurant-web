
const Storage = {

    set: (key, json) => {
        
        localStorage.setItem(key, JSON.stringify(json))
        
    },
    get: (key) => {
        
        let value = localStorage.getItem(key)

        if(value){
            return JSON.parse(value);
        }
        return {}
    }
}

export default Storage;