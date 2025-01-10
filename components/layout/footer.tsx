// components/layout/footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 PayGuard. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary">Terms of Service</a>
            <a href="/contact" className="hover:text-primary">Contact Us</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}