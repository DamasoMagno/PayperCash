import { createServer, Factory, hasMany, Model } from "miragejs";
import faker from "faker";

export function makeServer(){
  const server = createServer({
    models: {
      user: Model,
      ocurrency: Model,
    },

    seeds(server){
      server.db.loadData({
        user: { 
          name: "Unidade Tomé",
          address: "Rua Ana Luiza Braga, 1881",
          email: "ubsmadalenas@gmail.com",
          contact: "(88) 9 9823-4324"
        },

        ocurrencies: [
          {
            id: 1,
            title: "123"
          },
          {
            id: 2,
            title: "123"
          },
          {
            id: 3,
            title: "123"
          },
        ]
      })
    },
  
    routes(){
      this.namespace = "api";
      this.timing = 300;
      
      this.get("/user", () => {
        return this.schema.db.user.findBy({ name: "Unidade Tomé" })
      });

      this.get("/ocurrencies", () => {
        return this.schema.all("ocurrency");
      })
    }
  });

  return server;
}
