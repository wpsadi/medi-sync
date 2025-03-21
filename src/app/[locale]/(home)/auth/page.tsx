import { redirect } from 'next/navigation'

import { Url } from '@/utils/Url'

function Page() {
  return redirect(Url.extendURL("auth","login"))
}

export default Page