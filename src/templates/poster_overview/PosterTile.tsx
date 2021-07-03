import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core"
import Img, { FixedObject } from "gatsby-image"
import { SitePageContextGroupsStudents } from "../../../graphql-types"

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
    [theme.breakpoints.up("md")]: {
      opacity: 0,
      "&:hover": {
        opacity: 1,
      },
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
  studentInfo: SitePageContextGroupsStudents
}

const PosterTile: React.FC<Props> = ({ studentInfo }: Props) => {
  const classes = useStyles()
  const isPhone = useMediaQuery((theme: any) => theme.breakpoints.down("md"))
  return (
    <Grid item className={classes.gridListTile}>
      {studentInfo?.prevImage?.childImageSharp?.fixed && (
        <Img
          fixed={studentInfo.prevImage.childImageSharp.fixed as FixedObject}
        />
      )}
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
              {studentInfo?.thesisTitle}
            </Typography>
            <Typography variant={"body2"} align={"center"}>
              By {studentInfo?.firstName} {studentInfo?.lastName}
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
              {studentInfo?.pdfUrl && (
                <Grid item className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    target={"_blank"}
                    href={studentInfo.pdfUrl}
                  >
                    Poster
                  </Button>
                </Grid>
              )}
              {studentInfo?.paperUrl && (
                <Grid item className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    target={"_blank"}
                    href={studentInfo.paperUrl}
                  >
                    Paper
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

export default PosterTile
