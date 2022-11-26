import { JwtPayload } from "jsonwebtoken";

//рекомендуемые опции MongoDB
export const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
};

//создаю в пространстве имен новые поля для Typescript
declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload
    }
  }
}


export function initData(userID: string) {
  return [
    {
      title: "Доделать чит для forza horizon 5 ",
      description: "цена будет около 24.7$, нужно достать Skrill без бана, или эфир ",
      userID,
      image:"5313a9cf-f04b-4b90-8a92-209002bf6b3d.jpeg"
    },
    {
      title: "Sherlock Holmes",
      description: "life is infinitely stranger",
      userID,
      image:""
    },
    {
      title: "trpc + nest.js + mongodb + next.js",
      description: "its gonna be really awesome app",
      userID,
      image:"e27b0658-9267-4938-bbef-b8394b09883c.png"
    },
    {
      title: "where is my coroutines.js Carl?",
      description: "wtf 60fps in the internet explorer Carl",
      userID,
      image:"6341f9fe-915e-4184-ab0b-6cc685bc1fd3.png"
    },
    {
      title: "can you love me again?",
      description: "she said ill try >_< ",
      userID
    },
    {
      title: "Chainsaw-man",
      description: "really good anime",
      userID,
      image:"d30298c6-6242-4a60-8178-c9ce85a6a4b1.jpg"
    },
    {
      title: "Добавь 45 todo, ",
      description: "чтобы заработало infinite-scroll pagination ?page=1&limit=15",
      userID,
      image:"0c474728-ccee-4105-9a59-954d4861d2e2.jpeg"
    },
  ]
}
