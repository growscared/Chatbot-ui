import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  const email = 'admin@growscared.com'
  const password = 'password123'

  const { data: signUpUser, error: userError } = await supabase.auth.signUp({
    email,
    password
  })

  if (userError) {
    console.error('User creation failed:', userError.message)
    return
  }

  const userId = signUpUser.user?.id
  if (!userId) {
    console.error('User ID missing.')
    return
  }

  const { error: workspaceError } = await supabase.from('workspaces').insert([
    {
      name: 'Default Workspace',
      user_id: userId
    }
  ])

  if (workspaceError) {
    console.error('Workspace creation failed:', workspaceError.message)
  } else {
    console.log('✅ User and workspace seeded successfully.')
  }
}

seed().catch(console.error)