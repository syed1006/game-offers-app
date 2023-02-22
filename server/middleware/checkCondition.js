const checkCondition = (user, installedDays, offer)=>{
    let age = user.age;
    let country = user.country;
    let level = user.level;
    let purchaser = user.purchaser;
    const today = new Date()
    if(!(offer?.schedule?.days?.includes(today.getDay() + 1))){
        return false;
    }
    if(!(offer?.schedule?.dates?.includes(today.getDate() + 1))){
        return false;
    }
    if(!(offer?.schedule?.months?.includes(today.getMonth() + 1))){
        return false;
    }

    let str = offer.target;
    str = str.replace('and', '&&');
    str = str.replace('or', '||')
    let res = eval(str);
    return res;
}
module.exports = checkCondition;