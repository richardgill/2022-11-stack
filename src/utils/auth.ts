import { PageContext } from '~/renderer/types'

export const doesRequireAuth = (pageContext: PageContext) =>
  [true, undefined].includes(pageContext.exports.requiresAuth)

export const clerkApperance = {
  elements: {
    headerTitle: 'text-3xl font-bold tracking-tight text-gray-900',
    headerSubtitle: 'hidden',
    dividerText: 'bg-white px-2 text-gray-500',
    formFieldLabel: 'text-sm font-medium text-gray-700',
    formFieldInput:
      'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
    footerActionText: 'text-sm text-gray-900',
    socialButtonsBlockButtonText: 'text-sm font-normal',
    footerActionLink: 'font-medium text-indigo-600 hover:text-indigo-500',
    formButtonPrimary:
      'normal-case flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  },
}
