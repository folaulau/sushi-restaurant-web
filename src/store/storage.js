
const Storage = {

    setJson: (key, json) => {
        localStorage.setItem(key, JSON.stringify(json))
    },
    getJson: (key) => {
        
        let value = localStorage.getItem(key)

        if(value){
            return JSON.parse(value);
        }

        return {}
    },
    set: (key, value) => {
        localStorage.setItem(key, value+"")
    },
    get: (key) => {
        
        let value = localStorage.getItem(key)

        if(value){
            return value;
        }

        return null
    }
}

export default Storage;