
const Storage = {

    setJson: (key, json) => {
        localStorage.setItem(key, JSON.stringify(json))
    },
    getJson: (key) => {
        
        let value = localStorage.getItem(key)

        console.log("value, ",value)

        if(value === 'undefined' || value === undefined || value === null){
            return {}
        }

        return JSON.parse(value);
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