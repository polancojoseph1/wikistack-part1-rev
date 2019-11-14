const morgan = require('morgan');
const layout = require('./views/layout');
const express = require('express');
const app = express();
const Sequelize = require('sequelize'); //do we always have to export?
const { db } = require('./models');
const user = require('./routes/user.js')
const wiki = require('./routes/wiki.js')

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })


app.use(morgan('dev'))
// app.use('/main')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false}))

const Page = db.define('page', {
    title: {type: Sequelize.STRING, allowNull: false, defaultValue: Sequelize.TEXT},
    slug: {type: Sequelize.STRING, allowNull: false, defaultValue: Sequelize.TEXT},
    content: {type: Sequelize.TEXT, allowNull: false, defaultValue: Sequelize.TEXT},
    status: Sequelize.ENUM('open', 'closed') // boolean;
  });

const User = db.define('user', {
    name: {type: Sequelize.STRING, allowNull: false, defaultValue: Sequelize.TEXT},
    email: {type: Sequelize.STRING, allowNull: false, defaultValue: Sequelize.TEXT, validate: {isEmail: true}
    }
});

const init = async () => {
    await db.sync({force: true});
}

init();

app.get('/', (req, res, next) =>{
    res.send(layout(''))
})
app.use('/wiki', wiki)
app.use('/user', user)
const port = 3000
app.listen(port, () => {
    console.log(`Local host ${port} is connecting!`)
})

