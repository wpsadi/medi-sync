export class Url {
    static get currentURL() {
        const url = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL; // this doesnt contain protocol like http:// or https://
        // check if its localhost since its the starts with localhost and ensure its not a domain like localhost.*.*
        //console.log(url);
        
        if (url.startsWith("localhost") && !url.match(/localhost\.\w+\.\w+/)) {
          return `http://${url}:${process.env.PORT}`;
        } else {
          return `https://${url}`;
        }
    }
    static extendURL(...args: string[]) {
        return new URL(args.join("/"), this.currentURL).toString();
    }
  
}