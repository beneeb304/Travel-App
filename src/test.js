const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/testdb',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const UserSchema = new Schema({
        name: {
            type: String,
            required: true
       },
        age:{
            type:Number,
            required: true
        }
})
const User = mongoose.model('User',UserSchema)
/*
const user1 = new User({
    name : 'Peter',
    age : 46
})
user1.save((error,result)=>{
    if (error)
        console.log(error)
    else
        console.log(result)
});


many_users=[{
        name: 'Mary',
        age: 43
    },{
        name: 'Peter',
        age: 11
    },{
        name: 'Tony',
        age: 45
    }]
    User.create(many_users,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
})
    

   User.find({age :  {$gt: 30} },(error,result)=>{
            if(error)
            console.log(error)
            else
            console.log(result)
    })
      
    User.find({age : {$gt: 30, $lt: 40}, },(error,result)=>{
                if(error)
                console.log(error)
                else
                console.log(result)
    })

    User.find({$or :[
            {age: {$gt: 30, $lt: 40}},
            {name: 'Peter'}
    ]},(error,result)=>{
                if(error)
                console.log(error)
                else
                console.log(result)
        })
        */
/*
User.updateMany({name: 'Mary'},{name : 'Jill'},(error,result)=>{
                if(error)
                    console.log(error)
                else
                    console.log(result)
        })
        */

User.deleteMany({name: 'Jill'},(error,result)=>{
                if(error)
                    console.log(error)
                else
                    console.log(result)
})

User.updateMany({name : 'Tony', age :{$lt : 50} },{name : 'Tony Stark', age: 55},(error,result)=>{
            if(error)
                console.log(error)
            else
                console.log(result)
})