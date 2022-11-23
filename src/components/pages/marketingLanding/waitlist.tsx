import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '~/components/button'
import { Container } from '~/components/container'
import { Form } from '~/components/form'
import { trpcReact } from '~/utils/trpc'

export const Waitlist = () => {
  const { mutate: joinWaitlist, isSuccess } =
    trpcReact.waitlist.join.useMutation()
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl md:mx-auto md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Join the waitlist
          </h2>
        </div>
        {isSuccess && (
          <div className="mt-12 font-display text-3xl text-green-500 sm:text-3xl md:text-center">
            <CheckCircleIcon className="-mt-1 mr-1 inline-block h-10 w-10" />
            {"You're on the waitlist"}
          </div>
        )}
        {!isSuccess && (
          <Form
            className="md: mt-8 flex flex-col md:flex-row md:justify-center"
            onSubmit={async (event) => {
              // @ts-expect-error
              const email = event.target.email.value
              await joinWaitlist(email)
            }}
          >
            <>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mr-4 block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:w-auto"
                placeholder="Enter your email"
              />
            </>
            <Button className="mt-8 md:mt-0" type="submit" color={'blue'}>
              Join waitlist
            </Button>
          </Form>
        )}
      </Container>
    </section>
  )
}
