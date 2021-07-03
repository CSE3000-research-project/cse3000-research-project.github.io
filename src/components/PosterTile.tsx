import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import { Button, Grid, Typography } from "@material-ui/core"
import Img from "gatsby-image"

const useStyles = makeStyles((theme: Theme) => ({
  gridListTile: {
    position: "relative",
    width: 250,
    height: 200,
    margin: 4,
  },
  imageOverlay: {
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    background: "rgba(0, 0, 0, 0.5)",
    transition: ".5s ease",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  },
  overlayContentContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  titleContainer: {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    color: "#e6e6e6",
  },
  buttonGroupContainer: {
    width: "100%",
    boxSizing: "border-box",
  },
  buttonContainer: {
    margin: 5,
  },
}))

interface Props {
  poster: any
}

const PosterTile: React.FC<Props> = ({ poster }: Props) => {
  const classes = useStyles()
  return (
    <Grid item key={poster.id} className={classes.gridListTile}>
      <Img fixed={poster.childImageSharp.fixed} />
      <div className={classes.imageOverlay}>
        <Grid
          container
          direction="column"
          justify={"center"}
          alignItems={"flex-start"}
          className={classes.overlayContentContainer}
        >
          <Grid item className={classes.titleContainer}>
            <Typography variant={"subtitle2"} align={"center"}>
              thesisTitle
            </Typography>
            <Typography variant={"body2"} align={"center"}>
              By name
            </Typography>
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Grid item className={classes.buttonGroupContainer}>
            <Grid
              item
              container
              direction="row"
              justify={"center"}
              alignItems={"stretch"}
              spacing={2}
            >
              <Grid item className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  target={"_blank"}
                  href={poster.pdfUrl}
                >
                  Poster
                </Button>
              </Grid>
              <Grid item className={classes.buttonContainer}>
                {poster.paperUrl !== undefined && poster.paperUrl.length > 0 && (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    target={"_blank"}
                    href={poster.paperUrl}
                  >
                    Paper
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

export default PosterTile
