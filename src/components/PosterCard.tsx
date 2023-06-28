import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import { Card, CardContent, Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({}))

interface Props {
  groupName: string
  supervisors?: string[] | undefined
}

const ProjectCard: React.FC<Props> = ({ groupName, supervisors }: Props) => {
  const classes = useStyles()
  return (
    <Card>
      <CardContent>
        <Typography variant={"h5"} component={"h2"}>
          {groupName}
        </Typography>
        {supervisors && supervisors.length > 0 && (
          <Typography variant={"body1"} paragraph>
            Supervisors:
          </Typography>
        )}
        <Grid
          container
          direction="row"
          justify={"space-evenly"}
          alignItems={"flex-start"}
          spacing={0}
        >
          <p>posters</p>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
