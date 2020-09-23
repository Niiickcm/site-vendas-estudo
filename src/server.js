const express = require("express")
const server = express()

//pegar o banco de dados 
const db = require("./database/db")

server.use(express.static("public"))

//habilitar o req.body
server.use(express.urlencoded({ extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express:server,
    noCache:true
})


server.get("/cadastrar-se", (req,res) =>{
    return res.render("cadastrar.html")
})

server.post("/saved", (req,res) =>{
     //inserir dado no banco de dados

            const query = `
            INSERT INTO produtos  (
                    image,
                    title,
                    description,
                    value,
                    value_times
            ) 
            VALUES (?,?,?,?,?);`

        const values = [
            req.body.image,
            req.body.title,
            req.body.description,
            req.body.value,
            req.body.value_times
        ]

        function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        
        return res.render("cadastro-produtos.html", { saved: true})
        }

        db.run(query,values,afterInsertData)
})

server.get("/logar-se", (req,res) =>{
    return res.render("login.html")
})

server.get("/", (req,res) =>{

    db.all(`SELECT * FROM produtos`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        //const total = rows.length

        return res.render("index.html", { produtos : rows})
    })
})

server.get("/especificacao", (req,res) =>{
    return res.render("especificacao.html")
})

server.get("/produto", (req,res) =>{
    return res.render("produto.html")
})

server.get("/cadastro-produtos", (req,res) =>{
    return res.render("cadastro-produtos.html")
})

server.listen(5500)