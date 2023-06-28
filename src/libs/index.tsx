import React, { FC } from "react"
import { makeStyles, ThemeProvider } from "@material-ui/styles"
import { Theme } from "@material-ui/core"

import themes from "../theme"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.default,
  },
  main: {
    backgroundColor: theme.palette.background.default,
  },
}))

const LayoutComponent: FC = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <main className={classes.main}>{children}</main>
    </div>
  )
}

const Layout: FC = ({ children }) => {
  return (
    <ThemeProvider theme={themes["light"]}>
      <LayoutComponent>{children}</LayoutComponent>
    </ThemeProvider>
  )
}

export default Layout
