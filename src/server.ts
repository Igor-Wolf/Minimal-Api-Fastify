import fastify from "fastify";
import cors from "@fastify/cors"


const server = fastify({ logger: true })


//Configuração do cors
server.register(cors, {
    //origin: ["www.dio.me", "www.nome do site"]
    origin: "*",
    methods: ["GET", "POST"]
})

const teams = [

    {id: 1, name: "ferrari"}

]

const drivers = [
    {id:1 , name: "Max Verstappen", team:"Red Bull Racing"},
    {id:2 , name: "Rubens Barrichello", team:"Ferrari"}
]



server.get("/teams", async (request, response) => {
    response.type("application/json").code(200)

    return teams
})



server.get("/drivers", async (request, response) => {
    
    response.type("application/json").code(200)
    return drivers

})


interface DriverParams{
    id: string
}



server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
    
    const id = parseInt(request.params.id)
    const driver = drivers.find((d) => d.id === id)


    if (!driver) {
        
        response.type("application/json").code(404)
        return {message:"Driver not found"}
    }
    else {
        response.type("application/json").code(200)
        return driver
    }

})

server.listen({ port: 3333 }, () => {
    console.log("Server init")
})