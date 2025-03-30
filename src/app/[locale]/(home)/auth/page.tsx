import { redirect } from 'next/navigation'

import { Url } from '@/utils/Url'

async function Page() {
  return redirect(await Url.extendURL("auth","login"))
}

export default Page