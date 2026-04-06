export default function Footer() {
  return (
<footer className="bg-background border-t-4 border-(--border) px-6 py-12">
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
          <li><a href="#features" className="hover:text-foreground cursor-pointer">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-foreground cursor-pointer">How it Works</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-3">Company</h4>
        <ul className="space-y-2 text-sm text-(--card-textColor)">
          <li><a href="/about" className="hover:text-foreground cursor-pointer">About</a></li>
          <li><a href="/contact" className="hover:text-foreground cursor-pointer">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-3">Resources</h4>
        <ul className="space-y-2 text-sm text-(--card-textColor)">
          <li><a href="/privacy" className="hover:text-foreground cursor-pointer">Privacy Policy</a></li>
          <li><a href="/terms" className="hover:text-foreground cursor-pointer">Terms of Service</a></li>
        </ul>
      </div>

    </div>

    <div className="border-t border-(--border) pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-(--muted-textColor)">
        © 2026 BRAINLOOP. All rights reserved.
      </p>
      <div className="flex gap-4 text-sm text-(--card-textColor)">
        <span><a href="https://github.com/mahimagupta-droid/Matrix-3.0---BrainLoop" className="hover:text-foreground cursor-pointer">GitHub</a></span>
      </div>
    </div>
  </div>
</footer>
    );
}