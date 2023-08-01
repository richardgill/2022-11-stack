import { classesForButton } from '~/components/button'
import { type PageContext } from '~/renderer/types'

export const doesRequireAuth = (pageContext: PageContext) =>
  [true, undefined].includes(pageContext.exports.requiresAuth)

export const doesRequireAdmin = (pageContext: PageContext) =>
  pageContext.exports.requiresAdmin

export const clerkApperance = {
  elements: {
    card: 'shadow-none p-0 m-0 mt-20',
    headerTitle: 'text-lg font-semibold text-gray-900',
    headerSubtitle: 'hidden',
    dividerText: 'bg-white px-2 text-gray-500',
    formFieldLabel: 'mb-3 block text-sm font-medium text-gray-700',
    formFieldInput:
      'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
    footerActionText: 'text-sm text-gray-900',
    socialButtonsBlockButtonText: 'text-sm font-normal',
    footerActionLink: 'font-medium text-indigo-600 hover:text-indigo-500',
    formButtonPrimary: classesForButton('solid', 'blue', 'normal-case'),
  },
}
