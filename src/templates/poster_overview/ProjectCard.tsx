import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import { SitePageContextGroups } from "../../../graphql-types"
import PosterTile from "./PosterTile"

const useStyles = makeStyles((theme: Theme) => ({}))

interface Props {
  projectGroup: SitePageContextGroups
}

const ProjectCard: React.FC<Props> = ({ projectGroup }: Props) => {
  const classes = useStyles()
  return (
    <Card>
      <CardContent>
        <Typography
          variant={"h5"}
          component={"h2"}
          paragraph={
            !projectGroup?.supervisors || projectGroup?.supervisors.length === 0
          }
        >
          {projectGroup.projectTitle}
        </Typography>
        {projectGroup?.supervisors && projectGroup?.supervisors.length > 0 && (
          <Typography variant={"body1"} paragraph>
            Supervisors: {projectGroup.supervisors.join(", ")}
          </Typography>
        )}
        <Grid
          container
          direction="row"
          justify={"space-evenly"}
          alignItems={"flex-start"}
          spacing={0}
        >
          {projectGroup?.students &&
            projectGroup.students.map(student => (
              <div
                key={`${projectGroup?.projectTitle} ${student?.firstName} ${student?.lastName}`}
              >
                {student && <PosterTile studentInfo={student} />}
              </div>
            ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
