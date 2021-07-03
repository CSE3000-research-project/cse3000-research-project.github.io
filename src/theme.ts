import deepMerge from "deepmerge"
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
  Theme,
} from "@material-ui/core/styles"

const makeTheme = (variant: ThemeOptions): Theme => {
  const common = {
    palette: {},
  }

  const theme = createMuiTheme(deepMerge(common, variant))
  return responsiveFontSizes(theme)
}

const light: ThemeOptions = {
  palette: {
    type: "light",
  },
}

const themes = {
  light: makeTheme(light),
}

export default themes
