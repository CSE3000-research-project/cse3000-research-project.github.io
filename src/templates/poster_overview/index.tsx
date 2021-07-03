import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import NavAndSideBarLayout from "../../layout/NavAndSideBarLayout"

import { Grid } from "@material-ui/core"
import { SitePageContext } from "../../../graphql-types"
import ProjectCard from "./ProjectCard"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
}))

interface Props {
  path: string
  pageContext: SitePageContext
}

const PosterOverview: React.FC<Props> = ({ pageContext, path }: Props) => {
  const classes = useStyles()

  return (
    <NavAndSideBarLayout
      allGroupSlugs={pageContext?.allGroupSlugs}
      currentSlug={path}
    >
      <Grid container className={classes.root} justify="center" spacing={2}>
        {pageContext?.groups &&
          pageContext?.groups?.map(projectGroup => (
            <Grid
              item
              lg={10}
              key={`${projectGroup?.year}-Q${projectGroup?.quarter}-${projectGroup?.projectTitle}`}
            >
              {projectGroup && <ProjectCard projectGroup={projectGroup} />}
            </Grid>
          ))}
      </Grid>
    </NavAndSideBarLayout>
  )
}

export default PosterOverview
