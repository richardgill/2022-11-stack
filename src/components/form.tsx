export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form
    {...props}
    onSubmit={(event) => {
      event.preventDefault()
      if (props.onSubmit) {
        props.onSubmit(event)
      }
    }}
  />
)
