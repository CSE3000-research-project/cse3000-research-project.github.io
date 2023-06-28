import { graphql, useStaticQuery } from "gatsby"
import { UseSiteMetadataHookQuery } from "../../graphql-types"

export default (): UseSiteMetadataHookQuery => {
  return useStaticQuery(graphql`
    query UseSiteMetadataHook {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
    }
  `)
}
