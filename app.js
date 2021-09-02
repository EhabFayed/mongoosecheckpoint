const express = require('express');
const mongoose = require('mongoose')

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/test')

const personScehma= new mongoose.Schema({
  name: {type:String, require :true},
  age: Number,
  favoriteFoods : [String]
})
const Person = mongoose.model('person', personScehma);

const addPerson = async() => {
  const person = new Person({
    name: 'ehab',
    age: 40,
    favoriteFoods: ['pizza', 'chesse']
  }) 

  const res = await person.save();
  console.log(res);
}
//addPerson()

const findPerson = async() => {
  
  
  const res = await Person.find()
  console.log(res);
}
//findPerson()
const findOne = async() => {
  
  
  const res = await Person.findOne({favoriteFoods:'btabtes'})
  console.log(res);
}
// findOne()
/*(async () => {
 const result = await Person.findById("612a5eb27355a0508d27558c");
 console.log('result : ', result)
})*/
const findEditThenSave = function(PersonId, done) {
  const foodToAdd = 'hamburger';
  Person.findById("612e79e42e9c3b176b9b6c12", function(err, data) {
    data.favoriteFoods.push(foodToAdd);
    data.save();
    if (err) {
      console.log(err);
    }
    else {
      console.log(data);
    }
  });
};
//findEditThenSave();
const findAndUpdate= async() => {
  const res = await Person.findOneAndUpdate({age:{$gte:40}},{age:30})
 
}
//findAndUpdate();
const findIdAndRemove= async() => {
  const res = await Person.findByIdAndRemove("612e79e42e9c3b176b9b6c12",)
}
//findIdAndRemove();
const findAndRemove= async() => {
const res = await Person.remove({name:"ehab"},(err, data) => {
    if(!err){
      console.log(data);
    }
  })

}
findAndRemove();
app.listen(port);