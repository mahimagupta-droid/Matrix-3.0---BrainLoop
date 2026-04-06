export default function Footer() {
  return (
<footer className="bg-background border-t border-(--border) px-6 py-12">
  <div className="max-w-6xl mx-auto flex flex-col gap-10">
    <div className="grid md:grid-cols-4 gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">BRAINLOOP</h3>
        <p className="text-sm text-(--card-textColor) leading-relaxed">
          Adaptive learning powered by AI. Diagnose mistakes, understand concepts,
          and master any subject faster.
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-3">Product</h4>
        <ul className="space-y-2 text-sm text-(--card-textColor)">
          <li className="hover:text-(--textColor) cursor-pointer">Features</li>
          <li className="hover:text-(--textColor) cursor-pointer">How it Works</li>
          <li className="hover:text-(--textColor) cursor-pointer">Pricing</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-3">Company</h4>
        <ul className="space-y-2 text-sm text-[var(--card-textColor)]">
          <li className="hover:text-[var(--textColor)] cursor-pointer">About</li>
          <li className="hover:text-[var(--textColor)] cursor-pointer">Careers</li>
          <li className="hover:text-[var(--textColor)] cursor-pointer">Contact</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-3">Resources</h4>
        <ul className="space-y-2 text-sm text-[var(--card-textColor)]">
          <li className="hover:text-[var(--textColor)] cursor-pointer">Docs</li>
          <li className="hover:text-[var(--textColor)] cursor-pointer">Privacy Policy</li>
          <li className="hover:text-[var(--textColor)] cursor-pointer">Terms of Service</li>
        </ul>
      </div>

    </div>

    <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-[var(--muted-textColor)]">
        © 2026 BRAINLOOP. All rights reserved.
      </p>
      <div className="flex gap-4 text-sm text-[var(--card-textColor)]">
        <span className="hover:text-[var(--textColor)] cursor-pointer">Twitter</span>
        <span className="hover:text-[var(--textColor)] cursor-pointer">LinkedIn</span>
        <span className="hover:text-[var(--textColor)] cursor-pointer">GitHub</span>
      </div>
    </div>
  </div>
</footer>
    );
}