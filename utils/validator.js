class Validator {
    constructor (config) {
        this.config = config;
    }    

    validate (data) {
        
        const configKeys = Object.keys(this.config);

        for(let i = 0; i < configKeys.length; i++) {

            const validatingElement = configKeys[i];

            if(data[validatingElement].length < this.config[validatingElement]) 
            {
                return false
            }

        }

        return true;

    }
}

module.exports = Validator;