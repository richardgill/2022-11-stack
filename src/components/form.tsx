export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form
    {...props}
    onSubmit={(event) => {
      console.log('onsubmit')
      event.preventDefault()
      if (props.onSubmit) {
        props.onSubmit(event)
      }
    }}
  />
)
