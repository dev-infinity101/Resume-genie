'use client'

import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

const Spinner = ({ className }: { className?: string }) => {
  return <Loader className={cn('animate-spin text-blue-500', className)} />
}

export default Spinner