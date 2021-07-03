import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@material-ui/core"
import clsx from "clsx"
import { Menu, ChevronRight } from "@material-ui/icons"
import { Maybe, Scalars } from "../../graphql-types"
import { Link } from "gatsby"
import { get_slug_to_most_recent_edition } from "../utils/utils"

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grid: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  listItem: {
    paddingLeft: theme.spacing(4),
  },
}))

interface Props {
  children: JSX.Element[] | JSX.Element
  allGroupSlugs?: Maybe<Array<Maybe<Scalars["String"]>>>
  currentSlug: string
}

const NavAndSideBarLayout: React.FC<Props> = ({
  children,
  allGroupSlugs,
  currentSlug,
}: Props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link
              to={get_slug_to_most_recent_edition(allGroupSlugs)}
              className={classes.link}
            >
              CSE3000 Research Project
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider />
        <List
          subheader={<ListSubheader component="div">Editions</ListSubheader>}
        >
          {allGroupSlugs &&
            allGroupSlugs
              .sort()
              .reverse()
              .map(slug => (
                <div key={slug}>
                  {slug && (
                    <>
                      {slug === currentSlug ? (
                        <ListItem
                          button
                          className={classes.listItem}
                          selected
                          disabled
                        >
                          <ListItemText primary={slug.slice(1)} />
                        </ListItem>
                      ) : (
                        <Link to={slug} className={classes.link}>
                          <ListItem button className={classes.listItem}>
                            <ListItemText primary={slug.slice(1)} />
                          </ListItem>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}

export default NavAndSideBarLayout
