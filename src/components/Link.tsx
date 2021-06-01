import React, { FC } from 'react'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'

type LinkPropsType = Omit<GatsbyLinkProps<unknown>, 'ref'>;

const Link: FC<LinkPropsType> = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink to={to} {...other}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export default Link
