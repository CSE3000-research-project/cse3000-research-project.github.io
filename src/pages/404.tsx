import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"
import { Link } from "gatsby"
import NavAndSideBarLayout from "../layout/NavAndSideBarLayout"

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
}

const IndexTemplate: React.FC<Props> = ({ path }: Props) => {
  const classes = useStyles()

  return (
    <NavAndSideBarLayout currentSlug={path}>
      <Grid container className={classes.root} justify="center">
        <Grid item lg={8} md={12}>
          <Card>
            <CardContent>
              <Typography variant={"h5"} component={"h2"}>
                404 Page not found
              </Typography>
              <Typography variant={"body1"} paragraph>
                The page your trying to visit does not exists.
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={"/"} className={classes.link}>
                <Button size="small" color="primary">
                  Go to the index page
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </NavAndSideBarLayout>
  )
}

export default IndexTemplate
