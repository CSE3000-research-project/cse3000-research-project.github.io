import { Maybe } from "../../graphql-types"

export const get_slug_to_most_recent_edition = (
  allGroupSlugs: undefined | null | Maybe<string>[],
) => {
  const redirectRoutes = allGroupSlugs?.sort().reverse()
  if (redirectRoutes && redirectRoutes.length > 0 && redirectRoutes[0]) {
    return redirectRoutes[0]
  } else {
    return "/404"
  }
}
