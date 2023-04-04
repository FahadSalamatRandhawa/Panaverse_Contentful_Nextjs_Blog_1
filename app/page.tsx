// /* @ts-expect-error Async Server Component */
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import * as styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog`, { cache: 'no-store' });
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  console.log(blogs.includes.Asset[0].fields.file.url)
  return (
    <div>
      {
        blogs.items.map((item:any)=>{
          return(
            <>
              <div key={item.sys.id}>
                <div>{item.fields.title}</div>
                <div>{documentToReactComponents(item.fields.description)}</div>
                <div>{blogs.includes.Asset.map((asset:any)=>(<>
                    <div key={asset.sys.id}>
                      {
                        item.fields.img.sys.id===asset.sys.id?
                        <Image src={"https:" + asset.fields.file.url} alt="" width="100" height="100"/>:null
                      }
                    </div>
                  </>)
                )}
                </div>
                <div>
                  {item.fields.creator.map((c:any)=>(
                    <div>
                        <div>{blogs.includes.Entry.map((entry:any)=>(
                            <>
                              <div>
                              {c.sys.id===entry.sys.id?
                                <div>Author : {entry.fields.name} 
                                {
                                  blogs.includes.Asset.map((asset:any)=>(
                                    <div>
                                      {
                                        entry.fields.img.sys.id===asset.sys.id?
                                        <Image src={"https:" + asset.fields.file.url} alt="" width="100" height="100"/>:null
                                      }
                                    </div>
                                  ))
                                } </div>:<></>}
                              </div>
                            </>
                        ))                  
                          }</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        })
      }
    </div>
  )
}