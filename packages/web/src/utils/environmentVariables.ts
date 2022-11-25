export const baseUrl =
  process.env.IS_PULL_REQUEST === 'true'
    ? process.env.RENDER_EXTERNAL_URL ?? ''
    : process.env.BASE_URL ?? process.env.RENDER_EXTERNAL_URL ?? ''
