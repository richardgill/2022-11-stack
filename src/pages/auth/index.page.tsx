import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { supabase } from '~/renderer/supabase'

export const Page = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={[]}
    magicLink
    view="magic_link"
    showLinks={false}
  />
)
