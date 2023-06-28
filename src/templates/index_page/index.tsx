import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import NavAndSideBarLayout from "../../layout/NavAndSideBarLayout"
import { Maybe, Scalars } from "../../../graphql-types"
import { CircularProgress, Grid } from "@material-ui/core"
import { navigate } from "gatsby"
import { get_slug_to_most_recent_edition } from "../../utils/utils"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}))

interface Props {
  path: string
  pageContext: PageContext
}
interface PageContext {
  allGroupSlugs?: Maybe<Array<Maybe<Scalars["String"]>>>
}

const IndexTemplate: React.FC<Props> = ({ path, pageContext }: Props) => {
  const classes = useStyles()

  useEffect(() => {
    navigate(get_slug_to_most_recent_edition(pageContext?.allGroupSlugs))
  }, [])

  return (
    <NavAndSideBarLayout
      allGroupSlugs={pageContext?.allGroupSlugs}
      currentSlug={path}
    >
      <Grid container justify={"center"} alignItems={"center"}>
        <CircularProgress />
      </Grid>
    </NavAndSideBarLayout>
  )
}

export default IndexTemplate
