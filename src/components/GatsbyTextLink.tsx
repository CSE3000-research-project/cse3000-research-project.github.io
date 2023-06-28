import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import { Link } from "gatsby"
import clsx from "clsx"

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}))

interface Props {
  children?: JSX.Element[] | JSX.Element | string
  to: string
  className?: string
}

const GatsbyTextLink: React.FC<Props> = ({
  children,
  to,
  className,
}: Props) => {
  const classes = useStyles()
  const classnames = [classes.link]
  if (className) {
    classnames.push(className)
  }
  return (
    <Link className={clsx(classnames)} to={to}>
      {children}
    </Link>
  )
}

export default GatsbyTextLink
