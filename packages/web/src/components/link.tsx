import React from 'react'
import { usePageContext } from '../renderer/usePageContext'

export interface LinkProps {
  href?: string
  className?: string
  children: React.ReactNode
}

export const Link: React.FC<LinkProps> = (props) => {
  const pageContext = usePageContext()
  const className = [
    props.className,
    pageContext.urlPathname === props.href && 'is-active',
  ]
    .filter(Boolean)
    .join(' ')
  return <a {...props} className={className} />
}
