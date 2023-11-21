

function getBaseDomain(){
    
    if((window.location.hostname).indexOf("localhost") + 1){
        return "http://localhost:8092";
    } else {
        return "https://XXXXXXXXXXXXXXXXXXXXXXXXXX";
    }
    
}

const constant = {
    "baseDomain" : getBaseDomain(),
}

export default constant;