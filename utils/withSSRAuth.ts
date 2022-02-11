import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps{
 return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    console.log(ctx.req.cookies)

    const cookies = parseCookies(ctx)
    
    if(!cookies['nextauth.token']){
      return{
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    } 
    
    return await fn(ctx)

 }
}