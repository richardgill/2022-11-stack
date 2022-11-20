import clsx from 'clsx'

export const Container: React.FC<
  { classname?: string } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
