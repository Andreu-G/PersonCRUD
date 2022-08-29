const People = require('../models/people');
var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');

const getAllPeople = async (req, res) => {
    let people = await People.find();

    res.render('index', {
        people
    });

};
const getPerson = async (req, res) => {

};

const addPerson = async (req, res) => {

    let request = await GeneratePerson();
    let id = await IDManager(false);
    
    let person = new People ({
        name: request.results[0].name.first + " " + request.results[0].name.last,
        email: request.results[0].email,
        phone: request.results[0].phone,
        picture: request.results[0].picture.large,
        id
    });

    person.save();
    res.redirect('/');

};
const editPersonGET = async (req, res) => {
    let person = await People.findOne({ id: req.params.id});
    res.render('edit-person', {
        p: person
    })
};

const editPersonPOST = async (req, res) => {
    let person = await People.findOne({ id: req.params.id});
    await person.updateOne({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    await person.save();
    console.log("y");
    res.redirect('/');
};

const deletePerson = async (req, res) => {
    await People.deleteOne({ id: req.params.id});
    res.redirect('/');
};

const deleteAll = async (req, res) => {
    await People.deleteMany({});
    await IDManager(true);
    res.redirect('/');
}

async function GeneratePerson()
{
    return person = await fetch('https://randomuser.me/api/').then(response => response.json());
}

function IDManager(reset){

    let file = fs.readFileSync(path.resolve(__dirname, '../database/indexer.json'));
    let result = JSON.parse(file);
    let id = result.currentID;
    let data;
    if (reset)
    {
        data ={ currentID: 0 }
    } else {
        data =
        { currentID: result.currentID + 1 }
    }
    fs.writeFileSync(path.resolve(__dirname, '../database/indexer.json'), JSON.stringify(data));
    return id;
};



module.exports = {
    getAllPeople,
    getPerson,
    addPerson,
    editPersonGET,
    editPersonPOST,
    deletePerson,
    deleteAll
}