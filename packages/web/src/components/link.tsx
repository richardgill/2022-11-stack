import React from 'react'
import { twMerge } from 'tailwind-merge'
import { usePageContext } from '../renderer/usePageContext'

export interface LinkProps {
  href?: string
  className?: string
  children: React.ReactNode
  activeClassName?: string
}

export const Link: React.FC<LinkProps> = (props) => {
  const pageContext = usePageContext()
  const className = twMerge([
    props.className,
    pageContext.urlPathname === props.href &&
      (props.activeClassName ?? 'is-active'),
  ])

  return <a {...props} className={className} />
}
