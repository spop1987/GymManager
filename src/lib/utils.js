module.exports = {
    blood(bloodType){
        // console.log(bloodType)

        if(bloodType == "A1")
            return blood = "A+"
        if(bloodType == "A0")
            return blood = "A-"
        if(bloodType == "B1")
            return blood = "B+"
        if(bloodType == "B0")
            return blood = "B-"
        if(bloodType == "AB1")
            return blood = "AB+"
        if(bloodType == "AB0")
            return blood = "AB-"
        if(bloodType == "O1")
            return blood = "O+"  
        if(bloodType == "O0")
            return blood = "O-"        
    },
    age(timestamp){
        // inicio un objeto de data
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
    
        const month = today.getMonth() - birthDate.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }
        return age
    },
    date(timestamp){
        const date = new Date(timestamp)

        // yyyyS
        const year = date.getUTCFullYear()
        // mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // porque janeiro = 0 e dezembro = 11

        // dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        // return yyyy-mm-dd
        // console.log(`${year}-${month}-${day}`)
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}
