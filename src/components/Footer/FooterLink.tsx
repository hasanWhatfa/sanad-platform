import { Link } from 'react-router-dom'

interface FooterLinksProps{
    data :{
    title:string,
    links: FooterLinks[]
    }
}

type FooterLinks = {
    linkName:string,
    linkTo:string
}

const FooterLink = ({data} : FooterLinksProps) => {
  return (
    <div className='footerLink'>
      <h4>{data.title}</h4>
      <div className="footerLinksContainer">
        {
            data.links.map((link,linkIndex)=>{
                return(
                    <Link to={link.linkTo} key={linkIndex}>{link.linkName}</Link>
                )
            })
        }
      </div>
    </div>
  )
}

export default FooterLink
