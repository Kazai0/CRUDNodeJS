const { response } = require('express');
const express = require('express');
const db = require('./models/');
const app = express();
const models = require("./models/");
const order = require('./models/order');
const Order = models.Order;
const User = models.User;
const Product = models.Product;

//método para mostrar json nas respostas
app.use(express.json());

//método responsável por listar todas entidades do banco de dados
app.get("/", (req, resp) => {
    Order.findAll().then(todos => {
        resp.send(todos);
    });
    
})

//método resposável pela atualização de entidades tabela dos pedidos
app.put("/orders/:id", (req, resp) => {
    Order.findByPk(req.params.id).then(o => {
        o.update(req.body).then((o2) => resp.send(o2.dataValues));
    })
})

//método resposável pela criação de entidades da tabela de orgers
app.post("/orders", (req, resp) => {
    Order.create(req.body).then(o => {
        resp.send(o.dataValues);

    });

});

//método responsável pela exclusão de entidades do banco de dados
app.delete("/orders/:id", (req, resp) => {
    Order.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => resp.send("sucess"));

})

//settando a porta para subir aplicação
app.listen(8080, () => {
    console.log("Glória a Deus");
})