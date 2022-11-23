import { trueFunc } from '~/pages/index/true'
import { falseFunc } from './false'

test('Sanity check', () => {
  expect(trueFunc()).toBe(true)
})

test('Sanity check 2', () => {
  expect(falseFunc()).toBe(false)
})
