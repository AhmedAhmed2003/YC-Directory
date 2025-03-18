declare module "next-auth" {
    interface Session {
      id?: string;
     
    }
  
    interface JWT {
      id?: string;
    }
  }
  
  declare module "next-auth/providers/github" {
    interface Profile {
      id: number;
      login: string;
      bio?: string;
    }
  }
  
  