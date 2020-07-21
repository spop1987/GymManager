const { age, date } = require('../../lib/utils')
const Instructor = require('../models/instructor')

module.exports = {
    index(req, res){

        const { filter } = req.query
        if( filter ){
            Instructor.findBy(filter, function(instructors){
                return res.render("instructors/index", {instructors})
            })
        }else {
            Instructor.all(function(instructors){
                return res.render("instructors/index", {instructors})
            })

        }

    },
    create(req, res){
        return res.render("instructors/create")
    },
    post(req ,res){
        const keys = Object.keys(req.body)
        // Object creo un objeto con los elementos claves del req.body
        
        for( key of keys){
            if (req.body[key] == ""){
                return res.send(`Please, fill all the fields`)
            }
        }
        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },
    show(req, res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },
    edit(req, res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        // Object creo un objeto con los elementos claves del req.body
        
        for( key of keys){
            if (req.body[key] == ""){
                return res.send(`Please, fill all the fields`)
            }
        }
    
        Instructor.update(req.body, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res){
        Instructor.delete(req.body.id, function(){
            return res.redirect(`/instructors`)
        })
    },
}

// exports.index = function(req, res){
//     return res.render("instructors/index", {instructors : data.instructors })
// }
// exports.create = function(req, res){
//     return res.render("instructors/create")
// }
// // Create function
// exports.post = function(req, res){
//     // if(req.body.name == ""){
//     //     return res.send("Preencha o campo nome!!")
//     // }
//     // voy a hacer un constructor (funcion que permite crear objetos)
//     const keys = Object.keys(req.body)
//     // Object creo un objeto con los elementos claves del req.body
    
//     for( key of keys){
//         if (req.body[key] == ""){
//             return res.send(`Please, fill all the fields`)
//         }
//     }
//     let {avatar_url, birth, name, services, gender} = req.body

//     birth = Date.parse(req.body.birth)
//     const created_at = Date.now()
//     const id = Number(data.instructors.length + 1)

//     data.instructors.push({
//         id,
//         name,
//         avatar_url,
//         birth,
//         created_at,
//         gender,
//         services
//     })
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return res.send("Write file error")

//         return res.redirect("/instructors")
//     })
    
//     // return res.send(req.body)
// }
// // Show
// exports.show = function(req, res){
//     const { id } = req.params
//     const foundInstructor = data.instructors.find(function(instructor){
//         return instructor.id == id
//     })
//     if(!foundInstructor) return res.send("Instructor not found!!")


//     const instructor = {
//         ...foundInstructor,
//         age: age(foundInstructor.birth),
//         services: foundInstructor.services.split(","),
//         created_at: new Intl.DateTimeFormat('en-GB').format(foundInstructor.created_at),
//     }
//     return res.render("instructors/show", { instructor } )
// }
// // Edit
// exports.edit = function(req, res){
//     const { id } = req.params
//     const foundInstructor = data.instructors.find(function(instructor){
//         return instructor.id == id
//     })

//     if(!foundInstructor) return res.send('Instructor not found!!')


//     // instructor.birth = 093402930494382833904938
//     // date(instructor.birth)
//     // return yyyy-mm-dd

//     const instructor = {
//         ...foundInstructor,
//         birth: date(foundInstructor.birth).iso

//     }
//     // date(foundInstructor.birth)
    
//     return res.render('instructors/edit', {instructor})
// }

// // PUT
// exports.put = function(req, res){
//     const { id } = req.body
//     let index = 0
//     const foundInstructor = data.instructors.find(function(instructor, foundIndex){
//         if(id == instructor.id){
//             index = foundIndex
//             return true
//         }
//     })
//     if(!foundInstructor) return res.send('Instructor not found!!')

//     const instructor = {
//         ...foundInstructor,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.instructors[index] = instructor

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return res.send("Write Error!!!")

//         return res.redirect(`/instructors/${id}`)
//     })
// }

// //DELETE
// exports.delete = function(req, res){
//     const { id } = req.body
    
//     const filteredInstructors = data.instructors.filter(function(instructor){
//         return instructor.id != id
//     })

//     data.instructors = filteredInstructors

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return res.send("Write file error!!")

//         return res.redirect("/instructors")
//     })
// }