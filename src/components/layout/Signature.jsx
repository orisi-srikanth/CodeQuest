import SignatureFlourish from '@/components/brand/SignatureFlourish.jsx'
import { cn } from '@/lib/cn.js'
import { FOOTER } from '@/data/footer.js'

/**
 * Authorship mark: the name set in a handwritten face over a flourish stroke,
 * with the role beneath. The handwriting font is bundled locally (no network),
 * so the signature renders identically offline.
 */
export default function Signature({ className }) {
  const { signature } = FOOTER

  return (
    <figure className={cn('flex flex-col items-start', className)}>
      <span className="font-signature -rotate-[3deg] text-[2.75rem] leading-none tracking-tight text-slate-100 sm:text-5xl">
        {signature.name}
      </span>
      <SignatureFlourish width={200} className="-mt-1 text-slate-600" />

      <figcaption className="mt-2">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-500">
          {signature.role}
        </span>
      </figcaption>
    </figure>
  )
}
